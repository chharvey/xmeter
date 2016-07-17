# Xmeter — Tools

Functions and mixins used for development.

Tools are mixins and/or functions in the codebase that are used in development.
These rules don’t output any CSS, but they do make writing CSS a lot easier
by encapsulating reusable sets of property declarations.
[Fallback Tools](#fallback-tools) are simply mixins that address
browser vendor prefixes for CSS properties and values,
whereas [Module Tools](#module-tools) combine properties commonly used together.

## Table of Contents

1. [Table of Contents](#table-contents)
- [Fallback Tools](#fallback-tools)
  1. [box-sizing](#box-sizing)
  - [The Flexbox Tools](#flexbox-tools)
  - [transform](#transform)
  - [transform-origin](#transform-origin)
  - [column-count](#column-count)
  - [column-width](#column-width)
  - [filter](#filter)
- [Module Tools](#module-tools)
  1. [vertspacing](#vertspacing)
  - [borders](#borders)
  - [border-radius](#border-radius)
  - [Font Sizing Tools](#font-sizing-tools)
  - [delims](#delims)
  - [sprite](#sprite)

## Fallback Tools

### box-sizing
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.box-sizing.less');
.your-class {
  .box-sizing([!content-box | border-box]?);
}
```

### The Flexbox Tools
```less
.content { --status: 'coming soon...'; }
```

### transform
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.transform.less');
.your-class {
  .transform([!none | <transform-list>]?);
}
```

### transform-origin
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.transform-origin.less');
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
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.column-count.less');
.your-class {
  .column-count([!auto | <integer>]?);
}
```

### column-width
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.column-width.less');
.your-class {
  .column-width([!auto | <length>]?);
}
```

### filter
```less
@import (reference) url('/node_modules/xmeter/src/__tool.fallback.filter.less');
.your-class {
  .column-width([!none | <filter-function-list>]?);
}
```

## Module Tools

### vertspacing
```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.vertspacing.less');
.your-module {
  .vertspacing(<length>?:@g-vru);
}
```

### borders
```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.borders.less');
.your-class {
  .border-vert([top | bot | topbot | all]; <length>?:0);
}
```

### border-radius
```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.border-radius.less');
.your-class {
  .border-left-radius(<length>?:0);
  .border-right-radius(<length>?:0);
  .border-top-radius(<length>?:0);
  .border-bottom-radius(<length>?:0);
}
```

### Font Sizing Tools
```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.fontsize.less');
.your-module {
  .font-size-mod(<number>?:1);
  .your-element {
    .font-size-el(<number>?:1; <integer>?:1; <number>?:@g-line_height);
  }
}
```

### delims
```less
@import (reference) url('/node_modules/xmeter/src/__tool.module.delims.less');
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
@import (reference) url('/node_modules/xmeter/src/__tool.module.delims.less');
.your-class {
  .sprite([horizontal | vertical]; <integer>; <length>; <length>);
}
```
