const Element = require('extrajs-element')

/**
 * A set of static members used for the site.
 * Similar to a utility class.
 * @module Xmeter
 */
module.exports = class Xmeter {
  /** @private */ constructor() {}

  /**
   * Render any data in HTML.
   * Displays:
   * - `Xmeter.view(data)()` - Error: no default display
   * - `Xmeter.view(data).permalink()` - display a permalink
   * @param   {*} data any data to render
   * @returns {function(?):string} a function returning HTML output
   */
  static view(data) {
    /**
     * @private
     * @throws {Error} if no display has been chosen
     */
    function returned() { throw new Error('Please select a display: Xmeter.view(data)[display](...args)') }
    /**
     * Return an <a.Permlink> element.
     * Call `Xmeter.view(data).permalink()` to render this display.
     * @memberof Xmeter.view
     * @param  {string=} content the text of the link
     * @param  {string=} label the value for `[aria-label]` attribute
     * @returns {string} HTML output
     */
    returned.permalink = function (content = '&sect;', label = 'permalink') {
      return new Element('a').class('c-Permalink h-Inline h-Hidden')
        .attr({ href: data.id, 'aria-label': label })
        .addContent(content)
        .html()
    }
    return returned
  }
}
