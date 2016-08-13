// var
//     Page = require('./Page.class.js')

// TODO change classname to `StyleGuide`
var Styleguide = (function () {
  // CONSTRUCTOR
  function Styleguide(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self.was_initialized = false
  }
  Styleguide.prototype = Object.create(Page.prototype)
  Styleguide.prototype.constructor = Styleguide

  // METHODS
  Styleguide.prototype.init = function init() {
    var self = this
    if (!self.was_initialized) {
      self
        .addPage(new Page({ name: self.name, url: 'index.html' }))
        .addPage(new Page({ name: 'Visual Design', url: 'visual.html' })
          .setDescription('Color and font schemes, look-and-feel, overall voice and tone.')
        )
        .addPage(new Page({ name: 'Base Typography', url: 'base.html' })
          .setDescription('Bare, unstyled HTML elements. No classes.')
          .addPage(new Page({ name: 'Table of Contents'    , url: '#table-contents' }))
          .addPage(new Page({ name: 'Headings & Paragraphs', url: '#headings-paragraphs' }))
          .addPage(new Page({ name: 'Lists'                , url: '#lists' }))
          .addPage(new Page({ name: 'Tables'               , url: '#tables' }))
          .addPage(new Page({ name: 'Text-Level Elements'  , url: '#text-level-elements' })
            .addPage(new Page({ name: 'Links'        , url: '#links' }))
            .addPage(new Page({ name: 'Stress'       , url: '#stress' }))
            .addPage(new Page({ name: 'Documentation', url: '#documentation' }))
            .addPage(new Page({ name: 'Data'         , url: '#data' }))
          )
          .addPage(new Page({ name: 'Embedded Elements'   , url: '#embedded-elements' }))
          .addPage(new Page({ name: 'Forms'               , url: '#forms' }))
          .addPage(new Page({ name: 'Interactive Elements', url: '#interactive-elements' }))
        )
        .addPage(new Page({ name: 'Objects', url: 'obj.html' })
          .setDescription('Patterns of structure that can be reused many times for many different purposes.')
        )
        .addPage(new Page({ name: 'Components', url: 'comp.html' })
          .setDescription('Patterns of look-and-feel that are each only used for one purpose.')
        )
        .addPage(new Page({ name: 'Helpers', url: 'help.html' })
          .setDescription('Somewhat explicit classes used for enhancing default styles.')
        )
        .addPage(new Page({ name: 'Atoms', url: 'atom.html' })
          .setDescription('Very specific classes used for creating anomalies or fixing broken styles.')
        )
        .was_initialized = true
    }
    return self
  }

  return Styleguide
})()
