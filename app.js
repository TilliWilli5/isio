let ISIO = require("../isio");
let is = new ISIO();

is.null;    // = 0
is.o.i.o.c; // = 0.1.0
is.o.i.o.c; // = 0.2.0
is.o.i.i.c; // = 0.3.1
let output = `Issue #${is}`;
console.log(output);

is.setup({fixedWidth:4, separator:"-"});
console.log(is.null.i.i.o.c.print());