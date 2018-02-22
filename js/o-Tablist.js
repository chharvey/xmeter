////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////--- CHANGED DEPRECATED! Use `require('aria-patterns')` instead! ---////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


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
