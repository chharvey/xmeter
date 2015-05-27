# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced "Cross Meter".

## Installation and Usage

There are 2 ways you can use this package. One option is if you’re
developing your own front-end package (such as a CSS library) that *uses* this
package as a dependency, and the other option is if you’re deploying
a project (such as a website or app) that *mentions* (i.e., references) this stylesheet.

This package uses **normalize.css** as a dependency.
If you’re *developing* a package, then it is automatically installed,
but if you’re *deploying* a project, you have to install it manually.

**Important:** `xmeter.css` does *not* `@import normalize.css`
(*this may change in the future—stay tuned for updates*).
In order for it to work properly on your page,
you *must* link **normalize.css** in your CSS / HTML *before* linking this stylesheet.

### Development

(The First Option)

To install:

    $ npm install xmeter

To use this stylesheet (and its mixins) in your own Less project:

```less
@import url('/node_modules/xmeter/node_modules/normalize.css/normalize.css');
@import url('/node_modules/xmeter/src/xmeter.less');
```

Or if you don’t want to concatenate stylesheets:

```less
@import url('/node_modules/xmeter/node_modules/normalize.css/normalize.css');
@import url('/node_modules/xmeter/xmeter.css');
@import (reference) url('/node_modules/xmeter/src/xmeter.less');
```

This package also comes installed with a [test page](./test.html)
that links to the main stylesheet.

### Deployment

(The Second Option)

To install:

    $ bower install https://github.com/chharvey/xmeter.git
    $ bower install normalize.css

To reference this stylesheet on your own site:

```html
<link rel="stylesheet" href="/bower_components/normalize.css/normalize.css"/>
<link rel="stylesheet" href="/bower_components/xmeter/xmeter.css"/>
```

If for some reason you do not have these stylesheets installed locally, you may
fetch them off the web as you would from a CDN (though this is not recommended).

```html
<link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css"/>
<link rel="stylesheet" href="https://chharvey.github.io/xmeter/xmeter.css"/>
```

## About

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

While **normalize.css** addresses discrepancies between different browsers’
rendering of HTML elements, providing only the very basic and necessary styles,
**xmeter.css** adds additional tools and styles for a more streamlined look and a
vertical rhythm system. (For more information on vertical rhythm, see these articles in
[24ways](http://24ways.org/2006/compose-to-a-vertical-rhythm/) and
[Smashing Magazine](http://www.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-rhythm).)

Features of this stylesheet include the following. See the test page (`./test.html`)
for a demo.

- Vertical rhythm &mdash; every line on the page is exactly the same height
  (dubbed a "vertical rhythm unit" or "vru") regardless of font size, and
  typographical elements (headings, paragraphs, figures, blockquotes, lists,
  tables, etc.) are separated by integer multiples of that height.
- Font-size for `html` is set to `100%` to accommodate for user agent settings.
  All other font-sizes are relative (either `rem`s or `em`s, no pixels or inches).
- All line-height values are unitless.
- Units for font-size, margin, and padding on block elements are in `rem`s
  rather than `em`s, thus the size of an element's font remains the same
  regardless of where that element is placed (style does not depend on location).
- **However:** `em`s are used on text-level elements, so that these elements
  scale accordingly when nested inside elements with a larger font size
  (style *does* depend on location).
- Line-height for all inline (text-level) elements is 0. This allows the
  vertical rhythm to remain unaffected.
- Minor, albeit prettier, style changes to some text-level elements from the browser default.
- Fallback tools for browser discrepancies on CSS3 properties.
- `.sprite()` mixin makes it easy to work with background image sprites.

## Changelog

See it on [Github](https://github.com/chharvey/xmeter/releases).
