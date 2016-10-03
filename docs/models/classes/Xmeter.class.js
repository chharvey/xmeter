var Page = require('sitepage').Page
var StyleGuide = require('sitepage').StyleGuide

module.exports = (function () {
  // CONSTRUCTOR
  function Xmeter() {}

  // METHODS

  // STATIC MEMBERS
  /**
   * The style guide site for this project.
   * @type {StyleGuide}
   */
  Xmeter.DOCS = (function () {
    var docs = new StyleGuide('Xmeter', '/docs/')
      .title('Xmeter Style Guide')
      .description('A demo of Xmeter styles.')
      .init()
    docs.find('visual.html')
      .hide()
    docs.find('obj.html')
      .add(new Page({ name: 'Table of Contents', url: 'obj.html#table-contents' }))
      .add(new Page({ name: 'The List Object'  , url: 'obj.html#list-object' }))
      .add(new Page({ name: 'The Flex Object'  , url: 'obj.html#flex-object' }))
      .add(new Page({ name: 'The Grid Object'  , url: 'obj.html#grid-object' }))
    docs.find('comp.html')
      .hide()
    docs.find('help.html')
      .add(new Page({ name: 'Table of Contents', url: 'help.html#table-contents' }))
      .add(new Page({ name: 'Block'            , url: 'help.html#block' }))
      .add(new Page({ name: 'Inline'           , url: 'help.html#inline' }))
      .add(new Page({ name: 'Clearfix'         , url: 'help.html#cleafix' }))
    docs.find('atom.html')
      .add(new Page({ name: 'Table of Contents', url: 'atom.html#table-contents' }))
      .add(new Page({ name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }))
      .add(new Page({ name: 'padding-top'      , url: 'atom.html#padding-top' }))
      .add(new Page({ name: 'font-size'        , url: 'atom.html#font-size' }))
    return docs
  })()

  return Xmeter
})()
