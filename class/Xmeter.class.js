const path = require('path')

const View = require('extrajs-view')
const xjs = require('extrajs-dom')
const ARIAPatterns = require('aria-patterns')

/**
 * Static members for the Xmeter package.
 * @namespace
 */
class Xmeter {
  /** @private */ constructor() {}

  /**
   * @summary Render any data in HTML.
   * @see Xmeter.VIEW
   * @deprecated Will be removed in Version 7.
   * @param   {*} data any data to render
   * @returns {View}
   */
  static view(data) {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Xmeter.view(data).permalink()` - display a permalink
     * @namespace Xmeter.VIEW
     * @deprecated Will be removed in Version 7.
     * @type {View}
     */
    return new View(null, data)
      /**
       * Return an `<a.Permlink>` element.
       * Parameter `data` should be of type `{id:string}` (an object with a string `id` property).
       * @summary Call `Xmeter.view(data).permalink()` to render this display.
       * @function Xmeter.VIEW.permalink
       * @version DEPRECATED
       * @deprecated YES. Moved to {@link https://github.com/chharvey/aria-patterns}
       * @param   {string=} content the text of the link
       * @param   {string=} label the value for `[aria-label]` attribute
       * @returns {string} HTML output
       */
      .addDisplay(function permalink(content = '&sect;', label = 'permalink') {
        return new xjs.DocumentFragment(ARIAPatterns.xPermalink.render({
          id: this.id,
          label: label,
          text: content,
        })).innerHTML()
      })
  }
}

module.exports = Xmeter
