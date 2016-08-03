var Page = (function () {
  // CONSTRUCTOR
  function Page($pageinfo) {
    var self = this
    $pageinfo = $pageinfo || {}
    self.name = $pageinfo.name
    self.url  = $pageinfo.url
    self.title       = ''
    self.description = ''
    self.keywords    = null
    self.is_hidden   = false
    self.pages       = []
  }

  // SETTER FUNCTIONS
  Page.prototype.setTitle = function setTitle(arg) {
    var text
    if (typeof arg === 'function') {
      text = arg.call(this)
    } else {
      text = arg
    }
    this.title = text
    return this
  }
  Page.prototype.setDescription = function setDescription(arg) {
    var text
    if (typeof arg === 'function') {
      text = arg.call(this)
    } else {
      text = arg
    }
    this.description = text
    return this
  }
  Page.prototype.setKeywords = function setKeywords(arg) {
    var arr
    if (typeof arg === 'function') {
      arr = arg.call(this)
    } else {
      arr = arg
    }
    this.keywords = arr
    return this
  }
  Page.prototype.hide = function hide(bool) {
    // NOTE method overloading // param defaults to true
    this.is_hidden = (bool === undefined) ? true : bool
    return this
  }
  Page.prototype.addPage = function addPage($page) {
    this.pages.push($page)
    return this
  }
  Page.prototype.removePage = function removePage(arg) {
    var page
    if (typeof arg === 'function') {
      page = arg.call(this)
    } else if (typeof arg === 'string') {
      page = this.getPage(arg)
    } else {
      page = arg
    }
    var index = this.pages.indexOf(page)
    if (index >= 0) this.pages.splice(index, 1)
    return this
  }

  // GETTER FUNCTIONS
  Page.prototype.getName = function getName() {
    return this.name
  }
  Page.prototype.getURL = function getURL() {
    return this.url
  }
  Page.prototype.getTitle = function getTitle() {
    return this.title
  }
  Page.prototype.getDescription = function getDescription() {
    return this.description
  }
  Page.prototype.getKeywords = function getKeywords() {
    return this.keywords.slice()
  }
  Page.prototype.isHidden = function isHidden() {
    return this.is_hidden
  }
  Page.prototype.getPage = function getPage(url) {
    return this.pages.find(function (item) { return item.url === url }) || null
  }
  Page.prototype.getPagesAll = function getPagesAll() {
    return this.pages.slice()
  }

  // METHODS
  Page.prototype.findPage = function findPage(url) {
    return this.getPage(url)
      || (function (self) {
        var ancestor = self.pages.find(function (item) { return item.findPage(url) })
        return (ancestor) ? ancestor.findPage(url) : null
      })(this)
  }

  // STATIC MEMBERS

  return Page
})()
