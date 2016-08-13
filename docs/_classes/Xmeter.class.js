var Xmeter = (function () {
  // CONSTRUCTOR
  function Xmeter() {
    var self = this
    Styleguide.call(self, 'Xmeter', '/docs/' )
    Styleguide.prototype.setTitle.call(self, 'Xmeter Style Guide')
  }
  Xmeter.prototype = Object.create(Styleguide.prototype)
  Xmeter.prototype.constructor = Xmeter

  // METHODS
  Xmeter.prototype.init = function init() {
    var self = this
    Styleguide.prototype.init.call(self)
    self.getPage('visual.html').hide()
    self.getPage('obj.html')
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'The List Object'  , url: '#list-object' }))
      .addPage(new Page({ name: 'The Flex Object'  , url: '#flex-object' }))
      .addPage(new Page({ name: 'The Grid Object'  , url: '#grid-object' }))
    self.getPage('comp.html').hide()
    self.getPage('help.html')
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'Block'            , url: '#block' }))
      .addPage(new Page({ name: 'Inline'           , url: '#inline' }))
      .addPage(new Page({ name: 'Clearfix'         , url: '#cleafix' }))
    self.getPage('atom.html')
      .addPage(new Page({ name: 'Table of Contents', url: '#table-contents' }))
      .addPage(new Page({ name: 'margin-bottom'    , url: '#margin-bottom' }))
      .addPage(new Page({ name: 'padding-top'      , url: '#padding-top' }))
    return self
  }

  // STATIC MEMBERS
  Xmeter.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  , form   : 'docs-form'
  }

  return Xmeter
})()
