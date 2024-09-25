
# Blocklybench web application
[![DOI](https://zenodo.org/badge/523855099.svg)](https://zenodo.org/badge/latestdoi/523855099)
[![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

## Published Article 
https://maveme.github.io/publications/2022-blocklybench/

## Live version
https://motar-242711.ew.r.appspot.com/

## Examples of saved editors created with Blocklybench
https://motar-242711.ew.r.appspot.com/editors/sequence/index.html Sequence editor

https://motar-242711.ew.r.appspot.com/editors/blockly_docs/editor.html  
Blockly block method documentation editor open [Example](https://raw.githubusercontent.com/block-based-editors/blocklybench/main/public/editors/blockly_docs/example.json)


https://motar-242711.ew.r.appspot.com/editors/svox/playground.html

Load any of the following examples: [Vuurtoren](https://motar-242711.ew.r.appspot.com/editors/svox/develop/vuurtoren%20ijs.json) or [Apple](https://motar-242711.ew.r.appspot.com/editors/svox/develop/appel.json) or [Tree](https://motar-242711.ew.r.appspot.com/editors/svox/develop/boom.json)

## How to run

```
npm install 
npm start
```

Open the browser on localhost:8080, probably good to zoom out to 75% to get some more space.

## How to deploy

To deploy a version to Google Appengine:

```
npm run build

gcloud app deploy
```
