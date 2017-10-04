const Element = require('extrajs-dom').Element
const View = require('./View.class.js')

/**
 * Static members for the Xmeter package.
 * @namespace
 */
class Xmeter {
  /** @private */ constructor() {}

  /**
   * @summary Render any data in HTML.
   * @see Xmeter.VIEW
   * @param   {*} data any data to render
   * @returns {View}
   */
  static view(data) {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Xmeter.view(data).permalink()` - display a permalink
     * @namespace Xmeter.VIEW
     * @type {View}
     */
    return new View(null, data)
      /**
       * Return an `<a.Permlink>` element.
       * @summary Call `Xmeter.view(data).permalink()` to render this display.
       * @function Xmeter.VIEW.permalink
       * @version STABLE
       * @param   {string=} content the text of the link
       * @param   {string=} label the value for `[aria-label]` attribute
       * @returns {string} HTML output
       */
      .addDisplay(function permalink(content = '&sect;', label = 'permalink') {
        return new Element('a').class('c-Permalink h-Inline h-Hidden')
          .attr({ href: `#${this.id}`, 'aria-label': label })
          .addContent(content)
          .html()
      })
  }
}

module.exports = Xmeter
