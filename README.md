# xmeter
A default stylesheet with a set of tools that make designing with vertical rhythm easy.

Pronounced “Cross Meter”.

## Installation and Usage

This package is really a two-in-one. First, it is a set of tools (functions,
fallbacks, modules, etc.) that make your life easier when working on a site’s
existing stylesheet or starting a brand new one. Secondly, it provides a base
stylesheet, a starting point, for developing a new site. It is geared towards
sites (or sections of sites) that are more static and typographically inclined
and not so dynamic like “web apps.”
Read the [About](#about) section for more info.

There are two ways you can use this package. One option is if you’re
**developing** your own front-end package (such as a CSS library or site-wide
stylesheet) that *uses* this package as a dependency, and the other option is
if you’re **deploying** a project (such as a website or blog) that *mentions*
(i.e., references) this stylesheet.

This package uses **normalize.css** as a dependency.
**normalize.css** is now built in to xmeter.css, so there is *no need* to
`bower install`, `@import`, or `<link/>` it manually.

### Development

(The First Option)

To install:

    $ npm install xmeter

#### Using the Tools

Take a look in the `src/` folder. In here you will find a set of tools, starting
with `__tool`, from which to pick and choose to use for your package.

If you want to use a particular tool in your stylesheet, you will have to
`@import (reference)` the stylesheet for that tool. For example,
if you plan to use the `.font-size-el()` mixin in your Less, you must include

```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.fontsize.less');
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
  line-height: 2 * @g-line_height;
}
```

#### Using the Base

Also in the `src/` folder are a set of files starting with `_base`. These files,
unlike tools, provide actual styles for actual elements. Also unlike tools,
**these stylesheets are *not* meant to be cherrypicked**. They are compiled
separately<sup>&lowast;</sup> and
concatenated together in the main file `xmeter.css`. If you’re developing a
stylesheet that you want built off of Xmeter, include

```less
@import url('/node_modules/xmeter/xmeter.css');
```

at the top of  your file.

This package also comes installed with a test page (`doc/test.html`)
that links to the main stylesheet.

<i><sup>&lowast;</sup>The reason the stylesheets are compiled separately is to increase
encapsulation: private variables and mixins can be defined within the file without
affecting other files.</i>

### Deployment

(The Second Option)

This option is for you if you don’t wanna develop with **Xmeter**, you just
wanna use it on your site. It’s a great starting point that “normalizes”
unclassed HTML elements before any specific classes and styles get added on.

See the test page (`doc/test.html`) for a preview.

Locally
```
$ npm install xmeter
```
```html
<link rel="stylesheet" href="/node_modules/xmeter/xmeter[.min].css"/>
```
Remotely (from a CDN; not recommended)
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

Features of this stylesheet include the following. See the test page (`doc/test.html`)
for a demo.

- Vertical rhythm &mdash; every line on the page is exactly the same height
  (dubbed a “vertical rhythm unit” or “vru”) regardless of font size, and
  typographical elements (headings, paragraphs, figures, blockquotes, lists,
  tables, etc.) are separated by integer multiples of that height.
- The following convention is used to preserve vertical rhythm:
  - Bottom margin is added to an element in order to push subsequent elements down the page.
  - Top padding is added to an element to push *itself* down the page.
  - Negative top margin is added to an element to pull it up the page.
- Font-size for `html` is set to `100%` to accommodate for user agent settings.
  All other font-sizes are relative (either `rem`s or `em`s, no pixels or inches).
- All line-height values are unitless.
- Units for font-size, margin, and padding on **modules** (not explicitly defined in this project)
  should be set in `rem`s, so that their vertical typography remains the same
  regardless of where that module is placed (style does not depend on location).
- Within a module however, font-size, margin, and padding on an element
  should be set in `em`s, so that its vertical typography scales with
  its parent module’s font size.
- ~~Units for font-size, margin, and padding on block elements are in `rem`s
  rather than `em`s, thus the size of an element’s font remains the same
  regardless of where that element is placed (style does not depend on location).~~
- ~~`em`s are used on text-level elements, so that these elements
  scale accordingly when nested inside elements with a larger font size
  (style *does* depend on location).~~
- Line-height for all inline (text-level) elements is 0.
  This preserves vertical rhythm within a block.
- Fallback tools for browser discrepancies on CSS3 properties.
- Module tools add styles to blocks (font-size, borders) without disrupting vertical rhythm
- A few other modules to make your life easier:
  - `.sprite()` sets background image sprites
  - `.clearfix()` does exactly what it sounds like
  - `.delimiters()` sets quotes and other things
- Minor, albeit prettier, style changes to some text-level elements from the browser default.

## Changelog

It’s on [Github](https://github.com/chharvey/xmeter/releases).
