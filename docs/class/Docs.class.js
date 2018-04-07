const Page = require('sitepage').Page

const DOCS = new Page({ name: 'Xmeter Style Guide', url: '/docs/' })
  .title('Xmeter Style Guide')
  .description('A demo of Xmeter styles.')

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
