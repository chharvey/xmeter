let interactive = document.querySelector('#interactive-elements')
let dialog = interactive.querySelector('dialog')
interactive.querySelector('button[name="dialog-open"]').addEventListener('click', function (e) {
  dialog.showModal()
})
dialog.querySelector('button[name="dialog-close"]').addEventListener('click', function (e) {
  dialog.close('some result')
  // access result with `dialog.returnValue`
})
