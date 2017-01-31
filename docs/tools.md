# Xmeter — Tools

Functions and mixins used for development.

These are the mixins and/or functions in the codebase that are used in development.
These rules don’t output any CSS, but they do make writing CSS a lot easier
by encapsulating reusable sets of property declarations.
[Fallbacks](#fallbacks) are simply mixins that address
browser vendor prefixes for CSS properties and values,
whereas [Tools](#tools) combine properties commonly used together.

WARNING: Syntax shown in code below has not been completely resolved.
Watch out for changes.

## Table of Contents

1. [Table of Contents](#table-contents)
- [Fallbacks](#fallbacks)
  1. [box-sizing](#box-sizing)
  - [The Flexbox Tools](#flexbox-tools)
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

### The Flexbox Tools
```less
.your-flex-container {
  .flexbox(); // display: flex;
  .flex-direction(!row | column | row-reverse | column-reverse);
  .flex-wrap(!nowrap | wrap | wrap-reverse);
  .flex-justify-content(!flex-start | flex-end | center | space-between | space-around);
  .flex-align-content(!stretch | flex-start | flex-end | center | space-between | space-around);
  .flex-align-items(!stretch | flex-start | flex-end | center | baseline);
}
.your-flex-item {
  .flex-align-self(!auto | strecth | flex-start | flex-end | center | baseline);
  .flex-order(<integer>?:0);
  .flex(none | [ <number>:0 <number>?:1 || <length>:auto ]);
  .flex-grow(<number>?:0);
  .flex-shrink(<number>?:1);
  .flex-basis(!auto | content | <length>);
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

### column-count
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.column-count.less');
.your-class {
  .column-count([!auto | <integer>]?);
}
```

### column-width
```less
@import (reference) url('/node_modules/xmeter/src/__fallback.column-width.less');
.your-class {
  .column-width([!auto | <length>]?);
}
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
```less
@import (reference) url('/node_modules/xmeter/src/__tool.borders.less');
.your-class {
  .border-vert([top | bot | topbot | all]; <length>?:0);
}
```

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
