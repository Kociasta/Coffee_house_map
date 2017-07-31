/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 142);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(25)
  , hide      = __webpack_require__(11)
  , redefine  = __webpack_require__(12)
  , ctx       = __webpack_require__(26)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(54)('wks')
  , uid        = __webpack_require__(33)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(101)
  , toPrimitive    = __webpack_require__(22)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(20);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(30);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(11)
  , has       = __webpack_require__(10)
  , SRC       = __webpack_require__(33)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(25).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50)
  , defined = __webpack_require__(20);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(20)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(51)
  , createDesc     = __webpack_require__(30)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(22)
  , has            = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(101)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(10)
  , toObject    = __webpack_require__(9)
  , IE_PROTO    = __webpack_require__(70)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isDef = isDef;
exports.isJustDef = isJustDef;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isNonNullObject = isNonNullObject;
exports.isNonArrayObject = isNonArrayObject;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isNativeBlob = isNativeBlob;
exports.isNativeBlobDefined = isNativeBlobDefined;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @return False if the object is undefined or null, true otherwise.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function isDef(p) {
    return p != null;
}
function isJustDef(p) {
    return p !== void 0;
}
function isFunction(p) {
    return typeof p === 'function';
}
function isObject(p) {
    return (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object';
}
function isNonNullObject(p) {
    return isObject(p) && p !== null;
}
function isNonArrayObject(p) {
    return isObject(p) && !Array.isArray(p);
}
function isString(p) {
    return typeof p === 'string' || p instanceof String;
}
function isNumber(p) {
    return typeof p === 'number' || p instanceof Number;
}
function isNativeBlob(p) {
    return isNativeBlobDefined() && p instanceof Blob;
}
function isNativeBlobDefined() {
    return typeof Blob !== 'undefined';
}
//# sourceMappingURL=type.js.map


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(25)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(26)
  , IObject  = __webpack_require__(50)
  , toObject = __webpack_require__(9)
  , toLength = __webpack_require__(8)
  , asc      = __webpack_require__(234);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(34)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(63)
    , $buffer             = __webpack_require__(93)
    , ctx                 = __webpack_require__(26)
    , anInstance          = __webpack_require__(40)
    , propertyDesc        = __webpack_require__(30)
    , hide                = __webpack_require__(11)
    , redefineAll         = __webpack_require__(41)
    , toInteger           = __webpack_require__(32)
    , toLength            = __webpack_require__(8)
    , toIndex             = __webpack_require__(36)
    , toPrimitive         = __webpack_require__(22)
    , has                 = __webpack_require__(10)
    , same                = __webpack_require__(107)
    , classof             = __webpack_require__(52)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(9)
    , isArrayIter         = __webpack_require__(85)
    , create              = __webpack_require__(37)
    , getPrototypeOf      = __webpack_require__(17)
    , gOPN                = __webpack_require__(38).f
    , getIterFn           = __webpack_require__(87)
    , uid                 = __webpack_require__(33)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(24)
    , createArrayIncludes = __webpack_require__(55)
    , speciesConstructor  = __webpack_require__(90)
    , ArrayIterators      = __webpack_require__(89)
    , Iterators           = __webpack_require__(45)
    , $iterDetect         = __webpack_require__(59)
    , setSpecies          = __webpack_require__(39)
    , arrayFill           = __webpack_require__(88)
    , arrayCopyWithin     = __webpack_require__(116)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(119)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(54)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(122)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Code = exports.errors = exports.FirebaseStorageError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


exports.prependCode = prependCode;
exports.unknown = unknown;
exports.objectNotFound = objectNotFound;
exports.bucketNotFound = bucketNotFound;
exports.projectNotFound = projectNotFound;
exports.quotaExceeded = quotaExceeded;
exports.unauthenticated = unauthenticated;
exports.unauthorized = unauthorized;
exports.retryLimitExceeded = retryLimitExceeded;
exports.invalidChecksum = invalidChecksum;
exports.canceled = canceled;
exports.invalidEventName = invalidEventName;
exports.invalidUrl = invalidUrl;
exports.invalidDefaultBucket = invalidDefaultBucket;
exports.noDefaultBucket = noDefaultBucket;
exports.cannotSliceBlob = cannotSliceBlob;
exports.serverFileWrongSize = serverFileWrongSize;
exports.noDownloadURL = noDownloadURL;
exports.invalidArgument = invalidArgument;
exports.invalidArgumentCount = invalidArgumentCount;
exports.appDeleted = appDeleted;
exports.invalidRootOperation = invalidRootOperation;
exports.invalidFormat = invalidFormat;
exports.internalError = internalError;

var _constants = __webpack_require__(65);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FirebaseStorageError = exports.FirebaseStorageError = function () {
    function FirebaseStorageError(code, message) {
        _classCallCheck(this, FirebaseStorageError);

        this.code_ = prependCode(code);
        this.message_ = 'Firebase Storage: ' + message;
        this.serverResponse_ = null;
        this.name_ = 'FirebaseError';
    }

    _createClass(FirebaseStorageError, [{
        key: 'codeProp',
        value: function codeProp() {
            return this.code;
        }
    }, {
        key: 'codeEquals',
        value: function codeEquals(code) {
            return prependCode(code) === this.codeProp();
        }
    }, {
        key: 'serverResponseProp',
        value: function serverResponseProp() {
            return this.serverResponse_;
        }
    }, {
        key: 'setServerResponseProp',
        value: function setServerResponseProp(serverResponse) {
            this.serverResponse_ = serverResponse;
        }
    }, {
        key: 'name',
        get: function get() {
            return this.name_;
        }
    }, {
        key: 'code',
        get: function get() {
            return this.code_;
        }
    }, {
        key: 'message',
        get: function get() {
            return this.message_;
        }
    }, {
        key: 'serverResponse',
        get: function get() {
            return this.serverResponse_;
        }
    }]);

    return FirebaseStorageError;
}();

var errors = exports.errors = {};
var Code = exports.Code = {
    // Shared between all platforms
    UNKNOWN: 'unknown',
    OBJECT_NOT_FOUND: 'object-not-found',
    BUCKET_NOT_FOUND: 'bucket-not-found',
    PROJECT_NOT_FOUND: 'project-not-found',
    QUOTA_EXCEEDED: 'quota-exceeded',
    UNAUTHENTICATED: 'unauthenticated',
    UNAUTHORIZED: 'unauthorized',
    RETRY_LIMIT_EXCEEDED: 'retry-limit-exceeded',
    INVALID_CHECKSUM: 'invalid-checksum',
    CANCELED: 'canceled',
    // JS specific
    INVALID_EVENT_NAME: 'invalid-event-name',
    INVALID_URL: 'invalid-url',
    INVALID_DEFAULT_BUCKET: 'invalid-default-bucket',
    NO_DEFAULT_BUCKET: 'no-default-bucket',
    CANNOT_SLICE_BLOB: 'cannot-slice-blob',
    SERVER_FILE_WRONG_SIZE: 'server-file-wrong-size',
    NO_DOWNLOAD_URL: 'no-download-url',
    INVALID_ARGUMENT: 'invalid-argument',
    INVALID_ARGUMENT_COUNT: 'invalid-argument-count',
    APP_DELETED: 'app-deleted',
    INVALID_ROOT_OPERATION: 'invalid-root-operation',
    INVALID_FORMAT: 'invalid-format',
    INTERNAL_ERROR: 'internal-error'
};
function prependCode(code) {
    return 'storage/' + code;
}
function unknown() {
    return new FirebaseStorageError(Code.UNKNOWN, 'An unknown error occurred, please check the error payload for ' + 'server response.');
}
function objectNotFound(path) {
    return new FirebaseStorageError(Code.OBJECT_NOT_FOUND, 'Object \'' + path + '\' does not exist.');
}
function bucketNotFound(bucket) {
    return new FirebaseStorageError(Code.BUCKET_NOT_FOUND, 'Bucket \'' + bucket + '\' does not exist.');
}
function projectNotFound(project) {
    return new FirebaseStorageError(Code.PROJECT_NOT_FOUND, 'Project \'' + project + '\' does not exist.');
}
function quotaExceeded(bucket) {
    return new FirebaseStorageError(Code.QUOTA_EXCEEDED, 'Quota for bucket \'' + bucket + '\' exceeded, please view quota on ' + 'https://firebase.google.com/pricing/.');
}
function unauthenticated() {
    return new FirebaseStorageError(Code.UNAUTHENTICATED, 'User is not authenticated, please authenticate using Firebase ' + 'Authentication and try again.');
}
function unauthorized(path) {
    return new FirebaseStorageError(Code.UNAUTHORIZED, 'User does not have permission to access \'' + path + '\'.');
}
function retryLimitExceeded() {
    return new FirebaseStorageError(Code.RETRY_LIMIT_EXCEEDED, 'Max retry time for operation exceeded, please try again.');
}
function invalidChecksum(path, checksum, calculated) {
    return new FirebaseStorageError(Code.INVALID_CHECKSUM, 'Uploaded/downloaded object \'' + path + '\' has checksum \'' + checksum + '\' which does not match \'' + calculated + '\'. Please retry the upload/download.');
}
function canceled() {
    return new FirebaseStorageError(Code.CANCELED, 'User canceled the upload/download.');
}
function invalidEventName(name) {
    return new FirebaseStorageError(Code.INVALID_EVENT_NAME, 'Invalid event name \'' + name + '\'.');
}
function invalidUrl(url) {
    return new FirebaseStorageError(Code.INVALID_URL, 'Invalid URL \'' + url + '\'.');
}
function invalidDefaultBucket(bucket) {
    return new FirebaseStorageError(Code.INVALID_DEFAULT_BUCKET, 'Invalid default bucket \'' + bucket + '\'.');
}
function noDefaultBucket() {
    return new FirebaseStorageError(Code.NO_DEFAULT_BUCKET, 'No default bucket ' + 'found. Did you set the \'' + _constants.configOption + '\' property when initializing the app?');
}
function cannotSliceBlob() {
    return new FirebaseStorageError(Code.CANNOT_SLICE_BLOB, 'Cannot slice blob for upload. Please retry the upload.');
}
function serverFileWrongSize() {
    return new FirebaseStorageError(Code.SERVER_FILE_WRONG_SIZE, 'Server recorded incorrect upload file size, please retry the upload.');
}
function noDownloadURL() {
    return new FirebaseStorageError(Code.NO_DOWNLOAD_URL, 'The given file does not have any download URLs.');
}
function invalidArgument(index, fnName, message) {
    return new FirebaseStorageError(Code.INVALID_ARGUMENT, 'Invalid argument in `' + fnName + '` at index ' + index + ': ' + message);
}
function invalidArgumentCount(argMin, argMax, fnName, real) {
    var countPart = void 0;
    var plural = void 0;
    if (argMin === argMax) {
        countPart = argMin;
        plural = argMin === 1 ? 'argument' : 'arguments';
    } else {
        countPart = 'between ' + argMin + ' and ' + argMax;
        plural = 'arguments';
    }
    return new FirebaseStorageError(Code.INVALID_ARGUMENT_COUNT, 'Invalid argument count in `' + fnName + '`: Expected ' + countPart + ' ' + plural + ', received ' + real + '.');
}
function appDeleted() {
    return new FirebaseStorageError(Code.APP_DELETED, 'The Firebase app was deleted.');
}
/**
 * @param name The name of the operation that was invalid.
 */
function invalidRootOperation(name) {
    return new FirebaseStorageError(Code.INVALID_ROOT_OPERATION, 'The operation \'' + name + '\' cannot be performed on a root reference, create a non-root ' + 'reference using child, such as .child(\'file.png\').');
}
/**
 * @param format The format that was not valid.
 * @param message A message describing the format violation.
 */
function invalidFormat(format, message) {
    return new FirebaseStorageError(Code.INVALID_FORMAT, 'String does not match format \'' + format + '\': ' + message);
}
/**
 * @param message A message describing the internal error.
 */
function internalError(message) {
    throw new FirebaseStorageError(Code.INTERNAL_ERROR, 'Internal error: ' + message);
}
//# sourceMappingURL=error.js.map


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(33)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(10)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(103)
  , enumBugKeys = __webpack_require__(71);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(104)
  , enumBugKeys = __webpack_require__(71)
  , IE_PROTO    = __webpack_require__(70)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(68)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(103)
  , hiddenKeys = __webpack_require__(71).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(12);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;
exports.resolve = resolve;
exports.reject = reject;

var _shared_promise = __webpack_require__(94);

function make(resolver) {
  return new _shared_promise.local.Promise(resolver);
}
/**
 * @template T
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @fileoverview Implements the promise abstraction interface for external
 * (public SDK) packaging, which just passes through to the firebase-app impl.
 */
/**
 * @template T
 * @param {function((function(T): void),
 *                  (function(!Error): void))} resolver
 */
function resolve(value) {
  return _shared_promise.local.Promise.resolve(value);
}
function reject(error) {
  return _shared_promise.local.Promise.reject(error);
}
//# sourceMappingURL=promise_external.js.map


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(10)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(20)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(75)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(26)
  , call        = __webpack_require__(114)
  , isArrayIter = __webpack_require__(85)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(8)
  , getIterFn   = __webpack_require__(87)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contains = contains;
exports.forEach = forEach;
exports.clone = clone;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @fileoverview Contains methods for working with objects.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function contains(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
function forEach(obj, f) {
    for (var key in obj) {
        if (contains(obj, key)) {
            f(key, obj[key]);
        }
    }
}
function clone(obj) {
    if (obj == null) {
        return {};
    }
    var c = {};
    forEach(obj, function (key, val) {
        c[key] = val;
    });
    return c;
}
//# sourceMappingURL=object.js.map


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase_app = __webpack_require__(333);

// Export a single instance of firebase app
var firebase = (0, _firebase_app.createFirebaseNamespace)(); /**
                                                             * Copyright 2017 Google Inc.
                                                             *
                                                             * Licensed under the Apache License, Version 2.0 (the "License");
                                                             * you may not use this file except in compliance with the License.
                                                             * You may obtain a copy of the License at
                                                             *
                                                             *   http://www.apache.org/licenses/LICENSE-2.0
                                                             *
                                                             * Unless required by applicable law or agreed to in writing, software
                                                             * distributed under the License is distributed on an "AS IS" BASIS,
                                                             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                             * See the License for the specific language governing permissions and
                                                             * limitations under the License.
                                                             */
// Import the createFirebaseNamespace function
exports.default = firebase;
module.exports = exports['default'];
//# sourceMappingURL=app.js.map


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14)
  , toLength  = __webpack_require__(8)
  , toIndex   = __webpack_require__(36);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(19)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(11)
  , redefine = __webpack_require__(12)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(20)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(12)
  , redefineAll       = __webpack_require__(41)
  , meta              = __webpack_require__(31)
  , forOf             = __webpack_require__(47)
  , anInstance        = __webpack_require__(40)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(59)
  , setToStringTag    = __webpack_require__(43)
  , inheritIfRequired = __webpack_require__(76);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(11)
  , uid    = __webpack_require__(33)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(34)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDomainBase = setDomainBase;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @fileoverview Constants used in the Firebase Storage library.
 */
/**
 * Domain and scheme for API calls.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var domainBase = exports.domainBase = 'https://firebasestorage.googleapis.com';
/**
 * Domain and scheme for object downloads.
 */
var downloadBase = exports.downloadBase = 'https://firebasestorage.googleapis.com';
/**
 * Base URL for non-upload calls to the API.
 */
var apiBaseUrl = exports.apiBaseUrl = '/v0';
/**
 * Base URL for upload calls to the API.
 */
var apiUploadBaseUrl = exports.apiUploadBaseUrl = '/v0';
function setDomainBase(domainBase) {
  domainBase = domainBase;
}
var configOption = exports.configOption = 'storageBucket';
/**
 * 1 minute
 */
var shortMaxOperationRetryTime = exports.shortMaxOperationRetryTime = 1 * 60 * 1000;
/**
 * 2 minutes
 */
var defaultMaxOperationRetryTime = exports.defaultMaxOperationRetryTime = 2 * 60 * 1000;
/**
 * 10 minutes
 */
var defaultMaxUploadRetryTime = exports.defaultMaxUploadRetryTime = 10 * 60 * 100;
/**
 * This is the value of Number.MIN_SAFE_INTEGER, which is not well supported
 * enough for us to use it directly.
 */
var minSafeInteger = exports.minSafeInteger = -9007199254740991;
//# sourceMappingURL=constants.js.map


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Location = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/**
 * @fileoverview Functionality related to the parsing/composition of bucket/
 * object location.
 */


var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @struct
 */
var Location = exports.Location = function () {
    function Location(bucket, path) {
        _classCallCheck(this, Location);

        this.bucket = bucket;
        this.path_ = path;
    }

    _createClass(Location, [{
        key: 'fullServerUrl',
        value: function fullServerUrl() {
            var encode = encodeURIComponent;
            return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
        }
    }, {
        key: 'bucketOnlyServerUrl',
        value: function bucketOnlyServerUrl() {
            var encode = encodeURIComponent;
            return '/b/' + encode(this.bucket) + '/o';
        }
    }, {
        key: 'path',
        get: function get() {
            return this.path_;
        }
    }], [{
        key: 'makeFromBucketSpec',
        value: function makeFromBucketSpec(bucketString) {
            var bucketLocation = void 0;
            try {
                bucketLocation = Location.makeFromUrl(bucketString);
            } catch (e) {
                // Not valid URL, use as-is. This lets you put bare bucket names in
                // config.
                return new Location(bucketString, '');
            }
            if (bucketLocation.path === '') {
                return bucketLocation;
            } else {
                throw errorsExports.invalidDefaultBucket(bucketString);
            }
        }
    }, {
        key: 'makeFromUrl',
        value: function makeFromUrl(url) {
            var location = null;
            var bucketDomain = '([A-Za-z0-9.\\-]+)';

            var gsRegex = new RegExp('^gs://' + bucketDomain + '(/(.*))?$', 'i');

            var httpRegex = new RegExp('^https?://firebasestorage\\.googleapis\\.com/' + 'v[A-Za-z0-9_]+' + '/b/' + bucketDomain + '/o' + '(/([^?#]*).*)?$', 'i');

            var groups = [{ regex: gsRegex, indices: { bucket: 1, path: 3 }, postModify: function (loc) {
                    if (loc.path.charAt(loc.path.length - 1) === '/') {
                        loc.path_ = loc.path_.slice(0, -1);
                    }
                } }, { regex: httpRegex, indices: { bucket: 1, path: 3 }, postModify: function (loc) {
                    loc.path_ = decodeURIComponent(loc.path);
                } }];
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var captures = group.regex.exec(url);
                if (captures) {
                    var bucketValue = captures[group.indices.bucket];
                    var pathValue = captures[group.indices.path];
                    if (!pathValue) {
                        pathValue = '';
                    }
                    location = new Location(bucketValue, pathValue);
                    group.postModify(location);
                    break;
                }
            }
            if (location == null) {
                throw errorsExports.invalidUrl(url);
            }
            return location;
        }
    }]);

    return Location;
}();
//# sourceMappingURL=location.js.map


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ERROR_MAP;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CODES = {
    AVAILABLE_IN_WINDOW: 'only-available-in-window',
    AVAILABLE_IN_SW: 'only-available-in-sw',
    SHOULD_BE_INHERITED: 'should-be-overriden',
    BAD_SENDER_ID: 'bad-sender-id',
    INCORRECT_GCM_SENDER_ID: 'incorrect-gcm-sender-id',
    PERMISSION_DEFAULT: 'permission-default',
    PERMISSION_BLOCKED: 'permission-blocked',
    UNSUPPORTED_BROWSER: 'unsupported-browser',
    NOTIFICATIONS_BLOCKED: 'notifications-blocked',
    FAILED_DEFAULT_REGISTRATION: 'failed-serviceworker-registration',
    SW_REGISTRATION_EXPECTED: 'sw-registration-expected',
    GET_SUBSCRIPTION_FAILED: 'get-subscription-failed',
    INVALID_SAVED_TOKEN: 'invalid-saved-token',
    SW_REG_REDUNDANT: 'sw-reg-redundant',
    TOKEN_SUBSCRIBE_FAILED: 'token-subscribe-failed',
    TOKEN_SUBSCRIBE_NO_TOKEN: 'token-subscribe-no-token',
    TOKEN_SUBSCRIBE_NO_PUSH_SET: 'token-subscribe-no-push-set',
    USE_SW_BEFORE_GET_TOKEN: 'use-sw-before-get-token',
    INVALID_DELETE_TOKEN: 'invalid-delete-token',
    DELETE_TOKEN_NOT_FOUND: 'delete-token-not-found',
    DELETE_SCOPE_NOT_FOUND: 'delete-scope-not-found',
    BG_HANDLER_FUNCTION_EXPECTED: 'bg-handler-function-expected',
    NO_WINDOW_CLIENT_TO_MSG: 'no-window-client-to-msg',
    UNABLE_TO_RESUBSCRIBE: 'unable-to-resubscribe',
    NO_FCM_TOKEN_FOR_RESUBSCRIBE: 'no-fcm-token-for-resubscribe',
    FAILED_TO_DELETE_TOKEN: 'failed-to-delete-token',
    NO_SW_IN_REG: 'no-sw-in-reg',
    BAD_SCOPE: 'bad-scope',
    BAD_VAPID_KEY: 'bad-vapid-key',
    BAD_SUBSCRIPTION: 'bad-subscription',
    BAD_TOKEN: 'bad-token',
    BAD_PUSH_SET: 'bad-push-set',
    FAILED_DELETE_VAPID_KEY: 'failed-delete-vapid-key'
};
var ERROR_MAP = (_ERROR_MAP = {}, _defineProperty(_ERROR_MAP, CODES.AVAILABLE_IN_WINDOW, 'This method is available in a Window context.'), _defineProperty(_ERROR_MAP, CODES.AVAILABLE_IN_SW, 'This method is available in a service worker ' + 'context.'), _defineProperty(_ERROR_MAP, CODES.SHOULD_BE_INHERITED, 'This method should be overriden by ' + 'extended classes.'), _defineProperty(_ERROR_MAP, CODES.BAD_SENDER_ID, 'Please ensure that \'messagingSenderId\' is set ' + 'correctly in the options passed into firebase.initializeApp().'), _defineProperty(_ERROR_MAP, CODES.PERMISSION_DEFAULT, 'The required permissions were not granted and ' + 'dismissed instead.'), _defineProperty(_ERROR_MAP, CODES.PERMISSION_BLOCKED, 'The required permissions were not granted and ' + 'blocked instead.'), _defineProperty(_ERROR_MAP, CODES.UNSUPPORTED_BROWSER, 'This browser doesn\'t support the API\'s ' + 'required to use the firebase SDK.'), _defineProperty(_ERROR_MAP, CODES.NOTIFICATIONS_BLOCKED, 'Notifications have been blocked.'), _defineProperty(_ERROR_MAP, CODES.FAILED_DEFAULT_REGISTRATION, 'We are unable to register the ' + 'default service worker. {$browserErrorMessage}'), _defineProperty(_ERROR_MAP, CODES.SW_REGISTRATION_EXPECTED, 'A service worker registration was the ' + 'expected input.'), _defineProperty(_ERROR_MAP, CODES.GET_SUBSCRIPTION_FAILED, 'There was an error when trying to get ' + 'any existing Push Subscriptions.'), _defineProperty(_ERROR_MAP, CODES.INVALID_SAVED_TOKEN, 'Unable to access details of the saved token.'), _defineProperty(_ERROR_MAP, CODES.SW_REG_REDUNDANT, 'The service worker being used for push was made ' + 'redundant.'), _defineProperty(_ERROR_MAP, CODES.TOKEN_SUBSCRIBE_FAILED, 'A problem occured while subscribing the ' + 'user to FCM: {$message}'), _defineProperty(_ERROR_MAP, CODES.TOKEN_SUBSCRIBE_NO_TOKEN, 'FCM returned no token when subscribing ' + 'the user to push.'), _defineProperty(_ERROR_MAP, CODES.TOKEN_SUBSCRIBE_NO_PUSH_SET, 'FCM returned an invalid response ' + 'when getting an FCM token.'), _defineProperty(_ERROR_MAP, CODES.USE_SW_BEFORE_GET_TOKEN, 'You must call useServiceWorker() before ' + 'calling getToken() to ensure your service worker is used.'), _defineProperty(_ERROR_MAP, CODES.INVALID_DELETE_TOKEN, 'You must pass a valid token into ' + 'deleteToken(), i.e. the token from getToken().'), _defineProperty(_ERROR_MAP, CODES.DELETE_TOKEN_NOT_FOUND, 'The deletion attempt for token could not ' + 'be performed as the token was not found.'), _defineProperty(_ERROR_MAP, CODES.DELETE_SCOPE_NOT_FOUND, 'The deletion attempt for service worker ' + 'scope could not be performed as the scope was not found.'), _defineProperty(_ERROR_MAP, CODES.BG_HANDLER_FUNCTION_EXPECTED, 'The input to ' + 'setBackgroundMessageHandler() must be a function.'), _defineProperty(_ERROR_MAP, CODES.NO_WINDOW_CLIENT_TO_MSG, 'An attempt was made to message a ' + 'non-existant window client.'), _defineProperty(_ERROR_MAP, CODES.UNABLE_TO_RESUBSCRIBE, 'There was an error while re-subscribing ' + 'the FCM token for push messaging. Will have to resubscribe the ' + 'user on next visit. {$message}'), _defineProperty(_ERROR_MAP, CODES.NO_FCM_TOKEN_FOR_RESUBSCRIBE, 'Could not find an FCM token ' + 'and as a result, unable to resubscribe. Will have to resubscribe the ' + 'user on next visit.'), _defineProperty(_ERROR_MAP, CODES.FAILED_TO_DELETE_TOKEN, 'Unable to delete the currently saved token.'), _defineProperty(_ERROR_MAP, CODES.NO_SW_IN_REG, 'Even though the service worker registration was ' + 'successful, there was a problem accessing the service worker itself.'), _defineProperty(_ERROR_MAP, CODES.INCORRECT_GCM_SENDER_ID, 'Please change your web app manifest\'s ' + '\'gcm_sender_id\' value to \'103953800507\' to use Firebase messaging.'), _defineProperty(_ERROR_MAP, CODES.BAD_SCOPE, 'The service worker scope must be a string with at ' + 'least one character.'), _defineProperty(_ERROR_MAP, CODES.BAD_VAPID_KEY, 'The public VAPID key must be a string with at ' + 'least one character.'), _defineProperty(_ERROR_MAP, CODES.BAD_SUBSCRIPTION, 'The subscription must be a valid ' + 'PushSubscription.'), _defineProperty(_ERROR_MAP, CODES.BAD_TOKEN, 'The FCM Token used for storage / lookup was not ' + 'a valid token string.'), _defineProperty(_ERROR_MAP, CODES.BAD_PUSH_SET, 'The FCM push set used for storage / lookup was not ' + 'not a valid push set string.'), _defineProperty(_ERROR_MAP, CODES.FAILED_DELETE_VAPID_KEY, 'The VAPID key could not be deleted.'), _ERROR_MAP);
exports.default = {
    codes: CODES,
    map: ERROR_MAP
};
module.exports = exports['default'];
//# sourceMappingURL=errors.js.map


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(25)
  , LIBRARY        = __webpack_require__(34)
  , wksExt         = __webpack_require__(102)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(54)('keys')
  , uid    = __webpack_require__(33);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(26)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(74).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(20);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(20);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(34)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(12)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(10)
  , Iterators      = __webpack_require__(45)
  , $iterCreate    = __webpack_require__(82)
  , setToStringTag = __webpack_require__(43)
  , getPrototypeOf = __webpack_require__(17)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(37)
  , descriptor     = __webpack_require__(30)
  , setToStringTag = __webpack_require__(43)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(58)
  , defined  = __webpack_require__(20);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(45)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(30);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(52)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(45);
module.exports = __webpack_require__(25).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(36)
  , toLength = __webpack_require__(8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(46)
  , step             = __webpack_require__(117)
  , Iterators        = __webpack_require__(45)
  , toIObject        = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(81)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(13)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(26)
  , invoke             = __webpack_require__(57)
  , html               = __webpack_require__(73)
  , cel                = __webpack_require__(68)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(19)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(91).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(19)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(34)
  , $typed         = __webpack_require__(63)
  , hide           = __webpack_require__(11)
  , redefineAll    = __webpack_require__(41)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(40)
  , toInteger      = __webpack_require__(32)
  , toLength       = __webpack_require__(8)
  , gOPN           = __webpack_require__(38).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(88)
  , setToStringTag = __webpack_require__(43)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var scope = void 0;
if (typeof global !== 'undefined') {
    scope = global;
} else if (typeof self !== 'undefined') {
    scope = self;
} else {
    try {
        scope = Function('return this')();
    } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
    }
}
var PromiseImpl = scope.Promise || __webpack_require__(334);
var local = exports.local = {
    Promise: PromiseImpl,
    GoogPromise: PromiseImpl
};
//# sourceMappingURL=shared_promise.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.patchCapture = patchCapture;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error.captureStackTrace;
// Export for faking in tests
function patchCapture(captureFake) {
    var result = captureStackTrace;
    captureStackTrace = captureFake;
    return result;
}

var FirebaseError = exports.FirebaseError = function FirebaseError(code, message) {
    _classCallCheck(this, FirebaseError);

    this.code = code;
    this.message = message;

    // We want the stack value, if implemented by Error
    if (captureStackTrace) {
        // Patches this.stack, omitted calls above ErrorFactory#create
        captureStackTrace(this, ErrorFactory.prototype.create);
    } else {
        var err = Error.apply(this, arguments);
        this.name = ERROR_NAME;
        // Make non-enumerable getter for the property.
        Object.defineProperty(this, 'stack', {
            get: function get() {
                return err.stack;
            }
        });
    }
};
// Back-door inheritance


FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;

var ErrorFactory = exports.ErrorFactory = function () {
    function ErrorFactory(service, serviceName, errors) {
        _classCallCheck(this, ErrorFactory);

        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }

    _createClass(ErrorFactory, [{
        key: 'create',
        value: function create(code, data) {
            if (data === undefined) {
                data = {};
            }
            var template = this.errors[code];
            var fullCode = this.service + '/' + code;
            var message = void 0;
            if (template === undefined) {
                message = "Error";
            } else {
                message = template.replace(this.pattern, function (match, key) {
                    var value = data[key];
                    return value !== undefined ? value.toString() : '<' + key + '?>';
                });
            }
            // Service: Error message (service/code).
            message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
            var err = new FirebaseError(fullCode, message);
            // Populate the Error object with message parts for programmatic
            // accesses (e.g., e.file).
            for (var prop in data) {
                if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                    continue;
                }
                err[prop] = data[prop];
            }
            return err;
        }
    }]);

    return ErrorFactory;
}();
//# sourceMappingURL=errors.js.map


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StringData = exports.StringFormat = undefined;
exports.formatValidator = formatValidator;
exports.dataFromString = dataFromString;
exports.utf8Bytes_ = utf8Bytes_;
exports.percentEncodedBytes_ = percentEncodedBytes_;
exports.base64Bytes_ = base64Bytes_;
exports.dataURLBytes_ = dataURLBytes_;
exports.dataURLContentType_ = dataURLContentType_;

var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                          *
                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                          *
                                                                                                                                                          *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                          *
                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                          * limitations under the License.
                                                                                                                                                          */


var StringFormat = exports.StringFormat = {
    RAW: 'raw',
    BASE64: 'base64',
    BASE64URL: 'base64url',
    DATA_URL: 'data_url'
};
function formatValidator(stringFormat) {
    switch (stringFormat) {
        case StringFormat.RAW:
        case StringFormat.BASE64:
        case StringFormat.BASE64URL:
        case StringFormat.DATA_URL:
            return;
        default:
            throw 'Expected one of the event types: [' + StringFormat.RAW + ', ' + StringFormat.BASE64 + ', ' + StringFormat.BASE64URL + ', ' + StringFormat.DATA_URL + '].';
    }
}
/**
 * @struct
 */

var StringData = exports.StringData = function StringData(data, opt_contentType) {
    _classCallCheck(this, StringData);

    this.data = data;
    this.contentType = opt_contentType || null;
};

function dataFromString(format, string) {
    switch (format) {
        case StringFormat.RAW:
            return new StringData(utf8Bytes_(string));
        case StringFormat.BASE64:
        case StringFormat.BASE64URL:
            return new StringData(base64Bytes_(format, string));
        case StringFormat.DATA_URL:
            return new StringData(dataURLBytes_(string), dataURLContentType_(string));
    }
    // assert(false);
    throw errorsExports.unknown();
}
function utf8Bytes_(string) {
    var b = [];
    for (var i = 0; i < string.length; i++) {
        var c = string.charCodeAt(i);
        if (c <= 127) {
            b.push(c);
        } else {
            if (c <= 2047) {
                b.push(192 | c >> 6, 128 | c & 63);
            } else {
                if ((c & 64512) == 55296) {
                    // The start of a surrogate pair.
                    var valid = i < string.length - 1 && (string.charCodeAt(i + 1) & 64512) == 56320;
                    if (!valid) {
                        // The second surrogate wasn't there.
                        b.push(239, 191, 189);
                    } else {
                        var hi = c;
                        var lo = string.charCodeAt(++i);
                        c = 65536 | (hi & 1023) << 10 | lo & 1023;
                        b.push(240 | c >> 18, 128 | c >> 12 & 63, 128 | c >> 6 & 63, 128 | c & 63);
                    }
                } else {
                    if ((c & 64512) == 56320) {
                        // Invalid low surrogate.
                        b.push(239, 191, 189);
                    } else {
                        b.push(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
                    }
                }
            }
        }
    }
    return new Uint8Array(b);
}
function percentEncodedBytes_(string) {
    var decoded = void 0;
    try {
        decoded = decodeURIComponent(string);
    } catch (e) {
        throw errorsExports.invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
    }
    return utf8Bytes_(decoded);
}
function base64Bytes_(format, string) {
    switch (format) {
        case StringFormat.BASE64:
            {
                var hasMinus = string.indexOf('-') !== -1;
                var hasUnder = string.indexOf('_') !== -1;
                if (hasMinus || hasUnder) {
                    var invalidChar = hasMinus ? '-' : '_';
                    throw errorsExports.invalidFormat(format, 'Invalid character \'' + invalidChar + '\' found: is it base64url encoded?');
                }
                break;
            }
        case StringFormat.BASE64URL:
            {
                var hasPlus = string.indexOf('+') !== -1;
                var hasSlash = string.indexOf('/') !== -1;
                if (hasPlus || hasSlash) {
                    var _invalidChar = hasPlus ? '+' : '/';
                    throw errorsExports.invalidFormat(format, 'Invalid character \'' + _invalidChar + '\' found: is it base64 encoded?');
                }
                string = string.replace(/-/g, '+').replace(/_/g, '/');
                break;
            }
    }
    var bytes = void 0;
    try {
        bytes = atob(string);
    } catch (e) {
        throw errorsExports.invalidFormat(format, 'Invalid character found');
    }
    var array = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i);
    }
    return array;
}
/**
 * @struct
 */

var DataURLParts = function DataURLParts(dataURL) {
    _classCallCheck(this, DataURLParts);

    this.base64 = false;
    this.contentType = null;
    var matches = dataURL.match(/^data:([^,]+)?,/);
    if (matches === null) {
        throw errorsExports.invalidFormat(StringFormat.DATA_URL, 'Must be formatted \'data:[<mediatype>][;base64],<data>');
    }
    var middle = matches[1] || null;
    if (middle != null) {
        this.base64 = endsWith(middle, ';base64');
        this.contentType = this.base64 ? middle.substring(0, middle.length - ';base64'.length) : middle;
    }
    this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
};

function dataURLBytes_(string) {
    var parts = new DataURLParts(string);
    if (parts.base64) {
        return base64Bytes_(StringFormat.BASE64, parts.rest);
    } else {
        return percentEncodedBytes_(parts.rest);
    }
}
function dataURLContentType_(string) {
    var parts = new DataURLParts(string);
    return parts.contentType;
}
function endsWith(s, end) {
    var longEnough = s.length >= end.length;
    if (!longEnough) {
        return false;
    }
    return s.substring(s.length - end.length) === end;
}
//# sourceMappingURL=string.js.map


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArgSpec = undefined;
exports.validate = validate;
exports.and_ = and_;
exports.stringSpec = stringSpec;
exports.uploadDataSpec = uploadDataSpec;
exports.metadataSpec = metadataSpec;
exports.nonNegativeNumberSpec = nonNegativeNumberSpec;
exports.looseObjectSpec = looseObjectSpec;
exports.nullFunctionSpec = nullFunctionSpec;

var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

var _metadata = __webpack_require__(98);

var MetadataUtils = _interopRequireWildcard(_metadata);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                          *
                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                          *
                                                                                                                                                          *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                          *
                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                          * limitations under the License.
                                                                                                                                                          */


/**
 * @param name Name of the function.
 * @param specs Argument specs.
 * @param passed The actual arguments passed to the function.
 * @throws {fbs.Error} If the arguments are invalid.
 */
function validate(name, specs, passed) {
    var minArgs = specs.length;
    var maxArgs = specs.length;
    for (var i = 0; i < specs.length; i++) {
        if (specs[i].optional) {
            minArgs = i;
            break;
        }
    }
    var validLength = minArgs <= passed.length && passed.length <= maxArgs;
    if (!validLength) {
        throw errorsExports.invalidArgumentCount(minArgs, maxArgs, name, passed.length);
    }
    for (var _i = 0; _i < passed.length; _i++) {
        try {
            specs[_i].validator(passed[_i]);
        } catch (e) {
            if (e instanceof Error) {
                throw errorsExports.invalidArgument(_i, name, e.message);
            } else {
                throw errorsExports.invalidArgument(_i, name, e);
            }
        }
    }
}
/**
 * @struct
 */

var ArgSpec = exports.ArgSpec = function ArgSpec(validator, opt_optional) {
    _classCallCheck(this, ArgSpec);

    var self = this;
    this.validator = function (p) {
        if (self.optional && !type.isJustDef(p)) {
            return;
        }
        validator(p);
    };
    this.optional = !!opt_optional;
};

function and_(v1, v2) {
    return function (p) {
        v1(p);
        v2(p);
    };
}
function stringSpec(opt_validator, opt_optional) {
    function stringValidator(p) {
        if (!type.isString(p)) {
            throw 'Expected string.';
        }
    }
    var validator = void 0;
    if (opt_validator) {
        validator = and_(stringValidator, opt_validator);
    } else {
        validator = stringValidator;
    }
    return new ArgSpec(validator, opt_optional);
}
function uploadDataSpec() {
    return new ArgSpec(function (p) {
        var valid = p instanceof Uint8Array || p instanceof ArrayBuffer || type.isNativeBlobDefined() && p instanceof Blob;
        if (!valid) {
            throw 'Expected Blob or File.';
        }
    });
}
function metadataSpec(opt_optional) {
    return new ArgSpec(MetadataUtils.metadataValidator, opt_optional);
}
function nonNegativeNumberSpec() {
    return new ArgSpec(function (p) {
        var valid = type.isNumber(p) && p >= 0;
        if (!valid) {
            throw 'Expected a number 0 or greater.';
        }
    });
}
function looseObjectSpec(opt_validator, opt_optional) {
    return new ArgSpec(function (p) {
        var isLooseObject = p === null || type.isDef(p) && p instanceof Object;
        if (!isLooseObject) {
            throw 'Expected an Object.';
        }
        if (opt_validator !== undefined && opt_validator !== null) {
            opt_validator(p);
        }
    }, opt_optional);
}
function nullFunctionSpec(opt_optional) {
    return new ArgSpec(function (p) {
        var valid = p === null || type.isFunction(p);
        if (!valid) {
            throw 'Expected a Function.';
        }
    }, opt_optional);
}
//# sourceMappingURL=args.js.map


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mapping = undefined;
exports.noXform_ = noXform_;
exports.xformPath = xformPath;
exports.getMappings = getMappings;
exports.addRef = addRef;
exports.fromResource = fromResource;
exports.fromResourceString = fromResourceString;
exports.toResourceString = toResourceString;
exports.metadataValidator = metadataValidator;

var _json = __webpack_require__(344);

var json = _interopRequireWildcard(_json);

var _location = __webpack_require__(66);

var _path = __webpack_require__(134);

var path = _interopRequireWildcard(_path);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

var _url = __webpack_require__(99);

var UrlUtils = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                          *
                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                          *
                                                                                                                                                          *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                          *
                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                          * limitations under the License.
                                                                                                                                                          */


function noXform_(metadata, value) {
    return value;
}
/**
 * @struct
 */

var Mapping = exports.Mapping = function Mapping(server, opt_local, opt_writable, opt_xform) {
    _classCallCheck(this, Mapping);

    this.server = server;
    this.local = opt_local || server;
    this.writable = !!opt_writable;
    this.xform = opt_xform || noXform_;
};

var mappings_ = null;
function xformPath(fullPath) {
    var valid = type.isString(fullPath);
    if (!valid || fullPath.length < 2) {
        return fullPath;
    } else {
        fullPath = fullPath;
        return path.lastComponent(fullPath);
    }
}
function getMappings() {
    if (mappings_) {
        return mappings_;
    }
    var mappings = [];
    mappings.push(new Mapping('bucket'));
    mappings.push(new Mapping('generation'));
    mappings.push(new Mapping('metageneration'));
    mappings.push(new Mapping('name', 'fullPath', true));

    var nameMapping = new Mapping('name');
    nameMapping.xform = function (metadata, fullPath) {
        return xformPath(fullPath);
    };
    mappings.push(nameMapping);
    /**
     * Coerces the second param to a number, if it is defined.
     */

    var sizeMapping = new Mapping('size');
    sizeMapping.xform = function (metadata, size) {
        if (type.isDef(size)) {
            return +size;
        } else {
            return size;
        }
    };
    mappings.push(sizeMapping);
    mappings.push(new Mapping('timeCreated'));
    mappings.push(new Mapping('updated'));
    mappings.push(new Mapping('md5Hash', null, true));
    mappings.push(new Mapping('cacheControl', null, true));
    mappings.push(new Mapping('contentDisposition', null, true));
    mappings.push(new Mapping('contentEncoding', null, true));
    mappings.push(new Mapping('contentLanguage', null, true));
    mappings.push(new Mapping('contentType', null, true));
    mappings.push(new Mapping('metadata', 'customMetadata', true));
    /**
     * Transforms a comma-separated string of tokens into a list of download
     * URLs.
     */

    mappings.push(new Mapping('downloadTokens', 'downloadURLs', false, function (metadata, tokens) {
        var valid = type.isString(tokens) && tokens.length > 0;
        if (!valid) {
            // This can happen if objects are uploaded through GCS and retrieved
            // through list, so we don't want to throw an Error.
            return [];
        }
        var encode = encodeURIComponent;
        var tokensList = tokens.split(',');
        var urls = tokensList.map(function (token) {
            var bucket = metadata['bucket'];
            var path = metadata['fullPath'];
            var urlPart = '/b/' + encode(bucket) + '/o/' + encode(path);
            var base = UrlUtils.makeDownloadUrl(urlPart);
            var queryString = UrlUtils.makeQueryString({ 'alt': 'media', 'token': token });
            return base + queryString;
        });
        return urls;
    }));
    mappings_ = mappings;
    return mappings_;
}
function addRef(metadata, authWrapper) {
    Object.defineProperty(metadata, 'ref', { get: function () {
            var bucket = metadata['bucket'];
            var path = metadata['fullPath'];
            var loc = new _location.Location(bucket, path);
            return authWrapper.makeStorageReference(loc);
        } });
}
function fromResource(authWrapper, resource, mappings) {
    var metadata = {};
    metadata['type'] = 'file';
    var len = mappings.length;
    for (var i = 0; i < len; i++) {
        var mapping = mappings[i];
        metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
    }
    addRef(metadata, authWrapper);
    return metadata;
}
function fromResourceString(authWrapper, resourceString, mappings) {
    var obj = json.jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }

    return fromResource(authWrapper, obj, mappings);
}
function toResourceString(metadata, mappings) {
    var resource = {};
    var len = mappings.length;
    for (var i = 0; i < len; i++) {
        var mapping = mappings[i];
        if (mapping.writable) {
            resource[mapping.server] = metadata[mapping.local];
        }
    }
    return JSON.stringify(resource);
}
function metadataValidator(p) {
    var validType = p && type.isObject(p);
    if (!validType) {
        throw 'Expected Metadata object.';
    }
    for (var key in p) {
        var val = p[key];
        if (key === 'customMetadata') {
            if (!type.isObject(val)) {
                throw 'Expected object for \'customMetadata\' mapping.';
            }
        } else {
            if (type.isNonNullObject(val)) {
                throw 'Mapping for \'' + key + '\' cannot be an object.';
            }
        }
    }
}
//# sourceMappingURL=metadata.js.map


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeNormalUrl = makeNormalUrl;
exports.makeDownloadUrl = makeDownloadUrl;
exports.makeUploadUrl = makeUploadUrl;
exports.makeQueryString = makeQueryString;

var _constants = __webpack_require__(65);

var constants = _interopRequireWildcard(_constants);

var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @fileoverview Functions to create and manipulate URLs for the server API.
 */
function makeNormalUrl(urlPart) {
    return constants.domainBase + constants.apiBaseUrl + urlPart;
}
function makeDownloadUrl(urlPart) {
    return constants.downloadBase + constants.apiBaseUrl + urlPart;
}
function makeUploadUrl(urlPart) {
    return constants.domainBase + constants.apiUploadBaseUrl + urlPart;
}
function makeQueryString(params) {
    var encode = encodeURIComponent;
    var queryPart = '?';
    object.forEach(params, function (key, val) {
        var nextPart = encode(key) + '=' + encode(val);
        queryPart = queryPart + nextPart + '&';
    });
    // Chop off the extra '&' or '?' on the end
    queryPart = queryPart.slice(0, -1);
    return queryPart;
}
//# sourceMappingURL=url.js.map


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contains = contains;
exports.clone = clone;
exports.remove = remove;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * Returns true if the object is contained in the array (compared with ===).
 * @template T
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function contains(array, elem) {
    return array.indexOf(elem) !== -1;
}
/**
 * Returns a shallow copy of the array or array-like object (e.g. arguments).
 * @template T
 */
function clone(arraylike) {
    return Array.prototype.slice.call(arraylike);
}
/**
 * Removes the given element from the given array, if it is contained.
 * Directly modifies the passed-in array.
 * @template T
 */
function remove(array, elem) {
    var i = array.indexOf(elem);
    if (i !== -1) {
        array.splice(i, 1);
    }
}
//# sourceMappingURL=array.js.map


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(68)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(10)
  , toIObject    = __webpack_require__(14)
  , arrayIndexOf = __webpack_require__(55)(false)
  , IE_PROTO     = __webpack_require__(70)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(35);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14)
  , gOPN      = __webpack_require__(38).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(35)
  , gOPS     = __webpack_require__(56)
  , pIE      = __webpack_require__(51)
  , toObject = __webpack_require__(9)
  , IObject  = __webpack_require__(50)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(13)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(57)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(44).trim
  , ws        = __webpack_require__(75)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(44).trim;

module.exports = 1 / $parseFloat(__webpack_require__(75) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(9)
  , IObject   = __webpack_require__(50)
  , toLength  = __webpack_require__(8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(36)
  , toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(60)
});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(120);

// 23.1 Map Objects
module.exports = __webpack_require__(62)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(37)
  , redefineAll = __webpack_require__(41)
  , ctx         = __webpack_require__(26)
  , anInstance  = __webpack_require__(40)
  , defined     = __webpack_require__(20)
  , forOf       = __webpack_require__(47)
  , $iterDefine = __webpack_require__(81)
  , step        = __webpack_require__(117)
  , setSpecies  = __webpack_require__(39)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(31).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(120);

// 23.2 Set Objects
module.exports = __webpack_require__(62)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(24)(0)
  , redefine     = __webpack_require__(12)
  , meta         = __webpack_require__(31)
  , assign       = __webpack_require__(106)
  , weak         = __webpack_require__(123)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(62)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(41)
  , getWeak           = __webpack_require__(31).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(40)
  , forOf             = __webpack_require__(47)
  , createArrayMethod = __webpack_require__(24)
  , $has              = __webpack_require__(10)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(38)
  , gOPS     = __webpack_require__(56)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8)
  , repeat   = __webpack_require__(77)
  , defined  = __webpack_require__(20);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(35)
  , toIObject = __webpack_require__(14)
  , isEnum    = __webpack_require__(51).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(52)
  , from    = __webpack_require__(128);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(47);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = __webpack_require__(332);

var Firebase = _interopRequireWildcard(_firebase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// my coffee places with detail info
var moduleFirebase = function () {

  var param = [];
  // variable with config data to get to Firebase
  var _config = {
    apiKey: "AIzaSyA0PL06i_Fdi70FkUxOo4I9JToVS-632U8",
    authDomain: "my-awesome-coffee.firebaseapp.com",
    databaseURL: "https://my-awesome-coffee.firebaseio.com",
    projectId: "my-awesome-coffee",
    storageBucket: "my-awesome-coffee.appspot.com",
    messagingSenderId: "58575921422"
  };

  // getting info from database
  var _fb = Firebase.initializeApp(_config);
  var _db = _fb.database().ref();

  // set text to name from firebase set adresses from firebase (to the next elems)
  var _setName = function _setName() {
    _db.on('value', function (snap) {

      var _random = Math.round(Math.random() * (snap.val().length - 4));

      $(".cafe-name").each(function (i, elem) {
        // find elements with class cafe-name
        $(elem).text(snap.val()[_random + i].name);
        // console.log(_random);
      });

      $(".cafe-name").each(function (i, elem) {
        // find elements with class cafe-name
        $(elem).next().text("ul. " + snap.val()[_random + i].adress);
        // console.log(_random);
      });
    });
  };

  // set coffeeAddress on one of the firebase cafes address
  var _coffeeAddress = function _coffeeAddress() {
    _db.on('value', function (snap) {
      var _loop = function _loop(i) {
        param.push([{
          lat: function lat() {
            return snap.val()[i].geo.lat;
          },
          lng: function lng() {
            return snap.val()[i].geo.lng;
          }
        }, {
          name: function name() {
            return snap.val()[i].name;
          },
          adress: function adress() {
            return snap.val()[i].adress;
          },
          hours: function hours() {
            return snap.val()[i].hours;
          }
        }]);
      };

      for (var i = 0; i < snap.val().length; i++) {
        _loop(i);
      }
    });
    return param; // structure: [ [{lat() , lng()},{name() , adress()}] , [{},{}] , [{},{}] , ...  ] - if I want get to adress -> moduleFirebase.coffeeAddress()[1][1].adress()
  };

  return {
    setName: _setName,
    coffeeAddress: _coffeeAddress
  };
}();

exports.default = moduleFirebase;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createSubscribe = createSubscribe;
exports.async = async;

var _shared_promise = __webpack_require__(94);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalPromise = _shared_promise.local.Promise;
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */

var ObserverProxy = function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;

        _classCallCheck(this, ObserverProxy);

        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = LocalPromise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task.then(function () {
            executor(_this);
        }).catch(function (e) {
            _this.error(e);
        });
    }

    _createClass(ObserverProxy, [{
        key: 'next',
        value: function next(value) {
            this.forEachObserver(function (observer) {
                observer.next(value);
            });
        }
    }, {
        key: 'error',
        value: function error(_error) {
            this.forEachObserver(function (observer) {
                observer.error(_error);
            });
            this.close(_error);
        }
    }, {
        key: 'complete',
        value: function complete() {
            this.forEachObserver(function (observer) {
                observer.complete();
            });
            this.close();
        }
        /**
         * Subscribe function that can be used to add an Observer to the fan-out list.
         *
         * - We require that no event is sent to a subscriber sychronously to their
         *   call to subscribe().
         */

    }, {
        key: 'subscribe',
        value: function subscribe(nextOrObserver, error, complete) {
            var _this2 = this;

            var observer = void 0;
            if (nextOrObserver === undefined && error === undefined && complete === undefined) {
                throw new Error("Missing Observer.");
            }
            // Assemble an Observer object when passed as callback functions.
            if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
                observer = nextOrObserver;
            } else {
                observer = {
                    next: nextOrObserver,
                    error: error,
                    complete: complete
                };
            }
            if (observer.next === undefined) {
                observer.next = noop;
            }
            if (observer.error === undefined) {
                observer.error = noop;
            }
            if (observer.complete === undefined) {
                observer.complete = noop;
            }
            var unsub = this.unsubscribeOne.bind(this, this.observers.length);
            // Attempt to subscribe to a terminated Observable - we
            // just respond to the Observer with the final error or complete
            // event.
            if (this.finalized) {
                this.task.then(function () {
                    try {
                        if (_this2.finalError) {
                            observer.error(_this2.finalError);
                        } else {
                            observer.complete();
                        }
                    } catch (e) {
                        // nothing
                    }
                });
            }
            this.observers.push(observer);
            return unsub;
        }
        // Unsubscribe is synchronous - we guarantee that no events are sent to
        // any unsubscribed Observer.

    }, {
        key: 'unsubscribeOne',
        value: function unsubscribeOne(i) {
            if (this.observers === undefined || this.observers[i] === undefined) {
                return;
            }
            delete this.observers[i];
            this.observerCount -= 1;
            if (this.observerCount === 0 && this.onNoObservers !== undefined) {
                this.onNoObservers(this);
            }
        }
    }, {
        key: 'forEachObserver',
        value: function forEachObserver(fn) {
            if (this.finalized) {
                // Already closed by previous event....just eat the additional values.
                return;
            }
            // Since sendOne calls asynchronously - there is no chance that
            // this.observers will become undefined.
            for (var i = 0; i < this.observers.length; i++) {
                this.sendOne(i, fn);
            }
        }
        // Call the Observer via one of it's callback function. We are careful to
        // confirm that the observe has not been unsubscribed since this asynchronous
        // function had been queued.

    }, {
        key: 'sendOne',
        value: function sendOne(i, fn) {
            var _this3 = this;

            // Execute the callback asynchronously
            this.task.then(function () {
                if (_this3.observers !== undefined && _this3.observers[i] !== undefined) {
                    try {
                        fn(_this3.observers[i]);
                    } catch (e) {
                        // Ignore exceptions raised in Observers or missing methods of an
                        // Observer.
                        // Log error to console. b/31404806
                        if (typeof console !== "undefined" && console.error) {
                            console.error(e);
                        }
                    }
                }
            });
        }
    }, {
        key: 'close',
        value: function close(err) {
            var _this4 = this;

            if (this.finalized) {
                return;
            }
            this.finalized = true;
            if (err !== undefined) {
                this.finalError = err;
            }
            // Proxy is no longer needed - garbage collect references
            this.task.then(function () {
                _this4.observers = undefined;
                _this4.onNoObservers = undefined;
            });
        }
    }]);

    return ObserverProxy;
}();
/** Turn synchronous function into one called asynchronously. */


function async(fn, onError) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        LocalPromise.resolve(true).then(function () {
            fn.apply(undefined, args);
        }).catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var method = _step.value;

            if (method in obj && typeof obj[method] === 'function') {
                return true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
}
function noop() {
    // do nothing
}
//# sourceMappingURL=subscribe.js.map


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.taskStateFromInternalTaskState = taskStateFromInternalTaskState;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var TaskEvent = exports.TaskEvent = {
    /** Triggered whenever the task changes or progress is updated. */
    STATE_CHANGED: 'state_changed'
};
var InternalTaskState = exports.InternalTaskState = {
    RUNNING: 'running',
    PAUSING: 'pausing',
    PAUSED: 'paused',
    SUCCESS: 'success',
    CANCELING: 'canceling',
    CANCELED: 'canceled',
    ERROR: 'error'
};
var TaskState = exports.TaskState = {
    /** The task is currently transferring data. */
    RUNNING: 'running',
    /** The task was paused by the user. */
    PAUSED: 'paused',
    /** The task completed successfully. */
    SUCCESS: 'success',
    /** The task was canceled. */
    CANCELED: 'canceled',
    /** The task failed with an error. */
    ERROR: 'error'
};
function taskStateFromInternalTaskState(state) {
    switch (state) {
        case InternalTaskState.RUNNING:
        case InternalTaskState.PAUSING:
        case InternalTaskState.CANCELING:
            return TaskState.RUNNING;
        case InternalTaskState.PAUSED:
            return TaskState.PAUSED;
        case InternalTaskState.SUCCESS:
            return TaskState.SUCCESS;
        case InternalTaskState.CANCELED:
            return TaskState.CANCELED;
        case InternalTaskState.ERROR:
            return TaskState.ERROR;
        default:
            // TODO(andysoto): assert(false);
            return TaskState.ERROR;
    }
}
//# sourceMappingURL=taskenums.js.map


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @enum{number}
 */
var ErrorCode = exports.ErrorCode = undefined;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
    ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=xhrio.js.map


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/**
 * @fileoverview Defines the Firebase Storage Reference class.
 */


var _args = __webpack_require__(97);

var args = _interopRequireWildcard(_args);

var _blob = __webpack_require__(135);

var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

var _location = __webpack_require__(66);

var _metadata = __webpack_require__(98);

var metadata = _interopRequireWildcard(_metadata);

var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

var _path = __webpack_require__(134);

var path = _interopRequireWildcard(_path);

var _requests = __webpack_require__(136);

var requests = _interopRequireWildcard(_requests);

var _string = __webpack_require__(96);

var fbsString = _interopRequireWildcard(_string);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

var _task = __webpack_require__(347);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @param location An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */
var Reference = exports.Reference = function () {
    function Reference(authWrapper, location) {
        _classCallCheck(this, Reference);

        this.authWrapper = authWrapper;
        if (location instanceof _location.Location) {
            this.location = location;
        } else {
            this.location = _location.Location.makeFromUrl(location);
        }
    }
    /**
     * @return The URL for the bucket and path this object references,
     *     in the form gs://<bucket>/<object-path>
     * @override
     */


    _createClass(Reference, [{
        key: 'toString',
        value: function toString() {
            args.validate('toString', [], arguments);
            return 'gs://' + this.location.bucket + '/' + this.location.path;
        }
    }, {
        key: 'newRef',
        value: function newRef(authWrapper, location) {
            return new Reference(authWrapper, location);
        }
    }, {
        key: 'mappings',
        value: function mappings() {
            return metadata.getMappings();
        }
        /**
         * @return A reference to the object obtained by
         *     appending childPath, removing any duplicate, beginning, or trailing
         *     slashes.
         */

    }, {
        key: 'child',
        value: function child(childPath) {
            args.validate('child', [args.stringSpec()], arguments);
            var newPath = path.child(this.location.path, childPath);
            var location = new _location.Location(this.location.bucket, newPath);
            return this.newRef(this.authWrapper, location);
        }
        /**
         * @return A reference to the parent of the
         *     current object, or null if the current object is the root.
         */

    }, {
        key: 'put',

        /**
         * Uploads a blob to this object's location.
         * @param data The blob to upload.
         * @return An UploadTask that lets you control and
         *     observe the upload.
         */
        value: function put(data) {
            var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            args.validate('put', [args.uploadDataSpec(), args.metadataSpec(true)], arguments);
            this.throwIfRoot_('put');
            return new _task.UploadTask(this, this.authWrapper, this.location, this.mappings(), new _blob.FbsBlob(data), metadata);
        }
        /**
         * Uploads a string to this object's location.
         * @param string The string to upload.
         * @param opt_format The format of the string to upload.
         * @return An UploadTask that lets you control and
         *     observe the upload.
         */

    }, {
        key: 'putString',
        value: function putString(string) {
            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _string.StringFormat.RAW;
            var opt_metadata = arguments[2];

            args.validate('putString', [args.stringSpec(), args.stringSpec(fbsString.formatValidator, true), args.metadataSpec(true)], arguments);
            this.throwIfRoot_('putString');
            var data = fbsString.dataFromString(format, string);
            var metadata = object.clone(opt_metadata);
            if (!type.isDef(metadata['contentType']) && type.isDef(data.contentType)) {
                metadata['contentType'] = data.contentType;
            }
            return new _task.UploadTask(this, this.authWrapper, this.location, this.mappings(), new _blob.FbsBlob(data.data, true), metadata);
        }
        /**
         * Deletes the object at this location.
         * @return A promise that resolves if the deletion succeeds.
         */

    }, {
        key: 'delete',
        value: function _delete() {
            args.validate('delete', [], arguments);
            this.throwIfRoot_('delete');
            var self = this;
            return this.authWrapper.getAuthToken().then(function (authToken) {
                var requestInfo = requests.deleteObject(self.authWrapper, self.location);
                return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
            });
        }
        /**
         *     A promise that resolves with the metadata for this object. If this
         *     object doesn't exist or metadata cannot be retreived, the promise is
         *     rejected.
         */

    }, {
        key: 'getMetadata',
        value: function getMetadata() {
            args.validate('getMetadata', [], arguments);
            this.throwIfRoot_('getMetadata');
            var self = this;
            return this.authWrapper.getAuthToken().then(function (authToken) {
                var requestInfo = requests.getMetadata(self.authWrapper, self.location, self.mappings());
                return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
            });
        }
        /**
         * Updates the metadata for this object.
         * @param metadata The new metadata for the object.
         *     Only values that have been explicitly set will be changed. Explicitly
         *     setting a value to null will remove the metadata.
         * @return A promise that resolves
         *     with the new metadata for this object.
         *     @see firebaseStorage.Reference.prototype.getMetadata
         */

    }, {
        key: 'updateMetadata',
        value: function updateMetadata(metadata) {
            args.validate('updateMetadata', [args.metadataSpec()], arguments);
            this.throwIfRoot_('updateMetadata');
            var self = this;
            return this.authWrapper.getAuthToken().then(function (authToken) {
                var requestInfo = requests.updateMetadata(self.authWrapper, self.location, metadata, self.mappings());
                return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
            });
        }
        /**
         * @return A promise that resolves with the download
         *     URL for this object.
         */

    }, {
        key: 'getDownloadURL',
        value: function getDownloadURL() {
            args.validate('getDownloadURL', [], arguments);
            this.throwIfRoot_('getDownloadURL');
            return this.getMetadata().then(function (metadata) {
                var url = metadata['downloadURLs'][0];
                if (type.isDef(url)) {
                    return url;
                } else {
                    throw errorsExports.noDownloadURL();
                }
            });
        }
    }, {
        key: 'throwIfRoot_',
        value: function throwIfRoot_(name) {
            if (this.location.path === '') {
                throw errorsExports.invalidRootOperation(name);
            }
        }
    }, {
        key: 'parent',
        get: function get() {
            var newPath = path.parent(this.location.path);
            if (newPath === null) {
                return null;
            }
            var location = new _location.Location(this.location.bucket, newPath);
            return this.newRef(this.authWrapper, location);
        }
        /**
         * @return An reference to the root of this
         *     object's bucket.
         */

    }, {
        key: 'root',
        get: function get() {
            var location = new _location.Location(this.location.bucket, '');
            return this.newRef(this.authWrapper, location);
        }
    }, {
        key: 'bucket',
        get: function get() {
            return this.location.bucket;
        }
    }, {
        key: 'fullPath',
        get: function get() {
            return this.location.path;
        }
    }, {
        key: 'name',
        get: function get() {
            return path.lastComponent(this.location.path);
        }
    }, {
        key: 'storage',
        get: function get() {
            return this.authWrapper.service();
        }
    }]);

    return Reference;
}();
//# sourceMappingURL=reference.js.map


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parent = parent;
exports.child = child;
exports.lastComponent = lastComponent;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @fileoverview Contains helper methods for manipulating paths.
 */
/**
 * @return Null if the path is already at the root.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function parent(path) {
    if (path.length == 0) {
        return null;
    }
    var index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    var newPath = path.slice(0, index);
    return newPath;
}
function child(path, childPath) {
    var canonicalChildPath = childPath.split('/').filter(function (component) {
        return component.length > 0;
    }).join('/');
    if (path.length === 0) {
        return canonicalChildPath;
    } else {
        return path + '/' + canonicalChildPath;
    }
}
/**
 * Returns the last component of a path.
 * '/foo/bar' -> 'bar'
 * '/foo/bar/baz/' -> 'baz/'
 * '/a' -> 'a'
 */
function lastComponent(path) {
    var index = path.lastIndexOf('/', path.length - 2);
    if (index === -1) {
        return path;
    } else {
        return path.slice(index + 1);
    }
}
//# sourceMappingURL=path.js.map


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FbsBlob = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/**
 * @file Provides a Blob-like wrapper for various binary types (including the
 * native Blob type). This makes it possible to upload types like ArrayBuffers,
 * making uploads possible in environments without the native Blob type.
 */


var _fs = __webpack_require__(345);

var fs = _interopRequireWildcard(_fs);

var _string = __webpack_require__(96);

var string = _interopRequireWildcard(_string);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param opt_elideCopy If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 */
var FbsBlob = exports.FbsBlob = function () {
    function FbsBlob(data, opt_elideCopy) {
        _classCallCheck(this, FbsBlob);

        var size = 0;
        var blobType = '';
        if (type.isNativeBlob(data)) {
            this.data_ = data;
            size = data.size;
            blobType = data.type;
        } else if (data instanceof ArrayBuffer) {
            if (opt_elideCopy) {
                this.data_ = new Uint8Array(data);
            } else {
                this.data_ = new Uint8Array(data.byteLength);
                this.data_.set(new Uint8Array(data));
            }
            size = this.data_.length;
        } else if (data instanceof Uint8Array) {
            if (opt_elideCopy) {
                this.data_ = data;
            } else {
                this.data_ = new Uint8Array(data.length);
                this.data_.set(data);
            }
            size = data.length;
        }
        this.size_ = size;
        this.type_ = blobType;
    }

    _createClass(FbsBlob, [{
        key: 'size',
        value: function size() {
            return this.size_;
        }
    }, {
        key: 'type',
        value: function () {
            return this.type_;
        }
    }, {
        key: 'slice',
        value: function slice(startByte, endByte) {
            if (type.isNativeBlob(this.data_)) {
                var realBlob = this.data_;
                var sliced = fs.sliceBlob(realBlob, startByte, endByte);
                if (sliced === null) {
                    return null;
                }
                return new FbsBlob(sliced);
            } else {
                var slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
                return new FbsBlob(slice, true);
            }
        }
    }, {
        key: 'uploadData',
        value: function uploadData() {
            return this.data_;
        }
    }], [{
        key: 'getBlob',
        value: function getBlob() {
            for (var _len = arguments.length, var_args = Array(_len), _key = 0; _key < _len; _key++) {
                var_args[_key] = arguments[_key];
            }

            if (type.isNativeBlobDefined()) {
                var blobby = var_args.map(function (val) {
                    if (val instanceof FbsBlob) {
                        return val.data_;
                    } else {
                        return val;
                    }
                });
                return new FbsBlob(fs.getBlob.apply(null, blobby));
            } else {
                var uint8Arrays = var_args.map(function (val) {
                    if (type.isString(val)) {
                        return string.dataFromString(_string.StringFormat.RAW, val).data;
                    } else {
                        // Blobs don't exist, so this has to be a Uint8Array.
                        return val.data_;
                    }
                });
                var finalLength = 0;
                uint8Arrays.forEach(function (array) {
                    finalLength += array.byteLength;
                });
                var merged = new Uint8Array(finalLength);
                var index = 0;
                uint8Arrays.forEach(function (array) {
                    for (var i = 0; i < array.length; i++) {
                        merged[index++] = array[i];
                    }
                });
                return new FbsBlob(merged, true);
            }
        }
    }]);

    return FbsBlob;
}();
//# sourceMappingURL=blob.js.map


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resumableUploadChunkSize = exports.ResumableUploadStatus = undefined;
exports.handlerCheck = handlerCheck;
exports.metadataHandler = metadataHandler;
exports.sharedErrorHandler = sharedErrorHandler;
exports.objectErrorHandler = objectErrorHandler;
exports.getMetadata = getMetadata;
exports.updateMetadata = updateMetadata;
exports.deleteObject = deleteObject;
exports.determineContentType_ = determineContentType_;
exports.metadataForUpload_ = metadataForUpload_;
exports.multipartUpload = multipartUpload;
exports.checkResumeHeader_ = checkResumeHeader_;
exports.createResumableUpload = createResumableUpload;
exports.getResumableUploadStatus = getResumableUploadStatus;
exports.continueResumableUpload = continueResumableUpload;

var _array = __webpack_require__(100);

var array = _interopRequireWildcard(_array);

var _blob = __webpack_require__(135);

var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

var _metadata = __webpack_require__(98);

var MetadataUtils = _interopRequireWildcard(_metadata);

var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

var _requestinfo = __webpack_require__(346);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

var _url = __webpack_require__(99);

var UrlUtils = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                          *
                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                          *
                                                                                                                                                          *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                          *
                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                          * limitations under the License.
                                                                                                                                                          */


/**
 * Throws the UNKNOWN FirebaseStorageError if cndn is false.
 */
function handlerCheck(cndn) {
    if (!cndn) {
        throw errorsExports.unknown();
    }
}
function metadataHandler(authWrapper, mappings) {
    return function (xhr, text) {
        var metadata = MetadataUtils.fromResourceString(authWrapper, text, mappings);
        handlerCheck(metadata !== null);
        return metadata;
    };
}
function sharedErrorHandler(location) {
    return function (xhr, err) {
        var newErr = void 0;
        if (xhr.getStatus() === 401) {
            newErr = errorsExports.unauthenticated();
        } else {
            if (xhr.getStatus() === 402) {
                newErr = errorsExports.quotaExceeded(location.bucket);
            } else {
                if (xhr.getStatus() === 403) {
                    newErr = errorsExports.unauthorized(location.path);
                } else {
                    newErr = err;
                }
            }
        }
        newErr.setServerResponseProp(err.serverResponseProp());
        return newErr;
    };
}
function objectErrorHandler(location) {
    var shared = sharedErrorHandler(location);

    return function (xhr, err) {
        var newErr = shared(xhr, err);
        if (xhr.getStatus() === 404) {
            newErr = errorsExports.objectNotFound(location.path);
        }
        newErr.setServerResponseProp(err.serverResponseProp());
        return newErr;
    };
}
function getMetadata(authWrapper, location, mappings) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);

    var timeout = authWrapper.maxOperationRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, 'GET', metadataHandler(authWrapper, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function updateMetadata(authWrapper, location, metadata, mappings) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);

    var body = MetadataUtils.toResourceString(metadata, mappings);

    var timeout = authWrapper.maxOperationRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, 'PATCH', metadataHandler(authWrapper, mappings), timeout);
    requestInfo.headers = { 'Content-Type': 'application/json; charset=utf-8' };
    requestInfo.body = body;
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function deleteObject(authWrapper, location) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);

    var timeout = authWrapper.maxOperationRetryTime();

    var requestInfo = new _requestinfo.RequestInfo(url, 'DELETE', function () {}, timeout);
    requestInfo.successCodes = [200, 204];
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function determineContentType_(metadata, blob) {
    return metadata && metadata['contentType'] || blob && blob.type() || 'application/octet-stream';
}
function metadataForUpload_(location, blob, opt_metadata) {
    var metadata = object.clone(opt_metadata);
    metadata['fullPath'] = location.path;
    metadata['size'] = blob.size();
    if (!metadata['contentType']) {
        metadata['contentType'] = determineContentType_(null, blob);
    }
    return metadata;
}
function multipartUpload(authWrapper, location, mappings, blob, opt_metadata) {
    var urlPart = location.bucketOnlyServerUrl();
    var headers = { 'X-Goog-Upload-Protocol': 'multipart' };

    var boundary = function () {
        var str = '';
        for (var i = 0; i < 2; i++) {
            str = str + Math.random().toString().slice(2);
        }
        return str;
    }();
    headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
    var metadata = metadataForUpload_(location, blob, opt_metadata);
    var metadataString = MetadataUtils.toResourceString(metadata, mappings);
    var preBlobPart = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=utf-8\r\n\r\n' + metadataString + '\r\n--' + boundary + '\r\n' + 'Content-Type: ' + metadata['contentType'] + '\r\n\r\n';

    var body = _blob.FbsBlob.getBlob(preBlobPart, blob, '\r\n--' + boundary + '--');
    if (body === null) {
        throw errorsExports.cannotSliceBlob();
    }
    var urlParams = { 'name': metadata['fullPath'] };
    var url = UrlUtils.makeUploadUrl(urlPart);

    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, 'POST', metadataHandler(authWrapper, mappings), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 * @struct
 */

var ResumableUploadStatus = exports.ResumableUploadStatus = function ResumableUploadStatus(current, total, finalized, metadata) {
    _classCallCheck(this, ResumableUploadStatus);

    this.current = current;
    this.total = total;
    this.finalized = !!finalized;
    this.metadata = metadata || null;
};

function checkResumeHeader_(xhr, opt_allowed) {
    var status = void 0;
    try {
        status = xhr.getResponseHeader('X-Goog-Upload-Status');
    } catch (e) {
        handlerCheck(false);
    }

    handlerCheck(array.contains(opt_allowed || ['active'], status));
    return status;
}
function createResumableUpload(authWrapper, location, mappings, blob, opt_metadata) {
    var urlPart = location.bucketOnlyServerUrl();
    var metadata = metadataForUpload_(location, blob, opt_metadata);
    var urlParams = { 'name': metadata['fullPath'] };
    var url = UrlUtils.makeUploadUrl(urlPart);

    var headers = {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': blob.size(),
        'X-Goog-Upload-Header-Content-Type': metadata['contentType'],
        'Content-Type': 'application/json; charset=utf-8'
    };
    var body = MetadataUtils.toResourceString(metadata, mappings);
    var timeout = authWrapper.maxUploadRetryTime();

    var requestInfo = new _requestinfo.RequestInfo(url, 'POST', function (xhr) {
        checkResumeHeader_(xhr);
        var url = void 0;
        try {
            url = xhr.getResponseHeader('X-Goog-Upload-URL');
        } catch (e) {
            handlerCheck(false);
        }
        handlerCheck(type.isString(url));
        return url;
    }, timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */
function getResumableUploadStatus(authWrapper, location, url, blob) {
    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, 'POST', function (xhr) {
        var status = checkResumeHeader_(xhr, ['active', 'final']);
        var sizeString = void 0;
        try {
            sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
        } catch (e) {
            handlerCheck(false);
        }
        var size = parseInt(sizeString, 10);
        handlerCheck(!isNaN(size));
        return new ResumableUploadStatus(size, blob.size(), status === 'final');
    }, timeout);
    requestInfo.headers = { 'X-Goog-Upload-Command': 'query' };
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */
var resumableUploadChunkSize = exports.resumableUploadChunkSize = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param opt_status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */
function continueResumableUpload(location, authWrapper, url, blob, chunkSize, mappings, opt_status, opt_progressCallback) {
    // TODO(andysoto): standardize on internal asserts
    // assert(!(opt_status && opt_status.finalized));
    var status = new ResumableUploadStatus(0, 0);
    if (opt_status) {
        status.current = opt_status.current;
        status.total = opt_status.total;
    } else {
        status.current = 0;
        status.total = blob.size();
    }
    if (blob.size() !== status.total) {
        throw errorsExports.serverFileWrongSize();
    }
    var bytesLeft = status.total - status.current;
    var bytesToUpload = bytesLeft;
    if (chunkSize > 0) {
        bytesToUpload = Math.min(bytesToUpload, chunkSize);
    }
    var startByte = status.current;
    var endByte = startByte + bytesToUpload;
    var uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
    var headers = {
        'X-Goog-Upload-Command': uploadCommand,
        'X-Goog-Upload-Offset': status.current
    };
    var body = blob.slice(startByte, endByte);
    if (body === null) {
        throw errorsExports.cannotSliceBlob();
    }

    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, 'POST', function (xhr, text) {
        // TODO(andysoto): Verify the MD5 of each uploaded range:
        // the 'x-range-md5' header comes back with status code 308 responses.
        // We'll only be able to bail out though, because you can't re-upload a
        // range that you previously uploaded.
        var uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
        var newCurrent = status.current + bytesToUpload;
        var size = blob.size();
        var metadata = void 0;
        if (uploadStatus === 'final') {
            metadata = metadataHandler(authWrapper, mappings)(xhr, text);
        } else {
            metadata = null;
        }
        return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
    }, timeout);
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.progressCallback = opt_progressCallback || null;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
//# sourceMappingURL=requests.js.map


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(95);

var _errors2 = __webpack_require__(67);

var _errors3 = _interopRequireDefault(_errors2);

var _tokenManager = __webpack_require__(359);

var _tokenManager2 = _interopRequireDefault(_tokenManager);

var _notificationPermission = __webpack_require__(139);

var _notificationPermission2 = _interopRequireDefault(_notificationPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SENDER_ID_OPTION_NAME = 'messagingSenderId';

var ControllerInterface = function () {
    /**
     * An interface of the Messaging Service API
     * @param {!firebase.app.App} app
     */
    function ControllerInterface(app) {
        var _this = this;

        _classCallCheck(this, ControllerInterface);

        this.errorFactory_ = new _errors.ErrorFactory('messaging', 'Messaging', _errors3.default.map);
        if (!app.options[SENDER_ID_OPTION_NAME] || typeof app.options[SENDER_ID_OPTION_NAME] !== 'string') {
            throw this.errorFactory_.create(_errors3.default.codes.BAD_SENDER_ID);
        }
        this.messagingSenderId_ = app.options[SENDER_ID_OPTION_NAME];
        this.tokenManager_ = new _tokenManager2.default();
        this.app = app;
        this.INTERNAL = {};
        this.INTERNAL.delete = function () {
            return _this.delete;
        };
    }
    /**
     * @export
     * @return {Promise<string> | Promise<null>} Returns a promise that
     * resolves to an FCM token.
     */


    _createClass(ControllerInterface, [{
        key: 'getToken',
        value: function getToken() {
            var _this2 = this;

            // Check with permissions
            var currentPermission = this.getNotificationPermission_();
            if (currentPermission !== _notificationPermission2.default.granted) {
                if (currentPermission === _notificationPermission2.default.denied) {
                    return Promise.reject(this.errorFactory_.create(_errors3.default.codes.NOTIFICATIONS_BLOCKED));
                }
                // We must wait for permission to be granted
                return Promise.resolve(null);
            }
            return this.getSWRegistration_().then(function (registration) {
                return _this2.tokenManager_.getSavedToken(_this2.messagingSenderId_, registration).then(function (token) {
                    if (token) {
                        return token;
                    }
                    return _this2.tokenManager_.createToken(_this2.messagingSenderId_, registration);
                });
            });
        }
        /**
         * This method deletes tokens that the token manager looks after and then
         * unregisters the push subscription if it exists.
         * @export
         * @param {string} token
         * @return {Promise<void>}
         */

    }, {
        key: 'deleteToken',
        value: function deleteToken(token) {
            var _this3 = this;

            return this.tokenManager_.deleteToken(token).then(function () {
                return _this3.getSWRegistration_().then(function (registration) {
                    if (registration) {
                        return registration.pushManager.getSubscription();
                    }
                }).then(function (subscription) {
                    if (subscription) {
                        return subscription.unsubscribe();
                    }
                });
            });
        }
    }, {
        key: 'getSWRegistration_',
        value: function getSWRegistration_() {
            throw this.errorFactory_.create(_errors3.default.codes.SHOULD_BE_INHERITED);
        }
        //
        // The following methods should only be available in the window.
        //

    }, {
        key: 'requestPermission',
        value: function requestPermission() {
            throw this.errorFactory_.create(_errors3.default.codes.AVAILABLE_IN_WINDOW);
        }
        /**
         * @export
         * @param {!ServiceWorkerRegistration} registration
         */

    }, {
        key: 'useServiceWorker',
        value: function useServiceWorker() {
            throw this.errorFactory_.create(_errors3.default.codes.AVAILABLE_IN_WINDOW);
        }
        /**
         * @export
         * @param {!firebase.Observer|function(*)} nextOrObserver
         * @param {function(!Error)=} optError
         * @param {function()=} optCompleted
         * @return {!function()}
         */

    }, {
        key: 'onMessage',
        value: function onMessage() {
            throw this.errorFactory_.create(_errors3.default.codes.AVAILABLE_IN_WINDOW);
        }
        /**
         * @export
         * @param {!firebase.Observer|function()} nextOrObserver An observer object
         * or a function triggered on token refresh.
         * @param {function(!Error)=} optError Optional A function
         * triggered on token refresh error.
         * @param {function()=} optCompleted Optional function triggered when the
         * observer is removed.
         * @return {!function()} The unsubscribe function for the observer.
         */

    }, {
        key: 'onTokenRefresh',
        value: function onTokenRefresh() {
            throw this.errorFactory_.create(_errors3.default.codes.AVAILABLE_IN_WINDOW);
        }
        //
        // The following methods are used by the service worker only.
        //
        /**
         * @export
         * @param {function(Object)} callback
         */

    }, {
        key: 'setBackgroundMessageHandler',
        value: function setBackgroundMessageHandler() {
            throw this.errorFactory_.create(_errors3.default.codes.AVAILABLE_IN_SW);
        }
        //
        // The following methods are used by the service themselves and not exposed
        // publicly or not expected to be used by developers.
        //
        /**
         * This method is required to adhere to the Firebase interface.
         * It closes any currently open indexdb database connections.
         */

    }, {
        key: 'delete',
        value: function _delete() {
            this.tokenManager_.closeDatabase();
        }
        /**
         * Returns the current Notification Permission state.
         * @private
         * @return {string} The currenct permission state.
         */

    }, {
        key: 'getNotificationPermission_',
        value: function getNotificationPermission_() {
            return Notification.permission;
        }
        /**
         * @protected
         * @returns {TokenManager}
         */

    }, {
        key: 'getTokenManager',
        value: function getTokenManager() {
            return this.tokenManager_;
        }
    }]);

    return ControllerInterface;
}();

exports.default = ControllerInterface;
module.exports = exports['default'];
//# sourceMappingURL=controller-interface.js.map


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FCM_APPLICATION_SERVER_KEY = [0x04, 0x33, 0x94, 0xF7, 0xDF, 0xA1, 0xEB, 0xB1, 0xDC, 0x03, 0xA2, 0x5E, 0x15, 0x71, 0xDB, 0x48, 0xD3, 0x2E, 0xED, 0xED, 0xB2, 0x34, 0xDB, 0xB7, 0x47, 0x3A, 0x0C, 0x8F, 0xC4, 0xCC, 0xE1, 0x6F, 0x3C, 0x8C, 0x84, 0xDF, 0xAB, 0xB6, 0x66, 0x3E, 0xF2, 0x0C, 0xD4, 0x8B, 0xFE, 0xE3, 0xF9, 0x76, 0x2F, 0x14, 0x1C, 0x63, 0x08, 0x6A, 0x6F, 0x2D, 0xB1, 0x1A, 0x95, 0xB0, 0xCE, 0x37, 0xC0, 0x9C, 0x6E];
var SUBSCRIPTION_DETAILS = {
    'userVisibleOnly': true,
    'applicationServerKey': new Uint8Array(FCM_APPLICATION_SERVER_KEY)
};
exports.default = {
    ENDPOINT: 'https://fcm.googleapis.com',
    APPLICATION_SERVER_KEY: FCM_APPLICATION_SERVER_KEY,
    SUBSCRIPTION_OPTIONS: SUBSCRIPTION_DETAILS
};
module.exports = exports['default'];
//# sourceMappingURL=fcm-details.js.map


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    granted: 'granted',
    default: 'default',
    denied: 'denied'
};
module.exports = exports['default'];
//# sourceMappingURL=notification-permission.js.map


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// These fields are strings to prevent closure from thinking goog.getMsg
// should be used to initialise the values

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PARAMS = {
    TYPE_OF_MSG: 'firebase-messaging-msg-type',
    DATA: 'firebase-messaging-msg-data'
};
// This value isn't using the TYPE_OF_MSG short hand as closure
// expects the variable to be defined via goog.getMsg
var msgType = {
    PUSH_MSG_RECEIVED: 'push-msg-received',
    NOTIFICATION_CLICKED: 'notification-clicked'
};
var createNewMsg = function (msgType, msgData) {
    var _message;

    var message = (_message = {}, _defineProperty(_message, PARAMS.TYPE_OF_MSG, msgType), _defineProperty(_message, PARAMS.DATA, msgData), _message);
    return message;
};
exports.default = {
    PARAMS: PARAMS,
    TYPES_OF_MSG: msgType,
    createNewMsg: createNewMsg
};
module.exports = exports['default'];
//# sourceMappingURL=worker-page-message.js.map


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//******************************************************************************
var moduleDistance = function () {

  // function calculating a distance between myAddress and CafeAddress
  var _takeDistance = function _takeDistance(from, to) {
    // parameters are google.maps.LatLng objects
    var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    return Math.round(distance * 0.1) / 100; // return distance in km with 2 decimal places
  };

  return {
    takeDistance: _takeDistance
  };
}();

exports.default = moduleDistance;

// --------------how to use ?
// import import moduleDistance from './distance.js';
// moduleDistance.takeDistance(myAddressLatLng , cafeAddressLatLng)

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(143);
module.exports = __webpack_require__(326);


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(144);

__webpack_require__(322);

__webpack_require__(323);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(89);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(118);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(119);
__webpack_require__(121);
__webpack_require__(122);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(320);
__webpack_require__(321);
module.exports = __webpack_require__(25);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(10)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(12)
  , META           = __webpack_require__(31).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(54)
  , setToStringTag = __webpack_require__(43)
  , uid            = __webpack_require__(33)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(102)
  , wksDefine      = __webpack_require__(69)
  , keyOf          = __webpack_require__(146)
  , enumKeys       = __webpack_require__(147)
  , isArray        = __webpack_require__(72)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(22)
  , createDesc     = __webpack_require__(30)
  , _create        = __webpack_require__(37)
  , gOPNExt        = __webpack_require__(105)
  , $GOPD          = __webpack_require__(16)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(35)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(51).f  = $propertyIsEnumerable;
  __webpack_require__(56).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(34)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(35)
  , toIObject = __webpack_require__(14);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35)
  , gOPS    = __webpack_require__(56)
  , pIE     = __webpack_require__(51);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(37)});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(104)});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(14)
  , $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(23)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(9)
  , $getPrototypeOf = __webpack_require__(17);

__webpack_require__(23)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9)
  , $keys    = __webpack_require__(35);

__webpack_require__(23)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(23)('getOwnPropertyNames', function(){
  return __webpack_require__(105).f;
});

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(106)});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(107)});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(74).set});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(52)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(12)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(108)});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(30)
  , has        = __webpack_require__(10)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(17)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(109);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(110);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(10)
  , cof               = __webpack_require__(19)
  , inheritIfRequired = __webpack_require__(76)
  , toPrimitive       = __webpack_require__(22)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(38).f
  , gOPD              = __webpack_require__(16).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(44).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(37)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(32)
  , aNumberValue = __webpack_require__(111)
  , repeat       = __webpack_require__(77)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(111)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(112)});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(112)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(110);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(109);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(113)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(78);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(79);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(78)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(113)});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(78)});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(79)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(79)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(36)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(14)
  , toLength  = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(44)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(81)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(80)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(8)
  , context   = __webpack_require__(83)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(84)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(83)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(84)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(77)
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(8)
  , context     = __webpack_require__(83)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(84)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(15)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(15)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(15)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(15)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(15)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(15)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(15)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(15)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(15)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(15)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(15)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(15)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(15)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(9)
  , toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(12)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(226));

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(22)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(72)});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(26)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(9)
  , call           = __webpack_require__(114)
  , isArrayIter    = __webpack_require__(85)
  , toLength       = __webpack_require__(8)
  , createProperty = __webpack_require__(86)
  , getIterFn      = __webpack_require__(87);

$export($export.S + $export.F * !__webpack_require__(59)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(86);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(14)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(50) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(73)
  , cof        = __webpack_require__(19)
  , toIndex    = __webpack_require__(36)
  , toLength   = __webpack_require__(8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(9)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(24)(0)
  , STRICT   = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(235);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(72)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(24)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(24)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(24)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(24)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(115);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(115);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(55)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(14)
  , toInteger     = __webpack_require__(32)
  , toLength      = __webpack_require__(8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(116)});

__webpack_require__(46)('copyWithin');

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(88)});

__webpack_require__(46)('fill');

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(46)(KEY);

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(46)(KEY);

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('Array');

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(76)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(38).f
  , isRegExp          = __webpack_require__(58)
  , $flags            = __webpack_require__(60)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(118);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(60)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(61)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(61)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(61)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(61)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(58)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(34)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(26)
  , classof            = __webpack_require__(52)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(13)
  , anInstance         = __webpack_require__(40)
  , forOf              = __webpack_require__(47)
  , speciesConstructor = __webpack_require__(90)
  , task               = __webpack_require__(91).set
  , microtask          = __webpack_require__(92)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(43)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(25)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(59)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(123);

// 23.4 WeakSet Objects
__webpack_require__(62)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(63)
  , buffer       = __webpack_require__(93)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(36)
  , toLength     = __webpack_require__(8)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(90)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(63).ABV, {
  DataView: __webpack_require__(93).DataView
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(37)
  , aFunction  = __webpack_require__(13)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(108)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(16).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(82)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(16)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(17)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(124)});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(30)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(74);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(55)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(46)('includes');

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(80)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(125);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(125);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(44)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(44)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(20)
  , toLength    = __webpack_require__(8)
  , isRegExp    = __webpack_require__(58)
  , getFlags    = __webpack_require__(60)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(82)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69)('asyncIterator');

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69)('observable');

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(124)
  , toIObject      = __webpack_require__(14)
  , gOPD           = __webpack_require__(16)
  , createProperty = __webpack_require__(86);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(126)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(126)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(64), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(64), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(22)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(64), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(22)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(64), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(127)('Map')});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(127)('Set')});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(121)
  , from                    = __webpack_require__(128)
  , metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(13)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(92)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(25)
  , microtask   = __webpack_require__(92)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(13)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(40)
  , redefineAll = __webpack_require__(41)
  , hide        = __webpack_require__(11)
  , forOf       = __webpack_require__(47)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(39)('Observable');

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(57)
  , partial    = __webpack_require__(318)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(319)
  , invoke    = __webpack_require__(57)
  , aFunction = __webpack_require__(13);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(91);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(89)
  , redefine      = __webpack_require__(12)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(45)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(324);
module.exports = __webpack_require__(25).RegExp.escape;

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(325)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 325 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var first = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0&libraries=geometry");

          case 2:

            _initMap2.default.initMap();
            map = _initMap2.default.map();
            geocoder = _initMap2.default.geocoder();

            _fb2.default.setName(); // set name of Cafe and address - random

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function first() {
    return _ref.apply(this, arguments);
  };
}();

var second = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var allCafes, markersMy, markersCafes, infowindow, findCafes, onGeocoded;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            onGeocoded = function onGeocoded(resultLatLng) {
              // make MARKER of my searching address
              var myPositionMarker = _myMarker2.default.setMyMarker(resultLatLng, map);
              markersMy.push(myPositionMarker);

              // sorting data in distance order
              allCafes = _sortCafes2.default.allCafes(resultLatLng);
              // setting Name i Address in HTML (nearest)
              _setNamesetAddress2.default.set(allCafes);

              // make MARKERS of nearest Cafes

              var _loop = function _loop(i) {
                markersCafes.push(_cafeMarker2.default.setCafeMarker(allCafes[i][0], map, allCafes[i][1].name()));
                markersCafes[i].addListener('mouseover', function () {
                  infowindow.setContent(markersCafes[i].title);
                  infowindow.open(map, markersCafes[i]);
                });
                markersCafes[i].addListener('mouseout', function () {
                  infowindow.close(map, markersCafes[i]);
                });
              };

              for (var i = 0; i < 4; i++) {
                _loop(i);
              }

              //delete last elem of each cafe - which is counted distance
              allCafes.forEach(function (elem, i) {
                elem.splice(-1, 1);
              });
            };

            findCafes = function findCafes() {
              allCafes = null; // it could not be here
              _geocodeMyAddress2.default.geocodeAddress(geocoder, map, $('#where').val(), onGeocoded);
              // clearing input value
              $('#where').val(" ");

              // if arrays are not empty - remove markers
              if (markersMy[0] && markersCafes[0]) {
                markersMy[0].setMap(null);
                for (var i = 0; i < 4; i++) {
                  markersCafes[i].setMap(null);
                }
              }
              // after all - cut out previous search
              markersMy.splice(0, 1);
              markersCafes.splice(0, 4);
            };

            _context2.next = 4;
            return first();

          case 4:
            allCafes = void 0;
            markersMy = [];
            markersCafes = [];
            infowindow = new google.maps.InfoWindow();


            //EVENTS
            $('html').on("keyup", function (event) {
              if (event.keyCode == enter) {
                findCafes();
              }
            });

            $('#find').on('click', function (event) {
              findCafes();
            });

            $('article').on("click", function (event) {
              event.preventDefault();
              // making markers bouncing when click to desc
              markersCafes.forEach(function (elem) {
                elem.setAnimation(null);
              });
              // I use this instead of event.target because this point to article and even.target can point to div with name and address - and it has no id
              markersCafes[this.id].setAnimation(google.maps.Animation.BOUNCE);
            });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function second() {
    return _ref2.apply(this, arguments);
  };
}();

var start = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return second();

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function start() {
    return _ref3.apply(this, arguments);
  };
}();

__webpack_require__(327);

var _fb = __webpack_require__(129);

var _fb2 = _interopRequireDefault(_fb);

var _distance = __webpack_require__(141);

var _distance2 = _interopRequireDefault(_distance);

var _initMap = __webpack_require__(363);

var _initMap2 = _interopRequireDefault(_initMap);

var _geocodeMyAddress = __webpack_require__(364);

var _geocodeMyAddress2 = _interopRequireDefault(_geocodeMyAddress);

var _sortCafes = __webpack_require__(365);

var _sortCafes2 = _interopRequireDefault(_sortCafes);

var _setNamesetAddress = __webpack_require__(366);

var _setNamesetAddress2 = _interopRequireDefault(_setNamesetAddress);

var _myMarker = __webpack_require__(368);

var _myMarker2 = _interopRequireDefault(_myMarker);

var _cafeMarker = __webpack_require__(369);

var _cafeMarker2 = _interopRequireDefault(_cafeMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // file with all code / logics


var enter = 13;
// initialize variables
var map = void 0;
var geocoder = void 0;

start();

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(328);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(330)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style2.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style2.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(329)(undefined);
// imports


// module
exports.push([module.i, "/* varaibles use in project */\n/* units */\n/*simple reset, fonts, box-sizing*/\n* {\n  margin: 0;\n  padding: 0;\n  font-family: 'Lato', sans-serif;\n  box-sizing: border-box; }\n\n.hidden {\n  display: none; }\n\n/*grid , heights , widths , flexbox  */\n.container {\n  height: 100vh;\n  width: 100vw;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: 6% 6% auto 4%; }\n\n/*\n_______________________________________________\n|_____________|______6%________|_______________|  .first\n|_____________|______6%________|_______________|  .second\n|             |                |               |  .third\n|             |                |               |\n|             |      auto      |               |\n|             |                |               |\n|_____________|________________|_______________|\n|_____________|______6%________|_______________|  .forth\n\n*/\n.first {\n  grid-column: 1 / 4;\n  grid-row: 1; }\n  .first .title {\n    height: 100%;\n    display: flex;\n    align-items: center; }\n\n.second {\n  grid-column: 1 / 4;\n  grid-row: 2; }\n  .second .filters {\n    height: 100%;\n    display: flex;\n    align-items: center; }\n    .second .filters #labelWhere {\n      min-width: max-content; }\n    .second .filters #where {\n      height: 100%;\n      width: 18em; }\n    .second .filters #find {\n      height: 100%;\n      width: 2em; }\n\n.third {\n  grid-column: 1 / 4;\n  grid-row: 3; }\n  .third .content {\n    display: grid;\n    grid-template-columns: repeat(5, minmax(max-content, 1fr));\n    grid-template-rows: repeat(5, 1fr);\n    height: 100%; }\n    .third .content .cafes {\n      display: none; }\n    .third .content .map {\n      grid-column: 1 / 6;\n      grid-row: 1/7; }\n      .third .content .map #map {\n        height: 100%;\n        width: 100%; }\n\n.forth {\n  grid-column: 1 / 4;\n  grid-row: 4;\n  background-color: #f2786a;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(max-content, 1fr));\n  grid-template-rows: 1fr;\n  height: 100%; }\n  .forth .media {\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n    .forth .media img {\n      width: 1em;\n      height: 1em; }\n  .forth .title-small {\n    display: none; }\n\n@media screen and (min-width: 600px) {\n  .third .content .cafes {\n    display: flex;\n    flex-direction: column;\n    grid-column: 1 / 2;\n    grid-row: 1 / 6;\n    z-index: 1; }\n  .forth .title-small {\n    display: inline-block;\n    justify-self: right; } }\n\n/* every padding in the project*/\nheader .title {\n  padding-left: 2rem; }\n\n.filters #labelWhere {\n  padding-left: 2rem;\n  padding-right: 1em; }\n\n.filters #where {\n  padding-left: 1em; }\n\n.content .cafes {\n  padding: 0.5em; }\n  .content .cafes article {\n    padding: 1em; }\n\nfooter .copy {\n  padding-left: 1em; }\n\nfooter .media a {\n  padding-left: 1em;\n  padding-right: 1em; }\n\nfooter .title-small {\n  padding-right: 1em; }\n\n/* set all colours and borders */\nheader {\n  background-color: #f2786a; }\n  header .title {\n    color: #ad2c2c; }\n    header .title span:last-child {\n      color: #f2786a;\n      text-shadow: -1px 0 #ad2c2c, 0 1px #ad2c2c, 1px 0 #ad2c2c, 0 -1px #ad2c2c; }\n\n.filters {\n  background-color: #ffb752; }\n  .filters #labelWhere {\n    color: #f8f8f7; }\n  .filters #where {\n    background-color: #f1f1f1; }\n  .filters #find {\n    background-color: #784754;\n    color: #e8e8e8; }\n\n.content .cafes article {\n  background-color: #f1f1f1;\n  border: 5px solid #e8e8e8; }\n  .content .cafes article .cafe-name {\n    color: #555555; }\n  .content .cafes article .cafe-address {\n    color: #aaaaaa; }\n\nfooter {\n  color: #ad2c2c; }\n\nheader .title {\n  font-size: 20px;\n  text-transform: uppercase; }\n  header .title span:last-child {\n    font-weight: bold; }\n\n.filters {\n  text-transform: uppercase; }\n  .filters #where {\n    font-size: 14px;\n    text-transform: uppercase;\n    border: 0; }\n    .filters #where:focus {\n      outline-style: none;\n      border: 0; }\n  .filters #find {\n    font-size: 30px;\n    border: 0; }\n\n.content .cafes article {\n  height: 20%;\n  border-radius: 2px;\n  line-height: 1.2em; }\n  .content .cafes article .cafe-hours {\n    margin-top: 0.3em;\n    width: 100%;\n    height: 1.5em;\n    border-radius: 3px;\n    background-color: #ffb752;\n    position: relative;\n    color: #555555; }\n    .content .cafes article .cafe-hours .cafe-hours-from {\n      padding-top: 0.2em;\n      margin-left: 5%;\n      margin-right: 5%;\n      height: 100%;\n      background-color: #ffb752;\n      position: absolute;\n      display: flex;\n      z-index: 2; }\n      .content .cafes article .cafe-hours .cafe-hours-from span {\n        position: absolute;\n        right: -28px;\n        font-size: 10px;\n        text-align: right;\n        padding-right: 2px; }\n      .content .cafes article .cafe-hours .cafe-hours-from .closed {\n        justify-content: center;\n        text-align: center; }\n    .content .cafes article .cafe-hours .cafe-hours-to {\n      padding-top: 0.2em;\n      margin-left: 5%;\n      margin-right: 5%;\n      height: 100%;\n      background-color: #e8e8e8;\n      position: absolute;\n      z-index: 1;\n      display: flex;\n      justify-content: flex-end; }\n      .content .cafes article .cafe-hours .cafe-hours-to span {\n        font-size: 10px;\n        padding-right: 2px; }\n", ""]);

// exports


/***/ }),
/* 329 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(331);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 331 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(53);

var _app2 = _interopRequireDefault(_app);

__webpack_require__(339);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import instance of FirebaseApp from ./app
var Storage, XMLHttpRequest;

__webpack_require__(340);
__webpack_require__(341);
var AsyncStorage;

__webpack_require__(357);
// Export the single instance of firebase
exports.default = _app2.default;
module.exports = exports['default'];
//# sourceMappingURL=firebase-browser.js.map


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


exports.createFirebaseNamespace = createFirebaseNamespace;

var _subscribe = __webpack_require__(130);

var _errors = __webpack_require__(95);

var _shared_promise = __webpack_require__(94);

var _deep_copy = __webpack_require__(338);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var LocalPromise = _shared_promise.local.Promise;
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
// An array to capture listeners before the true auth functions
// exist
var tokenListeners = [];
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */

var FirebaseAppImpl = function () {
    function FirebaseAppImpl(options, name, firebase_) {
        _classCallCheck(this, FirebaseAppImpl);

        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.services_ = {};
        this.name_ = name;
        this.options_ = (0, _deep_copy.deepCopy)(options);
        this.INTERNAL = {
            'getUid': function getUid() {
                return null;
            },
            'getToken': function getToken() {
                return LocalPromise.resolve(null);
            },
            'addAuthTokenListener': function addAuthTokenListener(callback) {
                tokenListeners.push(callback);
                // Make sure callback is called, asynchronously, in the absence of the auth module
                setTimeout(function () {
                    return callback(null);
                }, 0);
            },
            'removeAuthTokenListener': function removeAuthTokenListener(callback) {
                tokenListeners = tokenListeners.filter(function (listener) {
                    return listener !== callback;
                });
            }
        };
    }

    _createClass(FirebaseAppImpl, [{
        key: 'delete',
        value: function _delete() {
            var _this = this;

            return new LocalPromise(function (resolve) {
                _this.checkDestroyed_();
                resolve();
            }).then(function () {
                _this.firebase_.INTERNAL.removeApp(_this.name_);
                var services = [];
                Object.keys(_this.services_).forEach(function (serviceKey) {
                    Object.keys(_this.services_[serviceKey]).forEach(function (instanceKey) {
                        services.push(_this.services_[serviceKey][instanceKey]);
                    });
                });
                return LocalPromise.all(services.map(function (service) {
                    return service.INTERNAL.delete();
                }));
            }).then(function () {
                _this.isDeleted_ = true;
                _this.services_ = {};
            });
        }
        /**
         * Return a service instance associated with this app (creating it
         * on demand), identified by the passed instanceIdentifier.
         *
         * NOTE: Currently storage is the only one that is leveraging this
         * functionality. They invoke it by calling:
         *
         * ```javascript
         * firebase.app().storage('STORAGE BUCKET ID')
         * ```
         *
         * The service name is passed to this already
         * @internal
         */

    }, {
        key: '_getService',
        value: function _getService(name) {
            var instanceIdentifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ENTRY_NAME;

            this.checkDestroyed_();
            if (!this.services_[name]) {
                this.services_[name] = {};
            }
            if (!this.services_[name][instanceIdentifier]) {
                /**
                 * If a custom instance has been defined (i.e. not '[DEFAULT]')
                 * then we will pass that instance on, otherwise we pass `null`
                 */
                var instanceSpecifier = instanceIdentifier !== DEFAULT_ENTRY_NAME ? instanceIdentifier : undefined;
                var service = this.firebase_.INTERNAL.factories[name](this, this.extendApp.bind(this), instanceSpecifier);
                this.services_[name][instanceIdentifier] = service;
            }
            return this.services_[name][instanceIdentifier];
        }
        /**
         * Callback function used to extend an App instance at the time
         * of service instance creation.
         */

    }, {
        key: 'extendApp',
        value: function extendApp(props) {
            var _this2 = this;

            // Copy the object onto the FirebaseAppImpl prototype
            (0, _deep_copy.deepExtend)(this, props);
            /**
             * If the app has overwritten the addAuthTokenListener stub, forward
             * the active token listeners on to the true fxn.
             *
             * TODO: This function is required due to our current module
             * structure. Once we are able to rely strictly upon a single module
             * implementation, this code should be refactored and Auth should
             * provide these stubs and the upgrade logic
             */
            if (props.INTERNAL && props.INTERNAL.addAuthTokenListener) {
                tokenListeners.forEach(function (listener) {
                    _this2.INTERNAL.addAuthTokenListener(listener);
                });
                tokenListeners = [];
            }
        }
        /**
         * This function will throw an Error if the App has already been deleted -
         * use before performing API actions on the App.
         */

    }, {
        key: 'checkDestroyed_',
        value: function checkDestroyed_() {
            if (this.isDeleted_) {
                error('app-deleted', { 'name': this.name_ });
            }
        }
    }, {
        key: 'name',
        get: function get() {
            this.checkDestroyed_();
            return this.name_;
        }
    }, {
        key: 'options',
        get: function get() {
            this.checkDestroyed_();
            return this.options_;
        }
    }]);

    return FirebaseAppImpl;
}();

// Prevent dead-code elimination of these methods w/o invalid property
// copying.
FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options || FirebaseAppImpl.prototype.delete || console.log("dc");
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var apps_ = {};
    var factories = {};
    var appHooks = {};
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        '__esModule': true,
        'initializeApp':
        /**
         * Create a new App instance (name must be unique).
         */
        function (options, name) {
            if (name === undefined) {
                name = DEFAULT_ENTRY_NAME;
            } else {
                if (typeof name !== 'string' || name === '') {
                    error('bad-app-name', { 'name': name + '' });
                }
            }
            if (contains(apps_, name)) {
                error('duplicate-app', { 'name': name });
            }
            var app = new FirebaseAppImpl(options, name, namespace);
            apps_[name] = app;
            callAppHooks(app, 'create');
            return app;
        }
        /*
         * Return an array of all the non-deleted FirebaseApps.
         */
        ,
        'app': app,
        'apps': null,
        'Promise': LocalPromise,
        'SDK_VERSION': '4.1.3',
        'INTERNAL': {
            'registerService':
            /*
             * Register a Firebase Service.
             *
             * firebase.INTERNAL.registerService()
             *
             * TODO: Implement serviceProperties.
             */
            function (name, createService, serviceProperties, appHook, allowMultipleInstances) {
                // Cannot re-register a service that already exists
                if (factories[name]) {
                    error('duplicate-service', { 'name': name });
                }
                // Capture the service factory for later service instantiation
                factories[name] = createService;
                // Capture the appHook, if passed
                if (appHook) {
                    appHooks[name] = appHook;
                    // Run the **new** app hook on all existing apps
                    getApps().forEach(function (app) {
                        appHook('create', app);
                    });
                }
                // The Service namespace is an accessor function ...
                var serviceNamespace = function () {
                    var appArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app();

                    if (typeof appArg[name] !== 'function') {
                        // Invalid argument.
                        // This happens in the following case: firebase.storage('gs:/')
                        error('invalid-app-argument', { 'name': name });
                    }
                    // Forward service instance lookup to the FirebaseApp.
                    return appArg[name]();
                };
                // ... and a container for service-level properties.
                if (serviceProperties !== undefined) {
                    (0, _deep_copy.deepExtend)(serviceNamespace, serviceProperties);
                }
                // Monkey-patch the serviceNamespace onto the firebase namespace
                namespace[name] = serviceNamespace;
                // Patch the FirebaseAppImpl prototype
                FirebaseAppImpl.prototype[name] = function () {
                    var serviceFxn = this._getService.bind(this, name);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return serviceFxn.apply(this, allowMultipleInstances ? args : []);
                };
                return serviceNamespace;
            }
            /**
             * Patch the top-level firebase namespace with additional properties.
             *
             * firebase.INTERNAL.extendNamespace()
             */
            ,
            'createFirebaseNamespace': createFirebaseNamespace,
            'extendNamespace': function (props) {
                (0, _deep_copy.deepExtend)(namespace, props);
            },
            'createSubscribe': _subscribe.createSubscribe,
            'ErrorFactory': _errors.ErrorFactory,
            'removeApp':
            /**
             * Called by App.delete() - but before any services associated with the App
             * are deleted.
             */
            function (name) {
                var app = apps_[name];
                callAppHooks(app, 'delete');
                delete apps_[name];
            }
            /**
             * Get the App object for a given name (or DEFAULT).
             */
            ,
            'factories': factories,
            'useAsService': useAsService,
            'Promise': _shared_promise.local.GoogPromise,
            'deepExtend': _deep_copy.deepExtend
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    (0, _deep_copy.patchProperty)(namespace, 'default', namespace);
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!contains(apps_, name)) {
            error('no-app', { 'name': name });
        }
        return apps_[name];
    }
    (0, _deep_copy.patchProperty)(app, 'App', FirebaseAppImpl);function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps_).map(function (name) {
            return apps_[name];
        });
    }
    function callAppHooks(app, eventName) {
        Object.keys(factories).forEach(function (serviceName) {
            // Ignore virtual services
            var factoryName = useAsService(app, serviceName);
            if (factoryName === null) {
                return;
            }
            if (appHooks[factoryName]) {
                appHooks[factoryName](eventName, app);
            }
        });
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        app.options;

        return name;
    }
    return namespace;
}
function error(code, args) {
    throw appErrors.create(code, args);
}
// TypeScript does not support non-string indexes!
// let errors: {[code: AppError: string} = {
var errors = {
    'no-app': 'No Firebase App \'{$name}\' has been created - ' + 'call Firebase App.initializeApp()',
    'bad-app-name': 'Illegal App name: \'{$name}',
    'duplicate-app': 'Firebase App named \'{$name}\' already exists',
    'app-deleted': 'Firebase App named \'{$name}\' already deleted',
    'duplicate-service': 'Firebase service named \'{$name}\' already registered',
    'sa-not-supported': 'Initializing the Firebase SDK with a service ' + 'account is only allowed in a Node.js environment. On client ' + 'devices, you should instead initialize the SDK with an api key and ' + 'auth domain',
    'invalid-app-argument': 'firebase.{$name}() takes either no argument or a ' + 'Firebase App instance.'
};
var appErrors = new _errors.ErrorFactory('app', 'Firebase', errors);
//# sourceMappingURL=firebase_app.js.map


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(335).setImmediate))

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(336);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49), __webpack_require__(337)))

/***/ }),
/* 337 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.patchProperty = patchProperty;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            return new Date(source.getTime());
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!

        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
// TODO: Really needed (for JSCompiler type checking)?
function patchProperty(obj, prop, value) {
    obj[prop] = value;
}
//# sourceMappingURL=deep_copy.js.map


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

var firebase = __webpack_require__(53);
(function(){(function(){var h,aa=aa||{},k=this,m=function(a){return void 0!==a},p=function(a){return"string"==typeof a},ba=function(a){return"boolean"==typeof a},ca=function(a){return"number"==typeof a},da=function(){},ea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},fa=function(a){return null===a},ga=function(a){return"array"==ea(a)},ha=function(a){var b=ea(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"function"==ea(a)},r=function(a){var b=
typeof a;return"object"==b&&null!=a||"function"==b},ia=function(a,b,c){return a.call.apply(a.bind,arguments)},ja=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},t=function(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return t.apply(null,
arguments)},ka=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},la=Date.now||function(){return+new Date},u=function(a,b){function c(){}c.prototype=b.prototype;a.Nc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.dg=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var v=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,v);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};u(v,Error);v.prototype.name="CustomError";var ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},na=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},va=function(a){if(!oa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(pa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(qa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ra,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(sa,"&quot;"));-1!=a.indexOf("'")&&
(a=a.replace(ta,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(ua,"&#0;"));return a},pa=/&/g,qa=/</g,ra=/>/g,sa=/"/g,ta=/'/g,ua=/\x00/g,oa=/[\x00&<>"']/,w=function(a,b){return-1!=a.indexOf(b)},wa=function(a,b){return a<b?-1:a>b?1:0};var xa=function(a,b){b.unshift(a);v.call(this,ma.apply(null,b));b.shift()};u(xa,v);xa.prototype.name="AssertionError";
var ya=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);throw new xa(""+e,f||[]);},x=function(a,b,c){a||ya("",null,b,Array.prototype.slice.call(arguments,2))},za=function(a,b){throw new xa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Aa=function(a,b,c){ca(a)||ya("Expected number but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,2));return a},Ba=function(a,b,c){p(a)||ya("Expected string but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,
2))},Ca=function(a,b,c){q(a)||ya("Expected function but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,2))};var Ea=function(){this.Mc="";this.He=Da};Ea.prototype.Jb=!0;Ea.prototype.Gb=function(){return this.Mc};Ea.prototype.toString=function(){return"Const{"+this.Mc+"}"};var Fa=function(a){if(a instanceof Ea&&a.constructor===Ea&&a.He===Da)return a.Mc;za("expected object of type Const, got '"+a+"'");return"type_error:Const"},Da={},Ga=function(a){var b=new Ea;b.Mc=a;return b};Ga("");var Ia=function(){this.Fc="";this.Ie=Ha};Ia.prototype.Jb=!0;Ia.prototype.Gb=function(){return this.Fc};Ia.prototype.toString=function(){return"TrustedResourceUrl{"+this.Fc+"}"};
var Ja=function(a){if(a instanceof Ia&&a.constructor===Ia&&a.Ie===Ha)return a.Fc;za("expected object of type TrustedResourceUrl, got '"+a+"' of type "+ea(a));return"type_error:TrustedResourceUrl"},La=function(a,b){a=Ka(a,b);b=new Ia;b.Fc=a;return b},Ka=function(a,b){var c=Fa(a);if(!Ma.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);return c.replace(Na,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+
JSON.stringify(b));a=b[e];return a instanceof Ea?Fa(a):encodeURIComponent(String(a))})},Na=/%{(\w+)}/g,Ma=/^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank(#|$)/i,Ha={};var Oa=Array.prototype.indexOf?function(a,b,c){x(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},y=Array.prototype.forEach?function(a,b,c){x(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=function(a,b){for(var c=p(a)?
a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Qa=Array.prototype.map?function(a,b,c){x(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ra=Array.prototype.some?function(a,b,c){x(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
Ta=function(a){a:{var b=Sa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]},Ua=function(a,b){return 0<=Oa(a,b)},Wa=function(a,b){b=Oa(a,b);var c;(c=0<=b)&&Va(a,b);return c},Va=function(a,b){x(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Xa=function(a,b){var c=0;Pa(a,function(d,e){b.call(void 0,d,e,a)&&Va(a,e)&&c++})},Ya=function(a){return Array.prototype.concat.apply([],arguments)},
Za=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var $a=function(a){return Qa(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var ab;a:{var bb=k.navigator;if(bb){var cb=bb.userAgent;if(cb){ab=cb;break a}}ab=""}var z=function(a){return w(ab,a)};var db=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},eb=function(a,b){for(var c in a)if(b.call(void 0,a[c],c,a))return!0;return!1},fb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},gb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},hb=function(a){for(var b in a)return!1;return!0},ib=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},jb=function(a){var b={},c;for(c in a)b[c]=a[c];return b},kb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
lb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<kb.length;f++)c=kb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var mb=function(a){mb[" "](a);return a};mb[" "]=da;var ob=function(a,b){var c=nb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var qb=z("Opera"),A=z("Trident")||z("MSIE"),rb=z("Edge"),sb=rb||A,tb=z("Gecko")&&!(w(ab.toLowerCase(),"webkit")&&!z("Edge"))&&!(z("Trident")||z("MSIE"))&&!z("Edge"),ub=w(ab.toLowerCase(),"webkit")&&!z("Edge"),vb=function(){var a=k.document;return a?a.documentMode:void 0},wb;
a:{var xb="",yb=function(){var a=ab;if(tb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(rb)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ub)return/WebKit\/(\S+)/.exec(a);if(qb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();yb&&(xb=yb?yb[1]:"");if(A){var zb=vb();if(null!=zb&&zb>parseFloat(xb)){wb=String(zb);break a}}wb=xb}
var Ab=wb,nb={},B=function(a){return ob(a,function(){for(var b=0,c=na(String(Ab)).split("."),d=na(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",l=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];l=/(\d*)(\D*)(.*)/.exec(l)||["","","",""];if(0==g[0].length&&0==l[0].length)break;b=wa(0==g[1].length?0:parseInt(g[1],10),0==l[1].length?0:parseInt(l[1],10))||wa(0==g[2].length,0==l[2].length)||wa(g[2],l[2]);g=g[3];l=l[3]}while(0==b)}return 0<=b})},Bb;var Cb=k.document;
Bb=Cb&&A?vb()||("CSS1Compat"==Cb.compatMode?parseInt(Ab,10):5):void 0;var Db=null,Eb=null,Gb=function(a){var b="";Fb(a,function(a){b+=String.fromCharCode(a)});return b},Fb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=Eb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}Hb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),l=c(64);if(64===l&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=l&&b(g<<6&192|l))}},Hb=function(){if(!Db){Db={};Eb={};for(var a=0;65>a;a++)Db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
Eb[Db[a]]=a,62<=a&&(Eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var Ib=function(){this.Fa=-1};var Lb=function(a,b){this.Fa=64;this.lc=k.Uint8Array?new Uint8Array(this.Fa):Array(this.Fa);this.Rc=this.kb=0;this.i=[];this.wf=a;this.ge=b;this.Xf=k.Int32Array?new Int32Array(64):Array(64);m(Jb)||(Jb=k.Int32Array?new Int32Array(Kb):Kb);this.reset()},Jb;u(Lb,Ib);for(var Mb=[],Nb=0;63>Nb;Nb++)Mb[Nb]=0;var Ob=Ya(128,Mb);Lb.prototype.reset=function(){this.Rc=this.kb=0;this.i=k.Int32Array?new Int32Array(this.ge):Za(this.ge)};
var Pb=function(a){var b=a.lc;x(b.length==a.Fa);for(var c=a.Xf,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){d=c[b-15]|0;e=c[b-2]|0;e=(e>>>17|e<<15)^(e>>>19|e<<13)^e>>>10;var f=(c[b-16]|0)+((d>>>7|d<<25)^(d>>>18|d<<14)^d>>>3)|0;var g=(c[b-7]|0)+e|0;c[b]=f+g|0}var d=a.i[0]|0,e=a.i[1]|0,l=a.i[2]|0,n=a.i[3]|0,C=a.i[4]|0,pb=a.i[5]|0,Xb=a.i[6]|0;f=a.i[7]|0;for(b=0;64>b;b++){var Wh=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&l^e&l)|0;g=C&pb^~C&Xb;f=f+
((C>>>6|C<<26)^(C>>>11|C<<21)^(C>>>25|C<<7))|0;g=g+(Jb[b]|0)|0;g=f+(g+(c[b]|0)|0)|0;f=Xb;Xb=pb;pb=C;C=n+g|0;n=l;l=e;e=d;d=g+Wh|0}a.i[0]=a.i[0]+d|0;a.i[1]=a.i[1]+e|0;a.i[2]=a.i[2]+l|0;a.i[3]=a.i[3]+n|0;a.i[4]=a.i[4]+C|0;a.i[5]=a.i[5]+pb|0;a.i[6]=a.i[6]+Xb|0;a.i[7]=a.i[7]+f|0};
Lb.prototype.update=function(a,b){m(b)||(b=a.length);var c=0,d=this.kb;if(p(a))for(;c<b;)this.lc[d++]=a.charCodeAt(c++),d==this.Fa&&(Pb(this),d=0);else if(ha(a))for(;c<b;){var e=a[c++];if(!("number"==typeof e&&0<=e&&255>=e&&e==(e|0)))throw Error("message must be a byte array");this.lc[d++]=e;d==this.Fa&&(Pb(this),d=0)}else throw Error("message must be string or array");this.kb=d;this.Rc+=b};
Lb.prototype.digest=function(){var a=[],b=8*this.Rc;56>this.kb?this.update(Ob,56-this.kb):this.update(Ob,this.Fa-(this.kb-56));for(var c=63;56<=c;c--)this.lc[c]=b&255,b/=256;Pb(this);for(c=b=0;c<this.wf;c++)for(var d=24;0<=d;d-=8)a[b++]=this.i[c]>>d&255;return a};
var Kb=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var Rb=function(){Lb.call(this,8,Qb)};u(Rb,Lb);var Qb=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];var Sb=function(){this.Ia=this.Ia;this.Cc=this.Cc};Sb.prototype.Ia=!1;Sb.prototype.isDisposed=function(){return this.Ia};Sb.prototype.hb=function(){if(this.Cc)for(;this.Cc.length;)this.Cc.shift()()};var Tb=!A||9<=Number(Bb),Ub=A&&!B("9");!ub||B("528");tb&&B("1.9b")||A&&B("8")||qb&&B("9.5")||ub&&B("528");tb&&!B("8")||A&&B("9");var Vb=function(){if(!k.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});k.addEventListener("test",null,b);k.removeEventListener("test",null,b);return a}();var Wb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.Ta=!1;this.re=!0};Wb.prototype.stopPropagation=function(){this.Ta=!0};Wb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.re=!1};var Yb=function(a,b){Wb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.la=this.state=null;a&&this.init(a,b)};u(Yb,Wb);
Yb.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(tb){a:{try{mb(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=ub||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=ub||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,
this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.la=a;a.defaultPrevented&&
this.preventDefault()};Yb.prototype.stopPropagation=function(){Yb.Nc.stopPropagation.call(this);this.la.stopPropagation?this.la.stopPropagation():this.la.cancelBubble=!0};Yb.prototype.preventDefault=function(){Yb.Nc.preventDefault.call(this);var a=this.la;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ub)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Yb.prototype.af=function(){return this.la};var Zb="closure_listenable_"+(1E6*Math.random()|0),$b=0;var ac=function(a,b,c,d,e){this.listener=a;this.Gc=null;this.src=b;this.type=c;this.capture=!!d;this.qc=e;this.key=++$b;this.tb=this.kc=!1},bc=function(a){a.tb=!0;a.listener=null;a.Gc=null;a.src=null;a.qc=null};var cc=function(a){this.src=a;this.I={};this.fc=0};cc.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.I[f];a||(a=this.I[f]=[],this.fc++);var g=dc(a,b,d,e);-1<g?(b=a[g],c||(b.kc=!1)):(b=new ac(b,this.src,f,!!d,e),b.kc=c,a.push(b));return b};cc.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.I))return!1;var e=this.I[a];b=dc(e,b,c,d);return-1<b?(bc(e[b]),Va(e,b),0==e.length&&(delete this.I[a],this.fc--),!0):!1};
var ec=function(a,b){var c=b.type;c in a.I&&Wa(a.I[c],b)&&(bc(b),0==a.I[c].length&&(delete a.I[c],a.fc--))};cc.prototype.gd=function(a,b,c,d){a=this.I[a.toString()];var e=-1;a&&(e=dc(a,b,c,d));return-1<e?a[e]:null};cc.prototype.hasListener=function(a,b){var c=m(a),d=c?a.toString():"",e=m(b);return eb(this.I,function(a){for(var f=0;f<a.length;++f)if(!(c&&a[f].type!=d||e&&a[f].capture!=b))return!0;return!1})};
var dc=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.tb&&f.listener==b&&f.capture==!!c&&f.qc==d)return e}return-1};var fc="closure_lm_"+(1E6*Math.random()|0),gc={},hc=0,jc=function(a,b,c,d,e){if(d&&d.once)ic(a,b,c,d,e);else if(ga(b))for(var f=0;f<b.length;f++)jc(a,b[f],c,d,e);else c=kc(c),a&&a[Zb]?a.listen(b,c,r(d)?!!d.capture:!!d,e):lc(a,b,c,!1,d,e)},lc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=r(e)?!!e.capture:!!e,l=mc(a);l||(a[fc]=l=new cc(a));c=l.add(b,c,d,g,f);if(!c.Gc){d=nc();c.Gc=d;d.src=a;d.listener=c;if(a.addEventListener)Vb||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),
d,e);else if(a.attachEvent)a.attachEvent(oc(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");hc++}},nc=function(){var a=pc,b=Tb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},ic=function(a,b,c,d,e){if(ga(b))for(var f=0;f<b.length;f++)ic(a,b[f],c,d,e);else c=kc(c),a&&a[Zb]?qc(a,b,c,r(d)?!!d.capture:!!d,e):lc(a,b,c,!0,d,e)},rc=function(a,b,c,d,e){if(ga(b))for(var f=0;f<b.length;f++)rc(a,b[f],c,d,
e);else d=r(d)?!!d.capture:!!d,c=kc(c),a&&a[Zb]?a.da.remove(String(b),c,d,e):a&&(a=mc(a))&&(b=a.gd(b,c,d,e))&&sc(b)},sc=function(a){if(!ca(a)&&a&&!a.tb){var b=a.src;if(b&&b[Zb])ec(b.da,a);else{var c=a.type,d=a.Gc;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent(oc(c),d);hc--;(c=mc(b))?(ec(c,a),0==c.fc&&(c.src=null,b[fc]=null)):bc(a)}}},oc=function(a){return a in gc?gc[a]:gc[a]="on"+a},uc=function(a,b,c,d){var e=!0;if(a=mc(a))if(b=a.I[b.toString()])for(b=b.concat(),
a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.tb&&(f=tc(f,d),e=e&&!1!==f)}return e},tc=function(a,b){var c=a.listener,d=a.qc||a.src;a.kc&&sc(a);return c.call(d,b)},pc=function(a,b){if(a.tb)return!0;if(!Tb){if(!b)a:{b=["window","event"];for(var c=k,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Yb(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=
b.currentTarget;e;e=e.parentNode)d.push(e);for(var e=a.type,f=d.length-1;!b.Ta&&0<=f;f--)b.currentTarget=d[f],a=uc(d[f],e,!0,b),c=c&&a;for(f=0;!b.Ta&&f<d.length;f++)b.currentTarget=d[f],a=uc(d[f],e,!1,b),c=c&&a}return c}return tc(a,new Yb(b,this))},mc=function(a){a=a[fc];return a instanceof cc?a:null},vc="__closure_events_fn_"+(1E9*Math.random()>>>0),kc=function(a){x(a,"Listener can not be null.");if(q(a))return a;x(a.handleEvent,"An object listener must have handleEvent method.");a[vc]||(a[vc]=function(b){return a.handleEvent(b)});
return a[vc]};var wc=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var yc=function(){this.ta="";this.Ge=xc};yc.prototype.Jb=!0;yc.prototype.Gb=function(){return this.ta};yc.prototype.toString=function(){return"SafeUrl{"+this.ta+"}"};
var zc=function(a){if(a instanceof yc&&a.constructor===yc&&a.Ge===xc)return a.ta;za("expected object of type SafeUrl, got '"+a+"' of type "+ea(a));return"type_error:SafeUrl"},Ac=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Cc=function(a){if(a instanceof yc)return a;a=a.Jb?a.Gb():String(a);Ac.test(a)||(a="about:invalid#zClosurez");return Bc(a)},xc={},Bc=function(a){var b=new yc;b.ta=a;return b};Bc("about:blank");var Fc=function(a){var b=[];Dc(new Ec,a,b);return b.join("")},Ec=function(){this.Hc=void 0},Dc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ga(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],Dc(a,a.Hc?a.Hc.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),
Gc(d,c),c.push(":"),Dc(a,a.Hc?a.Hc.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":Gc(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},Hc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ic=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,
Gc=function(a,b){b.push('"',a.replace(Ic,function(a){var b=Hc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Hc[a]=b);return b}),'"')};var Jc=function(){};Jc.prototype.Nd=null;var Kc=function(a){return a.Nd||(a.Nd=a.nd())};var Lc,Mc=function(){};u(Mc,Jc);Mc.prototype.mc=function(){var a=Nc(this);return a?new ActiveXObject(a):new XMLHttpRequest};Mc.prototype.nd=function(){var a={};Nc(this)&&(a[0]=!0,a[1]=!0);return a};
var Nc=function(a){if(!a.fe&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.fe=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.fe};Lc=new Mc;var Oc=function(){};u(Oc,Jc);Oc.prototype.mc=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Pc;throw Error("Unsupported browser");};Oc.prototype.nd=function(){return{}};
var Pc=function(){this.ja=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.ja.onload=t(this.df,this);this.ja.onerror=t(this.be,this);this.ja.onprogress=t(this.ef,this);this.ja.ontimeout=t(this.ff,this)};h=Pc.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.ja.open(a,b)};
h.send=function(a){if(a)if("string"==typeof a)this.ja.send(a);else throw Error("Only string data is supported");else this.ja.send()};h.abort=function(){this.ja.abort()};h.setRequestHeader=function(){};h.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.ja.contentType:""};h.df=function(){this.status=200;this.responseText=this.ja.responseText;Qc(this,4)};h.be=function(){this.status=500;this.responseText="";Qc(this,4)};h.ff=function(){this.be()};
h.ef=function(){this.status=200;Qc(this,1)};var Qc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};Pc.prototype.getAllResponseHeaders=function(){return"content-type: "+this.ja.contentType};var Rc=function(a,b,c){this.sf=c;this.Qe=a;this.Hf=b;this.Bc=0;this.rc=null};Rc.prototype.get=function(){if(0<this.Bc){this.Bc--;var a=this.rc;this.rc=a.next;a.next=null}else a=this.Qe();return a};Rc.prototype.put=function(a){this.Hf(a);this.Bc<this.sf&&(this.Bc++,a.next=this.rc,this.rc=a)};var Sc=function(a){k.setTimeout(function(){throw a;},0)},Tc,Uc=function(){var a=k.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!z("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=t(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!z("Trident")&&!z("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(m(c.next)){c=c.next;var a=c.Qd;c.Qd=null;a()}};return function(a){d.next={Qd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){k.setTimeout(a,0)}};var Vc=function(){this.Wc=this.cb=null},Xc=new Rc(function(){return new Wc},function(a){a.reset()},100);Vc.prototype.add=function(a,b){var c=Xc.get();c.set(a,b);this.Wc?this.Wc.next=c:(x(!this.cb),this.cb=c);this.Wc=c};Vc.prototype.remove=function(){var a=null;this.cb&&(a=this.cb,this.cb=this.cb.next,this.cb||(this.Wc=null),a.next=null);return a};var Wc=function(){this.next=this.scope=this.fd=null};Wc.prototype.set=function(a,b){this.fd=a;this.scope=b;this.next=null};
Wc.prototype.reset=function(){this.next=this.scope=this.fd=null};var bd=function(a,b){Yc||Zc();$c||(Yc(),$c=!0);ad.add(a,b)},Yc,Zc=function(){if(-1!=String(k.Promise).indexOf("[native code]")){var a=k.Promise.resolve(void 0);Yc=function(){a.then(cd)}}else Yc=function(){var a=cd;!q(k.setImmediate)||k.Window&&k.Window.prototype&&!z("Edge")&&k.Window.prototype.setImmediate==k.setImmediate?(Tc||(Tc=Uc()),Tc(a)):k.setImmediate(a)}},$c=!1,ad=new Vc,cd=function(){for(var a;a=ad.remove();){try{a.fd.call(a.scope)}catch(b){Sc(b)}Xc.put(a)}$c=!1};var dd=function(a){return r(a)?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):void 0===a?"undefined":null===a?"null":typeof a},ed=function(a){return(a=a&&a.ownerDocument)&&(a.defaultView||a.parentWindow)||window};var fd=!A||9<=Number(Bb);!tb&&!A||A&&9<=Number(Bb)||tb&&B("1.9.1");A&&B("9");var hd=function(){this.ta="";this.Fe=gd};hd.prototype.Jb=!0;hd.prototype.Gb=function(){return this.ta};hd.prototype.toString=function(){return"SafeHtml{"+this.ta+"}"};var id=function(a){if(a instanceof hd&&a.constructor===hd&&a.Fe===gd)return a.ta;za("expected object of type SafeHtml, got '"+a+"' of type "+ea(a));return"type_error:SafeHtml"},gd={};hd.prototype.mf=function(a){this.ta=a;return this};var jd=function(a,b){var c=ed(a);"undefined"!=typeof c.HTMLScriptElement&&"undefined"!=typeof c.Element&&x(a&&(a instanceof c.HTMLScriptElement||!(a instanceof c.Element)),"Argument is not a HTMLScriptElement (or a non-Element mock); got: %s",dd(a));a.src=Ja(b)};var kd=function(a){var b=document;return p(a)?b.getElementById(a):a},md=function(a,b){db(b,function(b,d){b&&b.Jb&&(b=b.Gb());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:ld.hasOwnProperty(d)?a.setAttribute(ld[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},ld={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",
type:"type",usemap:"useMap",valign:"vAlign",width:"width"},od=function(a,b,c){var d=arguments,e=document,f=String(d[0]),g=d[1];if(!fd&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',va(g.name),'"');if(g.type){f.push(' type="',va(g.type),'"');var l={};lb(l,g);delete l.type;g=l}f.push(">");f=f.join("")}f=e.createElement(f);g&&(p(g)?f.className=g:ga(g)?f.className=g.join(" "):md(f,g));2<d.length&&nd(e,f,d);return f},nd=function(a,b,c){function d(c){c&&b.appendChild(p(c)?a.createTextNode(c):
c)}for(var e=2;e<c.length;e++){var f=c[e];!ha(f)||r(f)&&0<f.nodeType?d(f):y(pd(f)?Za(f):f,d)}},pd=function(a){if(a&&"number"==typeof a.length){if(r(a))return"function"==typeof a.item||"string"==typeof a.item;if(q(a))return"function"==typeof a.item}return!1};var qd=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},rd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var D=function(a,b){this.X=0;this.va=void 0;this.gb=this.qa=this.u=null;this.pc=this.ed=!1;if(a!=da)try{var c=this;a.call(b,function(a){sd(c,2,a)},function(a){if(!(a instanceof td))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}sd(c,3,a)})}catch(d){sd(this,3,d)}},ud=function(){this.next=this.context=this.mb=this.Qa=this.child=null;this.yb=!1};ud.prototype.reset=function(){this.context=this.mb=this.Qa=this.child=null;this.yb=!1};
var vd=new Rc(function(){return new ud},function(a){a.reset()},100),wd=function(a,b,c){var d=vd.get();d.Qa=a;d.mb=b;d.context=c;return d},E=function(a){if(a instanceof D)return a;var b=new D(da);sd(b,2,a);return b},F=function(a){return new D(function(b,c){c(a)})},yd=function(a,b,c){xd(a,b,c,null)||bd(ka(b,a))},zd=function(a){return new D(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Ze:!0,value:f}:{Ze:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],yd(g,ka(e,f,!0),
ka(e,f,!1));else b(d)})};D.prototype.then=function(a,b,c){null!=a&&Ca(a,"opt_onFulfilled should be a function.");null!=b&&Ca(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Ad(this,q(a)?a:null,q(b)?b:null,c)};qd(D);var Cd=function(a,b){b=wd(b,b,void 0);b.yb=!0;Bd(a,b);return a};D.prototype.f=function(a,b){return Ad(this,null,a,b)};D.prototype.cancel=function(a){0==this.X&&bd(function(){var b=new td(a);Dd(this,b)},this)};
var Dd=function(a,b){if(0==a.X)if(a.u){var c=a.u;if(c.qa){for(var d=0,e=null,f=null,g=c.qa;g&&(g.yb||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.X&&1==d?Dd(c,b):(f?(d=f,x(c.qa),x(null!=d),d.next==c.gb&&(c.gb=d),d.next=d.next.next):Ed(c),Fd(c,e,3,b)))}a.u=null}else sd(a,3,b)},Bd=function(a,b){a.qa||2!=a.X&&3!=a.X||Gd(a);x(null!=b.Qa);a.gb?a.gb.next=b:a.qa=b;a.gb=b},Ad=function(a,b,c,d){var e=wd(null,null,null);e.child=new D(function(a,g){e.Qa=b?function(c){try{var e=b.call(d,c);a(e)}catch(C){g(C)}}:
a;e.mb=c?function(b){try{var e=c.call(d,b);!m(e)&&b instanceof td?g(b):a(e)}catch(C){g(C)}}:g});e.child.u=a;Bd(a,e);return e.child};D.prototype.Uf=function(a){x(1==this.X);this.X=0;sd(this,2,a)};D.prototype.Vf=function(a){x(1==this.X);this.X=0;sd(this,3,a)};
var sd=function(a,b,c){0==a.X&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.X=1,xd(c,a.Uf,a.Vf,a)||(a.va=c,a.X=b,a.u=null,Gd(a),3!=b||c instanceof td||Hd(a,c)))},xd=function(a,b,c,d){if(a instanceof D)return null!=b&&Ca(b,"opt_onFulfilled should be a function."),null!=c&&Ca(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Bd(a,wd(b||da,c||null,d)),!0;if(rd(a))return a.then(b,c,d),!0;if(r(a))try{var e=a.then;if(q(e))return Id(a,
e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Id=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},l=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,l)}catch(n){l(n)}},Gd=function(a){a.ed||(a.ed=!0,bd(a.Ve,a))},Ed=function(a){var b=null;a.qa&&(b=a.qa,a.qa=b.next,b.next=null);a.qa||(a.gb=null);null!=b&&x(null!=b.Qa);return b};D.prototype.Ve=function(){for(var a;a=Ed(this);)Fd(this,a,this.X,this.va);this.ed=!1};
var Fd=function(a,b,c,d){if(3==c&&b.mb&&!b.yb)for(;a&&a.pc;a=a.u)a.pc=!1;if(b.child)b.child.u=null,Jd(b,c,d);else try{b.yb?b.Qa.call(b.context):Jd(b,c,d)}catch(e){Kd.call(null,e)}vd.put(b)},Jd=function(a,b,c){2==b?a.Qa.call(a.context,c):a.mb&&a.mb.call(a.context,c)},Hd=function(a,b){a.pc=!0;bd(function(){a.pc&&Kd.call(null,b)})},Kd=Sc,td=function(a){v.call(this,a)};u(td,v);td.prototype.name="cancel";
var Ld=function(a,b){this.Jc=[];this.me=a;this.Ud=b||null;this.Hb=this.ib=!1;this.va=void 0;this.Gd=this.Ld=this.$c=!1;this.Sc=0;this.u=null;this.ad=0};Ld.prototype.cancel=function(a){if(this.ib)this.va instanceof Ld&&this.va.cancel();else{if(this.u){var b=this.u;delete this.u;a?b.cancel(a):(b.ad--,0>=b.ad&&b.cancel())}this.me?this.me.call(this.Ud,this):this.Gd=!0;this.ib||Md(this,new Nd)}};Ld.prototype.Sd=function(a,b){this.$c=!1;Od(this,a,b)};
var Od=function(a,b,c){a.ib=!0;a.va=c;a.Hb=!b;Pd(a)},Rd=function(a){if(a.ib){if(!a.Gd)throw new Qd;a.Gd=!1}};Ld.prototype.callback=function(a){Rd(this);Sd(a);Od(this,!0,a)};var Md=function(a,b){Rd(a);Sd(b);Od(a,!1,b)},Sd=function(a){x(!(a instanceof Ld),"An execution sequence may not be initiated with a blocking Deferred.")},Ud=function(a,b){Td(a,null,b,void 0)},Td=function(a,b,c,d){x(!a.Ld,"Blocking Deferreds can not be re-used");a.Jc.push([b,c,d]);a.ib&&Pd(a)};
Ld.prototype.then=function(a,b,c){var d,e,f=new D(function(a,b){d=a;e=b});Td(this,d,function(a){a instanceof Nd?f.cancel():e(a)});return f.then(a,b,c)};qd(Ld);
var Vd=function(a){return Ra(a.Jc,function(a){return q(a[1])})},Pd=function(a){if(a.Sc&&a.ib&&Vd(a)){var b=a.Sc,c=Wd[b];c&&(k.clearTimeout(c.Ib),delete Wd[b]);a.Sc=0}a.u&&(a.u.ad--,delete a.u);for(var b=a.va,d=c=!1;a.Jc.length&&!a.$c;){var e=a.Jc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.Hb?g:f)try{var l=f.call(e||a.Ud,b);m(l)&&(a.Hb=a.Hb&&(l==b||l instanceof Error),a.va=b=l);if(rd(b)||"function"===typeof k.Promise&&b instanceof k.Promise)d=!0,a.$c=!0}catch(n){b=n,a.Hb=!0,Vd(a)||(c=!0)}}a.va=b;d&&(l=t(a.Sd,
a,!0),d=t(a.Sd,a,!1),b instanceof Ld?(Td(b,l,d),b.Ld=!0):b.then(l,d));c&&(b=new Xd(b),Wd[b.Ib]=b,a.Sc=b.Ib)},Qd=function(){v.call(this)};u(Qd,v);Qd.prototype.message="Deferred has already fired";Qd.prototype.name="AlreadyCalledError";var Nd=function(){v.call(this)};u(Nd,v);Nd.prototype.message="Deferred was canceled";Nd.prototype.name="CanceledError";var Xd=function(a){this.Ib=k.setTimeout(t(this.Tf,this),0);this.Y=a};
Xd.prototype.Tf=function(){x(Wd[this.Ib],"Cannot throw an error that is not scheduled.");delete Wd[this.Ib];throw this.Y;};var Wd={};var be=function(a){var b={},c=b.document||document,d=Ja(a),e=document.createElement("SCRIPT"),f={se:e,ec:void 0},g=new Ld(Yd,f),l=null,n=null!=b.timeout?b.timeout:5E3;0<n&&(l=window.setTimeout(function(){Zd(e,!0);Md(g,new $d(1,"Timeout reached for loading script "+d))},n),f.ec=l);e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(Zd(e,b.eg||!1,l),g.callback(null))};e.onerror=function(){Zd(e,!0,l);Md(g,new $d(0,"Error while loading script "+d))};
f=b.attributes||{};lb(f,{type:"text/javascript",charset:"UTF-8"});md(e,f);jd(e,a);ae(c).appendChild(e);return g},ae=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},Yd=function(){if(this&&this.se){var a=this.se;a&&"SCRIPT"==a.tagName&&Zd(a,!0,this.ec)}},Zd=function(a,b,c){null!=c&&k.clearTimeout(c);a.onload=da;a.onerror=da;a.onreadystatechange=da;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},$d=function(a,
b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);v.call(this,c);this.code=a};u($d,v);var ce=function(a,b,c,d,e){this.reset(a,b,c,d,e)};ce.prototype.Wd=null;var de=0;ce.prototype.reset=function(a,b,c,d,e){"number"==typeof e||de++;d||la();this.Ob=a;this.vf=b;delete this.Wd};ce.prototype.ue=function(a){this.Ob=a};var ee=function(a){this.ke=a;this.ce=this.bd=this.Ob=this.u=null},fe=function(a,b){this.name=a;this.value=b};fe.prototype.toString=function(){return this.name};var ge=new fe("SEVERE",1E3),he=new fe("INFO",800),ie=new fe("CONFIG",700),je=new fe("FINE",500);ee.prototype.getName=function(){return this.ke};ee.prototype.getParent=function(){return this.u};ee.prototype.ue=function(a){this.Ob=a};var ke=function(a){if(a.Ob)return a.Ob;if(a.u)return ke(a.u);za("Root logger has no level set.");return null};
ee.prototype.log=function(a,b,c){if(a.value>=ke(this).value)for(q(b)&&(b=b()),a=new ce(a,String(b),this.ke),c&&(a.Wd=c),c="log:"+a.vf,k.console&&(k.console.timeStamp?k.console.timeStamp(c):k.console.markTimeline&&k.console.markTimeline(c)),k.msWriteProfilerMark&&k.msWriteProfilerMark(c),c=this;c;){var d=c,e=a;if(d.ce)for(var f=0;b=d.ce[f];f++)b(e);c=c.getParent()}};ee.prototype.info=function(a,b){this.log(he,a,b)};ee.prototype.config=function(a,b){this.log(ie,a,b)};
var le={},me=null,ne=function(a){me||(me=new ee(""),le[""]=me,me.ue(ie));var b;if(!(b=le[a])){b=new ee(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ne(a.substr(0,c));c.bd||(c.bd={});c.bd[d]=b;b.u=c;le[a]=b}return b};var oe=function(){Sb.call(this);this.da=new cc(this);this.Ke=this;this.sd=null};u(oe,Sb);oe.prototype[Zb]=!0;h=oe.prototype;h.addEventListener=function(a,b,c,d){jc(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){rc(this,a,b,c,d)};
h.dispatchEvent=function(a){pe(this);var b=this.sd;if(b){var c=[];for(var d=1;b;b=b.sd)c.push(b),x(1E3>++d,"infinite loop")}b=this.Ke;d=a.type||a;if(p(a))a=new Wb(a,b);else if(a instanceof Wb)a.target=a.target||b;else{var e=a;a=new Wb(d,b);lb(a,e)}var e=!0;if(c)for(var f=c.length-1;!a.Ta&&0<=f;f--){var g=a.currentTarget=c[f];e=qe(g,d,!0,a)&&e}a.Ta||(g=a.currentTarget=b,e=qe(g,d,!0,a)&&e,a.Ta||(e=qe(g,d,!1,a)&&e));if(c)for(f=0;!a.Ta&&f<c.length;f++)g=a.currentTarget=c[f],e=qe(g,d,!1,a)&&e;return e};
h.hb=function(){oe.Nc.hb.call(this);if(this.da){var a=this.da,b=0,c;for(c in a.I){for(var d=a.I[c],e=0;e<d.length;e++)++b,bc(d[e]);delete a.I[c];a.fc--}}this.sd=null};h.listen=function(a,b,c,d){pe(this);return this.da.add(String(a),b,!1,c,d)};
var qc=function(a,b,c,d,e){a.da.add(String(b),c,!0,d,e)},qe=function(a,b,c,d){b=a.da.I[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.tb&&g.capture==c){var l=g.listener,n=g.qc||g.src;g.kc&&ec(a.da,g);e=!1!==l.call(n,d)&&e}}return e&&0!=d.re};oe.prototype.gd=function(a,b,c,d){return this.da.gd(String(a),b,c,d)};oe.prototype.hasListener=function(a,b){return this.da.hasListener(m(a)?String(a):void 0,b)};var pe=function(a){x(a.da,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var re="StopIteration"in k?k.StopIteration:{message:"StopIteration",stack:""},se=function(){};se.prototype.next=function(){throw re;};se.prototype.Je=function(){return this};var G=function(a,b){a&&a.log(je,b,void 0)};var te=function(a,b){this.fa={};this.A=[];this.bb=this.o=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=te.prototype;h.ea=function(){ue(this);for(var a=[],b=0;b<this.A.length;b++)a.push(this.fa[this.A[b]]);return a};h.ra=function(){ue(this);return this.A.concat()};h.Ab=function(a){return ve(this.fa,a)};h.clear=function(){this.fa={};this.bb=this.o=this.A.length=0};
h.remove=function(a){return ve(this.fa,a)?(delete this.fa[a],this.o--,this.bb++,this.A.length>2*this.o&&ue(this),!0):!1};var ue=function(a){var b,c;if(a.o!=a.A.length){for(b=c=0;c<a.A.length;){var d=a.A[c];ve(a.fa,d)&&(a.A[b++]=d);c++}a.A.length=b}if(a.o!=a.A.length){var e={};for(b=c=0;c<a.A.length;)d=a.A[c],ve(e,d)||(a.A[b++]=d,e[d]=1),c++;a.A.length=b}};h=te.prototype;h.get=function(a,b){return ve(this.fa,a)?this.fa[a]:b};
h.set=function(a,b){ve(this.fa,a)||(this.o++,this.A.push(a),this.bb++);this.fa[a]=b};h.addAll=function(a){if(a instanceof te){var b=a.ra();a=a.ea()}else b=gb(a),a=fb(a);for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ra(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new te(this)};
h.Je=function(a){ue(this);var b=0,c=this.bb,d=this,e=new se;e.next=function(){if(c!=d.bb)throw Error("The map has changed since the iterator was created");if(b>=d.A.length)throw re;var e=d.A[b++];return a?e:d.fa[e]};return e};var ve=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var we=function(a){if(a.ea&&"function"==typeof a.ea)return a.ea();if(p(a))return a.split("");if(ha(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return fb(a)},xe=function(a){if(a.ra&&"function"==typeof a.ra)return a.ra();if(!a.ea||"function"!=typeof a.ea){if(ha(a)||p(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return gb(a)}},ye=function(a,b,c){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,c);else if(ha(a)||p(a))y(a,b,c);else for(var d=xe(a),e=we(a),f=e.length,
g=0;g<f;g++)b.call(c,e[g],d&&d[g],a)};var ze=function(a,b,c){if(q(a))c&&(a=t(a,c));else if(a&&"function"==typeof a.handleEvent)a=t(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:k.setTimeout(a,b||0)},Ae=function(a){var b=null;return(new D(function(c,d){b=ze(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).f(function(a){k.clearTimeout(b);throw a;})};var Be=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,Ce=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};var H=function(a){oe.call(this);this.headers=new te;this.Yc=a||null;this.ya=!1;this.Xc=this.b=null;this.Nb=this.je=this.yc="";this.Ma=this.ld=this.uc=this.dd=!1;this.ub=0;this.Pc=null;this.Ic="";this.Tc=this.Cf=this.Ee=!1};u(H,oe);var De=H.prototype,Ee=ne("goog.net.XhrIo");De.M=Ee;var Fe=/^https?$/i,Ge=["POST","PUT"];
H.prototype.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.yc+"; newUri="+a);b=b?b.toUpperCase():"GET";this.yc=a;this.Nb="";this.je=b;this.dd=!1;this.ya=!0;this.b=this.Yc?this.Yc.mc():Lc.mc();this.Xc=this.Yc?Kc(this.Yc):Kc(Lc);this.b.onreadystatechange=t(this.oe,this);this.Cf&&"onprogress"in this.b&&(this.b.onprogress=t(function(a){this.ne(a,!0)},this),this.b.upload&&(this.b.upload.onprogress=t(this.ne,this)));try{G(this.M,He(this,"Opening Xhr")),
this.ld=!0,this.b.open(b,String(a),!0),this.ld=!1}catch(f){G(this.M,He(this,"Error opening Xhr: "+f.message));this.Y(5,f);return}a=c||"";var e=this.headers.clone();d&&ye(d,function(a,b){e.set(b,a)});d=Ta(e.ra());c=k.FormData&&a instanceof k.FormData;!Ua(Ge,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);this.Ic&&(this.b.responseType=this.Ic);"withCredentials"in this.b&&this.b.withCredentials!==this.Ee&&(this.b.withCredentials=
this.Ee);try{Ie(this),0<this.ub&&(this.Tc=Je(this.b),G(this.M,He(this,"Will abort after "+this.ub+"ms if incomplete, xhr2 "+this.Tc)),this.Tc?(this.b.timeout=this.ub,this.b.ontimeout=t(this.ec,this)):this.Pc=ze(this.ec,this.ub,this)),G(this.M,He(this,"Sending request")),this.uc=!0,this.b.send(a),this.uc=!1}catch(f){G(this.M,He(this,"Send error: "+f.message)),this.Y(5,f)}};var Je=function(a){return A&&B(9)&&ca(a.timeout)&&m(a.ontimeout)},Sa=function(a){return"content-type"==a.toLowerCase()};
H.prototype.ec=function(){"undefined"!=typeof aa&&this.b&&(this.Nb="Timed out after "+this.ub+"ms, aborting",G(this.M,He(this,this.Nb)),this.dispatchEvent("timeout"),this.abort(8))};H.prototype.Y=function(a,b){this.ya=!1;this.b&&(this.Ma=!0,this.b.abort(),this.Ma=!1);this.Nb=b;Ke(this);Le(this)};var Ke=function(a){a.dd||(a.dd=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
H.prototype.abort=function(){this.b&&this.ya&&(G(this.M,He(this,"Aborting")),this.ya=!1,this.Ma=!0,this.b.abort(),this.Ma=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Le(this))};H.prototype.hb=function(){this.b&&(this.ya&&(this.ya=!1,this.Ma=!0,this.b.abort(),this.Ma=!1),Le(this,!0));H.Nc.hb.call(this)};H.prototype.oe=function(){this.isDisposed()||(this.ld||this.uc||this.Ma?Me(this):this.yf())};H.prototype.yf=function(){Me(this)};
var Me=function(a){if(a.ya&&"undefined"!=typeof aa)if(a.Xc[1]&&4==Ne(a)&&2==Oe(a))G(a.M,He(a,"Local request error detected and ignored"));else if(a.uc&&4==Ne(a))ze(a.oe,0,a);else if(a.dispatchEvent("readystatechange"),4==Ne(a)){G(a.M,He(a,"Request complete"));a.ya=!1;try{var b=Oe(a);a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.yc).match(Be)[1]||null;if(!f&&k.self&&k.self.location)var g=k.self.location.protocol,
f=g.substr(0,g.length-1);e=!Fe.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{try{var l=2<Ne(a)?a.b.statusText:""}catch(n){G(a.M,"Can not get status: "+n.message),l=""}a.Nb=l+" ["+Oe(a)+"]";Ke(a)}}finally{Le(a)}}};H.prototype.ne=function(a,b){x("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(Pe(a,"progress"));this.dispatchEvent(Pe(a,b?"downloadprogress":"uploadprogress"))};
var Pe=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Le=function(a,b){if(a.b){Ie(a);var c=a.b,d=a.Xc[0]?da:null;a.b=null;a.Xc=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.M)&&a.log(ge,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Ie=function(a){a.b&&a.Tc&&(a.b.ontimeout=null);ca(a.Pc)&&(k.clearTimeout(a.Pc),a.Pc=null)},Ne=function(a){return a.b?a.b.readyState:0},Oe=function(a){try{return 2<Ne(a)?
a.b.status:-1}catch(b){return-1}},Qe=function(a){try{return a.b?a.b.responseText:""}catch(b){return G(a.M,"Can not get responseText: "+b.message),""}};
H.prototype.getResponse=function(){try{if(!this.b)return null;if("response"in this.b)return this.b.response;switch(this.Ic){case "":case "text":return this.b.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in this.b)return this.b.mozResponseArrayBuffer}var a=this.M;a&&a.log(ge,"Response type "+this.Ic+" is not supported on this browser",void 0);return null}catch(b){return G(this.M,"Can not get response: "+b.message),null}};
H.prototype.getResponseHeader=function(a){if(this.b&&4==Ne(this))return a=this.b.getResponseHeader(a),null===a?void 0:a};H.prototype.getAllResponseHeaders=function(){return this.b&&4==Ne(this)?this.b.getAllResponseHeaders():""};var He=function(a,b){return b+" ["+a.je+" "+a.yc+" "+Oe(a)+"]"};var Re=function(a,b){this.ka=this.$a=this.ma="";this.ob=null;this.La=this.Aa="";this.$=this.rf=!1;if(a instanceof Re){this.$=m(b)?b:a.$;Se(this,a.ma);var c=a.$a;I(this);this.$a=c;Te(this,a.ka);Ue(this,a.ob);Ve(this,a.Aa);We(this,a.ba.clone());a=a.La;I(this);this.La=a}else a&&(c=String(a).match(Be))?(this.$=!!b,Se(this,c[1]||"",!0),a=c[2]||"",I(this),this.$a=Xe(a),Te(this,c[3]||"",!0),Ue(this,c[4]),Ve(this,c[5]||"",!0),We(this,c[6]||"",!0),a=c[7]||"",I(this),this.La=Xe(a)):(this.$=!!b,this.ba=new Ye(null,
0,this.$))};Re.prototype.toString=function(){var a=[],b=this.ma;b&&a.push(Ze(b,$e,!0),":");var c=this.ka;if(c||"file"==b)a.push("//"),(b=this.$a)&&a.push(Ze(b,$e,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.ob,null!=c&&a.push(":",String(c));if(c=this.Aa)this.ka&&"/"!=c.charAt(0)&&a.push("/"),a.push(Ze(c,"/"==c.charAt(0)?af:bf,!0));(c=this.ba.toString())&&a.push("?",c);(c=this.La)&&a.push("#",Ze(c,cf));return a.join("")};
Re.prototype.resolve=function(a){var b=this.clone(),c=!!a.ma;c?Se(b,a.ma):c=!!a.$a;if(c){var d=a.$a;I(b);b.$a=d}else c=!!a.ka;c?Te(b,a.ka):c=null!=a.ob;d=a.Aa;if(c)Ue(b,a.ob);else if(c=!!a.Aa){if("/"!=d.charAt(0))if(this.ka&&!this.Aa)d="/"+d;else{var e=b.Aa.lastIndexOf("/");-1!=e&&(d=b.Aa.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(w(e,"./")||w(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var l=e[g++];"."==l?d&&g==e.length&&f.push(""):".."==l?((1<f.length||
1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(l),d=!0)}d=f.join("/")}else d=e}c?Ve(b,d):c=""!==a.ba.toString();c?We(b,a.ba.clone()):c=!!a.La;c&&(a=a.La,I(b),b.La=a);return b};Re.prototype.clone=function(){return new Re(this)};
var Se=function(a,b,c){I(a);a.ma=c?Xe(b,!0):b;a.ma&&(a.ma=a.ma.replace(/:$/,""))},Te=function(a,b,c){I(a);a.ka=c?Xe(b,!0):b},Ue=function(a,b){I(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.ob=b}else a.ob=null},Ve=function(a,b,c){I(a);a.Aa=c?Xe(b,!0):b},We=function(a,b,c){I(a);b instanceof Ye?(a.ba=b,a.ba.Ed(a.$)):(c||(b=Ze(b,df)),a.ba=new Ye(b,0,a.$))},J=function(a,b,c){I(a);a.ba.set(b,c)},ef=function(a,b){return a.ba.get(b)};
Re.prototype.removeParameter=function(a){I(this);this.ba.remove(a);return this};var I=function(a){if(a.rf)throw Error("Tried to modify a read-only Uri");};Re.prototype.Ed=function(a){this.$=a;this.ba&&this.ba.Ed(a);return this};
var ff=function(a){return a instanceof Re?a.clone():new Re(a,void 0)},gf=function(a,b){var c=new Re(null,void 0);Se(c,"https");a&&Te(c,a);b&&Ve(c,b);return c},Xe=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Ze=function(a,b,c){return p(a)?(a=encodeURI(a).replace(b,hf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},hf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},$e=/[#\/\?@]/g,bf=/[\#\?:]/g,af=/[\#\?]/g,df=/[\#\?@]/g,
cf=/#/g,Ye=function(a,b,c){this.o=this.j=null;this.R=a||null;this.$=!!c},jf=function(a){a.j||(a.j=new te,a.o=0,a.R&&Ce(a.R,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},lf=function(a){var b=xe(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new Ye(null,0,void 0);a=we(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];ga(f)?kf(c,e,f):c.add(e,f)}return c};h=Ye.prototype;
h.add=function(a,b){jf(this);this.R=null;a=this.Z(a);var c=this.j.get(a);c||this.j.set(a,c=[]);c.push(b);this.o=Aa(this.o)+1;return this};h.remove=function(a){jf(this);a=this.Z(a);return this.j.Ab(a)?(this.R=null,this.o=Aa(this.o)-this.j.get(a).length,this.j.remove(a)):!1};h.clear=function(){this.j=this.R=null;this.o=0};h.Ab=function(a){jf(this);a=this.Z(a);return this.j.Ab(a)};h.forEach=function(a,b){jf(this);this.j.forEach(function(c,d){y(c,function(c){a.call(b,c,d,this)},this)},this)};
h.ra=function(){jf(this);for(var a=this.j.ea(),b=this.j.ra(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.ea=function(a){jf(this);var b=[];if(p(a))this.Ab(a)&&(b=Ya(b,this.j.get(this.Z(a))));else{a=this.j.ea();for(var c=0;c<a.length;c++)b=Ya(b,a[c])}return b};h.set=function(a,b){jf(this);this.R=null;a=this.Z(a);this.Ab(a)&&(this.o=Aa(this.o)-this.j.get(a).length);this.j.set(a,[b]);this.o=Aa(this.o)+1;return this};
h.get=function(a,b){a=a?this.ea(a):[];return 0<a.length?String(a[0]):b};var kf=function(a,b,c){a.remove(b);0<c.length&&(a.R=null,a.j.set(a.Z(b),Za(c)),a.o=Aa(a.o)+c.length)};h=Ye.prototype;h.toString=function(){if(this.R)return this.R;if(!this.j)return"";for(var a=[],b=this.j.ra(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ea(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.R=a.join("&")};
h.clone=function(){var a=new Ye;a.R=this.R;this.j&&(a.j=this.j.clone(),a.o=this.o);return a};h.Z=function(a){a=String(a);this.$&&(a=a.toLowerCase());return a};h.Ed=function(a){a&&!this.$&&(jf(this),this.R=null,this.j.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),kf(this,b,a))},this));this.$=a};h.extend=function(a){for(var b=0;b<arguments.length;b++)ye(arguments[b],function(a,b){this.add(b,a)},this)};var mf=function(){var a=K();return A&&!!Bb&&11==Bb||/Edge\/\d+/.test(a)},nf=function(){return k.window&&k.window.location.href||""},of=function(a,b){b=b||k.window;var c="about:blank";a&&(c=zc(Cc(a)));b.location.href=c},pf=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):ga(a[d])?ib(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<pf(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},rf=function(){var a=
K();a="Chrome"!=qf(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!A||!Bb||9<Bb},sf=function(a){a=(a||K()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1},tf=function(a){a=a||k.window;try{a.close()}catch(b){}},uf=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-
b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=K().toLowerCase();d&&(b.target=d,w(c,"crios/")&&(b.target="_blank"));"Firefox"==qf(K())&&(a=a||"http://localhost",b.scrollbars=!0);c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof yc?c:Cc("undefined"!=typeof c.href?c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;
default:e.push(g+"="+(d[g]?1:0))}var g=e.join(",");(z("iPhone")&&!z("iPod")&&!z("iPad")||z("iPad")||z("iPod"))&&a.navigator&&a.navigator.standalone&&c&&"_self"!=c?(g=a.document.createElement("A"),e=ed(g),"undefined"!=typeof e.HTMLAnchorElement&&"undefined"!=typeof e.Location&&"undefined"!=typeof e.Element&&x(g&&(g instanceof e.HTMLAnchorElement||!(g instanceof e.Location||g instanceof e.Element)),"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",dd(g)),b=b instanceof yc?b:Cc(b),
g.href=zc(b),g.setAttribute("target",c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",c,g),d=zc(b),g&&(sb&&w(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=Ga("b/12014412, meta tag with sanitized URL"),d='<META HTTP-EQUIV="refresh" content="0; url='+va(d)+'">',Ba(Fa(a),"must provide justification"),x(!/^[\s\xa0]*$/.test(Fa(a)),"must provide non-empty justification"),
g.document.write(id((new hd).mf(d))),g.document.close())):g=a.open(zc(b),c,g);if(g)try{g.focus()}catch(l){}return g},vf=function(a){return new D(function(b){var c=function(){Ae(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},wf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xf=function(){var a=null;return(new D(function(b){"complete"==k.document.readyState?b():(a=function(){b()},ic(window,"load",a))})).f(function(b){rc(window,"load",a);throw b;})},zf=function(){return yf(void 0)?
xf().then(function(){return new D(function(a,b){var c=k.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):F(Error("Cordova must run in an Android or iOS file scheme."))},yf=function(a){a=a||K();return!("file:"!==Af()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))},Bf=function(){var a=k.window;try{return!(!a||a==a.top)}catch(b){return!1}},Cf=function(){return firebase.INTERNAL.hasOwnProperty("reactNative")?
"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":"Browser"},Df=function(){var a=Cf();return"ReactNative"===a||"Node"===a},qf=function(a){var b=a.toLowerCase();if(w(b,"opera/")||w(b,"opr/")||w(b,"opios/"))return"Opera";if(w(b,"iemobile"))return"IEMobile";if(w(b,"msie")||w(b,"trident/"))return"IE";if(w(b,"edge/"))return"Edge";if(w(b,"firefox/"))return"Firefox";if(w(b,"silk/"))return"Silk";if(w(b,"blackberry"))return"Blackberry";if(w(b,"webos"))return"Webos";if(!w(b,"safari/")||w(b,"chrome/")||
w(b,"crios/")||w(b,"android"))if(!w(b,"chrome/")&&!w(b,"crios/")||w(b,"edge/")){if(w(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},Ef=function(a){var b=Cf();return("Browser"===b?qf(K()):b)+"/JsCore/"+a},K=function(){return k.navigator&&k.navigator.userAgent||""},L=function(a,b){a=a.split(".");b=b||k;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);
return b},Hf=function(){var a;if(a=(Ff()||"chrome-extension:"===Af()||yf())&&!Df())a:{try{var b=k.localStorage,c=Gf();if(b){b.setItem(c,"1");b.removeItem(c);a=mf()?!!k.indexedDB:!0;break a}}catch(d){}a=!1}return a},Ff=function(){return"http:"===Af()||"https:"===Af()},Af=function(){return k.location&&k.location.protocol||null},If=function(a){a=a||K();return sf(a)||"Firefox"==qf(a)?!1:!0},Jf=function(a){return"undefined"===typeof a?null:Fc(a)},Kf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&
null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b},Lf=function(a){if(null!==a)return JSON.parse(a)},Gf=function(a){return a?a:""+Math.floor(1E9*Math.random()).toString()},Mf=function(a){a=a||K();return"Safari"==qf(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0},Nf=function(){var a=k.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null},Of=function(){return k.navigator&&"boolean"===typeof k.navigator.onLine?
k.navigator.onLine:!0},Pf=function(a,b,c,d){if(a>b)throw Error("Short delay should be less than long delay!");this.Qf=a;this.uf=b;a=c||K();d=d||Cf();this.qf=sf(a)||"ReactNative"===d};Pf.prototype.get=function(){return this.qf?this.uf:this.Qf};
var Qf=function(){var a=k.document;return a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:!0},Rf=function(){var a=k.document,b=null;return Qf()||!a?E():(new D(function(c){b=function(){Qf()&&(a.removeEventListener("visibilitychange",b,!1),c())};a.addEventListener("visibilitychange",b,!1)})).f(function(c){a.removeEventListener("visibilitychange",b,!1);throw c;})};var Sf={};var Tf;try{var Uf={};Object.defineProperty(Uf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Uf,"abcd",{configurable:!0,enumerable:!0,value:2});Tf=2==Uf.abcd}catch(a){Tf=!1}
var M=function(a,b,c){Tf?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Vf=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&M(a,c,b[c])},Wf=function(a){var b={};Vf(b,a);return b},Xf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Yf=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0},Zf=function(a){var b=a;if("object"==typeof a&&null!=a){var b=
"length"in a?[]:{},c;for(c in a)M(b,c,Zf(a[c]))}return b};var $f="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),ag=["client_id","response_type","scope","redirect_uri","state"],bg={$f:{Sb:500,Rb:600,providerId:"facebook.com",Ad:ag},ag:{Sb:500,Rb:620,providerId:"github.com",Ad:ag},bg:{Sb:515,Rb:680,providerId:"google.com",Ad:ag},cg:{Sb:485,Rb:705,providerId:"twitter.com",Ad:$f}},cg=function(a){for(var b in bg)if(bg[b].providerId==a)return bg[b];return null};var N=function(a,b){this.code="auth/"+a;this.message=b||dg[a]||""};u(N,Error);N.prototype.G=function(){return{code:this.code,message:this.message}};N.prototype.toJSON=function(){return this.G()};
var eg=function(a){var b=a&&a.code;return b?new N(b.substring(5),a.message):null},dg={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
"code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
"dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
"invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
"invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
"invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.",
"invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
"invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.",
"missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
"no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The SMS quota for this project has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",
timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.",
"user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};var O=function(a,b,c,d,e){this.ia=a;this.S=b||null;this.vb=c||null;this.Dd=d||null;this.Y=e||null;if(this.vb||this.Y){if(this.vb&&this.Y)throw new N("invalid-auth-event");if(this.vb&&!this.Dd)throw new N("invalid-auth-event");}else throw new N("invalid-auth-event");};O.prototype.oc=function(){return this.Dd};O.prototype.getError=function(){return this.Y};O.prototype.G=function(){return{type:this.ia,eventId:this.S,urlResponse:this.vb,sessionId:this.Dd,error:this.Y&&this.Y.G()}};
var fg=function(a){a=a||{};return a.type?new O(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&eg(a.error)):null};var gg=function(a){var b="unauthorized-domain",c=void 0,d=ff(a);a=d.ka;d=d.ma;"chrome-extension"==d?c=ma("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):"http"==d||"https"==d?c=ma("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):b=
"operation-not-supported-in-this-environment";N.call(this,b,c)};u(gg,N);var hg=function(a){this.tf=a.sub;la();this.Db=a.email||null;this.Df=a.provider_id||null;this.Me=!!a.is_anonymous||"anonymous"==this.Df};hg.prototype.getEmail=function(){return this.Db};hg.prototype.isAnonymous=function(){return this.Me};var ig=function(a,b){return a.then(function(a){if(a.idToken){a:{var c=a.idToken.split(".");if(3==c.length){for(var c=c[1],e=(4-c.length%4)%4,f=0;f<e;f++)c+=".";try{var g=JSON.parse(Gb(c));if(g.sub&&g.iss&&g.aud&&g.exp){var l=new hg(g);break a}}catch(n){}}l=null}if(!l||b!=l.tf)throw new N("user-mismatch");return a}throw new N("user-mismatch");}).f(function(a){throw a&&a.code&&"auth/user-not-found"==a.code?new N("user-mismatch"):a;})},jg=function(a,b){if(b.idToken||b.accessToken)b.idToken&&M(this,"idToken",
b.idToken),b.accessToken&&M(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)M(this,"accessToken",b.oauthToken),M(this,"secret",b.oauthTokenSecret);else throw new N("internal-error","failed to construct a credential");M(this,"providerId",a)};jg.prototype.Fb=function(a){return kg(a,lg(this))};jg.prototype.zc=function(a,b){var c=lg(this);c.idToken=b;return mg(a,c)};jg.prototype.pd=function(a,b){var c=lg(this);return ig(ng(a,c),b)};
var lg=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.providerId;return{postBody:lf(b).toString(),requestUri:"http://localhost"}};jg.prototype.G=function(){var a={providerId:this.providerId};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
var og=function(a,b){this.Gf=b||[];Vf(this,{providerId:a,isOAuthProvider:!0});this.Td={}};og.prototype.setCustomParameters=function(a){this.Td=jb(a);return this};var P=function(a){og.call(this,a,ag);this.Bd=[]};u(P,og);P.prototype.addScope=function(a){Ua(this.Bd,a)||this.Bd.push(a);return this};P.prototype.ae=function(){return Za(this.Bd)};
P.prototype.credential=function(a,b){if(!a&&!b)throw new N("argument-error","credential failed: must provide the ID token and/or the access token.");return new jg(this.providerId,{idToken:a||null,accessToken:b||null})};var pg=function(){P.call(this,"facebook.com")};u(pg,P);M(pg,"PROVIDER_ID","facebook.com");
var qg=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;r(a)&&(b=a.accessToken);return(new pg).credential(null,b)},rg=function(){P.call(this,"github.com")};u(rg,P);M(rg,"PROVIDER_ID","github.com");var sg=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;r(a)&&(b=a.accessToken);return(new rg).credential(null,b)},tg=function(){P.call(this,"google.com");this.addScope("profile")};
u(tg,P);M(tg,"PROVIDER_ID","google.com");var ug=function(a,b){var c=a;r(a)&&(c=a.idToken,b=a.accessToken);return(new tg).credential(c,b)},vg=function(){og.call(this,"twitter.com",$f)};u(vg,og);M(vg,"PROVIDER_ID","twitter.com");
var wg=function(a,b){var c=a;r(c)||(c={oauthToken:a,oauthTokenSecret:b});if(!c.oauthToken||!c.oauthTokenSecret)throw new N("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new jg("twitter.com",c)},xg=function(a,b){this.Db=a;this.td=b;M(this,"providerId","password")};xg.prototype.Fb=function(a){return Q(a,yg,{email:this.Db,password:this.td})};xg.prototype.zc=function(a,b){return Q(a,zg,{idToken:b,email:this.Db,password:this.td})};
xg.prototype.pd=function(a,b){return ig(this.Fb(a),b)};xg.prototype.G=function(){return{email:this.Db,password:this.td}};var Ag=function(){Vf(this,{providerId:"password",isOAuthProvider:!1})};Vf(Ag,{PROVIDER_ID:"password"});var Bg=function(a){if(!(a.verificationId&&a.Uc||a.dc&&a.phoneNumber))throw new N("internal-error");this.N=a;M(this,"providerId","phone")};Bg.prototype.Fb=function(a){return a.verifyPhoneNumber(Cg(this))};Bg.prototype.zc=function(a,b){var c=Cg(this);c.idToken=b;return Q(a,Dg,c)};
Bg.prototype.pd=function(a,b){var c=Cg(this);c.operation="REAUTH";a=Q(a,Eg,c);return ig(a,b)};Bg.prototype.G=function(){var a={providerId:"phone"};this.N.verificationId&&(a.verificationId=this.N.verificationId);this.N.Uc&&(a.verificationCode=this.N.Uc);this.N.dc&&(a.temporaryProof=this.N.dc);this.N.phoneNumber&&(a.phoneNumber=this.N.phoneNumber);return a};
var Cg=function(a){return a.N.dc&&a.N.phoneNumber?{temporaryProof:a.N.dc,phoneNumber:a.N.phoneNumber}:{sessionInfo:a.N.verificationId,code:a.N.Uc}},Fg=function(a){try{this.Oe=a||firebase.auth()}catch(b){throw new N("argument-error","Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");}Vf(this,{providerId:"phone",isOAuthProvider:!1})};
Fg.prototype.verifyPhoneNumber=function(a,b){var c=this.Oe.g;return E(b.verify()).then(function(d){if(!p(d))throw new N("argument-error","An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");switch(b.type){case "recaptcha":return Q(c,Gg,{phoneNumber:a,recaptchaToken:d});default:throw new N("argument-error",'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');}})};
var Hg=function(a,b){if(!a)throw new N("missing-verification-id");if(!b)throw new N("missing-verification-code");return new Bg({verificationId:a,Uc:b})};Vf(Fg,{PROVIDER_ID:"phone"});
var Ig=function(a){if(a.temporaryProof&&a.phoneNumber)return new Bg({dc:a.temporaryProof,phoneNumber:a.phoneNumber});var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return ug(a,c);case "facebook.com":return qg(c);case "github.com":return sg(c);case "twitter.com":return wg(c,d);default:return(new P(b)).credential(a,c)}}catch(e){return null}},Jg=function(a){if(!a.isOAuthProvider)throw new N("invalid-oauth-provider");
};var Kg=function(a,b,c){N.call(this,a,c);a=b||{};a.email&&M(this,"email",a.email);a.phoneNumber&&M(this,"phoneNumber",a.phoneNumber);a.credential&&M(this,"credential",a.credential)};u(Kg,N);Kg.prototype.G=function(){var a={code:this.code,message:this.message};this.email&&(a.email=this.email);this.phoneNumber&&(a.phoneNumber=this.phoneNumber);var b=this.credential&&this.credential.G();b&&lb(a,b);return a};Kg.prototype.toJSON=function(){return this.G()};
var Lg=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));var c={credential:Ig(a)};if(a.email)c.email=a.email;else if(a.phoneNumber)c.phoneNumber=a.phoneNumber;else return new N(b,a.message||void 0);return new Kg(b,c,a.message)}return null};var Mg=function(a){this.Zf=a};u(Mg,Jc);Mg.prototype.mc=function(){return new this.Zf};Mg.prototype.nd=function(){return{}};
var R=function(a,b,c){var d="Node"==Cf();d=k.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new N("internal-error","The XMLHttpRequest compatibility library was not found.");this.m=a;a=b||{};this.Mf=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Nf=a.secureTokenTimeout||Ng;this.te=jb(a.secureTokenHeaders||Og);this.Xe=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.Ye=a.firebaseTimeout||
Pg;this.Zd=jb(a.firebaseHeaders||Qg);c&&(this.Zd["X-Client-Version"]=c,this.te["X-Client-Version"]=c);this.Pe=new Oc;this.Yf=new Mg(d)},Rg,Ng=new Pf(3E4,6E4),Og={"Content-Type":"application/x-www-form-urlencoded"},Pg=new Pf(3E4,6E4),Qg={"Content-Type":"application/json"},Tg=function(a,b,c,d,e,f,g){Of()?(rf()?a=t(a.Pf,a):(Rg||(Rg=new D(function(a,b){Sg(a,b)})),a=t(a.Of,a)),a(b,c,d,e,f,g)):c&&c(null)};
R.prototype.Pf=function(a,b,c,d,e,f){var g="Node"==Cf(),l=Df()?g?new H(this.Yf):new H:new H(this.Pe);if(f){l.ub=Math.max(0,f);var n=setTimeout(function(){l.dispatchEvent("timeout")},f)}l.listen("complete",function(){n&&clearTimeout(n);var a=null;try{a=JSON.parse(Qe(this))||null}catch(pb){a=null}b&&b(a)});qc(l,"ready",function(){n&&clearTimeout(n);this.Ia||(this.Ia=!0,this.hb())});qc(l,"timeout",function(){n&&clearTimeout(n);this.Ia||(this.Ia=!0,this.hb());b&&b(null)});l.send(a,c,d,e)};
var Ug=Ga("https://apis.google.com/js/client.js?onload=%{onload}"),Vg="__fcb"+Math.floor(1E6*Math.random()).toString(),Sg=function(a,b){if(((window.gapi||{}).client||{}).request)a();else{k[Vg]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))};var c=La(Ug,{onload:Vg});Ud(be(c),function(){b(Error("CORS_UNSUPPORTED"))})}};
R.prototype.Of=function(a,b,c,d,e){var f=this;Rg.then(function(){window.gapi.client.setApiKey(f.m);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).f(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
var Xg=function(a,b){return new D(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?Tg(a,a.Mf+"?key="+encodeURIComponent(a.m),function(a){a?a.error?d(Wg(a)):a.access_token&&a.refresh_token?c(a):d(new N("internal-error")):d(new N("network-request-failed"))},"POST",lf(b).toString(),a.te,a.Nf.get()):d(new N("internal-error"))})},Yg=function(a,b,c,d,e,f){var g=ff(a.Xe+b);J(g,"key",a.m);f&&J(g,"cb",la().toString());var l="GET"==c;if(l)for(var n in d)d.hasOwnProperty(n)&&
J(g,n,d[n]);return new D(function(b,f){Tg(a,g.toString(),function(a){a?a.error?f(Wg(a,e||{})):b(a):f(new N("network-request-failed"))},c,l?void 0:Fc(Kf(d)),a.Zd,a.Ye.get())})},Zg=function(a){if(!wc.test(a.email))throw new N("invalid-email");},$g=function(a){"email"in a&&Zg(a)},bh=function(a,b){return Q(a,ah,{identifier:b,continueUri:Ff()?nf():"http://localhost"}).then(function(a){return a.allProviders||[]})},dh=function(a){return Q(a,ch,{}).then(function(a){return a.authorizedDomains||[]})},eh=function(a){if(!a.idToken)throw new N("internal-error");
},fh=function(a){if(a.phoneNumber||a.temporaryProof){if(!a.phoneNumber||!a.temporaryProof)throw new N("internal-error");}else{if(!a.sessionInfo)throw new N("missing-verification-id");if(!a.code)throw new N("missing-verification-code");}};R.prototype.signInAnonymously=function(){return Q(this,gh,{})};R.prototype.updateEmail=function(a,b){return Q(this,hh,{idToken:a,email:b})};R.prototype.updatePassword=function(a,b){return Q(this,zg,{idToken:a,password:b})};var ih={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};
R.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];db(ih,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return Q(this,hh,c)};R.prototype.sendPasswordResetEmail=function(a){return Q(this,jh,{requestType:"PASSWORD_RESET",email:a})};R.prototype.sendEmailVerification=function(a){return Q(this,kh,{requestType:"VERIFY_EMAIL",idToken:a})};R.prototype.verifyPhoneNumber=function(a){return Q(this,lh,a)};
var nh=function(a,b,c){return Q(a,mh,{idToken:b,deleteProvider:c})},oh=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new N("internal-error");},ph=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=Lg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=Lg(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=Lg(a));if(b)throw b;if(!a.idToken)throw new N("internal-error");},kg=function(a,
b){b.returnIdpCredential=!0;return Q(a,qh,b)},mg=function(a,b){b.returnIdpCredential=!0;return Q(a,rh,b)},ng=function(a,b){b.returnIdpCredential=!0;b.autoCreate=!1;return Q(a,sh,b)},th=function(a){if(!a.oobCode)throw new N("invalid-action-code");};R.prototype.confirmPasswordReset=function(a,b){return Q(this,uh,{oobCode:a,newPassword:b})};R.prototype.checkActionCode=function(a){return Q(this,vh,{oobCode:a})};R.prototype.applyActionCode=function(a){return Q(this,wh,{oobCode:a})};
var wh={endpoint:"setAccountInfo",D:th,Za:"email"},vh={endpoint:"resetPassword",D:th,W:function(a){if(!a.email||!a.requestType)throw new N("internal-error");}},xh={endpoint:"signupNewUser",D:function(a){Zg(a);if(!a.password)throw new N("weak-password");},W:eh,wa:!0},ah={endpoint:"createAuthUri"},yh={endpoint:"deleteAccount",Xa:["idToken"]},mh={endpoint:"setAccountInfo",Xa:["idToken","deleteProvider"],D:function(a){if(!ga(a.deleteProvider))throw new N("internal-error");}},zh={endpoint:"getAccountInfo"},
kh={endpoint:"getOobConfirmationCode",Xa:["idToken","requestType"],D:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new N("internal-error");},Za:"email"},jh={endpoint:"getOobConfirmationCode",Xa:["requestType"],D:function(a){if("PASSWORD_RESET"!=a.requestType)throw new N("internal-error");Zg(a)},Za:"email"},ch={Md:!0,endpoint:"getProjectConfig",ee:"GET"},Ah={Md:!0,endpoint:"getRecaptchaParam",ee:"GET",W:function(a){if(!a.recaptchaSiteKey)throw new N("internal-error");}},uh={endpoint:"resetPassword",
D:th,Za:"email"},Gg={endpoint:"sendVerificationCode",Xa:["phoneNumber","recaptchaToken"],Za:"sessionInfo"},hh={endpoint:"setAccountInfo",Xa:["idToken"],D:$g,wa:!0},zg={endpoint:"setAccountInfo",Xa:["idToken"],D:function(a){$g(a);if(!a.password)throw new N("weak-password");},W:eh,wa:!0},gh={endpoint:"signupNewUser",W:eh,wa:!0},qh={endpoint:"verifyAssertion",D:oh,W:ph,wa:!0},sh={endpoint:"verifyAssertion",D:oh,W:function(a){if(a.errorMessage&&"USER_NOT_FOUND"==a.errorMessage)throw new N("user-not-found");
if(!a.idToken)throw new N("internal-error");},wa:!0},rh={endpoint:"verifyAssertion",D:function(a){oh(a);if(!a.idToken)throw new N("internal-error");},W:ph,wa:!0},Bh={endpoint:"verifyCustomToken",D:function(a){if(!a.token)throw new N("invalid-custom-token");},W:eh,wa:!0},yg={endpoint:"verifyPassword",D:function(a){Zg(a);if(!a.password)throw new N("wrong-password");},W:eh,wa:!0},lh={endpoint:"verifyPhoneNumber",D:fh,W:eh},Dg={endpoint:"verifyPhoneNumber",D:function(a){if(!a.idToken)throw new N("internal-error");
fh(a)},W:function(a){if(a.temporaryProof)throw a.code="credential-already-in-use",Lg(a);eh(a)}},Eg={Se:{USER_NOT_FOUND:"user-not-found"},endpoint:"verifyPhoneNumber",D:fh,W:eh},Q=function(a,b,c){if(!Yf(c,b.Xa))return F(new N("internal-error"));var d=b.ee||"POST",e;return E(c).then(b.D).then(function(){b.wa&&(c.returnSecureToken=!0);return Yg(a,b.endpoint,d,c,b.Se,b.Md||!1)}).then(function(a){return e=a}).then(b.W).then(function(){if(!b.Za)return e;if(!(b.Za in e))throw new N("internal-error");return e[b.Za]})},
Wg=function(a,b){var c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?new N(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",
MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",
INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",INVALID_APP_ID:"invalid-app-id",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled",CAPTCHA_CHECK_FAILED:"captcha-check-failed",INVALID_APP_CREDENTIAL:"invalid-app-credential",INVALID_CODE:"invalid-verification-code",
INVALID_PHONE_NUMBER:"invalid-phone-number",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_APP_CREDENTIAL:"missing-app-credential",MISSING_CODE:"missing-verification-code",MISSING_PHONE_NUMBER:"missing-phone-number",MISSING_SESSION_INFO:"missing-verification-id",QUOTA_EXCEEDED:"quota-exceeded",SESSION_EXPIRED:"code-expired"};lb(d,b||{});b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new N(d[e],
b);!b&&a&&(b=Jf(a));return new N("internal-error",b)};var Ch=function(a){this.C=a};Ch.prototype.value=function(){return this.C};Ch.prototype.ve=function(a){this.C.style=a;return this};Ch.prototype.getStyle=function(){return this.C.style};var Dh=function(a){this.C=a||{}};h=Dh.prototype;h.value=function(){return this.C};h.getUrl=function(){return this.C.url};h.ve=function(a){this.C.style=a;return this};h.getStyle=function(){return this.C.style};h.getId=function(){return this.C.id};h.getContext=function(){return this.C.context};var Fh=function(a){this.Wf=a;this.tc=null;this.rd=Eh(this)},Gh=function(a){var b=new Dh;b.C.where=document.body;b.C.url=a.Wf;b.C.messageHandlersFilter=L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.C.attributes=b.C.attributes||{};(new Ch(b.C.attributes)).ve({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.C.dontclear=!0;return b},Eh=function(a){return Hh().then(function(){return new D(function(b,c){L("gapi.iframes.getContext")().open(Gh(a).value(),function(d){a.tc=d;a.tc.restyle({setHideOnLeave:!1});
var e=setTimeout(function(){c(Error("Network Error"))},Ih.get()),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})};Fh.prototype.sendMessage=function(a){var b=this;return this.rd.then(function(){return new D(function(c){b.tc.send(a.type,a,c,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})};
var Jh=function(a,b){a.rd.then(function(){a.tc.register("authEvent",b,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},Kh=Ga("https://apis.google.com/js/api.js?onload=%{onload}"),Lh=new Pf(3E4,6E4),Ih=new Pf(5E3,15E3),Mh=null,Hh=function(){return Mh?Mh:Mh=(new D(function(a,b){if(Of()){var c=function(){Nf();L("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){Nf();b(Error("Network Error"))},timeout:Lh.get()})};if(L("gapi.iframes.Iframe"))a();else if(L("gapi.load"))c();else{var d="__iframefcb"+
Math.floor(1E6*Math.random()).toString();k[d]=function(){L("gapi.load")?c():b(Error("Network Error"))};d=La(Kh,{onload:d});E(be(d)).f(function(){b(Error("Network Error"))})}}else b(Error("Network Error"))})).f(function(a){Mh=null;throw a;})};var Nh=function(a,b,c){this.B=a;this.m=b;this.w=c;this.ab=null;this.gc=gf(this.B,"/__/auth/iframe");J(this.gc,"apiKey",this.m);J(this.gc,"appName",this.w)};Nh.prototype.Fd=function(a){this.ab=a;return this};Nh.prototype.toString=function(){this.ab?J(this.gc,"v",this.ab):this.gc.removeParameter("v");return this.gc.toString()};var Oh=function(a,b,c,d,e){this.B=a;this.m=b;this.w=c;this.Ne=d;this.ab=this.S=this.zd=null;this.Vb=e};Oh.prototype.Fd=function(a){this.ab=a;return this};
Oh.prototype.toString=function(){var a=gf(this.B,"/__/auth/handler");J(a,"apiKey",this.m);J(a,"appName",this.w);J(a,"authType",this.Ne);if(this.Vb.isOAuthProvider){J(a,"providerId",this.Vb.providerId);var b=this.Vb,c=Kf(b.Td),d;for(d in c)c[d]=c[d].toString();b=b.Gf;c=jb(c);for(d=0;d<b.length;d++){var e=b[d];e in c&&delete c[e]}hb(c)||J(a,"customParameters",Jf(c))}"function"===typeof this.Vb.ae&&(b=this.Vb.ae(),b.length&&J(a,"scopes",b.join(",")));this.zd?J(a,"redirectUrl",this.zd):a.removeParameter("redirectUrl");
this.S?J(a,"eventId",this.S):a.removeParameter("eventId");this.ab?J(a,"v",this.ab):a.removeParameter("v");if(this.ic)for(var f in this.ic)this.ic.hasOwnProperty(f)&&!ef(a,f)&&J(a,f,this.ic[f]);return a.toString()};
var Ph=function(a,b,c,d){this.B=a;this.m=b;this.w=c;this.$e=(this.Ga=d||null)?Ef(this.Ga):null;d=this.Ga;this.jf=(new Nh(a,b,c)).Fd(d).toString();this.pa=[];this.g=new R(b,null,this.$e);this.vc=this.sa=null},Qh=function(a){var b=nf();return dh(a).then(function(a){a:{for(var c=ff(b),e=c.ma,c=c.ka,f=0;f<a.length;f++){var g=a[f];var l=c;var n=e;0==g.indexOf("chrome-extension://")?l=ff(g).ka==l&&"chrome-extension"==n:"http"!=n&&"https"!=n?l=!1:wf.test(g)?l=l==g:(g=g.split(".").join("\\."),l=(new RegExp("^(.+\\."+
g+"|"+g+")$","i")).test(l));if(l){a=!0;break a}}a=!1}if(!a)throw new gg(nf());})};h=Ph.prototype;h.Lb=function(){if(this.vc)return this.vc;var a=this;return this.vc=xf().then(function(){a.sc=new Fh(a.jf);Rh(a)})};h.ac=function(a,b,c){var d=new N("popup-closed-by-user"),e=new N("web-storage-unsupported"),f=this,g=!1;return this.Na().then(function(){Sh(f).then(function(c){c||(a&&tf(a),b(e),g=!0)})}).f(function(){}).then(function(){if(!g)return vf(a)}).then(function(){if(!g)return Ae(c).then(function(){b(d)})})};
h.we=function(){var a=K();return!If(a)&&!Mf(a)};h.de=function(){return!1};h.Tb=function(a,b,c,d,e,f,g){if(!a)return F(new N("popup-blocked"));if(g&&!If())return this.Na().f(function(b){tf(a);e(b)}),d(),E();this.sa||(this.sa=Qh(this.g));var l=this;return this.sa.then(function(){var b=l.Na().f(function(b){tf(a);e(b);throw b;});d();return b}).then(function(){Jg(c);if(!g){var d=Th(l.B,l.m,l.w,b,c,null,f,l.Ga);of(d,a)}}).f(function(a){"auth/network-request-failed"==a.code&&(l.sa=null);throw a;})};
h.Ub=function(a,b,c){this.sa||(this.sa=Qh(this.g));var d=this;return this.sa.then(function(){Jg(b);var e=Th(d.B,d.m,d.w,a,b,nf(),c,d.Ga);of(e)}).f(function(a){"auth/network-request-failed"==a.code&&(d.sa=null);throw a;})};h.Na=function(){var a=this;return this.Lb().then(function(){return a.sc.rd}).f(function(){a.sa=null;throw new N("network-request-failed");})};h.ze=function(){return!0};
var Th=function(a,b,c,d,e,f,g,l,n){a=new Oh(a,b,c,d,e);a.zd=f;a.S=g;f=a.Fd(l);f.ic=jb(n||null);return f.toString()},Rh=function(a){if(!a.sc)throw Error("IfcHandler must be initialized!");Jh(a.sc,function(b){var c={};if(b&&b.authEvent){var d=!1;b=fg(b.authEvent);for(c=0;c<a.pa.length;c++)d=a.pa[c](b)||d;c={};c.status=d?"ACK":"ERROR";return E(c)}c.status="ERROR";return E(c)})},Sh=function(a){var b={type:"webStorageSupport"};return a.Lb().then(function(){return a.sc.sendMessage(b)}).then(function(a){if(a&&
a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})};Ph.prototype.eb=function(a){this.pa.push(a)};Ph.prototype.Zb=function(a){Xa(this.pa,function(b){return b==a})};var Uh=function(a,b,c){M(this,"type","recaptcha");this.Vc=this.zb=null;this.Bb=!1;this.Rd=a;this.za=b||{theme:"light",type:"image"};this.J=[];if(this.za.sitekey)throw new N("argument-error","sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");this.wc="invisible"===this.za.size;if(!kd(a)||!this.wc&&kd(a).hasChildNodes())throw new N("argument-error","reCAPTCHA container is either not found or already contains inner elements!");try{this.h=c||firebase.app()}catch(g){throw new N("argument-error",
"No firebase.app.App instance is currently initialized.");}if(this.h.options&&this.h.options.apiKey)a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null,this.g=new R(this.h.options&&this.h.options.apiKey,null,a);else throw new N("invalid-api-key");var d=this;this.Qc=[];var e=this.za.callback;this.za.callback=function(a){d.Cb(a);if("function"===typeof e)e(a);else if("string"===typeof e){var b=L(e,k);"function"===typeof b&&b(a)}};var f=this.za["expired-callback"];this.za["expired-callback"]=function(){d.Cb(null);
if("function"===typeof f)f();else if("string"===typeof f){var a=L(f,k);"function"===typeof a&&a()}}};Uh.prototype.Cb=function(a){for(var b=0;b<this.Qc.length;b++)try{this.Qc[b](a)}catch(c){}};var Vh=function(a,b){Xa(a.Qc,function(a){return a==b})};Uh.prototype.c=function(a){var b=this;this.J.push(a);Cd(a,function(){Wa(b.J,a)});return a};
Uh.prototype.Mb=function(){var a=this;return this.zb?this.zb:this.zb=this.c(E().then(function(){if(Ff())return xf();throw new N("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");}).then(function(){return Xh()}).then(function(){return Q(a.g,Ah,{})}).then(function(b){a.za.sitekey=b.recaptchaSiteKey}).f(function(b){a.zb=null;throw b;}))};
Uh.prototype.render=function(){Yh(this);var a=this;return this.c(this.Mb().then(function(){if(null===a.Vc){var b=a.Rd;if(!a.wc){var c=kd(b),b=od("DIV");c.appendChild(b)}a.Vc=grecaptcha.render(b,a.za)}return a.Vc}))};Uh.prototype.verify=function(){Yh(this);var a=this;return this.c(this.render().then(function(b){return new D(function(c){var d=grecaptcha.getResponse(b);if(d)c(d);else{var e=function(b){b&&(Vh(a,e),c(b))};a.Qc.push(e);a.wc&&grecaptcha.execute(a.Vc)}})}))};
var Yh=function(a){if(a.Bb)throw new N("internal-error","RecaptchaVerifier instance has been destroyed.");};Uh.prototype.clear=function(){Yh(this);this.Bb=!0;for(var a=0;a<this.J.length;a++)this.J[a].cancel("RecaptchaVerifier instance has been destroyed.");if(!this.wc)for(var a=kd(this.Rd),b;b=a.firstChild;)a.removeChild(b)};
var Zh=Ga("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit"),Xh=function(){return new D(function(a,b){if(Of())if(k.grecaptcha)a();else{var c="__rcb"+Math.floor(1E6*Math.random()).toString();k[c]=function(){k.grecaptcha?a():b(new N("internal-error"));delete k[c]};var d=La(Zh,{onload:c});E(be(d)).f(function(){b(new N("internal-error","Unable to load external reCAPTCHA dependencies!"))})}else b(new N("network-request-failed"))})};var $h=function(a){this.F=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.F)throw new N("internal-error","The React Native compatibility library was not found.");};h=$h.prototype;h.get=function(a){return E(this.F.getItem(a)).then(function(a){return a&&Lf(a)})};h.set=function(a,b){return E(this.F.setItem(a,Jf(b)))};h.remove=function(a){return E(this.F.removeItem(a))};h.fb=function(){};h.Wa=function(){};var ai=function(){this.F={}};h=ai.prototype;h.get=function(a){return E(this.F[a])};h.set=function(a,b){this.F[a]=b;return E()};h.remove=function(a){delete this.F[a];return E()};h.fb=function(){};h.Wa=function(){};var ci=function(){if(!bi()){if("Node"==Cf())throw new N("internal-error","The LocalStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.F=k.localStorage||firebase.INTERNAL.node.localStorage},bi=function(){var a="Node"==Cf(),a=k.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=ci.prototype;
h.get=function(a){var b=this;return E().then(function(){var c=b.F.getItem(a);return Lf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=Jf(b);null===d?c.remove(a):c.F.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.F.removeItem(a)})};h.fb=function(a){k.window&&jc(k.window,"storage",a)};h.Wa=function(a){k.window&&rc(k.window,"storage",a)};var di=function(){this.F={}};h=di.prototype;h.get=function(){return E(null)};h.set=function(){return E()};h.remove=function(){return E()};h.fb=function(){};h.Wa=function(){};var fi=function(){if(!ei()){if("Node"==Cf())throw new N("internal-error","The SessionStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.F=k.sessionStorage||firebase.INTERNAL.node.sessionStorage},ei=function(){var a="Node"==Cf(),a=k.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=fi.prototype;
h.get=function(a){var b=this;return E().then(function(){var c=b.F.getItem(a);return Lf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=Jf(b);null===d?c.remove(a):c.F.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.F.removeItem(a)})};h.fb=function(){};h.Wa=function(){};var gi=function(a,b,c,d,e,f){if(!window.indexedDB)throw new N("web-storage-unsupported");this.Te=a;this.qd=b;this.cd=c;this.De=d;this.bb=e;this.aa={};this.bc=[];this.Pb=0;this.kf=f||k.indexedDB},hi,ii=function(a){return new D(function(b,c){var d=a.kf.open(a.Te,a.bb);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.qd,{keyPath:a.cd})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},ji=function(a){a.he||(a.he=
ii(a));return a.he},ki=function(a,b){return b.objectStore(a.qd)},li=function(a,b,c){return b.transaction([a.qd],c?"readwrite":"readonly")},mi=function(a){return new D(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=gi.prototype;
h.set=function(a,b){var c=!1,d,e=this;return Cd(ji(this).then(function(b){d=b;b=ki(e,li(e,d,!0));return mi(b.get(a))}).then(function(f){var g=ki(e,li(e,d,!0));if(f)return f.value=b,mi(g.put(f));e.Pb++;c=!0;f={};f[e.cd]=a;f[e.De]=b;return mi(g.add(f))}).then(function(){e.aa[a]=b}),function(){c&&e.Pb--})};h.get=function(a){var b=this;return ji(this).then(function(c){return mi(ki(b,li(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
h.remove=function(a){var b=!1,c=this;return Cd(ji(this).then(function(d){b=!0;c.Pb++;return mi(ki(c,li(c,d,!0))["delete"](a))}).then(function(){delete c.aa[a]}),function(){b&&c.Pb--})};
h.Sf=function(){var a=this;return ji(this).then(function(b){var c=ki(a,li(a,b,!1));return c.getAll?mi(c.getAll()):new D(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.Pb){for(d=0;d<b.length;d++)c[b[d][a.cd]]=b[d][a.De];d=pf(a.aa,c);a.aa=c}return d})};h.fb=function(a){0==this.bc.length&&this.Hd();this.bc.push(a)};
h.Wa=function(a){Xa(this.bc,function(b){return b==a});0==this.bc.length&&this.Lc()};h.Hd=function(){var a=this;this.Lc();var b=function(){a.ud=Ae(800).then(t(a.Sf,a)).then(function(b){0<b.length&&y(a.bc,function(a){a(b)})}).then(b).f(function(a){"STOP_EVENT"!=a.message&&b()});return a.ud};b()};h.Lc=function(){this.ud&&this.ud.cancel("STOP_EVENT")};var qi=function(){this.Vd={Browser:ni,Node:oi,ReactNative:pi}[Cf()]},ri,ni={V:ci,Jd:fi},oi={V:ci,Jd:fi},pi={V:$h,Jd:di};var si=function(a,b){this.Re=b;M(this,"verificationId",a)};si.prototype.confirm=function(a){a=Hg(this.verificationId,a);return this.Re(a)};var ti=function(a,b,c,d){return(new Fg(a)).verifyPhoneNumber(b,c).then(function(a){return new si(a,d)})};var ui=function(a){var b={},c=a.email,d=a.newEmail;a=a.requestType;if(!c||!a)throw Error("Invalid provider user info!");b.fromEmail=d||null;b.email=c;M(this,"operation",a);M(this,"data",Zf(b))};var vi=function(a,b,c,d,e,f){this.Af=a;this.If=b;this.cf=c;this.Ac=d;this.Kd=e;this.Jf=!!f;this.nb=null;this.Oa=this.Ac;if(this.Kd<this.Ac)throw Error("Proactive refresh lower bound greater than upper bound!");};vi.prototype.start=function(){this.Oa=this.Ac;wi(this,!0)};
var xi=function(a,b){if(b)return a.Oa=a.Ac,a.cf();b=a.Oa;a.Oa*=2;a.Oa>a.Kd&&(a.Oa=a.Kd);return b},wi=function(a,b){a.stop();a.nb=Ae(xi(a,b)).then(function(){return a.Jf?E():Rf()}).then(function(){return a.Af()}).then(function(){wi(a,!0)}).f(function(b){a.If(b)&&wi(a,!1)})};vi.prototype.stop=function(){this.nb&&(this.nb.cancel(),this.nb=null)};var Di=function(a){var b={};b["facebook.com"]=yi;b["google.com"]=zi;b["github.com"]=Ai;b["twitter.com"]=Bi;var c=a&&a.providerId;return c?b[c]?new b[c](a):new Ci(a):null},Ci=function(a){var b=Lf(a.rawUserInfo||"{}");a=a.providerId;if(!a)throw Error("Invalid additional user info!");M(this,"profile",Zf(b||{}));M(this,"providerId",a)},yi=function(a){Ci.call(this,a);if("facebook.com"!=this.providerId)throw Error("Invalid provider id!");};u(yi,Ci);
var Ai=function(a){Ci.call(this,a);if("github.com"!=this.providerId)throw Error("Invalid provider id!");M(this,"username",this.profile&&this.profile.login||null)};u(Ai,Ci);var zi=function(a){Ci.call(this,a);if("google.com"!=this.providerId)throw Error("Invalid provider id!");};u(zi,Ci);var Bi=function(a){Ci.call(this,a);if("twitter.com"!=this.providerId)throw Error("Invalid provider id!");M(this,"username",a.screenName||null)};u(Bi,Ci);var Ei=function(a,b,c,d){this.le=a;this.Cd=b;this.Kf=c;this.$b=d;this.T={};ri||(ri=new qi);a=ri;try{if(mf()){hi||(hi=new gi("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1));var e=hi}else e=new a.Vd.V;this.Sa=e}catch(f){this.Sa=new ai,this.$b=!0}try{this.Oc=new a.Vd.Jd}catch(f){this.Oc=new ai}this.Id=t(this.xe,this);this.aa={}},Fi,Gi=function(){Fi||(Fi=new Ei("firebase",":",!Mf(K())&&Bf()?!0:!1,If()));return Fi};h=Ei.prototype;
h.Z=function(a,b){return this.le+this.Cd+a.name+(b?this.Cd+b:"")};h.get=function(a,b){return(a.V?this.Sa:this.Oc).get(this.Z(a,b))};h.remove=function(a,b){b=this.Z(a,b);a.V&&!this.$b&&(this.aa[b]=null);return(a.V?this.Sa:this.Oc).remove(b)};h.set=function(a,b,c){var d=this.Z(a,c),e=this,f=a.V?this.Sa:this.Oc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.V&&!this.$b&&(e.aa[d]=b)})};
h.addListener=function(a,b,c){a=this.Z(a,b);this.$b||(this.aa[a]=k.localStorage.getItem(a));hb(this.T)&&this.Hd();this.T[a]||(this.T[a]=[]);this.T[a].push(c)};h.removeListener=function(a,b,c){a=this.Z(a,b);this.T[a]&&(Xa(this.T[a],function(a){return a==c}),0==this.T[a].length&&delete this.T[a]);hb(this.T)&&this.Lc()};h.Hd=function(){this.Sa.fb(this.Id);this.$b||mf()||Hi(this)};
var Hi=function(a){Ii(a);a.od=setInterval(function(){for(var b in a.T){var c=k.localStorage.getItem(b),d=a.aa[b];c!=d&&(a.aa[b]=c,c=new Yb({type:"storage",key:b,target:window,oldValue:d,newValue:c,pe:!0}),a.xe(c))}},1E3)},Ii=function(a){a.od&&(clearInterval(a.od),a.od=null)};Ei.prototype.Lc=function(){this.Sa.Wa(this.Id);Ii(this)};
Ei.prototype.xe=function(a){if(a&&a.af){var b=a.la.key;if(0==b.indexOf(this.le+this.Cd)&&this.T[b]){"undefined"!==typeof a.la.pe?this.Sa.Wa(this.Id):Ii(this);if(this.Kf){var c=k.localStorage.getItem(b),d=a.la.newValue;if(d!==c)null!==d?k.localStorage.setItem(b,d):k.localStorage.removeItem(b);else if(this.aa[b]===d&&"undefined"===typeof a.la.pe)return}this.aa[b]=k.localStorage.getItem(b);this.Od(b)}}else y(a,t(this.Od,this))};Ei.prototype.Od=function(a){this.T[a]&&y(this.T[a],function(a){a()})};var Ji=function(a,b){this.v=a;this.l=b||Gi()},Ki={name:"authEvent",V:!0},Li=function(a){return a.l.get(Ki,a.v).then(function(a){return fg(a)})};Ji.prototype.eb=function(a){this.l.addListener(Ki,this.v,a)};Ji.prototype.Zb=function(a){this.l.removeListener(Ki,this.v,a)};var Mi=function(a){this.l=a||Gi()},Ni={name:"sessionId",V:!1};Mi.prototype.oc=function(a){return this.l.get(Ni,a)};var Oi=function(a,b,c,d,e,f){this.B=a;this.m=b;this.w=c;this.Ga=d||null;this.ye=b+":"+c;this.Lf=new Mi;this.$d=new Ji(this.ye);this.md=null;this.pa=[];this.pf=e||500;this.Ef=f||2E3;this.Kb=this.Dc=null},Pi=function(a){return new N("invalid-cordova-configuration",a)};
Oi.prototype.Na=function(){return this.Mb?this.Mb:this.Mb=zf().then(function(){if("function"!==typeof L("universalLinks.subscribe",k))throw Pi("cordova-universal-links-plugin is not installed");if("undefined"===typeof L("BuildInfo.packageName",k))throw Pi("cordova-plugin-buildinfo is not installed");if("function"!==typeof L("cordova.plugins.browsertab.openUrl",k))throw Pi("cordova-plugin-browsertab is not installed");if("function"!==typeof L("cordova.InAppBrowser.open",k))throw Pi("cordova-plugin-inappbrowser is not installed");
},function(){throw new N("cordova-not-ready");})};var Qi=function(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")},Ri=function(a){var b=new Rb;b.update(a);return $a(b.digest())};h=Oi.prototype;h.ac=function(a,b){b(new N("operation-not-supported-in-this-environment"));return E()};h.Tb=function(){return F(new N("operation-not-supported-in-this-environment"))};h.ze=function(){return!1};h.we=function(){return!0};
h.de=function(){return!0};
h.Ub=function(a,b,c){if(this.Dc)return F(new N("redirect-operation-pending"));var d=this,e=k.document,f=null,g=null,l=null,n=null;return this.Dc=Cd(E().then(function(){Jg(b);return Si(d)}).then(function(){return Ti(d,a,b,c)}).then(function(){return(new D(function(a,b){g=function(){var b=L("cordova.plugins.browsertab.close",k);a();"function"===typeof b&&b();d.Kb&&"function"===typeof d.Kb.close&&(d.Kb.close(),d.Kb=null);return!1};d.eb(g);l=function(){f||(f=Ae(d.Ef).then(function(){b(new N("redirect-cancelled-by-user"))}))};n=
function(){Qf()&&l()};e.addEventListener("resume",l,!1);K().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",n,!1)})).f(function(a){return Ui(d).then(function(){throw a;})})}),function(){l&&e.removeEventListener("resume",l,!1);n&&e.removeEventListener("visibilitychange",n,!1);f&&f.cancel();g&&d.Zb(g);d.Dc=null})};
var Ti=function(a,b,c,d){var e=Qi(),f=new O(b,d,null,e,new N("no-auth-event")),g=L("BuildInfo.packageName",k);if("string"!==typeof g)throw new N("invalid-cordova-configuration");var l=L("BuildInfo.displayName",k),n={};if(K().toLowerCase().match(/iphone|ipad|ipod/))n.ibi=g;else if(K().toLowerCase().match(/android/))n.apn=g;else return F(new N("operation-not-supported-in-this-environment"));l&&(n.appDisplayName=l);e=Ri(e);n.sessionId=e;var C=Th(a.B,a.m,a.w,b,c,null,d,a.Ga,n);return a.Na().then(function(){var b=
a.ye;return a.Lf.l.set(Ki,f.G(),b)}).then(function(){var b=L("cordova.plugins.browsertab.isAvailable",k);if("function"!==typeof b)throw new N("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=L("cordova.plugins.browsertab.openUrl",k);if("function"!==typeof c)throw new N("invalid-cordova-configuration");c(C)}else{c=L("cordova.InAppBrowser.open",k);if("function"!==typeof c)throw new N("invalid-cordova-configuration");b=c;var d=K();d=!(!d.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!d.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
a.Kb=b(C,d?"_blank":"_system","location=yes")}})})};Oi.prototype.Cb=function(a){for(var b=0;b<this.pa.length;b++)try{this.pa[b](a)}catch(c){}};
var Si=function(a){a.md||(a.md=a.Na().then(function(){return new D(function(b){var c=function(d){b(d);a.Zb(c);return!1};a.eb(c);Vi(a)})}));return a.md},Ui=function(a){var b=null;return Li(a.$d).then(function(c){b=c;c=a.$d;return c.l.remove(Ki,c.v)}).then(function(){return b})},Vi=function(a){var b=L("universalLinks.subscribe",k);if("function"!==typeof b)throw new N("invalid-cordova-configuration");var c=new O("unknown",null,null,null,new N("no-auth-event")),d=!1,e=Ae(a.pf).then(function(){return Ui(a).then(function(){d||
a.Cb(c)})}),f=function(b){d=!0;e&&e.cancel();Ui(a).then(function(d){var e=c;if(d&&b&&b.url){var e=null;var f=b.url;var g=ff(f),l=ef(g,"link"),n=ef(ff(l),"link"),g=ef(g,"deep_link_id");f=ef(ff(g),"link")||g||n||l||f;-1!=f.indexOf("/__/auth/callback")&&(e=ff(f),e=Lf(ef(e,"firebaseError")||null),e=(e="object"===typeof e?eg(e):null)?new O(d.ia,d.S,null,null,e):new O(d.ia,d.S,f,d.oc()));e=e||c}a.Cb(e)})},g=k.handleOpenURL;k.handleOpenURL=function(a){0==a.toLowerCase().indexOf(L("BuildInfo.packageName",
k).toLowerCase()+"://")&&f({url:a});if("function"===typeof g)try{g(a)}catch(n){console.error(n)}};b(null,f)};Oi.prototype.eb=function(a){this.pa.push(a);Si(this).f(function(b){"auth/invalid-cordova-configuration"===b.code&&(b=new O("unknown",null,null,null,new N("no-auth-event")),a(b))})};Oi.prototype.Zb=function(a){Xa(this.pa,function(b){return b==a})};var Wi=function(a){this.v=a;this.l=Gi()},Xi={name:"pendingRedirect",V:!1},Yi=function(a){return a.l.set(Xi,"pending",a.v)},Zi=function(a){return a.l.remove(Xi,a.v)},$i=function(a){return a.l.get(Xi,a.v).then(function(a){return"pending"==a})};var dj=function(a,b,c){this.B=a;this.m=b;this.w=c;this.cc=[];this.lb=!1;this.Zc=t(this.jd,this);this.Ua=new aj(this);this.vd=new bj(this);this.Qb=new Wi(this.m+":"+this.w);this.Ca={};this.Ca.unknown=this.Ua;this.Ca.signInViaRedirect=this.Ua;this.Ca.linkViaRedirect=this.Ua;this.Ca.reauthViaRedirect=this.Ua;this.Ca.signInViaPopup=this.vd;this.Ca.linkViaPopup=this.vd;this.Ca.reauthViaPopup=this.vd;this.U=cj(this.B,this.m,this.w)},cj=function(a,b,c){var d=firebase.SDK_VERSION||null;return yf()?new Oi(a,
b,c,d):new Ph(a,b,c,d)};dj.prototype.reset=function(){this.lb=!1;this.U.Zb(this.Zc);this.U=cj(this.B,this.m,this.w)};dj.prototype.Lb=function(){var a=this;this.lb||(this.lb=!0,this.U.eb(this.Zc));var b=this.U;return this.U.Na().f(function(c){a.U==b&&a.reset();throw c;})};var gj=function(a){a.U.we()&&a.Lb().f(function(b){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ej(b)&&a.jd(c)});a.U.de()||fj(a.Ua)};
dj.prototype.subscribe=function(a){Ua(this.cc,a)||this.cc.push(a);if(!this.lb){var b=this;$i(this.Qb).then(function(a){a?Zi(b.Qb).then(function(){b.Lb().f(function(a){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ej(a)&&b.jd(c)})}):gj(b)}).f(function(){gj(b)})}};dj.prototype.unsubscribe=function(a){Xa(this.cc,function(b){return b==a})};
dj.prototype.jd=function(a){if(!a)throw new N("invalid-auth-event");for(var b=!1,c=0;c<this.cc.length;c++){var d=this.cc[c];if(d.Pd(a.ia,a.S)){(b=this.Ca[a.ia])&&b.qe(a,d);b=!0;break}}fj(this.Ua);return b};var hj=new Pf(2E3,1E4),ij=new Pf(3E4,6E4);dj.prototype.getRedirectResult=function(){return this.Ua.getRedirectResult()};dj.prototype.Tb=function(a,b,c,d,e){var f=this;return this.U.Tb(a,b,c,function(){f.lb||(f.lb=!0,f.U.eb(f.Zc))},function(){f.reset()},d,e)};
var ej=function(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1};dj.prototype.Ub=function(a,b,c){var d=this,e;return Yi(this.Qb).then(function(){return d.U.Ub(a,b,c).f(function(a){if(ej(a))throw new N("operation-not-supported-in-this-environment");e=a;return Zi(d.Qb).then(function(){throw e;})}).then(function(){return d.U.ze()?new D(function(){}):Zi(d.Qb).then(function(){return d.getRedirectResult()}).then(function(){}).f(function(){})})})};
dj.prototype.ac=function(a,b,c,d){return this.U.ac(c,function(c){a.Ya(b,null,c,d)},hj.get())};var jj={},kj=function(a,b,c){var d=b+":"+c;jj[d]||(jj[d]=new dj(a,b,c));return jj[d]},aj=function(a){this.l=a;this.sb=null;this.Xb=[];this.Wb=[];this.qb=null;this.yd=!1};aj.prototype.reset=function(){this.sb=null;this.qb&&(this.qb.cancel(),this.qb=null)};
aj.prototype.qe=function(a,b){if(!a)return F(new N("invalid-auth-event"));this.reset();this.yd=!0;var c=a.ia,d=a.S,e=a.getError()&&"auth/web-storage-unsupported"==a.getError().code,f=a.getError()&&"auth/operation-not-supported-in-this-environment"==a.getError().code;"unknown"!=c||e||f?a=a.Y?this.wd(a,b):b.Eb(c,d)?this.xd(a,b):F(new N("invalid-auth-event")):(lj(this,!1,null,null),a=E());return a};var fj=function(a){a.yd||(a.yd=!0,lj(a,!1,null,null))};
aj.prototype.wd=function(a){lj(this,!0,null,a.getError());return E()};aj.prototype.xd=function(a,b){var c=this;b=b.Eb(a.ia,a.S);var d=a.vb,e=a.oc(),f=!!a.ia.match(/Redirect$/);return b(d,e).then(function(a){lj(c,f,a,null)}).f(function(a){lj(c,f,null,a)})};
var mj=function(a,b){a.sb=function(){return F(b)};if(a.Wb.length)for(var c=0;c<a.Wb.length;c++)a.Wb[c](b)},nj=function(a,b){a.sb=function(){return E(b)};if(a.Xb.length)for(var c=0;c<a.Xb.length;c++)a.Xb[c](b)},lj=function(a,b,c,d){b?d?mj(a,d):nj(a,c):nj(a,{user:null});a.Xb=[];a.Wb=[]};aj.prototype.getRedirectResult=function(){var a=this;return new D(function(b,c){a.sb?a.sb().then(b,c):(a.Xb.push(b),a.Wb.push(c),oj(a))})};
var oj=function(a){var b=new N("timeout");a.qb&&a.qb.cancel();a.qb=Ae(ij.get()).then(function(){a.sb||lj(a,!0,null,b)})},bj=function(a){this.l=a};bj.prototype.qe=function(a,b){if(!a)return F(new N("invalid-auth-event"));var c=a.ia,d=a.S;return a.Y?this.wd(a,b):b.Eb(c,d)?this.xd(a,b):F(new N("invalid-auth-event"))};bj.prototype.wd=function(a,b){b.Ya(a.ia,null,a.getError(),a.S);return E()};
bj.prototype.xd=function(a,b){var c=a.S,d=a.ia,e=b.Eb(d,c),f=a.vb;a=a.oc();return e(f,a).then(function(a){b.Ya(d,a,null,c)}).f(function(a){b.Ya(d,null,a,c)})};var pj=function(a){this.g=a;this.Da=this.ca=null;this.Ja=0};pj.prototype.G=function(){return{apiKey:this.g.m,refreshToken:this.ca,accessToken:this.Da,expirationTime:this.Ja}};
var rj=function(a,b){var c=b.idToken,d=b.refreshToken;b=qj(b.expiresIn);a.Da=c;a.Ja=b;a.ca=d},qj=function(a){return la()+1E3*parseInt(a,10)},sj=function(a,b){return Xg(a.g,b).then(function(b){a.Da=b.access_token;a.Ja=qj(b.expires_in);a.ca=b.refresh_token;return{accessToken:a.Da,expirationTime:a.Ja,refreshToken:a.ca}}).f(function(b){"auth/user-token-expired"==b.code&&(a.ca=null);throw b;})};
pj.prototype.getToken=function(a){a=!!a;return this.Da&&!this.ca?F(new N("user-token-expired")):a||!this.Da||la()>this.Ja-3E4?this.ca?sj(this,{grant_type:"refresh_token",refresh_token:this.ca}):E(null):E({accessToken:this.Da,expirationTime:this.Ja,refreshToken:this.ca})};var tj=function(a,b,c,d,e){Vf(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},uj=function(a,b){Wb.call(this,a);for(var c in b)this[c]=b[c]};u(uj,Wb);
var S=function(a,b,c){this.J=[];this.m=a.apiKey;this.w=a.appName;this.B=a.authDomain||null;a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null;this.g=new R(this.m,null,a);this.na=new pj(this.g);vj(this,b.idToken);rj(this.na,b);M(this,"refreshToken",this.na.ca);wj(this,c||{});oe.call(this);this.Ec=!1;this.B&&Hf()&&(this.s=kj(this.B,this.m,this.w));this.Kc=[];this.oa=null;this.pb=xj(this);this.xb=t(this.kd,this)};u(S,oe);S.prototype.kd=function(){this.pb.nb&&(this.pb.stop(),this.pb.start())};
var yj=function(a){try{return firebase.app(a.w).auth()}catch(b){throw new N("internal-error","No firebase.auth.Auth instance is available for the Firebase App '"+a.w+"'!");}},xj=function(a){return new vi(function(){return a.getIdToken(!0)},function(a){return a&&"auth/network-request-failed"==a.code?!0:!1},function(){var b=a.na.Ja-la()-3E5;return 0<b?b:0},3E4,96E4,!1)},zj=function(a){a.Bb||a.pb.nb||(a.pb.start(),rc(a,"tokenChanged",a.xb),jc(a,"tokenChanged",a.xb))},Aj=function(a){rc(a,"tokenChanged",
a.xb);a.pb.stop()},vj=function(a,b){a.ie=b;M(a,"_lat",b)},Bj=function(a,b){Xa(a.Kc,function(a){return a==b})},Cj=function(a){for(var b=[],c=0;c<a.Kc.length;c++)b.push(a.Kc[c](a));return zd(b).then(function(){return a})},Dj=function(a){a.s&&!a.Ec&&(a.Ec=!0,a.s.subscribe(a))},wj=function(a,b){Vf(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,phoneNumber:b.phoneNumber||null,isAnonymous:b.isAnonymous||!1,providerData:[]})};
M(S.prototype,"providerId","firebase");var Ej=function(){},Fj=function(a){return E().then(function(){if(a.Bb)throw new N("app-deleted");})},Gj=function(a){return Qa(a.providerData,function(a){return a.providerId})},Ij=function(a,b){b&&(Hj(a,b.providerId),a.providerData.push(b))},Hj=function(a,b){Xa(a.providerData,function(a){return a.providerId==b})},Jj=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&M(a,b,c)};
S.prototype.copy=function(a){var b=this;b!=a&&(Vf(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,phoneNumber:a.phoneNumber,isAnonymous:a.isAnonymous,providerData:[]}),y(a.providerData,function(a){Ij(b,a)}),this.na=a.na,M(this,"refreshToken",this.na.ca))};S.prototype.reload=function(){var a=this;return this.c(Fj(this).then(function(){return Kj(a).then(function(){return Cj(a)}).then(Ej)}))};
var Kj=function(a){return a.getIdToken().then(function(b){var c=a.isAnonymous;return Lj(a,b).then(function(){c||Jj(a,"isAnonymous",!1);return b})})};S.prototype.getIdToken=function(a){var b=this;return this.c(Fj(this).then(function(){return b.na.getToken(a)}).then(function(a){if(!a)throw new N("internal-error");a.accessToken!=b.ie&&(vj(b,a.accessToken),b.Pa());Jj(b,"refreshToken",a.refreshToken);return a.accessToken}))};
S.prototype.getToken=function(a){Sf["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]||(Sf["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]=!0,"undefined"!==typeof console&&"function"===typeof console.warn&&console.warn("firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."));return this.getIdToken(a)};
var Mj=function(a,b){b.idToken&&a.ie!=b.idToken&&(rj(a.na,b),a.Pa(),vj(a,b.idToken),Jj(a,"refreshToken",a.na.ca))};S.prototype.Pa=function(){this.dispatchEvent(new uj("tokenChanged"))};var Lj=function(a,b){return Q(a.g,zh,{idToken:b}).then(t(a.Bf,a))};
S.prototype.Bf=function(a){a=a.users;if(!a||!a.length)throw new N("internal-error");a=a[0];wj(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified,phoneNumber:a.phoneNumber});for(var b=Nj(a),c=0;c<b.length;c++)Ij(this,b[c]);Jj(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
var Nj=function(a){return(a=a.providerUserInfo)&&a.length?Qa(a,function(a){return new tj(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};S.prototype.reauthenticateAndRetrieveDataWithCredential=function(a){var b=this,c=null;return this.c(a.pd(this.g,this.uid).then(function(a){Mj(b,a);c=Oj(b,a,"reauthenticate");b.oa=null;return b.reload()}).then(function(){return c}),!0)};S.prototype.reauthenticateWithCredential=function(a){return this.reauthenticateAndRetrieveDataWithCredential(a).then(function(){})};
var Pj=function(a,b){return Kj(a).then(function(){if(Ua(Gj(a),b))return Cj(a).then(function(){throw new N("provider-already-linked");})})};S.prototype.linkAndRetrieveDataWithCredential=function(a){var b=this,c=null;return this.c(Pj(this,a.providerId).then(function(){return b.getIdToken()}).then(function(c){return a.zc(b.g,c)}).then(function(a){c=Oj(b,a,"link");return Qj(b,a)}).then(function(){return c}))};S.prototype.linkWithCredential=function(a){return this.linkAndRetrieveDataWithCredential(a).then(function(a){return a.user})};
S.prototype.linkWithPhoneNumber=function(a,b){var c=this;return this.c(Pj(this,"phone").then(function(){return ti(yj(c),a,b,t(c.linkAndRetrieveDataWithCredential,c))}))};S.prototype.reauthenticateWithPhoneNumber=function(a,b){var c=this;return this.c(E().then(function(){return ti(yj(c),a,b,t(c.reauthenticateAndRetrieveDataWithCredential,c))}),!0)};var Oj=function(a,b,c){var d=Ig(b);b=Di(b);return Wf({user:a,credential:d,additionalUserInfo:b,operationType:c})},Qj=function(a,b){Mj(a,b);return a.reload().then(function(){return a})};
h=S.prototype;h.updateEmail=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updateEmail(c,a)}).then(function(a){Mj(b,a);return b.reload()}))};h.updatePhoneNumber=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return a.zc(b.g,c)}).then(function(a){Mj(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updatePassword(c,a)}).then(function(a){Mj(b,a);return b.reload()}))};
h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Fj(this);var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Mj(b,a);Jj(b,"displayName",a.displayName||null);Jj(b,"photoURL",a.photoUrl||null);y(b.providerData,function(a){"password"===a.providerId&&(M(a,"displayName",b.displayName),M(a,"photoURL",b.photoURL))});return Cj(b)}).then(Ej))};
h.unlink=function(a){var b=this;return this.c(Kj(this).then(function(c){return Ua(Gj(b),a)?nh(b.g,c,[a]).then(function(a){var c={};y(a.providerUserInfo||[],function(a){c[a.providerId]=!0});y(Gj(b),function(a){c[a]||Hj(b,a)});c[Fg.PROVIDER_ID]||M(b,"phoneNumber",null);return Cj(b)}):Cj(b).then(function(){throw new N("no-such-provider");})}))};
h["delete"]=function(){var a=this;return this.c(this.getIdToken().then(function(b){return Q(a.g,yh,{idToken:b})}).then(function(){a.dispatchEvent(new uj("userDeleted"))})).then(function(){for(var b=0;b<a.J.length;b++)a.J[b].cancel("app-deleted");a.J=[];a.Bb=!0;Aj(a);M(a,"refreshToken",null);a.s&&a.s.unsubscribe(a)})};
h.Pd=function(a,b){return"linkViaPopup"==a&&(this.ha||null)==b&&this.ga||"reauthViaPopup"==a&&(this.ha||null)==b&&this.ga||"linkViaRedirect"==a&&(this.Ba||null)==b||"reauthViaRedirect"==a&&(this.Ba||null)==b?!0:!1};h.Ya=function(a,b,c,d){"linkViaPopup"!=a&&"reauthViaPopup"!=a||d!=(this.ha||null)||(c&&this.Ra?this.Ra(c):b&&!c&&this.ga&&this.ga(b),this.K&&(this.K.cancel(),this.K=null),delete this.ga,delete this.Ra)};
h.Eb=function(a,b){return"linkViaPopup"==a&&b==(this.ha||null)?t(this.Xd,this):"reauthViaPopup"==a&&b==(this.ha||null)?t(this.Yd,this):"linkViaRedirect"==a&&(this.Ba||null)==b?t(this.Xd,this):"reauthViaRedirect"==a&&(this.Ba||null)==b?t(this.Yd,this):null};h.nc=function(){return Gf(this.uid+":::")};h.linkWithPopup=function(a){var b=this;return Rj(this,"linkViaPopup",a,function(){return Pj(b,a.providerId).then(function(){return Cj(b)})},!1)};
h.reauthenticateWithPopup=function(a){return Rj(this,"reauthViaPopup",a,function(){return E()},!0)};
var Rj=function(a,b,c,d,e){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));if(a.oa&&!e)return F(a.oa);var f=cg(c.providerId),g=a.nc(),l=null;(!If()||Bf())&&a.B&&c.isOAuthProvider&&(l=Th(a.B,a.m,a.w,b,c,null,g,firebase.SDK_VERSION||null));var n=uf(l,f&&f.Sb,f&&f.Rb);d=d().then(function(){Sj(a);if(!e)return a.getIdToken().then(function(){})}).then(function(){return a.s.Tb(n,b,c,g,!!l)}).then(function(){return new D(function(c,d){a.Ya(b,null,new N("cancelled-popup-request"),a.ha||
null);a.ga=c;a.Ra=d;a.ha=g;a.K=a.s.ac(a,b,n,g)})}).then(function(a){n&&tf(n);return a?Wf(a):null}).f(function(a){n&&tf(n);throw a;});return a.c(d,e)};S.prototype.linkWithRedirect=function(a){var b=this;return Tj(this,"linkViaRedirect",a,function(){return Pj(b,a.providerId)},!1)};S.prototype.reauthenticateWithRedirect=function(a){return Tj(this,"reauthViaRedirect",a,function(){return E()},!0)};
var Tj=function(a,b,c,d,e){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));if(a.oa&&!e)return F(a.oa);var f=null,g=a.nc();d=d().then(function(){Sj(a);if(!e)return a.getIdToken().then(function(){})}).then(function(){a.Ba=g;return Cj(a)}).then(function(b){a.Va&&(b=a.Va,b=b.l.set(Uj,a.G(),b.v));return b}).then(function(){return a.s.Ub(b,c,g)}).f(function(b){f=b;if(a.Va)return Vj(a.Va);throw f;}).then(function(){if(f)throw f;});return a.c(d,e)},Sj=function(a){if(!a.s||!a.Ec){if(a.s&&
!a.Ec)throw new N("internal-error");throw new N("auth-domain-config-required");}};S.prototype.Xd=function(a,b){var c=this;this.K&&(this.K.cancel(),this.K=null);var d=null,e=this.getIdToken().then(function(d){return mg(c.g,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=Oj(c,a,"link");return Qj(c,a)}).then(function(){return d});return this.c(e)};
S.prototype.Yd=function(a,b){var c=this;this.K&&(this.K.cancel(),this.K=null);var d=null,e=E().then(function(){return ig(ng(c.g,{requestUri:a,sessionId:b}),c.uid)}).then(function(a){d=Oj(c,a,"reauthenticate");Mj(c,a);c.oa=null;return c.reload()}).then(function(){return d});return this.c(e,!0)};S.prototype.sendEmailVerification=function(){var a=this;return this.c(this.getIdToken().then(function(b){return a.g.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};
S.prototype.c=function(a,b){var c=this,d=Wj(this,a,b);this.J.push(d);Cd(d,function(){Wa(c.J,d)});return d};var Wj=function(a,b,c){return a.oa&&!c?(b.cancel(),F(a.oa)):b.f(function(b){!b||"auth/user-disabled"!=b.code&&"auth/user-token-expired"!=b.code||(a.oa||a.dispatchEvent(new uj("userInvalidated")),a.oa=b);throw b;})};S.prototype.toJSON=function(){return this.G()};
S.prototype.G=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,phoneNumber:this.phoneNumber,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.m,appName:this.w,authDomain:this.B,stsTokenManager:this.na.G(),redirectEventId:this.Ba||null};y(this.providerData,function(b){a.providerData.push(Xf(b))});return a};
var Xj=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-la())/1E3;else return null;var d=new S(b,c,a);a.providerData&&y(a.providerData,function(a){a&&Ij(d,Wf(a))});a.redirectEventId&&(d.Ba=a.redirectEventId);return d},
Yj=function(a,b,c){var d=new S(a,b);c&&(d.Va=c);return d.reload().then(function(){return d})};var Zj=function(a){this.v=a;this.l=Gi()},Uj={name:"redirectUser",V:!1},Vj=function(a){return a.l.remove(Uj,a.v)},ak=function(a,b){return a.l.get(Uj,a.v).then(function(a){a&&b&&(a.authDomain=b);return Xj(a||{})})};var bk=function(a){this.v=a;this.l=Gi()},ck={name:"authUser",V:!0},dk=function(a,b){return a.l.set(ck,b.G(),a.v)},ek=function(a){return a.l.remove(ck,a.v)},fk=function(a,b){return a.l.get(ck,a.v).then(function(a){a&&b&&(a.authDomain=b);return Xj(a||{})})};var T=function(a){this.Ha=!1;M(this,"app",a);if(this.h().options&&this.h().options.apiKey)a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null,this.g=new R(this.h().options&&this.h().options.apiKey,null,a);else throw new N("invalid-api-key");this.J=[];this.Ea=[];this.wb=[];this.xf=firebase.INTERNAL.createSubscribe(t(this.lf,this));this.hc=void 0;this.zf=firebase.INTERNAL.createSubscribe(t(this.nf,this));gk(this,null);a=this.h().options.apiKey;var b=this.h().name;this.xa=new bk(a+":"+b);a=this.h().options.apiKey;
b=this.h().name;this.rb=new Zj(a+":"+b);this.jc=this.c(hk(this));this.ua=this.c(ik(this));this.xc=!1;this.hd=t(this.Rf,this);this.Ce=t(this.jb,this);this.xb=t(this.kd,this);this.Ae=t(this.gf,this);this.Be=t(this.hf,this);jk(this);this.INTERNAL={};this.INTERNAL["delete"]=t(this["delete"],this);this.Ka=0};T.prototype.toJSON=function(){return{apiKey:this.h().options.apiKey,authDomain:this.h().options.authDomain,appName:this.h().name,currentUser:U(this)&&U(this).G()}};
var kk=function(a){return a.Ue||F(new N("auth-domain-config-required"))},jk=function(a){var b=a.h().options.authDomain,c=a.h().options.apiKey;b&&Hf()&&(a.Ue=a.jc.then(function(){if(!a.Ha)return a.s=kj(b,c,a.h().name),a.s.subscribe(a),U(a)&&Dj(U(a)),a.Yb&&(Dj(a.Yb),a.Yb=null),a.s}))};h=T.prototype;h.Pd=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.ha==b&&!!this.ga;default:return!1}};
h.Ya=function(a,b,c,d){"signInViaPopup"==a&&this.ha==d&&(c&&this.Ra?this.Ra(c):b&&!c&&this.ga&&this.ga(b),this.K&&(this.K.cancel(),this.K=null),delete this.ga,delete this.Ra)};h.Eb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.ha==b&&this.ga?t(this.We,this):null};
h.We=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.K&&(this.K.cancel(),this.K=null);var d=null,e=null,f=kg(c.g,a).then(function(a){d=Ig(a);e=Di(a);return a});a=c.jc.then(function(){return f}).then(function(a){return lk(c,a)}).then(function(){return Wf({user:U(c),credential:d,additionalUserInfo:e,operationType:"signIn"})});return this.c(a)};h.nc=function(){return Gf()};
h.signInWithPopup=function(a){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var b=this,c=cg(a.providerId),d=this.nc(),e=null;(!If()||Bf())&&this.h().options.authDomain&&a.isOAuthProvider&&(e=Th(this.h().options.authDomain,this.h().options.apiKey,this.h().name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=uf(e,c&&c.Sb,c&&c.Rb),c=kk(this).then(function(b){return b.Tb(f,"signInViaPopup",a,d,!!e)}).then(function(){return new D(function(a,c){b.Ya("signInViaPopup",
null,new N("cancelled-popup-request"),b.ha);b.ga=a;b.Ra=c;b.ha=d;b.K=b.s.ac(b,"signInViaPopup",f,d)})}).then(function(a){f&&tf(f);return a?Wf(a):null}).f(function(a){f&&tf(f);throw a;});return this.c(c)};h.signInWithRedirect=function(a){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var b=this,c=kk(this).then(function(){return b.s.Ub("signInViaRedirect",a)});return this.c(c)};
h.getRedirectResult=function(){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var a=this,b=kk(this).then(function(){return a.s.getRedirectResult()}).then(function(a){return a?Wf(a):null});return this.c(b)};
var lk=function(a,b){var c={};c.apiKey=a.h().options.apiKey;c.authDomain=a.h().options.authDomain;c.appName=a.h().name;return a.jc.then(function(){return Yj(c,b,a.rb)}).then(function(b){if(U(a)&&b.uid==U(a).uid)return U(a).copy(b),a.jb(b);gk(a,b);Dj(b);return a.jb(b)}).then(function(){a.Pa()})},gk=function(a,b){U(a)&&(Bj(U(a),a.Ce),rc(U(a),"tokenChanged",a.xb),rc(U(a),"userDeleted",a.Ae),rc(U(a),"userInvalidated",a.Be),Aj(U(a)));b&&(b.Kc.push(a.Ce),jc(b,"tokenChanged",a.xb),jc(b,"userDeleted",a.Ae),
jc(b,"userInvalidated",a.Be),0<a.Ka&&zj(b));M(a,"currentUser",b)};T.prototype.signOut=function(){var a=this,b=this.ua.then(function(){if(!U(a))return E();gk(a,null);return ek(a.xa).then(function(){a.Pa()})});return this.c(b)};
var mk=function(a){var b=a.h().options.authDomain,b=ak(a.rb,b).then(function(b){if(a.Yb=b)b.Va=a.rb;return Vj(a.rb)});return a.c(b)},hk=function(a){var b=a.h().options.authDomain,c=mk(a).then(function(){return fk(a.xa,b)}).then(function(b){return b?(b.Va=a.rb,a.Yb&&(a.Yb.Ba||null)==(b.Ba||null)?b:b.reload().then(function(){return dk(a.xa,b).then(function(){return b})}).f(function(c){return"auth/network-request-failed"==c.code?b:ek(a.xa)})):null}).then(function(b){gk(a,b||null)});return a.c(c)},ik=
function(a){return a.jc.then(function(){return a.getRedirectResult()}).f(function(){}).then(function(){if(!a.Ha)return a.hd()}).f(function(){}).then(function(){if(!a.Ha){a.xc=!0;var b=a.xa;b.l.addListener(ck,b.v,a.hd)}})};h=T.prototype;
h.Rf=function(){var a=this,b=this.h().options.authDomain;return fk(this.xa,b).then(function(b){if(!a.Ha){var c;if(c=U(a)&&b){c=U(a).uid;var e=b.uid;c=void 0===c||null===c||""===c||void 0===e||null===e||""===e?!1:c==e}if(c)return U(a).copy(b),U(a).getIdToken();if(U(a)||b)gk(a,b),b&&(Dj(b),b.Va=a.rb),a.s&&a.s.subscribe(a),a.Pa()}})};h.jb=function(a){return dk(this.xa,a)};h.kd=function(){this.Pa();this.jb(U(this))};h.gf=function(){this.signOut()};h.hf=function(){this.signOut()};
var nk=function(a,b){var c=null,d=null;return a.c(b.then(function(b){c=Ig(b);d=Di(b);return lk(a,b)}).then(function(){return Wf({user:U(a),credential:c,additionalUserInfo:d,operationType:"signIn"})}))};h=T.prototype;h.lf=function(a){var b=this;this.addAuthTokenListener(function(){a.next(U(b))})};h.nf=function(a){var b=this;ok(this,function(){a.next(U(b))})};
h.onIdTokenChanged=function(a,b,c){var d=this;this.xc&&firebase.Promise.resolve().then(function(){q(a)?a(U(d)):q(a.next)&&a.next(U(d))});return this.xf(a,b,c)};h.onAuthStateChanged=function(a,b,c){var d=this;this.xc&&firebase.Promise.resolve().then(function(){d.hc=d.getUid();q(a)?a(U(d)):q(a.next)&&a.next(U(d))});return this.zf(a,b,c)};h.bf=function(a){var b=this,c=this.ua.then(function(){return U(b)?U(b).getIdToken(a).then(function(a){return{accessToken:a}}):null});return this.c(c)};
h.signInWithCustomToken=function(a){var b=this;return this.ua.then(function(){return nk(b,Q(b.g,Bh,{token:a}))}).then(function(a){a=a.user;Jj(a,"isAnonymous",!1);return b.jb(a)}).then(function(){return U(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return nk(c,Q(c.g,yg,{email:a,password:b}))}).then(function(a){return a.user})};h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return nk(c,Q(c.g,xh,{email:a,password:b}))}).then(function(a){return a.user})};
h.signInWithCredential=function(a){return this.signInAndRetrieveDataWithCredential(a).then(function(a){return a.user})};h.signInAndRetrieveDataWithCredential=function(a){var b=this;return this.ua.then(function(){return nk(b,a.Fb(b.g))})};h.signInAnonymously=function(){var a=this;return this.ua.then(function(){var b=U(a);return b&&b.isAnonymous?b:nk(a,a.g.signInAnonymously()).then(function(b){b=b.user;Jj(b,"isAnonymous",!0);return a.jb(b)}).then(function(){return U(a)})})};h.h=function(){return this.app};
var U=function(a){return a.currentUser};T.prototype.getUid=function(){return U(this)&&U(this).uid||null};var pk=function(a){return U(a)&&U(a)._lat||null};h=T.prototype;h.Pa=function(){if(this.xc){for(var a=0;a<this.Ea.length;a++)if(this.Ea[a])this.Ea[a](pk(this));if(this.hc!==this.getUid()&&this.wb.length)for(this.hc=this.getUid(),a=0;a<this.wb.length;a++)if(this.wb[a])this.wb[a](pk(this))}};h.Le=function(a){this.addAuthTokenListener(a);this.Ka++;0<this.Ka&&U(this)&&zj(U(this))};
h.Ff=function(a){var b=this;y(this.Ea,function(c){c==a&&b.Ka--});0>this.Ka&&(this.Ka=0);0==this.Ka&&U(this)&&Aj(U(this));this.removeAuthTokenListener(a)};h.addAuthTokenListener=function(a){var b=this;this.Ea.push(a);this.c(this.ua.then(function(){b.Ha||Ua(b.Ea,a)&&a(pk(b))}))};h.removeAuthTokenListener=function(a){Xa(this.Ea,function(b){return b==a})};var ok=function(a,b){a.wb.push(b);a.c(a.ua.then(function(){!a.Ha&&Ua(a.wb,b)&&a.hc!==a.getUid()&&(a.hc=a.getUid(),b(pk(a)))}))};h=T.prototype;
h["delete"]=function(){this.Ha=!0;for(var a=0;a<this.J.length;a++)this.J[a].cancel("app-deleted");this.J=[];this.xa&&(a=this.xa,a.l.removeListener(ck,a.v,this.hd));this.s&&this.s.unsubscribe(this);return firebase.Promise.resolve()};h.c=function(a){var b=this;this.J.push(a);Cd(a,function(){Wa(b.J,a)});return a};h.fetchProvidersForEmail=function(a){return this.c(bh(this.g,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};
h.confirmPasswordReset=function(a,b){return this.c(this.g.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.c(this.g.checkActionCode(a).then(function(a){return new ui(a)}))};h.applyActionCode=function(a){return this.c(this.g.applyActionCode(a).then(function(){}))};h.sendPasswordResetEmail=function(a){return this.c(this.g.sendPasswordResetEmail(a).then(function(){}))};
h.signInWithPhoneNumber=function(a,b){return this.c(ti(this,a,b,t(this.signInAndRetrieveDataWithCredential,this)))};var qk="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),V=function(a,b){return{name:a||"",O:"a valid string",optional:!!b,P:p}},rk=function(){return{name:"opt_forceRefresh",O:"a boolean",optional:!0,P:ba}},W=function(a,b){return{name:a||"",O:"a valid object",optional:!!b,P:r}},sk=function(a,b){return{name:a||"",O:"a function",optional:!!b,P:q}},tk=function(){return{name:"",O:"null",optional:!1,P:fa}},uk=function(){return{name:"",O:"an HTML element",optional:!1,P:function(a){return!!(a&&
a instanceof Element)}}},vk=function(){return{name:"auth",O:"an instance of Firebase Auth",optional:!0,P:function(a){return!!(a&&a instanceof T)}}},wk=function(){return{name:"app",O:"an instance of Firebase App",optional:!0,P:function(a){return!!(a&&a instanceof firebase.app.App)}}},xk=function(a){return{name:a?a+"Credential":"credential",O:a?"a valid "+a+" credential":"a valid credential",optional:!1,P:function(b){if(!b)return!1;var c=!a||b.providerId===a;return!(!b.Fb||!c)}}},yk=function(){return{name:"authProvider",
O:"a valid Auth provider",optional:!1,P:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},zk=function(){return{name:"applicationVerifier",O:"an implementation of firebase.auth.ApplicationVerifier",optional:!1,P:function(a){return!!(a&&p(a.type)&&q(a.verify))}}},X=function(a,b,c,d){return{name:c||"",O:a.O+" or "+b.O,optional:!!d,P:function(c){return a.P(c)||b.P(c)}}};var Y=function(a,b){for(var c in b){var d=b[c].name;a[d]=Ak(d,a[c],b[c].a)}},Z=function(a,b,c,d){a[b]=Ak(b,c,d)},Ak=function(a,b,c){if(!c)return b;var d=Bk(a);a=function(){var a=Array.prototype.slice.call(arguments);a:{var e=Array.prototype.slice.call(a);var l=0;for(var n=!1,C=0;C<c.length;C++)if(c[C].optional)n=!0;else{if(n)throw new N("internal-error","Argument validator encountered a required argument after an optional argument.");l++}n=c.length;if(e.length<l||n<e.length)e="Expected "+(l==n?1==
l?"1 argument":l+" arguments":l+"-"+n+" arguments")+" but got "+e.length+".";else{for(l=0;l<e.length;l++)if(n=c[l].optional&&void 0===e[l],!c[l].P(e[l])&&!n){e=c[l];if(0>l||l>=qk.length)throw new N("internal-error","Argument validator received an unsupported number of arguments.");e=qk[l]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.O+".";break a}e=null}}if(e)throw new N("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
b.prototype[e];return a},Bk=function(a){a=a.split(".");return a[a.length-1]};Y(T.prototype,{applyActionCode:{name:"applyActionCode",a:[V("code")]},checkActionCode:{name:"checkActionCode",a:[V("code")]},confirmPasswordReset:{name:"confirmPasswordReset",a:[V("code"),V("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",a:[V("email"),V("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",a:[V("email")]},getRedirectResult:{name:"getRedirectResult",a:[]},onAuthStateChanged:{name:"onAuthStateChanged",a:[X(W(),sk(),"nextOrObserver"),
sk("opt_error",!0),sk("opt_completed",!0)]},onIdTokenChanged:{name:"onIdTokenChanged",a:[X(W(),sk(),"nextOrObserver"),sk("opt_error",!0),sk("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",a:[V("email")]},signInAndRetrieveDataWithCredential:{name:"signInAndRetrieveDataWithCredential",a:[xk()]},signInAnonymously:{name:"signInAnonymously",a:[]},signInWithCredential:{name:"signInWithCredential",a:[xk()]},signInWithCustomToken:{name:"signInWithCustomToken",a:[V("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",
a:[V("email"),V("password")]},signInWithPhoneNumber:{name:"signInWithPhoneNumber",a:[V("phoneNumber"),zk()]},signInWithPopup:{name:"signInWithPopup",a:[yk()]},signInWithRedirect:{name:"signInWithRedirect",a:[yk()]},signOut:{name:"signOut",a:[]},toJSON:{name:"toJSON",a:[V(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",a:[V("code")]}});
Y(S.prototype,{"delete":{name:"delete",a:[]},getIdToken:{name:"getIdToken",a:[rk()]},getToken:{name:"getToken",a:[rk()]},linkAndRetrieveDataWithCredential:{name:"linkAndRetrieveDataWithCredential",a:[xk()]},linkWithCredential:{name:"linkWithCredential",a:[xk()]},linkWithPhoneNumber:{name:"linkWithPhoneNumber",a:[V("phoneNumber"),zk()]},linkWithPopup:{name:"linkWithPopup",a:[yk()]},linkWithRedirect:{name:"linkWithRedirect",a:[yk()]},reauthenticateAndRetrieveDataWithCredential:{name:"reauthenticateAndRetrieveDataWithCredential",
a:[xk()]},reauthenticateWithCredential:{name:"reauthenticateWithCredential",a:[xk()]},reauthenticateWithPhoneNumber:{name:"reauthenticateWithPhoneNumber",a:[V("phoneNumber"),zk()]},reauthenticateWithPopup:{name:"reauthenticateWithPopup",a:[yk()]},reauthenticateWithRedirect:{name:"reauthenticateWithRedirect",a:[yk()]},reload:{name:"reload",a:[]},sendEmailVerification:{name:"sendEmailVerification",a:[]},toJSON:{name:"toJSON",a:[V(null,!0)]},unlink:{name:"unlink",a:[V("provider")]},updateEmail:{name:"updateEmail",
a:[V("email")]},updatePassword:{name:"updatePassword",a:[V("password")]},updatePhoneNumber:{name:"updatePhoneNumber",a:[xk("phone")]},updateProfile:{name:"updateProfile",a:[W("profile")]}});Y(D.prototype,{f:{name:"catch"},then:{name:"then"}});Y(si.prototype,{confirm:{name:"confirm",a:[V("verificationCode")]}});Z(Ag,"credential",function(a,b){return new xg(a,b)},[V("email"),V("password")]);Y(pg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});
Z(pg,"credential",qg,[X(V(),W(),"token")]);Y(rg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(rg,"credential",sg,[X(V(),W(),"token")]);Y(tg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(tg,"credential",ug,[X(V(),X(W(),tk()),"idToken"),X(V(),tk(),"accessToken",!0)]);
Y(vg.prototype,{setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(vg,"credential",wg,[X(V(),W(),"token"),V("secret",!0)]);Y(P.prototype,{addScope:{name:"addScope",a:[V("scope")]},credential:{name:"credential",a:[X(V(),tk(),"idToken",!0),X(V(),tk(),"accessToken",!0)]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(Fg,"credential",Hg,[V("verificationId"),V("verificationCode")]);
Y(Fg.prototype,{verifyPhoneNumber:{name:"verifyPhoneNumber",a:[V("phoneNumber"),zk()]}});Y(N.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(Kg.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(gg.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(Uh.prototype,{clear:{name:"clear",a:[]},render:{name:"render",a:[]},verify:{name:"verify",a:[]}});
(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:T,Error:N};Z(a,"EmailAuthProvider",Ag,[]);Z(a,"FacebookAuthProvider",pg,[]);Z(a,"GithubAuthProvider",rg,[]);Z(a,"GoogleAuthProvider",tg,[]);Z(a,"TwitterAuthProvider",vg,[]);Z(a,"OAuthProvider",P,[V("providerId")]);Z(a,"PhoneAuthProvider",Fg,[vk()]);Z(a,"RecaptchaVerifier",Uh,[X(V(),uk(),"recaptchaContainer"),W("recaptchaParameters",!0),wk()]);firebase.INTERNAL.registerService("auth",function(a,
c){a=new T(a);c({INTERNAL:{getUid:t(a.getUid,a),getToken:t(a.bf,a),addAuthTokenListener:t(a.Le,a),removeAuthTokenListener:t(a.Ff,a)}});return a},a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:S})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();}).call(this);
}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/

---

typedarray.js
Copyright (c) 2010, Linden Research, Inc.

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
THE SOFTWARE. */

(function() {
            var firebase = __webpack_require__(53);
            var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.Vb=function(){return a.Ye?a.Ye:a.Ye=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}
function la(a,b){function c(){}c.prototype=b.prototype;a.wg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.sg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function ma(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function na(){this.Fd=void 0}
function oa(a,b,c){switch(typeof b){case "string":pa(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],oa(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),pa(f,c),
c.push(":"),oa(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var qa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ra=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function pa(a,b){b.push('"',a.replace(ra,function(a){if(a in qa)return qa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return qa[a]=e+b.toString(16)}),'"')};function sa(){this.Wa=-1};function ta(){this.Wa=-1;this.Wa=64;this.M=[];this.Wd=[];this.Af=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Wa;++a)this.zd[a]=0;this.Pd=this.$b=0;this.reset()}la(ta,sa);ta.prototype.reset=function(){this.M[0]=1732584193;this.M[1]=4023233417;this.M[2]=2562383102;this.M[3]=271733878;this.M[4]=3285377520;this.Pd=this.$b=0};
function ua(a,b,c){c||(c=0);var d=a.Af;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.M[0];c=a.M[1];for(var h=a.M[2],k=a.M[3],m=a.M[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.M[0]=a.M[0]+b&4294967295;a.M[1]=a.M[1]+c&4294967295;a.M[2]=a.M[2]+h&4294967295;a.M[3]=a.M[3]+k&4294967295;a.M[4]=a.M[4]+m&4294967295}
ta.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.Wd,f=this.$b;d<b;){if(0==f)for(;d<=c;)ua(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){ua(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){ua(this,e);f=0;break}}this.$b=f;this.Pd+=b}};var r;a:{var va=aa.navigator;if(va){var wa=va.userAgent;if(wa){r=wa;break a}}r=""};var t=Array.prototype,xa=t.indexOf?function(a,b,c){return t.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ya=t.forEach?function(a,b,c){t.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},za=t.filter?function(a,b,c){return t.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Aa=t.map?function(a,b,c){return t.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ba=t.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return t.reduce.apply(a,e)}:function(a,b,c,d){var e=c;ya(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Ca=t.every?function(a,b,
c){return t.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Da(a,b){var c=Ea(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ea(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Fa(a,b){var c=xa(a,b);0<=c&&t.splice.call(a,c,1)}function Ga(a,b,c){return 2>=arguments.length?t.slice.call(a,b):t.slice.call(a,b,c)}
function Ha(a,b){a.sort(b||Ia)}function Ia(a,b){return a>b?1:a<b?-1:0};function v(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Ja(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function Ka(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function La(a){var b=0,c;for(c in a)b++;return b}function Ma(a){for(var b in a)return b}function Na(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Oa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Pa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function Qa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function Ra(a,b){var c=Qa(a,b,void 0);return c&&a[c]}function Sa(a){for(var b in a)return!1;return!0}function Ta(a){var b={},c;for(c in a)b[c]=a[c];return b};var Ua=-1!=r.indexOf("Opera")||-1!=r.indexOf("OPR"),Va=-1!=r.indexOf("Trident")||-1!=r.indexOf("MSIE"),Wa=-1!=r.indexOf("Gecko")&&-1==r.toLowerCase().indexOf("webkit")&&!(-1!=r.indexOf("Trident")||-1!=r.indexOf("MSIE")),Xa=-1!=r.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Ua&&aa.opera)return a=aa.opera.version,ha(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(r))?a[1]:"");return Va&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a,b){if(!a)throw db(b);}function db(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function eb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function fb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function gb(a){var b=[];fb(a,function(a,d){ea(d)?ya(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var hb=firebase.Promise;function ib(){var a=this;this.reject=this.resolve=null;this.ra=new hb(function(b,c){a.resolve=b;a.reject=c})}function jb(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ha(b)&&(kb(a.ra),1===b.length?b(c):b(c,d))}}function kb(a){a.then(void 0,ba)};function lb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):ma(a)}function x(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];oa(new na,a,b);a=b.join("")}return a};function mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,cb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function y(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function A(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function B(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(A(a,b,d)+"must be a valid function.");}function ob(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(A(a,b,!0)+"must be a valid context object.");};function pb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function C(a,b){this.name=a;this.R=b}function qb(a,b){return new C(a,b)};function rb(a,b){return sb(a.name,b.name)}function tb(a,b){return sb(a,b)};function ub(a){this.uc=a;this.Cd="firebase:"}g=ub.prototype;g.set=function(a,b){null==b?this.uc.removeItem(this.Cd+a):this.uc.setItem(this.Cd+a,x(b))};g.get=function(a){a=this.uc.getItem(this.Cd+a);return null==a?null:lb(a)};g.remove=function(a){this.uc.removeItem(this.Cd+a)};g.Ze=!1;g.toString=function(){return this.uc.toString()};function vb(){this.pc={}}vb.prototype.set=function(a,b){null==b?delete this.pc[a]:this.pc[a]=b};vb.prototype.get=function(a){return eb(this.pc,a)?this.pc[a]:null};vb.prototype.remove=function(a){delete this.pc[a]};vb.prototype.Ze=!0;function wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new ub(b)}}catch(c){}return new vb}var xb=wb("localStorage"),yb=wb("sessionStorage");function zb(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.qg=d;this.gf=e||"";this.$a=xb.get("host:"+a)||this.host}function Ab(a,b){b!==a.$a&&(a.$a=b,"s-"===a.$a.substr(0,2)&&xb.set("host:"+a.host,a.$a))}
function Bb(a,b,c){D("string"===typeof b,"typeof type must == string");D("object"===typeof c,"typeof params must == object");if(b===Cb)b=(a.Sc?"wss://":"ws://")+a.$a+"/.ws?";else if(b===Db)b=(a.Sc?"https://":"http://")+a.$a+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.$a&&(c.ns=a.pe);var d=[];v(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}zb.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.gf&&(a+="<"+this.gf+">");return a};function Eb(a,b){return a&&"object"===typeof a?(D(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Fb(a,b){var c=new Gb;Hb(a,new E(""),function(a,e){Ib(c,a,Jb(e,b))});return c}function Jb(a,b){var c=a.C().H(),c=Eb(c,b),d;if(a.J()){var e=Eb(a.Ca(),b);return e!==a.Ca()||c!==a.C().H()?new Kb(e,G(c)):a}d=a;c!==a.C().H()&&(d=d.fa(new Kb(c)));a.O(H,function(a,c){var e=Jb(c,b);e!==c&&(d=d.T(a,e))});return d};var Lb=function(){var a=1;return function(){return a++}}(),D=cb,Mb=db;
function Nb(a){try{var b;bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ga(d,c,c+8192));b=a}return b}catch(l){I("base64Decode failed: ",
l)}return null}function Ob(a){var b=mb(a);a=new ta;a.update(b);var b=[],c=8*a.Pd;56>a.$b?a.update(a.zd,56-a.$b):a.update(a.zd,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.Wd[d]=c&255,c/=256;ua(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.M[d]>>e&255,++c;return ab(b)}function Pb(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Pb.apply(null,arguments[c]):"object"===typeof arguments[c]?b+x(arguments[c]):b+arguments[c],b+=" ";return b}var Qb=null,Rb=!0;
function Sb(a,b){cb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Qb=q(console.log,console):"object"===typeof console.log&&(Qb=function(a){console.log(a)})),b&&yb.set("logging_enabled",!0)):ha(a)?Qb=a:(Qb=null,yb.remove("logging_enabled"))}function I(a){!0===Rb&&(Rb=!1,null===Qb&&!0===yb.get("logging_enabled")&&Sb(!0));if(Qb){var b=Pb.apply(null,arguments);Qb(b)}}
function Tb(a){return function(){I(a,arguments)}}function Ub(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Pb.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Vb(a){var b=Pb.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function J(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Pb.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Wb(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(p(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Vb(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
c&&"undefined"!=c||Vb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&J("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{jc:new zb(b,d,c,"ws"===e||"wss"===e),path:new E(f)}}function Xb(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Yb(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function sb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Zb(a),d=Zb(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function $b(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+x(b));}
function ac(a){if("object"!==typeof a||null===a)return x(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=x(b[d]),c+=":",c+=ac(a[b[d]]);return c+"}"}function bc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function cc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else v(a,b)}
function dc(a){D(!Xb(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var ec=/^-?\d{1,10}$/;function Zb(a){return ec.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function fc(a){try{a()}catch(b){setTimeout(function(){J("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function gc(a,b,c){Object.defineProperty(a,b,{get:c})}function hc(a,b){var c=setTimeout(a,b);"object"===typeof c&&c.unref&&c.unref();return c};function ic(a){var b={},c={},d={},e="";try{var f=a.split("."),b=lb(Nb(f[0])||""),c=lb(Nb(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{tg:b,Je:c,data:d,mg:e}}function jc(a){a=ic(a);var b=a.Je;return!!a.mg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function kc(a){a=ic(a).Je;return"object"===typeof a&&!0===w(a,"admin")};function lc(){}var mc={};function nc(a){return q(a.compare,a)}lc.prototype.nd=function(a,b){return 0!==this.compare(new C("[MIN_NAME]",a),new C("[MIN_NAME]",b))};lc.prototype.Hc=function(){return oc};function pc(a){D(!a.e()&&".priority"!==K(a),"Can't create PathIndex with empty path or .priority key");this.bc=a}la(pc,lc);g=pc.prototype;g.xc=function(a){return!a.P(this.bc).e()};g.compare=function(a,b){var c=a.R.P(this.bc),d=b.R.P(this.bc),c=c.sc(d);return 0===c?sb(a.name,b.name):c};
g.Ec=function(a,b){var c=G(a),c=L.F(this.bc,c);return new C(b,c)};g.Fc=function(){var a=L.F(this.bc,qc);return new C("[MAX_NAME]",a)};g.toString=function(){return this.bc.slice().join("/")};function rc(){}la(rc,lc);g=rc.prototype;g.compare=function(a,b){var c=a.R.C(),d=b.R.C(),c=c.sc(d);return 0===c?sb(a.name,b.name):c};g.xc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().Z(b.C())};g.Hc=function(){return oc};g.Fc=function(){return new C("[MAX_NAME]",new Kb("[PRIORITY-POST]",qc))};
g.Ec=function(a,b){var c=G(a);return new C(b,new Kb("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var H=new rc;function sc(){}la(sc,lc);g=sc.prototype;g.compare=function(a,b){return sb(a.name,b.name)};g.xc=function(){throw Mb("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Hc=function(){return oc};g.Fc=function(){return new C("[MAX_NAME]",L)};g.Ec=function(a){D(p(a),"KeyIndex indexValue must always be a string.");return new C(a,L)};g.toString=function(){return".key"};
var tc=new sc;function uc(){}la(uc,lc);g=uc.prototype;g.compare=function(a,b){var c=a.R.sc(b.R);return 0===c?sb(a.name,b.name):c};g.xc=function(){return!0};g.nd=function(a,b){return!a.Z(b)};g.Hc=function(){return oc};g.Fc=function(){return vc};g.Ec=function(a,b){var c=G(a);return new C(b,c)};g.toString=function(){return".value"};var wc=new uc;function xc(a,b){this.od=a;this.cc=b}xc.prototype.get=function(a){var b=w(this.od,a);if(!b)throw Error("No index defined for "+a);return b===mc?null:b};function yc(a,b,c){var d=Ja(a.od,function(d,f){var h=w(a.cc,f);D(h,"Missing index implementation for "+f);if(d===mc){if(h.xc(b.R)){for(var k=[],m=c.Wb(qb),l=M(m);l;)l.name!=b.name&&k.push(l),l=M(m);k.push(b);return zc(k,nc(h))}return mc}h=c.get(b.name);k=d;h&&(k=k.remove(new C(b.name,h)));return k.Oa(b,b.R)});return new xc(d,a.cc)}
function Ac(a,b,c){var d=Ja(a.od,function(a){if(a===mc)return a;var d=c.get(b.name);return d?a.remove(new C(b.name,d)):a});return new xc(d,a.cc)}var Bc=new xc({".priority":mc},{".priority":H});function Kb(a,b){this.B=a;D(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||L;Cc(this.aa);this.Db=null}var Dc=["object","boolean","number","string"];g=Kb.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.fa=function(a){return new Kb(this.B,a)};g.Q=function(a){return".priority"===a?this.aa:L};g.P=function(a){return a.e()?this:".priority"===K(a)?this.aa:L};g.Da=function(){return!1};g.Ve=function(){return null};
g.T=function(a,b){return".priority"===a?this.fa(b):b.e()&&".priority"!==a?this:L.T(a,b).fa(this.aa)};g.F=function(a,b){var c=K(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;D(".priority"!==c||1===Ec(a),".priority must be the last token in a path");return this.T(c,L.F(N(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.O=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().H()}:this.Ca()};
g.hash=function(){if(null===this.Db){var a="";this.aa.e()||(a+="priority:"+Fc(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+dc(this.B):a+this.B;this.Db=Ob(a)}return this.Db};g.Ca=function(){return this.B};g.sc=function(a){if(a===L)return 1;if(a instanceof O)return-1;D(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=xa(Dc,b),e=xa(Dc,c);D(0<=d,"Unknown leaf type: "+b);D(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
g.nb=function(){return this};g.yc=function(){return!0};g.Z=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.Z(a.aa):!1};g.toString=function(){return x(this.H(!0))};function Gc(){this.set={}}g=Gc.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return eb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return Sa(this.set)};g.count=function(){return La(this.set)};function Hc(a,b){v(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];v(this.set,function(b,c){a.push(c)});return a};function Ic(a){D(ea(a)&&0<a.length,"Requires a non-empty array");this.Bf=a;this.Dc={}}Ic.prototype.Ge=function(a,b){var c;c=this.Dc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ie.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};Ic.prototype.gc=function(a,b,c){Jc(this,a);this.Dc[a]=this.Dc[a]||[];this.Dc[a].push({Ie:b,Ma:c});(a=this.Ue(a))&&b.apply(c,a)};
Ic.prototype.Ic=function(a,b,c){Jc(this,a);a=this.Dc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ie===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function Jc(a,b){D(Da(a.Bf,function(a){return a===b}),"Unknown event: "+b)};var Kc=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);D(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);D(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Lc(){Ic.call(this,["online"]);this.hc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!pb()){var a=this;window.addEventListener("online",function(){a.hc||(a.hc=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.hc&&(a.hc=!1,a.Ge("online",!1))},!1)}}la(Lc,Ic);Lc.prototype.Ue=function(a){D("online"===a,"Unknown event type: "+a);return[this.hc]};ca(Lc);function Mc(){Ic.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Mb=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Mb&&(c.Mb=b,c.Ge("visible",b))},!1)}}la(Mc,Ic);Mc.prototype.Ue=function(a){D("visible"===a,"Unknown event type: "+a);return[this.Mb]};ca(Mc);function E(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Y=0}else this.o=a,this.Y=b}function P(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return P(N(a),N(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
function Nc(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=sb(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function K(a){return a.Y>=a.o.length?null:a.o[a.Y]}function Ec(a){return a.o.length-a.Y}function N(a){var b=a.Y;b<a.o.length&&b++;return new E(a.o,b)}function Oc(a){return a.Y<a.o.length?a.o[a.o.length-1]:null}g=E.prototype;
g.toString=function(){for(var a="",b=this.Y;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Y+(a||0))};g.parent=function(){if(this.Y>=this.o.length)return null;for(var a=[],b=this.Y;b<this.o.length-1;b++)a.push(this.o[b]);return new E(a,0)};
g.n=function(a){for(var b=[],c=this.Y;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof E)for(c=a.Y;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new E(b,0)};g.e=function(){return this.Y>=this.o.length};g.Z=function(a){if(Ec(this)!==Ec(a))return!1;for(var b=this.Y,c=a.Y;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
g.contains=function(a){var b=this.Y,c=a.Y;if(Ec(this)>Ec(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var Q=new E("");function Pc(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.Qe=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=nb(this.Qa[c]);Qc(this)}Pc.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=nb(a);Qc(this)};Pc.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=nb(a);0<this.Qa.length&&--this.Ha};
function Qc(a){if(768<a.Ha)throw Error(a.Qe+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.Qe+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Rc(a));}function Rc(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Sc(){this.children={};this.bd=0;this.value=null}function Tc(a,b,c){this.ud=a?a:"";this.Pc=b?b:null;this.A=c?c:new Sc}function Uc(a,b){for(var c=b instanceof E?b:new E(b),d=a,e;null!==(e=K(c));)d=new Tc(e,d,w(d.A.children,e)||new Sc),c=N(c);return d}g=Tc.prototype;g.Ca=function(){return this.A.value};function Vc(a,b){D("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Wc(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.bd=0;Wc(this)};
g.kd=function(){return 0<this.A.bd};g.e=function(){return null===this.Ca()&&!this.kd()};g.O=function(a){var b=this;v(this.A.children,function(c,d){a(new Tc(d,b,c))})};function Xc(a,b,c,d){c&&!d&&b(a);a.O(function(a){Xc(a,b,!0,d)});c&&d&&b(a)}function Yc(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new E(null===this.Pc?this.ud:this.Pc.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Pc};
function Wc(a){if(null!==a.Pc){var b=a.Pc,c=a.ud,d=a.e(),e=eb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.bd--,Wc(b)):d||e||(b.A.children[c]=a.A,b.A.bd++,Wc(b))}};function Zc(a,b){this.La=a;this.ba=b?b:$c}g=Zc.prototype;g.Oa=function(a,b){return new Zc(this.La,this.ba.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new Zc(this.La,this.ba.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function ad(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Gc=function(){return this.ba.Gc()};g.ec=function(){return this.ba.ec()};g.ha=function(a){return this.ba.ha(a)};
g.Wb=function(a){return new bd(this.ba,null,this.La,!1,a)};g.Xb=function(a,b){return new bd(this.ba,a,this.La,!1,b)};g.Zb=function(a,b){return new bd(this.ba,a,this.La,!0,b)};g.We=function(a){return new bd(this.ba,null,this.La,!0,a)};function bd(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.le?a.right:a.left}
function M(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function cd(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function dd(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:$c;this.right=null!=e?e:$c}g=dd.prototype;
g.X=function(a,b,c,d,e){return new dd(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function ed(a){return a.left.e()?a:ed(a.left)}g.Gc=function(){return ed(this).key};g.ec=function(){return this.right.e()?this.key:this.right.ec()};
g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return gd(e)};function hd(a){if(a.left.e())return $c;a.left.ea()||a.left.left.ea()||(a=id(a));a=a.X(null,null,null,hd(a.left),null);return gd(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ea()||c.left.left.ea()||(c=id(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.ea()&&(c=jd(c));c.right.e()||c.right.ea()||c.right.left.ea()||(c=kd(c),c.left.left.ea()&&(c=jd(c),c=kd(c)));if(0===b(a,c.key)){if(c.right.e())return $c;d=ed(c.right);c=c.X(d.key,d.value,null,null,hd(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return gd(c)};g.ea=function(){return this.color};
function gd(a){a.right.ea()&&!a.left.ea()&&(a=ld(a));a.left.ea()&&a.left.left.ea()&&(a=jd(a));a.left.ea()&&a.right.ea()&&(a=kd(a));return a}function id(a){a=kd(a);a.right.left.ea()&&(a=a.X(null,null,null,null,jd(a.right)),a=ld(a),a=kd(a));return a}function ld(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function jd(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function kd(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function md(){}g=md.prototype;g.X=function(){return this};g.Oa=function(a,b){return new dd(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ha=function(){return!1};g.Gc=function(){return null};g.ec=function(){return null};g.ea=function(){return!1};var $c=new md;function O(a,b,c){this.k=a;(this.aa=b)&&Cc(this.aa);a.e()&&D(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.yb=c;this.Db=null}g=O.prototype;g.J=function(){return!1};g.C=function(){return this.aa||L};g.fa=function(a){return this.k.e()?this:new O(this.k,a,this.yb)};g.Q=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?L:a};g.P=function(a){var b=K(a);return null===b?this:this.Q(b).P(N(a))};g.Da=function(a){return null!==this.k.get(a)};
g.T=function(a,b){D(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.fa(b);var c=new C(a,b),d,e;b.e()?(d=this.k.remove(a),c=Ac(this.yb,c,this.k)):(d=this.k.Oa(a,b),c=yc(this.yb,c,this.k));e=d.e()?L:this.aa;return new O(d,e,c)};g.F=function(a,b){var c=K(a);if(null===c)return b;D(".priority"!==K(a)||1===Ec(a),".priority must be the last token in a path");var d=this.Q(c).F(N(a),b);return this.T(c,d)};g.e=function(){return this.k.e()};g.Eb=function(){return this.k.count()};
var nd=/^(0|[1-9]\d*)$/;g=O.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.O(H,function(f,h){b[f]=h.H(a);c++;e&&nd.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Db){var a="";this.C().e()||(a+="priority:"+Fc(this.C().H())+":");this.O(H,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Db=""===a?"":Ob(a)}return this.Db};
g.Ve=function(a,b,c){return(c=od(this,c))?(a=ad(c,new C(a,b)))?a.name:null:ad(this.k,a)};function pd(a,b){var c;c=(c=od(a,b))?(c=c.Gc())&&c.name:a.k.Gc();return c?new C(c,a.k.get(c)):null}function qd(a,b){var c;c=(c=od(a,b))?(c=c.ec())&&c.name:a.k.ec();return c?new C(c,a.k.get(c)):null}g.O=function(a,b){var c=od(this,a);return c?c.ha(function(a){return b(a.name,a.R)}):this.k.ha(b)};g.Wb=function(a){return this.Xb(a.Hc(),a)};
g.Xb=function(a,b){var c=od(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.k.Xb(a.name,qb),d=cd(c);null!=d&&0>b.compare(d,a);)M(c),d=cd(c);return c};g.We=function(a){return this.Zb(a.Fc(),a)};g.Zb=function(a,b){var c=od(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.k.Zb(a.name,qb),d=cd(c);null!=d&&0<b.compare(d,a);)M(c),d=cd(c);return c};g.sc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===qc?-1:0};
g.nb=function(a){if(a===tc||Pa(this.yb.cc,a.toString()))return this;var b=this.yb,c=this.k;D(a!==tc,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(qb),f=M(c);f;)e=e||a.xc(f.R),d.push(f),f=M(c);d=e?zc(d,nc(a)):mc;e=a.toString();c=Ta(b.cc);c[e]=a;a=Ta(b.od);a[e]=d;return new O(this.k,this.aa,new xc(a,c))};g.yc=function(a){return a===tc||Pa(this.yb.cc,a.toString())};
g.Z=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().Z(a.C())&&this.k.count()===a.k.count()){var b=this.Wb(H);a=a.Wb(H);for(var c=M(b),d=M(a);c&&d;){if(c.name!==d.name||!c.R.Z(d.R))return!1;c=M(b);d=M(a)}return null===c&&null===d}return!1};function od(a,b){return b===tc?null:a.yb.get(b.toString())}g.toString=function(){return x(this.H(!0))};function G(a,b){if(null===a)return L;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);D(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Kb(a,G(c));if(a instanceof Array){var d=L,e=a;v(e,function(a,b){if(eb(e,b)&&"."!==b.substring(0,1)){var c=G(a);if(c.J()||!c.e())d=
d.T(b,c)}});return d.fa(G(c))}var f=[],h=!1,k=a;fb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=G(k[a]);b.e()||(h=h||!b.C().e(),f.push(new C(a,b)))}});if(0==f.length)return L;var m=zc(f,rb,function(a){return a.name},tb);if(h){var l=zc(f,nc(H));return new O(m,G(c),new xc({".priority":l},{".priority":H}))}return new O(m,G(c),Bc)}var rd=Math.log(2);
function sd(a){this.count=parseInt(Math.log(a+1)/rd,10);this.Oe=this.count-1;this.Cf=a+1&parseInt(Array(this.count+1).join("1"),2)}function td(a){var b=!(a.Cf&1<<a.Oe);a.Oe--;return b}
function zc(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new dd(u,l.R,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new dd(u,l.R,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],F=c?c(k):k,z=new dd(F,k.R,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var F=td(b),fd=Math.pow(2,b.count-(z+1));F?d(fd,!1):(d(fd,!1),d(fd,!0))}return l}(new sd(a.length));
return null!==f?new Zc(d||b,f):new Zc(d||b)}function Fc(a){return"number"===typeof a?"number:"+dc(a):"string:"+a}function Cc(a){if(a.J()){var b=a.H();D("string"===typeof b||"number"===typeof b||"object"===typeof b&&eb(b,".sv"),"Priority must be a string or number.")}else D(a===qc||a.e(),"priority of unexpected type.");D(a===qc||a.C().e(),"Priority nodes can't have a priority of their own.")}var L=new O(new Zc(tb),null,Bc);function ud(){O.call(this,new Zc(tb),L,Bc)}la(ud,O);g=ud.prototype;
g.sc=function(a){return a===this?0:1};g.Z=function(a){return a===this};g.C=function(){return this};g.Q=function(){return L};g.e=function(){return!1};var qc=new ud,oc=new C("[MIN_NAME]",L),vc=new C("[MAX_NAME]",qc);function vd(a,b){this.value=a;this.children=b||wd}var wd=new Zc(function(a,b){return a===b?0:a<b?-1:1});function xd(a){var b=R;v(a,function(a,d){b=b.set(new E(d),a)});return b}g=vd.prototype;g.e=function(){return null===this.value&&this.children.e()};function yd(a,b,c){if(null!=a.value&&c(a.value))return{path:Q,value:a.value};if(b.e())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=yd(a,N(b),c),null!=b?{path:(new E(d)).n(b.path),value:b.value}:null):null}
function zd(a,b){return yd(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(K(a));return null!==b?b.subtree(N(a)):R};g.set=function(a,b){if(a.e())return new vd(b,this.children);var c=K(a),d=(this.children.get(c)||R).set(N(a),b),c=this.children.Oa(c,d);return new vd(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?R:new vd(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(N(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?R:new vd(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(K(a));return b?b.get(N(a)):null};
function Ad(a,b,c){if(b.e())return c;var d=K(b);b=Ad(a.children.get(d)||R,N(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new vd(a.value,d)}function Bd(a,b){return Cd(a,Q,b)}function Cd(a,b,c){var d={};a.children.ha(function(a,f){d[a]=Cd(f,b.n(a),c)});return c(b,a.value,d)}function Dd(a,b,c){return Ed(a,b,Q,c)}function Ed(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=K(b);return(a=a.children.get(e))?Ed(a,N(b),c.n(e),d):null}
function Fd(a,b,c){Gd(a,b,Q,c)}function Gd(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?Gd(a,N(b),c.n(e),d):R}function Hd(a,b){Id(a,Q,b)}function Id(a,b,c){a.children.ha(function(a,e){Id(e,b.n(a),c)});a.value&&c(b,a.value)}function Jd(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var R=new vd(null);vd.prototype.toString=function(){var a={};Hd(this,function(b,c){a[b.toString()]=c.toString()});return x(a)};var Kd=/[\[\].#$\/\u0000-\u001F\u007F]/,Ld=/[\[\].#$\u0000-\u001F\u007F]/;function Md(a){return p(a)&&0!==a.length&&!Kd.test(a)}function Nd(a){return null===a||p(a)||ga(a)&&!Xb(a)||ia(a)&&eb(a,".sv")}function Od(a,b,c,d){d&&!n(b)||Pd(A(a,1,d),b,c)}
function Pd(a,b,c){c instanceof E&&(c=new Pc(c,a));if(!n(b))throw Error(a+"contains undefined "+Rc(c));if(ha(b))throw Error(a+"contains a function "+Rc(c)+" with contents: "+b.toString());if(Xb(b))throw Error(a+"contains "+b.toString()+" "+Rc(c));if(p(b)&&b.length>10485760/3&&10485760<nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Rc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;fb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Md(b)))throw Error(a+" contains an invalid key ("+b+") "+Rc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Pd(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Rc(c)+" in addition to actual children.");}}
function Qd(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Md(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Nc);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
function Rd(a,b,c){var d=A(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];fb(b,function(a,b){var k=new E(a);Pd(d,b,c.n(k));if(".priority"===Oc(k)&&!Nd(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});Qd(d,e)}
function Sd(a,b,c){if(Xb(c))throw Error(A(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Nd(c))throw Error(A(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Td(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(A(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Ud(a,b){if(n(b)&&!Md(b))throw Error(A(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function Vd(a,b){if(!p(b)||0===b.length||Ld.test(b))throw Error(A(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Wd(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}
function Xd(a,b){var c=b.path.toString(),d;!(d=!p(b.jc.host)||0===b.jc.host.length||!Md(b.jc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(p(c)&&0!==c.length&&!Ld.test(c)));if(d)throw Error(A(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function Gb(){this.k=this.B=null}Gb.prototype.find=function(a){if(null!=this.B)return this.B.P(a);if(a.e()||null==this.k)return null;var b=K(a);a=N(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Ib(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Gc);var d=K(b);a.k.contains(d)||a.k.add(d,new Gb);a=a.k.get(d);b=N(b);Ib(a,b,c)}}
function Yd(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.O(H,function(b,c){Ib(a,new E(b),c)});return Yd(a,b)}return null!==a.k?(c=K(b),b=N(b),a.k.contains(c)&&Yd(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Hb(a,b,c){null!==a.B?c(b,a.B):a.O(function(a,e){var f=new E(b.toString()+"/"+a);Hb(e,f,c)})}Gb.prototype.O=function(a){null!==this.k&&Hc(this.k,function(b,c){a(b,c)})};function Zd(a,b){this.type=$d;this.source=a;this.path=b}Zd.prototype.Mc=function(){return this.path.e()?new Zd(this.source,Q):new Zd(this.source,N(this.path))};Zd.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ae(a,b,c){this.type=be;this.source=a;this.path=b;this.children=c}ae.prototype.Mc=function(a){if(this.path.e())return a=this.children.subtree(new E(a)),a.e()?null:a.value?new ce(this.source,Q,a.value):new ae(this.source,Q,a);D(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new ae(this.source,N(this.path),this.children)};ae.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function de(a,b,c){this.type=ee;this.source=fe;this.path=a;this.Ob=b;this.Id=c}de.prototype.Mc=function(a){if(this.path.e()){if(null!=this.Ob.value)return D(this.Ob.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ob.subtree(new E(a));return new de(Q,a,this.Id)}D(K(this.path)===a,"operationForChild called for unrelated child.");return new de(N(this.path),this.Ob,this.Id)};
de.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Ob+")"};function ce(a,b,c){this.type=ge;this.source=a;this.path=b;this.Ga=c}ce.prototype.Mc=function(a){return this.path.e()?new ce(this.source,Q,this.Ga.Q(a)):new ce(this.source,N(this.path),this.Ga)};ce.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};var ge=0,be=1,ee=2,$d=3;function he(a,b,c,d){this.ee=a;this.Se=b;this.Hb=c;this.Ee=d;D(!d||b,"Tagged queries must be from server.")}var fe=new he(!0,!1,null,!1),ie=new he(!1,!0,null,!1);he.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Hb+")":"server"};function je(a,b,c){this.A=a;this.da=b;this.Sb=c}function ke(a){return a.da}function le(a){return a.Sb}function me(a,b){return b.e()?a.da&&!a.Sb:ne(a,K(b))}function ne(a,b){return a.da&&!a.Sb||a.A.Da(b)}je.prototype.j=function(){return this.A};function oe(a,b){this.N=a;this.Ld=b}function pe(a,b,c,d){return new oe(new je(b,c,d),a.Ld)}function qe(a){return a.N.da?a.N.j():null}oe.prototype.w=function(){return this.Ld};function re(a){return a.Ld.da?a.Ld.j():null};function se(){}se.prototype.Te=function(){return null};se.prototype.fe=function(){return null};var te=new se;function ue(a,b,c){this.xf=a;this.Ka=b;this.yd=c}ue.prototype.Te=function(a){var b=this.Ka.N;if(ne(b,a))return b.j().Q(a);b=null!=this.yd?new je(this.yd,!0,!1):this.Ka.w();return this.xf.qc(a,b)};ue.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:re(this.Ka);a=this.xf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function ve(a,b){this.Sd=a;this.Df=b}function we(a){this.U=a}
we.prototype.eb=function(a,b,c,d){var e=new xe,f;if(b.type===ge)b.source.ee?c=ye(this,a,b.path,b.Ga,c,d,e):(D(b.source.Se,"Unknown source."),f=b.source.Ee||le(a.w())&&!b.path.e(),c=ze(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===be)b.source.ee?c=Ae(this,a,b.path,b.children,c,d,e):(D(b.source.Se,"Unknown source."),f=b.source.Ee||le(a.w()),c=Be(this,a,b.path,b.children,c,d,f,e));else if(b.type===ee)if(b.Id)if(b=b.path,null!=c.lc(b))c=a;else{f=new ue(c,a,d);d=a.N.j();if(b.e()||".priority"===K(b))ke(a.w())?
b=c.Aa(re(a)):(b=a.w().j(),D(b instanceof O,"serverChildren would be complete if leaf node"),b=c.rc(b)),b=this.U.ya(d,b,e);else{var h=K(b),k=c.qc(h,a.w());null==k&&ne(a.w(),h)&&(k=d.Q(h));b=null!=k?this.U.F(d,h,k,N(b),f,e):a.N.j().Da(h)?this.U.F(d,h,L,N(b),f,e):d;b.e()&&ke(a.w())&&(d=c.Aa(re(a)),d.J()&&(b=this.U.ya(b,d,e)))}d=ke(a.w())||null!=c.lc(Q);c=pe(a,b,d,this.U.Na())}else c=Ce(this,a,b.path,b.Ob,c,d,e);else if(b.type===$d)d=b.path,b=a.w(),f=b.j(),h=b.da||d.e(),c=De(this,new oe(a.N,new je(f,
h,b.Sb)),d,c,te,e);else throw Mb("Unknown operation type: "+b.type);e=Na(e.fb);d=c;b=d.N;b.da&&(f=b.j().J()||b.j().e(),h=qe(a),(0<e.length||!a.N.da||f&&!b.j().Z(h)||!b.j().C().Z(h.C()))&&e.push(Ee(qe(d))));return new ve(c,e)};
function De(a,b,c,d,e,f){var h=b.N;if(null!=d.lc(c))return b;var k;if(c.e())D(ke(b.w()),"If change path is empty, we must have complete server data"),le(b.w())?(e=re(b),d=d.rc(e instanceof O?e:L)):d=d.Aa(re(b)),f=a.U.ya(b.N.j(),d,f);else{var m=K(c);if(".priority"==m)D(1==Ec(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ad(c,f,k),f=null!=d?a.U.fa(f,d):h.j();else{var l=N(c);ne(h,m)?(k=b.w().j(),d=d.ad(c,h.j(),k),d=null!=d?h.j().Q(m).F(l,d):h.j().Q(m)):d=d.qc(m,
b.w());f=null!=d?a.U.F(h.j(),m,d,l,e,f):h.j()}}return pe(b,f,h.da||c.e(),a.U.Na())}function ze(a,b,c,d,e,f,h,k){var m=b.w();h=h?a.U:a.U.Ub();if(c.e())d=h.ya(m.j(),d,null);else if(h.Na()&&!m.Sb)d=m.j().F(c,d),d=h.ya(m.j(),d,null);else{var l=K(c);if(!me(m,c)&&1<Ec(c))return b;var u=N(c);d=m.j().Q(l).F(u,d);d=".priority"==l?h.fa(m.j(),d):h.F(m.j(),l,d,u,te,null)}m=m.da||c.e();b=new oe(b.N,new je(d,m,h.Na()));return De(a,b,c,e,new ue(e,b,f),k)}
function ye(a,b,c,d,e,f,h){var k=b.N;e=new ue(e,b,f);if(c.e())h=a.U.ya(b.N.j(),d,h),a=pe(b,h,!0,a.U.Na());else if(f=K(c),".priority"===f)h=a.U.fa(b.N.j(),d),a=pe(b,h,k.da,k.Sb);else{c=N(c);var m=k.j().Q(f);if(!c.e()){var l=e.Te(f);d=null!=l?".priority"===Oc(c)&&l.P(c.parent()).e()?l:l.F(c,d):L}m.Z(d)?a=b:(h=a.U.F(k.j(),f,d,c,e,h),a=pe(b,h,k.da,a.U.Na()))}return a}
function Ae(a,b,c,d,e,f,h){var k=b;Hd(d,function(d,l){var u=c.n(d);ne(b.N,K(u))&&(k=ye(a,k,u,l,e,f,h))});Hd(d,function(d,l){var u=c.n(d);ne(b.N,K(u))||(k=ye(a,k,u,l,e,f,h))});return k}function Fe(a,b){Hd(b,function(b,d){a=a.F(b,d)});return a}
function Be(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!ke(b.w()))return b;var m=b;c=c.e()?d:Ad(R,c,d);var l=b.w().j();c.children.ha(function(c,d){if(l.Da(c)){var F=b.w().j().Q(c),F=Fe(F,d);m=ze(a,m,new E(c),F,e,f,h,k)}});c.children.ha(function(c,d){var F=!ne(b.w(),c)&&null==d.value;l.Da(c)||F||(F=b.w().j().Q(c),F=Fe(F,d),m=ze(a,m,new E(c),F,e,f,h,k))});return m}
function Ce(a,b,c,d,e,f,h){if(null!=e.lc(c))return b;var k=le(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.da||me(m,c))return ze(a,b,c,m.j().P(c),e,f,k,h);if(c.e()){var l=R;m.j().O(tc,function(a,b){l=l.set(new E(a),b)});return Be(a,b,c,l,e,f,k,h)}return b}l=R;Hd(d,function(a){var b=c.n(a);me(m,b)&&(l=l.set(a,m.j().P(b)))});return Be(a,b,c,l,e,f,k,h)};function Ge(a){this.V=a;this.g=a.m.g}function He(a,b,c,d){var e=[],f=[];ya(b,function(b){b.type===Ie&&a.g.nd(b.qe,b.Ja)&&f.push(new S(Je,b.Ja,b.Xa))});Ke(a,e,Le,b,d,c);Ke(a,e,Me,b,d,c);Ke(a,e,Je,f,d,c);Ke(a,e,Ie,b,d,c);Ke(a,e,Ne,b,d,c);return e}function Ke(a,b,c,d,e,f){d=za(d,function(a){return a.type===c});Ha(d,q(a.Ff,a));ya(d,function(c){var d=Oe(a,c,f);ya(e,function(e){e.nf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function Oe(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ve(b.Xa,b.Ja,a.g));return b}Ge.prototype.Ff=function(a,b){if(null==a.Xa||null==b.Xa)throw Mb("Should only compare child_ events.");return this.g.compare(new C(a.Xa,a.Ja),new C(b.Xa,b.Ja))};function Pe(a,b){this.V=a;var c=a.m,d=new Qe(c.g),c=T(c)?new Qe(c.g):c.xa?new Re(c):new Se(c);this.hf=new we(c);var e=b.w(),f=b.N,h=d.ya(L,e.j(),null),k=c.ya(L,f.j(),null);this.Ka=new oe(new je(k,f.da,c.Na()),new je(h,e.da,d.Na()));this.Za=[];this.Jf=new Ge(a)}function Te(a){return a.V}g=Pe.prototype;g.w=function(){return this.Ka.w().j()};g.hb=function(a){var b=re(this.Ka);return b&&(T(this.V.m)||!a.e()&&!b.Q(K(a)).e())?b.P(a):null};g.e=function(){return 0===this.Za.length};g.Nb=function(a){this.Za.push(a)};
g.kb=function(a,b){var c=[];if(b){D(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;ya(this.Za,function(a){(a=a.Me(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var h=this.Za[f];if(!h.matches(a))e.push(h);else if(a.Xe()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
g.eb=function(a,b,c){a.type===be&&null!==a.source.Hb&&(D(re(this.Ka),"We should always have a full cache before handling merges"),D(qe(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.hf.eb(d,a,b,c);b=this.hf;c=a.Sd;D(c.N.j().yc(b.U.g),"Event snap not indexed");D(c.w().j().yc(b.U.g),"Server snap not indexed");D(ke(a.Sd.w())||!ke(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.Sd;return Ue(this,a.Df,a.Sd.N.j(),null)};
function Ve(a,b){var c=a.Ka.N,d=[];c.j().J()||c.j().O(H,function(a,b){d.push(new S(Me,b,a))});c.da&&d.push(Ee(c.j()));return Ue(a,d,c.j(),b)}function Ue(a,b,c,d){return He(a.Jf,b,c,d?[d]:a.Za)};function We(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.hd=a}We.prototype.Yb=function(){var a=this.Md.wb();return"value"===this.hd?a.path:a.getParent().path};We.prototype.ge=function(){return this.hd};We.prototype.Tb=function(){return this.ae.Tb(this)};We.prototype.toString=function(){return this.Yb().toString()+":"+this.hd+":"+x(this.Md.be())};function Xe(a,b,c){this.ae=a;this.error=b;this.path=c}Xe.prototype.Yb=function(){return this.path};Xe.prototype.ge=function(){return"cancel"};
Xe.prototype.Tb=function(){return this.ae.Tb(this)};Xe.prototype.toString=function(){return this.path.toString()+":cancel"};function Ye(){this.vb=[]}function Ze(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.vb.push(c),c=null);null===c&&(c=new $e(f));c.add(e)}c&&a.vb.push(c)}function af(a,b,c){Ze(a,c);bf(a,function(a){return a.Z(b)})}function cf(a,b,c){Ze(a,c);bf(a,function(a){return a.contains(b)||b.contains(a)})}
function bf(a,b){for(var c=!0,d=0;d<a.vb.length;d++){var e=a.vb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.vb[d],f=0;f<e.jd.length;f++){var h=e.jd[f];if(null!==h){e.jd[f]=null;var k=h.Tb();Qb&&I("event: "+h.toString());fc(k)}}a.vb[d]=null}else c=!1}c&&(a.vb=[])}function $e(a){this.qa=a;this.jd=[]}$e.prototype.add=function(a){this.jd.push(a)};$e.prototype.Yb=function(){return this.qa};function Qe(a){this.g=a}g=Qe.prototype;g.F=function(a,b,c,d,e,f){D(a.yc(this.g),"A node must be indexed if only a child is updated");e=a.Q(b);if(e.P(d).Z(c.P(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?df(f,new S(Le,e,b)):D(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?df(f,new S(Me,c,b)):df(f,new S(Ie,c,b,e)));return a.J()&&c.e()?a:a.T(b,c).nb(this.g)};
g.ya=function(a,b,c){null!=c&&(a.J()||a.O(H,function(a,e){b.Da(a)||df(c,new S(Le,e,a))}),b.J()||b.O(H,function(b,e){if(a.Da(b)){var f=a.Q(b);f.Z(e)||df(c,new S(Ie,e,b,f))}else df(c,new S(Me,e,b))}));return b.nb(this.g)};g.fa=function(a,b){return a.e()?L:a.fa(b)};g.Na=function(){return!1};g.Ub=function(){return this};function Se(a){this.he=new Qe(a.g);this.g=a.g;var b;a.ka?(b=ef(a),b=a.g.Ec(ff(a),b)):b=a.g.Hc();this.Uc=b;a.na?(b=gf(a),a=a.g.Ec(hf(a),b)):a=a.g.Fc();this.vc=a}g=Se.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.vc)};g.F=function(a,b,c,d,e,f){this.matches(new C(b,c))||(c=L);return this.he.F(a,b,c,d,e,f)};
g.ya=function(a,b,c){b.J()&&(b=L);var d=b.nb(this.g),d=d.fa(L),e=this;b.O(H,function(a,b){e.matches(new C(a,b))||(d=d.T(a,L))});return this.he.ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.he};function Re(a){this.sa=new Se(a);this.g=a.g;D(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Ib=!jf(a)}g=Re.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new C(b,c))||(c=L);return a.Q(b).Z(c)?a:a.Eb()<this.oa?this.sa.Ub().F(a,b,c,d,e,f):kf(this,a,b,c,e,f)};
g.ya=function(a,b,c){var d;if(b.J()||b.e())d=L.nb(this.g);else if(2*this.oa<b.Eb()&&b.yc(this.g)){d=L.nb(this.g);b=this.Ib?b.Zb(this.sa.vc,this.g):b.Xb(this.sa.Uc,this.g);for(var e=0;0<b.Pa.length&&e<this.oa;){var f=M(b),h;if(h=this.Ib?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.vc))d=d.T(f.name,f.R),e++;else break}}else{d=b.nb(this.g);d=d.fa(L);var k,m,l;if(this.Ib){b=d.We(this.g);k=this.sa.vc;m=this.sa.Uc;var u=nc(this.g);l=function(a,b){return u(b,a)}}else b=d.Wb(this.g),k=this.sa.Uc,
m=this.sa.vc,l=nc(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=M(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=l(f,m))?e++:d=d.T(f.name,L)}return this.sa.Ub().ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.sa.Ub()};
function kf(a,b,c,d,e,f){var h;if(a.Ib){var k=nc(a.g);h=function(a,b){return k(b,a)}}else h=nc(a.g);D(b.Eb()==a.oa,"");var m=new C(c,d),l=a.Ib?pd(b,a.g):qd(b,a.g),u=a.sa.matches(m);if(b.Da(c)){for(var z=b.Q(c),l=e.fe(a.g,l,a.Ib);null!=l&&(l.name==c||b.Da(l.name));)l=e.fe(a.g,l,a.Ib);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&df(f,new S(Ie,d,c,z)),b.T(c,d);null!=f&&df(f,new S(Le,z,c));b=b.T(c,L);return null!=l&&a.sa.matches(l)?(null!=f&&df(f,new S(Me,l.R,l.name)),b.T(l.name,l.R)):b}return d.e()?
b:u&&0<=h(l,m)?(null!=f&&(df(f,new S(Le,l.R,l.name)),df(f,new S(Me,d,c))),b.T(c,d).T(l.name,L)):b};function S(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.qe=d;this.Dd=void 0}function Ee(a){return new S(Ne,a)}var Me="child_added",Le="child_removed",Ie="child_changed",Je="child_moved",Ne="value";function xe(){this.fb={}}
function df(a,b){var c=b.type,d=b.Xa;D(c==Me||c==Ie||c==Le,"Only child changes supported for tracking");D(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.fb,d);if(e){var f=e.type;if(c==Me&&f==Le)a.fb[d]=new S(Ie,b.Ja,d,e.Ja);else if(c==Le&&f==Me)delete a.fb[d];else if(c==Le&&f==Ie)a.fb[d]=new S(Le,e.qe,d);else if(c==Ie&&f==Me)a.fb[d]=new S(Me,b.Ja,d);else if(c==Ie&&f==Ie)a.fb[d]=new S(Ie,b.Ja,d,e.qe);else throw Mb("Illegal combination of changes: "+b+" occurred after "+
e);}else a.fb[d]=b};function lf(){this.Rb=this.na=this.Kb=this.ka=this.xa=!1;this.oa=0;this.mb="";this.dc=null;this.zb="";this.ac=null;this.xb="";this.g=H}var mf=new lf;function jf(a){return""===a.mb?a.ka:"l"===a.mb}function ff(a){D(a.ka,"Only valid if start has been set");return a.dc}function ef(a){D(a.ka,"Only valid if start has been set");return a.Kb?a.zb:"[MIN_NAME]"}function hf(a){D(a.na,"Only valid if end has been set");return a.ac}
function gf(a){D(a.na,"Only valid if end has been set");return a.Rb?a.xb:"[MAX_NAME]"}function nf(a){var b=new lf;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.dc=a.dc;b.Kb=a.Kb;b.zb=a.zb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.xb=a.xb;b.g=a.g;b.mb=a.mb;return b}g=lf.prototype;g.ne=function(a){var b=nf(this);b.xa=!0;b.oa=a;b.mb="l";return b};g.oe=function(a){var b=nf(this);b.xa=!0;b.oa=a;b.mb="r";return b};g.Nd=function(a,b){var c=nf(this);c.ka=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Kb=!0,c.zb=b):(c.Kb=!1,c.zb="");return c};
g.gd=function(a,b){var c=nf(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.xb=b):(c.vg=!1,c.xb="");return c};function of(a,b){var c=nf(a);c.g=b;return c}function pf(a){var b={};a.ka&&(b.sp=a.dc,a.Kb&&(b.sn=a.zb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.xb));if(a.xa){b.l=a.oa;var c=a.mb;""===c&&(c=jf(a)?"l":"r");b.vf=c}a.g!==H&&(b.i=a.g.toString());return b}function T(a){return!(a.ka||a.na||a.xa)}function qf(a){return T(a)&&a.g==H}
function rf(a){var b={};if(qf(a))return b;var c;a.g===H?c="$priority":a.g===wc?c="$value":a.g===tc?c="$key":(D(a.g instanceof pc,"Unrecognized index type!"),c=a.g.toString());b.orderBy=x(c);a.ka&&(b.startAt=x(a.dc),a.Kb&&(b.startAt+=","+x(a.zb)));a.na&&(b.endAt=x(a.ac),a.Rb&&(b.endAt+=","+x(a.xb)));a.xa&&(jf(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return x(pf(this))};function sf(a){this.W=a}var tf=new sf(new vd(null));function uf(a,b,c){if(b.e())return new sf(new vd(c));var d=zd(a.W,b);if(null!=d){var e=d.path,d=d.value;b=P(e,b);d=d.F(b,c);return new sf(a.W.set(e,d))}a=Ad(a.W,b,new vd(c));return new sf(a)}function vf(a,b,c){var d=a;fb(c,function(a,c){d=uf(d,b.n(a),c)});return d}sf.prototype.Ed=function(a){if(a.e())return tf;a=Ad(this.W,a,R);return new sf(a)};function wf(a,b){var c=zd(a.W,b);return null!=c?a.W.get(c.path).P(P(c.path,b)):null}
function xf(a){var b=[],c=a.W.value;null!=c?c.J()||c.O(H,function(a,c){b.push(new C(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new C(a,c.value))});return b}function yf(a,b){if(b.e())return a;var c=wf(a,b);return null!=c?new sf(new vd(c)):new sf(a.W.subtree(b))}sf.prototype.e=function(){return this.W.e()};sf.prototype.apply=function(a){return zf(Q,this.W,a)};
function zf(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(D(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=zf(a.n(b),f,c)});c.P(a).e()||null===d||(c=c.F(a.n(".priority"),d));return c};function Af(){this.Jd=L}Af.prototype.j=function(a){return this.Jd.P(a)};Af.prototype.toString=function(){return this.Jd.toString()};function Bf(a){this.oc=a}Bf.prototype.getToken=function(a){return this.oc.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(I("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Cf(a,b){a.oc.INTERNAL.addAuthTokenListener(b)};function Df(){this.S=tf;this.la=[];this.Bc=-1}function Ef(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Df.prototype;
g.Ed=function(a){var b=Ea(this.la,function(b){return b.Zc===a});D(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&Ff(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.S=Gf(this.la,Hf,Q),this.Bc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ga)this.S=this.S.Ed(c.path);else{var k=this;v(c.children,function(a,b){k.S=k.S.Ed(c.path.n(b))})}return!0}return!1};
g.Aa=function(a,b,c,d){if(c||d){var e=yf(this.S,a);return!d&&e.e()?b:d||null!=b||null!=wf(e,Q)?(e=Gf(this.la,function(b){return(b.visible||d)&&(!c||!(0<=xa(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||L,e.apply(b)):null}e=wf(this.S,a);if(null!=e)return e;e=yf(this.S,a);return e.e()?b:null!=b||null!=wf(e,Q)?(b=b||L,e.apply(b)):null};
g.rc=function(a,b){var c=L,d=wf(this.S,a);if(d)d.J()||d.O(H,function(a,b){c=c.T(a,b)});else if(b){var e=yf(this.S,a);b.O(H,function(a,b){var d=yf(e,new E(a)).apply(b);c=c.T(a,d)});ya(xf(e),function(a){c=c.T(a.name,a.R)})}else e=yf(this.S,a),ya(xf(e),function(a){c=c.T(a.name,a.R)});return c};g.ad=function(a,b,c,d){D(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.n(b);if(null!=wf(this.S,a))return null;a=yf(this.S,a);return a.e()?d.P(b):a.apply(d.P(b))};
g.qc=function(a,b,c){a=a.n(b);var d=wf(this.S,a);return null!=d?d:ne(c,b)?yf(this.S,a).apply(c.j().Q(b)):null};g.lc=function(a){return wf(this.S,a)};g.Xd=function(a,b,c,d,e,f){var h;a=yf(this.S,a);h=wf(a,Q);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.nb(f);if(h.e()||h.J())return[];b=[];a=nc(f);e=e?h.Zb(c,f):h.Xb(c,f);for(f=M(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=M(e);return b};
function Ff(a,b){return a.Ga?a.path.contains(b):!!Qa(a.children,function(c,d){return a.path.n(d).contains(b)})}function Hf(a){return a.visible}
function Gf(a,b,c){for(var d=tf,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=P(c,h),d=uf(d,h,f.Ga)):h.contains(c)&&(h=P(h,c),d=uf(d,Q,f.Ga.P(h)));else if(f.children)if(c.contains(h))h=P(c,h),d=vf(d,h,f.children);else{if(h.contains(c))if(h=P(h,c),h.e())d=vf(d,Q,f.children);else if(f=w(f.children,K(h)))f=f.P(N(h)),d=uf(d,Q,f)}else throw Mb("WriteRecord should have .snap or .children");}}return d}function If(a,b){this.Lb=a;this.W=b}g=If.prototype;
g.Aa=function(a,b,c){return this.W.Aa(this.Lb,a,b,c)};g.rc=function(a){return this.W.rc(this.Lb,a)};g.ad=function(a,b,c){return this.W.ad(this.Lb,a,b,c)};g.lc=function(a){return this.W.lc(this.Lb.n(a))};g.Xd=function(a,b,c,d,e){return this.W.Xd(this.Lb,a,b,c,d,e)};g.qc=function(a,b){return this.W.qc(this.Lb,a,b)};g.n=function(a){return new If(this.Lb.n(a),this.W)};function Jf(a,b){this.rf={};this.Vc=new Kf(a);this.va=b;var c=1E4+2E4*Math.random();hc(q(this.lf,this),Math.floor(c))}Jf.prototype.lf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&eb(this.rf,d)&&(b[d]=a[d],c=!0);c&&this.va.ye(b);hc(q(this.lf,this),Math.floor(6E5*Math.random()))};function Lf(){this.tc={}}function Mf(a,b,c){n(c)||(c=1);eb(a.tc,b)||(a.tc[b]=0);a.tc[b]+=c}Lf.prototype.get=function(){return Ta(this.tc)};function Kf(a){this.Ef=a;this.rd=null}Kf.prototype.get=function(){var a=this.Ef.get(),b=Ta(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};var Nf={},Of={};function Pf(a){a=a.toString();Nf[a]||(Nf[a]=new Lf);return Nf[a]}function Qf(a,b){var c=a.toString();Of[c]||(Of[c]=b());return Of[c]};function Rf(a,b,c){this.f=Tb("p:rest:");this.L=a;this.Gb=b;this.$c=c;this.$={}}function Sf(a,b){if(n(b))return"tag$"+b;D(qf(a.m),"should have a tag if it's not a default query.");return a.path.toString()}g=Rf.prototype;
g.$e=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ja());var f=Sf(a,c),h={};this.$[f]=h;a=rf(a.m);var k=this;Tf(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Gb(e,u,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.uf=function(a,b){var c=Sf(a,b);delete this.$[c]};g.kf=function(){};g.re=function(){};g.cf=function(){};g.xd=function(){};g.put=function(){};g.af=function(){};g.ye=function(){};
function Tf(a,b,c,d){c=c||{};c.format="export";a.$c.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.L.Sc?"https://":"http://")+a.L.host+b+"?"+gb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=lb(h.responseText)}catch(c){J("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
b)}else 401!==h.status&&404!==h.status&&J("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Uf(a){this.te=a;this.Bd=[];this.Qb=0;this.Yd=-1;this.Fb=null}function Vf(a,b,c){a.Yd=b;a.Fb=c;a.Yd<a.Qb&&(a.Fb(),a.Fb=null)}function Wf(a,b,c){for(a.Bd[b]=c;a.Bd[a.Qb];){var d=a.Bd[a.Qb];delete a.Bd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;fc(function(){f.te(d[e])})}if(a.Qb===a.Yd){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};var Cb="websocket",Db="long_polling";var Xf=null;"undefined"!==typeof MozWebSocket?Xf=MozWebSocket:"undefined"!==typeof WebSocket&&(Xf=WebSocket);function Yf(a,b,c,d){this.Zd=a;this.f=Tb(this.Zd);this.frames=this.zc=null;this.pb=this.qb=this.Fe=0;this.Va=Pf(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ke=Bb(b,Cb,a)}var Zf;
Yf.prototype.open=function(a,b){this.ib=b;this.Xf=a;this.f("Websocket connecting to "+this.Ke);this.wc=!1;xb.set("previous_websocket_failure",!0);try{this.Ia=new Xf(this.Ke)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.Ia.onopen=function(){e.f("Websocket connected.");e.wc=!0};this.Ia.onclose=function(){e.f("Websocket connection was disconnected.");e.Ia=null;e.bb()};this.Ia.onmessage=function(a){if(null!==e.Ia)if(a=a.data,e.pb+=
a.length,Mf(e.Va,"bytes_received",a.length),$f(e),null!==e.frames)ag(e,a);else{a:{D(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&ag(e,a)}};this.Ia.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};Yf.prototype.start=function(){};
Yf.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==Xf&&!Zf};Yf.responsesRequiredToBeHealthy=2;Yf.healthyTimeout=3E4;g=Yf.prototype;g.sd=function(){xb.remove("previous_websocket_failure")};function ag(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=lb(c);a.Xf(c)}}
g.send=function(a){$f(this);a=x(a);this.qb+=a.length;Mf(this.Va,"bytes_sent",a.length);a=bc(a,16384);1<a.length&&bg(this,String(a.length));for(var b=0;b<a.length;b++)bg(this,a[b])};g.Tc=function(){this.Ab=!0;this.zc&&(clearInterval(this.zc),this.zc=null);this.Ia&&(this.Ia.close(),this.Ia=null)};g.bb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.Tc(),this.ib&&(this.ib(this.wc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.Tc())};
function $f(a){clearInterval(a.zc);a.zc=setInterval(function(){a.Ia&&bg(a,"0");$f(a)},Math.floor(45E3))}function bg(a,b){try{a.Ia.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(q(a.bb,a),0)}};function cg(a,b,c,d){this.Zd=a;this.f=Tb(a);this.jc=b;this.pb=this.qb=0;this.Va=Pf(b);this.tf=c;this.wc=!1;this.Cb=d;this.Yc=function(a){return Bb(b,Db,a)}}var dg,eg;
cg.prototype.open=function(a,b){this.Ne=0;this.ia=b;this.bf=new Uf(a);this.Ab=!1;var c=this;this.sb=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.sb=null},Math.floor(3E4));Yb(function(){if(!c.Ab){c.Ta=new fg(function(a,b,d,k,m){gg(c,arguments);if(c.Ta)if(c.sb&&(clearTimeout(c.sb),c.sb=null),c.wc=!0,"start"==a)c.id=b,c.ff=d;else if("close"===a)b?(c.Ta.Kd=!1,Vf(c.bf,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){gg(c,arguments);
Wf(c.bf,a,b)},function(){c.bb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.Qd&&(a.cb=c.Ta.Qd);a.v="5";c.tf&&(a.s=c.tf);c.Cb&&(a.ls=c.Cb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);hg(c.Ta,a,function(){})}})};
cg.prototype.start=function(){var a=this.Ta,b=this.ff;a.Vf=this.id;a.Wf=b;for(a.Ud=!0;ig(a););a=this.id;b=this.ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.Yc(c);this.fc.style.display="none";document.body.appendChild(this.fc)};
cg.isAvailable=function(){return dg||!eg&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.rg)&&!0};g=cg.prototype;g.sd=function(){};g.Tc=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.sb&&(clearTimeout(this.sb),this.sb=null)};
g.bb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.Tc(),this.ia&&(this.ia(this.wc),this.ia=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=x(a);this.qb+=a.length;Mf(this.Va,"bytes_sent",a.length);a=mb(a);a=ab(a,!0);a=bc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.Qc.push({jg:this.Ne,pg:a.length,Pe:a[b]});c.Ud&&ig(c);this.Ne++}};function gg(a,b){var c=x(b).length;a.pb+=c;Mf(a.Va,"bytes_received",c)}
function fg(a,b,c,d){this.Yc=d;this.ib=c;this.ve=new Gc;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Lb();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||I("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.gb.open(),this.Ea.gb.write(a),this.Ea.gb.close()}catch(f){I("frame writing exception"),f.stack&&I(f.stack),I(f)}}
fg.prototype.close=function(){this.Ud=!1;if(this.Ea){this.Ea.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
function ig(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.Vf;b.pw=a.Wf;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Pe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.jg+"&ts"+d+"="+e.pg+"&d"+d+"="+e.Pe;d++}else break;jg(a,b+c,a.$d);return!0}return!1}function jg(a,b,c){function d(){a.ve.remove(c);ig(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));hg(a,b,function(){clearTimeout(e);d()})}
function hg(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ea.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){I("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ea.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};function kg(a){lg(this,a)}var mg=[cg,Yf];function lg(a,b){var c=Yf&&Yf.isAvailable(),d=c&&!(xb.Ze||!0===xb.get("previous_websocket_failure"));b.qg&&(c||J("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[Yf];else{var e=a.Wc=[];cc(mg,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function ng(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function og(a,b,c,d,e,f,h){this.id=a;this.f=Tb("c:"+this.id+":");this.te=c;this.Lc=d;this.ia=e;this.se=f;this.L=b;this.Ad=[];this.Le=0;this.sf=new kg(b);this.Ua=0;this.Cb=h;this.f("Connection created");pg(this)}
function pg(a){var b=ng(a.sf);a.I=new b("c:"+a.id+":"+a.Le++,a.L,void 0,a.Cb);a.xe=b.responsesRequiredToBeHealthy||0;var c=qg(a,a.I),d=rg(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=hc(function(){a.md=null;a.Bb||(a.I&&102400<a.I.pb?(a.f("Connection exceeded healthy timeout but has received "+a.I.pb+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.sd()):a.I&&10240<a.I.qb?a.f("Connection exceeded healthy timeout but has sent "+
a.I.qb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function rg(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.L.$a.substr(0,2)&&(xb.remove("host:"+a.L.host),a.L.$a=a.L.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
function qg(a,b){return function(c){if(2!=a.Ua)if(b===a.Rc){var d=$b("t",c);c=$b("d",c);if("c"==d){if(d=$b("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.qf=c.s;Ab(a.L,f);0==a.Ua&&(a.I.start(),sg(a,a.I,d),"5"!==e&&J("Protocol version mismatch detected"),c=a.sf,(c=1<c.Wc.length?c.Wc[1]:null)&&tg(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];ug(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.se&&(a.se(c),a.se=null),a.ia=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ab(a.L,c),1===a.Ua?a.close():(vg(a),pg(a))):"e"===d?Ub("Server Error: "+c):"o"===d?(a.f("got pong on primary."),wg(a),xg(a)):Ub("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=$b("t",c),c=$b("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?yg(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.pf--,yg(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}og.prototype.ua=function(a){zg(this,{t:"d",d:a})};function ug(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
function yg(a){0>=a.pf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,ug(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}og.prototype.wd=function(a){wg(this);this.te(a)};function wg(a){a.Bb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.sd()))}
function tg(a,b){a.D=new b("c:"+a.id+":"+a.Le++,a.L,a.qf);a.pf=b.responsesRequiredToBeHealthy||0;a.D.open(qg(a,a.D),rg(a,a.D));hc(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function sg(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Lc&&(a.Lc(c,a.qf),a.Lc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Bb=!0):hc(function(){xg(a)},Math.floor(5E3))}
function xg(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),zg(a,{t:"c",d:{t:"p",d:{}}}))}function zg(a,b){if(1!==a.Ua)throw"Connection is not connected";a.Xc.send(b)}og.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,vg(this),this.ia&&(this.ia(),this.ia=null))};function vg(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function Ag(a,b,c,d,e,f){this.id=Bg++;this.f=Tb("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Oc=0;this.Kc=[];this.ma=!1;this.Sa=1E3;this.td=3E5;this.Gb=b;this.Jc=c;this.ue=d;this.L=a;this.ob=this.Fa=this.Cb=this.ze=null;this.$c=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Vd=f;this.ub=null;this.Mb=!1;this.Gd={};this.ig=0;this.Re=!0;this.Ac=this.me=null;Cg(this,0);Mc.Vb().gc("visible",this.Zf,this);-1===a.host.indexOf("fblocal")&&
Lc.Vb().gc("online",this.Yf,this)}var Bg=0,Dg=0;g=Ag.prototype;g.ua=function(a,b,c){var d=++this.ig;a={r:d,a:a,b:b};this.f(x(a));D(this.ma,"sendRequest call when we're not connected not allowed.");this.Fa.ua(a);c&&(this.Gd[d]=c)};
g.$e=function(a,b,c,d){var e=a.ja(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};D(qf(a.m)||!T(a.m),"listen() called for non-default but complete query");D(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,eg:a,tag:c};this.$[f][e]=a;this.ma&&Eg(this,a)};
function Eg(a,b){var c=b.eg,d=c.path.toString(),e=c.ja();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=pf(c.m),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&eb(k,"w")){var l=w(k,"w");ea(l)&&0<=xa(l,"no_index")&&J("Using an unspecified index. Consider adding "+('".indexOn": "'+c.m.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Fg(a,d,e),b.G&&b.G(m,
k))})}g.kf=function(a){this.ob=a;this.f("Auth token refreshed");this.ob?Gg(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||kc(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Gg(a){if(a.ma&&a.ob){var b=a.ob,c=jc(b)?"auth":"gauth",d={cred:b};null===a.Vd?d.noauth=!0:"object"===typeof a.Vd&&(d.authvar=a.Vd);a.ua(c,d,function(c){var d=c.s;c=c.d||"error";a.ob===b&&("ok"===d?a.ke=0:Hg(a,d,c))})}}
g.uf=function(a,b){var c=a.path.toString(),d=a.ja();this.f("Unlisten called for "+c+" "+d);D(qf(a.m)||!T(a.m),"unlisten() called for non-default but complete query");if(Fg(this,c,d)&&this.ma){var e=pf(a.m);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.re=function(a,b,c){this.ma?Ig(this,"o",a,b,c):this.Kc.push({we:a,action:"o",data:b,G:c})};g.cf=function(a,b,c){this.ma?Ig(this,"om",a,b,c):this.Kc.push({we:a,action:"om",data:b,G:c})};
g.xd=function(a,b){this.ma?Ig(this,"oc",a,null,b):this.Kc.push({we:a,action:"oc",data:null,G:b})};function Ig(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Jg(this,"p",a,b,c,d)};g.af=function(a,b,c,d){Jg(this,"m",a,b,c,d)};function Jg(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,mf:d,G:e});a.Oc++;b=a.pa.length-1;a.ma?Kg(a,b):a.f("Buffering put: "+c)}
function Kg(a,b){var c=a.pa[b].action,d=a.pa[b].mf,e=a.pa[b].G;a.pa[b].fg=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Oc--;0===a.Oc&&(a.pa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.wd=function(a){if("r"in a){this.f("from server: "+x(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Gb(a.p,a.d,!1,a.t):"m"===b?this.Gb(a.p,a.d,!0,a.t):"c"===b?Lg(this,a.p,a.q):"ac"===b?Hg(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Ub("Unrecognized action received from server: "+
x(b)+"\nAre you using the latest client?"))}};g.Lc=function(a,b){this.f("connection ready");this.ma=!0;this.Ac=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Cb=b;if(this.Re){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;pb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Mg(this);this.Re=!1;this.Jc(!0)};
function Cg(a,b){D(!a.Fa,"Scheduling a connect when we're already connected/ing?");a.ub&&clearTimeout(a.ub);a.ub=setTimeout(function(){a.ub=null;Ng(a)},Math.floor(b))}g.Zf=function(a){a&&!this.Mb&&this.Sa===this.td&&(this.f("Window became visible.  Reducing delay."),this.Sa=1E3,this.Fa||Cg(this,0));this.Mb=a};g.Yf=function(a){a?(this.f("Browser went online."),this.Sa=1E3,this.Fa||Cg(this,0)):(this.f("Browser went offline.  Killing connection."),this.Fa&&this.Fa.close())};
g.df=function(){this.f("data client disconnected");this.ma=!1;this.Fa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.mf&&b.fg&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Oc--)}0===this.Oc&&(this.pa=[]);this.Gd={};Og(this)&&(this.Mb?this.Ac&&(3E4<(new Date).getTime()-this.Ac&&(this.Sa=1E3),this.Ac=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Sa=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Sa-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Cg(this,a),this.Sa=Math.min(this.td,1.3*this.Sa));this.Jc(!1)};
function Ng(a){if(Og(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Ac=null;var b=q(a.wd,a),c=q(a.Lc,a),d=q(a.df,a),e=a.id+":"+Dg++,f=a.Cb,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Fa={close:m,ua:function(a){D(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var l=a.de;a.de=!1;a.$c.getToken(l).then(function(l){h?I("getToken() completed but was canceled"):(I("getToken() completed. Creating connection."),a.ob=l&&l.accessToken,k=new og(e,a.L,b,c,d,function(b){J(b+
" ("+a.L.toString()+")");a.ab("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.ab=function(a){I("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Fa?this.Fa.close():(this.ub&&(clearTimeout(this.ub),this.ub=null),this.ma&&this.df())};g.kc=function(a){I("Resuming connection for reason: "+a);delete this.qd[a];Sa(this.qd)&&(this.Sa=1E3,this.Fa||Cg(this,0))};
function Lg(a,b,c){c=c?Aa(c,function(a){return ac(a)}).join("$"):"default";(a=Fg(a,b,c))&&a.G&&a.G("permission_denied")}function Fg(a,b,c){b=(new E(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===La(a.$[b])&&delete a.$[b]):d=void 0;return d}
function Hg(a,b,c){I("Auth token revoked: "+b+"/"+c);a.ob=null;a.de=!0;a.Fa.close();if("invalid_token"===b||"permission_denied"===b)a.ke++,3<=a.ke&&(a.Sa=3E4,a=a.$c,b='Provided authentication credentials for the app named "'+a.oc.name+'" are invalid. This usually indicates your app was not initialized correctly. ',b="credential"in a.oc.options?b+'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in
a.oc.options?b+'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':b+'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',J(b))}
function Mg(a){Gg(a);v(a.$,function(b){v(b,function(b){Eg(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Kg(a,b);for(;a.Kc.length;)b=a.Kc.shift(),Ig(a,b.action,b.we,b.data,b.G)}function Og(a){var b;b=Lc.Vb().hc;return Sa(a.qd)&&b};function Pg(a){a instanceof Qg||Vb("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new U(a,Q);this.INTERNAL=new Rg(this)}var Sg={TIMESTAMP:{".sv":"timestamp"}};g=Pg.prototype;g.app=null;g.jf=function(a){Tg(this,"ref");y("database.ref",0,1,arguments.length);return n(a)?this.ba.n(a):this.ba};
g.gg=function(a){Tg(this,"database.refFromURL");y("database.refFromURL",1,1,arguments.length);var b=Wb(a);Xd("database.refFromURL",b);var c=b.jc;c.host!==this.ta.L.host&&Vb("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.L.host+")");return this.jf(b.path.toString())};function Tg(a,b){null===a.ta&&Vb("Cannot call "+b+" on a deleted database.")}g.Pf=function(){y("database.goOffline",0,0,arguments.length);Tg(this,"goOffline");this.ta.ab()};
g.Qf=function(){y("database.goOnline",0,0,arguments.length);Tg(this,"goOnline");this.ta.kc()};Object.defineProperty(Pg.prototype,"app",{get:function(){return this.ta.app}});function Rg(a){this.Ya=a}Rg.prototype.delete=function(){Tg(this.Ya,"delete");var a=Ug.Vb(),b=this.Ya.ta;w(a.lb,b.app.name)!==b&&Vb("Database "+b.app.name+" has already been deleted.");b.ab();delete a.lb[b.app.name];this.Ya.ta=null;this.Ya.ba=null;this.Ya=this.Ya.INTERNAL=null;return firebase.Promise.resolve()};
Pg.prototype.ref=Pg.prototype.jf;Pg.prototype.refFromURL=Pg.prototype.gg;Pg.prototype.goOnline=Pg.prototype.Qf;Pg.prototype.goOffline=Pg.prototype.Pf;Rg.prototype["delete"]=Rg.prototype.delete;function V(a,b,c){this.A=a;this.V=b;this.g=c}V.prototype.H=function(){y("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};V.prototype.val=V.prototype.H;V.prototype.be=function(){y("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};V.prototype.exportVal=V.prototype.be;V.prototype.toJSON=function(){y("Firebase.DataSnapshot.toJSON",0,1,arguments.length);return this.be()};V.prototype.toJSON=V.prototype.toJSON;
V.prototype.Lf=function(){y("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};V.prototype.exists=V.prototype.Lf;V.prototype.n=function(a){y("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Vd("Firebase.DataSnapshot.child",a);var b=new E(a),c=this.V.n(b);return new V(this.A.P(b),c,H)};V.prototype.child=V.prototype.n;
V.prototype.Da=function(a){y("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Vd("Firebase.DataSnapshot.hasChild",a);var b=new E(a);return!this.A.P(b).e()};V.prototype.hasChild=V.prototype.Da;V.prototype.C=function(){y("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};V.prototype.getPriority=V.prototype.C;
V.prototype.forEach=function(a){y("Firebase.DataSnapshot.forEach",1,1,arguments.length);B("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.O(this.g,function(c,d){return a(new V(d,b.V.n(c),H))})};V.prototype.forEach=V.prototype.forEach;V.prototype.kd=function(){y("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};V.prototype.hasChildren=V.prototype.kd;
V.prototype.getKey=function(){y("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.getKey()};gc(V.prototype,"key",V.prototype.getKey);V.prototype.Eb=function(){y("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Eb()};V.prototype.numChildren=V.prototype.Eb;V.prototype.wb=function(){y("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};gc(V.prototype,"ref",V.prototype.wb);function Vg(a,b,c){this.Pb=a;this.rb=b;this.tb=c||null}g=Vg.prototype;g.nf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.m.g;return new We("value",this,new V(a.Ja,b.wb(),c))};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){D(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Md)}};g.Me=function(a,b){return this.rb?new Xe(this,a,b):null};
g.matches=function(a){return a instanceof Vg?a.Pb&&this.Pb?a.Pb===this.Pb&&a.tb===this.tb:!0:!1};g.Xe=function(){return null!==this.Pb};function Wg(a,b,c){this.ga=a;this.rb=b;this.tb=c}g=Wg.prototype;g.nf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};g.Me=function(a,b){return this.rb?new Xe(this,a,b):null};
g.createEvent=function(a,b){D(null!=a.Xa,"Child events should have a childName.");var c=b.wb().n(a.Xa);return new We(a.type,this,new V(a.Ja,c,b.m.g),a.Dd)};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){D(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.ga[a.hd];return function(){d.call(b,a.Md,a.Dd)}};
g.matches=function(a){if(a instanceof Wg){if(!this.ga||!a.ga)return!0;if(this.tb===a.tb){var b=La(a.ga);if(b===La(this.ga)){if(1===b){var b=Ma(a.ga),c=Ma(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return Ka(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};g.Xe=function(){return null!==this.ga};function Xg(){this.za={}}g=Xg.prototype;g.e=function(){return Sa(this.za)};g.eb=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=w(this.za,d),D(null!=d,"SyncTree gave us an op for an invalid query."),d.eb(a,b,c);var e=[];v(this.za,function(d){e=e.concat(d.eb(a,b,c))});return e};g.Nb=function(a,b,c,d,e){var f=a.ja(),h=w(this.za,f);if(!h){var h=c.Aa(e?d:null),k=!1;h?k=!0:(h=d instanceof O?c.rc(d):L,k=!1);h=new Pe(a,new oe(new je(h,k,!1),new je(d,e,!1)));this.za[f]=h}h.Nb(b);return Ve(h,b)};
g.kb=function(a,b,c){var d=a.ja(),e=[],f=[],h=null!=Yg(this);if("default"===d){var k=this;v(this.za,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.za[d],T(a.V.m)||e.push(a.V))})}else{var m=w(this.za,d);m&&(f=f.concat(m.kb(b,c)),m.e()&&(delete this.za[d],T(m.V.m)||e.push(m.V)))}h&&null==Yg(this)&&e.push(new U(a.u,a.path));return{hg:e,Kf:f}};function Zg(a){return za(Na(a.za),function(a){return!T(a.V.m)})}g.hb=function(a){var b=null;v(this.za,function(c){b=b||c.hb(a)});return b};
function $g(a,b){if(T(b.m))return Yg(a);var c=b.ja();return w(a.za,c)}function Yg(a){return Ra(a.za,function(a){return T(a.V.m)})||null};function ah(a){this.wa=R;this.jb=new Df;this.De={};this.ic={};this.Cc=a}function bh(a,b,c,d,e){var f=a.jb,h=e;D(d>f.Bc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.la.push({path:b,Ga:c,Zc:d,visible:h});h&&(f.S=uf(f.S,b,c));f.Bc=d;return e?ch(a,new ce(fe,b,c)):[]}function dh(a,b,c,d){var e=a.jb;D(d>e.Bc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.S=vf(e.S,b,c);e.Bc=d;c=xd(c);return ch(a,new ae(fe,b,c))}
function eh(a,b,c){c=c||!1;var d=Ef(a.jb,b);if(a.jb.Ed(b)){var e=R;null!=d.Ga?e=e.set(Q,!0):fb(d.children,function(a,b){e=e.set(new E(a),b)});return ch(a,new de(d.path,e,c))}return[]}function fh(a,b,c){c=xd(c);return ch(a,new ae(ie,b,c))}function gh(a,b,c,d){d=hh(a,d);if(null!=d){var e=ih(d);d=e.path;e=e.Hb;b=P(d,b);c=new ce(new he(!1,!0,e,!0),b,c);return jh(a,d,c)}return[]}
function kh(a,b,c,d){if(d=hh(a,d)){var e=ih(d);d=e.path;e=e.Hb;b=P(d,b);c=xd(c);c=new ae(new he(!1,!0,e,!0),b,c);return jh(a,d,c)}return[]}
ah.prototype.Nb=function(a,b){var c=a.path,d=null,e=!1;Fd(this.wa,c,function(a,b){var f=P(a,c);d=d||b.hb(f);e=e||null!=Yg(b)});var f=this.wa.get(c);f?(e=e||null!=Yg(f),d=d||f.hb(Q)):(f=new Xg,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=L,Jd(this.wa.subtree(c),function(a,b){var c=b.hb(Q);c&&(d=d.T(a,c))}));var k=null!=$g(f,a);if(!k&&!T(a.m)){var m=lh(a);D(!(m in this.ic),"View does not exist, but we have a tag");var l=mh++;this.ic[m]=l;this.De["_"+l]=m}h=f.Nb(a,b,new If(c,this.jb),d,h);k||
e||(f=$g(f,a),h=h.concat(nh(this,a,f)));return h};
ah.prototype.kb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ja()||null!=$g(e,a))){f=e.kb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.hg;f=f.Kf;b=-1!==Ea(e,function(a){return T(a.m)});var h=Dd(this.wa,d,function(a,b){return null!=Yg(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=oh(d),k=0;k<d.length;++k){var m=d[k],l=m.V,m=ph(this,m);this.Cc.Ae(qh(l),rh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Cc.Od(qh(a),null);else{var u=this;ya(e,function(a){a.ja();
var b=u.ic[lh(a)];u.Cc.Od(qh(a),b)})}sh(this,e)}return f};ah.prototype.Aa=function(a,b){var c=this.jb,d=Dd(this.wa,a,function(b,c){var d=P(b,a);if(d=c.hb(d))return d});return c.Aa(a,d,b,!0)};function oh(a){return Bd(a,function(a,c,d){if(c&&null!=Yg(c))return[Yg(c)];var e=[];c&&(e=Zg(c));v(d,function(a){e=e.concat(a)});return e})}function sh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!T(d.m)){var d=lh(d),e=a.ic[d];delete a.ic[d];delete a.De["_"+e]}}}
function qh(a){return T(a.m)&&!qf(a.m)?a.wb():a}function nh(a,b,c){var d=b.path,e=rh(a,b);c=ph(a,c);b=a.Cc.Ae(qh(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)D(null==Yg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Bd(d,function(a,b,c){if(!a.e()&&b&&null!=Yg(b))return[Te(Yg(b))];var d=[];b&&(d=d.concat(Aa(Zg(b),function(a){return a.V})));v(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Cc.Od(qh(c),rh(a,c));return b}
function ph(a,b){var c=b.V,d=rh(a,c);return{ld:function(){return(b.w()||L).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=hh(a,d)){var h=ih(b);b=h.path;h=h.Hb;f=P(b,f);f=new Zd(new he(!1,!0,h,!0),f);b=jh(a,b,f)}else b=[]}else b=ch(a,new Zd(ie,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function lh(a){return a.path.toString()+"$"+a.ja()}function ih(a){var b=a.indexOf("$");D(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new E(a.substr(0,b))}}function hh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function rh(a,b){var c=lh(b);return w(a.ic,c)}var mh=1;
function jh(a,b,c){var d=a.wa.get(b);D(d,"Missing sync point for query tag that we're tracking");return d.eb(c,new If(b,a.jb),null)}function ch(a,b){return th(a,b,a.wa,null,new If(Q,a.jb))}function th(a,b,c,d,e){if(b.path.e())return uh(a,b,c,d,e);var f=c.get(Q);null==d&&null!=f&&(d=f.hb(Q));var h=[],k=K(b.path),m=b.Mc(k);if((c=c.children.get(k))&&m)var l=d?d.Q(k):null,k=e.n(k),h=h.concat(th(a,m,c,l,k));f&&(h=h.concat(f.eb(b,e,d)));return h}
function uh(a,b,c,d,e){var f=c.get(Q);null==d&&null!=f&&(d=f.hb(Q));var h=[];c.children.ha(function(c,f){var l=d?d.Q(c):null,u=e.n(c),z=b.Mc(c);z&&(h=h.concat(uh(a,z,f,l,u)))});f&&(h=h.concat(f.eb(b,e,d)));return h};function Qg(a,b,c){this.app=c;var d=new Bf(c);this.L=a;this.Va=Pf(a);this.Vc=null;this.ca=new Ye;this.vd=1;this.Ra=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new Rf(this.L,q(this.Gb,this),d),setTimeout(q(this.Jc,this,!0),0);else{b=c.options.databaseAuthVariableOverride;if("undefined"!==da(b)&&null!==b){if("object"!==da(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
try{x(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ra=new Ag(this.L,q(this.Gb,this),q(this.Jc,this),q(this.ue,this),d,b)}var f=this;Cf(d,function(a){f.va.kf(a)});this.og=Qf(a,q(function(){return new Jf(this.Va,this.va)},this));this.mc=new Tc;this.ie=new Af;this.pd=new ah({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=ch(f.pd,new ce(ie,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:ba});vh(this,"connected",!1);this.ia=new Gb;this.Ya=new Pg(this);this.fd=
0;this.je=null;this.K=new ah({Ae:function(a,b,c,d){f.va.$e(a,c,b,function(b,c){var e=d(b,c);cf(f.ca,a.path,e)});return[]},Od:function(a,b){f.va.uf(a,b)}})}g=Qg.prototype;g.toString=function(){return(this.L.Sc?"https://":"http://")+this.L.host};g.name=function(){return this.L.pe};function wh(a){a=a.ie.j(new E(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function xh(a){a=a={timestamp:wh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Gb=function(a,b,c,d){this.fd++;var e=new E(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=Ja(b,function(a){return G(a)}),a=kh(this.K,e,b,d)):(b=G(b),a=gh(this.K,e,b,d)):c?(d=Ja(b,function(a){return G(a)}),a=fh(this.K,e,d)):(d=G(b),a=ch(this.K,new ce(ie,e,d)));d=e;0<a.length&&(d=yh(this,e));cf(this.ca,d,a)};g.Jc=function(a){vh(this,"connected",a);!1===a&&zh(this)};g.ue=function(a){var b=this;cc(a,function(a,d){vh(b,d,a)})};
function vh(a,b,c){b=new E("/.info/"+b);c=G(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=ch(a.pd,new ce(ie,b,c));cf(a.ca,b,c)}g.Jb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,ug:c});var e=xh(this);b=G(b,c);var e=Jb(b,e),f=this.vd++,e=bh(this.K,a,e,f,!0);Ze(this.ca,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||J("set at "+a+" failed: "+b);e=eh(h.K,f,!e);cf(h.ca,a,e);Ah(d,b,c)});e=Bh(this,a);yh(this,e);cf(this.ca,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=xh(this),f={};v(b,function(a,b){d=!1;var c=G(a);f[b]=Jb(c,e)});if(d)I("update() called with empty data.  Don't do anything."),Ah(c,"ok");else{var h=this.vd++,k=dh(this.K,a,f,h);Ze(this.ca,k);var m=this;this.va.af(a.toString(),b,function(b,d){var e="ok"===b;e||J("update at "+a+" failed: "+b);var e=eh(m.K,h,!e),f=a;0<e.length&&(f=yh(m,a));cf(m.ca,f,e);Ah(c,b,d)});v(b,function(b,c){var d=Bh(m,a.n(c));yh(m,d)});cf(this.ca,
a,[])}};function zh(a){a.f("onDisconnectEvents");var b=xh(a),c=[];Hb(Fb(a.ia,b),Q,function(b,e){c=c.concat(ch(a.K,new ce(ie,b,e)));var f=Bh(a,b);yh(a,f)});a.ia=new Gb;cf(a.ca,Q,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&Yd(c.ia,a);Ah(b,d,e)})};function Ch(a,b,c,d){var e=G(c);a.va.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&Ib(a.ia,b,e);Ah(d,c,h)})}
function Dh(a,b,c,d,e){var f=G(c,d);a.va.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&Ib(a.ia,b,f);Ah(e,c,d)})}function Eh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(I("onDisconnect().update() called with empty data.  Don't do anything."),Ah(d,"ok")):a.va.cf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=G(c[m]);Ib(a.ia,b.n(m),l)}Ah(d,e,f)})}function Fh(a,b,c){c=".info"===K(b.path)?a.pd.Nb(b,c):a.K.Nb(b,c);af(a.ca,b.path,c)}g.ab=function(){this.Ra&&this.Ra.ab("repo_interrupt")};
g.kc=function(){this.Ra&&this.Ra.kc("repo_interrupt")};g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Kf(this.Va)),a=this.Vc.get()):a=this.Va.get();var b=Ba(Oa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){Mf(this.Va,a);this.og.rf[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");I(b,arguments)};
function Ah(a,b,c){a&&fc(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Gh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.gc("value",f);c={path:b,update:c,G:d,status:null,ef:Lb(),He:e,of:0,Rd:function(){h.Ic("value",f)},Td:null,Ba:null,cd:null,dd:null,ed:null};d=a.K.Aa(b,void 0)||L;c.cd=d;d=c.update(d.H());if(n(d)){Pd("transaction failed: Data returned ",d,c.path);c.status=1;e=Uc(a.mc,b);var k=e.Ca()||[];k.push(c);Vc(e,k);"object"===typeof d&&null!==d&&eb(d,".priority")?(k=w(d,".priority"),D(Nd(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.K.Aa(b)||L).C().H();e=xh(a);d=G(d,k);e=Jb(d,e);c.dd=d;c.ed=e;c.Ba=a.vd++;c=bh(a.K,b,e,c.Ba,c.He);cf(a.ca,b,c);Hh(a)}else c.Rd(),c.dd=null,c.ed=null,c.G&&(a=new V(c.cd,new U(a,c.path),H),c.G(null,!1,a))}function Hh(a,b){var c=b||a.mc;b||Ih(a,c);if(null!==c.Ca()){var d=Jh(a,c);D(0<d.length,"Sending zero length transaction queue");Ca(d,function(a){return 1===a.status})&&Kh(a,c.path(),d)}else c.kd()&&c.O(function(b){Hh(a,b)})}
function Kh(a,b,c){for(var d=Aa(c,function(a){return a.Ba}),e=a.K.Aa(b,d)||L,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];D(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.of++;var k=P(b,h.path),d=d.F(k,h.dd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(eh(a.K,c[f].Ba));if(c[f].G){var h=c[f].ed,k=new U(a,c[f].path);d.push(q(c[f].G,
null,null,!0,new V(h,k,H)))}c[f].Rd()}Ih(a,Uc(a.mc,b));Hh(a);cf(a.ca,b,e);for(f=0;f<d.length;f++)fc(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(J("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;yh(a,b)}},e)}function yh(a,b){var c=Lh(a,b),d=c.path(),c=Jh(a,c);Mh(a,c,d);return d}
function Mh(a,b,c){if(0!==b.length){for(var d=[],e=[],f=za(b,function(a){return 1===a.status}),f=Aa(f,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],m=P(c,k.path),l=!1,u;D(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(eh(a.K,k.Ba,!0));else if(1===k.status)if(25<=k.of)l=!0,u="maxretry",e=e.concat(eh(a.K,k.Ba,!0));else{var z=a.K.Aa(k.path,f)||L;k.cd=z;var F=b[h].update(z.H());n(F)?(Pd("transaction failed: Data returned ",F,
k.path),m=G(F),"object"===typeof F&&null!=F&&eb(F,".priority")||(m=m.fa(z.C())),z=k.Ba,F=xh(a),F=Jb(m,F),k.dd=m,k.ed=F,k.Ba=a.vd++,Fa(f,z),e=e.concat(bh(a.K,k.path,F,k.Ba,k.He)),e=e.concat(eh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(eh(a.K,k.Ba,!0)))}cf(a.ca,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(q(b[h].G,null,null,!1,new V(b[h].cd,k,H)))):d.push(q(b[h].G,null,Error(u),!1,null))))}Ih(a,a.mc);for(h=0;h<d.length;h++)fc(d[h]);Hh(a)}}
function Lh(a,b){for(var c,d=a.mc;null!==(c=K(b))&&null===d.Ca();)d=Uc(d,c),b=N(b);return d}function Jh(a,b){var c=[];Nh(a,b,c);c.sort(function(a,b){return a.ef-b.ef});return c}function Nh(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.O(function(b){Nh(a,b,c)})}function Ih(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Vc(b,0<c.length?c:null)}b.O(function(b){Ih(a,b)})}
function Bh(a,b){var c=Lh(a,b).path(),d=Uc(a.mc,b);Yc(d,function(b){Oh(a,b)});Oh(a,d);Xc(d,function(b){Oh(a,b)});return c}
function Oh(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(D(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(D(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(eh(a.K,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?Vc(b,null):c.length=f+1;cf(a.ca,b.path(),e);for(h=0;h<d.length;h++)fc(d[h])}};function Ug(){this.lb={};this.wf=!1}Ug.prototype.ab=function(){for(var a in this.lb)this.lb[a].ab()};Ug.prototype.kc=function(){for(var a in this.lb)this.lb[a].kc()};Ug.prototype.ce=function(a){this.wf=a};ca(Ug);Ug.prototype.interrupt=Ug.prototype.ab;Ug.prototype.resume=Ug.prototype.kc;var W={};W.nc=Ag;W.DataConnection=W.nc;Ag.prototype.ng=function(a,b){this.ua("q",{p:a},b)};W.nc.prototype.simpleListen=W.nc.prototype.ng;Ag.prototype.Hf=function(a,b){this.ua("echo",{d:a},b)};W.nc.prototype.echo=W.nc.prototype.Hf;Ag.prototype.interrupt=Ag.prototype.ab;W.zf=og;W.RealTimeConnection=W.zf;og.prototype.sendRequest=og.prototype.ua;og.prototype.close=og.prototype.close;
W.Rf=function(a){var b=Ag.prototype.put;Ag.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Ag.prototype.put=b}};W.hijackHash=W.Rf;W.yf=zb;W.ConnectionTarget=W.yf;W.ja=function(a){return a.ja()};W.queryIdentifier=W.ja;W.Uf=function(a){return a.u.Ra.$};W.listens=W.Uf;W.ce=function(a){Ug.Vb().ce(a)};W.forceRestClient=W.ce;W.Context=Ug;function Ph(a,b){this.committed=a;this.snapshot=b};function X(a,b,c,d){this.u=a;this.path=b;this.m=c;this.Nc=d}
function Qh(a){var b=null,c=null;a.ka&&(b=ff(a));a.na&&(c=hf(a));if(a.g===tc){if(a.ka){if("[MIN_NAME]"!=ef(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=gf(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===H){if(null!=b&&!Nd(b)||null!=c&&!Nd(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(D(a.g instanceof pc||a.g===wc,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function Rh(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.mb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Sh(a,b){if(!0===a.Nc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.wb=function(){y("Query.ref",0,0,arguments.length);return new U(this.u,this.path)};
g.gc=function(a,b,c,d){y("Query.on",2,4,arguments.length);Td("Query.on",a,!1);B("Query.on",2,b,!1);var e=Th("Query.on",c,d);if("value"===a)Fh(this.u,this,new Vg(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Fh(this.u,this,new Wg(f,e.cancel,e.Ma))}return b};
g.Ic=function(a,b,c){y("Query.off",0,3,arguments.length);Td("Query.off",a,!0);B("Query.off",2,b,!0);ob("Query.off",3,c);var d=null,e=null;"value"===a?d=new Vg(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new Wg(e,null,c||null));e=this.u;d=".info"===K(this.path)?e.pd.kb(this,d):e.K.kb(this,d);af(e.ca,this.path,d)};
g.$f=function(a,b){function c(k){f&&(f=!1,e.Ic(a,c),b&&b.call(d.Ma,k),h.resolve(k))}y("Query.once",1,4,arguments.length);Td("Query.once",a,!1);B("Query.once",2,b,!0);var d=Th("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new ib;kb(h.ra);this.gc(a,c,function(b){e.Ic(a,c);d.cancel&&d.cancel.call(d.Ma,b);h.reject(b)});return h.ra};
g.ne=function(a){y("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.ne(a),this.Nc)};
g.oe=function(a){y("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.oe(a),this.Nc)};
g.ag=function(a){y("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Vd("Query.orderByChild",a);Sh(this,"Query.orderByChild");var b=new E(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
b=new pc(b);b=of(this.m,b);Qh(b);return new X(this.u,this.path,b,!0)};g.bg=function(){y("Query.orderByKey",0,0,arguments.length);Sh(this,"Query.orderByKey");var a=of(this.m,tc);Qh(a);return new X(this.u,this.path,a,!0)};g.cg=function(){y("Query.orderByPriority",0,0,arguments.length);Sh(this,"Query.orderByPriority");var a=of(this.m,H);Qh(a);return new X(this.u,this.path,a,!0)};
g.dg=function(){y("Query.orderByValue",0,0,arguments.length);Sh(this,"Query.orderByValue");var a=of(this.m,wc);Qh(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){y("Query.startAt",0,2,arguments.length);Od("Query.startAt",a,this.path,!0);Ud("Query.startAt",b);var c=this.m.Nd(a,b);Rh(c);Qh(c);if(this.m.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new X(this.u,this.path,c,this.Nc)};
g.gd=function(a,b){y("Query.endAt",0,2,arguments.length);Od("Query.endAt",a,this.path,!0);Ud("Query.endAt",b);var c=this.m.gd(a,b);Rh(c);Qh(c);if(this.m.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Nc)};
g.If=function(a,b){y("Query.equalTo",1,2,arguments.length);Od("Query.equalTo",a,this.path,!1);Ud("Query.equalTo",b);if(this.m.ka)throw Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");if(this.m.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).gd(a,b)};
g.toString=function(){y("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.toJSON=function(){y("Query.toJSON",0,1,arguments.length);return this.toString()};g.ja=function(){var a=ac(pf(this.m));return"{}"===a?"default":a};
g.isEqual=function(a){y("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.Z(a.path),d=this.ja()===a.ja();return b&&c&&d};
function Th(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,B(a,3,d.cancel,!0),d.Ma=c,ob(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(A(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.gc;X.prototype.off=X.prototype.Ic;X.prototype.once=X.prototype.$f;X.prototype.limitToFirst=X.prototype.ne;X.prototype.limitToLast=X.prototype.oe;X.prototype.orderByChild=X.prototype.ag;
X.prototype.orderByKey=X.prototype.bg;X.prototype.orderByPriority=X.prototype.cg;X.prototype.orderByValue=X.prototype.dg;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.gd;X.prototype.equalTo=X.prototype.If;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;gc(X.prototype,"ref",X.prototype.wb);function Y(a,b){this.ta=a;this.qa=b}Y.prototype.cancel=function(a){y("Firebase.onDisconnect().cancel",0,1,arguments.length);B("Firebase.onDisconnect().cancel",1,a,!0);var b=new ib;this.ta.xd(this.qa,jb(b,a));return b.ra};Y.prototype.cancel=Y.prototype.cancel;Y.prototype.remove=function(a){y("Firebase.onDisconnect().remove",0,1,arguments.length);Wd("Firebase.onDisconnect().remove",this.qa);B("Firebase.onDisconnect().remove",1,a,!0);var b=new ib;Ch(this.ta,this.qa,null,jb(b,a));return b.ra};
Y.prototype.remove=Y.prototype.remove;Y.prototype.set=function(a,b){y("Firebase.onDisconnect().set",1,2,arguments.length);Wd("Firebase.onDisconnect().set",this.qa);Od("Firebase.onDisconnect().set",a,this.qa,!1);B("Firebase.onDisconnect().set",2,b,!0);var c=new ib;Ch(this.ta,this.qa,a,jb(c,b));return c.ra};Y.prototype.set=Y.prototype.set;
Y.prototype.Jb=function(a,b,c){y("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Wd("Firebase.onDisconnect().setWithPriority",this.qa);Od("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Sd("Firebase.onDisconnect().setWithPriority",2,b);B("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new ib;Dh(this.ta,this.qa,a,b,jb(d,c));return d.ra};Y.prototype.setWithPriority=Y.prototype.Jb;
Y.prototype.update=function(a,b){y("Firebase.onDisconnect().update",1,2,arguments.length);Wd("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;J("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Firebase.onDisconnect().update",a,this.qa);B("Firebase.onDisconnect().update",2,b,!0);
c=new ib;Eh(this.ta,this.qa,a,jb(c,b));return c.ra};Y.prototype.update=Y.prototype.update;var Z={Mf:function(){dg=Zf=!0}};Z.forceLongPolling=Z.Mf;Z.Nf=function(){eg=!0};Z.forceWebSockets=Z.Nf;Z.Tf=function(){return Yf.isAvailable()};Z.isWebSocketsAvailable=Z.Tf;Z.lg=function(a,b){a.u.Ra.ze=b};Z.setSecurityDebugCallback=Z.lg;Z.Be=function(a,b){a.u.Be(b)};Z.stats=Z.Be;Z.Ce=function(a,b){a.u.Ce(b)};Z.statsIncrementCounter=Z.Ce;Z.fd=function(a){return a.u.fd};Z.dataUpdateCount=Z.fd;Z.Sf=function(a,b){a.u.je=b};Z.interceptServerData=Z.Sf;function U(a,b){if(!(a instanceof Qg))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,mf,!1);this.then=void 0;this["catch"]=void 0}la(U,X);g=U.prototype;g.getKey=function(){y("Firebase.key",0,0,arguments.length);return this.path.e()?null:Oc(this.path)};
g.n=function(a){y("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof E))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Vd("Firebase.child",b)}else Vd("Firebase.child",a);return new U(this.u,this.path.n(a))};g.getParent=function(){y("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.u,a)};
g.Of=function(){y("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Gf=function(){return this.u.Ya};g.set=function(a,b){y("Firebase.set",1,2,arguments.length);Wd("Firebase.set",this.path);Od("Firebase.set",a,this.path,!1);B("Firebase.set",2,b,!0);var c=new ib;this.u.Jb(this.path,a,null,jb(c,b));return c.ra};
g.update=function(a,b){y("Firebase.update",1,2,arguments.length);Wd("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;J("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Firebase.update",a,this.path);B("Firebase.update",2,b,!0);c=new ib;this.u.update(this.path,a,jb(c,b));return c.ra};
g.Jb=function(a,b,c){y("Firebase.setWithPriority",2,3,arguments.length);Wd("Firebase.setWithPriority",this.path);Od("Firebase.setWithPriority",a,this.path,!1);Sd("Firebase.setWithPriority",2,b);B("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new ib;this.u.Jb(this.path,a,b,jb(d,c));return d.ra};
g.remove=function(a){y("Firebase.remove",0,1,arguments.length);Wd("Firebase.remove",this.path);B("Firebase.remove",1,a,!0);return this.set(null,a)};
g.transaction=function(a,b,c){y("Firebase.transaction",1,3,arguments.length);Wd("Firebase.transaction",this.path);B("Firebase.transaction",1,a,!1);B("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(A("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new ib;ha(b)&&kb(d.ra);Gh(this.u,this.path,a,function(a,c,h){a?
d.reject(a):d.resolve(new Ph(c,h));ha(b)&&b(a,c,h)},c);return d.ra};g.kg=function(a,b){y("Firebase.setPriority",1,2,arguments.length);Wd("Firebase.setPriority",this.path);Sd("Firebase.setPriority",1,a);B("Firebase.setPriority",2,b,!0);var c=new ib;this.u.Jb(this.path.n(".priority"),a,null,jb(c,b));return c.ra};
g.push=function(a,b){y("Firebase.push",0,2,arguments.length);Wd("Firebase.push",this.path);Od("Firebase.push",a,this.path,!0);B("Firebase.push",2,b,!0);var c=wh(this.u),d=Kc(c),c=this.n(d),e=this.n(d),d=null!=a?c.set(a,b).then(function(){return e}):hb.resolve(e);c.then=q(d.then,d);c["catch"]=q(d.then,d,void 0);ha(b)&&kb(d);return c};g.ib=function(){Wd("Firebase.onDisconnect",this.path);return new Y(this.u,this.path)};U.prototype.child=U.prototype.n;U.prototype.set=U.prototype.set;
U.prototype.update=U.prototype.update;U.prototype.setWithPriority=U.prototype.Jb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.kg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.ib;gc(U.prototype,"database",U.prototype.Gf);gc(U.prototype,"key",U.prototype.getKey);gc(U.prototype,"parent",U.prototype.getParent);gc(U.prototype,"root",U.prototype.Of);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
try{firebase.INTERNAL.registerService("database",function(a){var b=Ug.Vb(),c=a.options.databaseURL;n(c)||Vb("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Wb(c),c=d.jc;Xd("Invalid Firebase Database URL",d);d.path.e()||Vb("Database URL must point to the root of a Firebase Database (not including a child path).");(d=w(b.lb,a.name))&&Vb("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Qg(c,b.wf,a);b.lb[a.name]=
d;return d.Ya},{Reference:U,Query:X,Database:Pg,enableLogging:Sb,INTERNAL:Z,TEST_ACCESS:W,ServerValue:Sg})}catch(Uh){Vb("Failed to register the Firebase Database Service ("+Uh+")")};
            module.exports = firebase.database;
          })();
          //# sourceMappingURL=database.js.map
          


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerStorage = registerStorage;

var _string = __webpack_require__(96);

var _taskenums = __webpack_require__(131);

var _xhriopool = __webpack_require__(342);

var _reference = __webpack_require__(133);

var _service = __webpack_require__(351);

var _app = __webpack_require__(53);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Type constant for Firebase Storage.
 */
var STORAGE_TYPE = 'storage'; /**
                              * Copyright 2017 Google Inc.
                              *
                              * Licensed under the Apache License, Version 2.0 (the "License");
                              * you may not use this file except in compliance with the License.
                              * You may obtain a copy of the License at
                              *
                              *   http://www.apache.org/licenses/LICENSE-2.0
                              *
                              * Unless required by applicable law or agreed to in writing, software
                              * distributed under the License is distributed on an "AS IS" BASIS,
                              * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                              * See the License for the specific language governing permissions and
                              * limitations under the License.
                              */

function factory(app, unused, opt_url) {
    return new _service.Service(app, new _xhriopool.XhrIoPool(), opt_url);
}
function registerStorage(instance) {
    instance.INTERNAL.registerService(STORAGE_TYPE, factory, {
        // no-inline
        'TaskState': _taskenums.TaskState,
        'TaskEvent': _taskenums.TaskEvent,
        'StringFormat': _string.StringFormat,
        'Storage': _service.Service,
        'Reference': _reference.Reference
    }, undefined,
    // Allow multiple storage instances per app.
    true);
}
registerStorage(_app2.default);
//# sourceMappingURL=storage.js.map


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XhrIoPool = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _xhrio_network = __webpack_require__(343);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Factory-like class for creating XhrIo instances.
 */
var XhrIoPool = exports.XhrIoPool = function () {
    function XhrIoPool() {
        _classCallCheck(this, XhrIoPool);
    }

    _createClass(XhrIoPool, [{
        key: 'createXhrIo',
        value: function createXhrIo() {
            return new _xhrio_network.NetworkXhrIo();
        }
    }]);

    return XhrIoPool;
}();
//# sourceMappingURL=xhriopool.js.map


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkXhrIo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

var _promise_external = __webpack_require__(42);

var promiseimpl = _interopRequireWildcard(_promise_external);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

var _xhrio = __webpack_require__(132);

var XhrIoExports = _interopRequireWildcard(_xhrio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * We use this instead of goog.net.XhrIo because goog.net.XhrIo is hyuuuuge and
 * doesn't work in React Native on Android.
 */
var NetworkXhrIo = exports.NetworkXhrIo = function () {
    function NetworkXhrIo() {
        var _this = this;

        _classCallCheck(this, NetworkXhrIo);

        this.sent_ = false;
        this.xhr_ = new XMLHttpRequest();
        this.errorCode_ = XhrIoExports.ErrorCode.NO_ERROR;
        this.sendPromise_ = promiseimpl.make(function (resolve) {
            _this.xhr_.addEventListener('abort', function () {
                _this.errorCode_ = XhrIoExports.ErrorCode.ABORT;
                resolve(_this);
            });
            _this.xhr_.addEventListener('error', function () {
                _this.errorCode_ = XhrIoExports.ErrorCode.NETWORK_ERROR;
                resolve(_this);
            });
            _this.xhr_.addEventListener('load', function () {
                resolve(_this);
            });
        });
    }
    /**
     * @override
     */


    _createClass(NetworkXhrIo, [{
        key: 'send',
        value: function send(url, method, opt_body, opt_headers) {
            var _this2 = this;

            if (this.sent_) {
                throw errorsExports.internalError('cannot .send() more than once');
            }
            this.sent_ = true;
            this.xhr_.open(method, url, true);
            if (type.isDef(opt_headers)) {
                object.forEach(opt_headers, function (key, val) {
                    _this2.xhr_.setRequestHeader(key, val.toString());
                });
            }
            if (type.isDef(opt_body)) {
                this.xhr_.send(opt_body);
            } else {
                this.xhr_.send();
            }
            return this.sendPromise_;
        }
        /**
         * @override
         */

    }, {
        key: 'getErrorCode',
        value: function getErrorCode() {
            if (!this.sent_) {
                throw errorsExports.internalError('cannot .getErrorCode() before sending');
            }
            return this.errorCode_;
        }
        /**
         * @override
         */

    }, {
        key: 'getStatus',
        value: function getStatus() {
            if (!this.sent_) {
                throw errorsExports.internalError('cannot .getStatus() before sending');
            }
            try {
                return this.xhr_.status;
            } catch (e) {
                return -1;
            }
        }
        /**
         * @override
         */

    }, {
        key: 'getResponseText',
        value: function getResponseText() {
            if (!this.sent_) {
                throw errorsExports.internalError('cannot .getResponseText() before sending');
            }
            return this.xhr_.responseText;
        }
        /**
         * Aborts the request.
         * @override
         */

    }, {
        key: 'abort',
        value: function abort() {
            this.xhr_.abort();
        }
        /**
         * @override
         */

    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader(header) {
            return this.xhr_.getResponseHeader(header);
        }
        /**
         * @override
         */

    }, {
        key: 'addUploadProgressListener',
        value: function addUploadProgressListener(listener) {
            if (type.isDef(this.xhr_.upload)) {
                this.xhr_.upload.addEventListener('progress', listener);
            }
        }
        /**
         * @override
         */

    }, {
        key: 'removeUploadProgressListener',
        value: function removeUploadProgressListener(listener) {
            if (type.isDef(this.xhr_.upload)) {
                this.xhr_.upload.removeEventListener('progress', listener);
            }
        }
    }]);

    return NetworkXhrIo;
}();
//# sourceMappingURL=xhrio_network.js.map


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonObjectOrNull = jsonObjectOrNull;

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */
function jsonObjectOrNull(s) {
    var obj = void 0;
    try {
        obj = JSON.parse(s);
    } catch (e) {
        return null;
    }
    if (type.isNonArrayObject(obj)) {
        return obj;
    } else {
        return null;
    }
} /**
  * Copyright 2017 Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
//# sourceMappingURL=json.js.map


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBlob = getBlob;
exports.sliceBlob = sliceBlob;

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getBlobBuilder() {
    if (typeof BlobBuilder !== 'undefined') {
        return BlobBuilder;
    } else if (typeof WebKitBlobBuilder !== 'undefined') {
        return WebKitBlobBuilder;
    } else {
        return undefined;
    }
}
/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * @param var_args The values that will make up the resulting blob.
 * @return The blob.
 */
function getBlob() {
    var BlobBuilder = getBlobBuilder();

    for (var _len = arguments.length, var_args = Array(_len), _key = 0; _key < _len; _key++) {
        var_args[_key] = arguments[_key];
    }

    if (BlobBuilder !== undefined) {
        var bb = new BlobBuilder();
        for (var i = 0; i < var_args.length; i++) {
            bb.append(var_args[i]);
        }
        return bb.getBlob();
    } else {
        if (type.isNativeBlobDefined()) {
            return new Blob(var_args);
        } else {
            throw Error('This browser doesn\'t seem to support creating Blobs');
        }
    }
}
/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
 *
 * @param blob The blob to be sliced.
 * @param start Index of the starting byte.
 * @param end Index of the ending byte.
 * @return The blob slice or null if not supported.
 */
function sliceBlob(blob, start, end) {
    if (blob.webkitSlice) {
        return blob.webkitSlice(start, end);
    } else if (blob.mozSlice) {
        return blob.mozSlice(start, end);
    } else if (blob.slice) {
        return blob.slice(start, end);
    }
    return null;
}
//# sourceMappingURL=fs.js.map


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestInfo = exports.RequestInfo = function RequestInfo(url, method,
/**
 * Returns the value with which to resolve the request's promise. Only called
 * if the request is successful. Throw from this function to reject the
 * returned Request's promise with the thrown error.
 * Note: The XhrIo passed to this function may be reused after this callback
 * returns. Do not keep a reference to it in any way.
 */
handler, timeout) {
  _classCallCheck(this, RequestInfo);

  this.url = url;
  this.method = method;
  this.handler = handler;
  this.timeout = timeout;
  this.urlParams = {};
  this.headers = {};
  this.body = null;
  this.errorHandler = null;
  /**
   * Called with the current number of bytes uploaded and total size (-1 if not
   * computable) of the request body (i.e. used to report upload progress).
   */
  this.progressCallback = null;
  this.successCodes = [200];
  this.additionalRetryCodes = [];
};
//# sourceMappingURL=requestinfo.js.map


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UploadTask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/**
 * @fileoverview Defines types for interacting with blob transfer tasks.
 */


var _taskenums = __webpack_require__(131);

var fbsTaskEnums = _interopRequireWildcard(_taskenums);

var _observer = __webpack_require__(348);

var _tasksnapshot = __webpack_require__(349);

var _args = __webpack_require__(97);

var fbsArgs = _interopRequireWildcard(_args);

var _array = __webpack_require__(100);

var fbsArray = _interopRequireWildcard(_array);

var _async = __webpack_require__(350);

var _error = __webpack_require__(29);

var errors = _interopRequireWildcard(_error);

var _promise_external = __webpack_require__(42);

var fbsPromiseimpl = _interopRequireWildcard(_promise_external);

var _requests = __webpack_require__(136);

var fbsRequests = _interopRequireWildcard(_requests);

var _type = __webpack_require__(18);

var typeUtils = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 */
var UploadTask = exports.UploadTask = function () {
    /**
     * @param ref The firebaseStorage.Reference object this task came
     *     from, untyped to avoid cyclic dependencies.
     * @param blob The blob to upload.
     */
    function UploadTask(ref, authWrapper, location, mappings, blob) {
        var _this = this;

        var metadata = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, UploadTask);

        this.transferred_ = 0;
        this.needToFetchStatus_ = false;
        this.needToFetchMetadata_ = false;
        this.observers_ = [];
        this.error_ = null;
        this.uploadUrl_ = null;
        this.request_ = null;
        this.chunkMultiplier_ = 1;
        this.resolve_ = null;
        this.reject_ = null;
        this.ref_ = ref;
        this.authWrapper_ = authWrapper;
        this.location_ = location;
        this.blob_ = blob;
        this.metadata_ = metadata;
        this.mappings_ = mappings;
        this.resumable_ = this.shouldDoResumable_(this.blob_);
        this.state_ = _taskenums.InternalTaskState.RUNNING;
        this.errorHandler_ = function (error) {
            _this.request_ = null;
            _this.chunkMultiplier_ = 1;
            if (error.codeEquals(errors.Code.CANCELED)) {
                _this.needToFetchStatus_ = true;
                _this.completeTransitions_();
            } else {
                _this.error_ = error;
                _this.transition_(_taskenums.InternalTaskState.ERROR);
            }
        };
        this.metadataErrorHandler_ = function (error) {
            _this.request_ = null;
            if (error.codeEquals(errors.Code.CANCELED)) {
                _this.completeTransitions_();
            } else {
                _this.error_ = error;
                _this.transition_(_taskenums.InternalTaskState.ERROR);
            }
        };
        this.promise_ = fbsPromiseimpl.make(function (resolve, reject) {
            _this.resolve_ = resolve;
            _this.reject_ = reject;
            _this.start_();
        });
        // Prevent uncaught rejections on the internal promise from bubbling out
        // to the top level with a dummy handler.
        this.promise_.then(null, function () {});
    }

    _createClass(UploadTask, [{
        key: 'makeProgressCallback_',
        value: function makeProgressCallback_() {
            var _this2 = this;

            var sizeBefore = this.transferred_;
            return function (loaded) {
                _this2.updateProgress_(sizeBefore + loaded);
            };
        }
    }, {
        key: 'shouldDoResumable_',
        value: function shouldDoResumable_(blob) {
            return blob.size() > 256 * 1024;
        }
    }, {
        key: 'start_',
        value: function start_() {
            if (this.state_ !== _taskenums.InternalTaskState.RUNNING) {
                // This can happen if someone pauses us in a resume callback, for example.
                return;
            }
            if (this.request_ !== null) {
                return;
            }
            if (this.resumable_) {
                if (this.uploadUrl_ === null) {
                    this.createResumable_();
                } else {
                    if (this.needToFetchStatus_) {
                        this.fetchStatus_();
                    } else {
                        if (this.needToFetchMetadata_) {
                            // Happens if we miss the metadata on upload completion.
                            this.fetchMetadata_();
                        } else {
                            this.continueUpload_();
                        }
                    }
                }
            } else {
                this.oneShotUpload_();
            }
        }
    }, {
        key: 'resolveToken_',
        value: function resolveToken_(callback) {
            var _this3 = this;

            this.authWrapper_.getAuthToken().then(function (authToken) {
                switch (_this3.state_) {
                    case _taskenums.InternalTaskState.RUNNING:
                        callback(authToken);
                        break;
                    case _taskenums.InternalTaskState.CANCELING:
                        _this3.transition_(_taskenums.InternalTaskState.CANCELED);
                        break;
                    case _taskenums.InternalTaskState.PAUSING:
                        _this3.transition_(_taskenums.InternalTaskState.PAUSED);
                        break;
                    default:
                }
            });
        }
        // TODO(andysoto): assert false

    }, {
        key: 'createResumable_',
        value: function createResumable_() {
            var _this4 = this;

            this.resolveToken_(function (authToken) {
                var requestInfo = fbsRequests.createResumableUpload(_this4.authWrapper_, _this4.location_, _this4.mappings_, _this4.blob_, _this4.metadata_);
                var createRequest = _this4.authWrapper_.makeRequest(requestInfo, authToken);
                _this4.request_ = createRequest;
                createRequest.getPromise().then(function (url) {
                    _this4.request_ = null;
                    _this4.uploadUrl_ = url;
                    _this4.needToFetchStatus_ = false;
                    _this4.completeTransitions_();
                }, _this4.errorHandler_);
            });
        }
    }, {
        key: 'fetchStatus_',
        value: function fetchStatus_() {
            var _this5 = this;

            // TODO(andysoto): assert(this.uploadUrl_ !== null);
            var url = this.uploadUrl_;
            this.resolveToken_(function (authToken) {
                var requestInfo = fbsRequests.getResumableUploadStatus(_this5.authWrapper_, _this5.location_, url, _this5.blob_);
                var statusRequest = _this5.authWrapper_.makeRequest(requestInfo, authToken);
                _this5.request_ = statusRequest;
                statusRequest.getPromise().then(function (status) {
                    status = status;
                    _this5.request_ = null;
                    _this5.updateProgress_(status.current);
                    _this5.needToFetchStatus_ = false;
                    if (status.finalized) {
                        _this5.needToFetchMetadata_ = true;
                    }
                    _this5.completeTransitions_();
                }, _this5.errorHandler_);
            });
        }
    }, {
        key: 'continueUpload_',
        value: function continueUpload_() {
            var _this6 = this;

            var chunkSize = fbsRequests.resumableUploadChunkSize * this.chunkMultiplier_;
            var status = new fbsRequests.ResumableUploadStatus(this.transferred_, this.blob_.size());
            // TODO(andysoto): assert(this.uploadUrl_ !== null);
            var url = this.uploadUrl_;
            this.resolveToken_(function (authToken) {
                var requestInfo = void 0;
                try {
                    requestInfo = fbsRequests.continueResumableUpload(_this6.location_, _this6.authWrapper_, url, _this6.blob_, chunkSize, _this6.mappings_, status, _this6.makeProgressCallback_());
                } catch (e) {
                    _this6.error_ = e;
                    _this6.transition_(_taskenums.InternalTaskState.ERROR);
                    return;
                }
                var uploadRequest = _this6.authWrapper_.makeRequest(requestInfo, authToken);
                _this6.request_ = uploadRequest;
                uploadRequest.getPromise().then(function (newStatus) {
                    _this6.increaseMultiplier_();
                    _this6.request_ = null;
                    _this6.updateProgress_(newStatus.current);
                    if (newStatus.finalized) {
                        _this6.metadata_ = newStatus.metadata;
                        _this6.transition_(_taskenums.InternalTaskState.SUCCESS);
                    } else {
                        _this6.completeTransitions_();
                    }
                }, _this6.errorHandler_);
            });
        }
    }, {
        key: 'increaseMultiplier_',
        value: function increaseMultiplier_() {
            var currentSize = fbsRequests.resumableUploadChunkSize * this.chunkMultiplier_;
            // Max chunk size is 32M.
            if (currentSize < 32 * 1024 * 1024) {
                this.chunkMultiplier_ *= 2;
            }
        }
    }, {
        key: 'fetchMetadata_',
        value: function fetchMetadata_() {
            var _this7 = this;

            this.resolveToken_(function (authToken) {
                var requestInfo = fbsRequests.getMetadata(_this7.authWrapper_, _this7.location_, _this7.mappings_);
                var metadataRequest = _this7.authWrapper_.makeRequest(requestInfo, authToken);
                _this7.request_ = metadataRequest;
                metadataRequest.getPromise().then(function (metadata) {
                    _this7.request_ = null;
                    _this7.metadata_ = metadata;
                    _this7.transition_(_taskenums.InternalTaskState.SUCCESS);
                }, _this7.metadataErrorHandler_);
            });
        }
    }, {
        key: 'oneShotUpload_',
        value: function oneShotUpload_() {
            var _this8 = this;

            this.resolveToken_(function (authToken) {
                var requestInfo = fbsRequests.multipartUpload(_this8.authWrapper_, _this8.location_, _this8.mappings_, _this8.blob_, _this8.metadata_);
                var multipartRequest = _this8.authWrapper_.makeRequest(requestInfo, authToken);
                _this8.request_ = multipartRequest;
                multipartRequest.getPromise().then(function (metadata) {
                    _this8.request_ = null;
                    _this8.metadata_ = metadata;
                    _this8.updateProgress_(_this8.blob_.size());
                    _this8.transition_(_taskenums.InternalTaskState.SUCCESS);
                }, _this8.errorHandler_);
            });
        }
    }, {
        key: 'updateProgress_',
        value: function updateProgress_(transferred) {
            var old = this.transferred_;
            this.transferred_ = transferred;
            // A progress update can make the "transferred" value smaller (e.g. a
            // partial upload not completed by server, after which the "transferred"
            // value may reset to the value at the beginning of the request).
            if (this.transferred_ !== old) {
                this.notifyObservers_();
            }
        }
    }, {
        key: 'transition_',
        value: function transition_(state) {
            if (this.state_ === state) {
                return;
            }
            switch (state) {
                case _taskenums.InternalTaskState.CANCELING:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.RUNNING ||
                    //        this.state_ === InternalTaskState.PAUSING);
                    this.state_ = state;
                    if (this.request_ !== null) {
                        this.request_.cancel();
                    }
                    break;
                case _taskenums.InternalTaskState.PAUSING:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.RUNNING);
                    this.state_ = state;
                    if (this.request_ !== null) {
                        this.request_.cancel();
                    }
                    break;
                case _taskenums.InternalTaskState.RUNNING:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.PAUSED ||
                    //        this.state_ === InternalTaskState.PAUSING);
                    var wasPaused = this.state_ === _taskenums.InternalTaskState.PAUSED;
                    this.state_ = state;
                    if (wasPaused) {
                        this.notifyObservers_();
                        this.start_();
                    }
                    break;
                case _taskenums.InternalTaskState.PAUSED:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.PAUSING);
                    this.state_ = state;
                    this.notifyObservers_();
                    break;
                case _taskenums.InternalTaskState.CANCELED:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.PAUSED ||
                    //        this.state_ === InternalTaskState.CANCELING);
                    this.error_ = errors.canceled();
                    this.state_ = state;
                    this.notifyObservers_();
                    break;
                case _taskenums.InternalTaskState.ERROR:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.RUNNING ||
                    //        this.state_ === InternalTaskState.PAUSING ||
                    //        this.state_ === InternalTaskState.CANCELING);
                    this.state_ = state;
                    this.notifyObservers_();
                    break;
                case _taskenums.InternalTaskState.SUCCESS:
                    // TODO(andysoto):
                    // assert(this.state_ === InternalTaskState.RUNNING ||
                    //        this.state_ === InternalTaskState.PAUSING ||
                    //        this.state_ === InternalTaskState.CANCELING);
                    this.state_ = state;
                    this.notifyObservers_();
                    break;
            }
        }
    }, {
        key: 'completeTransitions_',
        value: function completeTransitions_() {
            switch (this.state_) {
                case _taskenums.InternalTaskState.PAUSING:
                    this.transition_(_taskenums.InternalTaskState.PAUSED);
                    break;
                case _taskenums.InternalTaskState.CANCELING:
                    this.transition_(_taskenums.InternalTaskState.CANCELED);
                    break;
                case _taskenums.InternalTaskState.RUNNING:
                    this.start_();
                    break;
                default:
                    // TODO(andysoto): assert(false);
                    break;
            }
        }
    }, {
        key: 'on',

        /**
         * Adds a callback for an event.
         * @param type The type of event to listen for.
         */
        value: function on(type) {
            var nextOrObserver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
            var completed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            var nextOrObserverMessage = 'Expected a function or an Object with one of ' + '`next`, `error`, `complete` properties.';
            var nextValidator = fbsArgs.nullFunctionSpec(true).validator;
            var observerValidator = fbsArgs.looseObjectSpec(null, true).validator;
            function nextOrObserverValidator(p) {
                try {
                    nextValidator(p);
                    return;
                } catch (e) {}
                try {
                    observerValidator(p);
                    var anyDefined = typeUtils.isJustDef(p['next']) || typeUtils.isJustDef(p['error']) || typeUtils.isJustDef(p['complete']);
                    if (!anyDefined) {
                        throw '';
                    }
                } catch (e) {
                    throw nextOrObserverMessage;
                }
            }
            var specs = [fbsArgs.stringSpec(function () {
                if (type !== _taskenums.TaskEvent.STATE_CHANGED) {
                    throw 'Expected one of the event types: [' + _taskenums.TaskEvent.STATE_CHANGED + '].';
                }
            }), fbsArgs.looseObjectSpec(nextOrObserverValidator, true), fbsArgs.nullFunctionSpec(true), fbsArgs.nullFunctionSpec(true)];
            fbsArgs.validate('on', specs, arguments);
            var self = this;
            function makeBinder(specs) {
                return function (nextOrObserver, error) {
                    if (specs !== null) {
                        fbsArgs.validate('on', specs, arguments);
                    }
                    var observer = new _observer.Observer(nextOrObserver, error, completed);
                    self.addObserver_(observer);
                    return function () {
                        self.removeObserver_(observer);
                    };
                };
            }

            var binderSpecs = [fbsArgs.looseObjectSpec(function (p) {
                if (p === null) {
                    throw nextOrObserverMessage;
                }
                nextOrObserverValidator(p);
            }), fbsArgs.nullFunctionSpec(true), fbsArgs.nullFunctionSpec(true)];
            var typeOnly = !(typeUtils.isJustDef(nextOrObserver) || typeUtils.isJustDef(error) || typeUtils.isJustDef(completed));
            if (typeOnly) {
                return makeBinder(binderSpecs);
            } else {
                return makeBinder(null)(nextOrObserver, error, completed);
            }
        }
        /**
         * This object behaves like a Promise, and resolves with its snapshot data
         * when the upload completes.
         *     The fulfillment callback. Promise chaining works as normal.
         * @param onRejected The rejection callback.
         */

    }, {
        key: 'then',
        value: function then(onFulfilled, onRejected) {
            return this.promise_.then(onFulfilled, onRejected);
        }
        /**
         * Equivalent to calling `then(null, onRejected)`.
         */

    }, {
        key: 'catch',
        value: function _catch(onRejected) {
            return this.then(null, onRejected);
        }
        /**
         * Adds the given observer.
         */

    }, {
        key: 'addObserver_',
        value: function addObserver_(observer) {
            this.observers_.push(observer);
            this.notifyObserver_(observer);
        }
        /**
         * Removes the given observer.
         */

    }, {
        key: 'removeObserver_',
        value: function removeObserver_(observer) {
            fbsArray.remove(this.observers_, observer);
        }
    }, {
        key: 'notifyObservers_',
        value: function notifyObservers_() {
            var _this9 = this;

            this.finishPromise_();
            var observers = fbsArray.clone(this.observers_);
            observers.forEach(function (observer) {
                _this9.notifyObserver_(observer);
            });
        }
    }, {
        key: 'finishPromise_',
        value: function finishPromise_() {
            if (this.resolve_ !== null) {
                var triggered = true;
                switch (fbsTaskEnums.taskStateFromInternalTaskState(this.state_)) {
                    case _taskenums.TaskState.SUCCESS:
                        (0, _async.async)(this.resolve_.bind(null, this.snapshot))();
                        break;
                    case _taskenums.TaskState.CANCELED:
                    case _taskenums.TaskState.ERROR:
                        var toCall = this.reject_;
                        (0, _async.async)(toCall.bind(null, this.error_))();
                        break;
                    default:
                        triggered = false;
                        break;
                }
                if (triggered) {
                    this.resolve_ = null;
                    this.reject_ = null;
                }
            }
        }
    }, {
        key: 'notifyObserver_',
        value: function notifyObserver_(observer) {
            var externalState = fbsTaskEnums.taskStateFromInternalTaskState(this.state_);
            switch (externalState) {
                case _taskenums.TaskState.RUNNING:
                case _taskenums.TaskState.PAUSED:
                    if (observer.next !== null) {
                        (0, _async.async)(observer.next.bind(observer, this.snapshot))();
                    }
                    break;
                case _taskenums.TaskState.SUCCESS:
                    if (observer.complete !== null) {
                        (0, _async.async)(observer.complete.bind(observer))();
                    }
                    break;
                case _taskenums.TaskState.CANCELED:
                case _taskenums.TaskState.ERROR:
                    if (observer.error !== null) {
                        (0, _async.async)(observer.error.bind(observer, this.error_))();
                    }
                    break;
                default:
                    // TODO(andysoto): assert(false);
                    if (observer.error !== null) {
                        (0, _async.async)(observer.error.bind(observer, this.error_))();
                    }
            }
        }
        /**
         * Resumes a paused task. Has no effect on a currently running or failed task.
         * @return True if the operation took effect, false if ignored.
         */

    }, {
        key: 'resume',
        value: function resume() {
            fbsArgs.validate('resume', [], arguments);
            var valid = this.state_ === _taskenums.InternalTaskState.PAUSED || this.state_ === _taskenums.InternalTaskState.PAUSING;
            if (valid) {
                this.transition_(_taskenums.InternalTaskState.RUNNING);
            }
            return valid;
        }
        /**
         * Pauses a currently running task. Has no effect on a paused or failed task.
         * @return True if the operation took effect, false if ignored.
         */

    }, {
        key: 'pause',
        value: function pause() {
            fbsArgs.validate('pause', [], arguments);
            var valid = this.state_ === _taskenums.InternalTaskState.RUNNING;
            if (valid) {
                this.transition_(_taskenums.InternalTaskState.PAUSING);
            }
            return valid;
        }
        /**
         * Cancels a currently running or paused task. Has no effect on a complete or
         * failed task.
         * @return True if the operation took effect, false if ignored.
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            fbsArgs.validate('cancel', [], arguments);
            var valid = this.state_ === _taskenums.InternalTaskState.RUNNING || this.state_ === _taskenums.InternalTaskState.PAUSING;
            if (valid) {
                this.transition_(_taskenums.InternalTaskState.CANCELING);
            }
            return valid;
        }
    }, {
        key: 'snapshot',
        get: function get() {
            var externalState = fbsTaskEnums.taskStateFromInternalTaskState(this.state_);
            return new _tasksnapshot.UploadTaskSnapshot(this.transferred_, this.blob_.size(), externalState, this.metadata_, this, this.ref_);
        }
    }]);

    return UploadTask;
}();
//# sourceMappingURL=task.js.map


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Observer = undefined;

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Copyright 2017 Google Inc.
                                                                                                                                                          *
                                                                                                                                                          * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                          * you may not use this file except in compliance with the License.
                                                                                                                                                          * You may obtain a copy of the License at
                                                                                                                                                          *
                                                                                                                                                          *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                          *
                                                                                                                                                          * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                          * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                          * See the License for the specific language governing permissions and
                                                                                                                                                          * limitations under the License.
                                                                                                                                                          */


/**
 * @struct
 */
var Observer = exports.Observer = function Observer(nextOrObserver, opt_error, opt_complete) {
    _classCallCheck(this, Observer);

    var asFunctions = type.isFunction(nextOrObserver) || type.isDef(opt_error) || type.isDef(opt_complete);
    if (asFunctions) {
        this.next = nextOrObserver;
        this.error = opt_error || null;
        this.complete = opt_complete || null;
    } else {
        var observer = nextOrObserver;
        this.next = observer.next || null;
        this.error = observer.error || null;
        this.complete = observer.complete || null;
    }
};
//# sourceMappingURL=observer.js.map


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploadTaskSnapshot = exports.UploadTaskSnapshot = function () {
    function UploadTaskSnapshot(bytesTransferred, totalBytes, state, metadata, task, ref) {
        _classCallCheck(this, UploadTaskSnapshot);

        this.bytesTransferred = bytesTransferred;
        this.totalBytes = totalBytes;
        this.state = state;
        this.metadata = metadata;
        this.task = task;
        this.ref = ref;
    }

    _createClass(UploadTaskSnapshot, [{
        key: 'downloadURL',
        get: function get() {
            if (this.metadata !== null) {
                var urls = this.metadata['downloadURLs'];
                if (urls != null && urls[0] != null) {
                    return urls[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }]);

    return UploadTaskSnapshot;
}();
//# sourceMappingURL=tasksnapshot.js.map


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.async = async;

var _promise_external = __webpack_require__(42);

var promiseimpl = _interopRequireWildcard(_promise_external);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Returns a function that invokes f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
function async(f) {
    return function () {
        for (var _len = arguments.length, argsToForward = Array(_len), _key = 0; _key < _len; _key++) {
            argsToForward[_key] = arguments[_key];
        }

        promiseimpl.resolve(true).then(function () {
            f.apply(null, argsToForward);
        });
    };
} /**
  * Copyright 2017 Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
/**
 * @fileoverview Method for invoking a callback asynchronously.
 */
//# sourceMappingURL=async.js.map


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServiceInternals = exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _args = __webpack_require__(97);

var args = _interopRequireWildcard(_args);

var _authwrapper = __webpack_require__(352);

var _location = __webpack_require__(66);

var _promise_external = __webpack_require__(42);

var fbsPromiseImpl = _interopRequireWildcard(_promise_external);

var _request = __webpack_require__(355);

var RequestExports = _interopRequireWildcard(_request);

var _reference = __webpack_require__(133);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A service that provides firebaseStorage.Reference instances.
 * @param opt_url gs:// url to a custom Storage Bucket
 *
 * @struct
 */
var Service = exports.Service = function () {
    function Service(app, pool, url) {
        _classCallCheck(this, Service);

        this.bucket_ = null;

        this.authWrapper_ = new _authwrapper.AuthWrapper(app, function (authWrapper, loc) {
            return new _reference.Reference(authWrapper, loc);
        }, RequestExports.makeRequest, this, pool);
        this.app_ = app;
        if (url != null) {
            this.bucket_ = _location.Location.makeFromBucketSpec(url);
        } else {
            var authWrapperBucket = this.authWrapper_.bucket();
            if (authWrapperBucket != null) {
                this.bucket_ = new _location.Location(authWrapperBucket, '');
            }
        }
        this.internals_ = new ServiceInternals(this);
    }
    /**
     * Returns a firebaseStorage.Reference for the given path in the default
     * bucket.
     */


    _createClass(Service, [{
        key: 'ref',
        value: function (path) {
            args.validate('ref', [args.stringSpec(function (path) {
                if (/^[A-Za-z]+:\/\//.test(path)) {
                    throw 'Expected child path but got a URL, use refFromURL instead.';
                }
            }, true)], arguments);
            if (this.bucket_ == null) {
                throw new Error('No Storage Bucket defined in Firebase Options.');
            }
            var ref = new _reference.Reference(this.authWrapper_, this.bucket_);
            if (path != null) {
                return ref.child(path);
            } else {
                return ref;
            }
        }
        /**
         * Returns a firebaseStorage.Reference object for the given absolute URL,
         * which must be a gs:// or http[s]:// URL.
         */

    }, {
        key: 'refFromURL',
        value: function refFromURL(url) {
            args.validate('refFromURL', [args.stringSpec(function (p) {
                if (!/^[A-Za-z]+:\/\//.test(p)) {
                    throw 'Expected full URL but got a child path, use ref instead.';
                }
                try {
                    _location.Location.makeFromUrl(p);
                } catch (e) {
                    throw 'Expected valid full URL but got an invalid one.';
                }
            }, false)], arguments);
            return new _reference.Reference(this.authWrapper_, url);
        }
    }, {
        key: 'setMaxUploadRetryTime',
        value: function setMaxUploadRetryTime(time) {
            args.validate('setMaxUploadRetryTime', [args.nonNegativeNumberSpec()], arguments);
            this.authWrapper_.setMaxUploadRetryTime(time);
        }
    }, {
        key: 'setMaxOperationRetryTime',
        value: function setMaxOperationRetryTime(time) {
            args.validate('setMaxOperationRetryTime', [args.nonNegativeNumberSpec()], arguments);
            this.authWrapper_.setMaxOperationRetryTime(time);
        }
    }, {
        key: 'maxUploadRetryTime',
        get: function get() {
            return this.authWrapper_.maxUploadRetryTime();
        }
    }, {
        key: 'maxOperationRetryTime',
        get: function get() {
            return this.authWrapper_.maxOperationRetryTime();
        }
    }, {
        key: 'app',
        get: function get() {
            return this.app_;
        }
    }, {
        key: 'INTERNAL',
        get: function get() {
            return this.internals_;
        }
    }]);

    return Service;
}();
/**
 * @struct
 */


var ServiceInternals = exports.ServiceInternals = function () {
    function ServiceInternals(service) {
        _classCallCheck(this, ServiceInternals);

        this.service_ = service;
    }
    /**
     * Called when the associated app is deleted.
     * @see {!fbs.AuthWrapper.prototype.deleteApp}
     */


    _createClass(ServiceInternals, [{
        key: 'delete',
        value: function _delete() {
            this.service_.authWrapper_.deleteApp();
            return fbsPromiseImpl.resolve(undefined);
        }
    }]);

    return ServiceInternals;
}();
//# sourceMappingURL=service.js.map


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(65);

var constants = _interopRequireWildcard(_constants);

var _error2 = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error2);

var _failrequest = __webpack_require__(353);

var _location = __webpack_require__(66);

var _promise_external = __webpack_require__(42);

var promiseimpl = _interopRequireWildcard(_promise_external);

var _requestmap = __webpack_require__(354);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param app If null, getAuthToken always resolves with null.
 * @param service The storage service associated with this auth wrapper.
 *     Untyped to avoid circular type dependencies.
 * @struct
 */
var AuthWrapper = exports.AuthWrapper = function () {
    function AuthWrapper(app, maker, requestMaker, service, pool) {
        _classCallCheck(this, AuthWrapper);

        this.bucket_ = null;
        this.deleted_ = false;
        this.app_ = app;
        if (this.app_ !== null) {
            var options = this.app_.options;
            if (type.isDef(options)) {
                this.bucket_ = AuthWrapper.extractBucket_(options);
            }
        }
        this.storageRefMaker_ = maker;
        this.requestMaker_ = requestMaker;
        this.pool_ = pool;
        this.service_ = service;
        this.maxOperationRetryTime_ = constants.defaultMaxOperationRetryTime;
        this.maxUploadRetryTime_ = constants.defaultMaxUploadRetryTime;
        this.requestMap_ = new _requestmap.RequestMap();
    }

    _createClass(AuthWrapper, [{
        key: 'getAuthToken',
        value: function getAuthToken() {
            // TODO(andysoto): remove ifDef checks after firebase-app implements stubs
            // (b/28673818).
            if (this.app_ !== null && type.isDef(this.app_.INTERNAL) && type.isDef(this.app_.INTERNAL.getToken)) {
                return this.app_.INTERNAL.getToken().then(function (response) {
                    if (response !== null) {
                        return response.accessToken;
                    } else {
                        return null;
                    }
                }, function () {
                    return null;
                });
            } else {
                return promiseimpl.resolve(null);
            }
        }
    }, {
        key: 'bucket',
        value: function bucket() {
            if (this.deleted_) {
                throw errorsExports.appDeleted();
            } else {
                return this.bucket_;
            }
        }
        /**
         * The service associated with this auth wrapper. Untyped to avoid circular
         * type dependencies.
         */

    }, {
        key: 'service',
        value: function service() {
            return this.service_;
        }
        /**
         * Returns a new firebaseStorage.Reference object referencing this AuthWrapper
         * at the given Location.
         * @param loc The Location.
         * @return Actually a firebaseStorage.Reference, typing not allowed
         *     because of circular dependency problems.
         */

    }, {
        key: 'makeStorageReference',
        value: function makeStorageReference(loc) {
            return this.storageRefMaker_(this, loc);
        }
    }, {
        key: 'makeRequest',
        value: function makeRequest(requestInfo, authToken) {
            if (!this.deleted_) {
                var request = this.requestMaker_(requestInfo, authToken, this.pool_);
                this.requestMap_.addRequest(request);
                return request;
            } else {
                return new _failrequest.FailRequest(errorsExports.appDeleted());
            }
        }
        /**
         * Stop running requests and prevent more from being created.
         */

    }, {
        key: 'deleteApp',
        value: function deleteApp() {
            this.deleted_ = true;
            this.app_ = null;
            this.requestMap_.clear();
        }
    }, {
        key: 'maxUploadRetryTime',
        value: function maxUploadRetryTime() {
            return this.maxUploadRetryTime_;
        }
    }, {
        key: 'setMaxUploadRetryTime',
        value: function setMaxUploadRetryTime(time) {
            this.maxUploadRetryTime_ = time;
        }
    }, {
        key: 'maxOperationRetryTime',
        value: function maxOperationRetryTime() {
            return this.maxOperationRetryTime_;
        }
    }, {
        key: 'setMaxOperationRetryTime',
        value: function setMaxOperationRetryTime(time) {
            this.maxOperationRetryTime_ = time;
        }
    }], [{
        key: 'extractBucket_',
        value: function extractBucket_(config) {
            var bucketString = config[constants.configOption] || null;
            if (bucketString == null) {
                return null;
            }
            var loc = _location.Location.makeFromBucketSpec(bucketString);
            return loc.bucket;
        }
    }]);

    return AuthWrapper;
}();
//# sourceMappingURL=authwrapper.js.map


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FailRequest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise_external = __webpack_require__(42);

var promiseimpl = _interopRequireWildcard(_promise_external);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A request whose promise always fails.
 * @struct
 * @template T
 */
var FailRequest = exports.FailRequest = function () {
    function FailRequest(error) {
        _classCallCheck(this, FailRequest);

        this.promise_ = promiseimpl.reject(error);
    }
    /** @inheritDoc */


    _createClass(FailRequest, [{
        key: 'getPromise',
        value: function getPromise() {
            return this.promise_;
        }
        /** @inheritDoc */

    }, {
        key: 'cancel',
        value: function cancel() {
            arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        }
    }]);

    return FailRequest;
}();
//# sourceMappingURL=failrequest.js.map


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

var _constants = __webpack_require__(65);

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @struct
 */
var RequestMap = exports.RequestMap = function () {
    function RequestMap() {
        _classCallCheck(this, RequestMap);

        this.map_ = {};
        this.id_ = constants.minSafeInteger;
    }
    /**
     * Registers the given request with this map.
     * The request is unregistered when it completes.
     * @param r The request to register.
     */


    _createClass(RequestMap, [{
        key: 'addRequest',
        value: function addRequest(r) {
            var id = this.id_;
            this.id_++;
            this.map_[id] = r;
            var self = this;
            function unmap() {
                delete self.map_[id];
            }
            r.getPromise().then(unmap, unmap);
        }
        /**
         * Cancels all registered requests.
         */

    }, {
        key: 'clear',
        value: function clear() {
            object.forEach(this.map_, function (key, val) {
                if (val) {
                    val.cancel(true);
                }
            });
            this.map_ = {};
        }
    }]);

    return RequestMap;
}();
//# sourceMappingURL=requestmap.js.map


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestEndStatus = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/**
 * @fileoverview Defines methods used to actually send HTTP requests from
 * abstract representations.
 */


exports.addAuthHeader_ = addAuthHeader_;
exports.addVersionHeader_ = addVersionHeader_;
exports.makeRequest = makeRequest;

var _array = __webpack_require__(100);

var array = _interopRequireWildcard(_array);

var _backoff = __webpack_require__(356);

var backoff = _interopRequireWildcard(_backoff);

var _error = __webpack_require__(29);

var errorsExports = _interopRequireWildcard(_error);

var _object = __webpack_require__(48);

var object = _interopRequireWildcard(_object);

var _promise_external = __webpack_require__(42);

var promiseimpl = _interopRequireWildcard(_promise_external);

var _type = __webpack_require__(18);

var type = _interopRequireWildcard(_type);

var _url = __webpack_require__(99);

var UrlUtils = _interopRequireWildcard(_url);

var _xhrio = __webpack_require__(132);

var XhrIoExports = _interopRequireWildcard(_xhrio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @struct
 * @template T
 */
var NetworkRequest = function () {
    function NetworkRequest(url, method, headers, body, successCodes, additionalRetryCodes, callback, errorCallback, timeout, progressCallback, pool) {
        _classCallCheck(this, NetworkRequest);

        this.pendingXhr_ = null;
        this.backoffId_ = null;
        this.resolve_ = null;
        this.reject_ = null;
        this.canceled_ = false;
        this.appDelete_ = false;
        this.url_ = url;
        this.method_ = method;
        this.headers_ = headers;
        this.body_ = body;
        this.successCodes_ = successCodes.slice();
        this.additionalRetryCodes_ = additionalRetryCodes.slice();
        this.callback_ = callback;
        this.errorCallback_ = errorCallback;
        this.progressCallback_ = progressCallback;
        this.timeout_ = timeout;
        this.pool_ = pool;
        var self = this;
        this.promise_ = promiseimpl.make(function (resolve, reject) {
            self.resolve_ = resolve;
            self.reject_ = reject;
            self.start_();
        });
    }
    /**
     * Actually starts the retry loop.
     */


    _createClass(NetworkRequest, [{
        key: 'start_',
        value: function start_() {
            var self = this;
            function doTheRequest(backoffCallback, canceled) {
                if (canceled) {
                    backoffCallback(false, new RequestEndStatus(false, null, true));
                    return;
                }
                var xhr = self.pool_.createXhrIo();
                self.pendingXhr_ = xhr;
                function progressListener(progressEvent) {
                    var loaded = progressEvent.loaded;
                    var total = progressEvent.lengthComputable ? progressEvent.total : -1;
                    if (self.progressCallback_ !== null) {
                        self.progressCallback_(loaded, total);
                    }
                }
                if (self.progressCallback_ !== null) {
                    xhr.addUploadProgressListener(progressListener);
                }
                xhr.send(self.url_, self.method_, self.body_, self.headers_).then(function (xhr) {
                    if (self.progressCallback_ !== null) {
                        xhr.removeUploadProgressListener(progressListener);
                    }
                    self.pendingXhr_ = null;
                    xhr = xhr;
                    var hitServer = xhr.getErrorCode() === XhrIoExports.ErrorCode.NO_ERROR;
                    var status = xhr.getStatus();
                    if (!hitServer || self.isRetryStatusCode_(status)) {
                        var wasCanceled = xhr.getErrorCode() === XhrIoExports.ErrorCode.ABORT;
                        backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
                        return;
                    }
                    var successCode = array.contains(self.successCodes_, status);
                    backoffCallback(true, new RequestEndStatus(successCode, xhr));
                });
            }
            /**
             * @param requestWentThrough True if the request eventually went
             *     through, false if it hit the retry limit or was canceled.
             */
            function backoffDone(requestWentThrough, status) {
                var resolve = self.resolve_;
                var reject = self.reject_;
                var xhr = status.xhr;
                if (status.wasSuccessCode) {
                    try {
                        var result = self.callback_(xhr, xhr.getResponseText());
                        if (type.isJustDef(result)) {
                            resolve(result);
                        } else {
                            resolve();
                        }
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    if (xhr !== null) {
                        var err = errorsExports.unknown();
                        err.setServerResponseProp(xhr.getResponseText());
                        if (self.errorCallback_) {
                            reject(self.errorCallback_(xhr, err));
                        } else {
                            reject(err);
                        }
                    } else {
                        if (status.canceled) {
                            var _err = self.appDelete_ ? errorsExports.appDeleted() : errorsExports.canceled();
                            reject(_err);
                        } else {
                            var _err2 = errorsExports.retryLimitExceeded();
                            reject(_err2);
                        }
                    }
                }
            }
            if (this.canceled_) {
                backoffDone(false, new RequestEndStatus(false, null, true));
            } else {
                this.backoffId_ = backoff.start(doTheRequest, backoffDone, this.timeout_);
            }
        }
        /** @inheritDoc */

    }, {
        key: 'getPromise',
        value: function getPromise() {
            return this.promise_;
        }
        /** @inheritDoc */

    }, {
        key: 'cancel',
        value: function cancel(appDelete) {
            this.canceled_ = true;
            this.appDelete_ = appDelete || false;
            if (this.backoffId_ !== null) {
                backoff.stop(this.backoffId_);
            }
            if (this.pendingXhr_ !== null) {
                this.pendingXhr_.abort();
            }
        }
    }, {
        key: 'isRetryStatusCode_',
        value: function isRetryStatusCode_(status) {
            // The codes for which to retry came from this page:
            // https://cloud.google.com/storage/docs/exponential-backoff
            var isExtraRetryCode = array.contains([
            // Request Timeout: web server didn't receive full request in time.
            408,
            // Too Many Requests: you're getting rate-limited, basically.
            429], status);
            var isRequestSpecificRetryCode = array.contains(this.additionalRetryCodes_, status);
            return status >= 500 && status < 600 || isExtraRetryCode || isRequestSpecificRetryCode;
        }
    }]);

    return NetworkRequest;
}();
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled Defaults to false.
 * @struct
 */


var RequestEndStatus = exports.RequestEndStatus = function RequestEndStatus(wasSuccessCode, xhr, opt_canceled) {
    _classCallCheck(this, RequestEndStatus);

    this.wasSuccessCode = wasSuccessCode;
    this.xhr = xhr;
    this.canceled = !!opt_canceled;
};

function addAuthHeader_(headers, authToken) {
    if (authToken !== null && authToken.length > 0) {
        headers['Authorization'] = 'Firebase ' + authToken;
    }
}
function addVersionHeader_(headers) {
    var number = typeof firebase !== 'undefined' ? firebase.SDK_VERSION : 'AppManager';
    headers['X-Firebase-Storage-Version'] = 'webjs/' + number;
}
/**
 * @template T
 */
function makeRequest(requestInfo, authToken, pool) {
    var queryPart = UrlUtils.makeQueryString(requestInfo.urlParams);
    var url = requestInfo.url + queryPart;
    var headers = object.clone(requestInfo.headers);
    addAuthHeader_(headers, authToken);
    addVersionHeader_(headers);
    return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, pool);
}
//# sourceMappingURL=request.js.map


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = start;
exports.stop = stop;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @param f May be invoked
 *     before the function returns.
 * @param callback Get all the arguments passed to the function
 *     passed to f, including the initial boolean.
 */
function start(f, callback, timeout) {
    // TODO(andysoto): make this code cleaner (probably refactor into an actual
    // type instead of a bunch of functions with state shared in the closure)
    var waitSeconds = 1;
    // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
    var timeoutId = null;
    var hitTimeout = false;
    var cancelState = 0;
    function canceled() {
        return cancelState === 2;
    }
    var triggeredCallback = false;
    function triggerCallback() {
        if (!triggeredCallback) {
            triggeredCallback = true;
            callback.apply(null, arguments);
        }
    }
    function callWithDelay(millis) {
        timeoutId = setTimeout(function () {
            timeoutId = null;
            f(handler, canceled());
        }, millis);
    }
    function handler(success) {
        for (var _len = arguments.length, var_args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            var_args[_key - 1] = arguments[_key];
        }

        if (triggeredCallback) {
            return;
        }
        if (success) {
            triggerCallback.apply(null, arguments);
            return;
        }
        var mustStop = canceled() || hitTimeout;
        if (mustStop) {
            triggerCallback.apply(null, arguments);
            return;
        }
        if (waitSeconds < 64) {
            /* TODO(andysoto): don't back off so quickly if we know we're offline. */
            waitSeconds *= 2;
        }
        var waitMillis = void 0;
        if (cancelState === 1) {
            cancelState = 2;
            waitMillis = 0;
        } else {
            waitMillis = (waitSeconds + Math.random()) * 1000;
        }
        callWithDelay(waitMillis);
    }
    var stopped = false;
    function stop(wasTimeout) {
        if (stopped) {
            return;
        }
        stopped = true;
        if (triggeredCallback) {
            return;
        }
        if (timeoutId !== null) {
            if (!wasTimeout) {
                cancelState = 2;
            }
            clearTimeout(timeoutId);
            callWithDelay(0);
        } else {
            if (!wasTimeout) {
                cancelState = 1;
            }
        }
    }
    callWithDelay(0);
    setTimeout(function () {
        hitTimeout = true;
        stop(true);
    }, timeout);
    return stop;
}
/**
 * Stops the retry loop from repeating.
 * If the function is currently "in between" retries, it is invoked immediately
 * with the second parameter as "true". Otherwise, it will be invoked once more
 * after the current invocation finishes iff the current invocation would have
 * triggered another retry.
 */
function stop(id) {
    id(false);
}
//# sourceMappingURL=backoff.js.map


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerMessaging = registerMessaging;

var _windowController = __webpack_require__(358);

var _windowController2 = _interopRequireDefault(_windowController);

var _swController = __webpack_require__(362);

var _swController2 = _interopRequireDefault(_swController);

var _app = __webpack_require__(53);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerMessaging(instance) {
    instance.INTERNAL.registerService('messaging', function factoryMethod(app) {
        if (self && 'ServiceWorkerGlobalScope' in self) {
            return new _swController2.default(app);
        }
        // Assume we are in the window context.
        return new _windowController2.default(app);
    }, {
        // no-inline
        'Messaging': _windowController2.default
    });
}
registerMessaging(_app2.default);
//# sourceMappingURL=messaging.js.map


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _controllerInterface = __webpack_require__(137);

var _controllerInterface2 = _interopRequireDefault(_controllerInterface);

var _errors = __webpack_require__(67);

var _errors2 = _interopRequireDefault(_errors);

var _workerPageMessage = __webpack_require__(140);

var _workerPageMessage2 = _interopRequireDefault(_workerPageMessage);

var _defaultSw = __webpack_require__(361);

var _defaultSw2 = _interopRequireDefault(_defaultSw);

var _notificationPermission = __webpack_require__(139);

var _notificationPermission2 = _interopRequireDefault(_notificationPermission);

var _subscribe = __webpack_require__(130);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowController = function (_ControllerInterface) {
    _inherits(WindowController, _ControllerInterface);

    /**
     * A service that provides a MessagingService instance.
     * @param {!firebase.app.App} app
     */
    function WindowController(app) {
        _classCallCheck(this, WindowController);

        /**
         * @private
         * @type {ServiceWorkerRegistration}
         */
        var _this = _possibleConstructorReturn(this, (WindowController.__proto__ || Object.getPrototypeOf(WindowController)).call(this, app));

        _this.registrationToUse_;
        /**
         * @private
         * @type {Promise}
         */
        _this.manifestCheckPromise_;
        /**
         * @private
         * @type {firebase.Observer}
         */
        _this.messageObserver_ = null;
        /**
         * @private {!firebase.Subscribe} The subscribe function to the onMessage
         * observer.
         */
        _this.onMessage_ = (0, _subscribe.createSubscribe)(function (observer) {
            _this.messageObserver_ = observer;
        });
        /**
         * @private
         * @type {firebase.Observer}
         */
        _this.tokenRefreshObserver_ = null;
        _this.onTokenRefresh_ = (0, _subscribe.createSubscribe)(function (observer) {
            _this.tokenRefreshObserver_ = observer;
        });
        _this.setupSWMessageListener_();
        return _this;
    }
    /**
     * This method returns an FCM token if it can be generated.
     * The return promise will reject if the browser doesn't support
     * FCM, if permission is denied for notifications or it's not
     * possible to generate a token.
     * @export
     * @return {Promise<string> | Promise<null>} Returns a promise the
     * resolves to an FCM token or null if permission isn't granted.
     */


    _createClass(WindowController, [{
        key: 'getToken',
        value: function getToken() {
            var _this2 = this;

            // Check that the required API's are available
            if (!this.isSupported_()) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.UNSUPPORTED_BROWSER));
            }
            return this.manifestCheck_().then(function () {
                return _get(WindowController.prototype.__proto__ || Object.getPrototypeOf(WindowController.prototype), 'getToken', _this2).call(_this2);
            });
        }
        /**
         * The method checks that a manifest is defined and has the correct GCM
         * sender ID.
         * @private
         * @return {Promise} Returns a promise that resolves if the manifest matches
         * our required sender ID
         */

    }, {
        key: 'manifestCheck_',
        value: function manifestCheck_() {
            var _this3 = this;

            if (this.manifestCheckPromise_) {
                return this.manifestCheckPromise_;
            }
            var manifestTag = document.querySelector('link[rel="manifest"]');
            if (!manifestTag) {
                this.manifestCheckPromise_ = Promise.resolve();
            } else {
                this.manifestCheckPromise_ = fetch(manifestTag.href).then(function (response) {
                    return response.json();
                }).catch(function () {
                    // If the download or parsing fails allow check.
                    // We only want to error if we KNOW that the gcm_sender_id is incorrect.
                    return Promise.resolve();
                }).then(function (manifestContent) {
                    if (!manifestContent) {
                        return;
                    }
                    if (!manifestContent['gcm_sender_id']) {
                        return;
                    }
                    if (manifestContent['gcm_sender_id'] !== '103953800507') {
                        throw _this3.errorFactory_.create(_errors2.default.codes.INCORRECT_GCM_SENDER_ID);
                    }
                });
            }
            return this.manifestCheckPromise_;
        }
        /**
         * Request permission if it is not currently granted
         * @export
         * @returns {Promise} Resolves if the permission was granted, otherwise
         * rejects
         */

    }, {
        key: 'requestPermission',
        value: function requestPermission() {
            var _this4 = this;

            if (Notification.permission === _notificationPermission2.default.granted) {
                return Promise.resolve();
            }
            return new Promise(function (resolve, reject) {
                var managePermissionResult = function (result) {
                    if (result === _notificationPermission2.default.granted) {
                        return resolve();
                    } else if (result === _notificationPermission2.default.denied) {
                        return reject(_this4.errorFactory_.create(_errors2.default.codes.PERMISSION_BLOCKED));
                    } else {
                        return reject(_this4.errorFactory_.create(_errors2.default.codes.PERMISSION_DEFAULT));
                    }
                };
                // The Notification.requestPermission API was changed to
                // return a promise so now have to handle both in case
                // browsers stop support callbacks for promised version
                var permissionPromise = Notification.requestPermission(function (result) {
                    if (permissionPromise) {
                        // Let the promise manage this
                        return;
                    }
                    managePermissionResult(result);
                });
                if (permissionPromise) {
                    // Prefer the promise version as it's the future API.
                    permissionPromise.then(managePermissionResult);
                }
            });
        }
        /**
         * This method allows a developer to override the default service worker and
         * instead use a custom service worker.
         * @export
         * @param {!ServiceWorkerRegistration} registration The service worker
         * registration that should be used to receive the push messages.
         */

    }, {
        key: 'useServiceWorker',
        value: function useServiceWorker(registration) {
            if (!(registration instanceof ServiceWorkerRegistration)) {
                throw this.errorFactory_.create(_errors2.default.codes.SW_REGISTRATION_EXPECTED);
            }
            if (typeof this.registrationToUse_ !== 'undefined') {
                throw this.errorFactory_.create(_errors2.default.codes.USE_SW_BEFORE_GET_TOKEN);
            }
            this.registrationToUse_ = registration;
        }
        /**
         * @export
         * @param {!firebase.Observer|function(*)} nextOrObserver An observer object
         * or a function triggered on message.
         * @param {function(!Error)=} optError Optional A function triggered on
         * message error.
         * @param {function()=} optCompleted Optional function triggered when the
         * observer is removed.
         * @return {!function()} The unsubscribe function for the observer.
         */

    }, {
        key: 'onMessage',
        value: function onMessage(nextOrObserver, optError, optCompleted) {
            return this.onMessage_(nextOrObserver, optError, optCompleted);
        }
        /**
         * @export
         * @param {!firebase.Observer|function()} nextOrObserver An observer object
         * or a function triggered on token refresh.
         * @param {function(!Error)=} optError Optional A function
         * triggered on token refresh error.
         * @param {function()=} optCompleted Optional function triggered when the
         * observer is removed.
         * @return {!function()} The unsubscribe function for the observer.
         */

    }, {
        key: 'onTokenRefresh',
        value: function onTokenRefresh(nextOrObserver, optError, optCompleted) {
            return this.onTokenRefresh_(nextOrObserver, optError, optCompleted);
        }
        /**
         * Given a registration, wait for the service worker it relates to
         * become activer
         * @private
         * @param  {ServiceWorkerRegistration} registration Registration to wait
         * for service worker to become active
         * @return {Promise<!ServiceWorkerRegistration>} Wait for service worker
         * registration to become active
         */

    }, {
        key: 'waitForRegistrationToActivate_',
        value: function waitForRegistrationToActivate_(registration) {
            var _this5 = this;

            var serviceWorker = registration.installing || registration.waiting || registration.active;
            return new Promise(function (resolve, reject) {
                if (!serviceWorker) {
                    // This is a rare scenario but has occured in firefox
                    reject(_this5.errorFactory_.create(_errors2.default.codes.NO_SW_IN_REG));
                    return;
                }
                // Because the Promise function is called on next tick there is a
                // small chance that the worker became active or redundant already.
                if (serviceWorker.state === 'activated') {
                    resolve(registration);
                    return;
                }
                if (serviceWorker.state === 'redundant') {
                    reject(_this5.errorFactory_.create(_errors2.default.codes.SW_REG_REDUNDANT));
                    return;
                }
                var stateChangeListener = function () {
                    if (serviceWorker.state === 'activated') {
                        resolve(registration);
                    } else if (serviceWorker.state === 'redundant') {
                        reject(_this5.errorFactory_.create(_errors2.default.codes.SW_REG_REDUNDANT));
                    } else {
                        // Return early and wait to next state change
                        return;
                    }
                    serviceWorker.removeEventListener('statechange', stateChangeListener);
                };
                serviceWorker.addEventListener('statechange', stateChangeListener);
            });
        }
        /**
         * This will regiater the default service worker and return the registration
         * @private
         * @return {Promise<!ServiceWorkerRegistration>} The service worker
         * registration to be used for the push service.
         */

    }, {
        key: 'getSWRegistration_',
        value: function getSWRegistration_() {
            var _this6 = this;

            if (this.registrationToUse_) {
                return this.waitForRegistrationToActivate_(this.registrationToUse_);
            }
            // Make the registration null so we know useServiceWorker will not
            // use a new service worker as registrationToUse_ is no longer undefined
            this.registrationToUse_ = null;
            return navigator.serviceWorker.register(_defaultSw2.default.path, {
                scope: _defaultSw2.default.scope
            }).catch(function (err) {
                throw _this6.errorFactory_.create(_errors2.default.codes.FAILED_DEFAULT_REGISTRATION, {
                    'browserErrorMessage': err.message
                });
            }).then(function (registration) {
                return _this6.waitForRegistrationToActivate_(registration).then(function () {
                    _this6.registrationToUse_ = registration;
                    // We update after activation due to an issue with Firefox v49 where
                    // a race condition occassionally causes the service work to not
                    // install
                    registration.update();
                    return registration;
                });
            });
        }
        /**
         * This method will set up a message listener to handle
         * events from the service worker that should trigger
         * events in the page.
         *
         * @private
         */

    }, {
        key: 'setupSWMessageListener_',
        value: function setupSWMessageListener_() {
            var _this7 = this;

            if (!('serviceWorker' in navigator)) {
                return;
            }
            navigator.serviceWorker.addEventListener('message', function (event) {
                if (!event.data || !event.data[_workerPageMessage2.default.PARAMS.TYPE_OF_MSG]) {
                    // Not a message from FCM
                    return;
                }
                var workerPageMessage = event.data;
                switch (workerPageMessage[_workerPageMessage2.default.PARAMS.TYPE_OF_MSG]) {
                    case _workerPageMessage2.default.TYPES_OF_MSG.PUSH_MSG_RECEIVED:
                    case _workerPageMessage2.default.TYPES_OF_MSG.NOTIFICATION_CLICKED:
                        var pushMessage = workerPageMessage[_workerPageMessage2.default.PARAMS.DATA];
                        _this7.messageObserver_.next(pushMessage);
                        break;
                    default:
                        // Noop.
                        break;
                }
            }, false);
        }
        /**
         * Checks to see if the required API's are valid or not.
         * @private
         * @return {boolean} Returns true if the desired APIs are available.
         */

    }, {
        key: 'isSupported_',
        value: function isSupported_() {
            return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') && PushSubscription.prototype.hasOwnProperty('getKey');
        }
    }]);

    return WindowController;
}(_controllerInterface2.default);

exports.default = WindowController;
module.exports = exports['default'];
//# sourceMappingURL=window-controller.js.map


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(95);

var _errors2 = __webpack_require__(67);

var _errors3 = _interopRequireDefault(_errors2);

var _arrayBufferToBase = __webpack_require__(360);

var _arrayBufferToBase2 = _interopRequireDefault(_arrayBufferToBase);

var _fcmDetails = __webpack_require__(138);

var _fcmDetails2 = _interopRequireDefault(_fcmDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FCM_TOKEN_DETAILS_DB = 'fcm_token_details_db';
var FCM_TOKEN_OBJ_STORE = 'fcm_token_object_Store';
var FCM_TOKEN_DETAILS_DB_VERSION = 1;

var TokenManager = function () {
    function TokenManager() {
        _classCallCheck(this, TokenManager);

        this.errorFactory_ = new _errors.ErrorFactory('messaging', 'Messaging', _errors3.default.map);
        this.openDbPromise_ = null;
    }
    /**
     * Get the indexedDB as a promsie.
     * @private
     * @return {Promise<IDBDatabase>} The IndexedDB database
     */


    _createClass(TokenManager, [{
        key: 'openDatabase_',
        value: function openDatabase_() {
            if (this.openDbPromise_) {
                return this.openDbPromise_;
            }
            this.openDbPromise_ = new Promise(function (resolve, reject) {
                var request = indexedDB.open(FCM_TOKEN_DETAILS_DB, FCM_TOKEN_DETAILS_DB_VERSION);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                request.onupgradeneeded = function (event) {
                    var db = event.target.result;
                    var objectStore = db.createObjectStore(FCM_TOKEN_OBJ_STORE, {
                        keyPath: 'swScope'
                    });
                    // Make sure the sender ID can be searched
                    objectStore.createIndex('fcmSenderId', 'fcmSenderId', {
                        unique: false
                    });
                    objectStore.createIndex('fcmToken', 'fcmToken', {
                        unique: true
                    });
                };
            });
            return this.openDbPromise_;
        }
        /**
         * Close the currently open database.
         * @return {Promise<?>} Returns the result of the promise chain.
         */

    }, {
        key: 'closeDatabase',
        value: function closeDatabase() {
            var _this = this;

            if (this.openDbPromise_) {
                return this.openDbPromise_.then(function (db) {
                    db.close();
                    _this.openDbPromise_ = null;
                });
            }
            return Promise.resolve();
        }
        /**
         * Given a token, this method will look up the details in indexedDB.
         * @public
         * @param {string} fcmToken
         * @return {Promise<Object>} The details associated with that token.
         */

    }, {
        key: 'getTokenDetailsFromToken',
        value: function getTokenDetailsFromToken(fcmToken) {
            return this.openDatabase_().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var index = objectStore.index('fcmToken');
                    var request = index.get(fcmToken);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function (event) {
                        resolve(event.target.result);
                    };
                });
            });
        }
    }, {
        key: 'getTokenDetailsFromSWScope_',
        value: function getTokenDetailsFromSWScope_(swScope) {
            return this.openDatabase_().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var scopeRequest = objectStore.get(swScope);
                    scopeRequest.onerror = function (event) {
                        reject(event.target.error);
                    };
                    scopeRequest.onsuccess = function (event) {
                        resolve(event.target.result);
                    };
                });
            });
        }
    }, {
        key: 'getAllTokenDetailsForSenderId_',
        value: function getAllTokenDetailsForSenderId_(senderId) {
            return this.openDatabase_().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var senderIdTokens = [];
                    var cursorRequest = objectStore.openCursor();
                    cursorRequest.onerror = function (event) {
                        reject(event.target.error);
                    };
                    cursorRequest.onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            if (cursor.value['fcmSenderId'] === senderId) {
                                senderIdTokens.push(cursor.value);
                            }
                            cursor.continue();
                        } else {
                            resolve(senderIdTokens);
                        }
                    };
                });
            });
        }
        /**
         * Given a PushSubscription and messagingSenderId, get an FCM token.
         * @public
         * @param  {string} senderId The 'messagingSenderId' to tie the token to.
         * @param  {PushSubscription} subscription The PushSusbcription to "federate".
         * @param  {string=} pushSet If defined this will swap the subscription for
         * matching FCM token.
         * @return {Promise<!Object>} Returns the FCM token to be used in place
         * of the PushSubscription.
         */

    }, {
        key: 'subscribeToFCM',
        value: function subscribeToFCM(senderId, subscription, pushSet) {
            var _this2 = this;

            var p256dh = (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh'));
            var auth = (0, _arrayBufferToBase2.default)(subscription['getKey']('auth'));
            var fcmSubscribeBody = 'authorized_entity=' + senderId + '&' + ('endpoint=' + subscription.endpoint + '&') + ('encryption_key=' + p256dh + '&') + ('encryption_auth=' + auth);
            if (pushSet) {
                fcmSubscribeBody += '&pushSet=' + pushSet;
            }
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var subscribeOptions = {
                method: 'POST',
                headers: headers,
                body: fcmSubscribeBody
            };
            return fetch(_fcmDetails2.default.ENDPOINT + '/fcm/connect/subscribe', subscribeOptions).then(function (response) {
                return response.json();
            }).then(function (response) {
                var fcmTokenResponse = response;
                if (fcmTokenResponse['error']) {
                    var message = fcmTokenResponse['error']['message'];
                    throw _this2.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_FAILED, { 'message': message });
                }
                if (!fcmTokenResponse['token']) {
                    throw _this2.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_NO_TOKEN);
                }
                if (!fcmTokenResponse['pushSet']) {
                    throw _this2.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_NO_PUSH_SET);
                }
                return {
                    'token': fcmTokenResponse['token'],
                    'pushSet': fcmTokenResponse['pushSet']
                };
            });
        }
        /**
         * Checks the that fields in the PushSubscription are equivalent to the
         * details stores in the masterTokenDetails.
         * @private
         * @param  {PushSubscription} subscription The push subscription we expect
         * the master token to match.
         * @param  {Object}  masterTokenDetails The saved details we wish to compare
         * with the PushSubscription
         * @return {boolean} true if the subscription and token details are
         * equivalent.
         */

    }, {
        key: 'isSameSubscription_',
        value: function isSameSubscription_(subscription, masterTokenDetails) {
            // getKey() isn't defined in the PushSubscription externs file, hence
            // subscription['getKey']('<key name>').
            return subscription.endpoint === masterTokenDetails['endpoint'] && (0, _arrayBufferToBase2.default)(subscription['getKey']('auth')) === masterTokenDetails['auth'] && (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh')) === masterTokenDetails['p256dh'];
        }
        /**
         * Save the details for the fcm token for re-use at a later date.
         * @private
         * @param  {string} senderId The 'messagingSenderId' used for this project
         * @param  {ServiceWorkerRegistration} swRegistration The service worker
         * used to subscribe the user for web push
         * @param  {PushSubscription} subscription The push subscription passed to
         * FCM for the current token.
         * @param  {string} fcmToken The FCM token currently used on this
         * device.
         * @param  {string} fcmPushSet The FCM push tied to the fcm token.
         * @return {Promise<void>}
         */

    }, {
        key: 'saveTokenDetails_',
        value: function saveTokenDetails_(senderId, swRegistration, subscription, fcmToken, fcmPushSet) {
            var details = {
                'swScope': swRegistration.scope,
                'endpoint': subscription.endpoint,
                'auth': (0, _arrayBufferToBase2.default)(subscription['getKey']('auth')),
                'p256dh': (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh')),
                'fcmToken': fcmToken,
                'fcmPushSet': fcmPushSet,
                'fcmSenderId': senderId
            };
            return this.openDatabase_().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], 'readwrite');
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var request = objectStore.put(details);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function () {
                        resolve();
                    };
                });
            });
        }
        /**
         * Returns the saved FCM Token if one is available and still valid,
         * otherwise `null` is returned.
         * @param {string} senderId This should be the sender ID associated with the
         * FCM Token being retrieved.
         * @param {ServiceWorkerRegistration} swRegistration Registration to be used
         * to subscribe the user to push.
         * @return {Promise<string> | Promise} Returns the saved FCM Token if
         * avilable and valid.
         * @export
         */

    }, {
        key: 'getSavedToken',
        value: function getSavedToken(senderId, swRegistration) {
            var _this3 = this;

            if (!(swRegistration instanceof ServiceWorkerRegistration)) {
                return Promise.reject(this.errorFactory_.create(_errors3.default.codes.SW_REGISTRATION_EXPECTED));
            }
            if (typeof senderId !== 'string' || senderId.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors3.default.codes.BAD_SENDER_ID));
            }
            return this.getAllTokenDetailsForSenderId_(senderId).then(function (allTokenDetails) {
                if (allTokenDetails.length === 0) {
                    return;
                }
                var index = allTokenDetails.findIndex(function (tokenDetails) {
                    return swRegistration.scope === tokenDetails['swScope'] && senderId === tokenDetails['fcmSenderId'];
                });
                if (index === -1) {
                    return;
                }
                return allTokenDetails[index];
            }).then(function (tokenDetails) {
                if (!tokenDetails) {
                    return;
                }
                return swRegistration.pushManager.getSubscription().catch(function () {
                    throw _this3.errorFactory_.create(_errors3.default.codes.GET_SUBSCRIPTION_FAILED);
                }).then(function (subscription) {
                    if (subscription && _this3.isSameSubscription_(subscription, tokenDetails)) {
                        return tokenDetails['fcmToken'];
                    }
                });
            });
        }
        /**
         * Creates a new FCM token.
         */

    }, {
        key: 'createToken',
        value: function createToken(senderId, swRegistration) {
            var _this4 = this;

            if (typeof senderId !== 'string' || senderId.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors3.default.codes.BAD_SENDER_ID));
            }
            if (!(swRegistration instanceof ServiceWorkerRegistration)) {
                return Promise.reject(this.errorFactory_.create(_errors3.default.codes.SW_REGISTRATION_EXPECTED));
            }
            // Check for existing subscription first
            var subscription = void 0;
            var fcmTokenDetails = void 0;
            return swRegistration.pushManager.getSubscription().then(function (subscription) {
                if (subscription) {
                    return subscription;
                }
                return swRegistration.pushManager.subscribe(_fcmDetails2.default.SUBSCRIPTION_OPTIONS);
            }).then(function (sub) {
                subscription = sub;
                return _this4.subscribeToFCM(senderId, subscription);
            }).then(function (tokenDetails) {
                fcmTokenDetails = tokenDetails;
                return _this4.saveTokenDetails_(senderId, swRegistration, subscription, fcmTokenDetails['token'], fcmTokenDetails['pushSet']);
            }).then(function () {
                return fcmTokenDetails['token'];
            });
        }
        /**
         * This method deletes details of the current FCM token.
         * It's returning a promise in case we need to move to an async
         * method for deleting at a later date.
         * @param {string} token Token to be deleted
         * @return {Promise<Object>} Resolves once the FCM token details have been
         * deleted and returns the deleted details.
         */

    }, {
        key: 'deleteToken',
        value: function deleteToken(token) {
            var _this5 = this;

            if (typeof token !== 'string' || token.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors3.default.codes.INVALID_DELETE_TOKEN));
            }
            return this.getTokenDetailsFromToken(token).then(function (details) {
                if (!details) {
                    throw _this5.errorFactory_.create(_errors3.default.codes.DELETE_TOKEN_NOT_FOUND);
                }
                return _this5.openDatabase_().then(function (db) {
                    return new Promise(function (resolve, reject) {
                        var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], 'readwrite');
                        var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                        var request = objectStore.delete(details['swScope']);
                        request.onerror = function (event) {
                            reject(event.target.error);
                        };
                        request.onsuccess = function (event) {
                            if (event.target.result === 0) {
                                reject(_this5.errorFactory_.create(_errors3.default.codes.FAILED_TO_DELETE_TOKEN));
                                return;
                            }
                            resolve(details);
                        };
                    });
                });
            });
        }
    }]);

    return TokenManager;
}();

exports.default = TokenManager;
module.exports = exports['default'];
//# sourceMappingURL=token-manager.js.map


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function toBase64(arrayBuffer) {
    var uint8Version = new Uint8Array(arrayBuffer);
    return window.btoa(String.fromCharCode.apply(null, uint8Version));
}

exports.default = function (arrayBuffer) {
    var base64String = toBase64(arrayBuffer);
    return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

module.exports = exports['default'];
//# sourceMappingURL=array-buffer-to-base64.js.map


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    path: '/firebase-messaging-sw.js',
    scope: '/firebase-cloud-messaging-push-scope'
};
module.exports = exports['default'];
//# sourceMappingURL=default-sw.js.map


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controllerInterface = __webpack_require__(137);

var _controllerInterface2 = _interopRequireDefault(_controllerInterface);

var _errors = __webpack_require__(67);

var _errors2 = _interopRequireDefault(_errors);

var _workerPageMessage = __webpack_require__(140);

var _workerPageMessage2 = _interopRequireDefault(_workerPageMessage);

var _fcmDetails = __webpack_require__(138);

var _fcmDetails2 = _interopRequireDefault(_fcmDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FCM_MSG = 'FCM_MSG';

var SWController = function (_ControllerInterface) {
    _inherits(SWController, _ControllerInterface);

    function SWController(app) {
        _classCallCheck(this, SWController);

        var _this = _possibleConstructorReturn(this, (SWController.__proto__ || Object.getPrototypeOf(SWController)).call(this, app));

        self.addEventListener('push', function (e) {
            return _this.onPush_(e);
        }, false);
        self.addEventListener('pushsubscriptionchange', function (e) {
            return _this.onSubChange_(e);
        }, false);
        self.addEventListener('notificationclick', function (e) {
            return _this.onNotificationClick_(e);
        }, false);
        /**
         * @private
         * @type {function(Object)|null}
         */
        _this.bgMessageHandler_ = null;
        return _this;
    }
    /**
    * A handler for push events that shows notifications based on the content of
    * the payload.
    *
    * The payload must be a JSON-encoded Object with a `notification` key. The
    * value of the `notification` property will be used as the NotificationOptions
    * object passed to showNotification. Additionally, the `title` property of the
    * notification object will be used as the title.
    *
    * If there is no notification data in the payload then no notification will be
    * shown.
    * @private
    */


    _createClass(SWController, [{
        key: 'onPush_',
        value: function onPush_(event) {
            var _this2 = this;

            var msgPayload = void 0;
            try {
                msgPayload = event.data.json();
            } catch (err) {
                // Not JSON so not an FCM message
                return;
            }
            var handleMsgPromise = this.hasVisibleClients_().then(function (hasVisibleClients) {
                if (hasVisibleClients) {
                    // Do not need to show a notification.
                    if (msgPayload.notification || _this2.bgMessageHandler_) {
                        // Send to page
                        return _this2.sendMessageToWindowClients_(msgPayload);
                    }
                    return;
                }
                var notificationDetails = _this2.getNotificationData_(msgPayload);
                if (notificationDetails) {
                    var notificationTitle = notificationDetails.title || '';
                    return self.registration.showNotification(notificationTitle, notificationDetails);
                } else if (_this2.bgMessageHandler_) {
                    return _this2.bgMessageHandler_(msgPayload);
                }
            });
            event.waitUntil(handleMsgPromise);
        }
        /**
        * @private
        */

    }, {
        key: 'onSubChange_',
        value: function onSubChange_(event) {
            var _this3 = this;

            var promiseChain = this.getToken().then(function (token) {
                if (!token) {
                    // We can't resubscribe if we don't have an FCM token for this scope.
                    throw _this3.errorFactory_.create(_errors2.default.codes.NO_FCM_TOKEN_FOR_RESUBSCRIBE);
                }
                var tokenDetails = null;
                var tokenManager = _this3.getTokenManager();
                return tokenManager.getTokenDetailsFromToken(token).then(function (details) {
                    tokenDetails = details;
                    if (!tokenDetails) {
                        throw _this3.errorFactory_.create(_errors2.default.codes.INVALID_SAVED_TOKEN);
                    }
                    // Attempt to get a new subscription
                    return self.registration.pushManager.subscribe(_fcmDetails2.default.SUBSCRIPTION_OPTIONS);
                }).then(function (newSubscription) {
                    // Send new subscription to FCM.
                    return tokenManager.subscribeToFCM(tokenDetails.fcmSenderId, newSubscription, tokenDetails.fcmPushSet);
                }).catch(function (err) {
                    // The best thing we can do is log this to the terminal so
                    // developers might notice the error.
                    return tokenManager.deleteToken(tokenDetails.fcmToken).then(function () {
                        throw _this3.errorFactory_.create(_errors2.default.codes.UNABLE_TO_RESUBSCRIBE, {
                            'message': err
                        });
                    });
                });
            });
            event.waitUntil(promiseChain);
        }
        /**
        * @private
        */

    }, {
        key: 'onNotificationClick_',
        value: function onNotificationClick_(event) {
            var _this4 = this;

            if (!(event.notification && event.notification.data && event.notification.data[FCM_MSG])) {
                // Not an FCM notification, do nothing.
                return;
            }
            // Prevent other listeners from receiving the event
            event.stopImmediatePropagation();
            event.notification.close();
            var msgPayload = event.notification.data[FCM_MSG];
            var clickAction = msgPayload['notification']['click_action'];
            if (!clickAction) {
                // Nothing to do.
                return;
            }
            var promiseChain = this.getWindowClient_(clickAction).then(function (windowClient) {
                if (!windowClient) {
                    // Unable to find window client so need to open one.
                    return self.clients.openWindow(clickAction);
                }
                return windowClient;
            }).then(function (windowClient) {
                if (!windowClient) {
                    // Window Client will not be returned if it's for a third party origin.
                    return;
                }
                // Delete notification data from payload before sending to the page.
                msgPayload['notification'];

                delete msgPayload['notification'];
                var internalMsg = _workerPageMessage2.default.createNewMsg(_workerPageMessage2.default.TYPES_OF_MSG.NOTIFICATION_CLICKED, msgPayload);
                // Attempt to send a message to the client to handle the data
                // Is affected by: https://github.com/slightlyoff/ServiceWorker/issues/728
                return _this4.attemptToMessageClient_(windowClient, internalMsg);
            });
            event.waitUntil(promiseChain);
        }
        /**
         * @private
         * @param {Object} msgPayload
         * @return {NotificationOptions|undefined}
         */

    }, {
        key: 'getNotificationData_',
        value: function getNotificationData_(msgPayload) {
            if (!msgPayload) {
                return;
            }
            if (_typeof(msgPayload.notification) !== 'object') {
                return;
            }
            var notificationInformation = Object.assign({}, msgPayload.notification);
            // Put the message payload under FCM_MSG name so we can identify the
            // notification as being an FCM notification vs a notification from
            // somewhere else (i.e. normal web push or developer generated
            // notification).
            notificationInformation['data'] = _defineProperty({}, FCM_MSG, msgPayload);
            return notificationInformation;
        }
        /**
         * Calling setBackgroundMessageHandler will opt in to some specific
         * behaviours.
         * 1.) If a notification doesn't need to be shown due to a window already
         * being visible, then push messages will be sent to the page.
         * 2.) If a notification needs to be shown, and the message contains no
         * notification data this method will be called
         * and the promise it returns will be passed to event.waitUntil.
         * If you do not set this callback then all push messages will let and the
         * developer can handle them in a their own 'push' event callback
         * @export
         * @param {function(Object)} callback The callback to be called when a push
         * message is received and a notification must be shown. The callback will
         * be given the data from the push message.
         */

    }, {
        key: 'setBackgroundMessageHandler',
        value: function setBackgroundMessageHandler(callback) {
            if (callback && typeof callback !== 'function') {
                throw this.errorFactory_.create(_errors2.default.codes.BG_HANDLER_FUNCTION_EXPECTED);
            }
            this.bgMessageHandler_ = callback;
        }
        /**
         * @private
         * @param {string} url The URL to look for when focusing a client.
         * @return {Object} Returns an existing window client or a newly opened
         * WindowClient.
         */

    }, {
        key: 'getWindowClient_',
        value: function getWindowClient_(url) {
            // Use URL to normalize the URL when comparing to windowClients.
            // This at least handles whether to include trailing slashes or not
            var parsedURL = new URL(url).href;
            return self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then(function (clientList) {
                var suitableClient = null;
                for (var i = 0; i < clientList.length; i++) {
                    var parsedClientUrl = new URL(clientList[i].url).href;
                    if (parsedClientUrl === parsedURL) {
                        suitableClient = clientList[i];
                        break;
                    }
                }
                if (suitableClient) {
                    suitableClient.focus();
                    return suitableClient;
                }
            });
        }
        /**
         * This message will attempt to send the message to a window client.
         * @private
         * @param {Object} client The WindowClient to send the message to.
         * @param {Object} message The message to send to the client.
         * @returns {Promise} Returns a promise that resolves after sending the
         * message. This does not guarantee that the message was successfully
         * received.
         */

    }, {
        key: 'attemptToMessageClient_',
        value: function attemptToMessageClient_(client, message) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                if (!client) {
                    return reject(_this5.errorFactory_.create(_errors2.default.codes.NO_WINDOW_CLIENT_TO_MSG));
                }
                client.postMessage(message);
                resolve();
            });
        }
        /**
         * @private
         * @returns {Promise<boolean>} If there is currently a visible WindowClient,
         * this method will resolve to true, otherwise false.
         */

    }, {
        key: 'hasVisibleClients_',
        value: function hasVisibleClients_() {
            return self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then(function (clientList) {
                return clientList.some(function (client) {
                    return client.visibilityState === 'visible';
                });
            });
        }
        /**
         * @private
         * @param {Object} msgPayload The data from the push event that should be sent
         * to all available pages.
         * @returns {Promise} Returns a promise that resolves once the message
         * has been sent to all WindowClients.
         */

    }, {
        key: 'sendMessageToWindowClients_',
        value: function sendMessageToWindowClients_(msgPayload) {
            var _this6 = this;

            return self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then(function (clientList) {
                var internalMsg = _workerPageMessage2.default.createNewMsg(_workerPageMessage2.default.TYPES_OF_MSG.PUSH_MSG_RECEIVED, msgPayload);
                return Promise.all(clientList.map(function (client) {
                    return _this6.attemptToMessageClient_(client, internalMsg);
                }));
            });
        }
        /**
         * This will register the default service worker and return the registration.
         * @private
         * @return {Promise<!ServiceWorkerRegistration>} The service worker
         * registration to be used for the push service.
         */

    }, {
        key: 'getSWRegistration_',
        value: function getSWRegistration_() {
            return Promise.resolve(self.registration);
        }
    }]);

    return SWController;
}(_controllerInterface2.default);

exports.default = SWController;
module.exports = exports['default'];
//# sourceMappingURL=sw-controller.js.map


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var moduleInitMap = function () {
  var mapId = $('#map')[0]; // jQuery: return Object - I have to pull out div elem
  var _map = void 0;
  var _geocoder = void 0;

  var _initMap = function _initMap() {
    var centrum = { lat: 52.229676, lng: 21.012229 }; //my focus on start point
    _map = new google.maps.Map(mapId, { //create new map elem in #map
      zoom: 13,
      center: centrum
    });
    _geocoder = new google.maps.Geocoder();
  };

  var makeMap = function makeMap() {
    return _map;
  };

  var makeGeocoder = function makeGeocoder() {
    return _geocoder;
  };

  return {
    initMap: _initMap,
    map: makeMap,
    geocoder: makeGeocoder
  };
}();

exports.default = moduleInitMap;

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var moduleGeocodeMyAddress = function () {

  var _myAddressLatLng = void 0;

  var _geocodeAddress = function _geocodeAddress(geocoder, map, address, callback) {
    geocoder.geocode({ 'address': address + ' , Warszawa' }, function (results, status) {
      if (status === 'OK') {

        _myAddressLatLng = results[0].geometry.location;
        callback(_myAddressLatLng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return {
    geocodeAddress: _geocodeAddress // I take lat and lng of my address

  };
}();

exports.default = moduleGeocodeMyAddress;

// --------------how to use ?
// import import moduleGeocodeMyAddress from './geocodeMyAddress.js';
// moduleGeocodeMyAddress.myAddressLatLng(geocoder , map , address)

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _distance = __webpack_require__(141);

var _distance2 = _interopRequireDefault(_distance);

var _fb = __webpack_require__(129);

var _fb2 = _interopRequireDefault(_fb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleSortCafes = function (resultLatLng) {

  var _allCafes = _fb2.default.coffeeAddress();

  var takeAllCafes = function takeAllCafes(resultLatLng) {

    _allCafes.forEach(function (elem, i) {
      _allCafes[i].push(_distance2.default.takeDistance(resultLatLng, elem[0]));
    });

    _allCafes.sort(function (a, b) {
      return a[2] - b[2];
    }); // sort order - 3rd elem - distance


    return _allCafes;
  };

  return {
    allCafes: takeAllCafes
  };
}();

exports.default = moduleSortCafes;

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hours = __webpack_require__(367);

var _hours2 = _interopRequireDefault(_hours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleSetNameSetAddress = function (allCafes) {

  var setHourAndMinutes = function setHourAndMinutes(when, elem, myWidth) {

    if (when.length === 1 || when.length === 2) {
      $(elem).css("width", (parseInt(myWidth, 10) - 6) * 5 + "%");
      $(elem).html("<span>" + when + " <sup>00</sup> </span>");
    } else {
      var min = void 0;
      if (when.length === 4) {
        // case 1-digit hour
        min = when[2] + when[3]; //return string made of 2 numbers e.g. from[2]=3, from[3]=0 -> min=30
      } else if (when.length === 5) {
        // case 2-digits hour
        min = when[3] + when[4];
      }
      $(elem).css("width", (parseInt(when, 10) - 6) * 5 + "%"); // parse only 1st number e.g. 7:30 -> 7
      $(elem).html("<span>" + parseInt(when, 10) + "<sup>" + min + "</sup></span>");
    }
  };

  var _setNameAndAddress = function _setNameAndAddress(allCafes) {

    $(".cafe-name").each(function (i, elem) {
      // find elements with class cafe-name
      $(elem).text(allCafes[i][1].name);
    });
    $(".cafe-name").each(function (i, elem) {
      // find elements with class cafe-name
      $(elem).next().text(allCafes[i][1].adress);
    });

    // here - changing hours
    $(".cafe-hours-from").each(function (i, elem) {
      // find elements with class cafe-hours-from

      if ((0, _hours2.default)(allCafes[i]).from === "") {
        // if this day cafe is closed

        $(elem).html("<span class=\"closed\">ZAMKNI\u0118TE</span>");
        $(elem).css("width", "50%");
      } else {
        // if it is open

        var from = (0, _hours2.default)(allCafes[i]).from; // 2 type of data in base -> "8" or "7:30"

        setHourAndMinutes(from, elem, from);
      }
    });

    $(".cafe-hours-to").each(function (i, elem) {
      // find elements with class cafe-hours-to

      if ((0, _hours2.default)(allCafes[i]).to === "") {
        // if cafe is closed

        $(elem).html("<span> </span>"); // clearing previous elem
        $(elem).css("width", "0");
      } else {
        // if cafe is open

        var to = (0, _hours2.default)(allCafes[i]).to;

        if (parseInt(to, 10) < 16) {
          // case: cafe is open till late hours - e.g. 2 am

          setHourAndMinutes(to, elem, 24);
        } else {
          // case: cafe is open "normal" and closed before mid.

          setHourAndMinutes(to, elem, to);
        }
      }
    });
  };

  return {
    set: _setNameAndAddress
  };
}();

exports.default = moduleSetNameSetAddress;

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// function which returns opening hours of chosen cafe in actual day of week (obj. new Date() return "today")

var getHours = function getHours(allCafes) {
  // actually allCafes = allCafes[i]

  switch (new Date().getDay()) {
    case 1:
      return allCafes[1].hours().mon;
      break;
    case 2:
      return allCafes[1].hours().tue;
      break;
    case 3:
      return allCafes[1].hours().wed;
      break;
    case 4:
      return allCafes[1].hours().thu;
      break;
    case 5:
      return allCafes[1].hours().fri;
    case 6:
      return allCafes[1].hours().sat;
      break;
    case 0:
      return allCafes[1].hours().sun;
      break;
  }
};

exports.default = getHours;

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var moduleMyMarker = function () {

  var _setMyMarker = function _setMyMarker(latLng, map) {
    map.setCenter(latLng);
    var marker = new google.maps.Marker({
      map: map,
      position: latLng,

      icon: 'img/icons/slice6.png'

    });

    return marker;
  };

  return {
    setMyMarker: _setMyMarker
  };
}();

exports.default = moduleMyMarker;

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var moduleCafeMarker = function () {

  // let infowindow = new google.maps.InfoWindow();

  var _setMyMarker = function _setMyMarker(latLng, map, name) {

    var marker = new google.maps.Marker({
      map: map,
      position: { lat: latLng.lat(), lng: latLng.lng() },
      icon: 'img/icons/slice8.png',
      animation: google.maps.Animation.DROP,
      title: name
    });
    return marker;
  };

  return {
    setCafeMarker: _setMyMarker
  };
}();

exports.default = moduleCafeMarker;

/***/ })
/******/ ]);