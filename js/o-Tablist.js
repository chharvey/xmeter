(function TablistObject($) {
  /**
   * Update tab and panel accessibilty on input change.
   */
  function update() {
    // set the `[aria-selected]` attribute and `.o-Tablist__Tab--js-selected` class
    $(this).parents('.o-Tablist').find('.o-Tablist__Tab')
      .removeClass('o-Tablist__Tab--js-selected')
      .attr('aria-selected',false)
    $(this).parents('.o-Tablist__Tab')
      .addClass('o-Tablist__Tab--js-selected')
      .attr('aria-selected',true)

    // set the `[hidden]` attribute and `.o-Tablist__Panel--js-selected` class
    $(this).parents('.o-Tablist').find('.o-Tablist__Panel')
      .removeClass('o-Tablist__Panel--js-selected')
      .attr('hidden','')
    $(this).parents('.o-Tablist__Tab').next('.o-Tablist__Panel')
      .addClass('o-Tablist__Panel--js-selected')
      .removeAttr('hidden')
  }


  $('.o-Tablist__Check:checked').each(update)
  $('.o-Tablist__Check').change(update)
})(jQuery)










/**
 * A list of tab-panel pairs, wherein all tabs and at most one panel are exposed to the user.
 * @class
 */
document.querySelectorAll('.dev[role="tablist"]').forEach(function (tablist) {
  /**
   * Runs immediately.
   * @constructor
   */
  ;(function constructor() {
    /**
     * The set of panels.
     * @return {Array<HTMLDetailsElement>}
     */
    this.panels = function () { return Array.from(this.children).filter((el) => el.matches('[role="tabpanel"]')) }

    /**
     * Move the tabs (<summary>) outside of the panels (<details>), into the tablist.
     */
    this.panels().forEach(function (panel) {

      let tab = document.createElement('div')
      let summary = panel.querySelector('summary')

      // transfer the attributes
      Array.from(summary.attributes).forEach(function (attr) {
        summary.attributes.removeNamedItem(attr.name)
        tab.attributes.setNamedItem(attr)
      })

      // transfer the children
      tab.append(...summary.childNodes)

      summary.hidden = true

      this.insertBefore(tab, panel)
    }, this)

    /**
     * The set of tabs.
     * @return {Array<HTMLDivElement>}
     */
    this.tabs = function () { return Array.from(this.children).filter((el) => el.matches('[role="tab"]')) }
  }).call(tablist)


  /**
   * Update any children and shadow dom view of this element.
   */
  tablist.updateRendering = function () {
    // Expand the first panel if this tab list contains all collapsed panels.
    let no_panels_open = this.panels()[0] && !this.panels().find((el) => el.open)
    if (no_panels_open) {
      switchTabs(null, this.panels()[0])
    }
  }



  /**
   * A tab in a tab list.
   * @inner
   * @class
   */
  tablist.tabs().forEach(function (tab) {
    /**
     * Runs immediately.
     * @constructor
     */
    ;(function constructor() {
      /**
       * The panel that this tab controls.
       * @private
       * @type {CustomTabpanel}
       */
      this._panel = this.nextElementSibling

      this.id = `tab-for-${this._panel.id}`
      this.setAttribute('aria-controls', this._panel.id)
      this.tabIndex = 0

      this.addEventListener('click', function (e) {
        if (this.parentNode && this.parentNode.matches('[role="tablist"]')) {
          switchTabs(null, this)
        }
      })

      this.addEventListener('keydown', function (e) {
        /**
         * Key codes.
         * @enum {number}
         */
        const Keys = {
          SPACE: 32,
          END  : 35,
          HOME : 36,
          LEFT : 37,
          UP   : 38,
          RIGHT: 39,
          DOWN : 40,
        }
        switch (e.which) {
          case Keys.SPACE:
            e.preventDefault()
            switchTabs(null, this)
            break;
          case Keys.DOWN:
          case Keys.RIGHT:
            e.preventDefault()
            let next_tab_index = this.parentNode.tabs().findIndex((tab) => tab===this) + 1
            switchTabs(this, this.parentNode.tabs()[
              (next_tab_index < this.parentNode.tabs().length) ? next_tab_index : 0
            ])
            break;
          case Keys.UP:
          case Keys.LEFT:
            e.preventDefault()
            let prev_tab_index = this.parentNode.tabs().findIndex((tab) => tab===this) - 1
            switchTabs(this, this.parentNode.tabs()[
              (prev_tab_index >= 0) ? prev_tab_index : this.parentNode.tabs().length - 1
            ])
            break;
          case Keys.HOME:
            e.preventDefault()
            switchTabs(this, this.parentNode.tabs()[0])
            break;
          case Keys.END:
            e.preventDefault()
            switchTabs(this, this.parentNode.tabs()[this.parentNode.tabs().length - 1])
            break;
        }
      })

      // **CLOSE BUTTONS**
      // if (this.querySelector('button[value="close"]')) {
      //   this.querySelector('button[value="close"]').addEventListener('click', function (e) {
      //     this._panel.remove()
      //     this.remove()
      //     tablist._updateRendering()
      //   })
      // }
    }).call(tab)


    /**
     * The panel that this tab controls. Getter.
     * @type {CustomTabpanel}
     */
    tab.panel = function () {
      return this._panel
    }


    /**
     * Switch to a new tab.
     * @static
     * @param   {?HTMLElement} tab_old the tab currently expanded, or `null` if no tab is expanded (or it doesn’t matter which tab is expanded)
     * @param   {HTMLElement} tab_new the tab to expand
     */
    function switchTabs(tab_old, tab_new) {
      tab_new.focus()
      tab_new.panel().open = true
      tab_new.panel().attributeChangedCallback('open', null, '')
    }
  })



  /**
   * A panel in a tab list.
   * @inner
   * @class
   */
  tablist.panels().forEach(function (panel) {
    /**
     * Runs immediately.
     * @constructor
     */
    ;(function constructor() {
      /**
       * The tab that controls this panel.
       * @private
       * @type {CustomTab}
       */
      this._tab = this.previousElementSibling

      this.setAttribute('aria-labelledby', this._tab.id)
    }).call(panel)


    /**
     * Update any children and shadow dom view of this element.
     * @private
     */
    panel._updateRendering = function () {
      this.hidden = !this.open // hide from screen readers & disabled tab-able items
      this._tab.setAttribute('aria-selected', this.open)
      this._tab.setAttribute('aria-expanded', this.open)
      this.parentNode.updateRendering()
    }


    /**
     * @override HTMLElement#attributeChangedCallback
     * @param   {string} name the local name of the attriute changed
     * @param   {string} oldValue the attribute’s old value, or `null` if it had none
     * @param   {string} newValue the new value to which to set the attribute, or `null` if it is removed
     */
    panel.attributeChangedCallback = function (name, oldValue, newValue) {
      const returned = {
        'open': function (oldValue, newValue) {
          if (newValue === '') {
            // If setting the `open` attribute, collapse all panels not === to this one.
            this.parentNode.panels().forEach(function (p) {
              if (p !== this) {
                p.open = false // HTMLDetailsElement#open is a setter/getter
                p.attributeChangedCallback('open', null, null)
                p._updateRendering()
              }
            }, this)
          }
          this._updateRendering()
        },
        default(oldValue, newValue) {},
      }
      ;(returned[name] || returned.default).call(this, oldValue, newValue)
    }


    /**
     * The tab that controls this panel. Getter.
     * @type {CustomTab}
     */
    panel.tab = function () {
      return this._tab
    }
  })



  // initial rendering on load (would be in Tablist constructor, but depends on Tab and Panel instance methods)
  ;(function () {
    this.updateRendering()
    this.panels().find((el) => el.open).attributeChangedCallback('open', null, '')
  }).call(tablist)
})


// **CLOSE BUTTONS**
// document.querySelector('#update > button').addEventListener('click', function () {
//   console.log(document.querySelector('[role="tablist"]').tabs())
//   document.querySelector('[role="tablist"]').panels()[0].open = false
// })
