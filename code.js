"use strict";
figma.skipInvisibleInstanceChildren = true

// This plugin will open a tab that indicates that it will monitor the current
// selection on the page. It cannot change the document itself.
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// This shows the HTML page in "ui.html".
figma.showUI(`<script>window.location.href = "http://localhost:4200"</script>`);
// This monitors the selection changes and posts the selection to the UI
figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length === 0) {
    return;
  }
  const {id} = figma.currentPage.selection[0];
  const node = figma.getNodeById(id);
  if (node && (node.type === 'FRAME' || node.type === 'COMPONENT')) {
    const story = node.getPluginData('story');
    if (story) {
      figma.ui.postMessage({type: 'selectStory', id, story});
    }else {
      figma.ui.postMessage({type: 'showOverview'});
    }
  }
});

figma.ui.onmessage = (event) => {
  if (event.type === 'assignStory') {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Select a frame or component to assign a story.');
      return;
    }
    const {id} = figma.currentPage.selection[0];
    const node = figma.getNodeById(id);
    node.setPluginData('story', event.story);
  } else if (event.type === 'assignSource') {
    figma.currentPage.setPluginData('source', event.source);
    figma.notify(`Connected to Storybook with Source ${event.source}`);
  } else if (event.type === 'removeStory') {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Select a frame or component to assign a story.');
      return;
    }
    const {id} = figma.currentPage.selection[0];
    const node = figma.getNodeById(id);
    node.setPluginData('story', '');
    figma.notify(`Removed story connection from selected object.`);
  }
}

const source = figma.currentPage.getPluginData('source');
if (!!source) {
  figma.ui.postMessage({type: 'assignSource', source});
}
