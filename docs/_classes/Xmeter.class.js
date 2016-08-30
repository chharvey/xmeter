// var Styleguide = require('../_classes/Styleguide.class.js')

var Xmeter = (function () {
  // CONSTRUCTOR
  function Xmeter() {}

  // METHODS

  // STATIC MEMBERS
  Xmeter.DOCS = new Styleguide('Xmeter', '/docs/')
    .setTitle('Xmeter Style Guide')
    .setDescription('A demo of Xmeter styles.')
    .init()
  ;(function () {
    // adding pages to Xmeter.DOCS
    Xmeter.DOCS.find('visual.html')
      .hide()
    Xmeter.DOCS.find('obj.html')
      .add(new Page({ name: 'Table of Contents', url: 'obj.html#table-contents' }))
      .add(new Page({ name: 'The List Object'  , url: 'obj.html#list-object' }))
      .add(new Page({ name: 'The Flex Object'  , url: 'obj.html#flex-object' }))
      .add(new Page({ name: 'The Grid Object'  , url: 'obj.html#grid-object' }))
    Xmeter.DOCS.find('comp.html')
      .hide()
    Xmeter.DOCS.find('help.html')
      .add(new Page({ name: 'Table of Contents', url: 'help.html#table-contents' }))
      .add(new Page({ name: 'Block'            , url: 'help.html#block' }))
      .add(new Page({ name: 'Inline'           , url: 'help.html#inline' }))
      .add(new Page({ name: 'Clearfix'         , url: 'help.html#cleafix' }))
    Xmeter.DOCS.find('atom.html')
      .add(new Page({ name: 'Table of Contents', url: 'atom.html#table-contents' }))
      .add(new Page({ name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }))
      .add(new Page({ name: 'padding-top'      , url: 'atom.html#padding-top' }))
      .add(new Page({ name: 'font-size'        , url: 'atom.html#font-size' }))
  })()

  Xmeter.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  , form   : 'docs-form'
  }

  return Xmeter
})()
