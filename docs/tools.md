# Xmeter — Tools

Functions and mixins used for development.

These are the mixins and/or functions in the codebase that are used in development.
These rules don’t output any CSS, but they do make writing CSS a lot easier
by encapsulating reusable sets of property declarations.
The tools below combine properties commonly used together.

**WARNING: Syntax shown in code below has not been completely resolved.
Watch out for changes.**



## Table of Contents

  1. [borders](#borders)
  - [border-radius](#border-radius)
  - [Font Sizing Tools](#font-sizing-tools)
  - [delims](#delims)
  - [sprite](#sprite)



## Tools


### borders
Use this tool to create borders on the top side, the bottom side, both top and bottom sides,
or all 4 sides on a box, while preserving vertical rhythm. This tool subtracts a length from
the `margin-top` of the box, equal to the sum of the widths of the box’s top and bottom borders,
so that subsequent elements will not be pushed down the page.
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.borders.less');
.your-class {
  .border-vert([top | bot | topbot | all]; <length>?:0);
  .border-block([start | end | block | all]; <length>?:0);
}
```

#### Box-Shadow Hack
**Tip:** You may use a hack involving `box-shadow` to emulate a border that won’t affect
vertical rhythm. Borders add to the box’s height, which slightly but noticeably
move subsequent content down the page, messing with typographical grid lines. Box shadows,
on the other hand, do not affect the box’s height, so you can apply one without
having to reposition the box or changing its top margin.

Note that this hack is similar to using the `outline` property, except that
[`outline` behaves slightly differently](https://css-tricks.com/almanac/properties/o/outline/).

There are two ways you can use this hack:
to emulate borders on all 4 sides, or to emulate a top (or bottom) border.

To emulate a border on all sides, the box-shadow must be outset, have an offset-x of 0,
an offset-y of 0, a blur of 0, and a spread of `<length>`, which is the effective border width.
```less
.border-all {
  // .border-vert(all; <length>); // using box-shadow instead
  box-shadow: 0 0 0 <length> <color>;
}
```
To emulate a top or bottom border, use outset, offset-x 0, offset-y `<length>`, blur 0, and spread 0.
The shadow will emulate a border-bottom if `<length>` is positive, or border-top if negative.
```less
.border-bottom {
  // .border-vert(bottom; <length>); // using box-shadow instead
  box-shadow: 0 <length> 0 0 <color>;
}
.border-top {
  // .border-vert(top; <length>); // using box-shadow instead
  box-shadow: 0 -<length> 0 0 <color>;
}
```

**Sub-Tip:** Use `inset` to keep the box-shadow constrained within the bounds of the box’s `box-sizing`.

There are a few limitations of this hack:

1. It cannot be used to create a border on only the top/bottom sides, or left/right sides.
You can only use this hack to create a pseudo-border on exactly 1 side, 2 adjacent sides, or all 4 sides.

2. The effective border color must be provided in the same declaration as the width
(there’s no `box-shadow-color` property),
so you can’t use the Cascade to override the color.

3. The effective border-style cannot be specified; it will always be solid.


### border-radius
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.border-radius.less');
.your-class {
  .border-left-radius  (<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-right-radius (<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-top-radius   (<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-bottom-radius(<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-block-start-radius (<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-block-end-radius   (<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-inline-start-radius(<radius_h>?:0 <radius_v>?:<radius_h>);
  .border-inline-end-radius  (<radius_h>?:0 <radius_v>?:<radius_h>);
}
```


### Font Sizing Tools
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.fontsize.less');
.your-module {
  .font-size-mod(<number>?:1);
  .your-element {
    .font-size-el(<number>?:1; <integer>?:1);
  }
}
```


### delims
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.delims.less');
.your-class {
  .delims([!none | [<string> <string>]+]?);
  .parens();            // ( )
  .brackets();          // [ ]
  .braces();            // { }
  .angles();            // < >
  .apos();              // ' '
  .quot();              // " "
  .quotes-single();     // ‘ ’
  .quotes-double();     // “ ”
  .guillemets-single(); // ‹ ›
  .guillemets-double(); // « »
}
```


### transitions
This mixin differs from the `transition` css shorthand property, which does not allow you to set comma-separated properties/durations/functions/delays.
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.transitions.less');
.your-class {
  .transitions(<single-transition-property>#; <time>#; <timing-function>#; <time>#);
  // example:
  .transitions(color, background-color, border-color; 500ms; ease-in-out);
}
```


### sprite
```less
@import (reference) url('/node_modules/xmeter/css/src/__tool.sprite.less');
.your-class {
  .sprite([horizontal | vertical]; <integer>; <length>; <length>);
}
```
