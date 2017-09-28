const Page = require('sitepage').Page

const DOCS = new Page({ name: 'Xmeter Style Guide', url: '/docs/' })
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
