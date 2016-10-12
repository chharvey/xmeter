# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced “Cross Meter”.

## Installation and Usage

This package is really a two-in-one. First, it is a set of tools (functions,
fallbacks, etc.) that make your life easier when working on a site’s
existing stylesheet or starting a brand new one. Secondly, it provides a base
stylesheet, a starting point, for developing a new site. It is geared towards
sites (or pages/sections) that are more static and typographically inclined
and not so dynamic like “web apps.”
Read the [About](#about) section for more info.

There are two ways you can use this package. One option is if you’re
**developing** your own front-end package (such as a CSS library or site-wide
stylesheet) that *uses* this package as a dependency, and the other option is
if you’re **deploying** a project (such as a website or blog) that *mentions*
(i.e., references) this stylesheet.

This package has **normalize.css** as an npm dependency.
**normalize.css** is built in to xmeter.css, so there is *no need* to
`bower install`, `@import`, or `<link/>` it manually.

### Development

This option is if you want to use Xmeter in your own codebase. Your codebase
uses the tools and styles available in the Xmeter project.

To install:

    $ npm install xmeter

#### Using the Tools

Take a look in the `src/` folder. In here you will find a set of partials
from which to pick and choose to use for your package.

Some are *fallbacks*, starting with `__fallback`, which are simply mixins that
include properties supported by different browser vendors.
Others are *tools*, starting with `__tool`, which group similar properties
to create one functional styling unit.
The settings file, `__settings.less`, contains all global variables.

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
  font-size: 1.5 * @g-font_size_kilo;
}
```

#### Using the Styles

Files in the `src/` folder not starting with `__`
provide actual styles for actual elements. Also unlike those partials,
**these stylesheets are *not* meant to be cherrypicked**. They are compiled
separately<sup>&lowast;</sup> and
concatenated together in the main file `xmeter.css`. If you’re developing a
stylesheet that you want built off of Xmeter, include
```less
@import url('/node_modules/xmeter/xmeter.css');
```
in your codebase.

Alternatively, you could include
```html
<link rel="stylesheet" href="/node_modules/xmeter/xmeter.css"/>
```
in the `<head>` of your document.

Don’t like Xmeter’s default styles but still want to use the tools?
That’s okay! Just don’t import or link the css file.

<i><sup>&lowast;</sup>The reason the stylesheets are compiled separately is to increase
encapsulation: private variables and mixins can be defined within the file without
affecting other files.</i>

In addition to base styles are classes for Objects (`src/_o-*.less`) and Helpers (`src/_h-*.less`),
for aiding in a consistent, easy-to-use, vertical rhythm system.
These classes are meant to be directly injected into elements’ HTML `[class]` attribute on your site.
However you may, if you wish, `@extend` or include (mix-in) them into your
codebase—though this is *not recommended*.

### Deployment

This option is for you if you don’t want to develop with **Xmeter**, you just
want to use it, as is, on your site. It’s a great starting point that “normalizes”
unclassed HTML elements before any specific classes and styles get added on.
And now that Xmeter has Object and Helper classes, you can use them in your markup too!

Locally
```
$ npm install xmeter
```
```html
<link rel="stylesheet" href="/node_modules/xmeter/xmeter[.min].css"/>
```
Remotely from a CDN (not recommended, unless deploying your `/node_modules/` isn’t possible)
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/chharvey/xmeter/‹master›/xmeter[.min].css"/>
```
where `‹master›` can be a branch or a tag, and optional `[.min]` is for the minified version.

## About

This stylesheet rides on top of **normalize.css** developed by
[Nicolas Gallagher](http://necolas.github.io/normalize.css/).

While **normalize.css** addresses discrepancies between different browsers’
rendering of HTML elements, providing only the very basic and necessary styles,
**xmeter.css** adds additional tools and styles for a more streamlined look and a
vertical rhythm system. (For more information on vertical rhythm, see these articles in
[24ways](http://24ways.org/2006/compose-to-a-vertical-rhythm/) and
[Smashing Magazine](http://www.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-rhythm).)

Features of this stylesheet include the following.

- Vertical rhythm &mdash; every line on the page is exactly the same height
  (dubbed a “vertical rhythm unit” or “vru”) regardless of font size, and
  typographical elements (headings, paragraphs, figures, blockquotes, lists,
  tables, etc.) are separated by integer multiples of that height.
- The following convention is used to preserve vertical rhythm:
  - Bottom margin is added to an element in order to push subsequent elements down the page.
  - Top padding is added to an element to push *itself* down the page.
  - Negative top margin is added to an element to pull it up the page.
- Font-size of `<html>` is set to `100%` to accommodate for user agent settings.
- Units for font-size on **modules** (not explicitly defined in this project)
  should be set in `rem`s, so that their vertical typography remains the same
  regardless of where that module is placed (style does not depend on location).
  (`<html>` is considered a module.)
- Within a module however, font-size on an element
  should be set in `em`s, so that its vertical typography scales with
  its parent module’s font size.
- All line-height values are unitless. Line-height for all inline (text-level) elements is 0.
  This preserves vertical rhythm within a block.
- Fallback tools for browser discrepancies on CSS3 properties.
- Tools add styles to blocks (font-size, borders) without disrupting vertical rhythm
- A few other tools to make your life easier:
  - `.sprite()` sets background image sprites
  - `.delims()` sets quotes and other things
  - `.border-*-radius()` sets the border-radius on one side of a box, e.g., only the left side
- Minor, albeit prettier, style changes to some text-level elements from the browser default.

### A Note on Variable Naming

The following convention of naming Less variables is used:

<dl>
  <dt>Global variables</dt>
  <dd>accessible throughout the entire site’s stylesheets</dd>
  <dd>prefixed with <code>@g-</code></dd>
  <dt>Local variables</dt>
  <dd>accessible within a page’s or subsite’s stylesheets
    (No such variables are in this package but the naming convention exists for your own packages.)</dd>
  <dd>prefixed with <code>@l-</code></dd>
  <dt>Private variables</dt>
  <dd>visible only within a partial Less file</dd>
  <dd>prefixed with <code>@p-</code></dd>
  <dt>Scoped variables</dt>
  <dd>(including parameters) within blocks and mixins</dd>
  <dd>not prefixed</dd>
</dl>

## Changelog

It’s on [Github](https://github.com/chharvey/xmeter/releases).
