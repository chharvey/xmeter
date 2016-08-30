// var Page = require('./Page.class.js')

// TODO change classname to `StyleGuide`
var Styleguide = (function () {
  // CONSTRUCTOR
  function StyleGuide(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._was_initialized = false
  }
  StyleGuide.prototype = Object.create(Page.prototype)
  StyleGuide.prototype.constructor = StyleGuide

  // ACCESSOR FUNCTIONS

  // METHODS
  StyleGuide.prototype.init = function init() {
    var self = this
    if (!self._was_initialized) {
      self._was_initialized = true
      return self
        .add(new Page({ name: self.getName(), url: 'index.html' })
          .setDescription(self.getDescription())
        )
        .add(new Page({ name: 'Visual Design', url: 'visual.html' })
          .setDescription('Color and font schemes, look-and-feel, overall voice and tone.')
        )
        .add(new Page({ name: 'Base Typography', url: 'base.html' })
          .setDescription('Bare, unstyled HTML elements. No classes.')
          .add(new Page({ name: 'Table of Contents'    , url: 'base.html#table-contents' }))
          .add(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
          .add(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
          .add(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
          .add(new Page({ name: 'Text-Level Elements'  , url: 'base.html#text-level-elements' })
            .add(new Page({ name: 'Links'        , url: 'base.html#links' }))
            .add(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
            .add(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
            .add(new Page({ name: 'Data'         , url: 'base.html#data' }))
          )
          .add(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
          .add(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
          .add(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
        )
        .add(new Page({ name: 'Objects', url: 'obj.html' })
          .setDescription('Patterns of structure that can be reused many times for many different purposes.')
        )
        .add(new Page({ name: 'Components', url: 'comp.html' })
          .setDescription('Patterns of look-and-feel that are each only used for one purpose.')
        )
        .add(new Page({ name: 'Helpers', url: 'help.html' })
          .setDescription('Somewhat explicit classes used for enhancing default styles.')
        )
        .add(new Page({ name: 'Atoms', url: 'atom.html' })
          .setDescription('Very specific classes used for creating anomalies or fixing broken styles.')
        )
    } else return
  }

  // STATIC MEMBERS

  return StyleGuide
})()
