"use strict";
/*
================SPECA================
ISIO IssueTracker IssueCreator Issue IS is.io isio

is.increment        is.i
is.untouched        is.o
is.commit/.end/.print    is.c/is.end/is.print
is.null             is.n
is.zero             is.z
is.set()            is.s()
is.i.z.c - the same as is.I.c
is.null.i.c.i.c.i.c; - same same as is.null.i(3).c
All shortcuts forms must be inline e.g. must works: is.null.i.c.i.c.i.c.z.z.z.z.z.i.c.o.o.i.commit
=====================================
*/
class IssueTracker
{
    constructor(pCore){
        if(pCore)
            Object.assign(this, pCore);
        let _defaultCore = this.constructor._defaultCore
        for(let prop in _defaultCore)
            if(this[prop] === undefined)
                this[prop] = _defaultCore[prop];
        
        this._contents = [];
        this._digitPointer = 0;
        this._exposedDigit = 0;
        this._buffer = [];
    }
    //
    //Private API
    //
    _EvaluateExposedDigit(){
        if(this._exposedDigit < this._digitPointer)
            this._exposedDigit = this._digitPointer;
    }
    _Terminate(){
        this._digitPointer = 0;
        this._buffer = this._buffer.reverse();
        let maxLength = this._buffer.length;
        if(maxLength < this._contents)
            maxLength = this._contents;
        for(let i = 0; i < maxLength; ++i)
        {
            if(this._contents[i] === undefined)
                this._contents[i] = 0;
            if(this._buffer[i] === undefined)
            {
                ;
            }
            else
            {
                if(typeof(this._buffer[i]) === "string")
                {
                    if(this._buffer[i] === "z")
                        this._contents[i] = 0;
                    else//Must be digit value from is.set() function
                        this._contents[i] = Number.parseInt(this._buffer[i])
                }
                else//Must be integer
                    this._contents[i] += this._buffer[i];
            }
        }
        this._buffer = [];
    }
    //
    //Outputting
    //
    _ToRawString(){
        this._Terminate();
        let output = "";
        let digitDiff = this.fixedWidth - 1;
        if(this._contents.length === 0)
            output = "0";
        else
        {
            if(this._exposedDigit <= 0)
            {
                output = "0";
            }
            else
            {
                let mirroredExposedContents = this._contents.slice(0, this._exposedDigit).reverse();
                digitDiff = this.fixedWidth - mirroredExposedContents.length;
                output = mirroredExposedContents.join(this.separator);
            }
        }
        return `${digitDiff > 0 ?"0.".repeat(digitDiff):""}${output}`;
    }
    toString(){
        if(this.logOn)
            console.log(`toString: ${this.prefix}${this._ToRawString()}${this.suffix}`);
        return `${this.prefix}${this._ToRawString()}${this.suffix}`;
    }
    toValue(){
        if(this.logOn)
            console.log(`toValue:`);
        return this.toString();
    }
    //
    //Public API
    //
    Implant(pCore){
        if(pCore)
            Object.assign(this, pCore);
    }
    Setup(pCore){
        this.Implant(pCore);
    }
    //
    //
    //
    get i(){
        if(this._buffer[this._digitPointer] === undefined)
            this._buffer[this._digitPointer] = this.increment;
        else
            this._buffer[this._digitPointer] += this.increment;
        this._digitPointer++;
        this._EvaluateExposedDigit();
        return this;
    }
    get o(){
        if(this._buffer[this._digitPointer] === undefined)
            this._buffer[this._digitPointer] = 0;
        this._digitPointer++;
        this._EvaluateExposedDigit();
        return this;
    }
    get null(){
        this._contents = [];
        this._buffer = [];
        this._digitPointer = 0;
        this._exposedDigit = 0;
        return this;
    }
    //Подумать здесь 3 одинаковых метода - нехорошо
    get end(){return this.toString();}
    print(){return this.toString();}
    get c(){
        this._Terminate();
        return this;
    }
    // get commit(){ return this.toString(); }
    get z(){
        this._buffer[this._digitPointer] = "z";
        this._digitPointer++;
        this._EvaluateExposedDigit();
        return this;
    }
    set(pValue){
        let integer = Number.parseInt(pValue);
        if(Number.isNaN(integer))
            throw new Error("Can't set not an interger value");
        this._buffer[this._digitPointer] = integer.toString();
        this._digitPointer++;
        this._EvaluateExposedDigit();
        return this;
    }
    s(pValue){
        return this.set(pValue);
    }
};
module.exports = IssueTracker;
IssueTracker._defaultCore = {
    separator:".",
    increment:1,
    // _contents:[],
    // _digitPointer:0,
    // _exposedDigit:0,
    // prefix:" \u26ab [",
    // suffix:"]",
    prefix:"",
    suffix:"",
    logOn:false,
    fixedWidth:0
    // _buffer:[],
};
// IssueTracker.Create = function(pCore){
//     let is = new IssueTracker(pCore);
//     is.i = new Proxy(is.i, {
//         get: (pTarget, pProp)=>{
//             //console.log(pTarget, pProp);
//             return pTarget[pProp];
//         },
//         apply: (p1, p2, p3)=>{
//             if(p1.name === "i")
//                 console.log(p1, p3);
//             return p1.call(p2, p3);
//         }
//     });
//     return is;
// };