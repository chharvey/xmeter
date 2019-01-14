var interactive = document.querySelector('#kssref-base-interactive-elements')
var dialog = interactive.querySelector('dialog')
interactive.querySelector('button[name="dialog-open"]').addEventListener('click', function (_e) {
	dialog.showModal()
})
dialog.querySelector('button[name="dialog-close"]').addEventListener('click', function (_e) {
	dialog.close('some result')
	// access result with `dialog.returnValue`
})
