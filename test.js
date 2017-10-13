let Xmeter = require('./class/Xmeter.class.js')

let my_data = { id: 'my_id' }
console.log(Xmeter.view) // [Function: view]
console.log(Xmeter.view(my_data)) // View { [Function: ...], _DATA: ..., permalink: ... }
try {
  console.log(Xmeter.view(my_data)()) // ReferenceError
} catch (e) {
  console.log(`An Error was caught:\t${e}`)
}
console.log(Xmeter.view(my_data).permalink()) // <a class="c-Permalink h-Inline h-Hidden" href="#my_id" aria-label="permalink">&sect;</a>
console.log(Xmeter.view(my_data).permalink('custom content', 'custom label')) // <a class="c-Permalink h-Inline h-Hidden" href="#my_id" aria-label="custom label">custom content</a>
