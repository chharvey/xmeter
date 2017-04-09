# Xmeter — Tools

Functions and mixins used for development.

These are the mixins and/or functions in the codebase that are used in development.
These rules don’t output any CSS, but they do make writing CSS a lot easier
by encapsulating reusable sets of property declarations.
[Fallbacks](#fallbacks) are simply mixins that address
browser vendor prefixes for CSS properties and values,
whereas [Tools](#tools) combine properties commonly used together.

**WARNING: Syntax shown in code below has not been completely resolved.
Watch out for changes.**

## Table of Contents

1. [Table of Contents](#table-contents)
- [Fallbacks](#fallbacks)
  1. [box-sizing](#box-sizing)
  - [The Multicol Tools](#multicol-tools)
  - [The Flexbox Tools](#flexbox-tools)
  - [The CSS Grid Tools](#css-grid-tools)
  - [CSS3 Align Tools](#css3-align-tools)
  - [transform](#transform)
  - [transform-origin](#transform-origin)
  - [column-count](#column-count)
  - [column-width](#column-width)
  - [filter](#filter)
- [Tools](#tools)
  1. [vertspacing](#vertspacing)
  - [borders](#borders)
  - [border-radius](#border-radius)
  - [Font Sizing Tools](#font-sizing-tools)
  - [delims](#delims)
  - [sprite](#sprite)

## Fallbacks

### box-sizing
**NOTE!** *DEPRECATED* CHANGED: use plain CSS `box-sizing` property instead.
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.box-sizing.less');
.your-class {
  .box-sizing([!content-box | border-box]?);
}
```

### Multicol Tools

#### column-count
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.column-count.less');
.your-class {
  .column-count([!auto | <integer>]?);
}
```

#### column-width
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.column-width.less');
.your-class {
  .column-width([!auto | <length>]?);
}
```

### The Flexbox Tools
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.flexbox.less');
.your-flex-container {
  .flexbox(); // display: flex;
  .flex-direction(!row | column | row-reverse | column-reverse);
  .flex-wrap(!nowrap | wrap | wrap-reverse);
}
.your-flex-item {
  .flex-order(<integer>?:0);
  .flex(none | [ <number>:0 <number>?:1 || <length>:auto ]);
  .flex-grow(<number>?:0);
  .flex-shrink(<number>?:1);
  .flex-basis(!auto | content | <length>);
}
```

### The CSS Grid Tools
See [CSS Grid](https://www.w3.org/TR/css-grid-1/) for syntax.
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.grid.less');
.your-grid-container {
  .grid(); // display: grid;
  .grid-template-columns(...);
  .grid-template-rows(...);
  .grid-template-areas(...);
  .grid-column-gap(...);
  .grid-row-gap(...);
  .grid-gap(...);
  .grid-auto-columns(...);
  .grid-auto-rows(...);
  .grid-auto-flow(!row | [[row | column] || dense]);
}
.your-grid-item {
  .grid-column-start(...);
  .grid-column-end(...);
  .grid-column(...);
  .grid-row-start(...);
  .grid-row-end(...);
  .grid-row(...);
  .grid-area(...);
}
```

### CSS3 Align Tools
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.justify-content.less');
@import (reference) url('/node_modules/xmeter/src/__fallback.align-content.less');
@import (reference) url('/node_modules/xmeter/src/__fallback.justify-items.less');
@import (reference) url('/node_modules/xmeter/src/__fallback.align-items.less');
@import (reference) url('/node_modules/xmeter/src/__fallback.justify-self.less');
@import (reference) url('/node_modules/xmeter/src/__fallback.align-self.less');
.your-container {
  .justify-content(!normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
  .align-content(!normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
  .justify-items(!auto | normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
  .align-items(!normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
}
.your-item {
  .justify-self(!auto | normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
  .align-self(!auto | normal | start | end | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly);
}
```

### transform
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.transform.less');
.your-class {
  .transform([!none | <transform-list>]?);
}
```

### transform-origin
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.transform-origin.less');
.your-class {
  .transform-origin(<point>?:[50% 50% 0]);
}
// where:
// <point>      == <offset_all> | [ [<offset_x> && <offset_y>] <offset_z>? ]
// <offset_all> == <percentage> | <length> | left | center | right | top | bottom
// <offset_x>   == [<percentage> | <length> | left | center | right ]:50%
// <offset_y>   == [<percentage> | <length> | top  | center | bottom]:50%
// <offset_z>   == [<length>]:0
```

### filter
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.filter.less');
.your-class {
  .filter([!none | <filter-function-list>]?);
}
```

## Tools

### vertspacing
**NOTE!** *DEPRECATED* CHANGED: this will be removed on next major release.
```less
@import (reference) url('/node_modules/xmeter/src/__tool.vertspacing.less');
.your-module {
  .vertspacing(<length>?:@g-vru);
}
```

### borders
Use this tool to create borders on the top side, the bottom side, both top and bottom sides,
or all 4 sides on a box, while preserving vertical rhythm. This tool subtracts a length from
the `margin-top` of the box, equal to the sum of the widths of the box’s top and bottom borders,
so that subsequent elements will not be pushed down the page.
```less
@import (reference) url('/node_modules/xmeter/src/__tool.borders.less');
.your-class {
  .border-vert([top | bot | topbot | all]; <length>?:0);
}
```
#### Box-Shadow Hack
**Note**: You may use a hack involving `box-shadow` to create a border around all 4 sides,
which will not affect vertical rhythm. The box-shadow must be outset, have an offset-x of 0,
an offset-y of 0, a blur of 0, and a spread of `<length>`, which is the effective border width.
```less
.your-class {
  // .border-vert(all; <length>); // using box-shadow instead
  box-shadow 0 0 0 <length> <color>;
}
```
There are a few limitations of this hack: it can only be used in the case of `.border-vert(all)`,
because the box shadow must appear on all 4 sides. The effective border color must be provided
in the same declaration, and the effective border-style cannot be specified; it will always be solid.

### border-radius
```less
@import (reference) url('/node_modules/xmeter/src/__tool.border-radius.less');
.your-class {
  .border-left-radius(<length>?:0);
  .border-right-radius(<length>?:0);
  .border-top-radius(<length>?:0);
  .border-bottom-radius(<length>?:0);
}
```

### Font Sizing Tools
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fontsize.less');
.your-module {
  .font-size-mod(<number>?:1);
  .your-element {
    .font-size-el(<number>?:1; <integer>?:1);
  }
}
```

### delims
```less
@import (reference) url('/node_modules/xmeter/src/__tool.delims.less');
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

### sprite
```less
@import (reference) url('/node_modules/xmeter/src/__tool.sprite.less');
.your-class {
  .sprite([horizontal | vertical]; <integer>; <length>; <length>);
}
```
