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
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'The List Object'  , url: '#list-object' }))
      .addPage(new Page({ name: 'The Flex Object'  , url: '#flex-object' }))
      .addPage(new Page({ name: 'The Grid Object'  , url: '#grid-object' }))
    Xmeter.DOCS.getPage('comp.html')
      .hide()
    Xmeter.DOCS.getPage('help.html')
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'Block'            , url: '#block' }))
      .addPage(new Page({ name: 'Inline'           , url: '#inline' }))
      .addPage(new Page({ name: 'Clearfix'         , url: '#cleafix' }))
    Xmeter.DOCS.getPage('atom.html')
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'margin-bottom'    , url: '#margin-bottom' }))
      .addPage(new Page({ name: 'padding-top'      , url: '#padding-top' }))
  })()

  Xmeter.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  , form   : 'docs-form'
  }

  return Xmeter
})()
