var Page = require('sitepage').Page

const DOCS = new Page({ name: 'Xmeter Style Guide', url: '/docs/' })
  // REVIEW indentation
    .title('Xmeter Style Guide')
    .description('A demo of Xmeter styles.')
    .add(new Page({ name: 'Home', url: '/docs/index.html' })
      .description('Xmeter Homepage')
    )
    .add(new Page({ name: 'Base Typography', url: '/docs/base.html' })
      .description('Bare, unstyled HTML elements. No classes.')
      .add(new Page({ name: 'Grouping Elements', url: '/docs/base.html#grouping-elements' })
        .add(new Page({ name: 'Headings & Paragraphs', url: '/docs/base.html#headings-paragraphs' }))
        .add(new Page({ name: 'Lists'                , url: '/docs/base.html#lists' }))
        .add(new Page({ name: 'Tables'               , url: '/docs/base.html#tables' }))
      )
      .add(new Page({ name: 'Text-Level Elements', url: '/docs/base.html#text-level-elements' })
        .add(new Page({ name: 'Links'        , url: '/docs/base.html#links' }))
        .add(new Page({ name: 'Stress'       , url: '/docs/base.html#stress' }))
        .add(new Page({ name: 'Documentation', url: '/docs/base.html#documentation' }))
        .add(new Page({ name: 'Data'         , url: '/docs/base.html#data' }))
      )
      .add(new Page({ name: 'Forms'               , url: '/docs/base.html#forms' }))
      .add(new Page({ name: 'Embedded Elements'   , url: '/docs/base.html#embedded-elements' }))
      .add(new Page({ name: 'Interactive Elements', url: '/docs/base.html#interactive-elements' }))
    )
    .add(new Page({ name: 'Objects', url: '/docs/obj.html' })
      .description('Patterns of structure that can be reused many times for many different purposes.')
      .add(new Page({ name: 'The List Object'  , url: '/docs/obj.html#list-object' }))
      .add(new Page({ name: 'The Flex Object'  , url: '/docs/obj.html#flex-object' }))
      .add(new Page({ name: 'The Grid Object'  , url: '/docs/obj.html#grid-object' }))
    )
    .add(new Page({ name: 'Components', url: '/docs/comp.html' })
      .description('Patterns of look-and-feel that are each only used for one purpose.')
      .add(new Page({ name: 'The Permalink', url: '/docs/comp.html#permalink' }))
    )
    .add(new Page({ name: 'Helpers', url: '/docs/help.html' })
      .description('Somewhat explicit classes used for enhancing default styles.')
      .add(new Page({ name: 'Block'            , url: '/docs/help.html#block' }))
      .add(new Page({ name: 'Inline'           , url: '/docs/help.html#inline' }))
      .add(new Page({ name: 'Clearfix'         , url: '/docs/help.html#clearfix' }))
      .add(new Page({ name: 'Hidden'           , url: '/docs/help.html#hidden' }))
    )
    .add(new Page({ name: 'Atoms', url: '/docs/atom.html' })
      .description('Very specific classes used for creating anomalies or fixing broken styles.')
      .add(new Page({ name: 'font-size'        , url: '/docs/atom.html#font-size' }))
    )

/**
 * Static class for this project’s docs.
 * @module
 */
module.exports = class Docs {
  /** @private */ constructor() {}

  /**
   * The style guide site for this project.
   * @type {Page}
   */
  static get DOCS() { return DOCS }
}
