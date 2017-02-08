# **Issue indexer**

>Stay indexed

### Installation

```
npm install isio
```

### Usage

```
let ISIO = require("isio");
let is = new ISIO();

is.null;    // = 0
is.o.i.o.c; // = 0.1.0
is.o.i.o.c; // = 0.2.0
is.o.i.i.c; // = 0.3.1
let output = `Issue #${is}`;
console.log(output);
```

### API

```
is.null - reset to 0
is.i    - bump up
is.o    - untouch
is.z    - zero
is.s(5) - set to 5
is.c    - commit
```

### Feedback

Any feedback is highly appreciated (https://github.com/TilliWilli5 , tilliwilli@gmail.com)

Benice guys;)