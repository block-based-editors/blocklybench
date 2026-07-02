/**
 * Compares generated concrete code + toolbox JSON between the v9 baseline
 * (port 8125) and the Blockly 13 branch (port 8124) for every example.
 */
const puppeteer = require('puppeteer-core');

const EXAMPLES = ['basic', 'first', 'toolbox', 'code', 'statemachine',
                  'google_workflow', 'lark', 'svox', 'sequence',
                  'extra_fields', 'fectar', 'fectar_scratch',
                  'pyarrowhead', 'example_toolbox', 'blockly_docs'];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function capture(page, base, example) {
  await page.goto(`${base}/?editor=${example}&load=1`, {waitUntil: 'networkidle2'});
  await sleep(2500);
  return page.evaluate(() => ({
    concrete: document.getElementById('concrete_code').value,
    toolbox: document.getElementById('toolbox_javascript').value,
    factory: document.getElementById('factory_code').value,
  }));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });

  for (const example of EXAMPLES) {
    // fresh incognito-like contexts so localStorage of one port can't leak
    const ctxOld = await browser.createBrowserContext();
    const ctxNew = await browser.createBrowserContext();
    const pOld = await ctxOld.newPage();
    const pNew = await ctxNew.newPage();
    await pOld.setViewport({width: 1920, height: 1200});
    await pNew.setViewport({width: 1920, height: 1200});

    const oldR = await capture(pOld, 'http://localhost:8125', example);
    const newR = await capture(pNew, 'http://localhost:8124', example);

    const concreteSame = oldR.concrete === newR.concrete;
    const toolboxSame = oldR.toolbox === newR.toolbox;
    console.log(`${example.padEnd(16)} concrete:${concreteSame ? 'IDENTIEK' : 'VERSCHIL'} toolbox:${toolboxSame ? 'IDENTIEK' : 'VERSCHIL'}`);
    if (!concreteSame) {
      const fs = require('fs');
      fs.writeFileSync(`/tmp/diff_${example}_old.txt`, oldR.concrete);
      fs.writeFileSync(`/tmp/diff_${example}_new.txt`, newR.concrete);
    }
    if (!toolboxSame) {
      const fs = require('fs');
      fs.writeFileSync(`/tmp/tbdiff_${example}_old.txt`, oldR.toolbox);
      fs.writeFileSync(`/tmp/tbdiff_${example}_new.txt`, newR.toolbox);
    }
    await ctxOld.close(); await ctxNew.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
