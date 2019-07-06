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
See [`/css/src/__settings.less`](https://github.com/chharvey/xmeter/blob/master/css/src/__settings.less)
for all the variables available.

Use the tools:
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.transitions.less');
.my-selector {
  .transitions(color, background-color; 500ms; ease-in-out);
}
```
Read about all of Xmeter’s tools at
[`/docs/tools.md`](https://github.com/chharvey/xmeter/blob/master/docs/tools.md).

### Deployment

Use Xmeter right out of the box on your own site.
Want to see what Xmeter can do? [Check out the style guide](https://chharvey.github.io/xmeter/docs/styleguide/).

The production stylesheets are split into class-specific partials, which you can link or import separately.
Each stylesheet is minified and optimized for production, and accompanied by a sourcemap ending in `.css.map`.
The recommended approach is to link only the stylesheets you need, and update your `<link>`s when your needs change.
Your users will appreciate that. Additionally, this more fine-grained approach allows you to import the classes
you need in the order you need, so you can work with specificity and overrides more easily.

For development and testing, you can link/import `xmeter.css`, which concatenates all styles into one sheet.

#### Locally:
```bash
$ npm install xmeter
```
```html
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/base.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/o-List.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/o-Flex.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/o-Grid.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Block.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Inline.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Clearfix.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Measure.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Constrain.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-FontSize.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/h-Ruled.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-mt.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-mb.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-my.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-ml.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-mr.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-mx.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-pt.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-pb.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-py.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-pl.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-pr.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-px.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/-fz.css"/>
<link rel="stylesheet" href="/node_modules/xmeter/css/dist/xmeter.css"/> <!-- for development & testing only! -->
```

#### Remotely from a CDN:
(not recommended, unless deploying your `/node_modules/` isn’t possible)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xmeter@‹X.Y.Z›/css/dist/‹filename›.css"/>
```
where `‹X.Y.Z›` is any published version number, and `‹filename›` is the name of the stylesheet.


## Features

Xmeter’s stylesheet is a starting point that “normalizes” unclassed HTML elements.
And now that Xmeter has a few [design patterns](https://chharvey.github.io/xmeter/docs/styleguide/) built in, you can use them in your markup too!
In addition to base styles, Xmeter has classes for Objects (`/css/src/_o-*.less`), Components (`/css/src/_c-*.less`) and Helpers (`/css/src/_h-*.less`),
design patterns that aid in a consistent, easy-to-use, vertical rhythm system.
These classes should be directly injected into elements’ HTML `[class]` attribute on your site.

### normalize.css

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](https://necolas.github.io/normalize.css/).

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
