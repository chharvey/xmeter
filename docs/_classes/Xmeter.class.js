// var Styleguide = require('../_classes/Styleguide.class.js')

var Xmeter = (function () {
  // CONSTRUCTOR
  function Xmeter() {
  }

  // METHODS

  // STATIC MEMBERS
  Xmeter.DOCS = new Styleguide('Xmeter', '/docs/')
    .setTitle('Xmeter Style Guide')
    .init()
  ;(function () {
    // adding pages to Xmeter.DOCS
    Xmeter.DOCS.getPage('visual.html')
      .hide()
    Xmeter.DOCS.getPage('obj.html')
      .addPage(new Page({ name: 'Table of Contents', url: 'obj.html#table-contents' }))
      .addPage(new Page({ name: 'The List Object'  , url: 'obj.html#list-object' }))
      .addPage(new Page({ name: 'The Flex Object'  , url: 'obj.html#flex-object' }))
      .addPage(new Page({ name: 'The Grid Object'  , url: 'obj.html#grid-object' }))
    Xmeter.DOCS.getPage('comp.html')
      .hide()
    Xmeter.DOCS.getPage('help.html')
      .addPage(new Page({ name: 'Table of Contents', url: 'help.html#table-contents' }))
      .addPage(new Page({ name: 'Block'            , url: 'help.html#block' }))
      .addPage(new Page({ name: 'Inline'           , url: 'help.html#inline' }))
      .addPage(new Page({ name: 'Clearfix'         , url: 'help.html#cleafix' }))
    Xmeter.DOCS.getPage('atom.html')
      .addPage(new Page({ name: 'Table of Contents', url: 'atom.html#table-contents' }))
      .addPage(new Page({ name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }))
      .addPage(new Page({ name: 'padding-top'      , url: 'atom.html#padding-top' }))
  })()

  Xmeter.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  , form   : 'docs-form'
  }

  return Xmeter
})()
