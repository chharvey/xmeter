module.exports = (function () {
  // CONSTRUCTOR
  function Page($pageinfo) {
    var self = this
    $pageinfo = $pageinfo || {} // NOTE constructor overloading
    self._name = $pageinfo.name
    self._url  = $pageinfo.url
    self.title       = ''
    self.description = ''
    self.keywords    = null
    self.is_hidden   = false
    self.pages       = []
  }

  // ACCESSOR FUNCTIONS
  Page.prototype.getName = function getName() {
    return this._name
  }

  Page.prototype.getURL = function getURL() {
    return this._url
  }

  Page.prototype.getTitle = function getTitle() {
    return this.title
  }
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

  Page.prototype.getDescription = function getDescription() {
    return this.description
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

  Page.prototype.getKeywords = function getKeywords() {
    return this.keywords.slice()
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

  Page.prototype.isHidden = function isHidden() {
    return this.is_hidden
  }
  Page.prototype.hide = function hide(bool) {
    // NOTE method overloading // param defaults to true
    this.is_hidden = (bool === undefined) ? true : bool
    return this
  }

  // METHODS
  Page.prototype.add = function add($page) {
    this.pages.push($page)
    return this
  }
  Page.prototype.remove = function remove(arg) {
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
  Page.prototype.removeAll = function removeAll() {
    this.pages = []
    return this
  }
  Page.prototype.find = function find(url) {
    return this.pages.find(function (item) { return item._url === url })
      || (function (self) {
        var ancestor = self.pages.find(function (item) { return item.find(url) })
        return (ancestor) ? ancestor.find(url) : null
      })(this)
  }
  Page.prototype.findAll = function findAll() {
    return this.pages.slice()
  }

  // STATIC MEMBERS

  return Page
})()
