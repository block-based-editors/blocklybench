const puppeteer = require('/home/kwijk/.openclaw/workspace/blocklybench/node_modules/puppeteer-core');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function getMode(page){return page.evaluate(()=>{const B=window.Blockly;let c=null;for(const ws of B.Workspace.getAll())if(ws.name==='Concrete')c=ws;return{toolbox:!!c.getToolbox(),blocks:c.getAllBlocks(false).length};});}
(async () => {
  const browser = await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu']});
  const page = await browser.newPage();
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.setViewport({width:1920,height:1200});

  // --- richting 1: categorie -> plat ---
  await page.goto('http://localhost:8124/?editor=sequence&load=1',{waitUntil:'networkidle2'});
  await sleep(3500);
  console.log('start (categorie):', JSON.stringify(await getMode(page)));
  await page.evaluate(()=>{const B=window.Blockly;let t=null;for(const ws of B.Workspace.getAll())if(ws.name==='Toolbox')t=ws;t.clear();B.serialization.blocks.append({type:'toolbox_blocks',inputs:{LIST:{block:{type:'toolbox_block',fields:{TYPE:'machine'}}}}},t);});
  await sleep(2500);
  console.log('na -> plat:', JSON.stringify(await getMode(page)), '| errors:', errors.length?errors.slice(0,2):'geen');

  // --- richting 2: plat -> categorie (regressie-check) ---
  errors.length=0;
  await page.evaluate(()=>{const B=window.Blockly;let t=null;for(const ws of B.Workspace.getAll())if(ws.name==='Toolbox')t=ws;t.clear();B.serialization.blocks.append({type:'toolbox_categories',inputs:{LIST:{block:{type:'toolbox_category',fields:{NAME:'Cat',COLOUR:'#5b80a5'},inputs:{LIST:{block:{type:'toolbox_block',fields:{TYPE:'machine'}}}}}}}},t);});
  await sleep(2500);
  console.log('na -> categorie:', JSON.stringify(await getMode(page)), '| errors:', errors.length?errors.slice(0,2):'geen');

  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
