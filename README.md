# xmeter
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
@import (reference) url('/node_modules/xmeter/css/src/__tool.fontsize.less');
.my-selector {
  .font-size-el(2.0; 1.5);
}
```
Read about all of Xmeter’s tools (see `/docs/tools.md`).

### Deployment

Use Xmeter right out of the box on your own site.
Want to see what Xmeter can do? [Check out the style guide] (link pending).

Locally:
```bash
$ npm install xmeter
```
```html
<link rel="stylesheet" href="/node_modules/xmeter/css/xmeter.css"/>
```

Remotely from a CDN (not recommended, unless deploying your `/node_modules/` isn’t possible):
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/chharvey/xmeter/‹master›/css/xmeter.css"/>
```
where `‹master›` can be any branch or tag.

The stylesheet `xmeter.css` is already minified, and is accompanied by a sourcemap `xmeter.css.map`.


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
