"use strict";
let assert = require("assert");
let ISIO = require("../isio.js");
let is = new ISIO();
let ver = new ISIO({prefix:"", suffix:" "});
describe("<IssueTracker>", ()=>{

    describe(`${ver.i.o}[Simple]`, ()=>{
        it(`${ver.i}Must return "0"`, ()=>{
            assert.equal(is._ToRawString(), "0");
        });
        it(`${ver.i}Must return formatted output`, ()=>{
            assert.equal(is.toString(), " \u26ab [0]");
        });
        it(`${ver.i}Setup`, ()=>{
            is.Setup({prefix:"<", suffix:">"});
            assert.equal(is.o.o.i.o, "<0.0.1.0>");
        });
    });
    describe(`${ver.i.z}[Complex]`, ()=>{
        before(()=>{
            is.Setup({prefix:"", suffix:""});
        });
        it(`${ver.i}Must return 0`, ()=>{
            assert.equal(is.null, "0");
        });
        it(`${ver.i}Must return 1`, ()=>{
            assert.equal(is.null.i, "1");
        });
        it(`${ver.i}Must return 1.1`, ()=>{
            assert.equal(is.null.i.i, "1.1");
        });
        it(`${ver.i}Must return 0`, ()=>{
            assert.equal(is.null.o, "0");
        });
        it(`${ver.i}Must return 0.0`, ()=>{
            assert.equal(is.null.o.o, "0.0");
        });
        it(`${ver.i}Must return 0.1`, ()=>{
            assert.equal(is.null.o.i, "0.1");
        });
        it(`${ver.i}Must return 1.0`, ()=>{
            assert.equal(is.null.i.o, "1.0");
        });
    });
    describe(`${ver.i.z}[Terminators]`, ()=>{
        it(`${ver.i}.end = toString()`, ()=>{
            assert.equal(is.null.i.o.i.end, "1.0.1");
        });
    });
    describe(`${ver.i.z}[Sequences]`, ()=>{
        before(()=>{
            is.Setup({logOn:false});
        });
        it(`${ver.i}multiple invoking of end must keep the same result`, ()=>{
            is.null.i.o.i.end;
            assert.equal(is.end, "1.0.1");
            assert.equal(is.end, "1.0.1");
            assert.equal(is.end, "1.0.1");
        });
        it(`${ver.i}Must return 2.0.1`, ()=>{
            is.null;
            is.i.end;
            is.i.o.o.end;
            is.i.o.o.end;
            // is.o.i.end;
            assert.equal(is, "2.0.1");
        });
        it(`${ver.i}i^`, ()=>{
            is.null;
            is.i.c;
            is.i.c;
            assert.equal(is+"", "2");
        });
        it(`${ver.i}is.z.i.c`, ()=>{
            is.null;
            is.z.i.c
            is.z.i.c
            assert.equal(is+"", "0.2");
        });
        it(`${ver.i}is.z.z.c`, ()=>{
            is.null;
            is.z.z.c
            is.z.z.c
            assert.equal(is+"", "0.0");
        });
         it(`${ver.i}1.0`, ()=>{
            is.null;
            is.i.c;
            is.i.c;
            is.i.c;
            is.i.z.c;
            assert.equal(is+"", "1.0");
        });
        it(`${ver.i} .i.c^3`, ()=>{
            is.null.i.c.i.c.i.c;
            assert.equal(is+"", "3");
        });
    });
    describe(`${ver.s(5).z}[Set]`, ()=>{
        it(`${ver.i}Simple is.set()`, ()=>{
            is.null.set(7);
            assert.equal(is.end, "7");
        });
        it(`${ver.i}Shorthand is.s()`, ()=>{
            is.null.s(7);
            assert.equal(is.end, "7");
        });
        it(`${ver.i}is.set in second digit place`, ()=>{
            is.null.i.set(7).o;
            assert.equal(is.end, "1.7.0");
            is.i.z.o;
            assert.equal(is.end, "2.0.0");
        });
        it(`${ver.i}multiple is.set`, ()=>{
            is.null.i.set(7).set(6).set(5).o;
            assert.equal(is.end, "1.7.6.5.0");
        });
    });
    describe(`${ver.i.z}[FixWidth]`, ()=>{
        it(`${ver.i}fix width = 4`, ()=>{
            is.null.i.c;
            is.Setup({fixedWidth:4});
            assert.equal(is.print, "0.0.0.1");
        });
        it(`${ver.i}fix width = 4`, ()=>{
            is.Setup({fixedWidth:4});
            is.null;
            assert.equal(is.print, "0.0.0.0");
        });
    });
});