var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

var Krumelux = {
  version: "0.0.1",
  vTrees: {}
};

Krumelux.initialize = function(element) {
  if (!element.id) { throw "Krumelux.initialize: element most have id defined"; }
  Krumelux.vTrees[element.id] = convertHTML(element.outerHTML.trim());
};

Krumelux.applyDiffFromHTMLString = function(htmlString, targetElement) {
  var replacementVtree = convertHTML(htmlString.trim());
  var patches = diff(Krumelux.vTrees[targetElement.id], replacementVtree);
  targetElement = patch(targetElement, patches);
  Krumelux.vTrees[targetElement.id] = replacementVtree;
};

module.exports = global.Krumelux = Krumelux
