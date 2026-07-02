/**
 * End-to-end test for the Blockly 13 upgrade.
 * Drives the real app in Chrome: loads every bundled example and checks
 * that all four workspaces get blocks, the generator eval pipeline runs,
 * and the concrete/toolbox/factory code panes contain sensible output.
 *
 * Usage: node e2e_test.js [baseUrl]   (default http://localhost:8124)
 */
const puppeteer = require('puppeteer-core');

const BASE = process.argv[2] || 'http://localhost:8124';
const EXAMPLES = ['basic', 'first', 'toolbox', 'code', 'statemachine',
                  'google_workflow', 'lark', 'svox', 'sequence',
                  'extra_fields', 'fectar', 'fectar_scratch',
                  'pyarrowhead', 'example_toolbox', 'blockly_docs'];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1200});

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push('PAGEERROR: ' + err.message));

  const results = [];
  for (const example of EXAMPLES) {
    consoleErrors.length = 0;
    // clear=1 wipes localStorage state between examples
    await page.goto(`${BASE}/?editor=${example}&load=1`, {waitUntil: 'networkidle2'});
    await sleep(2500); // let the sequential fetch chain + eval pipeline settle

    const state = await page.evaluate(() => {
      const B = window.Blockly;
      const workspaces = {};
      for (const ws of B.Workspace.getAll()) {
        if (ws.name) workspaces[ws.name] = ws.getAllBlocks(false).length;
      }
      const langSel = document.getElementById('language');
      return {
        workspaces,
        language: langSel ? langSel.value : null,
        factoryCode: document.getElementById('factory_code').value.slice(0, 200),
        generatorCode: document.getElementById('generator_code').value.slice(0, 200),
        toolboxCode: document.getElementById('toolbox_javascript').value.slice(0, 200),
        concreteCode: document.getElementById('concrete_code').value.slice(0, 400),
        concreteJson: document.getElementById('concrete_json').value.slice(0, 100),
        generatorUsesForBlock: document.getElementById('generator_code').value.includes('.forBlock['),
      };
    });

    const errs = consoleErrors.filter(e =>
      !e.includes('net::ERR') && !e.includes('favicon') &&
      !e.includes('stackdriver'));
    results.push({example, state, errors: errs.slice(0, 5)});

    const w = state.workspaces;
    const codeOk = state.concreteCode &&
      !state.concreteCode.startsWith('Error while creating');
    console.log(`${example.padEnd(16)} F:${w.Factory ?? '-'} T:${w.Toolbox ?? '-'} C:${w.Code ?? '-'} K:${w.Concrete ?? '-'} lang:${String(state.language).padEnd(12)} forBlock:${state.generatorUsesForBlock} concreteOk:${codeOk} errs:${errs.length}`);
    if (errs.length) console.log('   first error:', errs[0].slice(0, 300));
  }

  require('fs').writeFileSync('/tmp/e2e_results.json', JSON.stringify(results, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
