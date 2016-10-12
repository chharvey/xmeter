var Page = require('sitepage').Page

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
    var docs = new Page({ name: 'Xmeter', url: '/docs/' })
      .title('Xmeter Style Guide')
      .description('A demo of Xmeter styles.')
    ;(function (self) {
      self
        .add(new Page({ name: self.name(), url: 'index.html' })
          .description(self.description())
        )
        .add(new Page({ name: 'Base Typography', url: 'base.html' })
          .description('Bare, unstyled HTML elements. No classes.')
          .add(new Page({ name: 'Grouping Elements', url: 'base.html#grouping-elements' })
            .add(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
            .add(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
            .add(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
          )
          .add(new Page({ name: 'Text-Level Elements', url: 'base.html#text-level-elements' })
            .add(new Page({ name: 'Links'        , url: 'base.html#links' }))
            .add(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
            .add(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
            .add(new Page({ name: 'Data'         , url: 'base.html#data' }))
          )
          .add(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
          .add(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
          .add(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
        )
        .add(new Page({ name: 'Objects', url: 'obj.html' })
          .description('Patterns of structure that can be reused many times for many different purposes.')
          .add(new Page({ name: 'The List Object'  , url: 'obj.html#list-object' }))
          .add(new Page({ name: 'The Flex Object'  , url: 'obj.html#flex-object' }))
          .add(new Page({ name: 'The Grid Object'  , url: 'obj.html#grid-object' }))
        )
        .add(new Page({ name: 'Helpers', url: 'help.html' })
          .description('Somewhat explicit classes used for enhancing default styles.')
          .add(new Page({ name: 'Block'            , url: 'help.html#block' }))
          .add(new Page({ name: 'Inline'           , url: 'help.html#inline' }))
          .add(new Page({ name: 'Clearfix'         , url: 'help.html#cleafix' }))
        )
        .add(new Page({ name: 'Atoms', url: 'atom.html' })
          .description('Very specific classes used for creating anomalies or fixing broken styles.')
          .add(new Page({ name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }))
          .add(new Page({ name: 'padding-top'      , url: 'atom.html#padding-top' }))
          .add(new Page({ name: 'font-size'        , url: 'atom.html#font-size' }))
        )
    })(docs)
    return docs
  })()

  return Xmeter
})()
