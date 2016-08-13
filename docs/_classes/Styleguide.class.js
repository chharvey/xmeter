// var
//     Page = require('./Page.class.js')

var Styleguide = (function () {
  // CONSTRUCTOR
  function Styleguide(name, url) {
    var self = this
    Page.call(self, {name: name, url: url})
    ;(function () {
      // adding pages to self.pages
      Page.prototype.addPage.call(self, new Page({ name: 'Pattern Library', url: 'index.html' }))
      Page.prototype.addPage.call(self, new Page({ name: 'Visual Design', url: 'visual.html' })
        .setDescription('Color and font schemes, look-and-feel, overall voice and tone.')
        .hide()
      )
      Page.prototype.addPage.call(self, new Page({ name: 'Base Typography', url: 'base.html' })
        .setDescription('Bare, unstyled HTML elements. No classes.')
        .addPage(new Page({ name: 'Table of Contents'    , url: 'base.html#table-contents' }))
        .addPage(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
        .addPage(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
        .addPage(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
        .addPage(new Page({ name: 'Text-Level Elements'  , url: '#text-level-elements' })
          .addPage(new Page({ name: 'Links'        , url: 'base.html#links' }))
          .addPage(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
          .addPage(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
          .addPage(new Page({ name: 'Data'         , url: 'base.html#data' }))
        )
        .addPage(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
        .addPage(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
        .addPage(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
      )
      Page.prototype.addPage.call(self, new Page({ name: 'Objects', url: 'obj.html' })
        .setDescription('Patterns of structure that can be reused many times for many different purposes.')
        .addPage(new Page({ name: 'Table of Contents', url: 'obj.html#table-contents' }))
        .addPage(new Page({ name: 'The List Object'  , url: 'obj.html#list-object' }))
        .addPage(new Page({ name: 'The Flex Object'  , url: 'obj.html#flex-object' }))
        .addPage(new Page({ name: 'The Grid Object'  , url: 'obj.html#grid-object' }))
      )
      Page.prototype.addPage.call(self, new Page({ name: 'Components', url: 'comp.html' })
        .setDescription('Patterns of look-and-feel that are each only used for one purpose.')
        .hide()
      )
      Page.prototype.addPage.call(self, new Page({ name: 'Helpers', url: 'help.html' })
        .setDescription('Somewhat explicit classes used for enhancing default styles.')
        .addPage(new Page({ name: 'Table of Contents', url: 'help.html#table-contents' }))
        .addPage(new Page({ name: 'Block'            , url: 'help.html#block' }))
        .addPage(new Page({ name: 'Inline'           , url: 'help.html#inline' }))
        .addPage(new Page({ name: 'Clearfix'         , url: 'help.html#cleafix' }))
      )
      Page.prototype.addPage.call(self, new Page({ name: 'Atoms', url: 'atom.html' })
        .setDescription('Very specific classes used for creating anomalies or fixing broken styles.')
        .addPage(new Page({ name: 'Table of Contents', url: 'atom.html#table-contents' }))
        .addPage(new Page({ name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }))
        .addPage(new Page({ name: 'padding-top'      , url: 'atom.html#padding-top' }))
      )
    })()
  }
  Styleguide.prototype = Object.create(Page.prototype)
  Styleguide.prototype.constructor = Styleguide
  return Styleguide
})()
