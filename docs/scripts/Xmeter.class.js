var Xmeter = (function () {
  function Xmeter() {}
  Xmeter.PAGES = [
    {
      name: 'Pattern Library', url: 'index.html'
    , description: ''
    }
  , {
      name: 'Visual Design', url: 'visual.html'
    , description: 'Color and font schemes, look-and-feel, overall mood and tone.'
    , is_hidden: true
    }
  , {
      name: 'Base Typography', url: 'base.html'
    , description: 'Bare, unstyled HTML elements. No classes.'
    , sub: [
        { name: 'Table of Contents'    , url: 'base.html#table-contents' }
      , { name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }
      , { name: 'Lists'                , url: 'base.html#lists' }
      , { name: 'Tables'               , url: 'base.html#tables' }
      , {
          name: 'Text-Level Elements', url: '#text-level-elements'
        , sub: [
            { name: 'Links'        , url: 'base.html#links' }
          , { name: 'Stress'       , url: 'base.html#stress' }
          , { name: 'Documentation', url: 'base.html#documentation' }
          , { name: 'Data'         , url: 'base.html#data' }
          ]
        }
      , { name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }
      , { name: 'Forms'               , url: 'base.html#forms' }
      , { name: 'Interactive Elements', url: 'base.html#interactive-elements' }
      ]
    }
  , {
      name: 'Objects', url: 'obj.html'
    , description: 'Patterns of structure that can be reused many times for many different purposes.'
    , sub: [
        { name: 'Table of Contents', url: 'obj.html#table-contents' }
      , { name: 'The List Object'  , url: 'obj.html#list-object' }
      , { name: 'The Flex Object'  , url: 'obj.html#flex-object' }
      , { name: 'The Grid Object'  , url: 'obj.html#grid-object' }
      ]
    }
  , {
      name: 'Components', url: 'comp.html'
    , description: 'Patterns of look-and-feel that are each only used for one purpose.'
    , is_hidden: true
    }
  , {
      name: 'Helpers', url: 'help.html'
    , description: 'Somewhat explicit classes used for enhancing default styles.'
    , sub: [
        { name: 'Table of Contents', url: 'help.html#table-contents' }
      , { name: 'Block'            , url: 'help.html#block' }
      , { name: 'Inline'           , url: 'help.html#inline' }
      , { name: 'Clearfix'         , url: 'help.html#cleafix' }
      ]
    }
  , {
      name: 'Atoms', url: 'atom.html'
    , description: 'Very specific classes used for creating anomalies or fixing broken styles.'
    , sub: [
        { name: 'Table of Contents', url: 'atom.html#table-contents' }
      , { name: 'margin-bottom'    , url: 'atom.html#margin-bottom' }
      , { name: 'padding-top'      , url: 'atom.html#padding-top' }
      ]
    }
  ]
  Xmeter.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  , form   : 'docs-form'
  }
  Xmeter.getPage = function getPage(url0) {
    return Xmeter.PAGES.find(function (item) { return item.url === url0 })
  }
  return Xmeter
})()
