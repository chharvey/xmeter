const Element = require('extrajs-dom').Element

/**
 * Static members for the Xmeter package.
 * @namespace
 */
class Xmeter {
  /** @private */ constructor() {}

  /**
   * Render any data in HTML.
   * Displays:
   * - `Xmeter.view(data).permalink()` - display a permalink
   * @param   {*} data any data to render
   * @returns {Xmeter.View} a function returning HTML output
   */
  static view(data) {
    /**
     * @namespace Xmeter.View
     */
    return {
      /**
       * Return an <a.Permlink> element.
       * Call `Xmeter.view(data).permalink()` to render this display.
       * @memberof Xmeter.View
       * @param   {string=} content the text of the link
       * @param   {string=} label the value for `[aria-label]` attribute
       * @returns {string} HTML output
       */
      permalink(content = '&sect;', label = 'permalink') {
        return new Element('a').class('c-Permalink h-Inline h-Hidden')
          .attr({ href: data.id, 'aria-label': label })
          .addContent(content)
          .html()
      },
    }
  }
}

module.exports = Xmeter
