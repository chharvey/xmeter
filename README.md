# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced “Cross Meter”.


## Installation and Usage

This package can be used in two ways: Development and Deployment.

### Development

Develop your own codebase using Xmeter’s helper tools (Less mixins to help make your life easier).

To install:

    $ npm install xmeter

The `/src/` folder contains a set of partials, starting with 2 underscores,
from which to pick and choose to use for your project.
These files are used in preprocessing only—they don’t output any actual css.
The *tools* (`/src/__tool.*.less`) group similar properties
to create one functional styling unit.
(Read `/docs/tools.md` for details and usage.)
The settings file, `/src/__settings.less`, contains all global variables.

If you want to use a particular tool in your stylesheet, you will have to
`@import (reference)` the stylesheet for that tool. For example,
if you plan to use the `.font-size-el()` mixin in your Less, you must include

```less
@import (reference) url('/node_modules/xmeter/src/__tool.fontsize.less');
```

at the top of your stylesheet. Then when you want to “call” the mixin, do

```less
.my-selector {
  .font-size-el(2.0; 1.5);
}
```

To use the Xmeter global variables, import the `__settings` stylesheet.

```less
@import (reference) url('/node_modules/xmeter/src/__settings.less');

.my-selector {
  font-size: (1.5 * @g-font-size-kilo);
}
```

### Deployment

Use Xmeter right out of the box on your own site.

Locally:
```
$ npm install xmeter
```
```html
<link rel="stylesheet" href="/node_modules/xmeter/xmeter.css"/>
```

Remotely from a CDN (not recommended, unless deploying your `/node_modules/` isn’t possible):
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/chharvey/xmeter/‹master›/xmeter.css"/>
```
where `‹master›` can be a branch or a tag.

The stylesheet `xmeter.css` is already minified, and is accompanied by a sourcemap `xmeter.css.map`.

Xmeter’s stylesheet is a starting point that “normalizes” unclassed HTML elements.
And now that Xmeter has a few design patterns built in, you can use them in your markup too!
In addition to base styles, Xmeter has classes for Objects (`src/_o-*.less`), Components (`src/_c-*.less`) and Helpers (`src/_h-*.less`),
design patterns that aid in a consistent, easy-to-use, vertical rhythm system.
These classes should be directly injected into elements’ HTML `[class]` attribute on your site.


## Features

### normalize.css

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

This package has **normalize.css** as an npm dependency.
normalize.css is built into xmeter.css, so there is *no need* to
`npm install`, `@import`, or `<link/>` it manually.

### Vertical Rhythm

While **normalize.css** addresses discrepancies between different browsers’
rendering of HTML elements, providing only the very basic and necessary styles,
**xmeter.css** adds additional tools and styles for a more streamlined look and a
vertical rhythm system. (For more information on vertical rhythm, see these articles in
[24ways](http://24ways.org/2006/compose-to-a-vertical-rhythm/) and
[Smashing Magazine](http://www.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-rhythm).)

Every line on the page is exactly the same height
  (dubbed a “vertical rhythm unit” or “vru”) regardless of font size, and
  typographical block elements (headings, paragraphs, figures, blockquotes, lists,
  tables, etc.) are separated by integer multiples of that height.

The following convention is used to preserve vertical rhythm:
  - Bottom margin is added to an element in order to push subsequent elements down the page.
  - Top padding is added to an element to push *itself* down the page.
  - Negative top margin is added to an element to pull it up the page.

### Modular Font Size & Leading

Font-size of `<html>` is set to `100%` to accommodate for user agent settings.

Units for font-size on modules
  should be set in `rem`s, so that their vertical typography remains the same
  regardless of where that module is placed (style does not depend on location).
  (`<html>` is considered a module.)

Within a module however, font-size on an element
  should be set in `em`s, so that its vertical typography scales with
  its parent module’s font size.
  In addition to font-size, line-height should be adjusted to maintain vertical rhythm.
  For example, if font-size is doubled, the line-height should be halved so that the final
  height of each text line is unchanged. Xmeter’s tools do this for you automatically.

All line-height values are unitless. Line-height for all inline (text-level) elements is 0.
  This preserves vertical rhythm within a block.

Tools add styles to blocks (font-size, borders) without disrupting vertical rhythm

### Base Styles

Minor, albeit prettier, style changes for some text-level elements (from common browser defaults).

### Miscellaneous Tools
  - `.sprite()` sets background image sprites
  - `.delims()` sets quotes and other things
  - `.border-*-radius()` sets the border-radius on one side of a box, e.g., only the left side


## Changelog

It’s on [Github](https://github.com/chharvey/xmeter/releases).
