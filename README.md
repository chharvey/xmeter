# [xmeter](https://chharvey.github.io/xmeter/)
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced “Cross Meter”.


## Installation and Usage

This package can be used in two ways: Development and Deployment.

### Development

Develop your own codebase using Xmeter’s helper tools (Less mixins to help make your life easier).

Install:
```bash
$ npm install xmeter
```

Use the global variables:
```less
@import (reference) url('/node_modules/xmeter/css/src/__settings.less');
.my-selector {
  font-size: (1.5 * @g-font-size-kilo);
}
```
See `/src/__settings.less` for all the variables available.

Use the tools:
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.transitions.less');
.my-selector {
  .transitions(color, background-color; 500ms; ease-in-out);
}
```
Read about all of Xmeter’s tools (see `/docs/tools.md`).

### Deployment

Use Xmeter right out of the box on your own site.
Want to see what Xmeter can do? [Check out the style guide] (link pending).

Each stylesheet is minified and optimized for production, and accompanied by a sourcemap ending in `.css.map`.
It is recommended that you split up the stylesheet into media queries as shown below.

The `dist/xmeter.css` stylesheet contains all code not nested in a media query
(thus applying to `@media all`), and additionally any experimental code and deprecated code.
All other stylesheets (`dist/xmeter-‹breakpoint›.css`) represents media-specific classes.
For example, `xmeter-sG.css` contains `.o-Flex-sG`, which is identical to `.o-Flex`,
but it only applies to media `screen and (min-width: 60em)`.
The recommended approach is to link only the stylesheets you need, and update your `<link>`s when your needs change.
Your users will appreciate that.

Mnemonic:
1. Kilo
2. Mega
3. Giga
4. Tera
5. Peta

#### Locally:
```bash
$ npm install xmeter
```
```html
<link rel="stylesheet" media="all"                           href="/node_modules/xmeter/css/dist/xmeter.css"/>
<link rel="stylesheet" media="screen  and (min-width: 30em)" href="/node_modules/xmeter/css/dist/xmeter-sK.css"/>
<link rel="stylesheet" media="screen  and (min-width: 45em)" href="/node_modules/xmeter/css/dist/xmeter-sM.css"/>
<link rel="stylesheet" media="screen  and (min-width: 60em)" href="/node_modules/xmeter/css/dist/xmeter-sG.css"/>
<link rel="stylesheet" media="screen  and (min-width: 75em)" href="/node_modules/xmeter/css/dist/xmeter-sT.css"/>
<link rel="stylesheet" media="screen  and (min-width: 90em)" href="/node_modules/xmeter/css/dist/xmeter-sP.css"/>
<link rel="stylesheet" media="not all and (min-width: 30em)" href="/node_modules/xmeter/css/dist/xmeter-nK.css"/>
<link rel="stylesheet" media="not all and (min-width: 45em)" href="/node_modules/xmeter/css/dist/xmeter-nM.css"/>
<link rel="stylesheet" media="not all and (min-width: 60em)" href="/node_modules/xmeter/css/dist/xmeter-nG.css"/>
<link rel="stylesheet" media="not all and (min-width: 75em)" href="/node_modules/xmeter/css/dist/xmeter-nT.css"/>
<link rel="stylesheet" media="not all and (min-width: 90em)" href="/node_modules/xmeter/css/dist/xmeter-nP.css"/>
```

#### Remotely from a CDN:
(not recommended, unless deploying your `/node_modules/` isn’t possible)

```html
<link rel="stylesheet" media="‹breakpoint›"
  href="https://cdn.rawgit.com/chharvey/xmeter/‹master›/css/dist/xmeter‹breakpoint›.css"/>
```
where `‹master›` can be any release tag, commit, or branch, and `‹breakpoint›` represents the media query.


## Features

Xmeter’s stylesheet is a starting point that “normalizes” unclassed HTML elements.
And now that Xmeter has a few [design patterns] (link pending) built in, you can use them in your markup too!
In addition to base styles, Xmeter has classes for Objects (`/css/src/_o-*.less`), Components (`/css/src/_c-*.less`) and Helpers (`/css/src/_h-*.less`),
design patterns that aid in a consistent, easy-to-use, vertical rhythm system.
These classes should be directly injected into elements’ HTML `[class]` attribute on your site.

### normalize.css

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

This package has **normalize.css** as an npm dependency.
normalize.css is imported into xmeter.css, so there is *no need* to
`npm install`, `@import`, or `<link/>` it manually.

### Vertical Rhythm

While **normalize.css** addresses discrepancies between different browsers’
rendering of HTML elements, providing only the very basic and necessary styles,
**xmeter.css** adds additional tools and styles for a more streamlined look and a
[vertical rhythm system](https://github.com/chharvey/xmeter/wiki/Vertical-Rhythm).

### Base Styles

Minor, albeit prettier, style changes for some text-level elements (from common browser defaults).

### Miscellaneous Tools
- `.sprite()` sets background image sprites
- `.delims()` sets quotes and other things
- `.border-*-radius()` sets the border-radius on one side of a box, e.g., only the left side
- `.transitions()` allows you to set the
  `transition-{property,duration,timing-function,delay}` properties all at once (semicolon-separated arguments)


## Changelog

It’s on [Github](https://github.com/chharvey/xmeter/releases).
