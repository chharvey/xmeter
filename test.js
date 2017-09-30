let Xmeter = require('./class/Xmeter.class.js')

let my_data = { id: 'my_id' }
console.log(Xmeter.view) // [Function: view]
console.log(Xmeter.view(my_data)) // { peramlink: [Function: peramlink] }
console.log(Xmeter.view(my_data).permalink()) // <a class="c-Permalink h-Inline h-Hidden" href="#my_id" aria-label="permalink">&sect;</a>
