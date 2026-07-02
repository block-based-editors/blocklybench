
# Blocklybench web application
[![DOI](https://zenodo.org/badge/523855099.svg)](https://zenodo.org/badge/latestdoi/523855099)
[![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

## Published Article 
https://maveme.github.io/publications/2022-blocklybench/ and [presentation on YouTube](https://www.youtube.com/watch?v=dqRwtFQmOUo)

## Live version
https://block-based-editors.github.io/blocklybench/

(The old Google App Engine deployment at https://motar-242711.ew.r.appspot.com/ is no longer maintained.)

## Examples of saved editors created with Blocklybench
https://block-based-editors.github.io/blocklybench/editors/sequence/index.html Sequence editor

https://block-based-editors.github.io/blocklybench/editors/blockly_docs/editor.html  
Blockly block method documentation editor open [Example](https://raw.githubusercontent.com/block-based-editors/blocklybench/main/public/editors/blockly_docs/example.json)


https://block-based-editors.github.io/blocklybench/editors/svox/playground.html

Load any of the following examples: [Vuurtoren](https://block-based-editors.github.io/blocklybench/editors/svox/develop/vuurtoren%20ijs.json) or [Apple](https://block-based-editors.github.io/blocklybench/editors/svox/develop/appel.json) or [Tree](https://block-based-editors.github.io/blocklybench/editors/svox/develop/boom.json)

## How to run

```
npm install 
npm start
```

Open the browser on localhost:8080, probably good to zoom out to 75% to get some more space.

## How to deploy

Every push to `main` is built and deployed to GitHub Pages automatically by
the GitHub Action in `.github/workflows/webpack.yml`.

To deploy manually to Google App Engine (requires access to the GCP project):

```
npm run build

gcloud app deploy
```
