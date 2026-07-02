/**
 * Full round-trip: load the 'sequence' example, click the real
 * "Save Editor (zip)" button, unzip the download, then open the generated
 * standalone editor (Blockly 13 from CDN), load its example.json and verify
 * blocks render and code generation works.
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const dlDir = '/tmp/bb_editor_dl';
  fs.rmSync(dlDir, {recursive: true, force: true});
  fs.mkdirSync(dlDir, {recursive: true});

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('APP PAGEERROR:', e.message));
  // capture the zip blob directly instead of relying on headless downloads
  await page.evaluateOnNewDocument(() => {
    const orig = URL.createObjectURL.bind(URL);
    window.__blobs = [];
    URL.createObjectURL = (blob) => { window.__blobs.push(blob); return orig(blob); };
  });

  await page.setViewport({width: 1920, height: 1200});
  await page.goto('http://localhost:8124/?editor=sequence&load=1', {waitUntil: 'networkidle2'});
  await sleep(3000);
  await page.evaluate(() => document.getElementById('save').click());
  let zipB64 = null;
  for (let i = 0; i < 30 && !zipB64; i++) {
    await sleep(500);
    zipB64 = await page.evaluate(async () => {
      const blob = window.__blobs.find(b => b.size > 1000);
      if (!blob) return null;
      const buf = await blob.arrayBuffer();
      let bin = '';
      const bytes = new Uint8Array(buf);
      for (let j = 0; j < bytes.length; j++) bin += String.fromCharCode(bytes[j]);
      return btoa(bin);
    });
  }
  if (!zipB64) { console.error('FAIL: no zip blob captured'); process.exit(1); }
  const zipPath = path.join(dlDir, 'editor.zip');
  fs.writeFileSync(zipPath, Buffer.from(zipB64, 'base64'));
  const outDir = '/tmp/bb_editor_out';
  fs.rmSync(outDir, {recursive: true, force: true});
  fs.mkdirSync(outDir, {recursive: true});
  execSync(`cd ${outDir} && unzip -o ${zipPath}`);
  console.log('zip contents:', fs.readdirSync(outDir).join(', '));

  const genJs = fs.readFileSync(path.join(outDir, 'generator.js'), 'utf8');
  const html = fs.readFileSync(path.join(outDir, 'editor.html'), 'utf8');
  console.log('generator.js uses forBlock:', genJs.includes('.forBlock['));
  console.log('editor.html pins blockly@13.1.0:', html.includes('blockly@13.1.0'));

  // serve the generated editor and open it
  const {spawn} = require('child_process');
  const server = spawn('python3', ['-m', 'http.server', '8126'], {cwd: outDir});
  await sleep(1500);

  const page2 = await browser.newPage();
  const errors = [];
  page2.on('pageerror', e => errors.push(e.message));
  page2.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page2.setViewport({width: 1600, height: 1000});
  await page2.goto('http://localhost:8126/editor.html', {waitUntil: 'networkidle2'});
  await sleep(3000);

  // load example.json into the standalone editor
  const exampleJson = fs.readFileSync(path.join(outDir, 'example.json'), 'utf8');
  const result = await page2.evaluate((jsonText) => {
    const json = JSON.parse(jsonText);
    Blockly.serialization.workspaces.load(json, workspace);
    return new Promise(resolve => setTimeout(() => resolve({
      blocks: workspace.getAllBlocks(false).length,
      code: document.getElementById('codeDiv').value.slice(0, 300),
      version: Blockly.VERSION,
    }), 1500));
  }, exampleJson);

  console.log('--- standalone generated editor (Blockly', result.version + ') ---');
  console.log('blocks loaded:', result.blocks);
  console.log('generated code snippet:', JSON.stringify(result.code.slice(0, 150)));
  console.log('code generation works:', result.code.length > 0 && !result.code.startsWith('Error'));
  console.log('page errors:', errors.length ? errors.slice(0, 5) : 'none');

  await page2.screenshot({path: '/tmp/standalone_editor.png'});
  server.kill();
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
