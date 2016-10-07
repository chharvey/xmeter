var Page = require('sitepage').Page

/**
 * A StyleGuide object has a name and url, and a set of preset pages.
 * @type {StyleGuide}
 * @extends Page
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a StyleGuide object, given a name and url.
   * @constructor
   * @param {string} name the name of this styleguide
   * @param {string} url  the url of the landing page of this styleguide
   */
  function StyleGuide(name, url) {
    Page.call(this, { name: name, url: url })
  }
  StyleGuide.prototype = Object.create(Page.prototype)
  StyleGuide.prototype.constructor = StyleGuide

  // ACCESSOR FUNCTIONS

  // METHODS

  // STATIC MEMBERS

  return StyleGuide
})()
