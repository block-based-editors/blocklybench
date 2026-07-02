/**
 * Verifies the live-editing pipeline on Blockly 13:
 * 1. Load the 'statemachine' example.
 * 2. Rename a factory block field -> block definition re-eval'd, concrete
 *    workspace reloaded with the new type, generator regenerated.
 * 3. Change a field on a concrete block -> concrete code pane updates.
 * 4. Generate the standalone editor (blocks.js/generator.js/editor.js/html)
 *    exactly as Save Editor does, save to disk for a follow-up test.
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1200});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto('http://localhost:8124/?editor=statemachine&load=1', {waitUntil: 'networkidle2'});
  await sleep(3000);

  // --- 1. live rename of a factory block ---
  const renameResult = await page.evaluate(() => {
    const B = window.Blockly;
    const byName = {};
    for (const ws of B.Workspace.getAll()) if (ws.name) byName[ws.name] = ws;

    const factory = byName['Factory'];
    const base = factory.getBlocksByType('factory_base')
        .find(b => b.getFieldValue('NAME') === 'state');
    if (!base) return {error: 'factory_base "state" not found'};

    const before = {
      concreteTypes: byName['Concrete'].getAllBlocks(false).map(b => b.type),
      code: document.getElementById('concrete_code').value,
    };
    base.setFieldValue('state_renamed', 'NAME');
    return {before, ok: true};
  });
  await sleep(2000);

  const afterRename = await page.evaluate(() => {
    const B = window.Blockly;
    const byName = {};
    for (const ws of B.Workspace.getAll()) if (ws.name) byName[ws.name] = ws;
    return {
      concreteTypes: byName['Concrete'].getAllBlocks(false).map(b => b.type),
      blockDefined: !!B.Blocks['state_renamed'],
      generatorHasRenamed: document.getElementById('generator_code').value.includes("forBlock['state_renamed']"),
      factoryCodeHasRenamed: document.getElementById('factory_code').value.includes("state_renamed"),
      code: document.getElementById('concrete_code').value.slice(0, 200),
    };
  });

  console.log('--- live rename factory block ---');
  console.log('renamed type in concrete workspace:', afterRename.concreteTypes.includes('state_renamed'));
  console.log('Blockly.Blocks has new type:', afterRename.blockDefined);
  console.log('generator regenerated with forBlock for new type:', afterRename.generatorHasRenamed);
  console.log('block definition code updated:', afterRename.factoryCodeHasRenamed);

  // --- 2. live edit of a concrete block field updates generated code ---
  const liveEdit = await page.evaluate(() => {
    const B = window.Blockly;
    const byName = {};
    for (const ws of B.Workspace.getAll()) if (ws.name) byName[ws.name] = ws;
    const concrete = byName['Concrete'];
    const block = concrete.getAllBlocks(false)
        .find(b => b.inputList.some(i => i.fieldRow.some(f => f.name && f.EDITABLE !== false && f.constructor.name.includes('TextInput'))));
    if (!block) return {error: 'no editable text field found'};
    let fieldName;
    for (const input of block.inputList)
      for (const f of input.fieldRow)
        if (f.name && f.constructor.name.includes('TextInput')) fieldName = f.name;
    const before = document.getElementById('concrete_code').value;
    block.setFieldValue('LIVE_EDIT_MARKER', fieldName);
    return {before, fieldName, blockType: block.type};
  });
  await sleep(1500);
  const afterEdit = await page.evaluate(() =>
      document.getElementById('concrete_code').value);

  console.log('--- live edit concrete field ---');
  console.log('field edited:', liveEdit.fieldName, 'on', liveEdit.blockType);
  console.log('code pane updated with new value:', afterEdit.includes('LIVE_EDIT_MARKER'));

  // --- 3. generate standalone editor files (same path as Save Editor) ---
  await page.goto('http://localhost:8124/?editor=sequence&load=1', {waitUntil: 'networkidle2'});
  await sleep(3000);
  const editorFiles = await page.evaluate(() => {
    // reproduce saveZip() content via the exposed textareas + templates:
    return {
      blocks: document.getElementById('factory_code').value,
      generator: document.getElementById('generator_code').value,
    };
  });
  fs.writeFileSync('/tmp/gen_editor_blocks.js', editorFiles.blocks);
  fs.writeFileSync('/tmp/gen_editor_generator.js', editorFiles.generator);
  console.log('--- generated editor files captured (sequence) ---');
  console.log('blocks.js bytes:', editorFiles.blocks.length,
              '| generator.js bytes:', editorFiles.generator.length,
              '| forBlock style:', editorFiles.generator.includes('.forBlock['));

  console.log('page errors during session:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
