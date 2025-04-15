(function(){'use strict';var r;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ea(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var fa=ea(this);function u(a,b){if(b)a:{var c=fa;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&b!=null&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
u("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,g){this.h=f;ba(this,"description",{configurable:!0,writable:!0,value:g})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d="jscomp_symbol_"+(Math.random()*1E9>>>0)+"_",e=0;return b});
u("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=fa[b[c]];typeof d==="function"&&typeof d.prototype[a]!="function"&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(aa(this))}})}return a});
function ha(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
var ia=typeof Object.create=="function"?Object.create:function(a){function b(){}
b.prototype=a;return new b},la=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if(typeof Reflect!="undefined"&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){e===void 0&&(e=c);
e=ia(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),ma;
if(typeof Object.setPrototypeOf=="function")ma=Object.setPrototypeOf;else{var na;a:{var oa={a:!0},pa={};try{pa.__proto__=oa;na=pa.a;break a}catch(a){}na=!1}ma=na?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var qa=ma;
function w(a,b){a.prototype=ia(b.prototype);a.prototype.constructor=a;if(qa)qa(a,b);else for(var c in b)if(c!="prototype")if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.Aa=b.prototype}
function y(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}
function A(a){if(!(a instanceof Array)){a=y(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function ra(a){return sa(a,a)}
function sa(a,b){a.raw=b;Object.freeze&&(Object.freeze(a),Object.freeze(b));return a}
function ta(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var ua=typeof Object.assign=="function"?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)ta(d,e)&&(a[e]=d[e])}return a};
u("Object.assign",function(a){return a||ua});
function va(){this.D=!1;this.u=null;this.i=void 0;this.h=1;this.o=this.M=0;this.P=this.j=null}
function wa(a){if(a.D)throw new TypeError("Generator is already running");a.D=!0}
va.prototype.G=function(a){this.i=a};
function xa(a,b){a.j={exception:b,wd:!0};a.h=a.M||a.o}
va.prototype.return=function(a){this.j={return:a};this.h=this.o};
va.prototype.yield=function(a,b){this.h=b;return{value:a}};
va.prototype.A=function(a){this.h=a};
function ya(a,b,c){a.M=b;c!=void 0&&(a.o=c)}
function za(a,b){a.h=b;a.M=0}
function Aa(a){a.M=0;var b=a.j.exception;a.j=null;return b}
function Ba(a){var b=a.P.splice(0)[0];(b=a.j=a.j||b)?b.wd?a.h=a.M||a.o:b.A!=void 0&&a.o<b.A?(a.h=b.A,a.j=null):a.h=a.o:a.h=0}
function Ca(a){this.h=new va;this.i=a}
function Da(a,b){wa(a.h);var c=a.h.u;if(c)return Ea(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h.return);
a.h.return(b);return Fa(a)}
function Ea(a,b,c,d){try{var e=b.call(a.h.u,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.D=!1,e;var f=e.value}catch(g){return a.h.u=null,xa(a.h,g),Fa(a)}a.h.u=null;d.call(a.h,f);return Fa(a)}
function Fa(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.D=!1,{value:b.value,done:!1}}catch(c){a.h.i=void 0,xa(a.h,c)}a.h.D=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.wd)throw b.exception;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function Ga(a){this.next=function(b){wa(a.h);a.h.u?b=Ea(a,a.h.u.next,b,a.h.G):(a.h.G(b),b=Fa(a));return b};
this.throw=function(b){wa(a.h);a.h.u?b=Ea(a,a.h.u["throw"],b,a.h.G):(xa(a.h,b),b=Fa(a));return b};
this.return=function(b){return Da(a,b)};
this[Symbol.iterator]=function(){return this}}
function Ha(a){function b(d){return a.next(d)}
function c(d){return a.throw(d)}
return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}
f(a.next())})}
function B(a){return Ha(new Ga(new Ca(a)))}
function C(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}
u("globalThis",function(a){return a||fa});
u("Reflect",function(a){return a?a:{}});
u("Reflect.construct",function(){return la});
u("Reflect.setPrototypeOf",function(a){return a?a:qa?function(b,c){try{return qa(b,c),!0}catch(d){return!1}}:null});
u("Promise",function(a){function b(g){this.X=0;this.ab=void 0;this.h=[];this.u=!1;var h=this.i();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(this.h==null){this.h=[];var h=this;this.j(function(){h.u()})}this.h.push(g)};
var e=fa.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.u=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.o(l)}}}this.h=null};
c.prototype.o=function(g){this.j(function(){throw g;})};
b.prototype.i=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.U),reject:g(this.j)}};
b.prototype.U=function(g){if(g===this)this.j(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.Z(g);else{a:switch(typeof g){case "object":var h=g!=null;break a;case "function":h=!0;break a;default:h=!1}h?this.P(g):this.o(g)}};
b.prototype.P=function(g){var h=void 0;try{h=g.then}catch(k){this.j(k);return}typeof h=="function"?this.ha(h,g):this.o(g)};
b.prototype.j=function(g){this.M(2,g)};
b.prototype.o=function(g){this.M(1,g)};
b.prototype.M=function(g,h){if(this.X!=0)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.X);this.X=g;this.ab=h;this.X===2&&this.Y();this.D()};
b.prototype.Y=function(){var g=this;e(function(){if(g.G()){var h=fa.console;typeof h!=="undefined"&&h.error(g.ab)}},1)};
b.prototype.G=function(){if(this.u)return!1;var g=fa.CustomEvent,h=fa.Event,k=fa.dispatchEvent;if(typeof k==="undefined")return!0;typeof g==="function"?g=new g("unhandledrejection",{cancelable:!0}):typeof h==="function"?g=new h("unhandledrejection",{cancelable:!0}):(g=fa.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.ab;return k(g)};
b.prototype.D=function(){if(this.h!=null){for(var g=0;g<this.h.length;++g)f.i(this.h[g]);this.h=null}};
var f=new c;b.prototype.Z=function(g){var h=this.i();g.ic(h.resolve,h.reject)};
b.prototype.ha=function(g,h){var k=this.i();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(p,t){return typeof p=="function"?function(v){try{l(p(v))}catch(x){m(x)}}:t}
var l,m,n=new b(function(p,t){l=p;m=t});
this.ic(k(g,l),k(h,m));return n};
b.prototype.catch=function(g){return this.then(void 0,g)};
b.prototype.ic=function(g,h){function k(){switch(l.X){case 1:g(l.ab);break;case 2:h(l.ab);break;default:throw Error("Unexpected state: "+l.X);}}
var l=this;this.h==null?f.i(k):this.h.push(k);this.u=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=y(g),m=l.next();!m.done;m=l.next())d(m.value).ic(h,k)})};
b.all=function(g){var h=y(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(x){p[v]=x;t--;t==0&&l(p)}}
var p=[],t=0;do p.push(void 0),t++,d(k.value).ic(n(p.length-1),m),k=h.next();while(!k.done)})};
return b});
u("Object.setPrototypeOf",function(a){return a||qa});
u("Symbol.dispose",function(a){return a?a:Symbol("Symbol.dispose")});
u("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=y(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return l==="object"&&k!==null||l==="function"}
function e(k){if(!ta(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(m.get(k)!=2||m.get(l)!=3)return!1;m.delete(k);m.set(l,4);return!m.has(k)&&m.get(l)==4}catch(n){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!ta(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=l;return this};
b.prototype.get=function(k){return d(k)&&ta(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&ta(k,g)&&ta(k[g],this.h)};
b.prototype.delete=function(k){return d(k)&&ta(k,g)&&ta(k[g],this.h)?delete k[g][this.h]:!1};
return b});
u("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h[1];return ha(function(){if(l){for(;l.head!=h[1];)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;l=="object"||l=="function"?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h[0][l];if(m&&ta(h[0],l))for(h=0;h<m.length;h++){var n=m[h];if(k!==k&&n.key!==n.key||k===n.key)return{id:l,list:m,index:h,entry:n}}return{id:l,list:m,index:-1,entry:void 0}}
function e(h){this[0]={};this[1]=b();this.size=0;if(h){h=y(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||typeof a!="function"||!a.prototype.entries||typeof Object.seal!="function")return!1;try{var h=Object.seal({x:4}),k=new a(y([[h,"s"]]));if(k.get(h)!="s"||k.size!=1||k.get({x:4})||k.set({x:4},"t")!=k||k.size!=2)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||m.value[1]!="s")return!1;m=l.next();return m.done||m.value[0].x!=4||m.value[1]!="t"||!l.next().done?!1:!0}catch(n){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=h===0?0:h;var l=d(this,h);l.list||(l.list=this[0][l.id]=[]);l.entry?l.entry.value=k:(l.entry={next:this[1],previous:this[1].previous,head:this[1],key:h,value:k},l.list.push(l.entry),this[1].previous.next=l.entry,this[1].previous=l.entry,this.size++);return this};
e.prototype.delete=function(h){h=d(this,h);return h.entry&&h.list?(h.list.splice(h.index,1),h.list.length||delete this[0][h.id],h.entry.previous.next=h.entry.next,h.entry.next.previous=h.entry.previous,h.entry.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this[0]={};this[1]=this[1].previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).entry};
e.prototype.get=function(h){return(h=d(this,h).entry)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
u("Set",function(a){function b(c){this.h=new Map;if(c){c=y(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||typeof a!="function"||!a.prototype.entries||typeof Object.seal!="function")return!1;try{var c=Object.seal({x:4}),d=new a(y([c]));if(!d.has(c)||d.size!=1||d.add(c)!=d||d.size!=1||d.add({x:4})!=d||d.size!=2)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||f.value[0].x!=4||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=c===0?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype.delete=function(c){c=this.h.delete(c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
function Ia(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
u("Array.prototype.entries",function(a){return a?a:function(){return Ia(this,function(b,c){return[b,c]})}});
u("Array.prototype.keys",function(a){return a?a:function(){return Ia(this,function(b){return b})}});
function Ja(a,b,c){if(a==null)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Ja(this,b,"startsWith");b+="";var e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});
u("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Ja(this,b,"endsWith");b+="";c===void 0&&(c=d.length);c=Math.max(0,Math.min(c|0,d.length));for(var e=b.length;e>0&&c>0;)if(d[--c]!=b[--e])return!1;return e<=0}});
u("Number.isFinite",function(a){return a?a:function(b){return typeof b!=="number"?!1:!isNaN(b)&&b!==Infinity&&b!==-Infinity}});
u("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});
u("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)ta(b,d)&&c.push(b[d]);return c}});
u("Object.is",function(a){return a?a:function(b,c){return b===c?b!==0||1/b===1/c:b!==b&&c!==c}});
u("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(c<0&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
u("String.prototype.includes",function(a){return a?a:function(b,c){return Ja(this,b,"includes").indexOf(b,c||0)!==-1}});
u("Array.from",function(a){return a?a:function(b,c,d){c=c!=null?c:function(h){return h};
var e=[],f=typeof Symbol!="undefined"&&Symbol.iterator&&b[Symbol.iterator];if(typeof f=="function"){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
u("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)ta(b,d)&&c.push([d,b[d]]);return c}});
u("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
u("Number.MIN_SAFE_INTEGER",function(){return-9007199254740991});
u("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});
u("Number.isSafeInteger",function(a){return a?a:function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER}});
u("Math.trunc",function(a){return a?a:function(b){b=Number(b);if(isNaN(b)||b===Infinity||b===-Infinity||b===0)return b;var c=Math.floor(Math.abs(b));return b<0?-c:c}});
u("Number.isNaN",function(a){return a?a:function(b){return typeof b==="number"&&isNaN(b)}});
u("Array.prototype.values",function(a){return a?a:function(){return Ia(this,function(b,c){return c})}});/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var Ka=Ka||{},D=this||self;function E(a,b,c){a=a.split(".");c=c||D;for(var d;a.length&&(d=a.shift());)a.length||b===void 0?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function F(a,b){a=a.split(".");b=b||D;for(var c=0;c<a.length;c++)if(b=b[a[c]],b==null)return null;return b}
function La(a){var b=typeof a;return b!="object"?b:a?Array.isArray(a)?"array":b:"null"}
function Ma(a){var b=La(a);return b=="array"||b=="object"&&typeof a.length=="number"}
function Na(a){var b=typeof a;return b=="object"&&a!=null||b=="function"}
function Sa(a){return Object.prototype.hasOwnProperty.call(a,Ta)&&a[Ta]||(a[Ta]=++Ua)}
var Ta="closure_uid_"+(Math.random()*1E9>>>0),Ua=0;function Va(a,b,c){return a.call.apply(a.bind,arguments)}
function Wa(a,b,c){if(!a)throw Error();if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Xa(a,b,c){Xa=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Va:Wa;return Xa.apply(null,arguments)}
function Ya(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function $a(){return Date.now()}
function ab(a,b){function c(){}
c.prototype=b.prototype;a.Aa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
;function bb(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,bb);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));b!==void 0&&(this.cause=b)}
ab(bb,Error);bb.prototype.name="CustomError";var cb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};/*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
var db=globalThis.trustedTypes,eb;function fb(){var a=null;if(!db)return a;try{var b=function(c){return c};
a=db.createPolicy("goog#html",{createHTML:b,createScript:b,createScriptURL:b})}catch(c){}return a}
function gb(){eb===void 0&&(eb=fb());return eb}
;function hb(a){this.h=a}
hb.prototype.toString=function(){return this.h+""};
function ib(a){var b=gb();return new hb(b?b.createScriptURL(a):a)}
function jb(a){if(a instanceof hb)return a.h;throw Error("");}
;var kb=ra([""]),lb=sa(["\x00"],["\\0"]),mb=sa(["\n"],["\\n"]),nb=sa(["\x00"],["\\u0000"]);function ob(a){return a.toString().indexOf("`")===-1}
ob(function(a){return a(kb)})||ob(function(a){return a(lb)})||ob(function(a){return a(mb)})||ob(function(a){return a(nb)});function pb(a){this.h=a}
pb.prototype.toString=function(){return this.h};
var qb=new pb("about:invalid#zClosurez");function rb(a){this.Fe=a}
function sb(a){return new rb(function(b){return b.substr(0,a.length+1).toLowerCase()===a+":"})}
var tb=[sb("data"),sb("http"),sb("https"),sb("mailto"),sb("ftp"),new rb(function(a){return/^[^:]*([/?#]|$)/.test(a)})],ub=/^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
function vb(a){if(a instanceof pb)if(a instanceof pb)a=a.h;else throw Error("");else a=ub.test(a)?a:void 0;return a}
;function wb(a,b){b=vb(b);b!==void 0&&(a.href=b)}
;function xb(a,b){throw Error(b===void 0?"unexpected value "+a+"!":b);}
;function yb(a){this.h=a}
yb.prototype.toString=function(){return this.h+""};function zb(a){a=a===void 0?document:a;var b,c;a=(c=(b=a).querySelector)==null?void 0:c.call(b,"script[nonce]");return a==null?"":a.nonce||a.getAttribute("nonce")||""}
;function Ab(a){this.h=a}
Ab.prototype.toString=function(){return this.h+""};
function Bb(a){var b=gb();return new Ab(b?b.createScript(a):a)}
function Cb(a){if(a instanceof Ab)return a.h;throw Error("");}
;function Db(a){var b=zb(a.ownerDocument);b&&a.setAttribute("nonce",b)}
function Eb(a,b){a.src=jb(b);Db(a)}
;function Fb(){this.h=Gb[0].toLowerCase()}
Fb.prototype.toString=function(){return this.h};function Hb(a){var b="true".toString(),c=[new Fb];if(c.length===0)throw Error("");if(c.map(function(d){if(d instanceof Fb)d=d.h;else throw Error("");return d}).every(function(d){return"data-loaded".indexOf(d)!==0}))throw Error('Attribute "data-loaded" does not match any of the allowed prefixes.');
a.setAttribute("data-loaded",b)}
;var Ib="alternate author bookmark canonical cite help icon license modulepreload next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" ");function Jb(a,b){if(b instanceof hb)a.href=jb(b).toString(),a.rel="stylesheet";else{if(Ib.indexOf("stylesheet")===-1)throw Error('TrustedResourceUrl href attribute required with rel="stylesheet"');b=vb(b);b!==void 0&&(a.href=b,a.rel="stylesheet")}}
;var Kb=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(typeof a==="string")return typeof b!=="string"||b.length!=1?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Mb=Array.prototype.forEach?function(a,b){Array.prototype.forEach.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=typeof a==="string"?a.split(""):a,e=0;e<c;e++)e in d&&b.call(void 0,d[e],e,a)},Nb=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f=typeof a==="string"?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},Ob=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=typeof a==="string"?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Pb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
Mb(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Qb(a,b){a:{for(var c=a.length,d=typeof a==="string"?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return b<0?null:typeof a==="string"?a.charAt(b):a[b]}
function Rb(a,b){b=Kb(a,b);var c;(c=b>=0)&&Array.prototype.splice.call(a,b,1);return c}
function Sb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ma(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Tb(a,b){a.__closure__error__context__984382||(a.__closure__error__context__984382={});a.__closure__error__context__984382.severity=b}
;function Ub(a){var b=F("window.location.href");a==null&&(a='Unknown Error of type "null/undefined"');if(typeof a==="string")return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||D.$googDebugFname||b}catch(g){e="Not available",c=!0}b=Vb(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(c==
null){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,Wb[c])c=Wb[c];else{c=String(c);if(!Wb[c]){var f=/function\s+([^\(]+)/m.exec(c);Wb[c]=f?f[1]:"[Anonymous]"}c=Wb[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";typeof a.toString==="function"&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}return{message:a.message,
name:a.name,lineNumber:a.lineNumber,fileName:a.fileName,stack:b}}
function Vb(a,b){b||(b={});b[Xb(a)]=!0;var c=a.stack||"",d=a.cause;d&&!b[Xb(d)]&&(c+="\nCaused by: ",d.stack&&d.stack.indexOf(d.toString())==0||(c+=typeof d==="string"?d:d.message+"\n"),c+=Vb(d,b));a=a.errors;if(Array.isArray(a)){d=1;var e;for(e=0;e<a.length&&!(d>4);e++)b[Xb(a[e])]||(c+="\nInner error "+d++ +": ",a[e].stack&&a[e].stack.indexOf(a[e].toString())==0||(c+=typeof a[e]==="string"?a[e]:a[e].message+"\n"),c+=Vb(a[e],b));e<a.length&&(c+="\n... "+(a.length-e)+" more inner errors")}return c}
function Xb(a){var b="";typeof a.toString==="function"&&(b=""+a);return b+a.stack}
var Wb={};function Yb(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Zb=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $b(a){return a?decodeURI(a):a}
function ac(a,b){return b.match(Zb)[a]||null}
function bc(a){return $b(ac(3,a))}
function cc(a){var b=a.match(Zb);a=b[5];var c=b[6];b=b[7];var d="";a&&(d+=a);c&&(d+="?"+c);b&&(d+="#"+b);return d}
function dc(a){var b=a.indexOf("#");return b<0?a:a.slice(0,b)}
function ec(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)ec(a,String(b[d]),c);else b!=null&&c.push(a+(b===""?"":"="+encodeURIComponent(String(b))))}
function fc(a){var b=[],c;for(c in a)ec(c,a[c],b);return b.join("&")}
function hc(a,b){b=fc(b);if(b){var c=a.indexOf("#");c<0&&(c=a.length);var d=a.indexOf("?");if(d<0||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.slice(0,d),e,a.slice(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;b=a[0]+(a[1]?"?"+a[1]:"")+a[2]}else b=a;return b}
function ic(a,b,c,d){for(var e=c.length;(b=a.indexOf(c,b))>=0&&b<d;){var f=a.charCodeAt(b-1);if(f==38||f==63)if(f=a.charCodeAt(b+e),!f||f==61||f==38||f==35)return b;b+=e+1}return-1}
var jc=/#|$/,kc=/[?&]($|#)/;function lc(a,b){for(var c=a.search(jc),d=0,e,f=[];(e=ic(a,d,b,c))>=0;)f.push(a.substring(d,e)),d=Math.min(a.indexOf("&",e)+1||c,c);f.push(a.slice(d));return f.join("").replace(kc,"$1")}
;var mc=(new Date("2024-01-01T00:00:00Z")).getTime();function nc(a){var b=C.apply(1,arguments).filter(function(d){return d}).join("&");
if(!b)return a;var c=a.match(/[?&]adurl=/);return c?a.slice(0,c.index+1)+b+"&"+a.slice(c.index+1):a+(a.indexOf("?")===-1?"?":"&")+b}
function oc(a){var b=a.url;a=a.Xh;this.j=b;this.D=a;a=/[?&]dsh=1(&|$)/.test(b);this.u=!a&&/[?&]ae=1(&|$)/.test(b);this.M=!a&&/[?&]ae=2(&|$)/.test(b);if((this.h=/[?&]adurl=([^&]*)/.exec(b))&&this.h[1]){try{var c=decodeURIComponent(this.h[1])}catch(d){c=null}this.i=c}this.o=(new Date).getTime()-mc}
function pc(a){a=a.D;if(!a)return"";var b="";a.platform&&(b+="&uap="+encodeURIComponent(a.platform));a.platformVersion&&(b+="&uapv="+encodeURIComponent(a.platformVersion));a.uaFullVersion&&(b+="&uafv="+encodeURIComponent(a.uaFullVersion));a.architecture&&(b+="&uaa="+encodeURIComponent(a.architecture));a.model&&(b+="&uam="+encodeURIComponent(a.model));a.bitness&&(b+="&uab="+encodeURIComponent(a.bitness));a.fullVersionList&&(b+="&uafvl="+encodeURIComponent(a.fullVersionList.map(function(c){return encodeURIComponent(c.brand)+
";"+encodeURIComponent(c.version)}).join("|")));
typeof a.wow64!=="undefined"&&(b+="&uaw="+Number(a.wow64));return b.substring(1)}
;function qc(){try{var a,b;return!!((a=window)==null?0:(b=a.top)==null?0:b.location.href)&&!1}catch(c){return!0}}
;function rc(a){a&&typeof a.dispose=="function"&&a.dispose()}
;function sc(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Ma(d)?sc.apply(null,d):rc(d)}}
;function G(){this.ea=this.ea;this.M=this.M}
G.prototype.ea=!1;G.prototype.dispose=function(){this.ea||(this.ea=!0,this.ba())};
G.prototype[Symbol.dispose]=function(){this.dispose()};
function tc(a,b){a.addOnDisposeCallback(Ya(rc,b))}
G.prototype.addOnDisposeCallback=function(a,b){this.ea?b!==void 0?a.call(b):a():(this.M||(this.M=[]),b&&(a=a.bind(b)),this.M.push(a))};
G.prototype.ba=function(){if(this.M)for(;this.M.length;)this.M.shift()()};function uc(){var a=vc();a=a===void 0?"bevasrsg":a;return new Promise(function(b){var c=window===window.top?window:qc()?window:window.top,d=c[a],e;((e=d)==null?0:e.bevasrs)?b(new wc(d.bevasrs)):(d||(d={},d=(d.nqfbel=[],d),c[a]=d),d.nqfbel.push(function(f){b(new wc(f))}))})}
function wc(a){G.call(this);var b=this;this.vm=a;this.i="keydown keypress keyup input focusin focusout select copy cut paste change click dblclick auxclick pointerover pointerdown pointerup pointermove pointerout dragenter dragleave drag dragend mouseover mousedown mouseup mousemove mouseout touchstart touchend touchmove wheel".split(" ");this.h=void 0;this.Yc=this.vm.p;this.j=this.o.bind(this);this.addOnDisposeCallback(function(){return void xc(b)})}
w(wc,G);wc.prototype.snapshot=function(a){return this.vm.s(Object.assign({},a.wb&&{c:a.wb},a.bd&&{s:a.bd},a.cd!==void 0&&{p:a.cd}))};
wc.prototype.o=function(a){this.vm.e(a)};
function xc(a){a.h!==void 0&&(a.i.forEach(function(b){var c;(c=a.h)==null||c.removeEventListener(b,a.j)}),a.h=void 0)}
;function yc(a){var b=b===void 0?47:b;var c=[];zc(a,Ac,6).forEach(function(d){Bc(d,2)<=b&&c.push(Bc(d,1))});
return c}
function Cc(a){var b=b===void 0?47:b;var c=[];zc(a,Ac,6).forEach(function(d){Bc(d,2)>b&&c.push(Bc(d,1))});
return c}
;var Dc;function Ec(){G.apply(this,arguments);this.j=1;this[Dc]=this.dispose}
w(Ec,G);Ec.prototype.share=function(){if(this.ea)throw Error("E:AD");this.j++;return this};
Ec.prototype.dispose=function(){--this.j||G.prototype.dispose.call(this)};
Dc=Symbol.dispose;function Fc(a){return{fieldType:2,fieldName:a}}
function Gc(a){return{fieldType:3,fieldName:a}}
;function Hc(a){this.h=a;a.Hc("/client_streamz/bg/frs",Gc("mk"))}
Hc.prototype.record=function(a,b){this.h.record("/client_streamz/bg/frs",a,b)};
function Ic(a){this.h=a;a.Hc("/client_streamz/bg/wrl",Gc("mn"),Fc("ac"),Fc("sc"),Gc("rk"),Gc("mk"))}
Ic.prototype.record=function(a,b,c,d,e,f){this.h.record("/client_streamz/bg/wrl",a,b,c,d,e,f)};
function Jc(a){this.h=a;a.Mb("/client_streamz/bg/ec",Gc("en"),Gc("mk"))}
Jc.prototype.kb=function(a,b){this.h.Jb("/client_streamz/bg/ec",a,b)};
function Kc(a){this.h=a;a.Hc("/client_streamz/bg/el",Gc("en"),Gc("rk"),Gc("mk"))}
Kc.prototype.record=function(a,b,c,d){this.h.record("/client_streamz/bg/el",a,b,c,d)};
function Lc(a){this.h=a;a.Mb("/client_streamz/bg/cec",Fc("ec"),Gc("rk"),Gc("mk"))}
Lc.prototype.kb=function(a,b,c){this.h.Jb("/client_streamz/bg/cec",a,b,c)};
function Mc(a){this.h=a;a.Mb("/client_streamz/bg/po/csc",Fc("cs"),Gc("rk"),Gc("mk"))}
Mc.prototype.kb=function(a,b,c){this.h.Jb("/client_streamz/bg/po/csc",a,b,c)};
function Nc(a){this.h=a;a.Mb("/client_streamz/bg/po/ctav",Gc("av"),Gc("rk"),Gc("mk"))}
Nc.prototype.kb=function(a,b,c){this.h.Jb("/client_streamz/bg/po/ctav",a,b,c)};
function Oc(a){this.h=a;a.Mb("/client_streamz/bg/po/cwsc",Gc("su"),Gc("rk"),Gc("mk"))}
Oc.prototype.kb=function(a,b,c){this.h.Jb("/client_streamz/bg/po/cwsc",a,b,c)};function Pc(a){D.setTimeout(function(){throw a;},0)}
;var Qc,Rc=F("CLOSURE_FLAGS"),Sc=Rc&&Rc[610401301];Qc=Sc!=null?Sc:!1;function Tc(){var a=D.navigator;return a&&(a=a.userAgent)?a:""}
var Uc,Vc=D.navigator;Uc=Vc?Vc.userAgentData||null:null;function Wc(a){if(!Qc||!Uc)return!1;for(var b=0;b<Uc.brands.length;b++){var c=Uc.brands[b].brand;if(c&&c.indexOf(a)!=-1)return!0}return!1}
function I(a){return Tc().indexOf(a)!=-1}
;function Xc(){return Qc?!!Uc&&Uc.brands.length>0:!1}
function Yc(){return Xc()?!1:I("Opera")}
function Zc(){return I("Firefox")||I("FxiOS")}
function $c(){return Xc()?Wc("Chromium"):(I("Chrome")||I("CriOS"))&&!(Xc()?0:I("Edge"))||I("Silk")}
;function ad(){return Qc?!!Uc&&!!Uc.platform:!1}
function bd(){return I("iPhone")&&!I("iPod")&&!I("iPad")}
;function cd(a){cd[" "](a);return a}
cd[" "]=function(){};var dd=Yc(),ed=Xc()?!1:I("Trident")||I("MSIE"),fd=I("Edge"),gd=I("Gecko")&&!(Tc().toLowerCase().indexOf("webkit")!=-1&&!I("Edge"))&&!(I("Trident")||I("MSIE"))&&!I("Edge"),hd=Tc().toLowerCase().indexOf("webkit")!=-1&&!I("Edge");hd&&I("Mobile");ad()||I("Macintosh");ad()||I("Windows");(ad()?Uc.platform==="Linux":I("Linux"))||ad()||I("CrOS");var id=ad()?Uc.platform==="Android":I("Android");bd();I("iPad");I("iPod");bd()||I("iPad")||I("iPod");Tc().toLowerCase().indexOf("kaios");Zc();var jd=bd()||I("iPod"),kd=I("iPad");!I("Android")||$c()||Zc()||Yc()||I("Silk");$c();var ld=I("Safari")&&!($c()||(Xc()?0:I("Coast"))||Yc()||(Xc()?0:I("Edge"))||(Xc()?Wc("Microsoft Edge"):I("Edg/"))||(Xc()?Wc("Opera"):I("OPR"))||Zc()||I("Silk")||I("Android"))&&!(bd()||I("iPad")||I("iPod"));var md={},nd=null;function od(a,b){Ma(a);b===void 0&&(b=0);pd();b=md[b];for(var c=Array(Math.floor(a.length/3)),d=b[64]||"",e=0,f=0;e<a.length-2;e+=3){var g=a[e],h=a[e+1],k=a[e+2],l=b[g>>2];g=b[(g&3)<<4|h>>4];h=b[(h&15)<<2|k>>6];k=b[k&63];c[f++]=""+l+g+h+k}l=0;k=d;switch(a.length-e){case 2:l=a[e+1],k=b[(l&15)<<2]||d;case 1:a=a[e],c[f]=""+b[a>>2]+b[(a&3)<<4|l>>4]+k+d}return c.join("")}
function qd(a){var b=a.length,c=b*3/4;c%3?c=Math.floor(c):"=.".indexOf(a[b-1])!=-1&&(c="=.".indexOf(a[b-2])!=-1?c-2:c-1);var d=new Uint8Array(c),e=0;rd(a,function(f){d[e++]=f});
return e!==c?d.subarray(0,e):d}
function rd(a,b){function c(k){for(;d<a.length;){var l=a.charAt(d++),m=nd[l];if(m!=null)return m;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return k}
pd();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(h===64&&e===-1)break;b(e<<2|f>>4);g!=64&&(b(f<<4&240|g>>2),h!=64&&b(g<<6&192|h))}}
function pd(){if(!nd){nd={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;c<5;c++){var d=a.concat(b[c].split(""));md[c]=d;for(var e=0;e<d.length;e++){var f=d[e];nd[f]===void 0&&(nd[f]=e)}}}}
;var sd=typeof Uint8Array!=="undefined",td=!ed&&typeof btoa==="function",ud=/[-_.]/g,vd={"-":"+",_:"/",".":"="};function wd(a){return vd[a]||""}
var xd={};function yd(a,b){zd(b);this.h=a;if(a!=null&&a.length===0)throw Error("ByteString should be constructed with non-empty values");}
yd.prototype.sizeBytes=function(){zd(xd);var a=this.h;if(!(a==null||sd&&a!=null&&a instanceof Uint8Array))if(typeof a==="string")if(td){ud.test(a)&&(a=a.replace(ud,wd));a=atob(a);for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b}else a=qd(a);else La(a),a=null;return(a=a==null?a:this.h=a)?a.length:0};
var Ad;function zd(a){if(a!==xd)throw Error("illegal external caller");}
;var Bd=void 0;function Cd(a){a=Error(a);Tb(a,"warning");return a}
function Dd(a,b){if(a!=null){var c;var d=(c=Bd)!=null?c:Bd={};c=d[a]||0;c>=b||(d[a]=c+1,a=Error(),Tb(a,"incident"),Pc(a))}}
;var Ed=typeof Symbol==="function"&&typeof Symbol()==="symbol";function Fd(a,b,c){return typeof Symbol==="function"&&typeof Symbol()==="symbol"?(c===void 0?0:c)&&Symbol.for&&a?Symbol.for(a):a!=null?Symbol(a):Symbol():b}
var Gd=Fd("jas",void 0,!0),Hd=Fd(void 0,"1oa"),Id=Fd(void 0,"0actk"),Jd=Fd("m_m","Jh",!0),Kd=Fd(void 0,"mrtk"),Ld=Fd(void 0,"vps");Math.max.apply(Math,A(Object.values({lh:1,kh:2,jh:4,oh:8,nh:16,mh:32,Mf:64,qh:128,hh:256,gh:512,Sf:1024,ph:2048,Tf:4096,Nf:8192,ih:16384})));var J=Ed?Gd:"Ee",Md={Ee:{value:0,configurable:!0,writable:!0,enumerable:!1}},Nd=Object.defineProperties;function Od(a,b){Ed||J in a||Nd(a,Md);a[J]|=b}
function Pd(a,b){Ed||J in a||Nd(a,Md);a[J]=b}
;var Qd=typeof Jd==="symbol",Rd={};function L(a){a=a[Jd];var b=a===Rd;Qd&&a&&!b&&Dd(Kd,3);return b}
function Sd(a){return a!==null&&typeof a==="object"&&!Array.isArray(a)&&a.constructor===Object}
var Td,Ud=[];Pd(Ud,55);Td=Object.freeze(Ud);function Vd(a){if(a&2)throw Error();}
var Wd=Object.freeze({});function Xd(){return typeof BigInt==="function"}
;function Yd(a){a.Eh=!0;return a}
;var Zd=Yd(function(a){return typeof a==="number"}),$d=Yd(function(a){return typeof a==="string"}),ae=Yd(function(a){return typeof a==="boolean"});
function be(){var a=ce;return Yd(function(b){for(var c in a)if(b===a[c]&&!/^[0-9]+$/.test(c))return!0;return!1})}
var de=Yd(function(a){return a!=null&&typeof a==="object"&&typeof a.then==="function"});var ee=typeof D.BigInt==="function"&&typeof D.BigInt(0)==="bigint";function fe(a){var b=a;if($d(b)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b))throw Error(String(b));}else if(Zd(b)&&!Number.isSafeInteger(b))throw Error(String(b));return ee?BigInt(a):a=ae(a)?a?"1":"0":$d(a)?a.trim()||"0":String(a)}
var le=Yd(function(a){return ee?a>=ge&&a<=he:a[0]==="-"?ie(a,je):ie(a,ke)}),je=Number.MIN_SAFE_INTEGER.toString(),ge=ee?BigInt(Number.MIN_SAFE_INTEGER):void 0,ke=Number.MAX_SAFE_INTEGER.toString(),he=ee?BigInt(Number.MAX_SAFE_INTEGER):void 0;
function ie(a,b){if(a.length>b.length)return!1;if(a.length<b.length||a===b)return!0;for(var c=0;c<a.length;c++){var d=a[c],e=b[c];if(d>e)return!1;if(d<e)return!0}}
;var me=0,ne=0;function oe(a){var b=a>>>0;me=b;ne=(a-b)/4294967296>>>0}
function pe(a){if(a<0){oe(0-a);var b=y(qe(me,ne));a=b.next().value;b=b.next().value;me=a>>>0;ne=b>>>0}else oe(a)}
function re(a,b){b>>>=0;a>>>=0;if(b<=2097151)var c=""+(4294967296*b+a);else Xd()?c=""+(BigInt(b)<<BigInt(32)|BigInt(a)):(c=(a>>>24|b<<8)&16777215,b=b>>16&65535,a=(a&16777215)+c*6777216+b*6710656,c+=b*8147497,b*=2,a>=1E7&&(c+=a/1E7>>>0,a%=1E7),c>=1E7&&(b+=c/1E7>>>0,c%=1E7),c=b+se(c)+se(a));return c}
function se(a){a=String(a);return"0000000".slice(a.length)+a}
function te(){var a=me,b=ne;b&2147483648?Xd()?a=""+(BigInt(b|0)<<BigInt(32)|BigInt(a>>>0)):(b=y(qe(a,b)),a=b.next().value,b=b.next().value,a="-"+re(a,b)):a=re(a,b);return a}
function qe(a,b){b=~b;a?a=~a+1:b+=1;return[a,b]}
;function ue(a){return Array.prototype.slice.call(a)}
;var ve=typeof BigInt==="function"?BigInt.asIntN:void 0,we=Number.isSafeInteger,xe=Number.isFinite,ye=Math.trunc;function ze(a){return a.displayName||a.name||"unknown type name"}
function Ae(a){if(a!=null&&typeof a!=="boolean")throw Error("Expected boolean but got "+La(a)+": "+a);return a}
var Be=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Ce(a){switch(typeof a){case "bigint":return!0;case "number":return xe(a);case "string":return Be.test(a);default:return!1}}
function De(a){if(typeof a!=="number")throw Cd("int32");if(!xe(a))throw Cd("int32");return a|0}
function Ee(a){return a==null?a:De(a)}
function Fe(a){if(a==null)return a;if(typeof a==="string"&&a)a=+a;else if(typeof a!=="number")return;return xe(a)?a|0:void 0}
function Ge(a){var b=0;b=b===void 0?0:b;if(!Ce(a))throw Cd("int64");var c=typeof a;switch(b){case 2048:switch(c){case "string":return He(a);case "bigint":return String(ve(64,a));default:return Ie(a)}case 4096:switch(c){case "string":return b=ye(Number(a)),we(b)?a=fe(b):(b=a.indexOf("."),b!==-1&&(a=a.substring(0,b)),a=Xd()?fe(ve(64,BigInt(a))):fe(Je(a))),a;case "bigint":return fe(ve(64,a));default:return we(a)?fe(Ke(a)):fe(Ie(a))}case 0:switch(c){case "string":return He(a);case "bigint":return fe(ve(64,
a));default:return Ke(a)}default:return xb(b,"Unknown format requested type for int64")}}
function Le(a){return a==null?a:Ge(a)}
function Me(a){var b=a.length;return a[0]==="-"?b<20?!0:b===20&&Number(a.substring(0,7))>-922337:b<19?!0:b===19&&Number(a.substring(0,6))<922337}
function Je(a){a.indexOf(".");if(Me(a))return a;if(a.length<16)pe(Number(a));else if(Xd())a=BigInt(a),me=Number(a&BigInt(4294967295))>>>0,ne=Number(a>>BigInt(32)&BigInt(4294967295));else{var b=+(a[0]==="-");ne=me=0;for(var c=a.length,d=0+b,e=(c-b)%6+b;e<=c;d=e,e+=6)d=Number(a.slice(d,e)),ne*=1E6,me=me*1E6+d,me>=4294967296&&(ne+=Math.trunc(me/4294967296),ne>>>=0,me>>>=0);b&&(b=y(qe(me,ne)),a=b.next().value,b=b.next().value,me=a,ne=b)}return te()}
function Ke(a){Ce(a);a=ye(a);if(!we(a)){pe(a);var b=me,c=ne;if(a=c&2147483648)b=~b+1>>>0,c=~c>>>0,b==0&&(c=c+1>>>0);var d=c*4294967296+(b>>>0);b=Number.isSafeInteger(d)?d:re(b,c);a=typeof b==="number"?a?-b:b:a?"-"+b:b}return a}
function Ie(a){Ce(a);a=ye(a);if(we(a))a=String(a);else{var b=String(a);Me(b)?a=b:(pe(a),a=te())}return a}
function He(a){Ce(a);var b=ye(Number(a));if(we(b))return String(b);b=a.indexOf(".");b!==-1&&(a=a.substring(0,b));return Je(a)}
function Ne(a){if(a==null)return a;if(typeof a==="bigint")return le(a)?a=Number(a):(a=ve(64,a),a=le(a)?Number(a):String(a)),a;if(Ce(a))return typeof a==="number"?Ke(a):He(a)}
function Oe(a){if(typeof a!=="string")throw Error();return a}
function Pe(a){if(a!=null&&typeof a!=="string")throw Error();return a}
function Qe(a){return a==null||typeof a==="string"?a:void 0}
function Re(a,b){if(!(a instanceof b))throw Error("Expected instanceof "+ze(b)+" but got "+(a&&ze(a.constructor)));}
function Se(a,b,c){if(a!=null&&typeof a==="object"&&L(a))return a;if(Array.isArray(a)){var d=a[J]|0,e=d;e===0&&(e|=c&32);e|=c&2;e!==d&&Pd(a,e);return new b(a)}}
;var Te={};function Ue(a){return a}
;function Ve(a,b,c,d,e){d=d?!!(b&32):void 0;var f=[],g=a.length,h=!1;if(b&64){if(b&256){g--;var k=a[g];var l=g;Sd(k)}else l=4294967295,k=void 0,g&&Sd(a[g-1]);if(!(e||b&512)){h=!0;var m;var n=((m=We)!=null?m:Ue)(k?l- -1:b>>15&1023||536870912,-1,a,k);l=n+-1}}else l=4294967295,b&1||(k=g&&a[g-1],Sd(k)?(g--,l=g,n=0):k=void 0);m=void 0;for(var p=0;p<g;p++){var t=a[p];if(t!=null&&(t=c(t,d))!=null)if(p>=l){var v=void 0;((v=m)!=null?v:m={})[p- -1]=t}else f[p]=t}if(k)for(var x in k)a=k[x],a!=null&&(a=c(a,d))!=
null&&(g=+x,g<n?f[g+-1]=a:(g=void 0,((g=m)!=null?g:m={})[x]=a));m&&(h?f.push(m):f[l]=m);e&&Pd(f,b&33522241|(m!=null?290:34));return f}
function Xe(a){switch(typeof a){case "number":return Number.isFinite(a)?a:""+a;case "bigint":return le(a)?Number(a):""+a;case "boolean":return a?1:0;case "object":if(Array.isArray(a)){var b=a[J]|0;return a.length===0&&b&1?void 0:Ve(a,b,Xe,!1,!1)}if(L(a))return Ye(a);if(a instanceof yd){b=a.h;if(b==null)a="";else if(typeof b==="string")a=b;else{if(td){for(var c="",d=0,e=b.length-10240;d<e;)c+=String.fromCharCode.apply(null,b.subarray(d,d+=10240));c+=String.fromCharCode.apply(null,d?b.subarray(d):b);
b=btoa(c)}else b=od(b);a=a.h=b}return a}return}return a}
var We;function Ze(a,b){if(b){We=b==null||b===Ue||b[Ld]!==Te?Ue:b;try{return Ye(a)}finally{We=void 0}}return Ye(a)}
function Ye(a){L(a);a=a.F;return Ve(a,a[J]|0,Xe,void 0,!1)}
;function M(a,b,c){if(a==null){var d=96;c?(a=[c],d|=512):a=[];b&&(d=d&-33521665|(b&1023)<<15)}else{if(!Array.isArray(a))throw Error("narr");d=a[J]|0;8192&d||!(64&d)||2&d||$e();if(d&1024)throw Error("farr");if(d&64)return d&16384||Pd(a,d|16384),a;d|=64;if(c&&(d|=512,c!==a[0]))throw Error("mid");a:{c=a;var e=c.length;if(e){var f=e-1,g=c[f];if(Sd(g)){d|=256;b=d&512?0:-1;f-=b;if(f>=1024)throw Error("pvtlmt");for(var h in g)e=+h,e<f&&(c[e+b]=g[h],delete g[h]);d=d&-33521665|(f&1023)<<15;break a}}if(b){h=
Math.max(b,e-(d&512?0:-1));if(h>1024)throw Error("spvt");d=d&-33521665|(h&1023)<<15}}}Pd(a,d|16384);return a}
function $e(){Dd(Id,5)}
;function af(a,b){if(typeof a!=="object")return a;if(Array.isArray(a)){var c=a[J]|0;if(a.length===0&&c&1)return;if(c&2)return a;var d;if(d=b)d=c===0||!!(c&32)&&!(c&64||!(c&16));return d?(Od(a,34),c&4&&Object.freeze(a),a):Ve(a,c,af,b!==void 0,!0)}if(L(a))return L(a),L(a),b=a.F,c=b[J]|0,c&2?a:Ve(b,c,af,!0,!0);if(a instanceof yd)return a}
function bf(a){var b=a;L(b);b=b.F;if(!((b[J]|0)&2))return a;b=a=new a.constructor(Ve(b,b[J]|0,af,!0,!0));L(b);b=b.F;b[J]&=-3;return a}
;function cf(a,b){Object.isExtensible(a);L(a);a=a.F;return df(a,a[J]|0,b)}
function df(a,b,c){if(c===-1)return null;var d=c+(b&512?0:-1),e=a.length-1;if(d>=e&&b&256)a=a[e][c];else if(d<=e)a=a[d];else return;return a}
function ef(a,b,c){L(a);var d=a.F;var e=d[J]|0;Vd(e);ff(d,e,b,c);return a}
function ff(a,b,c,d){var e=b&512?0:-1,f=c+e,g=a.length-1;if(f>=g&&b&256)return a[g][c]=d,b;if(f<=g)return a[f]=d,b;d!==void 0&&(g=b>>15&1023||536870912,c>=g?d!=null&&(f={},a[g+e]=(f[c]=d,f),b|=256,Pd(a,b)):a[f]=d);return b}
function gf(a){return!!(2&a)&&!!(4&a)||!!(1024&a)}
function hf(a,b,c){L(a);var d=a.F;var e=d[J]|0;Vd(e);if(b==null)return ff(d,e,3),a;if(!Array.isArray(b))throw Cd();var f=b[J]|0,g=f,h=gf(f),k=h||Object.isFrozen(b);h||(f=0);k||(b=ue(b),g=0,f=jf(f,e),f=kf(f,e,!0),k=!1);f|=21;h=4&f?2048&f?2048:4096&f?4096:0:void 0;h=h!=null?h:0;for(var l=0;l<b.length;l++){var m=b[l],n=c(m,h);Object.is(m,n)||(k&&(b=ue(b),g=0,f=jf(f,e),f=kf(f,e,!0),k=!1),b[l]=n)}f!==g&&(k&&(b=ue(b),f=jf(f,e),f=kf(f,e,!0)),Pd(b,f));ff(d,e,3,b);return a}
function lf(a,b,c,d){L(a);a=a.F;var e=a[J]|0;Vd(e);if(d==null){var f=mf(a);if(nf(f,a,e,c)===b)f.set(c,0);else return}else{c.includes(b);f=mf(a);var g=nf(f,a,e,c);g!==b&&(g&&(e=ff(a,e,g)),f.set(c,b))}ff(a,e,b,d)}
function mf(a){if(Ed){var b;return(b=a[Hd])!=null?b:a[Hd]=new Map}if(Hd in a)return a[Hd];b=new Map;Object.defineProperty(a,Hd,{value:b});return b}
function nf(a,b,c,d){var e=a.get(d);if(e!=null)return e;for(var f=e=0;f<d.length;f++){var g=d[f];df(b,c,g)!=null&&(e!==0&&(c=ff(b,c,e)),e=g)}a.set(d,e);return e}
function of(a,b,c){L(a);a=a.F;var d=a[J]|0,e=df(a,d,c);b=Se(e,b,d);b!==e&&b!=null&&ff(a,d,c,b);return b}
function pf(a,b,c){b=of(a,b,c);if(b==null)return b;L(a);a=a.F;var d=a[J]|0;if(!(d&2)){var e=bf(b);e!==b&&(b=e,ff(a,d,c,b))}return b}
function zc(a,b,c){var d=void 0===Wd?2:4;L(a);var e=a.F[J]|0,f=e,g=!(2&e);e=!1;L(a);a=a.F;var h=!!(2&f),k=h?1:d;e=!!e;g&&(g=!h);d=df(a,f,c);d=Array.isArray(d)?d:Td;var l=d[J]|0;h=!!(4&l);if(!h){var m=l;m===0&&(m=jf(m,f));l=d;m|=1;var n=f,p=!!(2&m);p&&(n|=2);for(var t=!p,v=!0,x=0,z=0;x<l.length;x++){var H=Se(l[x],b,n);if(H instanceof b){if(!p){L(H);var K=!!((H.F[J]|0)&2);t&&(t=!K);v&&(v=K)}l[z++]=H}}z<x&&(l.length=z);m|=4;m=v?m|16:m&-17;m=t?m|8:m&-9;Pd(l,m);p&&Object.freeze(l);l=m}if(g&&!(8&l||!d.length&&
(k===1||k===4&&32&l))){gf(l)&&(d=ue(d),l=jf(l,f),f=ff(a,f,c,d));b=d;g=l;for(l=0;l<b.length;l++)m=b[l],n=bf(m),m!==n&&(b[l]=n);g|=8;g=b.length?g&-17:g|16;Pd(b,g);l=g}k===1||k===4&&32&l?gf(l)||(f=l,c=!!(32&l),l|=!d.length||16&l&&(!h||c)?2:1024,l!==f&&Pd(d,l),Object.freeze(d)):(k===2&&gf(l)&&(d=ue(d),l=jf(l,f),l=kf(l,f,e),Pd(d,l),f=ff(a,f,c,d)),gf(l)||(c=l,l=kf(l,f,e),l!==c&&Pd(d,l)));return d}
function qf(a,b,c,d){d!=null?Re(d,b):d=void 0;return ef(a,c,d)}
function rf(a,b,c,d){L(a);var e=a.F;var f=e[J]|0;Vd(f);if(d==null)return ff(e,f,c),a;if(!Array.isArray(d))throw Cd();for(var g=d[J]|0,h=g,k=gf(g),l=k||Object.isFrozen(d),m=!0,n=!0,p=0;p<d.length;p++){var t=d[p];Re(t,b);k||(L(t),t=!!((t.F[J]|0)&2),m&&(m=!t),n&&(n=t))}k||(g=m?13:5,g=n?g|16:g&-17);l&&g===h||(d=ue(d),h=0,g=jf(g,f),g=kf(g,f,!0));g!==h&&Pd(d,g);ff(e,f,c,d);return a}
function jf(a,b){a=(2&b?a|2:a&-3)|32;return a&=-1025}
function kf(a,b,c){32&b&&c||(a&=-33);return a}
function sf(a){a=cf(a,1);var b=b===void 0?!1:b;var c=typeof a;b=a==null?a:c==="bigint"?String(ve(64,a)):Ce(a)?c==="string"?He(a):b?Ie(a):Ke(a):void 0;return b}
function Bc(a,b,c){c=c===void 0?0:c;var d;return(d=Fe(cf(a,b)))!=null?d:c}
function tf(a,b){var c=c===void 0?"":c;var d;return(d=Qe(cf(a,b)))!=null?d:c}
function uf(a){var b=b===void 0?0:b;a=cf(a,1);a=a==null?a:xe(a)?a|0:void 0;return a!=null?a:b}
function vf(a,b,c){return ef(a,b,Pe(c))}
function wf(a,b,c){c=Pe(c);L(a);a=a.F;var d=a[J]|0;Vd(d);ff(a,d,b,c===""?void 0:c)}
function xf(a,b,c){if(c!=null){if(!xe(c))throw Cd("enum");c|=0}return ef(a,b,c)}
;function N(a,b,c){a=M(a,b,c);L(this);this.F=a}
N.prototype.toJSON=function(){return Ze(this)};
N.prototype.serialize=function(a){return JSON.stringify(Ze(this,a))};
function yf(a,b){if(b==null||b=="")return new a;b=JSON.parse(b);if(!Array.isArray(b))throw Error("dnarr");Od(b,32);return new a(b)}
N.prototype.clone=function(){var a=this;L(a);var b=a;L(b);b=b.F;b=a=new a.constructor(Ve(b,b[J]|0,af,!0,!0));L(b);b=b.F;b[J]&=-3;return a};
N.prototype[Jd]=Rd;N.prototype.toString=function(){L(this);return this.F.toString()};function zf(){this.ctor=Af;this.isRepeated=0;this.h=pf;this.defaultValue=void 0}
zf.prototype.register=function(){cd(this)};function Bf(a){return function(b){return yf(a,b)}}
;function Cf(a){a=M(a);L(this);this.F=a}
w(Cf,N);function Df(a,b){return hf(a,b,De)}
;function Ef(a){a=M(a);L(this);this.F=a}
w(Ef,N);var Ff=[1,2,3];function Gf(a){a=M(a);L(this);this.F=a}
w(Gf,N);var Hf=[1,2,3];function If(a){a=M(a);L(this);this.F=a}
w(If,N);function Jf(a){a=M(a);L(this);this.F=a}
w(Jf,N);function Kf(a){a=M(a);L(this);this.F=a}
w(Kf,N);function Lf(a){if(!a)return"";if(/^about:(?:blank|srcdoc)$/.test(a))return window.origin||"";a.indexOf("blob:")===0&&(a=a.substring(5));a=a.split("#")[0].split("?")[0];a=a.toLowerCase();a.indexOf("//")==0&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");c!=-1&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if(c!=="http"&&c!=="https"&&c!=="chrome-extension"&&
c!=="moz-extension"&&c!=="file"&&c!=="android-app"&&c!=="chrome-search"&&c!=="chrome-untrusted"&&c!=="chrome"&&c!=="app"&&c!=="devtools")throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(d!=-1){var e=b.substring(d+1);b=b.substring(0,d);if(c==="http"&&e!=="80"||c==="https"&&e!=="443")a=":"+e}return c+"://"+b+a}
;function Mf(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(n){for(var p=g,t=0;t<64;t+=4)p[t/4]=n[t]<<24|n[t+1]<<16|n[t+2]<<8|n[t+3];for(t=16;t<80;t++)n=p[t-3]^p[t-8]^p[t-14]^p[t-16],p[t]=(n<<1|n>>>31)&4294967295;n=e[0];var v=e[1],x=e[2],z=e[3],H=e[4];for(t=0;t<80;t++){if(t<40)if(t<20){var K=z^v&(x^z);var ca=1518500249}else K=v^x^z,ca=1859775393;else t<60?(K=v&x|z&(v|x),ca=2400959708):(K=v^x^z,ca=3395469782);K=((n<<5|n>>>27)&4294967295)+K+H+ca+p[t]&4294967295;H=z;z=x;x=(v<<30|v>>>2)&4294967295;v=n;n=K}e[0]=e[0]+n&4294967295;e[1]=e[1]+v&4294967295;
e[2]=e[2]+x&4294967295;e[3]=e[3]+z&4294967295;e[4]=e[4]+H&4294967295}
function c(n,p){if(typeof n==="string"){n=unescape(encodeURIComponent(n));for(var t=[],v=0,x=n.length;v<x;++v)t.push(n.charCodeAt(v));n=t}p||(p=n.length);t=0;if(l==0)for(;t+64<p;)b(n.slice(t,t+64)),t+=64,m+=64;for(;t<p;)if(f[l++]=n[t++],m++,l==64)for(l=0,b(f);t+64<p;)b(n.slice(t,t+64)),t+=64,m+=64}
function d(){var n=[],p=m*8;l<56?c(h,56-l):c(h,64-(l-56));for(var t=63;t>=56;t--)f[t]=p&255,p>>>=8;b(f);for(t=p=0;t<5;t++)for(var v=24;v>=0;v-=8)n[p++]=e[t]>>v&255;return n}
for(var e=[],f=[],g=[],h=[128],k=1;k<64;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,he:function(){for(var n=d(),p="",t=0;t<n.length;t++)p+="0123456789ABCDEF".charAt(Math.floor(n[t]/16))+"0123456789ABCDEF".charAt(n[t]%16);return p}}}
;function Nf(a,b,c){var d=String(D.location.href);return d&&a&&b?[b,Of(Lf(d),a,c||null)].join(" "):null}
function Of(a,b,c){var d=[],e=[];if((Array.isArray(c)?2:1)==1)return e=[b,a],Mb(d,function(h){e.push(h)}),Pf(e.join(" "));
var f=[],g=[];Mb(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=f.length==0?[c,b,a]:[f.join(":"),c,b,a];Mb(d,function(h){e.push(h)});
a=Pf(e.join(" "));a=[c,a];g.length==0||a.push(g.join(""));return a.join("_")}
function Pf(a){var b=Mf();b.update(a);return b.he().toLowerCase()}
;function Qf(a){this.h=a||{cookie:""}}
r=Qf.prototype;r.isEnabled=function(){if(!D.navigator.cookieEnabled)return!1;if(this.h.cookie)return!0;this.set("TESTCOOKIESENABLED","1",{Vb:60});if(this.get("TESTCOOKIESENABLED")!=="1")return!1;this.remove("TESTCOOKIESENABLED");return!0};
r.set=function(a,b,c){var d=!1;if(typeof c==="object"){var e=c.af;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Vb}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');h===void 0&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=h<0?"":h==0?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+h*1E3)).toUTCString();this.h.cookie=a+"="+b+c+g+h+d+(e!=null?";samesite="+
e:"")};
r.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=cb(d[e]);if(f.lastIndexOf(c,0)==0)return f.slice(c.length);if(f==a)return""}return b};
r.remove=function(a,b,c){var d=this.get(a)!==void 0;this.set(a,"",{Vb:0,path:b,domain:c});return d};
r.clear=function(){for(var a=(this.h.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=cb(a[f]),d=e.indexOf("="),d==-1?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;a>=0;a--)this.remove(b[a])};
var Rf=new Qf(typeof document=="undefined"?null:document);function Sf(){var a=D.__SAPISID||D.__APISID||D.__3PSAPISID||D.__1PSAPISID||D.__OVERRIDE_SID;if(a)return!0;typeof document!=="undefined"&&(a=new Qf(document),a=a.get("SAPISID")||a.get("APISID")||a.get("__Secure-3PAPISID")||a.get("__Secure-1PAPISID"));return!!a}
function Tf(a,b,c,d){(a=D[a])||typeof document==="undefined"||(a=(new Qf(document)).get(b));return a?Nf(a,c,d):null}
function Uf(a){var b=Lf(String(D.location.href)),c=[];if(Sf()){b=b.indexOf("https:")==0||b.indexOf("chrome-extension:")==0||b.indexOf("chrome-untrusted://new-tab-page")==0||b.indexOf("moz-extension:")==0;var d=b?D.__SAPISID:D.__APISID;d||typeof document==="undefined"||(d=new Qf(document),d=d.get(b?"SAPISID":"APISID")||d.get("__Secure-3PAPISID"));(d=d?Nf(d,b?"SAPISIDHASH":"APISIDHASH",a):null)&&c.push(d);b&&((b=Tf("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",a))&&c.push(b),(a=Tf("__3PSAPISID",
"__Secure-3PAPISID","SAPISID3PHASH",a))&&c.push(a))}return c.length==0?null:c.join(" ")}
;function Vf(){}
Vf.prototype.compress=function(a){var b,c,d,e;return B(function(f){switch(f.h){case 1:return b=new CompressionStream("gzip"),c=(new Response(b.readable)).arrayBuffer(),d=b.writable.getWriter(),f.yield(d.write((new TextEncoder).encode(a)),2);case 2:return f.yield(d.close(),3);case 3:return e=Uint8Array,f.yield(c,4);case 4:return f.return(new e(f.i))}})};
Vf.prototype.isSupported=function(a){return a<1024?!1:typeof CompressionStream!=="undefined"};function Wf(a){a=M(a);L(this);this.F=a}
w(Wf,N);function Xf(a,b){this.intervalMs=a;this.callback=b;this.enabled=!1;this.h=function(){return $a()};
this.i=this.h()}
Xf.prototype.setInterval=function(a){this.intervalMs=a;this.timer&&this.enabled?(this.stop(),this.start()):this.timer&&this.stop()};
Xf.prototype.start=function(){var a=this;this.enabled=!0;this.timer||(this.timer=setTimeout(function(){a.tick()},this.intervalMs),this.i=this.h())};
Xf.prototype.stop=function(){this.enabled=!1;this.timer&&(clearTimeout(this.timer),this.timer=void 0)};
Xf.prototype.tick=function(){var a=this;if(this.enabled){var b=Math.max(this.h()-this.i,0);b<this.intervalMs*.8?this.timer=setTimeout(function(){a.tick()},this.intervalMs-b):(this.timer&&(clearTimeout(this.timer),this.timer=void 0),this.callback(),this.enabled&&(this.stop(),this.start()))}else this.timer=void 0};function Yf(a){a=M(a);L(this);this.F=a}
w(Yf,N);function Zf(a){a=M(a);L(this);this.F=a}
w(Zf,N);function $f(a,b){this.x=a!==void 0?a:0;this.y=b!==void 0?b:0}
r=$f.prototype;r.clone=function(){return new $f(this.x,this.y)};
r.equals=function(a){return a instanceof $f&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
r.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
r.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
r.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
r.scale=function(a,b){this.x*=a;this.y*=typeof b==="number"?b:a;return this};function ag(a,b){this.width=a;this.height=b}
r=ag.prototype;r.clone=function(){return new ag(this.width,this.height)};
r.aspectRatio=function(){return this.width/this.height};
r.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
r.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
r.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
r.scale=function(a,b){this.width*=a;this.height*=typeof b==="number"?b:a;return this};function bg(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function cg(a){var b=dg,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function eg(a){for(var b in a)return!1;return!0}
function fg(a,b){if(a!==null&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function gg(a){return a!==null&&"privembed"in a?a.privembed:!1}
function hg(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function ig(a){var b={},c;for(c in a)b[c]=a[c];return b}
function jg(a){if(!a||typeof a!=="object")return a;if(typeof a.clone==="function")return a.clone();if(typeof Map!=="undefined"&&a instanceof Map)return new Map(a);if(typeof Set!=="undefined"&&a instanceof Set)return new Set(a);if(a instanceof Date)return new Date(a.getTime());var b=Array.isArray(a)?[]:typeof ArrayBuffer!=="function"||typeof ArrayBuffer.isView!=="function"||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=jg(a[c]);return b}
var kg="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function lg(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<kg.length;f++)c=kg[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function mg(a,b){this.h=a===ng&&b||""}
mg.prototype.toString=function(){return this.h};
var ng={};new mg(ng,"");"ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" ").concat(["BUTTON",
"INPUT"]);function og(a){var b=document;return typeof a==="string"?b.getElementById(a):a}
function pg(a){var b=document;a=String(a);b.contentType==="application/xhtml+xml"&&(a=a.toLowerCase());return b.createElement(a)}
function qg(a){a&&a.parentNode&&a.parentNode.removeChild(a)}
function rg(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function sg(a){a=M(a);L(this);this.F=a}
w(sg,N);sg.prototype.oc=function(){return uf(this)};function tg(a){a=M(a);L(this);this.F=a}
w(tg,N);function ug(a){a=M(a);L(this);this.F=a}
w(ug,N);function vg(a,b){rf(a,tg,1,b)}
;function wg(a){a=M(a);L(this);this.F=a}
w(wg,N);var xg=["platform","platformVersion","architecture","model","uaFullVersion"],yg=new ug,zg=null;function Ag(a,b){b=b===void 0?xg:b;if(!zg){var c;a=(c=a.navigator)==null?void 0:c.userAgentData;if(!a||typeof a.getHighEntropyValues!=="function"||a.brands&&typeof a.brands.map!=="function")return Promise.reject(Error("UACH unavailable"));c=(a.brands||[]).map(function(e){var f=new tg;f=vf(f,1,e.brand);return vf(f,2,e.version)});
vg(ef(yg,2,Ae(a.mobile)),c);zg=a.getHighEntropyValues(b)}var d=new Set(b);return zg.then(function(e){var f=yg.clone();d.has("platform")&&vf(f,3,e.platform);d.has("platformVersion")&&vf(f,4,e.platformVersion);d.has("architecture")&&vf(f,5,e.architecture);d.has("model")&&vf(f,6,e.model);d.has("uaFullVersion")&&vf(f,7,e.uaFullVersion);return f}).catch(function(){return yg.clone()})}
;function Bg(a){a=M(a);L(this);this.F=a}
w(Bg,N);function Cg(a){a=M(a,4);L(this);this.F=a}
w(Cg,N);function Dg(a){a=M(a,36);L(this);this.F=a}
w(Dg,N);function Eg(a){a=M(a,19);L(this);this.F=a}
w(Eg,N);Eg.prototype.Yb=function(a){return xf(this,2,a)};function Fg(a,b){this.Wa=b=b===void 0?!1:b;this.j=this.locale=null;this.i=0;this.isFinal=!1;this.h=new Eg;Number.isInteger(a)&&this.h.Yb(a);b||(this.locale=document.documentElement.getAttribute("lang"));Gg(this,new Bg)}
Fg.prototype.Yb=function(a){this.h.Yb(a);return this};
function Gg(a,b){qf(a.h,Bg,1,b);uf(b)||xf(b,1,1);a.Wa||(b=Hg(a),tf(b,5)||vf(b,5,a.locale));a.j&&(b=Hg(a),pf(b,ug,9)||qf(b,ug,9,a.j))}
function Ig(a,b){a.i=b}
function Jg(a){var b=b===void 0?xg:b;var c=a.Wa?void 0:window;c?Ag(c,b).then(function(d){a.j=d;d=Hg(a);qf(d,ug,9,a.j);return!0}).catch(function(){return!1}):Promise.resolve(!1)}
function Hg(a){a=pf(a.h,Bg,1);var b=pf(a,wg,11);b||(b=new wg,qf(a,wg,11,b));return b}
function Kg(a,b,c,d,e,f,g){c=c===void 0?0:c;d=d===void 0?0:d;e=e===void 0?null:e;f=f===void 0?0:f;g=g===void 0?0:g;if(of(pf(a.h,Bg,1),wg,11)!==void 0){var h=Hg(a);var k=new sg;k=xf(k,1,a.i);k=ef(k,2,Ae(a.isFinal));d=ef(k,3,Ee(d>0?d:void 0));d=ef(d,4,Ee(f>0?f:void 0));d=ef(d,5,Ee(g>0?g:void 0));L(d);f=d.F;g=f[J]|0;d=g&2?d:new d.constructor(Ve(f,g,af,!0,!0));qf(h,sg,10,d)}a=a.h.clone();h=Date.now().toString();a=ef(a,4,Le(h));b=b.slice();b=rf(a,Dg,3,b);e&&(a=new Yf,e=ef(a,13,Ee(e)),a=new Zf,e=qf(a,Yf,
2,e),a=new Cg,e=qf(a,Zf,1,e),e=xf(e,2,9),qf(b,Cg,18,e));c&&ef(b,14,Le(c));return b}
;var Lg=function(){if(!D.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{var c=function(){};
D.addEventListener("test",c,b);D.removeEventListener("test",c,b)}catch(d){}return a}();function Mg(a){this.h=this.i=this.j=a}
Mg.prototype.reset=function(){this.h=this.i=this.j};
Mg.prototype.getValue=function(){return this.i};function Ng(a){a=M(a,8);L(this);this.F=a}
w(Ng,N);var Og=Bf(Ng);function Af(a){a=M(a);L(this);this.F=a}
w(Af,N);var Pg=new zf;function Qg(a){G.call(this);var b=this;this.componentId="";this.h=[];this.Qa="";this.pageId=null;this.eb=this.ma=-1;this.G=this.experimentIds=null;this.D=this.o=0;this.U=null;this.Z=this.ha=0;this.Kb=1;this.timeoutMillis=0;this.xa=!1;this.logSource=a.logSource;this.ib=a.ib||function(){};
this.j=new Fg(a.logSource,a.Wa);this.network=a.network||null;this.ob=a.ob||null;this.bufferSize=1E3;this.P=a.yf||null;this.sessionIndex=a.sessionIndex||null;this.Qb=a.Qb||!1;this.logger=null;this.withCredentials=!a.pd;this.Wa=a.Wa||!1;this.Y=!this.Wa&&!!window&&!!window.navigator&&window.navigator.sendBeacon!==void 0;this.Pa=typeof URLSearchParams!=="undefined"&&!!(new URL(Rg())).searchParams&&!!(new URL(Rg())).searchParams.set;var c=xf(new Bg,1,1);Gg(this.j,c);this.u=new Mg(1E4);a=Sg(this,a.kd);
this.i=new Xf(this.u.getValue(),a);this.Fa=new Xf(6E5,a);this.Qb||this.Fa.start();this.Wa||(document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){Tg(b);var d;(d=b.U)==null||d.flush()}}),document.addEventListener("pagehide",function(){Tg(b);
var d;(d=b.U)==null||d.flush()}))}
w(Qg,G);function Sg(a,b){return a.Pa?b?function(){b().then(function(){a.flush()})}:function(){a.flush()}:function(){}}
Qg.prototype.ba=function(){Tg(this);this.i.stop();this.Fa.stop();G.prototype.ba.call(this)};
function Ug(a){a.P||(a.P=Rg());try{return(new URL(a.P)).toString()}catch(b){return(new URL(a.P,window.location.origin)).toString()}}
function Vg(a,b,c){a.U&&a.U.kb(b,c)}
Qg.prototype.log=function(a){Vg(this,2,1);if(this.Pa){a=a.clone();var b=this.Kb++;a=ef(a,21,Le(b));this.componentId&&vf(a,26,this.componentId);b=a;if(sf(b)==null){var c=Date.now();c=Number.isFinite(c)?c.toString():"0";ef(b,1,Le(c))}Ne(cf(b,15))==null&&ef(b,15,Le((new Date).getTimezoneOffset()*60));this.experimentIds&&(c=this.experimentIds.clone(),qf(b,Wf,16,c));Vg(this,1,1);b=this.h.length-this.bufferSize+1;b>0&&(this.h.splice(0,b),this.o+=b,Vg(this,3,b));this.h.push(a);this.Qb||this.i.enabled||this.i.start()}};
Qg.prototype.flush=function(a,b){var c=this;if(this.h.length===0)a&&a();else if(this.xa&&this.Y)this.j.i=3,Wg(this);else{var d=Date.now();if(this.eb>d&&this.ma<d)b&&b("throttled");else{this.network&&(typeof this.network.oc==="function"?Ig(this.j,this.network.oc()):this.j.i=0);var e=this.h.length,f=Kg(this.j,this.h,this.o,this.D,this.ob,this.ha,this.Z),g=this.ib();if(g&&this.Qa===g)b&&b("stale-auth-token");else{this.h=[];this.i.enabled&&this.i.stop();this.o=0;d=f.serialize();var h;this.G&&this.G.isSupported(d.length)&&
(h=this.G.compress(d));var k=Xg(this,d,g),l=function(p){c.u.reset();c.i.setInterval(c.u.getValue());if(p){var t=null;try{var v=JSON.stringify(JSON.parse(p.replace(")]}'\n","")));t=Og(v)}catch(H){}if(t){p=Number;var x="-1";x=x===void 0?"0":x;var z;v=(z=sf(t))!=null?z:x;z=p(v);z>0&&(c.ma=Date.now(),c.eb=c.ma+z);L(t);t=Pg.ctor?Pg.h(t,Pg.ctor,175237375):Pg.h(t,175237375,null);if(t=t===null?void 0:t)t=Bc(t,1,-1),t!==-1&&(c.u=new Mg(t<1?1:t),c.i.setInterval(c.u.getValue()))}}a&&a();c.D=0},m=function(p,
t){var v=zc(f,Dg,3);
var x;var z=(x=Ne(cf(f,14)))!=null?x:void 0;x=c.u;x.h=Math.min(3E5,x.h*2);x.i=Math.min(3E5,x.h+Math.round(.1*(Math.random()-.5)*2*x.h));c.i.setInterval(c.u.getValue());p===401&&g&&(c.Qa=g);z&&(c.o+=z);t===void 0&&(t=c.isRetryable(p));t&&(c.h=v.concat(c.h),c.Qb||c.i.enabled||c.i.start());Vg(c,7,1);b&&b("net-send-failed",p);++c.D},n=function(){c.network&&c.network.send(k,l,m)};
h?h.then(function(p){Vg(c,5,e);k.Dc["Content-Encoding"]="gzip";k.Dc["Content-Type"]="application/binary";k.body=p;k.be=2;n()},function(){Vg(c,6,e);
n()}):n()}}}};
function Xg(a,b,c){c=c===void 0?a.ib():c;var d=d===void 0?a.withCredentials:d;var e={},f=new URL(Ug(a));c&&(e.Authorization=c);a.sessionIndex&&(e["X-Goog-AuthUser"]=a.sessionIndex,f.searchParams.set("authuser",a.sessionIndex));a.pageId&&(Object.defineProperty(e,"X-Goog-PageId",{value:a.pageId}),f.searchParams.set("pageId",a.pageId));return{url:f.toString(),body:b,be:1,Dc:e,requestType:"POST",withCredentials:d,timeoutMillis:a.timeoutMillis}}
function Tg(a){a.j.isFinal=!0;a.flush();a.j.isFinal=!1}
function Wg(a){Yg(a,function(b,c){b=new URL(b);b.searchParams.set("format","json");var d=!1;try{d=window.navigator.sendBeacon(b.toString(),c.serialize())}catch(e){}d||(a.Y=!1);return d})}
function Yg(a,b){if(a.h.length!==0){var c=new URL(Ug(a));c.searchParams.delete("format");var d=a.ib();d&&c.searchParams.set("auth",d);c.searchParams.set("authuser",a.sessionIndex||"0");for(d=0;d<10&&a.h.length;++d){var e=a.h.slice(0,32),f=Kg(a.j,e,a.o,a.D,a.ob,a.ha,a.Z);if(!b(c.toString(),f)){++a.D;break}a.o=0;a.D=0;a.ha=0;a.Z=0;a.h=a.h.slice(e.length)}a.i.enabled&&a.i.stop()}}
Qg.prototype.isRetryable=function(a){return 500<=a&&a<600||a===401||a===0};
function Rg(){return"https://play.google.com/log?format=json&hasfast=true"}
;function Zg(){this.Vd=typeof AbortController!=="undefined"}
Zg.prototype.send=function(a,b,c){var d=this,e,f,g,h,k,l,m,n,p,t;return B(function(v){switch(v.h){case 1:return f=(e=d.Vd?new AbortController:void 0)?setTimeout(function(){e.abort()},a.timeoutMillis):void 0,ya(v,2,3),g=Object.assign({},{method:a.requestType,
headers:Object.assign({},a.Dc)},a.body&&{body:a.body},a.withCredentials&&{credentials:"include"},{signal:a.timeoutMillis&&e?e.signal:null}),v.yield(fetch(a.url,g),5);case 5:h=v.i;if(h.status!==200){(k=c)==null||k(h.status);v.A(3);break}if((l=b)==null){v.A(7);break}return v.yield(h.text(),8);case 8:l(v.i);case 7:case 3:v.P=[v.j];v.M=0;v.o=0;clearTimeout(f);Ba(v);break;case 2:m=Aa(v);switch((n=m)==null?void 0:n.name){case "AbortError":(p=c)==null||p(408);break;default:(t=c)==null||t(400)}v.A(3)}})};
Zg.prototype.oc=function(){return 4};function $g(a,b){G.call(this);this.logSource=a;this.sessionIndex=b;this.Ua="https://play.google.com/log?format=json&hasfast=true";this.i=null;this.o=!1;this.network=null;this.componentId="";this.h=this.ob=null;this.j=!1;this.pageId=null;this.bufferSize=void 0}
w($g,G);function ah(a,b){a.i=b;return a}
function bh(a,b){a.network=b;return a}
function ch(a,b){a.h=b}
function dh(a){a.j=!0;return a}
$g.prototype.pd=function(){this.u=!0;return this};
function gh(a){a.network||(a.network=new Zg);var b=new Qg({logSource:a.logSource,ib:a.ib?a.ib:Uf,sessionIndex:a.sessionIndex,yf:a.Ua,Wa:a.o,Qb:!1,pd:a.u,kd:a.kd,network:a.network});tc(a,b);if(a.i){var c=a.i,d=Hg(b.j);vf(d,7,c)}b.G=new Vf;a.componentId&&(b.componentId=a.componentId);a.ob&&(b.ob=a.ob);a.pageId&&(b.pageId=a.pageId);a.h&&((d=a.h)?(b.experimentIds||(b.experimentIds=new Wf),c=b.experimentIds,d=d.serialize(),vf(c,4,d)):b.experimentIds&&ef(b.experimentIds,4));a.j&&(b.xa=b.Y);Jg(b.j);a.bufferSize&&
(b.bufferSize=a.bufferSize);a.network.Yb&&a.network.Yb(a.logSource);a.network.mf&&a.network.mf(b);return b}
;function hh(a,b,c,d,e,f,g){a=a===void 0?-1:a;b=b===void 0?"":b;c=c===void 0?"":c;d=d===void 0?!1:d;e=e===void 0?"":e;G.call(this);this.logSource=a;this.componentId=b;f?b=f:(a=new $g(a,"0"),a.componentId=b,tc(this,a),c!==""&&(a.Ua=c),d&&(a.o=!0),e&&ah(a,e),g&&bh(a,g),b=gh(a));this.h=b}
w(hh,G);
hh.prototype.flush=function(a){var b=a||[];if(b.length){a=new Kf;for(var c=[],d=0;d<b.length;d++){var e=b[d],f=new Jf;f=vf(f,1,e.i);var g=ih(e);f=hf(f,g,Oe);g=[];var h=[];for(var k=y(e.h.keys()),l=k.next();!l.done;l=k.next())h.push(l.value.split(","));for(k=0;k<h.length;k++){l=h[k];var m=e.o;for(var n=e.Kc(l)||[],p=[],t=0;t<n.length;t++){var v=n[t],x=v&&v.h;v=new Gf;switch(m){case 3:x=Number(x);Number.isFinite(x)&&lf(v,1,Hf,Le(x));break;case 2:x=Number(x);if(x!=null&&typeof x!=="number")throw Error("Value of float/double field must be a number, found "+typeof x+
": "+x);lf(v,2,Hf,x)}p.push(v)}m=p;for(n=0;n<m.length;n++){p=m[n];t=new If;p=qf(t,Gf,2,p);t=l;v=[];x=jh(e);for(var z=0;z<x.length;z++){var H=x[z],K=t[z],ca=new Ef;switch(H){case 3:lf(ca,1,Ff,Pe(String(K)));break;case 2:H=Number(K);Number.isFinite(H)&&lf(ca,2,Ff,Ee(H));break;case 1:lf(ca,3,Ff,Ae(K==="true"))}v.push(ca)}rf(p,Ef,1,v);g.push(p)}}rf(f,If,4,g);c.push(f);e.clear()}rf(a,Jf,1,c);b=this.h;if(a instanceof Dg)b.log(a);else try{var da=new Dg,Oa=a.serialize();var Lb=vf(da,8,Oa);b.log(Lb)}catch(ka){Vg(b,
4,1)}this.h.flush()}};function kh(a){this.h=a}
;function lh(a,b,c){this.i=a;this.o=b;this.fields=c||[];this.h=new Map}
function jh(a){return a.fields.map(function(b){return b.fieldType})}
function ih(a){return a.fields.map(function(b){return b.fieldName})}
r=lh.prototype;r.Wd=function(a){var b=C.apply(1,arguments),c=this.Kc(b);c?c.push(new kh(a)):this.Hd(a,b)};
r.Hd=function(a){var b=this.jd(C.apply(1,arguments));this.h.set(b,[new kh(a)])};
r.Kc=function(){var a=this.jd(C.apply(0,arguments));return this.h.has(a)?this.h.get(a):void 0};
r.ue=function(){var a=this.Kc(C.apply(0,arguments));return a&&a.length?a[0]:void 0};
r.clear=function(){this.h.clear()};
r.jd=function(){var a=C.apply(0,arguments);return a?a.join(","):"key"};function mh(a,b){lh.call(this,a,3,b)}
w(mh,lh);mh.prototype.j=function(a){var b=C.apply(1,arguments),c=0,d=this.ue(b);d&&(c=d.h);this.Hd(c+a,b)};function nh(a,b){lh.call(this,a,2,b)}
w(nh,lh);nh.prototype.record=function(a){this.Wd(a,C.apply(1,arguments))};function oh(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.j=!1}
oh.prototype.stopPropagation=function(){this.j=!0};
oh.prototype.preventDefault=function(){this.defaultPrevented=!0};function ph(a,b){oh.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
ab(ph,oh);
ph.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;b=a.relatedTarget;b||(c=="mouseover"?b=a.fromElement:c=="mouseout"&&(b=a.toElement));this.relatedTarget=b;d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==
void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType=a.pointerType;this.state=a.state;this.i=a;a.defaultPrevented&&ph.Aa.preventDefault.call(this)};
ph.prototype.stopPropagation=function(){ph.Aa.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
ph.prototype.preventDefault=function(){ph.Aa.preventDefault.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var qh="closure_listenable_"+(Math.random()*1E6|0);var rh=0;function sh(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.qc=e;this.key=++rh;this.Xb=this.hc=!1}
function th(a){a.Xb=!0;a.listener=null;a.proxy=null;a.src=null;a.qc=null}
;function uh(a){this.src=a;this.listeners={};this.h=0}
uh.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=vh(a,b,d,e);g>-1?(b=a[g],c||(b.hc=!1)):(b=new sh(b,this.src,f,!!d,e),b.hc=c,a.push(b));return b};
uh.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=vh(e,b,c,d);return b>-1?(th(e[b]),Array.prototype.splice.call(e,b,1),e.length==0&&(delete this.listeners[a],this.h--),!0):!1};
function wh(a,b){var c=b.type;c in a.listeners&&Rb(a.listeners[c],b)&&(th(b),a.listeners[c].length==0&&(delete a.listeners[c],a.h--))}
function vh(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Xb&&f.listener==b&&f.capture==!!c&&f.qc==d)return e}return-1}
;var xh="closure_lm_"+(Math.random()*1E6|0),yh={},zh=0;function Ah(a,b,c,d,e){if(d&&d.once)Bh(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Ah(a,b[f],c,d,e);else c=Ch(c),a&&a[qh]?a.listen(b,c,Na(d)?!!d.capture:!!d,e):Dh(a,b,c,!1,d,e)}
function Dh(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=Na(e)?!!e.capture:!!e,h=Eh(a);h||(a[xh]=h=new uh(a));c=h.add(b,c,d,g,f);if(!c.proxy){d=Fh();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Lg||(e=g),e===void 0&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(Gh(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");zh++}}
function Fh(){function a(c){return b.call(a.src,a.listener,c)}
var b=Hh;return a}
function Bh(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Bh(a,b[f],c,d,e);else c=Ch(c),a&&a[qh]?Ih(a,b,c,Na(d)?!!d.capture:!!d,e):Dh(a,b,c,!0,d,e)}
function Jh(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Jh(a,b[f],c,d,e);else(d=Na(d)?!!d.capture:!!d,c=Ch(c),a&&a[qh])?a.i.remove(String(b),c,d,e):a&&(a=Eh(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=vh(b,c,d,e)),(c=a>-1?b[a]:null)&&Kh(c))}
function Kh(a){if(typeof a!=="number"&&a&&!a.Xb){var b=a.src;if(b&&b[qh])wh(b.i,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(Gh(c),d):b.addListener&&b.removeListener&&b.removeListener(d);zh--;(c=Eh(b))?(wh(c,a),c.h==0&&(c.src=null,b[xh]=null)):th(a)}}}
function Gh(a){return a in yh?yh[a]:yh[a]="on"+a}
function Hh(a,b){if(a.Xb)a=!0;else{b=new ph(b,this);var c=a.listener,d=a.qc||a.src;a.hc&&Kh(a);a=c.call(d,b)}return a}
function Eh(a){a=a[xh];return a instanceof uh?a:null}
var Lh="__closure_events_fn_"+(Math.random()*1E9>>>0);function Ch(a){if(typeof a==="function")return a;a[Lh]||(a[Lh]=function(b){return a.handleEvent(b)});
return a[Lh]}
;function Mh(){G.call(this);this.i=new uh(this);this.xa=this;this.Z=null}
ab(Mh,G);Mh.prototype[qh]=!0;r=Mh.prototype;r.addEventListener=function(a,b,c,d){Ah(this,a,b,c,d)};
r.removeEventListener=function(a,b,c,d){Jh(this,a,b,c,d)};
function Nh(a,b){var c=a.Z;if(c){var d=[];for(var e=1;c;c=c.Z)d.push(c),++e}a=a.xa;c=b.type||b;typeof b==="string"?b=new oh(b,a):b instanceof oh?b.target=b.target||a:(e=b,b=new oh(c,a),lg(b,e));e=!0;var f;if(d)for(f=d.length-1;!b.j&&f>=0;f--){var g=b.h=d[f];e=Oh(g,c,!0,b)&&e}b.j||(g=b.h=a,e=Oh(g,c,!0,b)&&e,b.j||(e=Oh(g,c,!1,b)&&e));if(d)for(f=0;!b.j&&f<d.length;f++)g=b.h=d[f],e=Oh(g,c,!1,b)&&e}
r.ba=function(){Mh.Aa.ba.call(this);this.removeAllListeners();this.Z=null};
r.listen=function(a,b,c,d){return this.i.add(String(a),b,!1,c,d)};
function Ih(a,b,c,d,e){a.i.add(String(b),c,!0,d,e)}
r.removeAllListeners=function(a){if(this.i){var b=this.i;a=a&&a.toString();var c=0,d;for(d in b.listeners)if(!a||d==a){for(var e=b.listeners[d],f=0;f<e.length;f++)++c,th(e[f]);delete b.listeners[d];b.h--}b=c}else b=0;return b};
function Oh(a,b,c,d){b=a.i.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Xb&&g.capture==c){var h=g.listener,k=g.qc||g.src;g.hc&&wh(a.i,g);e=h.call(k,d)!==!1&&e}}return e&&!d.defaultPrevented}
;var Ph=typeof AsyncContext!=="undefined"&&typeof AsyncContext.Snapshot==="function"?function(a){return a&&AsyncContext.Snapshot.wrap(a)}:function(a){return a};function Qh(a,b){this.j=a;this.o=b;this.i=0;this.h=null}
Qh.prototype.get=function(){if(this.i>0){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function Rh(a,b){a.o(b);a.i<100&&(a.i++,b.next=a.h,a.h=b)}
;function Sh(){this.i=this.h=null}
Sh.prototype.add=function(a,b){var c=Th.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
Sh.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var Th=new Qh(function(){return new Uh},function(a){return a.reset()});
function Uh(){this.next=this.scope=this.h=null}
Uh.prototype.set=function(a,b){this.h=a;this.scope=b;this.next=null};
Uh.prototype.reset=function(){this.next=this.scope=this.h=null};var Vh,Wh=!1,Xh=new Sh;function Yh(a,b){Vh||Zh();Wh||(Vh(),Wh=!0);Xh.add(a,b)}
function Zh(){var a=Promise.resolve(void 0);Vh=function(){a.then($h)}}
function $h(){for(var a;a=Xh.remove();){try{a.h.call(a.scope)}catch(b){Pc(b)}Rh(Th,a)}Wh=!1}
;function ai(){}
function bi(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function ci(a){this.X=0;this.ab=void 0;this.vb=this.Sa=this.parent_=null;this.pc=this.Jc=!1;if(a!=ai)try{var b=this;a.call(void 0,function(c){di(b,2,c)},function(c){di(b,3,c)})}catch(c){di(this,3,c)}}
function ei(){this.next=this.context=this.h=this.i=this.child=null;this.j=!1}
ei.prototype.reset=function(){this.context=this.h=this.i=this.child=null;this.j=!1};
var fi=new Qh(function(){return new ei},function(a){a.reset()});
function gi(a,b,c){var d=fi.get();d.i=a;d.h=b;d.context=c;return d}
function hi(a){return new ci(function(b,c){c(a)})}
ci.prototype.then=function(a,b,c){return ii(this,Ph(typeof a==="function"?a:null),Ph(typeof b==="function"?b:null),c)};
ci.prototype.$goog_Thenable=!0;function ji(a,b,c,d){ki(a,gi(b||ai,c||null,d))}
r=ci.prototype;r.finally=function(a){var b=this;a=Ph(a);return new Promise(function(c,d){ji(b,function(e){a();c(e)},function(e){a();
d(e)})})};
r.Fc=function(a,b){return ii(this,null,Ph(a),b)};
r.catch=ci.prototype.Fc;r.cancel=function(a){if(this.X==0){var b=new li(a);Yh(function(){mi(this,b)},this)}};
function mi(a,b){if(a.X==0)if(a.parent_){var c=a.parent_;if(c.Sa){for(var d=0,e=null,f=null,g=c.Sa;g&&(g.j||(d++,g.child==a&&(e=g),!(e&&d>1)));g=g.next)e||(f=g);e&&(c.X==0&&d==1?mi(c,b):(f?(d=f,d.next==c.vb&&(c.vb=d),d.next=d.next.next):ni(c),oi(c,e,3,b)))}a.parent_=null}else di(a,3,b)}
function ki(a,b){a.Sa||a.X!=2&&a.X!=3||pi(a);a.vb?a.vb.next=b:a.Sa=b;a.vb=b}
function ii(a,b,c,d){var e=gi(null,null,null);e.child=new ci(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.h=c?function(h){try{var k=c.call(d,h);k===void 0&&h instanceof li?g(h):f(k)}catch(l){g(l)}}:g});
e.child.parent_=a;ki(a,e);return e.child}
r.wf=function(a){this.X=0;di(this,2,a)};
r.xf=function(a){this.X=0;di(this,3,a)};
function di(a,b,c){if(a.X==0){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.X=1;a:{var d=c,e=a.wf,f=a.xf;if(d instanceof ci){ji(d,e,f,a);var g=!0}else{if(d)try{var h=!!d.$goog_Thenable}catch(l){h=!1}else h=!1;if(h)d.then(e,f,a),g=!0;else{if(Na(d))try{var k=d.then;if(typeof k==="function"){qi(d,k,e,f,a);g=!0;break a}}catch(l){f.call(a,l);g=!0;break a}g=!1}}}g||(a.ab=c,a.X=b,a.parent_=null,pi(a),b!=3||c instanceof li||ri(a,c))}}
function qi(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function pi(a){a.Jc||(a.Jc=!0,Yh(a.pe,a))}
function ni(a){var b=null;a.Sa&&(b=a.Sa,a.Sa=b.next,b.next=null);a.Sa||(a.vb=null);return b}
r.pe=function(){for(var a;a=ni(this);)oi(this,a,this.X,this.ab);this.Jc=!1};
function oi(a,b,c,d){if(c==3&&b.h&&!b.j)for(;a&&a.pc;a=a.parent_)a.pc=!1;if(b.child)b.child.parent_=null,si(b,c,d);else try{b.j?b.i.call(b.context):si(b,c,d)}catch(e){ti.call(null,e)}Rh(fi,b)}
function si(a,b,c){b==2?a.i.call(a.context,c):a.h&&a.h.call(a.context,c)}
function ri(a,b){a.pc=!0;Yh(function(){a.pc&&ti.call(null,b)})}
var ti=Pc;function li(a){bb.call(this,a)}
ab(li,bb);li.prototype.name="cancel";function ui(a,b){Mh.call(this);this.j=a||1;this.h=b||D;this.o=Xa(this.sf,this);this.u=$a()}
ab(ui,Mh);r=ui.prototype;r.enabled=!1;r.Ea=null;r.setInterval=function(a){this.j=a;this.Ea&&this.enabled?(this.stop(),this.start()):this.Ea&&this.stop()};
r.sf=function(){if(this.enabled){var a=$a()-this.u;a>0&&a<this.j*.8?this.Ea=this.h.setTimeout(this.o,this.j-a):(this.Ea&&(this.h.clearTimeout(this.Ea),this.Ea=null),Nh(this,"tick"),this.enabled&&(this.stop(),this.start()))}};
r.start=function(){this.enabled=!0;this.Ea||(this.Ea=this.h.setTimeout(this.o,this.j),this.u=$a())};
r.stop=function(){this.enabled=!1;this.Ea&&(this.h.clearTimeout(this.Ea),this.Ea=null)};
r.ba=function(){ui.Aa.ba.call(this);this.stop();delete this.h};function vi(a){G.call(this);this.G=a;this.j=0;this.o=100;this.u=!1;this.i=new Map;this.D=new Set;this.flushInterval=3E4;this.h=new ui(this.flushInterval);this.h.listen("tick",this.ac,!1,this);tc(this,this.h)}
w(vi,G);r=vi.prototype;r.sendIsolatedPayload=function(a){this.u=a;this.o=1};
function wi(a){a.h.enabled||a.h.start();a.j++;a.j>=a.o&&a.ac()}
r.ac=function(){var a=this.i.values();a=[].concat(A(a)).filter(function(b){return b.h.size});
a.length&&this.G.flush(a,this.u);xi(a);this.j=0;this.h.enabled&&this.h.stop()};
r.Mb=function(a){var b=C.apply(1,arguments);this.i.has(a)||this.i.set(a,new mh(a,b))};
r.Hc=function(a){var b=C.apply(1,arguments);this.i.has(a)||this.i.set(a,new nh(a,b))};
function yi(a,b){return a.D.has(b)?void 0:a.i.get(b)}
r.Jb=function(a){this.Ud(a,1,C.apply(1,arguments))};
r.Ud=function(a,b){var c=C.apply(2,arguments),d=yi(this,a);d&&d instanceof mh&&(d.j(b,c),wi(this))};
r.record=function(a,b){var c=C.apply(2,arguments),d=yi(this,a);d&&d instanceof nh&&(d.record(b,c),wi(this))};
function xi(a){for(var b=0;b<a.length;b++)a[b].clear()}
;function zi(){}
zi.prototype.serialize=function(a){var b=[];Ai(this,a,b);return b.join("")};
function Ai(a,b,c){if(b==null)c.push("null");else{if(typeof b=="object"){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Ai(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],typeof f!="function"&&(c.push(e),Bi(d,c),c.push(":"),Ai(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Bi(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Ci={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\u000b"},Di=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function Bi(a,b){b.push('"',a.replace(Di,function(c){var d=Ci[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).slice(1),Ci[c]=d);return d}),'"')}
;function Ei(){Mh.call(this);this.headers=new Map;this.h=!1;this.J=null;this.o=this.Y="";this.j=this.U=this.D=this.P=!1;this.G=0;this.u=null;this.ma="";this.ha=!1}
ab(Ei,Mh);var Fi=/^https?$/i,Gi=["POST","PUT"],Hi=[];function Ii(a,b,c,d,e,f,g){var h=new Ei;Hi.push(h);b&&h.listen("complete",b);Ih(h,"ready",h.de);f&&(h.G=Math.max(0,f));g&&(h.ha=g);h.send(a,c,d,e)}
r=Ei.prototype;r.de=function(){this.dispose();Rb(Hi,this)};
r.send=function(a,b,c,d){if(this.J)throw Error("[goog.net.XhrIo] Object is active with another request="+this.Y+"; newUri="+a);b=b?b.toUpperCase():"GET";this.Y=a;this.o="";this.P=!1;this.h=!0;this.J=new XMLHttpRequest;this.J.onreadystatechange=Ph(Xa(this.Ad,this));try{this.getStatus(),this.U=!0,this.J.open(b,String(a),!0),this.U=!1}catch(g){this.getStatus();Ji(this,g);return}a=c||"";c=new Map(this.headers);if(d)if(Object.getPrototypeOf(d)===Object.prototype)for(var e in d)c.set(e,d[e]);else if(typeof d.keys===
"function"&&typeof d.get==="function"){e=y(d.keys());for(var f=e.next();!f.done;f=e.next())f=f.value,c.set(f,d.get(f))}else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(function(g){return"content-type"==g.toLowerCase()});
e=D.FormData&&a instanceof D.FormData;!(Kb(Gi,b)>=0)||d||e||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");b=y(c);for(d=b.next();!d.done;d=b.next())c=y(d.value),d=c.next().value,c=c.next().value,this.J.setRequestHeader(d,c);this.ma&&(this.J.responseType=this.ma);"withCredentials"in this.J&&this.J.withCredentials!==this.ha&&(this.J.withCredentials=this.ha);try{this.u&&(clearTimeout(this.u),this.u=null),this.G>0&&(this.getStatus(),this.u=setTimeout(this.uf.bind(this),this.G)),
this.getStatus(),this.D=!0,this.J.send(a),this.D=!1}catch(g){this.getStatus(),Ji(this,g)}};
r.uf=function(){typeof Ka!="undefined"&&this.J&&(this.o="Timed out after "+this.G+"ms, aborting",this.getStatus(),Nh(this,"timeout"),this.abort(8))};
function Ji(a,b){a.h=!1;a.J&&(a.j=!0,a.J.abort(),a.j=!1);a.o=b;Ki(a);Li(a)}
function Ki(a){a.P||(a.P=!0,Nh(a,"complete"),Nh(a,"error"))}
r.abort=function(){this.J&&this.h&&(this.getStatus(),this.h=!1,this.j=!0,this.J.abort(),this.j=!1,Nh(this,"complete"),Nh(this,"abort"),Li(this))};
r.ba=function(){this.J&&(this.h&&(this.h=!1,this.j=!0,this.J.abort(),this.j=!1),Li(this,!0));Ei.Aa.ba.call(this)};
r.Ad=function(){this.ea||(this.U||this.D||this.j?Mi(this):this.Me())};
r.Me=function(){Mi(this)};
function Mi(a){if(a.h&&typeof Ka!="undefined")if(a.D&&(a.J?a.J.readyState:0)==4)setTimeout(a.Ad.bind(a),0);else if(Nh(a,"readystatechange"),a.isComplete()){a.getStatus();a.h=!1;try{if(Ni(a))Nh(a,"complete"),Nh(a,"success");else{try{var b=(a.J?a.J.readyState:0)>2?a.J.statusText:""}catch(c){b=""}a.o=b+" ["+a.getStatus()+"]";Ki(a)}}finally{Li(a)}}}
function Li(a,b){if(a.J){a.u&&(clearTimeout(a.u),a.u=null);var c=a.J;a.J=null;b||Nh(a,"ready");try{c.onreadystatechange=null}catch(d){}}}
r.isActive=function(){return!!this.J};
r.isComplete=function(){return(this.J?this.J.readyState:0)==4};
function Ni(a){var b=a.getStatus();a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}if(!c){if(b=b===0)a=ac(1,String(a.Y)),!a&&D.self&&D.self.location&&(a=D.self.location.protocol.slice(0,-1)),b=!Fi.test(a?a.toLowerCase():"");c=b}return c}
r.getStatus=function(){try{return(this.J?this.J.readyState:0)>2?this.J.status:-1}catch(a){return-1}};
r.getLastError=function(){return typeof this.o==="string"?this.o:String(this.o)};function Oi(){}
Oi.prototype.send=function(a,b,c){b=b===void 0?function(){}:b;
c=c===void 0?function(){}:c;
Ii(a.url,function(d){d=d.target;if(Ni(d)){try{var e=d.J?d.J.responseText:""}catch(f){e=""}b(e)}else c(d.getStatus())},a.requestType,a.body,a.Dc,a.timeoutMillis,a.withCredentials)};
Oi.prototype.oc=function(){return 1};function Pi(a,b){this.logger=a;this.event=b;this.startTime=Qi()}
Pi.prototype.done=function(){this.logger.Ub(this.event,Qi()-this.startTime)};
function Ri(){Ec.apply(this,arguments)}
w(Ri,Ec);function Si(a,b){var c=Qi();b=b();a.Ub("n",Qi()-c);return b}
function Ti(){Ri.apply(this,arguments)}
w(Ti,Ri);r=Ti.prototype;r.Oc=function(){};
r.Cb=function(){};
r.Ub=function(){};
r.Ha=function(){};
r.Cc=function(){};
r.Md=function(){};
function Ui(a){return{qf:new Hc(a),errorCount:new Lc(a),eventCount:new Jc(a),oe:new Kc(a),ai:new Ic(a),ci:new Mc(a),uh:new Nc(a),bi:new Oc(a)}}
function Vi(a,b,c,d){a=dh(bh(ah(new $g(1828,"0"),a),new Oi));b.length&&ch(a,Df(new Cf,b));d!==void 0&&(a.Ua=d);var e=new hh(1828,"","",!1,"",gh(a));tc(e,a);var f=new vi({flush:function(g){try{e.flush(g)}catch(h){c(h)}}});
f.addOnDisposeCallback(function(){setTimeout(function(){try{f.ac()}finally{e.dispose()}})});
f.o=1E5;f.flushInterval=3E4;f.h.setInterval(3E4);return f}
function Wi(a,b){G.call(this);var c=this;this.callback=a;this.i=b;this.h=-b;this.addOnDisposeCallback(function(){return void clearTimeout(c.timer)})}
w(Wi,G);function Xi(a){if(a.timer===void 0){var b=Math.max(0,a.h+a.i-Qi());a.timer=setTimeout(function(){try{a.callback()}finally{a.h=Qi(),a.timer=void 0}},b)}}
function Yi(a,b,c){Ri.call(this);this.metrics=a;this.Da=b;this.qb=c}
w(Yi,Ri);Yi.prototype.Oc=function(a){this.metrics.qf.record(a,this.Da)};
Yi.prototype.Cb=function(a){this.metrics.eventCount.kb(a,this.Da)};
Yi.prototype.Ub=function(a,b){this.metrics.oe.record(b,a,this.qb,this.Da)};
Yi.prototype.Ha=function(a){this.metrics.errorCount.kb(a,this.qb,this.Da)};
function Zi(a,b){b=b===void 0?[]:b;var c={Da:a.Da||"_",qb:a.qb||"",nc:a.nc||[],vc:a.vc|0,Ua:a.Ua,wc:a.wc||function(){},
Ib:a.Ib||function(e,f){return Vi(e,f,c.wc,c.Ua)}};
b=c.Ib("47",c.nc.concat(b));Yi.call(this,Ui(b),c.Da,c.qb);var d=this;this.options=c;this.service=b;this.i=!a.Ib;this.h=new Wi(function(){return void d.service.ac()},c.vc);
this.addOnDisposeCallback(function(){d.h.dispose();d.i&&d.service.dispose()})}
w(Zi,Yi);Zi.prototype.Md=function(a){var b=this;this.h.dispose();this.i&&this.service.dispose();this.service=this.options.Ib("47",this.options.nc.concat(a));this.h=new Wi(function(){return void b.service.ac()},this.options.vc);
this.metrics=Ui(this.service)};
Zi.prototype.Cc=function(){Xi(this.h)};
function Qi(){var a,b,c;return(c=(a=globalThis.performance)==null?void 0:(b=a.now)==null?void 0:b.call(a))!=null?c:Date.now()}
;function $i(a){a=M(a);L(this);this.F=a}
w($i,N);function aj(a){a=M(a);L(this);this.F=a}
w(aj,N);function bj(a){a=M(a,0,"bfkj");L(this);this.F=a}
w(bj,N);var cj=function(a){return Yd(function(b){var c;if(c=b instanceof a)L(b),c=!((b.F[J]|0)&2);return c})}(bj);function Ac(a){a=M(a);L(this);this.F=a}
w(Ac,N);function dj(a){a=M(a);L(this);this.F=a}
w(dj,N);var ej=Bf(dj);function fj(){var a=this;this.promise=new Promise(function(b,c){a.resolve=b;a.reject=c})}
;function gj(a,b,c){if(a.disable)return new Ti;b=b?yc(b):[];if(c)return c.Md(b),c.share();a={Da:a.Da,qb:a.qb,nc:a.Ah,vc:a.Lh,Ua:a.Ua,wc:a.wc,Ib:a.Ib};c=b;c=c===void 0?[]:c;return new Zi(a,c)}
function hj(a){function b(v,x,z,H){Promise.resolve().then(function(){k.done();h.Cc();h.dispose();g.resolve({Yd:v,pf:x,Qe:z,wh:H})})}
function c(v,x,z,H){if(!d.logger.ea){var K="k";x?K="h":z&&(K="u");K!=="k"?H!==0&&(d.logger.Cb(K),d.logger.Ub(K,v)):d.i<=0?(d.logger.Cb(K),d.logger.Ub(K,v),d.i=Math.floor(Math.random()*200)):d.i--}}
G.call(this);var d=this;this.i=Math.floor(Math.random()*200);this.h=new dj;if("challenge"in a&&cj(a.challenge)){var e=tf(a.challenge,4);var f=tf(a.challenge,5);tf(a.challenge,7)&&(this.h=ej(tf(a.challenge,7)))}else e=a.program,f=a.globalName;this.addOnDisposeCallback(function(){var v,x,z;return B(function(H){if(H.h==1)return H.yield(d.j,2);v=H.i;x=v.pf;(z=x)==null||z();H.h=0})});
this.logger=gj(a.yd||{},this.h,a.xh);tc(this,this.logger);var g=new fj;this.j=g.promise;this.logger.Cb("t");var h=this.logger.share(),k=new Pi(h,"t");if(!D[f])throw this.logger.Ha(25),Error("EGOU");if(!D[f].a)throw this.logger.Ha(26),Error("ELIU");try{var l=D[f].a;f=[];for(var m=[],n=yc(this.h),p=0;p<n.length;p++)f.push(n[p]),m.push(1);var t=Cc(this.h);for(n=0;n<t.length;n++)f.push(t[n]),m.push(2);this.u=y(l(e,b,!0,a.Zh,c,[f,m],tf(this.h,5))).next().value;this.Yc=g.promise.then(function(){})}catch(v){throw this.logger.Ha(28),
v;
}}
w(hj,G);hj.prototype.snapshot=function(a){if(this.ea)throw Error("Already disposed");this.logger.Cb("n");var b=this.logger.share();return this.j.then(function(c){var d=c.Yd;return new Promise(function(e){var f=new Pi(b,"n");d(function(g){f.done();b.Oc(g.length);b.Cc();b.dispose();e(g)},[a.wb,
a.bd,a.Af,a.cd])})})};
hj.prototype.dd=function(a){var b=this;if(this.ea)throw Error("Already disposed");this.logger.Cb("n");var c=Si(this.logger,function(){return b.u([a.wb,a.bd,a.Af,a.cd])});
this.logger.Oc(c.length);this.logger.Cc();return c};
hj.prototype.o=function(a){this.j.then(function(b){var c;(c=b.Qe)==null||c(a)})};function ij(a){if(!a)return null;a=Qe(cf(a,4));return a===null||a===void 0?null:ib(a)}
;function jj(){this.promises={};this.h=null}
function kj(){jj.instance||(jj.instance=new jj);return jj.instance}
function lj(a,b){return mj(a,pf(b,$i,1),pf(b,aj,2),tf(b,3))}
function mj(a,b,c,d){if(!b&&!c)return Promise.resolve();if(!d)return nj(b,c);var e;(e=a.promises)[d]||(e[d]=new Promise(function(f,g){nj(b,c).then(function(){a.h=d;f()},function(h){delete a.promises[d];
g(h)})}));
return a.promises[d]}
function nj(a,b){return b?oj(b):a?pj(a):Promise.resolve()}
function oj(a){return new Promise(function(b,c){var d=pg("SCRIPT"),e=ij(a);Eb(d,e);d.onload=function(){qg(d);b()};
d.onerror=function(){qg(d);c(Error("EWLS"))};
(document.getElementsByTagName("HEAD")[0]||document.documentElement).appendChild(d)})}
function pj(a){return new Promise(function(b){var c=pg("SCRIPT");if(a){var d=Qe(cf(a,6));d=d===null||d===void 0?null:Bb(d)}else d=null;c.textContent=Cb(d);Db(c);(document.getElementsByTagName("HEAD")[0]||document.documentElement).appendChild(c);qg(c);b()})}
;var qj=window;function rj(a){var b=sj;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a(b[c],c,b)}
function tj(){var a=[];rj(function(b){a.push(b)});
return a}
var sj={Bf:"allow-forms",Cf:"allow-modals",Df:"allow-orientation-lock",Ef:"allow-pointer-lock",Ff:"allow-popups",Gf:"allow-popups-to-escape-sandbox",Hf:"allow-presentation",If:"allow-same-origin",Jf:"allow-scripts",Kf:"allow-top-navigation",Lf:"allow-top-navigation-by-user-activation"},uj=bi(function(){return tj()});
function vj(){var a=wj(),b={};Mb(uj(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
function wj(){var a=a===void 0?document:a;return a.createElement("iframe")}
;function xj(a){typeof a=="number"&&(a=Math.round(a)+"px");return a}
;var yj=(new Date).getTime();function zj(a){Mh.call(this);var b=this;this.D=this.j=0;this.Ca=a!=null?a:{pa:function(e,f){return setTimeout(e,f)},
qa:function(e){clearTimeout(e)}};
var c,d;this.h=(d=(c=window.navigator)==null?void 0:c.onLine)!=null?d:!0;this.o=function(){return B(function(e){return e.yield(Aj(b),0)})};
window.addEventListener("offline",this.o);window.addEventListener("online",this.o);this.D||Bj(this)}
w(zj,Mh);function Cj(){var a=Dj;zj.instance||(zj.instance=new zj(a));return zj.instance}
zj.prototype.dispose=function(){window.removeEventListener("offline",this.o);window.removeEventListener("online",this.o);this.Ca.qa(this.D);delete zj.instance};
zj.prototype.ta=function(){return this.h};
function Bj(a){a.D=a.Ca.pa(function(){var b;return B(function(c){if(c.h==1)return a.h?((b=window.navigator)==null?0:b.onLine)?c.A(3):c.yield(Aj(a),3):c.yield(Aj(a),3);Bj(a);c.h=0})},3E4)}
function Aj(a,b){return a.u?a.u:a.u=new Promise(function(c){var d,e,f,g;return B(function(h){switch(h.h){case 1:return d=window.AbortController?new window.AbortController:void 0,f=(e=d)==null?void 0:e.signal,g=!1,ya(h,2,3),d&&(a.j=a.Ca.pa(function(){d.abort()},b||2E4)),h.yield(fetch("/generate_204",{method:"HEAD",
signal:f}),5);case 5:g=!0;case 3:h.P=[h.j];h.M=0;h.o=0;a.u=void 0;a.j&&(a.Ca.qa(a.j),a.j=0);g!==a.h&&(a.h=g,a.h?Nh(a,"networkstatus-online"):Nh(a,"networkstatus-offline"));c(g);Ba(h);break;case 2:Aa(h),g=!1,h.A(3)}})})}
;function Ej(){this.data=[];this.h=-1}
Ej.prototype.set=function(a,b){b=b===void 0?!0:b;0<=a&&a<52&&Number.isInteger(a)&&this.data[a]!==b&&(this.data[a]=b,this.h=-1)};
Ej.prototype.get=function(a){return!!this.data[a]};
function Fj(a){a.h===-1&&(a.h=a.data.reduce(function(b,c,d){return b+(c?Math.pow(2,d):0)},0));
return a.h}
;function Gj(){this.blockSize=-1}
;function Hj(){this.blockSize=-1;this.blockSize=64;this.h=[];this.u=[];this.M=[];this.j=[];this.j[0]=128;for(var a=1;a<this.blockSize;++a)this.j[a]=0;this.o=this.i=0;this.reset()}
ab(Hj,Gj);Hj.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.o=this.i=0};
function Ij(a,b,c){c||(c=0);var d=a.M;if(typeof b==="string")for(var e=0;e<16;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;e<16;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(b=16;b<80;b++)c=d[b-3]^d[b-8]^d[b-14]^d[b-16],d[b]=(c<<1|c>>>31)&4294967295;b=a.h[0];c=a.h[1];e=a.h[2];for(var f=a.h[3],g=a.h[4],h,k,l=0;l<80;l++)l<40?l<20?(h=f^c&(e^f),k=1518500249):(h=c^e^f,k=1859775393):l<60?(h=c&e|f&(c|e),k=2400959708):(h=c^e^f,k=3395469782),
h=(b<<5|b>>>27)+h+g+k+d[l]&4294967295,g=f,f=e,e=(c<<30|c>>>2)&4294967295,c=b,b=h;a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+e&4294967295;a.h[3]=a.h[3]+f&4294967295;a.h[4]=a.h[4]+g&4294967295}
Hj.prototype.update=function(a,b){if(a!=null){b===void 0&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.u,f=this.i;d<b;){if(f==0)for(;d<=c;)Ij(this,a,d),d+=this.blockSize;if(typeof a==="string")for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.blockSize){Ij(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){Ij(this,e);f=0;break}}this.i=f;this.o+=b}};
Hj.prototype.digest=function(){var a=[],b=this.o*8;this.i<56?this.update(this.j,56-this.i):this.update(this.j,this.blockSize-(this.i-56));for(var c=this.blockSize-1;c>=56;c--)this.u[c]=b&255,b/=256;Ij(this,this.u);for(c=b=0;c<5;c++)for(var d=24;d>=0;d-=8)a[b]=this.h[c]>>d&255,++b;return a};function Jj(a){return typeof a.className=="string"?a.className:a.getAttribute&&a.getAttribute("class")||""}
function Kj(a,b){typeof a.className=="string"?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function Lj(a,b){a.classList?b=a.classList.contains(b):(a=a.classList?a.classList:Jj(a).match(/\S+/g)||[],b=Kb(a,b)>=0);return b}
function Mj(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):Lj(a,"inverted-hdpi")&&Kj(a,Array.prototype.filter.call(a.classList?a.classList:Jj(a).match(/\S+/g)||[],function(b){return b!="inverted-hdpi"}).join(" "))}
;function Nj(){}
Nj.prototype.next=function(){return Oj};
var Oj={done:!0,value:void 0};Nj.prototype.tb=function(){return this};function Pj(a){if(a instanceof Qj||a instanceof Rj||a instanceof Sj)return a;if(typeof a.next=="function")return new Qj(function(){return a});
if(typeof a[Symbol.iterator]=="function")return new Qj(function(){return a[Symbol.iterator]()});
if(typeof a.tb=="function")return new Qj(function(){return a.tb()});
throw Error("Not an iterator or iterable.");}
function Qj(a){this.h=a}
Qj.prototype.tb=function(){return new Rj(this.h())};
Qj.prototype[Symbol.iterator]=function(){return new Sj(this.h())};
Qj.prototype.i=function(){return new Sj(this.h())};
function Rj(a){this.h=a}
w(Rj,Nj);Rj.prototype.next=function(){return this.h.next()};
Rj.prototype[Symbol.iterator]=function(){return new Sj(this.h)};
Rj.prototype.i=function(){return new Sj(this.h)};
function Sj(a){Qj.call(this,function(){return a});
this.j=a}
w(Sj,Qj);Sj.prototype.next=function(){return this.j.next()};function O(a){G.call(this);this.u=1;this.j=[];this.o=0;this.h=[];this.i={};this.D=!!a}
ab(O,G);r=O.prototype;r.subscribe=function(a,b,c){var d=this.i[a];d||(d=this.i[a]=[]);var e=this.u;this.h[e]=a;this.h[e+1]=b;this.h[e+2]=c;this.u=e+3;d.push(e);return e};
r.unsubscribe=function(a,b,c){if(a=this.i[a]){var d=this.h;if(a=a.find(function(e){return d[e+1]==b&&d[e+2]==c}))return this.dc(a)}return!1};
r.dc=function(a){var b=this.h[a];if(b){var c=this.i[b];this.o!=0?(this.j.push(a),this.h[a+1]=function(){}):(c&&Rb(c,a),delete this.h[a],delete this.h[a+1],delete this.h[a+2])}return!!b};
r.sb=function(a,b){var c=this.i[a];if(c){var d=Array(arguments.length-1),e=arguments.length,f;for(f=1;f<e;f++)d[f-1]=arguments[f];if(this.D)for(f=0;f<c.length;f++)e=c[f],Tj(this.h[e+1],this.h[e+2],d);else{this.o++;try{for(f=0,e=c.length;f<e&&!this.ea;f++){var g=c[f];this.h[g+1].apply(this.h[g+2],d)}}finally{if(this.o--,this.j.length>0&&this.o==0)for(;c=this.j.pop();)this.dc(c)}}return f!=0}return!1};
function Tj(a,b,c){Yh(function(){a.apply(b,c)})}
r.clear=function(a){if(a){var b=this.i[a];b&&(b.forEach(this.dc,this),delete this.i[a])}else this.h.length=0,this.i={}};
r.ba=function(){O.Aa.ba.call(this);this.clear();this.j.length=0};function Uj(a){this.h=a}
Uj.prototype.set=function(a,b){b===void 0?this.h.remove(a):this.h.set(a,(new zi).serialize(b))};
Uj.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(b!==null)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Uj.prototype.remove=function(a){this.h.remove(a)};function Vj(a){this.h=a}
ab(Vj,Uj);function Wj(a){this.data=a}
function Xj(a){return a===void 0||a instanceof Wj?a:new Wj(a)}
Vj.prototype.set=function(a,b){Vj.Aa.set.call(this,a,Xj(b))};
Vj.prototype.i=function(a){a=Vj.Aa.get.call(this,a);if(a===void 0||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Vj.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,a===void 0)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Yj(a){this.h=a}
ab(Yj,Vj);Yj.prototype.set=function(a,b,c){if(b=Xj(b)){if(c){if(c<$a()){Yj.prototype.remove.call(this,a);return}b.expiration=c}b.creation=$a()}Yj.Aa.set.call(this,a,b)};
Yj.prototype.i=function(a){var b=Yj.Aa.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<$a()||c&&c>$a())Yj.prototype.remove.call(this,a);else return b}};function Zj(){}
;function ak(){}
ab(ak,Zj);ak.prototype[Symbol.iterator]=function(){return Pj(this.tb(!0)).i()};
ak.prototype.clear=function(){var a=Array.from(this);a=y(a);for(var b=a.next();!b.done;b=a.next())this.remove(b.value)};function bk(a){this.h=a;this.i=null}
ab(bk,ak);r=bk.prototype;r.isAvailable=function(){var a=this.h;if(a)try{a.setItem("__sak","1");a.removeItem("__sak");var b=!0}catch(c){b=c instanceof DOMException&&(c.name==="QuotaExceededError"||c.code===22||c.code===1014||c.name==="NS_ERROR_DOM_QUOTA_REACHED")&&a&&a.length!==0}else b=!1;return this.i=b};
r.set=function(a,b){ck(this);try{this.h.setItem(a,b)}catch(c){if(this.h.length==0)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
r.get=function(a){ck(this);a=this.h.getItem(a);if(typeof a!=="string"&&a!==null)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){ck(this);this.h.removeItem(a)};
r.tb=function(a){ck(this);var b=0,c=this.h,d=new Nj;d.next=function(){if(b>=c.length)return Oj;var e=c.key(b++);if(a)return{value:e,done:!1};e=c.getItem(e);if(typeof e!=="string")throw"Storage mechanism: Invalid value was encountered";return{value:e,done:!1}};
return d};
r.clear=function(){ck(this);this.h.clear()};
r.key=function(a){ck(this);return this.h.key(a)};
function ck(a){if(a.h==null)throw Error("Storage mechanism: Storage unavailable");var b;((b=a.i)!=null?b:a.isAvailable())||Pc(Error("Storage mechanism: Storage unavailable"))}
;function dk(){var a=null;try{a=D.localStorage||null}catch(b){}bk.call(this,a)}
ab(dk,bk);function ek(a,b){this.i=a;this.h=b+"::"}
ab(ek,ak);ek.prototype.set=function(a,b){this.i.set(this.h+a,b)};
ek.prototype.get=function(a){return this.i.get(this.h+a)};
ek.prototype.remove=function(a){this.i.remove(this.h+a)};
ek.prototype.tb=function(a){var b=this.i[Symbol.iterator](),c=this,d=new Nj;d.next=function(){var e=b.next();if(e.done)return e;for(e=e.value;e.slice(0,c.h.length)!=c.h;){e=b.next();if(e.done)return e;e=e.value}return{value:a?e.slice(c.h.length):c.i.get(e),done:!1}};
return d};/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
var P={},fk=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";P.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if(typeof c!=="object")throw new TypeError(c+"must be non-object");for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}}return a};
P.Zc=function(a,b){if(a.length===b)return a;if(a.subarray)return a.subarray(0,b);a.length=b;return a};
var gk={ub:function(a,b,c,d,e){if(b.subarray&&a.subarray)a.set(b.subarray(c,c+d),e);else for(var f=0;f<d;f++)a[e+f]=b[c+f]},
rd:function(a){var b,c;var d=c=0;for(b=a.length;d<b;d++)c+=a[d].length;var e=new Uint8Array(c);d=c=0;for(b=a.length;d<b;d++){var f=a[d];e.set(f,c);c+=f.length}return e}},hk={ub:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},
rd:function(a){return[].concat.apply([],a)}};
P.nf=function(){fk?(P.rb=Uint8Array,P.Ja=Uint16Array,P.Td=Int32Array,P.assign(P,gk)):(P.rb=Array,P.Ja=Array,P.Td=Array,P.assign(P,hk))};
P.nf();var ik=!0;try{new Uint8Array(1)}catch(a){ik=!1}
function jk(a){var b,c,d=a.length,e=0;for(b=0;b<d;b++){var f=a.charCodeAt(b);if((f&64512)===55296&&b+1<d){var g=a.charCodeAt(b+1);(g&64512)===56320&&(f=65536+(f-55296<<10)+(g-56320),b++)}e+=f<128?1:f<2048?2:f<65536?3:4}var h=new P.rb(e);for(b=c=0;c<e;b++)f=a.charCodeAt(b),(f&64512)===55296&&b+1<d&&(g=a.charCodeAt(b+1),(g&64512)===56320&&(f=65536+(f-55296<<10)+(g-56320),b++)),f<128?h[c++]=f:(f<2048?h[c++]=192|f>>>6:(f<65536?h[c++]=224|f>>>12:(h[c++]=240|f>>>18,h[c++]=128|f>>>12&63),h[c++]=128|f>>>
6&63),h[c++]=128|f&63);return h}
;var kk={};kk=function(a,b,c,d){var e=a&65535|0;a=a>>>16&65535|0;for(var f;c!==0;){f=c>2E3?2E3:c;c-=f;do e=e+b[d++]|0,a=a+e|0;while(--f);e%=65521;a%=65521}return e|a<<16|0};for(var lk={},mk,nk=[],ok=0;ok<256;ok++){mk=ok;for(var pk=0;pk<8;pk++)mk=mk&1?3988292384^mk>>>1:mk>>>1;nk[ok]=mk}lk=function(a,b,c,d){c=d+c;for(a^=-1;d<c;d++)a=a>>>8^nk[(a^b[d])&255];return a^-1};var qk={};qk={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};function rk(a){for(var b=a.length;--b>=0;)a[b]=0}
var sk=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],tk=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],uk=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],vk=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],wk=Array(576);rk(wk);var xk=Array(60);rk(xk);var yk=Array(512);rk(yk);var zk=Array(256);rk(zk);var Ak=Array(29);rk(Ak);var Bk=Array(30);rk(Bk);function Ck(a,b,c,d,e){this.Jd=a;this.se=b;this.re=c;this.ke=d;this.Ke=e;this.ud=a&&a.length}
var Dk,Ek,Fk;function Gk(a,b){this.qd=a;this.Eb=0;this.bb=b}
function Hk(a,b){a.aa[a.pending++]=b&255;a.aa[a.pending++]=b>>>8&255}
function Ik(a,b,c){a.ia>16-c?(a.oa|=b<<a.ia&65535,Hk(a,a.oa),a.oa=b>>16-a.ia,a.ia+=c-16):(a.oa|=b<<a.ia&65535,a.ia+=c)}
function Jk(a,b,c){Ik(a,c[b*2],c[b*2+1])}
function Kk(a,b){var c=0;do c|=a&1,a>>>=1,c<<=1;while(--b>0);return c>>>1}
function Lk(a,b,c){var d=Array(16),e=0,f;for(f=1;f<=15;f++)d[f]=e=e+c[f-1]<<1;for(c=0;c<=b;c++)e=a[c*2+1],e!==0&&(a[c*2]=Kk(d[e]++,e))}
function Mk(a){var b;for(b=0;b<286;b++)a.ra[b*2]=0;for(b=0;b<30;b++)a.gb[b*2]=0;for(b=0;b<19;b++)a.ja[b*2]=0;a.ra[512]=1;a.Oa=a.Hb=0;a.ya=a.matches=0}
function Nk(a){a.ia>8?Hk(a,a.oa):a.ia>0&&(a.aa[a.pending++]=a.oa);a.oa=0;a.ia=0}
function Ok(a,b,c){Nk(a);Hk(a,c);Hk(a,~c);P.ub(a.aa,a.window,b,c,a.pending);a.pending+=c}
function Pk(a,b,c,d){var e=b*2,f=c*2;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}
function Qk(a,b,c){for(var d=a.da[c],e=c<<1;e<=a.Na;){e<a.Na&&Pk(b,a.da[e+1],a.da[e],a.depth)&&e++;if(Pk(b,d,a.da[e],a.depth))break;a.da[c]=a.da[e];c=e;e<<=1}a.da[c]=d}
function Rk(a,b,c){var d=0;if(a.ya!==0){do{var e=a.aa[a.Pb+d*2]<<8|a.aa[a.Pb+d*2+1];var f=a.aa[a.Nc+d];d++;if(e===0)Jk(a,f,b);else{var g=zk[f];Jk(a,g+256+1,b);var h=sk[g];h!==0&&(f-=Ak[g],Ik(a,f,h));e--;g=e<256?yk[e]:yk[256+(e>>>7)];Jk(a,g,c);h=tk[g];h!==0&&(e-=Bk[g],Ik(a,e,h))}}while(d<a.ya)}Jk(a,256,b)}
function Sk(a,b){var c=b.qd,d=b.bb.Jd,e=b.bb.ud,f=b.bb.ke,g,h=-1;a.Na=0;a.zb=573;for(g=0;g<f;g++)c[g*2]!==0?(a.da[++a.Na]=h=g,a.depth[g]=0):c[g*2+1]=0;for(;a.Na<2;){var k=a.da[++a.Na]=h<2?++h:0;c[k*2]=1;a.depth[k]=0;a.Oa--;e&&(a.Hb-=d[k*2+1])}b.Eb=h;for(g=a.Na>>1;g>=1;g--)Qk(a,c,g);k=f;do g=a.da[1],a.da[1]=a.da[a.Na--],Qk(a,c,1),d=a.da[1],a.da[--a.zb]=g,a.da[--a.zb]=d,c[k*2]=c[g*2]+c[d*2],a.depth[k]=(a.depth[g]>=a.depth[d]?a.depth[g]:a.depth[d])+1,c[g*2+1]=c[d*2+1]=k,a.da[1]=k++,Qk(a,c,1);while(a.Na>=
2);a.da[--a.zb]=a.da[1];g=b.qd;k=b.Eb;d=b.bb.Jd;e=b.bb.ud;f=b.bb.se;var l=b.bb.re,m=b.bb.Ke,n,p=0;for(n=0;n<=15;n++)a.Ka[n]=0;g[a.da[a.zb]*2+1]=0;for(b=a.zb+1;b<573;b++){var t=a.da[b];n=g[g[t*2+1]*2+1]+1;n>m&&(n=m,p++);g[t*2+1]=n;if(!(t>k)){a.Ka[n]++;var v=0;t>=l&&(v=f[t-l]);var x=g[t*2];a.Oa+=x*(n+v);e&&(a.Hb+=x*(d[t*2+1]+v))}}if(p!==0){do{for(n=m-1;a.Ka[n]===0;)n--;a.Ka[n]--;a.Ka[n+1]+=2;a.Ka[m]--;p-=2}while(p>0);for(n=m;n!==0;n--)for(t=a.Ka[n];t!==0;)d=a.da[--b],d>k||(g[d*2+1]!==n&&(a.Oa+=(n-g[d*
2+1])*g[d*2],g[d*2+1]=n),t--)}Lk(c,h,a.Ka)}
function Tk(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;f===0&&(h=138,k=3);b[(c+1)*2+1]=65535;for(d=0;d<=c;d++){var l=f;f=b[(d+1)*2+1];++g<h&&l===f||(g<k?a.ja[l*2]+=g:l!==0?(l!==e&&a.ja[l*2]++,a.ja[32]++):g<=10?a.ja[34]++:a.ja[36]++,g=0,e=l,f===0?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4))}}
function Uk(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;f===0&&(h=138,k=3);for(d=0;d<=c;d++){var l=f;f=b[(d+1)*2+1];if(!(++g<h&&l===f)){if(g<k){do Jk(a,l,a.ja);while(--g!==0)}else l!==0?(l!==e&&(Jk(a,l,a.ja),g--),Jk(a,16,a.ja),Ik(a,g-3,2)):g<=10?(Jk(a,17,a.ja),Ik(a,g-3,3)):(Jk(a,18,a.ja),Ik(a,g-11,7));g=0;e=l;f===0?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4)}}}
function Vk(a){var b=4093624447,c;for(c=0;c<=31;c++,b>>>=1)if(b&1&&a.ra[c*2]!==0)return 0;if(a.ra[18]!==0||a.ra[20]!==0||a.ra[26]!==0)return 1;for(c=32;c<256;c++)if(a.ra[c*2]!==0)return 1;return 0}
var Wk=!1;function Xk(a,b,c){a.aa[a.Pb+a.ya*2]=b>>>8&255;a.aa[a.Pb+a.ya*2+1]=b&255;a.aa[a.Nc+a.ya]=c&255;a.ya++;b===0?a.ra[c*2]++:(a.matches++,b--,a.ra[(zk[c]+256+1)*2]++,a.gb[(b<256?yk[b]:yk[256+(b>>>7)])*2]++);return a.ya===a.Tb-1}
;function Yk(a,b){a.msg=qk[b];return b}
function Zk(a){for(var b=a.length;--b>=0;)a[b]=0}
function $k(a){var b=a.state,c=b.pending;c>a.S&&(c=a.S);c!==0&&(P.ub(a.output,b.aa,b.Wb,c,a.Fb),a.Fb+=c,b.Wb+=c,a.ed+=c,a.S-=c,b.pending-=c,b.pending===0&&(b.Wb=0))}
function al(a,b){var c=a.va>=0?a.va:-1,d=a.v-a.va,e=0;if(a.level>0){a.K.Ic===2&&(a.K.Ic=Vk(a));Sk(a,a.uc);Sk(a,a.kc);Tk(a,a.ra,a.uc.Eb);Tk(a,a.gb,a.kc.Eb);Sk(a,a.md);for(e=18;e>=3&&a.ja[vk[e]*2+1]===0;e--);a.Oa+=3*(e+1)+5+5+4;var f=a.Oa+3+7>>>3;var g=a.Hb+3+7>>>3;g<=f&&(f=g)}else f=g=d+5;if(d+4<=f&&c!==-1)Ik(a,b?1:0,3),Ok(a,c,d);else if(a.strategy===4||g===f)Ik(a,2+(b?1:0),3),Rk(a,wk,xk);else{Ik(a,4+(b?1:0),3);c=a.uc.Eb+1;d=a.kc.Eb+1;e+=1;Ik(a,c-257,5);Ik(a,d-1,5);Ik(a,e-4,4);for(f=0;f<e;f++)Ik(a,
a.ja[vk[f]*2+1],3);Uk(a,a.ra,c-1);Uk(a,a.gb,d-1);Rk(a,a.ra,a.gb)}Mk(a);b&&Nk(a);a.va=a.v;$k(a.K)}
function R(a,b){a.aa[a.pending++]=b}
function bl(a,b){a.aa[a.pending++]=b>>>8&255;a.aa[a.pending++]=b&255}
function cl(a,b){var c=a.xd,d=a.v,e=a.wa,f=a.zd,g=a.v>a.la-262?a.v-(a.la-262):0,h=a.window,k=a.cb,l=a.Ia,m=a.v+258,n=h[d+e-1],p=h[d+e];a.wa>=a.td&&(c>>=2);f>a.B&&(f=a.B);do{var t=b;if(h[t+e]===p&&h[t+e-1]===n&&h[t]===h[d]&&h[++t]===h[d+1]){d+=2;for(t++;h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&d<m;);t=258-(m-d);d=m-258;if(t>e){a.Db=b;e=t;if(t>=f)break;n=h[d+e-1];p=h[d+e]}}}while((b=l[b&k])>g&&--c!==0);return e<=
a.B?e:a.B}
function dl(a){var b=a.la,c;do{var d=a.Rd-a.B-a.v;if(a.v>=b+(b-262)){P.ub(a.window,a.window,b,b,0);a.Db-=b;a.v-=b;a.va-=b;var e=c=a.sc;do{var f=a.head[--e];a.head[e]=f>=b?f-b:0}while(--c);e=c=b;do f=a.Ia[--e],a.Ia[e]=f>=b?f-b:0;while(--c);d+=b}if(a.K.na===0)break;e=a.K;c=a.window;f=a.v+a.B;var g=e.na;g>d&&(g=d);g===0?c=0:(e.na-=g,P.ub(c,e.input,e.nb,g,f),e.state.wrap===1?e.I=kk(e.I,c,g,f):e.state.wrap===2&&(e.I=lk(e.I,c,g,f)),e.nb+=g,e.pb+=g,c=g);a.B+=c;if(a.B+a.sa>=3)for(d=a.v-a.sa,a.R=a.window[d],
a.R=(a.R<<a.Ma^a.window[d+1])&a.La;a.sa&&!(a.R=(a.R<<a.Ma^a.window[d+3-1])&a.La,a.Ia[d&a.cb]=a.head[a.R],a.head[a.R]=d,d++,a.sa--,a.B+a.sa<3););}while(a.B<262&&a.K.na!==0)}
function el(a,b){for(var c;;){if(a.B<262){dl(a);if(a.B<262&&b===0)return 1;if(a.B===0)break}c=0;a.B>=3&&(a.R=(a.R<<a.Ma^a.window[a.v+3-1])&a.La,c=a.Ia[a.v&a.cb]=a.head[a.R],a.head[a.R]=a.v);c!==0&&a.v-c<=a.la-262&&(a.T=cl(a,c));if(a.T>=3)if(c=Xk(a,a.v-a.Db,a.T-3),a.B-=a.T,a.T<=a.Pc&&a.B>=3){a.T--;do a.v++,a.R=(a.R<<a.Ma^a.window[a.v+3-1])&a.La,a.Ia[a.v&a.cb]=a.head[a.R],a.head[a.R]=a.v;while(--a.T!==0);a.v++}else a.v+=a.T,a.T=0,a.R=a.window[a.v],a.R=(a.R<<a.Ma^a.window[a.v+1])&a.La;else c=Xk(a,0,
a.window[a.v]),a.B--,a.v++;if(c&&(al(a,!1),a.K.S===0))return 1}a.sa=a.v<2?a.v:2;return b===4?(al(a,!0),a.K.S===0?3:4):a.ya&&(al(a,!1),a.K.S===0)?1:2}
function fl(a,b){for(var c,d;;){if(a.B<262){dl(a);if(a.B<262&&b===0)return 1;if(a.B===0)break}c=0;a.B>=3&&(a.R=(a.R<<a.Ma^a.window[a.v+3-1])&a.La,c=a.Ia[a.v&a.cb]=a.head[a.R],a.head[a.R]=a.v);a.wa=a.T;a.Cd=a.Db;a.T=2;c!==0&&a.wa<a.Pc&&a.v-c<=a.la-262&&(a.T=cl(a,c),a.T<=5&&(a.strategy===1||a.T===3&&a.v-a.Db>4096)&&(a.T=2));if(a.wa>=3&&a.T<=a.wa){d=a.v+a.B-3;c=Xk(a,a.v-1-a.Cd,a.wa-3);a.B-=a.wa-1;a.wa-=2;do++a.v<=d&&(a.R=(a.R<<a.Ma^a.window[a.v+3-1])&a.La,a.Ia[a.v&a.cb]=a.head[a.R],a.head[a.R]=a.v);
while(--a.wa!==0);a.lb=0;a.T=2;a.v++;if(c&&(al(a,!1),a.K.S===0))return 1}else if(a.lb){if((c=Xk(a,0,a.window[a.v-1]))&&al(a,!1),a.v++,a.B--,a.K.S===0)return 1}else a.lb=1,a.v++,a.B--}a.lb&&(Xk(a,0,a.window[a.v-1]),a.lb=0);a.sa=a.v<2?a.v:2;return b===4?(al(a,!0),a.K.S===0?3:4):a.ya&&(al(a,!1),a.K.S===0)?1:2}
function gl(a,b){for(var c,d,e,f=a.window;;){if(a.B<=258){dl(a);if(a.B<=258&&b===0)return 1;if(a.B===0)break}a.T=0;if(a.B>=3&&a.v>0&&(d=a.v-1,c=f[d],c===f[++d]&&c===f[++d]&&c===f[++d])){for(e=a.v+258;c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&d<e;);a.T=258-(e-d);a.T>a.B&&(a.T=a.B)}a.T>=3?(c=Xk(a,1,a.T-3),a.B-=a.T,a.v+=a.T,a.T=0):(c=Xk(a,0,a.window[a.v]),a.B--,a.v++);if(c&&(al(a,!1),a.K.S===0))return 1}a.sa=0;return b===4?(al(a,!0),a.K.S===0?3:4):
a.ya&&(al(a,!1),a.K.S===0)?1:2}
function hl(a,b){for(var c;;){if(a.B===0&&(dl(a),a.B===0)){if(b===0)return 1;break}a.T=0;c=Xk(a,0,a.window[a.v]);a.B--;a.v++;if(c&&(al(a,!1),a.K.S===0))return 1}a.sa=0;return b===4?(al(a,!0),a.K.S===0?3:4):a.ya&&(al(a,!1),a.K.S===0)?1:2}
function il(a,b,c,d,e){this.xe=a;this.Je=b;this.Le=c;this.Ie=d;this.te=e}
var jl;jl=[new il(0,0,0,0,function(a,b){var c=65535;for(c>a.za-5&&(c=a.za-5);;){if(a.B<=1){dl(a);if(a.B===0&&b===0)return 1;if(a.B===0)break}a.v+=a.B;a.B=0;var d=a.va+c;if(a.v===0||a.v>=d)if(a.B=a.v-d,a.v=d,al(a,!1),a.K.S===0)return 1;if(a.v-a.va>=a.la-262&&(al(a,!1),a.K.S===0))return 1}a.sa=0;if(b===4)return al(a,!0),a.K.S===0?3:4;a.v>a.va&&al(a,!1);return 1}),
new il(4,4,8,4,el),new il(4,5,16,8,el),new il(4,6,32,32,el),new il(4,4,16,16,fl),new il(8,16,32,32,fl),new il(8,16,128,128,fl),new il(8,32,128,256,fl),new il(32,128,258,1024,fl),new il(32,258,258,4096,fl)];
function kl(){this.K=null;this.status=0;this.aa=null;this.wrap=this.pending=this.Wb=this.za=0;this.H=null;this.Ba=0;this.method=8;this.Bb=-1;this.cb=this.hd=this.la=0;this.window=null;this.Rd=0;this.head=this.Ia=null;this.zd=this.td=this.strategy=this.level=this.Pc=this.xd=this.wa=this.B=this.Db=this.v=this.lb=this.Cd=this.T=this.va=this.Ma=this.La=this.Lc=this.sc=this.R=0;this.ra=new P.Ja(1146);this.gb=new P.Ja(122);this.ja=new P.Ja(78);Zk(this.ra);Zk(this.gb);Zk(this.ja);this.md=this.kc=this.uc=
null;this.Ka=new P.Ja(16);this.da=new P.Ja(573);Zk(this.da);this.zb=this.Na=0;this.depth=new P.Ja(573);Zk(this.depth);this.ia=this.oa=this.sa=this.matches=this.Hb=this.Oa=this.Pb=this.ya=this.Tb=this.Nc=0}
function ll(a,b){if(!a||!a.state||b>5||b<0)return a?Yk(a,-2):-2;var c=a.state;if(!a.output||!a.input&&a.na!==0||c.status===666&&b!==4)return Yk(a,a.S===0?-5:-2);c.K=a;var d=c.Bb;c.Bb=b;if(c.status===42)if(c.wrap===2)a.I=0,R(c,31),R(c,139),R(c,8),c.H?(R(c,(c.H.text?1:0)+(c.H.Va?2:0)+(c.H.extra?4:0)+(c.H.name?8:0)+(c.H.comment?16:0)),R(c,c.H.time&255),R(c,c.H.time>>8&255),R(c,c.H.time>>16&255),R(c,c.H.time>>24&255),R(c,c.level===9?2:c.strategy>=2||c.level<2?4:0),R(c,c.H.os&255),c.H.extra&&c.H.extra.length&&
(R(c,c.H.extra.length&255),R(c,c.H.extra.length>>8&255)),c.H.Va&&(a.I=lk(a.I,c.aa,c.pending,0)),c.Ba=0,c.status=69):(R(c,0),R(c,0),R(c,0),R(c,0),R(c,0),R(c,c.level===9?2:c.strategy>=2||c.level<2?4:0),R(c,3),c.status=113);else{var e=8+(c.hd-8<<4)<<8;e|=(c.strategy>=2||c.level<2?0:c.level<6?1:c.level===6?2:3)<<6;c.v!==0&&(e|=32);c.status=113;bl(c,e+(31-e%31));c.v!==0&&(bl(c,a.I>>>16),bl(c,a.I&65535));a.I=1}if(c.status===69)if(c.H.extra){for(e=c.pending;c.Ba<(c.H.extra.length&65535)&&(c.pending!==c.za||
(c.H.Va&&c.pending>e&&(a.I=lk(a.I,c.aa,c.pending-e,e)),$k(a),e=c.pending,c.pending!==c.za));)R(c,c.H.extra[c.Ba]&255),c.Ba++;c.H.Va&&c.pending>e&&(a.I=lk(a.I,c.aa,c.pending-e,e));c.Ba===c.H.extra.length&&(c.Ba=0,c.status=73)}else c.status=73;if(c.status===73)if(c.H.name){e=c.pending;do{if(c.pending===c.za&&(c.H.Va&&c.pending>e&&(a.I=lk(a.I,c.aa,c.pending-e,e)),$k(a),e=c.pending,c.pending===c.za)){var f=1;break}f=c.Ba<c.H.name.length?c.H.name.charCodeAt(c.Ba++)&255:0;R(c,f)}while(f!==0);c.H.Va&&c.pending>
e&&(a.I=lk(a.I,c.aa,c.pending-e,e));f===0&&(c.Ba=0,c.status=91)}else c.status=91;if(c.status===91)if(c.H.comment){e=c.pending;do{if(c.pending===c.za&&(c.H.Va&&c.pending>e&&(a.I=lk(a.I,c.aa,c.pending-e,e)),$k(a),e=c.pending,c.pending===c.za)){f=1;break}f=c.Ba<c.H.comment.length?c.H.comment.charCodeAt(c.Ba++)&255:0;R(c,f)}while(f!==0);c.H.Va&&c.pending>e&&(a.I=lk(a.I,c.aa,c.pending-e,e));f===0&&(c.status=103)}else c.status=103;c.status===103&&(c.H.Va?(c.pending+2>c.za&&$k(a),c.pending+2<=c.za&&(R(c,
a.I&255),R(c,a.I>>8&255),a.I=0,c.status=113)):c.status=113);if(c.pending!==0){if($k(a),a.S===0)return c.Bb=-1,0}else if(a.na===0&&(b<<1)-(b>4?9:0)<=(d<<1)-(d>4?9:0)&&b!==4)return Yk(a,-5);if(c.status===666&&a.na!==0)return Yk(a,-5);if(a.na!==0||c.B!==0||b!==0&&c.status!==666){d=c.strategy===2?hl(c,b):c.strategy===3?gl(c,b):jl[c.level].te(c,b);if(d===3||d===4)c.status=666;if(d===1||d===3)return a.S===0&&(c.Bb=-1),0;if(d===2&&(b===1?(Ik(c,2,3),Jk(c,256,wk),c.ia===16?(Hk(c,c.oa),c.oa=0,c.ia=0):c.ia>=
8&&(c.aa[c.pending++]=c.oa&255,c.oa>>=8,c.ia-=8)):b!==5&&(Ik(c,0,3),Ok(c,0,0),b===3&&(Zk(c.head),c.B===0&&(c.v=0,c.va=0,c.sa=0))),$k(a),a.S===0))return c.Bb=-1,0}if(b!==4)return 0;if(c.wrap<=0)return 1;c.wrap===2?(R(c,a.I&255),R(c,a.I>>8&255),R(c,a.I>>16&255),R(c,a.I>>24&255),R(c,a.pb&255),R(c,a.pb>>8&255),R(c,a.pb>>16&255),R(c,a.pb>>24&255)):(bl(c,a.I>>>16),bl(c,a.I&65535));$k(a);c.wrap>0&&(c.wrap=-c.wrap);return c.pending!==0?0:1}
;var ml={};ml=function(){this.input=null;this.pb=this.na=this.nb=0;this.output=null;this.ed=this.S=this.Fb=0;this.msg="";this.state=null;this.Ic=2;this.I=0};var nl=Object.prototype.toString;
function ol(a){if(!(this instanceof ol))return new ol(a);a=this.options=P.assign({level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,to:""},a||{});a.raw&&a.windowBits>0?a.windowBits=-a.windowBits:a.gzip&&a.windowBits>0&&a.windowBits<16&&(a.windowBits+=16);this.err=0;this.msg="";this.ended=!1;this.chunks=[];this.K=new ml;this.K.S=0;var b=this.K;var c=a.level,d=a.method,e=a.windowBits,f=a.memLevel,g=a.strategy;if(b){var h=1;c===-1&&(c=6);e<0?(h=0,e=-e):e>15&&(h=2,e-=16);if(f<1||f>
9||d!==8||e<8||e>15||c<0||c>9||g<0||g>4)b=Yk(b,-2);else{e===8&&(e=9);var k=new kl;b.state=k;k.K=b;k.wrap=h;k.H=null;k.hd=e;k.la=1<<k.hd;k.cb=k.la-1;k.Lc=f+7;k.sc=1<<k.Lc;k.La=k.sc-1;k.Ma=~~((k.Lc+3-1)/3);k.window=new P.rb(k.la*2);k.head=new P.Ja(k.sc);k.Ia=new P.Ja(k.la);k.Tb=1<<f+6;k.za=k.Tb*4;k.aa=new P.rb(k.za);k.Pb=1*k.Tb;k.Nc=3*k.Tb;k.level=c;k.strategy=g;k.method=d;if(b&&b.state){b.pb=b.ed=0;b.Ic=2;c=b.state;c.pending=0;c.Wb=0;c.wrap<0&&(c.wrap=-c.wrap);c.status=c.wrap?42:113;b.I=c.wrap===2?
0:1;c.Bb=0;if(!Wk){d=Array(16);for(f=g=0;f<28;f++)for(Ak[f]=g,e=0;e<1<<sk[f];e++)zk[g++]=f;zk[g-1]=f;for(f=g=0;f<16;f++)for(Bk[f]=g,e=0;e<1<<tk[f];e++)yk[g++]=f;for(g>>=7;f<30;f++)for(Bk[f]=g<<7,e=0;e<1<<tk[f]-7;e++)yk[256+g++]=f;for(e=0;e<=15;e++)d[e]=0;for(e=0;e<=143;)wk[e*2+1]=8,e++,d[8]++;for(;e<=255;)wk[e*2+1]=9,e++,d[9]++;for(;e<=279;)wk[e*2+1]=7,e++,d[7]++;for(;e<=287;)wk[e*2+1]=8,e++,d[8]++;Lk(wk,287,d);for(e=0;e<30;e++)xk[e*2+1]=5,xk[e*2]=Kk(e,5);Dk=new Ck(wk,sk,257,286,15);Ek=new Ck(xk,
tk,0,30,15);Fk=new Ck([],uk,0,19,7);Wk=!0}c.uc=new Gk(c.ra,Dk);c.kc=new Gk(c.gb,Ek);c.md=new Gk(c.ja,Fk);c.oa=0;c.ia=0;Mk(c);c=0}else c=Yk(b,-2);c===0&&(b=b.state,b.Rd=2*b.la,Zk(b.head),b.Pc=jl[b.level].Je,b.td=jl[b.level].xe,b.zd=jl[b.level].Le,b.xd=jl[b.level].Ie,b.v=0,b.va=0,b.B=0,b.sa=0,b.T=b.wa=2,b.lb=0,b.R=0);b=c}}else b=-2;if(b!==0)throw Error(qk[b]);a.header&&(b=this.K)&&b.state&&b.state.wrap===2&&(b.state.H=a.header);if(a.dictionary){var l;typeof a.dictionary==="string"?l=jk(a.dictionary):
nl.call(a.dictionary)==="[object ArrayBuffer]"?l=new Uint8Array(a.dictionary):l=a.dictionary;a=this.K;f=l;g=f.length;if(a&&a.state)if(l=a.state,b=l.wrap,b===2||b===1&&l.status!==42||l.B)b=-2;else{b===1&&(a.I=kk(a.I,f,g,0));l.wrap=0;g>=l.la&&(b===0&&(Zk(l.head),l.v=0,l.va=0,l.sa=0),c=new P.rb(l.la),P.ub(c,f,g-l.la,l.la,0),f=c,g=l.la);c=a.na;d=a.nb;e=a.input;a.na=g;a.nb=0;a.input=f;for(dl(l);l.B>=3;){f=l.v;g=l.B-2;do l.R=(l.R<<l.Ma^l.window[f+3-1])&l.La,l.Ia[f&l.cb]=l.head[l.R],l.head[l.R]=f,f++;while(--g);
l.v=f;l.B=2;dl(l)}l.v+=l.B;l.va=l.v;l.sa=l.B;l.B=0;l.T=l.wa=2;l.lb=0;a.nb=d;a.input=e;a.na=c;l.wrap=b;b=0}else b=-2;if(b!==0)throw Error(qk[b]);this.rh=!0}}
ol.prototype.push=function(a,b){var c=this.K,d=this.options.chunkSize;if(this.ended)return!1;var e=b===~~b?b:b===!0?4:0;typeof a==="string"?c.input=jk(a):nl.call(a)==="[object ArrayBuffer]"?c.input=new Uint8Array(a):c.input=a;c.nb=0;c.na=c.input.length;do{c.S===0&&(c.output=new P.rb(d),c.Fb=0,c.S=d);a=ll(c,e);if(a!==1&&a!==0)return pl(this,a),this.ended=!0,!1;if(c.S===0||c.na===0&&(e===4||e===2))if(this.options.to==="string"){var f=P.Zc(c.output,c.Fb);b=f;f=f.length;if(f<65537&&(b.subarray&&ik||!b.subarray))b=
String.fromCharCode.apply(null,P.Zc(b,f));else{for(var g="",h=0;h<f;h++)g+=String.fromCharCode(b[h]);b=g}this.chunks.push(b)}else b=P.Zc(c.output,c.Fb),this.chunks.push(b)}while((c.na>0||c.S===0)&&a!==1);if(e===4)return(c=this.K)&&c.state?(d=c.state.status,d!==42&&d!==69&&d!==73&&d!==91&&d!==103&&d!==113&&d!==666?a=Yk(c,-2):(c.state=null,a=d===113?Yk(c,-3):0)):a=-2,pl(this,a),this.ended=!0,a===0;e===2&&(pl(this,0),c.S=0);return!0};
function pl(a,b){b===0&&(a.result=a.options.to==="string"?a.chunks.join(""):P.rd(a.chunks));a.chunks=[];a.err=b;a.msg=a.K.msg}
function ql(a,b){b=b||{};b.gzip=!0;b=new ol(b);b.push(a,!0);if(b.err)throw b.msg||qk[b.err];return b.result}
;function rl(a){return a?(a=a.privateDoNotAccessOrElseSafeScriptWrappedValue)?Bb(a):null:null}
function sl(a){return a?(a=a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue)?ib(a):null:null}
;function tl(a){return ib(a===null?"null":a===void 0?"undefined":a)}
;function ul(a){this.name=a}
;var vl=new ul("rawColdConfigGroup");var wl=new ul("rawHotConfigGroup");function xl(a){a=M(a);L(this);this.F=a}
w(xl,N);function yl(a){a=M(a);L(this);this.F=a}
w(yl,N);yl.prototype.setTrackingParams=function(a){if(a!=null)if(typeof a==="string")a=a?new yd(a,xd):Ad||(Ad=new yd(null,xd));else if(a.constructor!==yd)if(sd&&a!=null&&a instanceof Uint8Array)a instanceof Uint8Array||Array.isArray(a),a=a.length?new yd(new Uint8Array(a),xd):Ad||(Ad=new yd(null,xd));else throw Error();return ef(this,1,a)};var zl=new ul("continuationCommand");var Al=new ul("webCommandMetadata");var Bl=new ul("signalServiceEndpoint");var Cl={Rf:"EMBEDDED_PLAYER_MODE_UNKNOWN",Of:"EMBEDDED_PLAYER_MODE_DEFAULT",Qf:"EMBEDDED_PLAYER_MODE_PFP",Pf:"EMBEDDED_PLAYER_MODE_PFL"};var Dl=new ul("feedbackEndpoint");var ce={Ug:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_UNKNOWN",og:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_FOR_TESTING",Fg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_RESUME_TO_HOME_TTL",Mg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_START_TO_SHORTS_ANALYSIS_SLICE",dg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_DEVICE_LAYER_SLICE",Tg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_UNIFIED_LAYER_SLICE",Wg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_VISITOR_LAYER_SLICE",Lg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SHOW_SHEET_COMMAND_HANDLER_BLOCK",
Yg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WIZ_NEXT_MIGRATED_COMPONENT",Xg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WIZ_NEXT_CHANNEL_NAME_TOOLTIP",Ig:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATION_LOCK_SUPPORTED",Og:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_THEATER_MODE_ENABLED",dh:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_PIN_SUGGESTION",bh:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_LONG_PRESS_EDU_TOAST",ah:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_AMBIENT",Pg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TIME_WATCHED_PANEL",
Kg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SEARCH_FROM_SEARCH_BAR_OVERLAY",eh:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_VOICE_SEARCH_EDU_TOAST",Ng:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SUGGESTED_LANGUAGE_SELECTED",fh:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_TRIGGER_SHORTS_PIP",vg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IN_ZP_VOICE_CRASHY_SET",Bg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_FAST_SWIPE_SUPPRESSED",Ag:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_FAST_SWIPE_ALLOWED",Dg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_PULL_TO_REFRESH_ATTEMPT",
Zg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_BLOCK_KABUKI",Eg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_TALL_SCREEN",Cg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_NORMAL_SCREEN",Vf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ACCESSIBILITY_MODE_ENABLED",Uf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ACCESSIBILITY_MODE_DISABLED",Wf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_AUTOPLAY_ENABLED",Xf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_CAST_MATCH_OCCURRED",hg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_ELIGIBLE",kg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ENDSCREEN_TRIGGERED",
zg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_POSTPLAY_TRIGGERED",yg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_POSTPLAY_LACT_THRESHOLD_EXCEEDED",pg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_MATCHED_ON_REMOTE_CONNECTION",rg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHABLE_ON_REMOTE_CONNECTION",qg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_MISATTRIBUTED_ON_REMOTE_CONNECTION",ug:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_TV_IS_SIGNED_IN_ON_REMOTE_CONNECTION",Rg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TV_START_TYPE_COLD_ON_REMOTE_CONNECTION",
Sg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TV_START_TYPE_NON_COLD_ON_REMOTE_CONNECTION",xg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ON_REMOTE_CONNECTION",cg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_VALID",Zf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_INVALID",ag:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_UNDEFINED",Yf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_DEFINED",wg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_LACT_THRESHOLD_EXCEEDED",
Jg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROUND_TRIP_HANDLING_ON_REMOTE_CONNECTION",tg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHED_ON_REMOTE_CONNECTION_BEFORE_APP_RELOAD",sg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHED_ON_REMOTE_CONNECTION_AFTER_APP_RELOAD",ig:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_INELIGIBLE",Qg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TVHTML5_MID_ROLL_THRESHOLD_REACHED",mg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_PENDING",
lg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_ACTIVATED",jg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_M2_ELIGIBLE",Gg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATE_DEVICE_TO_LANDSCAPE",Hg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATE_DEVICE_TO_PORTRAIT",gg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMBEDS_FACEOFF_UI_EVENT",ng:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_RECEIVED",fg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ELIGIBLE_TO_SUPPRESS_TRANSPORT_CONTROLS_BUTTONS",
Vg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_USER_HAS_THEATER_MODE_COOKIE_ENABLED",eg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_DOCUMENT_PICTURE_IN_PICTURE_SUPPORTED"};var El=new ul("shareEndpoint"),Fl=new ul("shareEntityEndpoint"),Gl=new ul("shareEntityServiceEndpoint"),Hl=new ul("webPlayerShareEntityServiceEndpoint");var Il=new ul("playlistEditEndpoint");var Jl=new ul("modifyChannelNotificationPreferenceEndpoint");var Kl=new ul("unsubscribeEndpoint");var Ll=new ul("subscribeEndpoint");function Ml(){var a=Nl;F("yt.ads.biscotti.getId_")||E("yt.ads.biscotti.getId_",a)}
function Ol(a){E("yt.ads.biscotti.lastId_",a)}
;function Pl(a,b){b.length>1?a[b[0]]=b[1]:b.length===1&&Object.assign(a,b[0])}
;var Ql=D.window,Rl,Sl,Tl=(Ql==null?void 0:(Rl=Ql.yt)==null?void 0:Rl.config_)||(Ql==null?void 0:(Sl=Ql.ytcfg)==null?void 0:Sl.data_)||{};E("yt.config_",Tl);function Ul(){Pl(Tl,arguments)}
function S(a,b){return a in Tl?Tl[a]:b}
function Vl(a){var b=Tl.EXPERIMENT_FLAGS;return b?b[a]:void 0}
;var Wl=[];function Xl(a){Wl.forEach(function(b){return b(a)})}
function Yl(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Zl(b)}}:a}
function Zl(a){var b=F("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0,void 0,void 0):(b=S("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0,void 0,void 0]),Ul("ERRORS",b));Xl(a)}
function $l(a,b,c,d,e){var f=F("yt.logging.errors.log");f?f(a,"WARNING",b,c,d,void 0,e):(f=S("ERRORS",[]),f.push([a,"WARNING",b,c,d,void 0,e]),Ul("ERRORS",f))}
;var am=/^[\w.]*$/,bm={q:!0,search_query:!0};function cm(a,b){b=a.split(b);for(var c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(f.length===1&&f[0]||f.length===2)try{var g=dm(f[0]||""),h=dm(f[1]||"");if(g in c){var k=c[g];Array.isArray(k)?Sb(k,h):c[g]=[k,h]}else c[g]=h}catch(p){var l=p,m=f[0],n=String(cm);l.args=[{key:m,value:f[1],query:a,method:em===n?"unchanged":n}];bm.hasOwnProperty(m)||$l(l)}}return c}
var em=String(cm);function fm(a){var b=[];bg(a,function(c,d){var e=encodeURIComponent(String(d));c=Array.isArray(c)?c:[c];Mb(c,function(f){f==""?b.push(e):b.push(e+"="+encodeURIComponent(String(f)))})});
return b.join("&")}
function gm(a){a.charAt(0)==="?"&&(a=a.substring(1));return cm(a,"&")}
function hm(a){return a.indexOf("?")!==-1?(a=(a||"").split("#")[0],a=a.split("?",2),gm(a.length>1?a[1]:a[0])):{}}
function im(a,b){return jm(a,b||{},!0)}
function jm(a,b,c){var d=a.split("#",2);a=d[0];d=d.length>1?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=gm(e[1]||"");for(var f in b)!c&&e!==null&&f in e||(e[f]=b[f]);return hc(a,e)+d}
function km(a){if(!b)var b=window.location.href;var c=ac(1,a),d=bc(a);c&&d?(a=a.match(Zb),b=b.match(Zb),a=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4]):a=d?bc(b)===d&&(Number(ac(4,b))||null)===(Number(ac(4,a))||null):!0;return a}
function dm(a){return a&&a.match(am)?a:decodeURIComponent(a.replace(/\+/g," "))}
;function lm(a){var b=mm;a=a===void 0?F("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=yj;e.flash="0";a:{try{var f=b.h.top.location.href}catch(Pa){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);try{e.u_tz=-(new Date).getTimezoneOffset();var g=g===void 0?qj:g;try{var h=g.history.length}catch(Pa){h=0}e.u_his=h;var k;e.u_h=(k=qj.screen)==null?void 0:k.height;var l;e.u_w=(l=qj.screen)==null?void 0:l.width;var m;e.u_ah=(m=qj.screen)==null?void 0:m.availHeight;var n;e.u_aw=
(n=qj.screen)==null?void 0:n.availWidth;var p;e.u_cd=(p=qj.screen)==null?void 0:p.colorDepth}catch(Pa){}h=b.h;try{var t=h.screenX;var v=h.screenY}catch(Pa){}try{var x=h.outerWidth;var z=h.outerHeight}catch(Pa){}try{var H=h.innerWidth;var K=h.innerHeight}catch(Pa){}try{var ca=h.screenLeft;var da=h.screenTop}catch(Pa){}try{H=h.innerWidth,K=h.innerHeight}catch(Pa){}try{var Oa=h.screen.availWidth;var Lb=h.screen.availTop}catch(Pa){}t=[ca,da,t,v,Oa,Lb,x,z,H,K];try{var ka=(b.h.top||window).document,Za=
ka.compatMode=="CSS1Compat"?ka.documentElement:ka.body;var Qa=(new ag(Za.clientWidth,Za.clientHeight)).round()}catch(Pa){Qa=new ag(-12245933,-12245933)}ka=Qa;Qa={};var Ra=Ra===void 0?D:Ra;Za=new Ej;"SVGElement"in Ra&&"createElementNS"in Ra.document&&Za.set(0);v=vj();v["allow-top-navigation-by-user-activation"]&&Za.set(1);v["allow-popups-to-escape-sandbox"]&&Za.set(2);Ra.crypto&&Ra.crypto.subtle&&Za.set(3);"TextDecoder"in Ra&&"TextEncoder"in Ra&&Za.set(4);Ra=Fj(Za);Qa.bc=Ra;Qa.bih=ka.height;Qa.biw=
ka.width;Qa.brdim=t.join();b=b.i;b=(Qa.vis=b.prerendering?3:{visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,Qa.wgl=!!qj.WebGLRenderingContext,Qa);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var mm=new function(){var a=window.document;this.h=window;this.i=a};
E("yt.ads_.signals_.getAdSignalsString",function(a){return fm(lm(a))});$a();navigator.userAgent.indexOf(" (CrKey ");var nm="XMLHttpRequest"in D?function(){return new XMLHttpRequest}:null;
function om(){if(!nm)return null;var a=nm();return"open"in a?a:null}
function pm(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function qm(a,b){typeof a==="function"&&(a=Yl(a));return window.setTimeout(a,b)}
;var rm="client_dev_domain client_dev_expflag client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" ");[].concat(A(rm),["client_dev_set_cookie"]);function T(a){a=sm(a);return typeof a==="string"&&a==="false"?!1:!!a}
function tm(a,b){a=sm(a);return a===void 0&&b!==void 0?b:Number(a||0)}
function sm(a){return S("EXPERIMENT_FLAGS",{})[a]}
function um(){for(var a=[],b=S("EXPERIMENTS_FORCED_FLAGS",{}),c=y(Object.keys(b)),d=c.next();!d.done;d=c.next())d=d.value,a.push({key:d,value:String(b[d])});c=S("EXPERIMENT_FLAGS",{});d=y(Object.keys(c));for(var e=d.next();!e.done;e=d.next())e=e.value,e.startsWith("force_")&&b[e]===void 0&&a.push({key:e,value:String(c[e])});return a}
;var wm={Authorization:"AUTHORIZATION","X-Goog-EOM-Visitor-Id":"EOM_VISITOR_DATA","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL",
"X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-Goog-AuthUser":"SESSION_INDEX","X-Goog-PageId":"DELEGATED_SESSION_ID"},xm="app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(A(rm)),ym=!1;function zm(a,b,c,d,e,f,g,h){function k(){(l&&"readyState"in l?l.readyState:0)===4&&b&&Yl(b)(l)}
c=c===void 0?"GET":c;d=d===void 0?"":d;h=h===void 0?!1:h;var l=om();if(!l)return null;"onloadend"in l?l.addEventListener("loadend",k,!1):l.onreadystatechange=k;T("debug_forward_web_query_parameters")&&(a=Am(a));l.open(c,a,!0);f&&(l.responseType=f);g&&(l.withCredentials=!0);c=c==="POST"&&(window.FormData===void 0||!(d instanceof FormData));if(e=Bm(a,e))for(var m in e)l.setRequestHeader(m,e[m]),"content-type"===m.toLowerCase()&&(c=!1);c&&l.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(h&&"setAttributionReporting"in XMLHttpRequest.prototype){a={eventSourceEligible:!0,triggerEligible:!1};try{l.setAttributionReporting(a)}catch(n){$l(n)}}l.send(d);return l}
function Bm(a,b){b=b===void 0?{}:b;var c=km(a),d=S("INNERTUBE_CLIENT_NAME"),e=T("web_ajax_ignore_global_headers_if_set"),f;for(f in wm){var g=S(wm[f]),h=f==="X-Goog-AuthUser"||f==="X-Goog-PageId";f!=="X-Goog-Visitor-Id"||g||(g=S("VISITOR_DATA"));var k;if(!(k=!g)){if(!(k=c||(bc(a)?!1:!0))){k=a;var l;if(l=T("add_auth_headers_to_remarketing_google_dot_com_ping")&&f==="Authorization"&&(d==="TVHTML5"||d==="TVHTML5_UNPLUGGED"||d==="TVHTML5_SIMPLY"))l=bc(k),l=l!==null?l.split(".").reverse():null,l=l===null?
!1:l[1]==="google"?!0:l[2]==="google"?l[0]==="au"&&l[1]==="com"?!0:l[0]==="uk"&&l[1]==="co"?!0:!1:!1;l&&(k=$b(ac(5,k))||"",k=k.split("/"),k="/"+(k.length>1?k[1]:""),l=k==="/pagead");k=l?!0:!1}k=!k}k||e&&b[f]!==void 0||d==="TVHTML5_UNPLUGGED"&&h||(b[f]=g)}"X-Goog-EOM-Visitor-Id"in b&&"X-Goog-Visitor-Id"in b&&delete b["X-Goog-Visitor-Id"];if(c||!bc(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(c||!bc(a)){try{var m=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(n){}m&&
(b["X-YouTube-Time-Zone"]=m)}document.location.hostname.endsWith("youtubeeducation.com")||!c&&bc(a)||(b["X-YouTube-Ad-Signals"]=fm(lm()));return b}
function Cm(a,b){b.method="POST";b.postParams||(b.postParams={});return Dm(a,b)}
function Dm(a,b){var c=b.format||"JSON";a=Em(a,b);var d=Fm(a,b),e=!1,f=Gm(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);var l=pm(k),m=null,n=400<=k.status&&k.status<500,p=500<=k.status&&k.status<600;if(l||n||p)m=Hm(a,c,k,b.convertToSafeHtml);l&&(l=Im(c,k,m));m=m||{};n=b.context||D;l?b.onSuccess&&b.onSuccess.call(n,k,m):b.onError&&b.onError.call(n,k,m);b.onFinish&&b.onFinish.call(n,k,m)}},b.method,d,b.headers,b.responseType,b.withCredentials);
d=b.timeout||0;if(b.onTimeout&&d>0){var g=b.onTimeout;var h=qm(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||D,f))},d)}return f}
function Em(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=S("XSRF_FIELD_NAME");if(b=b.urlParams)b[c]&&delete b[c],a=im(a,b);return a}
function Fm(a,b){var c=S("XSRF_FIELD_NAME"),d=S("XSRF_TOKEN"),e=b.postBody||"",f=b.postParams,g=S("XSRF_FIELD_NAME"),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||bc(a)&&!b.withCredentials&&bc(a)!==document.location.hostname||b.method!=="POST"||h&&h!=="application/x-www-form-urlencoded"||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);(T("ajax_parse_query_data_only_when_filled")&&f&&Object.keys(f).length>0||f)&&typeof e==="string"&&(e=gm(e),lg(e,f),e=b.postBodyFormat&&b.postBodyFormat===
"JSON"?JSON.stringify(e):fc(e));f=e||f&&!eg(f);!ym&&f&&b.method!=="POST"&&(ym=!0,Zl(Error("AJAX request with postData should use POST")));return e}
function Hm(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,$l(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&a.indexOf("json")>=0&&(f.substring(0,5)===")]}'\n"&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?Jm(a):null)e={},Mb(a.getElementsByTagName("*"),function(g){e[g.tagName]=Km(g)})}d&&Lm(e);
return e}
function Lm(a){if(Na(a))for(var b in a){var c;(c=b==="html_content")||(c=b.length-5,c=c>=0&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];var e=gb();d=new yb(e?e.createHTML(d):d);a[c]=d}else Lm(a[b])}}
function Im(a,b,c){if(b&&b.status===204)return!0;switch(a){case "JSON":return!!c;case "XML":return Number(c&&c.return_code)===0;case "RAW":return!0;default:return!!c}}
function Jm(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&a.length>0?a[0]:null:null}
function Km(a){var b="";Mb(a.childNodes,function(c){b+=c.nodeValue});
return b}
function Am(a){var b=window.location.search,c=bc(a);T("debug_handle_relative_url_for_query_forward_killswitch")||!c&&km(a)&&(c=document.location.hostname);var d=$b(ac(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=gm(b),f={};Mb(xm,function(g){e[g]&&(f[g]=e[g])});
return jm(a,f||{},!1)}
var Gm=zm;var Mm=[{Qc:function(a){return"Cannot read property '"+a.key+"'"},
xc:{Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}],TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]},{regexp:/(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,groups:["value","base","key"]}]}},{Qc:function(a){return"Cannot call '"+a.key+"'"},
xc:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}},{Qc:function(a){return a.key+" is not defined"},
xc:{ReferenceError:[{regexp:/(.*) is not defined/,groups:["key"]},{regexp:/Can't find variable: (.*)/,groups:["key"]}]}}];var Om={Ya:[],Ta:[{callback:Nm,weight:500}]};function Nm(a){if(a.name==="JavaException")return!0;a=a.stack;return a.includes("chrome://")||a.includes("chrome-extension://")||a.includes("moz-extension://")}
;function Pm(){this.Ta=[];this.Ya=[]}
var Qm;function Rm(){if(!Qm){var a=Qm=new Pm;a.Ya.length=0;a.Ta.length=0;Om.Ya&&a.Ya.push.apply(a.Ya,Om.Ya);Om.Ta&&a.Ta.push.apply(a.Ta,Om.Ta)}return Qm}
;var Sm=new O;function Tm(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=Um(b);if(e===Infinity)break;var f=e>>3;switch(e&7){case 0:e=Um(b);if(f===2)return e;break;case 1:if(f===2)return;d+=8;break;case 2:e=Um(b);if(f===2)return a.substr(d,e);d+=e;break;case 5:if(f===2)return;d+=4;break;default:return}}while(d<c)}
function Um(a){var b=a(),c=b&127;if(b<128)return c;b=a();c|=(b&127)<<7;if(b<128)return c;b=a();c|=(b&127)<<14;if(b<128)return c;b=a();return b<128?c|(b&127)<<21:Infinity}
;function Vm(a,b,c,d){if(a)if(Array.isArray(a)){var e=d;for(d=0;d<a.length&&!(a[d]&&(e+=Wm(d,a[d],b,c),e>500));d++);d=e}else if(typeof a==="object")for(e in a){if(a[e]){var f=e;var g=a[e],h=b,k=c;f=typeof g!=="string"||f!=="clickTrackingParams"&&f!=="trackingParams"?0:(g=Tm(atob(g.replace(/-/g,"+").replace(/_/g,"/"))))?Wm(f+".ve",g,h,k):0;d+=f;d+=Wm(e,a[e],b,c);if(d>500)break}}else c[b]=Xm(a),d+=c[b].length;else c[b]=Xm(a),d+=c[b].length;return d}
function Wm(a,b,c,d){c+="."+a;a=Xm(b);d[c]=a;return c.length+a.length}
function Xm(a){try{return(typeof a==="string"?a:String(JSON.stringify(a))).substr(0,500)}catch(b){return"unable to serialize "+typeof a+" ("+b.message+")"}}
;function Ym(a){var b=this;this.i=void 0;this.h=!1;a.addEventListener("beforeinstallprompt",function(c){c.preventDefault();b.i=c});
a.addEventListener("appinstalled",function(){b.h=!0},{once:!0})}
function Zm(){if(!D.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return D.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":D.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":D.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":D.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(a){return"WEB_DISPLAY_MODE_UNKNOWN"}}
;function $m(){this.Kd=!0}
function an(){$m.instance||($m.instance=new $m);return $m.instance}
function bn(a,b){a={};var c=[];"USER_SESSION_ID"in Tl&&c.push({key:"u",value:S("USER_SESSION_ID")});if(c=Uf(c))a.Authorization=c,c=b=b==null?void 0:b.sessionIndex,c===void 0&&(c=Number(S("SESSION_INDEX",0)),c=isNaN(c)?0:c),T("voice_search_auth_header_removal")||(a["X-Goog-AuthUser"]=c.toString()),"INNERTUBE_HOST_OVERRIDE"in Tl||(a["X-Origin"]=window.location.origin),b===void 0&&"DELEGATED_SESSION_ID"in Tl&&(a["X-Goog-PageId"]=S("DELEGATED_SESSION_ID"));return a}
;var cn={identityType:"UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"};function dn(a,b,c,d,e){Rf.set(""+a,b,{Vb:c,path:"/",domain:d===void 0?"youtube.com":d,secure:e===void 0?!1:e})}
function en(a){return Rf.get(""+a,void 0)}
function fn(a,b,c){Rf.remove(""+a,b===void 0?"/":b,c===void 0?"youtube.com":c)}
function gn(){if(T("embeds_web_enable_cookie_detection_fix")){if(!D.navigator.cookieEnabled)return!1}else if(!Rf.isEnabled())return!1;if(Rf.h.cookie)return!0;T("embeds_web_enable_cookie_detection_fix")?Rf.set("TESTCOOKIESENABLED","1",{Vb:60,af:"none",secure:!0}):Rf.set("TESTCOOKIESENABLED","1",{Vb:60});if(Rf.get("TESTCOOKIESENABLED")!=="1")return!1;Rf.remove("TESTCOOKIESENABLED");return!0}
;var hn=F("ytglobal.prefsUserPrefsPrefs_")||{};E("ytglobal.prefsUserPrefsPrefs_",hn);function jn(){this.h=S("ALT_PREF_COOKIE_NAME","PREF");this.i=S("ALT_PREF_COOKIE_DOMAIN","youtube.com");var a=en(this.h);a&&this.parse(a)}
var kn;function ln(){kn||(kn=new jn);return kn}
r=jn.prototype;r.get=function(a,b){mn(a);nn(a);a=hn[a]!==void 0?hn[a].toString():null;return a!=null?a:b?b:""};
r.set=function(a,b){mn(a);nn(a);if(b==null)throw Error("ExpectedNotNull");hn[a]=b.toString()};
function on(a){return!!((pn("f"+(Math.floor(a/31)+1))||0)&1<<a%31)}
r.remove=function(a){mn(a);nn(a);delete hn[a]};
r.clear=function(){for(var a in hn)delete hn[a]};
function nn(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function mn(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function pn(a){a=hn[a]!==void 0?hn[a].toString():null;return a!=null&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
r.parse=function(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(hn[d]=c.toString())}};var qn={bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"},rn={"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};
function sn(){var a=D.navigator;return a?a.connection:void 0}
function tn(){var a=sn();if(a){var b=qn[a.type||"unknown"]||"CONN_UNKNOWN";a=qn[a.effectiveType||"unknown"]||"CONN_UNKNOWN";b==="CONN_CELLULAR_UNKNOWN"&&a!=="CONN_UNKNOWN"&&(b=a);if(b!=="CONN_UNKNOWN")return b;if(a!=="CONN_UNKNOWN")return a}}
function un(){var a=sn();if(a!=null&&a.effectiveType)return rn.hasOwnProperty(a.effectiveType)?rn[a.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN"}
;function U(a){var b=C.apply(1,arguments);var c=Error.call(this,a);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.args=[].concat(A(b));Object.setPrototypeOf(this,this.constructor.prototype)}
w(U,Error);function vn(){try{return wn(),!0}catch(a){return!1}}
function wn(a){if(S("DATASYNC_ID")!==void 0)return S("DATASYNC_ID");throw new U("Datasync ID not set",a===void 0?"unknown":a);}
;function xn(){}
function yn(a,b){return Dj.Ra(a,0,b)}
xn.prototype.pa=function(a,b){return this.Ra(a,1,b)};
xn.prototype.Lb=function(a){var b=F("yt.scheduler.instance.addImmediateJob");b?b(a):a()};var zn=tm("web_emulated_idle_callback_delay",300),An=1E3/60-3,Bn=[8,5,4,3,2,1,0];
function Cn(a){a=a===void 0?{}:a;G.call(this);this.i=[];this.j={};this.Z=this.h=0;this.Y=this.u=!1;this.P=[];this.U=this.ha=!1;for(var b=y(Bn),c=b.next();!c.done;c=b.next())this.i[c.value]=[];this.o=0;this.Gc=a.timeout||1;this.G=An;this.D=0;this.xa=this.Ne.bind(this);this.Kb=this.tf.bind(this);this.Pa=this.Xd.bind(this);this.Qa=this.ye.bind(this);this.eb=this.Ue.bind(this);this.Fa=!!window.requestIdleCallback&&!!window.cancelIdleCallback&&!T("disable_scheduler_requestIdleCallback");(this.ma=a.useRaf!==
!1&&!!window.requestAnimationFrame)&&document.addEventListener("visibilitychange",this.xa)}
w(Cn,G);r=Cn.prototype;r.Lb=function(a){var b=$a();Dn(this,a);a=$a()-b;this.u||(this.G-=a)};
r.Ra=function(a,b,c){++this.Z;if(b===10)return this.Lb(a),this.Z;var d=this.Z;this.j[d]=a;this.u&&!c?this.P.push({id:d,priority:b}):(this.i[b].push(d),this.Y||this.u||(this.h!==0&&En(this)!==this.D&&this.stop(),this.start()));return d};
r.qa=function(a){delete this.j[a]};
function Fn(a){a.P.length=0;for(var b=5;b>=0;b--)a.i[b].length=0;a.i[8].length=0;a.j={};a.stop()}
r.isHidden=function(){return!!document.hidden||!1};
function Gn(a){return!a.isHidden()&&a.ma}
function En(a){if(a.i[8].length){if(a.U)return 4;if(Gn(a))return 3}for(var b=5;b>=a.o;b--)if(a.i[b].length>0)return b>0?Gn(a)?3:2:1;return 0}
r.Ha=function(a){var b=F("yt.logging.errors.log");b&&b(a)};
function Dn(a,b){try{b()}catch(c){a.Ha(c)}}
function Hn(a){for(var b=y(Bn),c=b.next();!c.done;c=b.next())if(a.i[c.value].length)return!0;return!1}
r.ye=function(a){var b=void 0;a&&(b=a.timeRemaining());this.ha=!0;In(this,b);this.ha=!1};
r.tf=function(){In(this)};
r.Xd=function(){Jn(this)};
r.Ue=function(a){this.U=!0;var b=En(this);b===4&&b!==this.D&&(this.stop(),this.start());In(this,void 0,a);this.U=!1};
r.Ne=function(){this.isHidden()||Jn(this);this.h&&(this.stop(),this.start())};
function Jn(a){a.stop();a.u=!0;for(var b=$a(),c=a.i[8];c.length;){var d=c.shift(),e=a.j[d];delete a.j[d];e&&Dn(a,e)}Kn(a);a.u=!1;Hn(a)&&a.start();b=$a()-b;a.G-=b}
function Kn(a){for(var b=0,c=a.P.length;b<c;b++){var d=a.P[b];a.i[d.priority].push(d.id)}a.P.length=0}
function In(a,b,c){a.U&&a.D===4&&a.h||a.stop();a.u=!0;b=$a()+(b||a.G);for(var d=a.i[5];d.length;){var e=d.shift(),f=a.j[e];delete a.j[e];if(f){e=a;try{f(c)}catch(l){e.Ha(l)}}}for(d=a.i[4];d.length;)c=d.shift(),f=a.j[c],delete a.j[c],f&&Dn(a,f);d=a.ha?0:1;d=a.o>d?a.o:d;if(!($a()>=b)){do{a:{c=a;f=d;for(e=3;e>=f;e--)for(var g=c.i[e];g.length;){var h=g.shift(),k=c.j[h];delete c.j[h];if(k){c=k;break a}}c=null}c&&Dn(a,c)}while(c&&$a()<b)}a.u=!1;Kn(a);a.G=An;Hn(a)&&a.start()}
r.start=function(){this.Y=!1;if(this.h===0)switch(this.D=En(this),this.D){case 1:var a=this.Qa;this.h=this.Fa?window.requestIdleCallback(a,{timeout:3E3}):window.setTimeout(a,zn);break;case 2:this.h=window.setTimeout(this.Kb,this.Gc);break;case 3:this.h=window.requestAnimationFrame(this.eb);break;case 4:this.h=window.setTimeout(this.Pa,0)}};
r.pause=function(){this.stop();this.Y=!0};
r.stop=function(){if(this.h){switch(this.D){case 1:var a=this.h;this.Fa?window.cancelIdleCallback(a):window.clearTimeout(a);break;case 2:case 4:window.clearTimeout(this.h);break;case 3:window.cancelAnimationFrame(this.h)}this.h=0}};
r.ba=function(){Fn(this);this.stop();this.ma&&document.removeEventListener("visibilitychange",this.xa);G.prototype.ba.call(this)};var Ln=F("yt.scheduler.instance.timerIdMap_")||{},Mn=tm("kevlar_tuner_scheduler_soft_state_timer_ms",800),Nn=0,On=0;function Pn(){var a=F("ytglobal.schedulerInstanceInstance_");if(!a||a.ea)a=new Cn(S("scheduler")||{}),E("ytglobal.schedulerInstanceInstance_",a);return a}
function Qn(){Rn();var a=F("ytglobal.schedulerInstanceInstance_");a&&(rc(a),E("ytglobal.schedulerInstanceInstance_",null))}
function Rn(){Fn(Pn());for(var a in Ln)Ln.hasOwnProperty(a)&&delete Ln[Number(a)]}
function Sn(a,b,c){if(!c)return c=c===void 0,-Pn().Ra(a,b,c);var d=window.setTimeout(function(){var e=Pn().Ra(a,b);Ln[d]=e},c);
return d}
function Tn(a){Pn().Lb(a)}
function Un(a){var b=Pn();if(a<0)b.qa(-a);else{var c=Ln[a];c?(b.qa(c),delete Ln[a]):window.clearTimeout(a)}}
function Vn(){Wn()}
function Wn(){window.clearTimeout(Nn);Pn().start()}
function Xn(){Pn().pause();window.clearTimeout(Nn);Nn=window.setTimeout(Vn,Mn)}
function Yn(){window.clearTimeout(On);On=window.setTimeout(function(){Zn(0)},Mn)}
function Zn(a){Yn();var b=Pn();b.o=a;b.start()}
function $n(a){Yn();var b=Pn();b.o>a&&(b.o=a,b.start())}
function ao(){window.clearTimeout(On);var a=Pn();a.o=0;a.start()}
;function bo(){xn.apply(this,arguments)}
w(bo,xn);function co(){bo.instance||(bo.instance=new bo);return bo.instance}
bo.prototype.Ra=function(a,b,c){c!==void 0&&Number.isNaN(Number(c))&&(c=void 0);var d=F("yt.scheduler.instance.addJob");return d?d(a,b,c):c===void 0?(a(),NaN):qm(a,c||0)};
bo.prototype.qa=function(a){if(a===void 0||!Number.isNaN(Number(a))){var b=F("yt.scheduler.instance.cancelJob");b?b(a):window.clearTimeout(a)}};
bo.prototype.start=function(){var a=F("yt.scheduler.instance.start");a&&a()};
bo.prototype.pause=function(){var a=F("yt.scheduler.instance.pause");a&&a()};
var Dj=co();
T("web_scheduler_auto_init")&&!F("yt.scheduler.initialized")&&(E("yt.scheduler.instance.dispose",Qn),E("yt.scheduler.instance.addJob",Sn),E("yt.scheduler.instance.addImmediateJob",Tn),E("yt.scheduler.instance.cancelJob",Un),E("yt.scheduler.instance.cancelAllJobs",Rn),E("yt.scheduler.instance.start",Wn),E("yt.scheduler.instance.pause",Xn),E("yt.scheduler.instance.setPriorityThreshold",Zn),E("yt.scheduler.instance.enablePriorityThreshold",$n),E("yt.scheduler.instance.clearPriorityThreshold",ao),E("yt.scheduler.initialized",
!0));function eo(a){var b=new dk;this.h=(a=b.isAvailable()?a?new ek(b,a):b:null)?new Yj(a):null;this.i=document.domain||window.location.hostname}
eo.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+c*1E3);return}catch(f){}var e="";if(d)try{e=escape((new zi).serialize(b))}catch(f){return}else e=escape(b);dn(a,e,c,this.i)};
eo.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=en(a))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
eo.prototype.remove=function(a){this.h&&this.h.remove(a);fn(a,"/",this.i)};var fo=function(){var a;return function(){a||(a=new eo("ytidb"));return a}}();
function go(){var a;return(a=fo())==null?void 0:a.get("LAST_RESULT_ENTRY_KEY",!0)}
;var ho=[],io,jo=!1;function ko(){var a={};for(io=new lo(a.handleError===void 0?mo:a.handleError,a.logEvent===void 0?no:a.logEvent);ho.length>0;)switch(a=ho.shift(),a.type){case "ERROR":io.Ha(a.payload);break;case "EVENT":io.logEvent(a.eventType,a.payload)}}
function oo(a){jo||(io?io.Ha(a):(ho.push({type:"ERROR",payload:a}),ho.length>10&&ho.shift()))}
function po(a,b){jo||(io?io.logEvent(a,b):(ho.push({type:"EVENT",eventType:a,payload:b}),ho.length>10&&ho.shift()))}
;function qo(a){if(a.indexOf(":")>=0)throw Error("Database name cannot contain ':'");}
function ro(a){return a.substr(0,a.indexOf(":"))||a}
;var so=jd||kd;function to(a){var b=Tc();return b?b.toLowerCase().indexOf(a)>=0:!1}
;var uo={},vo=(uo.AUTH_INVALID="No user identifier specified.",uo.EXPLICIT_ABORT="Transaction was explicitly aborted.",uo.IDB_NOT_SUPPORTED="IndexedDB is not supported.",uo.MISSING_INDEX="Index not created.",uo.MISSING_OBJECT_STORES="Object stores not created.",uo.DB_DELETED_BY_MISSING_OBJECT_STORES="Database is deleted because expected object stores were not created.",uo.DB_REOPENED_BY_MISSING_OBJECT_STORES="Database is reopened because expected object stores were not created.",uo.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",
uo.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",uo.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",uo.EXECUTE_TRANSACTION_ON_CLOSED_DB="Can't start a transaction on a closed database",uo.INCOMPATIBLE_DB_VERSION="The binary is incompatible with the database version",uo),wo={},xo=(wo.AUTH_INVALID="ERROR",wo.EXECUTE_TRANSACTION_ON_CLOSED_DB="WARNING",wo.EXPLICIT_ABORT="IGNORED",wo.IDB_NOT_SUPPORTED="ERROR",wo.MISSING_INDEX=
"WARNING",wo.MISSING_OBJECT_STORES="ERROR",wo.DB_DELETED_BY_MISSING_OBJECT_STORES="WARNING",wo.DB_REOPENED_BY_MISSING_OBJECT_STORES="WARNING",wo.QUOTA_EXCEEDED="WARNING",wo.QUOTA_MAYBE_EXCEEDED="WARNING",wo.UNKNOWN_ABORT="WARNING",wo.INCOMPATIBLE_DB_VERSION="WARNING",wo),yo={},zo=(yo.AUTH_INVALID=!1,yo.EXECUTE_TRANSACTION_ON_CLOSED_DB=!1,yo.EXPLICIT_ABORT=!1,yo.IDB_NOT_SUPPORTED=!1,yo.MISSING_INDEX=!1,yo.MISSING_OBJECT_STORES=!1,yo.DB_DELETED_BY_MISSING_OBJECT_STORES=!1,yo.DB_REOPENED_BY_MISSING_OBJECT_STORES=
!1,yo.QUOTA_EXCEEDED=!1,yo.QUOTA_MAYBE_EXCEEDED=!0,yo.UNKNOWN_ABORT=!0,yo.INCOMPATIBLE_DB_VERSION=!1,yo);function Ao(a,b,c,d,e){b=b===void 0?{}:b;c=c===void 0?vo[a]:c;d=d===void 0?xo[a]:d;e=e===void 0?zo[a]:e;U.call(this,c,Object.assign({},{name:"YtIdbKnownError",isSw:self.document===void 0,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;this.level=d;this.h=e;Object.setPrototypeOf(this,Ao.prototype)}
w(Ao,U);function Bo(a,b){Ao.call(this,"MISSING_OBJECT_STORES",{expectedObjectStores:b,foundObjectStores:a},vo.MISSING_OBJECT_STORES);Object.setPrototypeOf(this,Bo.prototype)}
w(Bo,Ao);function Co(a,b){var c=Error.call(this);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.index=a;this.objectStore=b;Object.setPrototypeOf(this,Co.prototype)}
w(Co,Error);var Do=["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
function Eo(a,b,c,d){b=ro(b);var e=a instanceof Error?a:Error("Unexpected error: "+a);if(e instanceof Ao)return e;a={objectStoreNames:c,dbName:b,dbVersion:d};if(e.name==="QuotaExceededError")return new Ao("QUOTA_EXCEEDED",a);if(ld&&e.name==="UnknownError")return new Ao("QUOTA_MAYBE_EXCEEDED",a);if(e instanceof Co)return new Ao("MISSING_INDEX",Object.assign({},a,{objectStore:e.objectStore,index:e.index}));if(e.name==="InvalidStateError"&&Do.some(function(f){return e.message.includes(f)}))return new Ao("EXECUTE_TRANSACTION_ON_CLOSED_DB",
a);
if(e.name==="AbortError")return new Ao("UNKNOWN_ABORT",a,e.message);e.args=[Object.assign({},a,{name:"IdbError",Bd:e.name})];e.level="WARNING";return e}
function Fo(a,b,c){var d=go();return new Ao("IDB_NOT_SUPPORTED",{context:{caller:a,publicName:b,version:c,hasSucceededOnce:d==null?void 0:d.hasSucceededOnce}})}
;function Go(a){if(!a)throw Error();throw a;}
function Ho(a){return a}
function Io(a){this.h=a}
function Jo(a){function b(e){if(d.state.status==="PENDING"){d.state={status:"REJECTED",reason:e};e=y(d.i);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
function c(e){if(d.state.status==="PENDING"){d.state={status:"FULFILLED",value:e};e=y(d.h);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
var d=this;this.state={status:"PENDING"};this.h=[];this.i=[];a=a.h;try{a(c,b)}catch(e){b(e)}}
Jo.all=function(a){return new Jo(new Io(function(b,c){var d=[],e=a.length;e===0&&b(d);for(var f={Ab:0};f.Ab<a.length;f={Ab:f.Ab},++f.Ab)Jo.resolve(a[f.Ab]).then(function(g){return function(h){d[g.Ab]=h;e--;e===0&&b(d)}}(f)).catch(function(g){c(g)})}))};
Jo.resolve=function(a){return new Jo(new Io(function(b,c){a instanceof Jo?a.then(b,c):b(a)}))};
Jo.reject=function(a){return new Jo(new Io(function(b,c){c(a)}))};
Jo.prototype.then=function(a,b){var c=this,d=a!=null?a:Ho,e=b!=null?b:Go;return new Jo(new Io(function(f,g){c.state.status==="PENDING"?(c.h.push(function(){Ko(c,c,d,f,g)}),c.i.push(function(){Lo(c,c,e,f,g)})):c.state.status==="FULFILLED"?Ko(c,c,d,f,g):c.state.status==="REJECTED"&&Lo(c,c,e,f,g)}))};
Jo.prototype.catch=function(a){return this.then(void 0,a)};
function Ko(a,b,c,d,e){try{if(a.state.status!=="FULFILLED")throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof Jo?Mo(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Lo(a,b,c,d,e){try{if(a.state.status!=="REJECTED")throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof Jo?Mo(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Mo(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof Jo?Mo(a,b,f,d,e):d(f)},function(f){e(f)})}
;function No(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Oo(a){return new Promise(function(b,c){No(a,b,c)})}
function Po(a){return new Jo(new Io(function(b,c){No(a,b,c)}))}
;function Qo(a,b){return new Jo(new Io(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()}))}
;var Ro=window,V=Ro.ytcsi&&Ro.ytcsi.now?Ro.ytcsi.now:Ro.performance&&Ro.performance.timing&&Ro.performance.now&&Ro.performance.timing.navigationStart?function(){return Ro.performance.timing.navigationStart+Ro.performance.now()}:function(){return(new Date).getTime()};function So(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(V());this.i=!1}
r=So.prototype;r.add=function(a,b,c){return To(this,[a],{mode:"readwrite",ka:!0},function(d){return d.objectStore(a).add(b,c)})};
r.clear=function(a){return To(this,[a],{mode:"readwrite",ka:!0},function(b){return b.objectStore(a).clear()})};
r.close=function(){this.h.close();var a;((a=this.options)==null?0:a.closed)&&this.options.closed()};
r.count=function(a,b){return To(this,[a],{mode:"readonly",ka:!0},function(c){return c.objectStore(a).count(b)})};
function Uo(a,b,c){a=a.h.createObjectStore(b,c);return new Vo(a)}
r.delete=function(a,b){return To(this,[a],{mode:"readwrite",ka:!0},function(c){return c.objectStore(a).delete(b)})};
r.get=function(a,b){return To(this,[a],{mode:"readonly",ka:!0},function(c){return c.objectStore(a).get(b)})};
function Wo(a,b,c){return To(a,[b],{mode:"readwrite",ka:!0},function(d){d=d.objectStore(b);return Po(d.h.put(c,void 0))})}
r.objectStoreNames=function(){return Array.from(this.h.objectStoreNames)};
function To(a,b,c,d){var e,f,g,h,k,l,m,n,p,t,v,x;return B(function(z){switch(z.h){case 1:var H={mode:"readonly",ka:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};typeof c==="string"?H.mode=c:Object.assign(H,c);e=H;a.transactionCount++;f=e.ka?3:1;g=0;case 2:if(h){z.A(4);break}g++;k=Math.round(V());ya(z,5);l=a.h.transaction(b,e.mode);H=z.yield;var K=new Xo(l);K=Yo(K,d);return H.call(z,K,7);case 7:return m=z.i,n=Math.round(V()),Zo(a,k,n,g,void 0,b.join(),e),z.return(m);case 5:p=Aa(z);t=Math.round(V());v=Eo(p,
a.h.name,b.join(),a.h.version);if((x=v instanceof Ao&&!v.h)||g>=f)Zo(a,k,t,g,v,b.join(),e),h=v;z.A(2);break;case 4:return z.return(Promise.reject(h))}})}
function Zo(a,b,c,d,e,f,g){b=c-b;e?(e instanceof Ao&&(e.type==="QUOTA_EXCEEDED"||e.type==="QUOTA_MAYBE_EXCEEDED")&&po("QUOTA_EXCEEDED",{dbName:ro(a.h.name),objectStoreNames:f,transactionCount:a.transactionCount,transactionMode:g.mode}),e instanceof Ao&&e.type==="UNKNOWN_ABORT"&&(c-=a.j,c<0&&c>=2147483648&&(c=0),po("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:f,transactionDuration:b,transactionCount:a.transactionCount,dbDuration:c}),a.i=!0),$o(a,!1,d,f,b,g.tag),oo(e)):$o(a,!0,d,f,b,g.tag)}
function $o(a,b,c,d,e,f){po("TRANSACTION_ENDED",{objectStoreNames:d,connectionHasUnknownAbortedTransaction:a.i,duration:e,isSuccessful:b,tryCount:c,tag:f===void 0?"IDB_TRANSACTION_TAG_UNKNOWN":f})}
r.getName=function(){return this.h.name};
function Vo(a){this.h=a}
r=Vo.prototype;r.add=function(a,b){return Po(this.h.add(a,b))};
r.autoIncrement=function(){return this.h.autoIncrement};
r.clear=function(){return Po(this.h.clear()).then(function(){})};
function ap(a,b,c){a.h.createIndex(b,c,{unique:!1})}
r.count=function(a){return Po(this.h.count(a))};
function bp(a,b){return cp(a,{query:b},function(c){return c.delete().then(function(){return dp(c)})}).then(function(){})}
r.delete=function(a){return a instanceof IDBKeyRange?bp(this,a):Po(this.h.delete(a))};
r.get=function(a){return Po(this.h.get(a))};
r.index=function(a){try{return new ep(this.h.index(a))}catch(b){if(b instanceof Error&&b.name==="NotFoundError")throw new Co(a,this.h.name);throw b;}};
r.getName=function(){return this.h.name};
r.keyPath=function(){return this.h.keyPath};
function cp(a,b,c){a=a.h.openCursor(b.query,b.direction);return fp(a).then(function(d){return Qo(d,c)})}
function Xo(a){var b=this;this.h=a;this.i=new Map;this.aborted=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.aborted){e=Ao;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(k===null)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function Yo(a,b){var c=new Promise(function(d,e){try{b(a).then(function(f){d(f)}).catch(e)}catch(f){e(f),a.abort()}});
return Promise.all([c,a.done]).then(function(d){return y(d).next().value})}
Xo.prototype.abort=function(){this.h.abort();this.aborted=!0;throw new Ao("EXPLICIT_ABORT");};
Xo.prototype.objectStore=function(a){a=this.h.objectStore(a);var b=this.i.get(a);b||(b=new Vo(a),this.i.set(a,b));return b};
function ep(a){this.h=a}
r=ep.prototype;r.count=function(a){return Po(this.h.count(a))};
r.delete=function(a){return gp(this,{query:a},function(b){return b.delete().then(function(){return dp(b)})})};
r.get=function(a){return Po(this.h.get(a))};
r.keyPath=function(){return this.h.keyPath};
r.unique=function(){return this.h.unique};
function gp(a,b,c){a=a.h.openCursor(b.query===void 0?null:b.query,b.direction===void 0?"next":b.direction);return fp(a).then(function(d){return Qo(d,c)})}
function hp(a,b){this.request=a;this.cursor=b}
function fp(a){return Po(a).then(function(b){return b?new hp(a,b):null})}
function dp(a){a.cursor.continue(void 0);return fp(a.request)}
hp.prototype.delete=function(){return Po(this.cursor.delete()).then(function(){})};
hp.prototype.getValue=function(){return this.cursor.value};
hp.prototype.update=function(a){return Po(this.cursor.update(a))};function ip(a,b,c){return new Promise(function(d,e){function f(){p||(p=new So(g.result,{closed:n}));return p}
var g=b!==void 0?self.indexedDB.open(a,b):self.indexedDB.open(a);var h=c.ae,k=c.blocking,l=c.rf,m=c.upgrade,n=c.closed,p;g.addEventListener("upgradeneeded",function(t){try{if(t.newVersion===null)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(g.transaction===null)throw Error("Invariant: transaction on IDbOpenDbRequest is null");t.dataLoss&&t.dataLoss!=="none"&&po("IDB_DATA_CORRUPTED",{reason:t.dataLossMessage||"unknown reason",dbName:ro(a)});var v=f(),x=new Xo(g.transaction);
m&&m(v,function(z){return t.oldVersion<z&&t.newVersion>=z},x);
x.done.catch(function(z){e(z)})}catch(z){e(z)}});
g.addEventListener("success",function(){var t=g.result;k&&t.addEventListener("versionchange",function(){k(f())});
t.addEventListener("close",function(){po("IDB_UNEXPECTEDLY_CLOSED",{dbName:ro(a),dbVersion:t.version});l&&l()});
d(f())});
g.addEventListener("error",function(){e(g.error)});
h&&g.addEventListener("blocked",function(){h()})})}
function jp(a,b,c){c=c===void 0?{}:c;return ip(a,b,c)}
function kp(a,b){b=b===void 0?{}:b;var c,d,e,f;return B(function(g){if(g.h==1)return ya(g,2),c=self.indexedDB.deleteDatabase(a),d=b,(e=d.ae)&&c.addEventListener("blocked",function(){e()}),g.yield(Oo(c),4);
if(g.h!=2)return za(g,0);f=Aa(g);throw Eo(f,a,"",-1);})}
;function lp(a,b){this.name=a;this.options=b;this.j=!0;this.u=this.o=0}
lp.prototype.i=function(a,b,c){c=c===void 0?{}:c;return jp(a,b,c)};
lp.prototype.delete=function(a){a=a===void 0?{}:a;return kp(this.name,a)};
function mp(a,b){return new Ao("INCOMPATIBLE_DB_VERSION",{dbName:a.name,oldVersion:a.options.version,newVersion:b})}
function np(a,b){if(!b)throw Fo("openWithToken",ro(a.name));return a.open()}
lp.prototype.open=function(){function a(){var f,g,h,k,l,m,n,p,t,v;return B(function(x){switch(x.h){case 1:return g=(f=Error().stack)!=null?f:"",ya(x,2),x.yield(c.i(c.name,c.options.version,e),4);case 4:for(var z=h=x.i,H=c.options,K=[],ca=y(Object.keys(H.Gb)),da=ca.next();!da.done;da=ca.next()){da=da.value;var Oa=H.Gb[da],Lb=Oa.Ve===void 0?Number.MAX_VALUE:Oa.Ve;!(z.h.version>=Oa.Nb)||z.h.version>=Lb||z.h.objectStoreNames.contains(da)||K.push(da)}k=K;if(k.length===0){x.A(5);break}l=Object.keys(c.options.Gb);
m=h.objectStoreNames();if(c.u<tm("ytidb_reopen_db_retries",0))return c.u++,h.close(),oo(new Ao("DB_REOPENED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:m})),x.return(a());if(!(c.o<tm("ytidb_remake_db_retries",1))){x.A(6);break}c.o++;return x.yield(c.delete(),7);case 7:return oo(new Ao("DB_DELETED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:m})),x.return(a());case 6:throw new Bo(m,l);case 5:return x.return(h);case 2:n=Aa(x);
if(n instanceof DOMException?n.name!=="VersionError":"DOMError"in self&&n instanceof DOMError?n.name!=="VersionError":!(n instanceof Object&&"message"in n)||n.message!=="An attempt was made to open a database using a lower version than the existing version."){x.A(8);break}return x.yield(c.i(c.name,void 0,Object.assign({},e,{upgrade:void 0})),9);case 9:p=x.i;t=p.h.version;if(c.options.version!==void 0&&t>c.options.version+1)throw p.close(),c.j=!1,mp(c,t);return x.return(p);case 8:throw b(),n instanceof
Error&&!T("ytidb_async_stack_killswitch")&&(n.stack=n.stack+"\n"+g.substring(g.indexOf("\n")+1)),Eo(n,c.name,"",(v=c.options.version)!=null?v:-1);}})}
function b(){c.h===d&&(c.h=void 0)}
var c=this;if(!this.j)throw mp(this);if(this.h)return this.h;var d,e={blocking:function(f){f.close()},
closed:b,rf:b,upgrade:this.options.upgrade};return this.h=d=a()};var op=new lp("YtIdbMeta",{Gb:{databases:{Nb:1}},upgrade:function(a,b){b(1)&&Uo(a,"databases",{keyPath:"actualName"})}});
function pp(a,b){var c;return B(function(d){if(d.h==1)return d.yield(np(op,b),2);c=d.i;return d.return(To(c,["databases"],{ka:!0,mode:"readwrite"},function(e){var f=e.objectStore("databases");return f.get(a.actualName).then(function(g){if(g?a.actualName!==g.actualName||a.publicName!==g.publicName||a.userIdentifier!==g.userIdentifier:1)return Po(f.h.put(a,void 0)).then(function(){})})}))})}
function qp(a,b){var c;return B(function(d){if(d.h==1)return a?d.yield(np(op,b),2):d.return();c=d.i;return d.return(c.delete("databases",a))})}
function rp(a,b){var c,d;return B(function(e){return e.h==1?(c=[],e.yield(np(op,b),2)):e.h!=3?(d=e.i,e.yield(To(d,["databases"],{ka:!0,mode:"readonly"},function(f){c.length=0;return cp(f.objectStore("databases"),{},function(g){a(g.getValue())&&c.push(g.getValue());return dp(g)})}),3)):e.return(c)})}
function sp(a){return rp(function(b){return b.publicName==="LogsDatabaseV2"&&b.userIdentifier!==void 0},a)}
function tp(a,b,c){return rp(function(d){return c?d.userIdentifier!==void 0&&!a.includes(d.userIdentifier)&&c.includes(d.publicName):d.userIdentifier!==void 0&&!a.includes(d.userIdentifier)},b)}
function up(a){var b,c;return B(function(d){if(d.h==1)return b=wn("YtIdbMeta hasAnyMeta other"),d.yield(rp(function(e){return e.userIdentifier!==void 0&&e.userIdentifier!==b},a),2);
c=d.i;return d.return(c.length>0)})}
;var vp,wp=new function(){}(new function(){});
function xp(){var a,b,c,d;return B(function(e){switch(e.h){case 1:a=go();if((b=a)==null?0:b.hasSucceededOnce)return e.return(!0);var f;if(f=so)f=/WebKit\/([0-9]+)/.exec(Tc()),f=!!(f&&parseInt(f[1],10)>=600);f&&(f=/WebKit\/([0-9]+)/.exec(Tc()),f=!(f&&parseInt(f[1],10)>=602));if(f||fd)return e.return(!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return e.return(!1)}catch(g){return e.return(!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return e.return(!1);
ya(e,2);d={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0};return e.yield(pp(d,wp),4);case 4:return e.yield(qp("yt-idb-test-do-not-use",wp),5);case 5:return e.return(!0);case 2:return Aa(e),e.return(!1)}})}
function yp(){if(vp!==void 0)return vp;jo=!0;return vp=xp().then(function(a){jo=!1;var b;if((b=fo())!=null&&b.h){var c;b={hasSucceededOnce:((c=go())==null?void 0:c.hasSucceededOnce)||a};var d;(d=fo())==null||d.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0)}return a})}
function zp(){return F("ytglobal.idbToken_")||void 0}
function Ap(){var a=zp();return a?Promise.resolve(a):yp().then(function(b){(b=b?wp:void 0)&&E("ytglobal.idbToken_",b);return b})}
;var Bp=0;function Cp(a,b){Bp||(Bp=Dj.pa(function(){var c,d,e,f,g;return B(function(h){switch(h.h){case 1:return h.yield(Ap(),2);case 2:c=h.i;if(!c)return h.return();d=!0;ya(h,3);return h.yield(tp(a,c,b),5);case 5:e=h.i;if(!e.length){d=!1;h.A(6);break}f=e[0];return h.yield(kp(f.actualName),7);case 7:return h.yield(qp(f.actualName,c),6);case 6:za(h,4);break;case 3:g=Aa(h),oo(g),d=!1;case 4:Dj.qa(Bp),Bp=0,d&&Cp(a,b),h.h=0}})}))}
function Dp(){var a;return B(function(b){return b.h==1?b.yield(Ap(),2):(a=b.i)?b.return(up(a)):b.return(!1)})}
new fj;function Ep(a){if(!vn())throw a=new Ao("AUTH_INVALID",{dbName:a}),oo(a),a;var b=wn();return{actualName:a+":"+b,publicName:a,userIdentifier:b}}
function Fp(a,b,c,d){var e,f,g,h,k,l;return B(function(m){switch(m.h){case 1:return f=(e=Error().stack)!=null?e:"",m.yield(Ap(),2);case 2:g=m.i;if(!g)throw h=Fo("openDbImpl",a,b),T("ytidb_async_stack_killswitch")||(h.stack=h.stack+"\n"+f.substring(f.indexOf("\n")+1)),oo(h),h;qo(a);k=c?{actualName:a,publicName:a,userIdentifier:void 0}:Ep(a);ya(m,3);return m.yield(pp(k,g),5);case 5:return m.yield(jp(k.actualName,b,d),6);case 6:return m.return(m.i);case 3:return l=Aa(m),ya(m,7),m.yield(qp(k.actualName,
g),9);case 9:za(m,8);break;case 7:Aa(m);case 8:throw l;}})}
function Gp(a,b,c){c=c===void 0?{}:c;return Fp(a,b,!1,c)}
function Hp(a,b,c){c=c===void 0?{}:c;return Fp(a,b,!0,c)}
function Ip(a,b){b=b===void 0?{}:b;var c,d;return B(function(e){if(e.h==1)return e.yield(Ap(),2);if(e.h!=3){c=e.i;if(!c)return e.return();qo(a);d=Ep(a);return e.yield(kp(d.actualName,b),3)}return e.yield(qp(d.actualName,c),0)})}
function Jp(a,b,c){a=a.map(function(d){return B(function(e){return e.h==1?e.yield(kp(d.actualName,b),2):e.yield(qp(d.actualName,c),0)})});
return Promise.all(a).then(function(){})}
function Kp(){var a=a===void 0?{}:a;var b,c;return B(function(d){if(d.h==1)return d.yield(Ap(),2);if(d.h!=3){b=d.i;if(!b)return d.return();qo("LogsDatabaseV2");return d.yield(sp(b),3)}c=d.i;return d.yield(Jp(c,a,b),0)})}
function Lp(a,b){b=b===void 0?{}:b;var c;return B(function(d){if(d.h==1)return d.yield(Ap(),2);if(d.h!=3){c=d.i;if(!c)return d.return();qo(a);return d.yield(kp(a,b),3)}return d.yield(qp(a,c),0)})}
;function Mp(a,b){lp.call(this,a,b);this.options=b;qo(a)}
w(Mp,lp);function Np(a,b){var c;return function(){c||(c=new Mp(a,b));return c}}
Mp.prototype.i=function(a,b,c){c=c===void 0?{}:c;return(this.options.shared?Hp:Gp)(a,b,Object.assign({},c))};
Mp.prototype.delete=function(a){a=a===void 0?{}:a;return(this.options.shared?Lp:Ip)(this.name,a)};
function Op(a,b){return Np(a,b)}
;var Pp={},Qp=Op("ytGcfConfig",{Gb:(Pp.coldConfigStore={Nb:1},Pp.hotConfigStore={Nb:1},Pp),shared:!1,upgrade:function(a,b){b(1)&&(ap(Uo(a,"hotConfigStore",{keyPath:"key",autoIncrement:!0}),"hotTimestampIndex","timestamp"),ap(Uo(a,"coldConfigStore",{keyPath:"key",autoIncrement:!0}),"coldTimestampIndex","timestamp"))},
version:1});function Rp(a){return np(Qp(),a)}
function Sp(a,b,c){var d,e,f;return B(function(g){switch(g.h){case 1:return d={config:a,hashData:b,timestamp:V()},g.yield(Rp(c),2);case 2:return e=g.i,g.yield(e.clear("hotConfigStore"),3);case 3:return g.yield(Wo(e,"hotConfigStore",d),4);case 4:return f=g.i,g.return(f)}})}
function Tp(a,b,c,d){var e,f,g;return B(function(h){switch(h.h){case 1:return e={config:a,hashData:b,configData:c,timestamp:V()},h.yield(Rp(d),2);case 2:return f=h.i,h.yield(f.clear("coldConfigStore"),3);case 3:return h.yield(Wo(f,"coldConfigStore",e),4);case 4:return g=h.i,h.return(g)}})}
function Up(a){var b,c;return B(function(d){return d.h==1?d.yield(Rp(a),2):d.h!=3?(b=d.i,c=void 0,d.yield(To(b,["coldConfigStore"],{mode:"readwrite",ka:!0},function(e){return gp(e.objectStore("coldConfigStore").index("coldTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
function Vp(a){var b,c;return B(function(d){return d.h==1?d.yield(Rp(a),2):d.h!=3?(b=d.i,c=void 0,d.yield(To(b,["hotConfigStore"],{mode:"readwrite",ka:!0},function(e){return gp(e.objectStore("hotConfigStore").index("hotTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
;function Wp(){G.call(this);this.i=[];this.h=[];var a=F("yt.gcf.config.hotUpdateCallbacks");a?(this.i=[].concat(A(a)),this.h=a):(this.h=[],E("yt.gcf.config.hotUpdateCallbacks",this.h))}
w(Wp,G);Wp.prototype.ba=function(){for(var a=y(this.i),b=a.next();!b.done;b=a.next()){var c=this.h;b=c.indexOf(b.value);b>=0&&c.splice(b,1)}this.i.length=0;G.prototype.ba.call(this)};function Xp(){this.h=0;this.i=new Wp}
function Yp(){var a;return(a=F("yt.gcf.config.hotConfigGroup"))!=null?a:S("RAW_HOT_CONFIG_GROUP")}
function Zp(a,b,c){var d,e,f;return B(function(g){switch(g.h){case 1:if(!T("start_client_gcf")){g.A(0);break}c&&(a.j=c,E("yt.gcf.config.hotConfigGroup",a.j||null));a.o(b);d=zp();if(!d){g.A(3);break}if(c){g.A(4);break}return g.yield(Vp(d),5);case 5:e=g.i,c=(f=e)==null?void 0:f.config;case 4:return g.yield(Sp(c,b,d),3);case 3:if(c)for(var h=c,k=y(a.i.h),l=k.next();!l.done;l=k.next())l=l.value,l(h);g.h=0}})}
function $p(a,b,c){var d,e,f,g;return B(function(h){if(h.h==1){if(!T("start_client_gcf"))return h.A(0);a.coldHashData=b;E("yt.gcf.config.coldHashData",a.coldHashData||null);return(d=zp())?c?h.A(4):h.yield(Up(d),5):h.A(0)}h.h!=4&&(e=h.i,c=(f=e)==null?void 0:f.config);if(!c)return h.A(0);g=c.configData;return h.yield(Tp(c,b,g,d),0)})}
function aq(){if(!Xp.instance){var a=new Xp;Xp.instance=a}a=Xp.instance;var b=V()-a.h;if(!(a.h!==0&&b<tm("send_config_hash_timer"))){b=F("yt.gcf.config.coldConfigData");var c=F("yt.gcf.config.hotHashData"),d=F("yt.gcf.config.coldHashData");b&&c&&d&&(a.h=V());return{coldConfigData:b,hotHashData:c,coldHashData:d}}}
Xp.prototype.o=function(a){this.hotHashData=a;E("yt.gcf.config.hotHashData",this.hotHashData||null)};function bq(){return"INNERTUBE_API_KEY"in Tl&&"INNERTUBE_API_VERSION"in Tl}
function cq(){return{innertubeApiKey:S("INNERTUBE_API_KEY"),innertubeApiVersion:S("INNERTUBE_API_VERSION"),ze:S("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),vd:S("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),Ch:S("INNERTUBE_CONTEXT_CLIENT_NAME",1),innertubeContextClientVersion:S("INNERTUBE_CONTEXT_CLIENT_VERSION"),Be:S("INNERTUBE_CONTEXT_HL"),Ae:S("INNERTUBE_CONTEXT_GL"),Ce:S("INNERTUBE_HOST_OVERRIDE")||"",De:!!S("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),Dh:!!S("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:S("SERIALIZED_CLIENT_CONFIG_DATA")}}
function dq(a){var b={client:{hl:a.Be,gl:a.Ae,clientName:a.vd,clientVersion:a.innertubeContextClientVersion,configInfo:a.ze}};navigator.userAgent&&(b.client.userAgent=String(navigator.userAgent));var c=D.devicePixelRatio;c&&c!=1&&(b.client.screenDensityFloat=String(c));c=S("EXPERIMENTS_TOKEN","");c!==""&&(b.client.experimentsToken=c);c=um();c.length>0&&(b.request={internalExperimentFlags:c});c=a.vd;if((c==="WEB"||c==="MWEB"||c===1||c===2)&&b){var d;b.client.mainAppWebInfo=(d=b.client.mainAppWebInfo)!=
null?d:{};b.client.mainAppWebInfo.webDisplayMode=Zm()}(d=F("yt.embedded_player.embed_url"))&&b&&(b.thirdParty={embedUrl:d});var e;if(T("web_log_memory_total_kbytes")&&((e=D.navigator)==null?0:e.deviceMemory)){var f;e=(f=D.navigator)==null?void 0:f.deviceMemory;b&&(b.client.memoryTotalKbytes=""+e*1E6)}a.appInstallData&&b&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);(a=tn())&&b&&(b.client.connectionType=a);T("web_log_effective_connection_type")&&
(a=un())&&b&&(b.client.effectiveConnectionType=a);T("start_client_gcf")&&(e=aq())&&(a=e.coldConfigData,f=e.coldHashData,e=e.hotHashData,b&&(b.client.configInfo=b.client.configInfo||{},a&&(b.client.configInfo.coldConfigData=a),f&&(b.client.configInfo.coldHashData=f),e&&(b.client.configInfo.hotHashData=e)));S("DELEGATED_SESSION_ID")&&!T("pageid_as_header_web")&&(b.user={onBehalfOfUser:S("DELEGATED_SESSION_ID")});!T("fill_delegate_context_in_gel_killswitch")&&(a=S("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT"))&&
(b.user=Object.assign({},b.user,{serializedDelegationContext:a}));a=S("INNERTUBE_CONTEXT");var g;if(T("enable_persistent_device_token")&&(a==null?0:(g=a.client)==null?0:g.rolloutToken)){var h;b.client.rolloutToken=a==null?void 0:(h=a.client)==null?void 0:h.rolloutToken}g=Object;h=g.assign;a=b.client;f={};e=y(Object.entries(gm(S("DEVICE",""))));for(d=e.next();!d.done;d=e.next())c=y(d.value),d=c.next().value,c=c.next().value,d==="cbrand"?f.deviceMake=c:d==="cmodel"?f.deviceModel=c:d==="cbr"?f.browserName=
c:d==="cbrver"?f.browserVersion=c:d==="cos"?f.osName=c:d==="cosver"?f.osVersion=c:d==="cplatform"&&(f.platform=c);b.client=h.call(g,a,f);return b}
function eq(a,b,c){c=c===void 0?{}:c;var d={};S("EOM_VISITOR_DATA")?d={"X-Goog-EOM-Visitor-Id":S("EOM_VISITOR_DATA")}:d={"X-Goog-Visitor-Id":c.visitorData||S("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;b=c.authorization||S("AUTHORIZATION");b||(a?b="Bearer "+F("gapi.auth.getToken")().sh:(a=bn(an()),T("pageid_as_header_web")||delete a["X-Goog-PageId"],d=Object.assign({},d,a)));b&&(d.Authorization=b);return d}
;var fq=typeof TextEncoder!=="undefined"?new TextEncoder:null,gq=fq?function(a){return fq.encode(a)}:function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);
e<128?b[c++]=e:(e<2048?b[c++]=e>>6|192:((e&64512)==55296&&d+1<a.length&&(a.charCodeAt(d+1)&64512)==56320?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}a=new Uint8Array(b.length);for(c=0;c<a.length;c++)a[c]=b[c];return a};var hq={next:"wn_s",browse:"br_s",search:"sr_s",reel:"r_wrs",player:"ps_s"},iq={next:"wn_r",browse:"br_r",search:"sr_r",reel:"r_wrr",player:"ps_r"};function jq(a,b){this.version=a;this.args=b}
jq.prototype.serialize=function(){return{version:this.version,args:this.args}};function kq(a,b){this.topic=a;this.h=b}
kq.prototype.toString=function(){return this.topic};var lq=F("ytPubsub2Pubsub2Instance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.dc;O.prototype.publish=O.prototype.sb;O.prototype.clear=O.prototype.clear;E("ytPubsub2Pubsub2Instance",lq);var mq=F("ytPubsub2Pubsub2SubscribedKeys")||{};E("ytPubsub2Pubsub2SubscribedKeys",mq);var nq=F("ytPubsub2Pubsub2TopicToKeys")||{};E("ytPubsub2Pubsub2TopicToKeys",nq);var oq=F("ytPubsub2Pubsub2IsAsync")||{};E("ytPubsub2Pubsub2IsAsync",oq);
E("ytPubsub2Pubsub2SkipSubKey",null);function pq(a,b){var c=qq();c&&c.publish.call(c,a.toString(),a,b)}
function rq(a){var b=sq,c=qq();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=F("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(mq[d])try{if(f&&b instanceof kq&&b!=e)try{var h=b.h,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.Pd){var l=new h;h.Pd=l.version}var m=h.Pd}catch(z){}if(!m||k.version!=m)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{m=Reflect;var n=m.construct;
var p=k.args,t=p.length;if(t>0){var v=Array(t);for(k=0;k<t;k++)v[k]=p[k];var x=v}else x=[];f=n.call(m,h,x)}catch(z){throw z.message="yt.pubsub2.Data.deserialize(): "+z.message,z;}}catch(z){throw z.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+z.message,z;}a.call(window,f)}catch(z){Zl(z)}},oq[b.toString()]?F("yt.scheduler.instance")?Dj.pa(g):qm(g,0):g())});
mq[d]=!0;nq[b.toString()]||(nq[b.toString()]=[]);nq[b.toString()].push(d);return d}
function tq(){var a=uq,b=rq(function(c){a.apply(void 0,arguments);vq(b)});
return b}
function vq(a){var b=qq();b&&(typeof a==="number"&&(a=[a]),Mb(a,function(c){b.unsubscribeByKey(c);delete mq[c]}))}
function qq(){return F("ytPubsub2Pubsub2Instance")}
;function wq(a,b,c){c=c===void 0?{sampleRate:.1}:c;Math.random()<Math.min(.02,c.sampleRate/100)&&pq("meta_logging_csi_event",{timerName:a,Wh:b})}
;var xq=void 0,yq=void 0;function zq(){yq||(yq=sl(S("WORKER_SERIALIZATION_URL")));return yq||void 0}
function Aq(){var a=zq();xq||a===void 0||(xq=new Worker(jb(a),void 0));return xq}
;var Bq=tm("max_body_size_to_compress",5E5),Cq=tm("min_body_size_to_compress",500),Dq=!0,Eq=0,Fq=0,Gq=tm("compression_performance_threshold_lr",250),Hq=tm("slow_compressions_before_abandon_count",4),Iq=!1,Jq=new Map,Kq=1,Lq=!0;function Mq(){if(typeof Worker==="function"&&zq()&&!Iq){var a=function(c){c=c.data;if(c.op==="gzippedGelBatch"){var d=Jq.get(c.key);d&&(Nq(c.gzippedBatch,d.latencyPayload,d.url,d.options,d.sendFn),Jq.delete(c.key))}},b=Aq();
b&&(b.addEventListener("message",a),b.onerror=function(){Jq.clear()},Iq=!0)}}
function Oq(a,b,c,d,e){e=e===void 0?!1:e;var f={startTime:V(),ticks:{},infos:{}};if(Dq)try{var g=Pq(b);if(g!=null&&(g>Bq||g<Cq))d(a,c);else{if(T("gzip_gel_with_worker")&&(T("initial_gzip_use_main_thread")&&!Lq||!T("initial_gzip_use_main_thread"))){Iq||Mq();var h=Aq();if(h&&!e){Jq.set(Kq,{latencyPayload:f,url:a,options:c,sendFn:d});h.postMessage({op:"gelBatchToGzip",serializedBatch:b,key:Kq});Kq++;return}}var k=ql(gq(b));Nq(k,f,a,c,d)}}catch(l){$l(l),d(a,c)}else d(a,c)}
function Nq(a,b,c,d,e){Lq=!1;var f=V();b.ticks.gelc=f;Fq++;T("disable_compression_due_to_performance_degredation")&&f-b.startTime>=Gq&&(Eq++,T("abandon_compression_after_N_slow_zips")?Fq===tm("compression_disable_point")&&Eq>Hq&&(Dq=!1):Dq=!1);Qq(b);d.headers||(d.headers={});d.headers["Content-Encoding"]="gzip";d.postBody=a;d.postParams=void 0;e(c,d)}
function Rq(a){var b=b===void 0?!1:b;var c=c===void 0?!1:c;var d=V(),e={startTime:d,ticks:{},infos:{}},f=b?F("yt.logging.gzipForFetch",!1):!0;if(Dq&&f){if(!a.body)return a;try{var g=c?a.body:typeof a.body==="string"?a.body:JSON.stringify(a.body);f=g;if(!c&&typeof g==="string"){var h=Pq(g);if(h!=null&&(h>Bq||h<Cq))return a;c=b?{level:1}:void 0;f=ql(gq(g),c);var k=V();e.ticks.gelc=k;if(b){Fq++;if((T("disable_compression_due_to_performance_degredation")||T("disable_compression_due_to_performance_degradation_lr"))&&
k-d>=Gq)if(Eq++,T("abandon_compression_after_N_slow_zips")||T("abandon_compression_after_N_slow_zips_lr")){b=Eq/Fq;var l=Hq/tm("compression_disable_point");Fq>0&&Fq%tm("compression_disable_point")===0&&b>=l&&(Dq=!1)}else Dq=!1;Qq(e)}}a.headers=Object.assign({},{"Content-Encoding":"gzip"},a.headers||{});a.body=f;return a}catch(m){return $l(m),a}}else return a}
function Pq(a){try{return(new Blob(a.split(""))).size}catch(b){return $l(b),null}}
function Qq(a){T("gel_compression_csi_killswitch")||!T("log_gel_compression_latency")&&!T("log_gel_compression_latency_lr")||wq("gel_compression",a,{sampleRate:.1})}
;function Sq(a){a=Object.assign({},a);delete a.Authorization;var b=Uf();if(b){var c=new Hj;c.update(S("INNERTUBE_API_KEY"));c.update(b);a.hash=od(c.digest(),3)}return a}
;var Tq;function Uq(){Tq||(Tq=new eo("yt.innertube"));return Tq}
function Vq(a,b,c,d){if(d)return null;d=Uq().get("nextId",!0)||1;var e=Uq().get("requests",!0)||{};e[d]={method:a,request:b,authState:Sq(c),requestTime:Math.round(V())};Uq().set("nextId",d+1,86400,!0);Uq().set("requests",e,86400,!0);return d}
function Wq(a){var b=Uq().get("requests",!0)||{};delete b[a];Uq().set("requests",b,86400,!0)}
function Xq(a){var b=Uq().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(Math.round(V())-d.requestTime<6E4)){var e=d.authState,f=Sq(eq(!1));hg(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(V())),Yq(a,d.method,e,{}));delete b[c]}}Uq().set("requests",b,86400,!0)}}
;function Zq(a){this.fc=this.h=!1;this.potentialEsfErrorCounter=this.i=0;this.handleError=function(){};
this.yb=function(){};
this.now=Date.now;this.Rb=!1;var b;this.Ld=(b=a.Ld)!=null?b:100;var c;this.Gd=(c=a.Gd)!=null?c:1;var d;this.Ed=(d=a.Ed)!=null?d:2592E6;var e;this.Dd=(e=a.Dd)!=null?e:12E4;var f;this.Fd=(f=a.Fd)!=null?f:5E3;var g;this.V=(g=a.V)!=null?g:void 0;this.lc=!!a.lc;var h;this.jc=(h=a.jc)!=null?h:.1;var k;this.zc=(k=a.zc)!=null?k:10;a.handleError&&(this.handleError=a.handleError);a.yb&&(this.yb=a.yb);a.Rb&&(this.Rb=a.Rb);a.fc&&(this.fc=a.fc);this.W=a.W;this.Ca=a.Ca;this.ga=a.ga;this.fa=a.fa;this.sendFn=a.sendFn;
this.Vc=a.Vc;this.Sc=a.Sc;$q(this)&&(!this.W||this.W("networkless_logging"))&&ar(this)}
function ar(a){$q(a)&&!a.Rb&&(a.h=!0,a.lc&&Math.random()<=a.jc&&a.ga.ce(a.V),br(a),a.fa.ta()&&a.cc(),a.fa.listen(a.Vc,a.cc.bind(a)),a.fa.listen(a.Sc,a.nd.bind(a)))}
r=Zq.prototype;r.writeThenSend=function(a,b){var c=this;b=b===void 0?{}:b;if($q(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.ga.set(d,this.V).then(function(e){d.id=e;c.fa.ta()&&cr(c,d)}).catch(function(e){cr(c,d);
dr(c,e)})}else this.sendFn(a,b)};
r.sendThenWrite=function(a,b,c){var d=this;b=b===void 0?{}:b;if($q(this)&&this.h){var e={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.W&&this.W("nwl_skip_retry")&&(e.skipRetry=c);if(this.fa.ta()||this.W&&this.W("nwl_aggressive_send_then_write")&&!e.skipRetry){if(!e.skipRetry){var f=b.onError?b.onError:function(){};
b.onError=function(g,h){return B(function(k){if(k.h==1)return k.yield(d.ga.set(e,d.V).catch(function(l){dr(d,l)}),2);
f(g,h);k.h=0})}}this.sendFn(a,b,e.skipRetry)}else this.ga.set(e,this.V).catch(function(g){d.sendFn(a,b,e.skipRetry);
dr(d,g)})}else this.sendFn(a,b,this.W&&this.W("nwl_skip_retry")&&c)};
r.sendAndWrite=function(a,b){var c=this;b=b===void 0?{}:b;if($q(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0},e=!1,f=b.onSuccess?b.onSuccess:function(){};
d.options.onSuccess=function(g,h){d.id!==void 0?c.ga.xb(d.id,c.V):e=!0;c.fa.mb&&c.W&&c.W("vss_network_hint")&&c.fa.mb(!0);f(g,h)};
this.sendFn(d.url,d.options,void 0,!0);this.ga.set(d,this.V).then(function(g){d.id=g;e&&c.ga.xb(d.id,c.V)}).catch(function(g){dr(c,g)})}else this.sendFn(a,b,void 0,!0)};
r.cc=function(){var a=this;if(!$q(this))throw Error("IndexedDB is not supported: throttleSend");this.i||(this.i=this.Ca.pa(function(){var b;return B(function(c){if(c.h==1)return c.yield(a.ga.sd("NEW",a.V),2);if(c.h!=3)return b=c.i,b?c.yield(cr(a,b),3):(a.nd(),c.return());a.i&&(a.i=0,a.cc());c.h=0})},this.Ld))};
r.nd=function(){this.Ca.qa(this.i);this.i=0};
function cr(a,b){var c;return B(function(d){switch(d.h){case 1:if(!$q(a))throw Error("IndexedDB is not supported: immediateSend");if(b.id===void 0){d.A(2);break}return d.yield(a.ga.He(b.id,a.V),3);case 3:(c=d.i)||a.yb(Error("The request cannot be found in the database."));case 2:if(er(a,b,a.Ed)){d.A(4);break}a.yb(Error("Networkless Logging: Stored logs request expired age limit"));if(b.id===void 0){d.A(5);break}return d.yield(a.ga.xb(b.id,a.V),5);case 5:return d.return();case 4:b.skipRetry||(b=fr(a,
b));if(!b){d.A(0);break}if(!b.skipRetry||b.id===void 0){d.A(8);break}return d.yield(a.ga.xb(b.id,a.V),8);case 8:a.sendFn(b.url,b.options,!!b.skipRetry),d.h=0}})}
function fr(a,b){if(!$q(a))throw Error("IndexedDB is not supported: updateRequestHandlers");var c=b.options.onError?b.options.onError:function(){};
b.options.onError=function(e,f){var g,h,k,l;return B(function(m){switch(m.h){case 1:g=gr(f);(h=hr(f))&&a.W&&a.W("web_enable_error_204")&&a.handleError(Error("Request failed due to compression"),b.url,f);if(!(a.W&&a.W("nwl_consider_error_code")&&g||a.W&&!a.W("nwl_consider_error_code")&&a.potentialEsfErrorCounter<=a.zc)){m.A(2);break}if(!a.fa.Ec){m.A(3);break}return m.yield(a.fa.Ec(),3);case 3:if(a.fa.ta()){m.A(2);break}c(e,f);if(!a.W||!a.W("nwl_consider_error_code")||((k=b)==null?void 0:k.id)===void 0){m.A(6);
break}return m.yield(a.ga.Wc(b.id,a.V,!1),6);case 6:return m.return();case 2:if(a.W&&a.W("nwl_consider_error_code")&&!g&&a.potentialEsfErrorCounter>a.zc)return m.return();a.potentialEsfErrorCounter++;if(((l=b)==null?void 0:l.id)===void 0){m.A(8);break}return b.sendCount<a.Gd?m.yield(a.ga.Wc(b.id,a.V,!0,h?!1:void 0),12):m.yield(a.ga.xb(b.id,a.V),8);case 12:a.Ca.pa(function(){a.fa.ta()&&a.cc()},a.Fd);
case 8:c(e,f),m.h=0}})};
var d=b.options.onSuccess?b.options.onSuccess:function(){};
b.options.onSuccess=function(e,f){var g;return B(function(h){if(h.h==1)return((g=b)==null?void 0:g.id)===void 0?h.A(2):h.yield(a.ga.xb(b.id,a.V),2);a.fa.mb&&a.W&&a.W("vss_network_hint")&&a.fa.mb(!0);d(e,f);h.h=0})};
return b}
function er(a,b,c){b=b.timestamp;return a.now()-b>=c?!1:!0}
function br(a){if(!$q(a))throw Error("IndexedDB is not supported: retryQueuedRequests");a.ga.sd("QUEUED",a.V).then(function(b){b&&!er(a,b,a.Dd)?a.Ca.pa(function(){return B(function(c){if(c.h==1)return b.id===void 0?c.A(2):c.yield(a.ga.Wc(b.id,a.V),2);br(a);c.h=0})}):a.fa.ta()&&a.cc()})}
function dr(a,b){a.Sd&&!a.fa.ta()?a.Sd(b):a.handleError(b)}
function $q(a){return!!a.V||a.fc}
function gr(a){var b;return(a=a==null?void 0:(b=a.error)==null?void 0:b.code)&&a>=400&&a<=599?!1:!0}
function hr(a){var b;a=a==null?void 0:(b=a.error)==null?void 0:b.code;return!(a!==400&&a!==415)}
;var ir;
function jr(){if(ir)return ir();var a={};ir=Op("LogsDatabaseV2",{Gb:(a.LogsRequestsStore={Nb:2},a),shared:!1,upgrade:function(b,c,d){c(2)&&Uo(b,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});c(3);c(5)&&(d=d.objectStore("LogsRequestsStore"),d.h.indexNames.contains("newRequest")&&d.h.deleteIndex("newRequest"),ap(d,"newRequestV2",["status","interface","timestamp"]));c(7)&&b.h.objectStoreNames.contains("sapisid")&&b.h.deleteObjectStore("sapisid");c(9)&&b.h.objectStoreNames.contains("SWHealthLog")&&b.h.deleteObjectStore("SWHealthLog")},
version:9});return ir()}
;function kr(a){return np(jr(),a)}
function lr(a,b){var c,d,e,f;return B(function(g){if(g.h==1)return c={startTime:V(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},ticks:{}},g.yield(kr(b),2);if(g.h!=3)return d=g.i,e=Object.assign({},a,{options:JSON.parse(JSON.stringify(a.options)),interface:S("INNERTUBE_CONTEXT_CLIENT_NAME",0)}),g.yield(Wo(d,"LogsRequestsStore",e),3);f=g.i;c.ticks.tc=V();mr(c);return g.return(f)})}
function nr(a,b){var c,d,e,f,g,h,k,l;return B(function(m){if(m.h==1)return c={startTime:V(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},ticks:{}},m.yield(kr(b),2);if(m.h!=3)return d=m.i,e=S("INNERTUBE_CONTEXT_CLIENT_NAME",0),f=[a,e,0],g=[a,e,V()],h=IDBKeyRange.bound(f,g),k="prev",T("use_fifo_for_networkless")&&(k="next"),l=void 0,m.yield(To(d,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(n){return gp(n.objectStore("LogsRequestsStore").index("newRequestV2"),{query:h,direction:k},
function(p){p.getValue()&&(l=p.getValue(),a==="NEW"&&(l.status="QUEUED",p.update(l)))})}),3);
c.ticks.tc=V();mr(c);return m.return(l)})}
function or(a,b){var c;return B(function(d){if(d.h==1)return d.yield(kr(b),2);c=d.i;return d.return(To(c,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(e){var f=e.objectStore("LogsRequestsStore");return f.get(a).then(function(g){if(g)return g.status="QUEUED",Po(f.h.put(g,void 0)).then(function(){return g})})}))})}
function pr(a,b,c,d){c=c===void 0?!0:c;var e;return B(function(f){if(f.h==1)return f.yield(kr(b),2);e=f.i;return f.return(To(e,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(g){var h=g.objectStore("LogsRequestsStore");return h.get(a).then(function(k){return k?(k.status="NEW",c&&(k.sendCount+=1),d!==void 0&&(k.options.compress=d),Po(h.h.put(k,void 0)).then(function(){return k})):Jo.resolve(void 0)})}))})}
function qr(a,b){var c;return B(function(d){if(d.h==1)return d.yield(kr(b),2);c=d.i;return d.return(c.delete("LogsRequestsStore",a))})}
function rr(a){var b,c;return B(function(d){if(d.h==1)return d.yield(kr(a),2);b=d.i;c=V()-2592E6;return d.yield(To(b,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(e){return cp(e.objectStore("LogsRequestsStore"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return dp(f)})})}),0)})}
function sr(){B(function(a){return a.yield(Kp(),0)})}
function mr(a){T("nwl_csi_killswitch")||wq("networkless_performance",a,{sampleRate:1})}
;var tr={accountStateChangeSignedIn:23,accountStateChangeSignedOut:24,delayedEventMetricCaptured:11,latencyActionBaselined:6,latencyActionInfo:7,latencyActionTicked:5,offlineTransferStatusChanged:2,offlineImageDownload:335,playbackStartStateChanged:9,systemHealthCaptured:3,mangoOnboardingCompleted:10,mangoPushNotificationReceived:230,mangoUnforkDbMigrationError:121,mangoUnforkDbMigrationSummary:122,mangoUnforkDbMigrationPreunforkDbVersionNumber:133,mangoUnforkDbMigrationPhoneMetadata:134,mangoUnforkDbMigrationPhoneStorage:135,
mangoUnforkDbMigrationStep:142,mangoAsyncApiMigrationEvent:223,mangoDownloadVideoResult:224,mangoHomepageVideoCount:279,mangoHomeV3State:295,mangoImageClientCacheHitEvent:273,sdCardStatusChanged:98,framesDropped:12,thumbnailHovered:13,deviceRetentionInfoCaptured:14,thumbnailLoaded:15,backToAppEvent:318,streamingStatsCaptured:17,offlineVideoShared:19,appCrashed:20,youThere:21,offlineStateSnapshot:22,mdxSessionStarted:25,mdxSessionConnected:26,mdxSessionDisconnected:27,bedrockResourceConsumptionSnapshot:28,
nextGenWatchWatchSwiped:29,kidsAccountsSnapshot:30,zeroStepChannelCreated:31,tvhtml5SearchCompleted:32,offlineSharePairing:34,offlineShareUnlock:35,mdxRouteDistributionSnapshot:36,bedrockRepetitiveActionTimed:37,unpluggedDegradationInfo:229,uploadMp4HeaderMoved:38,uploadVideoTranscoded:39,uploadProcessorStarted:46,uploadProcessorEnded:47,uploadProcessorReady:94,uploadProcessorRequirementPending:95,uploadProcessorInterrupted:96,uploadFrontendEvent:241,assetPackDownloadStarted:41,assetPackDownloaded:42,
assetPackApplied:43,assetPackDeleted:44,appInstallAttributionEvent:459,playbackSessionStopped:45,adBlockerMessagingShown:48,distributionChannelCaptured:49,dataPlanCpidRequested:51,detailedNetworkTypeCaptured:52,sendStateUpdated:53,receiveStateUpdated:54,sendDebugStateUpdated:55,receiveDebugStateUpdated:56,kidsErrored:57,mdxMsnSessionStatsFinished:58,appSettingsCaptured:59,mdxWebSocketServerHttpError:60,mdxWebSocketServer:61,startupCrashesDetected:62,coldStartInfo:435,offlinePlaybackStarted:63,liveChatMessageSent:225,
liveChatUserPresent:434,liveChatBeingModerated:457,liveCreationCameraUpdated:64,liveCreationEncodingCaptured:65,liveCreationError:66,liveCreationHealthUpdated:67,liveCreationVideoEffectsCaptured:68,liveCreationStageOccured:75,liveCreationBroadcastScheduled:123,liveCreationArchiveReplacement:149,liveCreationCostreamingConnection:421,liveCreationStreamWebrtcStats:288,mdxSessionRecoveryStarted:69,mdxSessionRecoveryCompleted:70,mdxSessionRecoveryStopped:71,visualElementShown:72,visualElementHidden:73,
visualElementGestured:78,visualElementStateChanged:208,screenCreated:156,playbackAssociated:202,visualElementAttached:215,playbackContextEvent:214,cloudCastingPlaybackStarted:74,webPlayerApiCalled:76,tvhtml5AccountDialogOpened:79,foregroundHeartbeat:80,foregroundHeartbeatScreenAssociated:111,kidsOfflineSnapshot:81,mdxEncryptionSessionStatsFinished:82,playerRequestCompleted:83,liteSchedulerStatistics:84,mdxSignIn:85,spacecastMetadataLookupRequested:86,spacecastBatchLookupRequested:87,spacecastSummaryRequested:88,
spacecastPlayback:89,spacecastDiscovery:90,tvhtml5LaunchUrlComponentChanged:91,mdxBackgroundPlaybackRequestCompleted:92,mdxBrokenAdditionalDataDeviceDetected:93,tvhtml5LocalStorage:97,tvhtml5DeviceStorageStatus:147,autoCaptionsAvailable:99,playbackScrubbingEvent:339,flexyState:100,interfaceOrientationCaptured:101,mainAppBrowseFragmentCache:102,offlineCacheVerificationFailure:103,offlinePlaybackExceptionDigest:217,vrCopresenceStats:104,vrCopresenceSyncStats:130,vrCopresenceCommsStats:137,vrCopresencePartyStats:153,
vrCopresenceEmojiStats:213,vrCopresenceEvent:141,vrCopresenceFlowTransitEvent:160,vrCowatchPartyEvent:492,vrCowatchUserStartOrJoinEvent:504,vrPlaybackEvent:345,kidsAgeGateTracking:105,offlineDelayAllowedTracking:106,mainAppAutoOfflineState:107,videoAsThumbnailDownload:108,videoAsThumbnailPlayback:109,liteShowMore:110,renderingError:118,kidsProfilePinGateTracking:119,abrTrajectory:124,scrollEvent:125,streamzIncremented:126,kidsProfileSwitcherTracking:127,kidsProfileCreationTracking:129,buyFlowStarted:136,
mbsConnectionInitiated:138,mbsPlaybackInitiated:139,mbsLoadChildren:140,liteProfileFetcher:144,mdxRemoteTransaction:146,reelPlaybackError:148,reachabilityDetectionEvent:150,mobilePlaybackEvent:151,courtsidePlayerStateChanged:152,musicPersistentCacheChecked:154,musicPersistentCacheCleared:155,playbackInterrupted:157,playbackInterruptionResolved:158,fixFopFlow:159,anrDetection:161,backstagePostCreationFlowEnded:162,clientError:163,gamingAccountLinkStatusChanged:164,liteHousewarming:165,buyFlowEvent:167,
kidsParentalGateTracking:168,kidsSignedOutSettingsStatus:437,kidsSignedOutPauseHistoryFixStatus:438,tvhtml5WatchdogViolation:444,ypcUpgradeFlow:169,yongleStudy:170,ypcUpdateFlowStarted:171,ypcUpdateFlowCancelled:172,ypcUpdateFlowSucceeded:173,ypcUpdateFlowFailed:174,liteGrowthkitPromo:175,paymentFlowStarted:341,transactionFlowShowPaymentDialog:405,transactionFlowStarted:176,transactionFlowSecondaryDeviceStarted:222,transactionFlowSecondaryDeviceSignedOutStarted:383,transactionFlowCancelled:177,transactionFlowPaymentCallBackReceived:387,
transactionFlowPaymentSubmitted:460,transactionFlowPaymentSucceeded:329,transactionFlowSucceeded:178,transactionFlowFailed:179,transactionFlowPlayBillingConnectionStartEvent:428,transactionFlowSecondaryDeviceSuccess:458,transactionFlowErrorEvent:411,liteVideoQualityChanged:180,watchBreakEnablementSettingEvent:181,watchBreakFrequencySettingEvent:182,videoEffectsCameraPerformanceMetrics:183,adNotify:184,startupTelemetry:185,playbackOfflineFallbackUsed:186,outOfMemory:187,ypcPauseFlowStarted:188,ypcPauseFlowCancelled:189,
ypcPauseFlowSucceeded:190,ypcPauseFlowFailed:191,uploadFileSelected:192,ypcResumeFlowStarted:193,ypcResumeFlowCancelled:194,ypcResumeFlowSucceeded:195,ypcResumeFlowFailed:196,adsClientStateChange:197,ypcCancelFlowStarted:198,ypcCancelFlowCancelled:199,ypcCancelFlowSucceeded:200,ypcCancelFlowFailed:201,ypcCancelFlowGoToPaymentProcessor:402,ypcDeactivateFlowStarted:320,ypcRedeemFlowStarted:203,ypcRedeemFlowCancelled:204,ypcRedeemFlowSucceeded:205,ypcRedeemFlowFailed:206,ypcFamilyCreateFlowStarted:258,
ypcFamilyCreateFlowCancelled:259,ypcFamilyCreateFlowSucceeded:260,ypcFamilyCreateFlowFailed:261,ypcFamilyManageFlowStarted:262,ypcFamilyManageFlowCancelled:263,ypcFamilyManageFlowSucceeded:264,ypcFamilyManageFlowFailed:265,restoreContextEvent:207,embedsAdEvent:327,autoplayTriggered:209,clientDataErrorEvent:210,experimentalVssValidation:211,tvhtml5TriggeredEvent:212,tvhtml5FrameworksFieldTrialResult:216,tvhtml5FrameworksFieldTrialStart:220,musicOfflinePreferences:218,watchTimeSegment:219,appWidthLayoutError:221,
accountRegistryChange:226,userMentionAutoCompleteBoxEvent:227,downloadRecommendationEnablementSettingEvent:228,musicPlaybackContentModeChangeEvent:231,offlineDbOpenCompleted:232,kidsFlowEvent:233,kidsFlowCorpusSelectedEvent:234,videoEffectsEvent:235,unpluggedOpsEogAnalyticsEvent:236,playbackAudioRouteEvent:237,interactionLoggingDebugModeError:238,offlineYtbRefreshed:239,kidsFlowError:240,musicAutoplayOnLaunchAttempted:242,deviceContextActivityEvent:243,deviceContextEvent:244,templateResolutionException:245,
musicSideloadedPlaylistServiceCalled:246,embedsStorageAccessNotChecked:247,embedsHasStorageAccessResult:248,embedsItpPlayedOnReload:249,embedsRequestStorageAccessResult:250,embedsShouldRequestStorageAccessResult:251,embedsRequestStorageAccessState:256,embedsRequestStorageAccessFailedState:257,embedsItpWatchLaterResult:266,searchSuggestDecodingPayloadFailure:252,siriShortcutActivated:253,tvhtml5KeyboardPerformance:254,latencyActionSpan:255,elementsLog:267,ytbFileOpened:268,tfliteModelError:269,apiTest:270,
yongleUsbSetup:271,touStrikeInterstitialEvent:272,liteStreamToSave:274,appBundleClientEvent:275,ytbFileCreationFailed:276,adNotifyFailure:278,ytbTransferFailed:280,blockingRequestFailed:281,liteAccountSelector:282,liteAccountUiCallbacks:283,dummyPayload:284,browseResponseValidationEvent:285,entitiesError:286,musicIosBackgroundFetch:287,mdxNotificationEvent:289,layersValidationError:290,musicPwaInstalled:291,liteAccountCleanup:292,html5PlayerHealthEvent:293,watchRestoreAttempt:294,liteAccountSignIn:296,
notaireEvent:298,kidsVoiceSearchEvent:299,adNotifyFilled:300,delayedEventDropped:301,analyticsSearchEvent:302,systemDarkThemeOptOutEvent:303,flowEvent:304,networkConnectivityBaselineEvent:305,ytbFileImported:306,downloadStreamUrlExpired:307,directSignInEvent:308,lyricImpressionEvent:309,accessibilityStateEvent:310,tokenRefreshEvent:311,genericAttestationExecution:312,tvhtml5VideoSeek:313,unpluggedAutoPause:314,scrubbingEvent:315,bedtimeReminderEvent:317,tvhtml5UnexpectedRestart:319,tvhtml5StabilityTraceEvent:478,
tvhtml5OperationHealth:467,tvhtml5WatchKeyEvent:321,voiceLanguageChanged:322,tvhtml5LiveChatStatus:323,parentToolsCorpusSelectedEvent:324,offerAdsEnrollmentInitiated:325,networkQualityIntervalEvent:326,deviceStartupMetrics:328,heartbeatActionPlayerTransitioned:330,tvhtml5Lifecycle:331,heartbeatActionPlayerHalted:332,adaptiveInlineMutedSettingEvent:333,mainAppLibraryLoadingState:334,thirdPartyLogMonitoringEvent:336,appShellAssetLoadReport:337,tvhtml5AndroidAttestation:338,tvhtml5StartupSoundEvent:340,
iosBackgroundRefreshTask:342,iosBackgroundProcessingTask:343,sliEventBatch:344,postImpressionEvent:346,musicSideloadedPlaylistExport:347,idbUnexpectedlyClosed:348,voiceSearchEvent:349,mdxSessionCastEvent:350,idbQuotaExceeded:351,idbTransactionEnded:352,idbTransactionAborted:353,tvhtml5KeyboardLogging:354,idbIsSupportedCompleted:355,creatorStudioMobileEvent:356,idbDataCorrupted:357,parentToolsAppChosenEvent:358,webViewBottomSheetResized:359,activeStateControllerScrollPerformanceSummary:360,navigatorValidation:361,
mdxSessionHeartbeat:362,clientHintsPolyfillDiagnostics:363,clientHintsPolyfillEvent:364,proofOfOriginTokenError:365,kidsAddedAccountSummary:366,musicWearableDevice:367,ypcRefundFlowEvent:368,tvhtml5PlaybackMeasurementEvent:369,tvhtml5WatermarkMeasurementEvent:370,clientExpGcfPropagationEvent:371,mainAppReferrerIntent:372,leaderLockEnded:373,leaderLockAcquired:374,googleHatsEvent:375,persistentLensLaunchEvent:376,parentToolsChildWelcomeChosenEvent:378,browseThumbnailPreloadEvent:379,finalPayload:380,
mdxDialAdditionalDataUpdateEvent:381,webOrchestrationTaskLifecycleRecord:382,startupSignalEvent:384,accountError:385,gmsDeviceCheckEvent:386,accountSelectorEvent:388,accountUiCallbacks:389,mdxDialAdditionalDataProbeEvent:390,downloadsSearchIcingApiStats:391,downloadsSearchIndexUpdatedEvent:397,downloadsSearchIndexSnapshot:398,dataPushClientEvent:392,kidsCategorySelectedEvent:393,mdxDeviceManagementSnapshotEvent:394,prefetchRequested:395,prefetchableCommandExecuted:396,gelDebuggingEvent:399,webLinkTtsPlayEnd:400,
clipViewInvalid:401,persistentStorageStateChecked:403,cacheWipeoutEvent:404,playerEvent:410,sfvEffectPipelineStartedEvent:412,sfvEffectPipelinePausedEvent:429,sfvEffectPipelineEndedEvent:413,sfvEffectChosenEvent:414,sfvEffectLoadedEvent:415,sfvEffectUserInteractionEvent:465,sfvEffectFirstFrameProcessedLatencyEvent:416,sfvEffectAggregatedFramesProcessedLatencyEvent:417,sfvEffectAggregatedFramesDroppedEvent:418,sfvEffectPipelineErrorEvent:430,sfvEffectGraphFrozenEvent:419,sfvEffectGlThreadBlockedEvent:420,
mdeQosEvent:510,mdeVideoChangedEvent:442,mdePlayerPerformanceMetrics:472,mdeExporterEvent:497,genericClientExperimentEvent:423,homePreloadTaskScheduled:424,homePreloadTaskExecuted:425,homePreloadCacheHit:426,polymerPropertyChangedInObserver:427,applicationStarted:431,networkCronetRttBatch:432,networkCronetRttSummary:433,repeatChapterLoopEvent:436,seekCancellationEvent:462,lockModeTimeoutEvent:483,externalVideoShareToYoutubeAttempt:501,parentCodeEvent:502,offlineTransferStarted:4,musicOfflineMixtapePreferencesChanged:16,
mangoDailyNewVideosNotificationAttempt:40,mangoDailyNewVideosNotificationError:77,dtwsPlaybackStarted:112,dtwsTileFetchStarted:113,dtwsTileFetchCompleted:114,dtwsTileFetchStatusChanged:145,dtwsKeyframeDecoderBufferSent:115,dtwsTileUnderflowedOnNonkeyframe:116,dtwsBackfillFetchStatusChanged:143,dtwsBackfillUnderflowed:117,dtwsAdaptiveLevelChanged:128,blockingVisitorIdTimeout:277,liteSocial:18,mobileJsInvocation:297,biscottiBasedDetection:439,coWatchStateChange:440,embedsVideoDataDidChange:441,shortsFirst:443,
cruiseControlEvent:445,qoeClientLoggingContext:446,atvRecommendationJobExecuted:447,tvhtml5UserFeedback:448,producerProjectCreated:449,producerProjectOpened:450,producerProjectDeleted:451,producerProjectElementAdded:453,producerProjectElementRemoved:454,producerAppStateChange:509,producerProjectDiskInsufficientExportFailure:516,tvhtml5ShowClockEvent:455,deviceCapabilityCheckMetrics:456,youtubeClearcutEvent:461,offlineBrowseFallbackEvent:463,getCtvTokenEvent:464,startupDroppedFramesSummary:466,screenshotEvent:468,
miniAppPlayEvent:469,elementsDebugCounters:470,fontLoadEvent:471,webKillswitchReceived:473,webKillswitchExecuted:474,cameraOpenEvent:475,manualSmoothnessMeasurement:476,tvhtml5AppQualityEvent:477,polymerPropertyAccessEvent:479,miniAppSdkUsage:480,cobaltTelemetryEvent:481,crossDevicePlayback:482,channelCreatedWithObakeImage:484,channelEditedWithObakeImage:485,offlineDeleteEvent:486,crossDeviceNotificationTransfer:487,androidIntentEvent:488,unpluggedAmbientInterludesCounterfactualEvent:489,keyPlaysPlayback:490,
shortsCreationFallbackEvent:493,vssData:491,castMatch:494,miniAppPerformanceMetrics:495,userFeedbackEvent:496,kidsGuestSessionMismatch:498,musicSideloadedPlaylistMigrationEvent:499,sleepTimerSessionFinishEvent:500,watchEpPromoConflict:503,innertubeResponseCacheMetrics:505,miniAppAdEvent:506,dataPlanUpsellEvent:507,producerProjectRenamed:508,producerMediaSelectionEvent:511,embedsAutoplayStatusChanged:512,remoteConnectEvent:513,connectedSessionMisattributionEvent:514,producerProjectElementModified:515};var ur={},vr=Op("ServiceWorkerLogsDatabase",{Gb:(ur.SWHealthLog={Nb:1},ur),shared:!0,upgrade:function(a,b){b(1)&&ap(Uo(a,"SWHealthLog",{keyPath:"id",autoIncrement:!0}),"swHealthNewRequest",["interface","timestamp"])},
version:1});function wr(a){return np(vr(),a)}
function xr(a){var b,c;B(function(d){if(d.h==1)return d.yield(wr(a),2);b=d.i;c=V()-2592E6;return d.yield(To(b,["SWHealthLog"],{mode:"readwrite",ka:!0},function(e){return cp(e.objectStore("SWHealthLog"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return dp(f)})})}),0)})}
function yr(a){var b;return B(function(c){if(c.h==1)return c.yield(wr(a),2);b=c.i;return c.yield(b.clear("SWHealthLog"),0)})}
;var zr={},Ar=0;function Br(a){var b=b===void 0?{}:b;var c=new Image,d=""+Ar++;zr[d]=c;c.onload=c.onerror=function(){delete zr[d]};
b.Sh&&(c.referrerPolicy="no-referrer");c.src=a}
;var Cr;function Dr(){Cr||(Cr=new eo("yt.offline"));return Cr}
function Er(a){if(T("offline_error_handling")){var b=Dr().get("errors",!0)||{};b[a.message]={name:a.name,stack:a.stack};a.level&&(b[a.message].level=a.level);Dr().set("errors",b,2592E3,!0)}}
;function Fr(){this.h=new Map;this.i=!1}
function Gr(){if(!Fr.instance){var a=F("yt.networkRequestMonitor.instance")||new Fr;E("yt.networkRequestMonitor.instance",a);Fr.instance=a}return Fr.instance}
Fr.prototype.requestComplete=function(a,b){b&&(this.i=!0);a=this.removeParams(a);this.h.get(a)||this.h.set(a,b)};
Fr.prototype.isEndpointCFR=function(a){a=this.removeParams(a);return(a=this.h.get(a))?!1:a===!1&&this.i?!0:null};
Fr.prototype.removeParams=function(a){return a.split("?")[0]};
Fr.prototype.removeParams=Fr.prototype.removeParams;Fr.prototype.isEndpointCFR=Fr.prototype.isEndpointCFR;Fr.prototype.requestComplete=Fr.prototype.requestComplete;Fr.getInstance=Gr;function Hr(){Mh.call(this);var a=this;this.j=!1;this.h=Cj();this.h.listen("networkstatus-online",function(){if(a.j&&T("offline_error_handling")){var b=Dr().get("errors",!0);if(b){for(var c in b)if(b[c]){var d=new U(c,"sent via offline_errors");d.name=b[c].name;d.stack=b[c].stack;d.level=b[c].level;Zl(d)}Dr().set("errors",{},2592E3,!0)}}})}
w(Hr,Mh);function Ir(){if(!Hr.instance){var a=F("yt.networkStatusManager.instance")||new Hr;E("yt.networkStatusManager.instance",a);Hr.instance=a}return Hr.instance}
r=Hr.prototype;r.ta=function(){return this.h.ta()};
r.mb=function(a){this.h.h=a};
r.we=function(){var a=window.navigator.onLine;return a===void 0?!0:a};
r.le=function(){this.j=!0};
r.listen=function(a,b){return this.h.listen(a,b)};
r.Ec=function(a){a=Aj(this.h,a);a.then(function(b){T("use_cfr_monitor")&&Gr().requestComplete("generate_204",b)});
return a};
Hr.prototype.sendNetworkCheckRequest=Hr.prototype.Ec;Hr.prototype.listen=Hr.prototype.listen;Hr.prototype.enableErrorFlushing=Hr.prototype.le;Hr.prototype.getWindowStatus=Hr.prototype.we;Hr.prototype.networkStatusHint=Hr.prototype.mb;Hr.prototype.isNetworkAvailable=Hr.prototype.ta;Hr.getInstance=Ir;function Jr(a){a=a===void 0?{}:a;Mh.call(this);var b=this;this.h=this.u=0;this.j=Ir();var c=F("yt.networkStatusManager.instance.listen").bind(this.j);c&&(a.rateLimit?(this.rateLimit=a.rateLimit,c("networkstatus-online",function(){Kr(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){Kr(b,"publicytnetworkstatus-offline")})):(c("networkstatus-online",function(){Nh(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){Nh(b,"publicytnetworkstatus-offline")})))}
w(Jr,Mh);Jr.prototype.ta=function(){var a=F("yt.networkStatusManager.instance.isNetworkAvailable");return a?a.bind(this.j)():!0};
Jr.prototype.mb=function(a){var b=F("yt.networkStatusManager.instance.networkStatusHint").bind(this.j);b&&b(a)};
Jr.prototype.Ec=function(a){var b=this,c;return B(function(d){c=F("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.j);return T("skip_network_check_if_cfr")&&Gr().isEndpointCFR("generate_204")?d.return(new Promise(function(e){var f;b.mb(((f=window.navigator)==null?void 0:f.onLine)||!0);e(b.ta())})):c?d.return(c(a)):d.return(!0)})};
function Kr(a,b){a.rateLimit?a.h?(Dj.qa(a.u),a.u=Dj.pa(function(){a.o!==b&&(Nh(a,b),a.o=b,a.h=V())},a.rateLimit-(V()-a.h))):(Nh(a,b),a.o=b,a.h=V()):Nh(a,b)}
;var Lr;function Mr(){var a=Zq.call;Lr||(Lr=new Jr({Ih:!0,zh:!0}));a.call(Zq,this,{ga:{ce:rr,xb:qr,sd:nr,He:or,Wc:pr,set:lr},fa:Lr,handleError:function(b,c,d){var e,f=d==null?void 0:(e=d.error)==null?void 0:e.code;if(f===400||f===415){var g;$l(new U(b.message,c,d==null?void 0:(g=d.error)==null?void 0:g.code),void 0,void 0,void 0,!0)}else Zl(b)},
yb:$l,sendFn:Nr,now:V,Sd:Er,Ca:co(),Vc:"publicytnetworkstatus-online",Sc:"publicytnetworkstatus-offline",lc:!0,jc:.1,zc:tm("potential_esf_error_limit",10),W:T,Rb:!(vn()&&Or())});this.j=new fj;T("networkless_immediately_drop_all_requests")&&sr();Lp("LogsDatabaseV2")}
w(Mr,Zq);function Pr(){var a=F("yt.networklessRequestController.instance");a||(a=new Mr,E("yt.networklessRequestController.instance",a),T("networkless_logging")&&Ap().then(function(b){a.V=b;ar(a);a.j.resolve();a.lc&&Math.random()<=a.jc&&a.V&&xr(a.V);T("networkless_immediately_drop_sw_health_store")&&Qr(a)}));
return a}
Mr.prototype.writeThenSend=function(a,b){b||(b={});b=Rr(a,b);vn()||(this.h=!1);Zq.prototype.writeThenSend.call(this,a,b)};
Mr.prototype.sendThenWrite=function(a,b,c){b||(b={});b=Rr(a,b);vn()||(this.h=!1);Zq.prototype.sendThenWrite.call(this,a,b,c)};
Mr.prototype.sendAndWrite=function(a,b){b||(b={});b=Rr(a,b);vn()||(this.h=!1);Zq.prototype.sendAndWrite.call(this,a,b)};
Mr.prototype.awaitInitialization=function(){return this.j.promise};
function Qr(a){var b;B(function(c){if(!a.V)throw b=Fo("clearSWHealthLogsDb"),b;return c.return(yr(a.V).catch(function(d){a.handleError(d)}))})}
function Nr(a,b,c,d){d=d===void 0?!1:d;b=T("web_fp_via_jspb")?Object.assign({},b):b;T("use_cfr_monitor")&&Sr(a,b);if(T("use_request_time_ms_header"))b.headers&&km(a)&&(b.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(V())));else{var e;if((e=b.postParams)==null?0:e.requestTimeMs)b.postParams.requestTimeMs=Math.round(V())}if(c&&Object.keys(b).length===0){var f=f===void 0?"":f;var g=g===void 0?!1:g;var h=h===void 0?!1:h;if(a)if(f)zm(a,void 0,"POST",f,void 0);else if(S("USE_NET_AJAX_FOR_PING_TRANSPORT",
!1)||h)zm(a,void 0,"GET","",void 0,void 0,g,h);else{b:{try{var k=new oc({url:a});if(k.u?typeof k.i!=="string"||k.i.length===0?0:{version:3,je:k.i,Zd:nc(k.j,"act=1","ri=1",pc(k))}:k.M&&{version:4,je:nc(k.j,"dct=1","suid="+k.o,""),Zd:nc(k.j,"act=1","ri=1","suid="+k.o)}){var l=$b(ac(5,a)),m;if(!(m=!l||!l.endsWith("/aclk"))){var n=a.search(jc),p=ic(a,0,"ri",n);if(p<0)var t=null;else{var v=a.indexOf("&",p);if(v<0||v>n)v=n;t=decodeURIComponent(a.slice(p+3,v!==-1?v:0).replace(/\+/g," "))}m=t!=="1"}var x=
!m;break b}}catch(H){}x=!1}if(x){b:{try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")){var z=!0;break b}}catch(H){}z=!1}c=z?!0:!1}else c=!1;c||Br(a)}}else b.compress?b.postBody?(typeof b.postBody!=="string"&&(b.postBody=JSON.stringify(b.postBody)),Oq(a,b.postBody,b,Dm,d)):Oq(a,JSON.stringify(b.postParams),b,Cm,d):Dm(a,b)}
function Rr(a,b){T("use_event_time_ms_header")&&km(a)&&(b.headers||(b.headers={}),b.headers["X-Goog-Event-Time"]=JSON.stringify(Math.round(V())));return b}
function Sr(a,b){var c=b.onError?b.onError:function(){};
b.onError=function(e,f){Gr().requestComplete(a,!1);c(e,f)};
var d=b.onSuccess?b.onSuccess:function(){};
b.onSuccess=function(e,f){Gr().requestComplete(a,!0);d(e,f)}}
function Or(){return bc(document.location.toString())!=="www.youtube-nocookie.com"}
;var Tr=!1,Ur=D.ytNetworklessLoggingInitializationOptions||{isNwlInitialized:Tr};E("ytNetworklessLoggingInitializationOptions",Ur);function Vr(){var a;B(function(b){if(b.h==1)return b.yield(Ap(),2);a=b.i;if(!a||!vn()&&!T("nwl_init_require_datasync_id_killswitch")||!Or())return b.A(0);Tr=!0;Ur.isNwlInitialized=Tr;return b.yield(Pr().awaitInitialization(),0)})}
;function Wr(a){var b=this;this.config_=null;a?this.config_=a:bq()&&(this.config_=cq());yn(function(){Xq(b)},5E3)}
Wr.prototype.isReady=function(){!this.config_&&bq()&&(this.config_=cq());return!!this.config_};
function Yq(a,b,c,d){function e(n){n=n===void 0?!1:n;var p;if(d.retry&&h!="www.youtube-nocookie.com"&&(n||T("skip_ls_gel_retry")||g.headers["Content-Type"]!=="application/json"||(p=Vq(b,c,l,k)),p)){var t=g.onSuccess,v=g.onFetchSuccess;g.onSuccess=function(H,K){Wq(p);t(H,K)};
c.onFetchSuccess=function(H,K){Wq(p);v(H,K)}}try{if(n&&d.retry&&!d.networklessOptions.bypassNetworkless)g.method="POST",d.networklessOptions.writeThenSend?Pr().writeThenSend(m,g):Pr().sendAndWrite(m,g);
else if(d.compress){var x=!d.networklessOptions.writeThenSend;if(g.postBody){var z=g.postBody;typeof z!=="string"&&(z=JSON.stringify(g.postBody));Oq(m,z,g,Dm,x)}else Oq(m,JSON.stringify(g.postParams),g,Cm,x)}else T("web_all_payloads_via_jspb")?Dm(m,g):Cm(m,g)}catch(H){if(H.name==="InvalidAccessError")p&&(Wq(p),p=0),$l(Error("An extension is blocking network request."));else throw H;}p&&yn(function(){Xq(a)},5E3)}
!S("VISITOR_DATA")&&b!=="visitor_id"&&Math.random()<.01&&$l(new U("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var f=new U("innertube xhrclient not ready",b,c,d);Zl(f);throw f;}var g={headers:d.headers||{},method:"POST",postParams:c,postBody:d.postBody,postBodyFormat:d.postBodyFormat||"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(n,p){if(d.onSuccess)d.onSuccess(p)},
onFetchSuccess:function(n){if(d.onSuccess)d.onSuccess(n)},
onError:function(n,p){if(d.onError)d.onError(p)},
onFetchError:function(n){if(d.onError)d.onError(n)},
timeout:d.timeout,withCredentials:!0,compress:d.compress};g.headers["Content-Type"]||(g.headers["Content-Type"]="application/json");var h="";(f=a.config_.Ce)&&(h=f);var k=a.config_.De||!1,l=eq(k,h,d);Object.assign(g.headers,l);g.headers.Authorization&&!h&&k&&(g.headers["x-origin"]=window.location.origin);var m=im(""+h+("/youtubei/"+a.config_.innertubeApiVersion+"/"+b),{alt:"json"});(F("ytNetworklessLoggingInitializationOptions")?Ur.isNwlInitialized:Tr)?yp().then(function(n){e(n)}):e(!1)}
;var Xr=0,Yr=hd?"webkit":gd?"moz":ed?"ms":dd?"o":"";E("ytDomDomGetNextId",F("ytDomDomGetNextId")||function(){return++Xr});var Zr={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function $r(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.rotation=this.clientY=this.clientX=0;this.scale=1;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Zr||(this[b]=a[b]);this.scale=a.scale;this.rotation=a.rotation;var c=a.target||a.srcElement;c&&c.nodeType==3&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;
if(d)try{d=d.nodeName?d:null}catch(e){d=null}else this.type=="mouseover"?d=a.fromElement:this.type=="mouseout"&&(d=a.toElement);this.relatedTarget=d;this.clientX=a.clientX!=void 0?a.clientX:a.pageX;this.clientY=a.clientY!=void 0?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||(this.type=="keypress"?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.h=a.pageX;this.i=a.pageY}}catch(e){}}
function as(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.h=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.i=a.clientY+b}}
$r.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
$r.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
$r.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var dg=D.ytEventsEventsListeners||{};E("ytEventsEventsListeners",dg);var bs=D.ytEventsEventsCounter||{count:0};E("ytEventsEventsCounter",bs);
function cs(a,b,c,d){d=d===void 0?{}:d;a.addEventListener&&(b!="mouseenter"||"onmouseenter"in document?b!="mouseleave"||"onmouseenter"in document?b=="mousewheel"&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return cg(function(e){var f=typeof e[4]==="boolean"&&e[4]==!!d,g=Na(e[4])&&Na(d)&&hg(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
function ds(a,b,c,d){d=d===void 0?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=cs(a,b,c,d);if(e)return e;e=++bs.count+"";var f=!(b!="mouseenter"&&b!="mouseleave"||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new $r(h);if(!rg(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new $r(h);
h.currentTarget=a;return c.call(a,h)};
g=Yl(g);a.addEventListener?(b=="mouseenter"&&f?b="mouseover":b=="mouseleave"&&f?b="mouseout":b=="mousewheel"&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),es()||typeof d==="boolean"?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);dg[e]=[a,b,c,g,d];return e}
function gs(a){a&&(typeof a=="string"&&(a=[a]),Mb(a,function(b){if(b in dg){var c=dg[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?es()||typeof c==="boolean"?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete dg[b]}}))}
var es=bi(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});function hs(a){this.G=a;this.h=null;this.o=0;this.D=null;this.u=0;this.i=[];for(a=0;a<4;a++)this.i.push(0);this.j=0;this.U=ds(window,"mousemove",Xa(this.Y,this));a=Xa(this.P,this);typeof a==="function"&&(a=Yl(a));this.Z=window.setInterval(a,25)}
ab(hs,G);hs.prototype.Y=function(a){a.h===void 0&&as(a);var b=a.h;a.i===void 0&&as(a);this.h=new $f(b,a.i)};
hs.prototype.P=function(){if(this.h){var a=V();if(this.o!=0){var b=this.D,c=this.h,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.o);this.i[this.j]=Math.abs((d-this.u)/this.u)>.5?1:0;for(c=b=0;c<4;c++)b+=this.i[c]||0;b>=3&&this.G();this.u=d}this.o=a;this.D=this.h;this.j=(this.j+1)%4}};
hs.prototype.ba=function(){window.clearInterval(this.Z);gs(this.U)};var ms={};
function ns(a){var b=a===void 0?{}:a;a=b.Se===void 0?!1:b.Se;b=b.ne===void 0?!0:b.ne;if(F("_lact",window)==null){var c=parseInt(S("LACT"),10);c=isFinite(c)?Date.now()-Math.max(c,0):-1;E("_lact",c,window);E("_fact",c,window);c==-1&&ps();ds(document,"keydown",ps);ds(document,"keyup",ps);ds(document,"mousedown",ps);ds(document,"mouseup",ps);a?ds(window,"touchmove",function(){qs("touchmove",200)},{passive:!0}):(ds(window,"resize",function(){qs("resize",200)}),b&&ds(window,"scroll",function(){qs("scroll",200)}));
new hs(function(){qs("mouse",100)});
ds(document,"touchstart",ps,{passive:!0});ds(document,"touchend",ps,{passive:!0})}}
function qs(a,b){ms[a]||(ms[a]=!0,Dj.pa(function(){ps();ms[a]=!1},b))}
function ps(){F("_lact",window)==null&&ns();var a=Date.now();E("_lact",a,window);F("_fact",window)==-1&&E("_fact",a,window);(a=F("ytglobal.ytUtilActivityCallback_"))&&a()}
function rs(){var a=F("_lact",window);return a==null?-1:Math.max(Date.now()-a,0)}
;var ss=D.ytPubsubPubsubInstance||new O,ts=D.ytPubsubPubsubSubscribedKeys||{},us=D.ytPubsubPubsubTopicToKeys||{},vs=D.ytPubsubPubsubIsSynchronous||{};function ws(a,b){var c=xs();if(c&&b){var d=c.subscribe(a,function(){function e(){ts[d]&&b.apply&&typeof b.apply=="function"&&b.apply(window,f)}
var f=arguments;try{vs[a]?e():qm(e,0)}catch(g){Zl(g)}},void 0);
ts[d]=!0;us[a]||(us[a]=[]);us[a].push(d);return d}return 0}
function ys(a){var b=xs();b&&(typeof a==="number"?a=[a]:typeof a==="string"&&(a=[parseInt(a,10)]),Mb(a,function(c){b.unsubscribeByKey(c);delete ts[c]}))}
function zs(a,b){var c=xs();c&&c.publish.apply(c,arguments)}
function As(a){var b=xs();if(b)if(b.clear(a),a)Bs(a);else for(var c in us)Bs(c)}
function xs(){return D.ytPubsubPubsubInstance}
function Bs(a){us[a]&&(a=us[a],Mb(a,function(b){ts[b]&&delete ts[b]}),a.length=0)}
O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.dc;O.prototype.publish=O.prototype.sb;O.prototype.clear=O.prototype.clear;E("ytPubsubPubsubInstance",ss);E("ytPubsubPubsubTopicToKeys",us);E("ytPubsubPubsubIsSynchronous",vs);E("ytPubsubPubsubSubscribedKeys",ts);var Cs=Symbol("injectionDeps");function Ds(a){this.name=a}
Ds.prototype.toString=function(){return"InjectionToken("+this.name+")"};
function Es(a){this.key=a}
function Fs(a){return new Es(a)}
function Gs(){this.i=new Map;this.j=new Map;this.h=new Map}
function Hs(a,b){a.i.set(b.Bc,b);var c=a.j.get(b.Bc);if(c)try{c.Rh(a.resolve(b.Bc))}catch(d){c.Ph(d)}}
Gs.prototype.resolve=function(a){return a instanceof Es?Is(this,a.key,[],!0):Is(this,a,[])};
function Is(a,b,c,d){d=d===void 0?!1:d;if(c.indexOf(b)>-1)throw Error("Deps cycle for: "+b);if(a.h.has(b))return a.h.get(b);if(!a.i.has(b)){if(d)return;throw Error("No provider for: "+b);}d=a.i.get(b);c.push(b);if(d.Od!==void 0)var e=d.Od;else if(d.zf)e=d[Cs]?Js(a,d[Cs],c):[],e=d.zf.apply(d,A(e));else if(d.Nd){e=d.Nd;var f=e[Cs]?Js(a,e[Cs],c):[];e=new (Function.prototype.bind.apply(e,[null].concat(A(f))))}else throw Error("Could not resolve providers for: "+b);c.pop();d.Vh||a.h.set(b,e);return e}
function Js(a,b,c){return b?b.map(function(d){return d instanceof Es?Is(a,d.key,c,!0):Is(a,d,c)}):[]}
;var Ks;function Ls(){Ks||(Ks=new Gs);return Ks}
;var Ms=window;function Ns(){var a,b;return"h5vcc"in Ms&&((a=Ms.h5vcc.traceEvent)==null?0:a.traceBegin)&&((b=Ms.h5vcc.traceEvent)==null?0:b.traceEnd)?1:"performance"in Ms&&Ms.performance.mark&&Ms.performance.measure?2:0}
function Os(a){var b=Ns();switch(b){case 1:Ms.h5vcc.traceEvent.traceBegin("YTLR",a);break;case 2:Ms.performance.mark(a+"-start");break;case 0:break;default:xb(b,"unknown trace type")}}
function Ps(a){var b=Ns();switch(b){case 1:Ms.h5vcc.traceEvent.traceEnd("YTLR",a);break;case 2:b=a+"-start";var c=a+"-end";Ms.performance.mark(c);Ms.performance.measure(a,b,c);break;case 0:break;default:xb(b,"unknown trace type")}}
;var Qs=T("web_enable_lifecycle_monitoring")&&Ns()!==0,Rs=T("web_enable_lifecycle_monitoring");function Ss(a){var b,c;(c=(b=window).onerror)==null||c.call(b,a.message,"",0,0,a)}
;function Ts(a){var b=this;var c=c===void 0?0:c;var d=d===void 0?co():d;this.j=c;this.scheduler=d;this.i=new fj;this.h=a;for(a={jb:0};a.jb<this.h.length;a={yc:void 0,jb:a.jb},a.jb++)a.yc=this.h[a.jb],c=function(e){return function(){e.yc.Mc();b.h[e.jb].Ac=!0;b.h.every(function(f){return f.Ac===!0})&&b.i.resolve()}}(a),d=this.getPriority(a.yc),d=this.scheduler.Ra(c,d),this.h[a.jb]=Object.assign({},a.yc,{Mc:c,
jobId:d})}
function Us(a){var b=Array.from(a.h.keys()).sort(function(d,e){return a.getPriority(a.h[e])-a.getPriority(a.h[d])});
b=y(b);for(var c=b.next();!c.done;c=b.next())c=a.h[c.value],c.jobId===void 0||c.Ac||(a.scheduler.qa(c.jobId),a.scheduler.Ra(c.Mc,10))}
Ts.prototype.cancel=function(){for(var a=y(this.h),b=a.next();!b.done;b=a.next())b=b.value,b.jobId===void 0||b.Ac||this.scheduler.qa(b.jobId),b.Ac=!0;this.i.resolve()};
Ts.prototype.getPriority=function(a){var b;return(b=a.priority)!=null?b:this.j};function Vs(a){this.state=a;this.plugins=[];this.o=void 0;this.D={};Qs&&Os(this.state)}
r=Vs.prototype;r.install=function(a){this.plugins.push(a);return this};
r.uninstall=function(){var a=this;C.apply(0,arguments).forEach(function(b){b=a.plugins.indexOf(b);b>-1&&a.plugins.splice(b,1)})};
r.transition=function(a,b){var c=this;Qs&&Ps(this.state);var d=this.transitions.find(function(f){return Array.isArray(f.from)?f.from.find(function(g){return g===c.state&&f.to===a}):f.from===c.state&&f.to===a});
if(d){this.j&&(Us(this.j),this.j=void 0);Ws(this,a,b);this.state=a;Qs&&Os(this.state);d=d.action.bind(this);var e=this.plugins.filter(function(f){return f[a]}).map(function(f){return f[a]});
d(Xs(this,e),b)}else throw Error("no transition specified from "+this.state+" to "+a);};
function Xs(a,b){var c=b.filter(function(e){return Ys(a,e)===10}),d=b.filter(function(e){return Ys(a,e)!==10});
return a.D.Uh?function(){var e=C.apply(0,arguments);return B(function(f){if(f.h==1)return f.yield(a.Ye.apply(a,[c].concat(A(e))),2);a.Id.apply(a,[d].concat(A(e)));f.h=0})}:function(){var e=C.apply(0,arguments);
a.Ze.apply(a,[c].concat(A(e)));a.Id.apply(a,[d].concat(A(e)))}}
r.Ze=function(a){for(var b=C.apply(1,arguments),c=co(),d=y(a),e=d.next(),f={};!e.done;f={Sb:void 0},e=d.next())f.Sb=e.value,c.Lb(function(g){return function(){Zs(g.Sb.name);$s(function(){return g.Sb.callback.apply(g.Sb,A(b))});
at(g.Sb.name)}}(f))};
r.Ye=function(a){var b=C.apply(1,arguments),c,d,e,f,g;return B(function(h){h.h==1&&(c=co(),d=y(a),e=d.next(),f={});if(h.h!=3){if(e.done)return h.A(0);f.Xa=e.value;f.ec=void 0;g=function(k){return function(){Zs(k.Xa.name);var l=$s(function(){return k.Xa.callback.apply(k.Xa,A(b))});
de(l)?k.ec=T("web_lifecycle_error_handling_killswitch")?l.then(function(){at(k.Xa.name)}):l.then(function(){at(k.Xa.name)},function(m){Ss(m);
at(k.Xa.name)}):at(k.Xa.name)}}(f);
c.Lb(g);return f.ec?h.yield(f.ec,3):h.A(3)}f={Xa:void 0,ec:void 0};e=d.next();return h.A(2)})};
r.Id=function(a){var b=C.apply(1,arguments),c=this,d=a.map(function(e){return{Mc:function(){Zs(e.name);$s(function(){return e.callback.apply(e,A(b))});
at(e.name)},
priority:Ys(c,e)}});
d.length&&(this.j=new Ts(d))};
function Ys(a,b){var c,d;return(d=(c=a.o)!=null?c:b.priority)!=null?d:0}
function Zs(a){Qs&&a&&Os(a)}
function at(a){Qs&&a&&Ps(a)}
function Ws(a,b,c){Rs&&console.groupCollapsed&&console.groupEnd&&(console.groupCollapsed("["+a.constructor.name+"] '"+a.state+"' to '"+b+"'"),console.log("with message: ",c),console.groupEnd())}
fa.Object.defineProperties(Vs.prototype,{currentState:{configurable:!0,enumerable:!0,get:function(){return this.state}}});
function $s(a){if(T("web_lifecycle_error_handling_killswitch"))return a();try{return a()}catch(b){Ss(b)}}
;function bt(a){Vs.call(this,a===void 0?"none":a);this.h=null;this.o=10;this.transitions=[{from:"none",to:"application_navigating",action:this.i},{from:"application_navigating",to:"none",action:this.u},{from:"application_navigating",to:"application_navigating",action:function(){}},
{from:"none",to:"none",action:function(){}}]}
var ct;w(bt,Vs);bt.prototype.i=function(a,b){var c=this;this.h=yn(function(){c.currentState==="application_navigating"&&c.transition("none")},5E3);
a(b==null?void 0:b.event)};
bt.prototype.u=function(a,b){this.h&&(Dj.qa(this.h),this.h=null);a(b==null?void 0:b.event)};
function dt(){ct||(ct=new bt);return ct}
;var et=[];E("yt.logging.transport.getScrapedGelPayloads",function(){return et});function ft(){this.store={};this.h={}}
ft.prototype.storePayload=function(a,b){a=gt(a);this.store[a]?this.store[a].push(b):(this.h={},this.store[a]=[b]);T("more_accurate_gel_parser")&&(b=new CustomEvent("TRANSPORTING_NEW_EVENT"),window.dispatchEvent(b));return a};
ft.prototype.smartExtractMatchingEntries=function(a){if(!a.keys.length)return[];for(var b=ht(this,a.keys.splice(0,1)[0]),c=[],d=0;d<b.length;d++)this.store[b[d]]&&a.sizeLimit&&(this.store[b[d]].length<=a.sizeLimit?(c.push.apply(c,A(this.store[b[d]])),delete this.store[b[d]]):c.push.apply(c,A(this.store[b[d]].splice(0,a.sizeLimit))));(a==null?0:a.sizeLimit)&&c.length<(a==null?void 0:a.sizeLimit)&&(a.sizeLimit-=c.length,c.push.apply(c,A(this.smartExtractMatchingEntries(a))));return c};
ft.prototype.extractMatchingEntries=function(a){a=ht(this,a);for(var b=[],c=0;c<a.length;c++)this.store[a[c]]&&(b.push.apply(b,A(this.store[a[c]])),delete this.store[a[c]]);return b};
ft.prototype.getSequenceCount=function(a){a=ht(this,a);for(var b=0,c=0;c<a.length;c++){var d=void 0;b+=((d=this.store[a[c]])==null?void 0:d.length)||0}return b};
function ht(a,b){var c=gt(b);if(a.h[c])return a.h[c];var d=Object.keys(a.store)||[];if(d.length<=1&&gt(b)===d[0])return d;for(var e=[],f=0;f<d.length;f++){var g=d[f].split("/");if(jt(b.auth,g[0])){var h=b.isJspb;jt(h===void 0?"undefined":h?"true":"false",g[1])&&jt(b.cttAuthInfo,g[2])&&(h=b.tier,h=h===void 0?"undefined":JSON.stringify(h),jt(h,g[3])&&e.push(d[f]))}}return a.h[c]=e}
function jt(a,b){return a===void 0||a==="undefined"?!0:a===b}
ft.prototype.getSequenceCount=ft.prototype.getSequenceCount;ft.prototype.extractMatchingEntries=ft.prototype.extractMatchingEntries;ft.prototype.smartExtractMatchingEntries=ft.prototype.smartExtractMatchingEntries;ft.prototype.storePayload=ft.prototype.storePayload;function gt(a){return[a.auth===void 0?"undefined":a.auth,a.isJspb===void 0?"undefined":a.isJspb,a.cttAuthInfo===void 0?"undefined":a.cttAuthInfo,a.tier===void 0?"undefined":a.tier].join("/")}
;function kt(a,b){if(a)return a[b.name]}
;var lt=tm("initial_gel_batch_timeout",2E3),mt=tm("gel_queue_timeout_max_ms",6E4),nt=tm("gel_min_batch_size",5),ot=void 0;function pt(){this.o=this.h=this.i=0;this.j=!1}
var qt=new pt,rt=new pt,st=new pt,tt=new pt,ut,vt=!0,wt=D.ytLoggingTransportTokensToCttTargetIds_||{};E("ytLoggingTransportTokensToCttTargetIds_",wt);var xt={};function zt(){var a=F("yt.logging.ims");a||(a=new ft,E("yt.logging.ims",a));return a}
function At(a,b){if(a.endpoint==="log_event"){Bt();var c=Ct(a),d=Dt(a.payload)||"";a:{if(T("enable_web_tiered_gel")){var e=tr[d||""];var f,g,h,k=Ls().resolve(Fs(Xp))==null?void 0:(f=Yp())==null?void 0:(g=f.loggingHotConfig)==null?void 0:(h=g.eventLoggingConfig)==null?void 0:h.payloadPolicies;if(k)for(f=0;f<k.length;f++)if(k[f].payloadNumber===e){e=k[f];break a}}e=void 0}k=200;if(e){if(e.enabled===!1&&!T("web_payload_policy_disabled_killswitch"))return;k=Et(e.tier);if(k===400){Ft(a,b);return}}xt[c]=
!0;c={cttAuthInfo:c,isJspb:!1,tier:k};zt().storePayload(c,a.payload);Gt(b,c,d==="gelDebuggingEvent")}}
function Gt(a,b,c){function d(){Ht({writeThenSend:!0},void 0,e,b.tier)}
var e=!1;e=e===void 0?!1:e;c=c===void 0?!1:c;a&&(ot=new a);a=tm("tvhtml5_logging_max_batch_ads_fork")||tm("tvhtml5_logging_max_batch")||tm("web_logging_max_batch")||100;var f=V(),g=It(e,b.tier),h=g.o;c&&(g.j=!0);c=0;b&&(c=zt().getSequenceCount(b));c>=1E3?d():c>=a?ut||(ut=Jt(function(){d();ut=void 0},0)):f-h>=10&&(Kt(e,b.tier),g.o=f)}
function Ft(a,b){if(a.endpoint==="log_event"){T("more_accurate_gel_parser")&&zt().storePayload({isJspb:!1},a.payload);Bt();var c=Ct(a),d=new Map;d.set(c,[a.payload]);var e=Dt(a.payload)||"";b&&(ot=new b);return new ci(function(f,g){ot&&ot.isReady()?Lt(d,ot,f,g,{bypassNetworkless:!0},!0,e==="gelDebuggingEvent"):f()})}}
function Ct(a){var b="";if(a.dangerousLogToVisitorSession)b="visitorOnlyApprovedKey";else if(a.cttAuthInfo){b=a.cttAuthInfo;var c={};b.videoId?c.videoId=b.videoId:b.playlistId&&(c.playlistId=b.playlistId);wt[a.cttAuthInfo.token]=c;b=a.cttAuthInfo.token}return b}
function Ht(a,b,c,d){a=a===void 0?{}:a;c=c===void 0?!1:c;new ci(function(e,f){var g=It(c,d),h=g.j;g.j=!1;Mt(g.i);Mt(g.h);g.h=0;ot&&ot.isReady()?d===void 0&&T("enable_web_tiered_gel")?Nt(e,f,a,b,c,300,h):Nt(e,f,a,b,c,d,h):(Kt(c,d),e())})}
function Nt(a,b,c,d,e,f,g){var h=ot;c=c===void 0?{}:c;e=e===void 0?!1:e;f=f===void 0?200:f;g=g===void 0?!1:g;var k=new Map,l={isJspb:e,cttAuthInfo:d,tier:f};e={isJspb:e,cttAuthInfo:d};if(d!==void 0)f=T("enable_web_tiered_gel")?zt().smartExtractMatchingEntries({keys:[l,e],sizeLimit:1E3}):zt().extractMatchingEntries(e),k.set(d,f);else for(d=y(Object.keys(xt)),l=d.next();!l.done;l=d.next())l=l.value,e=T("enable_web_tiered_gel")?zt().smartExtractMatchingEntries({keys:[{isJspb:!1,cttAuthInfo:l,tier:f},
{isJspb:!1,cttAuthInfo:l}],sizeLimit:1E3}):zt().extractMatchingEntries({isJspb:!1,cttAuthInfo:l}),e.length>0&&k.set(l,e),(T("web_fp_via_jspb_and_json")&&c.writeThenSend||!T("web_fp_via_jspb_and_json"))&&delete xt[l];Lt(k,h,a,b,c,!1,g)}
function Kt(a,b){function c(){Ht({writeThenSend:!0},void 0,a,b)}
a=a===void 0?!1:a;b=b===void 0?200:b;var d=It(a,b),e=d===tt||d===st?5E3:mt;T("web_gel_timeout_cap")&&!d.h&&(e=Jt(function(){c()},e),d.h=e);
Mt(d.i);e=S("LOGGING_BATCH_TIMEOUT",tm("web_gel_debounce_ms",1E4));T("shorten_initial_gel_batch_timeout")&&vt&&(e=lt);e=Jt(function(){tm("gel_min_batch_size")>0?zt().getSequenceCount({cttAuthInfo:void 0,isJspb:a,tier:b})>=nt&&c():c()},e);
d.i=e}
function Lt(a,b,c,d,e,f,g){e=e===void 0?{}:e;var h=Math.round(V()),k=a.size,l=(g===void 0?0:g)&&T("vss_through_gel_video_stats")?"video_stats":"log_event";a=y(a);var m=a.next();for(g={};!m.done;g={Rc:void 0,batchRequest:void 0,dangerousLogToVisitorSession:void 0,Uc:void 0,Tc:void 0},m=a.next()){var n=y(m.value);m=n.next().value;n=n.next().value;g.batchRequest=jg({context:dq(b.config_||cq())});if(!Ma(n)&&!T("throw_err_when_logevent_malformed_killswitch")){d();break}g.batchRequest.events=n;(n=wt[m])&&
Ot(g.batchRequest,m,n);delete wt[m];g.dangerousLogToVisitorSession=m==="visitorOnlyApprovedKey";Pt(g.batchRequest,h,g.dangerousLogToVisitorSession);T("always_send_and_write")&&(e.writeThenSend=!1);g.Uc=function(p){T("start_client_gcf")&&Dj.pa(function(){return B(function(t){return t.yield(Qt(p),0)})});
k--;k||c()};
g.Rc=0;g.Tc=function(p){return function(){p.Rc++;if(e.bypassNetworkless&&p.Rc===1)try{Yq(b,l,p.batchRequest,Rt({writeThenSend:!0},p.dangerousLogToVisitorSession,p.Uc,p.Tc,f)),vt=!1}catch(t){Zl(t),d()}k--;k||c()}}(g);
try{Yq(b,l,g.batchRequest,Rt(e,g.dangerousLogToVisitorSession,g.Uc,g.Tc,f)),vt=!1}catch(p){Zl(p),d()}}}
function Rt(a,b,c,d,e){a={retry:!0,onSuccess:c,onError:d,networklessOptions:a,dangerousLogToVisitorSession:b,th:!!e,headers:{},postBodyFormat:"",postBody:"",compress:T("compress_gel")||T("compress_gel_lr")};St()&&(a.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(V())));return a}
function Pt(a,b,c){St()||(a.requestTimeMs=String(b));T("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);!c&&(b=S("EVENT_ID"))&&((c=S("BATCH_CLIENT_COUNTER")||0)||(c=Math.floor(Math.random()*65535/2)),c++,c>65535&&(c=1),Ul("BATCH_CLIENT_COUNTER",c),a.serializedClientEventId={serializedEventId:b,clientCounter:String(c)})}
function Ot(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
function Bt(){var a;(a=F("yt.logging.transport.enableScrapingForTest"))||(a=sm("il_payload_scraping"),a=(a!==void 0?String(a):"")!=="enable_il_payload_scraping");a||(et=[],E("yt.logging.transport.enableScrapingForTest",!0),E("yt.logging.transport.scrapedPayloadsForTesting",et),E("yt.logging.transport.payloadToScrape","visualElementShown visualElementHidden visualElementAttached screenCreated visualElementGestured visualElementStateChanged".split(" ")),E("yt.logging.transport.getScrapedPayloadFromClientEventsFunction"),
E("yt.logging.transport.scrapeClientEvent",!0))}
function St(){return T("use_request_time_ms_header")||T("lr_use_request_time_ms_header")}
function Jt(a,b){return T("transport_use_scheduler")===!1?qm(a,b):T("logging_avoid_blocking_during_navigation")||T("lr_logging_avoid_blocking_during_navigation")?yn(function(){if(dt().currentState==="none")a();else{var c={};dt().install((c.none={callback:a},c))}},b):yn(a,b)}
function Mt(a){T("transport_use_scheduler")?Dj.qa(a):window.clearTimeout(a)}
function Qt(a){var b,c,d,e,f,g,h,k,l,m;return B(function(n){return n.h==1?(d=(b=a)==null?void 0:(c=b.responseContext)==null?void 0:c.globalConfigGroup,e=kt(d,wl),g=(f=d)==null?void 0:f.hotHashData,h=kt(d,vl),l=(k=d)==null?void 0:k.coldHashData,(m=Ls().resolve(Fs(Xp)))?g?e?n.yield(Zp(m,g,e),2):n.yield(Zp(m,g),2):n.A(2):n.return()):l?h?n.yield($p(m,l,h),0):n.yield($p(m,l),0):n.A(0)})}
function It(a,b){b=b===void 0?200:b;return a?b===300?tt:rt:b===300?st:qt}
function Dt(a){a=Object.keys(a);a=y(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value,tr[b])return b}
function Et(a){switch(a){case "DELAYED_EVENT_TIER_UNSPECIFIED":return 0;case "DELAYED_EVENT_TIER_DEFAULT":return 100;case "DELAYED_EVENT_TIER_DISPATCH_TO_EMPTY":return 200;case "DELAYED_EVENT_TIER_FAST":return 300;case "DELAYED_EVENT_TIER_IMMEDIATE":return 400;default:return 200}}
;var Tt=D.ytLoggingGelSequenceIdObj_||{};E("ytLoggingGelSequenceIdObj_",Tt);
function Ut(a,b,c,d){d=d===void 0?{}:d;var e={},f=Math.round(d.timestamp||V());e.eventTimeMs=f<Number.MAX_SAFE_INTEGER?f:0;e[a]=b;a=rs();e.context={lastActivityMs:String(d.timestamp||!isFinite(a)?-1:a)};d.sequenceGroup&&!T("web_gel_sequence_info_killswitch")&&(a=e.context,b=d.sequenceGroup,Tt[b]=b in Tt?Tt[b]+1:0,a.sequence={index:Tt[b],groupKey:b},d.endOfSequence&&delete Tt[d.sequenceGroup]);(d.sendIsolatedPayload?Ft:At)({endpoint:"log_event",payload:e,cttAuthInfo:d.cttAuthInfo,dangerousLogToVisitorSession:d.dangerousLogToVisitorSession},
c)}
;function no(a,b,c){c=c===void 0?{}:c;var d=Wr;S("ytLoggingEventsDefaultDisabled",!1)&&Wr===Wr&&(d=null);Ut(a,b,d,c)}
;function Vt(a){return a.slice(0,void 0).map(function(b){return b.name}).join(" > ")}
;var Wt=new Set,Xt=0,Yt=0,Zt=0,$t=[],au=[],bu=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function mo(a){cu(a)}
function W(a){cu(a,"WARNING")}
function du(a){a instanceof Error?cu(a):(a=Na(a)?JSON.stringify(a):String(a),a=new U(a),a.name="RejectedPromiseError",W(a))}
function cu(a,b,c,d,e,f,g,h){f=f===void 0?{}:f;f.name=c||S("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||S("INNERTUBE_CONTEXT_CLIENT_VERSION");c=f;b=b===void 0?"ERROR":b;g=g===void 0?!1:g;b=b===void 0?"ERROR":b;g=g===void 0?!1:g;if(a&&(a.hasOwnProperty("level")&&a.level&&(b=a.level),T("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),a.hasOwnProperty("args")&&d.push("Error args: "+
JSON.stringify(a.args)),d.push("File name: "+a.fileName),d.push("Stacktrace: "+a.stack),d=d.join("\n"),window.console.log(d,a)),!(Xt>=5))){d=[];e=y(au);for(f=e.next();!f.done;f=e.next()){f=f.value;try{f()&&d.push(f())}catch(z){}}d=[].concat(A($t),A(d));var k=Ub(a);e=k.message||"Unknown Error";f=k.name||"UnknownError";var l=k.stack||a.i||"Not available";if(l.startsWith(f+": "+e)){var m=l.split("\n");m.shift();l=m.join("\n")}m=k.lineNumber||"Not available";k=k.fileName||"Not available";var n=0;if(a.hasOwnProperty("args")&&
a.args&&a.args.length)for(var p=0;p<a.args.length&&!(n=Vm(a.args[p],"params."+p,c,n),n>=500);p++);else if(a.hasOwnProperty("params")&&a.params){var t=a.params;if(typeof a.params==="object")for(p in t){if(t[p]){var v="params."+p,x=Xm(t[p]);c[v]=x;n+=v.length+x.length;if(n>500)break}}else c.params=Xm(t)}if(d.length)for(p=0;p<d.length&&!(n=Vm(d[p],"params.context."+p,c,n),n>=500);p++);navigator.vendor&&!c.hasOwnProperty("vendor")&&(c["device.vendor"]=navigator.vendor);p={message:e,name:f,lineNumber:m,
fileName:k,stack:l,params:c,sampleWeight:1};c=Number(a.columnNumber);isNaN(c)||(p.lineNumber=p.lineNumber+":"+c);if(a.level==="IGNORED")a=0;else a:{a=Rm();c=y(a.Ya);for(d=c.next();!d.done;d=c.next())if(d=d.value,p.message&&p.message.match(d.Kh)){a=d.weight;break a}a=y(a.Ta);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.callback(p)){a=c.weight;break a}a=1}p.sampleWeight=a;a=y(Mm);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.xc[p.name])for(e=y(c.xc[p.name]),d=e.next();!d.done;d=e.next())if(f=
d.value,d=p.message.match(f.regexp)){p.params["params.error.original"]=d[0];e=f.groups;f={};for(m=0;m<e.length;m++)f[e[m]]=d[m+1],p.params["params.error."+e[m]]=d[m+1];p.message=c.Qc(f);break}p.params||(p.params={});a=Rm();p.params["params.errorServiceSignature"]="msg="+a.Ya.length+"&cb="+a.Ta.length;p.params["params.serviceWorker"]="false";D.document&&D.document.querySelectorAll&&(p.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));(new mg(ng,"sample")).constructor!==
mg&&(p.params["params.fconst"]="true");window.yterr&&typeof window.yterr==="function"&&window.yterr(p);if(p.sampleWeight!==0&&!Wt.has(p.message)){if(g&&T("web_enable_error_204"))eu(b===void 0?"ERROR":b,p);else{b=b===void 0?"ERROR":b;b==="ERROR"?(Sm.sb("handleError",p),T("record_app_crashed_web")&&Zt===0&&p.sampleWeight===1&&(Zt++,g={appCrashType:"APP_CRASH_TYPE_BREAKPAD"},T("report_client_error_with_app_crash_ks")||(g.systemHealth={crashData:{clientError:{logMessage:{message:p.message}}}}),no("appCrashed",
g)),Yt++):b==="WARNING"&&Sm.sb("handleWarning",p);if(T("kevlar_gel_error_routing")){g=b;h=h===void 0?{}:h;b:{a=y(bu);for(c=a.next();!c.done;c=a.next())if(to(c.value.toLowerCase())){a=!0;break b}a=!1}if(a)h=void 0;else{c={stackTrace:p.stack};p.fileName&&(c.filename=p.fileName);a=p.lineNumber&&p.lineNumber.split?p.lineNumber.split(":"):[];a.length!==0&&(a.length!==1||isNaN(Number(a[0]))?a.length!==2||isNaN(Number(a[0]))||isNaN(Number(a[1]))||(c.lineNumber=Number(a[0]),c.columnNumber=Number(a[1])):c.lineNumber=
Number(a[0]));a={level:"ERROR_LEVEL_UNKNOWN",message:p.message,errorClassName:p.name,sampleWeight:p.sampleWeight};g==="ERROR"?a.level="ERROR_LEVEL_ERROR":g==="WARNING"&&(a.level="ERROR_LEVEL_WARNNING");c={isObfuscated:!0,browserStackInfo:c};h.pageUrl=window.location.href;h.kvPairs=[];S("FEXP_EXPERIMENTS")&&(h.experimentIds=S("FEXP_EXPERIMENTS"));d=S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");if(!Vl("web_disable_gel_stp_ecatcher_killswitch")&&d)for(e=y(Object.keys(d)),f=e.next();!f.done;f=e.next())f=
f.value,h.kvPairs.push({key:f,value:String(d[f])});if(d=p.params)for(e=y(Object.keys(d)),f=e.next();!f.done;f=e.next())f=f.value,h.kvPairs.push({key:"client."+f,value:String(d[f])});d=S("SERVER_NAME");e=S("SERVER_VERSION");d&&e&&(h.kvPairs.push({key:"server.name",value:d}),h.kvPairs.push({key:"server.version",value:e}));h={errorMetadata:h,stackTrace:c,logMessage:a}}h&&(no("clientError",h),(g==="ERROR"||T("errors_flush_gel_always_killswitch"))&&Ht(void 0,void 0,!1))}T("suppress_error_204_logging")||
eu(b,p)}try{Wt.add(p.message)}catch(z){}Xt++}}}
function eu(a,b){var c=b.params||{};a={urlParams:{a:"logerror",t:"jserror",type:b.name,msg:b.message.substr(0,250),line:b.lineNumber,level:a,"client.name":c.name},postParams:{url:S("PAGE_NAME",window.location.href),file:b.fileName},method:"POST"};c.version&&(a["client.version"]=c.version);if(a.postParams){b.stack&&(a.postParams.stack=b.stack);b=y(Object.keys(c));for(var d=b.next();!d.done;d=b.next())d=d.value,a.postParams["client."+d]=c[d];if(c=S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS"))for(b=y(Object.keys(c)),
d=b.next();!d.done;d=b.next())d=d.value,a.postParams[d]=c[d];(c=S("LAVA_VERSION"))&&(a.postParams["lava.version"]=c);c=S("SERVER_NAME");b=S("SERVER_VERSION");c&&b&&(a.postParams["server.name"]=c,a.postParams["server.version"]=b)}Dm(S("ECATCHER_REPORT_HOST","")+"/error_204",a)}
function fu(a){var b=C.apply(1,arguments);a.args||(a.args=[]);Array.isArray(a.args)&&a.args.push.apply(a.args,A(b))}
;function gu(){this.register=new Map}
function hu(a){a=y(a.register.values());for(var b=a.next();!b.done;b=a.next())b.value.Oh("ABORTED")}
gu.prototype.clear=function(){hu(this);this.register.clear()};
var iu=new gu;var ju=Date.now().toString();
function ku(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;a<16;a++){b=Date.now();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(Math.random()*256)}if(ju)for(a=1,b=0;b<ju.length;b++)d[a%16]^=d[(a-1)%16]/4^ju.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var lu,mu=D.ytLoggingDocDocumentNonce_;mu||(mu=ku(),E("ytLoggingDocDocumentNonce_",mu));lu=mu;function nu(a){this.h=a}
r=nu.prototype;r.getAsJson=function(){var a={};this.h.trackingParams!==void 0?a.trackingParams=this.h.trackingParams:(a.veType=this.h.veType,this.h.veCounter!==void 0&&(a.veCounter=this.h.veCounter),this.h.elementIndex!==void 0&&(a.elementIndex=this.h.elementIndex));this.h.dataElement!==void 0&&(a.dataElement=this.h.dataElement.getAsJson());this.h.youtubeData!==void 0&&(a.youtubeData=this.h.youtubeData);this.h.isCounterfactual&&(a.isCounterfactual=!0);return a};
r.getAsJspb=function(){var a=new yl;this.h.trackingParams!==void 0?a.setTrackingParams(this.h.trackingParams):(this.h.veType!==void 0&&ef(a,2,Ee(this.h.veType)),this.h.veCounter!==void 0&&ef(a,6,Ee(this.h.veCounter)),this.h.elementIndex!==void 0&&ef(a,3,Ee(this.h.elementIndex)),this.h.isCounterfactual&&ef(a,5,Ae(!0)));if(this.h.dataElement!==void 0){var b=this.h.dataElement.getAsJspb();qf(a,yl,7,b)}this.h.youtubeData!==void 0&&qf(a,xl,8,this.h.jspbYoutubeData);return a};
r.toString=function(){return JSON.stringify(this.getAsJson())};
r.isClientVe=function(){return!this.h.trackingParams&&!!this.h.veType};
r.getLoggingDirectives=function(){return this.h.loggingDirectives};function ou(a){return S("client-screen-nonce-store",{})[a===void 0?0:a]}
function pu(a,b){b=b===void 0?0:b;var c=S("client-screen-nonce-store");c||(c={},Ul("client-screen-nonce-store",c));c[b]=a}
function qu(a){a=a===void 0?0:a;return a===0?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function ru(a){return S(qu(a===void 0?0:a))}
E("yt_logging_screen.getRootVeType",ru);function su(){var a=S("csn-to-ctt-auth-info");a||(a={},Ul("csn-to-ctt-auth-info",a));return a}
function tu(){return Object.values(S("client-screen-nonce-store",{})).filter(function(a){return a!==void 0})}
function uu(a){a=ou(a===void 0?0:a);if(!a&&!S("USE_CSN_FALLBACK",!0))return null;a||(a="UNDEFINED_CSN");return a?a:null}
E("yt_logging_screen.getCurrentCsn",uu);function vu(a,b,c){var d=su();(c=uu(c))&&delete d[c];b&&(d[a]=b)}
function wu(a){return su()[a]}
E("yt_logging_screen.getCttAuthInfo",wu);E("yt_logging_screen.setCurrentScreen",function(a,b,c,d){c=c===void 0?0:c;if(a!==ou(c)||b!==S(qu(c)))if(vu(a,d,c),pu(a,c),Ul(qu(c),b),b=function(){setTimeout(function(){a&&no("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:lu,clientScreenNonce:a})},0)},"requestAnimationFrame"in window)try{window.requestAnimationFrame(b)}catch(e){b()}else b()});function xu(){var a=ig(yu),b;return(new ci(function(c,d){a.onSuccess=function(e){pm(e)?c(new zu(e)):d(new Au("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new Au("Unknown request error","net.unknown",e))};
a.onTimeout=function(e){d(new Au("Request timed out","net.timeout",e))};
b=Dm("//googleads.g.doubleclick.net/pagead/id",a)})).Fc(function(c){if(c instanceof li){var d;
(d=b)==null||d.abort()}return hi(c)})}
function Au(a,b,c){bb.call(this,a+", errorCode="+b);this.errorCode=b;this.xhr=c;this.name="PromiseAjaxError"}
w(Au,bb);function zu(a){this.xhr=a}
;function Bu(){this.X=0;this.h=null}
Bu.prototype.then=function(a,b,c){return this.X===1&&a?(a=a.call(c,this.h))&&typeof a.then==="function"?a:Cu(a):this.X===2&&b?(a=b.call(c,this.h))&&typeof a.then==="function"?a:Du(a):this};
Bu.prototype.getValue=function(){return this.h};
Bu.prototype.isRejected=function(){return this.X==2};
Bu.prototype.$goog_Thenable=!0;function Du(a){var b=new Bu;a=a===void 0?null:a;b.X=2;b.h=a===void 0?null:a;return b}
function Cu(a){var b=new Bu;a=a===void 0?null:a;b.X=1;b.h=a===void 0?null:a;return b}
;function Eu(a){var b=S("INNERTUBE_HOST_OVERRIDE");b&&(a=String(b)+String(cc(a)));return a}
function Fu(a){var b={};T("json_condensed_response")&&(b.prettyPrint="false");return a=jm(a,b||{},!1)}
function Gu(a,b){var c=c===void 0?{}:c;a={method:b===void 0?"POST":b,mode:km(a)?"same-origin":"cors",credentials:km(a)?"same-origin":"include"};b={};for(var d=y(Object.keys(c)),e=d.next();!e.done;e=d.next())e=e.value,c[e]&&(b[e]=c[e]);Object.keys(b).length>0&&(a.headers=b);return a}
;function Hu(){return Sf()||(jd||kd)&&to("applewebkit")&&!to("version")&&(!to("safari")||to("gsa/"))||id&&to("version/")?!0:S("EOM_VISITOR_DATA")?!1:!0}
;function Iu(a){var b=a.docid||a.video_id||a.videoId||a.id;if(b)return b;b=a.raw_player_response;b||(a=a.player_response)&&(b=JSON.parse(a));return b&&b.videoDetails&&b.videoDetails.videoId||null}
;function Ju(a){a:{var b="EMBEDDED_PLAYER_MODE_UNKNOWN";window.location.hostname.includes("youtubeeducation.com")&&(b="EMBEDDED_PLAYER_MODE_PFL");var c=a.raw_embedded_player_response;if(!c&&(a=a.embedded_player_response))try{c=JSON.parse(a)}catch(e){break a}if(c)b:for(var d in Cl)if(Cl[d]==c.embeddedPlayerMode){b=Cl[d];break b}}return b==="EMBEDDED_PLAYER_MODE_PFL"}
;function Ku(a){bb.call(this,a.message||a.description||a.name);this.isMissing=a instanceof Lu;this.isTimeout=a instanceof Au&&a.errorCode=="net.timeout";this.isCanceled=a instanceof li}
w(Ku,bb);Ku.prototype.name="BiscottiError";function Lu(){bb.call(this,"Biscotti ID is missing from server")}
w(Lu,bb);Lu.prototype.name="BiscottiMissingError";var yu={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},Mu=null;function Nu(){if(T("disable_biscotti_fetch_entirely_for_all_web_clients"))return Error("Biscotti id fetching has been disabled entirely.");if(!Hu())return Error("User has not consented - not fetching biscotti id.");var a=S("PLAYER_VARS",{});if(gg(a)=="1")return Error("Biscotti ID is not available in private embed mode");if(Ju(a))return Error("Biscotti id fetching has been disabled for pfl.")}
function Nl(){var a=Nu();if(a!==void 0)return hi(a);Mu||(Mu=xu().then(Ou).Fc(function(b){return Pu(2,b)}));
return Mu}
function Ou(a){a=a.xhr.responseText;if(a.lastIndexOf(")]}'",0)!=0)throw new Lu;a=JSON.parse(a.substr(4));if((a.type||1)>1)throw new Lu;a=a.id;Ol(a);Mu=Cu(a);Qu(18E5,2);return a}
function Pu(a,b){b=new Ku(b);Ol("");Mu=Du(b);a>0&&Qu(12E4,a-1);throw b;}
function Qu(a,b){qm(function(){xu().then(Ou,function(c){return Pu(b,c)}).Fc(ai)},a)}
function Ru(){try{var a=F("yt.ads.biscotti.getId_");return a?a():Nl()}catch(b){return hi(b)}}
;var Gb=ra(["data-"]);function Su(a){a&&(a.dataset?a.dataset[Tu()]="true":Hb(a))}
function Uu(a){return a?a.dataset?a.dataset[Tu()]:a.getAttribute("data-loaded"):null}
var Vu={};function Tu(){return Vu.loaded||(Vu.loaded="loaded".replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()}))}
;function Wu(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||ig(b);this.assets=a.assets||{};this.attrs=a.attrs||ig(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Wu.prototype.clone=function(){var a=new Wu,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];La(c)=="object"?a[b]=ig(c):a[b]=c}return a};var Xu=["att/get"],Yu=["share/get_share_panel"],Zu=["share/get_web_player_share_panel"],$u=["feedback"],av=["notification/modify_channel_preference"],bv=["browse/edit_playlist"],cv=["subscription/subscribe"],dv=["subscription/unsubscribe"];var ev=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};E("yt.msgs_",ev);function fv(a){Pl(ev,arguments)}
;function gv(a,b,c){hv(a,b,c===void 0?null:c)}
function iv(a){a=jv(a);var b=document.getElementById(a);b&&(As(a),b.parentNode.removeChild(b))}
function kv(a,b){a&&b&&(a=""+Sa(b),(a=lv[a])&&ys(a))}
function hv(a,b,c){c=c===void 0?null:c;var d=jv(a),e=document.getElementById(d),f=e&&Uu(e),g=e&&!f;f?b&&b():(b&&(f=ws(d,b),b=""+Sa(b),lv[b]=f),g||(e=mv(a,d,function(){Uu(e)||(Su(e),zs(d),qm(function(){As(d)},0))},c)))}
function mv(a,b,c,d){d=d===void 0?null:d;var e=pg("SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Eb(e,tl(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function jv(a){var b=document.createElement("a");wb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Yb(a)}
var lv={};function nv(a){var b=ov(a),c=document.getElementById(b),d=c&&Uu(c);d||c&&!d||(c=pv(a,b,function(){if(!Uu(c)){Su(c);zs(b);var e=Ya(As,b);qm(e,0)}}))}
function pv(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=tl(a);Jb(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function ov(a){var b=pg("A");wb(b,new pb(a));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Yb(a)}
;function qv(a){var b=C.apply(1,arguments);if(!rv(a)||b.some(function(d){return!rv(d)}))throw Error("Only objects may be merged.");
b=y(b);for(var c=b.next();!c.done;c=b.next())sv(a,c.value)}
function sv(a,b){for(var c in b)if(rv(b[c])){if(c in a&&!rv(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});sv(a[c],b[c])}else if(tv(b[c])){if(c in a&&!tv(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);uv(a[c],b[c])}else a[c]=b[c];return a}
function uv(a,b){b=y(b);for(var c=b.next();!c.done;c=b.next())c=c.value,rv(c)?a.push(sv({},c)):tv(c)?a.push(uv([],c)):a.push(c);return a}
function rv(a){return typeof a==="object"&&!Array.isArray(a)}
function tv(a){return typeof a==="object"&&Array.isArray(a)}
;var vv="absolute_experiments app conditional_experiments debugcss debugjs expflag forced_experiments pbj pbjreload sbb spf spfreload sr_bns_address sttick".split(" ");
function wv(a,b){var c=c===void 0?!0:c;var d=S("VALID_SESSION_TEMPDATA_DOMAINS",[]),e=bc(window.location.href);e&&d.push(e);e=bc(a);if(Kb(d,e)>=0||!e&&a.lastIndexOf("/",0)==0)if(d=document.createElement("a"),wb(d,a),a=d.href)if(a=cc(a),a=dc(a))if(c&&!b.csn&&(b.itct||b.ved)&&(b=Object.assign({csn:uu()},b)),f){var f=parseInt(f,10);isFinite(f)&&f>0&&xv(a,b,f)}else xv(a,b)}
function xv(a,b,c){a=yv(a);b=b?fc(b):"";c=c||5;Hu()&&dn(a,b,c)}
function yv(a){for(var b=y(vv),c=b.next();!c.done;c=b.next())a=lc(a,c.value);return"ST-"+Yb(a).toString(36)}
;function zv(a){jq.call(this,1,arguments);this.csn=a}
w(zv,jq);var sq=new kq("screen-created",zv),Av=[],Bv=0,Cv=new Map,Dv=new Map,Ev=new Map;
function Fv(a,b,c,d,e){e=e===void 0?!1:e;for(var f=Gv({cttAuthInfo:wu(b)||void 0},b),g=y(d),h=g.next();!h.done;h=g.next()){h=h.value;var k=h.getAsJson();(eg(k)||!k.trackingParams&&!k.veType)&&W(Error("Child VE logged with no data"));if(T("no_client_ve_attach_unless_shown")){var l=Hv(h,b);if(k.veType&&!Dv.has(l)&&!Ev.has(l)&&!e){if(!T("il_attach_cache_limit")||Cv.size<1E3){Cv.set(l,[a,b,c,h]);return}T("il_attach_cache_limit")&&Cv.size>1E3&&W(new U("IL Attach cache exceeded limit"))}h=Hv(c,b);Cv.has(h)?
Iv(c,b):Ev.set(h,!0)}}d=d.filter(function(m){m.csn!==b?(m.csn=b,m=!0):m=!1;return m});
c={csn:b,parentVe:c.getAsJson(),childVes:Ob(d,function(m){return m.getAsJson()})};
b==="UNDEFINED_CSN"?Jv("visualElementAttached",f,c):a?Ut("visualElementAttached",c,a,f):no("visualElementAttached",c,f)}
function Jv(a,b,c){Av.push({Re:a,payload:c,Fh:void 0,options:b});Bv||(Bv=tq())}
function uq(a){if(Av){for(var b=y(Av),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,no(c.Re,c.payload,c.options));Av.length=0}Bv=0}
function Hv(a,b){return""+a.getAsJson().veType+a.getAsJson().veCounter+b}
function Iv(a,b){a=Hv(a,b);Cv.has(a)&&(b=Cv.get(a)||[],Fv(b[0],b[1],b[2],[b[3]],!0),Cv.delete(a))}
function Gv(a,b){T("log_sequence_info_on_gel_web")&&(a.sequenceGroup=b);return a}
;function Kv(){try{return!!self.localStorage}catch(a){return!1}}
;function Lv(a){a=a.match(/(.*)::.*::.*/);if(a!==null)return a[1]}
function Mv(a){if(Kv()){var b=Object.keys(window.localStorage);b=y(b);for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=Lv(c);d===void 0||a.includes(d)||self.localStorage.removeItem(c)}}}
function Nv(){if(!Kv())return!1;var a=wn(),b=Object.keys(window.localStorage);b=y(b);for(var c=b.next();!c.done;c=b.next())if(c=Lv(c.value),c!==void 0&&c!==a)return!0;return!1}
;function Ov(){var a=!1;try{a=!!window.sessionStorage.getItem("session_logininfo")}catch(b){a=!0}return(S("INNERTUBE_CLIENT_NAME")==="WEB"||S("INNERTUBE_CLIENT_NAME")==="WEB_CREATOR")&&a}
function Pv(a){if(S("LOGGED_IN",!0)&&Ov()){var b=S("VALID_SESSION_TEMPDATA_DOMAINS",[]);var c=bc(window.location.href);c&&b.push(c);c=bc(a);Kb(b,c)>=0||!c&&a.lastIndexOf("/",0)==0?(b=cc(a),(b=dc(b))?(b=yv(b),b=(b=en(b)||null)?gm(b):{}):b=null):b=null;b==null&&(b={});c=b;var d=void 0;Ov()?(d||(d=S("LOGIN_INFO")),d?(c.session_logininfo=d,c=!0):c=!1):c=!1;c&&wv(a,b)}}
;function Qv(a,b,c){b=b===void 0?{}:b;c=c===void 0?!1:c;var d=S("EVENT_ID");d&&(b.ei||(b.ei=d));b&&wv(a,b);if(c)return!1;Pv(a);var e=e===void 0?{}:e;var f=f===void 0?"":f;var g=g===void 0?window:g;b=hc(a,e);Pv(b);a=void 0;a=a===void 0?tb:a;a:if(f=b+f,a=a===void 0?tb:a,!(f instanceof pb)){for(b=0;b<a.length;++b)if(c=a[b],c instanceof rb&&c.Fe(f)){f=new pb(f);break a}f=void 0}g=g.location;f=vb(f||qb);f!==void 0&&(g.href=f);return!0}
;function Rv(a){if(gg(S("PLAYER_VARS",{}))!="1"){a&&Ml();try{Ru().then(function(){},function(){}),qm(Rv,18E5)}catch(b){Zl(b)}}}
;var Sv=new Map([["dark","USER_INTERFACE_THEME_DARK"],["light","USER_INTERFACE_THEME_LIGHT"]]);function Tv(){var a=a===void 0?window.location.href:a;if(T("kevlar_disable_theme_param"))return null;var b=$b(ac(5,a));if(T("enable_dark_theme_only_on_shorts")&&b!=null&&b.startsWith("/shorts/"))return"USER_INTERFACE_THEME_DARK";try{var c=hm(a).theme;return Sv.get(c)||null}catch(d){}return null}
;function Uv(){this.h={};if(this.i=gn()){var a=en("CONSISTENCY");a&&Vv(this,{encryptedTokenJarContents:a})}}
Uv.prototype.handleResponse=function(a,b){if(!b)throw Error("request needs to be passed into ConsistencyService");var c,d;b=((c=b.Ga.context)==null?void 0:(d=c.request)==null?void 0:d.consistencyTokenJars)||[];var e;if(a=(e=a.responseContext)==null?void 0:e.consistencyTokenJar){e=y(b);for(c=e.next();!c.done;c=e.next())delete this.h[c.value.encryptedTokenJarContents];Vv(this,a)}};
function Vv(a,b){if(b.encryptedTokenJarContents&&(a.h[b.encryptedTokenJarContents]=b,typeof b.expirationSeconds==="string")){var c=Number(b.expirationSeconds);setTimeout(function(){delete a.h[b.encryptedTokenJarContents]},c*1E3);
a.i&&dn("CONSISTENCY",b.encryptedTokenJarContents,c,void 0,!0)}}
;var Wv=window.location.hostname.split(".").slice(-2).join(".");function Xv(){this.j=-1;var a=S("LOCATION_PLAYABILITY_TOKEN");S("INNERTUBE_CLIENT_NAME")==="TVHTML5"&&(this.h=Yv(this))&&(a=this.h.get("yt-location-playability-token"));a&&(this.locationPlayabilityToken=a,this.i=void 0)}
var Zv;function $v(){Zv=F("yt.clientLocationService.instance");Zv||(Zv=new Xv,E("yt.clientLocationService.instance",Zv));return Zv}
r=Xv.prototype;
r.setLocationOnInnerTubeContext=function(a){a.client||(a.client={});if(this.i)a.client.locationInfo||(a.client.locationInfo={}),a.client.locationInfo.latitudeE7=Math.floor(this.i.coords.latitude*1E7),a.client.locationInfo.longitudeE7=Math.floor(this.i.coords.longitude*1E7),a.client.locationInfo.horizontalAccuracyMeters=Math.round(this.i.coords.accuracy),a.client.locationInfo.forceLocationPlayabilityTokenRefresh=!0;else if(this.o||this.locationPlayabilityToken)a.client.locationPlayabilityToken=this.o||
this.locationPlayabilityToken};
r.handleResponse=function(a){var b;a=(b=a.responseContext)==null?void 0:b.locationPlayabilityToken;a!==void 0&&(this.locationPlayabilityToken=a,this.i=void 0,S("INNERTUBE_CLIENT_NAME")==="TVHTML5"?(this.h=Yv(this))&&this.h.set("yt-location-playability-token",a,15552E3):dn("YT_CL",JSON.stringify({loctok:a}),15552E3,Wv,!0))};
function Yv(a){return a.h===void 0?new eo("yt-client-location"):a.h}
r.clearLocationPlayabilityToken=function(a){a==="TVHTML5"?(this.h=Yv(this))&&this.h.remove("yt-location-playability-token"):fn("YT_CL");this.o=void 0;this.j!==-1&&(clearTimeout(this.j),this.j=-1)};
r.getCurrentPositionFromGeolocation=function(){var a=this;if(!(navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition))return Promise.reject(Error("Geolocation unsupported"));var b=!1,c=1E4;S("INNERTUBE_CLIENT_NAME")==="MWEB"&&(b=!0,c=15E3);return new Promise(function(d,e){navigator.geolocation.getCurrentPosition(function(f){a.i=f;d(f)},function(f){e(f)},{enableHighAccuracy:b,
maximumAge:0,timeout:c})})};
r.createUnpluggedLocationInfo=function(a){var b={};a=a.coords;if(a==null?0:a.latitude)b.latitudeE7=Math.floor(a.latitude*1E7);if(a==null?0:a.longitude)b.longitudeE7=Math.floor(a.longitude*1E7);if(a==null?0:a.accuracy)b.locationRadiusMeters=Math.round(a.accuracy);return b};
r.createLocationInfo=function(a){var b={};a=a.coords;if(a==null?0:a.latitude)b.latitudeE7=Math.floor(a.latitude*1E7);if(a==null?0:a.longitude)b.longitudeE7=Math.floor(a.longitude*1E7);return b};function aw(a,b,c){b=b===void 0?!1:b;c=c===void 0?!1:c;var d=S("INNERTUBE_CONTEXT");if(!d)return cu(Error("Error: No InnerTubeContext shell provided in ytconfig.")),{};d=jg(d);T("web_no_tracking_params_in_shell_killswitch")||delete d.clickTracking;d.client||(d.client={});var e=d.client;e.clientName==="MWEB"&&e.clientFormFactor!=="AUTOMOTIVE_FORM_FACTOR"&&(e.clientFormFactor=S("IS_TABLET")?"LARGE_FORM_FACTOR":"SMALL_FORM_FACTOR");e.screenWidthPoints=window.innerWidth;e.screenHeightPoints=window.innerHeight;
e.screenPixelDensity=Math.round(window.devicePixelRatio||1);e.screenDensityFloat=window.devicePixelRatio||1;e.utcOffsetMinutes=-Math.floor((new Date).getTimezoneOffset());var f=f===void 0?!1:f;ln();var g="USER_INTERFACE_THEME_LIGHT";on(165)?g="USER_INTERFACE_THEME_DARK":on(174)?g="USER_INTERFACE_THEME_LIGHT":!T("kevlar_legacy_browsers")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme)").matches&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(g="USER_INTERFACE_THEME_DARK");
f=f?g:Tv()||g;e.userInterfaceTheme=f;if(!b){if(f=tn())e.connectionType=f;T("web_log_effective_connection_type")&&(f=un())&&(d.client.effectiveConnectionType=f)}var h;if(T("web_log_memory_total_kbytes")&&((h=D.navigator)==null?0:h.deviceMemory)){var k;h=(k=D.navigator)==null?void 0:k.deviceMemory;d.client.memoryTotalKbytes=""+h*1E6}T("web_gcf_hashes_innertube")&&(f=aq())&&(k=f.coldConfigData,h=f.coldHashData,f=f.hotHashData,d.client.configInfo=d.client.configInfo||{},k&&(d.client.configInfo.coldConfigData=
k),h&&(d.client.configInfo.coldHashData=h),f&&(d.client.configInfo.hotHashData=f));k=hm(D.location.href);!T("web_populate_internal_geo_killswitch")&&k.internalcountrycode&&(e.internalGeo=k.internalcountrycode);e.clientName==="MWEB"||e.clientName==="WEB"?(e.mainAppWebInfo={graftUrl:D.location.href},T("kevlar_woffle")&&Ym.instance&&(k=Ym.instance,e.mainAppWebInfo.pwaInstallabilityStatus=!k.h&&k.i?"PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED":"PWA_INSTALLABILITY_STATUS_UNKNOWN"),e.mainAppWebInfo.webDisplayMode=
Zm(),e.mainAppWebInfo.isWebNativeShareAvailable=navigator&&navigator.share!==void 0):e.clientName==="TVHTML5"&&(!T("web_lr_app_quality_killswitch")&&(k=S("LIVING_ROOM_APP_QUALITY"))&&(e.tvAppInfo=Object.assign(e.tvAppInfo||{},{appQuality:k})),k=S("LIVING_ROOM_CERTIFICATION_SCOPE"))&&(e.tvAppInfo=Object.assign(e.tvAppInfo||{},{certificationScope:k}));if(!T("web_populate_time_zone_itc_killswitch")){a:{if(typeof Intl!=="undefined")try{var l=(new Intl.DateTimeFormat).resolvedOptions().timeZone;break a}catch(Oa){}l=
void 0}l&&(e.timeZone=l)}(l=S("EXPERIMENTS_TOKEN",""))?e.experimentsToken=l:delete e.experimentsToken;l=um();Uv.instance||(Uv.instance=new Uv);e=Uv.instance.h;k=[];h=0;for(var m in e)k[h++]=e[m];d.request=Object.assign({},d.request,{internalExperimentFlags:l,consistencyTokenJars:k});!T("web_prequest_context_killswitch")&&(m=S("INNERTUBE_CONTEXT_PREQUEST_CONTEXT"))&&(d.request.externalPrequestContext=m);l=ln();m=on(58);l=l.get("gsml","");d.user=Object.assign({},d.user);m&&(d.user.enableSafetyMode=
m);l&&(d.user.lockedSafetyMode=!0);T("warm_op_csn_cleanup")?c&&(b=uu())&&(d.clientScreenNonce=b):!b&&(b=uu())&&(d.clientScreenNonce=b);a&&(d.clickTracking={clickTrackingParams:a});if(a=F("yt.mdx.remote.remoteClient_"))d.remoteClient=a;$v().setLocationOnInnerTubeContext(d);try{var n=lm(),p=n.bid;delete n.bid;d.adSignalsInfo={params:[],bid:p};for(var t=y(Object.entries(n)),v=t.next();!v.done;v=t.next()){var x=y(v.value),z=x.next().value,H=x.next().value;n=z;p=H;a=void 0;(a=d.adSignalsInfo.params)==
null||a.push({key:n,value:""+p})}var K,ca;if(((K=d.client)==null?void 0:K.clientName)==="TVHTML5"||((ca=d.client)==null?void 0:ca.clientName)==="TVHTML5_UNPLUGGED"){var da=S("INNERTUBE_CONTEXT");da.adSignalsInfo&&(d.adSignalsInfo.advertisingId=da.adSignalsInfo.advertisingId,d.adSignalsInfo.advertisingIdSignalType="DEVICE_ID_TYPE_CONNECTED_TV_IFA",d.adSignalsInfo.limitAdTracking=da.adSignalsInfo.limitAdTracking)}}catch(Oa){cu(Oa)}return d}
;function bw(a){var b={"Content-Type":"application/json"};S("EOM_VISITOR_DATA")?b["X-Goog-EOM-Visitor-Id"]=S("EOM_VISITOR_DATA"):S("VISITOR_DATA")&&(b["X-Goog-Visitor-Id"]=S("VISITOR_DATA"));b["X-Youtube-Bootstrap-Logged-In"]=S("LOGGED_IN",!1);S("DEBUG_SETTINGS_METADATA")&&(b["X-Debug-Settings-Metadata"]=S("DEBUG_SETTINGS_METADATA"));a!=="cors"&&((a=S("INNERTUBE_CONTEXT_CLIENT_NAME"))&&(b["X-Youtube-Client-Name"]=a),(a=S("INNERTUBE_CONTEXT_CLIENT_VERSION"))&&(b["X-Youtube-Client-Version"]=a),(a=S("CHROME_CONNECTED_HEADER"))&&
(b["X-Youtube-Chrome-Connected"]=a),(a=S("DOMAIN_ADMIN_STATE"))&&(b["X-Youtube-Domain-Admin-State"]=a),S("ENABLE_LAVA_HEADER_ON_IT_EXPANSION")&&(a=S("SERIALIZED_LAVA_DEVICE_CONTEXT"))&&(b["X-YouTube-Lava-Device-Context"]=a));return b}
;function cw(){this.h={}}
cw.prototype.contains=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)};
cw.prototype.get=function(a){if(this.contains(a))return this.h[a]};
cw.prototype.set=function(a,b){this.h[a]=b};
cw.prototype.remove=function(a){delete this.h[a]};function dw(){this.mappings=new cw}
dw.prototype.getModuleId=function(a){return a.serviceId.getModuleId()};
dw.prototype.get=function(a){a:{var b=this.mappings.get(a.toString());switch(b.type){case "mapping":a=b.value;break a;case "factory":b=b.value();this.mappings.set(a.toString(),{type:"mapping",value:b});a=b;break a;default:a=xb(b)}}return a};
new dw;function ew(a){return function(){return new a}}
;var fw={},gw=(fw.WEB_UNPLUGGED="^unplugged/",fw.WEB_UNPLUGGED_ONBOARDING="^unplugged/",fw.WEB_UNPLUGGED_OPS="^unplugged/",fw.WEB_UNPLUGGED_PUBLIC="^unplugged/",fw.WEB_CREATOR="^creator/",fw.WEB_KIDS="^kids/",fw.WEB_EXPERIMENTS="^experiments/",fw.WEB_MUSIC="^music/",fw.WEB_REMIX="^music/",fw.WEB_MUSIC_EMBEDDED_PLAYER="^music/",fw.WEB_MUSIC_EMBEDDED_PLAYER="^main_app/|^sfv/",fw);
function hw(a){var b=b===void 0?"UNKNOWN_INTERFACE":b;if(a.length===1)return a[0];var c=gw[b];if(c){c=new RegExp(c);for(var d=y(a),e=d.next();!e.done;e=d.next())if(e=e.value,c.exec(e))return e}var f=[];Object.entries(gw).forEach(function(g){var h=y(g);g=h.next().value;h=h.next().value;b!==g&&f.push(h)});
c=new RegExp(f.join("|"));a.sort(function(g,h){return g.length-h.length});
d=y(a);for(e=d.next();!e.done;e=d.next())if(e=e.value,!c.exec(e))return e;return a[0]}
;function iw(){}
iw.prototype.u=function(a,b,c){b=b===void 0?{}:b;c=c===void 0?cn:c;var d={context:aw(a.clickTrackingParams,!1,this.o)};var e=this.i(a);if(e){this.h(d,e,b);var f;b="/youtubei/v1/"+hw(this.j());(e=(f=kt(a.commandMetadata,Al))==null?void 0:f.apiUrl)&&(b=e);f=Fu(Eu(b));a=Object.assign({},{command:a},void 0);d={input:f,Za:Gu(f),Ga:d,config:a};d.config.Ob?d.config.Ob.identity=c:d.config.Ob={identity:c};return d}cu(new U("Error: Failed to create Request from Command.",a))};
fa.Object.defineProperties(iw.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!1}}});
function jw(){}
w(jw,iw);function kw(){}
w(kw,jw);kw.prototype.u=function(){return{input:"/getDatasyncIdsEndpoint",Za:Gu("/getDatasyncIdsEndpoint","GET"),Ga:{}}};
kw.prototype.j=function(){return[]};
kw.prototype.i=function(){};
kw.prototype.h=function(){};var lw={},mw=(lw.GET_DATASYNC_IDS=ew(kw),lw);function nw(a){var b;(b=F("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},E("ytcsi."+(a||"")+"data_",b));return b}
function ow(){var a=nw();a.info||(a.info={});return a.info}
function pw(a){a=nw(a);a.metadata||(a.metadata={});return a.metadata}
function qw(a){a=nw(a);a.tick||(a.tick={});return a.tick}
function rw(a){a=nw(a);if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}else a.gel={gelTicks:{},gelInfos:{}};return a.gel}
function sw(a){a=rw(a);a.gelInfos||(a.gelInfos={});return a.gelInfos}
function tw(a){var b=nw(a).nonce;b||(b=ku(),nw(a).nonce=b);return b}
;function uw(){var a=F("ytcsi.debug");a||(a=[],E("ytcsi.debug",a),E("ytcsi.reference",{}));return a}
function vw(a){a=a||"";var b=F("ytcsi.reference");b||(uw(),b=F("ytcsi.reference"));if(b[a])return b[a];var c=uw(),d={timerName:a,info:{},tick:{},span:{},jspbInfo:[]};c.push(d);return b[a]=d}
;var X={},ww=(X.auto_search="LATENCY_ACTION_AUTO_SEARCH",X.ad_to_ad="LATENCY_ACTION_AD_TO_AD",X.ad_to_video="LATENCY_ACTION_AD_TO_VIDEO",X.app_startup="LATENCY_ACTION_APP_STARTUP",X.browse="LATENCY_ACTION_BROWSE",X.cast_splash="LATENCY_ACTION_CAST_SPLASH",X.channel_activity="LATENCY_ACTION_KIDS_CHANNEL_ACTIVITY",X.channels="LATENCY_ACTION_CHANNELS",X.chips="LATENCY_ACTION_CHIPS",X.commerce_transaction="LATENCY_ACTION_COMMERCE_TRANSACTION",X.direct_playback="LATENCY_ACTION_DIRECT_PLAYBACK",X.editor=
"LATENCY_ACTION_EDITOR",X.embed="LATENCY_ACTION_EMBED",X.embed_no_video="LATENCY_ACTION_EMBED_NO_VIDEO",X.entity_key_serialization_perf="LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",X.entity_key_deserialization_perf="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",X.explore="LATENCY_ACTION_EXPLORE",X.favorites="LATENCY_ACTION_FAVORITES",X.home="LATENCY_ACTION_HOME",X.inboarding="LATENCY_ACTION_INBOARDING",X.library="LATENCY_ACTION_LIBRARY",X.live="LATENCY_ACTION_LIVE",X.live_pagination="LATENCY_ACTION_LIVE_PAGINATION",
X.management="LATENCY_ACTION_MANAGEMENT",X.mini_app="LATENCY_ACTION_MINI_APP_PLAY",X.notification_settings="LATENCY_ACTION_KIDS_NOTIFICATION_SETTINGS",X.onboarding="LATENCY_ACTION_ONBOARDING",X.parent_profile_settings="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",X.parent_tools_collection="LATENCY_ACTION_PARENT_TOOLS_COLLECTION",X.parent_tools_dashboard="LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",X.player_att="LATENCY_ACTION_PLAYER_ATTESTATION",X.prebuffer="LATENCY_ACTION_PREBUFFER",X.prefetch="LATENCY_ACTION_PREFETCH",
X.profile_settings="LATENCY_ACTION_KIDS_PROFILE_SETTINGS",X.profile_switcher="LATENCY_ACTION_LOGIN",X.projects="LATENCY_ACTION_PROJECTS",X.reel_watch="LATENCY_ACTION_REEL_WATCH",X.results="LATENCY_ACTION_RESULTS",X.red="LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",X.premium="LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",X.privacy_policy="LATENCY_ACTION_KIDS_PRIVACY_POLICY",X.review="LATENCY_ACTION_REVIEW",X.search_overview_answer="LATENCY_ACTION_SEARCH_OVERVIEW_ANSWER",X.search_ui="LATENCY_ACTION_SEARCH_UI",
X.search_suggest="LATENCY_ACTION_SUGGEST",X.search_zero_state="LATENCY_ACTION_SEARCH_ZERO_STATE",X.secret_code="LATENCY_ACTION_KIDS_SECRET_CODE",X.seek="LATENCY_ACTION_PLAYER_SEEK",X.settings="LATENCY_ACTION_SETTINGS",X.store="LATENCY_ACTION_STORE",X.supervision_dashboard="LATENCY_ACTION_KIDS_SUPERVISION_DASHBOARD",X.tenx="LATENCY_ACTION_TENX",X.video_preview="LATENCY_ACTION_VIDEO_PREVIEW",X.video_to_ad="LATENCY_ACTION_VIDEO_TO_AD",X.watch="LATENCY_ACTION_WATCH",X.watch_it_again="LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",
X["watch,watch7"]="LATENCY_ACTION_WATCH",X["watch,watch7_html5"]="LATENCY_ACTION_WATCH",X["watch,watch7ad"]="LATENCY_ACTION_WATCH",X["watch,watch7ad_html5"]="LATENCY_ACTION_WATCH",X.wn_comments="LATENCY_ACTION_LOAD_COMMENTS",X.ww_rqs="LATENCY_ACTION_WHO_IS_WATCHING",X.voice_assistant="LATENCY_ACTION_VOICE_ASSISTANT",X.cast_load_by_entity_to_watch="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",X.networkless_performance="LATENCY_ACTION_NETWORKLESS_PERFORMANCE",X.gel_compression="LATENCY_ACTION_GEL_COMPRESSION",
X.gel_jspb_serialize="LATENCY_ACTION_GEL_JSPB_SERIALIZE",X.attestation_challenge_fetch="LATENCY_ACTION_ATTESTATION_CHALLENGE_FETCH",X);function xw(a,b){jq.call(this,1,arguments);this.timer=b}
w(xw,jq);var yw=new kq("aft-recorded",xw);E("ytLoggingGelSequenceIdObj_",D.ytLoggingGelSequenceIdObj_||{});var zw=D.ytLoggingLatencyUsageStats_||{};E("ytLoggingLatencyUsageStats_",zw);function Aw(){this.h=0}
function Bw(){Aw.instance||(Aw.instance=new Aw);return Aw.instance}
Aw.prototype.tick=function(a,b,c,d){Cw(this,"tick_"+a+"_"+b)||no("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c,cttAuthInfo:d})};
Aw.prototype.info=function(a,b,c){var d=Object.keys(a).join("");Cw(this,"info_"+d+"_"+b)||(a=Object.assign({},a),a.clientActionNonce=b,no("latencyActionInfo",a,{cttAuthInfo:c}))};
Aw.prototype.jspbInfo=function(){};
Aw.prototype.span=function(a,b,c){var d=Object.keys(a).join("");Cw(this,"span_"+d+"_"+b)||(a.clientActionNonce=b,no("latencyActionSpan",a,{cttAuthInfo:c}))};
function Cw(a,b){zw[b]=zw[b]||{count:0};var c=zw[b];c.count++;c.time=V();a.h||(a.h=yn(function(){var d=V(),e;for(e in zw)zw[e]&&d-zw[e].time>6E4&&delete zw[e];a&&(a.h=0)},5E3));
return c.count>5?(c.count===6&&Math.random()*1E5<1&&(c=new U("CSI data exceeded logging limit with key",b.split("_")),b.indexOf("plev")>=0||W(c)),!0):!1}
;var Dw=window;function Ew(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
function Fw(){var a;if(T("csi_use_performance_navigation_timing")||T("csi_use_performance_navigation_timing_tvhtml5")){var b,c,d,e=Y==null?void 0:(a=Y.getEntriesByType)==null?void 0:(b=a.call(Y,"navigation"))==null?void 0:(c=b[0])==null?void 0:(d=c.toJSON)==null?void 0:d.call(c);e?(e.requestStart=Gw(e.requestStart),e.responseEnd=Gw(e.responseEnd),e.redirectStart=Gw(e.redirectStart),e.redirectEnd=Gw(e.redirectEnd),e.domainLookupEnd=Gw(e.domainLookupEnd),e.connectStart=Gw(e.connectStart),e.connectEnd=
Gw(e.connectEnd),e.responseStart=Gw(e.responseStart),e.secureConnectionStart=Gw(e.secureConnectionStart),e.domainLookupStart=Gw(e.domainLookupStart),e.isPerformanceNavigationTiming=!0,a=e):a=Y.timing}else a=T("csi_performance_timing_to_object")?JSON.parse(JSON.stringify(Y.timing)):Y.timing;return a}
function Gw(a){return Math.round(Hw()+a)}
function Hw(){return(T("csi_use_time_origin")||T("csi_use_time_origin_tvhtml5"))&&Y.timeOrigin?Math.floor(Y.timeOrigin):Y.timing.navigationStart}
var Y=Dw.performance||Dw.mozPerformance||Dw.msPerformance||Dw.webkitPerformance||new Ew;var Iw=!1,Jw=!1,Kw={'script[name="scheduler/scheduler"]':"sj",'script[name="player/base"]':"pj",'link[rel="preload"][name="player/embed"]':"pej",'link[rel="stylesheet"][name="www-player"]':"pc",'link[rel="stylesheet"][name="player/www-player"]':"pc",'script[name="desktop_polymer/desktop_polymer"]':"dpj",'link[rel="import"][name="desktop_polymer"]':"dph",'script[name="mobile-c3"]':"mcj",'link[rel="stylesheet"][name="mobile-c3"]':"mcc",'script[name="player-plasma-ias-phone/base"]':"mcppj",'script[name="player-plasma-ias-tablet/base"]':"mcptj",
'link[rel="stylesheet"][name="mobile-polymer-player-ias"]':"mcpc",'link[rel="stylesheet"][name="mobile-polymer-player-svg-ias"]':"mcpsc",'script[name="mobile_blazer_core_mod"]':"mbcj",'link[rel="stylesheet"][name="mobile_blazer_css"]':"mbc",'script[name="mobile_blazer_logged_in_users_mod"]':"mbliuj",'script[name="mobile_blazer_logged_out_users_mod"]':"mblouj",'script[name="mobile_blazer_noncore_mod"]':"mbnj","#player_css":"mbpc",'script[name="mobile_blazer_desktopplayer_mod"]':"mbpj",'link[rel="stylesheet"][name="mobile_blazer_tablet_css"]':"mbtc",
'script[name="mobile_blazer_watch_mod"]':"mbwj",'script[name="embed_client"]':"ecj",'link[rel="stylesheet"][name="embed-ui"]':"ecc"};Xa(Y.clearResourceTimings||Y.webkitClearResourceTimings||Y.mozClearResourceTimings||Y.msClearResourceTimings||Y.oClearResourceTimings||ai,Y);function Lw(a,b){if(!T("web_csi_action_sampling_enabled")||!nw(b).actionDisabled){var c=vw(b||"");qv(c.info,a);a.loadType&&(c=a.loadType,pw(b).loadType=c);qv(sw(b),a);c=tw(b);b=nw(b).cttAuthInfo;Bw().info(a,c,b)}}
function Mw(){var a,b,c,d;return((d=Ls().resolve(Fs(Xp))==null?void 0:(a=Yp())==null?void 0:(b=a.loggingHotConfig)==null?void 0:(c=b.csiConfig)==null?void 0:c.debugTicks)!=null?d:[]).map(function(e){return Object.values(e)[0]})}
function Z(a,b,c){if(!T("web_csi_action_sampling_enabled")||!nw(c).actionDisabled){var d=tw(c),e;if(e=T("web_csi_debug_sample_enabled")&&d){(Ls().resolve(Fs(Xp))==null?0:Yp())&&!Jw&&(Jw=!0,Z("gcfl",V(),c));var f,g,h;e=(Ls().resolve(Fs(Xp))==null?void 0:(f=Yp())==null?void 0:(g=f.loggingHotConfig)==null?void 0:(h=g.csiConfig)==null?void 0:h.debugSampleWeight)||0;if(f=e!==0)b:{f=Mw();if(f.length>0)for(g=0;g<f.length;g++)if(a===f[g]){f=!0;break b}f=!1}if(f){for(g=f=0;g<d.length;g++)f=f*31+d.charCodeAt(g),
g<d.length-1&&(f%=0x800000000000);e=f%1E5%e!==0;nw(c).debugTicksExcludedLogged||(f={},f.debugTicksExcluded=e,Lw(f,c));nw(c).debugTicksExcludedLogged=!0}else e=!1}if(!e){if(a[0]!=="_"&&(e=a,f=b,Y.mark))if(e.startsWith("mark_")||(e="mark_"+e),c&&(e+=" ("+c+")"),f===void 0||T("web_csi_disable_alt_time_performance_mark"))Y.mark(e);else{f=T("csi_use_performance_navigation_timing")||T("csi_use_performance_navigation_timing_tvhtml5")?f-Y.timeOrigin:f-(Y.timeOrigin||Y.timing.navigationStart);try{Y.mark(e,
{startTime:f})}catch(k){}}e=vw(c||"");e.tick[a]=b||V();if(e.callback&&e.callback[a])for(e=y(e.callback[a]),f=e.next();!f.done;f=e.next())f=f.value,f();e=rw(c);e.gelTicks&&(e.gelTicks[a]=!0);f=qw(c);e=b||V();T("log_repeated_ytcsi_ticks")?a in f||(f[a]=e):f[a]=e;f=nw(c).cttAuthInfo;a==="_start"?(a=Bw(),Cw(a,"baseline_"+d)||no("latencyActionBaselined",{clientActionNonce:d},{timestamp:b,cttAuthInfo:f})):Bw().tick(a,d,b,f);Nw(c);return e}}}
function Ow(){var a=document;if("visibilityState"in a)a=a.visibilityState;else{var b=Yr+"VisibilityState";a=b in a?a[b]:void 0}switch(a){case "hidden":return 0;case "visible":return 1;case "prerender":return 2;case "unloaded":return 3;default:return-1}}
function Pw(){function a(f,g,h){g=g.match("_rid")?g.split("_rid")[0]:g;typeof h==="number"&&(h=JSON.stringify(h));f.requestIds?f.requestIds.push({endpoint:g,id:h}):f.requestIds=[{endpoint:g,id:h}]}
for(var b={},c=y(Object.entries(S("TIMING_INFO",{}))),d=c.next();!d.done;d=c.next()){var e=y(d.value);d=e.next().value;e=e.next().value;switch(d){case "GetBrowse_rid":a(b,d,e);break;case "GetGuide_rid":a(b,d,e);break;case "GetHome_rid":a(b,d,e);break;case "GetPlayer_rid":a(b,d,e);break;case "GetSearch_rid":a(b,d,e);break;case "GetSettings_rid":a(b,d,e);break;case "GetTrending_rid":a(b,d,e);break;case "GetWatchNext_rid":a(b,d,e);break;case "yt_red":b.isRedSubscriber=!!e;break;case "yt_ad":b.isMonetized=
!!e}}return b}
function Qw(a,b){a=document.querySelector(a);if(!a)return!1;var c="",d=a.nodeName;d==="SCRIPT"?(c=a.src,c||(c=a.getAttribute("data-timing-href"))&&(c=window.location.protocol+c)):d==="LINK"&&(c=a.href);zb(document)&&a.setAttribute("nonce",zb(document));return c?(a=Y.getEntriesByName(c))&&a[0]&&(a=a[0],c=Hw(),Z("rsf_"+b,c+Math.round(a.fetchStart)),Z("rse_"+b,c+Math.round(a.responseEnd)),a.transferSize!==void 0&&a.transferSize===0)?!0:!1:!1}
function Rw(){var a=window.location.protocol,b=Y.getEntriesByType("resource");b=Nb(b,function(c){return c.name.indexOf(a+"//fonts.gstatic.com/s/")===0});
(b=Pb(b,function(c,d){return d.duration>c.duration?d:c},{duration:0}))&&b.startTime>0&&b.responseEnd>0&&(Z("wffs",Gw(b.startTime)),Z("wffe",Gw(b.responseEnd)))}
function Sw(a){var b=Tw("aft",a);if(b)return b;b=S((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=b.length,d=0;d<c;d++){var e=Tw(b[d],a);if(e)return e}return NaN}
function Tw(a,b){if(a=qw(b)[a])return typeof a==="number"?a:a[a.length-1]}
function Nw(a){var b=Tw("_start",a),c=Sw(a),d=T("enable_cow_info_csi")||!Iw;b&&c&&d&&(pq(yw,new xw(Math.round(c-b),a)),Iw=!0)}
function Uw(){if(Y.getEntriesByType){var a=Y.getEntriesByType("paint");if(a=Qb(a,function(c){return c.name==="first-paint"}))return Gw(a.startTime)}var b;
T("csi_use_performance_navigation_timing")||T("csi_use_performance_navigation_timing_tvhtml5")?b=Y.getEntriesByType("first-paint")[0].startTime:b=Y.timing.Mh;return b?Math.max(0,b):0}
;function Vw(a,b){Yl(function(){vw("").info.actionType=a;b&&Ul("TIMING_AFT_KEYS",b);Ul("TIMING_ACTION",a);var c=Pw();Object.keys(c).length>0&&Lw(c);c={isNavigation:!0,actionType:ww[S("TIMING_ACTION")]||"LATENCY_ACTION_UNKNOWN"};var d=S("PREVIOUS_ACTION");d&&(c.previousAction=ww[d]||"LATENCY_ACTION_UNKNOWN");if(d=S("CLIENT_PROTOCOL"))c.httpProtocol=d;if(d=S("CLIENT_TRANSPORT"))c.transportProtocol=d;(d=uu())&&d!=="UNDEFINED_CSN"&&(c.clientScreenNonce=d);d=Ow();if(d===1||d===-1)c.isVisible=!0;pw();ow();
c.loadType="cold";d=ow();var e=Fw(),f=Hw(),g=S("CSI_START_TIMESTAMP_MILLIS",0);g>0&&!T("embeds_web_enable_csi_start_override_killswitch")&&(f=g);f&&(Z("srt",e.responseStart),d.prerender!==1&&Z("_start",f,void 0));d=Uw();d>0&&Z("fpt",d);d=Fw();d.isPerformanceNavigationTiming&&Lw({performanceNavigationTiming:!0},void 0);Z("nreqs",d.requestStart,void 0);Z("nress",d.responseStart,void 0);Z("nrese",d.responseEnd,void 0);d.redirectEnd-d.redirectStart>0&&(Z("nrs",d.redirectStart,void 0),Z("nre",d.redirectEnd,
void 0));d.domainLookupEnd-d.domainLookupStart>0&&(Z("ndnss",d.domainLookupStart,void 0),Z("ndnse",d.domainLookupEnd,void 0));d.connectEnd-d.connectStart>0&&(Z("ntcps",d.connectStart,void 0),Z("ntcpe",d.connectEnd,void 0));d.secureConnectionStart>=Hw()&&d.connectEnd-d.secureConnectionStart>0&&(Z("nstcps",d.secureConnectionStart,void 0),Z("ntcpe",d.connectEnd,void 0));Y&&"getEntriesByType"in Y&&Rw();d=[];if(document.querySelector&&Y&&Y.getEntriesByName)for(var h in Kw)Kw.hasOwnProperty(h)&&(e=Kw[h],
Qw(h,e)&&d.push(e));if(d.length>0)for(c.resourceInfo=[],h=y(d),d=h.next();!d.done;d=h.next())c.resourceInfo.push({resourceCache:d.value});Lw(c);c=rw();c.preLoggedGelInfos||(c.preLoggedGelInfos=[]);h=c.preLoggedGelInfos;c=sw();d=void 0;for(e=0;e<h.length;e++)if(f=h[e],f.loadType){d=f.loadType;break}if(pw().loadType==="cold"&&(c.loadType==="cold"||d==="cold")){d=qw();e=rw();e=e.gelTicks?e.gelTicks:e.gelTicks={};for(var k in d)if(!(k in e))if(typeof d[k]==="number")Z(k,Tw(k));else if(T("log_repeated_ytcsi_ticks"))for(f=
y(d[k]),g=f.next();!g.done;g=f.next())g=g.value,Z(k.slice(1),g);k={};d=!1;h=y(h);for(e=h.next();!e.done;e=h.next())d=e.value,qv(c,d),qv(k,d),d=!0;d&&Lw(k)}E("ytglobal.timingready_",!0);k=S("TIMING_ACTION");F("ytglobal.timingready_")&&k&&Ww()&&Sw()&&Nw()})()}
function Ww(a){return Yl(function(){return Xw("_start",a)})()}
function Yw(a,b,c){Yl(Lw)(a,b,c===void 0?!1:c)}
function Zw(a,b,c){return Yl(Z)(a,b,c)}
function Xw(a,b){return Yl(function(){var c=qw(b);return a in c})()}
function $w(a){if(!T("universal_csi_network_ticks"))return"";a=$b(ac(5,a))||"";for(var b=Object.keys(hq),c=0;c<b.length;c++){var d=b[c];if(a.includes(d))return d}return""}
function ax(a){if(!T("universal_csi_network_ticks"))return function(){};
var b=hq[a];return b?(bx(b),function(){var c=T("universal_csi_network_ticks")?(c=iq[a])?bx(c):!1:!1;return c}):function(){}}
function bx(a){return Yl(function(){if(Xw(a))return!1;Zw(a,void 0,void 0);return!0})()}
function cx(a){Yl(function(){if(!Ww("attestation_challenge_fetch")||Xw(a,"attestation_challenge_fetch"))return!1;Zw(a,void 0,"attestation_challenge_fetch");return!0})()}
function dx(){Yl(function(){var a=tw();requestAnimationFrame(function(){setTimeout(function(){a===tw()&&Zw("ol",void 0,void 0)},0)})})()}
var ex=window;ex.ytcsi&&(ex.ytcsi.infoGel=Yw,ex.ytcsi.tick=Zw);function fx(a,b){var c=C.apply(2,arguments);a=a===void 0?0:a;U.call(this,b,c);this.errorType=a;Object.setPrototypeOf(this,this.constructor.prototype)}
w(fx,U);var gx="tokens consistency mss client_location entities adblock_detection response_received_commands store PLAYER_PRELOAD shorts_prefetch".split(" "),hx=["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse","type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.PlayerResponse"];function ix(a,b,c,d){this.u=a;this.fa=b;this.j=c;this.o=d;this.i=void 0;this.h=new Map;a.Zb||(a.Zb={});a.Zb=Object.assign({},mw,a.Zb)}
function jx(a,b,c,d){if(ix.instance!==void 0){if(d=ix.instance,a=[a!==d.u,b!==d.fa,c!==d.j,!1,!1,!1,void 0!==d.i],a.some(function(e){return e}))throw new U("InnerTubeTransportService is already initialized",a);
}else ix.instance=new ix(a,b,c,d)}
function kx(a){var b={signalServiceEndpoint:{signal:"GET_DATASYNC_IDS"}};var c=c===void 0?cn:c;var d=lx(a,b);return d?new ci(function(e,f){var g,h,k,l,m;return B(function(n){switch(n.h){case 1:return n.yield(d,2);case 2:g=n.i;h=g.u(b,void 0,c);if(!h){f(new U("Error: Failed to build request for command.",b));n.A(0);break}Pv(h.input);l=((k=h.Za)==null?void 0:k.mode)==="cors"?"cors":void 0;if(a.j.Kd){m=mx(h.config,l);n.A(4);break}return n.yield(nx(h.config,l),5);case 5:m=n.i;case 4:e(ox(a,h,m)),n.h=
0}})}):hi(new U("Error: No request builder found for command.",b))}
function px(a,b){function c(){}
var d="/youtubei/v1/"+hw(Xu);var e=e===void 0?{Ob:{identity:cn}}:e;var f=f===void 0?!0:f;c=ax($w(d));b.context||(b.context=aw(void 0,f));return new ci(function(g){var h,k,l,m,n;return B(function(p){if(p.h==1)return h=Eu(d),k=km(h)?"same-origin":"cors",a.j.Kd?(l=mx(e,k),p.A(2)):p.yield(nx(e,k),3);p.h!=2&&(l=p.i);m=Fu(Eu(d));n={input:m,Za:Gu(m),Ga:b,config:e};g(ox(a,n,l,c));p.h=0})})}
function qx(a,b,c){var d;if(b&&!(b==null?0:(d=b.sequenceMetaData)==null?0:d.skipProcessing)&&a.o){d=y(gx);for(var e=d.next();!e.done;e=d.next())e=e.value,a.o[e]&&a.o[e].handleResponse(b,c)}}
function ox(a,b,c,d){d=d===void 0?function(){}:d;
var e,f,g,h,k,l,m,n,p,t,v,x,z,H,K,ca,da,Oa,Lb,ka,Za,Qa,Ra,Pa,eh,fh,is,js,ks,ls;return B(function(ja){switch(ja.h){case 1:ja.A(2);break;case 3:if((e=ja.i)&&!e.isExpired())return ja.return(Promise.resolve(e.h()));case 2:if(!((f=b)==null?0:(g=f.Ga)==null?0:g.context)){ja.A(4);break}h=b.Ga.context;ja.A(5);break;case 5:k=y([]),l=k.next();case 8:if(l.done){ja.A(4);break}m=l.value;return ja.yield(m.Nh(h),9);case 9:l=k.next();ja.A(8);break;case 4:if((n=a.i)==null||!n.Th(b.input,b.Ga)){ja.A(12);break}return ja.yield(a.i.Hh(b.input,
b.Ga),13);case 13:return p=ja.i,qx(a,p,b),ja.return(p);case 12:return(x=(v=b.config)==null?void 0:v.Qh)&&a.h.has(x)?t=a.h.get(x):(z=JSON.stringify(b.Ga),ca=(K=(H=b.Za)==null?void 0:H.headers)!=null?K:{},b.Za=Object.assign({},b.Za,{headers:Object.assign({},ca,c)}),da=Object.assign({},b.Za),b.Za.method==="POST"&&(da=Object.assign({},da,{body:z})),((Oa=b.config)==null?0:Oa.We)&&Zw(b.config.We),Lb=function(){return a.fa.fetch(b.input,da,b.config)},t=Lb(),x&&a.h.set(x,t)),ja.yield(t,14);
case 14:if((ka=ja.i)&&"error"in ka&&((Za=ka)==null?0:(Qa=Za.error)==null?0:Qa.details))for(Ra=ka.error.details,Pa=y(Ra),eh=Pa.next();!eh.done;eh=Pa.next())fh=eh.value,(is=fh["@type"])&&hx.indexOf(is)>-1&&(delete fh["@type"],ka=fh);x&&a.h.has(x)&&a.h.delete(x);((js=b.config)==null?0:js.Xe)&&Zw(b.config.Xe);if(ka||(ks=a.i)==null||!ks.vh(b.input,b.Ga)){ja.A(15);break}return ja.yield(a.i.Gh(b.input,b.Ga),16);case 16:ka=ja.i;case 15:return qx(a,ka,b),((ls=b.config)==null?0:ls.Te)&&Zw(b.config.Te),d(),
ja.return(ka||void 0)}})}
function lx(a,b){a:{a=a.u;var c,d=(c=kt(b,Bl))==null?void 0:c.signal;if(d&&a.Zb&&(c=a.Zb[d])){var e=c();break a}var f;if((c=(f=kt(b,zl))==null?void 0:f.request)&&a.ge&&(f=a.ge[c])){e=f();break a}for(e in b)if(a.od[e]&&(b=a.od[e])){e=b();break a}e=void 0}if(e!==void 0)return Promise.resolve(e)}
function nx(a,b){var c,d,e,f;return B(function(g){if(g.h==1){e=(c=a)==null?void 0:(d=c.Ob)==null?void 0:d.sessionIndex;var h=g.yield;var k=bn(0,{sessionIndex:e});if(!(k instanceof ci)){var l=new ci(ai);di(l,2,k);k=l}return h.call(g,k,2)}f=g.i;return g.return(Promise.resolve(Object.assign({},bw(b),f)))})}
function mx(a,b){var c;a=a==null?void 0:(c=a.Ob)==null?void 0:c.sessionIndex;c=bn(0,{sessionIndex:a});return Object.assign({},bw(b),c)}
;var rx=new Ds("INNERTUBE_TRANSPORT_TOKEN");function sx(){}
w(sx,jw);sx.prototype.j=function(){return cv};
sx.prototype.i=function(a){return kt(a,Ll)||void 0};
sx.prototype.h=function(a,b,c){c=c===void 0?{}:c;b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params);c.botguardResponse&&(a.botguardResponse=c.botguardResponse);c.feature&&(a.clientFeature=c.feature)};
fa.Object.defineProperties(sx.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});function tx(){}
w(tx,jw);tx.prototype.j=function(){return dv};
tx.prototype.i=function(a){return kt(a,Kl)||void 0};
tx.prototype.h=function(a,b){b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params)};
fa.Object.defineProperties(tx.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});var ux=new Ds("SHARE_CLIENT_PARAMS_PROVIDER_TOKEN");function vx(a){this.M=a}
w(vx,jw);vx.prototype.j=function(){return Yu};
vx.prototype.i=function(a){return kt(a,Fl)||kt(a,Gl)||kt(a,El)};
vx.prototype.h=function(a,b){b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);if(b.clientParamIdentifier){var c;if((c=this.M)==null?0:c.h(b.clientParamIdentifier))a.clientParams=this.M.i(b.clientParamIdentifier)}};
vx[Cs]=[ux];function wx(){}
w(wx,jw);wx.prototype.j=function(){return $u};
wx.prototype.i=function(a){return kt(a,Dl)||void 0};
wx.prototype.h=function(a,b,c){a.feedbackTokens=[];b.feedbackToken&&a.feedbackTokens.push(b.feedbackToken);if(b=b.cpn||c.cpn)a.feedbackContext={cpn:b};a.isFeedbackTokenUnencrypted=!!c.is_feedback_token_unencrypted;a.shouldMerge=!1;c.extra_feedback_tokens&&(a.shouldMerge=!0,a.feedbackTokens=a.feedbackTokens.concat(c.extra_feedback_tokens))};
fa.Object.defineProperties(wx.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});function xx(){}
w(xx,jw);xx.prototype.j=function(){return av};
xx.prototype.i=function(a){return kt(a,Jl)||void 0};
xx.prototype.h=function(a,b){b.params&&(a.params=b.params);b.secondaryParams&&(a.secondaryParams=b.secondaryParams)};function yx(){}
w(yx,jw);yx.prototype.j=function(){return bv};
yx.prototype.i=function(a){return kt(a,Il)||void 0};
yx.prototype.h=function(a,b){b.actions&&(a.actions=b.actions);b.params&&(a.params=b.params);b.playlistId&&(a.playlistId=b.playlistId)};function zx(){}
w(zx,jw);zx.prototype.j=function(){return Zu};
zx.prototype.i=function(a){return kt(a,Hl)};
zx.prototype.h=function(a,b,c){c=c===void 0?{}:c;b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);c.includeListId&&(a.includeListId=!0)};var Ax=new Ds("FETCH_FN_TOKEN"),Bx=new Ds("PARSE_FN_TOKEN"),Cx=new Ds("WINDOW_REQUEST_TOKEN");var Dx=new Ds("NETWORK_SLI_TOKEN");function Ex(a,b,c,d){this.h=a;this.i=b;this.j=c;this.o=d}
Ex.prototype.fetch=function(a,b,c){var d=this,e,f,g;return B(function(h){e=Fx(d,a,b);g=(f=d.i)!=null?f:fetch;return h.return(g(e).then(function(k){return d.handleResponse(k,c)}).catch(function(k){W(k);
if((c==null?0:c.qe)&&k instanceof fx&&k.errorType===1)return Promise.reject(k)}))})};
function Fx(a,b,c){if(a.h){var d=$b(ac(5,lc(b,"key")))||"/UNKNOWN_PATH";a.h.start(d)}d=c;T("wug_networking_gzip_request")&&(d=Rq(c));var e;return new ((e=a.o)!=null?e:window.Request)(b,d)}
Ex.prototype.handleResponse=function(a,b){var c,d=(c=this.j)!=null?c:JSON.parse;c=a.text().then(function(e){if((b==null?0:b.Ge)&&a.ok)return yf(b.Ge,e);e=e.replace(")]}'","");if((b==null?0:b.qe)&&e)try{var f=d(e)}catch(h){throw new fx(1,"JSON parsing failed after fetch");}var g;return(g=f)!=null?g:d(e)});
a.redirected||a.ok?this.h&&this.h.success():(this.h&&this.h.Bh(),c=c.then(function(e){W(new U("Error: API fetch failed",a.status,a.url,e));return Object.assign({},e,{errorMetadata:{status:a.status}})}));
return c};
Ex[Cs]=[Fs(Dx),Fs(Ax),Fs(Bx),Fs(Cx)];var Gx=new Ds("NETWORK_MANAGER_TOKEN");var Hx;function Ix(){var a,b;if(!Hx){var c=Ls();Hs(c,{Bc:Gx,Nd:Ex});var d={od:{feedbackEndpoint:ew(wx),modifyChannelNotificationPreferenceEndpoint:ew(xx),playlistEditEndpoint:ew(yx),shareEntityEndpoint:ew(vx),subscribeEndpoint:ew(sx),unsubscribeEndpoint:ew(tx),webPlayerShareEntityServiceEndpoint:ew(zx)}},e=$v(),f={};e&&(f.client_location=e);a===void 0&&(a=an());b===void 0&&(b=c.resolve(Gx));jx(d,b,a,f);Hs(c,{Bc:rx,Od:ix.instance});Hx=c.resolve(rx)}return Hx}
;function Jx(a){var b=new bj;if(a.interpreterJavascript){var c=rl(a.interpreterJavascript);c=Cb(c).toString();var d=new $i;vf(d,6,c);qf(b,$i,1,d)}else a.interpreterUrl&&(c=sl(a.interpreterUrl),c=jb(c).toString(),d=new aj,vf(d,4,c),qf(b,aj,2,d));a.interpreterHash&&wf(b,3,a.interpreterHash);a.program&&wf(b,4,a.program);a.globalName&&wf(b,5,a.globalName);a.clientExperimentsStateBlob&&wf(b,7,a.clientExperimentsStateBlob);return b}
function Kx(a){var b={};a=y(a.split("&"));for(var c=a.next();!c.done;c=a.next())c=c.value.split("="),c.length===2&&(b[c[0]]=c[1]);return b}
;function vc(){if(T("bg_st_hr"))return"havuokmhhs-0";var a,b=((a=performance)==null?void 0:a.timeOrigin)||0;return"havuokmhhs-"+Math.floor(b)}
function Lx(a){this.h=a}
Lx.prototype.bindInnertubeChallengeFetcher=function(a){this.h.bicf(a)};
Lx.prototype.registerChallengeFetchedCallback=function(a){this.h.bcr(a)};
Lx.prototype.getLatestChallengeResponse=function(){return this.h.blc()};
function Mx(){return new Promise(function(a){var b=window.top;b.ntpevasrs!==void 0?a(new Lx(b.ntpevasrs)):(b.ntpqfbel===void 0&&(b.ntpqfbel=[]),b.ntpqfbel.push(function(c){a(new Lx(c))}))})}
;var Nx=[],Ox=!1;function Px(){if(!T("disable_biscotti_fetch_for_ad_blocker_detection")&&!T("disable_biscotti_fetch_entirely_for_all_web_clients")&&Hu()){var a=S("PLAYER_VARS",{});if(gg(a)!="1"&&!Ju(a)){var b=function(){Ox=!0;"google_ad_status"in window?Ul("DCLKSTAT",1):Ul("DCLKSTAT",2)};
try{gv("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Nx.push(Dj.pa(function(){if(!(Ox||"google_ad_status"in window)){try{kv("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Ox=!0;Ul("DCLKSTAT",3)}},5E3))}}}
function Qx(){var a=Number(S("DCLKSTAT",0));return isNaN(a)?0:a}
;function Rx(a){this.h=a}
[new Rx("b.f_"),new Rx("j.s_"),new Rx("r.s_"),new Rx("e.h_"),new Rx("i.s_"),new Rx("s.t_"),new Rx("p.h_"),new Rx("s.i_"),new Rx("f.i_"),new Rx("a.b_"),new Rx("a.o_"),new Rx("g.o_"),new Rx("p.i_"),new Rx("p.m_"),new Rx("n.k_"),new Rx("i.f_"),new Rx("a.s_"),new Rx("m.c_"),new Rx("n.h_"),new Rx("o.p_")].reduce(function(a,b){a[b.h]=b;return a},{});function Sx(a,b,c){var d=this;this.network=a;this.options=b;this.o=c;this.h=null;if(b.Yh){var e=new fj;this.h=e.promise;D.ytAtRC&&Dj.Ra(function(){var f,g;return B(function(h){if(h.h==1){if(!D.ytAtRC)return h.return();f=Tx(null);return h.yield(d.hb(f),2)}g=h.i;D.ytAtRC&&D.ytAtRC(JSON.stringify(g));h.h=0})},2);
Mx().then(function(f){var g,h,k,l;return B(function(m){if(m.h==1)return f.bindInnertubeChallengeFetcher(function(n){return d.hb(Tx(n))}),m.yield(uc(),2);
g=m.i;h=f.getLatestChallengeResponse();k=h.challenge;if(!k)throw Error("BGE_MACIL");l={challenge:k,fb:Kx(k),vm:g,bgChallenge:new bj};e.resolve(l);f.registerChallengeFetchedCallback(function(n){n=n.challenge;if(!n)throw Error("BGE_MACR");n={challenge:n,fb:Kx(n),vm:g,bgChallenge:new bj};d.h=Promise.resolve(n)});
m.h=0})})}else b.preload&&Ux(this,new Promise(function(f){yn(function(){f(Vx(d))},0)}))}
Sx.prototype.j=function(){var a=this;return B(function(b){return b.h==1?b.yield(Promise.race([a.h,null]),2):b.return(!!b.i)})};
Sx.prototype.i=function(a,b,c){var d=this,e,f,g;return B(function(h){d.h===null&&Ux(d,Vx(d));e=!1;f={};g=function(){var k,l,m;return B(function(n){switch(n.h){case 1:return n.yield(d.h,2);case 2:k=n.i;f.challenge=k.challenge;if(!k.vm){"c1a"in k.fb&&(f.error="ATTESTATION_ERROR_VM_NOT_INITIALIZED");n.A(3);break}l=Object.assign({},{c:k.challenge,e:a},b);ya(n,4);e=!0;if(T("attbs")&&!T("attmusi")){m=k.vm.dd({wb:l});n.A(6);break}return n.yield(k.vm.snapshot({wb:l}),7);case 7:m=n.i;case 6:m?f.webResponse=
m:f.error="ATTESTATION_ERROR_VM_NO_RESPONSE";za(n,3);break;case 4:Aa(n),f.error="ATTESTATION_ERROR_VM_INTERNAL_ERROR";case 3:if(a==="ENGAGEMENT_TYPE_PLAYBACK"){var p=k.fb,t={};p.c6a&&(t.reportingStatus=String(Number(p.c)^Qx()));p.c6b&&(t.broadSpectrumDetectionResult=String(Number(p.c)^Number(S("CATSTAT",0))));f.adblockReporting=t}return n.return(f)}})};
return h.return(Promise.race([g(),Wx(c,function(){var k=Object.assign({},f);e&&(k.error="ATTESTATION_ERROR_VM_TIMEOUT");return k})]))})};
function Tx(a){var b={engagementType:"ENGAGEMENT_TYPE_UNBOUND"};a&&(b.interpreterHash=a);return b}
function Vx(a,b){b=b===void 0?0:b;var c,d,e,f,g,h,k,l,m,n,p,t;return B(function(v){switch(v.h){case 1:c=Tx(kj().h);if(T("att_fet_ks"))return ya(v,7),v.yield(a.hb(c),9);ya(v,4);return v.yield(Xx(a,c),6);case 6:g=v.i;e=g.Oe;f=g.Pe;d=g;za(v,3);break;case 4:return Aa(v),W(Error("Failed to fetch attestation challenge after "+(b+" attempts; not retrying for 24h."))),Yx(a,864E5),v.return({challenge:"",fb:{},vm:void 0,bgChallenge:void 0});case 9:d=v.i;if(!d)throw Error("Fetching Attestation challenge returned falsy");
if(!d.challenge)throw Error("Missing Attestation challenge");e=d.challenge;f=Kx(e);if("c1a"in f&&(!d.bgChallenge||!d.bgChallenge.program))throw Error("Expected bg challenge but missing.");za(v,3);break;case 7:h=Aa(v);W(h);b++;if(b>=5)return W(Error("Failed to fetch attestation challenge after "+(b+" attempts; not retrying for 24h."))),Yx(a,864E5),v.return({challenge:"",fb:{},vm:void 0,bgChallenge:void 0});k=1E3*Math.pow(2,b-1)+Math.random()*1E3;return v.return(new Promise(function(x){yn(function(){x(Vx(a,
b))},k)}));
case 3:l=Number(f.t)||7200;Yx(a,l*1E3);m=void 0;if(!("c1a"in f&&d.bgChallenge)){v.A(10);break}n=Jx(d.bgChallenge);ya(v,11);return v.yield(lj(kj(),n),13);case 13:za(v,12);break;case 11:return p=Aa(v),W(p),v.return({challenge:e,fb:f,vm:m,bgChallenge:n});case 12:return ya(v,14),m=new hj({challenge:n,yd:{Da:"aGIf"}}),v.yield(m.Yc,16);case 16:za(v,10);break;case 14:t=Aa(v),W(t),m=void 0;case 10:return v.return({challenge:e,fb:f,vm:m,bgChallenge:n})}})}
Sx.prototype.hb=function(a){var b=this,c;return B(function(d){c=b.o;if(!c||c.ta())return d.return(b.network.hb(a));cx("att_pna");return d.return(new Promise(function(e){Ih(c,"publicytnetworkstatus-online",function(){b.network.hb(a).then(e)})}))})};
function Zx(a){if(!a)throw Error("Fetching Attestation challenge returned falsy");if(!a.challenge)throw Error("Missing Attestation challenge");var b=a.challenge,c=Kx(b);if("c1a"in c&&(!a.bgChallenge||!a.bgChallenge.program))throw Error("Expected bg challenge but missing.");return Object.assign({},a,{Oe:b,Pe:c})}
function Xx(a,b){var c,d,e,f,g;return B(function(h){switch(h.h){case 1:c=void 0,d=0,e={};case 2:if(!(d<5)){h.A(4);break}if(!(d>0)){h.A(5);break}e.ld=1E3*Math.pow(2,d-1)+Math.random()*1E3;return h.yield(new Promise(function(k){return function(l){yn(function(){l(void 0)},k.ld)}}(e)),5);
case 5:return ya(h,7),h.yield(a.hb(b),9);case 9:return f=h.i,h.return(Zx(f));case 7:c=g=Aa(h),g instanceof Error&&W(g);case 8:d++;e={ld:void 0};h.A(2);break;case 4:throw c;}})}
function Ux(a,b){a.h=b}
function $x(a){var b,c,d;return B(function(e){if(e.h==1)return e.yield(Promise.race([a.h,null]),2);b=e.i;var f=Vx(a);a.h=f;(c=b)==null||(d=c.vm)==null||d.dispose();e.h=0})}
function Yx(a,b){function c(){var e;return B(function(f){e=d-Date.now();return e<1E3?f.yield($x(a),0):(yn(c,Math.min(e,6E4)),f.A(0))})}
var d=Date.now()+b;c()}
function Wx(a,b){return new Promise(function(c){yn(function(){c(b())},a)})}
;function ay(){this.h=Ix()}
ay.prototype.hb=function(a){cx("att_fsr");return px(this.h,a).then(function(b){cx("att_frr");return b})};function by(){var a,b,c;return B(function(d){if(d.h==1)return a=Ls().resolve(rx),a?d.yield(kx(a),2):(W(Error("InnertubeTransportService unavailable in fetchDatasyncIds")),d.return(void 0));if(b=d.i){if(b.errorMetadata)return W(Error("Datasync IDs fetch responded with "+b.errorMetadata.status+": "+b.error)),d.return(void 0);c=b.yh;return d.return(c)}W(Error("Network request to get Datasync IDs failed."));return d.return(void 0)})}
;function cy(){var a;return(a=S("WEB_PLAYER_CONTEXT_CONFIGS"))==null?void 0:a.WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER}
;var dy=D.caches,ey;function fy(a){var b=a.indexOf(":");return b===-1?{Bd:a}:{Bd:a.substring(0,b),datasyncId:a.substring(b+1)}}
function gy(){return B(function(a){if(ey!==void 0)return a.return(ey);ey=new Promise(function(b){var c;return B(function(d){switch(d.h){case 1:return ya(d,2),d.yield(dy.open("test-only"),4);case 4:return d.yield(dy.delete("test-only"),5);case 5:za(d,3);break;case 2:if(c=Aa(d),c instanceof Error&&c.name==="SecurityError")return b(!1),d.return();case 3:b("caches"in window),d.h=0}})});
return a.return(ey)})}
function hy(a){var b,c,d,e,f,g,h;B(function(k){if(k.h==1)return k.yield(gy(),2);if(k.h!=3){if(!k.i)return k.return(!1);b=[];return k.yield(dy.keys(),3)}c=k.i;d=y(c);for(e=d.next();!e.done;e=d.next())f=e.value,g=fy(f),h=g.datasyncId,!h||a.includes(h)||b.push(dy.delete(f));return k.return(Promise.all(b).then(function(l){return l.some(function(m){return m})}))})}
function iy(){var a,b,c,d,e,f,g;return B(function(h){if(h.h==1)return h.yield(gy(),2);if(h.h!=3){if(!h.i)return h.return(!1);a=wn("cache contains other");return h.yield(dy.keys(),3)}b=h.i;c=y(b);for(d=c.next();!d.done;d=c.next())if(e=d.value,f=fy(e),(g=f.datasyncId)&&g!==a)return h.return(!0);return h.return(!1)})}
;function jy(){try{return!!self.sessionStorage}catch(a){return!1}}
;function ky(a){a=a.match(/(.*)::.*::.*/);if(a!==null)return a[1]}
function ly(a){if(jy()){var b=Object.keys(window.sessionStorage);b=y(b);for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=ky(c);d===void 0||a.includes(d)||self.sessionStorage.removeItem(c)}}}
function my(){if(!jy())return!1;var a=wn(),b=Object.keys(window.sessionStorage);b=y(b);for(var c=b.next();!c.done;c=b.next())if(c=ky(c.value),c!==void 0&&c!==a)return!0;return!1}
;function ny(){by().then(function(a){a&&(Cp(a),hy(a),Mv(a),ly(a))})}
function oy(){var a=new Jr;Dj.pa(function(){var b,c,d,e,f;return B(function(g){switch(g.h){case 1:if(T("ytidb_clear_optimizations_killswitch")){g.A(2);break}b=wn("clear");if(b.startsWith("V")&&b.endsWith("||")){var h=[b];Cp(h);hy(h);Mv(h);ly(h);return g.return()}c=Nv();d=my();return g.yield(iy(),3);case 3:return e=g.i,g.yield(Dp(),4);case 4:if(f=g.i,!(c||d||e||f))return g.return();case 2:a.ta()?ny():Ih(a,"publicytnetworkstatus-online",ny),g.h=0}})})}
;var py=["www.youtube-nocookie.com","www.youtubeeducation.com","youtube.googleapis.com"];function qy(){this.state=1;this.vm=null;this.h=void 0}
r=qy.prototype;r.initialize=function(a,b,c,d){this.h=d;if(a.program){var e;d=(e=a.interpreterUrl)!=null?e:null;if(a.interpreterSafeScript)e=rl(a.interpreterSafeScript);else{var f;e=(f=a.interpreterScript)!=null?f:null}a.interpreterSafeUrl&&(d=sl(a.interpreterSafeUrl).toString());ry(this,e,d,a.program,b,c)}else W(Error("BL:CIP"))};
function ry(a,b,c,d,e,f){var g=g===void 0?"trayride":g;c?(a.state=2,gv(c,function(){window[g]?sy(a,d,g,e):(a.state=3,iv(c),W(new U("BL:ULB",""+c)))},f)):b?(f=pg("SCRIPT"),b instanceof Ab?(f.textContent=Cb(b),Db(f)):f.textContent=b,f.nonce=zb(document),document.head.appendChild(f),document.head.removeChild(f),window[g]?sy(a,d,g,e):(a.state=4,W(new U("BL:ULBJ")))):W(new U("BL:ULV"))}
r.isLoading=function(){return this.state===2};
function sy(a,b,c,d){a.state=5;var e=!!a.h&&py.includes(bc(a.h)||"");try{var f=new hj({program:b,globalName:c,yd:{disable:!T("att_web_record_metrics")||!T("att_skip_metrics_for_cookieless_domains_ks")&&e,Da:"aGIf"}});f.Yc.then(function(){a.state=6;d&&d(b)});
a.Xc(f)}catch(g){a.state=7,g instanceof Error&&W(g)}}
r.invoke=function(a){a=a===void 0?{}:a;return this.gd()?this.Qd({wb:a}):null};
r.dispose=function(){this.Xc(null);this.state=8};
r.gd=function(){return!!this.vm};
r.Qd=function(a){return this.vm.dd(a)};
r.Xc=function(a){rc(this.vm);this.vm=a};function ty(){var a=F("yt.abuse.playerAttLoader");return a&&["bgvma","bgvmb","bgvmc"].every(function(b){return b in a})?a:null}
;function uy(){qy.apply(this,arguments)}
w(uy,qy);uy.prototype.Xc=function(a){var b;(b=ty())==null||b.bgvma();a?(b={bgvma:a.dispose.bind(a),bgvmb:a.snapshot.bind(a),bgvmc:a.dd.bind(a)},E("yt.abuse.playerAttLoader",b),E("yt.abuse.playerAttLoaderRun",function(c){return a.snapshot(c)})):(E("yt.abuse.playerAttLoader",null),E("yt.abuse.playerAttLoaderRun",null))};
uy.prototype.gd=function(){return!!ty()};
uy.prototype.Qd=function(a){return ty().bgvmc(a)};function vy(a){Vs.call(this,a===void 0?"document_active":a);var b=this;this.o=10;this.h=new Map;this.transitions=[{from:"document_active",to:"document_disposed_preventable",action:this.G},{from:"document_active",to:"document_disposed",action:this.u},{from:"document_disposed_preventable",to:"document_disposed",action:this.u},{from:"document_disposed_preventable",to:"flush_logs",action:this.M},{from:"document_disposed_preventable",to:"document_active",action:this.i},{from:"document_disposed",to:"flush_logs",
action:this.M},{from:"document_disposed",to:"document_active",action:this.i},{from:"document_disposed",to:"document_disposed",action:function(){}},
{from:"flush_logs",to:"document_active",action:this.i}];window.addEventListener("pagehide",function(c){b.transition("document_disposed",{event:c})});
window.addEventListener("beforeunload",function(c){b.transition("document_disposed_preventable",{event:c})})}
w(vy,Vs);vy.prototype.G=function(a,b){if(!this.h.get("document_disposed_preventable")){a(b==null?void 0:b.event);var c,d;if((b==null?0:(c=b.event)==null?0:c.defaultPrevented)||(b==null?0:(d=b.event)==null?0:d.returnValue)){b.event.returnValue||(b.event.returnValue=!0);b.event.defaultPrevented||b.event.preventDefault();this.h=new Map;this.transition("document_active");return}}this.h.set("document_disposed_preventable",!0);this.h.get("document_disposed")?this.transition("flush_logs"):this.transition("document_disposed")};
vy.prototype.u=function(a,b){this.h.get("document_disposed")?this.transition("document_active"):(a(b==null?void 0:b.event),this.h.set("document_disposed",!0),this.transition("flush_logs"))};
vy.prototype.M=function(a,b){a(b==null?void 0:b.event);this.transition("document_active")};
vy.prototype.i=function(){this.h=new Map};function wy(a){Vs.call(this,a===void 0?"document_visibility_unknown":a);var b=this;this.transitions=[{from:"document_visibility_unknown",to:"document_visible",action:this.i},{from:"document_visibility_unknown",to:"document_hidden",action:this.h},{from:"document_visibility_unknown",to:"document_foregrounded",action:this.M},{from:"document_visibility_unknown",to:"document_backgrounded",action:this.u},{from:"document_visible",to:"document_hidden",action:this.h},{from:"document_visible",to:"document_foregrounded",
action:this.M},{from:"document_visible",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_hidden",action:this.h},{from:"document_foregrounded",to:"document_foregrounded",action:this.M},{from:"document_hidden",to:"document_visible",action:this.i},{from:"document_hidden",to:"document_backgrounded",action:this.u},{from:"document_hidden",to:"document_hidden",action:this.h},{from:"document_backgrounded",to:"document_hidden",
action:this.h},{from:"document_backgrounded",to:"document_backgrounded",action:this.u},{from:"document_backgrounded",to:"document_visible",action:this.i}];document.addEventListener("visibilitychange",function(c){document.visibilityState==="visible"?b.transition("document_visible",{event:c}):b.transition("document_hidden",{event:c})});
T("visibility_lifecycles_dynamic_backgrounding")&&(window.addEventListener("blur",function(c){b.transition("document_backgrounded",{event:c})}),window.addEventListener("focus",function(c){b.transition("document_foregrounded",{event:c})}))}
w(wy,Vs);wy.prototype.i=function(a,b){a(b==null?void 0:b.event);T("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_foregrounded")};
wy.prototype.h=function(a,b){a(b==null?void 0:b.event);T("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_backgrounded")};
wy.prototype.u=function(a,b){a(b==null?void 0:b.event)};
wy.prototype.M=function(a,b){a(b==null?void 0:b.event)};function xy(){this.o=new vy;this.u=new wy}
xy.prototype.install=function(){var a=C.apply(0,arguments),b=this;a.forEach(function(c){b.o.install(c)});
a.forEach(function(c){b.u.install(c)})};function yy(){this.o=[];this.i=new Map;this.h=new Map;this.j=new Set}
yy.prototype.clickCommand=function(a,b,c){var d=a.clickTrackingParams;c=c===void 0?0:c;if(d)if(c=uu(c===void 0?0:c)){a=this.client;d=new nu({trackingParams:d});var e=void 0;if(T("no_client_ve_attach_unless_shown")){var f=Hv(d,c);Dv.set(f,!0);Iv(d,c)}e=e||"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";f=Gv({cttAuthInfo:wu(c)||void 0},c);d={csn:c,ve:d.getAsJson(),gestureType:e};b&&(d.clientData=b);c==="UNDEFINED_CSN"?Jv("visualElementGestured",f,d):a?Ut("visualElementGestured",d,a,f):no("visualElementGestured",
d,f);b=!0}else b=!1;else b=!1;return b};
yy.prototype.stateChanged=function(a,b,c){this.visualElementStateChanged(new nu({trackingParams:a}),b,c===void 0?0:c)};
yy.prototype.visualElementStateChanged=function(a,b,c){c=c===void 0?0:c;if(c===0&&this.j.has(c))this.o.push([a,b]);else{var d=c;d=d===void 0?0:d;c=uu(d);a||(a=(a=ru(d===void 0?0:d))?new nu({veType:a,youtubeData:void 0,jspbYoutubeData:void 0}):null);var e=a;c&&e&&(a=this.client,d=Gv({cttAuthInfo:wu(c)||void 0},c),b={csn:c,ve:e.getAsJson(),clientData:b},c==="UNDEFINED_CSN"?Jv("visualElementStateChanged",d,b):a?Ut("visualElementStateChanged",b,a,d):no("visualElementStateChanged",b,d))}};
function zy(a,b){if(b===void 0)for(var c=tu(),d=0;d<c.length;d++)c[d]!==void 0&&zy(a,c[d]);else a.i.forEach(function(e,f){(f=a.h.get(f))&&Fv(a.client,b,f,e)}),a.i.clear(),a.h.clear()}
;function Ay(){xy.call(this);var a={};this.install((a.document_disposed={callback:this.h},a));T("combine_ve_grafts")&&(a={},this.install((a.document_disposed={callback:this.i},a)));a={};this.install((a.flush_logs={callback:this.j},a));T("web_log_cfg_cee_ks")||yn(By)}
w(Ay,xy);Ay.prototype.j=function(){no("finalPayload",{csn:uu()})};
Ay.prototype.h=function(){hu(iu)};
Ay.prototype.i=function(){var a=zy;yy.instance||(yy.instance=new yy);a(yy.instance)};
function By(){var a=S("CLIENT_EXPERIMENT_EVENTS");if(a){var b=be();a=y(a);for(var c=a.next();!c.done;c=a.next())c=c.value,b(c)&&no("genericClientExperimentEvent",{eventType:c});delete Tl.CLIENT_EXPERIMENT_EVENTS}}
;function Cy(){}
function Dy(){var a=F("ytglobal.storage_");a||(a=new Cy,E("ytglobal.storage_",a));return a}
Cy.prototype.estimate=function(){var a,b,c;return B(function(d){a=navigator;return((b=a.storage)==null?0:b.estimate)?d.return(a.storage.estimate()):((c=a.webkitTemporaryStorage)==null?0:c.queryUsageAndQuota)?d.return(Ey()):d.return()})};
function Ey(){var a=navigator;return new Promise(function(b,c){var d;(d=a.webkitTemporaryStorage)!=null&&d.queryUsageAndQuota?a.webkitTemporaryStorage.queryUsageAndQuota(function(e,f){b({usage:e,quota:f})},function(e){c(e)}):c(Error("webkitTemporaryStorage is not supported."))})}
E("ytglobal.storageClass_",Cy);function lo(a,b){var c=this;this.handleError=a;this.h=b;this.i=!1;self.document===void 0||self.addEventListener("beforeunload",function(){c.i=!0});
this.j=Math.random()<=.2}
lo.prototype.Ha=function(a){this.handleError(a)};
lo.prototype.logEvent=function(a,b){switch(a){case "IDB_DATA_CORRUPTED":T("idb_data_corrupted_killswitch")||this.h("idbDataCorrupted",b);break;case "IDB_UNEXPECTEDLY_CLOSED":this.h("idbUnexpectedlyClosed",b);break;case "IS_SUPPORTED_COMPLETED":T("idb_is_supported_completed_killswitch")||this.h("idbIsSupportedCompleted",b);break;case "QUOTA_EXCEEDED":Fy(this,b);break;case "TRANSACTION_ENDED":this.j&&Math.random()<=.1&&this.h("idbTransactionEnded",b);break;case "TRANSACTION_UNEXPECTEDLY_ABORTED":a=
Object.assign({},b,{hasWindowUnloaded:this.i}),this.h("idbTransactionAborted",a)}};
function Fy(a,b){Dy().estimate().then(function(c){c=Object.assign({},b,{isSw:self.document===void 0,isIframe:self!==self.top,deviceStorageUsageMbytes:Gy(c==null?void 0:c.usage),deviceStorageQuotaMbytes:Gy(c==null?void 0:c.quota)});a.h("idbQuotaExceeded",c)})}
function Gy(a){return typeof a==="undefined"?"-1":String(Math.ceil(a/1048576))}
;var Hy={},Iy=(Hy["api.invalidparam"]=2,Hy.auth=150,Hy["drm.auth"]=150,Hy["heartbeat.net"]=150,Hy["heartbeat.servererror"]=150,Hy["heartbeat.stop"]=150,Hy["html5.unsupportedads"]=5,Hy["fmt.noneavailable"]=5,Hy["fmt.decode"]=5,Hy["fmt.unplayable"]=5,Hy["html5.missingapi"]=5,Hy["html5.unsupportedlive"]=5,Hy["drm.unavailable"]=5,Hy["mrm.blocked"]=151,Hy["embedder.identity.denied"]=152,Hy);var Jy=new Set("endSeconds startSeconds mediaContentUrl suggestedQuality videoId rct rctn playmuted muted_autoplay_duration_mode".split(" "));function Ky(a){return(a.search("cue")===0||a.search("load")===0)&&a!=="loadModule"}
function Ly(a,b,c){if(typeof a==="string")return{videoId:a,startSeconds:b,suggestedQuality:c};b={};c=y(Jy);for(var d=c.next();!d.done;d=c.next())d=d.value,a[d]&&(b[d]=a[d]);return b}
function My(a,b,c,d){if(Na(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};typeof a==="string"&&a.length===16?b.list="PL"+a:b.playlist=a;return b}
;function Ny(a){G.call(this);var b=this;this.api=a;this.Y=this.u=!1;this.D=[];this.P={};this.j=[];this.i=[];this.Z=!1;this.sessionId=this.h=null;this.targetOrigin="*";this.U=T("web_player_split_event_bus_iframe");this.o=S("POST_MESSAGE_ORIGIN")||document.location.protocol+"//"+document.location.hostname;this.G=function(c){a:if(!(b.o!=="*"&&c.origin!==b.o||b.h&&c.source!==b.h||typeof c.data!=="string")){try{var d=JSON.parse(c.data)}catch(h){break a}if(d)switch(d.event){case "listening":var e=c.source;
c=c.origin;d=d.id;c!=="null"&&(b.o=b.targetOrigin=c);b.h=e;b.sessionId=d;if(b.u){b.Y=!0;b.u=!1;b.sendMessage("initialDelivery",Oy(b));b.sendMessage("onReady");e=y(b.D);for(d=e.next();!d.done;d=e.next())Py(b,d.value);b.D=[]}break;case "command":if(e=d.func,d=d.args,e==="addEventListener"&&d)e=d[0],d=c.origin,e==="onReady"?b.api.logApiCall(e+" invocation",d):e==="onError"&&b.Z&&(b.api.logApiCall(e+" invocation",d,b.errorCode),b.errorCode=void 0),b.api.logApiCall(e+" registration",d),b.P[e]||e==="onReady"||
(c=Qy(b,e,d),b.i.push({eventType:e,listener:c,origin:d}),b.U?b.api.handleExternalCall("addEventListener",[e,c],d):b.api.addEventListener(e,c),b.P[e]=!0);else if(c=c.origin,b.api.isExternalMethodAvailable(e,c)){d=d||[];if(d.length>0&&Ky(e)){var f=d;if(Na(f[0])&&!Array.isArray(f[0]))var g=f[0];else switch(g={},e){case "loadVideoById":case "cueVideoById":g=Ly(f[0],f[1]!==void 0?Number(f[1]):void 0,f[2]);break;case "loadVideoByUrl":case "cueVideoByUrl":g=f[0];typeof g==="string"&&(g={mediaContentUrl:g,
startSeconds:f[1]!==void 0?Number(f[1]):void 0,suggestedQuality:f[2]});c:{if((f=g.mediaContentUrl)&&(f=/\/([ve]|embed)\/([^#?]+)/.exec(f))&&f[2]){f=f[2];break c}f=null}g.videoId=f;g=Ly(g);break;case "loadPlaylist":case "cuePlaylist":g=My(f[0],f[1],f[2],f[3])}d.length=1;d[0]=g}b.api.handleExternalCall(e,d,c);Ky(e)&&Ry(b,Oy(b))}}}};
Sy.addEventListener("message",this.G);if(a=S("WIDGET_ID"))this.sessionId=a;Ty(this,"onReady",function(){b.u=!0;var c=b.api.getVideoData();if(!c.isPlayable){b.Z=!0;c=c.errorCode;var d=d===void 0?5:d;b.errorCode=c?Iy[c]||d:d;b.sendMessage("onError",Number(b.errorCode))}});
Ty(this,"onVideoProgress",this.jf.bind(this));Ty(this,"onVolumeChange",this.kf.bind(this));Ty(this,"onApiChange",this.bf.bind(this));Ty(this,"onPlaybackQualityChange",this.ff.bind(this));Ty(this,"onPlaybackRateChange",this.gf.bind(this));Ty(this,"onStateChange",this.hf.bind(this));Ty(this,"onWebglSettingsChanged",this.lf.bind(this));Ty(this,"onCaptionsTrackListChanged",this.cf.bind(this));Ty(this,"captionssettingschanged",this.df.bind(this))}
w(Ny,G);function Ry(a,b){a.sendMessage("infoDelivery",b)}
r=Ny.prototype;r.sendMessage=function(a,b){a={event:a,info:b===void 0?null:b};this.Y?Py(this,a):this.D.push(a)};
function Qy(a,b,c){return function(d){b==="onError"?a.api.logApiCall(b+" invocation",c,d):a.api.logApiCall(b+" invocation",c);a.sendMessage(b,d)}}
function Ty(a,b,c){a.j.push({eventType:b,listener:c});a.api.addEventListener(b,c)}
function Oy(a){if(!a.api)return null;var b=a.api.getApiInterface();Rb(b,"getVideoData");for(var c={apiInterface:b},d=0,e=b.length;d<e;d++){var f=b[d];if(f.search("get")===0||f.search("is")===0){var g=0;f.search("get")===0?g=3:f.search("is")===0&&(g=2);g=f.charAt(g).toLowerCase()+f.substring(g+1);try{var h=a.api[f]();c[g]=h}catch(k){}}}c.videoData=a.api.getVideoData();c.currentTimeLastUpdated_=Date.now()/1E3;return c}
r.hf=function(a){a={playerState:a,currentTime:this.api.getCurrentTime(),duration:this.api.getDuration(),videoData:this.api.getVideoData(),videoStartBytes:0,videoBytesTotal:this.api.getVideoBytesTotal(),videoLoadedFraction:this.api.getVideoLoadedFraction(),playbackQuality:this.api.getPlaybackQuality(),availableQualityLevels:this.api.getAvailableQualityLevels(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getVideoUrl&&
(a.videoUrl=this.api.getVideoUrl());this.api.getVideoContentRect&&(a.videoContentRect=this.api.getVideoContentRect());this.api.getProgressState&&(a.progressState=this.api.getProgressState());this.api.getPlaylist&&(a.playlist=this.api.getPlaylist());this.api.getPlaylistIndex&&(a.playlistIndex=this.api.getPlaylistIndex());this.api.getStoryboardFormat&&!T("embeds_enable_vfsyb")&&(a.storyboardFormat=this.api.getStoryboardFormat());Ry(this,a)};
r.ff=function(a){a={playbackQuality:a};this.api.getAvailableQualityLevels&&(a.availableQualityLevels=this.api.getAvailableQualityLevels());this.api.getPreferredQuality&&(a.preferredQuality=this.api.getPreferredQuality());Ry(this,a)};
r.gf=function(a){Ry(this,{playbackRate:a})};
r.bf=function(){for(var a=this.api.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.api.getOptions(e);a.join(", ");b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.api.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
r.kf=function(){Ry(this,{muted:this.api.isMuted(),volume:this.api.getVolume()})};
r.jf=function(a){a={currentTime:a,videoBytesLoaded:this.api.getVideoBytesLoaded(),videoLoadedFraction:this.api.getVideoLoadedFraction(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getProgressState&&(a.progressState=this.api.getProgressState());Ry(this,a)};
r.lf=function(){Ry(this,{sphericalProperties:this.api.getSphericalProperties()})};
r.cf=function(){if(this.api.getCaptionTracks){var a={captionTracks:this.api.getCaptionTracks()};Ry(this,a)}};
r.df=function(){if(this.api.getSubtitlesUserSettings){var a={subtitlesUserSettings:this.api.getSubtitlesUserSettings()};Ry(this,a)}};
function Py(a,b){if(a.h){b.channel="widget";a.sessionId&&(b.id=a.sessionId);try{var c=JSON.stringify(b);a.h.postMessage(c,a.targetOrigin)}catch(d){W(d)}}}
r.ba=function(){G.prototype.ba.call(this);Sy.removeEventListener("message",this.G);for(var a=0;a<this.j.length;a++){var b=this.j[a];this.api.removeEventListener(b.eventType,b.listener)}this.j=[];for(a=0;a<this.i.length;a++)b=this.i[a],this.U?this.api.handleExternalCall("removeEventListener",[b.eventType,b.listener],b.origin):this.api.removeEventListener(b.eventType,b.listener);this.i=[]};
var Sy=window;function Uy(a,b,c){G.call(this);var d=this;this.api=a;this.id=b;this.origin=c;this.h={};this.j=T("web_player_split_event_bus_iframe");this.i=function(e){a:if(e.origin===d.origin){var f=e.data;if(typeof f==="string"){try{f=JSON.parse(f)}catch(k){break a}if(f.command){var g=f.command;f=f.data;e=e.origin;if(!d.ea){var h=f||{};switch(g){case "addEventListener":typeof h.event==="string"&&d.addListener(h.event,e);break;case "removeEventListener":typeof h.event==="string"&&d.removeListener(h.event,e);break;
default:d.api.isReady()&&d.api.isExternalMethodAvailable(g,e||null)&&(f=Vy(g,f||{}),f=d.api.handleExternalCall(g,f,e||null),(f=Wy(g,f))&&Xy(d,g,f))}}}}}};
Yy.addEventListener("message",this.i);Xy(this,"RECEIVING")}
w(Uy,G);r=Uy.prototype;r.addListener=function(a,b){if(!(a in this.h)){var c=this.ef.bind(this,a);this.h[a]=c;this.addEventListener(a,c,b)}};
r.ef=function(a,b){this.ea||Xy(this,a,Zy(a,b))};
r.removeListener=function(a,b){a in this.h&&(this.removeEventListener(a,this.h[a],b),delete this.h[a])};
r.addEventListener=function(a,b,c){this.j?a==="onReady"?this.api.addEventListener(a,b):this.api.handleExternalCall("addEventListener",[a,b],c||null):this.api.addEventListener(a,b)};
r.removeEventListener=function(a,b,c){this.j?a==="onReady"?this.api.removeEventListener(a,b):this.api.handleExternalCall("removeEventListener",[a,b],c||null):this.api.removeEventListener(a,b)};
function Vy(a,b){switch(a){case "loadVideoById":return[Ly(b)];case "cueVideoById":return[Ly(b)];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return[My(b)];case "cuePlaylist":return[My(b)];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];
case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function Wy(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
function Zy(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}if(b!=null)return{value:b}}
function Xy(a,b,c){a.ea||(b={id:a.id,command:b},c&&(b.data=c),$y.postMessage(JSON.stringify(b),a.origin))}
r.ba=function(){Yy.removeEventListener("message",this.i);for(var a in this.h)this.h.hasOwnProperty(a)&&this.removeListener(a);G.prototype.ba.call(this)};
var Yy=window,$y=window.parent;var az=new uy;function bz(){return az.gd()}
function cz(a){a=a===void 0?{}:a;return az.invoke(a)}
;function dz(a,b,c,d,e){G.call(this);var f=this;this.D=b;this.webPlayerContextConfig=d;this.Kb=e;this.Pa=!1;this.api={};this.ma=this.u=null;this.U=new O;this.h={};this.Z=this.xa=this.elementId=this.Qa=this.config=null;this.Y=!1;this.j=this.G=null;this.Fa={};this.Gc=["onReady"];this.lastError=null;this.eb=NaN;this.P={};this.ha=0;this.i=this.o=a;tc(this,this.U);ez(this);c?this.ha=setTimeout(function(){f.loadNewVideoConfig(c)},0):d&&(fz(this),gz(this))}
w(dz,G);r=dz.prototype;r.getId=function(){return this.D};
r.loadNewVideoConfig=function(a){if(!this.ea){this.ha&&(clearTimeout(this.ha),this.ha=0);var b=a||{};b instanceof Wu||(b=new Wu(b));this.config=b;this.setConfig(a);gz(this);this.isReady()&&hz(this)}};
function fz(a){var b;a.webPlayerContextConfig?b=a.webPlayerContextConfig.rootElementId:b=a.config.attrs.id;a.elementId=b||a.elementId;a.elementId==="video-player"&&(a.elementId=a.D,a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.D:a.config.attrs.id=a.D);var c;((c=a.i)==null?void 0:c.id)===a.elementId&&(a.elementId+="-player",a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.elementId:a.config.attrs.id=a.elementId)}
r.setConfig=function(a){this.Qa=a;this.config=iz(a);fz(this);if(!this.xa){var b;this.xa=jz(this,((b=this.config.args)==null?void 0:b.jsapicallback)||"onYouTubePlayerReady")}this.config.args?this.config.args.jsapicallback=null:this.config.args={jsapicallback:null};var c;if((c=this.config)==null?0:c.attrs)a=this.config.attrs,(b=a.width)&&this.i&&(this.i.style.width=xj(Number(b)||b)),(a=a.height)&&this.i&&(this.i.style.height=xj(Number(a)||a))};
function hz(a){if(a.config&&a.config.loaded!==!0)if(a.config.loaded=!0,!a.config.args||a.config.args.autoplay!=="0"&&a.config.args.autoplay!==0&&a.config.args.autoplay!==!1){var b;a.api.loadVideoByPlayerVars((b=a.config.args)!=null?b:null)}else a.api.cueVideoByPlayerVars(a.config.args)}
function kz(a){var b=!0,c=lz(a);c&&a.config&&(b=c.dataset.version===mz(a));return b&&!!F("yt.player.Application.create")}
function gz(a){if(!a.ea&&!a.Y){var b=kz(a);if(b&&(lz(a)?"html5":null)==="html5")a.Z="html5",a.isReady()||nz(a);else if(oz(a),a.Z="html5",b&&a.j&&a.o)a.o.appendChild(a.j),nz(a);else{a.config&&(a.config.loaded=!0);var c=!1;a.G=function(){c=!0;var d=pz(a,"player_bootstrap_method")?F("yt.player.Application.createAlternate")||F("yt.player.Application.create"):F("yt.player.Application.create");var e=a.config?iz(a.config):void 0;d&&d(a.o,e,a.webPlayerContextConfig,a.Kb);nz(a)};
a.Y=!0;b?a.G():(gv(mz(a),a.G),(b=qz(a))&&nv(b||""),rz(a)&&!c&&E("yt.player.Application.create",null))}}}
function lz(a){var b=og(a.elementId);!b&&a.i&&a.i.querySelector&&(b=a.i.querySelector("#"+a.elementId));return b}
function nz(a){if(!a.ea){var b=lz(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);if(c){a.Y=!1;if(!pz(a,"html5_remove_not_servable_check_killswitch")){var d;if((b==null?0:b.isNotServable)&&a.config&&(b==null?0:b.isNotServable((d=a.config.args)==null?void 0:d.video_id)))return}sz(a)}else a.eb=setTimeout(function(){nz(a)},50)}}
function sz(a){ez(a);a.Pa=!0;var b=lz(a);if(b){a.u=tz(a,b,"addEventListener");a.ma=tz(a,b,"removeEventListener");var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=a.api,e=0;e<c.length;e++){var f=c[e];d[f]||(d[f]=tz(a,b,f))}}for(var g in a.h)a.h.hasOwnProperty(g)&&a.u&&a.u(g,a.h[g]);hz(a);a.xa&&a.xa(a.api);a.U.sb("onReady",a.api)}
function tz(a,b,c){var d=b[c];return function(){var e=C.apply(0,arguments);try{return a.lastError=null,d.apply(b,e)}catch(f){if(c!=="sendAbandonmentPing")throw f.params=c,a.lastError=f,e=new U("PlayerProxy error in method call",{error:f,method:c,playerId:a.D}),e.level="WARNING",e;}}}
function ez(a){a.Pa=!1;if(a.ma)for(var b in a.h)a.h.hasOwnProperty(b)&&a.ma(b,a.h[b]);for(var c in a.P)a.P.hasOwnProperty(c)&&clearTimeout(Number(c));a.P={};a.u=null;a.ma=null;b=a.api;for(var d in b)b.hasOwnProperty(d)&&(b[d]=null);b.addEventListener=function(e,f){a.addEventListener(e,f)};
b.removeEventListener=function(e,f){a.removeEventListener(e,f)};
b.destroy=function(){a.dispose()};
b.getLastError=function(){return a.getLastError()};
b.getPlayerType=function(){return a.getPlayerType()};
b.getCurrentVideoConfig=function(){return a.Qa};
b.loadNewVideoConfig=function(e){a.loadNewVideoConfig(e)};
b.isReady=function(){return a.isReady()}}
r.isReady=function(){return this.Pa};
r.addEventListener=function(a,b){var c=this,d=jz(this,b);d&&(Kb(this.Gc,a)>=0||this.h[a]||(b=uz(this,a),this.u&&this.u(a,b)),this.U.subscribe(a,d),a==="onReady"&&this.isReady()&&setTimeout(function(){d(c.api)},0))};
r.removeEventListener=function(a,b){this.ea||(b=jz(this,b))&&this.U.unsubscribe(a,b)};
function jz(a,b){var c=b;if(typeof b==="string"){if(a.Fa[b])return a.Fa[b];c=function(){var d=C.apply(0,arguments),e=F(b);if(e)try{e.apply(D,d)}catch(f){throw d=new U("PlayerProxy error when executing callback",{error:f}),d.level="ERROR",d;}};
a.Fa[b]=c}return c?c:null}
function uz(a,b){function c(d){function e(){if(!a.ea)try{a.U.sb(b,d!=null?d:void 0)}catch(h){var g=new U("PlayerProxy error when creating global callback",{error:h.message,event:b,playerId:a.D,data:d,originalStack:h.stack,componentStack:h.ee});g.level="WARNING";throw g;}}
if(pz(a,"web_player_publish_events_immediately"))e();else{var f=setTimeout(function(){e();var g=a.P,h=String(f);h in g&&delete g[h]},0);
fg(a.P,String(f))}}
return a.h[b]=c}
r.getPlayerType=function(){return this.Z||(lz(this)?"html5":null)};
r.getLastError=function(){return this.lastError};
function oz(a){a.cancel();ez(a);a.Z=null;a.config&&(a.config.loaded=!1);var b=lz(a);b&&(kz(a)||!rz(a)?a.j=b:(b&&b.destroy&&b.destroy(),a.j=null));if(a.o)for(a=a.o;b=a.firstChild;)a.removeChild(b)}
r.cancel=function(){this.G&&kv(mz(this),this.G);clearTimeout(this.eb);this.Y=!1};
r.ba=function(){oz(this);if(this.j&&this.config&&this.j.destroy)try{this.j.destroy()}catch(b){var a=new U("PlayerProxy error during disposal",{error:b});a.level="ERROR";throw a;}this.Fa=null;for(a in this.h)this.h.hasOwnProperty(a)&&delete this.h[a];this.Qa=this.config=this.api=null;delete this.o;delete this.i;G.prototype.ba.call(this)};
function rz(a){var b,c;a=(b=a.config)==null?void 0:(c=b.args)==null?void 0:c.fflags;return!!a&&a.indexOf("player_destroy_old_version=true")!==-1}
function mz(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.jsUrl:(a=a.config.assets)?a.js:""}
function qz(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.cssUrl:(a=a.config.assets)?a.css:""}
function pz(a,b){if(a.webPlayerContextConfig)var c=a.webPlayerContextConfig.serializedExperimentFlags;else{var d;if((d=a.config)==null?0:d.args)c=a.config.args.fflags}return(c||"").split("&").includes(b+"=true")}
function iz(a){for(var b={},c=y(Object.keys(a)),d=c.next();!d.done;d=c.next()){d=d.value;var e=a[d];b[d]=typeof e==="object"?ig(e):e}return b}
;var vz={},wz="player_uid_"+(Math.random()*1E9>>>0);function xz(a,b){var c="player",d=!1;d=d===void 0?!0:d;c=typeof c==="string"?og(c):c;var e=wz+"_"+Sa(c),f=vz[e];if(f&&d)return yz(a,b)?f.api.loadVideoByPlayerVars(a.args||null):f.loadNewVideoConfig(a),f.api;f=new dz(c,e,a,b,void 0);vz[e]=f;f.addOnDisposeCallback(function(){delete vz[f.getId()]});
return f.api}
function yz(a,b){return b&&b.serializedExperimentFlags?b.serializedExperimentFlags.includes("web_player_remove_playerproxy=true"):a&&a.args&&a.args.fflags?a.args.fflags.includes("web_player_remove_playerproxy=true"):!1}
;var zz=null,Az=null;
function Bz(){dx();var a=ln(),b=on(119),c=window.devicePixelRatio>1;if(document.body&&Lj(document.body,"exp-invert-logo"))if(c&&!Lj(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!Lj(d,"inverted-hdpi")){var e=Jj(d);Kj(d,e+(e.length>0?" inverted-hdpi":"inverted-hdpi"))}}else!c&&Lj(document.body,"inverted-hdpi")&&Mj();if(b!=c){b="f"+(Math.floor(119/31)+1);d=pn(b)||0;d=c?d|67108864:d&-67108865;d===0?delete hn[b]:(c=d.toString(16),hn[b]=c.toString());
c=!0;T("web_secure_pref_cookie_killswitch")&&(c=!1);b=a.h;d=[];for(f in hn)hn.hasOwnProperty(f)&&d.push(f+"="+encodeURIComponent(String(hn[f])));var f=d.join("&");dn(b,f,63072E3,a.i,c)}}
function Cz(){Dz()}
function Ez(){Zw("ep_init_pr");Dz()}
function Dz(){var a=zz.getVideoData(1);a=a.title?a.title+" - YouTube":"YouTube";document.title!==a&&(document.title=a)}
function Fz(){zz&&zz.sendAbandonmentPing&&zz.sendAbandonmentPing();S("PL_ATT")&&az.dispose();for(var a=Dj,b=0,c=Nx.length;b<c;b++)a.qa(Nx[b]);Nx.length=0;iv("//static.doubleclick.net/instream/ad_status.js");Ox=!1;Ul("DCLKSTAT",0);sc(Az);zz&&(zz.removeEventListener("onVideoDataChange",Cz),zz.destroy())}
;Zw("ep_init_eps");E("yt.setConfig",Ul);E("yt.config.set",Ul);E("yt.setMsg",fv);E("yt.msgs.set",fv);E("yt.logging.errors.log",cu);
E("writeEmbed",function(){Zw("ep_init_wes");var a=S("PLAYER_CONFIG");if(!a){var b=S("PLAYER_VARS");b&&(a={args:b})}Rv(!0);a.args.ps==="gvn"&&(document.body.style.backgroundColor="transparent");a.attrs||(a.attrs={width:"100%",height:"100%",id:"video-player"});var c=document.referrer;b=S("POST_MESSAGE_ORIGIN");window!==window.top&&c&&c!==document.URL&&(a.args.loaderUrl=c);c=cy();if(!c.serializedForcedExperimentIds){var d=hm(window.location.href);d.forced_experiments&&(c.serializedForcedExperimentIds=
d.forced_experiments)}var e;((e=a.args)==null?0:e.autoplay)?Vw("watch",["pbs","pbu","pbp"]):a.args&&Iu(a.args)?Vw("video_preview",["ol"]):Vw("embed_no_video",["ep_init_pr"]);zz=xz(a,c);zz.addEventListener("onVideoDataChange",Cz);zz.addEventListener("onReady",Ez);a=S("POST_MESSAGE_ID","player");S("ENABLE_JS_API")?Az=new Ny(zz):S("ENABLE_POST_API")&&typeof a==="string"&&typeof b==="string"&&(Az=new Uy(zz,a,b));Px();T("ytidb_create_logger_embed_killswitch")||ko();a={};Ay.h||(Ay.h=new Ay);Ay.h.install((a.flush_logs=
{callback:function(){Ht()}},a));
Vr();T("ytidb_clear_embedded_player")&&Dj.pa(function(){Ix();oy()});
T("enable_rta_manager")&&yn(function(){var f=new ay;var g={preload:!T("enable_rta_npi")},h;typeof g==="boolean"?h={preload:g}:typeof g==="undefined"?h={preload:!0}:h=g;g=new Jr;Sx.instance=new Sx(f,h,g);f=Sx.instance;h=f.i.bind(f);E("yt.aba.att",h);f=f.j.bind(f);E("yt.aba.att2",f)});
Zw("ep_init_wee")});
E("yt.abuse.player.botguardInitialized",F("yt.abuse.player.botguardInitialized")||bz);E("yt.abuse.player.invokeBotguard",F("yt.abuse.player.invokeBotguard")||cz);E("yt.abuse.dclkstatus.checkDclkStatus",F("yt.abuse.dclkstatus.checkDclkStatus")||Qx);E("yt.player.exports.navigate",F("yt.player.exports.navigate")||Qv);E("yt.util.activity.init",F("yt.util.activity.init")||ns);E("yt.util.activity.getTimeSinceActive",F("yt.util.activity.getTimeSinceActive")||rs);
E("yt.util.activity.setTimestamp",F("yt.util.activity.setTimestamp")||ps);window.addEventListener("load",Yl(function(){Bz()}));
window.addEventListener("pageshow",Yl(function(a){a.persisted||Bz()}));
window.addEventListener("pagehide",Yl(function(a){T("embeds_web_enable_dispose_player_if_page_not_cached_killswitch")?Fz():a.persisted||Fz()}));
window.onerror=function(a,b,c,d,e){var f;b=b===void 0?"Unknown file":b;c=c===void 0?0:c;var g=!1,h=Vl("log_window_onerror_fraction");if(h&&Math.random()<h)g=!0;else{h=document.getElementsByTagName("script");for(var k=0,l=h.length;k<l;k++)if(h[k].src.indexOf("/debug-")>0){g=!0;break}}if(g){g=!1;e?g=!0:(typeof a==="string"?h=a:ErrorEvent&&a instanceof ErrorEvent?(g=!0,h=a.message,b=a.filename,c=a.lineno,d=a.colno):(h="Unknown error",b="Unknown file",c=0),e=new U(h),e.name="UnhandledWindowError",e.message=
h,e.fileName=b,e.lineNumber=c,isNaN(d)?delete e.columnNumber:e.columnNumber=d);if(!T("wiz_enable_component_stack_propagation_killswitch")){a=e;var m;if((m=f)==null||!m.componentStack)if(m=a.ee)f||(f={}),f.componentStack=Vt(m)}f&&fu(e,f);g?cu(e):W(e)}};
ti=du;window.addEventListener("unhandledrejection",function(a){du(a.reason)});
Mb(S("ERRORS")||[],function(a){cu.apply(null,a)});
Ul("ERRORS",[]);Zw("ep_init_epe");}).call(this);
