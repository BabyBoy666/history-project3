'use strict';
function unityFramework(Module$jscomp$0) {
  function SendMessage$jscomp$0(gameObject$jscomp$0, func$jscomp$3, param$jscomp$3) {
    if (param$jscomp$3 === undefined) {
      Module$jscomp$0.ccall("SendMessage", null, ["string", "string"], [gameObject$jscomp$0, func$jscomp$3]);
    } else {
      if (typeof param$jscomp$3 === "string") {
        Module$jscomp$0.ccall("SendMessageString", null, ["string", "string", "string"], [gameObject$jscomp$0, func$jscomp$3, param$jscomp$3]);
      } else {
        if (typeof param$jscomp$3 === "number") {
          Module$jscomp$0.ccall("SendMessageFloat", null, ["string", "string", "number"], [gameObject$jscomp$0, func$jscomp$3, param$jscomp$3]);
        } else {
          throw "" + param$jscomp$3 + " is does not have a type which is supported by SendMessage.";
        }
      }
    }
  }
  function locateFile$jscomp$0(path$jscomp$3) {
    if (Module$jscomp$0["locateFile"]) {
      return Module$jscomp$0["locateFile"](path$jscomp$3, scriptDirectory$jscomp$0);
    } else {
      return scriptDirectory$jscomp$0 + path$jscomp$3;
    }
  }
  function staticAlloc$jscomp$0(size$jscomp$12) {
    var ret$jscomp$0 = STATICTOP$jscomp$0;
    STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + size$jscomp$12 + 15 & -16;
    return ret$jscomp$0;
  }
  function dynamicAlloc$jscomp$0(size$jscomp$13) {
    var ret$jscomp$1 = HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2];
    var end$jscomp$4 = ret$jscomp$1 + size$jscomp$13 + 15 & -16;
    HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2] = end$jscomp$4;
    if (end$jscomp$4 >= TOTAL_MEMORY$jscomp$0) {
      var success$jscomp$0 = enlargeMemory$jscomp$0();
      if (!success$jscomp$0) {
        HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2] = ret$jscomp$1;
        return 0;
      }
    }
    return ret$jscomp$1;
  }
  function alignMemory$jscomp$0(size$jscomp$14, factor$jscomp$1) {
    if (!factor$jscomp$1) {
      factor$jscomp$1 = STACK_ALIGN$jscomp$0;
    }
    var ret$jscomp$2 = size$jscomp$14 = Math.ceil(size$jscomp$14 / factor$jscomp$1) * factor$jscomp$1;
    return ret$jscomp$2;
  }
  function getNativeTypeSize$jscomp$0(type$jscomp$113) {
    switch(type$jscomp$113) {
      case "i1":
      case "i8":
        return 1;
      case "i16":
        return 2;
      case "i32":
        return 4;
      case "i64":
        return 8;
      case "float":
        return 4;
      case "double":
        return 8;
      default:
        {
          if (type$jscomp$113[type$jscomp$113.length - 1] === "*") {
            return 4;
          } else {
            if (type$jscomp$113[0] === "i") {
              var bits$jscomp$0 = parseInt(type$jscomp$113.substr(1));
              assert$jscomp$0(bits$jscomp$0 % 8 === 0);
              return bits$jscomp$0 / 8;
            } else {
              return 0;
            }
          }
        }
    }
  }
  function warnOnce$jscomp$0(text$jscomp$10) {
    if (!warnOnce$jscomp$0.shown) {
      warnOnce$jscomp$0.shown = {};
    }
    if (!warnOnce$jscomp$0.shown[text$jscomp$10]) {
      warnOnce$jscomp$0.shown[text$jscomp$10] = 1;
      err$jscomp$3(text$jscomp$10);
    }
  }
  function addFunction$jscomp$0(func$jscomp$4, sig$jscomp$0) {
    var base$jscomp$2 = 0;
    var i$jscomp$3 = base$jscomp$2;
    for (; i$jscomp$3 < base$jscomp$2 + 0; i$jscomp$3++) {
      if (!functionPointers$jscomp$0[i$jscomp$3]) {
        functionPointers$jscomp$0[i$jscomp$3] = func$jscomp$4;
        return jsCallStartIndex$jscomp$0 + i$jscomp$3;
      }
    }
    throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
  }
  function getFuncWrapper$jscomp$0(func$jscomp$5, sig$jscomp$1) {
    if (!func$jscomp$5) {
      return;
    }
    assert$jscomp$0(sig$jscomp$1);
    if (!funcWrappers$jscomp$0[sig$jscomp$1]) {
      funcWrappers$jscomp$0[sig$jscomp$1] = {};
    }
    var sigCache$jscomp$0 = funcWrappers$jscomp$0[sig$jscomp$1];
    if (!sigCache$jscomp$0[func$jscomp$5]) {
      if (sig$jscomp$1.length === 1) {
        sigCache$jscomp$0[func$jscomp$5] = function dynCall_wrapper$jscomp$0() {
          return dynCall$jscomp$0(sig$jscomp$1, func$jscomp$5);
        };
      } else {
        if (sig$jscomp$1.length === 2) {
          sigCache$jscomp$0[func$jscomp$5] = function dynCall_wrapper$jscomp$1(arg$jscomp$6) {
            return dynCall$jscomp$0(sig$jscomp$1, func$jscomp$5, [arg$jscomp$6]);
          };
        } else {
          sigCache$jscomp$0[func$jscomp$5] = function dynCall_wrapper$jscomp$2() {
            return dynCall$jscomp$0(sig$jscomp$1, func$jscomp$5, Array.prototype.slice.call(arguments));
          };
        }
      }
    }
    return sigCache$jscomp$0[func$jscomp$5];
  }
  function makeBigInt$jscomp$0(low$jscomp$0, high$jscomp$0, unsigned$jscomp$0) {
    return unsigned$jscomp$0 ? +(low$jscomp$0 >>> 0) + +(high$jscomp$0 >>> 0) * 4294967296 : +(low$jscomp$0 >>> 0) + +(high$jscomp$0 | 0) * 4294967296;
  }
  function dynCall$jscomp$0(sig$jscomp$2, ptr$jscomp$0, args$jscomp$0) {
    if (args$jscomp$0 && args$jscomp$0.length) {
      return Module$jscomp$0["dynCall_" + sig$jscomp$2].apply(null, [ptr$jscomp$0].concat(args$jscomp$0));
    } else {
      return Module$jscomp$0["dynCall_" + sig$jscomp$2].call(null, ptr$jscomp$0);
    }
  }
  function assert$jscomp$0(condition$jscomp$1, text$jscomp$11) {
    if (!condition$jscomp$1) {
      abort$jscomp$0("Assertion failed: " + text$jscomp$11);
    }
  }
  function getCFunc$jscomp$0(ident$jscomp$1) {
    var func$jscomp$6 = Module$jscomp$0["_" + ident$jscomp$1];
    assert$jscomp$0(func$jscomp$6, "Cannot call unknown function " + ident$jscomp$1 + ", make sure it is exported");
    return func$jscomp$6;
  }
  function ccall$jscomp$0(ident$jscomp$2, returnType$jscomp$0, argTypes$jscomp$0, args$jscomp$1, opts$jscomp$0) {
    function convertReturnValue$jscomp$0(ret$jscomp$4) {
      if (returnType$jscomp$0 === "string") {
        return Pointer_stringify$jscomp$0(ret$jscomp$4);
      }
      if (returnType$jscomp$0 === "boolean") {
        return Boolean(ret$jscomp$4);
      }
      return ret$jscomp$4;
    }
    var func$jscomp$7 = getCFunc$jscomp$0(ident$jscomp$2);
    var cArgs$jscomp$0 = [];
    var stack$jscomp$0 = 0;
    if (args$jscomp$1) {
      var i$jscomp$4 = 0;
      for (; i$jscomp$4 < args$jscomp$1.length; i$jscomp$4++) {
        var converter$jscomp$0 = toC$jscomp$0[argTypes$jscomp$0[i$jscomp$4]];
        if (converter$jscomp$0) {
          if (stack$jscomp$0 === 0) {
            stack$jscomp$0 = stackSave$jscomp$0();
          }
          cArgs$jscomp$0[i$jscomp$4] = converter$jscomp$0(args$jscomp$1[i$jscomp$4]);
        } else {
          cArgs$jscomp$0[i$jscomp$4] = args$jscomp$1[i$jscomp$4];
        }
      }
    }
    var ret$jscomp$3 = func$jscomp$7.apply(null, cArgs$jscomp$0);
    ret$jscomp$3 = convertReturnValue$jscomp$0(ret$jscomp$3);
    if (stack$jscomp$0 !== 0) {
      stackRestore$jscomp$0(stack$jscomp$0);
    }
    return ret$jscomp$3;
  }
  function cwrap$jscomp$0(ident$jscomp$3, returnType$jscomp$1, argTypes$jscomp$1, opts$jscomp$1) {
    argTypes$jscomp$1 = argTypes$jscomp$1 || [];
    var numericArgs$jscomp$0 = argTypes$jscomp$1.every(function(type$jscomp$114) {
      return type$jscomp$114 === "number";
    });
    var numericRet$jscomp$0 = returnType$jscomp$1 !== "string";
    if (numericRet$jscomp$0 && numericArgs$jscomp$0 && !opts$jscomp$1) {
      return getCFunc$jscomp$0(ident$jscomp$3);
    }
    return function() {
      return ccall$jscomp$0(ident$jscomp$3, returnType$jscomp$1, argTypes$jscomp$1, arguments, opts$jscomp$1);
    };
  }
  function setValue$jscomp$0(ptr$jscomp$1, value$jscomp$84, type$jscomp$115, noSafe$jscomp$0) {
    type$jscomp$115 = type$jscomp$115 || "i8";
    if (type$jscomp$115.charAt(type$jscomp$115.length - 1) === "*") {
      type$jscomp$115 = "i32";
    }
    switch(type$jscomp$115) {
      case "i1":
        HEAP8$jscomp$0[ptr$jscomp$1 >> 0] = value$jscomp$84;
        break;
      case "i8":
        HEAP8$jscomp$0[ptr$jscomp$1 >> 0] = value$jscomp$84;
        break;
      case "i16":
        HEAP16$jscomp$0[ptr$jscomp$1 >> 1] = value$jscomp$84;
        break;
      case "i32":
        HEAP32$jscomp$0[ptr$jscomp$1 >> 2] = value$jscomp$84;
        break;
      case "i64":
        tempI64 = [value$jscomp$84 >>> 0, (tempDouble = value$jscomp$84, +Math_abs$jscomp$0(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min$jscomp$0(+Math_floor$jscomp$0(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil$jscomp$0((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)];
        HEAP32$jscomp$0[ptr$jscomp$1 >> 2] = tempI64[0];
        HEAP32$jscomp$0[ptr$jscomp$1 + 4 >> 2] = tempI64[1];
        break;
      case "float":
        HEAPF32$jscomp$0[ptr$jscomp$1 >> 2] = value$jscomp$84;
        break;
      case "double":
        HEAPF64$jscomp$0[ptr$jscomp$1 >> 3] = value$jscomp$84;
        break;
      default:
        abort$jscomp$0("invalid type for setValue: " + type$jscomp$115);
    }
  }
  function allocate$jscomp$0(slab$jscomp$0, types$jscomp$0, allocator$jscomp$0, ptr$jscomp$2) {
    var zeroinit$jscomp$0;
    var size$jscomp$15;
    if (typeof slab$jscomp$0 === "number") {
      zeroinit$jscomp$0 = true;
      size$jscomp$15 = slab$jscomp$0;
    } else {
      zeroinit$jscomp$0 = false;
      size$jscomp$15 = slab$jscomp$0.length;
    }
    var singleType$jscomp$0 = typeof types$jscomp$0 === "string" ? types$jscomp$0 : null;
    var ret$jscomp$5;
    if (allocator$jscomp$0 == ALLOC_NONE$jscomp$0) {
      ret$jscomp$5 = ptr$jscomp$2;
    } else {
      ret$jscomp$5 = [typeof _malloc$jscomp$0 === "function" ? _malloc$jscomp$0 : staticAlloc$jscomp$0, stackAlloc$jscomp$0, staticAlloc$jscomp$0, dynamicAlloc$jscomp$0][allocator$jscomp$0 === undefined ? ALLOC_STATIC$jscomp$0 : allocator$jscomp$0](Math.max(size$jscomp$15, singleType$jscomp$0 ? 1 : types$jscomp$0.length));
    }
    if (zeroinit$jscomp$0) {
      var stop$jscomp$0;
      ptr$jscomp$2 = ret$jscomp$5;
      assert$jscomp$0((ret$jscomp$5 & 3) == 0);
      stop$jscomp$0 = ret$jscomp$5 + (size$jscomp$15 & ~3);
      for (; ptr$jscomp$2 < stop$jscomp$0; ptr$jscomp$2 = ptr$jscomp$2 + 4) {
        HEAP32$jscomp$0[ptr$jscomp$2 >> 2] = 0;
      }
      stop$jscomp$0 = ret$jscomp$5 + size$jscomp$15;
      for (; ptr$jscomp$2 < stop$jscomp$0;) {
        HEAP8$jscomp$0[ptr$jscomp$2++ >> 0] = 0;
      }
      return ret$jscomp$5;
    }
    if (singleType$jscomp$0 === "i8") {
      if (slab$jscomp$0.subarray || slab$jscomp$0.slice) {
        HEAPU8$jscomp$0.set(slab$jscomp$0, ret$jscomp$5);
      } else {
        HEAPU8$jscomp$0.set(new Uint8Array(slab$jscomp$0), ret$jscomp$5);
      }
      return ret$jscomp$5;
    }
    var i$jscomp$5 = 0;
    var type$jscomp$116;
    var typeSize$jscomp$0;
    var previousType$jscomp$0;
    for (; i$jscomp$5 < size$jscomp$15;) {
      var curr$jscomp$0 = slab$jscomp$0[i$jscomp$5];
      type$jscomp$116 = singleType$jscomp$0 || types$jscomp$0[i$jscomp$5];
      if (type$jscomp$116 === 0) {
        i$jscomp$5++;
        continue;
      }
      if (type$jscomp$116 == "i64") {
        type$jscomp$116 = "i32";
      }
      setValue$jscomp$0(ret$jscomp$5 + i$jscomp$5, curr$jscomp$0, type$jscomp$116);
      if (previousType$jscomp$0 !== type$jscomp$116) {
        typeSize$jscomp$0 = getNativeTypeSize$jscomp$0(type$jscomp$116);
        previousType$jscomp$0 = type$jscomp$116;
      }
      i$jscomp$5 = i$jscomp$5 + typeSize$jscomp$0;
    }
    return ret$jscomp$5;
  }
  function getMemory$jscomp$0(size$jscomp$16) {
    if (!staticSealed$jscomp$0) {
      return staticAlloc$jscomp$0(size$jscomp$16);
    }
    if (!runtimeInitialized$jscomp$0) {
      return dynamicAlloc$jscomp$0(size$jscomp$16);
    }
    return _malloc$jscomp$0(size$jscomp$16);
  }
  function Pointer_stringify$jscomp$0(ptr$jscomp$3, length$jscomp$16) {
    if (length$jscomp$16 === 0 || !ptr$jscomp$3) {
      return "";
    }
    var hasUtf$jscomp$0 = 0;
    var t$jscomp$0;
    var i$jscomp$6 = 0;
    for (; 1;) {
      t$jscomp$0 = HEAPU8$jscomp$0[ptr$jscomp$3 + i$jscomp$6 >> 0];
      hasUtf$jscomp$0 = hasUtf$jscomp$0 | t$jscomp$0;
      if (t$jscomp$0 == 0 && !length$jscomp$16) {
        break;
      }
      i$jscomp$6++;
      if (length$jscomp$16 && i$jscomp$6 == length$jscomp$16) {
        break;
      }
    }
    if (!length$jscomp$16) {
      length$jscomp$16 = i$jscomp$6;
    }
    var ret$jscomp$6 = "";
    if (hasUtf$jscomp$0 < 128) {
      var MAX_CHUNK$jscomp$0 = 1024;
      var curr$jscomp$1;
      for (; length$jscomp$16 > 0;) {
        curr$jscomp$1 = String.fromCharCode.apply(String, HEAPU8$jscomp$0.subarray(ptr$jscomp$3, ptr$jscomp$3 + Math.min(length$jscomp$16, MAX_CHUNK$jscomp$0)));
        ret$jscomp$6 = ret$jscomp$6 ? ret$jscomp$6 + curr$jscomp$1 : curr$jscomp$1;
        ptr$jscomp$3 = ptr$jscomp$3 + MAX_CHUNK$jscomp$0;
        length$jscomp$16 = length$jscomp$16 - MAX_CHUNK$jscomp$0;
      }
      return ret$jscomp$6;
    }
    return UTF8ToString$jscomp$0(ptr$jscomp$3);
  }
  function UTF8ArrayToString$jscomp$0(u8Array$jscomp$0, idx$jscomp$0) {
    var endPtr$jscomp$0 = idx$jscomp$0;
    for (; u8Array$jscomp$0[endPtr$jscomp$0];) {
      ++endPtr$jscomp$0;
    }
    if (endPtr$jscomp$0 - idx$jscomp$0 > 16 && u8Array$jscomp$0.subarray && UTF8Decoder$jscomp$0) {
      return UTF8Decoder$jscomp$0.decode(u8Array$jscomp$0.subarray(idx$jscomp$0, endPtr$jscomp$0));
    } else {
      var u0$jscomp$0;
      var u1$jscomp$0;
      var u2$jscomp$0;
      var u3$jscomp$0;
      var u4$jscomp$0;
      var u5$jscomp$0;
      var str$jscomp$6 = "";
      for (; 1;) {
        u0$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++];
        if (!u0$jscomp$0) {
          return str$jscomp$6;
        }
        if (!(u0$jscomp$0 & 128)) {
          str$jscomp$6 = str$jscomp$6 + String.fromCharCode(u0$jscomp$0);
          continue;
        }
        u1$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++] & 63;
        if ((u0$jscomp$0 & 224) == 192) {
          str$jscomp$6 = str$jscomp$6 + String.fromCharCode((u0$jscomp$0 & 31) << 6 | u1$jscomp$0);
          continue;
        }
        u2$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++] & 63;
        if ((u0$jscomp$0 & 240) == 224) {
          u0$jscomp$0 = (u0$jscomp$0 & 15) << 12 | u1$jscomp$0 << 6 | u2$jscomp$0;
        } else {
          u3$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++] & 63;
          if ((u0$jscomp$0 & 248) == 240) {
            u0$jscomp$0 = (u0$jscomp$0 & 7) << 18 | u1$jscomp$0 << 12 | u2$jscomp$0 << 6 | u3$jscomp$0;
          } else {
            u4$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++] & 63;
            if ((u0$jscomp$0 & 252) == 248) {
              u0$jscomp$0 = (u0$jscomp$0 & 3) << 24 | u1$jscomp$0 << 18 | u2$jscomp$0 << 12 | u3$jscomp$0 << 6 | u4$jscomp$0;
            } else {
              u5$jscomp$0 = u8Array$jscomp$0[idx$jscomp$0++] & 63;
              u0$jscomp$0 = (u0$jscomp$0 & 1) << 30 | u1$jscomp$0 << 24 | u2$jscomp$0 << 18 | u3$jscomp$0 << 12 | u4$jscomp$0 << 6 | u5$jscomp$0;
            }
          }
        }
        if (u0$jscomp$0 < 65536) {
          str$jscomp$6 = str$jscomp$6 + String.fromCharCode(u0$jscomp$0);
        } else {
          var ch$jscomp$0 = u0$jscomp$0 - 65536;
          str$jscomp$6 = str$jscomp$6 + String.fromCharCode(55296 | ch$jscomp$0 >> 10, 56320 | ch$jscomp$0 & 1023);
        }
      }
    }
  }
  function UTF8ToString$jscomp$0(ptr$jscomp$4) {
    return UTF8ArrayToString$jscomp$0(HEAPU8$jscomp$0, ptr$jscomp$4);
  }
  function stringToUTF8Array$jscomp$0(str$jscomp$7, outU8Array$jscomp$0, outIdx$jscomp$0, maxBytesToWrite$jscomp$0) {
    if (!(maxBytesToWrite$jscomp$0 > 0)) {
      return 0;
    }
    var startIdx$jscomp$0 = outIdx$jscomp$0;
    var endIdx$jscomp$0 = outIdx$jscomp$0 + maxBytesToWrite$jscomp$0 - 1;
    var i$jscomp$7 = 0;
    for (; i$jscomp$7 < str$jscomp$7.length; ++i$jscomp$7) {
      var u$jscomp$0 = str$jscomp$7.charCodeAt(i$jscomp$7);
      if (u$jscomp$0 >= 55296 && u$jscomp$0 <= 57343) {
        var u1$jscomp$1 = str$jscomp$7.charCodeAt(++i$jscomp$7);
        u$jscomp$0 = 65536 + ((u$jscomp$0 & 1023) << 10) | u1$jscomp$1 & 1023;
      }
      if (u$jscomp$0 <= 127) {
        if (outIdx$jscomp$0 >= endIdx$jscomp$0) {
          break;
        }
        outU8Array$jscomp$0[outIdx$jscomp$0++] = u$jscomp$0;
      } else {
        if (u$jscomp$0 <= 2047) {
          if (outIdx$jscomp$0 + 1 >= endIdx$jscomp$0) {
            break;
          }
          outU8Array$jscomp$0[outIdx$jscomp$0++] = 192 | u$jscomp$0 >> 6;
          outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 & 63;
        } else {
          if (u$jscomp$0 <= 65535) {
            if (outIdx$jscomp$0 + 2 >= endIdx$jscomp$0) {
              break;
            }
            outU8Array$jscomp$0[outIdx$jscomp$0++] = 224 | u$jscomp$0 >> 12;
            outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 6 & 63;
            outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 & 63;
          } else {
            if (u$jscomp$0 <= 2097151) {
              if (outIdx$jscomp$0 + 3 >= endIdx$jscomp$0) {
                break;
              }
              outU8Array$jscomp$0[outIdx$jscomp$0++] = 240 | u$jscomp$0 >> 18;
              outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 12 & 63;
              outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 6 & 63;
              outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 & 63;
            } else {
              if (u$jscomp$0 <= 67108863) {
                if (outIdx$jscomp$0 + 4 >= endIdx$jscomp$0) {
                  break;
                }
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 248 | u$jscomp$0 >> 24;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 18 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 12 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 6 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 & 63;
              } else {
                if (outIdx$jscomp$0 + 5 >= endIdx$jscomp$0) {
                  break;
                }
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 252 | u$jscomp$0 >> 30;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 24 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 18 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 12 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 >> 6 & 63;
                outU8Array$jscomp$0[outIdx$jscomp$0++] = 128 | u$jscomp$0 & 63;
              }
            }
          }
        }
      }
    }
    outU8Array$jscomp$0[outIdx$jscomp$0] = 0;
    return outIdx$jscomp$0 - startIdx$jscomp$0;
  }
  function stringToUTF8$jscomp$0(str$jscomp$8, outPtr$jscomp$0, maxBytesToWrite$jscomp$1) {
    return stringToUTF8Array$jscomp$0(str$jscomp$8, HEAPU8$jscomp$0, outPtr$jscomp$0, maxBytesToWrite$jscomp$1);
  }
  function lengthBytesUTF8$jscomp$0(str$jscomp$9) {
    var len$jscomp$0 = 0;
    var i$jscomp$8 = 0;
    for (; i$jscomp$8 < str$jscomp$9.length; ++i$jscomp$8) {
      var u$jscomp$1 = str$jscomp$9.charCodeAt(i$jscomp$8);
      if (u$jscomp$1 >= 55296 && u$jscomp$1 <= 57343) {
        u$jscomp$1 = 65536 + ((u$jscomp$1 & 1023) << 10) | str$jscomp$9.charCodeAt(++i$jscomp$8) & 1023;
      }
      if (u$jscomp$1 <= 127) {
        ++len$jscomp$0;
      } else {
        if (u$jscomp$1 <= 2047) {
          len$jscomp$0 = len$jscomp$0 + 2;
        } else {
          if (u$jscomp$1 <= 65535) {
            len$jscomp$0 = len$jscomp$0 + 3;
          } else {
            if (u$jscomp$1 <= 2097151) {
              len$jscomp$0 = len$jscomp$0 + 4;
            } else {
              if (u$jscomp$1 <= 67108863) {
                len$jscomp$0 = len$jscomp$0 + 5;
              } else {
                len$jscomp$0 = len$jscomp$0 + 6;
              }
            }
          }
        }
      }
    }
    return len$jscomp$0;
  }
  function allocateUTF8$jscomp$0(str$jscomp$10) {
    var size$jscomp$17 = lengthBytesUTF8$jscomp$0(str$jscomp$10) + 1;
    var ret$jscomp$7 = _malloc$jscomp$0(size$jscomp$17);
    if (ret$jscomp$7) {
      stringToUTF8Array$jscomp$0(str$jscomp$10, HEAP8$jscomp$0, ret$jscomp$7, size$jscomp$17);
    }
    return ret$jscomp$7;
  }
  function allocateUTF8OnStack$jscomp$0(str$jscomp$11) {
    var size$jscomp$18 = lengthBytesUTF8$jscomp$0(str$jscomp$11) + 1;
    var ret$jscomp$8 = stackAlloc$jscomp$0(size$jscomp$18);
    stringToUTF8Array$jscomp$0(str$jscomp$11, HEAP8$jscomp$0, ret$jscomp$8, size$jscomp$18);
    return ret$jscomp$8;
  }
  function demangle$jscomp$0(func$jscomp$8) {
    return func$jscomp$8;
  }
  function demangleAll$jscomp$0(text$jscomp$12) {
    var regex$jscomp$0 = /__Z[\w\d_]+/g;
    return text$jscomp$12.replace(regex$jscomp$0, function(x$jscomp$74) {
      var y$jscomp$59 = demangle$jscomp$0(x$jscomp$74);
      return x$jscomp$74 === y$jscomp$59 ? x$jscomp$74 : x$jscomp$74 + " [" + y$jscomp$59 + "]";
    });
  }
  function jsStackTrace$jscomp$0() {
    var err$jscomp$4 = new Error;
    if (!err$jscomp$4.stack) {
      try {
        throw new Error(0);
      } catch (e$jscomp$7) {
        err$jscomp$4 = e$jscomp$7;
      }
      if (!err$jscomp$4.stack) {
        return "(no stack trace available)";
      }
    }
    return err$jscomp$4.stack.toString();
  }
  function stackTrace$jscomp$0() {
    var js$jscomp$0 = jsStackTrace$jscomp$0();
    if (Module$jscomp$0["extraStackTrace"]) {
      js$jscomp$0 = js$jscomp$0 + ("\n" + Module$jscomp$0["extraStackTrace"]());
    }
    return demangleAll$jscomp$0(js$jscomp$0);
  }
  function alignUp$jscomp$0(x$jscomp$75, multiple$jscomp$0) {
    if (x$jscomp$75 % multiple$jscomp$0 > 0) {
      x$jscomp$75 = x$jscomp$75 + (multiple$jscomp$0 - x$jscomp$75 % multiple$jscomp$0);
    }
    return x$jscomp$75;
  }
  function updateGlobalBuffer$jscomp$0(buf$jscomp$0) {
    Module$jscomp$0["buffer"] = buffer$jscomp$9 = buf$jscomp$0;
  }
  function updateGlobalBufferViews$jscomp$0() {
    Module$jscomp$0["HEAP8"] = HEAP8$jscomp$0 = new Int8Array(buffer$jscomp$9);
    Module$jscomp$0["HEAP16"] = HEAP16$jscomp$0 = new Int16Array(buffer$jscomp$9);
    Module$jscomp$0["HEAP32"] = HEAP32$jscomp$0 = new Int32Array(buffer$jscomp$9);
    Module$jscomp$0["HEAPU8"] = HEAPU8$jscomp$0 = new Uint8Array(buffer$jscomp$9);
    Module$jscomp$0["HEAPU16"] = HEAPU16$jscomp$0 = new Uint16Array(buffer$jscomp$9);
    Module$jscomp$0["HEAPU32"] = HEAPU32$jscomp$0 = new Uint32Array(buffer$jscomp$9);
    Module$jscomp$0["HEAPF32"] = HEAPF32$jscomp$0 = new Float32Array(buffer$jscomp$9);
    Module$jscomp$0["HEAPF64"] = HEAPF64$jscomp$0 = new Float64Array(buffer$jscomp$9);
  }
  function abortOnCannotGrowMemory$jscomp$0() {
    abort$jscomp$0("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY$jscomp$0 + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
  }
  function enlargeMemory$jscomp$0() {
    var PAGE_MULTIPLE$jscomp$0 = Module$jscomp$0["usingWasm"] ? WASM_PAGE_SIZE$jscomp$0 : ASMJS_PAGE_SIZE$jscomp$0;
    var LIMIT$jscomp$0 = 2147483648 - PAGE_MULTIPLE$jscomp$0;
    if (HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2] > LIMIT$jscomp$0) {
      return false;
    }
    var OLD_TOTAL_MEMORY$jscomp$0 = TOTAL_MEMORY$jscomp$0;
    TOTAL_MEMORY$jscomp$0 = Math.max(TOTAL_MEMORY$jscomp$0, MIN_TOTAL_MEMORY$jscomp$0);
    for (; TOTAL_MEMORY$jscomp$0 < HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2];) {
      if (TOTAL_MEMORY$jscomp$0 <= 536870912) {
        TOTAL_MEMORY$jscomp$0 = alignUp$jscomp$0(2 * TOTAL_MEMORY$jscomp$0, PAGE_MULTIPLE$jscomp$0);
      } else {
        TOTAL_MEMORY$jscomp$0 = Math.min(alignUp$jscomp$0((3 * TOTAL_MEMORY$jscomp$0 + 2147483648) / 4, PAGE_MULTIPLE$jscomp$0), LIMIT$jscomp$0);
      }
    }
    var replacement$jscomp$1 = Module$jscomp$0["reallocBuffer"](TOTAL_MEMORY$jscomp$0);
    if (!replacement$jscomp$1 || replacement$jscomp$1.byteLength != TOTAL_MEMORY$jscomp$0) {
      TOTAL_MEMORY$jscomp$0 = OLD_TOTAL_MEMORY$jscomp$0;
      return false;
    }
    updateGlobalBuffer$jscomp$0(replacement$jscomp$1);
    updateGlobalBufferViews$jscomp$0();
    return true;
  }
  function getTotalMemory$jscomp$0() {
    return TOTAL_MEMORY$jscomp$0;
  }
  function callRuntimeCallbacks$jscomp$0(callbacks$jscomp$0) {
    for (; callbacks$jscomp$0.length > 0;) {
      var callback$jscomp$44 = callbacks$jscomp$0.shift();
      if (typeof callback$jscomp$44 == "function") {
        callback$jscomp$44();
        continue;
      }
      var func$jscomp$9 = callback$jscomp$44.func;
      if (typeof func$jscomp$9 === "number") {
        if (callback$jscomp$44.arg === undefined) {
          Module$jscomp$0["dynCall_v"](func$jscomp$9);
        } else {
          Module$jscomp$0["dynCall_vi"](func$jscomp$9, callback$jscomp$44.arg);
        }
      } else {
        func$jscomp$9(callback$jscomp$44.arg === undefined ? null : callback$jscomp$44.arg);
      }
    }
  }
  function preRun$jscomp$0() {
    if (Module$jscomp$0["preRun"]) {
      if (typeof Module$jscomp$0["preRun"] == "function") {
        Module$jscomp$0["preRun"] = [Module$jscomp$0["preRun"]];
      }
      for (; Module$jscomp$0["preRun"].length;) {
        addOnPreRun$jscomp$0(Module$jscomp$0["preRun"].shift());
      }
    }
    callRuntimeCallbacks$jscomp$0(__ATPRERUN__$jscomp$0);
  }
  function ensureInitRuntime$jscomp$0() {
    if (runtimeInitialized$jscomp$0) {
      return;
    }
    runtimeInitialized$jscomp$0 = true;
    callRuntimeCallbacks$jscomp$0(__ATINIT__$jscomp$0);
  }
  function preMain$jscomp$0() {
    callRuntimeCallbacks$jscomp$0(__ATMAIN__$jscomp$0);
  }
  function exitRuntime$jscomp$0() {
    callRuntimeCallbacks$jscomp$0(__ATEXIT__$jscomp$0);
    runtimeExited$jscomp$0 = true;
  }
  function postRun$jscomp$0() {
    if (Module$jscomp$0["postRun"]) {
      if (typeof Module$jscomp$0["postRun"] == "function") {
        Module$jscomp$0["postRun"] = [Module$jscomp$0["postRun"]];
      }
      for (; Module$jscomp$0["postRun"].length;) {
        addOnPostRun$jscomp$0(Module$jscomp$0["postRun"].shift());
      }
    }
    callRuntimeCallbacks$jscomp$0(__ATPOSTRUN__$jscomp$0);
  }
  function addOnPreRun$jscomp$0(cb$jscomp$0) {
    __ATPRERUN__$jscomp$0.unshift(cb$jscomp$0);
  }
  function addOnPostRun$jscomp$0(cb$jscomp$1) {
    __ATPOSTRUN__$jscomp$0.unshift(cb$jscomp$1);
  }
  function writeArrayToMemory$jscomp$0(array$jscomp$5, buffer$jscomp$10) {
    HEAP8$jscomp$0.set(array$jscomp$5, buffer$jscomp$10);
  }
  function writeAsciiToMemory$jscomp$0(str$jscomp$12, buffer$jscomp$11, dontAddNull$jscomp$0) {
    var i$jscomp$9 = 0;
    for (; i$jscomp$9 < str$jscomp$12.length; ++i$jscomp$9) {
      HEAP8$jscomp$0[buffer$jscomp$11++ >> 0] = str$jscomp$12.charCodeAt(i$jscomp$9);
    }
    if (!dontAddNull$jscomp$0) {
      HEAP8$jscomp$0[buffer$jscomp$11 >> 0] = 0;
    }
  }
  function unSign$jscomp$0(value$jscomp$85, bits$jscomp$1, ignore$jscomp$0) {
    if (value$jscomp$85 >= 0) {
      return value$jscomp$85;
    }
    return bits$jscomp$1 <= 32 ? 2 * Math.abs(1 << bits$jscomp$1 - 1) + value$jscomp$85 : Math.pow(2, bits$jscomp$1) + value$jscomp$85;
  }
  function reSign$jscomp$0(value$jscomp$86, bits$jscomp$2, ignore$jscomp$1) {
    if (value$jscomp$86 <= 0) {
      return value$jscomp$86;
    }
    var half$jscomp$0 = bits$jscomp$2 <= 32 ? Math.abs(1 << bits$jscomp$2 - 1) : Math.pow(2, bits$jscomp$2 - 1);
    if (value$jscomp$86 >= half$jscomp$0 && (bits$jscomp$2 <= 32 || value$jscomp$86 > half$jscomp$0)) {
      value$jscomp$86 = -2 * half$jscomp$0 + value$jscomp$86;
    }
    return value$jscomp$86;
  }
  function getUniqueRunDependency$jscomp$0(id$jscomp$5) {
    return id$jscomp$5;
  }
  function addRunDependency$jscomp$0(id$jscomp$6) {
    runDependencies$jscomp$0++;
    if (Module$jscomp$0["monitorRunDependencies"]) {
      Module$jscomp$0["monitorRunDependencies"](runDependencies$jscomp$0);
    }
  }
  function removeRunDependency$jscomp$0(id$jscomp$7) {
    runDependencies$jscomp$0--;
    if (Module$jscomp$0["monitorRunDependencies"]) {
      Module$jscomp$0["monitorRunDependencies"](runDependencies$jscomp$0);
    }
    if (runDependencies$jscomp$0 == 0) {
      if (runDependencyWatcher$jscomp$0 !== null) {
        clearInterval(runDependencyWatcher$jscomp$0);
        runDependencyWatcher$jscomp$0 = null;
      }
      if (dependenciesFulfilled$jscomp$0) {
        var callback$jscomp$45 = dependenciesFulfilled$jscomp$0;
        dependenciesFulfilled$jscomp$0 = null;
        callback$jscomp$45();
      }
    }
  }
  function isDataURI$jscomp$0(filename$jscomp$0) {
    return String.prototype.startsWith ? filename$jscomp$0.startsWith(dataURIPrefix$jscomp$0) : filename$jscomp$0.indexOf(dataURIPrefix$jscomp$0) === 0;
  }
  function integrateWasmJS$jscomp$0() {
    function mergeMemory$jscomp$0(newBuffer$jscomp$0) {
      var oldBuffer$jscomp$0 = Module$jscomp$0["buffer"];
      if (newBuffer$jscomp$0.byteLength < oldBuffer$jscomp$0.byteLength) {
        err$jscomp$3("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
      }
      var oldView$jscomp$0 = new Int8Array(oldBuffer$jscomp$0);
      var newView$jscomp$0 = new Int8Array(newBuffer$jscomp$0);
      newView$jscomp$0.set(oldView$jscomp$0);
      updateGlobalBuffer$jscomp$0(newBuffer$jscomp$0);
      updateGlobalBufferViews$jscomp$0();
    }
    function fixImports$jscomp$0(imports$jscomp$0) {
      return imports$jscomp$0;
    }
    function getBinary$jscomp$0() {
      try {
        if (Module$jscomp$0["wasmBinary"]) {
          return new Uint8Array(Module$jscomp$0["wasmBinary"]);
        }
        if (Module$jscomp$0["readBinary"]) {
          return Module$jscomp$0["readBinary"](wasmBinaryFile$jscomp$0);
        } else {
          throw "both async and sync fetching of the wasm failed";
        }
      } catch (err$jscomp$5) {
        abort$jscomp$0(err$jscomp$5);
      }
    }
    function getBinaryPromise$jscomp$0() {
      if (!Module$jscomp$0["wasmBinary"] && (ENVIRONMENT_IS_WEB$jscomp$0 || ENVIRONMENT_IS_WORKER$jscomp$0) && typeof fetch === "function") {
        return fetch(wasmBinaryFile$jscomp$0, {
          credentials : "same-origin"
        }).then(function(response$jscomp$2) {
          if (!response$jscomp$2["ok"]) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile$jscomp$0 + "'";
          }
          return response$jscomp$2["arrayBuffer"]();
        }).catch(function() {
          return getBinary$jscomp$0();
        });
      }
      return new Promise(function(resolve$jscomp$0, reject$jscomp$0) {
        resolve$jscomp$0(getBinary$jscomp$0());
      });
    }
    function doNativeWasm$jscomp$0(global$jscomp$0, env$jscomp$0, providedBuffer$jscomp$0) {
      function receiveInstance$jscomp$0(instance$jscomp$0, module$jscomp$0) {
        exports$jscomp$0 = instance$jscomp$0.exports;
        if (exports$jscomp$0.memory) {
          mergeMemory$jscomp$0(exports$jscomp$0.memory);
        }
        Module$jscomp$0["asm"] = exports$jscomp$0;
        Module$jscomp$0["usingWasm"] = true;
        removeRunDependency$jscomp$0("wasm-instantiate");
      }
      function receiveInstantiatedSource$jscomp$0(output$jscomp$2) {
        receiveInstance$jscomp$0(output$jscomp$2["instance"], output$jscomp$2["module"]);
      }
      function instantiateArrayBuffer$jscomp$0(receiver$jscomp$0) {
        getBinaryPromise$jscomp$0().then(function(binary$jscomp$0) {
          return WebAssembly.instantiate(binary$jscomp$0, info$jscomp$0);
        }).then(receiver$jscomp$0).catch(function(reason$jscomp$5) {
          err$jscomp$3("failed to asynchronously prepare wasm: " + reason$jscomp$5);
          abort$jscomp$0(reason$jscomp$5);
        });
      }
      if (typeof WebAssembly !== "object") {
        err$jscomp$3("no native wasm support detected");
        return false;
      }
      if (!(Module$jscomp$0["wasmMemory"] instanceof WebAssembly.Memory)) {
        err$jscomp$3("no native wasm Memory in use");
        return false;
      }
      env$jscomp$0["memory"] = Module$jscomp$0["wasmMemory"];
      info$jscomp$0["global"] = {
        "NaN" : NaN,
        "Infinity" : Infinity
      };
      info$jscomp$0["global.Math"] = Math;
      info$jscomp$0["env"] = env$jscomp$0;
      addRunDependency$jscomp$0("wasm-instantiate");
      if (Module$jscomp$0["instantiateWasm"]) {
        try {
          return Module$jscomp$0["instantiateWasm"](info$jscomp$0, receiveInstance$jscomp$0);
        } catch (e$jscomp$8) {
          err$jscomp$3("Module.instantiateWasm callback failed with error: " + e$jscomp$8);
          return false;
        }
      }
      if (!Module$jscomp$0["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI$jscomp$0(wasmBinaryFile$jscomp$0) && typeof fetch === "function") {
        WebAssembly.instantiateStreaming(fetch(wasmBinaryFile$jscomp$0, {
          credentials : "same-origin"
        }), info$jscomp$0).then(receiveInstantiatedSource$jscomp$0).catch(function(reason$jscomp$6) {
          err$jscomp$3("wasm streaming compile failed: " + reason$jscomp$6);
          err$jscomp$3("falling back to ArrayBuffer instantiation");
          instantiateArrayBuffer$jscomp$0(receiveInstantiatedSource$jscomp$0);
        });
      } else {
        instantiateArrayBuffer$jscomp$0(receiveInstantiatedSource$jscomp$0);
      }
      return {};
    }
    var wasmTextFile$jscomp$0 = "build.wast";
    var wasmBinaryFile$jscomp$0 = "build.wasm";
    var asmjsCodeFile$jscomp$0 = "build.temp.asm.js";
    if (!isDataURI$jscomp$0(wasmTextFile$jscomp$0)) {
      wasmTextFile$jscomp$0 = locateFile$jscomp$0(wasmTextFile$jscomp$0);
    }
    if (!isDataURI$jscomp$0(wasmBinaryFile$jscomp$0)) {
      wasmBinaryFile$jscomp$0 = locateFile$jscomp$0(wasmBinaryFile$jscomp$0);
    }
    if (!isDataURI$jscomp$0(asmjsCodeFile$jscomp$0)) {
      asmjsCodeFile$jscomp$0 = locateFile$jscomp$0(asmjsCodeFile$jscomp$0);
    }
    var wasmPageSize$jscomp$0 = 64 * 1024;
    var info$jscomp$0 = {
      "global" : null,
      "env" : null,
      "asm2wasm" : asm2wasmImports$jscomp$0,
      "parent" : Module$jscomp$0
    };
    var exports$jscomp$0 = null;
    Module$jscomp$0["asmPreload"] = Module$jscomp$0["asm"];
    var asmjsReallocBuffer$jscomp$0 = Module$jscomp$0["reallocBuffer"];
    var wasmReallocBuffer$jscomp$0 = function(size$jscomp$19) {
      var PAGE_MULTIPLE$jscomp$1 = Module$jscomp$0["usingWasm"] ? WASM_PAGE_SIZE$jscomp$0 : ASMJS_PAGE_SIZE$jscomp$0;
      size$jscomp$19 = alignUp$jscomp$0(size$jscomp$19, PAGE_MULTIPLE$jscomp$1);
      var old$jscomp$0 = Module$jscomp$0["buffer"];
      var oldSize$jscomp$0 = old$jscomp$0.byteLength;
      if (Module$jscomp$0["usingWasm"]) {
        try {
          var result$jscomp$0 = Module$jscomp$0["wasmMemory"].grow((size$jscomp$19 - oldSize$jscomp$0) / wasmPageSize$jscomp$0);
          if (result$jscomp$0 !== (-1 | 0)) {
            return Module$jscomp$0["buffer"] = Module$jscomp$0["wasmMemory"].buffer;
          } else {
            return null;
          }
        } catch (e$jscomp$9) {
          return null;
        }
      }
    };
    Module$jscomp$0["reallocBuffer"] = function(size$jscomp$20) {
      if (finalMethod$jscomp$0 === "asmjs") {
        return asmjsReallocBuffer$jscomp$0(size$jscomp$20);
      } else {
        return wasmReallocBuffer$jscomp$0(size$jscomp$20);
      }
    };
    var finalMethod$jscomp$0 = "";
    Module$jscomp$0["asm"] = function(global$jscomp$1, env$jscomp$1, providedBuffer$jscomp$1) {
      env$jscomp$1 = fixImports$jscomp$0(env$jscomp$1);
      if (!env$jscomp$1["table"]) {
        var TABLE_SIZE$jscomp$0 = Module$jscomp$0["wasmTableSize"];
        if (TABLE_SIZE$jscomp$0 === undefined) {
          TABLE_SIZE$jscomp$0 = 1024;
        }
        var MAX_TABLE_SIZE$jscomp$0 = Module$jscomp$0["wasmMaxTableSize"];
        if (typeof WebAssembly === "object" && typeof WebAssembly.Table === "function") {
          if (MAX_TABLE_SIZE$jscomp$0 !== undefined) {
            env$jscomp$1["table"] = new WebAssembly.Table({
              "initial" : TABLE_SIZE$jscomp$0,
              "maximum" : MAX_TABLE_SIZE$jscomp$0,
              "element" : "anyfunc"
            });
          } else {
            env$jscomp$1["table"] = new WebAssembly.Table({
              "initial" : TABLE_SIZE$jscomp$0,
              element : "anyfunc"
            });
          }
        } else {
          env$jscomp$1["table"] = new Array(TABLE_SIZE$jscomp$0);
        }
        Module$jscomp$0["wasmTable"] = env$jscomp$1["table"];
      }
      if (!env$jscomp$1["memoryBase"]) {
        env$jscomp$1["memoryBase"] = Module$jscomp$0["STATIC_BASE"];
      }
      if (!env$jscomp$1["tableBase"]) {
        env$jscomp$1["tableBase"] = 0;
      }
      var exports$jscomp$1;
      exports$jscomp$1 = doNativeWasm$jscomp$0(global$jscomp$1, env$jscomp$1, providedBuffer$jscomp$1);
      assert$jscomp$0(exports$jscomp$1, "no binaryen method succeeded.");
      return exports$jscomp$1;
    };
  }
  function _emscripten_asm_const_i$jscomp$0(code$jscomp$1) {
    return ASM_CONSTS$jscomp$0[code$jscomp$1]();
  }
  function _emscripten_asm_const_sync_on_main_thread_i$jscomp$0(code$jscomp$2) {
    return ASM_CONSTS$jscomp$0[code$jscomp$2]();
  }
  function _JS_Cursor_SetImage$jscomp$0(ptr$jscomp$5, length$jscomp$17) {
    var binary$jscomp$1 = "";
    var i$jscomp$10 = 0;
    for (; i$jscomp$10 < length$jscomp$17; i$jscomp$10++) {
      binary$jscomp$1 = binary$jscomp$1 + String.fromCharCode(HEAPU8$jscomp$0[ptr$jscomp$5 + i$jscomp$10]);
    }
    Module$jscomp$0.canvas.style.cursor = "url(data:image/cur;base64," + btoa(binary$jscomp$1) + "),default";
  }
  function _JS_Cursor_SetShow$jscomp$0(show$jscomp$0) {
    Module$jscomp$0.canvas.style.cursor = show$jscomp$0 ? "default" : "none";
  }
  function _JS_Eval_ClearInterval$jscomp$0(id$jscomp$8) {
    window.clearInterval(id$jscomp$8);
  }
  function _JS_Eval_SetInterval$jscomp$0(func$jscomp$10, arg$jscomp$7, millis$jscomp$0) {
    function wrapper$jscomp$0() {
      getFuncWrapper$jscomp$0(func$jscomp$10, "vi")(arg$jscomp$7);
    }
    Module$jscomp$0["noExitRuntime"] = true;
    return Browser$jscomp$0.safeSetInterval(wrapper$jscomp$0, millis$jscomp$0);
  }
  function _JS_FileSystem_Initialize$jscomp$0() {
    Module$jscomp$0.setInterval(function() {
      fs$jscomp$0.sync(true);
    }, fs$jscomp$0.syncInternal);
  }
  function _JS_FileSystem_Sync$jscomp$0() {
    fs$jscomp$0.sync(false);
  }
  function _JS_Log_Dump$jscomp$0(ptr$jscomp$6, type$jscomp$117) {
    var str$jscomp$13 = Pointer_stringify$jscomp$0(ptr$jscomp$6);
    if (typeof dump == "function") {
      dump(str$jscomp$13);
    }
    switch(type$jscomp$117) {
      case 0:
      case 1:
      case 4:
        console.error(str$jscomp$13);
        return;
      case 2:
        console.warn(str$jscomp$13);
        return;
      case 3:
      case 5:
        console.log(str$jscomp$13);
        return;
      default:
        console.error("Unknown console message type!");
        console.error(str$jscomp$13);
    }
  }
  function _JS_Log_StackTrace$jscomp$0(buffer$jscomp$12, bufferSize$jscomp$2) {
    var trace$jscomp$0 = stackTrace$jscomp$0();
    if (buffer$jscomp$12) {
      stringToUTF8$jscomp$0(trace$jscomp$0, buffer$jscomp$12, bufferSize$jscomp$2);
    }
    return lengthBytesUTF8$jscomp$0(trace$jscomp$0);
  }
  function _JS_Sound_Create_Channel$jscomp$0(callback$jscomp$46, userData$jscomp$0) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$1 = {
      gain : WEBAudio$jscomp$0.audioContext.createGain(),
      panner : WEBAudio$jscomp$0.audioContext.createPanner(),
      threeD : false,
      playBuffer : function(startTime$jscomp$7, buffer$jscomp$13, startOffset$jscomp$0) {
        this.setup();
        this.source.buffer = buffer$jscomp$13;
        var chan$jscomp$0 = this;
        this.source.onended = function() {
          chan$jscomp$0.disconnectSource();
          if (callback$jscomp$46) {
            dynCall$jscomp$0("vi", callback$jscomp$46, [userData$jscomp$0]);
          }
        };
        this.source.start(startTime$jscomp$7, startOffset$jscomp$0);
        this.source.playbackStartTime = startTime$jscomp$7 - startOffset$jscomp$0 / this.source.playbackRate.value;
      },
      disconnectSource : function() {
        if (this.source && !this.source.isPausedMockNode) {
          this.source.onended = null;
          this.source.disconnect();
          delete this.source;
        }
      },
      stop : function(delay$jscomp$0) {
        if (channel$jscomp$1.source && channel$jscomp$1.source.buffer) {
          try {
            channel$jscomp$1.source.stop(WEBAudio$jscomp$0.audioContext.currentTime + delay$jscomp$0);
          } catch (e$jscomp$10) {
          }
          if (delay$jscomp$0 == 0) {
            channel$jscomp$1.disconnectSource();
          }
        }
      },
      pause : function() {
        var s$jscomp$2 = this.source;
        if (!s$jscomp$2) {
          return;
        }
        var pausedSource$jscomp$0 = {
          isPausedMockNode : true,
          loop : s$jscomp$2.loop,
          loopStart : s$jscomp$2.loopStart,
          loopEnd : s$jscomp$2.loopEnd,
          buffer : s$jscomp$2.buffer,
          playbackRate : s$jscomp$2.playbackRate.value,
          playbackPausedAtPosition : s$jscomp$2.estimatePlaybackPosition(),
          setPitch : function(v$jscomp$0) {
            this.playbackRate = v$jscomp$0;
          }
        };
        this.stop(0);
        this.disconnectSource();
        this.source = pausedSource$jscomp$0;
      },
      resume : function() {
        var pausedSource$jscomp$1 = this.source;
        if (!pausedSource$jscomp$1 || !pausedSource$jscomp$1.isPausedMockNode) {
          return;
        }
        delete this.source;
        this.setup();
        this.playBuffer(WEBAudio$jscomp$0.audioContext.currentTime - Math.min(0, pausedSource$jscomp$1.playbackPausedAtPosition), pausedSource$jscomp$1.buffer, Math.max(0, pausedSource$jscomp$1.playbackPausedAtPosition));
        this.source.loop = pausedSource$jscomp$1.loop;
        this.source.loopStart = pausedSource$jscomp$1.loopStart;
        this.source.loopEnd = pausedSource$jscomp$1.loopEnd;
        this.source.setPitch(pausedSource$jscomp$1.playbackRate);
      },
      setup : function() {
        if (this.source && !this.source.isPausedMockNode) {
          return;
        }
        this.source = WEBAudio$jscomp$0.audioContext.createBufferSource();
        this.source.estimatePlaybackPosition = function() {
          var t$jscomp$1 = (WEBAudio$jscomp$0.audioContext.currentTime - this.playbackStartTime) * this.playbackRate.value;
          if (this.loop && t$jscomp$1 >= this.loopStart) {
            t$jscomp$1 = (t$jscomp$1 - this.loopStart) % (this.loopEnd - this.loopStart) + this.loopStart;
          }
          return t$jscomp$1;
        };
        this.source.setPitch = function(newPitch$jscomp$0) {
          var curPosition$jscomp$0 = this.estimatePlaybackPosition();
          if (curPosition$jscomp$0 >= 0) {
            this.playbackStartTime = WEBAudio$jscomp$0.audioContext.currentTime - curPosition$jscomp$0 / newPitch$jscomp$0;
          }
          this.playbackRate.value = newPitch$jscomp$0;
        };
        this.setupPanning();
      },
      setupPanning : function() {
        if (this.source.isPausedMockNode) {
          return;
        }
        this.source.disconnect();
        if (this.threeD) {
          this.source.connect(this.panner);
          this.panner.connect(this.gain);
        } else {
          this.panner.disconnect();
          this.source.connect(this.gain);
        }
      }
    };
    channel$jscomp$1.panner.rolloffFactor = 0;
    channel$jscomp$1.gain.connect(WEBAudio$jscomp$0.audioContext.destination);
    WEBAudio$jscomp$0.audioInstances[++WEBAudio$jscomp$0.audioInstanceIdCounter] = channel$jscomp$1;
    return WEBAudio$jscomp$0.audioInstanceIdCounter;
  }
  function _JS_Sound_GetLength$jscomp$0(bufferInstance$jscomp$0) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return 0;
    }
    var sound$jscomp$0 = WEBAudio$jscomp$0.audioInstances[bufferInstance$jscomp$0];
    var sampleRateRatio$jscomp$0 = 44100 / sound$jscomp$0.buffer.sampleRate;
    return sound$jscomp$0.buffer.length * sampleRateRatio$jscomp$0;
  }
  function _JS_Sound_GetLoadState$jscomp$0(bufferInstance$jscomp$1) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return 2;
    }
    var sound$jscomp$1 = WEBAudio$jscomp$0.audioInstances[bufferInstance$jscomp$1];
    if (sound$jscomp$1.error) {
      return 2;
    }
    if (sound$jscomp$1.buffer) {
      return 0;
    }
    return 1;
  }
  function _JS_Sound_Init$jscomp$0() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      WEBAudio$jscomp$0.audioContext = new AudioContext;
      var tryToResumeAudioContext$jscomp$0 = function() {
        if (WEBAudio$jscomp$0.audioContext.state === "suspended") {
          WEBAudio$jscomp$0.audioContext.resume();
        } else {
          Module$jscomp$0.clearInterval(resumeInterval$jscomp$0);
        }
      };
      var resumeInterval$jscomp$0 = Module$jscomp$0.setInterval(tryToResumeAudioContext$jscomp$0, 400);
      WEBAudio$jscomp$0.audioWebEnabled = 1;
    } catch (e$jscomp$11) {
      alert("Web Audio API is not supported in this browser");
    }
  }
  function _JS_Sound_Load$jscomp$0(ptr$jscomp$7, length$jscomp$18) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return 0;
    }
    var sound$jscomp$2 = {
      buffer : null,
      error : false
    };
    WEBAudio$jscomp$0.audioInstances[++WEBAudio$jscomp$0.audioInstanceIdCounter] = sound$jscomp$2;
    var audioData$jscomp$1 = HEAPU8$jscomp$0.buffer.slice(ptr$jscomp$7, ptr$jscomp$7 + length$jscomp$18);
    WEBAudio$jscomp$0.audioContext.decodeAudioData(audioData$jscomp$1, function(buffer$jscomp$14) {
      sound$jscomp$2.buffer = buffer$jscomp$14;
    }, function() {
      sound$jscomp$2.error = true;
      console.log("Decode error.");
    });
    return WEBAudio$jscomp$0.audioInstanceIdCounter;
  }
  function _JS_Sound_Load_PCM$jscomp$0(channels$jscomp$1, length$jscomp$19, sampleRate$jscomp$3, ptr$jscomp$8) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return 0;
    }
    var sound$jscomp$3 = {
      buffer : WEBAudio$jscomp$0.audioContext.createBuffer(channels$jscomp$1, length$jscomp$19, sampleRate$jscomp$3),
      error : false
    };
    var i$jscomp$11 = 0;
    for (; i$jscomp$11 < channels$jscomp$1; i$jscomp$11++) {
      var offs$jscomp$0 = (ptr$jscomp$8 >> 2) + length$jscomp$19 * i$jscomp$11;
      var buffer$jscomp$15 = sound$jscomp$3.buffer;
      var copyToChannel$jscomp$0 = buffer$jscomp$15["copyToChannel"] || function(source$jscomp$12, channelNumber$jscomp$2, startInChannel$jscomp$2) {
        var clipped$jscomp$0 = source$jscomp$12.subarray(0, Math.min(source$jscomp$12.length, this.length - (startInChannel$jscomp$2 | 0)));
        this.getChannelData(channelNumber$jscomp$2 | 0).set(clipped$jscomp$0, startInChannel$jscomp$2 | 0);
      };
      copyToChannel$jscomp$0.apply(buffer$jscomp$15, [HEAPF32$jscomp$0.subarray(offs$jscomp$0, offs$jscomp$0 + length$jscomp$19), i$jscomp$11, 0]);
    }
    WEBAudio$jscomp$0.audioInstances[++WEBAudio$jscomp$0.audioInstanceIdCounter] = sound$jscomp$3;
    return WEBAudio$jscomp$0.audioInstanceIdCounter;
  }
  function _JS_Sound_Play$jscomp$0(bufferInstance$jscomp$2, channelInstance$jscomp$0, offset$jscomp$14, delay$jscomp$1) {
    _JS_Sound_Stop$jscomp$0(channelInstance$jscomp$0, 0);
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var sound$jscomp$4 = WEBAudio$jscomp$0.audioInstances[bufferInstance$jscomp$2];
    var channel$jscomp$2 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$0];
    if (sound$jscomp$4.buffer) {
      try {
        channel$jscomp$2.playBuffer(WEBAudio$jscomp$0.audioContext.currentTime + delay$jscomp$1, sound$jscomp$4.buffer, offset$jscomp$14);
      } catch (e$jscomp$12) {
        console.error("playBuffer error. Exception: " + e$jscomp$12);
      }
    } else {
      console.log("Trying to play sound which is not loaded.");
    }
  }
  function _JS_Sound_ReleaseInstance$jscomp$0(instance$jscomp$1) {
    delete WEBAudio$jscomp$0.audioInstances[instance$jscomp$1];
  }
  function _JS_Sound_ResumeIfNeeded$jscomp$0() {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    if (WEBAudio$jscomp$0.audioContext.state === "suspended") {
      WEBAudio$jscomp$0.audioContext.resume();
    }
  }
  function _JS_Sound_Set3D$jscomp$0(channelInstance$jscomp$1, threeD$jscomp$0) {
    var channel$jscomp$3 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$1];
    if (channel$jscomp$3.threeD != threeD$jscomp$0) {
      channel$jscomp$3.threeD = threeD$jscomp$0;
      if (!channel$jscomp$3.source) {
        channel$jscomp$3.setup();
      }
      channel$jscomp$3.setupPanning();
    }
  }
  function _JS_Sound_SetListenerOrientation$jscomp$0(x$jscomp$76, y$jscomp$60, z$jscomp$11, xUp$jscomp$1, yUp$jscomp$1, zUp$jscomp$1) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    if (WEBAudio$jscomp$0.audioContext.listener.forwardX) {
      WEBAudio$jscomp$0.audioContext.listener.forwardX.setValueAtTime(-x$jscomp$76, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.forwardY.setValueAtTime(-y$jscomp$60, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.forwardZ.setValueAtTime(-z$jscomp$11, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.upX.setValueAtTime(xUp$jscomp$1, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.upY.setValueAtTime(yUp$jscomp$1, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.upZ.setValueAtTime(zUp$jscomp$1, WEBAudio$jscomp$0.audioContext.currentTime);
    } else {
      WEBAudio$jscomp$0.audioContext.listener.setOrientation(-x$jscomp$76, -y$jscomp$60, -z$jscomp$11, xUp$jscomp$1, yUp$jscomp$1, zUp$jscomp$1);
    }
  }
  function _JS_Sound_SetListenerPosition$jscomp$0(x$jscomp$77, y$jscomp$61, z$jscomp$12) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    if (WEBAudio$jscomp$0.audioContext.listener.positionX) {
      WEBAudio$jscomp$0.audioContext.listener.positionX.setValueAtTime(x$jscomp$77, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.positionY.setValueAtTime(y$jscomp$61, WEBAudio$jscomp$0.audioContext.currentTime);
      WEBAudio$jscomp$0.audioContext.listener.positionZ.setValueAtTime(z$jscomp$12, WEBAudio$jscomp$0.audioContext.currentTime);
    } else {
      WEBAudio$jscomp$0.audioContext.listener.setPosition(x$jscomp$77, y$jscomp$61, z$jscomp$12);
    }
  }
  function _JS_Sound_SetLoop$jscomp$0(channelInstance$jscomp$2, loop$jscomp$0) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$4 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$2];
    if (!channel$jscomp$4.source) {
      channel$jscomp$4.setup();
    }
    channel$jscomp$4.source.loop = loop$jscomp$0;
  }
  function _JS_Sound_SetLoopPoints$jscomp$0(channelInstance$jscomp$3, loopStart$jscomp$0, loopEnd$jscomp$0) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$5 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$3];
    if (!channel$jscomp$5.source) {
      channel$jscomp$5.setup();
    }
    channel$jscomp$5.source.loopStart = loopStart$jscomp$0;
    channel$jscomp$5.source.loopEnd = loopEnd$jscomp$0;
  }
  function _JS_Sound_SetPaused$jscomp$0(channelInstance$jscomp$4, paused$jscomp$0) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$6 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$4];
    var channelCurrentlyPaused$jscomp$0 = !channel$jscomp$6.source || channel$jscomp$6.source.isPausedMockNode;
    if (paused$jscomp$0 != channelCurrentlyPaused$jscomp$0) {
      if (paused$jscomp$0) {
        channel$jscomp$6.pause();
      } else {
        channel$jscomp$6.resume();
      }
    }
  }
  function _JS_Sound_SetPitch$jscomp$0(channelInstance$jscomp$5, v$jscomp$1) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    try {
      WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$5].source.setPitch(v$jscomp$1);
    } catch (e$jscomp$13) {
      console.error("Invalid audio pitch " + v$jscomp$1 + " specified to WebAudio backend!");
    }
  }
  function _JS_Sound_SetPosition$jscomp$0(channelInstance$jscomp$6, x$jscomp$78, y$jscomp$62, z$jscomp$13) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$7 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$6];
    if (channel$jscomp$7.x != x$jscomp$78 || channel$jscomp$7.y != y$jscomp$62 || channel$jscomp$7.z != z$jscomp$13) {
      channel$jscomp$7.panner.setPosition(x$jscomp$78, y$jscomp$62, z$jscomp$13);
      channel$jscomp$7.x = x$jscomp$78;
      channel$jscomp$7.y = y$jscomp$62;
      channel$jscomp$7.z = z$jscomp$13;
    }
  }
  function _JS_Sound_SetVolume$jscomp$0(channelInstance$jscomp$7, v$jscomp$2) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    try {
      WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$7].gain.gain.setValueAtTime(v$jscomp$2, WEBAudio$jscomp$0.audioContext.currentTime);
    } catch (e$jscomp$14) {
      console.error("Invalid audio volume " + v$jscomp$2 + " specified to WebAudio backend!");
    }
  }
  function _JS_Sound_Stop$jscomp$0(channelInstance$jscomp$8, delay$jscomp$2) {
    if (WEBAudio$jscomp$0.audioWebEnabled == 0) {
      return;
    }
    var channel$jscomp$8 = WEBAudio$jscomp$0.audioInstances[channelInstance$jscomp$8];
    channel$jscomp$8.stop(delay$jscomp$2);
  }
  function _JS_SystemInfo_GetCanvasClientSize$jscomp$0(domElementSelector$jscomp$0, outWidth$jscomp$0, outHeight$jscomp$0) {
    var selector$jscomp$1 = UTF8ToString$jscomp$0(domElementSelector$jscomp$0);
    var canvas$jscomp$0 = selector$jscomp$1 == "#canvas" ? Module$jscomp$0["canvas"] : document.querySelector(selector$jscomp$1);
    HEAPF64$jscomp$0[outWidth$jscomp$0 >> 3] = canvas$jscomp$0 ? canvas$jscomp$0.clientWidth : 0;
    HEAPF64$jscomp$0[outHeight$jscomp$0 >> 3] = canvas$jscomp$0 ? canvas$jscomp$0.clientHeight : 0;
  }
  function _JS_SystemInfo_GetDocumentURL$jscomp$0(buffer$jscomp$16, bufferSize$jscomp$3) {
    if (buffer$jscomp$16) {
      stringToUTF8$jscomp$0(document.URL, buffer$jscomp$16, bufferSize$jscomp$3);
    }
    return lengthBytesUTF8$jscomp$0(document.URL);
  }
  function _JS_SystemInfo_GetGPUInfo$jscomp$0(buffer$jscomp$17, bufferSize$jscomp$4) {
    var gpuinfo$jscomp$0 = Module$jscomp$0.SystemInfo.gpu;
    if (buffer$jscomp$17) {
      stringToUTF8$jscomp$0(gpuinfo$jscomp$0, buffer$jscomp$17, bufferSize$jscomp$4);
    }
    return lengthBytesUTF8$jscomp$0(gpuinfo$jscomp$0);
  }
  function _JS_SystemInfo_GetMatchWebGLToCanvasSize$jscomp$0() {
    return Module$jscomp$0.matchWebGLToCanvasSize || Module$jscomp$0.matchWebGLToCanvasSize === undefined;
  }
  function _JS_SystemInfo_GetMemory$jscomp$0() {
    return TOTAL_MEMORY$jscomp$0 / (1024 * 1024);
  }
  function _JS_SystemInfo_GetOS$jscomp$0(buffer$jscomp$18, bufferSize$jscomp$5) {
    var browser$jscomp$0 = Module$jscomp$0.SystemInfo.os + " " + Module$jscomp$0.SystemInfo.osVersion;
    if (buffer$jscomp$18) {
      stringToUTF8$jscomp$0(browser$jscomp$0, buffer$jscomp$18, bufferSize$jscomp$5);
    }
    return lengthBytesUTF8$jscomp$0(browser$jscomp$0);
  }
  function _JS_SystemInfo_GetPreferredDevicePixelRatio$jscomp$0() {
    return Module$jscomp$0.devicePixelRatio || window.devicePixelRatio || 1;
  }
  function _JS_SystemInfo_GetScreenSize$jscomp$0(outWidth$jscomp$1, outHeight$jscomp$1) {
    HEAPF64$jscomp$0[outWidth$jscomp$1 >> 3] = Module$jscomp$0.SystemInfo.width;
    HEAPF64$jscomp$0[outHeight$jscomp$1 >> 3] = Module$jscomp$0.SystemInfo.height;
  }
  function _JS_SystemInfo_HasCursorLock$jscomp$0() {
    return Module$jscomp$0.SystemInfo.hasCursorLock;
  }
  function _JS_SystemInfo_HasFullscreen$jscomp$0() {
    return Module$jscomp$0.SystemInfo.hasFullscreen;
  }
  function _JS_SystemInfo_HasWebGL$jscomp$0() {
    return Module$jscomp$0.SystemInfo.hasWebGL;
  }
  function ___atomic_compare_exchange_8$jscomp$0(ptr$jscomp$9, expected$jscomp$0, desiredl$jscomp$0, desiredh$jscomp$0, weak$jscomp$0, success_memmodel$jscomp$0, failure_memmodel$jscomp$0) {
    var pl$jscomp$0 = HEAP32$jscomp$0[ptr$jscomp$9 >> 2];
    var ph$jscomp$0 = HEAP32$jscomp$0[ptr$jscomp$9 + 4 >> 2];
    var el$jscomp$0 = HEAP32$jscomp$0[expected$jscomp$0 >> 2];
    var eh$jscomp$0 = HEAP32$jscomp$0[expected$jscomp$0 + 4 >> 2];
    if (pl$jscomp$0 === el$jscomp$0 && ph$jscomp$0 === eh$jscomp$0) {
      HEAP32$jscomp$0[ptr$jscomp$9 >> 2] = desiredl$jscomp$0;
      HEAP32$jscomp$0[ptr$jscomp$9 + 4 >> 2] = desiredh$jscomp$0;
      return 1;
    } else {
      HEAP32$jscomp$0[expected$jscomp$0 >> 2] = pl$jscomp$0;
      HEAP32$jscomp$0[expected$jscomp$0 + 4 >> 2] = ph$jscomp$0;
      return 0;
    }
  }
  function ___atomic_fetch_add_8$jscomp$0(ptr$jscomp$10, vall$jscomp$0, valh$jscomp$0, memmodel$jscomp$0) {
    var l$jscomp$0 = HEAP32$jscomp$0[ptr$jscomp$10 >> 2];
    var h$jscomp$6 = HEAP32$jscomp$0[ptr$jscomp$10 + 4 >> 2];
    HEAP32$jscomp$0[ptr$jscomp$10 >> 2] = _i64Add$jscomp$0(l$jscomp$0, h$jscomp$6, vall$jscomp$0, valh$jscomp$0);
    HEAP32$jscomp$0[ptr$jscomp$10 + 4 >> 2] = getTempRet0$jscomp$0();
    return (setTempRet0$jscomp$0(h$jscomp$6), l$jscomp$0) | 0;
  }
  function ___buildEnvironment$jscomp$0(environ$jscomp$0) {
    var MAX_ENV_VALUES$jscomp$0 = 64;
    var TOTAL_ENV_SIZE$jscomp$0 = 1024;
    var poolPtr$jscomp$0;
    var envPtr$jscomp$0;
    if (!___buildEnvironment$jscomp$0.called) {
      ___buildEnvironment$jscomp$0.called = true;
      ENV$jscomp$0["USER"] = ENV$jscomp$0["LOGNAME"] = "web_user";
      ENV$jscomp$0["PATH"] = "/";
      ENV$jscomp$0["PWD"] = "/";
      ENV$jscomp$0["HOME"] = "/home/web_user";
      ENV$jscomp$0["LANG"] = "C.UTF-8";
      ENV$jscomp$0["_"] = Module$jscomp$0["thisProgram"];
      poolPtr$jscomp$0 = getMemory$jscomp$0(TOTAL_ENV_SIZE$jscomp$0);
      envPtr$jscomp$0 = getMemory$jscomp$0(MAX_ENV_VALUES$jscomp$0 * 4);
      HEAP32$jscomp$0[envPtr$jscomp$0 >> 2] = poolPtr$jscomp$0;
      HEAP32$jscomp$0[environ$jscomp$0 >> 2] = envPtr$jscomp$0;
    } else {
      envPtr$jscomp$0 = HEAP32$jscomp$0[environ$jscomp$0 >> 2];
      poolPtr$jscomp$0 = HEAP32$jscomp$0[envPtr$jscomp$0 >> 2];
    }
    var strings$jscomp$0 = [];
    var totalSize$jscomp$0 = 0;
    var key$jscomp$36;
    for (key$jscomp$36 in ENV$jscomp$0) {
      if (typeof ENV$jscomp$0[key$jscomp$36] === "string") {
        var line$jscomp$0 = key$jscomp$36 + "=" + ENV$jscomp$0[key$jscomp$36];
        strings$jscomp$0.push(line$jscomp$0);
        totalSize$jscomp$0 = totalSize$jscomp$0 + line$jscomp$0.length;
      }
    }
    if (totalSize$jscomp$0 > TOTAL_ENV_SIZE$jscomp$0) {
      throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
    }
    var ptrSize$jscomp$0 = 4;
    var i$jscomp$12 = 0;
    for (; i$jscomp$12 < strings$jscomp$0.length; i$jscomp$12++) {
      line$jscomp$0 = strings$jscomp$0[i$jscomp$12];
      writeAsciiToMemory$jscomp$0(line$jscomp$0, poolPtr$jscomp$0);
      HEAP32$jscomp$0[envPtr$jscomp$0 + i$jscomp$12 * ptrSize$jscomp$0 >> 2] = poolPtr$jscomp$0;
      poolPtr$jscomp$0 = poolPtr$jscomp$0 + (line$jscomp$0.length + 1);
    }
    HEAP32$jscomp$0[envPtr$jscomp$0 + strings$jscomp$0.length * ptrSize$jscomp$0 >> 2] = 0;
  }
  function ___cxa_allocate_exception$jscomp$0(size$jscomp$21) {
    return _malloc$jscomp$0(size$jscomp$21);
  }
  function __ZSt18uncaught_exceptionv$jscomp$0() {
    return !!__ZSt18uncaught_exceptionv$jscomp$0.uncaught_exception;
  }
  function ___cxa_begin_catch$jscomp$0(ptr$jscomp$11) {
    var info$jscomp$1 = EXCEPTIONS$jscomp$0.infos[ptr$jscomp$11];
    if (info$jscomp$1 && !info$jscomp$1.caught) {
      info$jscomp$1.caught = true;
      __ZSt18uncaught_exceptionv$jscomp$0.uncaught_exception--;
    }
    if (info$jscomp$1) {
      info$jscomp$1.rethrown = false;
    }
    EXCEPTIONS$jscomp$0.caught.push(ptr$jscomp$11);
    EXCEPTIONS$jscomp$0.addRef(EXCEPTIONS$jscomp$0.deAdjust(ptr$jscomp$11));
    return ptr$jscomp$11;
  }
  function ___cxa_free_exception$jscomp$0(ptr$jscomp$12) {
    try {
      return _free$jscomp$0(ptr$jscomp$12);
    } catch (e$jscomp$15) {
    }
  }
  function ___cxa_end_catch$jscomp$0() {
    Module$jscomp$0["setThrew"](0);
    var ptr$jscomp$13 = EXCEPTIONS$jscomp$0.caught.pop();
    if (ptr$jscomp$13) {
      EXCEPTIONS$jscomp$0.decRef(EXCEPTIONS$jscomp$0.deAdjust(ptr$jscomp$13));
      EXCEPTIONS$jscomp$0.last = 0;
    }
  }
  function ___cxa_find_matching_catch_2$jscomp$0() {
    return ___cxa_find_matching_catch$jscomp$0.apply(null, arguments);
  }
  function ___cxa_find_matching_catch_3$jscomp$0() {
    return ___cxa_find_matching_catch$jscomp$0.apply(null, arguments);
  }
  function ___cxa_find_matching_catch_4$jscomp$0() {
    return ___cxa_find_matching_catch$jscomp$0.apply(null, arguments);
  }
  function ___cxa_pure_virtual$jscomp$0() {
    ABORT$jscomp$0 = true;
    throw "Pure virtual function called!";
  }
  function ___cxa_rethrow$jscomp$0() {
    var ptr$jscomp$14 = EXCEPTIONS$jscomp$0.caught.pop();
    ptr$jscomp$14 = EXCEPTIONS$jscomp$0.deAdjust(ptr$jscomp$14);
    if (!EXCEPTIONS$jscomp$0.infos[ptr$jscomp$14].rethrown) {
      EXCEPTIONS$jscomp$0.caught.push(ptr$jscomp$14);
      EXCEPTIONS$jscomp$0.infos[ptr$jscomp$14].rethrown = true;
    }
    EXCEPTIONS$jscomp$0.last = ptr$jscomp$14;
    throw ptr$jscomp$14;
  }
  function ___resumeException$jscomp$0(ptr$jscomp$15) {
    if (!EXCEPTIONS$jscomp$0.last) {
      EXCEPTIONS$jscomp$0.last = ptr$jscomp$15;
    }
    throw ptr$jscomp$15;
  }
  function ___cxa_find_matching_catch$jscomp$0() {
    var thrown$jscomp$0 = EXCEPTIONS$jscomp$0.last;
    if (!thrown$jscomp$0) {
      return (setTempRet0$jscomp$0(0), 0) | 0;
    }
    var info$jscomp$2 = EXCEPTIONS$jscomp$0.infos[thrown$jscomp$0];
    var throwntype$jscomp$0 = info$jscomp$2.type;
    if (!throwntype$jscomp$0) {
      return (setTempRet0$jscomp$0(0), thrown$jscomp$0) | 0;
    }
    var typeArray$jscomp$0 = Array.prototype.slice.call(arguments);
    var pointer$jscomp$0 = Module$jscomp$0["___cxa_is_pointer_type"](throwntype$jscomp$0);
    if (!___cxa_find_matching_catch$jscomp$0.buffer) {
      ___cxa_find_matching_catch$jscomp$0.buffer = _malloc$jscomp$0(4);
    }
    HEAP32$jscomp$0[___cxa_find_matching_catch$jscomp$0.buffer >> 2] = thrown$jscomp$0;
    thrown$jscomp$0 = ___cxa_find_matching_catch$jscomp$0.buffer;
    var i$jscomp$13 = 0;
    for (; i$jscomp$13 < typeArray$jscomp$0.length; i$jscomp$13++) {
      if (typeArray$jscomp$0[i$jscomp$13] && Module$jscomp$0["___cxa_can_catch"](typeArray$jscomp$0[i$jscomp$13], throwntype$jscomp$0, thrown$jscomp$0)) {
        thrown$jscomp$0 = HEAP32$jscomp$0[thrown$jscomp$0 >> 2];
        info$jscomp$2.adjusted = thrown$jscomp$0;
        return (setTempRet0$jscomp$0(typeArray$jscomp$0[i$jscomp$13]), thrown$jscomp$0) | 0;
      }
    }
    thrown$jscomp$0 = HEAP32$jscomp$0[thrown$jscomp$0 >> 2];
    return (setTempRet0$jscomp$0(throwntype$jscomp$0), thrown$jscomp$0) | 0;
  }
  function ___cxa_throw$jscomp$0(ptr$jscomp$16, type$jscomp$118, destructor$jscomp$0) {
    EXCEPTIONS$jscomp$0.infos[ptr$jscomp$16] = {
      ptr : ptr$jscomp$16,
      adjusted : ptr$jscomp$16,
      type : type$jscomp$118,
      destructor : destructor$jscomp$0,
      refcount : 0,
      caught : false,
      rethrown : false
    };
    EXCEPTIONS$jscomp$0.last = ptr$jscomp$16;
    if (!("uncaught_exception" in __ZSt18uncaught_exceptionv$jscomp$0)) {
      __ZSt18uncaught_exceptionv$jscomp$0.uncaught_exception = 1;
    } else {
      __ZSt18uncaught_exceptionv$jscomp$0.uncaught_exception++;
    }
    throw ptr$jscomp$16;
  }
  function ___gxx_personality_v0$jscomp$0() {
  }
  function ___lock$jscomp$0() {
  }
  function ___setErrNo$jscomp$0(value$jscomp$87) {
    if (Module$jscomp$0["___errno_location"]) {
      HEAP32$jscomp$0[Module$jscomp$0["___errno_location"]() >> 2] = value$jscomp$87;
    }
    return value$jscomp$87;
  }
  function ___map_file$jscomp$0(pathname$jscomp$0, size$jscomp$22) {
    ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EPERM);
    return -1;
  }
  function ___syscall10$jscomp$0(which$jscomp$0, varargs$jscomp$0) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$0;
    try {
      var path$jscomp$4 = SYSCALLS$jscomp$0.getStr();
      FS$jscomp$0.unlink(path$jscomp$4);
      return 0;
    } catch (e$jscomp$16) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$16 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$16);
      }
      return -e$jscomp$16.errno;
    }
  }
  function ___syscall122$jscomp$0(which$jscomp$1, varargs$jscomp$1) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$1;
    try {
      var copyString$jscomp$0 = function(element$jscomp$7, value$jscomp$88) {
        var offset$jscomp$15 = layout$jscomp$0[element$jscomp$7];
        writeAsciiToMemory$jscomp$0(value$jscomp$88, buf$jscomp$1 + offset$jscomp$15);
      };
      var buf$jscomp$1 = SYSCALLS$jscomp$0.get();
      if (!buf$jscomp$1) {
        return -ERRNO_CODES$jscomp$0.EFAULT;
      }
      var layout$jscomp$0 = {
        "sysname" : 0,
        "nodename" : 65,
        "domainname" : 325,
        "machine" : 260,
        "version" : 195,
        "release" : 130,
        "__size__" : 390
      };
      copyString$jscomp$0("sysname", "Emscripten");
      copyString$jscomp$0("nodename", "emscripten");
      copyString$jscomp$0("release", "1.0");
      copyString$jscomp$0("version", "#1");
      copyString$jscomp$0("machine", "x86-JS");
      return 0;
    } catch (e$jscomp$17) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$17 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$17);
      }
      return -e$jscomp$17.errno;
    }
  }
  function ___syscall140$jscomp$0(which$jscomp$2, varargs$jscomp$2) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$2;
    try {
      var stream$jscomp$4 = SYSCALLS$jscomp$0.getStreamFromFD();
      var offset_high$jscomp$0 = SYSCALLS$jscomp$0.get();
      var offset_low$jscomp$0 = SYSCALLS$jscomp$0.get();
      var result$jscomp$1 = SYSCALLS$jscomp$0.get();
      var whence$jscomp$0 = SYSCALLS$jscomp$0.get();
      var offset$jscomp$16 = offset_low$jscomp$0;
      FS$jscomp$0.llseek(stream$jscomp$4, offset$jscomp$16, whence$jscomp$0);
      HEAP32$jscomp$0[result$jscomp$1 >> 2] = stream$jscomp$4.position;
      if (stream$jscomp$4.getdents && offset$jscomp$16 === 0 && whence$jscomp$0 === 0) {
        stream$jscomp$4.getdents = null;
      }
      return 0;
    } catch (e$jscomp$18) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$18 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$18);
      }
      return -e$jscomp$18.errno;
    }
  }
  function ___syscall142$jscomp$0(which$jscomp$3, varargs$jscomp$3) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$3;
    try {
      var check$jscomp$0 = function(fd$jscomp$1, low$jscomp$1, high$jscomp$1, val$jscomp$0) {
        return fd$jscomp$1 < 32 ? low$jscomp$1 & val$jscomp$0 : high$jscomp$1 & val$jscomp$0;
      };
      var nfds$jscomp$0 = SYSCALLS$jscomp$0.get();
      var readfds$jscomp$0 = SYSCALLS$jscomp$0.get();
      var writefds$jscomp$0 = SYSCALLS$jscomp$0.get();
      var exceptfds$jscomp$0 = SYSCALLS$jscomp$0.get();
      var timeout$jscomp$1 = SYSCALLS$jscomp$0.get();
      assert$jscomp$0(nfds$jscomp$0 <= 64, "nfds must be less than or equal to 64");
      assert$jscomp$0(!exceptfds$jscomp$0, "exceptfds not supported");
      var total$jscomp$0 = 0;
      var srcReadLow$jscomp$0 = readfds$jscomp$0 ? HEAP32$jscomp$0[readfds$jscomp$0 >> 2] : 0;
      var srcReadHigh$jscomp$0 = readfds$jscomp$0 ? HEAP32$jscomp$0[readfds$jscomp$0 + 4 >> 2] : 0;
      var srcWriteLow$jscomp$0 = writefds$jscomp$0 ? HEAP32$jscomp$0[writefds$jscomp$0 >> 2] : 0;
      var srcWriteHigh$jscomp$0 = writefds$jscomp$0 ? HEAP32$jscomp$0[writefds$jscomp$0 + 4 >> 2] : 0;
      var srcExceptLow$jscomp$0 = exceptfds$jscomp$0 ? HEAP32$jscomp$0[exceptfds$jscomp$0 >> 2] : 0;
      var srcExceptHigh$jscomp$0 = exceptfds$jscomp$0 ? HEAP32$jscomp$0[exceptfds$jscomp$0 + 4 >> 2] : 0;
      var dstReadLow$jscomp$0 = 0;
      var dstReadHigh$jscomp$0 = 0;
      var dstWriteLow$jscomp$0 = 0;
      var dstWriteHigh$jscomp$0 = 0;
      var dstExceptLow$jscomp$0 = 0;
      var dstExceptHigh$jscomp$0 = 0;
      var allLow$jscomp$0 = (readfds$jscomp$0 ? HEAP32$jscomp$0[readfds$jscomp$0 >> 2] : 0) | (writefds$jscomp$0 ? HEAP32$jscomp$0[writefds$jscomp$0 >> 2] : 0) | (exceptfds$jscomp$0 ? HEAP32$jscomp$0[exceptfds$jscomp$0 >> 2] : 0);
      var allHigh$jscomp$0 = (readfds$jscomp$0 ? HEAP32$jscomp$0[readfds$jscomp$0 + 4 >> 2] : 0) | (writefds$jscomp$0 ? HEAP32$jscomp$0[writefds$jscomp$0 + 4 >> 2] : 0) | (exceptfds$jscomp$0 ? HEAP32$jscomp$0[exceptfds$jscomp$0 + 4 >> 2] : 0);
      var fd$jscomp$0 = 0;
      for (; fd$jscomp$0 < nfds$jscomp$0; fd$jscomp$0++) {
        var mask$jscomp$5 = 1 << fd$jscomp$0 % 32;
        if (!check$jscomp$0(fd$jscomp$0, allLow$jscomp$0, allHigh$jscomp$0, mask$jscomp$5)) {
          continue;
        }
        var stream$jscomp$5 = FS$jscomp$0.getStream(fd$jscomp$0);
        if (!stream$jscomp$5) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
        }
        var flags$jscomp$1 = SYSCALLS$jscomp$0.DEFAULT_POLLMASK;
        if (stream$jscomp$5.stream_ops.poll) {
          flags$jscomp$1 = stream$jscomp$5.stream_ops.poll(stream$jscomp$5);
        }
        if (flags$jscomp$1 & 1 && check$jscomp$0(fd$jscomp$0, srcReadLow$jscomp$0, srcReadHigh$jscomp$0, mask$jscomp$5)) {
          if (fd$jscomp$0 < 32) {
            dstReadLow$jscomp$0 = dstReadLow$jscomp$0 | mask$jscomp$5;
          } else {
            dstReadHigh$jscomp$0 = dstReadHigh$jscomp$0 | mask$jscomp$5;
          }
          total$jscomp$0++;
        }
        if (flags$jscomp$1 & 4 && check$jscomp$0(fd$jscomp$0, srcWriteLow$jscomp$0, srcWriteHigh$jscomp$0, mask$jscomp$5)) {
          if (fd$jscomp$0 < 32) {
            dstWriteLow$jscomp$0 = dstWriteLow$jscomp$0 | mask$jscomp$5;
          } else {
            dstWriteHigh$jscomp$0 = dstWriteHigh$jscomp$0 | mask$jscomp$5;
          }
          total$jscomp$0++;
        }
        if (flags$jscomp$1 & 2 && check$jscomp$0(fd$jscomp$0, srcExceptLow$jscomp$0, srcExceptHigh$jscomp$0, mask$jscomp$5)) {
          if (fd$jscomp$0 < 32) {
            dstExceptLow$jscomp$0 = dstExceptLow$jscomp$0 | mask$jscomp$5;
          } else {
            dstExceptHigh$jscomp$0 = dstExceptHigh$jscomp$0 | mask$jscomp$5;
          }
          total$jscomp$0++;
        }
      }
      if (readfds$jscomp$0) {
        HEAP32$jscomp$0[readfds$jscomp$0 >> 2] = dstReadLow$jscomp$0;
        HEAP32$jscomp$0[readfds$jscomp$0 + 4 >> 2] = dstReadHigh$jscomp$0;
      }
      if (writefds$jscomp$0) {
        HEAP32$jscomp$0[writefds$jscomp$0 >> 2] = dstWriteLow$jscomp$0;
        HEAP32$jscomp$0[writefds$jscomp$0 + 4 >> 2] = dstWriteHigh$jscomp$0;
      }
      if (exceptfds$jscomp$0) {
        HEAP32$jscomp$0[exceptfds$jscomp$0 >> 2] = dstExceptLow$jscomp$0;
        HEAP32$jscomp$0[exceptfds$jscomp$0 + 4 >> 2] = dstExceptHigh$jscomp$0;
      }
      return total$jscomp$0;
    } catch (e$jscomp$19) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$19 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$19);
      }
      return -e$jscomp$19.errno;
    }
  }
  function ___syscall145$jscomp$0(which$jscomp$4, varargs$jscomp$4) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$4;
    try {
      var stream$jscomp$6 = SYSCALLS$jscomp$0.getStreamFromFD();
      var iov$jscomp$0 = SYSCALLS$jscomp$0.get();
      var iovcnt$jscomp$0 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doReadv(stream$jscomp$6, iov$jscomp$0, iovcnt$jscomp$0);
    } catch (e$jscomp$20) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$20 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$20);
      }
      return -e$jscomp$20.errno;
    }
  }
  function ___syscall146$jscomp$0(which$jscomp$5, varargs$jscomp$5) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$5;
    try {
      var stream$jscomp$7 = SYSCALLS$jscomp$0.getStreamFromFD();
      var iov$jscomp$1 = SYSCALLS$jscomp$0.get();
      var iovcnt$jscomp$1 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doWritev(stream$jscomp$7, iov$jscomp$1, iovcnt$jscomp$1);
    } catch (e$jscomp$21) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$21 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$21);
      }
      return -e$jscomp$21.errno;
    }
  }
  function ___syscall15$jscomp$0(which$jscomp$6, varargs$jscomp$6) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$6;
    try {
      var path$jscomp$5 = SYSCALLS$jscomp$0.getStr();
      var mode$jscomp$10 = SYSCALLS$jscomp$0.get();
      FS$jscomp$0.chmod(path$jscomp$5, mode$jscomp$10);
      return 0;
    } catch (e$jscomp$22) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$22 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$22);
      }
      return -e$jscomp$22.errno;
    }
  }
  function ___syscall183$jscomp$0(which$jscomp$7, varargs$jscomp$7) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$7;
    try {
      var buf$jscomp$2 = SYSCALLS$jscomp$0.get();
      var size$jscomp$23 = SYSCALLS$jscomp$0.get();
      if (size$jscomp$23 === 0) {
        return -ERRNO_CODES$jscomp$0.EINVAL;
      }
      var cwd$jscomp$0 = FS$jscomp$0.cwd();
      var cwdLengthInBytes$jscomp$0 = lengthBytesUTF8$jscomp$0(cwd$jscomp$0);
      if (size$jscomp$23 < cwdLengthInBytes$jscomp$0 + 1) {
        return -ERRNO_CODES$jscomp$0.ERANGE;
      }
      stringToUTF8$jscomp$0(cwd$jscomp$0, buf$jscomp$2, size$jscomp$23);
      return buf$jscomp$2;
    } catch (e$jscomp$23) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$23 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$23);
      }
      return -e$jscomp$23.errno;
    }
  }
  function ___syscall192$jscomp$0(which$jscomp$8, varargs$jscomp$8) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$8;
    try {
      var addr$jscomp$0 = SYSCALLS$jscomp$0.get();
      var len$jscomp$1 = SYSCALLS$jscomp$0.get();
      var prot$jscomp$0 = SYSCALLS$jscomp$0.get();
      var flags$jscomp$2 = SYSCALLS$jscomp$0.get();
      var fd$jscomp$2 = SYSCALLS$jscomp$0.get();
      var off$jscomp$0 = SYSCALLS$jscomp$0.get();
      off$jscomp$0 = off$jscomp$0 << 12;
      var ptr$jscomp$17;
      var allocated$jscomp$0 = false;
      if (fd$jscomp$2 === -1) {
        ptr$jscomp$17 = _memalign$jscomp$0(PAGE_SIZE$jscomp$0, len$jscomp$1);
        if (!ptr$jscomp$17) {
          return -ERRNO_CODES$jscomp$0.ENOMEM;
        }
        _memset$jscomp$0(ptr$jscomp$17, 0, len$jscomp$1);
        allocated$jscomp$0 = true;
      } else {
        var info$jscomp$3 = FS$jscomp$0.getStream(fd$jscomp$2);
        if (!info$jscomp$3) {
          return -ERRNO_CODES$jscomp$0.EBADF;
        }
        var res$jscomp$0 = FS$jscomp$0.mmap(info$jscomp$3, HEAPU8$jscomp$0, addr$jscomp$0, len$jscomp$1, off$jscomp$0, prot$jscomp$0, flags$jscomp$2);
        ptr$jscomp$17 = res$jscomp$0.ptr;
        allocated$jscomp$0 = res$jscomp$0.allocated;
      }
      SYSCALLS$jscomp$0.mappings[ptr$jscomp$17] = {
        malloc : ptr$jscomp$17,
        len : len$jscomp$1,
        allocated : allocated$jscomp$0,
        fd : fd$jscomp$2,
        flags : flags$jscomp$2
      };
      return ptr$jscomp$17;
    } catch (e$jscomp$24) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$24 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$24);
      }
      return -e$jscomp$24.errno;
    }
  }
  function ___syscall193$jscomp$0(which$jscomp$9, varargs$jscomp$9) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$9;
    try {
      var path$jscomp$6 = SYSCALLS$jscomp$0.getStr();
      var zero$jscomp$0 = SYSCALLS$jscomp$0.getZero();
      var length$jscomp$20 = SYSCALLS$jscomp$0.get64();
      FS$jscomp$0.truncate(path$jscomp$6, length$jscomp$20);
      return 0;
    } catch (e$jscomp$25) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$25 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$25);
      }
      return -e$jscomp$25.errno;
    }
  }
  function ___syscall195$jscomp$0(which$jscomp$10, varargs$jscomp$10) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$10;
    try {
      var path$jscomp$7 = SYSCALLS$jscomp$0.getStr();
      var buf$jscomp$3 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doStat(FS$jscomp$0.stat, path$jscomp$7, buf$jscomp$3);
    } catch (e$jscomp$26) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$26 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$26);
      }
      return -e$jscomp$26.errno;
    }
  }
  function ___syscall196$jscomp$0(which$jscomp$11, varargs$jscomp$11) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$11;
    try {
      var path$jscomp$8 = SYSCALLS$jscomp$0.getStr();
      var buf$jscomp$4 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doStat(FS$jscomp$0.lstat, path$jscomp$8, buf$jscomp$4);
    } catch (e$jscomp$27) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$27 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$27);
      }
      return -e$jscomp$27.errno;
    }
  }
  function ___syscall197$jscomp$0(which$jscomp$12, varargs$jscomp$12) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$12;
    try {
      var stream$jscomp$8 = SYSCALLS$jscomp$0.getStreamFromFD();
      var buf$jscomp$5 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doStat(FS$jscomp$0.stat, stream$jscomp$8.path, buf$jscomp$5);
    } catch (e$jscomp$28) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$28 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$28);
      }
      return -e$jscomp$28.errno;
    }
  }
  function ___syscall202$jscomp$0(which$jscomp$13, varargs$jscomp$13) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$13;
    try {
      return 0;
    } catch (e$jscomp$29) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$29 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$29);
      }
      return -e$jscomp$29.errno;
    }
  }
  function ___syscall199$jscomp$0() {
    return ___syscall202$jscomp$0.apply(null, arguments);
  }
  function ___syscall220$jscomp$0(which$jscomp$14, varargs$jscomp$14) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$14;
    try {
      var stream$jscomp$9 = SYSCALLS$jscomp$0.getStreamFromFD();
      var dirp$jscomp$0 = SYSCALLS$jscomp$0.get();
      var count$jscomp$14 = SYSCALLS$jscomp$0.get();
      if (!stream$jscomp$9.getdents) {
        stream$jscomp$9.getdents = FS$jscomp$0.readdir(stream$jscomp$9.path);
      }
      var pos$jscomp$0 = 0;
      for (; stream$jscomp$9.getdents.length > 0 && pos$jscomp$0 + 268 <= count$jscomp$14;) {
        var id$jscomp$9;
        var type$jscomp$119;
        var name$jscomp$64 = stream$jscomp$9.getdents.pop();
        if (name$jscomp$64[0] === ".") {
          id$jscomp$9 = 1;
          type$jscomp$119 = 4;
        } else {
          var child$jscomp$0 = FS$jscomp$0.lookupNode(stream$jscomp$9.node, name$jscomp$64);
          id$jscomp$9 = child$jscomp$0.id;
          type$jscomp$119 = FS$jscomp$0.isChrdev(child$jscomp$0.mode) ? 2 : FS$jscomp$0.isDir(child$jscomp$0.mode) ? 4 : FS$jscomp$0.isLink(child$jscomp$0.mode) ? 10 : 8;
        }
        HEAP32$jscomp$0[dirp$jscomp$0 + pos$jscomp$0 >> 2] = id$jscomp$9;
        HEAP32$jscomp$0[dirp$jscomp$0 + pos$jscomp$0 + 4 >> 2] = stream$jscomp$9.position;
        HEAP16$jscomp$0[dirp$jscomp$0 + pos$jscomp$0 + 8 >> 1] = 268;
        HEAP8$jscomp$0[dirp$jscomp$0 + pos$jscomp$0 + 10 >> 0] = type$jscomp$119;
        stringToUTF8$jscomp$0(name$jscomp$64, dirp$jscomp$0 + pos$jscomp$0 + 11, 256);
        pos$jscomp$0 = pos$jscomp$0 + 268;
      }
      return pos$jscomp$0;
    } catch (e$jscomp$30) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$30 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$30);
      }
      return -e$jscomp$30.errno;
    }
  }
  function ___syscall221$jscomp$0(which$jscomp$15, varargs$jscomp$15) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$15;
    try {
      var stream$jscomp$10 = SYSCALLS$jscomp$0.getStreamFromFD();
      var cmd$jscomp$0 = SYSCALLS$jscomp$0.get();
      switch(cmd$jscomp$0) {
        case 0:
          {
            var arg$jscomp$8 = SYSCALLS$jscomp$0.get();
            if (arg$jscomp$8 < 0) {
              return -ERRNO_CODES$jscomp$0.EINVAL;
            }
            var newStream$jscomp$0;
            newStream$jscomp$0 = FS$jscomp$0.open(stream$jscomp$10.path, stream$jscomp$10.flags, 0, arg$jscomp$8);
            return newStream$jscomp$0.fd;
          }
        case 1:
        case 2:
          return 0;
        case 3:
          return stream$jscomp$10.flags;
        case 4:
          {
            arg$jscomp$8 = SYSCALLS$jscomp$0.get();
            stream$jscomp$10.flags |= arg$jscomp$8;
            return 0;
          }
        case 12:
        case 12:
          {
            arg$jscomp$8 = SYSCALLS$jscomp$0.get();
            var offset$jscomp$17 = 0;
            HEAP16$jscomp$0[arg$jscomp$8 + offset$jscomp$17 >> 1] = 2;
            return 0;
          }
        case 13:
        case 14:
        case 13:
        case 14:
          return 0;
        case 16:
        case 8:
          return -ERRNO_CODES$jscomp$0.EINVAL;
        case 9:
          ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
          return -1;
        default:
          {
            return -ERRNO_CODES$jscomp$0.EINVAL;
          }
      }
    } catch (e$jscomp$31) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$31 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$31);
      }
      return -e$jscomp$31.errno;
    }
  }
  function ___syscall268$jscomp$0(which$jscomp$16, varargs$jscomp$16) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$16;
    try {
      var path$jscomp$9 = SYSCALLS$jscomp$0.getStr();
      var size$jscomp$24 = SYSCALLS$jscomp$0.get();
      var buf$jscomp$6 = SYSCALLS$jscomp$0.get();
      assert$jscomp$0(size$jscomp$24 === 64);
      HEAP32$jscomp$0[buf$jscomp$6 + 4 >> 2] = 4096;
      HEAP32$jscomp$0[buf$jscomp$6 + 40 >> 2] = 4096;
      HEAP32$jscomp$0[buf$jscomp$6 + 8 >> 2] = 1E6;
      HEAP32$jscomp$0[buf$jscomp$6 + 12 >> 2] = 5E5;
      HEAP32$jscomp$0[buf$jscomp$6 + 16 >> 2] = 5E5;
      HEAP32$jscomp$0[buf$jscomp$6 + 20 >> 2] = FS$jscomp$0.nextInode;
      HEAP32$jscomp$0[buf$jscomp$6 + 24 >> 2] = 1E6;
      HEAP32$jscomp$0[buf$jscomp$6 + 28 >> 2] = 42;
      HEAP32$jscomp$0[buf$jscomp$6 + 44 >> 2] = 2;
      HEAP32$jscomp$0[buf$jscomp$6 + 36 >> 2] = 255;
      return 0;
    } catch (e$jscomp$32) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$32 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$32);
      }
      return -e$jscomp$32.errno;
    }
  }
  function ___syscall3$jscomp$0(which$jscomp$17, varargs$jscomp$17) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$17;
    try {
      var stream$jscomp$11 = SYSCALLS$jscomp$0.getStreamFromFD();
      var buf$jscomp$7 = SYSCALLS$jscomp$0.get();
      var count$jscomp$15 = SYSCALLS$jscomp$0.get();
      return FS$jscomp$0.read(stream$jscomp$11, HEAP8$jscomp$0, buf$jscomp$7, count$jscomp$15);
    } catch (e$jscomp$33) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$33 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$33);
      }
      return -e$jscomp$33.errno;
    }
  }
  function ___syscall33$jscomp$0(which$jscomp$18, varargs$jscomp$18) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$18;
    try {
      var path$jscomp$10 = SYSCALLS$jscomp$0.getStr();
      var amode$jscomp$0 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doAccess(path$jscomp$10, amode$jscomp$0);
    } catch (e$jscomp$34) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$34 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$34);
      }
      return -e$jscomp$34.errno;
    }
  }
  function ___syscall38$jscomp$0(which$jscomp$19, varargs$jscomp$19) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$19;
    try {
      var old_path$jscomp$0 = SYSCALLS$jscomp$0.getStr();
      var new_path$jscomp$0 = SYSCALLS$jscomp$0.getStr();
      FS$jscomp$0.rename(old_path$jscomp$0, new_path$jscomp$0);
      return 0;
    } catch (e$jscomp$35) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$35 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$35);
      }
      return -e$jscomp$35.errno;
    }
  }
  function ___syscall39$jscomp$0(which$jscomp$20, varargs$jscomp$20) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$20;
    try {
      var path$jscomp$11 = SYSCALLS$jscomp$0.getStr();
      var mode$jscomp$11 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doMkdir(path$jscomp$11, mode$jscomp$11);
    } catch (e$jscomp$36) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$36 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$36);
      }
      return -e$jscomp$36.errno;
    }
  }
  function ___syscall4$jscomp$0(which$jscomp$21, varargs$jscomp$21) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$21;
    try {
      var stream$jscomp$12 = SYSCALLS$jscomp$0.getStreamFromFD();
      var buf$jscomp$8 = SYSCALLS$jscomp$0.get();
      var count$jscomp$16 = SYSCALLS$jscomp$0.get();
      return FS$jscomp$0.write(stream$jscomp$12, HEAP8$jscomp$0, buf$jscomp$8, count$jscomp$16);
    } catch (e$jscomp$37) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$37 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$37);
      }
      return -e$jscomp$37.errno;
    }
  }
  function ___syscall40$jscomp$0(which$jscomp$22, varargs$jscomp$22) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$22;
    try {
      var path$jscomp$12 = SYSCALLS$jscomp$0.getStr();
      FS$jscomp$0.rmdir(path$jscomp$12);
      return 0;
    } catch (e$jscomp$38) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$38 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$38);
      }
      return -e$jscomp$38.errno;
    }
  }
  function ___syscall5$jscomp$0(which$jscomp$23, varargs$jscomp$23) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$23;
    try {
      var pathname$jscomp$1 = SYSCALLS$jscomp$0.getStr();
      var flags$jscomp$3 = SYSCALLS$jscomp$0.get();
      var mode$jscomp$12 = SYSCALLS$jscomp$0.get();
      var stream$jscomp$13 = FS$jscomp$0.open(pathname$jscomp$1, flags$jscomp$3, mode$jscomp$12);
      return stream$jscomp$13.fd;
    } catch (e$jscomp$39) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$39 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$39);
      }
      return -e$jscomp$39.errno;
    }
  }
  function ___syscall54$jscomp$0(which$jscomp$24, varargs$jscomp$24) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$24;
    try {
      var stream$jscomp$14 = SYSCALLS$jscomp$0.getStreamFromFD();
      var op$jscomp$0 = SYSCALLS$jscomp$0.get();
      switch(op$jscomp$0) {
        case 21509:
        case 21505:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            return 0;
          }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            return 0;
          }
        case 21519:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            var argp$jscomp$0 = SYSCALLS$jscomp$0.get();
            HEAP32$jscomp$0[argp$jscomp$0 >> 2] = 0;
            return 0;
          }
        case 21520:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            return -ERRNO_CODES$jscomp$0.EINVAL;
          }
        case 21531:
          {
            argp$jscomp$0 = SYSCALLS$jscomp$0.get();
            return FS$jscomp$0.ioctl(stream$jscomp$14, op$jscomp$0, argp$jscomp$0);
          }
        case 21523:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            return 0;
          }
        case 21524:
          {
            if (!stream$jscomp$14.tty) {
              return -ERRNO_CODES$jscomp$0.ENOTTY;
            }
            return 0;
          }
        default:
          abort$jscomp$0("bad ioctl syscall " + op$jscomp$0);
      }
    } catch (e$jscomp$40) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$40 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$40);
      }
      return -e$jscomp$40.errno;
    }
  }
  function ___syscall6$jscomp$0(which$jscomp$25, varargs$jscomp$25) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$25;
    try {
      var stream$jscomp$15 = SYSCALLS$jscomp$0.getStreamFromFD();
      FS$jscomp$0.close(stream$jscomp$15);
      return 0;
    } catch (e$jscomp$41) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$41 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$41);
      }
      return -e$jscomp$41.errno;
    }
  }
  function ___syscall77$jscomp$0(which$jscomp$26, varargs$jscomp$26) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$26;
    try {
      var who$jscomp$0 = SYSCALLS$jscomp$0.get();
      var usage$jscomp$1 = SYSCALLS$jscomp$0.get();
      _memset$jscomp$0(usage$jscomp$1, 0, 136);
      HEAP32$jscomp$0[usage$jscomp$1 >> 2] = 1;
      HEAP32$jscomp$0[usage$jscomp$1 + 4 >> 2] = 2;
      HEAP32$jscomp$0[usage$jscomp$1 + 8 >> 2] = 3;
      HEAP32$jscomp$0[usage$jscomp$1 + 12 >> 2] = 4;
      return 0;
    } catch (e$jscomp$42) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$42 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$42);
      }
      return -e$jscomp$42.errno;
    }
  }
  function ___syscall85$jscomp$0(which$jscomp$27, varargs$jscomp$27) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$27;
    try {
      var path$jscomp$13 = SYSCALLS$jscomp$0.getStr();
      var buf$jscomp$9 = SYSCALLS$jscomp$0.get();
      var bufsize$jscomp$0 = SYSCALLS$jscomp$0.get();
      return SYSCALLS$jscomp$0.doReadlink(path$jscomp$13, buf$jscomp$9, bufsize$jscomp$0);
    } catch (e$jscomp$43) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$43 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$43);
      }
      return -e$jscomp$43.errno;
    }
  }
  function ___syscall91$jscomp$0(which$jscomp$28, varargs$jscomp$28) {
    SYSCALLS$jscomp$0.varargs = varargs$jscomp$28;
    try {
      var addr$jscomp$1 = SYSCALLS$jscomp$0.get();
      var len$jscomp$2 = SYSCALLS$jscomp$0.get();
      var info$jscomp$4 = SYSCALLS$jscomp$0.mappings[addr$jscomp$1];
      if (!info$jscomp$4) {
        return 0;
      }
      if (len$jscomp$2 === info$jscomp$4.len) {
        var stream$jscomp$16 = FS$jscomp$0.getStream(info$jscomp$4.fd);
        SYSCALLS$jscomp$0.doMsync(addr$jscomp$1, stream$jscomp$16, len$jscomp$2, info$jscomp$4.flags);
        FS$jscomp$0.munmap(stream$jscomp$16);
        SYSCALLS$jscomp$0.mappings[addr$jscomp$1] = null;
        if (info$jscomp$4.allocated) {
          _free$jscomp$0(info$jscomp$4.malloc);
        }
      }
      return 0;
    } catch (e$jscomp$44) {
      if (typeof FS$jscomp$0 === "undefined" || !(e$jscomp$44 instanceof FS$jscomp$0.ErrnoError)) {
        abort$jscomp$0(e$jscomp$44);
      }
      return -e$jscomp$44.errno;
    }
  }
  function ___unlock$jscomp$0() {
  }
  function _abort$jscomp$0() {
    Module$jscomp$0["abort"]();
  }
  function _atexit$jscomp$0(func$jscomp$11, arg$jscomp$9) {
    __ATEXIT__$jscomp$0.unshift({
      func : func$jscomp$11,
      arg : arg$jscomp$9
    });
  }
  function _clock$jscomp$0() {
    if (_clock$jscomp$0.start === undefined) {
      _clock$jscomp$0.start = Date.now();
    }
    return (Date.now() - _clock$jscomp$0.start) * (1E6 / 1E3) | 0;
  }
  function _emscripten_get_now_res$jscomp$0() {
    if (ENVIRONMENT_IS_NODE$jscomp$0) {
      return 1;
    } else {
      if (typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB$jscomp$0 || ENVIRONMENT_IS_WORKER$jscomp$0) && self["performance"] && self["performance"]["now"]) {
        return 1E3;
      } else {
        return 1E3 * 1E3;
      }
    }
  }
  function _emscripten_get_now$jscomp$0() {
    abort$jscomp$0();
  }
  function _emscripten_get_now_is_monotonic$jscomp$0() {
    return ENVIRONMENT_IS_NODE$jscomp$0 || typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB$jscomp$0 || ENVIRONMENT_IS_WORKER$jscomp$0) && self["performance"] && self["performance"]["now"];
  }
  function _clock_getres$jscomp$0(clk_id$jscomp$0, res$jscomp$1) {
    var nsec$jscomp$0;
    if (clk_id$jscomp$0 === 0) {
      nsec$jscomp$0 = 1E3 * 1E3;
    } else {
      if (clk_id$jscomp$0 === 1 && _emscripten_get_now_is_monotonic$jscomp$0()) {
        nsec$jscomp$0 = _emscripten_get_now_res$jscomp$0();
      } else {
        ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
        return -1;
      }
    }
    HEAP32$jscomp$0[res$jscomp$1 >> 2] = nsec$jscomp$0 / 1E9 | 0;
    HEAP32$jscomp$0[res$jscomp$1 + 4 >> 2] = nsec$jscomp$0;
    return 0;
  }
  function _clock_gettime$jscomp$0(clk_id$jscomp$1, tp$jscomp$0) {
    var now$jscomp$0;
    if (clk_id$jscomp$1 === 0) {
      now$jscomp$0 = Date.now();
    } else {
      if (clk_id$jscomp$1 === 1 && _emscripten_get_now_is_monotonic$jscomp$0()) {
        now$jscomp$0 = _emscripten_get_now$jscomp$0();
      } else {
        ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
        return -1;
      }
    }
    HEAP32$jscomp$0[tp$jscomp$0 >> 2] = now$jscomp$0 / 1E3 | 0;
    HEAP32$jscomp$0[tp$jscomp$0 + 4 >> 2] = now$jscomp$0 % 1E3 * 1E3 * 1E3 | 0;
    return 0;
  }
  function _difftime$jscomp$0(time1$jscomp$0, time0$jscomp$0) {
    return time1$jscomp$0 - time0$jscomp$0;
  }
  function _dlclose$jscomp$0(handle$jscomp$11) {
    if (!DLFCN$jscomp$0.loadedLibs[handle$jscomp$11]) {
      DLFCN$jscomp$0.errorMsg = "Tried to dlclose() unopened handle: " + handle$jscomp$11;
      return 1;
    } else {
      var lib_record$jscomp$0 = DLFCN$jscomp$0.loadedLibs[handle$jscomp$11];
      if (--lib_record$jscomp$0.refcount == 0) {
        if (lib_record$jscomp$0.module.cleanups) {
          lib_record$jscomp$0.module.cleanups.forEach(function(cleanup$jscomp$0) {
            cleanup$jscomp$0();
          });
        }
        delete DLFCN$jscomp$0.loadedLibNames[lib_record$jscomp$0.name];
        delete DLFCN$jscomp$0.loadedLibs[handle$jscomp$11];
      }
      return 0;
    }
  }
  function _dlopen$jscomp$0(filename$jscomp$1, flag$jscomp$1) {
    abort$jscomp$0("To use dlopen, you need to use Emscripten's linking support, see https://github.com/kripken/emscripten/wiki/Linking");
    var searchpaths$jscomp$0 = [];
    if (filename$jscomp$1 === 0) {
      filename$jscomp$1 = "__self__";
    } else {
      var strfilename$jscomp$0 = Pointer_stringify$jscomp$0(filename$jscomp$1);
      var isValidFile$jscomp$0 = function(filename$jscomp$2) {
        var target$jscomp$56 = FS$jscomp$0.findObject(filename$jscomp$2);
        return target$jscomp$56 && !target$jscomp$56.isFolder && !target$jscomp$56.isDevice;
      };
      if (isValidFile$jscomp$0(strfilename$jscomp$0)) {
        filename$jscomp$1 = strfilename$jscomp$0;
      } else {
        if (ENV$jscomp$0["LD_LIBRARY_PATH"]) {
          searchpaths$jscomp$0 = ENV$jscomp$0["LD_LIBRARY_PATH"].split(":");
        }
        var ident$jscomp$4;
        for (ident$jscomp$4 in searchpaths$jscomp$0) {
          var searchfile$jscomp$0 = PATH$jscomp$0.join2(searchpaths$jscomp$0[ident$jscomp$4], strfilename$jscomp$0);
          if (isValidFile$jscomp$0(searchfile$jscomp$0)) {
            filename$jscomp$1 = searchfile$jscomp$0;
            break;
          }
        }
      }
    }
    if (DLFCN$jscomp$0.loadedLibNames[filename$jscomp$1]) {
      var handle$jscomp$12 = DLFCN$jscomp$0.loadedLibNames[filename$jscomp$1];
      DLFCN$jscomp$0.loadedLibs[handle$jscomp$12].refcount++;
      return handle$jscomp$12;
    }
    var lib_module$jscomp$0;
    if (filename$jscomp$1 === "__self__") {
      handle$jscomp$12 = -1;
      lib_module$jscomp$0 = Module$jscomp$0;
    } else {
      if (Module$jscomp$0["preloadedWasm"] !== undefined && Module$jscomp$0["preloadedWasm"][filename$jscomp$1] !== undefined) {
        lib_module$jscomp$0 = Module$jscomp$0["preloadedWasm"][filename$jscomp$1];
      } else {
        var target$jscomp$55 = FS$jscomp$0.findObject(filename$jscomp$1);
        if (!target$jscomp$55 || target$jscomp$55.isFolder || target$jscomp$55.isDevice) {
          DLFCN$jscomp$0.errorMsg = "Could not find dynamic lib: " + filename$jscomp$1;
          return 0;
        }
        FS$jscomp$0.forceLoadFile(target$jscomp$55);
        try {
          var lib_data$jscomp$0 = FS$jscomp$0.readFile(filename$jscomp$1, {
            encoding : "binary"
          });
          if (!(lib_data$jscomp$0 instanceof Uint8Array)) {
            lib_data$jscomp$0 = new Uint8Array(lib_data$jscomp$0);
          }
          lib_module$jscomp$0 = loadWebAssemblyModule(lib_data$jscomp$0);
        } catch (e$jscomp$45) {
          DLFCN$jscomp$0.errorMsg = "Could not evaluate dynamic lib: " + filename$jscomp$1 + "\n" + e$jscomp$45;
          return 0;
        }
      }
      handle$jscomp$12 = 1;
      var key$jscomp$37;
      for (key$jscomp$37 in DLFCN$jscomp$0.loadedLibs) {
        if (DLFCN$jscomp$0.loadedLibs.hasOwnProperty(key$jscomp$37)) {
          handle$jscomp$12++;
        }
      }
      if (flag$jscomp$1 & 256) {
        for (ident$jscomp$4 in lib_module$jscomp$0) {
          if (lib_module$jscomp$0.hasOwnProperty(ident$jscomp$4)) {
            if (ident$jscomp$4[0] == "_") {
              Module$jscomp$0[ident$jscomp$4] = lib_module$jscomp$0[ident$jscomp$4];
            }
          }
        }
      }
    }
    DLFCN$jscomp$0.loadedLibs[handle$jscomp$12] = {
      refcount : 1,
      name : filename$jscomp$1,
      module : lib_module$jscomp$0
    };
    DLFCN$jscomp$0.loadedLibNames[filename$jscomp$1] = handle$jscomp$12;
    return handle$jscomp$12;
  }
  function _dlsym$jscomp$0(handle$jscomp$13, symbol$jscomp$1) {
    symbol$jscomp$1 = Pointer_stringify$jscomp$0(symbol$jscomp$1);
    if (!DLFCN$jscomp$0.loadedLibs[handle$jscomp$13]) {
      DLFCN$jscomp$0.errorMsg = "Tried to dlsym() from an unopened handle: " + handle$jscomp$13;
      return 0;
    } else {
      var lib$jscomp$0 = DLFCN$jscomp$0.loadedLibs[handle$jscomp$13];
      symbol$jscomp$1 = "_" + symbol$jscomp$1;
      if (!lib$jscomp$0.module.hasOwnProperty(symbol$jscomp$1)) {
        DLFCN$jscomp$0.errorMsg = 'Tried to lookup unknown symbol "' + symbol$jscomp$1 + '" in dynamic lib: ' + lib$jscomp$0.name;
        return 0;
      } else {
        var result$jscomp$2 = lib$jscomp$0.module[symbol$jscomp$1];
        if (typeof result$jscomp$2 === "function") {
          return addFunction$jscomp$0(result$jscomp$2);
        }
        return result$jscomp$2;
      }
    }
  }
  function _emscripten_set_main_loop_timing$jscomp$0(mode$jscomp$13, value$jscomp$89) {
    Browser$jscomp$0.mainLoop.timingMode = mode$jscomp$13;
    Browser$jscomp$0.mainLoop.timingValue = value$jscomp$89;
    if (!Browser$jscomp$0.mainLoop.func) {
      return 1;
    }
    if (mode$jscomp$13 == 0) {
      Browser$jscomp$0.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout$jscomp$0() {
        var timeUntilNextTick$jscomp$0 = Math.max(0, Browser$jscomp$0.mainLoop.tickStartTime + value$jscomp$89 - _emscripten_get_now$jscomp$0()) | 0;
        setTimeout(Browser$jscomp$0.mainLoop.runner, timeUntilNextTick$jscomp$0);
      };
      Browser$jscomp$0.mainLoop.method = "timeout";
    } else {
      if (mode$jscomp$13 == 1) {
        Browser$jscomp$0.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF$jscomp$0() {
          Browser$jscomp$0.requestAnimationFrame(Browser$jscomp$0.mainLoop.runner);
        };
        Browser$jscomp$0.mainLoop.method = "rAF";
      } else {
        if (mode$jscomp$13 == 2) {
          if (typeof setImmediate === "undefined") {
            var Browser_setImmediate_messageHandler$jscomp$0 = function(event$jscomp$0) {
              if (event$jscomp$0.data === emscriptenMainLoopMessageId$jscomp$0 || event$jscomp$0.data.target === emscriptenMainLoopMessageId$jscomp$0) {
                event$jscomp$0.stopPropagation();
                setImmediates$jscomp$0.shift()();
              }
            };
            var setImmediates$jscomp$0 = [];
            var emscriptenMainLoopMessageId$jscomp$0 = "setimmediate";
            addEventListener("message", Browser_setImmediate_messageHandler$jscomp$0, true);
            setImmediate = function Browser_emulated_setImmediate$jscomp$0(func$jscomp$12) {
              setImmediates$jscomp$0.push(func$jscomp$12);
              if (ENVIRONMENT_IS_WORKER$jscomp$0) {
                if (Module$jscomp$0["setImmediates"] === undefined) {
                  Module$jscomp$0["setImmediates"] = [];
                }
                Module$jscomp$0["setImmediates"].push(func$jscomp$12);
                postMessage({
                  target : emscriptenMainLoopMessageId$jscomp$0
                });
              } else {
                postMessage(emscriptenMainLoopMessageId$jscomp$0, "*");
              }
            };
          }
          Browser$jscomp$0.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate$jscomp$0() {
            setImmediate(Browser$jscomp$0.mainLoop.runner);
          };
          Browser$jscomp$0.mainLoop.method = "immediate";
        }
      }
    }
    return 0;
  }
  function _emscripten_set_main_loop$jscomp$0(func$jscomp$13, fps$jscomp$0, simulateInfiniteLoop$jscomp$0, arg$jscomp$10, noSetTiming$jscomp$0) {
    Module$jscomp$0["noExitRuntime"] = true;
    assert$jscomp$0(!Browser$jscomp$0.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    Browser$jscomp$0.mainLoop.func = func$jscomp$13;
    Browser$jscomp$0.mainLoop.arg = arg$jscomp$10;
    var browserIterationFunc$jscomp$0;
    if (typeof arg$jscomp$10 !== "undefined") {
      browserIterationFunc$jscomp$0 = function() {
        Module$jscomp$0["dynCall_vi"](func$jscomp$13, arg$jscomp$10);
      };
    } else {
      browserIterationFunc$jscomp$0 = function() {
        Module$jscomp$0["dynCall_v"](func$jscomp$13);
      };
    }
    var thisMainLoopId$jscomp$0 = Browser$jscomp$0.mainLoop.currentlyRunningMainloop;
    Browser$jscomp$0.mainLoop.runner = function Browser_mainLoop_runner$jscomp$0() {
      if (ABORT$jscomp$0) {
        return;
      }
      if (Browser$jscomp$0.mainLoop.queue.length > 0) {
        var start$jscomp$9 = Date.now();
        var blocker$jscomp$0 = Browser$jscomp$0.mainLoop.queue.shift();
        blocker$jscomp$0.func(blocker$jscomp$0.arg);
        if (Browser$jscomp$0.mainLoop.remainingBlockers) {
          var remaining$jscomp$0 = Browser$jscomp$0.mainLoop.remainingBlockers;
          var next$jscomp$0 = remaining$jscomp$0 % 1 == 0 ? remaining$jscomp$0 - 1 : Math.floor(remaining$jscomp$0);
          if (blocker$jscomp$0.counted) {
            Browser$jscomp$0.mainLoop.remainingBlockers = next$jscomp$0;
          } else {
            next$jscomp$0 = next$jscomp$0 + .5;
            Browser$jscomp$0.mainLoop.remainingBlockers = (8 * remaining$jscomp$0 + next$jscomp$0) / 9;
          }
        }
        console.log('main loop blocker "' + blocker$jscomp$0.name + '" took ' + (Date.now() - start$jscomp$9) + " ms");
        Browser$jscomp$0.mainLoop.updateStatus();
        if (thisMainLoopId$jscomp$0 < Browser$jscomp$0.mainLoop.currentlyRunningMainloop) {
          return;
        }
        setTimeout(Browser$jscomp$0.mainLoop.runner, 0);
        return;
      }
      if (thisMainLoopId$jscomp$0 < Browser$jscomp$0.mainLoop.currentlyRunningMainloop) {
        return;
      }
      Browser$jscomp$0.mainLoop.currentFrameNumber = Browser$jscomp$0.mainLoop.currentFrameNumber + 1 | 0;
      if (Browser$jscomp$0.mainLoop.timingMode == 1 && Browser$jscomp$0.mainLoop.timingValue > 1 && Browser$jscomp$0.mainLoop.currentFrameNumber % Browser$jscomp$0.mainLoop.timingValue != 0) {
        Browser$jscomp$0.mainLoop.scheduler();
        return;
      } else {
        if (Browser$jscomp$0.mainLoop.timingMode == 0) {
          Browser$jscomp$0.mainLoop.tickStartTime = _emscripten_get_now$jscomp$0();
        }
      }
      if (Browser$jscomp$0.mainLoop.method === "timeout" && Module$jscomp$0.ctx) {
        err$jscomp$3("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
        Browser$jscomp$0.mainLoop.method = "";
      }
      Browser$jscomp$0.mainLoop.runIter(browserIterationFunc$jscomp$0);
      if (thisMainLoopId$jscomp$0 < Browser$jscomp$0.mainLoop.currentlyRunningMainloop) {
        return;
      }
      if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) {
        SDL.audio.queueNewAudioData();
      }
      Browser$jscomp$0.mainLoop.scheduler();
    };
    if (!noSetTiming$jscomp$0) {
      if (fps$jscomp$0 && fps$jscomp$0 > 0) {
        _emscripten_set_main_loop_timing$jscomp$0(0, 1E3 / fps$jscomp$0);
      } else {
        _emscripten_set_main_loop_timing$jscomp$0(1, 1);
      }
      Browser$jscomp$0.mainLoop.scheduler();
    }
    if (simulateInfiniteLoop$jscomp$0) {
      throw "SimulateInfiniteLoop";
    }
  }
  function _emscripten_cancel_main_loop$jscomp$0() {
    Browser$jscomp$0.mainLoop.pause();
    Browser$jscomp$0.mainLoop.func = null;
  }
  function _emscripten_set_canvas_element_size$jscomp$0(target$jscomp$57, width$jscomp$12, height$jscomp$11) {
    var canvas$jscomp$1 = JSEvents$jscomp$0.findCanvasEventTarget(target$jscomp$57);
    if (!canvas$jscomp$1) {
      return -4;
    }
    canvas$jscomp$1.width = width$jscomp$12;
    canvas$jscomp$1.height = height$jscomp$11;
    return 0;
  }
  function emscripten_set_canvas_element_size_js$jscomp$0(target$jscomp$58, width$jscomp$13, height$jscomp$12) {
    if (typeof target$jscomp$58 === "string") {
      var stackTop$jscomp$0 = stackSave$jscomp$0();
      var targetInt$jscomp$0 = stackAlloc$jscomp$0(target$jscomp$58.length + 1);
      stringToUTF8$jscomp$0(target$jscomp$58, targetInt$jscomp$0, target$jscomp$58.length + 1);
      var ret$jscomp$9 = _emscripten_set_canvas_element_size$jscomp$0(targetInt$jscomp$0, width$jscomp$13, height$jscomp$12);
      stackRestore$jscomp$0(stackTop$jscomp$0);
      return ret$jscomp$9;
    } else {
      return _emscripten_set_canvas_element_size$jscomp$0(target$jscomp$58, width$jscomp$13, height$jscomp$12);
    }
  }
  function _emscripten_get_canvas_element_size_calling_thread$jscomp$0(target$jscomp$59, width$jscomp$14, height$jscomp$13) {
    var canvas$jscomp$2 = JSEvents$jscomp$0.findCanvasEventTarget(target$jscomp$59);
    if (!canvas$jscomp$2) {
      return -4;
    }
    if (canvas$jscomp$2.canvasSharedPtr) {
      var w$jscomp$7 = HEAP32$jscomp$0[canvas$jscomp$2.canvasSharedPtr >> 2];
      var h$jscomp$7 = HEAP32$jscomp$0[canvas$jscomp$2.canvasSharedPtr + 4 >> 2];
      HEAP32$jscomp$0[width$jscomp$14 >> 2] = w$jscomp$7;
      HEAP32$jscomp$0[height$jscomp$13 >> 2] = h$jscomp$7;
    } else {
      if (canvas$jscomp$2.offscreenCanvas) {
        HEAP32$jscomp$0[width$jscomp$14 >> 2] = canvas$jscomp$2.offscreenCanvas.width;
        HEAP32$jscomp$0[height$jscomp$13 >> 2] = canvas$jscomp$2.offscreenCanvas.height;
      } else {
        if (!canvas$jscomp$2.controlTransferredOffscreen) {
          HEAP32$jscomp$0[width$jscomp$14 >> 2] = canvas$jscomp$2.width;
          HEAP32$jscomp$0[height$jscomp$13 >> 2] = canvas$jscomp$2.height;
        } else {
          return -4;
        }
      }
    }
    return 0;
  }
  function _emscripten_get_canvas_element_size_main_thread$jscomp$0(target$jscomp$60, width$jscomp$15, height$jscomp$14) {
    return _emscripten_get_canvas_element_size_calling_thread$jscomp$0(target$jscomp$60, width$jscomp$15, height$jscomp$14);
  }
  function _emscripten_get_canvas_element_size$jscomp$0(target$jscomp$61, width$jscomp$16, height$jscomp$15) {
    var canvas$jscomp$3 = JSEvents$jscomp$0.findCanvasEventTarget(target$jscomp$61);
    if (canvas$jscomp$3) {
      return _emscripten_get_canvas_element_size_calling_thread$jscomp$0(target$jscomp$61, width$jscomp$16, height$jscomp$15);
    } else {
      return _emscripten_get_canvas_element_size_main_thread$jscomp$0(target$jscomp$61, width$jscomp$16, height$jscomp$15);
    }
  }
  function emscripten_get_canvas_element_size_js$jscomp$0(target$jscomp$62) {
    var stackTop$jscomp$1 = stackSave$jscomp$0();
    var w$jscomp$8 = stackAlloc$jscomp$0(8);
    var h$jscomp$8 = w$jscomp$8 + 4;
    if (typeof target$jscomp$62 === "string") {
      var targetInt$jscomp$1 = stackAlloc$jscomp$0(target$jscomp$62.length + 1);
      stringToUTF8$jscomp$0(target$jscomp$62, targetInt$jscomp$1, target$jscomp$62.length + 1);
      target$jscomp$62 = targetInt$jscomp$1;
    }
    var ret$jscomp$10 = _emscripten_get_canvas_element_size$jscomp$0(target$jscomp$62, w$jscomp$8, h$jscomp$8);
    var size$jscomp$25 = [HEAP32$jscomp$0[w$jscomp$8 >> 2], HEAP32$jscomp$0[h$jscomp$8 >> 2]];
    stackRestore$jscomp$0(stackTop$jscomp$1);
    return size$jscomp$25;
  }
  function _emscripten_exit_fullscreen$jscomp$0() {
    if (typeof JSEvents$jscomp$0.fullscreenEnabled() === "undefined") {
      return -1;
    }
    JSEvents$jscomp$0.removeDeferredCalls(JSEvents$jscomp$0.requestFullscreen);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else {
            return -1;
          }
        }
      }
    }
    if (__currentFullscreenStrategy$jscomp$0.canvasResizedCallback) {
      Module$jscomp$0["dynCall_iiii"](__currentFullscreenStrategy$jscomp$0.canvasResizedCallback, 37, 0, __currentFullscreenStrategy$jscomp$0.canvasResizedCallbackUserData);
    }
    return 0;
  }
  function _emscripten_exit_pointerlock$jscomp$0() {
    JSEvents$jscomp$0.removeDeferredCalls(JSEvents$jscomp$0.requestPointerLock);
    if (document.exitPointerLock) {
      document.exitPointerLock();
    } else {
      if (document.msExitPointerLock) {
        document.msExitPointerLock();
      } else {
        if (document.mozExitPointerLock) {
          document.mozExitPointerLock();
        } else {
          if (document.webkitExitPointerLock) {
            document.webkitExitPointerLock();
          } else {
            return -1;
          }
        }
      }
    }
    return 0;
  }
  function _emscripten_get_fullscreen_status$jscomp$0(fullscreenStatus$jscomp$0) {
    if (typeof JSEvents$jscomp$0.fullscreenEnabled() === "undefined") {
      return -1;
    }
    JSEvents$jscomp$0.fillFullscreenChangeEventData(fullscreenStatus$jscomp$0);
    return 0;
  }
  function __emscripten_sample_gamepad_data$jscomp$0() {
    if (!JSEvents$jscomp$0.numGamepadsConnected) {
      return;
    }
    if (Browser$jscomp$0.mainLoop.currentFrameNumber !== JSEvents$jscomp$0.lastGamepadStateFrame || !Browser$jscomp$0.mainLoop.currentFrameNumber) {
      JSEvents$jscomp$0.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : null;
      JSEvents$jscomp$0.lastGamepadStateFrame = Browser$jscomp$0.mainLoop.currentFrameNumber;
    }
  }
  function _emscripten_get_gamepad_status$jscomp$0(index$jscomp$54, gamepadState$jscomp$0) {
    __emscripten_sample_gamepad_data$jscomp$0();
    if (!JSEvents$jscomp$0.lastGamepadState) {
      return -1;
    }
    if (index$jscomp$54 < 0 || index$jscomp$54 >= JSEvents$jscomp$0.lastGamepadState.length) {
      return -5;
    }
    if (!JSEvents$jscomp$0.lastGamepadState[index$jscomp$54]) {
      return -7;
    }
    JSEvents$jscomp$0.fillGamepadEventData(gamepadState$jscomp$0, JSEvents$jscomp$0.lastGamepadState[index$jscomp$54]);
    return 0;
  }
  function _emscripten_get_main_loop_timing$jscomp$0(mode$jscomp$14, value$jscomp$90) {
    if (mode$jscomp$14) {
      HEAP32$jscomp$0[mode$jscomp$14 >> 2] = Browser$jscomp$0.mainLoop.timingMode;
    }
    if (value$jscomp$90) {
      HEAP32$jscomp$0[value$jscomp$90 >> 2] = Browser$jscomp$0.mainLoop.timingValue;
    }
  }
  function _emscripten_get_num_gamepads$jscomp$0() {
    if (!JSEvents$jscomp$0.numGamepadsConnected) {
      return 0;
    }
    __emscripten_sample_gamepad_data$jscomp$0();
    if (!JSEvents$jscomp$0.lastGamepadState) {
      return -1;
    }
    return JSEvents$jscomp$0.lastGamepadState.length;
  }
  function _emscripten_has_threading_support$jscomp$0() {
    return 0;
  }
  function _emscripten_html5_remove_all_event_listeners$jscomp$0() {
    JSEvents$jscomp$0.removeAllEventListeners();
  }
  function _emscripten_is_webgl_context_lost$jscomp$0(target$jscomp$63) {
    if (!Module$jscomp$0.ctx) {
      return true;
    }
    return Module$jscomp$0.ctx.isContextLost();
  }
  function __reallyNegative$jscomp$0(x$jscomp$79) {
    return x$jscomp$79 < 0 || x$jscomp$79 === 0 && 1 / x$jscomp$79 === -Infinity;
  }
  function __formatString$jscomp$0(format$jscomp$11, varargs$jscomp$29) {
    function prepVararg$jscomp$0(ptr$jscomp$19, type$jscomp$120) {
      if (type$jscomp$120 === "double" || type$jscomp$120 === "i64") {
        if (ptr$jscomp$19 & 7) {
          assert$jscomp$0((ptr$jscomp$19 & 7) === 4);
          ptr$jscomp$19 = ptr$jscomp$19 + 4;
        }
      } else {
        assert$jscomp$0((ptr$jscomp$19 & 3) === 0);
      }
      return ptr$jscomp$19;
    }
    function getNextArg$jscomp$0(type$jscomp$121) {
      var ret$jscomp$12;
      argIndex$jscomp$0 = prepVararg$jscomp$0(argIndex$jscomp$0, type$jscomp$121);
      if (type$jscomp$121 === "double") {
        ret$jscomp$12 = HEAPF64$jscomp$0[argIndex$jscomp$0 >> 3];
        argIndex$jscomp$0 = argIndex$jscomp$0 + 8;
      } else {
        if (type$jscomp$121 == "i64") {
          ret$jscomp$12 = [HEAP32$jscomp$0[argIndex$jscomp$0 >> 2], HEAP32$jscomp$0[argIndex$jscomp$0 + 4 >> 2]];
          argIndex$jscomp$0 = argIndex$jscomp$0 + 8;
        } else {
          assert$jscomp$0((argIndex$jscomp$0 & 3) === 0);
          type$jscomp$121 = "i32";
          ret$jscomp$12 = HEAP32$jscomp$0[argIndex$jscomp$0 >> 2];
          argIndex$jscomp$0 = argIndex$jscomp$0 + 4;
        }
      }
      return ret$jscomp$12;
    }
    assert$jscomp$0((varargs$jscomp$29 & 3) === 0);
    var textIndex$jscomp$0 = format$jscomp$11;
    var argIndex$jscomp$0 = varargs$jscomp$29;
    var ret$jscomp$11 = [];
    var curr$jscomp$2;
    var next$jscomp$1;
    var currArg$jscomp$0;
    for (; 1;) {
      var startTextIndex$jscomp$0 = textIndex$jscomp$0;
      curr$jscomp$2 = HEAP8$jscomp$0[textIndex$jscomp$0 >> 0];
      if (curr$jscomp$2 === 0) {
        break;
      }
      next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
      if (curr$jscomp$2 == 37) {
        var flagAlwaysSigned$jscomp$0 = false;
        var flagLeftAlign$jscomp$0 = false;
        var flagAlternative$jscomp$0 = false;
        var flagZeroPad$jscomp$0 = false;
        var flagPadSign$jscomp$0 = false;
        flagsLoop: for (; 1;) {
          switch(next$jscomp$1) {
            case 43:
              flagAlwaysSigned$jscomp$0 = true;
              break;
            case 45:
              flagLeftAlign$jscomp$0 = true;
              break;
            case 35:
              flagAlternative$jscomp$0 = true;
              break;
            case 48:
              if (flagZeroPad$jscomp$0) {
                break flagsLoop;
              } else {
                flagZeroPad$jscomp$0 = true;
                break;
              }
            case 32:
              flagPadSign$jscomp$0 = true;
              break;
            default:
              break flagsLoop;
          }
          textIndex$jscomp$0++;
          next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
        }
        var width$jscomp$17 = 0;
        if (next$jscomp$1 == 42) {
          width$jscomp$17 = getNextArg$jscomp$0("i32");
          textIndex$jscomp$0++;
          next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
        } else {
          for (; next$jscomp$1 >= 48 && next$jscomp$1 <= 57;) {
            width$jscomp$17 = width$jscomp$17 * 10 + (next$jscomp$1 - 48);
            textIndex$jscomp$0++;
            next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
          }
        }
        var precisionSet$jscomp$0 = false;
        var precision$jscomp$0 = -1;
        if (next$jscomp$1 == 46) {
          precision$jscomp$0 = 0;
          precisionSet$jscomp$0 = true;
          textIndex$jscomp$0++;
          next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
          if (next$jscomp$1 == 42) {
            precision$jscomp$0 = getNextArg$jscomp$0("i32");
            textIndex$jscomp$0++;
          } else {
            for (; 1;) {
              var precisionChr$jscomp$0 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
              if (precisionChr$jscomp$0 < 48 || precisionChr$jscomp$0 > 57) {
                break;
              }
              precision$jscomp$0 = precision$jscomp$0 * 10 + (precisionChr$jscomp$0 - 48);
              textIndex$jscomp$0++;
            }
          }
          next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
        }
        if (precision$jscomp$0 < 0) {
          precision$jscomp$0 = 6;
          precisionSet$jscomp$0 = false;
        }
        var argSize$jscomp$0;
        switch(String.fromCharCode(next$jscomp$1)) {
          case "h":
            var nextNext$jscomp$0 = HEAP8$jscomp$0[textIndex$jscomp$0 + 2 >> 0];
            if (nextNext$jscomp$0 == 104) {
              textIndex$jscomp$0++;
              argSize$jscomp$0 = 1;
            } else {
              argSize$jscomp$0 = 2;
            }
            break;
          case "l":
            nextNext$jscomp$0 = HEAP8$jscomp$0[textIndex$jscomp$0 + 2 >> 0];
            if (nextNext$jscomp$0 == 108) {
              textIndex$jscomp$0++;
              argSize$jscomp$0 = 8;
            } else {
              argSize$jscomp$0 = 4;
            }
            break;
          case "L":
          case "q":
          case "j":
            argSize$jscomp$0 = 8;
            break;
          case "z":
          case "t":
          case "I":
            argSize$jscomp$0 = 4;
            break;
          default:
            argSize$jscomp$0 = null;
        }
        if (argSize$jscomp$0) {
          textIndex$jscomp$0++;
        }
        next$jscomp$1 = HEAP8$jscomp$0[textIndex$jscomp$0 + 1 >> 0];
        switch(String.fromCharCode(next$jscomp$1)) {
          case "d":
          case "i":
          case "u":
          case "o":
          case "x":
          case "X":
          case "p":
            {
              var signed$jscomp$0 = next$jscomp$1 == 100 || next$jscomp$1 == 105;
              argSize$jscomp$0 = argSize$jscomp$0 || 4;
              currArg$jscomp$0 = getNextArg$jscomp$0("i" + argSize$jscomp$0 * 8);
              var origArg$jscomp$0 = currArg$jscomp$0;
              var argText$jscomp$0;
              if (argSize$jscomp$0 == 8) {
                currArg$jscomp$0 = makeBigInt$jscomp$0(currArg$jscomp$0[0], currArg$jscomp$0[1], next$jscomp$1 == 117);
              }
              if (argSize$jscomp$0 <= 4) {
                var limit$jscomp$0 = Math.pow(256, argSize$jscomp$0) - 1;
                currArg$jscomp$0 = (signed$jscomp$0 ? reSign$jscomp$0 : unSign$jscomp$0)(currArg$jscomp$0 & limit$jscomp$0, argSize$jscomp$0 * 8);
              }
              var currAbsArg$jscomp$0 = Math.abs(currArg$jscomp$0);
              var prefix$jscomp$2 = "";
              if (next$jscomp$1 == 100 || next$jscomp$1 == 105) {
                if (argSize$jscomp$0 == 8 && typeof i64Math === "object") {
                  argText$jscomp$0 = i64Math.stringify(origArg$jscomp$0[0], origArg$jscomp$0[1], null);
                } else {
                  argText$jscomp$0 = reSign$jscomp$0(currArg$jscomp$0, 8 * argSize$jscomp$0, 1).toString(10);
                }
              } else {
                if (next$jscomp$1 == 117) {
                  if (argSize$jscomp$0 == 8 && typeof i64Math === "object") {
                    argText$jscomp$0 = i64Math.stringify(origArg$jscomp$0[0], origArg$jscomp$0[1], true);
                  } else {
                    argText$jscomp$0 = unSign$jscomp$0(currArg$jscomp$0, 8 * argSize$jscomp$0, 1).toString(10);
                  }
                  currArg$jscomp$0 = Math.abs(currArg$jscomp$0);
                } else {
                  if (next$jscomp$1 == 111) {
                    argText$jscomp$0 = (flagAlternative$jscomp$0 ? "0" : "") + currAbsArg$jscomp$0.toString(8);
                  } else {
                    if (next$jscomp$1 == 120 || next$jscomp$1 == 88) {
                      prefix$jscomp$2 = flagAlternative$jscomp$0 && currArg$jscomp$0 != 0 ? "0x" : "";
                      if (argSize$jscomp$0 == 8 && typeof i64Math === "object") {
                        if (origArg$jscomp$0[1]) {
                          argText$jscomp$0 = (origArg$jscomp$0[1] >>> 0).toString(16);
                          var lower$jscomp$0 = (origArg$jscomp$0[0] >>> 0).toString(16);
                          for (; lower$jscomp$0.length < 8;) {
                            lower$jscomp$0 = "0" + lower$jscomp$0;
                          }
                          argText$jscomp$0 = argText$jscomp$0 + lower$jscomp$0;
                        } else {
                          argText$jscomp$0 = (origArg$jscomp$0[0] >>> 0).toString(16);
                        }
                      } else {
                        if (currArg$jscomp$0 < 0) {
                          currArg$jscomp$0 = -currArg$jscomp$0;
                          argText$jscomp$0 = (currAbsArg$jscomp$0 - 1).toString(16);
                          var buffer$jscomp$19 = [];
                          var i$jscomp$14 = 0;
                          for (; i$jscomp$14 < argText$jscomp$0.length; i$jscomp$14++) {
                            buffer$jscomp$19.push((15 - parseInt(argText$jscomp$0[i$jscomp$14], 16)).toString(16));
                          }
                          argText$jscomp$0 = buffer$jscomp$19.join("");
                          for (; argText$jscomp$0.length < argSize$jscomp$0 * 2;) {
                            argText$jscomp$0 = "f" + argText$jscomp$0;
                          }
                        } else {
                          argText$jscomp$0 = currAbsArg$jscomp$0.toString(16);
                        }
                      }
                      if (next$jscomp$1 == 88) {
                        prefix$jscomp$2 = prefix$jscomp$2.toUpperCase();
                        argText$jscomp$0 = argText$jscomp$0.toUpperCase();
                      }
                    } else {
                      if (next$jscomp$1 == 112) {
                        if (currAbsArg$jscomp$0 === 0) {
                          argText$jscomp$0 = "(nil)";
                        } else {
                          prefix$jscomp$2 = "0x";
                          argText$jscomp$0 = currAbsArg$jscomp$0.toString(16);
                        }
                      }
                    }
                  }
                }
              }
              if (precisionSet$jscomp$0) {
                for (; argText$jscomp$0.length < precision$jscomp$0;) {
                  argText$jscomp$0 = "0" + argText$jscomp$0;
                }
              }
              if (currArg$jscomp$0 >= 0) {
                if (flagAlwaysSigned$jscomp$0) {
                  prefix$jscomp$2 = "+" + prefix$jscomp$2;
                } else {
                  if (flagPadSign$jscomp$0) {
                    prefix$jscomp$2 = " " + prefix$jscomp$2;
                  }
                }
              }
              if (argText$jscomp$0.charAt(0) == "-") {
                prefix$jscomp$2 = "-" + prefix$jscomp$2;
                argText$jscomp$0 = argText$jscomp$0.substr(1);
              }
              for (; prefix$jscomp$2.length + argText$jscomp$0.length < width$jscomp$17;) {
                if (flagLeftAlign$jscomp$0) {
                  argText$jscomp$0 = argText$jscomp$0 + " ";
                } else {
                  if (flagZeroPad$jscomp$0) {
                    argText$jscomp$0 = "0" + argText$jscomp$0;
                  } else {
                    prefix$jscomp$2 = " " + prefix$jscomp$2;
                  }
                }
              }
              argText$jscomp$0 = prefix$jscomp$2 + argText$jscomp$0;
              argText$jscomp$0.split("").forEach(function(chr$jscomp$0) {
                ret$jscomp$11.push(chr$jscomp$0.charCodeAt(0));
              });
              break;
            }
          case "f":
          case "F":
          case "e":
          case "E":
          case "g":
          case "G":
            {
              currArg$jscomp$0 = getNextArg$jscomp$0("double");
              if (isNaN(currArg$jscomp$0)) {
                argText$jscomp$0 = "nan";
                flagZeroPad$jscomp$0 = false;
              } else {
                if (!isFinite(currArg$jscomp$0)) {
                  argText$jscomp$0 = (currArg$jscomp$0 < 0 ? "-" : "") + "inf";
                  flagZeroPad$jscomp$0 = false;
                } else {
                  var isGeneral$jscomp$0 = false;
                  var effectivePrecision$jscomp$0 = Math.min(precision$jscomp$0, 20);
                  if (next$jscomp$1 == 103 || next$jscomp$1 == 71) {
                    isGeneral$jscomp$0 = true;
                    precision$jscomp$0 = precision$jscomp$0 || 1;
                    var exponent$jscomp$0 = parseInt(currArg$jscomp$0.toExponential(effectivePrecision$jscomp$0).split("e")[1], 10);
                    if (precision$jscomp$0 > exponent$jscomp$0 && exponent$jscomp$0 >= -4) {
                      next$jscomp$1 = (next$jscomp$1 == 103 ? "f" : "F").charCodeAt(0);
                      precision$jscomp$0 = precision$jscomp$0 - (exponent$jscomp$0 + 1);
                    } else {
                      next$jscomp$1 = (next$jscomp$1 == 103 ? "e" : "E").charCodeAt(0);
                      precision$jscomp$0--;
                    }
                    effectivePrecision$jscomp$0 = Math.min(precision$jscomp$0, 20);
                  }
                  if (next$jscomp$1 == 101 || next$jscomp$1 == 69) {
                    argText$jscomp$0 = currArg$jscomp$0.toExponential(effectivePrecision$jscomp$0);
                    if (/[eE][-+]\d$/.test(argText$jscomp$0)) {
                      argText$jscomp$0 = argText$jscomp$0.slice(0, -1) + "0" + argText$jscomp$0.slice(-1);
                    }
                  } else {
                    if (next$jscomp$1 == 102 || next$jscomp$1 == 70) {
                      argText$jscomp$0 = currArg$jscomp$0.toFixed(effectivePrecision$jscomp$0);
                      if (currArg$jscomp$0 === 0 && __reallyNegative$jscomp$0(currArg$jscomp$0)) {
                        argText$jscomp$0 = "-" + argText$jscomp$0;
                      }
                    }
                  }
                  var parts$jscomp$0 = argText$jscomp$0.split("e");
                  if (isGeneral$jscomp$0 && !flagAlternative$jscomp$0) {
                    for (; parts$jscomp$0[0].length > 1 && parts$jscomp$0[0].indexOf(".") != -1 && (parts$jscomp$0[0].slice(-1) == "0" || parts$jscomp$0[0].slice(-1) == ".");) {
                      parts$jscomp$0[0] = parts$jscomp$0[0].slice(0, -1);
                    }
                  } else {
                    if (flagAlternative$jscomp$0 && argText$jscomp$0.indexOf(".") == -1) {
                      parts$jscomp$0[0] += ".";
                    }
                    for (; precision$jscomp$0 > effectivePrecision$jscomp$0++;) {
                      parts$jscomp$0[0] += "0";
                    }
                  }
                  argText$jscomp$0 = parts$jscomp$0[0] + (parts$jscomp$0.length > 1 ? "e" + parts$jscomp$0[1] : "");
                  if (next$jscomp$1 == 69) {
                    argText$jscomp$0 = argText$jscomp$0.toUpperCase();
                  }
                  if (currArg$jscomp$0 >= 0) {
                    if (flagAlwaysSigned$jscomp$0) {
                      argText$jscomp$0 = "+" + argText$jscomp$0;
                    } else {
                      if (flagPadSign$jscomp$0) {
                        argText$jscomp$0 = " " + argText$jscomp$0;
                      }
                    }
                  }
                }
              }
              for (; argText$jscomp$0.length < width$jscomp$17;) {
                if (flagLeftAlign$jscomp$0) {
                  argText$jscomp$0 = argText$jscomp$0 + " ";
                } else {
                  if (flagZeroPad$jscomp$0 && (argText$jscomp$0[0] == "-" || argText$jscomp$0[0] == "+")) {
                    argText$jscomp$0 = argText$jscomp$0[0] + "0" + argText$jscomp$0.slice(1);
                  } else {
                    argText$jscomp$0 = (flagZeroPad$jscomp$0 ? "0" : " ") + argText$jscomp$0;
                  }
                }
              }
              if (next$jscomp$1 < 97) {
                argText$jscomp$0 = argText$jscomp$0.toUpperCase();
              }
              argText$jscomp$0.split("").forEach(function(chr$jscomp$1) {
                ret$jscomp$11.push(chr$jscomp$1.charCodeAt(0));
              });
              break;
            }
          case "s":
            {
              var arg$jscomp$11 = getNextArg$jscomp$0("i8*");
              var argLength$jscomp$0 = arg$jscomp$11 ? _strlen$jscomp$0(arg$jscomp$11) : "(null)".length;
              if (precisionSet$jscomp$0) {
                argLength$jscomp$0 = Math.min(argLength$jscomp$0, precision$jscomp$0);
              }
              if (!flagLeftAlign$jscomp$0) {
                for (; argLength$jscomp$0 < width$jscomp$17--;) {
                  ret$jscomp$11.push(32);
                }
              }
              if (arg$jscomp$11) {
                i$jscomp$14 = 0;
                for (; i$jscomp$14 < argLength$jscomp$0; i$jscomp$14++) {
                  ret$jscomp$11.push(HEAPU8$jscomp$0[arg$jscomp$11++ >> 0]);
                }
              } else {
                ret$jscomp$11 = ret$jscomp$11.concat(intArrayFromString$jscomp$0("(null)".substr(0, argLength$jscomp$0), true));
              }
              if (flagLeftAlign$jscomp$0) {
                for (; argLength$jscomp$0 < width$jscomp$17--;) {
                  ret$jscomp$11.push(32);
                }
              }
              break;
            }
          case "c":
            {
              if (flagLeftAlign$jscomp$0) {
                ret$jscomp$11.push(getNextArg$jscomp$0("i8"));
              }
              for (; --width$jscomp$17 > 0;) {
                ret$jscomp$11.push(32);
              }
              if (!flagLeftAlign$jscomp$0) {
                ret$jscomp$11.push(getNextArg$jscomp$0("i8"));
              }
              break;
            }
          case "n":
            {
              var ptr$jscomp$18 = getNextArg$jscomp$0("i32*");
              HEAP32$jscomp$0[ptr$jscomp$18 >> 2] = ret$jscomp$11.length;
              break;
            }
          case "%":
            {
              ret$jscomp$11.push(curr$jscomp$2);
              break;
            }
          default:
            {
              i$jscomp$14 = startTextIndex$jscomp$0;
              for (; i$jscomp$14 < textIndex$jscomp$0 + 2; i$jscomp$14++) {
                ret$jscomp$11.push(HEAP8$jscomp$0[i$jscomp$14 >> 0]);
              }
            }
        }
        textIndex$jscomp$0 = textIndex$jscomp$0 + 2;
      } else {
        ret$jscomp$11.push(curr$jscomp$2);
        textIndex$jscomp$0 = textIndex$jscomp$0 + 1;
      }
    }
    return ret$jscomp$11;
  }
  function __emscripten_traverse_stack$jscomp$0(args$jscomp$2) {
    if (!args$jscomp$2 || !args$jscomp$2.callee || !args$jscomp$2.callee.name) {
      return [null, "", ""];
    }
    var funstr$jscomp$0 = args$jscomp$2.callee.toString();
    var funcname$jscomp$0 = args$jscomp$2.callee.name;
    var str$jscomp$14 = "(";
    var first$jscomp$3 = true;
    var i$jscomp$15;
    for (i$jscomp$15 in args$jscomp$2) {
      var a$jscomp$0 = args$jscomp$2[i$jscomp$15];
      if (!first$jscomp$3) {
        str$jscomp$14 = str$jscomp$14 + ", ";
      }
      first$jscomp$3 = false;
      if (typeof a$jscomp$0 === "number" || typeof a$jscomp$0 === "string") {
        str$jscomp$14 = str$jscomp$14 + a$jscomp$0;
      } else {
        str$jscomp$14 = str$jscomp$14 + ("(" + typeof a$jscomp$0 + ")");
      }
    }
    str$jscomp$14 = str$jscomp$14 + ")";
    var caller$jscomp$0 = args$jscomp$2.callee.caller;
    args$jscomp$2 = caller$jscomp$0 ? caller$jscomp$0.arguments : [];
    if (first$jscomp$3) {
      str$jscomp$14 = "";
    }
    return [args$jscomp$2, funcname$jscomp$0, str$jscomp$14];
  }
  function _emscripten_get_callstack_js$jscomp$0(flags$jscomp$4) {
    var callstack$jscomp$0 = jsStackTrace$jscomp$0();
    var iThisFunc$jscomp$0 = callstack$jscomp$0.lastIndexOf("_emscripten_log");
    var iThisFunc2$jscomp$0 = callstack$jscomp$0.lastIndexOf("_emscripten_get_callstack");
    var iNextLine$jscomp$0 = callstack$jscomp$0.indexOf("\n", Math.max(iThisFunc$jscomp$0, iThisFunc2$jscomp$0)) + 1;
    callstack$jscomp$0 = callstack$jscomp$0.slice(iNextLine$jscomp$0);
    if (flags$jscomp$4 & 8 && typeof emscripten_source_map === "undefined") {
      warnOnce$jscomp$0('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');
      flags$jscomp$4 = flags$jscomp$4 ^ 8;
      flags$jscomp$4 = flags$jscomp$4 | 16;
    }
    var stack_args$jscomp$0 = null;
    if (flags$jscomp$4 & 128) {
      stack_args$jscomp$0 = __emscripten_traverse_stack$jscomp$0(arguments);
      for (; stack_args$jscomp$0[1].indexOf("_emscripten_") >= 0;) {
        stack_args$jscomp$0 = __emscripten_traverse_stack$jscomp$0(stack_args$jscomp$0[0]);
      }
    }
    var lines$jscomp$0 = callstack$jscomp$0.split("\n");
    callstack$jscomp$0 = "";
    var newFirefoxRe$jscomp$0 = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");
    var firefoxRe$jscomp$0 = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");
    var chromeRe$jscomp$0 = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
    var l$jscomp$1;
    for (l$jscomp$1 in lines$jscomp$0) {
      var line$jscomp$1 = lines$jscomp$0[l$jscomp$1];
      var jsSymbolName$jscomp$0 = "";
      var file$jscomp$0 = "";
      var lineno$jscomp$0 = 0;
      var column$jscomp$0 = 0;
      var parts$jscomp$1 = chromeRe$jscomp$0.exec(line$jscomp$1);
      if (parts$jscomp$1 && parts$jscomp$1.length == 5) {
        jsSymbolName$jscomp$0 = parts$jscomp$1[1];
        file$jscomp$0 = parts$jscomp$1[2];
        lineno$jscomp$0 = parts$jscomp$1[3];
        column$jscomp$0 = parts$jscomp$1[4];
      } else {
        parts$jscomp$1 = newFirefoxRe$jscomp$0.exec(line$jscomp$1);
        if (!parts$jscomp$1) {
          parts$jscomp$1 = firefoxRe$jscomp$0.exec(line$jscomp$1);
        }
        if (parts$jscomp$1 && parts$jscomp$1.length >= 4) {
          jsSymbolName$jscomp$0 = parts$jscomp$1[1];
          file$jscomp$0 = parts$jscomp$1[2];
          lineno$jscomp$0 = parts$jscomp$1[3];
          column$jscomp$0 = parts$jscomp$1[4] | 0;
        } else {
          callstack$jscomp$0 = callstack$jscomp$0 + (line$jscomp$1 + "\n");
          continue;
        }
      }
      var cSymbolName$jscomp$0 = flags$jscomp$4 & 32 ? demangle$jscomp$0(jsSymbolName$jscomp$0) : jsSymbolName$jscomp$0;
      if (!cSymbolName$jscomp$0) {
        cSymbolName$jscomp$0 = jsSymbolName$jscomp$0;
      }
      var haveSourceMap$jscomp$0 = false;
      if (flags$jscomp$4 & 8) {
        var orig$jscomp$0 = emscripten_source_map.originalPositionFor({
          line : lineno$jscomp$0,
          column : column$jscomp$0
        });
        haveSourceMap$jscomp$0 = orig$jscomp$0 && orig$jscomp$0.source;
        if (haveSourceMap$jscomp$0) {
          if (flags$jscomp$4 & 64) {
            orig$jscomp$0.source = orig$jscomp$0.source.substring(orig$jscomp$0.source.replace(/\\/g, "/").lastIndexOf("/") + 1);
          }
          callstack$jscomp$0 = callstack$jscomp$0 + ("    at " + cSymbolName$jscomp$0 + " (" + orig$jscomp$0.source + ":" + orig$jscomp$0.line + ":" + orig$jscomp$0.column + ")\n");
        }
      }
      if (flags$jscomp$4 & 16 || !haveSourceMap$jscomp$0) {
        if (flags$jscomp$4 & 64) {
          file$jscomp$0 = file$jscomp$0.substring(file$jscomp$0.replace(/\\/g, "/").lastIndexOf("/") + 1);
        }
        callstack$jscomp$0 = callstack$jscomp$0 + ((haveSourceMap$jscomp$0 ? "     = " + jsSymbolName$jscomp$0 : "    at " + cSymbolName$jscomp$0) + " (" + file$jscomp$0 + ":" + lineno$jscomp$0 + ":" + column$jscomp$0 + ")\n");
      }
      if (flags$jscomp$4 & 128 && stack_args$jscomp$0[0]) {
        if (stack_args$jscomp$0[1] == jsSymbolName$jscomp$0 && stack_args$jscomp$0[2].length > 0) {
          callstack$jscomp$0 = callstack$jscomp$0.replace(/\s+$/, "");
          callstack$jscomp$0 = callstack$jscomp$0 + (" with values: " + stack_args$jscomp$0[1] + stack_args$jscomp$0[2] + "\n");
        }
        stack_args$jscomp$0 = __emscripten_traverse_stack$jscomp$0(stack_args$jscomp$0[0]);
      }
    }
    callstack$jscomp$0 = callstack$jscomp$0.replace(/\s+$/, "");
    return callstack$jscomp$0;
  }
  function _emscripten_log_js$jscomp$0(flags$jscomp$5, str$jscomp$15) {
    if (flags$jscomp$5 & 24) {
      str$jscomp$15 = str$jscomp$15.replace(/\s+$/, "");
      str$jscomp$15 = str$jscomp$15 + ((str$jscomp$15.length > 0 ? "\n" : "") + _emscripten_get_callstack_js$jscomp$0(flags$jscomp$5));
    }
    if (flags$jscomp$5 & 1) {
      if (flags$jscomp$5 & 4) {
        console.error(str$jscomp$15);
      } else {
        if (flags$jscomp$5 & 2) {
          console.warn(str$jscomp$15);
        } else {
          console.log(str$jscomp$15);
        }
      }
    } else {
      if (flags$jscomp$5 & 6) {
        err$jscomp$3(str$jscomp$15);
      } else {
        out$jscomp$0(str$jscomp$15);
      }
    }
  }
  function _emscripten_log$jscomp$0(flags$jscomp$6, varargs$jscomp$30) {
    var format$jscomp$12 = HEAP32$jscomp$0[varargs$jscomp$30 >> 2];
    varargs$jscomp$30 = varargs$jscomp$30 + 4;
    var str$jscomp$16 = "";
    if (format$jscomp$12) {
      var result$jscomp$3 = __formatString$jscomp$0(format$jscomp$12, varargs$jscomp$30);
      var i$jscomp$16 = 0;
      for (; i$jscomp$16 < result$jscomp$3.length; ++i$jscomp$16) {
        str$jscomp$16 = str$jscomp$16 + String.fromCharCode(result$jscomp$3[i$jscomp$16]);
      }
    }
    _emscripten_log_js$jscomp$0(flags$jscomp$6, str$jscomp$16);
  }
  function _emscripten_num_logical_cores$jscomp$0() {
    return 1;
  }
  function __setLetterbox$jscomp$0(element$jscomp$8, topBottom$jscomp$0, leftRight$jscomp$0) {
    if (JSEvents$jscomp$0.isInternetExplorer()) {
      element$jscomp$8.style.marginLeft = element$jscomp$8.style.marginRight = leftRight$jscomp$0 + "px";
      element$jscomp$8.style.marginTop = element$jscomp$8.style.marginBottom = topBottom$jscomp$0 + "px";
    } else {
      element$jscomp$8.style.paddingLeft = element$jscomp$8.style.paddingRight = leftRight$jscomp$0 + "px";
      element$jscomp$8.style.paddingTop = element$jscomp$8.style.paddingBottom = topBottom$jscomp$0 + "px";
    }
  }
  function __emscripten_do_request_fullscreen$jscomp$0(target$jscomp$64, strategy$jscomp$0) {
    if (typeof JSEvents$jscomp$0.fullscreenEnabled() === "undefined") {
      return -1;
    }
    if (!JSEvents$jscomp$0.fullscreenEnabled()) {
      return -3;
    }
    if (!target$jscomp$64) {
      target$jscomp$64 = "#canvas";
    }
    target$jscomp$64 = JSEvents$jscomp$0.findEventTarget(target$jscomp$64);
    if (!target$jscomp$64) {
      return -4;
    }
    if (!target$jscomp$64.requestFullscreen && !target$jscomp$64.msRequestFullscreen && !target$jscomp$64.mozRequestFullScreen && !target$jscomp$64.mozRequestFullscreen && !target$jscomp$64.webkitRequestFullscreen) {
      return -3;
    }
    var canPerformRequests$jscomp$0 = JSEvents$jscomp$0.canPerformEventHandlerRequests();
    if (!canPerformRequests$jscomp$0) {
      if (strategy$jscomp$0.deferUntilInEventHandler) {
        JSEvents$jscomp$0.deferCall(JSEvents$jscomp$0.requestFullscreen, 1, [target$jscomp$64, strategy$jscomp$0]);
        return 1;
      } else {
        return -2;
      }
    }
    return JSEvents$jscomp$0.requestFullscreen(target$jscomp$64, strategy$jscomp$0);
  }
  function _emscripten_request_fullscreen$jscomp$0(target$jscomp$65, deferUntilInEventHandler$jscomp$0) {
    var strategy$jscomp$1 = {};
    strategy$jscomp$1.scaleMode = 0;
    strategy$jscomp$1.canvasResolutionScaleMode = 0;
    strategy$jscomp$1.filteringMode = 0;
    strategy$jscomp$1.deferUntilInEventHandler = deferUntilInEventHandler$jscomp$0;
    strategy$jscomp$1.canvasResizedCallbackTargetThread = 2;
    return __emscripten_do_request_fullscreen$jscomp$0(target$jscomp$65, strategy$jscomp$1);
  }
  function _emscripten_request_pointerlock$jscomp$0(target$jscomp$66, deferUntilInEventHandler$jscomp$1) {
    if (!target$jscomp$66) {
      target$jscomp$66 = "#canvas";
    }
    target$jscomp$66 = JSEvents$jscomp$0.findEventTarget(target$jscomp$66);
    if (!target$jscomp$66) {
      return -4;
    }
    if (!target$jscomp$66.requestPointerLock && !target$jscomp$66.mozRequestPointerLock && !target$jscomp$66.webkitRequestPointerLock && !target$jscomp$66.msRequestPointerLock) {
      return -1;
    }
    var canPerformRequests$jscomp$1 = JSEvents$jscomp$0.canPerformEventHandlerRequests();
    if (!canPerformRequests$jscomp$1) {
      if (deferUntilInEventHandler$jscomp$1) {
        JSEvents$jscomp$0.deferCall(JSEvents$jscomp$0.requestPointerLock, 2, [target$jscomp$66]);
        return 1;
      } else {
        return -2;
      }
    }
    return JSEvents$jscomp$0.requestPointerLock(target$jscomp$66);
  }
  function _emscripten_set_blur_callback_on_thread$jscomp$0(target$jscomp$67, userData$jscomp$1, useCapture$jscomp$0, callbackfunc$jscomp$0, targetThread$jscomp$0) {
    JSEvents$jscomp$0.registerFocusEventCallback(target$jscomp$67, userData$jscomp$1, useCapture$jscomp$0, callbackfunc$jscomp$0, 12, "blur", targetThread$jscomp$0);
    return 0;
  }
  function _emscripten_set_dblclick_callback_on_thread$jscomp$0(target$jscomp$68, userData$jscomp$2, useCapture$jscomp$1, callbackfunc$jscomp$1, targetThread$jscomp$1) {
    JSEvents$jscomp$0.registerMouseEventCallback(target$jscomp$68, userData$jscomp$2, useCapture$jscomp$1, callbackfunc$jscomp$1, 7, "dblclick", targetThread$jscomp$1);
    return 0;
  }
  function _emscripten_set_devicemotion_callback_on_thread$jscomp$0(userData$jscomp$3, useCapture$jscomp$2, callbackfunc$jscomp$2, targetThread$jscomp$2) {
    JSEvents$jscomp$0.registerDeviceMotionEventCallback(window, userData$jscomp$3, useCapture$jscomp$2, callbackfunc$jscomp$2, 17, "devicemotion", targetThread$jscomp$2);
    return 0;
  }
  function _emscripten_set_deviceorientation_callback_on_thread$jscomp$0(userData$jscomp$4, useCapture$jscomp$3, callbackfunc$jscomp$3, targetThread$jscomp$3) {
    JSEvents$jscomp$0.registerDeviceOrientationEventCallback(window, userData$jscomp$4, useCapture$jscomp$3, callbackfunc$jscomp$3, 16, "deviceorientation", targetThread$jscomp$3);
    return 0;
  }
  function _emscripten_set_focus_callback_on_thread$jscomp$0(target$jscomp$69, userData$jscomp$5, useCapture$jscomp$4, callbackfunc$jscomp$4, targetThread$jscomp$4) {
    JSEvents$jscomp$0.registerFocusEventCallback(target$jscomp$69, userData$jscomp$5, useCapture$jscomp$4, callbackfunc$jscomp$4, 13, "focus", targetThread$jscomp$4);
    return 0;
  }
  function _emscripten_set_fullscreenchange_callback_on_thread$jscomp$0(target$jscomp$70, userData$jscomp$6, useCapture$jscomp$5, callbackfunc$jscomp$5, targetThread$jscomp$5) {
    if (typeof JSEvents$jscomp$0.fullscreenEnabled() === "undefined") {
      return -1;
    }
    if (!target$jscomp$70) {
      target$jscomp$70 = document;
    } else {
      target$jscomp$70 = JSEvents$jscomp$0.findEventTarget(target$jscomp$70);
      if (!target$jscomp$70) {
        return -4;
      }
    }
    JSEvents$jscomp$0.registerFullscreenChangeEventCallback(target$jscomp$70, userData$jscomp$6, useCapture$jscomp$5, callbackfunc$jscomp$5, 19, "fullscreenchange", targetThread$jscomp$5);
    JSEvents$jscomp$0.registerFullscreenChangeEventCallback(target$jscomp$70, userData$jscomp$6, useCapture$jscomp$5, callbackfunc$jscomp$5, 19, "mozfullscreenchange", targetThread$jscomp$5);
    JSEvents$jscomp$0.registerFullscreenChangeEventCallback(target$jscomp$70, userData$jscomp$6, useCapture$jscomp$5, callbackfunc$jscomp$5, 19, "webkitfullscreenchange", targetThread$jscomp$5);
    JSEvents$jscomp$0.registerFullscreenChangeEventCallback(target$jscomp$70, userData$jscomp$6, useCapture$jscomp$5, callbackfunc$jscomp$5, 19, "msfullscreenchange", targetThread$jscomp$5);
    return 0;
  }
  function _emscripten_set_gamepadconnected_callback_on_thread$jscomp$0(userData$jscomp$7, useCapture$jscomp$6, callbackfunc$jscomp$6, targetThread$jscomp$6) {
    if (!navigator.getGamepads && !navigator.webkitGetGamepads) {
      return -1;
    }
    JSEvents$jscomp$0.registerGamepadEventCallback(window, userData$jscomp$7, useCapture$jscomp$6, callbackfunc$jscomp$6, 26, "gamepadconnected", targetThread$jscomp$6);
    return 0;
  }
  function _emscripten_set_gamepaddisconnected_callback_on_thread$jscomp$0(userData$jscomp$8, useCapture$jscomp$7, callbackfunc$jscomp$7, targetThread$jscomp$7) {
    if (!navigator.getGamepads && !navigator.webkitGetGamepads) {
      return -1;
    }
    JSEvents$jscomp$0.registerGamepadEventCallback(window, userData$jscomp$8, useCapture$jscomp$7, callbackfunc$jscomp$7, 27, "gamepaddisconnected", targetThread$jscomp$7);
    return 0;
  }
  function _emscripten_set_keydown_callback_on_thread$jscomp$0(target$jscomp$71, userData$jscomp$9, useCapture$jscomp$8, callbackfunc$jscomp$8, targetThread$jscomp$8) {
    JSEvents$jscomp$0.registerKeyEventCallback(target$jscomp$71, userData$jscomp$9, useCapture$jscomp$8, callbackfunc$jscomp$8, 2, "keydown", targetThread$jscomp$8);
    return 0;
  }
  function _emscripten_set_keypress_callback_on_thread$jscomp$0(target$jscomp$72, userData$jscomp$10, useCapture$jscomp$9, callbackfunc$jscomp$9, targetThread$jscomp$9) {
    JSEvents$jscomp$0.registerKeyEventCallback(target$jscomp$72, userData$jscomp$10, useCapture$jscomp$9, callbackfunc$jscomp$9, 1, "keypress", targetThread$jscomp$9);
    return 0;
  }
  function _emscripten_set_keyup_callback_on_thread$jscomp$0(target$jscomp$73, userData$jscomp$11, useCapture$jscomp$10, callbackfunc$jscomp$10, targetThread$jscomp$10) {
    JSEvents$jscomp$0.registerKeyEventCallback(target$jscomp$73, userData$jscomp$11, useCapture$jscomp$10, callbackfunc$jscomp$10, 3, "keyup", targetThread$jscomp$10);
    return 0;
  }
  function _emscripten_set_mousedown_callback_on_thread$jscomp$0(target$jscomp$74, userData$jscomp$12, useCapture$jscomp$11, callbackfunc$jscomp$11, targetThread$jscomp$11) {
    JSEvents$jscomp$0.registerMouseEventCallback(target$jscomp$74, userData$jscomp$12, useCapture$jscomp$11, callbackfunc$jscomp$11, 5, "mousedown", targetThread$jscomp$11);
    return 0;
  }
  function _emscripten_set_mousemove_callback_on_thread$jscomp$0(target$jscomp$75, userData$jscomp$13, useCapture$jscomp$12, callbackfunc$jscomp$12, targetThread$jscomp$12) {
    JSEvents$jscomp$0.registerMouseEventCallback(target$jscomp$75, userData$jscomp$13, useCapture$jscomp$12, callbackfunc$jscomp$12, 8, "mousemove", targetThread$jscomp$12);
    return 0;
  }
  function _emscripten_set_mouseup_callback_on_thread$jscomp$0(target$jscomp$76, userData$jscomp$14, useCapture$jscomp$13, callbackfunc$jscomp$13, targetThread$jscomp$13) {
    JSEvents$jscomp$0.registerMouseEventCallback(target$jscomp$76, userData$jscomp$14, useCapture$jscomp$13, callbackfunc$jscomp$13, 6, "mouseup", targetThread$jscomp$13);
    return 0;
  }
  function _emscripten_set_touchcancel_callback_on_thread$jscomp$0(target$jscomp$77, userData$jscomp$15, useCapture$jscomp$14, callbackfunc$jscomp$14, targetThread$jscomp$14) {
    JSEvents$jscomp$0.registerTouchEventCallback(target$jscomp$77, userData$jscomp$15, useCapture$jscomp$14, callbackfunc$jscomp$14, 25, "touchcancel", targetThread$jscomp$14);
    return 0;
  }
  function _emscripten_set_touchend_callback_on_thread$jscomp$0(target$jscomp$78, userData$jscomp$16, useCapture$jscomp$15, callbackfunc$jscomp$15, targetThread$jscomp$15) {
    JSEvents$jscomp$0.registerTouchEventCallback(target$jscomp$78, userData$jscomp$16, useCapture$jscomp$15, callbackfunc$jscomp$15, 23, "touchend", targetThread$jscomp$15);
    return 0;
  }
  function _emscripten_set_touchmove_callback_on_thread$jscomp$0(target$jscomp$79, userData$jscomp$17, useCapture$jscomp$16, callbackfunc$jscomp$16, targetThread$jscomp$16) {
    JSEvents$jscomp$0.registerTouchEventCallback(target$jscomp$79, userData$jscomp$17, useCapture$jscomp$16, callbackfunc$jscomp$16, 24, "touchmove", targetThread$jscomp$16);
    return 0;
  }
  function _emscripten_set_touchstart_callback_on_thread$jscomp$0(target$jscomp$80, userData$jscomp$18, useCapture$jscomp$17, callbackfunc$jscomp$17, targetThread$jscomp$17) {
    JSEvents$jscomp$0.registerTouchEventCallback(target$jscomp$80, userData$jscomp$18, useCapture$jscomp$17, callbackfunc$jscomp$17, 22, "touchstart", targetThread$jscomp$17);
    return 0;
  }
  function _emscripten_set_wheel_callback_on_thread$jscomp$0(target$jscomp$81, userData$jscomp$19, useCapture$jscomp$18, callbackfunc$jscomp$18, targetThread$jscomp$18) {
    target$jscomp$81 = JSEvents$jscomp$0.findEventTarget(target$jscomp$81);
    if (typeof target$jscomp$81.onwheel !== "undefined") {
      JSEvents$jscomp$0.registerWheelEventCallback(target$jscomp$81, userData$jscomp$19, useCapture$jscomp$18, callbackfunc$jscomp$18, 9, "wheel", targetThread$jscomp$18);
      return 0;
    } else {
      if (typeof target$jscomp$81.onmousewheel !== "undefined") {
        JSEvents$jscomp$0.registerWheelEventCallback(target$jscomp$81, userData$jscomp$19, useCapture$jscomp$18, callbackfunc$jscomp$18, 9, "mousewheel", targetThread$jscomp$18);
        return 0;
      } else {
        return -1;
      }
    }
  }
  function _emscripten_webgl_do_create_context$jscomp$0(target$jscomp$82, attributes$jscomp$1) {
    var contextAttributes$jscomp$0 = {};
    contextAttributes$jscomp$0["alpha"] = !!HEAP32$jscomp$0[attributes$jscomp$1 >> 2];
    contextAttributes$jscomp$0["depth"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 4 >> 2];
    contextAttributes$jscomp$0["stencil"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 8 >> 2];
    contextAttributes$jscomp$0["antialias"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 12 >> 2];
    contextAttributes$jscomp$0["premultipliedAlpha"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 16 >> 2];
    contextAttributes$jscomp$0["preserveDrawingBuffer"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 20 >> 2];
    contextAttributes$jscomp$0["preferLowPowerToHighPerformance"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 24 >> 2];
    contextAttributes$jscomp$0["failIfMajorPerformanceCaveat"] = !!HEAP32$jscomp$0[attributes$jscomp$1 + 28 >> 2];
    contextAttributes$jscomp$0["majorVersion"] = HEAP32$jscomp$0[attributes$jscomp$1 + 32 >> 2];
    contextAttributes$jscomp$0["minorVersion"] = HEAP32$jscomp$0[attributes$jscomp$1 + 36 >> 2];
    contextAttributes$jscomp$0["explicitSwapControl"] = HEAP32$jscomp$0[attributes$jscomp$1 + 44 >> 2];
    contextAttributes$jscomp$0["proxyContextToMainThread"] = HEAP32$jscomp$0[attributes$jscomp$1 + 48 >> 2];
    contextAttributes$jscomp$0["renderViaOffscreenBackBuffer"] = HEAP32$jscomp$0[attributes$jscomp$1 + 52 >> 2];
    target$jscomp$82 = Pointer_stringify$jscomp$0(target$jscomp$82);
    var canvas$jscomp$4;
    if ((!target$jscomp$82 || target$jscomp$82 === "#canvas") && Module$jscomp$0["canvas"]) {
      canvas$jscomp$4 = Module$jscomp$0["canvas"].id && GL$jscomp$0.offscreenCanvases[Module$jscomp$0["canvas"].id] ? GL$jscomp$0.offscreenCanvases[Module$jscomp$0["canvas"].id].offscreenCanvas || JSEvents$jscomp$0.findEventTarget(Module$jscomp$0["canvas"].id) : Module$jscomp$0["canvas"];
    } else {
      canvas$jscomp$4 = GL$jscomp$0.offscreenCanvases[target$jscomp$82] ? GL$jscomp$0.offscreenCanvases[target$jscomp$82].offscreenCanvas : JSEvents$jscomp$0.findEventTarget(target$jscomp$82);
    }
    if (!canvas$jscomp$4) {
      return 0;
    }
    if (contextAttributes$jscomp$0["explicitSwapControl"]) {
      return 0;
    }
    var contextHandle$jscomp$0 = GL$jscomp$0.createContext(canvas$jscomp$4, contextAttributes$jscomp$0);
    return contextHandle$jscomp$0;
  }
  function _emscripten_webgl_create_context$jscomp$0() {
    return _emscripten_webgl_do_create_context$jscomp$0.apply(null, arguments);
  }
  function _emscripten_webgl_destroy_context_calling_thread$jscomp$0(contextHandle$jscomp$1) {
    GL$jscomp$0.deleteContext(contextHandle$jscomp$1);
  }
  function _emscripten_webgl_destroy_context$jscomp$0() {
    return _emscripten_webgl_destroy_context_calling_thread$jscomp$0.apply(null, arguments);
  }
  function _emscripten_webgl_enable_extension_calling_thread$jscomp$0(contextHandle$jscomp$2, extension$jscomp$0) {
    var context$jscomp$0 = GL$jscomp$0.getContext(contextHandle$jscomp$2);
    var extString$jscomp$0 = Pointer_stringify$jscomp$0(extension$jscomp$0);
    if (extString$jscomp$0.indexOf("GL_") == 0) {
      extString$jscomp$0 = extString$jscomp$0.substr(3);
    }
    var ext$jscomp$0 = context$jscomp$0.GLctx.getExtension(extString$jscomp$0);
    return ext$jscomp$0 ? 1 : 0;
  }
  function _emscripten_webgl_enable_extension$jscomp$0() {
    return _emscripten_webgl_enable_extension_calling_thread$jscomp$0.apply(null, arguments);
  }
  function _emscripten_webgl_do_get_current_context$jscomp$0() {
    return GL$jscomp$0.currentContext ? GL$jscomp$0.currentContext.handle : 0;
  }
  function _emscripten_webgl_get_current_context$jscomp$0() {
    return _emscripten_webgl_do_get_current_context$jscomp$0.apply(null, arguments);
  }
  function _emscripten_webgl_init_context_attributes$jscomp$0(attributes$jscomp$2) {
    HEAP32$jscomp$0[attributes$jscomp$2 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 4 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 8 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 12 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 16 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 20 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 24 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 28 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 32 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 36 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 40 >> 2] = 1;
    HEAP32$jscomp$0[attributes$jscomp$2 + 44 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 48 >> 2] = 0;
    HEAP32$jscomp$0[attributes$jscomp$2 + 52 >> 2] = 0;
  }
  function _emscripten_webgl_make_context_current$jscomp$0(contextHandle$jscomp$3) {
    var success$jscomp$1 = GL$jscomp$0.makeContextCurrent(contextHandle$jscomp$3);
    return success$jscomp$1 ? 0 : -5;
  }
  function __exit$jscomp$0(status$jscomp$0) {
    exit$jscomp$0(status$jscomp$0);
  }
  function _exit$jscomp$0(status$jscomp$1) {
    __exit$jscomp$0(status$jscomp$1);
  }
  function _flock$jscomp$0(fd$jscomp$3, operation$jscomp$1) {
    return 0;
  }
  function _getenv$jscomp$0(name$jscomp$65) {
    if (name$jscomp$65 === 0) {
      return 0;
    }
    name$jscomp$65 = Pointer_stringify$jscomp$0(name$jscomp$65);
    if (!ENV$jscomp$0.hasOwnProperty(name$jscomp$65)) {
      return 0;
    }
    if (_getenv$jscomp$0.ret) {
      _free$jscomp$0(_getenv$jscomp$0.ret);
    }
    _getenv$jscomp$0.ret = allocateUTF8$jscomp$0(ENV$jscomp$0[name$jscomp$65]);
    return _getenv$jscomp$0.ret;
  }
  function _getpagesize$jscomp$0() {
    return PAGE_SIZE$jscomp$0;
  }
  function _getpwuid$jscomp$0(uid$jscomp$0) {
    return 0;
  }
  function _gettimeofday$jscomp$0(ptr$jscomp$20) {
    var now$jscomp$1 = Date.now();
    HEAP32$jscomp$0[ptr$jscomp$20 >> 2] = now$jscomp$1 / 1E3 | 0;
    HEAP32$jscomp$0[ptr$jscomp$20 + 4 >> 2] = now$jscomp$1 % 1E3 * 1E3 | 0;
    return 0;
  }
  function _glActiveTexture$jscomp$0(x0$jscomp$2) {
    GLctx$jscomp$0["activeTexture"](x0$jscomp$2);
  }
  function _glAttachShader$jscomp$0(program$jscomp$16, shader$jscomp$10) {
    GLctx$jscomp$0.attachShader(GL$jscomp$0.programs[program$jscomp$16], GL$jscomp$0.shaders[shader$jscomp$10]);
  }
  function _glBeginQuery$jscomp$0(target$jscomp$83, id$jscomp$10) {
    GLctx$jscomp$0["beginQuery"](target$jscomp$83, id$jscomp$10 ? GL$jscomp$0.queries[id$jscomp$10] : null);
  }
  function _glBeginTransformFeedback$jscomp$0(x0$jscomp$3) {
    GLctx$jscomp$0["beginTransformFeedback"](x0$jscomp$3);
  }
  function _glBindAttribLocation$jscomp$0(program$jscomp$17, index$jscomp$55, name$jscomp$66) {
    name$jscomp$66 = Pointer_stringify$jscomp$0(name$jscomp$66);
    GLctx$jscomp$0.bindAttribLocation(GL$jscomp$0.programs[program$jscomp$17], index$jscomp$55, name$jscomp$66);
  }
  function _glBindBuffer$jscomp$0(target$jscomp$84, buffer$jscomp$20) {
    var bufferObj$jscomp$0 = buffer$jscomp$20 ? GL$jscomp$0.buffers[buffer$jscomp$20] : null;
    if (target$jscomp$84 == 35051) {
      GLctx$jscomp$0.currentPixelPackBufferBinding = buffer$jscomp$20;
    } else {
      if (target$jscomp$84 == 35052) {
        GLctx$jscomp$0.currentPixelUnpackBufferBinding = buffer$jscomp$20;
      }
    }
    GLctx$jscomp$0.bindBuffer(target$jscomp$84, bufferObj$jscomp$0);
  }
  function _glBindBufferBase$jscomp$0(target$jscomp$85, index$jscomp$56, buffer$jscomp$21) {
    var bufferObj$jscomp$1 = buffer$jscomp$21 ? GL$jscomp$0.buffers[buffer$jscomp$21] : null;
    GLctx$jscomp$0["bindBufferBase"](target$jscomp$85, index$jscomp$56, bufferObj$jscomp$1);
  }
  function _glBindBufferRange$jscomp$0(target$jscomp$86, index$jscomp$57, buffer$jscomp$22, offset$jscomp$18, ptrsize$jscomp$0) {
    var bufferObj$jscomp$2 = buffer$jscomp$22 ? GL$jscomp$0.buffers[buffer$jscomp$22] : null;
    GLctx$jscomp$0["bindBufferRange"](target$jscomp$86, index$jscomp$57, bufferObj$jscomp$2, offset$jscomp$18, ptrsize$jscomp$0);
  }
  function _glBindFramebuffer$jscomp$0(target$jscomp$87, framebuffer$jscomp$1) {
    GLctx$jscomp$0.bindFramebuffer(target$jscomp$87, framebuffer$jscomp$1 ? GL$jscomp$0.framebuffers[framebuffer$jscomp$1] : null);
  }
  function _glBindRenderbuffer$jscomp$0(target$jscomp$88, renderbuffer$jscomp$2) {
    GLctx$jscomp$0.bindRenderbuffer(target$jscomp$88, renderbuffer$jscomp$2 ? GL$jscomp$0.renderbuffers[renderbuffer$jscomp$2] : null);
  }
  function _glBindSampler$jscomp$0(unit$jscomp$0, sampler$jscomp$0) {
    GLctx$jscomp$0["bindSampler"](unit$jscomp$0, sampler$jscomp$0 ? GL$jscomp$0.samplers[sampler$jscomp$0] : null);
  }
  function _glBindTexture$jscomp$0(target$jscomp$89, texture$jscomp$5) {
    GLctx$jscomp$0.bindTexture(target$jscomp$89, texture$jscomp$5 ? GL$jscomp$0.textures[texture$jscomp$5] : null);
  }
  function _glBindTransformFeedback$jscomp$0(target$jscomp$90, id$jscomp$11) {
    var transformFeedback$jscomp$0 = id$jscomp$11 ? GL$jscomp$0.transformFeedbacks[id$jscomp$11] : null;
    if (id$jscomp$11 && !transformFeedback$jscomp$0) {
      GL$jscomp$0.recordError(1282);
      return;
    }
    GLctx$jscomp$0["bindTransformFeedback"](target$jscomp$90, transformFeedback$jscomp$0);
  }
  function _glBindVertexArray$jscomp$0(vao$jscomp$0) {
    GLctx$jscomp$0["bindVertexArray"](GL$jscomp$0.vaos[vao$jscomp$0]);
  }
  function _glBlendEquation$jscomp$0(x0$jscomp$4) {
    GLctx$jscomp$0["blendEquation"](x0$jscomp$4);
  }
  function _glBlendEquationSeparate$jscomp$0(x0$jscomp$5, x1$jscomp$5) {
    GLctx$jscomp$0["blendEquationSeparate"](x0$jscomp$5, x1$jscomp$5);
  }
  function _glBlendFuncSeparate$jscomp$0(x0$jscomp$6, x1$jscomp$6, x2$jscomp$3, x3$jscomp$0) {
    GLctx$jscomp$0["blendFuncSeparate"](x0$jscomp$6, x1$jscomp$6, x2$jscomp$3, x3$jscomp$0);
  }
  function _glBlitFramebuffer$jscomp$0(x0$jscomp$7, x1$jscomp$7, x2$jscomp$4, x3$jscomp$1, x4$jscomp$0, x5$jscomp$0, x6$jscomp$0, x7$jscomp$0, x8$jscomp$0, x9$jscomp$0) {
    GLctx$jscomp$0["blitFramebuffer"](x0$jscomp$7, x1$jscomp$7, x2$jscomp$4, x3$jscomp$1, x4$jscomp$0, x5$jscomp$0, x6$jscomp$0, x7$jscomp$0, x8$jscomp$0, x9$jscomp$0);
  }
  function _glBufferData$jscomp$0(target$jscomp$91, size$jscomp$26, data$jscomp$32, usage$jscomp$2) {
    if (!data$jscomp$32) {
      GLctx$jscomp$0.bufferData(target$jscomp$91, size$jscomp$26, usage$jscomp$2);
    } else {
      if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
        GLctx$jscomp$0.bufferData(target$jscomp$91, HEAPU8$jscomp$0, usage$jscomp$2, data$jscomp$32, size$jscomp$26);
        return;
      }
      GLctx$jscomp$0.bufferData(target$jscomp$91, HEAPU8$jscomp$0.subarray(data$jscomp$32, data$jscomp$32 + size$jscomp$26), usage$jscomp$2);
    }
  }
  function _glBufferSubData$jscomp$0(target$jscomp$92, offset$jscomp$19, size$jscomp$27, data$jscomp$33) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.bufferSubData(target$jscomp$92, offset$jscomp$19, HEAPU8$jscomp$0, data$jscomp$33, size$jscomp$27);
      return;
    }
    GLctx$jscomp$0.bufferSubData(target$jscomp$92, offset$jscomp$19, HEAPU8$jscomp$0.subarray(data$jscomp$33, data$jscomp$33 + size$jscomp$27));
  }
  function _glCheckFramebufferStatus$jscomp$0(x0$jscomp$8) {
    return GLctx$jscomp$0["checkFramebufferStatus"](x0$jscomp$8);
  }
  function _glClear$jscomp$0(x0$jscomp$9) {
    GLctx$jscomp$0["clear"](x0$jscomp$9);
  }
  function _glClearBufferfi$jscomp$0(x0$jscomp$10, x1$jscomp$8, x2$jscomp$5, x3$jscomp$2) {
    GLctx$jscomp$0["clearBufferfi"](x0$jscomp$10, x1$jscomp$8, x2$jscomp$5, x3$jscomp$2);
  }
  function _glClearBufferfv$jscomp$0(buffer$jscomp$23, drawbuffer$jscomp$0, value$jscomp$91) {
    GLctx$jscomp$0["clearBufferfv"](buffer$jscomp$23, drawbuffer$jscomp$0, HEAPF32$jscomp$0, value$jscomp$91 >> 2);
  }
  function _glClearBufferuiv$jscomp$0(buffer$jscomp$24, drawbuffer$jscomp$1, value$jscomp$92) {
    GLctx$jscomp$0["clearBufferuiv"](buffer$jscomp$24, drawbuffer$jscomp$1, HEAPU32$jscomp$0, value$jscomp$92 >> 2);
  }
  function _glClearColor$jscomp$0(x0$jscomp$11, x1$jscomp$9, x2$jscomp$6, x3$jscomp$3) {
    GLctx$jscomp$0["clearColor"](x0$jscomp$11, x1$jscomp$9, x2$jscomp$6, x3$jscomp$3);
  }
  function _glClearDepthf$jscomp$0(x0$jscomp$12) {
    GLctx$jscomp$0["clearDepth"](x0$jscomp$12);
  }
  function _glClearStencil$jscomp$0(x0$jscomp$13) {
    GLctx$jscomp$0["clearStencil"](x0$jscomp$13);
  }
  function _glClientWaitSync$jscomp$0(sync$jscomp$0, flags$jscomp$7, timeoutLo$jscomp$0, timeoutHi$jscomp$0) {
    timeoutLo$jscomp$0 = timeoutLo$jscomp$0 >>> 0;
    timeoutHi$jscomp$0 = timeoutHi$jscomp$0 >>> 0;
    var timeout$jscomp$2 = timeoutLo$jscomp$0 == 4294967295 && timeoutHi$jscomp$0 == 4294967295 ? -1 : makeBigInt$jscomp$0(timeoutLo$jscomp$0, timeoutHi$jscomp$0, true);
    return GLctx$jscomp$0.clientWaitSync(GL$jscomp$0.syncs[sync$jscomp$0], flags$jscomp$7, timeout$jscomp$2);
  }
  function _glColorMask$jscomp$0(red$jscomp$3, green$jscomp$3, blue$jscomp$3, alpha$jscomp$3) {
    GLctx$jscomp$0.colorMask(!!red$jscomp$3, !!green$jscomp$3, !!blue$jscomp$3, !!alpha$jscomp$3);
  }
  function _glCompileShader$jscomp$0(shader$jscomp$11) {
    GLctx$jscomp$0.compileShader(GL$jscomp$0.shaders[shader$jscomp$11]);
  }
  function _glCompressedTexImage2D$jscomp$0(target$jscomp$93, level$jscomp$7, internalFormat$jscomp$0, width$jscomp$18, height$jscomp$16, border$jscomp$2, imageSize$jscomp$0, data$jscomp$34) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0["compressedTexImage2D"](target$jscomp$93, level$jscomp$7, internalFormat$jscomp$0, width$jscomp$18, height$jscomp$16, border$jscomp$2, HEAPU8$jscomp$0, data$jscomp$34, imageSize$jscomp$0);
      return;
    }
    GLctx$jscomp$0["compressedTexImage2D"](target$jscomp$93, level$jscomp$7, internalFormat$jscomp$0, width$jscomp$18, height$jscomp$16, border$jscomp$2, data$jscomp$34 ? HEAPU8$jscomp$0.subarray(data$jscomp$34, data$jscomp$34 + imageSize$jscomp$0) : null);
  }
  function _glCompressedTexImage3D$jscomp$0(target$jscomp$94, level$jscomp$8, internalFormat$jscomp$1, width$jscomp$19, height$jscomp$17, depth$jscomp$1, border$jscomp$3, imageSize$jscomp$1, data$jscomp$35) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0["compressedTexImage3D"](target$jscomp$94, level$jscomp$8, internalFormat$jscomp$1, width$jscomp$19, height$jscomp$17, depth$jscomp$1, border$jscomp$3, HEAPU8$jscomp$0, data$jscomp$35, imageSize$jscomp$1);
    } else {
      GLctx$jscomp$0["compressedTexImage3D"](target$jscomp$94, level$jscomp$8, internalFormat$jscomp$1, width$jscomp$19, height$jscomp$17, depth$jscomp$1, border$jscomp$3, data$jscomp$35 ? HEAPU8$jscomp$0.subarray(data$jscomp$35, data$jscomp$35 + imageSize$jscomp$1) : null);
    }
  }
  function _glCompressedTexSubImage2D$jscomp$0(target$jscomp$95, level$jscomp$9, xoffset$jscomp$3, yoffset$jscomp$3, width$jscomp$20, height$jscomp$18, format$jscomp$13, imageSize$jscomp$2, data$jscomp$36) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0["compressedTexSubImage2D"](target$jscomp$95, level$jscomp$9, xoffset$jscomp$3, yoffset$jscomp$3, width$jscomp$20, height$jscomp$18, format$jscomp$13, HEAPU8$jscomp$0, data$jscomp$36, imageSize$jscomp$2);
      return;
    }
    GLctx$jscomp$0["compressedTexSubImage2D"](target$jscomp$95, level$jscomp$9, xoffset$jscomp$3, yoffset$jscomp$3, width$jscomp$20, height$jscomp$18, format$jscomp$13, data$jscomp$36 ? HEAPU8$jscomp$0.subarray(data$jscomp$36, data$jscomp$36 + imageSize$jscomp$2) : null);
  }
  function _glCompressedTexSubImage3D$jscomp$0(target$jscomp$96, level$jscomp$10, xoffset$jscomp$4, yoffset$jscomp$4, zoffset$jscomp$0, width$jscomp$21, height$jscomp$19, depth$jscomp$2, format$jscomp$14, imageSize$jscomp$3, data$jscomp$37) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0["compressedTexSubImage3D"](target$jscomp$96, level$jscomp$10, xoffset$jscomp$4, yoffset$jscomp$4, zoffset$jscomp$0, width$jscomp$21, height$jscomp$19, depth$jscomp$2, format$jscomp$14, HEAPU8$jscomp$0, data$jscomp$37, imageSize$jscomp$3);
    } else {
      GLctx$jscomp$0["compressedTexSubImage3D"](target$jscomp$96, level$jscomp$10, xoffset$jscomp$4, yoffset$jscomp$4, zoffset$jscomp$0, width$jscomp$21, height$jscomp$19, depth$jscomp$2, format$jscomp$14, data$jscomp$37 ? HEAPU8$jscomp$0.subarray(data$jscomp$37, data$jscomp$37 + imageSize$jscomp$3) : null);
    }
  }
  function _glCopyBufferSubData$jscomp$0(x0$jscomp$14, x1$jscomp$10, x2$jscomp$7, x3$jscomp$4, x4$jscomp$1) {
    GLctx$jscomp$0["copyBufferSubData"](x0$jscomp$14, x1$jscomp$10, x2$jscomp$7, x3$jscomp$4, x4$jscomp$1);
  }
  function _glCopyTexImage2D$jscomp$0(x0$jscomp$15, x1$jscomp$11, x2$jscomp$8, x3$jscomp$5, x4$jscomp$2, x5$jscomp$1, x6$jscomp$1, x7$jscomp$1) {
    GLctx$jscomp$0["copyTexImage2D"](x0$jscomp$15, x1$jscomp$11, x2$jscomp$8, x3$jscomp$5, x4$jscomp$2, x5$jscomp$1, x6$jscomp$1, x7$jscomp$1);
  }
  function _glCopyTexSubImage2D$jscomp$0(x0$jscomp$16, x1$jscomp$12, x2$jscomp$9, x3$jscomp$6, x4$jscomp$3, x5$jscomp$2, x6$jscomp$2, x7$jscomp$2) {
    GLctx$jscomp$0["copyTexSubImage2D"](x0$jscomp$16, x1$jscomp$12, x2$jscomp$9, x3$jscomp$6, x4$jscomp$3, x5$jscomp$2, x6$jscomp$2, x7$jscomp$2);
  }
  function _glCreateProgram$jscomp$0() {
    var id$jscomp$12 = GL$jscomp$0.getNewId(GL$jscomp$0.programs);
    var program$jscomp$18 = GLctx$jscomp$0.createProgram();
    program$jscomp$18.name = id$jscomp$12;
    GL$jscomp$0.programs[id$jscomp$12] = program$jscomp$18;
    return id$jscomp$12;
  }
  function _glCreateShader$jscomp$0(shaderType$jscomp$0) {
    var id$jscomp$13 = GL$jscomp$0.getNewId(GL$jscomp$0.shaders);
    GL$jscomp$0.shaders[id$jscomp$13] = GLctx$jscomp$0.createShader(shaderType$jscomp$0);
    return id$jscomp$13;
  }
  function _glCullFace$jscomp$0(x0$jscomp$17) {
    GLctx$jscomp$0["cullFace"](x0$jscomp$17);
  }
  function _glDeleteBuffers$jscomp$0(n$jscomp$3, buffers$jscomp$1) {
    var i$jscomp$17 = 0;
    for (; i$jscomp$17 < n$jscomp$3; i$jscomp$17++) {
      var id$jscomp$14 = HEAP32$jscomp$0[buffers$jscomp$1 + i$jscomp$17 * 4 >> 2];
      var buffer$jscomp$25 = GL$jscomp$0.buffers[id$jscomp$14];
      if (!buffer$jscomp$25) {
        continue;
      }
      GLctx$jscomp$0.deleteBuffer(buffer$jscomp$25);
      buffer$jscomp$25.name = 0;
      GL$jscomp$0.buffers[id$jscomp$14] = null;
      if (id$jscomp$14 == GL$jscomp$0.currArrayBuffer) {
        GL$jscomp$0.currArrayBuffer = 0;
      }
      if (id$jscomp$14 == GL$jscomp$0.currElementArrayBuffer) {
        GL$jscomp$0.currElementArrayBuffer = 0;
      }
    }
  }
  function _glDeleteFramebuffers$jscomp$0(n$jscomp$4, framebuffers$jscomp$0) {
    var i$jscomp$18 = 0;
    for (; i$jscomp$18 < n$jscomp$4; ++i$jscomp$18) {
      var id$jscomp$15 = HEAP32$jscomp$0[framebuffers$jscomp$0 + i$jscomp$18 * 4 >> 2];
      var framebuffer$jscomp$2 = GL$jscomp$0.framebuffers[id$jscomp$15];
      if (!framebuffer$jscomp$2) {
        continue;
      }
      GLctx$jscomp$0.deleteFramebuffer(framebuffer$jscomp$2);
      framebuffer$jscomp$2.name = 0;
      GL$jscomp$0.framebuffers[id$jscomp$15] = null;
    }
  }
  function _glDeleteProgram$jscomp$0(id$jscomp$16) {
    if (!id$jscomp$16) {
      return;
    }
    var program$jscomp$19 = GL$jscomp$0.programs[id$jscomp$16];
    if (!program$jscomp$19) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    GLctx$jscomp$0.deleteProgram(program$jscomp$19);
    program$jscomp$19.name = 0;
    GL$jscomp$0.programs[id$jscomp$16] = null;
    GL$jscomp$0.programInfos[id$jscomp$16] = null;
  }
  function _glDeleteQueries$jscomp$0(n$jscomp$5, ids$jscomp$0) {
    var i$jscomp$19 = 0;
    for (; i$jscomp$19 < n$jscomp$5; i$jscomp$19++) {
      var id$jscomp$17 = HEAP32$jscomp$0[ids$jscomp$0 + i$jscomp$19 * 4 >> 2];
      var query$jscomp$8 = GL$jscomp$0.queries[id$jscomp$17];
      if (!query$jscomp$8) {
        continue;
      }
      GLctx$jscomp$0["deleteQuery"](query$jscomp$8);
      GL$jscomp$0.queries[id$jscomp$17] = null;
    }
  }
  function _glDeleteRenderbuffers$jscomp$0(n$jscomp$6, renderbuffers$jscomp$0) {
    var i$jscomp$20 = 0;
    for (; i$jscomp$20 < n$jscomp$6; i$jscomp$20++) {
      var id$jscomp$18 = HEAP32$jscomp$0[renderbuffers$jscomp$0 + i$jscomp$20 * 4 >> 2];
      var renderbuffer$jscomp$3 = GL$jscomp$0.renderbuffers[id$jscomp$18];
      if (!renderbuffer$jscomp$3) {
        continue;
      }
      GLctx$jscomp$0.deleteRenderbuffer(renderbuffer$jscomp$3);
      renderbuffer$jscomp$3.name = 0;
      GL$jscomp$0.renderbuffers[id$jscomp$18] = null;
    }
  }
  function _glDeleteSamplers$jscomp$0(n$jscomp$7, samplers$jscomp$0) {
    var i$jscomp$21 = 0;
    for (; i$jscomp$21 < n$jscomp$7; i$jscomp$21++) {
      var id$jscomp$19 = HEAP32$jscomp$0[samplers$jscomp$0 + i$jscomp$21 * 4 >> 2];
      var sampler$jscomp$1 = GL$jscomp$0.samplers[id$jscomp$19];
      if (!sampler$jscomp$1) {
        continue;
      }
      GLctx$jscomp$0["deleteSampler"](sampler$jscomp$1);
      sampler$jscomp$1.name = 0;
      GL$jscomp$0.samplers[id$jscomp$19] = null;
    }
  }
  function _glDeleteShader$jscomp$0(id$jscomp$20) {
    if (!id$jscomp$20) {
      return;
    }
    var shader$jscomp$12 = GL$jscomp$0.shaders[id$jscomp$20];
    if (!shader$jscomp$12) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    GLctx$jscomp$0.deleteShader(shader$jscomp$12);
    GL$jscomp$0.shaders[id$jscomp$20] = null;
  }
  function _glDeleteSync$jscomp$0(id$jscomp$21) {
    if (!id$jscomp$21) {
      return;
    }
    var sync$jscomp$1 = GL$jscomp$0.syncs[id$jscomp$21];
    if (!sync$jscomp$1) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    GLctx$jscomp$0.deleteSync(sync$jscomp$1);
    sync$jscomp$1.name = 0;
    GL$jscomp$0.syncs[id$jscomp$21] = null;
  }
  function _glDeleteTextures$jscomp$0(n$jscomp$8, textures$jscomp$0) {
    var i$jscomp$22 = 0;
    for (; i$jscomp$22 < n$jscomp$8; i$jscomp$22++) {
      var id$jscomp$22 = HEAP32$jscomp$0[textures$jscomp$0 + i$jscomp$22 * 4 >> 2];
      var texture$jscomp$6 = GL$jscomp$0.textures[id$jscomp$22];
      if (!texture$jscomp$6) {
        continue;
      }
      GLctx$jscomp$0.deleteTexture(texture$jscomp$6);
      texture$jscomp$6.name = 0;
      GL$jscomp$0.textures[id$jscomp$22] = null;
    }
  }
  function _glDeleteTransformFeedbacks$jscomp$0(n$jscomp$9, ids$jscomp$1) {
    var i$jscomp$23 = 0;
    for (; i$jscomp$23 < n$jscomp$9; i$jscomp$23++) {
      var id$jscomp$23 = HEAP32$jscomp$0[ids$jscomp$1 + i$jscomp$23 * 4 >> 2];
      var transformFeedback$jscomp$1 = GL$jscomp$0.transformFeedbacks[id$jscomp$23];
      if (!transformFeedback$jscomp$1) {
        continue;
      }
      GLctx$jscomp$0["deleteTransformFeedback"](transformFeedback$jscomp$1);
      transformFeedback$jscomp$1.name = 0;
      GL$jscomp$0.transformFeedbacks[id$jscomp$23] = null;
    }
  }
  function _glDeleteVertexArrays$jscomp$0(n$jscomp$10, vaos$jscomp$0) {
    var i$jscomp$24 = 0;
    for (; i$jscomp$24 < n$jscomp$10; i$jscomp$24++) {
      var id$jscomp$24 = HEAP32$jscomp$0[vaos$jscomp$0 + i$jscomp$24 * 4 >> 2];
      GLctx$jscomp$0["deleteVertexArray"](GL$jscomp$0.vaos[id$jscomp$24]);
      GL$jscomp$0.vaos[id$jscomp$24] = null;
    }
  }
  function _glDepthFunc$jscomp$0(x0$jscomp$18) {
    GLctx$jscomp$0["depthFunc"](x0$jscomp$18);
  }
  function _glDepthMask$jscomp$0(flag$jscomp$2) {
    GLctx$jscomp$0.depthMask(!!flag$jscomp$2);
  }
  function _glDetachShader$jscomp$0(program$jscomp$20, shader$jscomp$13) {
    GLctx$jscomp$0.detachShader(GL$jscomp$0.programs[program$jscomp$20], GL$jscomp$0.shaders[shader$jscomp$13]);
  }
  function _glDisable$jscomp$0(x0$jscomp$19) {
    GLctx$jscomp$0["disable"](x0$jscomp$19);
  }
  function _glDisableVertexAttribArray$jscomp$0(index$jscomp$58) {
    GLctx$jscomp$0.disableVertexAttribArray(index$jscomp$58);
  }
  function _glDrawArrays$jscomp$0(mode$jscomp$15, first$jscomp$4, count$jscomp$17) {
    GLctx$jscomp$0.drawArrays(mode$jscomp$15, first$jscomp$4, count$jscomp$17);
  }
  function _glDrawArraysInstanced$jscomp$0(mode$jscomp$16, first$jscomp$5, count$jscomp$18, primcount$jscomp$2) {
    GLctx$jscomp$0["drawArraysInstanced"](mode$jscomp$16, first$jscomp$5, count$jscomp$18, primcount$jscomp$2);
  }
  function _glDrawBuffers$jscomp$0(n$jscomp$11, bufs$jscomp$0) {
    var bufArray$jscomp$0 = GL$jscomp$0.tempFixedLengthArray[n$jscomp$11];
    var i$jscomp$25 = 0;
    for (; i$jscomp$25 < n$jscomp$11; i$jscomp$25++) {
      bufArray$jscomp$0[i$jscomp$25] = HEAP32$jscomp$0[bufs$jscomp$0 + i$jscomp$25 * 4 >> 2];
    }
    GLctx$jscomp$0["drawBuffers"](bufArray$jscomp$0);
  }
  function _glDrawElements$jscomp$0(mode$jscomp$17, count$jscomp$19, type$jscomp$122, indices$jscomp$0) {
    GLctx$jscomp$0.drawElements(mode$jscomp$17, count$jscomp$19, type$jscomp$122, indices$jscomp$0);
  }
  function _glDrawElementsInstanced$jscomp$0(mode$jscomp$18, count$jscomp$20, type$jscomp$123, indices$jscomp$1, primcount$jscomp$3) {
    GLctx$jscomp$0["drawElementsInstanced"](mode$jscomp$18, count$jscomp$20, type$jscomp$123, indices$jscomp$1, primcount$jscomp$3);
  }
  function _glEnable$jscomp$0(x0$jscomp$20) {
    GLctx$jscomp$0["enable"](x0$jscomp$20);
  }
  function _glEnableVertexAttribArray$jscomp$0(index$jscomp$59) {
    GLctx$jscomp$0.enableVertexAttribArray(index$jscomp$59);
  }
  function _glEndQuery$jscomp$0(x0$jscomp$21) {
    GLctx$jscomp$0["endQuery"](x0$jscomp$21);
  }
  function _glEndTransformFeedback$jscomp$0() {
    GLctx$jscomp$0["endTransformFeedback"]();
  }
  function _glFenceSync$jscomp$0(condition$jscomp$2, flags$jscomp$8) {
    var sync$jscomp$2 = GLctx$jscomp$0.fenceSync(condition$jscomp$2, flags$jscomp$8);
    if (sync$jscomp$2) {
      var id$jscomp$25 = GL$jscomp$0.getNewId(GL$jscomp$0.syncs);
      sync$jscomp$2.name = id$jscomp$25;
      GL$jscomp$0.syncs[id$jscomp$25] = sync$jscomp$2;
      return id$jscomp$25;
    } else {
      return 0;
    }
  }
  function _glFinish$jscomp$0() {
    GLctx$jscomp$0["finish"]();
  }
  function _glFlush$jscomp$0() {
    GLctx$jscomp$0["flush"]();
  }
  function emscriptenWebGLGetBufferBinding$jscomp$0(target$jscomp$97) {
    switch(target$jscomp$97) {
      case 34962:
        target$jscomp$97 = 34964;
        break;
      case 34963:
        target$jscomp$97 = 34965;
        break;
      case 35051:
        target$jscomp$97 = 35053;
        break;
      case 35052:
        target$jscomp$97 = 35055;
        break;
      case 35982:
        target$jscomp$97 = 35983;
        break;
      case 36662:
        target$jscomp$97 = 36662;
        break;
      case 36663:
        target$jscomp$97 = 36663;
        break;
      case 35345:
        target$jscomp$97 = 35368;
        break;
    }
    var buffer$jscomp$26 = GLctx$jscomp$0.getParameter(target$jscomp$97);
    if (buffer$jscomp$26) {
      return buffer$jscomp$26.name | 0;
    } else {
      return 0;
    }
  }
  function emscriptenWebGLValidateMapBufferTarget$jscomp$0(target$jscomp$98) {
    switch(target$jscomp$98) {
      case 34962:
      case 34963:
      case 36662:
      case 36663:
      case 35051:
      case 35052:
      case 35882:
      case 35982:
      case 35345:
        return true;
      default:
        return false;
    }
  }
  function _glFlushMappedBufferRange$jscomp$0(target$jscomp$99, offset$jscomp$20, length$jscomp$21) {
    if (!emscriptenWebGLValidateMapBufferTarget$jscomp$0(target$jscomp$99)) {
      GL$jscomp$0.recordError(1280);
      err$jscomp$3("GL_INVALID_ENUM in glFlushMappedBufferRange");
      return;
    }
    var mapping$jscomp$0 = GL$jscomp$0.mappedBuffers[emscriptenWebGLGetBufferBinding$jscomp$0(target$jscomp$99)];
    if (!mapping$jscomp$0) {
      GL$jscomp$0.recordError(1282);
      Module$jscomp$0.printError("buffer was never mapped in glFlushMappedBufferRange");
      return;
    }
    if (!(mapping$jscomp$0.access & 16)) {
      GL$jscomp$0.recordError(1282);
      Module$jscomp$0.printError("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");
      return;
    }
    if (offset$jscomp$20 < 0 || length$jscomp$21 < 0 || offset$jscomp$20 + length$jscomp$21 > mapping$jscomp$0.length) {
      GL$jscomp$0.recordError(1281);
      Module$jscomp$0.printError("invalid range in glFlushMappedBufferRange");
      return;
    }
    GLctx$jscomp$0.bufferSubData(target$jscomp$99, mapping$jscomp$0.offset, HEAPU8$jscomp$0.subarray(mapping$jscomp$0.mem + offset$jscomp$20, mapping$jscomp$0.mem + offset$jscomp$20 + length$jscomp$21));
  }
  function _glFramebufferRenderbuffer$jscomp$0(target$jscomp$100, attachment$jscomp$3, renderbuffertarget$jscomp$1, renderbuffer$jscomp$4) {
    GLctx$jscomp$0.framebufferRenderbuffer(target$jscomp$100, attachment$jscomp$3, renderbuffertarget$jscomp$1, GL$jscomp$0.renderbuffers[renderbuffer$jscomp$4]);
  }
  function _glFramebufferTexture2D$jscomp$0(target$jscomp$101, attachment$jscomp$4, textarget$jscomp$1, texture$jscomp$7, level$jscomp$11) {
    GLctx$jscomp$0.framebufferTexture2D(target$jscomp$101, attachment$jscomp$4, textarget$jscomp$1, GL$jscomp$0.textures[texture$jscomp$7], level$jscomp$11);
  }
  function _glFramebufferTextureLayer$jscomp$0(target$jscomp$102, attachment$jscomp$5, texture$jscomp$8, level$jscomp$12, layer$jscomp$0) {
    GLctx$jscomp$0.framebufferTextureLayer(target$jscomp$102, attachment$jscomp$5, GL$jscomp$0.textures[texture$jscomp$8], level$jscomp$12, layer$jscomp$0);
  }
  function _glFrontFace$jscomp$0(x0$jscomp$22) {
    GLctx$jscomp$0["frontFace"](x0$jscomp$22);
  }
  function _glGenBuffers$jscomp$0(n$jscomp$12, buffers$jscomp$2) {
    var i$jscomp$26 = 0;
    for (; i$jscomp$26 < n$jscomp$12; i$jscomp$26++) {
      var buffer$jscomp$27 = GLctx$jscomp$0.createBuffer();
      if (!buffer$jscomp$27) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$26 < n$jscomp$12;) {
          HEAP32$jscomp$0[buffers$jscomp$2 + i$jscomp$26++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$26 = GL$jscomp$0.getNewId(GL$jscomp$0.buffers);
      buffer$jscomp$27.name = id$jscomp$26;
      GL$jscomp$0.buffers[id$jscomp$26] = buffer$jscomp$27;
      HEAP32$jscomp$0[buffers$jscomp$2 + i$jscomp$26 * 4 >> 2] = id$jscomp$26;
    }
  }
  function _glGenFramebuffers$jscomp$0(n$jscomp$13, ids$jscomp$2) {
    var i$jscomp$27 = 0;
    for (; i$jscomp$27 < n$jscomp$13; ++i$jscomp$27) {
      var framebuffer$jscomp$3 = GLctx$jscomp$0.createFramebuffer();
      if (!framebuffer$jscomp$3) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$27 < n$jscomp$13;) {
          HEAP32$jscomp$0[ids$jscomp$2 + i$jscomp$27++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$27 = GL$jscomp$0.getNewId(GL$jscomp$0.framebuffers);
      framebuffer$jscomp$3.name = id$jscomp$27;
      GL$jscomp$0.framebuffers[id$jscomp$27] = framebuffer$jscomp$3;
      HEAP32$jscomp$0[ids$jscomp$2 + i$jscomp$27 * 4 >> 2] = id$jscomp$27;
    }
  }
  function _glGenQueries$jscomp$0(n$jscomp$14, ids$jscomp$3) {
    var i$jscomp$28 = 0;
    for (; i$jscomp$28 < n$jscomp$14; i$jscomp$28++) {
      var query$jscomp$9 = GLctx$jscomp$0["createQuery"]();
      if (!query$jscomp$9) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$28 < n$jscomp$14;) {
          HEAP32$jscomp$0[ids$jscomp$3 + i$jscomp$28++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$28 = GL$jscomp$0.getNewId(GL$jscomp$0.queries);
      query$jscomp$9.name = id$jscomp$28;
      GL$jscomp$0.queries[id$jscomp$28] = query$jscomp$9;
      HEAP32$jscomp$0[ids$jscomp$3 + i$jscomp$28 * 4 >> 2] = id$jscomp$28;
    }
  }
  function _glGenRenderbuffers$jscomp$0(n$jscomp$15, renderbuffers$jscomp$1) {
    var i$jscomp$29 = 0;
    for (; i$jscomp$29 < n$jscomp$15; i$jscomp$29++) {
      var renderbuffer$jscomp$5 = GLctx$jscomp$0.createRenderbuffer();
      if (!renderbuffer$jscomp$5) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$29 < n$jscomp$15;) {
          HEAP32$jscomp$0[renderbuffers$jscomp$1 + i$jscomp$29++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$29 = GL$jscomp$0.getNewId(GL$jscomp$0.renderbuffers);
      renderbuffer$jscomp$5.name = id$jscomp$29;
      GL$jscomp$0.renderbuffers[id$jscomp$29] = renderbuffer$jscomp$5;
      HEAP32$jscomp$0[renderbuffers$jscomp$1 + i$jscomp$29 * 4 >> 2] = id$jscomp$29;
    }
  }
  function _glGenSamplers$jscomp$0(n$jscomp$16, samplers$jscomp$1) {
    var i$jscomp$30 = 0;
    for (; i$jscomp$30 < n$jscomp$16; i$jscomp$30++) {
      var sampler$jscomp$2 = GLctx$jscomp$0["createSampler"]();
      if (!sampler$jscomp$2) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$30 < n$jscomp$16;) {
          HEAP32$jscomp$0[samplers$jscomp$1 + i$jscomp$30++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$30 = GL$jscomp$0.getNewId(GL$jscomp$0.samplers);
      sampler$jscomp$2.name = id$jscomp$30;
      GL$jscomp$0.samplers[id$jscomp$30] = sampler$jscomp$2;
      HEAP32$jscomp$0[samplers$jscomp$1 + i$jscomp$30 * 4 >> 2] = id$jscomp$30;
    }
  }
  function _glGenTextures$jscomp$0(n$jscomp$17, textures$jscomp$1) {
    var i$jscomp$31 = 0;
    for (; i$jscomp$31 < n$jscomp$17; i$jscomp$31++) {
      var texture$jscomp$9 = GLctx$jscomp$0.createTexture();
      if (!texture$jscomp$9) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$31 < n$jscomp$17;) {
          HEAP32$jscomp$0[textures$jscomp$1 + i$jscomp$31++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$31 = GL$jscomp$0.getNewId(GL$jscomp$0.textures);
      texture$jscomp$9.name = id$jscomp$31;
      GL$jscomp$0.textures[id$jscomp$31] = texture$jscomp$9;
      HEAP32$jscomp$0[textures$jscomp$1 + i$jscomp$31 * 4 >> 2] = id$jscomp$31;
    }
  }
  function _glGenTransformFeedbacks$jscomp$0(n$jscomp$18, ids$jscomp$4) {
    var i$jscomp$32 = 0;
    for (; i$jscomp$32 < n$jscomp$18; i$jscomp$32++) {
      var transformFeedback$jscomp$2 = GLctx$jscomp$0["createTransformFeedback"]();
      if (!transformFeedback$jscomp$2) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$32 < n$jscomp$18;) {
          HEAP32$jscomp$0[ids$jscomp$4 + i$jscomp$32++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$32 = GL$jscomp$0.getNewId(GL$jscomp$0.transformFeedbacks);
      transformFeedback$jscomp$2.name = id$jscomp$32;
      GL$jscomp$0.transformFeedbacks[id$jscomp$32] = transformFeedback$jscomp$2;
      HEAP32$jscomp$0[ids$jscomp$4 + i$jscomp$32 * 4 >> 2] = id$jscomp$32;
    }
  }
  function _glGenVertexArrays$jscomp$0(n$jscomp$19, arrays$jscomp$0) {
    var i$jscomp$33 = 0;
    for (; i$jscomp$33 < n$jscomp$19; i$jscomp$33++) {
      var vao$jscomp$1 = GLctx$jscomp$0["createVertexArray"]();
      if (!vao$jscomp$1) {
        GL$jscomp$0.recordError(1282);
        for (; i$jscomp$33 < n$jscomp$19;) {
          HEAP32$jscomp$0[arrays$jscomp$0 + i$jscomp$33++ * 4 >> 2] = 0;
        }
        return;
      }
      var id$jscomp$33 = GL$jscomp$0.getNewId(GL$jscomp$0.vaos);
      vao$jscomp$1.name = id$jscomp$33;
      GL$jscomp$0.vaos[id$jscomp$33] = vao$jscomp$1;
      HEAP32$jscomp$0[arrays$jscomp$0 + i$jscomp$33 * 4 >> 2] = id$jscomp$33;
    }
  }
  function _glGenerateMipmap$jscomp$0(x0$jscomp$23) {
    GLctx$jscomp$0["generateMipmap"](x0$jscomp$23);
  }
  function _glGetActiveAttrib$jscomp$0(program$jscomp$21, index$jscomp$60, bufSize$jscomp$0, length$jscomp$22, size$jscomp$28, type$jscomp$124, name$jscomp$67) {
    program$jscomp$21 = GL$jscomp$0.programs[program$jscomp$21];
    var info$jscomp$5 = GLctx$jscomp$0.getActiveAttrib(program$jscomp$21, index$jscomp$60);
    if (!info$jscomp$5) {
      return;
    }
    if (bufSize$jscomp$0 > 0 && name$jscomp$67) {
      var numBytesWrittenExclNull$jscomp$0 = stringToUTF8$jscomp$0(info$jscomp$5.name, name$jscomp$67, bufSize$jscomp$0);
      if (length$jscomp$22) {
        HEAP32$jscomp$0[length$jscomp$22 >> 2] = numBytesWrittenExclNull$jscomp$0;
      }
    } else {
      if (length$jscomp$22) {
        HEAP32$jscomp$0[length$jscomp$22 >> 2] = 0;
      }
    }
    if (size$jscomp$28) {
      HEAP32$jscomp$0[size$jscomp$28 >> 2] = info$jscomp$5.size;
    }
    if (type$jscomp$124) {
      HEAP32$jscomp$0[type$jscomp$124 >> 2] = info$jscomp$5.type;
    }
  }
  function _glGetActiveUniform$jscomp$0(program$jscomp$22, index$jscomp$61, bufSize$jscomp$1, length$jscomp$23, size$jscomp$29, type$jscomp$125, name$jscomp$68) {
    program$jscomp$22 = GL$jscomp$0.programs[program$jscomp$22];
    var info$jscomp$6 = GLctx$jscomp$0.getActiveUniform(program$jscomp$22, index$jscomp$61);
    if (!info$jscomp$6) {
      return;
    }
    if (bufSize$jscomp$1 > 0 && name$jscomp$68) {
      var numBytesWrittenExclNull$jscomp$1 = stringToUTF8$jscomp$0(info$jscomp$6.name, name$jscomp$68, bufSize$jscomp$1);
      if (length$jscomp$23) {
        HEAP32$jscomp$0[length$jscomp$23 >> 2] = numBytesWrittenExclNull$jscomp$1;
      }
    } else {
      if (length$jscomp$23) {
        HEAP32$jscomp$0[length$jscomp$23 >> 2] = 0;
      }
    }
    if (size$jscomp$29) {
      HEAP32$jscomp$0[size$jscomp$29 >> 2] = info$jscomp$6.size;
    }
    if (type$jscomp$125) {
      HEAP32$jscomp$0[type$jscomp$125 >> 2] = info$jscomp$6.type;
    }
  }
  function _glGetActiveUniformBlockName$jscomp$0(program$jscomp$23, uniformBlockIndex$jscomp$0, bufSize$jscomp$2, length$jscomp$24, uniformBlockName$jscomp$0) {
    program$jscomp$23 = GL$jscomp$0.programs[program$jscomp$23];
    var result$jscomp$4 = GLctx$jscomp$0["getActiveUniformBlockName"](program$jscomp$23, uniformBlockIndex$jscomp$0);
    if (!result$jscomp$4) {
      return;
    }
    if (uniformBlockName$jscomp$0 && bufSize$jscomp$2 > 0) {
      var numBytesWrittenExclNull$jscomp$2 = stringToUTF8$jscomp$0(result$jscomp$4, uniformBlockName$jscomp$0, bufSize$jscomp$2);
      if (length$jscomp$24) {
        HEAP32$jscomp$0[length$jscomp$24 >> 2] = numBytesWrittenExclNull$jscomp$2;
      }
    } else {
      if (length$jscomp$24) {
        HEAP32$jscomp$0[length$jscomp$24 >> 2] = 0;
      }
    }
  }
  function _glGetActiveUniformBlockiv$jscomp$0(program$jscomp$24, uniformBlockIndex$jscomp$1, pname$jscomp$12, params$jscomp$1) {
    if (!params$jscomp$1) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    program$jscomp$24 = GL$jscomp$0.programs[program$jscomp$24];
    switch(pname$jscomp$12) {
      case 35393:
        var name$jscomp$69 = GLctx$jscomp$0["getActiveUniformBlockName"](program$jscomp$24, uniformBlockIndex$jscomp$1);
        HEAP32$jscomp$0[params$jscomp$1 >> 2] = name$jscomp$69.length + 1;
        return;
      default:
        var result$jscomp$5 = GLctx$jscomp$0["getActiveUniformBlockParameter"](program$jscomp$24, uniformBlockIndex$jscomp$1, pname$jscomp$12);
        if (!result$jscomp$5) {
          return;
        }
        if (typeof result$jscomp$5 == "number") {
          HEAP32$jscomp$0[params$jscomp$1 >> 2] = result$jscomp$5;
        } else {
          var i$jscomp$34 = 0;
          for (; i$jscomp$34 < result$jscomp$5.length; i$jscomp$34++) {
            HEAP32$jscomp$0[params$jscomp$1 + i$jscomp$34 * 4 >> 2] = result$jscomp$5[i$jscomp$34];
          }
        }
    }
  }
  function _glGetActiveUniformsiv$jscomp$0(program$jscomp$25, uniformCount$jscomp$0, uniformIndices$jscomp$0, pname$jscomp$13, params$jscomp$2) {
    if (!params$jscomp$2) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    if (uniformCount$jscomp$0 > 0 && uniformIndices$jscomp$0 == 0) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    program$jscomp$25 = GL$jscomp$0.programs[program$jscomp$25];
    var ids$jscomp$5 = [];
    var i$jscomp$35 = 0;
    for (; i$jscomp$35 < uniformCount$jscomp$0; i$jscomp$35++) {
      ids$jscomp$5.push(HEAP32$jscomp$0[uniformIndices$jscomp$0 + i$jscomp$35 * 4 >> 2]);
    }
    var result$jscomp$6 = GLctx$jscomp$0["getActiveUniforms"](program$jscomp$25, ids$jscomp$5, pname$jscomp$13);
    if (!result$jscomp$6) {
      return;
    }
    var len$jscomp$3 = result$jscomp$6.length;
    i$jscomp$35 = 0;
    for (; i$jscomp$35 < len$jscomp$3; i$jscomp$35++) {
      HEAP32$jscomp$0[params$jscomp$2 + i$jscomp$35 * 4 >> 2] = result$jscomp$6[i$jscomp$35];
    }
  }
  function _glGetAttribLocation$jscomp$0(program$jscomp$26, name$jscomp$70) {
    return GLctx$jscomp$0.getAttribLocation(GL$jscomp$0.programs[program$jscomp$26], Pointer_stringify$jscomp$0(name$jscomp$70));
  }
  function _glGetError$jscomp$0() {
    if (GL$jscomp$0.lastError) {
      var error$jscomp$2 = GL$jscomp$0.lastError;
      GL$jscomp$0.lastError = 0;
      return error$jscomp$2;
    } else {
      return GLctx$jscomp$0.getError();
    }
  }
  function _glGetFramebufferAttachmentParameteriv$jscomp$0(target$jscomp$103, attachment$jscomp$6, pname$jscomp$14, params$jscomp$3) {
    var result$jscomp$7 = GLctx$jscomp$0.getFramebufferAttachmentParameter(target$jscomp$103, attachment$jscomp$6, pname$jscomp$14);
    if (result$jscomp$7 instanceof WebGLRenderbuffer || result$jscomp$7 instanceof WebGLTexture) {
      result$jscomp$7 = result$jscomp$7.name | 0;
    }
    HEAP32$jscomp$0[params$jscomp$3 >> 2] = result$jscomp$7;
  }
  function emscriptenWebGLGetIndexed$jscomp$0(target$jscomp$104, index$jscomp$62, data$jscomp$38, type$jscomp$126) {
    if (!data$jscomp$38) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var result$jscomp$8 = GLctx$jscomp$0["getIndexedParameter"](target$jscomp$104, index$jscomp$62);
    var ret$jscomp$13;
    switch(typeof result$jscomp$8) {
      case "boolean":
        ret$jscomp$13 = result$jscomp$8 ? 1 : 0;
        break;
      case "number":
        ret$jscomp$13 = result$jscomp$8;
        break;
      case "object":
        if (result$jscomp$8 === null) {
          switch(target$jscomp$104) {
            case 35983:
            case 35368:
              ret$jscomp$13 = 0;
              break;
            default:
              {
                GL$jscomp$0.recordError(1280);
                return;
              }
          }
        } else {
          if (result$jscomp$8 instanceof WebGLBuffer) {
            ret$jscomp$13 = result$jscomp$8.name | 0;
          } else {
            GL$jscomp$0.recordError(1280);
            return;
          }
        }
        break;
      default:
        GL$jscomp$0.recordError(1280);
        return;
    }
    switch(type$jscomp$126) {
      case "Integer64":
        tempI64 = [ret$jscomp$13 >>> 0, (tempDouble = ret$jscomp$13, +Math_abs$jscomp$0(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min$jscomp$0(+Math_floor$jscomp$0(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil$jscomp$0((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)];
        HEAP32$jscomp$0[data$jscomp$38 >> 2] = tempI64[0];
        HEAP32$jscomp$0[data$jscomp$38 + 4 >> 2] = tempI64[1];
        break;
      case "Integer":
        HEAP32$jscomp$0[data$jscomp$38 >> 2] = ret$jscomp$13;
        break;
      case "Float":
        HEAPF32$jscomp$0[data$jscomp$38 >> 2] = ret$jscomp$13;
        break;
      case "Boolean":
        HEAP8$jscomp$0[data$jscomp$38 >> 0] = ret$jscomp$13 ? 1 : 0;
        break;
      default:
        throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type$jscomp$126;
    }
  }
  function _glGetIntegeri_v$jscomp$0(target$jscomp$105, index$jscomp$63, data$jscomp$39) {
    emscriptenWebGLGetIndexed$jscomp$0(target$jscomp$105, index$jscomp$63, data$jscomp$39, "Integer");
  }
  function emscriptenWebGLGet$jscomp$0(name_$jscomp$0, p$jscomp$0, type$jscomp$127) {
    if (!p$jscomp$0) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var ret$jscomp$14 = undefined;
    switch(name_$jscomp$0) {
      case 36346:
        ret$jscomp$14 = 1;
        break;
      case 36344:
        if (type$jscomp$127 !== "Integer" && type$jscomp$127 !== "Integer64") {
          GL$jscomp$0.recordError(1280);
        }
        return;
      case 34814:
      case 36345:
        ret$jscomp$14 = 0;
        break;
      case 34466:
        var formats$jscomp$0 = GLctx$jscomp$0.getParameter(34467);
        ret$jscomp$14 = formats$jscomp$0.length;
        break;
      case 33309:
        if (GLctx$jscomp$0.canvas.GLctxObject.version < 2) {
          GL$jscomp$0.recordError(1282);
          return;
        }
        var exts$jscomp$0 = GLctx$jscomp$0.getSupportedExtensions();
        ret$jscomp$14 = 2 * exts$jscomp$0.length;
        break;
      case 33307:
      case 33308:
        if (GLctx$jscomp$0.canvas.GLctxObject.version < 2) {
          GL$jscomp$0.recordError(1280);
          return;
        }
        ret$jscomp$14 = name_$jscomp$0 == 33307 ? 3 : 0;
        break;
    }
    if (ret$jscomp$14 === undefined) {
      var result$jscomp$9 = GLctx$jscomp$0.getParameter(name_$jscomp$0);
      switch(typeof result$jscomp$9) {
        case "number":
          ret$jscomp$14 = result$jscomp$9;
          break;
        case "boolean":
          ret$jscomp$14 = result$jscomp$9 ? 1 : 0;
          break;
        case "string":
          GL$jscomp$0.recordError(1280);
          return;
        case "object":
          if (result$jscomp$9 === null) {
            switch(name_$jscomp$0) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 35097:
              case 36389:
              case 34068:
                {
                  ret$jscomp$14 = 0;
                  break;
                }
              default:
                {
                  GL$jscomp$0.recordError(1280);
                  return;
                }
            }
          } else {
            if (result$jscomp$9 instanceof Float32Array || result$jscomp$9 instanceof Uint32Array || result$jscomp$9 instanceof Int32Array || result$jscomp$9 instanceof Array) {
              var i$jscomp$36 = 0;
              for (; i$jscomp$36 < result$jscomp$9.length; ++i$jscomp$36) {
                switch(type$jscomp$127) {
                  case "Integer":
                    HEAP32$jscomp$0[p$jscomp$0 + i$jscomp$36 * 4 >> 2] = result$jscomp$9[i$jscomp$36];
                    break;
                  case "Float":
                    HEAPF32$jscomp$0[p$jscomp$0 + i$jscomp$36 * 4 >> 2] = result$jscomp$9[i$jscomp$36];
                    break;
                  case "Boolean":
                    HEAP8$jscomp$0[p$jscomp$0 + i$jscomp$36 >> 0] = result$jscomp$9[i$jscomp$36] ? 1 : 0;
                    break;
                  default:
                    throw "internal glGet error, bad type: " + type$jscomp$127;
                }
              }
              return;
            } else {
              if (result$jscomp$9 instanceof WebGLBuffer || result$jscomp$9 instanceof WebGLProgram || result$jscomp$9 instanceof WebGLFramebuffer || result$jscomp$9 instanceof WebGLRenderbuffer || result$jscomp$9 instanceof WebGLQuery || result$jscomp$9 instanceof WebGLSampler || result$jscomp$9 instanceof WebGLSync || result$jscomp$9 instanceof WebGLTransformFeedback || result$jscomp$9 instanceof WebGLVertexArrayObject || result$jscomp$9 instanceof WebGLTexture) {
                ret$jscomp$14 = result$jscomp$9.name | 0;
              } else {
                GL$jscomp$0.recordError(1280);
                return;
              }
            }
          }
          break;
        default:
          GL$jscomp$0.recordError(1280);
          return;
      }
    }
    switch(type$jscomp$127) {
      case "Integer64":
        tempI64 = [ret$jscomp$14 >>> 0, (tempDouble = ret$jscomp$14, +Math_abs$jscomp$0(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min$jscomp$0(+Math_floor$jscomp$0(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil$jscomp$0((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)];
        HEAP32$jscomp$0[p$jscomp$0 >> 2] = tempI64[0];
        HEAP32$jscomp$0[p$jscomp$0 + 4 >> 2] = tempI64[1];
        break;
      case "Integer":
        HEAP32$jscomp$0[p$jscomp$0 >> 2] = ret$jscomp$14;
        break;
      case "Float":
        HEAPF32$jscomp$0[p$jscomp$0 >> 2] = ret$jscomp$14;
        break;
      case "Boolean":
        HEAP8$jscomp$0[p$jscomp$0 >> 0] = ret$jscomp$14 ? 1 : 0;
        break;
      default:
        throw "internal glGet error, bad type: " + type$jscomp$127;
    }
  }
  function _glGetIntegerv$jscomp$0(name_$jscomp$1, p$jscomp$1) {
    emscriptenWebGLGet$jscomp$0(name_$jscomp$1, p$jscomp$1, "Integer");
  }
  function _glGetInternalformativ$jscomp$0(target$jscomp$106, internalformat$jscomp$3, pname$jscomp$15, bufSize$jscomp$3, params$jscomp$4) {
    if (bufSize$jscomp$3 < 0) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var samples$jscomp$0 = GLctx$jscomp$0["getInternalformatParameter"](target$jscomp$106, internalformat$jscomp$3, 32937);
    if (!samples$jscomp$0) {
      GL$jscomp$0.recordError(1280);
      return;
    }
    switch(pname$jscomp$15) {
      case 32937:
        var n$jscomp$20 = Math.min(bufSize$jscomp$3, samples$jscomp$0.length);
        var i$jscomp$37 = 0;
        for (; i$jscomp$37 < n$jscomp$20; i$jscomp$37++) {
          var v$jscomp$3 = samples$jscomp$0[i$jscomp$37];
          HEAP32$jscomp$0[params$jscomp$4 + i$jscomp$37 * 4 >> 2] = v$jscomp$3;
        }
        break;
      case 37760:
        if (bufSize$jscomp$3 > 1) {
          v$jscomp$3 = samples$jscomp$0.length;
          HEAP32$jscomp$0[params$jscomp$4 >> 2] = v$jscomp$3;
        }
        break;
      default:
        GL$jscomp$0.recordError(1280);
    }
  }
  function _glGetProgramBinary$jscomp$0(program$jscomp$27, bufSize$jscomp$4, length$jscomp$25, binaryFormat$jscomp$0, binary$jscomp$2) {
    GL$jscomp$0.recordError(1282);
  }
  function _glGetProgramInfoLog$jscomp$0(program$jscomp$28, maxLength$jscomp$0, length$jscomp$26, infoLog$jscomp$0) {
    var log$jscomp$0 = GLctx$jscomp$0.getProgramInfoLog(GL$jscomp$0.programs[program$jscomp$28]);
    if (log$jscomp$0 === null) {
      log$jscomp$0 = "(unknown error)";
    }
    if (maxLength$jscomp$0 > 0 && infoLog$jscomp$0) {
      var numBytesWrittenExclNull$jscomp$3 = stringToUTF8$jscomp$0(log$jscomp$0, infoLog$jscomp$0, maxLength$jscomp$0);
      if (length$jscomp$26) {
        HEAP32$jscomp$0[length$jscomp$26 >> 2] = numBytesWrittenExclNull$jscomp$3;
      }
    } else {
      if (length$jscomp$26) {
        HEAP32$jscomp$0[length$jscomp$26 >> 2] = 0;
      }
    }
  }
  function _glGetProgramiv$jscomp$0(program$jscomp$29, pname$jscomp$16, p$jscomp$2) {
    if (!p$jscomp$2) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    if (program$jscomp$29 >= GL$jscomp$0.counter) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var ptable$jscomp$0 = GL$jscomp$0.programInfos[program$jscomp$29];
    if (!ptable$jscomp$0) {
      GL$jscomp$0.recordError(1282);
      return;
    }
    if (pname$jscomp$16 == 35716) {
      var log$jscomp$1 = GLctx$jscomp$0.getProgramInfoLog(GL$jscomp$0.programs[program$jscomp$29]);
      if (log$jscomp$1 === null) {
        log$jscomp$1 = "(unknown error)";
      }
      HEAP32$jscomp$0[p$jscomp$2 >> 2] = log$jscomp$1.length + 1;
    } else {
      if (pname$jscomp$16 == 35719) {
        HEAP32$jscomp$0[p$jscomp$2 >> 2] = ptable$jscomp$0.maxUniformLength;
      } else {
        if (pname$jscomp$16 == 35722) {
          if (ptable$jscomp$0.maxAttributeLength == -1) {
            program$jscomp$29 = GL$jscomp$0.programs[program$jscomp$29];
            var numAttribs$jscomp$0 = GLctx$jscomp$0.getProgramParameter(program$jscomp$29, GLctx$jscomp$0.ACTIVE_ATTRIBUTES);
            ptable$jscomp$0.maxAttributeLength = 0;
            var i$jscomp$38 = 0;
            for (; i$jscomp$38 < numAttribs$jscomp$0; ++i$jscomp$38) {
              var activeAttrib$jscomp$0 = GLctx$jscomp$0.getActiveAttrib(program$jscomp$29, i$jscomp$38);
              ptable$jscomp$0.maxAttributeLength = Math.max(ptable$jscomp$0.maxAttributeLength, activeAttrib$jscomp$0.name.length + 1);
            }
          }
          HEAP32$jscomp$0[p$jscomp$2 >> 2] = ptable$jscomp$0.maxAttributeLength;
        } else {
          if (pname$jscomp$16 == 35381) {
            if (ptable$jscomp$0.maxUniformBlockNameLength == -1) {
              program$jscomp$29 = GL$jscomp$0.programs[program$jscomp$29];
              var numBlocks$jscomp$0 = GLctx$jscomp$0.getProgramParameter(program$jscomp$29, GLctx$jscomp$0.ACTIVE_UNIFORM_BLOCKS);
              ptable$jscomp$0.maxUniformBlockNameLength = 0;
              i$jscomp$38 = 0;
              for (; i$jscomp$38 < numBlocks$jscomp$0; ++i$jscomp$38) {
                var activeBlockName$jscomp$0 = GLctx$jscomp$0.getActiveUniformBlockName(program$jscomp$29, i$jscomp$38);
                ptable$jscomp$0.maxUniformBlockNameLength = Math.max(ptable$jscomp$0.maxUniformBlockNameLength, activeBlockName$jscomp$0.length + 1);
              }
            }
            HEAP32$jscomp$0[p$jscomp$2 >> 2] = ptable$jscomp$0.maxUniformBlockNameLength;
          } else {
            HEAP32$jscomp$0[p$jscomp$2 >> 2] = GLctx$jscomp$0.getProgramParameter(GL$jscomp$0.programs[program$jscomp$29], pname$jscomp$16);
          }
        }
      }
    }
  }
  function _glGetQueryObjectuiv$jscomp$0(id$jscomp$34, pname$jscomp$17, params$jscomp$5) {
    if (!params$jscomp$5) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var query$jscomp$10 = GL$jscomp$0.queries[id$jscomp$34];
    var param$jscomp$4 = GLctx$jscomp$0["getQueryParameter"](query$jscomp$10, pname$jscomp$17);
    var ret$jscomp$15;
    if (typeof param$jscomp$4 == "boolean") {
      ret$jscomp$15 = param$jscomp$4 ? 1 : 0;
    } else {
      ret$jscomp$15 = param$jscomp$4;
    }
    HEAP32$jscomp$0[params$jscomp$5 >> 2] = ret$jscomp$15;
  }
  function _glGetQueryiv$jscomp$0(target$jscomp$107, pname$jscomp$18, params$jscomp$6) {
    if (!params$jscomp$6) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    HEAP32$jscomp$0[params$jscomp$6 >> 2] = GLctx$jscomp$0["getQuery"](target$jscomp$107, pname$jscomp$18);
  }
  function _glGetRenderbufferParameteriv$jscomp$0(target$jscomp$108, pname$jscomp$19, params$jscomp$7) {
    if (!params$jscomp$7) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    HEAP32$jscomp$0[params$jscomp$7 >> 2] = GLctx$jscomp$0.getRenderbufferParameter(target$jscomp$108, pname$jscomp$19);
  }
  function _glGetShaderInfoLog$jscomp$0(shader$jscomp$14, maxLength$jscomp$1, length$jscomp$27, infoLog$jscomp$1) {
    var log$jscomp$2 = GLctx$jscomp$0.getShaderInfoLog(GL$jscomp$0.shaders[shader$jscomp$14]);
    if (log$jscomp$2 === null) {
      log$jscomp$2 = "(unknown error)";
    }
    if (maxLength$jscomp$1 > 0 && infoLog$jscomp$1) {
      var numBytesWrittenExclNull$jscomp$4 = stringToUTF8$jscomp$0(log$jscomp$2, infoLog$jscomp$1, maxLength$jscomp$1);
      if (length$jscomp$27) {
        HEAP32$jscomp$0[length$jscomp$27 >> 2] = numBytesWrittenExclNull$jscomp$4;
      }
    } else {
      if (length$jscomp$27) {
        HEAP32$jscomp$0[length$jscomp$27 >> 2] = 0;
      }
    }
  }
  function _glGetShaderPrecisionFormat$jscomp$0(shaderType$jscomp$1, precisionType$jscomp$0, range$jscomp$5, precision$jscomp$1) {
    var result$jscomp$10 = GLctx$jscomp$0.getShaderPrecisionFormat(shaderType$jscomp$1, precisionType$jscomp$0);
    HEAP32$jscomp$0[range$jscomp$5 >> 2] = result$jscomp$10.rangeMin;
    HEAP32$jscomp$0[range$jscomp$5 + 4 >> 2] = result$jscomp$10.rangeMax;
    HEAP32$jscomp$0[precision$jscomp$1 >> 2] = result$jscomp$10.precision;
  }
  function _glGetShaderSource$jscomp$0(shader$jscomp$15, bufSize$jscomp$5, length$jscomp$28, source$jscomp$13) {
    var result$jscomp$11 = GLctx$jscomp$0.getShaderSource(GL$jscomp$0.shaders[shader$jscomp$15]);
    if (!result$jscomp$11) {
      return;
    }
    if (bufSize$jscomp$5 > 0 && source$jscomp$13) {
      var numBytesWrittenExclNull$jscomp$5 = stringToUTF8$jscomp$0(result$jscomp$11, source$jscomp$13, bufSize$jscomp$5);
      if (length$jscomp$28) {
        HEAP32$jscomp$0[length$jscomp$28 >> 2] = numBytesWrittenExclNull$jscomp$5;
      }
    } else {
      if (length$jscomp$28) {
        HEAP32$jscomp$0[length$jscomp$28 >> 2] = 0;
      }
    }
  }
  function _glGetShaderiv$jscomp$0(shader$jscomp$16, pname$jscomp$20, p$jscomp$3) {
    if (!p$jscomp$3) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    if (pname$jscomp$20 == 35716) {
      var log$jscomp$3 = GLctx$jscomp$0.getShaderInfoLog(GL$jscomp$0.shaders[shader$jscomp$16]);
      if (log$jscomp$3 === null) {
        log$jscomp$3 = "(unknown error)";
      }
      HEAP32$jscomp$0[p$jscomp$3 >> 2] = log$jscomp$3.length + 1;
    } else {
      if (pname$jscomp$20 == 35720) {
        var source$jscomp$14 = GLctx$jscomp$0.getShaderSource(GL$jscomp$0.shaders[shader$jscomp$16]);
        var sourceLength$jscomp$0 = source$jscomp$14 === null || source$jscomp$14.length == 0 ? 0 : source$jscomp$14.length + 1;
        HEAP32$jscomp$0[p$jscomp$3 >> 2] = sourceLength$jscomp$0;
      } else {
        HEAP32$jscomp$0[p$jscomp$3 >> 2] = GLctx$jscomp$0.getShaderParameter(GL$jscomp$0.shaders[shader$jscomp$16], pname$jscomp$20);
      }
    }
  }
  function _glGetString$jscomp$0(name_$jscomp$2) {
    if (GL$jscomp$0.stringCache[name_$jscomp$2]) {
      return GL$jscomp$0.stringCache[name_$jscomp$2];
    }
    var ret$jscomp$16;
    switch(name_$jscomp$2) {
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        ret$jscomp$16 = allocate$jscomp$0(intArrayFromString$jscomp$0(GLctx$jscomp$0.getParameter(name_$jscomp$2)), "i8", ALLOC_NORMAL$jscomp$0);
        break;
      case 7938:
        var glVersion$jscomp$0 = GLctx$jscomp$0.getParameter(GLctx$jscomp$0.VERSION);
        if (GLctx$jscomp$0.canvas.GLctxObject.version >= 2) {
          glVersion$jscomp$0 = "OpenGL ES 3.0 (" + glVersion$jscomp$0 + ")";
        } else {
          glVersion$jscomp$0 = "OpenGL ES 2.0 (" + glVersion$jscomp$0 + ")";
        }
        ret$jscomp$16 = allocate$jscomp$0(intArrayFromString$jscomp$0(glVersion$jscomp$0), "i8", ALLOC_NORMAL$jscomp$0);
        break;
      case 7939:
        var exts$jscomp$1 = GLctx$jscomp$0.getSupportedExtensions();
        var gl_exts$jscomp$0 = [];
        var i$jscomp$39 = 0;
        for (; i$jscomp$39 < exts$jscomp$1.length; ++i$jscomp$39) {
          gl_exts$jscomp$0.push(exts$jscomp$1[i$jscomp$39]);
          gl_exts$jscomp$0.push("GL_" + exts$jscomp$1[i$jscomp$39]);
        }
        ret$jscomp$16 = allocate$jscomp$0(intArrayFromString$jscomp$0(gl_exts$jscomp$0.join(" ")), "i8", ALLOC_NORMAL$jscomp$0);
        break;
      case 35724:
        var glslVersion$jscomp$0 = GLctx$jscomp$0.getParameter(GLctx$jscomp$0.SHADING_LANGUAGE_VERSION);
        var ver_re$jscomp$0 = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
        var ver_num$jscomp$0 = glslVersion$jscomp$0.match(ver_re$jscomp$0);
        if (ver_num$jscomp$0 !== null) {
          if (ver_num$jscomp$0[1].length == 3) {
            ver_num$jscomp$0[1] = ver_num$jscomp$0[1] + "0";
          }
          glslVersion$jscomp$0 = "OpenGL ES GLSL ES " + ver_num$jscomp$0[1] + " (" + glslVersion$jscomp$0 + ")";
        }
        ret$jscomp$16 = allocate$jscomp$0(intArrayFromString$jscomp$0(glslVersion$jscomp$0), "i8", ALLOC_NORMAL$jscomp$0);
        break;
      default:
        GL$jscomp$0.recordError(1280);
        return 0;
    }
    GL$jscomp$0.stringCache[name_$jscomp$2] = ret$jscomp$16;
    return ret$jscomp$16;
  }
  function _glGetStringi$jscomp$0(name$jscomp$71, index$jscomp$64) {
    if (GLctx$jscomp$0.canvas.GLctxObject.version < 2) {
      GL$jscomp$0.recordError(1282);
      return 0;
    }
    var stringiCache$jscomp$0 = GL$jscomp$0.stringiCache[name$jscomp$71];
    if (stringiCache$jscomp$0) {
      if (index$jscomp$64 < 0 || index$jscomp$64 >= stringiCache$jscomp$0.length) {
        GL$jscomp$0.recordError(1281);
        return 0;
      }
      return stringiCache$jscomp$0[index$jscomp$64];
    }
    switch(name$jscomp$71) {
      case 7939:
        var exts$jscomp$2 = GLctx$jscomp$0.getSupportedExtensions();
        var gl_exts$jscomp$1 = [];
        var i$jscomp$40 = 0;
        for (; i$jscomp$40 < exts$jscomp$2.length; ++i$jscomp$40) {
          gl_exts$jscomp$1.push(allocate$jscomp$0(intArrayFromString$jscomp$0(exts$jscomp$2[i$jscomp$40]), "i8", ALLOC_NORMAL$jscomp$0));
          gl_exts$jscomp$1.push(allocate$jscomp$0(intArrayFromString$jscomp$0("GL_" + exts$jscomp$2[i$jscomp$40]), "i8", ALLOC_NORMAL$jscomp$0));
        }
        stringiCache$jscomp$0 = GL$jscomp$0.stringiCache[name$jscomp$71] = gl_exts$jscomp$1;
        if (index$jscomp$64 < 0 || index$jscomp$64 >= stringiCache$jscomp$0.length) {
          GL$jscomp$0.recordError(1281);
          return 0;
        }
        return stringiCache$jscomp$0[index$jscomp$64];
      default:
        GL$jscomp$0.recordError(1280);
        return 0;
    }
  }
  function _glGetTexParameteriv$jscomp$0(target$jscomp$109, pname$jscomp$21, params$jscomp$8) {
    if (!params$jscomp$8) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    HEAP32$jscomp$0[params$jscomp$8 >> 2] = GLctx$jscomp$0.getTexParameter(target$jscomp$109, pname$jscomp$21);
  }
  function _glGetUniformBlockIndex$jscomp$0(program$jscomp$30, uniformBlockName$jscomp$1) {
    program$jscomp$30 = GL$jscomp$0.programs[program$jscomp$30];
    uniformBlockName$jscomp$1 = Pointer_stringify$jscomp$0(uniformBlockName$jscomp$1);
    return GLctx$jscomp$0["getUniformBlockIndex"](program$jscomp$30, uniformBlockName$jscomp$1);
  }
  function _glGetUniformIndices$jscomp$0(program$jscomp$31, uniformCount$jscomp$1, uniformNames$jscomp$0, uniformIndices$jscomp$1) {
    if (!uniformIndices$jscomp$1) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    if (uniformCount$jscomp$1 > 0 && (uniformNames$jscomp$0 == 0 || uniformIndices$jscomp$1 == 0)) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    program$jscomp$31 = GL$jscomp$0.programs[program$jscomp$31];
    var names$jscomp$0 = [];
    var i$jscomp$41 = 0;
    for (; i$jscomp$41 < uniformCount$jscomp$1; i$jscomp$41++) {
      names$jscomp$0.push(Pointer_stringify$jscomp$0(HEAP32$jscomp$0[uniformNames$jscomp$0 + i$jscomp$41 * 4 >> 2]));
    }
    var result$jscomp$12 = GLctx$jscomp$0["getUniformIndices"](program$jscomp$31, names$jscomp$0);
    if (!result$jscomp$12) {
      return;
    }
    var len$jscomp$4 = result$jscomp$12.length;
    i$jscomp$41 = 0;
    for (; i$jscomp$41 < len$jscomp$4; i$jscomp$41++) {
      HEAP32$jscomp$0[uniformIndices$jscomp$1 + i$jscomp$41 * 4 >> 2] = result$jscomp$12[i$jscomp$41];
    }
  }
  function _glGetUniformLocation$jscomp$0(program$jscomp$32, name$jscomp$72) {
    name$jscomp$72 = Pointer_stringify$jscomp$0(name$jscomp$72);
    var arrayOffset$jscomp$0 = 0;
    if (name$jscomp$72.indexOf("]", name$jscomp$72.length - 1) !== -1) {
      var ls$jscomp$0 = name$jscomp$72.lastIndexOf("[");
      var arrayIndex$jscomp$0 = name$jscomp$72.slice(ls$jscomp$0 + 1, -1);
      if (arrayIndex$jscomp$0.length > 0) {
        arrayOffset$jscomp$0 = parseInt(arrayIndex$jscomp$0);
        if (arrayOffset$jscomp$0 < 0) {
          return -1;
        }
      }
      name$jscomp$72 = name$jscomp$72.slice(0, ls$jscomp$0);
    }
    var ptable$jscomp$1 = GL$jscomp$0.programInfos[program$jscomp$32];
    if (!ptable$jscomp$1) {
      return -1;
    }
    var utable$jscomp$0 = ptable$jscomp$1.uniforms;
    var uniformInfo$jscomp$0 = utable$jscomp$0[name$jscomp$72];
    if (uniformInfo$jscomp$0 && arrayOffset$jscomp$0 < uniformInfo$jscomp$0[0]) {
      return uniformInfo$jscomp$0[1] + arrayOffset$jscomp$0;
    } else {
      return -1;
    }
  }
  function emscriptenWebGLGetUniform$jscomp$0(program$jscomp$33, location$jscomp$21, params$jscomp$9, type$jscomp$128) {
    if (!params$jscomp$9) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var data$jscomp$40 = GLctx$jscomp$0.getUniform(GL$jscomp$0.programs[program$jscomp$33], GL$jscomp$0.uniforms[location$jscomp$21]);
    if (typeof data$jscomp$40 == "number" || typeof data$jscomp$40 == "boolean") {
      switch(type$jscomp$128) {
        case "Integer":
          HEAP32$jscomp$0[params$jscomp$9 >> 2] = data$jscomp$40;
          break;
        case "Float":
          HEAPF32$jscomp$0[params$jscomp$9 >> 2] = data$jscomp$40;
          break;
        default:
          throw "internal emscriptenWebGLGetUniform() error, bad type: " + type$jscomp$128;
      }
    } else {
      var i$jscomp$42 = 0;
      for (; i$jscomp$42 < data$jscomp$40.length; i$jscomp$42++) {
        switch(type$jscomp$128) {
          case "Integer":
            HEAP32$jscomp$0[params$jscomp$9 + i$jscomp$42 * 4 >> 2] = data$jscomp$40[i$jscomp$42];
            break;
          case "Float":
            HEAPF32$jscomp$0[params$jscomp$9 + i$jscomp$42 * 4 >> 2] = data$jscomp$40[i$jscomp$42];
            break;
          default:
            throw "internal emscriptenWebGLGetUniform() error, bad type: " + type$jscomp$128;
        }
      }
    }
  }
  function _glGetUniformiv$jscomp$0(program$jscomp$34, location$jscomp$22, params$jscomp$10) {
    emscriptenWebGLGetUniform$jscomp$0(program$jscomp$34, location$jscomp$22, params$jscomp$10, "Integer");
  }
  function emscriptenWebGLGetVertexAttrib$jscomp$0(index$jscomp$65, pname$jscomp$22, params$jscomp$11, type$jscomp$129) {
    if (!params$jscomp$11) {
      GL$jscomp$0.recordError(1281);
      return;
    }
    var data$jscomp$41 = GLctx$jscomp$0.getVertexAttrib(index$jscomp$65, pname$jscomp$22);
    if (pname$jscomp$22 == 34975) {
      HEAP32$jscomp$0[params$jscomp$11 >> 2] = data$jscomp$41["name"];
    } else {
      if (typeof data$jscomp$41 == "number" || typeof data$jscomp$41 == "boolean") {
        switch(type$jscomp$129) {
          case "Integer":
            HEAP32$jscomp$0[params$jscomp$11 >> 2] = data$jscomp$41;
            break;
          case "Float":
            HEAPF32$jscomp$0[params$jscomp$11 >> 2] = data$jscomp$41;
            break;
          case "FloatToInteger":
            HEAP32$jscomp$0[params$jscomp$11 >> 2] = Math.fround(data$jscomp$41);
            break;
          default:
            throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type$jscomp$129;
        }
      } else {
        var i$jscomp$43 = 0;
        for (; i$jscomp$43 < data$jscomp$41.length; i$jscomp$43++) {
          switch(type$jscomp$129) {
            case "Integer":
              HEAP32$jscomp$0[params$jscomp$11 + i$jscomp$43 * 4 >> 2] = data$jscomp$41[i$jscomp$43];
              break;
            case "Float":
              HEAPF32$jscomp$0[params$jscomp$11 + i$jscomp$43 * 4 >> 2] = data$jscomp$41[i$jscomp$43];
              break;
            case "FloatToInteger":
              HEAP32$jscomp$0[params$jscomp$11 + i$jscomp$43 * 4 >> 2] = Math.fround(data$jscomp$41[i$jscomp$43]);
              break;
            default:
              throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type$jscomp$129;
          }
        }
      }
    }
  }
  function _glGetVertexAttribiv$jscomp$0(index$jscomp$66, pname$jscomp$23, params$jscomp$12) {
    emscriptenWebGLGetVertexAttrib$jscomp$0(index$jscomp$66, pname$jscomp$23, params$jscomp$12, "FloatToInteger");
  }
  function _glInvalidateFramebuffer$jscomp$0(target$jscomp$110, numAttachments$jscomp$0, attachments$jscomp$0) {
    var list$jscomp$0 = GL$jscomp$0.tempFixedLengthArray[numAttachments$jscomp$0];
    var i$jscomp$44 = 0;
    for (; i$jscomp$44 < numAttachments$jscomp$0; i$jscomp$44++) {
      list$jscomp$0[i$jscomp$44] = HEAP32$jscomp$0[attachments$jscomp$0 + i$jscomp$44 * 4 >> 2];
    }
    GLctx$jscomp$0["invalidateFramebuffer"](target$jscomp$110, list$jscomp$0);
  }
  function _glIsEnabled$jscomp$0(x0$jscomp$24) {
    return GLctx$jscomp$0["isEnabled"](x0$jscomp$24);
  }
  function _glIsVertexArray$jscomp$0(array$jscomp$6) {
    var vao$jscomp$2 = GL$jscomp$0.vaos[array$jscomp$6];
    if (!vao$jscomp$2) {
      return 0;
    }
    return GLctx$jscomp$0["isVertexArray"](vao$jscomp$2);
  }
  function _glLinkProgram$jscomp$0(program$jscomp$35) {
    GLctx$jscomp$0.linkProgram(GL$jscomp$0.programs[program$jscomp$35]);
    GL$jscomp$0.programInfos[program$jscomp$35] = null;
    GL$jscomp$0.populateUniformTable(program$jscomp$35);
  }
  function _glMapBufferRange$jscomp$0(target$jscomp$111, offset$jscomp$21, length$jscomp$29, access$jscomp$0) {
    if (access$jscomp$0 != 26 && access$jscomp$0 != 10) {
      err$jscomp$3("glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER");
      return 0;
    }
    if (!emscriptenWebGLValidateMapBufferTarget$jscomp$0(target$jscomp$111)) {
      GL$jscomp$0.recordError(1280);
      err$jscomp$3("GL_INVALID_ENUM in glMapBufferRange");
      return 0;
    }
    var mem$jscomp$0 = _malloc$jscomp$0(length$jscomp$29);
    if (!mem$jscomp$0) {
      return 0;
    }
    GL$jscomp$0.mappedBuffers[emscriptenWebGLGetBufferBinding$jscomp$0(target$jscomp$111)] = {
      offset : offset$jscomp$21,
      length : length$jscomp$29,
      mem : mem$jscomp$0,
      access : access$jscomp$0
    };
    return mem$jscomp$0;
  }
  function _glPixelStorei$jscomp$0(pname$jscomp$24, param$jscomp$5) {
    if (pname$jscomp$24 == 3333) {
      GL$jscomp$0.packAlignment = param$jscomp$5;
    } else {
      if (pname$jscomp$24 == 3317) {
        GL$jscomp$0.unpackAlignment = param$jscomp$5;
      }
    }
    GLctx$jscomp$0.pixelStorei(pname$jscomp$24, param$jscomp$5);
  }
  function _glPolygonOffset$jscomp$0(x0$jscomp$25, x1$jscomp$13) {
    GLctx$jscomp$0["polygonOffset"](x0$jscomp$25, x1$jscomp$13);
  }
  function _glProgramBinary$jscomp$0(program$jscomp$36, binaryFormat$jscomp$1, binary$jscomp$3, length$jscomp$30) {
    GL$jscomp$0.recordError(1280);
  }
  function _glProgramParameteri$jscomp$0(program$jscomp$37, pname$jscomp$25, value$jscomp$93) {
    GL$jscomp$0.recordError(1280);
  }
  function _glReadBuffer$jscomp$0(x0$jscomp$26) {
    GLctx$jscomp$0["readBuffer"](x0$jscomp$26);
  }
  function emscriptenWebGLComputeImageSize$jscomp$0(width$jscomp$22, height$jscomp$20, sizePerPixel$jscomp$0, alignment$jscomp$0) {
    function roundedToNextMultipleOf$jscomp$0(x$jscomp$80, y$jscomp$63) {
      return Math.floor((x$jscomp$80 + y$jscomp$63 - 1) / y$jscomp$63) * y$jscomp$63;
    }
    var plainRowSize$jscomp$0 = width$jscomp$22 * sizePerPixel$jscomp$0;
    var alignedRowSize$jscomp$0 = roundedToNextMultipleOf$jscomp$0(plainRowSize$jscomp$0, alignment$jscomp$0);
    return height$jscomp$20 <= 0 ? 0 : (height$jscomp$20 - 1) * alignedRowSize$jscomp$0 + plainRowSize$jscomp$0;
  }
  function emscriptenWebGLGetTexPixelData$jscomp$0(type$jscomp$130, format$jscomp$15, width$jscomp$23, height$jscomp$21, pixels$jscomp$1, internalFormat$jscomp$2) {
    var sizePerPixel$jscomp$1;
    var numChannels$jscomp$0;
    switch(format$jscomp$15) {
      case 6406:
      case 6409:
      case 6402:
      case 6403:
      case 36244:
        numChannels$jscomp$0 = 1;
        break;
      case 6410:
      case 33319:
      case 33320:
        numChannels$jscomp$0 = 2;
        break;
      case 6407:
      case 35904:
      case 36248:
        numChannels$jscomp$0 = 3;
        break;
      case 6408:
      case 35906:
      case 36249:
        numChannels$jscomp$0 = 4;
        break;
      default:
        GL$jscomp$0.recordError(1280);
        return null;
    }
    switch(type$jscomp$130) {
      case 5121:
      case 5120:
        sizePerPixel$jscomp$1 = numChannels$jscomp$0 * 1;
        break;
      case 5123:
      case 36193:
      case 5131:
      case 5122:
        sizePerPixel$jscomp$1 = numChannels$jscomp$0 * 2;
        break;
      case 5125:
      case 5126:
      case 5124:
        sizePerPixel$jscomp$1 = numChannels$jscomp$0 * 4;
        break;
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        sizePerPixel$jscomp$1 = 4;
        break;
      case 33635:
      case 32819:
      case 32820:
        sizePerPixel$jscomp$1 = 2;
        break;
      default:
        GL$jscomp$0.recordError(1280);
        return null;
    }
    var bytes$jscomp$0 = emscriptenWebGLComputeImageSize$jscomp$0(width$jscomp$23, height$jscomp$21, sizePerPixel$jscomp$1, GL$jscomp$0.unpackAlignment);
    switch(type$jscomp$130) {
      case 5120:
        return HEAP8$jscomp$0.subarray(pixels$jscomp$1, pixels$jscomp$1 + bytes$jscomp$0);
      case 5121:
        return HEAPU8$jscomp$0.subarray(pixels$jscomp$1, pixels$jscomp$1 + bytes$jscomp$0);
      case 5122:
        return HEAP16$jscomp$0.subarray(pixels$jscomp$1 >> 1, pixels$jscomp$1 + bytes$jscomp$0 >> 1);
      case 5124:
        return HEAP32$jscomp$0.subarray(pixels$jscomp$1 >> 2, pixels$jscomp$1 + bytes$jscomp$0 >> 2);
      case 5126:
        return HEAPF32$jscomp$0.subarray(pixels$jscomp$1 >> 2, pixels$jscomp$1 + bytes$jscomp$0 >> 2);
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return HEAPU32$jscomp$0.subarray(pixels$jscomp$1 >> 2, pixels$jscomp$1 + bytes$jscomp$0 >> 2);
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return HEAPU16$jscomp$0.subarray(pixels$jscomp$1 >> 1, pixels$jscomp$1 + bytes$jscomp$0 >> 1);
      default:
        GL$jscomp$0.recordError(1280);
        return null;
    }
  }
  function emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$131) {
    switch(type$jscomp$131) {
      case 5120:
        return HEAP8$jscomp$0;
      case 5121:
        return HEAPU8$jscomp$0;
      case 5122:
        return HEAP16$jscomp$0;
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return HEAPU16$jscomp$0;
      case 5124:
        return HEAP32$jscomp$0;
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return HEAPU32$jscomp$0;
      case 5126:
        return HEAPF32$jscomp$0;
      default:
        return null;
    }
  }
  function emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$132) {
    switch(type$jscomp$132) {
      case 5120:
      case 5121:
        return 0;
      case 5122:
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return 1;
      case 5124:
      case 5126:
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return 2;
      default:
        return 0;
    }
  }
  function _glReadPixels$jscomp$0(x$jscomp$81, y$jscomp$64, width$jscomp$24, height$jscomp$22, format$jscomp$16, type$jscomp$133, pixels$jscomp$2) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      if (GLctx$jscomp$0.currentPixelPackBufferBinding) {
        GLctx$jscomp$0.readPixels(x$jscomp$81, y$jscomp$64, width$jscomp$24, height$jscomp$22, format$jscomp$16, type$jscomp$133, pixels$jscomp$2);
      } else {
        GLctx$jscomp$0.readPixels(x$jscomp$81, y$jscomp$64, width$jscomp$24, height$jscomp$22, format$jscomp$16, type$jscomp$133, emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$133), pixels$jscomp$2 >> emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$133));
      }
      return;
    }
    var pixelData$jscomp$0 = emscriptenWebGLGetTexPixelData$jscomp$0(type$jscomp$133, format$jscomp$16, width$jscomp$24, height$jscomp$22, pixels$jscomp$2, format$jscomp$16);
    if (!pixelData$jscomp$0) {
      GL$jscomp$0.recordError(1280);
      return;
    }
    GLctx$jscomp$0.readPixels(x$jscomp$81, y$jscomp$64, width$jscomp$24, height$jscomp$22, format$jscomp$16, type$jscomp$133, pixelData$jscomp$0);
  }
  function _glRenderbufferStorage$jscomp$0(x0$jscomp$27, x1$jscomp$14, x2$jscomp$10, x3$jscomp$7) {
    GLctx$jscomp$0["renderbufferStorage"](x0$jscomp$27, x1$jscomp$14, x2$jscomp$10, x3$jscomp$7);
  }
  function _glRenderbufferStorageMultisample$jscomp$0(x0$jscomp$28, x1$jscomp$15, x2$jscomp$11, x3$jscomp$8, x4$jscomp$4) {
    GLctx$jscomp$0["renderbufferStorageMultisample"](x0$jscomp$28, x1$jscomp$15, x2$jscomp$11, x3$jscomp$8, x4$jscomp$4);
  }
  function _glSamplerParameteri$jscomp$0(sampler$jscomp$3, pname$jscomp$26, param$jscomp$6) {
    GLctx$jscomp$0["samplerParameteri"](sampler$jscomp$3 ? GL$jscomp$0.samplers[sampler$jscomp$3] : null, pname$jscomp$26, param$jscomp$6);
  }
  function _glScissor$jscomp$0(x0$jscomp$29, x1$jscomp$16, x2$jscomp$12, x3$jscomp$9) {
    GLctx$jscomp$0["scissor"](x0$jscomp$29, x1$jscomp$16, x2$jscomp$12, x3$jscomp$9);
  }
  function _glShaderSource$jscomp$0(shader$jscomp$17, count$jscomp$21, string$jscomp$3, length$jscomp$31) {
    var source$jscomp$15 = GL$jscomp$0.getSource(shader$jscomp$17, count$jscomp$21, string$jscomp$3, length$jscomp$31);
    GLctx$jscomp$0.shaderSource(GL$jscomp$0.shaders[shader$jscomp$17], source$jscomp$15);
  }
  function _glStencilFuncSeparate$jscomp$0(x0$jscomp$30, x1$jscomp$17, x2$jscomp$13, x3$jscomp$10) {
    GLctx$jscomp$0["stencilFuncSeparate"](x0$jscomp$30, x1$jscomp$17, x2$jscomp$13, x3$jscomp$10);
  }
  function _glStencilMask$jscomp$0(x0$jscomp$31) {
    GLctx$jscomp$0["stencilMask"](x0$jscomp$31);
  }
  function _glStencilOpSeparate$jscomp$0(x0$jscomp$32, x1$jscomp$18, x2$jscomp$14, x3$jscomp$11) {
    GLctx$jscomp$0["stencilOpSeparate"](x0$jscomp$32, x1$jscomp$18, x2$jscomp$14, x3$jscomp$11);
  }
  function _glTexImage2D$jscomp$0(target$jscomp$112, level$jscomp$13, internalFormat$jscomp$3, width$jscomp$25, height$jscomp$23, border$jscomp$4, format$jscomp$17, type$jscomp$134, pixels$jscomp$3) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      if (GLctx$jscomp$0.currentPixelUnpackBufferBinding) {
        GLctx$jscomp$0.texImage2D(target$jscomp$112, level$jscomp$13, internalFormat$jscomp$3, width$jscomp$25, height$jscomp$23, border$jscomp$4, format$jscomp$17, type$jscomp$134, pixels$jscomp$3);
      } else {
        if (pixels$jscomp$3 != 0) {
          GLctx$jscomp$0.texImage2D(target$jscomp$112, level$jscomp$13, internalFormat$jscomp$3, width$jscomp$25, height$jscomp$23, border$jscomp$4, format$jscomp$17, type$jscomp$134, emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$134), pixels$jscomp$3 >> emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$134));
        } else {
          GLctx$jscomp$0.texImage2D(target$jscomp$112, level$jscomp$13, internalFormat$jscomp$3, width$jscomp$25, height$jscomp$23, border$jscomp$4, format$jscomp$17, type$jscomp$134, null);
        }
      }
      return;
    }
    var pixelData$jscomp$1 = null;
    if (pixels$jscomp$3) {
      pixelData$jscomp$1 = emscriptenWebGLGetTexPixelData$jscomp$0(type$jscomp$134, format$jscomp$17, width$jscomp$25, height$jscomp$23, pixels$jscomp$3, internalFormat$jscomp$3);
    }
    GLctx$jscomp$0.texImage2D(target$jscomp$112, level$jscomp$13, internalFormat$jscomp$3, width$jscomp$25, height$jscomp$23, border$jscomp$4, format$jscomp$17, type$jscomp$134, pixelData$jscomp$1);
  }
  function _glTexImage3D$jscomp$0(target$jscomp$113, level$jscomp$14, internalFormat$jscomp$4, width$jscomp$26, height$jscomp$24, depth$jscomp$3, border$jscomp$5, format$jscomp$18, type$jscomp$135, pixels$jscomp$4) {
    if (GLctx$jscomp$0.currentPixelUnpackBufferBinding) {
      GLctx$jscomp$0["texImage3D"](target$jscomp$113, level$jscomp$14, internalFormat$jscomp$4, width$jscomp$26, height$jscomp$24, depth$jscomp$3, border$jscomp$5, format$jscomp$18, type$jscomp$135, pixels$jscomp$4);
    } else {
      if (pixels$jscomp$4 != 0) {
        GLctx$jscomp$0["texImage3D"](target$jscomp$113, level$jscomp$14, internalFormat$jscomp$4, width$jscomp$26, height$jscomp$24, depth$jscomp$3, border$jscomp$5, format$jscomp$18, type$jscomp$135, emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$135), pixels$jscomp$4 >> emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$135));
      } else {
        GLctx$jscomp$0["texImage3D"](target$jscomp$113, level$jscomp$14, internalFormat$jscomp$4, width$jscomp$26, height$jscomp$24, depth$jscomp$3, border$jscomp$5, format$jscomp$18, type$jscomp$135, null);
      }
    }
  }
  function _glTexParameterf$jscomp$0(x0$jscomp$33, x1$jscomp$19, x2$jscomp$15) {
    GLctx$jscomp$0["texParameterf"](x0$jscomp$33, x1$jscomp$19, x2$jscomp$15);
  }
  function _glTexParameteri$jscomp$0(x0$jscomp$34, x1$jscomp$20, x2$jscomp$16) {
    GLctx$jscomp$0["texParameteri"](x0$jscomp$34, x1$jscomp$20, x2$jscomp$16);
  }
  function _glTexParameteriv$jscomp$0(target$jscomp$114, pname$jscomp$27, params$jscomp$13) {
    var param$jscomp$7 = HEAP32$jscomp$0[params$jscomp$13 >> 2];
    GLctx$jscomp$0.texParameteri(target$jscomp$114, pname$jscomp$27, param$jscomp$7);
  }
  function _glTexStorage2D$jscomp$0(x0$jscomp$35, x1$jscomp$21, x2$jscomp$17, x3$jscomp$12, x4$jscomp$5) {
    GLctx$jscomp$0["texStorage2D"](x0$jscomp$35, x1$jscomp$21, x2$jscomp$17, x3$jscomp$12, x4$jscomp$5);
  }
  function _glTexStorage3D$jscomp$0(x0$jscomp$36, x1$jscomp$22, x2$jscomp$18, x3$jscomp$13, x4$jscomp$6, x5$jscomp$3) {
    GLctx$jscomp$0["texStorage3D"](x0$jscomp$36, x1$jscomp$22, x2$jscomp$18, x3$jscomp$13, x4$jscomp$6, x5$jscomp$3);
  }
  function _glTexSubImage2D$jscomp$0(target$jscomp$115, level$jscomp$15, xoffset$jscomp$5, yoffset$jscomp$5, width$jscomp$27, height$jscomp$25, format$jscomp$19, type$jscomp$136, pixels$jscomp$5) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      if (GLctx$jscomp$0.currentPixelUnpackBufferBinding) {
        GLctx$jscomp$0.texSubImage2D(target$jscomp$115, level$jscomp$15, xoffset$jscomp$5, yoffset$jscomp$5, width$jscomp$27, height$jscomp$25, format$jscomp$19, type$jscomp$136, pixels$jscomp$5);
      } else {
        if (pixels$jscomp$5 != 0) {
          GLctx$jscomp$0.texSubImage2D(target$jscomp$115, level$jscomp$15, xoffset$jscomp$5, yoffset$jscomp$5, width$jscomp$27, height$jscomp$25, format$jscomp$19, type$jscomp$136, emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$136), pixels$jscomp$5 >> emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$136));
        } else {
          GLctx$jscomp$0.texSubImage2D(target$jscomp$115, level$jscomp$15, xoffset$jscomp$5, yoffset$jscomp$5, width$jscomp$27, height$jscomp$25, format$jscomp$19, type$jscomp$136, null);
        }
      }
      return;
    }
    var pixelData$jscomp$2 = null;
    if (pixels$jscomp$5) {
      pixelData$jscomp$2 = emscriptenWebGLGetTexPixelData$jscomp$0(type$jscomp$136, format$jscomp$19, width$jscomp$27, height$jscomp$25, pixels$jscomp$5, 0);
    }
    GLctx$jscomp$0.texSubImage2D(target$jscomp$115, level$jscomp$15, xoffset$jscomp$5, yoffset$jscomp$5, width$jscomp$27, height$jscomp$25, format$jscomp$19, type$jscomp$136, pixelData$jscomp$2);
  }
  function _glTexSubImage3D$jscomp$0(target$jscomp$116, level$jscomp$16, xoffset$jscomp$6, yoffset$jscomp$6, zoffset$jscomp$1, width$jscomp$28, height$jscomp$26, depth$jscomp$4, format$jscomp$20, type$jscomp$137, pixels$jscomp$6) {
    if (GLctx$jscomp$0.currentPixelUnpackBufferBinding) {
      GLctx$jscomp$0["texSubImage3D"](target$jscomp$116, level$jscomp$16, xoffset$jscomp$6, yoffset$jscomp$6, zoffset$jscomp$1, width$jscomp$28, height$jscomp$26, depth$jscomp$4, format$jscomp$20, type$jscomp$137, pixels$jscomp$6);
    } else {
      if (pixels$jscomp$6 != 0) {
        GLctx$jscomp$0["texSubImage3D"](target$jscomp$116, level$jscomp$16, xoffset$jscomp$6, yoffset$jscomp$6, zoffset$jscomp$1, width$jscomp$28, height$jscomp$26, depth$jscomp$4, format$jscomp$20, type$jscomp$137, emscriptenWebGLGetHeapForType$jscomp$0(type$jscomp$137), pixels$jscomp$6 >> emscriptenWebGLGetShiftForType$jscomp$0(type$jscomp$137));
      } else {
        GLctx$jscomp$0["texSubImage3D"](target$jscomp$116, level$jscomp$16, xoffset$jscomp$6, yoffset$jscomp$6, zoffset$jscomp$1, width$jscomp$28, height$jscomp$26, depth$jscomp$4, format$jscomp$20, type$jscomp$137, null);
      }
    }
  }
  function _glTransformFeedbackVaryings$jscomp$0(program$jscomp$38, count$jscomp$22, varyings$jscomp$0, bufferMode$jscomp$0) {
    program$jscomp$38 = GL$jscomp$0.programs[program$jscomp$38];
    var vars$jscomp$0 = [];
    var i$jscomp$45 = 0;
    for (; i$jscomp$45 < count$jscomp$22; i$jscomp$45++) {
      vars$jscomp$0.push(Pointer_stringify$jscomp$0(HEAP32$jscomp$0[varyings$jscomp$0 + i$jscomp$45 * 4 >> 2]));
    }
    GLctx$jscomp$0["transformFeedbackVaryings"](program$jscomp$38, vars$jscomp$0, bufferMode$jscomp$0);
  }
  function _glUniform1fv$jscomp$0(location$jscomp$23, count$jscomp$23, value$jscomp$94) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform1fv(GL$jscomp$0.uniforms[location$jscomp$23], HEAPF32$jscomp$0, value$jscomp$94 >> 2, count$jscomp$23);
      return;
    }
    var view$jscomp$5;
    if (count$jscomp$23 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$5 = GL$jscomp$0.miniTempBufferViews[count$jscomp$23 - 1];
      var i$jscomp$46 = 0;
      for (; i$jscomp$46 < count$jscomp$23; ++i$jscomp$46) {
        view$jscomp$5[i$jscomp$46] = HEAPF32$jscomp$0[value$jscomp$94 + 4 * i$jscomp$46 >> 2];
      }
    } else {
      view$jscomp$5 = HEAPF32$jscomp$0.subarray(value$jscomp$94 >> 2, value$jscomp$94 + count$jscomp$23 * 4 >> 2);
    }
    GLctx$jscomp$0.uniform1fv(GL$jscomp$0.uniforms[location$jscomp$23], view$jscomp$5);
  }
  function _glUniform1i$jscomp$0(location$jscomp$24, v0$jscomp$0) {
    GLctx$jscomp$0.uniform1i(GL$jscomp$0.uniforms[location$jscomp$24], v0$jscomp$0);
  }
  function _glUniform1iv$jscomp$0(location$jscomp$25, count$jscomp$24, value$jscomp$95) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform1iv(GL$jscomp$0.uniforms[location$jscomp$25], HEAP32$jscomp$0, value$jscomp$95 >> 2, count$jscomp$24);
      return;
    }
    GLctx$jscomp$0.uniform1iv(GL$jscomp$0.uniforms[location$jscomp$25], HEAP32$jscomp$0.subarray(value$jscomp$95 >> 2, value$jscomp$95 + count$jscomp$24 * 4 >> 2));
  }
  function _glUniform1uiv$jscomp$0(location$jscomp$26, count$jscomp$25, value$jscomp$96) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform1uiv(GL$jscomp$0.uniforms[location$jscomp$26], HEAPU32$jscomp$0, value$jscomp$96 >> 2, count$jscomp$25);
    } else {
      GLctx$jscomp$0.uniform1uiv(GL$jscomp$0.uniforms[location$jscomp$26], HEAPU32$jscomp$0.subarray(value$jscomp$96 >> 2, value$jscomp$96 + count$jscomp$25 * 4 >> 2));
    }
  }
  function _glUniform2fv$jscomp$0(location$jscomp$27, count$jscomp$26, value$jscomp$97) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform2fv(GL$jscomp$0.uniforms[location$jscomp$27], HEAPF32$jscomp$0, value$jscomp$97 >> 2, count$jscomp$26 * 2);
      return;
    }
    var view$jscomp$6;
    if (2 * count$jscomp$26 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$6 = GL$jscomp$0.miniTempBufferViews[2 * count$jscomp$26 - 1];
      var i$jscomp$47 = 0;
      for (; i$jscomp$47 < 2 * count$jscomp$26; i$jscomp$47 = i$jscomp$47 + 2) {
        view$jscomp$6[i$jscomp$47] = HEAPF32$jscomp$0[value$jscomp$97 + 4 * i$jscomp$47 >> 2];
        view$jscomp$6[i$jscomp$47 + 1] = HEAPF32$jscomp$0[value$jscomp$97 + (4 * i$jscomp$47 + 4) >> 2];
      }
    } else {
      view$jscomp$6 = HEAPF32$jscomp$0.subarray(value$jscomp$97 >> 2, value$jscomp$97 + count$jscomp$26 * 8 >> 2);
    }
    GLctx$jscomp$0.uniform2fv(GL$jscomp$0.uniforms[location$jscomp$27], view$jscomp$6);
  }
  function _glUniform2iv$jscomp$0(location$jscomp$28, count$jscomp$27, value$jscomp$98) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform2iv(GL$jscomp$0.uniforms[location$jscomp$28], HEAP32$jscomp$0, value$jscomp$98 >> 2, count$jscomp$27 * 2);
      return;
    }
    GLctx$jscomp$0.uniform2iv(GL$jscomp$0.uniforms[location$jscomp$28], HEAP32$jscomp$0.subarray(value$jscomp$98 >> 2, value$jscomp$98 + count$jscomp$27 * 8 >> 2));
  }
  function _glUniform2uiv$jscomp$0(location$jscomp$29, count$jscomp$28, value$jscomp$99) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform2uiv(GL$jscomp$0.uniforms[location$jscomp$29], HEAPU32$jscomp$0, value$jscomp$99 >> 2, count$jscomp$28 * 2);
    } else {
      GLctx$jscomp$0.uniform2uiv(GL$jscomp$0.uniforms[location$jscomp$29], HEAPU32$jscomp$0.subarray(value$jscomp$99 >> 2, value$jscomp$99 + count$jscomp$28 * 8 >> 2));
    }
  }
  function _glUniform3fv$jscomp$0(location$jscomp$30, count$jscomp$29, value$jscomp$100) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform3fv(GL$jscomp$0.uniforms[location$jscomp$30], HEAPF32$jscomp$0, value$jscomp$100 >> 2, count$jscomp$29 * 3);
      return;
    }
    var view$jscomp$7;
    if (3 * count$jscomp$29 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$7 = GL$jscomp$0.miniTempBufferViews[3 * count$jscomp$29 - 1];
      var i$jscomp$48 = 0;
      for (; i$jscomp$48 < 3 * count$jscomp$29; i$jscomp$48 = i$jscomp$48 + 3) {
        view$jscomp$7[i$jscomp$48] = HEAPF32$jscomp$0[value$jscomp$100 + 4 * i$jscomp$48 >> 2];
        view$jscomp$7[i$jscomp$48 + 1] = HEAPF32$jscomp$0[value$jscomp$100 + (4 * i$jscomp$48 + 4) >> 2];
        view$jscomp$7[i$jscomp$48 + 2] = HEAPF32$jscomp$0[value$jscomp$100 + (4 * i$jscomp$48 + 8) >> 2];
      }
    } else {
      view$jscomp$7 = HEAPF32$jscomp$0.subarray(value$jscomp$100 >> 2, value$jscomp$100 + count$jscomp$29 * 12 >> 2);
    }
    GLctx$jscomp$0.uniform3fv(GL$jscomp$0.uniforms[location$jscomp$30], view$jscomp$7);
  }
  function _glUniform3iv$jscomp$0(location$jscomp$31, count$jscomp$30, value$jscomp$101) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform3iv(GL$jscomp$0.uniforms[location$jscomp$31], HEAP32$jscomp$0, value$jscomp$101 >> 2, count$jscomp$30 * 3);
      return;
    }
    GLctx$jscomp$0.uniform3iv(GL$jscomp$0.uniforms[location$jscomp$31], HEAP32$jscomp$0.subarray(value$jscomp$101 >> 2, value$jscomp$101 + count$jscomp$30 * 12 >> 2));
  }
  function _glUniform3uiv$jscomp$0(location$jscomp$32, count$jscomp$31, value$jscomp$102) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform3uiv(GL$jscomp$0.uniforms[location$jscomp$32], HEAPU32$jscomp$0, value$jscomp$102 >> 2, count$jscomp$31 * 3);
    } else {
      GLctx$jscomp$0.uniform3uiv(GL$jscomp$0.uniforms[location$jscomp$32], HEAPU32$jscomp$0.subarray(value$jscomp$102 >> 2, value$jscomp$102 + count$jscomp$31 * 12 >> 2));
    }
  }
  function _glUniform4fv$jscomp$0(location$jscomp$33, count$jscomp$32, value$jscomp$103) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform4fv(GL$jscomp$0.uniforms[location$jscomp$33], HEAPF32$jscomp$0, value$jscomp$103 >> 2, count$jscomp$32 * 4);
      return;
    }
    var view$jscomp$8;
    if (4 * count$jscomp$32 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$8 = GL$jscomp$0.miniTempBufferViews[4 * count$jscomp$32 - 1];
      var i$jscomp$49 = 0;
      for (; i$jscomp$49 < 4 * count$jscomp$32; i$jscomp$49 = i$jscomp$49 + 4) {
        view$jscomp$8[i$jscomp$49] = HEAPF32$jscomp$0[value$jscomp$103 + 4 * i$jscomp$49 >> 2];
        view$jscomp$8[i$jscomp$49 + 1] = HEAPF32$jscomp$0[value$jscomp$103 + (4 * i$jscomp$49 + 4) >> 2];
        view$jscomp$8[i$jscomp$49 + 2] = HEAPF32$jscomp$0[value$jscomp$103 + (4 * i$jscomp$49 + 8) >> 2];
        view$jscomp$8[i$jscomp$49 + 3] = HEAPF32$jscomp$0[value$jscomp$103 + (4 * i$jscomp$49 + 12) >> 2];
      }
    } else {
      view$jscomp$8 = HEAPF32$jscomp$0.subarray(value$jscomp$103 >> 2, value$jscomp$103 + count$jscomp$32 * 16 >> 2);
    }
    GLctx$jscomp$0.uniform4fv(GL$jscomp$0.uniforms[location$jscomp$33], view$jscomp$8);
  }
  function _glUniform4iv$jscomp$0(location$jscomp$34, count$jscomp$33, value$jscomp$104) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform4iv(GL$jscomp$0.uniforms[location$jscomp$34], HEAP32$jscomp$0, value$jscomp$104 >> 2, count$jscomp$33 * 4);
      return;
    }
    GLctx$jscomp$0.uniform4iv(GL$jscomp$0.uniforms[location$jscomp$34], HEAP32$jscomp$0.subarray(value$jscomp$104 >> 2, value$jscomp$104 + count$jscomp$33 * 16 >> 2));
  }
  function _glUniform4uiv$jscomp$0(location$jscomp$35, count$jscomp$34, value$jscomp$105) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniform4uiv(GL$jscomp$0.uniforms[location$jscomp$35], HEAPU32$jscomp$0, value$jscomp$105 >> 2, count$jscomp$34 * 4);
    } else {
      GLctx$jscomp$0.uniform4uiv(GL$jscomp$0.uniforms[location$jscomp$35], HEAPU32$jscomp$0.subarray(value$jscomp$105 >> 2, value$jscomp$105 + count$jscomp$34 * 16 >> 2));
    }
  }
  function _glUniformBlockBinding$jscomp$0(program$jscomp$39, uniformBlockIndex$jscomp$2, uniformBlockBinding$jscomp$0) {
    program$jscomp$39 = GL$jscomp$0.programs[program$jscomp$39];
    GLctx$jscomp$0["uniformBlockBinding"](program$jscomp$39, uniformBlockIndex$jscomp$2, uniformBlockBinding$jscomp$0);
  }
  function _glUniformMatrix3fv$jscomp$0(location$jscomp$36, count$jscomp$35, transpose$jscomp$3, value$jscomp$106) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniformMatrix3fv(GL$jscomp$0.uniforms[location$jscomp$36], !!transpose$jscomp$3, HEAPF32$jscomp$0, value$jscomp$106 >> 2, count$jscomp$35 * 9);
      return;
    }
    var view$jscomp$9;
    if (9 * count$jscomp$35 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$9 = GL$jscomp$0.miniTempBufferViews[9 * count$jscomp$35 - 1];
      var i$jscomp$50 = 0;
      for (; i$jscomp$50 < 9 * count$jscomp$35; i$jscomp$50 = i$jscomp$50 + 9) {
        view$jscomp$9[i$jscomp$50] = HEAPF32$jscomp$0[value$jscomp$106 + 4 * i$jscomp$50 >> 2];
        view$jscomp$9[i$jscomp$50 + 1] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 4) >> 2];
        view$jscomp$9[i$jscomp$50 + 2] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 8) >> 2];
        view$jscomp$9[i$jscomp$50 + 3] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 12) >> 2];
        view$jscomp$9[i$jscomp$50 + 4] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 16) >> 2];
        view$jscomp$9[i$jscomp$50 + 5] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 20) >> 2];
        view$jscomp$9[i$jscomp$50 + 6] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 24) >> 2];
        view$jscomp$9[i$jscomp$50 + 7] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 28) >> 2];
        view$jscomp$9[i$jscomp$50 + 8] = HEAPF32$jscomp$0[value$jscomp$106 + (4 * i$jscomp$50 + 32) >> 2];
      }
    } else {
      view$jscomp$9 = HEAPF32$jscomp$0.subarray(value$jscomp$106 >> 2, value$jscomp$106 + count$jscomp$35 * 36 >> 2);
    }
    GLctx$jscomp$0.uniformMatrix3fv(GL$jscomp$0.uniforms[location$jscomp$36], !!transpose$jscomp$3, view$jscomp$9);
  }
  function _glUniformMatrix4fv$jscomp$0(location$jscomp$37, count$jscomp$36, transpose$jscomp$4, value$jscomp$107) {
    if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
      GLctx$jscomp$0.uniformMatrix4fv(GL$jscomp$0.uniforms[location$jscomp$37], !!transpose$jscomp$4, HEAPF32$jscomp$0, value$jscomp$107 >> 2, count$jscomp$36 * 16);
      return;
    }
    var view$jscomp$10;
    if (16 * count$jscomp$36 <= GL$jscomp$0.MINI_TEMP_BUFFER_SIZE) {
      view$jscomp$10 = GL$jscomp$0.miniTempBufferViews[16 * count$jscomp$36 - 1];
      var i$jscomp$51 = 0;
      for (; i$jscomp$51 < 16 * count$jscomp$36; i$jscomp$51 = i$jscomp$51 + 16) {
        view$jscomp$10[i$jscomp$51] = HEAPF32$jscomp$0[value$jscomp$107 + 4 * i$jscomp$51 >> 2];
        view$jscomp$10[i$jscomp$51 + 1] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 4) >> 2];
        view$jscomp$10[i$jscomp$51 + 2] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 8) >> 2];
        view$jscomp$10[i$jscomp$51 + 3] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 12) >> 2];
        view$jscomp$10[i$jscomp$51 + 4] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 16) >> 2];
        view$jscomp$10[i$jscomp$51 + 5] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 20) >> 2];
        view$jscomp$10[i$jscomp$51 + 6] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 24) >> 2];
        view$jscomp$10[i$jscomp$51 + 7] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 28) >> 2];
        view$jscomp$10[i$jscomp$51 + 8] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 32) >> 2];
        view$jscomp$10[i$jscomp$51 + 9] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 36) >> 2];
        view$jscomp$10[i$jscomp$51 + 10] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 40) >> 2];
        view$jscomp$10[i$jscomp$51 + 11] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 44) >> 2];
        view$jscomp$10[i$jscomp$51 + 12] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 48) >> 2];
        view$jscomp$10[i$jscomp$51 + 13] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 52) >> 2];
        view$jscomp$10[i$jscomp$51 + 14] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 56) >> 2];
        view$jscomp$10[i$jscomp$51 + 15] = HEAPF32$jscomp$0[value$jscomp$107 + (4 * i$jscomp$51 + 60) >> 2];
      }
    } else {
      view$jscomp$10 = HEAPF32$jscomp$0.subarray(value$jscomp$107 >> 2, value$jscomp$107 + count$jscomp$36 * 64 >> 2);
    }
    GLctx$jscomp$0.uniformMatrix4fv(GL$jscomp$0.uniforms[location$jscomp$37], !!transpose$jscomp$4, view$jscomp$10);
  }
  function _glUnmapBuffer$jscomp$0(target$jscomp$117) {
    if (!emscriptenWebGLValidateMapBufferTarget$jscomp$0(target$jscomp$117)) {
      GL$jscomp$0.recordError(1280);
      err$jscomp$3("GL_INVALID_ENUM in glUnmapBuffer");
      return 0;
    }
    var buffer$jscomp$28 = emscriptenWebGLGetBufferBinding$jscomp$0(target$jscomp$117);
    var mapping$jscomp$1 = GL$jscomp$0.mappedBuffers[buffer$jscomp$28];
    if (!mapping$jscomp$1) {
      GL$jscomp$0.recordError(1282);
      Module$jscomp$0.printError("buffer was never mapped in glUnmapBuffer");
      return 0;
    }
    GL$jscomp$0.mappedBuffers[buffer$jscomp$28] = null;
    if (!(mapping$jscomp$1.access & 16)) {
      if (GL$jscomp$0.currentContext.supportsWebGL2EntryPoints) {
        GLctx$jscomp$0.bufferSubData(target$jscomp$117, mapping$jscomp$1.offset, HEAPU8$jscomp$0, mapping$jscomp$1.mem, mapping$jscomp$1.length);
      } else {
        GLctx$jscomp$0.bufferSubData(target$jscomp$117, mapping$jscomp$1.offset, HEAPU8$jscomp$0.subarray(mapping$jscomp$1.mem, mapping$jscomp$1.mem + mapping$jscomp$1.length));
      }
    }
    _free$jscomp$0(mapping$jscomp$1.mem);
    return 1;
  }
  function _glUseProgram$jscomp$0(program$jscomp$40) {
    GLctx$jscomp$0.useProgram(program$jscomp$40 ? GL$jscomp$0.programs[program$jscomp$40] : null);
  }
  function _glValidateProgram$jscomp$0(program$jscomp$41) {
    GLctx$jscomp$0.validateProgram(GL$jscomp$0.programs[program$jscomp$41]);
  }
  function _glVertexAttrib4f$jscomp$0(x0$jscomp$37, x1$jscomp$23, x2$jscomp$19, x3$jscomp$14, x4$jscomp$7) {
    GLctx$jscomp$0["vertexAttrib4f"](x0$jscomp$37, x1$jscomp$23, x2$jscomp$19, x3$jscomp$14, x4$jscomp$7);
  }
  function _glVertexAttrib4fv$jscomp$0(index$jscomp$67, v$jscomp$4) {
    GLctx$jscomp$0.vertexAttrib4f(index$jscomp$67, HEAPF32$jscomp$0[v$jscomp$4 >> 2], HEAPF32$jscomp$0[v$jscomp$4 + 4 >> 2], HEAPF32$jscomp$0[v$jscomp$4 + 8 >> 2], HEAPF32$jscomp$0[v$jscomp$4 + 12 >> 2]);
  }
  function _glVertexAttribIPointer$jscomp$0(index$jscomp$68, size$jscomp$30, type$jscomp$138, stride$jscomp$1, ptr$jscomp$21) {
    var cb$jscomp$2 = GL$jscomp$0.currentContext.clientBuffers[index$jscomp$68];
    if (!GL$jscomp$0.currArrayBuffer) {
      cb$jscomp$2.size = size$jscomp$30;
      cb$jscomp$2.type = type$jscomp$138;
      cb$jscomp$2.normalized = false;
      cb$jscomp$2.stride = stride$jscomp$1;
      cb$jscomp$2.ptr = ptr$jscomp$21;
      cb$jscomp$2.clientside = true;
      return;
    }
    cb$jscomp$2.clientside = false;
    GLctx$jscomp$0.vertexAttribIPointer(index$jscomp$68, size$jscomp$30, type$jscomp$138, stride$jscomp$1, ptr$jscomp$21);
  }
  function _glVertexAttribPointer$jscomp$0(index$jscomp$69, size$jscomp$31, type$jscomp$139, normalized$jscomp$1, stride$jscomp$2, ptr$jscomp$22) {
    GLctx$jscomp$0.vertexAttribPointer(index$jscomp$69, size$jscomp$31, type$jscomp$139, !!normalized$jscomp$1, stride$jscomp$2, ptr$jscomp$22);
  }
  function _glViewport$jscomp$0(x0$jscomp$38, x1$jscomp$24, x2$jscomp$20, x3$jscomp$15) {
    GLctx$jscomp$0["viewport"](x0$jscomp$38, x1$jscomp$24, x2$jscomp$20, x3$jscomp$15);
  }
  function _gmtime_r$jscomp$0(time$jscomp$0, tmPtr$jscomp$0) {
    var date$jscomp$2 = new Date(HEAP32$jscomp$0[time$jscomp$0 >> 2] * 1E3);
    HEAP32$jscomp$0[tmPtr$jscomp$0 >> 2] = date$jscomp$2.getUTCSeconds();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 4 >> 2] = date$jscomp$2.getUTCMinutes();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 8 >> 2] = date$jscomp$2.getUTCHours();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 12 >> 2] = date$jscomp$2.getUTCDate();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 16 >> 2] = date$jscomp$2.getUTCMonth();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 20 >> 2] = date$jscomp$2.getUTCFullYear() - 1900;
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 24 >> 2] = date$jscomp$2.getUTCDay();
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 36 >> 2] = 0;
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 32 >> 2] = 0;
    var start$jscomp$10 = Date.UTC(date$jscomp$2.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
    var yday$jscomp$0 = (date$jscomp$2.getTime() - start$jscomp$10) / (1E3 * 60 * 60 * 24) | 0;
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 28 >> 2] = yday$jscomp$0;
    HEAP32$jscomp$0[tmPtr$jscomp$0 + 40 >> 2] = ___tm_timezone$jscomp$0;
    return tmPtr$jscomp$0;
  }
  function _gmtime$jscomp$0(time$jscomp$1) {
    return _gmtime_r$jscomp$0(time$jscomp$1, ___tm_current$jscomp$0);
  }
  function _llvm_copysign_f64$jscomp$0(x$jscomp$82, y$jscomp$65) {
    return y$jscomp$65 < 0 || y$jscomp$65 === 0 && 1 / y$jscomp$65 < 0 ? -Math_abs$jscomp$0(x$jscomp$82) : Math_abs$jscomp$0(x$jscomp$82);
  }
  function _llvm_cttz_i32$jscomp$0(x$jscomp$83) {
    x$jscomp$83 = x$jscomp$83 | 0;
    return (x$jscomp$83 ? 31 - (Math_clz32$jscomp$0(x$jscomp$83 ^ x$jscomp$83 - 1) | 0) | 0 : 32) | 0;
  }
  function _llvm_eh_typeid_for$jscomp$0(type$jscomp$140) {
    return type$jscomp$140;
  }
  function _llvm_exp2_f32$jscomp$0(x$jscomp$84) {
    return Math.pow(2, x$jscomp$84);
  }
  function _llvm_log10_f32$jscomp$0(x$jscomp$85) {
    return Math.log(x$jscomp$85) / Math.LN10;
  }
  function _llvm_log2_f32$jscomp$0(x$jscomp$86) {
    return Math.log(x$jscomp$86) / Math.LN2;
  }
  function _llvm_trap$jscomp$0() {
    abort$jscomp$0("trap!");
  }
  function _tzset$jscomp$0() {
    function extractZone$jscomp$0(date$jscomp$3) {
      var match$jscomp$0 = date$jscomp$3.toTimeString().match(/\(([A-Za-z ]+)\)$/);
      return match$jscomp$0 ? match$jscomp$0[1] : "GMT";
    }
    if (_tzset$jscomp$0.called) {
      return;
    }
    _tzset$jscomp$0.called = true;
    HEAP32$jscomp$0[__get_timezone$jscomp$0() >> 2] = (new Date).getTimezoneOffset() * 60;
    var currentYear$jscomp$0 = (new Date).getFullYear();
    var winter$jscomp$0 = new Date(currentYear$jscomp$0, 0, 1);
    var summer$jscomp$0 = new Date(currentYear$jscomp$0, 6, 1);
    HEAP32$jscomp$0[__get_daylight$jscomp$0() >> 2] = Number(winter$jscomp$0.getTimezoneOffset() != summer$jscomp$0.getTimezoneOffset());
    var winterName$jscomp$0 = extractZone$jscomp$0(winter$jscomp$0);
    var summerName$jscomp$0 = extractZone$jscomp$0(summer$jscomp$0);
    var winterNamePtr$jscomp$0 = allocate$jscomp$0(intArrayFromString$jscomp$0(winterName$jscomp$0), "i8", ALLOC_NORMAL$jscomp$0);
    var summerNamePtr$jscomp$0 = allocate$jscomp$0(intArrayFromString$jscomp$0(summerName$jscomp$0), "i8", ALLOC_NORMAL$jscomp$0);
    if (summer$jscomp$0.getTimezoneOffset() < winter$jscomp$0.getTimezoneOffset()) {
      HEAP32$jscomp$0[__get_tzname$jscomp$0() >> 2] = winterNamePtr$jscomp$0;
      HEAP32$jscomp$0[__get_tzname$jscomp$0() + 4 >> 2] = summerNamePtr$jscomp$0;
    } else {
      HEAP32$jscomp$0[__get_tzname$jscomp$0() >> 2] = summerNamePtr$jscomp$0;
      HEAP32$jscomp$0[__get_tzname$jscomp$0() + 4 >> 2] = winterNamePtr$jscomp$0;
    }
  }
  function _localtime_r$jscomp$0(time$jscomp$2, tmPtr$jscomp$1) {
    _tzset$jscomp$0();
    var date$jscomp$4 = new Date(HEAP32$jscomp$0[time$jscomp$2 >> 2] * 1E3);
    HEAP32$jscomp$0[tmPtr$jscomp$1 >> 2] = date$jscomp$4.getSeconds();
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 4 >> 2] = date$jscomp$4.getMinutes();
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 8 >> 2] = date$jscomp$4.getHours();
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 12 >> 2] = date$jscomp$4.getDate();
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 16 >> 2] = date$jscomp$4.getMonth();
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 20 >> 2] = date$jscomp$4.getFullYear() - 1900;
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 24 >> 2] = date$jscomp$4.getDay();
    var start$jscomp$11 = new Date(date$jscomp$4.getFullYear(), 0, 1);
    var yday$jscomp$1 = (date$jscomp$4.getTime() - start$jscomp$11.getTime()) / (1E3 * 60 * 60 * 24) | 0;
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 28 >> 2] = yday$jscomp$1;
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 36 >> 2] = -(date$jscomp$4.getTimezoneOffset() * 60);
    var summerOffset$jscomp$0 = (new Date(date$jscomp$4.getFullYear(), 6, 1)).getTimezoneOffset();
    var winterOffset$jscomp$0 = start$jscomp$11.getTimezoneOffset();
    var dst$jscomp$0 = (summerOffset$jscomp$0 != winterOffset$jscomp$0 && date$jscomp$4.getTimezoneOffset() == Math.min(winterOffset$jscomp$0, summerOffset$jscomp$0)) | 0;
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 32 >> 2] = dst$jscomp$0;
    var zonePtr$jscomp$0 = HEAP32$jscomp$0[__get_tzname$jscomp$0() + (dst$jscomp$0 ? 4 : 0) >> 2];
    HEAP32$jscomp$0[tmPtr$jscomp$1 + 40 >> 2] = zonePtr$jscomp$0;
    return tmPtr$jscomp$1;
  }
  function _localtime$jscomp$0(time$jscomp$3) {
    return _localtime_r$jscomp$0(time$jscomp$3, ___tm_current$jscomp$0);
  }
  function _longjmp$jscomp$0(env$jscomp$2, value$jscomp$108) {
    Module$jscomp$0["setThrew"](env$jscomp$2, value$jscomp$108 || 1);
    throw "longjmp";
  }
  function _emscripten_memcpy_big$jscomp$0(dest$jscomp$1, src$jscomp$2, num$jscomp$5) {
    HEAPU8$jscomp$0.set(HEAPU8$jscomp$0.subarray(src$jscomp$2, src$jscomp$2 + num$jscomp$5), dest$jscomp$1);
    return dest$jscomp$1;
  }
  function _mktime$jscomp$0(tmPtr$jscomp$2) {
    _tzset$jscomp$0();
    var date$jscomp$5 = new Date(HEAP32$jscomp$0[tmPtr$jscomp$2 + 20 >> 2] + 1900, HEAP32$jscomp$0[tmPtr$jscomp$2 + 16 >> 2], HEAP32$jscomp$0[tmPtr$jscomp$2 + 12 >> 2], HEAP32$jscomp$0[tmPtr$jscomp$2 + 8 >> 2], HEAP32$jscomp$0[tmPtr$jscomp$2 + 4 >> 2], HEAP32$jscomp$0[tmPtr$jscomp$2 >> 2], 0);
    var dst$jscomp$1 = HEAP32$jscomp$0[tmPtr$jscomp$2 + 32 >> 2];
    var guessedOffset$jscomp$0 = date$jscomp$5.getTimezoneOffset();
    var start$jscomp$12 = new Date(date$jscomp$5.getFullYear(), 0, 1);
    var summerOffset$jscomp$1 = (new Date(date$jscomp$5.getFullYear(), 6, 1)).getTimezoneOffset();
    var winterOffset$jscomp$1 = start$jscomp$12.getTimezoneOffset();
    var dstOffset$jscomp$0 = Math.min(winterOffset$jscomp$1, summerOffset$jscomp$1);
    if (dst$jscomp$1 < 0) {
      HEAP32$jscomp$0[tmPtr$jscomp$2 + 32 >> 2] = Number(summerOffset$jscomp$1 != winterOffset$jscomp$1 && dstOffset$jscomp$0 == guessedOffset$jscomp$0);
    } else {
      if (dst$jscomp$1 > 0 != (dstOffset$jscomp$0 == guessedOffset$jscomp$0)) {
        var nonDstOffset$jscomp$0 = Math.max(winterOffset$jscomp$1, summerOffset$jscomp$1);
        var trueOffset$jscomp$0 = dst$jscomp$1 > 0 ? dstOffset$jscomp$0 : nonDstOffset$jscomp$0;
        date$jscomp$5.setTime(date$jscomp$5.getTime() + (trueOffset$jscomp$0 - guessedOffset$jscomp$0) * 6E4);
      }
    }
    HEAP32$jscomp$0[tmPtr$jscomp$2 + 24 >> 2] = date$jscomp$5.getDay();
    var yday$jscomp$2 = (date$jscomp$5.getTime() - start$jscomp$12.getTime()) / (1E3 * 60 * 60 * 24) | 0;
    HEAP32$jscomp$0[tmPtr$jscomp$2 + 28 >> 2] = yday$jscomp$2;
    return date$jscomp$5.getTime() / 1E3 | 0;
  }
  function _usleep$jscomp$0(useconds$jscomp$0) {
    var msec$jscomp$0 = useconds$jscomp$0 / 1E3;
    if ((ENVIRONMENT_IS_WEB$jscomp$0 || ENVIRONMENT_IS_WORKER$jscomp$0) && self["performance"] && self["performance"]["now"]) {
      var start$jscomp$13 = self["performance"]["now"]();
      for (; self["performance"]["now"]() - start$jscomp$13 < msec$jscomp$0;) {
      }
    } else {
      start$jscomp$13 = Date.now();
      for (; Date.now() - start$jscomp$13 < msec$jscomp$0;) {
      }
    }
    return 0;
  }
  function _nanosleep$jscomp$0(rqtp$jscomp$0, rmtp$jscomp$0) {
    var seconds$jscomp$0 = HEAP32$jscomp$0[rqtp$jscomp$0 >> 2];
    var nanoseconds$jscomp$0 = HEAP32$jscomp$0[rqtp$jscomp$0 + 4 >> 2];
    if (rmtp$jscomp$0 !== 0) {
      HEAP32$jscomp$0[rmtp$jscomp$0 >> 2] = 0;
      HEAP32$jscomp$0[rmtp$jscomp$0 + 4 >> 2] = 0;
    }
    return _usleep$jscomp$0(seconds$jscomp$0 * 1E6 + nanoseconds$jscomp$0 / 1E3);
  }
  function _pthread_getspecific$jscomp$0(key$jscomp$38) {
    return PTHREAD_SPECIFIC$jscomp$0[key$jscomp$38] || 0;
  }
  function _pthread_key_create$jscomp$0(key$jscomp$39, destructor$jscomp$1) {
    if (key$jscomp$39 == 0) {
      return ERRNO_CODES$jscomp$0.EINVAL;
    }
    HEAP32$jscomp$0[key$jscomp$39 >> 2] = PTHREAD_SPECIFIC_NEXT_KEY$jscomp$0;
    PTHREAD_SPECIFIC$jscomp$0[PTHREAD_SPECIFIC_NEXT_KEY$jscomp$0] = 0;
    PTHREAD_SPECIFIC_NEXT_KEY$jscomp$0++;
    return 0;
  }
  function _pthread_once$jscomp$0(ptr$jscomp$23, func$jscomp$14) {
    if (!_pthread_once$jscomp$0.seen) {
      _pthread_once$jscomp$0.seen = {};
    }
    if (ptr$jscomp$23 in _pthread_once$jscomp$0.seen) {
      return;
    }
    Module$jscomp$0["dynCall_v"](func$jscomp$14);
    _pthread_once$jscomp$0.seen[ptr$jscomp$23] = 1;
  }
  function _pthread_setspecific$jscomp$0(key$jscomp$40, value$jscomp$109) {
    if (!(key$jscomp$40 in PTHREAD_SPECIFIC$jscomp$0)) {
      return ERRNO_CODES$jscomp$0.EINVAL;
    }
    PTHREAD_SPECIFIC$jscomp$0[key$jscomp$40] = value$jscomp$109;
    return 0;
  }
  function _setenv$jscomp$0(envname$jscomp$0, envval$jscomp$0, overwrite$jscomp$0) {
    if (envname$jscomp$0 === 0) {
      ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
      return -1;
    }
    var name$jscomp$73 = Pointer_stringify$jscomp$0(envname$jscomp$0);
    var val$jscomp$1 = Pointer_stringify$jscomp$0(envval$jscomp$0);
    if (name$jscomp$73 === "" || name$jscomp$73.indexOf("=") !== -1) {
      ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
      return -1;
    }
    if (ENV$jscomp$0.hasOwnProperty(name$jscomp$73) && !overwrite$jscomp$0) {
      return 0;
    }
    ENV$jscomp$0[name$jscomp$73] = val$jscomp$1;
    ___buildEnvironment$jscomp$0(__get_environ$jscomp$0());
    return 0;
  }
  function _sigaction$jscomp$0(signum$jscomp$0, act$jscomp$0, oldact$jscomp$0) {
    return 0;
  }
  function _sigemptyset$jscomp$0(set$jscomp$0) {
    HEAP32$jscomp$0[set$jscomp$0 >> 2] = 0;
    return 0;
  }
  function __isLeapYear$jscomp$0(year$jscomp$1) {
    return year$jscomp$1 % 4 === 0 && (year$jscomp$1 % 100 !== 0 || year$jscomp$1 % 400 === 0);
  }
  function __arraySum$jscomp$0(array$jscomp$7, index$jscomp$70) {
    var sum$jscomp$0 = 0;
    var i$jscomp$52 = 0;
    for (; i$jscomp$52 <= index$jscomp$70; sum$jscomp$0 = sum$jscomp$0 + array$jscomp$7[i$jscomp$52++]) {
    }
    return sum$jscomp$0;
  }
  function __addDays$jscomp$0(date$jscomp$6, days$jscomp$0) {
    var newDate$jscomp$0 = new Date(date$jscomp$6.getTime());
    for (; days$jscomp$0 > 0;) {
      var leap$jscomp$0 = __isLeapYear$jscomp$0(newDate$jscomp$0.getFullYear());
      var currentMonth$jscomp$0 = newDate$jscomp$0.getMonth();
      var daysInCurrentMonth$jscomp$0 = (leap$jscomp$0 ? __MONTH_DAYS_LEAP$jscomp$0 : __MONTH_DAYS_REGULAR$jscomp$0)[currentMonth$jscomp$0];
      if (days$jscomp$0 > daysInCurrentMonth$jscomp$0 - newDate$jscomp$0.getDate()) {
        days$jscomp$0 = days$jscomp$0 - (daysInCurrentMonth$jscomp$0 - newDate$jscomp$0.getDate() + 1);
        newDate$jscomp$0.setDate(1);
        if (currentMonth$jscomp$0 < 11) {
          newDate$jscomp$0.setMonth(currentMonth$jscomp$0 + 1);
        } else {
          newDate$jscomp$0.setMonth(0);
          newDate$jscomp$0.setFullYear(newDate$jscomp$0.getFullYear() + 1);
        }
      } else {
        newDate$jscomp$0.setDate(newDate$jscomp$0.getDate() + days$jscomp$0);
        return newDate$jscomp$0;
      }
    }
    return newDate$jscomp$0;
  }
  function _strftime$jscomp$0(s$jscomp$3, maxsize$jscomp$0, format$jscomp$21, tm$jscomp$0) {
    function leadingSomething$jscomp$0(value$jscomp$110, digits$jscomp$0, character$jscomp$0) {
      var str$jscomp$17 = typeof value$jscomp$110 === "number" ? value$jscomp$110.toString() : value$jscomp$110 || "";
      for (; str$jscomp$17.length < digits$jscomp$0;) {
        str$jscomp$17 = character$jscomp$0[0] + str$jscomp$17;
      }
      return str$jscomp$17;
    }
    function leadingNulls$jscomp$0(value$jscomp$111, digits$jscomp$1) {
      return leadingSomething$jscomp$0(value$jscomp$111, digits$jscomp$1, "0");
    }
    function compareByDay$jscomp$0(date1$jscomp$0, date2$jscomp$0) {
      function sgn$jscomp$0(value$jscomp$112) {
        return value$jscomp$112 < 0 ? -1 : value$jscomp$112 > 0 ? 1 : 0;
      }
      var compare$jscomp$0;
      if ((compare$jscomp$0 = sgn$jscomp$0(date1$jscomp$0.getFullYear() - date2$jscomp$0.getFullYear())) === 0) {
        if ((compare$jscomp$0 = sgn$jscomp$0(date1$jscomp$0.getMonth() - date2$jscomp$0.getMonth())) === 0) {
          compare$jscomp$0 = sgn$jscomp$0(date1$jscomp$0.getDate() - date2$jscomp$0.getDate());
        }
      }
      return compare$jscomp$0;
    }
    function getFirstWeekStartDate$jscomp$0(janFourth$jscomp$0) {
      switch(janFourth$jscomp$0.getDay()) {
        case 0:
          return new Date(janFourth$jscomp$0.getFullYear() - 1, 11, 29);
        case 1:
          return janFourth$jscomp$0;
        case 2:
          return new Date(janFourth$jscomp$0.getFullYear(), 0, 3);
        case 3:
          return new Date(janFourth$jscomp$0.getFullYear(), 0, 2);
        case 4:
          return new Date(janFourth$jscomp$0.getFullYear(), 0, 1);
        case 5:
          return new Date(janFourth$jscomp$0.getFullYear() - 1, 11, 31);
        case 6:
          return new Date(janFourth$jscomp$0.getFullYear() - 1, 11, 30);
      }
    }
    function getWeekBasedYear$jscomp$0(date$jscomp$8) {
      var thisDate$jscomp$0 = __addDays$jscomp$0(new Date(date$jscomp$8.tm_year + 1900, 0, 1), date$jscomp$8.tm_yday);
      var janFourthThisYear$jscomp$0 = new Date(thisDate$jscomp$0.getFullYear(), 0, 4);
      var janFourthNextYear$jscomp$0 = new Date(thisDate$jscomp$0.getFullYear() + 1, 0, 4);
      var firstWeekStartThisYear$jscomp$0 = getFirstWeekStartDate$jscomp$0(janFourthThisYear$jscomp$0);
      var firstWeekStartNextYear$jscomp$0 = getFirstWeekStartDate$jscomp$0(janFourthNextYear$jscomp$0);
      if (compareByDay$jscomp$0(firstWeekStartThisYear$jscomp$0, thisDate$jscomp$0) <= 0) {
        if (compareByDay$jscomp$0(firstWeekStartNextYear$jscomp$0, thisDate$jscomp$0) <= 0) {
          return thisDate$jscomp$0.getFullYear() + 1;
        } else {
          return thisDate$jscomp$0.getFullYear();
        }
      } else {
        return thisDate$jscomp$0.getFullYear() - 1;
      }
    }
    var tm_zone$jscomp$0 = HEAP32$jscomp$0[tm$jscomp$0 + 40 >> 2];
    var date$jscomp$7 = {
      tm_sec : HEAP32$jscomp$0[tm$jscomp$0 >> 2],
      tm_min : HEAP32$jscomp$0[tm$jscomp$0 + 4 >> 2],
      tm_hour : HEAP32$jscomp$0[tm$jscomp$0 + 8 >> 2],
      tm_mday : HEAP32$jscomp$0[tm$jscomp$0 + 12 >> 2],
      tm_mon : HEAP32$jscomp$0[tm$jscomp$0 + 16 >> 2],
      tm_year : HEAP32$jscomp$0[tm$jscomp$0 + 20 >> 2],
      tm_wday : HEAP32$jscomp$0[tm$jscomp$0 + 24 >> 2],
      tm_yday : HEAP32$jscomp$0[tm$jscomp$0 + 28 >> 2],
      tm_isdst : HEAP32$jscomp$0[tm$jscomp$0 + 32 >> 2],
      tm_gmtoff : HEAP32$jscomp$0[tm$jscomp$0 + 36 >> 2],
      tm_zone : tm_zone$jscomp$0 ? Pointer_stringify$jscomp$0(tm_zone$jscomp$0) : ""
    };
    var pattern$jscomp$4 = Pointer_stringify$jscomp$0(format$jscomp$21);
    var EXPANSION_RULES_1$jscomp$0 = {
      "%c" : "%a %b %d %H:%M:%S %Y",
      "%D" : "%m/%d/%y",
      "%F" : "%Y-%m-%d",
      "%h" : "%b",
      "%r" : "%I:%M:%S %p",
      "%R" : "%H:%M",
      "%T" : "%H:%M:%S",
      "%x" : "%m/%d/%y",
      "%X" : "%H:%M:%S"
    };
    var rule$jscomp$2;
    for (rule$jscomp$2 in EXPANSION_RULES_1$jscomp$0) {
      pattern$jscomp$4 = pattern$jscomp$4.replace(new RegExp(rule$jscomp$2, "g"), EXPANSION_RULES_1$jscomp$0[rule$jscomp$2]);
    }
    var WEEKDAYS$jscomp$0 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MONTHS$jscomp$0 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var EXPANSION_RULES_2$jscomp$0 = {
      "%a" : function(date$jscomp$9) {
        return WEEKDAYS$jscomp$0[date$jscomp$9.tm_wday].substring(0, 3);
      },
      "%A" : function(date$jscomp$10) {
        return WEEKDAYS$jscomp$0[date$jscomp$10.tm_wday];
      },
      "%b" : function(date$jscomp$11) {
        return MONTHS$jscomp$0[date$jscomp$11.tm_mon].substring(0, 3);
      },
      "%B" : function(date$jscomp$12) {
        return MONTHS$jscomp$0[date$jscomp$12.tm_mon];
      },
      "%C" : function(date$jscomp$13) {
        var year$jscomp$2 = date$jscomp$13.tm_year + 1900;
        return leadingNulls$jscomp$0(year$jscomp$2 / 100 | 0, 2);
      },
      "%d" : function(date$jscomp$14) {
        return leadingNulls$jscomp$0(date$jscomp$14.tm_mday, 2);
      },
      "%e" : function(date$jscomp$15) {
        return leadingSomething$jscomp$0(date$jscomp$15.tm_mday, 2, " ");
      },
      "%g" : function(date$jscomp$16) {
        return getWeekBasedYear$jscomp$0(date$jscomp$16).toString().substring(2);
      },
      "%G" : function(date$jscomp$17) {
        return getWeekBasedYear$jscomp$0(date$jscomp$17);
      },
      "%H" : function(date$jscomp$18) {
        return leadingNulls$jscomp$0(date$jscomp$18.tm_hour, 2);
      },
      "%I" : function(date$jscomp$19) {
        var twelveHour$jscomp$0 = date$jscomp$19.tm_hour;
        if (twelveHour$jscomp$0 == 0) {
          twelveHour$jscomp$0 = 12;
        } else {
          if (twelveHour$jscomp$0 > 12) {
            twelveHour$jscomp$0 = twelveHour$jscomp$0 - 12;
          }
        }
        return leadingNulls$jscomp$0(twelveHour$jscomp$0, 2);
      },
      "%j" : function(date$jscomp$20) {
        return leadingNulls$jscomp$0(date$jscomp$20.tm_mday + __arraySum$jscomp$0(__isLeapYear$jscomp$0(date$jscomp$20.tm_year + 1900) ? __MONTH_DAYS_LEAP$jscomp$0 : __MONTH_DAYS_REGULAR$jscomp$0, date$jscomp$20.tm_mon - 1), 3);
      },
      "%m" : function(date$jscomp$21) {
        return leadingNulls$jscomp$0(date$jscomp$21.tm_mon + 1, 2);
      },
      "%M" : function(date$jscomp$22) {
        return leadingNulls$jscomp$0(date$jscomp$22.tm_min, 2);
      },
      "%n" : function() {
        return "\n";
      },
      "%p" : function(date$jscomp$23) {
        if (date$jscomp$23.tm_hour >= 0 && date$jscomp$23.tm_hour < 12) {
          return "AM";
        } else {
          return "PM";
        }
      },
      "%S" : function(date$jscomp$24) {
        return leadingNulls$jscomp$0(date$jscomp$24.tm_sec, 2);
      },
      "%t" : function() {
        return "\t";
      },
      "%u" : function(date$jscomp$25) {
        var day$jscomp$0 = new Date(date$jscomp$25.tm_year + 1900, date$jscomp$25.tm_mon + 1, date$jscomp$25.tm_mday, 0, 0, 0, 0);
        return day$jscomp$0.getDay() || 7;
      },
      "%U" : function(date$jscomp$26) {
        var janFirst$jscomp$0 = new Date(date$jscomp$26.tm_year + 1900, 0, 1);
        var firstSunday$jscomp$0 = janFirst$jscomp$0.getDay() === 0 ? janFirst$jscomp$0 : __addDays$jscomp$0(janFirst$jscomp$0, 7 - janFirst$jscomp$0.getDay());
        var endDate$jscomp$0 = new Date(date$jscomp$26.tm_year + 1900, date$jscomp$26.tm_mon, date$jscomp$26.tm_mday);
        if (compareByDay$jscomp$0(firstSunday$jscomp$0, endDate$jscomp$0) < 0) {
          var februaryFirstUntilEndMonth$jscomp$0 = __arraySum$jscomp$0(__isLeapYear$jscomp$0(endDate$jscomp$0.getFullYear()) ? __MONTH_DAYS_LEAP$jscomp$0 : __MONTH_DAYS_REGULAR$jscomp$0, endDate$jscomp$0.getMonth() - 1) - 31;
          var firstSundayUntilEndJanuary$jscomp$0 = 31 - firstSunday$jscomp$0.getDate();
          var days$jscomp$1 = firstSundayUntilEndJanuary$jscomp$0 + februaryFirstUntilEndMonth$jscomp$0 + endDate$jscomp$0.getDate();
          return leadingNulls$jscomp$0(Math.ceil(days$jscomp$1 / 7), 2);
        }
        return compareByDay$jscomp$0(firstSunday$jscomp$0, janFirst$jscomp$0) === 0 ? "01" : "00";
      },
      "%V" : function(date$jscomp$27) {
        var janFourthThisYear$jscomp$1 = new Date(date$jscomp$27.tm_year + 1900, 0, 4);
        var janFourthNextYear$jscomp$1 = new Date(date$jscomp$27.tm_year + 1901, 0, 4);
        var firstWeekStartThisYear$jscomp$1 = getFirstWeekStartDate$jscomp$0(janFourthThisYear$jscomp$1);
        var firstWeekStartNextYear$jscomp$1 = getFirstWeekStartDate$jscomp$0(janFourthNextYear$jscomp$1);
        var endDate$jscomp$1 = __addDays$jscomp$0(new Date(date$jscomp$27.tm_year + 1900, 0, 1), date$jscomp$27.tm_yday);
        if (compareByDay$jscomp$0(endDate$jscomp$1, firstWeekStartThisYear$jscomp$1) < 0) {
          return "53";
        }
        if (compareByDay$jscomp$0(firstWeekStartNextYear$jscomp$1, endDate$jscomp$1) <= 0) {
          return "01";
        }
        var daysDifference$jscomp$0;
        if (firstWeekStartThisYear$jscomp$1.getFullYear() < date$jscomp$27.tm_year + 1900) {
          daysDifference$jscomp$0 = date$jscomp$27.tm_yday + 32 - firstWeekStartThisYear$jscomp$1.getDate();
        } else {
          daysDifference$jscomp$0 = date$jscomp$27.tm_yday + 1 - firstWeekStartThisYear$jscomp$1.getDate();
        }
        return leadingNulls$jscomp$0(Math.ceil(daysDifference$jscomp$0 / 7), 2);
      },
      "%w" : function(date$jscomp$28) {
        var day$jscomp$1 = new Date(date$jscomp$28.tm_year + 1900, date$jscomp$28.tm_mon + 1, date$jscomp$28.tm_mday, 0, 0, 0, 0);
        return day$jscomp$1.getDay();
      },
      "%W" : function(date$jscomp$29) {
        var janFirst$jscomp$1 = new Date(date$jscomp$29.tm_year, 0, 1);
        var firstMonday$jscomp$0 = janFirst$jscomp$1.getDay() === 1 ? janFirst$jscomp$1 : __addDays$jscomp$0(janFirst$jscomp$1, janFirst$jscomp$1.getDay() === 0 ? 1 : 7 - janFirst$jscomp$1.getDay() + 1);
        var endDate$jscomp$2 = new Date(date$jscomp$29.tm_year + 1900, date$jscomp$29.tm_mon, date$jscomp$29.tm_mday);
        if (compareByDay$jscomp$0(firstMonday$jscomp$0, endDate$jscomp$2) < 0) {
          var februaryFirstUntilEndMonth$jscomp$1 = __arraySum$jscomp$0(__isLeapYear$jscomp$0(endDate$jscomp$2.getFullYear()) ? __MONTH_DAYS_LEAP$jscomp$0 : __MONTH_DAYS_REGULAR$jscomp$0, endDate$jscomp$2.getMonth() - 1) - 31;
          var firstMondayUntilEndJanuary$jscomp$0 = 31 - firstMonday$jscomp$0.getDate();
          var days$jscomp$2 = firstMondayUntilEndJanuary$jscomp$0 + februaryFirstUntilEndMonth$jscomp$1 + endDate$jscomp$2.getDate();
          return leadingNulls$jscomp$0(Math.ceil(days$jscomp$2 / 7), 2);
        }
        return compareByDay$jscomp$0(firstMonday$jscomp$0, janFirst$jscomp$1) === 0 ? "01" : "00";
      },
      "%y" : function(date$jscomp$30) {
        return (date$jscomp$30.tm_year + 1900).toString().substring(2);
      },
      "%Y" : function(date$jscomp$31) {
        return date$jscomp$31.tm_year + 1900;
      },
      "%z" : function(date$jscomp$32) {
        var off$jscomp$1 = date$jscomp$32.tm_gmtoff;
        var ahead$jscomp$0 = off$jscomp$1 >= 0;
        off$jscomp$1 = Math.abs(off$jscomp$1) / 60;
        off$jscomp$1 = off$jscomp$1 / 60 * 100 + off$jscomp$1 % 60;
        return (ahead$jscomp$0 ? "+" : "-") + String("0000" + off$jscomp$1).slice(-4);
      },
      "%Z" : function(date$jscomp$33) {
        return date$jscomp$33.tm_zone;
      },
      "%%" : function() {
        return "%";
      }
    };
    for (rule$jscomp$2 in EXPANSION_RULES_2$jscomp$0) {
      if (pattern$jscomp$4.indexOf(rule$jscomp$2) >= 0) {
        pattern$jscomp$4 = pattern$jscomp$4.replace(new RegExp(rule$jscomp$2, "g"), EXPANSION_RULES_2$jscomp$0[rule$jscomp$2](date$jscomp$7));
      }
    }
    var bytes$jscomp$1 = intArrayFromString$jscomp$0(pattern$jscomp$4, false);
    if (bytes$jscomp$1.length > maxsize$jscomp$0) {
      return 0;
    }
    writeArrayToMemory$jscomp$0(bytes$jscomp$1, s$jscomp$3);
    return bytes$jscomp$1.length - 1;
  }
  function _sysconf$jscomp$0(name$jscomp$74) {
    switch(name$jscomp$74) {
      case 30:
        return PAGE_SIZE$jscomp$0;
      case 85:
        var maxHeapSize$jscomp$0 = 2 * 1024 * 1024 * 1024 - 65536;
        return maxHeapSize$jscomp$0 / PAGE_SIZE$jscomp$0;
      case 132:
      case 133:
      case 12:
      case 137:
      case 138:
      case 15:
      case 235:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 149:
      case 13:
      case 10:
      case 236:
      case 153:
      case 9:
      case 21:
      case 22:
      case 159:
      case 154:
      case 14:
      case 77:
      case 78:
      case 139:
      case 80:
      case 81:
      case 82:
      case 68:
      case 67:
      case 164:
      case 11:
      case 29:
      case 47:
      case 48:
      case 95:
      case 52:
      case 51:
      case 46:
        return 200809;
      case 79:
        return 0;
      case 27:
      case 246:
      case 127:
      case 128:
      case 23:
      case 24:
      case 160:
      case 161:
      case 181:
      case 182:
      case 242:
      case 183:
      case 184:
      case 243:
      case 244:
      case 245:
      case 165:
      case 178:
      case 179:
      case 49:
      case 50:
      case 168:
      case 169:
      case 175:
      case 170:
      case 171:
      case 172:
      case 97:
      case 76:
      case 32:
      case 173:
      case 35:
        return -1;
      case 176:
      case 177:
      case 7:
      case 155:
      case 8:
      case 157:
      case 125:
      case 126:
      case 92:
      case 93:
      case 129:
      case 130:
      case 131:
      case 94:
      case 91:
        return 1;
      case 74:
      case 60:
      case 69:
      case 70:
      case 4:
        return 1024;
      case 31:
      case 42:
      case 72:
        return 32;
      case 87:
      case 26:
      case 33:
        return 2147483647;
      case 34:
      case 1:
        return 47839;
      case 38:
      case 36:
        return 99;
      case 43:
      case 37:
        return 2048;
      case 0:
        return 2097152;
      case 3:
        return 65536;
      case 28:
        return 32768;
      case 44:
        return 32767;
      case 75:
        return 16384;
      case 39:
        return 1E3;
      case 89:
        return 700;
      case 71:
        return 256;
      case 40:
        return 255;
      case 2:
        return 100;
      case 180:
        return 64;
      case 25:
        return 20;
      case 5:
        return 16;
      case 6:
        return 6;
      case 73:
        return 4;
      case 84:
        {
          if (typeof navigator === "object") {
            return navigator["hardwareConcurrency"] || 1;
          }
          return 1;
        }
    }
    ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
    return -1;
  }
  function _time$jscomp$0(ptr$jscomp$24) {
    var ret$jscomp$17 = Date.now() / 1E3 | 0;
    if (ptr$jscomp$24) {
      HEAP32$jscomp$0[ptr$jscomp$24 >> 2] = ret$jscomp$17;
    }
    return ret$jscomp$17;
  }
  function _unsetenv$jscomp$0(name$jscomp$75) {
    if (name$jscomp$75 === 0) {
      ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
      return -1;
    }
    name$jscomp$75 = Pointer_stringify$jscomp$0(name$jscomp$75);
    if (name$jscomp$75 === "" || name$jscomp$75.indexOf("=") !== -1) {
      ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EINVAL);
      return -1;
    }
    if (ENV$jscomp$0.hasOwnProperty(name$jscomp$75)) {
      delete ENV$jscomp$0[name$jscomp$75];
      ___buildEnvironment$jscomp$0(__get_environ$jscomp$0());
    }
    return 0;
  }
  function _utime$jscomp$0(path$jscomp$14, times$jscomp$0) {
    var time$jscomp$4;
    if (times$jscomp$0) {
      var offset$jscomp$22 = 4;
      time$jscomp$4 = HEAP32$jscomp$0[times$jscomp$0 + offset$jscomp$22 >> 2];
      time$jscomp$4 = time$jscomp$4 * 1E3;
    } else {
      time$jscomp$4 = Date.now();
    }
    path$jscomp$14 = Pointer_stringify$jscomp$0(path$jscomp$14);
    try {
      FS$jscomp$0.utime(path$jscomp$14, time$jscomp$4, time$jscomp$4);
      return 0;
    } catch (e$jscomp$46) {
      FS$jscomp$0.handleFSError(e$jscomp$46);
      return -1;
    }
  }
  function intArrayFromString$jscomp$0(stringy$jscomp$0, dontAddNull$jscomp$1, length$jscomp$32) {
    var len$jscomp$5 = length$jscomp$32 > 0 ? length$jscomp$32 : lengthBytesUTF8$jscomp$0(stringy$jscomp$0) + 1;
    var u8array$jscomp$0 = new Array(len$jscomp$5);
    var numBytesWritten$jscomp$0 = stringToUTF8Array$jscomp$0(stringy$jscomp$0, u8array$jscomp$0, 0, u8array$jscomp$0.length);
    if (dontAddNull$jscomp$1) {
      u8array$jscomp$0.length = numBytesWritten$jscomp$0;
    }
    return u8array$jscomp$0;
  }
  function invoke_dddi$jscomp$0(index$jscomp$71, a1$jscomp$0, a2$jscomp$0, a3$jscomp$0) {
    var sp$jscomp$0 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_dddi"](index$jscomp$71, a1$jscomp$0, a2$jscomp$0, a3$jscomp$0);
    } catch (e$jscomp$47) {
      stackRestore$jscomp$0(sp$jscomp$0);
      if (typeof e$jscomp$47 !== "number" && e$jscomp$47 !== "longjmp") {
        throw e$jscomp$47;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ddi$jscomp$0(index$jscomp$72, a1$jscomp$1, a2$jscomp$1) {
    var sp$jscomp$1 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ddi"](index$jscomp$72, a1$jscomp$1, a2$jscomp$1);
    } catch (e$jscomp$48) {
      stackRestore$jscomp$0(sp$jscomp$1);
      if (typeof e$jscomp$48 !== "number" && e$jscomp$48 !== "longjmp") {
        throw e$jscomp$48;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_dfi$jscomp$0(index$jscomp$73, a1$jscomp$2, a2$jscomp$2) {
    var sp$jscomp$2 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_dfi"](index$jscomp$73, a1$jscomp$2, a2$jscomp$2);
    } catch (e$jscomp$49) {
      stackRestore$jscomp$0(sp$jscomp$2);
      if (typeof e$jscomp$49 !== "number" && e$jscomp$49 !== "longjmp") {
        throw e$jscomp$49;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_di$jscomp$0(index$jscomp$74, a1$jscomp$3) {
    var sp$jscomp$3 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_di"](index$jscomp$74, a1$jscomp$3);
    } catch (e$jscomp$50) {
      stackRestore$jscomp$0(sp$jscomp$3);
      if (typeof e$jscomp$50 !== "number" && e$jscomp$50 !== "longjmp") {
        throw e$jscomp$50;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_diddi$jscomp$0(index$jscomp$75, a1$jscomp$4, a2$jscomp$3, a3$jscomp$1, a4$jscomp$0) {
    var sp$jscomp$4 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_diddi"](index$jscomp$75, a1$jscomp$4, a2$jscomp$3, a3$jscomp$1, a4$jscomp$0);
    } catch (e$jscomp$51) {
      stackRestore$jscomp$0(sp$jscomp$4);
      if (typeof e$jscomp$51 !== "number" && e$jscomp$51 !== "longjmp") {
        throw e$jscomp$51;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_didi$jscomp$0(index$jscomp$76, a1$jscomp$5, a2$jscomp$4, a3$jscomp$2) {
    var sp$jscomp$5 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_didi"](index$jscomp$76, a1$jscomp$5, a2$jscomp$4, a3$jscomp$2);
    } catch (e$jscomp$52) {
      stackRestore$jscomp$0(sp$jscomp$5);
      if (typeof e$jscomp$52 !== "number" && e$jscomp$52 !== "longjmp") {
        throw e$jscomp$52;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_dii$jscomp$0(index$jscomp$77, a1$jscomp$6, a2$jscomp$5) {
    var sp$jscomp$6 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_dii"](index$jscomp$77, a1$jscomp$6, a2$jscomp$5);
    } catch (e$jscomp$53) {
      stackRestore$jscomp$0(sp$jscomp$6);
      if (typeof e$jscomp$53 !== "number" && e$jscomp$53 !== "longjmp") {
        throw e$jscomp$53;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_diii$jscomp$0(index$jscomp$78, a1$jscomp$7, a2$jscomp$6, a3$jscomp$3) {
    var sp$jscomp$7 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_diii"](index$jscomp$78, a1$jscomp$7, a2$jscomp$6, a3$jscomp$3);
    } catch (e$jscomp$54) {
      stackRestore$jscomp$0(sp$jscomp$7);
      if (typeof e$jscomp$54 !== "number" && e$jscomp$54 !== "longjmp") {
        throw e$jscomp$54;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_diiii$jscomp$0(index$jscomp$79, a1$jscomp$8, a2$jscomp$7, a3$jscomp$4, a4$jscomp$1) {
    var sp$jscomp$8 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_diiii"](index$jscomp$79, a1$jscomp$8, a2$jscomp$7, a3$jscomp$4, a4$jscomp$1);
    } catch (e$jscomp$55) {
      stackRestore$jscomp$0(sp$jscomp$8);
      if (typeof e$jscomp$55 !== "number" && e$jscomp$55 !== "longjmp") {
        throw e$jscomp$55;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_dji$jscomp$0(index$jscomp$80, a1$jscomp$9, a2$jscomp$8, a3$jscomp$5) {
    var sp$jscomp$9 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_dji"](index$jscomp$80, a1$jscomp$9, a2$jscomp$8, a3$jscomp$5);
    } catch (e$jscomp$56) {
      stackRestore$jscomp$0(sp$jscomp$9);
      if (typeof e$jscomp$56 !== "number" && e$jscomp$56 !== "longjmp") {
        throw e$jscomp$56;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_f$jscomp$0(index$jscomp$81) {
    var sp$jscomp$10 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_f"](index$jscomp$81);
    } catch (e$jscomp$57) {
      stackRestore$jscomp$0(sp$jscomp$10);
      if (typeof e$jscomp$57 !== "number" && e$jscomp$57 !== "longjmp") {
        throw e$jscomp$57;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fdi$jscomp$0(index$jscomp$82, a1$jscomp$10, a2$jscomp$9) {
    var sp$jscomp$11 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fdi"](index$jscomp$82, a1$jscomp$10, a2$jscomp$9);
    } catch (e$jscomp$58) {
      stackRestore$jscomp$0(sp$jscomp$11);
      if (typeof e$jscomp$58 !== "number" && e$jscomp$58 !== "longjmp") {
        throw e$jscomp$58;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ff$jscomp$0(index$jscomp$83, a1$jscomp$11) {
    var sp$jscomp$12 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ff"](index$jscomp$83, a1$jscomp$11);
    } catch (e$jscomp$59) {
      stackRestore$jscomp$0(sp$jscomp$12);
      if (typeof e$jscomp$59 !== "number" && e$jscomp$59 !== "longjmp") {
        throw e$jscomp$59;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fff$jscomp$0(index$jscomp$84, a1$jscomp$12, a2$jscomp$10) {
    var sp$jscomp$13 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fff"](index$jscomp$84, a1$jscomp$12, a2$jscomp$10);
    } catch (e$jscomp$60) {
      stackRestore$jscomp$0(sp$jscomp$13);
      if (typeof e$jscomp$60 !== "number" && e$jscomp$60 !== "longjmp") {
        throw e$jscomp$60;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ffffi$jscomp$0(index$jscomp$85, a1$jscomp$13, a2$jscomp$11, a3$jscomp$6, a4$jscomp$2) {
    var sp$jscomp$14 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ffffi"](index$jscomp$85, a1$jscomp$13, a2$jscomp$11, a3$jscomp$6, a4$jscomp$2);
    } catch (e$jscomp$61) {
      stackRestore$jscomp$0(sp$jscomp$14);
      if (typeof e$jscomp$61 !== "number" && e$jscomp$61 !== "longjmp") {
        throw e$jscomp$61;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fffi$jscomp$0(index$jscomp$86, a1$jscomp$14, a2$jscomp$12, a3$jscomp$7) {
    var sp$jscomp$15 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fffi"](index$jscomp$86, a1$jscomp$14, a2$jscomp$12, a3$jscomp$7);
    } catch (e$jscomp$62) {
      stackRestore$jscomp$0(sp$jscomp$15);
      if (typeof e$jscomp$62 !== "number" && e$jscomp$62 !== "longjmp") {
        throw e$jscomp$62;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fffifffi$jscomp$0(index$jscomp$87, a1$jscomp$15, a2$jscomp$13, a3$jscomp$8, a4$jscomp$3, a5$jscomp$0, a6$jscomp$0, a7$jscomp$0) {
    var sp$jscomp$16 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fffifffi"](index$jscomp$87, a1$jscomp$15, a2$jscomp$13, a3$jscomp$8, a4$jscomp$3, a5$jscomp$0, a6$jscomp$0, a7$jscomp$0);
    } catch (e$jscomp$63) {
      stackRestore$jscomp$0(sp$jscomp$16);
      if (typeof e$jscomp$63 !== "number" && e$jscomp$63 !== "longjmp") {
        throw e$jscomp$63;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ffi$jscomp$0(index$jscomp$88, a1$jscomp$16, a2$jscomp$14) {
    var sp$jscomp$17 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ffi"](index$jscomp$88, a1$jscomp$16, a2$jscomp$14);
    } catch (e$jscomp$64) {
      stackRestore$jscomp$0(sp$jscomp$17);
      if (typeof e$jscomp$64 !== "number" && e$jscomp$64 !== "longjmp") {
        throw e$jscomp$64;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fi$jscomp$0(index$jscomp$89, a1$jscomp$17) {
    var sp$jscomp$18 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fi"](index$jscomp$89, a1$jscomp$17);
    } catch (e$jscomp$65) {
      stackRestore$jscomp$0(sp$jscomp$18);
      if (typeof e$jscomp$65 !== "number" && e$jscomp$65 !== "longjmp") {
        throw e$jscomp$65;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fif$jscomp$0(index$jscomp$90, a1$jscomp$18, a2$jscomp$15) {
    var sp$jscomp$19 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fif"](index$jscomp$90, a1$jscomp$18, a2$jscomp$15);
    } catch (e$jscomp$66) {
      stackRestore$jscomp$0(sp$jscomp$19);
      if (typeof e$jscomp$66 !== "number" && e$jscomp$66 !== "longjmp") {
        throw e$jscomp$66;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiffi$jscomp$0(index$jscomp$91, a1$jscomp$19, a2$jscomp$16, a3$jscomp$9, a4$jscomp$4) {
    var sp$jscomp$20 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiffi"](index$jscomp$91, a1$jscomp$19, a2$jscomp$16, a3$jscomp$9, a4$jscomp$4);
    } catch (e$jscomp$67) {
      stackRestore$jscomp$0(sp$jscomp$20);
      if (typeof e$jscomp$67 !== "number" && e$jscomp$67 !== "longjmp") {
        throw e$jscomp$67;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fifi$jscomp$0(index$jscomp$92, a1$jscomp$20, a2$jscomp$17, a3$jscomp$10) {
    var sp$jscomp$21 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fifi"](index$jscomp$92, a1$jscomp$20, a2$jscomp$17, a3$jscomp$10);
    } catch (e$jscomp$68) {
      stackRestore$jscomp$0(sp$jscomp$21);
      if (typeof e$jscomp$68 !== "number" && e$jscomp$68 !== "longjmp") {
        throw e$jscomp$68;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fifii$jscomp$0(index$jscomp$93, a1$jscomp$21, a2$jscomp$18, a3$jscomp$11, a4$jscomp$5) {
    var sp$jscomp$22 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fifii"](index$jscomp$93, a1$jscomp$21, a2$jscomp$18, a3$jscomp$11, a4$jscomp$5);
    } catch (e$jscomp$69) {
      stackRestore$jscomp$0(sp$jscomp$22);
      if (typeof e$jscomp$69 !== "number" && e$jscomp$69 !== "longjmp") {
        throw e$jscomp$69;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fii$jscomp$0(index$jscomp$94, a1$jscomp$22, a2$jscomp$19) {
    var sp$jscomp$23 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fii"](index$jscomp$94, a1$jscomp$22, a2$jscomp$19);
    } catch (e$jscomp$70) {
      stackRestore$jscomp$0(sp$jscomp$23);
      if (typeof e$jscomp$70 !== "number" && e$jscomp$70 !== "longjmp") {
        throw e$jscomp$70;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiifi$jscomp$0(index$jscomp$95, a1$jscomp$23, a2$jscomp$20, a3$jscomp$12, a4$jscomp$6) {
    var sp$jscomp$24 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiifi"](index$jscomp$95, a1$jscomp$23, a2$jscomp$20, a3$jscomp$12, a4$jscomp$6);
    } catch (e$jscomp$71) {
      stackRestore$jscomp$0(sp$jscomp$24);
      if (typeof e$jscomp$71 !== "number" && e$jscomp$71 !== "longjmp") {
        throw e$jscomp$71;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiifii$jscomp$0(index$jscomp$96, a1$jscomp$24, a2$jscomp$21, a3$jscomp$13, a4$jscomp$7, a5$jscomp$1) {
    var sp$jscomp$25 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiifii"](index$jscomp$96, a1$jscomp$24, a2$jscomp$21, a3$jscomp$13, a4$jscomp$7, a5$jscomp$1);
    } catch (e$jscomp$72) {
      stackRestore$jscomp$0(sp$jscomp$25);
      if (typeof e$jscomp$72 !== "number" && e$jscomp$72 !== "longjmp") {
        throw e$jscomp$72;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiii$jscomp$0(index$jscomp$97, a1$jscomp$25, a2$jscomp$22, a3$jscomp$14) {
    var sp$jscomp$26 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiii"](index$jscomp$97, a1$jscomp$25, a2$jscomp$22, a3$jscomp$14);
    } catch (e$jscomp$73) {
      stackRestore$jscomp$0(sp$jscomp$26);
      if (typeof e$jscomp$73 !== "number" && e$jscomp$73 !== "longjmp") {
        throw e$jscomp$73;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiiii$jscomp$0(index$jscomp$98, a1$jscomp$26, a2$jscomp$23, a3$jscomp$15, a4$jscomp$8) {
    var sp$jscomp$27 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiiii"](index$jscomp$98, a1$jscomp$26, a2$jscomp$23, a3$jscomp$15, a4$jscomp$8);
    } catch (e$jscomp$74) {
      stackRestore$jscomp$0(sp$jscomp$27);
      if (typeof e$jscomp$74 !== "number" && e$jscomp$74 !== "longjmp") {
        throw e$jscomp$74;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fiiiif$jscomp$0(index$jscomp$99, a1$jscomp$27, a2$jscomp$24, a3$jscomp$16, a4$jscomp$9, a5$jscomp$2) {
    var sp$jscomp$28 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fiiiif"](index$jscomp$99, a1$jscomp$27, a2$jscomp$24, a3$jscomp$16, a4$jscomp$9, a5$jscomp$2);
    } catch (e$jscomp$75) {
      stackRestore$jscomp$0(sp$jscomp$28);
      if (typeof e$jscomp$75 !== "number" && e$jscomp$75 !== "longjmp") {
        throw e$jscomp$75;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_fji$jscomp$0(index$jscomp$100, a1$jscomp$28, a2$jscomp$25, a3$jscomp$17) {
    var sp$jscomp$29 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_fji"](index$jscomp$100, a1$jscomp$28, a2$jscomp$25, a3$jscomp$17);
    } catch (e$jscomp$76) {
      stackRestore$jscomp$0(sp$jscomp$29);
      if (typeof e$jscomp$76 !== "number" && e$jscomp$76 !== "longjmp") {
        throw e$jscomp$76;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_i$jscomp$0(index$jscomp$101) {
    var sp$jscomp$30 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_i"](index$jscomp$101);
    } catch (e$jscomp$77) {
      stackRestore$jscomp$0(sp$jscomp$30);
      if (typeof e$jscomp$77 !== "number" && e$jscomp$77 !== "longjmp") {
        throw e$jscomp$77;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_idi$jscomp$0(index$jscomp$102, a1$jscomp$29, a2$jscomp$26) {
    var sp$jscomp$31 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_idi"](index$jscomp$102, a1$jscomp$29, a2$jscomp$26);
    } catch (e$jscomp$78) {
      stackRestore$jscomp$0(sp$jscomp$31);
      if (typeof e$jscomp$78 !== "number" && e$jscomp$78 !== "longjmp") {
        throw e$jscomp$78;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_idiii$jscomp$0(index$jscomp$103, a1$jscomp$30, a2$jscomp$27, a3$jscomp$18, a4$jscomp$10) {
    var sp$jscomp$32 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_idiii"](index$jscomp$103, a1$jscomp$30, a2$jscomp$27, a3$jscomp$18, a4$jscomp$10);
    } catch (e$jscomp$79) {
      stackRestore$jscomp$0(sp$jscomp$32);
      if (typeof e$jscomp$79 !== "number" && e$jscomp$79 !== "longjmp") {
        throw e$jscomp$79;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ifffi$jscomp$0(index$jscomp$104, a1$jscomp$31, a2$jscomp$28, a3$jscomp$19, a4$jscomp$11) {
    var sp$jscomp$33 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ifffi"](index$jscomp$104, a1$jscomp$31, a2$jscomp$28, a3$jscomp$19, a4$jscomp$11);
    } catch (e$jscomp$80) {
      stackRestore$jscomp$0(sp$jscomp$33);
      if (typeof e$jscomp$80 !== "number" && e$jscomp$80 !== "longjmp") {
        throw e$jscomp$80;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iffi$jscomp$0(index$jscomp$105, a1$jscomp$32, a2$jscomp$29, a3$jscomp$20) {
    var sp$jscomp$34 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iffi"](index$jscomp$105, a1$jscomp$32, a2$jscomp$29, a3$jscomp$20);
    } catch (e$jscomp$81) {
      stackRestore$jscomp$0(sp$jscomp$34);
      if (typeof e$jscomp$81 !== "number" && e$jscomp$81 !== "longjmp") {
        throw e$jscomp$81;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ifi$jscomp$0(index$jscomp$106, a1$jscomp$33, a2$jscomp$30) {
    var sp$jscomp$35 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ifi"](index$jscomp$106, a1$jscomp$33, a2$jscomp$30);
    } catch (e$jscomp$82) {
      stackRestore$jscomp$0(sp$jscomp$35);
      if (typeof e$jscomp$82 !== "number" && e$jscomp$82 !== "longjmp") {
        throw e$jscomp$82;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ifiii$jscomp$0(index$jscomp$107, a1$jscomp$34, a2$jscomp$31, a3$jscomp$21, a4$jscomp$12) {
    var sp$jscomp$36 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ifiii"](index$jscomp$107, a1$jscomp$34, a2$jscomp$31, a3$jscomp$21, a4$jscomp$12);
    } catch (e$jscomp$83) {
      stackRestore$jscomp$0(sp$jscomp$36);
      if (typeof e$jscomp$83 !== "number" && e$jscomp$83 !== "longjmp") {
        throw e$jscomp$83;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ii$jscomp$0(index$jscomp$108, a1$jscomp$35) {
    var sp$jscomp$37 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ii"](index$jscomp$108, a1$jscomp$35);
    } catch (e$jscomp$84) {
      stackRestore$jscomp$0(sp$jscomp$37);
      if (typeof e$jscomp$84 !== "number" && e$jscomp$84 !== "longjmp") {
        throw e$jscomp$84;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iidi$jscomp$0(index$jscomp$109, a1$jscomp$36, a2$jscomp$32, a3$jscomp$22) {
    var sp$jscomp$38 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iidi"](index$jscomp$109, a1$jscomp$36, a2$jscomp$32, a3$jscomp$22);
    } catch (e$jscomp$85) {
      stackRestore$jscomp$0(sp$jscomp$38);
      if (typeof e$jscomp$85 !== "number" && e$jscomp$85 !== "longjmp") {
        throw e$jscomp$85;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iidii$jscomp$0(index$jscomp$110, a1$jscomp$37, a2$jscomp$33, a3$jscomp$23, a4$jscomp$13) {
    var sp$jscomp$39 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iidii"](index$jscomp$110, a1$jscomp$37, a2$jscomp$33, a3$jscomp$23, a4$jscomp$13);
    } catch (e$jscomp$86) {
      stackRestore$jscomp$0(sp$jscomp$39);
      if (typeof e$jscomp$86 !== "number" && e$jscomp$86 !== "longjmp") {
        throw e$jscomp$86;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iif$jscomp$0(index$jscomp$111, a1$jscomp$38, a2$jscomp$34) {
    var sp$jscomp$40 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iif"](index$jscomp$111, a1$jscomp$38, a2$jscomp$34);
    } catch (e$jscomp$87) {
      stackRestore$jscomp$0(sp$jscomp$40);
      if (typeof e$jscomp$87 !== "number" && e$jscomp$87 !== "longjmp") {
        throw e$jscomp$87;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iifffi$jscomp$0(index$jscomp$112, a1$jscomp$39, a2$jscomp$35, a3$jscomp$24, a4$jscomp$14, a5$jscomp$3) {
    var sp$jscomp$41 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iifffi"](index$jscomp$112, a1$jscomp$39, a2$jscomp$35, a3$jscomp$24, a4$jscomp$14, a5$jscomp$3);
    } catch (e$jscomp$88) {
      stackRestore$jscomp$0(sp$jscomp$41);
      if (typeof e$jscomp$88 !== "number" && e$jscomp$88 !== "longjmp") {
        throw e$jscomp$88;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiffi$jscomp$0(index$jscomp$113, a1$jscomp$40, a2$jscomp$36, a3$jscomp$25, a4$jscomp$15) {
    var sp$jscomp$42 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiffi"](index$jscomp$113, a1$jscomp$40, a2$jscomp$36, a3$jscomp$25, a4$jscomp$15);
    } catch (e$jscomp$89) {
      stackRestore$jscomp$0(sp$jscomp$42);
      if (typeof e$jscomp$89 !== "number" && e$jscomp$89 !== "longjmp") {
        throw e$jscomp$89;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iifi$jscomp$0(index$jscomp$114, a1$jscomp$41, a2$jscomp$37, a3$jscomp$26) {
    var sp$jscomp$43 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iifi"](index$jscomp$114, a1$jscomp$41, a2$jscomp$37, a3$jscomp$26);
    } catch (e$jscomp$90) {
      stackRestore$jscomp$0(sp$jscomp$43);
      if (typeof e$jscomp$90 !== "number" && e$jscomp$90 !== "longjmp") {
        throw e$jscomp$90;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iifii$jscomp$0(index$jscomp$115, a1$jscomp$42, a2$jscomp$38, a3$jscomp$27, a4$jscomp$16) {
    var sp$jscomp$44 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iifii"](index$jscomp$115, a1$jscomp$42, a2$jscomp$38, a3$jscomp$27, a4$jscomp$16);
    } catch (e$jscomp$91) {
      stackRestore$jscomp$0(sp$jscomp$44);
      if (typeof e$jscomp$91 !== "number" && e$jscomp$91 !== "longjmp") {
        throw e$jscomp$91;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iifiii$jscomp$0(index$jscomp$116, a1$jscomp$43, a2$jscomp$39, a3$jscomp$28, a4$jscomp$17, a5$jscomp$4) {
    var sp$jscomp$45 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iifiii"](index$jscomp$116, a1$jscomp$43, a2$jscomp$39, a3$jscomp$28, a4$jscomp$17, a5$jscomp$4);
    } catch (e$jscomp$92) {
      stackRestore$jscomp$0(sp$jscomp$45);
      if (typeof e$jscomp$92 !== "number" && e$jscomp$92 !== "longjmp") {
        throw e$jscomp$92;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iii$jscomp$0(index$jscomp$117, a1$jscomp$44, a2$jscomp$40) {
    var sp$jscomp$46 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iii"](index$jscomp$117, a1$jscomp$44, a2$jscomp$40);
    } catch (e$jscomp$93) {
      stackRestore$jscomp$0(sp$jscomp$46);
      if (typeof e$jscomp$93 !== "number" && e$jscomp$93 !== "longjmp") {
        throw e$jscomp$93;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiif$jscomp$0(index$jscomp$118, a1$jscomp$45, a2$jscomp$41, a3$jscomp$29) {
    var sp$jscomp$47 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiif"](index$jscomp$118, a1$jscomp$45, a2$jscomp$41, a3$jscomp$29);
    } catch (e$jscomp$94) {
      stackRestore$jscomp$0(sp$jscomp$47);
      if (typeof e$jscomp$94 !== "number" && e$jscomp$94 !== "longjmp") {
        throw e$jscomp$94;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiff$jscomp$0(index$jscomp$119, a1$jscomp$46, a2$jscomp$42, a3$jscomp$30, a4$jscomp$18) {
    var sp$jscomp$48 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiff"](index$jscomp$119, a1$jscomp$46, a2$jscomp$42, a3$jscomp$30, a4$jscomp$18);
    } catch (e$jscomp$95) {
      stackRestore$jscomp$0(sp$jscomp$48);
      if (typeof e$jscomp$95 !== "number" && e$jscomp$95 !== "longjmp") {
        throw e$jscomp$95;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiifi$jscomp$0(index$jscomp$120, a1$jscomp$47, a2$jscomp$43, a3$jscomp$31, a4$jscomp$19) {
    var sp$jscomp$49 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiifi"](index$jscomp$120, a1$jscomp$47, a2$jscomp$43, a3$jscomp$31, a4$jscomp$19);
    } catch (e$jscomp$96) {
      stackRestore$jscomp$0(sp$jscomp$49);
      if (typeof e$jscomp$96 !== "number" && e$jscomp$96 !== "longjmp") {
        throw e$jscomp$96;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiifii$jscomp$0(index$jscomp$121, a1$jscomp$48, a2$jscomp$44, a3$jscomp$32, a4$jscomp$20, a5$jscomp$5) {
    var sp$jscomp$50 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiifii"](index$jscomp$121, a1$jscomp$48, a2$jscomp$44, a3$jscomp$32, a4$jscomp$20, a5$jscomp$5);
    } catch (e$jscomp$97) {
      stackRestore$jscomp$0(sp$jscomp$50);
      if (typeof e$jscomp$97 !== "number" && e$jscomp$97 !== "longjmp") {
        throw e$jscomp$97;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiifiii$jscomp$0(index$jscomp$122, a1$jscomp$49, a2$jscomp$45, a3$jscomp$33, a4$jscomp$21, a5$jscomp$6, a6$jscomp$1) {
    var sp$jscomp$51 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiifiii"](index$jscomp$122, a1$jscomp$49, a2$jscomp$45, a3$jscomp$33, a4$jscomp$21, a5$jscomp$6, a6$jscomp$1);
    } catch (e$jscomp$98) {
      stackRestore$jscomp$0(sp$jscomp$51);
      if (typeof e$jscomp$98 !== "number" && e$jscomp$98 !== "longjmp") {
        throw e$jscomp$98;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiifiiii$jscomp$0(index$jscomp$123, a1$jscomp$50, a2$jscomp$46, a3$jscomp$34, a4$jscomp$22, a5$jscomp$7, a6$jscomp$2, a7$jscomp$1) {
    var sp$jscomp$52 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiifiiii"](index$jscomp$123, a1$jscomp$50, a2$jscomp$46, a3$jscomp$34, a4$jscomp$22, a5$jscomp$7, a6$jscomp$2, a7$jscomp$1);
    } catch (e$jscomp$99) {
      stackRestore$jscomp$0(sp$jscomp$52);
      if (typeof e$jscomp$99 !== "number" && e$jscomp$99 !== "longjmp") {
        throw e$jscomp$99;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiii$jscomp$0(index$jscomp$124, a1$jscomp$51, a2$jscomp$47, a3$jscomp$35) {
    var sp$jscomp$53 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiii"](index$jscomp$124, a1$jscomp$51, a2$jscomp$47, a3$jscomp$35);
    } catch (e$jscomp$100) {
      stackRestore$jscomp$0(sp$jscomp$53);
      if (typeof e$jscomp$100 !== "number" && e$jscomp$100 !== "longjmp") {
        throw e$jscomp$100;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiifi$jscomp$0(index$jscomp$125, a1$jscomp$52, a2$jscomp$48, a3$jscomp$36, a4$jscomp$23, a5$jscomp$8) {
    var sp$jscomp$54 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiifi"](index$jscomp$125, a1$jscomp$52, a2$jscomp$48, a3$jscomp$36, a4$jscomp$23, a5$jscomp$8);
    } catch (e$jscomp$101) {
      stackRestore$jscomp$0(sp$jscomp$54);
      if (typeof e$jscomp$101 !== "number" && e$jscomp$101 !== "longjmp") {
        throw e$jscomp$101;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiifii$jscomp$0(index$jscomp$126, a1$jscomp$53, a2$jscomp$49, a3$jscomp$37, a4$jscomp$24, a5$jscomp$9, a6$jscomp$3) {
    var sp$jscomp$55 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiifii"](index$jscomp$126, a1$jscomp$53, a2$jscomp$49, a3$jscomp$37, a4$jscomp$24, a5$jscomp$9, a6$jscomp$3);
    } catch (e$jscomp$102) {
      stackRestore$jscomp$0(sp$jscomp$55);
      if (typeof e$jscomp$102 !== "number" && e$jscomp$102 !== "longjmp") {
        throw e$jscomp$102;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiifiii$jscomp$0(index$jscomp$127, a1$jscomp$54, a2$jscomp$50, a3$jscomp$38, a4$jscomp$25, a5$jscomp$10, a6$jscomp$4, a7$jscomp$2) {
    var sp$jscomp$56 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiifiii"](index$jscomp$127, a1$jscomp$54, a2$jscomp$50, a3$jscomp$38, a4$jscomp$25, a5$jscomp$10, a6$jscomp$4, a7$jscomp$2);
    } catch (e$jscomp$103) {
      stackRestore$jscomp$0(sp$jscomp$56);
      if (typeof e$jscomp$103 !== "number" && e$jscomp$103 !== "longjmp") {
        throw e$jscomp$103;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiifiiii$jscomp$0(index$jscomp$128, a1$jscomp$55, a2$jscomp$51, a3$jscomp$39, a4$jscomp$26, a5$jscomp$11, a6$jscomp$5, a7$jscomp$3, a8$jscomp$0) {
    var sp$jscomp$57 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiifiiii"](index$jscomp$128, a1$jscomp$55, a2$jscomp$51, a3$jscomp$39, a4$jscomp$26, a5$jscomp$11, a6$jscomp$5, a7$jscomp$3, a8$jscomp$0);
    } catch (e$jscomp$104) {
      stackRestore$jscomp$0(sp$jscomp$57);
      if (typeof e$jscomp$104 !== "number" && e$jscomp$104 !== "longjmp") {
        throw e$jscomp$104;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiii$jscomp$0(index$jscomp$129, a1$jscomp$56, a2$jscomp$52, a3$jscomp$40, a4$jscomp$27) {
    var sp$jscomp$58 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiii"](index$jscomp$129, a1$jscomp$56, a2$jscomp$52, a3$jscomp$40, a4$jscomp$27);
    } catch (e$jscomp$105) {
      stackRestore$jscomp$0(sp$jscomp$58);
      if (typeof e$jscomp$105 !== "number" && e$jscomp$105 !== "longjmp") {
        throw e$jscomp$105;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiifi$jscomp$0(index$jscomp$130, a1$jscomp$57, a2$jscomp$53, a3$jscomp$41, a4$jscomp$28, a5$jscomp$12, a6$jscomp$6) {
    var sp$jscomp$59 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiifi"](index$jscomp$130, a1$jscomp$57, a2$jscomp$53, a3$jscomp$41, a4$jscomp$28, a5$jscomp$12, a6$jscomp$6);
    } catch (e$jscomp$106) {
      stackRestore$jscomp$0(sp$jscomp$59);
      if (typeof e$jscomp$106 !== "number" && e$jscomp$106 !== "longjmp") {
        throw e$jscomp$106;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiii$jscomp$0(index$jscomp$131, a1$jscomp$58, a2$jscomp$54, a3$jscomp$42, a4$jscomp$29, a5$jscomp$13) {
    var sp$jscomp$60 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiii"](index$jscomp$131, a1$jscomp$58, a2$jscomp$54, a3$jscomp$42, a4$jscomp$29, a5$jscomp$13);
    } catch (e$jscomp$107) {
      stackRestore$jscomp$0(sp$jscomp$60);
      if (typeof e$jscomp$107 !== "number" && e$jscomp$107 !== "longjmp") {
        throw e$jscomp$107;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiifffiiifiii$jscomp$0(index$jscomp$132, a1$jscomp$59, a2$jscomp$55, a3$jscomp$43, a4$jscomp$30, a5$jscomp$14, a6$jscomp$7, a7$jscomp$4, a8$jscomp$1, a9$jscomp$0, a10$jscomp$0, a11$jscomp$0, a12$jscomp$0, a13$jscomp$0, a14$jscomp$0, a15$jscomp$0) {
    var sp$jscomp$61 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiifffiiifiii"](index$jscomp$132, a1$jscomp$59, a2$jscomp$55, a3$jscomp$43, a4$jscomp$30, a5$jscomp$14, a6$jscomp$7, a7$jscomp$4, a8$jscomp$1, a9$jscomp$0, a10$jscomp$0, a11$jscomp$0, a12$jscomp$0, a13$jscomp$0, a14$jscomp$0, a15$jscomp$0);
    } catch (e$jscomp$108) {
      stackRestore$jscomp$0(sp$jscomp$61);
      if (typeof e$jscomp$108 !== "number" && e$jscomp$108 !== "longjmp") {
        throw e$jscomp$108;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiffiiiiiiiiiffffiii$jscomp$0(index$jscomp$133, a1$jscomp$60, a2$jscomp$56, a3$jscomp$44, a4$jscomp$31, a5$jscomp$15, a6$jscomp$8, a7$jscomp$5, a8$jscomp$2, a9$jscomp$1, a10$jscomp$1, a11$jscomp$1, a12$jscomp$1, a13$jscomp$1, a14$jscomp$1, a15$jscomp$1, a16$jscomp$0, a17$jscomp$0, a18$jscomp$0, a19$jscomp$0, a20$jscomp$0, a21$jscomp$0, a22$jscomp$0, a23$jscomp$0) {
    var sp$jscomp$62 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiffffiii"](index$jscomp$133, a1$jscomp$60, a2$jscomp$56, a3$jscomp$44, a4$jscomp$31, a5$jscomp$15, a6$jscomp$8, a7$jscomp$5, a8$jscomp$2, a9$jscomp$1, a10$jscomp$1, a11$jscomp$1, a12$jscomp$1, a13$jscomp$1, a14$jscomp$1, a15$jscomp$1, a16$jscomp$0, a17$jscomp$0, a18$jscomp$0, a19$jscomp$0, a20$jscomp$0, a21$jscomp$0, a22$jscomp$0, a23$jscomp$0);
    } catch (e$jscomp$109) {
      stackRestore$jscomp$0(sp$jscomp$62);
      if (typeof e$jscomp$109 !== "number" && e$jscomp$109 !== "longjmp") {
        throw e$jscomp$109;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiffiiiiiiiiiffffiiii$jscomp$0(index$jscomp$134, a1$jscomp$61, a2$jscomp$57, a3$jscomp$45, a4$jscomp$32, a5$jscomp$16, a6$jscomp$9, a7$jscomp$6, a8$jscomp$3, a9$jscomp$2, a10$jscomp$2, a11$jscomp$2, a12$jscomp$2, a13$jscomp$2, a14$jscomp$2, a15$jscomp$2, a16$jscomp$1, a17$jscomp$1, a18$jscomp$1, a19$jscomp$1, a20$jscomp$1, a21$jscomp$1, a22$jscomp$1, a23$jscomp$1, a24$jscomp$0) {
    var sp$jscomp$63 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiffffiiii"](index$jscomp$134, a1$jscomp$61, a2$jscomp$57, a3$jscomp$45, a4$jscomp$32, a5$jscomp$16, a6$jscomp$9, a7$jscomp$6, a8$jscomp$3, a9$jscomp$2, a10$jscomp$2, a11$jscomp$2, a12$jscomp$2, a13$jscomp$2, a14$jscomp$2, a15$jscomp$2, a16$jscomp$1, a17$jscomp$1, a18$jscomp$1, a19$jscomp$1, a20$jscomp$1, a21$jscomp$1, a22$jscomp$1, a23$jscomp$1, a24$jscomp$0);
    } catch (e$jscomp$110) {
      stackRestore$jscomp$0(sp$jscomp$63);
      if (typeof e$jscomp$110 !== "number" && e$jscomp$110 !== "longjmp") {
        throw e$jscomp$110;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiffiiiiiiiiiiiiiii$jscomp$0(index$jscomp$135, a1$jscomp$62, a2$jscomp$58, a3$jscomp$46, a4$jscomp$33, a5$jscomp$17, a6$jscomp$10, a7$jscomp$7, a8$jscomp$4, a9$jscomp$3, a10$jscomp$3, a11$jscomp$3, a12$jscomp$3, a13$jscomp$3, a14$jscomp$3, a15$jscomp$3, a16$jscomp$2, a17$jscomp$2, a18$jscomp$2, a19$jscomp$2, a20$jscomp$2, a21$jscomp$2, a22$jscomp$2) {
    var sp$jscomp$64 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiiiiiii"](index$jscomp$135, a1$jscomp$62, a2$jscomp$58, a3$jscomp$46, a4$jscomp$33, a5$jscomp$17, a6$jscomp$10, a7$jscomp$7, a8$jscomp$4, a9$jscomp$3, a10$jscomp$3, a11$jscomp$3, a12$jscomp$3, a13$jscomp$3, a14$jscomp$3, a15$jscomp$3, a16$jscomp$2, a17$jscomp$2, a18$jscomp$2, a19$jscomp$2, a20$jscomp$2, a21$jscomp$2, a22$jscomp$2);
    } catch (e$jscomp$111) {
      stackRestore$jscomp$0(sp$jscomp$64);
      if (typeof e$jscomp$111 !== "number" && e$jscomp$111 !== "longjmp") {
        throw e$jscomp$111;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiii$jscomp$0(index$jscomp$136, a1$jscomp$63, a2$jscomp$59, a3$jscomp$47, a4$jscomp$34, a5$jscomp$18, a6$jscomp$11) {
    var sp$jscomp$65 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiii"](index$jscomp$136, a1$jscomp$63, a2$jscomp$59, a3$jscomp$47, a4$jscomp$34, a5$jscomp$18, a6$jscomp$11);
    } catch (e$jscomp$112) {
      stackRestore$jscomp$0(sp$jscomp$65);
      if (typeof e$jscomp$112 !== "number" && e$jscomp$112 !== "longjmp") {
        throw e$jscomp$112;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiii$jscomp$0(index$jscomp$137, a1$jscomp$64, a2$jscomp$60, a3$jscomp$48, a4$jscomp$35, a5$jscomp$19, a6$jscomp$12, a7$jscomp$8) {
    var sp$jscomp$66 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiii"](index$jscomp$137, a1$jscomp$64, a2$jscomp$60, a3$jscomp$48, a4$jscomp$35, a5$jscomp$19, a6$jscomp$12, a7$jscomp$8);
    } catch (e$jscomp$113) {
      stackRestore$jscomp$0(sp$jscomp$66);
      if (typeof e$jscomp$113 !== "number" && e$jscomp$113 !== "longjmp") {
        throw e$jscomp$113;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiii$jscomp$0(index$jscomp$138, a1$jscomp$65, a2$jscomp$61, a3$jscomp$49, a4$jscomp$36, a5$jscomp$20, a6$jscomp$13, a7$jscomp$9, a8$jscomp$5) {
    var sp$jscomp$67 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiii"](index$jscomp$138, a1$jscomp$65, a2$jscomp$61, a3$jscomp$49, a4$jscomp$36, a5$jscomp$20, a6$jscomp$13, a7$jscomp$9, a8$jscomp$5);
    } catch (e$jscomp$114) {
      stackRestore$jscomp$0(sp$jscomp$67);
      if (typeof e$jscomp$114 !== "number" && e$jscomp$114 !== "longjmp") {
        throw e$jscomp$114;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiiii$jscomp$0(index$jscomp$139, a1$jscomp$66, a2$jscomp$62, a3$jscomp$50, a4$jscomp$37, a5$jscomp$21, a6$jscomp$14, a7$jscomp$10, a8$jscomp$6, a9$jscomp$4) {
    var sp$jscomp$68 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiiii"](index$jscomp$139, a1$jscomp$66, a2$jscomp$62, a3$jscomp$50, a4$jscomp$37, a5$jscomp$21, a6$jscomp$14, a7$jscomp$10, a8$jscomp$6, a9$jscomp$4);
    } catch (e$jscomp$115) {
      stackRestore$jscomp$0(sp$jscomp$68);
      if (typeof e$jscomp$115 !== "number" && e$jscomp$115 !== "longjmp") {
        throw e$jscomp$115;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiiiii$jscomp$0(index$jscomp$140, a1$jscomp$67, a2$jscomp$63, a3$jscomp$51, a4$jscomp$38, a5$jscomp$22, a6$jscomp$15, a7$jscomp$11, a8$jscomp$7, a9$jscomp$5, a10$jscomp$4) {
    var sp$jscomp$69 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiiiii"](index$jscomp$140, a1$jscomp$67, a2$jscomp$63, a3$jscomp$51, a4$jscomp$38, a5$jscomp$22, a6$jscomp$15, a7$jscomp$11, a8$jscomp$7, a9$jscomp$5, a10$jscomp$4);
    } catch (e$jscomp$116) {
      stackRestore$jscomp$0(sp$jscomp$69);
      if (typeof e$jscomp$116 !== "number" && e$jscomp$116 !== "longjmp") {
        throw e$jscomp$116;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiiiiii$jscomp$0(index$jscomp$141, a1$jscomp$68, a2$jscomp$64, a3$jscomp$52, a4$jscomp$39, a5$jscomp$23, a6$jscomp$16, a7$jscomp$12, a8$jscomp$8, a9$jscomp$6, a10$jscomp$5, a11$jscomp$4) {
    var sp$jscomp$70 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiiiiii"](index$jscomp$141, a1$jscomp$68, a2$jscomp$64, a3$jscomp$52, a4$jscomp$39, a5$jscomp$23, a6$jscomp$16, a7$jscomp$12, a8$jscomp$8, a9$jscomp$6, a10$jscomp$5, a11$jscomp$4);
    } catch (e$jscomp$117) {
      stackRestore$jscomp$0(sp$jscomp$70);
      if (typeof e$jscomp$117 !== "number" && e$jscomp$117 !== "longjmp") {
        throw e$jscomp$117;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiiiiiii$jscomp$0(index$jscomp$142, a1$jscomp$69, a2$jscomp$65, a3$jscomp$53, a4$jscomp$40, a5$jscomp$24, a6$jscomp$17, a7$jscomp$13, a8$jscomp$9, a9$jscomp$7, a10$jscomp$6, a11$jscomp$5, a12$jscomp$4) {
    var sp$jscomp$71 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiiiiiii"](index$jscomp$142, a1$jscomp$69, a2$jscomp$65, a3$jscomp$53, a4$jscomp$40, a5$jscomp$24, a6$jscomp$17, a7$jscomp$13, a8$jscomp$9, a9$jscomp$7, a10$jscomp$6, a11$jscomp$5, a12$jscomp$4);
    } catch (e$jscomp$118) {
      stackRestore$jscomp$0(sp$jscomp$71);
      if (typeof e$jscomp$118 !== "number" && e$jscomp$118 !== "longjmp") {
        throw e$jscomp$118;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiiiiiiiiii$jscomp$0(index$jscomp$143, a1$jscomp$70, a2$jscomp$66, a3$jscomp$54, a4$jscomp$41, a5$jscomp$25, a6$jscomp$18, a7$jscomp$14, a8$jscomp$10, a9$jscomp$8, a10$jscomp$7, a11$jscomp$6, a12$jscomp$5, a13$jscomp$4) {
    var sp$jscomp$72 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiiiiiiiiii"](index$jscomp$143, a1$jscomp$70, a2$jscomp$66, a3$jscomp$54, a4$jscomp$41, a5$jscomp$25, a6$jscomp$18, a7$jscomp$14, a8$jscomp$10, a9$jscomp$8, a10$jscomp$7, a11$jscomp$6, a12$jscomp$5, a13$jscomp$4);
    } catch (e$jscomp$119) {
      stackRestore$jscomp$0(sp$jscomp$72);
      if (typeof e$jscomp$119 !== "number" && e$jscomp$119 !== "longjmp") {
        throw e$jscomp$119;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiji$jscomp$0(index$jscomp$144, a1$jscomp$71, a2$jscomp$67, a3$jscomp$55, a4$jscomp$42, a5$jscomp$26, a6$jscomp$19, a7$jscomp$15) {
    var sp$jscomp$73 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiiji"](index$jscomp$144, a1$jscomp$71, a2$jscomp$67, a3$jscomp$55, a4$jscomp$42, a5$jscomp$26, a6$jscomp$19, a7$jscomp$15);
    } catch (e$jscomp$120) {
      stackRestore$jscomp$0(sp$jscomp$73);
      if (typeof e$jscomp$120 !== "number" && e$jscomp$120 !== "longjmp") {
        throw e$jscomp$120;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiij$jscomp$0(index$jscomp$145, a1$jscomp$72, a2$jscomp$68, a3$jscomp$56, a4$jscomp$43, a5$jscomp$27) {
    var sp$jscomp$74 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiij"](index$jscomp$145, a1$jscomp$72, a2$jscomp$68, a3$jscomp$56, a4$jscomp$43, a5$jscomp$27);
    } catch (e$jscomp$121) {
      stackRestore$jscomp$0(sp$jscomp$74);
      if (typeof e$jscomp$121 !== "number" && e$jscomp$121 !== "longjmp") {
        throw e$jscomp$121;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiiji$jscomp$0(index$jscomp$146, a1$jscomp$73, a2$jscomp$69, a3$jscomp$57, a4$jscomp$44, a5$jscomp$28, a6$jscomp$20) {
    var sp$jscomp$75 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiiji"](index$jscomp$146, a1$jscomp$73, a2$jscomp$69, a3$jscomp$57, a4$jscomp$44, a5$jscomp$28, a6$jscomp$20);
    } catch (e$jscomp$122) {
      stackRestore$jscomp$0(sp$jscomp$75);
      if (typeof e$jscomp$122 !== "number" && e$jscomp$122 !== "longjmp") {
        throw e$jscomp$122;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiijii$jscomp$0(index$jscomp$147, a1$jscomp$74, a2$jscomp$70, a3$jscomp$58, a4$jscomp$45, a5$jscomp$29, a6$jscomp$21, a7$jscomp$16) {
    var sp$jscomp$76 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiijii"](index$jscomp$147, a1$jscomp$74, a2$jscomp$70, a3$jscomp$58, a4$jscomp$45, a5$jscomp$29, a6$jscomp$21, a7$jscomp$16);
    } catch (e$jscomp$123) {
      stackRestore$jscomp$0(sp$jscomp$76);
      if (typeof e$jscomp$123 !== "number" && e$jscomp$123 !== "longjmp") {
        throw e$jscomp$123;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiijiii$jscomp$0(index$jscomp$148, a1$jscomp$75, a2$jscomp$71, a3$jscomp$59, a4$jscomp$46, a5$jscomp$30, a6$jscomp$22, a7$jscomp$17, a8$jscomp$11) {
    var sp$jscomp$77 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiijiii"](index$jscomp$148, a1$jscomp$75, a2$jscomp$71, a3$jscomp$59, a4$jscomp$46, a5$jscomp$30, a6$jscomp$22, a7$jscomp$17, a8$jscomp$11);
    } catch (e$jscomp$124) {
      stackRestore$jscomp$0(sp$jscomp$77);
      if (typeof e$jscomp$124 !== "number" && e$jscomp$124 !== "longjmp") {
        throw e$jscomp$124;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiij$jscomp$0(index$jscomp$149, a1$jscomp$76, a2$jscomp$72, a3$jscomp$60, a4$jscomp$47) {
    var sp$jscomp$78 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiij"](index$jscomp$149, a1$jscomp$76, a2$jscomp$72, a3$jscomp$60, a4$jscomp$47);
    } catch (e$jscomp$125) {
      stackRestore$jscomp$0(sp$jscomp$78);
      if (typeof e$jscomp$125 !== "number" && e$jscomp$125 !== "longjmp") {
        throw e$jscomp$125;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiiji$jscomp$0(index$jscomp$150, a1$jscomp$77, a2$jscomp$73, a3$jscomp$61, a4$jscomp$48, a5$jscomp$31) {
    var sp$jscomp$79 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiiji"](index$jscomp$150, a1$jscomp$77, a2$jscomp$73, a3$jscomp$61, a4$jscomp$48, a5$jscomp$31);
    } catch (e$jscomp$126) {
      stackRestore$jscomp$0(sp$jscomp$79);
      if (typeof e$jscomp$126 !== "number" && e$jscomp$126 !== "longjmp") {
        throw e$jscomp$126;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiijii$jscomp$0(index$jscomp$151, a1$jscomp$78, a2$jscomp$74, a3$jscomp$62, a4$jscomp$49, a5$jscomp$32, a6$jscomp$23) {
    var sp$jscomp$80 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiijii"](index$jscomp$151, a1$jscomp$78, a2$jscomp$74, a3$jscomp$62, a4$jscomp$49, a5$jscomp$32, a6$jscomp$23);
    } catch (e$jscomp$127) {
      stackRestore$jscomp$0(sp$jscomp$80);
      if (typeof e$jscomp$127 !== "number" && e$jscomp$127 !== "longjmp") {
        throw e$jscomp$127;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiijiii$jscomp$0(index$jscomp$152, a1$jscomp$79, a2$jscomp$75, a3$jscomp$63, a4$jscomp$50, a5$jscomp$33, a6$jscomp$24, a7$jscomp$18) {
    var sp$jscomp$81 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiijiii"](index$jscomp$152, a1$jscomp$79, a2$jscomp$75, a3$jscomp$63, a4$jscomp$50, a5$jscomp$33, a6$jscomp$24, a7$jscomp$18);
    } catch (e$jscomp$128) {
      stackRestore$jscomp$0(sp$jscomp$81);
      if (typeof e$jscomp$128 !== "number" && e$jscomp$128 !== "longjmp") {
        throw e$jscomp$128;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iij$jscomp$0(index$jscomp$153, a1$jscomp$80, a2$jscomp$76, a3$jscomp$64) {
    var sp$jscomp$82 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iij"](index$jscomp$153, a1$jscomp$80, a2$jscomp$76, a3$jscomp$64);
    } catch (e$jscomp$129) {
      stackRestore$jscomp$0(sp$jscomp$82);
      if (typeof e$jscomp$129 !== "number" && e$jscomp$129 !== "longjmp") {
        throw e$jscomp$129;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iiji$jscomp$0(index$jscomp$154, a1$jscomp$81, a2$jscomp$77, a3$jscomp$65, a4$jscomp$51) {
    var sp$jscomp$83 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iiji"](index$jscomp$154, a1$jscomp$81, a2$jscomp$77, a3$jscomp$65, a4$jscomp$51);
    } catch (e$jscomp$130) {
      stackRestore$jscomp$0(sp$jscomp$83);
      if (typeof e$jscomp$130 !== "number" && e$jscomp$130 !== "longjmp") {
        throw e$jscomp$130;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijii$jscomp$0(index$jscomp$155, a1$jscomp$82, a2$jscomp$78, a3$jscomp$66, a4$jscomp$52, a5$jscomp$34) {
    var sp$jscomp$84 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijii"](index$jscomp$155, a1$jscomp$82, a2$jscomp$78, a3$jscomp$66, a4$jscomp$52, a5$jscomp$34);
    } catch (e$jscomp$131) {
      stackRestore$jscomp$0(sp$jscomp$84);
      if (typeof e$jscomp$131 !== "number" && e$jscomp$131 !== "longjmp") {
        throw e$jscomp$131;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijiii$jscomp$0(index$jscomp$156, a1$jscomp$83, a2$jscomp$79, a3$jscomp$67, a4$jscomp$53, a5$jscomp$35, a6$jscomp$25) {
    var sp$jscomp$85 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijiii"](index$jscomp$156, a1$jscomp$83, a2$jscomp$79, a3$jscomp$67, a4$jscomp$53, a5$jscomp$35, a6$jscomp$25);
    } catch (e$jscomp$132) {
      stackRestore$jscomp$0(sp$jscomp$85);
      if (typeof e$jscomp$132 !== "number" && e$jscomp$132 !== "longjmp") {
        throw e$jscomp$132;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijji$jscomp$0(index$jscomp$157, a1$jscomp$84, a2$jscomp$80, a3$jscomp$68, a4$jscomp$54, a5$jscomp$36, a6$jscomp$26) {
    var sp$jscomp$86 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijji"](index$jscomp$157, a1$jscomp$84, a2$jscomp$80, a3$jscomp$68, a4$jscomp$54, a5$jscomp$36, a6$jscomp$26);
    } catch (e$jscomp$133) {
      stackRestore$jscomp$0(sp$jscomp$86);
      if (typeof e$jscomp$133 !== "number" && e$jscomp$133 !== "longjmp") {
        throw e$jscomp$133;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijjii$jscomp$0(index$jscomp$158, a1$jscomp$85, a2$jscomp$81, a3$jscomp$69, a4$jscomp$55, a5$jscomp$37, a6$jscomp$27, a7$jscomp$19) {
    var sp$jscomp$87 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijjii"](index$jscomp$158, a1$jscomp$85, a2$jscomp$81, a3$jscomp$69, a4$jscomp$55, a5$jscomp$37, a6$jscomp$27, a7$jscomp$19);
    } catch (e$jscomp$134) {
      stackRestore$jscomp$0(sp$jscomp$87);
      if (typeof e$jscomp$134 !== "number" && e$jscomp$134 !== "longjmp") {
        throw e$jscomp$134;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijjiii$jscomp$0(index$jscomp$159, a1$jscomp$86, a2$jscomp$82, a3$jscomp$70, a4$jscomp$56, a5$jscomp$38, a6$jscomp$28, a7$jscomp$20, a8$jscomp$12) {
    var sp$jscomp$88 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijjiii"](index$jscomp$159, a1$jscomp$86, a2$jscomp$82, a3$jscomp$70, a4$jscomp$56, a5$jscomp$38, a6$jscomp$28, a7$jscomp$20, a8$jscomp$12);
    } catch (e$jscomp$135) {
      stackRestore$jscomp$0(sp$jscomp$88);
      if (typeof e$jscomp$135 !== "number" && e$jscomp$135 !== "longjmp") {
        throw e$jscomp$135;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iijjji$jscomp$0(index$jscomp$160, a1$jscomp$87, a2$jscomp$83, a3$jscomp$71, a4$jscomp$57, a5$jscomp$39, a6$jscomp$29, a7$jscomp$21, a8$jscomp$13) {
    var sp$jscomp$89 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iijjji"](index$jscomp$160, a1$jscomp$87, a2$jscomp$83, a3$jscomp$71, a4$jscomp$57, a5$jscomp$39, a6$jscomp$29, a7$jscomp$21, a8$jscomp$13);
    } catch (e$jscomp$136) {
      stackRestore$jscomp$0(sp$jscomp$89);
      if (typeof e$jscomp$136 !== "number" && e$jscomp$136 !== "longjmp") {
        throw e$jscomp$136;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ij$jscomp$0(index$jscomp$161, a1$jscomp$88, a2$jscomp$84) {
    var sp$jscomp$90 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ij"](index$jscomp$161, a1$jscomp$88, a2$jscomp$84);
    } catch (e$jscomp$137) {
      stackRestore$jscomp$0(sp$jscomp$90);
      if (typeof e$jscomp$137 !== "number" && e$jscomp$137 !== "longjmp") {
        throw e$jscomp$137;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_iji$jscomp$0(index$jscomp$162, a1$jscomp$89, a2$jscomp$85, a3$jscomp$72) {
    var sp$jscomp$91 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_iji"](index$jscomp$162, a1$jscomp$89, a2$jscomp$85, a3$jscomp$72);
    } catch (e$jscomp$138) {
      stackRestore$jscomp$0(sp$jscomp$91);
      if (typeof e$jscomp$138 !== "number" && e$jscomp$138 !== "longjmp") {
        throw e$jscomp$138;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ijiii$jscomp$0(index$jscomp$163, a1$jscomp$90, a2$jscomp$86, a3$jscomp$73, a4$jscomp$58, a5$jscomp$40) {
    var sp$jscomp$92 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ijiii"](index$jscomp$163, a1$jscomp$90, a2$jscomp$86, a3$jscomp$73, a4$jscomp$58, a5$jscomp$40);
    } catch (e$jscomp$139) {
      stackRestore$jscomp$0(sp$jscomp$92);
      if (typeof e$jscomp$139 !== "number" && e$jscomp$139 !== "longjmp") {
        throw e$jscomp$139;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ijj$jscomp$0(index$jscomp$164, a1$jscomp$91, a2$jscomp$87, a3$jscomp$74, a4$jscomp$59) {
    var sp$jscomp$93 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ijj"](index$jscomp$164, a1$jscomp$91, a2$jscomp$87, a3$jscomp$74, a4$jscomp$59);
    } catch (e$jscomp$140) {
      stackRestore$jscomp$0(sp$jscomp$93);
      if (typeof e$jscomp$140 !== "number" && e$jscomp$140 !== "longjmp") {
        throw e$jscomp$140;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ijji$jscomp$0(index$jscomp$165, a1$jscomp$92, a2$jscomp$88, a3$jscomp$75, a4$jscomp$60, a5$jscomp$41) {
    var sp$jscomp$94 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ijji"](index$jscomp$165, a1$jscomp$92, a2$jscomp$88, a3$jscomp$75, a4$jscomp$60, a5$jscomp$41);
    } catch (e$jscomp$141) {
      stackRestore$jscomp$0(sp$jscomp$94);
      if (typeof e$jscomp$141 !== "number" && e$jscomp$141 !== "longjmp") {
        throw e$jscomp$141;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_j$jscomp$0(index$jscomp$166) {
    var sp$jscomp$95 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_j"](index$jscomp$166);
    } catch (e$jscomp$142) {
      stackRestore$jscomp$0(sp$jscomp$95);
      if (typeof e$jscomp$142 !== "number" && e$jscomp$142 !== "longjmp") {
        throw e$jscomp$142;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jdi$jscomp$0(index$jscomp$167, a1$jscomp$93, a2$jscomp$89) {
    var sp$jscomp$96 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jdi"](index$jscomp$167, a1$jscomp$93, a2$jscomp$89);
    } catch (e$jscomp$143) {
      stackRestore$jscomp$0(sp$jscomp$96);
      if (typeof e$jscomp$143 !== "number" && e$jscomp$143 !== "longjmp") {
        throw e$jscomp$143;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jdii$jscomp$0(index$jscomp$168, a1$jscomp$94, a2$jscomp$90, a3$jscomp$76) {
    var sp$jscomp$97 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jdii"](index$jscomp$168, a1$jscomp$94, a2$jscomp$90, a3$jscomp$76);
    } catch (e$jscomp$144) {
      stackRestore$jscomp$0(sp$jscomp$97);
      if (typeof e$jscomp$144 !== "number" && e$jscomp$144 !== "longjmp") {
        throw e$jscomp$144;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jfi$jscomp$0(index$jscomp$169, a1$jscomp$95, a2$jscomp$91) {
    var sp$jscomp$98 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jfi"](index$jscomp$169, a1$jscomp$95, a2$jscomp$91);
    } catch (e$jscomp$145) {
      stackRestore$jscomp$0(sp$jscomp$98);
      if (typeof e$jscomp$145 !== "number" && e$jscomp$145 !== "longjmp") {
        throw e$jscomp$145;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_ji$jscomp$0(index$jscomp$170, a1$jscomp$96) {
    var sp$jscomp$99 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_ji"](index$jscomp$170, a1$jscomp$96);
    } catch (e$jscomp$146) {
      stackRestore$jscomp$0(sp$jscomp$99);
      if (typeof e$jscomp$146 !== "number" && e$jscomp$146 !== "longjmp") {
        throw e$jscomp$146;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jidi$jscomp$0(index$jscomp$171, a1$jscomp$97, a2$jscomp$92, a3$jscomp$77) {
    var sp$jscomp$100 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jidi"](index$jscomp$171, a1$jscomp$97, a2$jscomp$92, a3$jscomp$77);
    } catch (e$jscomp$147) {
      stackRestore$jscomp$0(sp$jscomp$100);
      if (typeof e$jscomp$147 !== "number" && e$jscomp$147 !== "longjmp") {
        throw e$jscomp$147;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jidii$jscomp$0(index$jscomp$172, a1$jscomp$98, a2$jscomp$93, a3$jscomp$78, a4$jscomp$61) {
    var sp$jscomp$101 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jidii"](index$jscomp$172, a1$jscomp$98, a2$jscomp$93, a3$jscomp$78, a4$jscomp$61);
    } catch (e$jscomp$148) {
      stackRestore$jscomp$0(sp$jscomp$101);
      if (typeof e$jscomp$148 !== "number" && e$jscomp$148 !== "longjmp") {
        throw e$jscomp$148;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jii$jscomp$0(index$jscomp$173, a1$jscomp$99, a2$jscomp$94) {
    var sp$jscomp$102 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jii"](index$jscomp$173, a1$jscomp$99, a2$jscomp$94);
    } catch (e$jscomp$149) {
      stackRestore$jscomp$0(sp$jscomp$102);
      if (typeof e$jscomp$149 !== "number" && e$jscomp$149 !== "longjmp") {
        throw e$jscomp$149;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiii$jscomp$0(index$jscomp$174, a1$jscomp$100, a2$jscomp$95, a3$jscomp$79) {
    var sp$jscomp$103 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiii"](index$jscomp$174, a1$jscomp$100, a2$jscomp$95, a3$jscomp$79);
    } catch (e$jscomp$150) {
      stackRestore$jscomp$0(sp$jscomp$103);
      if (typeof e$jscomp$150 !== "number" && e$jscomp$150 !== "longjmp") {
        throw e$jscomp$150;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiiii$jscomp$0(index$jscomp$175, a1$jscomp$101, a2$jscomp$96, a3$jscomp$80, a4$jscomp$62) {
    var sp$jscomp$104 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiiii"](index$jscomp$175, a1$jscomp$101, a2$jscomp$96, a3$jscomp$80, a4$jscomp$62);
    } catch (e$jscomp$151) {
      stackRestore$jscomp$0(sp$jscomp$104);
      if (typeof e$jscomp$151 !== "number" && e$jscomp$151 !== "longjmp") {
        throw e$jscomp$151;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiiiii$jscomp$0(index$jscomp$176, a1$jscomp$102, a2$jscomp$97, a3$jscomp$81, a4$jscomp$63, a5$jscomp$42) {
    var sp$jscomp$105 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiiiii"](index$jscomp$176, a1$jscomp$102, a2$jscomp$97, a3$jscomp$81, a4$jscomp$63, a5$jscomp$42);
    } catch (e$jscomp$152) {
      stackRestore$jscomp$0(sp$jscomp$105);
      if (typeof e$jscomp$152 !== "number" && e$jscomp$152 !== "longjmp") {
        throw e$jscomp$152;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiiiiii$jscomp$0(index$jscomp$177, a1$jscomp$103, a2$jscomp$98, a3$jscomp$82, a4$jscomp$64, a5$jscomp$43, a6$jscomp$30) {
    var sp$jscomp$106 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiiiiii"](index$jscomp$177, a1$jscomp$103, a2$jscomp$98, a3$jscomp$82, a4$jscomp$64, a5$jscomp$43, a6$jscomp$30);
    } catch (e$jscomp$153) {
      stackRestore$jscomp$0(sp$jscomp$106);
      if (typeof e$jscomp$153 !== "number" && e$jscomp$153 !== "longjmp") {
        throw e$jscomp$153;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiiiiiiiiii$jscomp$0(index$jscomp$178, a1$jscomp$104, a2$jscomp$99, a3$jscomp$83, a4$jscomp$65, a5$jscomp$44, a6$jscomp$31, a7$jscomp$22, a8$jscomp$14, a9$jscomp$9, a10$jscomp$8) {
    var sp$jscomp$107 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiiiiiiiiii"](index$jscomp$178, a1$jscomp$104, a2$jscomp$99, a3$jscomp$83, a4$jscomp$65, a5$jscomp$44, a6$jscomp$31, a7$jscomp$22, a8$jscomp$14, a9$jscomp$9, a10$jscomp$8);
    } catch (e$jscomp$154) {
      stackRestore$jscomp$0(sp$jscomp$107);
      if (typeof e$jscomp$154 !== "number" && e$jscomp$154 !== "longjmp") {
        throw e$jscomp$154;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiiji$jscomp$0(index$jscomp$179, a1$jscomp$105, a2$jscomp$100, a3$jscomp$84, a4$jscomp$66, a5$jscomp$45) {
    var sp$jscomp$108 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiiji"](index$jscomp$179, a1$jscomp$105, a2$jscomp$100, a3$jscomp$84, a4$jscomp$66, a5$jscomp$45);
    } catch (e$jscomp$155) {
      stackRestore$jscomp$0(sp$jscomp$108);
      if (typeof e$jscomp$155 !== "number" && e$jscomp$155 !== "longjmp") {
        throw e$jscomp$155;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jiji$jscomp$0(index$jscomp$180, a1$jscomp$106, a2$jscomp$101, a3$jscomp$85, a4$jscomp$67) {
    var sp$jscomp$109 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jiji"](index$jscomp$180, a1$jscomp$106, a2$jscomp$101, a3$jscomp$85, a4$jscomp$67);
    } catch (e$jscomp$156) {
      stackRestore$jscomp$0(sp$jscomp$109);
      if (typeof e$jscomp$156 !== "number" && e$jscomp$156 !== "longjmp") {
        throw e$jscomp$156;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jijii$jscomp$0(index$jscomp$181, a1$jscomp$107, a2$jscomp$102, a3$jscomp$86, a4$jscomp$68, a5$jscomp$46) {
    var sp$jscomp$110 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jijii"](index$jscomp$181, a1$jscomp$107, a2$jscomp$102, a3$jscomp$86, a4$jscomp$68, a5$jscomp$46);
    } catch (e$jscomp$157) {
      stackRestore$jscomp$0(sp$jscomp$110);
      if (typeof e$jscomp$157 !== "number" && e$jscomp$157 !== "longjmp") {
        throw e$jscomp$157;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jijiii$jscomp$0(index$jscomp$182, a1$jscomp$108, a2$jscomp$103, a3$jscomp$87, a4$jscomp$69, a5$jscomp$47, a6$jscomp$32) {
    var sp$jscomp$111 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jijiii"](index$jscomp$182, a1$jscomp$108, a2$jscomp$103, a3$jscomp$87, a4$jscomp$69, a5$jscomp$47, a6$jscomp$32);
    } catch (e$jscomp$158) {
      stackRestore$jscomp$0(sp$jscomp$111);
      if (typeof e$jscomp$158 !== "number" && e$jscomp$158 !== "longjmp") {
        throw e$jscomp$158;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jijj$jscomp$0(index$jscomp$183, a1$jscomp$109, a2$jscomp$104, a3$jscomp$88, a4$jscomp$70, a5$jscomp$48) {
    var sp$jscomp$112 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jijj"](index$jscomp$183, a1$jscomp$109, a2$jscomp$104, a3$jscomp$88, a4$jscomp$70, a5$jscomp$48);
    } catch (e$jscomp$159) {
      stackRestore$jscomp$0(sp$jscomp$112);
      if (typeof e$jscomp$159 !== "number" && e$jscomp$159 !== "longjmp") {
        throw e$jscomp$159;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jijji$jscomp$0(index$jscomp$184, a1$jscomp$110, a2$jscomp$105, a3$jscomp$89, a4$jscomp$71, a5$jscomp$49, a6$jscomp$33) {
    var sp$jscomp$113 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jijji"](index$jscomp$184, a1$jscomp$110, a2$jscomp$105, a3$jscomp$89, a4$jscomp$71, a5$jscomp$49, a6$jscomp$33);
    } catch (e$jscomp$160) {
      stackRestore$jscomp$0(sp$jscomp$113);
      if (typeof e$jscomp$160 !== "number" && e$jscomp$160 !== "longjmp") {
        throw e$jscomp$160;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_jji$jscomp$0(index$jscomp$185, a1$jscomp$111, a2$jscomp$106, a3$jscomp$90) {
    var sp$jscomp$114 = stackSave$jscomp$0();
    try {
      return Module$jscomp$0["dynCall_jji"](index$jscomp$185, a1$jscomp$111, a2$jscomp$106, a3$jscomp$90);
    } catch (e$jscomp$161) {
      stackRestore$jscomp$0(sp$jscomp$114);
      if (typeof e$jscomp$161 !== "number" && e$jscomp$161 !== "longjmp") {
        throw e$jscomp$161;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_v$jscomp$0(index$jscomp$186) {
    var sp$jscomp$115 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_v"](index$jscomp$186);
    } catch (e$jscomp$162) {
      stackRestore$jscomp$0(sp$jscomp$115);
      if (typeof e$jscomp$162 !== "number" && e$jscomp$162 !== "longjmp") {
        throw e$jscomp$162;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vd$jscomp$0(index$jscomp$187, a1$jscomp$112) {
    var sp$jscomp$116 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vd"](index$jscomp$187, a1$jscomp$112);
    } catch (e$jscomp$163) {
      stackRestore$jscomp$0(sp$jscomp$116);
      if (typeof e$jscomp$163 !== "number" && e$jscomp$163 !== "longjmp") {
        throw e$jscomp$163;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vf$jscomp$0(index$jscomp$188, a1$jscomp$113) {
    var sp$jscomp$117 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vf"](index$jscomp$188, a1$jscomp$113);
    } catch (e$jscomp$164) {
      stackRestore$jscomp$0(sp$jscomp$117);
      if (typeof e$jscomp$164 !== "number" && e$jscomp$164 !== "longjmp") {
        throw e$jscomp$164;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vff$jscomp$0(index$jscomp$189, a1$jscomp$114, a2$jscomp$107) {
    var sp$jscomp$118 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vff"](index$jscomp$189, a1$jscomp$114, a2$jscomp$107);
    } catch (e$jscomp$165) {
      stackRestore$jscomp$0(sp$jscomp$118);
      if (typeof e$jscomp$165 !== "number" && e$jscomp$165 !== "longjmp") {
        throw e$jscomp$165;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vffff$jscomp$0(index$jscomp$190, a1$jscomp$115, a2$jscomp$108, a3$jscomp$91, a4$jscomp$72) {
    var sp$jscomp$119 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vffff"](index$jscomp$190, a1$jscomp$115, a2$jscomp$108, a3$jscomp$91, a4$jscomp$72);
    } catch (e$jscomp$166) {
      stackRestore$jscomp$0(sp$jscomp$119);
      if (typeof e$jscomp$166 !== "number" && e$jscomp$166 !== "longjmp") {
        throw e$jscomp$166;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vfi$jscomp$0(index$jscomp$191, a1$jscomp$116, a2$jscomp$109) {
    var sp$jscomp$120 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vfi"](index$jscomp$191, a1$jscomp$116, a2$jscomp$109);
    } catch (e$jscomp$167) {
      stackRestore$jscomp$0(sp$jscomp$120);
      if (typeof e$jscomp$167 !== "number" && e$jscomp$167 !== "longjmp") {
        throw e$jscomp$167;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vi$jscomp$0(index$jscomp$192, a1$jscomp$117) {
    var sp$jscomp$121 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vi"](index$jscomp$192, a1$jscomp$117);
    } catch (e$jscomp$168) {
      stackRestore$jscomp$0(sp$jscomp$121);
      if (typeof e$jscomp$168 !== "number" && e$jscomp$168 !== "longjmp") {
        throw e$jscomp$168;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vid$jscomp$0(index$jscomp$193, a1$jscomp$118, a2$jscomp$110) {
    var sp$jscomp$122 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vid"](index$jscomp$193, a1$jscomp$118, a2$jscomp$110);
    } catch (e$jscomp$169) {
      stackRestore$jscomp$0(sp$jscomp$122);
      if (typeof e$jscomp$169 !== "number" && e$jscomp$169 !== "longjmp") {
        throw e$jscomp$169;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vidi$jscomp$0(index$jscomp$194, a1$jscomp$119, a2$jscomp$111, a3$jscomp$92) {
    var sp$jscomp$123 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vidi"](index$jscomp$194, a1$jscomp$119, a2$jscomp$111, a3$jscomp$92);
    } catch (e$jscomp$170) {
      stackRestore$jscomp$0(sp$jscomp$123);
      if (typeof e$jscomp$170 !== "number" && e$jscomp$170 !== "longjmp") {
        throw e$jscomp$170;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vif$jscomp$0(index$jscomp$195, a1$jscomp$120, a2$jscomp$112) {
    var sp$jscomp$124 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vif"](index$jscomp$195, a1$jscomp$120, a2$jscomp$112);
    } catch (e$jscomp$171) {
      stackRestore$jscomp$0(sp$jscomp$124);
      if (typeof e$jscomp$171 !== "number" && e$jscomp$171 !== "longjmp") {
        throw e$jscomp$171;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viff$jscomp$0(index$jscomp$196, a1$jscomp$121, a2$jscomp$113, a3$jscomp$93) {
    var sp$jscomp$125 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viff"](index$jscomp$196, a1$jscomp$121, a2$jscomp$113, a3$jscomp$93);
    } catch (e$jscomp$172) {
      stackRestore$jscomp$0(sp$jscomp$125);
      if (typeof e$jscomp$172 !== "number" && e$jscomp$172 !== "longjmp") {
        throw e$jscomp$172;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vifff$jscomp$0(index$jscomp$197, a1$jscomp$122, a2$jscomp$114, a3$jscomp$94, a4$jscomp$73) {
    var sp$jscomp$126 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vifff"](index$jscomp$197, a1$jscomp$122, a2$jscomp$114, a3$jscomp$94, a4$jscomp$73);
    } catch (e$jscomp$173) {
      stackRestore$jscomp$0(sp$jscomp$126);
      if (typeof e$jscomp$173 !== "number" && e$jscomp$173 !== "longjmp") {
        throw e$jscomp$173;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffff$jscomp$0(index$jscomp$198, a1$jscomp$123, a2$jscomp$115, a3$jscomp$95, a4$jscomp$74, a5$jscomp$50) {
    var sp$jscomp$127 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffff"](index$jscomp$198, a1$jscomp$123, a2$jscomp$115, a3$jscomp$95, a4$jscomp$74, a5$jscomp$50);
    } catch (e$jscomp$174) {
      stackRestore$jscomp$0(sp$jscomp$127);
      if (typeof e$jscomp$174 !== "number" && e$jscomp$174 !== "longjmp") {
        throw e$jscomp$174;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffffi$jscomp$0(index$jscomp$199, a1$jscomp$124, a2$jscomp$116, a3$jscomp$96, a4$jscomp$75, a5$jscomp$51, a6$jscomp$34) {
    var sp$jscomp$128 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffffi"](index$jscomp$199, a1$jscomp$124, a2$jscomp$116, a3$jscomp$96, a4$jscomp$75, a5$jscomp$51, a6$jscomp$34);
    } catch (e$jscomp$175) {
      stackRestore$jscomp$0(sp$jscomp$128);
      if (typeof e$jscomp$175 !== "number" && e$jscomp$175 !== "longjmp") {
        throw e$jscomp$175;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffffii$jscomp$0(index$jscomp$200, a1$jscomp$125, a2$jscomp$117, a3$jscomp$97, a4$jscomp$76, a5$jscomp$52, a6$jscomp$35, a7$jscomp$23) {
    var sp$jscomp$129 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffffii"](index$jscomp$200, a1$jscomp$125, a2$jscomp$117, a3$jscomp$97, a4$jscomp$76, a5$jscomp$52, a6$jscomp$35, a7$jscomp$23);
    } catch (e$jscomp$176) {
      stackRestore$jscomp$0(sp$jscomp$129);
      if (typeof e$jscomp$176 !== "number" && e$jscomp$176 !== "longjmp") {
        throw e$jscomp$176;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vifffi$jscomp$0(index$jscomp$201, a1$jscomp$126, a2$jscomp$118, a3$jscomp$98, a4$jscomp$77, a5$jscomp$53) {
    var sp$jscomp$130 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vifffi"](index$jscomp$201, a1$jscomp$126, a2$jscomp$118, a3$jscomp$98, a4$jscomp$77, a5$jscomp$53);
    } catch (e$jscomp$177) {
      stackRestore$jscomp$0(sp$jscomp$130);
      if (typeof e$jscomp$177 !== "number" && e$jscomp$177 !== "longjmp") {
        throw e$jscomp$177;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vifffii$jscomp$0(index$jscomp$202, a1$jscomp$127, a2$jscomp$119, a3$jscomp$99, a4$jscomp$78, a5$jscomp$54, a6$jscomp$36) {
    var sp$jscomp$131 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vifffii"](index$jscomp$202, a1$jscomp$127, a2$jscomp$119, a3$jscomp$99, a4$jscomp$78, a5$jscomp$54, a6$jscomp$36);
    } catch (e$jscomp$178) {
      stackRestore$jscomp$0(sp$jscomp$131);
      if (typeof e$jscomp$178 !== "number" && e$jscomp$178 !== "longjmp") {
        throw e$jscomp$178;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffi$jscomp$0(index$jscomp$203, a1$jscomp$128, a2$jscomp$120, a3$jscomp$100, a4$jscomp$79) {
    var sp$jscomp$132 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffi"](index$jscomp$203, a1$jscomp$128, a2$jscomp$120, a3$jscomp$100, a4$jscomp$79);
    } catch (e$jscomp$179) {
      stackRestore$jscomp$0(sp$jscomp$132);
      if (typeof e$jscomp$179 !== "number" && e$jscomp$179 !== "longjmp") {
        throw e$jscomp$179;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffii$jscomp$0(index$jscomp$204, a1$jscomp$129, a2$jscomp$121, a3$jscomp$101, a4$jscomp$80, a5$jscomp$55) {
    var sp$jscomp$133 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffii"](index$jscomp$204, a1$jscomp$129, a2$jscomp$121, a3$jscomp$101, a4$jscomp$80, a5$jscomp$55);
    } catch (e$jscomp$180) {
      stackRestore$jscomp$0(sp$jscomp$133);
      if (typeof e$jscomp$180 !== "number" && e$jscomp$180 !== "longjmp") {
        throw e$jscomp$180;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viffiii$jscomp$0(index$jscomp$205, a1$jscomp$130, a2$jscomp$122, a3$jscomp$102, a4$jscomp$81, a5$jscomp$56, a6$jscomp$37) {
    var sp$jscomp$134 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viffiii"](index$jscomp$205, a1$jscomp$130, a2$jscomp$122, a3$jscomp$102, a4$jscomp$81, a5$jscomp$56, a6$jscomp$37);
    } catch (e$jscomp$181) {
      stackRestore$jscomp$0(sp$jscomp$134);
      if (typeof e$jscomp$181 !== "number" && e$jscomp$181 !== "longjmp") {
        throw e$jscomp$181;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vifi$jscomp$0(index$jscomp$206, a1$jscomp$131, a2$jscomp$123, a3$jscomp$103) {
    var sp$jscomp$135 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vifi"](index$jscomp$206, a1$jscomp$131, a2$jscomp$123, a3$jscomp$103);
    } catch (e$jscomp$182) {
      stackRestore$jscomp$0(sp$jscomp$135);
      if (typeof e$jscomp$182 !== "number" && e$jscomp$182 !== "longjmp") {
        throw e$jscomp$182;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vifii$jscomp$0(index$jscomp$207, a1$jscomp$132, a2$jscomp$124, a3$jscomp$104, a4$jscomp$82) {
    var sp$jscomp$136 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vifii"](index$jscomp$207, a1$jscomp$132, a2$jscomp$124, a3$jscomp$104, a4$jscomp$82);
    } catch (e$jscomp$183) {
      stackRestore$jscomp$0(sp$jscomp$136);
      if (typeof e$jscomp$183 !== "number" && e$jscomp$183 !== "longjmp") {
        throw e$jscomp$183;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vii$jscomp$0(index$jscomp$208, a1$jscomp$133, a2$jscomp$125) {
    var sp$jscomp$137 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vii"](index$jscomp$208, a1$jscomp$133, a2$jscomp$125);
    } catch (e$jscomp$184) {
      stackRestore$jscomp$0(sp$jscomp$137);
      if (typeof e$jscomp$184 !== "number" && e$jscomp$184 !== "longjmp") {
        throw e$jscomp$184;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viid$jscomp$0(index$jscomp$209, a1$jscomp$134, a2$jscomp$126, a3$jscomp$105) {
    var sp$jscomp$138 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viid"](index$jscomp$209, a1$jscomp$134, a2$jscomp$126, a3$jscomp$105);
    } catch (e$jscomp$185) {
      stackRestore$jscomp$0(sp$jscomp$138);
      if (typeof e$jscomp$185 !== "number" && e$jscomp$185 !== "longjmp") {
        throw e$jscomp$185;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viidi$jscomp$0(index$jscomp$210, a1$jscomp$135, a2$jscomp$127, a3$jscomp$106, a4$jscomp$83) {
    var sp$jscomp$139 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viidi"](index$jscomp$210, a1$jscomp$135, a2$jscomp$127, a3$jscomp$106, a4$jscomp$83);
    } catch (e$jscomp$186) {
      stackRestore$jscomp$0(sp$jscomp$139);
      if (typeof e$jscomp$186 !== "number" && e$jscomp$186 !== "longjmp") {
        throw e$jscomp$186;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viidii$jscomp$0(index$jscomp$211, a1$jscomp$136, a2$jscomp$128, a3$jscomp$107, a4$jscomp$84, a5$jscomp$57) {
    var sp$jscomp$140 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viidii"](index$jscomp$211, a1$jscomp$136, a2$jscomp$128, a3$jscomp$107, a4$jscomp$84, a5$jscomp$57);
    } catch (e$jscomp$187) {
      stackRestore$jscomp$0(sp$jscomp$140);
      if (typeof e$jscomp$187 !== "number" && e$jscomp$187 !== "longjmp") {
        throw e$jscomp$187;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viif$jscomp$0(index$jscomp$212, a1$jscomp$137, a2$jscomp$129, a3$jscomp$108) {
    var sp$jscomp$141 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viif"](index$jscomp$212, a1$jscomp$137, a2$jscomp$129, a3$jscomp$108);
    } catch (e$jscomp$188) {
      stackRestore$jscomp$0(sp$jscomp$141);
      if (typeof e$jscomp$188 !== "number" && e$jscomp$188 !== "longjmp") {
        throw e$jscomp$188;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiff$jscomp$0(index$jscomp$213, a1$jscomp$138, a2$jscomp$130, a3$jscomp$109, a4$jscomp$85) {
    var sp$jscomp$142 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiff"](index$jscomp$213, a1$jscomp$138, a2$jscomp$130, a3$jscomp$109, a4$jscomp$85);
    } catch (e$jscomp$189) {
      stackRestore$jscomp$0(sp$jscomp$142);
      if (typeof e$jscomp$189 !== "number" && e$jscomp$189 !== "longjmp") {
        throw e$jscomp$189;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viifff$jscomp$0(index$jscomp$214, a1$jscomp$139, a2$jscomp$131, a3$jscomp$110, a4$jscomp$86, a5$jscomp$58) {
    var sp$jscomp$143 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viifff"](index$jscomp$214, a1$jscomp$139, a2$jscomp$131, a3$jscomp$110, a4$jscomp$86, a5$jscomp$58);
    } catch (e$jscomp$190) {
      stackRestore$jscomp$0(sp$jscomp$143);
      if (typeof e$jscomp$190 !== "number" && e$jscomp$190 !== "longjmp") {
        throw e$jscomp$190;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiffi$jscomp$0(index$jscomp$215, a1$jscomp$140, a2$jscomp$132, a3$jscomp$111, a4$jscomp$87, a5$jscomp$59) {
    var sp$jscomp$144 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiffi"](index$jscomp$215, a1$jscomp$140, a2$jscomp$132, a3$jscomp$111, a4$jscomp$87, a5$jscomp$59);
    } catch (e$jscomp$191) {
      stackRestore$jscomp$0(sp$jscomp$144);
      if (typeof e$jscomp$191 !== "number" && e$jscomp$191 !== "longjmp") {
        throw e$jscomp$191;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiffii$jscomp$0(index$jscomp$216, a1$jscomp$141, a2$jscomp$133, a3$jscomp$112, a4$jscomp$88, a5$jscomp$60, a6$jscomp$38) {
    var sp$jscomp$145 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiffii"](index$jscomp$216, a1$jscomp$141, a2$jscomp$133, a3$jscomp$112, a4$jscomp$88, a5$jscomp$60, a6$jscomp$38);
    } catch (e$jscomp$192) {
      stackRestore$jscomp$0(sp$jscomp$145);
      if (typeof e$jscomp$192 !== "number" && e$jscomp$192 !== "longjmp") {
        throw e$jscomp$192;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viifi$jscomp$0(index$jscomp$217, a1$jscomp$142, a2$jscomp$134, a3$jscomp$113, a4$jscomp$89) {
    var sp$jscomp$146 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viifi"](index$jscomp$217, a1$jscomp$142, a2$jscomp$134, a3$jscomp$113, a4$jscomp$89);
    } catch (e$jscomp$193) {
      stackRestore$jscomp$0(sp$jscomp$146);
      if (typeof e$jscomp$193 !== "number" && e$jscomp$193 !== "longjmp") {
        throw e$jscomp$193;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viifii$jscomp$0(index$jscomp$218, a1$jscomp$143, a2$jscomp$135, a3$jscomp$114, a4$jscomp$90, a5$jscomp$61) {
    var sp$jscomp$147 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viifii"](index$jscomp$218, a1$jscomp$143, a2$jscomp$135, a3$jscomp$114, a4$jscomp$90, a5$jscomp$61);
    } catch (e$jscomp$194) {
      stackRestore$jscomp$0(sp$jscomp$147);
      if (typeof e$jscomp$194 !== "number" && e$jscomp$194 !== "longjmp") {
        throw e$jscomp$194;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viifiii$jscomp$0(index$jscomp$219, a1$jscomp$144, a2$jscomp$136, a3$jscomp$115, a4$jscomp$91, a5$jscomp$62, a6$jscomp$39) {
    var sp$jscomp$148 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viifiii"](index$jscomp$219, a1$jscomp$144, a2$jscomp$136, a3$jscomp$115, a4$jscomp$91, a5$jscomp$62, a6$jscomp$39);
    } catch (e$jscomp$195) {
      stackRestore$jscomp$0(sp$jscomp$148);
      if (typeof e$jscomp$195 !== "number" && e$jscomp$195 !== "longjmp") {
        throw e$jscomp$195;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viifiiii$jscomp$0(index$jscomp$220, a1$jscomp$145, a2$jscomp$137, a3$jscomp$116, a4$jscomp$92, a5$jscomp$63, a6$jscomp$40, a7$jscomp$24) {
    var sp$jscomp$149 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viifiiii"](index$jscomp$220, a1$jscomp$145, a2$jscomp$137, a3$jscomp$116, a4$jscomp$92, a5$jscomp$63, a6$jscomp$40, a7$jscomp$24);
    } catch (e$jscomp$196) {
      stackRestore$jscomp$0(sp$jscomp$149);
      if (typeof e$jscomp$196 !== "number" && e$jscomp$196 !== "longjmp") {
        throw e$jscomp$196;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viii$jscomp$0(index$jscomp$221, a1$jscomp$146, a2$jscomp$138, a3$jscomp$117) {
    var sp$jscomp$150 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viii"](index$jscomp$221, a1$jscomp$146, a2$jscomp$138, a3$jscomp$117);
    } catch (e$jscomp$197) {
      stackRestore$jscomp$0(sp$jscomp$150);
      if (typeof e$jscomp$197 !== "number" && e$jscomp$197 !== "longjmp") {
        throw e$jscomp$197;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiidi$jscomp$0(index$jscomp$222, a1$jscomp$147, a2$jscomp$139, a3$jscomp$118, a4$jscomp$93, a5$jscomp$64) {
    var sp$jscomp$151 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiidi"](index$jscomp$222, a1$jscomp$147, a2$jscomp$139, a3$jscomp$118, a4$jscomp$93, a5$jscomp$64);
    } catch (e$jscomp$198) {
      stackRestore$jscomp$0(sp$jscomp$151);
      if (typeof e$jscomp$198 !== "number" && e$jscomp$198 !== "longjmp") {
        throw e$jscomp$198;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiif$jscomp$0(index$jscomp$223, a1$jscomp$148, a2$jscomp$140, a3$jscomp$119, a4$jscomp$94) {
    var sp$jscomp$152 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiif"](index$jscomp$223, a1$jscomp$148, a2$jscomp$140, a3$jscomp$119, a4$jscomp$94);
    } catch (e$jscomp$199) {
      stackRestore$jscomp$0(sp$jscomp$152);
      if (typeof e$jscomp$199 !== "number" && e$jscomp$199 !== "longjmp") {
        throw e$jscomp$199;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiifffi$jscomp$0(index$jscomp$224, a1$jscomp$149, a2$jscomp$141, a3$jscomp$120, a4$jscomp$95, a5$jscomp$65, a6$jscomp$41, a7$jscomp$25) {
    var sp$jscomp$153 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiifffi"](index$jscomp$224, a1$jscomp$149, a2$jscomp$141, a3$jscomp$120, a4$jscomp$95, a5$jscomp$65, a6$jscomp$41, a7$jscomp$25);
    } catch (e$jscomp$200) {
      stackRestore$jscomp$0(sp$jscomp$153);
      if (typeof e$jscomp$200 !== "number" && e$jscomp$200 !== "longjmp") {
        throw e$jscomp$200;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiffi$jscomp$0(index$jscomp$225, a1$jscomp$150, a2$jscomp$142, a3$jscomp$121, a4$jscomp$96, a5$jscomp$66, a6$jscomp$42) {
    var sp$jscomp$154 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiffi"](index$jscomp$225, a1$jscomp$150, a2$jscomp$142, a3$jscomp$121, a4$jscomp$96, a5$jscomp$66, a6$jscomp$42);
    } catch (e$jscomp$201) {
      stackRestore$jscomp$0(sp$jscomp$154);
      if (typeof e$jscomp$201 !== "number" && e$jscomp$201 !== "longjmp") {
        throw e$jscomp$201;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiifi$jscomp$0(index$jscomp$226, a1$jscomp$151, a2$jscomp$143, a3$jscomp$122, a4$jscomp$97, a5$jscomp$67) {
    var sp$jscomp$155 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiifi"](index$jscomp$226, a1$jscomp$151, a2$jscomp$143, a3$jscomp$122, a4$jscomp$97, a5$jscomp$67);
    } catch (e$jscomp$202) {
      stackRestore$jscomp$0(sp$jscomp$155);
      if (typeof e$jscomp$202 !== "number" && e$jscomp$202 !== "longjmp") {
        throw e$jscomp$202;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiififfi$jscomp$0(index$jscomp$227, a1$jscomp$152, a2$jscomp$144, a3$jscomp$123, a4$jscomp$98, a5$jscomp$68, a6$jscomp$43, a7$jscomp$26, a8$jscomp$15) {
    var sp$jscomp$156 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiififfi"](index$jscomp$227, a1$jscomp$152, a2$jscomp$144, a3$jscomp$123, a4$jscomp$98, a5$jscomp$68, a6$jscomp$43, a7$jscomp$26, a8$jscomp$15);
    } catch (e$jscomp$203) {
      stackRestore$jscomp$0(sp$jscomp$156);
      if (typeof e$jscomp$203 !== "number" && e$jscomp$203 !== "longjmp") {
        throw e$jscomp$203;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiififi$jscomp$0(index$jscomp$228, a1$jscomp$153, a2$jscomp$145, a3$jscomp$124, a4$jscomp$99, a5$jscomp$69, a6$jscomp$44, a7$jscomp$27) {
    var sp$jscomp$157 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiififi"](index$jscomp$228, a1$jscomp$153, a2$jscomp$145, a3$jscomp$124, a4$jscomp$99, a5$jscomp$69, a6$jscomp$44, a7$jscomp$27);
    } catch (e$jscomp$204) {
      stackRestore$jscomp$0(sp$jscomp$157);
      if (typeof e$jscomp$204 !== "number" && e$jscomp$204 !== "longjmp") {
        throw e$jscomp$204;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiififii$jscomp$0(index$jscomp$229, a1$jscomp$154, a2$jscomp$146, a3$jscomp$125, a4$jscomp$100, a5$jscomp$70, a6$jscomp$45, a7$jscomp$28, a8$jscomp$16) {
    var sp$jscomp$158 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiififii"](index$jscomp$229, a1$jscomp$154, a2$jscomp$146, a3$jscomp$125, a4$jscomp$100, a5$jscomp$70, a6$jscomp$45, a7$jscomp$28, a8$jscomp$16);
    } catch (e$jscomp$205) {
      stackRestore$jscomp$0(sp$jscomp$158);
      if (typeof e$jscomp$205 !== "number" && e$jscomp$205 !== "longjmp") {
        throw e$jscomp$205;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiififiii$jscomp$0(index$jscomp$230, a1$jscomp$155, a2$jscomp$147, a3$jscomp$126, a4$jscomp$101, a5$jscomp$71, a6$jscomp$46, a7$jscomp$29, a8$jscomp$17, a9$jscomp$10) {
    var sp$jscomp$159 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiififiii"](index$jscomp$230, a1$jscomp$155, a2$jscomp$147, a3$jscomp$126, a4$jscomp$101, a5$jscomp$71, a6$jscomp$46, a7$jscomp$29, a8$jscomp$17, a9$jscomp$10);
    } catch (e$jscomp$206) {
      stackRestore$jscomp$0(sp$jscomp$159);
      if (typeof e$jscomp$206 !== "number" && e$jscomp$206 !== "longjmp") {
        throw e$jscomp$206;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiifii$jscomp$0(index$jscomp$231, a1$jscomp$156, a2$jscomp$148, a3$jscomp$127, a4$jscomp$102, a5$jscomp$72, a6$jscomp$47) {
    var sp$jscomp$160 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiifii"](index$jscomp$231, a1$jscomp$156, a2$jscomp$148, a3$jscomp$127, a4$jscomp$102, a5$jscomp$72, a6$jscomp$47);
    } catch (e$jscomp$207) {
      stackRestore$jscomp$0(sp$jscomp$160);
      if (typeof e$jscomp$207 !== "number" && e$jscomp$207 !== "longjmp") {
        throw e$jscomp$207;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiifiii$jscomp$0(index$jscomp$232, a1$jscomp$157, a2$jscomp$149, a3$jscomp$128, a4$jscomp$103, a5$jscomp$73, a6$jscomp$48, a7$jscomp$30) {
    var sp$jscomp$161 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiifiii"](index$jscomp$232, a1$jscomp$157, a2$jscomp$149, a3$jscomp$128, a4$jscomp$103, a5$jscomp$73, a6$jscomp$48, a7$jscomp$30);
    } catch (e$jscomp$208) {
      stackRestore$jscomp$0(sp$jscomp$161);
      if (typeof e$jscomp$208 !== "number" && e$jscomp$208 !== "longjmp") {
        throw e$jscomp$208;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiii$jscomp$0(index$jscomp$233, a1$jscomp$158, a2$jscomp$150, a3$jscomp$129, a4$jscomp$104) {
    var sp$jscomp$162 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiii"](index$jscomp$233, a1$jscomp$158, a2$jscomp$150, a3$jscomp$129, a4$jscomp$104);
    } catch (e$jscomp$209) {
      stackRestore$jscomp$0(sp$jscomp$162);
      if (typeof e$jscomp$209 !== "number" && e$jscomp$209 !== "longjmp") {
        throw e$jscomp$209;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiif$jscomp$0(index$jscomp$234, a1$jscomp$159, a2$jscomp$151, a3$jscomp$130, a4$jscomp$105, a5$jscomp$74) {
    var sp$jscomp$163 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiif"](index$jscomp$234, a1$jscomp$159, a2$jscomp$151, a3$jscomp$130, a4$jscomp$105, a5$jscomp$74);
    } catch (e$jscomp$210) {
      stackRestore$jscomp$0(sp$jscomp$163);
      if (typeof e$jscomp$210 !== "number" && e$jscomp$210 !== "longjmp") {
        throw e$jscomp$210;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiififii$jscomp$0(index$jscomp$235, a1$jscomp$160, a2$jscomp$152, a3$jscomp$131, a4$jscomp$106, a5$jscomp$75, a6$jscomp$49, a7$jscomp$31, a8$jscomp$18, a9$jscomp$11) {
    var sp$jscomp$164 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiififii"](index$jscomp$235, a1$jscomp$160, a2$jscomp$152, a3$jscomp$131, a4$jscomp$106, a5$jscomp$75, a6$jscomp$49, a7$jscomp$31, a8$jscomp$18, a9$jscomp$11);
    } catch (e$jscomp$211) {
      stackRestore$jscomp$0(sp$jscomp$164);
      if (typeof e$jscomp$211 !== "number" && e$jscomp$211 !== "longjmp") {
        throw e$jscomp$211;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiifii$jscomp$0(index$jscomp$236, a1$jscomp$161, a2$jscomp$153, a3$jscomp$132, a4$jscomp$107, a5$jscomp$76, a6$jscomp$50, a7$jscomp$32) {
    var sp$jscomp$165 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiifii"](index$jscomp$236, a1$jscomp$161, a2$jscomp$153, a3$jscomp$132, a4$jscomp$107, a5$jscomp$76, a6$jscomp$50, a7$jscomp$32);
    } catch (e$jscomp$212) {
      stackRestore$jscomp$0(sp$jscomp$165);
      if (typeof e$jscomp$212 !== "number" && e$jscomp$212 !== "longjmp") {
        throw e$jscomp$212;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiii$jscomp$0(index$jscomp$237, a1$jscomp$162, a2$jscomp$154, a3$jscomp$133, a4$jscomp$108, a5$jscomp$77) {
    var sp$jscomp$166 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiii"](index$jscomp$237, a1$jscomp$162, a2$jscomp$154, a3$jscomp$133, a4$jscomp$108, a5$jscomp$77);
    } catch (e$jscomp$213) {
      stackRestore$jscomp$0(sp$jscomp$166);
      if (typeof e$jscomp$213 !== "number" && e$jscomp$213 !== "longjmp") {
        throw e$jscomp$213;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiif$jscomp$0(index$jscomp$238, a1$jscomp$163, a2$jscomp$155, a3$jscomp$134, a4$jscomp$109, a5$jscomp$78, a6$jscomp$51) {
    var sp$jscomp$167 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiif"](index$jscomp$238, a1$jscomp$163, a2$jscomp$155, a3$jscomp$134, a4$jscomp$109, a5$jscomp$78, a6$jscomp$51);
    } catch (e$jscomp$214) {
      stackRestore$jscomp$0(sp$jscomp$167);
      if (typeof e$jscomp$214 !== "number" && e$jscomp$214 !== "longjmp") {
        throw e$jscomp$214;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiffi$jscomp$0(index$jscomp$239, a1$jscomp$164, a2$jscomp$156, a3$jscomp$135, a4$jscomp$110, a5$jscomp$79, a6$jscomp$52, a7$jscomp$33, a8$jscomp$19) {
    var sp$jscomp$168 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiffi"](index$jscomp$239, a1$jscomp$164, a2$jscomp$156, a3$jscomp$135, a4$jscomp$110, a5$jscomp$79, a6$jscomp$52, a7$jscomp$33, a8$jscomp$19);
    } catch (e$jscomp$215) {
      stackRestore$jscomp$0(sp$jscomp$168);
      if (typeof e$jscomp$215 !== "number" && e$jscomp$215 !== "longjmp") {
        throw e$jscomp$215;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiffii$jscomp$0(index$jscomp$240, a1$jscomp$165, a2$jscomp$157, a3$jscomp$136, a4$jscomp$111, a5$jscomp$80, a6$jscomp$53, a7$jscomp$34, a8$jscomp$20, a9$jscomp$12) {
    var sp$jscomp$169 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiffii"](index$jscomp$240, a1$jscomp$165, a2$jscomp$157, a3$jscomp$136, a4$jscomp$111, a5$jscomp$80, a6$jscomp$53, a7$jscomp$34, a8$jscomp$20, a9$jscomp$12);
    } catch (e$jscomp$216) {
      stackRestore$jscomp$0(sp$jscomp$169);
      if (typeof e$jscomp$216 !== "number" && e$jscomp$216 !== "longjmp") {
        throw e$jscomp$216;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiifi$jscomp$0(index$jscomp$241, a1$jscomp$166, a2$jscomp$158, a3$jscomp$137, a4$jscomp$112, a5$jscomp$81, a6$jscomp$54, a7$jscomp$35) {
    var sp$jscomp$170 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiifi"](index$jscomp$241, a1$jscomp$166, a2$jscomp$158, a3$jscomp$137, a4$jscomp$112, a5$jscomp$81, a6$jscomp$54, a7$jscomp$35);
    } catch (e$jscomp$217) {
      stackRestore$jscomp$0(sp$jscomp$170);
      if (typeof e$jscomp$217 !== "number" && e$jscomp$217 !== "longjmp") {
        throw e$jscomp$217;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiii$jscomp$0(index$jscomp$242, a1$jscomp$167, a2$jscomp$159, a3$jscomp$138, a4$jscomp$113, a5$jscomp$82, a6$jscomp$55) {
    var sp$jscomp$171 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiii"](index$jscomp$242, a1$jscomp$167, a2$jscomp$159, a3$jscomp$138, a4$jscomp$113, a5$jscomp$82, a6$jscomp$55);
    } catch (e$jscomp$218) {
      stackRestore$jscomp$0(sp$jscomp$171);
      if (typeof e$jscomp$218 !== "number" && e$jscomp$218 !== "longjmp") {
        throw e$jscomp$218;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiif$jscomp$0(index$jscomp$243, a1$jscomp$168, a2$jscomp$160, a3$jscomp$139, a4$jscomp$114, a5$jscomp$83, a6$jscomp$56, a7$jscomp$36) {
    var sp$jscomp$172 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiif"](index$jscomp$243, a1$jscomp$168, a2$jscomp$160, a3$jscomp$139, a4$jscomp$114, a5$jscomp$83, a6$jscomp$56, a7$jscomp$36);
    } catch (e$jscomp$219) {
      stackRestore$jscomp$0(sp$jscomp$172);
      if (typeof e$jscomp$219 !== "number" && e$jscomp$219 !== "longjmp") {
        throw e$jscomp$219;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiii$jscomp$0(index$jscomp$244, a1$jscomp$169, a2$jscomp$161, a3$jscomp$140, a4$jscomp$115, a5$jscomp$84, a6$jscomp$57, a7$jscomp$37) {
    var sp$jscomp$173 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiii"](index$jscomp$244, a1$jscomp$169, a2$jscomp$161, a3$jscomp$140, a4$jscomp$115, a5$jscomp$84, a6$jscomp$57, a7$jscomp$37);
    } catch (e$jscomp$220) {
      stackRestore$jscomp$0(sp$jscomp$173);
      if (typeof e$jscomp$220 !== "number" && e$jscomp$220 !== "longjmp") {
        throw e$jscomp$220;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiifi$jscomp$0(index$jscomp$245, a1$jscomp$170, a2$jscomp$162, a3$jscomp$141, a4$jscomp$116, a5$jscomp$85, a6$jscomp$58, a7$jscomp$38, a8$jscomp$21, a9$jscomp$13) {
    var sp$jscomp$174 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiifi"](index$jscomp$245, a1$jscomp$170, a2$jscomp$162, a3$jscomp$141, a4$jscomp$116, a5$jscomp$85, a6$jscomp$58, a7$jscomp$38, a8$jscomp$21, a9$jscomp$13);
    } catch (e$jscomp$221) {
      stackRestore$jscomp$0(sp$jscomp$174);
      if (typeof e$jscomp$221 !== "number" && e$jscomp$221 !== "longjmp") {
        throw e$jscomp$221;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiii$jscomp$0(index$jscomp$246, a1$jscomp$171, a2$jscomp$163, a3$jscomp$142, a4$jscomp$117, a5$jscomp$86, a6$jscomp$59, a7$jscomp$39, a8$jscomp$22) {
    var sp$jscomp$175 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiii"](index$jscomp$246, a1$jscomp$171, a2$jscomp$163, a3$jscomp$142, a4$jscomp$117, a5$jscomp$86, a6$jscomp$59, a7$jscomp$39, a8$jscomp$22);
    } catch (e$jscomp$222) {
      stackRestore$jscomp$0(sp$jscomp$175);
      if (typeof e$jscomp$222 !== "number" && e$jscomp$222 !== "longjmp") {
        throw e$jscomp$222;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiii$jscomp$0(index$jscomp$247, a1$jscomp$172, a2$jscomp$164, a3$jscomp$143, a4$jscomp$118, a5$jscomp$87, a6$jscomp$60, a7$jscomp$40, a8$jscomp$23, a9$jscomp$14) {
    var sp$jscomp$176 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiii"](index$jscomp$247, a1$jscomp$172, a2$jscomp$164, a3$jscomp$143, a4$jscomp$118, a5$jscomp$87, a6$jscomp$60, a7$jscomp$40, a8$jscomp$23, a9$jscomp$14);
    } catch (e$jscomp$223) {
      stackRestore$jscomp$0(sp$jscomp$176);
      if (typeof e$jscomp$223 !== "number" && e$jscomp$223 !== "longjmp") {
        throw e$jscomp$223;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiii$jscomp$0(index$jscomp$248, a1$jscomp$173, a2$jscomp$165, a3$jscomp$144, a4$jscomp$119, a5$jscomp$88, a6$jscomp$61, a7$jscomp$41, a8$jscomp$24, a9$jscomp$15, a10$jscomp$9) {
    var sp$jscomp$177 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiii"](index$jscomp$248, a1$jscomp$173, a2$jscomp$165, a3$jscomp$144, a4$jscomp$119, a5$jscomp$88, a6$jscomp$61, a7$jscomp$41, a8$jscomp$24, a9$jscomp$15, a10$jscomp$9);
    } catch (e$jscomp$224) {
      stackRestore$jscomp$0(sp$jscomp$177);
      if (typeof e$jscomp$224 !== "number" && e$jscomp$224 !== "longjmp") {
        throw e$jscomp$224;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiii$jscomp$0(index$jscomp$249, a1$jscomp$174, a2$jscomp$166, a3$jscomp$145, a4$jscomp$120, a5$jscomp$89, a6$jscomp$62, a7$jscomp$42, a8$jscomp$25, a9$jscomp$16, a10$jscomp$10, a11$jscomp$7) {
    var sp$jscomp$178 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiiii"](index$jscomp$249, a1$jscomp$174, a2$jscomp$166, a3$jscomp$145, a4$jscomp$120, a5$jscomp$89, a6$jscomp$62, a7$jscomp$42, a8$jscomp$25, a9$jscomp$16, a10$jscomp$10, a11$jscomp$7);
    } catch (e$jscomp$225) {
      stackRestore$jscomp$0(sp$jscomp$178);
      if (typeof e$jscomp$225 !== "number" && e$jscomp$225 !== "longjmp") {
        throw e$jscomp$225;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiiii$jscomp$0(index$jscomp$250, a1$jscomp$175, a2$jscomp$167, a3$jscomp$146, a4$jscomp$121, a5$jscomp$90, a6$jscomp$63, a7$jscomp$43, a8$jscomp$26, a9$jscomp$17, a10$jscomp$11, a11$jscomp$8, a12$jscomp$6) {
    var sp$jscomp$179 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiiiii"](index$jscomp$250, a1$jscomp$175, a2$jscomp$167, a3$jscomp$146, a4$jscomp$121, a5$jscomp$90, a6$jscomp$63, a7$jscomp$43, a8$jscomp$26, a9$jscomp$17, a10$jscomp$11, a11$jscomp$8, a12$jscomp$6);
    } catch (e$jscomp$226) {
      stackRestore$jscomp$0(sp$jscomp$179);
      if (typeof e$jscomp$226 !== "number" && e$jscomp$226 !== "longjmp") {
        throw e$jscomp$226;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiiiiii$jscomp$0(index$jscomp$251, a1$jscomp$176, a2$jscomp$168, a3$jscomp$147, a4$jscomp$122, a5$jscomp$91, a6$jscomp$64, a7$jscomp$44, a8$jscomp$27, a9$jscomp$18, a10$jscomp$12, a11$jscomp$9, a12$jscomp$7, a13$jscomp$5, a14$jscomp$4) {
    var sp$jscomp$180 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiiiiiii"](index$jscomp$251, a1$jscomp$176, a2$jscomp$168, a3$jscomp$147, a4$jscomp$122, a5$jscomp$91, a6$jscomp$64, a7$jscomp$44, a8$jscomp$27, a9$jscomp$18, a10$jscomp$12, a11$jscomp$9, a12$jscomp$7, a13$jscomp$5, a14$jscomp$4);
    } catch (e$jscomp$227) {
      stackRestore$jscomp$0(sp$jscomp$180);
      if (typeof e$jscomp$227 !== "number" && e$jscomp$227 !== "longjmp") {
        throw e$jscomp$227;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiiiiiii$jscomp$0(index$jscomp$252, a1$jscomp$177, a2$jscomp$169, a3$jscomp$148, a4$jscomp$123, a5$jscomp$92, a6$jscomp$65, a7$jscomp$45, a8$jscomp$28, a9$jscomp$19, a10$jscomp$13, a11$jscomp$10, a12$jscomp$8, a13$jscomp$6, a14$jscomp$5, a15$jscomp$4) {
    var sp$jscomp$181 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiiiiiiii"](index$jscomp$252, a1$jscomp$177, a2$jscomp$169, a3$jscomp$148, a4$jscomp$123, a5$jscomp$92, a6$jscomp$65, a7$jscomp$45, a8$jscomp$28, a9$jscomp$19, a10$jscomp$13, a11$jscomp$10, a12$jscomp$8, a13$jscomp$6, a14$jscomp$5, a15$jscomp$4);
    } catch (e$jscomp$228) {
      stackRestore$jscomp$0(sp$jscomp$181);
      if (typeof e$jscomp$228 !== "number" && e$jscomp$228 !== "longjmp") {
        throw e$jscomp$228;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiiiiiiiiii$jscomp$0(index$jscomp$253, a1$jscomp$178, a2$jscomp$170, a3$jscomp$149, a4$jscomp$124, a5$jscomp$93, a6$jscomp$66, a7$jscomp$46, a8$jscomp$29, a9$jscomp$20, a10$jscomp$14, a11$jscomp$11, a12$jscomp$9, a13$jscomp$7, a14$jscomp$6, a15$jscomp$5, a16$jscomp$3, a17$jscomp$3, a18$jscomp$3) {
    var sp$jscomp$182 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiiiiiiiiiiiiiiii"](index$jscomp$253, a1$jscomp$178, a2$jscomp$170, a3$jscomp$149, a4$jscomp$124, a5$jscomp$93, a6$jscomp$66, a7$jscomp$46, a8$jscomp$29, a9$jscomp$20, a10$jscomp$14, a11$jscomp$11, a12$jscomp$9, a13$jscomp$7, a14$jscomp$6, a15$jscomp$5, a16$jscomp$3, a17$jscomp$3, a18$jscomp$3);
    } catch (e$jscomp$229) {
      stackRestore$jscomp$0(sp$jscomp$182);
      if (typeof e$jscomp$229 !== "number" && e$jscomp$229 !== "longjmp") {
        throw e$jscomp$229;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiijiiii$jscomp$0(index$jscomp$254, a1$jscomp$179, a2$jscomp$171, a3$jscomp$150, a4$jscomp$125, a5$jscomp$94, a6$jscomp$67, a7$jscomp$47, a8$jscomp$30, a9$jscomp$21, a10$jscomp$15) {
    var sp$jscomp$183 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiijiiii"](index$jscomp$254, a1$jscomp$179, a2$jscomp$171, a3$jscomp$150, a4$jscomp$125, a5$jscomp$94, a6$jscomp$67, a7$jscomp$47, a8$jscomp$30, a9$jscomp$21, a10$jscomp$15);
    } catch (e$jscomp$230) {
      stackRestore$jscomp$0(sp$jscomp$183);
      if (typeof e$jscomp$230 !== "number" && e$jscomp$230 !== "longjmp") {
        throw e$jscomp$230;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiiji$jscomp$0(index$jscomp$255, a1$jscomp$180, a2$jscomp$172, a3$jscomp$151, a4$jscomp$126, a5$jscomp$95, a6$jscomp$68) {
    var sp$jscomp$184 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiiji"](index$jscomp$255, a1$jscomp$180, a2$jscomp$172, a3$jscomp$151, a4$jscomp$126, a5$jscomp$95, a6$jscomp$68);
    } catch (e$jscomp$231) {
      stackRestore$jscomp$0(sp$jscomp$184);
      if (typeof e$jscomp$231 !== "number" && e$jscomp$231 !== "longjmp") {
        throw e$jscomp$231;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiijji$jscomp$0(index$jscomp$256, a1$jscomp$181, a2$jscomp$173, a3$jscomp$152, a4$jscomp$127, a5$jscomp$96, a6$jscomp$69, a7$jscomp$48, a8$jscomp$31) {
    var sp$jscomp$185 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiijji"](index$jscomp$256, a1$jscomp$181, a2$jscomp$173, a3$jscomp$152, a4$jscomp$127, a5$jscomp$96, a6$jscomp$69, a7$jscomp$48, a8$jscomp$31);
    } catch (e$jscomp$232) {
      stackRestore$jscomp$0(sp$jscomp$185);
      if (typeof e$jscomp$232 !== "number" && e$jscomp$232 !== "longjmp") {
        throw e$jscomp$232;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viij$jscomp$0(index$jscomp$257, a1$jscomp$182, a2$jscomp$174, a3$jscomp$153, a4$jscomp$128) {
    var sp$jscomp$186 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viij"](index$jscomp$257, a1$jscomp$182, a2$jscomp$174, a3$jscomp$153, a4$jscomp$128);
    } catch (e$jscomp$233) {
      stackRestore$jscomp$0(sp$jscomp$186);
      if (typeof e$jscomp$233 !== "number" && e$jscomp$233 !== "longjmp") {
        throw e$jscomp$233;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viiji$jscomp$0(index$jscomp$258, a1$jscomp$183, a2$jscomp$175, a3$jscomp$154, a4$jscomp$129, a5$jscomp$97) {
    var sp$jscomp$187 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viiji"](index$jscomp$258, a1$jscomp$183, a2$jscomp$175, a3$jscomp$154, a4$jscomp$129, a5$jscomp$97);
    } catch (e$jscomp$234) {
      stackRestore$jscomp$0(sp$jscomp$187);
      if (typeof e$jscomp$234 !== "number" && e$jscomp$234 !== "longjmp") {
        throw e$jscomp$234;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijii$jscomp$0(index$jscomp$259, a1$jscomp$184, a2$jscomp$176, a3$jscomp$155, a4$jscomp$130, a5$jscomp$98, a6$jscomp$70) {
    var sp$jscomp$188 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijii"](index$jscomp$259, a1$jscomp$184, a2$jscomp$176, a3$jscomp$155, a4$jscomp$130, a5$jscomp$98, a6$jscomp$70);
    } catch (e$jscomp$235) {
      stackRestore$jscomp$0(sp$jscomp$188);
      if (typeof e$jscomp$235 !== "number" && e$jscomp$235 !== "longjmp") {
        throw e$jscomp$235;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijiijiii$jscomp$0(index$jscomp$260, a1$jscomp$185, a2$jscomp$177, a3$jscomp$156, a4$jscomp$131, a5$jscomp$99, a6$jscomp$71, a7$jscomp$49, a8$jscomp$32, a9$jscomp$22, a10$jscomp$16, a11$jscomp$12) {
    var sp$jscomp$189 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijiijiii"](index$jscomp$260, a1$jscomp$185, a2$jscomp$177, a3$jscomp$156, a4$jscomp$131, a5$jscomp$99, a6$jscomp$71, a7$jscomp$49, a8$jscomp$32, a9$jscomp$22, a10$jscomp$16, a11$jscomp$12);
    } catch (e$jscomp$236) {
      stackRestore$jscomp$0(sp$jscomp$189);
      if (typeof e$jscomp$236 !== "number" && e$jscomp$236 !== "longjmp") {
        throw e$jscomp$236;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijijii$jscomp$0(index$jscomp$261, a1$jscomp$186, a2$jscomp$178, a3$jscomp$157, a4$jscomp$132, a5$jscomp$100, a6$jscomp$72, a7$jscomp$50, a8$jscomp$33, a9$jscomp$23) {
    var sp$jscomp$190 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijijii"](index$jscomp$261, a1$jscomp$186, a2$jscomp$178, a3$jscomp$157, a4$jscomp$132, a5$jscomp$100, a6$jscomp$72, a7$jscomp$50, a8$jscomp$33, a9$jscomp$23);
    } catch (e$jscomp$237) {
      stackRestore$jscomp$0(sp$jscomp$190);
      if (typeof e$jscomp$237 !== "number" && e$jscomp$237 !== "longjmp") {
        throw e$jscomp$237;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijijiii$jscomp$0(index$jscomp$262, a1$jscomp$187, a2$jscomp$179, a3$jscomp$158, a4$jscomp$133, a5$jscomp$101, a6$jscomp$73, a7$jscomp$51, a8$jscomp$34, a9$jscomp$24, a10$jscomp$17) {
    var sp$jscomp$191 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijijiii"](index$jscomp$262, a1$jscomp$187, a2$jscomp$179, a3$jscomp$158, a4$jscomp$133, a5$jscomp$101, a6$jscomp$73, a7$jscomp$51, a8$jscomp$34, a9$jscomp$24, a10$jscomp$17);
    } catch (e$jscomp$238) {
      stackRestore$jscomp$0(sp$jscomp$191);
      if (typeof e$jscomp$238 !== "number" && e$jscomp$238 !== "longjmp") {
        throw e$jscomp$238;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijj$jscomp$0(index$jscomp$263, a1$jscomp$188, a2$jscomp$180, a3$jscomp$159, a4$jscomp$134, a5$jscomp$102, a6$jscomp$74) {
    var sp$jscomp$192 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijj"](index$jscomp$263, a1$jscomp$188, a2$jscomp$180, a3$jscomp$159, a4$jscomp$134, a5$jscomp$102, a6$jscomp$74);
    } catch (e$jscomp$239) {
      stackRestore$jscomp$0(sp$jscomp$192);
      if (typeof e$jscomp$239 !== "number" && e$jscomp$239 !== "longjmp") {
        throw e$jscomp$239;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijji$jscomp$0(index$jscomp$264, a1$jscomp$189, a2$jscomp$181, a3$jscomp$160, a4$jscomp$135, a5$jscomp$103, a6$jscomp$75, a7$jscomp$52) {
    var sp$jscomp$193 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijji"](index$jscomp$264, a1$jscomp$189, a2$jscomp$181, a3$jscomp$160, a4$jscomp$135, a5$jscomp$103, a6$jscomp$75, a7$jscomp$52);
    } catch (e$jscomp$240) {
      stackRestore$jscomp$0(sp$jscomp$193);
      if (typeof e$jscomp$240 !== "number" && e$jscomp$240 !== "longjmp") {
        throw e$jscomp$240;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijjiii$jscomp$0(index$jscomp$265, a1$jscomp$190, a2$jscomp$182, a3$jscomp$161, a4$jscomp$136, a5$jscomp$104, a6$jscomp$76, a7$jscomp$53, a8$jscomp$35, a9$jscomp$25) {
    var sp$jscomp$194 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijjiii"](index$jscomp$265, a1$jscomp$190, a2$jscomp$182, a3$jscomp$161, a4$jscomp$136, a5$jscomp$104, a6$jscomp$76, a7$jscomp$53, a8$jscomp$35, a9$jscomp$25);
    } catch (e$jscomp$241) {
      stackRestore$jscomp$0(sp$jscomp$194);
      if (typeof e$jscomp$241 !== "number" && e$jscomp$241 !== "longjmp") {
        throw e$jscomp$241;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viijjji$jscomp$0(index$jscomp$266, a1$jscomp$191, a2$jscomp$183, a3$jscomp$162, a4$jscomp$137, a5$jscomp$105, a6$jscomp$77, a7$jscomp$54, a8$jscomp$36, a9$jscomp$26) {
    var sp$jscomp$195 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viijjji"](index$jscomp$266, a1$jscomp$191, a2$jscomp$183, a3$jscomp$162, a4$jscomp$137, a5$jscomp$105, a6$jscomp$77, a7$jscomp$54, a8$jscomp$36, a9$jscomp$26);
    } catch (e$jscomp$242) {
      stackRestore$jscomp$0(sp$jscomp$195);
      if (typeof e$jscomp$242 !== "number" && e$jscomp$242 !== "longjmp") {
        throw e$jscomp$242;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vij$jscomp$0(index$jscomp$267, a1$jscomp$192, a2$jscomp$184, a3$jscomp$163) {
    var sp$jscomp$196 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vij"](index$jscomp$267, a1$jscomp$192, a2$jscomp$184, a3$jscomp$163);
    } catch (e$jscomp$243) {
      stackRestore$jscomp$0(sp$jscomp$196);
      if (typeof e$jscomp$243 !== "number" && e$jscomp$243 !== "longjmp") {
        throw e$jscomp$243;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_viji$jscomp$0(index$jscomp$268, a1$jscomp$193, a2$jscomp$185, a3$jscomp$164, a4$jscomp$138) {
    var sp$jscomp$197 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_viji"](index$jscomp$268, a1$jscomp$193, a2$jscomp$185, a3$jscomp$164, a4$jscomp$138);
    } catch (e$jscomp$244) {
      stackRestore$jscomp$0(sp$jscomp$197);
      if (typeof e$jscomp$244 !== "number" && e$jscomp$244 !== "longjmp") {
        throw e$jscomp$244;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijii$jscomp$0(index$jscomp$269, a1$jscomp$194, a2$jscomp$186, a3$jscomp$165, a4$jscomp$139, a5$jscomp$106) {
    var sp$jscomp$198 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijii"](index$jscomp$269, a1$jscomp$194, a2$jscomp$186, a3$jscomp$165, a4$jscomp$139, a5$jscomp$106);
    } catch (e$jscomp$245) {
      stackRestore$jscomp$0(sp$jscomp$198);
      if (typeof e$jscomp$245 !== "number" && e$jscomp$245 !== "longjmp") {
        throw e$jscomp$245;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijiii$jscomp$0(index$jscomp$270, a1$jscomp$195, a2$jscomp$187, a3$jscomp$166, a4$jscomp$140, a5$jscomp$107, a6$jscomp$78) {
    var sp$jscomp$199 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijiii"](index$jscomp$270, a1$jscomp$195, a2$jscomp$187, a3$jscomp$166, a4$jscomp$140, a5$jscomp$107, a6$jscomp$78);
    } catch (e$jscomp$246) {
      stackRestore$jscomp$0(sp$jscomp$199);
      if (typeof e$jscomp$246 !== "number" && e$jscomp$246 !== "longjmp") {
        throw e$jscomp$246;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijiji$jscomp$0(index$jscomp$271, a1$jscomp$196, a2$jscomp$188, a3$jscomp$167, a4$jscomp$141, a5$jscomp$108, a6$jscomp$79, a7$jscomp$55) {
    var sp$jscomp$200 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijiji"](index$jscomp$271, a1$jscomp$196, a2$jscomp$188, a3$jscomp$167, a4$jscomp$141, a5$jscomp$108, a6$jscomp$79, a7$jscomp$55);
    } catch (e$jscomp$247) {
      stackRestore$jscomp$0(sp$jscomp$200);
      if (typeof e$jscomp$247 !== "number" && e$jscomp$247 !== "longjmp") {
        throw e$jscomp$247;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijijji$jscomp$0(index$jscomp$272, a1$jscomp$197, a2$jscomp$189, a3$jscomp$168, a4$jscomp$142, a5$jscomp$109, a6$jscomp$80, a7$jscomp$56, a8$jscomp$37, a9$jscomp$27) {
    var sp$jscomp$201 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijijji"](index$jscomp$272, a1$jscomp$197, a2$jscomp$189, a3$jscomp$168, a4$jscomp$142, a5$jscomp$109, a6$jscomp$80, a7$jscomp$56, a8$jscomp$37, a9$jscomp$27);
    } catch (e$jscomp$248) {
      stackRestore$jscomp$0(sp$jscomp$201);
      if (typeof e$jscomp$248 !== "number" && e$jscomp$248 !== "longjmp") {
        throw e$jscomp$248;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijji$jscomp$0(index$jscomp$273, a1$jscomp$198, a2$jscomp$190, a3$jscomp$169, a4$jscomp$143, a5$jscomp$110, a6$jscomp$81) {
    var sp$jscomp$202 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijji"](index$jscomp$273, a1$jscomp$198, a2$jscomp$190, a3$jscomp$169, a4$jscomp$143, a5$jscomp$110, a6$jscomp$81);
    } catch (e$jscomp$249) {
      stackRestore$jscomp$0(sp$jscomp$202);
      if (typeof e$jscomp$249 !== "number" && e$jscomp$249 !== "longjmp") {
        throw e$jscomp$249;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vijjii$jscomp$0(index$jscomp$274, a1$jscomp$199, a2$jscomp$191, a3$jscomp$170, a4$jscomp$144, a5$jscomp$111, a6$jscomp$82, a7$jscomp$57) {
    var sp$jscomp$203 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vijjii"](index$jscomp$274, a1$jscomp$199, a2$jscomp$191, a3$jscomp$170, a4$jscomp$144, a5$jscomp$111, a6$jscomp$82, a7$jscomp$57);
    } catch (e$jscomp$250) {
      stackRestore$jscomp$0(sp$jscomp$203);
      if (typeof e$jscomp$250 !== "number" && e$jscomp$250 !== "longjmp") {
        throw e$jscomp$250;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vji$jscomp$0(index$jscomp$275, a1$jscomp$200, a2$jscomp$192, a3$jscomp$171) {
    var sp$jscomp$204 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vji"](index$jscomp$275, a1$jscomp$200, a2$jscomp$192, a3$jscomp$171);
    } catch (e$jscomp$251) {
      stackRestore$jscomp$0(sp$jscomp$204);
      if (typeof e$jscomp$251 !== "number" && e$jscomp$251 !== "longjmp") {
        throw e$jscomp$251;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vjiiii$jscomp$0(index$jscomp$276, a1$jscomp$201, a2$jscomp$193, a3$jscomp$172, a4$jscomp$145, a5$jscomp$112, a6$jscomp$83) {
    var sp$jscomp$205 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vjiiii"](index$jscomp$276, a1$jscomp$201, a2$jscomp$193, a3$jscomp$172, a4$jscomp$145, a5$jscomp$112, a6$jscomp$83);
    } catch (e$jscomp$252) {
      stackRestore$jscomp$0(sp$jscomp$205);
      if (typeof e$jscomp$252 !== "number" && e$jscomp$252 !== "longjmp") {
        throw e$jscomp$252;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function invoke_vjji$jscomp$0(index$jscomp$277, a1$jscomp$202, a2$jscomp$194, a3$jscomp$173, a4$jscomp$146, a5$jscomp$113) {
    var sp$jscomp$206 = stackSave$jscomp$0();
    try {
      Module$jscomp$0["dynCall_vjji"](index$jscomp$277, a1$jscomp$202, a2$jscomp$194, a3$jscomp$173, a4$jscomp$146, a5$jscomp$113);
    } catch (e$jscomp$253) {
      stackRestore$jscomp$0(sp$jscomp$206);
      if (typeof e$jscomp$253 !== "number" && e$jscomp$253 !== "longjmp") {
        throw e$jscomp$253;
      }
      Module$jscomp$0["setThrew"](1, 0);
    }
  }
  function ExitStatus$jscomp$0(status$jscomp$2) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status$jscomp$2 + ")";
    this.status = status$jscomp$2;
  }
  function run$jscomp$0(args$jscomp$3) {
    function doRun$jscomp$0() {
      if (Module$jscomp$0["calledRun"]) {
        return;
      }
      Module$jscomp$0["calledRun"] = true;
      if (ABORT$jscomp$0) {
        return;
      }
      ensureInitRuntime$jscomp$0();
      preMain$jscomp$0();
      if (Module$jscomp$0["onRuntimeInitialized"]) {
        Module$jscomp$0["onRuntimeInitialized"]();
      }
      if (Module$jscomp$0["_main"] && shouldRunNow$jscomp$0) {
        Module$jscomp$0["callMain"](args$jscomp$3);
      }
      postRun$jscomp$0();
    }
    args$jscomp$3 = args$jscomp$3 || Module$jscomp$0["arguments"];
    if (runDependencies$jscomp$0 > 0) {
      return;
    }
    preRun$jscomp$0();
    if (runDependencies$jscomp$0 > 0) {
      return;
    }
    if (Module$jscomp$0["calledRun"]) {
      return;
    }
    if (Module$jscomp$0["setStatus"]) {
      Module$jscomp$0["setStatus"]("Running...");
      setTimeout(function() {
        setTimeout(function() {
          Module$jscomp$0["setStatus"]("");
        }, 1);
        doRun$jscomp$0();
      }, 1);
    } else {
      doRun$jscomp$0();
    }
  }
  function exit$jscomp$0(status$jscomp$3, implicit$jscomp$0) {
    if (implicit$jscomp$0 && Module$jscomp$0["noExitRuntime"] && status$jscomp$3 === 0) {
      return;
    }
    if (Module$jscomp$0["noExitRuntime"]) {
    } else {
      ABORT$jscomp$0 = true;
      EXITSTATUS$jscomp$0 = status$jscomp$3;
      STACKTOP$jscomp$0 = initialStackTop$jscomp$0;
      exitRuntime$jscomp$0();
      if (Module$jscomp$0["onExit"]) {
        Module$jscomp$0["onExit"](status$jscomp$3);
      }
    }
    Module$jscomp$0["quit"](status$jscomp$3, new ExitStatus$jscomp$0(status$jscomp$3));
  }
  function abort$jscomp$0(what$jscomp$0) {
    if (Module$jscomp$0["onAbort"]) {
      Module$jscomp$0["onAbort"](what$jscomp$0);
    }
    if (what$jscomp$0 !== undefined) {
      out$jscomp$0(what$jscomp$0);
      err$jscomp$3(what$jscomp$0);
      what$jscomp$0 = JSON.stringify(what$jscomp$0);
    } else {
      what$jscomp$0 = "";
    }
    ABORT$jscomp$0 = true;
    EXITSTATUS$jscomp$0 = 1;
    throw "abort(" + what$jscomp$0 + "). Build with -s ASSERTIONS=1 for more info.";
  }
  Module$jscomp$0 = typeof Module$jscomp$0 !== "undefined" ? Module$jscomp$0 : {};
  var stackTraceReference$jscomp$0 = "(^|\\n)(\\s+at\\s+|)jsStackTrace(\\s+\\(|@)([^\\n]+):\\d+:\\d+(\\)|)(\\n|$)";
  var stackTraceReferenceMatch$jscomp$0 = jsStackTrace$jscomp$0().match(new RegExp(stackTraceReference$jscomp$0));
  if (stackTraceReferenceMatch$jscomp$0) {
    Module$jscomp$0.stackTraceRegExp = new RegExp(stackTraceReference$jscomp$0.replace("([^\\n]+)", stackTraceReferenceMatch$jscomp$0[4].replace(/[\\^${}[\]().*+?|]/g, "\\$&")).replace("jsStackTrace", "[^\\n]+"));
  }
  abort$jscomp$0 = function(what$jscomp$1) {
    if (ABORT$jscomp$0) {
      return;
    }
    ABORT$jscomp$0 = true;
    EXITSTATUS$jscomp$0 = 1;
    if (typeof ENVIRONMENT_IS_PTHREAD !== "undefined" && ENVIRONMENT_IS_PTHREAD) {
      console.error("Pthread aborting at " + (new Error).stack);
    }
    if (what$jscomp$1 !== undefined) {
      out$jscomp$0(what$jscomp$1);
      err$jscomp$3(what$jscomp$1);
      what$jscomp$1 = JSON.stringify(what$jscomp$1);
    } else {
      what$jscomp$1 = "";
    }
    var message$jscomp$23 = "abort(" + what$jscomp$1 + ") at " + stackTrace$jscomp$0();
    if (Module$jscomp$0.abortHandler && Module$jscomp$0.abortHandler(message$jscomp$23)) {
      return;
    }
    throw message$jscomp$23;
  };
  if (typeof ENVIRONMENT_IS_PTHREAD === "undefined" || !ENVIRONMENT_IS_PTHREAD) {
    Module$jscomp$0["preRun"].push(function() {
      var unityFileSystemInit$jscomp$0 = Module$jscomp$0["unityFileSystemInit"] || function() {
        FS$jscomp$0.mkdir("/idbfs");
        FS$jscomp$0.mount(IDBFS$jscomp$0, {}, "/idbfs");
        Module$jscomp$0.addRunDependency("JS_FileSystem_Mount");
        FS$jscomp$0.syncfs(true, function(err$jscomp$6) {
          if (err$jscomp$6) {
            console.log("IndexedDB is not available. Data will not persist in cache and PlayerPrefs will not be saved.");
          }
          Module$jscomp$0.removeRunDependency("JS_FileSystem_Mount");
        });
      };
      unityFileSystemInit$jscomp$0();
    });
  }
  Module$jscomp$0["SetFullscreen"] = function(fullscreen$jscomp$0) {
    if (typeof runtimeInitialized$jscomp$0 === "undefined" || !runtimeInitialized$jscomp$0) {
      console.log("Runtime not initialized yet.");
    } else {
      if (typeof JSEvents$jscomp$0 === "undefined") {
        console.log("Player not loaded yet.");
      } else {
        var tmp$jscomp$0 = JSEvents$jscomp$0.canPerformEventHandlerRequests;
        JSEvents$jscomp$0.canPerformEventHandlerRequests = function() {
          return 1;
        };
        Module$jscomp$0.ccall("SetFullscreen", null, ["number"], [fullscreen$jscomp$0]);
        JSEvents$jscomp$0.canPerformEventHandlerRequests = tmp$jscomp$0;
      }
    }
  };
  var MediaDevices$jscomp$1 = [];
  if (typeof ENVIRONMENT_IS_PTHREAD === "undefined" || !ENVIRONMENT_IS_PTHREAD) {
    Module$jscomp$0["preRun"].push(function() {
      var enumerateMediaDevices$jscomp$0 = function() {
        function addDevice$jscomp$0(label$jscomp$4) {
          label$jscomp$4 = label$jscomp$4 ? label$jscomp$4 : "device #" + MediaDevices$jscomp$1.length;
          var device$jscomp$0 = {
            deviceName : label$jscomp$4,
            refCount : 0,
            video : null
          };
          MediaDevices$jscomp$1.push(device$jscomp$0);
        }
        var getMedia$jscomp$0 = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!getMedia$jscomp$0) {
          return;
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          var gotSources$jscomp$0 = function(sourceInfos$jscomp$0) {
            var i$jscomp$53 = 0;
            for (; i$jscomp$53 !== sourceInfos$jscomp$0.length; ++i$jscomp$53) {
              var sourceInfo$jscomp$0 = sourceInfos$jscomp$0[i$jscomp$53];
              if (sourceInfo$jscomp$0.kind === "video") {
                addDevice$jscomp$0(sourceInfo$jscomp$0.label);
              }
            }
          };
          if (typeof MediaStreamTrack == "undefined" || typeof MediaStreamTrack.getSources == "undefined") {
            console.log("Media Devices cannot be enumerated on this browser.");
            return;
          }
          MediaStreamTrack.getSources(gotSources$jscomp$0);
        }
        navigator.mediaDevices.enumerateDevices().then(function(devices$jscomp$0) {
          devices$jscomp$0.forEach(function(device$jscomp$1) {
            if (device$jscomp$1.kind == "videoinput") {
              addDevice$jscomp$0(device$jscomp$1.label);
            }
          });
        }).catch(function(err$jscomp$7) {
          console.log(err$jscomp$7.name + ": " + error.message);
        });
      };
      enumerateMediaDevices$jscomp$0();
    });
  }
  Module$jscomp$0["SendMessage"] = SendMessage$jscomp$0;
  var moduleOverrides$jscomp$0 = {};
  var key$jscomp$35;
  for (key$jscomp$35 in Module$jscomp$0) {
    if (Module$jscomp$0.hasOwnProperty(key$jscomp$35)) {
      moduleOverrides$jscomp$0[key$jscomp$35] = Module$jscomp$0[key$jscomp$35];
    }
  }
  Module$jscomp$0["arguments"] = [];
  Module$jscomp$0["thisProgram"] = "./this.program";
  Module$jscomp$0["quit"] = function(status$jscomp$4, toThrow$jscomp$0) {
    throw toThrow$jscomp$0;
  };
  Module$jscomp$0["preRun"] = [];
  Module$jscomp$0["postRun"] = [];
  var ENVIRONMENT_IS_WEB$jscomp$0 = false;
  var ENVIRONMENT_IS_WORKER$jscomp$0 = false;
  var ENVIRONMENT_IS_NODE$jscomp$0 = false;
  var ENVIRONMENT_IS_SHELL$jscomp$0 = false;
  ENVIRONMENT_IS_WEB$jscomp$0 = typeof window === "object";
  ENVIRONMENT_IS_WORKER$jscomp$0 = typeof importScripts === "function";
  ENVIRONMENT_IS_NODE$jscomp$0 = typeof process === "object" && typeof require === "function" && !ENVIRONMENT_IS_WEB$jscomp$0 && !ENVIRONMENT_IS_WORKER$jscomp$0;
  ENVIRONMENT_IS_SHELL$jscomp$0 = !ENVIRONMENT_IS_WEB$jscomp$0 && !ENVIRONMENT_IS_NODE$jscomp$0 && !ENVIRONMENT_IS_WORKER$jscomp$0;
  var scriptDirectory$jscomp$0 = "";
  if (ENVIRONMENT_IS_NODE$jscomp$0) {
    scriptDirectory$jscomp$0 = __dirname + "/";
    var nodeFS$jscomp$0;
    var nodePath$jscomp$0;
    Module$jscomp$0["read"] = function shell_read$jscomp$0(filename$jscomp$3, binary$jscomp$4) {
      var ret$jscomp$18;
      if (!nodeFS$jscomp$0) {
        nodeFS$jscomp$0 = require("fs");
      }
      if (!nodePath$jscomp$0) {
        nodePath$jscomp$0 = require("path");
      }
      filename$jscomp$3 = nodePath$jscomp$0["normalize"](filename$jscomp$3);
      ret$jscomp$18 = nodeFS$jscomp$0["readFileSync"](filename$jscomp$3);
      return binary$jscomp$4 ? ret$jscomp$18 : ret$jscomp$18.toString();
    };
    Module$jscomp$0["readBinary"] = function readBinary$jscomp$0(filename$jscomp$4) {
      var ret$jscomp$19 = Module$jscomp$0["read"](filename$jscomp$4, true);
      if (!ret$jscomp$19.buffer) {
        ret$jscomp$19 = new Uint8Array(ret$jscomp$19);
      }
      assert$jscomp$0(ret$jscomp$19.buffer);
      return ret$jscomp$19;
    };
    if (process["argv"].length > 1) {
      Module$jscomp$0["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
    }
    Module$jscomp$0["arguments"] = process["argv"].slice(2);
    if (typeof module !== "undefined") {
      module["exports"] = Module$jscomp$0;
    }
    process["on"]("uncaughtException", function(ex$jscomp$0) {
      if (!(ex$jscomp$0 instanceof ExitStatus$jscomp$0)) {
        throw ex$jscomp$0;
      }
    });
    process["on"]("unhandledRejection", function(reason$jscomp$7, p$jscomp$4) {
      process["exit"](1);
    });
    Module$jscomp$0["quit"] = function(status$jscomp$5) {
      process["exit"](status$jscomp$5);
    };
    Module$jscomp$0["inspect"] = function() {
      return "[Emscripten Module object]";
    };
  } else {
    if (ENVIRONMENT_IS_SHELL$jscomp$0) {
      if (typeof read != "undefined") {
        Module$jscomp$0["read"] = function shell_read$jscomp$1(f$jscomp$1) {
          return read(f$jscomp$1);
        };
      }
      Module$jscomp$0["readBinary"] = function readBinary$jscomp$1(f$jscomp$2) {
        var data$jscomp$42;
        if (typeof readbuffer === "function") {
          return new Uint8Array(readbuffer(f$jscomp$2));
        }
        data$jscomp$42 = read(f$jscomp$2, "binary");
        assert$jscomp$0(typeof data$jscomp$42 === "object");
        return data$jscomp$42;
      };
      if (typeof scriptArgs != "undefined") {
        Module$jscomp$0["arguments"] = scriptArgs;
      } else {
        if (typeof arguments != "undefined") {
          Module$jscomp$0["arguments"] = arguments;
        }
      }
      if (typeof quit === "function") {
        Module$jscomp$0["quit"] = function(status$jscomp$6) {
          quit(status$jscomp$6);
        };
      }
    } else {
      if (ENVIRONMENT_IS_WEB$jscomp$0 || ENVIRONMENT_IS_WORKER$jscomp$0) {
        if (ENVIRONMENT_IS_WEB$jscomp$0) {
          if (document.currentScript) {
            scriptDirectory$jscomp$0 = document.currentScript.src;
          }
        } else {
          scriptDirectory$jscomp$0 = self.location.href;
        }
        if (scriptDirectory$jscomp$0.indexOf("blob:") !== 0) {
          scriptDirectory$jscomp$0 = scriptDirectory$jscomp$0.split("/").slice(0, -1).join("/") + "/";
        } else {
          scriptDirectory$jscomp$0 = "";
        }
        Module$jscomp$0["read"] = function shell_read$jscomp$2(url$jscomp$21) {
          var xhr$jscomp$0 = new XMLHttpRequest;
          xhr$jscomp$0.open("GET", url$jscomp$21, false);
          xhr$jscomp$0.send(null);
          return xhr$jscomp$0.responseText;
        };
        if (ENVIRONMENT_IS_WORKER$jscomp$0) {
          Module$jscomp$0["readBinary"] = function readBinary$jscomp$2(url$jscomp$22) {
            var xhr$jscomp$1 = new XMLHttpRequest;
            xhr$jscomp$1.open("GET", url$jscomp$22, false);
            xhr$jscomp$1.responseType = "arraybuffer";
            xhr$jscomp$1.send(null);
            return new Uint8Array(xhr$jscomp$1.response);
          };
        }
        Module$jscomp$0["readAsync"] = function readAsync$jscomp$0(url$jscomp$23, onload$jscomp$0, onerror$jscomp$0) {
          var xhr$jscomp$2 = new XMLHttpRequest;
          xhr$jscomp$2.open("GET", url$jscomp$23, true);
          xhr$jscomp$2.responseType = "arraybuffer";
          xhr$jscomp$2.onload = function xhr_onload$jscomp$0() {
            if (xhr$jscomp$2.status == 200 || xhr$jscomp$2.status == 0 && xhr$jscomp$2.response) {
              onload$jscomp$0(xhr$jscomp$2.response);
              return;
            }
            onerror$jscomp$0();
          };
          xhr$jscomp$2.onerror = onerror$jscomp$0;
          xhr$jscomp$2.send(null);
        };
        Module$jscomp$0["setWindowTitle"] = function(title$jscomp$10) {
          document.title = title$jscomp$10;
        };
      } else {
      }
    }
  }
  var out$jscomp$0 = Module$jscomp$0["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
  var err$jscomp$3 = Module$jscomp$0["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out$jscomp$0);
  for (key$jscomp$35 in moduleOverrides$jscomp$0) {
    if (moduleOverrides$jscomp$0.hasOwnProperty(key$jscomp$35)) {
      Module$jscomp$0[key$jscomp$35] = moduleOverrides$jscomp$0[key$jscomp$35];
    }
  }
  moduleOverrides$jscomp$0 = undefined;
  var STACK_ALIGN$jscomp$0 = 16;
  var asm2wasmImports$jscomp$0 = {
    "f64-rem" : function(x$jscomp$87, y$jscomp$66) {
      return x$jscomp$87 % y$jscomp$66;
    },
    "debugger" : function() {
      debugger;
    }
  };
  var jsCallStartIndex$jscomp$0 = 1;
  var functionPointers$jscomp$0 = new Array(0);
  var funcWrappers$jscomp$0 = {};
  var GLOBAL_BASE$jscomp$0 = 1024;
  var ABORT$jscomp$0 = 0;
  var EXITSTATUS$jscomp$0 = 0;
  var JSfuncs$jscomp$0 = {
    "stackSave" : function() {
      stackSave$jscomp$0();
    },
    "stackRestore" : function() {
      stackRestore$jscomp$0();
    },
    "arrayToC" : function(arr$jscomp$8) {
      var ret$jscomp$20 = stackAlloc$jscomp$0(arr$jscomp$8.length);
      writeArrayToMemory$jscomp$0(arr$jscomp$8, ret$jscomp$20);
      return ret$jscomp$20;
    },
    "stringToC" : function(str$jscomp$18) {
      var ret$jscomp$21 = 0;
      if (str$jscomp$18 !== null && str$jscomp$18 !== undefined && str$jscomp$18 !== 0) {
        var len$jscomp$6 = (str$jscomp$18.length << 2) + 1;
        ret$jscomp$21 = stackAlloc$jscomp$0(len$jscomp$6);
        stringToUTF8$jscomp$0(str$jscomp$18, ret$jscomp$21, len$jscomp$6);
      }
      return ret$jscomp$21;
    }
  };
  var toC$jscomp$0 = {
    "string" : JSfuncs$jscomp$0["stringToC"],
    "array" : JSfuncs$jscomp$0["arrayToC"]
  };
  var ALLOC_NORMAL$jscomp$0 = 0;
  var ALLOC_STATIC$jscomp$0 = 2;
  var ALLOC_NONE$jscomp$0 = 4;
  var UTF8Decoder$jscomp$0 = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
  var UTF16Decoder$jscomp$0 = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
  var PAGE_SIZE$jscomp$0 = 16384;
  var WASM_PAGE_SIZE$jscomp$0 = 65536;
  var ASMJS_PAGE_SIZE$jscomp$0 = 16777216;
  var MIN_TOTAL_MEMORY$jscomp$0 = 16777216;
  var buffer$jscomp$9;
  var HEAP8$jscomp$0;
  var HEAPU8$jscomp$0;
  var HEAP16$jscomp$0;
  var HEAPU16$jscomp$0;
  var HEAP32$jscomp$0;
  var HEAPU32$jscomp$0;
  var HEAPF32$jscomp$0;
  var HEAPF64$jscomp$0;
  var STATIC_BASE$jscomp$0;
  var STATICTOP$jscomp$0;
  var staticSealed$jscomp$0;
  var STACK_BASE$jscomp$0;
  var STACKTOP$jscomp$0;
  var STACK_MAX$jscomp$0;
  var DYNAMIC_BASE$jscomp$0;
  var DYNAMICTOP_PTR$jscomp$0;
  STATIC_BASE$jscomp$0 = STATICTOP$jscomp$0 = STACK_BASE$jscomp$0 = STACKTOP$jscomp$0 = STACK_MAX$jscomp$0 = DYNAMIC_BASE$jscomp$0 = DYNAMICTOP_PTR$jscomp$0 = 0;
  staticSealed$jscomp$0 = false;
  if (!Module$jscomp$0["reallocBuffer"]) {
    Module$jscomp$0["reallocBuffer"] = function(size$jscomp$32) {
      var ret$jscomp$22;
      try {
        if (ArrayBuffer.transfer) {
          ret$jscomp$22 = ArrayBuffer.transfer(buffer$jscomp$9, size$jscomp$32);
        } else {
          var oldHEAP8$jscomp$0 = HEAP8$jscomp$0;
          ret$jscomp$22 = new ArrayBuffer(size$jscomp$32);
          var temp$jscomp$0 = new Int8Array(ret$jscomp$22);
          temp$jscomp$0.set(oldHEAP8$jscomp$0);
        }
      } catch (e$jscomp$254) {
        return false;
      }
      var success$jscomp$2 = _emscripten_replace_memory$jscomp$0(ret$jscomp$22);
      if (!success$jscomp$2) {
        return false;
      }
      return ret$jscomp$22;
    };
  }
  var byteLength$jscomp$0;
  try {
    byteLength$jscomp$0 = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
    byteLength$jscomp$0(new ArrayBuffer(4));
  } catch (e$jscomp$255) {
    byteLength$jscomp$0 = function(buffer$jscomp$29) {
      return buffer$jscomp$29.byteLength;
    };
  }
  var TOTAL_STACK$jscomp$0 = Module$jscomp$0["TOTAL_STACK"] || 5242880;
  var TOTAL_MEMORY$jscomp$0 = Module$jscomp$0["TOTAL_MEMORY"] || 33554432;
  if (TOTAL_MEMORY$jscomp$0 < TOTAL_STACK$jscomp$0) {
    err$jscomp$3("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + TOTAL_MEMORY$jscomp$0 + "! (TOTAL_STACK=" + TOTAL_STACK$jscomp$0 + ")");
  }
  if (Module$jscomp$0["buffer"]) {
    buffer$jscomp$9 = Module$jscomp$0["buffer"];
  } else {
    if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
      Module$jscomp$0["wasmMemory"] = new WebAssembly.Memory({
        "initial" : TOTAL_MEMORY$jscomp$0 / WASM_PAGE_SIZE$jscomp$0
      });
      buffer$jscomp$9 = Module$jscomp$0["wasmMemory"].buffer;
    } else {
      buffer$jscomp$9 = new ArrayBuffer(TOTAL_MEMORY$jscomp$0);
    }
    Module$jscomp$0["buffer"] = buffer$jscomp$9;
  }
  updateGlobalBufferViews$jscomp$0();
  var __ATPRERUN__$jscomp$0 = [];
  var __ATINIT__$jscomp$0 = [];
  var __ATMAIN__$jscomp$0 = [];
  var __ATEXIT__$jscomp$0 = [];
  var __ATPOSTRUN__$jscomp$0 = [];
  var runtimeInitialized$jscomp$0 = false;
  var runtimeExited$jscomp$0 = false;
  var Math_abs$jscomp$0 = Math.abs;
  var Math_sqrt$jscomp$0 = Math.sqrt;
  var Math_ceil$jscomp$0 = Math.ceil;
  var Math_floor$jscomp$0 = Math.floor;
  var Math_pow$jscomp$0 = Math.pow;
  var Math_min$jscomp$0 = Math.min;
  var Math_clz32$jscomp$0 = Math.clz32;
  var Math_trunc$jscomp$0 = Math.trunc;
  var runDependencies$jscomp$0 = 0;
  var runDependencyWatcher$jscomp$0 = null;
  var dependenciesFulfilled$jscomp$0 = null;
  Module$jscomp$0["preloadedImages"] = {};
  Module$jscomp$0["preloadedAudios"] = {};
  var dataURIPrefix$jscomp$0 = "data:application/octet-stream;base64,";
  integrateWasmJS$jscomp$0();
  var ASM_CONSTS$jscomp$0 = [function() {
    return Module$jscomp$0.webglContextAttributes.premultipliedAlpha;
  }, function() {
    return Module$jscomp$0.webglContextAttributes.preserveDrawingBuffer;
  }, function() {
    return typeof Module$jscomp$0.shouldQuit != "undefined";
  }, function() {
    var id$jscomp$35;
    for (id$jscomp$35 in Module$jscomp$0.intervals) {
      window.clearInterval(id$jscomp$35);
    }
    Module$jscomp$0.intervals = {};
    var i$jscomp$54 = 0;
    for (; i$jscomp$54 < Module$jscomp$0.deinitializers.length; i$jscomp$54++) {
      Module$jscomp$0.deinitializers[i$jscomp$54]();
    }
    Module$jscomp$0.deinitializers = [];
    if (typeof Module$jscomp$0.onQuit == "function") {
      Module$jscomp$0.onQuit();
    }
  }];
  STATIC_BASE$jscomp$0 = GLOBAL_BASE$jscomp$0;
  STATICTOP$jscomp$0 = STATIC_BASE$jscomp$0 + 2178848;
  __ATINIT__$jscomp$0.push({
    func : function() {
      __GLOBAL__sub_I_AccessibilityScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AIScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_192$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AnimationScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Animation_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Animation_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Animation_7_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AnimationClip_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AssetBundleScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AudioScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Video_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Audio_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Audio_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Audio_Public_3_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_ClothScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Cloth_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_18$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_nvcloth_src_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_nvcloth_src_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_SwInterCollision_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_SwSolverKernel_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Input_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_GfxDeviceNull_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Allocator_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Application_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_BaseClasses_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_BaseClasses_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_BaseClasses_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_BaseClasses_3_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Burst_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_6_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_7_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_8_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Shadows_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_GUITexture_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Containers_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_File_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Geometry_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_104$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_4_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_6_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_8_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_10_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_11_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Interfaces_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Interfaces_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Interfaces_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Jobs_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Jobs_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Math_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Math_Random_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Misc_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Misc_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_131$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Misc_4_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Misc_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_PreloadManager_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Profiler_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Profiler_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_SceneManager_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_61$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_4_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_9$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_8760$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Transform_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Transform_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Utilities_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_9153$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Utilities_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Utilities_6_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Utilities_7_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Utilities_9_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_AssetBundleFileSystem_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Modules_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_18_1172$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_19$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_20$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Profiler_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_3_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_4_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_GfxDevice_5_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_PluginInterface_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Director_Core_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Scripting_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Scripting_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Scripting_3_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Mono_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TemplateInstantiations_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Serialize_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Serialize_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Mesh_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_LogAssert_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Shader_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_DirectorScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_GridScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Grid_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_3738$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_IMGUIScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_IMGUI_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_23$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_IMGUI_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_InputLegacyScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_InputScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Input_Private_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_ParticleSystem_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_ShapeModule_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UVModule_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Physics2DScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PhysicsScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Physics_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Physics_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PhysicsQuery_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_SubsystemsScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Subsystems_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TerrainScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Terrain_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Terrain_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___cxx_global_var_init_89$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Terrain_Public_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Terrain_Public_3_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Terrain_VR_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TextCoreScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TextRenderingScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TilemapScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Tilemap_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_TLSModule_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_External_Yoga_Yoga_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UIScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_UI_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_UI_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_UI_2_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_umbra_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UnityAdsSettings_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_VFXScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_VFX_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_VFX_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_VisualEffectAsset_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_VideoScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_VRScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_VR_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_VR_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_PluginInterfaceVR_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Wind_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_XRScriptingClasses_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_XRAudio_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_XRPreInit_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Stats_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Modules_XR_Tracing_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_XRWindowsLocatableCamera_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_os_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_vm_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_utils_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_mono_cpp$jscomp$0();
    }
  }, {
    func : function() {
      __GLOBAL__sub_I_Lump_libil2cpp_gc_cpp$jscomp$0();
    }
  }, {
    func : function() {
      ___emscripten_environ_constructor$jscomp$0();
    }
  });
  var STATIC_BUMP$jscomp$0 = 2178848;
  Module$jscomp$0["STATIC_BASE"] = STATIC_BASE$jscomp$0;
  Module$jscomp$0["STATIC_BUMP"] = STATIC_BUMP$jscomp$0;
  var tempDoublePtr$jscomp$0 = STATICTOP$jscomp$0;
  STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + 16;
  var fs$jscomp$0 = {
    numPendingSync : 0,
    syncInternal : 1E3,
    syncInProgress : false,
    sync : function(onlyPendingSync$jscomp$0) {
      if (onlyPendingSync$jscomp$0) {
        if (fs$jscomp$0.numPendingSync == 0) {
          return;
        }
      } else {
        if (fs$jscomp$0.syncInProgress) {
          fs$jscomp$0.numPendingSync++;
          return;
        }
      }
      fs$jscomp$0.syncInProgress = true;
      FS$jscomp$0.syncfs(false, function(err$jscomp$8) {
        fs$jscomp$0.syncInProgress = false;
      });
      fs$jscomp$0.numPendingSync = 0;
    }
  };
  var WEBAudio$jscomp$0 = {
    audioInstanceIdCounter : 0,
    audioInstances : {},
    audioContext : null,
    audioWebEnabled : 0
  };
  var ENV$jscomp$0 = {};
  var EXCEPTIONS$jscomp$0 = {
    last : 0,
    caught : [],
    infos : {},
    deAdjust : function(adjusted$jscomp$0) {
      if (!adjusted$jscomp$0 || EXCEPTIONS$jscomp$0.infos[adjusted$jscomp$0]) {
        return adjusted$jscomp$0;
      }
      var key$jscomp$41;
      for (key$jscomp$41 in EXCEPTIONS$jscomp$0.infos) {
        var ptr$jscomp$25 = +key$jscomp$41;
        var info$jscomp$7 = EXCEPTIONS$jscomp$0.infos[ptr$jscomp$25];
        if (info$jscomp$7.adjusted === adjusted$jscomp$0) {
          return ptr$jscomp$25;
        }
      }
      return adjusted$jscomp$0;
    },
    addRef : function(ptr$jscomp$26) {
      if (!ptr$jscomp$26) {
        return;
      }
      var info$jscomp$8 = EXCEPTIONS$jscomp$0.infos[ptr$jscomp$26];
      info$jscomp$8.refcount++;
    },
    decRef : function(ptr$jscomp$27) {
      if (!ptr$jscomp$27) {
        return;
      }
      var info$jscomp$9 = EXCEPTIONS$jscomp$0.infos[ptr$jscomp$27];
      assert$jscomp$0(info$jscomp$9.refcount > 0);
      info$jscomp$9.refcount--;
      if (info$jscomp$9.refcount === 0 && !info$jscomp$9.rethrown) {
        if (info$jscomp$9.destructor) {
          Module$jscomp$0["dynCall_vi"](info$jscomp$9.destructor, ptr$jscomp$27);
        }
        delete EXCEPTIONS$jscomp$0.infos[ptr$jscomp$27];
        ___cxa_free_exception$jscomp$0(ptr$jscomp$27);
      }
    },
    clearRef : function(ptr$jscomp$28) {
      if (!ptr$jscomp$28) {
        return;
      }
      var info$jscomp$10 = EXCEPTIONS$jscomp$0.infos[ptr$jscomp$28];
      info$jscomp$10.refcount = 0;
    }
  };
  var ERRNO_CODES$jscomp$0 = {
    EPERM : 1,
    ENOENT : 2,
    ESRCH : 3,
    EINTR : 4,
    EIO : 5,
    ENXIO : 6,
    E2BIG : 7,
    ENOEXEC : 8,
    EBADF : 9,
    ECHILD : 10,
    EAGAIN : 11,
    EWOULDBLOCK : 11,
    ENOMEM : 12,
    EACCES : 13,
    EFAULT : 14,
    ENOTBLK : 15,
    EBUSY : 16,
    EEXIST : 17,
    EXDEV : 18,
    ENODEV : 19,
    ENOTDIR : 20,
    EISDIR : 21,
    EINVAL : 22,
    ENFILE : 23,
    EMFILE : 24,
    ENOTTY : 25,
    ETXTBSY : 26,
    EFBIG : 27,
    ENOSPC : 28,
    ESPIPE : 29,
    EROFS : 30,
    EMLINK : 31,
    EPIPE : 32,
    EDOM : 33,
    ERANGE : 34,
    ENOMSG : 42,
    EIDRM : 43,
    ECHRNG : 44,
    EL2NSYNC : 45,
    EL3HLT : 46,
    EL3RST : 47,
    ELNRNG : 48,
    EUNATCH : 49,
    ENOCSI : 50,
    EL2HLT : 51,
    EDEADLK : 35,
    ENOLCK : 37,
    EBADE : 52,
    EBADR : 53,
    EXFULL : 54,
    ENOANO : 55,
    EBADRQC : 56,
    EBADSLT : 57,
    EDEADLOCK : 35,
    EBFONT : 59,
    ENOSTR : 60,
    ENODATA : 61,
    ETIME : 62,
    ENOSR : 63,
    ENONET : 64,
    ENOPKG : 65,
    EREMOTE : 66,
    ENOLINK : 67,
    EADV : 68,
    ESRMNT : 69,
    ECOMM : 70,
    EPROTO : 71,
    EMULTIHOP : 72,
    EDOTDOT : 73,
    EBADMSG : 74,
    ENOTUNIQ : 76,
    EBADFD : 77,
    EREMCHG : 78,
    ELIBACC : 79,
    ELIBBAD : 80,
    ELIBSCN : 81,
    ELIBMAX : 82,
    ELIBEXEC : 83,
    ENOSYS : 38,
    ENOTEMPTY : 39,
    ENAMETOOLONG : 36,
    ELOOP : 40,
    EOPNOTSUPP : 95,
    EPFNOSUPPORT : 96,
    ECONNRESET : 104,
    ENOBUFS : 105,
    EAFNOSUPPORT : 97,
    EPROTOTYPE : 91,
    ENOTSOCK : 88,
    ENOPROTOOPT : 92,
    ESHUTDOWN : 108,
    ECONNREFUSED : 111,
    EADDRINUSE : 98,
    ECONNABORTED : 103,
    ENETUNREACH : 101,
    ENETDOWN : 100,
    ETIMEDOUT : 110,
    EHOSTDOWN : 112,
    EHOSTUNREACH : 113,
    EINPROGRESS : 115,
    EALREADY : 114,
    EDESTADDRREQ : 89,
    EMSGSIZE : 90,
    EPROTONOSUPPORT : 93,
    ESOCKTNOSUPPORT : 94,
    EADDRNOTAVAIL : 99,
    ENETRESET : 102,
    EISCONN : 106,
    ENOTCONN : 107,
    ETOOMANYREFS : 109,
    EUSERS : 87,
    EDQUOT : 122,
    ESTALE : 116,
    ENOTSUP : 95,
    ENOMEDIUM : 123,
    EILSEQ : 84,
    EOVERFLOW : 75,
    ECANCELED : 125,
    ENOTRECOVERABLE : 131,
    EOWNERDEAD : 130,
    ESTRPIPE : 86
  };
  var ERRNO_MESSAGES$jscomp$0 = {
    0 : "Success",
    1 : "Not super-user",
    2 : "No such file or directory",
    3 : "No such process",
    4 : "Interrupted system call",
    5 : "I/O error",
    6 : "No such device or address",
    7 : "Arg list too long",
    8 : "Exec format error",
    9 : "Bad file number",
    10 : "No children",
    11 : "No more processes",
    12 : "Not enough core",
    13 : "Permission denied",
    14 : "Bad address",
    15 : "Block device required",
    16 : "Mount device busy",
    17 : "File exists",
    18 : "Cross-device link",
    19 : "No such device",
    20 : "Not a directory",
    21 : "Is a directory",
    22 : "Invalid argument",
    23 : "Too many open files in system",
    24 : "Too many open files",
    25 : "Not a typewriter",
    26 : "Text file busy",
    27 : "File too large",
    28 : "No space left on device",
    29 : "Illegal seek",
    30 : "Read only file system",
    31 : "Too many links",
    32 : "Broken pipe",
    33 : "Math arg out of domain of func",
    34 : "Math result not representable",
    35 : "File locking deadlock error",
    36 : "File or path name too long",
    37 : "No record locks available",
    38 : "Function not implemented",
    39 : "Directory not empty",
    40 : "Too many symbolic links",
    42 : "No message of desired type",
    43 : "Identifier removed",
    44 : "Channel number out of range",
    45 : "Level 2 not synchronized",
    46 : "Level 3 halted",
    47 : "Level 3 reset",
    48 : "Link number out of range",
    49 : "Protocol driver not attached",
    50 : "No CSI structure available",
    51 : "Level 2 halted",
    52 : "Invalid exchange",
    53 : "Invalid request descriptor",
    54 : "Exchange full",
    55 : "No anode",
    56 : "Invalid request code",
    57 : "Invalid slot",
    59 : "Bad font file fmt",
    60 : "Device not a stream",
    61 : "No data (for no delay io)",
    62 : "Timer expired",
    63 : "Out of streams resources",
    64 : "Machine is not on the network",
    65 : "Package not installed",
    66 : "The object is remote",
    67 : "The link has been severed",
    68 : "Advertise error",
    69 : "Srmount error",
    70 : "Communication error on send",
    71 : "Protocol error",
    72 : "Multihop attempted",
    73 : "Cross mount point (not really error)",
    74 : "Trying to read unreadable message",
    75 : "Value too large for defined data type",
    76 : "Given log. name not unique",
    77 : "f.d. invalid for this operation",
    78 : "Remote address changed",
    79 : "Can   access a needed shared lib",
    80 : "Accessing a corrupted shared lib",
    81 : ".lib section in a.out corrupted",
    82 : "Attempting to link in too many libs",
    83 : "Attempting to exec a shared library",
    84 : "Illegal byte sequence",
    86 : "Streams pipe error",
    87 : "Too many users",
    88 : "Socket operation on non-socket",
    89 : "Destination address required",
    90 : "Message too long",
    91 : "Protocol wrong type for socket",
    92 : "Protocol not available",
    93 : "Unknown protocol",
    94 : "Socket type not supported",
    95 : "Not supported",
    96 : "Protocol family not supported",
    97 : "Address family not supported by protocol family",
    98 : "Address already in use",
    99 : "Address not available",
    100 : "Network interface is not configured",
    101 : "Network is unreachable",
    102 : "Connection reset by network",
    103 : "Connection aborted",
    104 : "Connection reset by peer",
    105 : "No buffer space available",
    106 : "Socket is already connected",
    107 : "Socket is not connected",
    108 : "Can't send after socket shutdown",
    109 : "Too many references",
    110 : "Connection timed out",
    111 : "Connection refused",
    112 : "Host is down",
    113 : "Host is unreachable",
    114 : "Socket already connected",
    115 : "Connection already in progress",
    116 : "Stale file handle",
    122 : "Quota exceeded",
    123 : "No medium (in tape drive)",
    125 : "Operation canceled",
    130 : "Previous owner died",
    131 : "State not recoverable"
  };
  var PATH$jscomp$0 = {
    splitPath : function(filename$jscomp$5) {
      var splitPathRe$jscomp$0 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe$jscomp$0.exec(filename$jscomp$5).slice(1);
    },
    normalizeArray : function(parts$jscomp$2, allowAboveRoot$jscomp$0) {
      var up$jscomp$0 = 0;
      var i$jscomp$55 = parts$jscomp$2.length - 1;
      for (; i$jscomp$55 >= 0; i$jscomp$55--) {
        var last$jscomp$0 = parts$jscomp$2[i$jscomp$55];
        if (last$jscomp$0 === ".") {
          parts$jscomp$2.splice(i$jscomp$55, 1);
        } else {
          if (last$jscomp$0 === "..") {
            parts$jscomp$2.splice(i$jscomp$55, 1);
            up$jscomp$0++;
          } else {
            if (up$jscomp$0) {
              parts$jscomp$2.splice(i$jscomp$55, 1);
              up$jscomp$0--;
            }
          }
        }
      }
      if (allowAboveRoot$jscomp$0) {
        for (; up$jscomp$0; up$jscomp$0--) {
          parts$jscomp$2.unshift("..");
        }
      }
      return parts$jscomp$2;
    },
    normalize : function(path$jscomp$15) {
      var isAbsolute$jscomp$0 = path$jscomp$15.charAt(0) === "/";
      var trailingSlash$jscomp$0 = path$jscomp$15.substr(-1) === "/";
      path$jscomp$15 = PATH$jscomp$0.normalizeArray(path$jscomp$15.split("/").filter(function(p$jscomp$5) {
        return !!p$jscomp$5;
      }), !isAbsolute$jscomp$0).join("/");
      if (!path$jscomp$15 && !isAbsolute$jscomp$0) {
        path$jscomp$15 = ".";
      }
      if (path$jscomp$15 && trailingSlash$jscomp$0) {
        path$jscomp$15 = path$jscomp$15 + "/";
      }
      return (isAbsolute$jscomp$0 ? "/" : "") + path$jscomp$15;
    },
    dirname : function(path$jscomp$16) {
      var result$jscomp$13 = PATH$jscomp$0.splitPath(path$jscomp$16);
      var root$jscomp$2 = result$jscomp$13[0];
      var dir$jscomp$0 = result$jscomp$13[1];
      if (!root$jscomp$2 && !dir$jscomp$0) {
        return ".";
      }
      if (dir$jscomp$0) {
        dir$jscomp$0 = dir$jscomp$0.substr(0, dir$jscomp$0.length - 1);
      }
      return root$jscomp$2 + dir$jscomp$0;
    },
    basename : function(path$jscomp$17) {
      if (path$jscomp$17 === "/") {
        return "/";
      }
      var lastSlash$jscomp$0 = path$jscomp$17.lastIndexOf("/");
      if (lastSlash$jscomp$0 === -1) {
        return path$jscomp$17;
      }
      return path$jscomp$17.substr(lastSlash$jscomp$0 + 1);
    },
    extname : function(path$jscomp$18) {
      return PATH$jscomp$0.splitPath(path$jscomp$18)[3];
    },
    join : function() {
      var paths$jscomp$0 = Array.prototype.slice.call(arguments, 0);
      return PATH$jscomp$0.normalize(paths$jscomp$0.join("/"));
    },
    join2 : function(l$jscomp$2, r$jscomp$1) {
      return PATH$jscomp$0.normalize(l$jscomp$2 + "/" + r$jscomp$1);
    },
    resolve : function() {
      var resolvedPath$jscomp$0 = "";
      var resolvedAbsolute$jscomp$0 = false;
      var i$jscomp$56 = arguments.length - 1;
      for (; i$jscomp$56 >= -1 && !resolvedAbsolute$jscomp$0; i$jscomp$56--) {
        var path$jscomp$19 = i$jscomp$56 >= 0 ? arguments[i$jscomp$56] : FS$jscomp$0.cwd();
        if (typeof path$jscomp$19 !== "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else {
          if (!path$jscomp$19) {
            return "";
          }
        }
        resolvedPath$jscomp$0 = path$jscomp$19 + "/" + resolvedPath$jscomp$0;
        resolvedAbsolute$jscomp$0 = path$jscomp$19.charAt(0) === "/";
      }
      resolvedPath$jscomp$0 = PATH$jscomp$0.normalizeArray(resolvedPath$jscomp$0.split("/").filter(function(p$jscomp$6) {
        return !!p$jscomp$6;
      }), !resolvedAbsolute$jscomp$0).join("/");
      return (resolvedAbsolute$jscomp$0 ? "/" : "") + resolvedPath$jscomp$0 || ".";
    },
    relative : function(from$jscomp$0, to$jscomp$0) {
      function trim$jscomp$0(arr$jscomp$9) {
        var start$jscomp$14 = 0;
        for (; start$jscomp$14 < arr$jscomp$9.length; start$jscomp$14++) {
          if (arr$jscomp$9[start$jscomp$14] !== "") {
            break;
          }
        }
        var end$jscomp$5 = arr$jscomp$9.length - 1;
        for (; end$jscomp$5 >= 0; end$jscomp$5--) {
          if (arr$jscomp$9[end$jscomp$5] !== "") {
            break;
          }
        }
        if (start$jscomp$14 > end$jscomp$5) {
          return [];
        }
        return arr$jscomp$9.slice(start$jscomp$14, end$jscomp$5 - start$jscomp$14 + 1);
      }
      from$jscomp$0 = PATH$jscomp$0.resolve(from$jscomp$0).substr(1);
      to$jscomp$0 = PATH$jscomp$0.resolve(to$jscomp$0).substr(1);
      var fromParts$jscomp$0 = trim$jscomp$0(from$jscomp$0.split("/"));
      var toParts$jscomp$0 = trim$jscomp$0(to$jscomp$0.split("/"));
      var length$jscomp$33 = Math.min(fromParts$jscomp$0.length, toParts$jscomp$0.length);
      var samePartsLength$jscomp$0 = length$jscomp$33;
      var i$jscomp$57 = 0;
      for (; i$jscomp$57 < length$jscomp$33; i$jscomp$57++) {
        if (fromParts$jscomp$0[i$jscomp$57] !== toParts$jscomp$0[i$jscomp$57]) {
          samePartsLength$jscomp$0 = i$jscomp$57;
          break;
        }
      }
      var outputParts$jscomp$0 = [];
      i$jscomp$57 = samePartsLength$jscomp$0;
      for (; i$jscomp$57 < fromParts$jscomp$0.length; i$jscomp$57++) {
        outputParts$jscomp$0.push("..");
      }
      outputParts$jscomp$0 = outputParts$jscomp$0.concat(toParts$jscomp$0.slice(samePartsLength$jscomp$0));
      return outputParts$jscomp$0.join("/");
    }
  };
  var TTY$jscomp$0 = {
    ttys : [],
    init : function() {
    },
    shutdown : function() {
    },
    register : function(dev$jscomp$0, ops$jscomp$0) {
      TTY$jscomp$0.ttys[dev$jscomp$0] = {
        input : [],
        output : [],
        ops : ops$jscomp$0
      };
      FS$jscomp$0.registerDevice(dev$jscomp$0, TTY$jscomp$0.stream_ops);
    },
    stream_ops : {
      open : function(stream$jscomp$17) {
        var tty$jscomp$0 = TTY$jscomp$0.ttys[stream$jscomp$17.node.rdev];
        if (!tty$jscomp$0) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENODEV);
        }
        stream$jscomp$17.tty = tty$jscomp$0;
        stream$jscomp$17.seekable = false;
      },
      close : function(stream$jscomp$18) {
        stream$jscomp$18.tty.ops.flush(stream$jscomp$18.tty);
      },
      flush : function(stream$jscomp$19) {
        stream$jscomp$19.tty.ops.flush(stream$jscomp$19.tty);
      },
      read : function(stream$jscomp$20, buffer$jscomp$30, offset$jscomp$23, length$jscomp$34, pos$jscomp$1) {
        if (!stream$jscomp$20.tty || !stream$jscomp$20.tty.ops.get_char) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENXIO);
        }
        var bytesRead$jscomp$0 = 0;
        var i$jscomp$58 = 0;
        for (; i$jscomp$58 < length$jscomp$34; i$jscomp$58++) {
          var result$jscomp$14;
          try {
            result$jscomp$14 = stream$jscomp$20.tty.ops.get_char(stream$jscomp$20.tty);
          } catch (e$jscomp$256) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
          }
          if (result$jscomp$14 === undefined && bytesRead$jscomp$0 === 0) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EAGAIN);
          }
          if (result$jscomp$14 === null || result$jscomp$14 === undefined) {
            break;
          }
          bytesRead$jscomp$0++;
          buffer$jscomp$30[offset$jscomp$23 + i$jscomp$58] = result$jscomp$14;
        }
        if (bytesRead$jscomp$0) {
          stream$jscomp$20.node.timestamp = Date.now();
        }
        return bytesRead$jscomp$0;
      },
      write : function(stream$jscomp$21, buffer$jscomp$31, offset$jscomp$24, length$jscomp$35, pos$jscomp$2) {
        if (!stream$jscomp$21.tty || !stream$jscomp$21.tty.ops.put_char) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENXIO);
        }
        var i$jscomp$59 = 0;
        for (; i$jscomp$59 < length$jscomp$35; i$jscomp$59++) {
          try {
            stream$jscomp$21.tty.ops.put_char(stream$jscomp$21.tty, buffer$jscomp$31[offset$jscomp$24 + i$jscomp$59]);
          } catch (e$jscomp$257) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
          }
        }
        if (length$jscomp$35) {
          stream$jscomp$21.node.timestamp = Date.now();
        }
        return i$jscomp$59;
      }
    },
    default_tty_ops : {
      get_char : function(tty$jscomp$1) {
        if (!tty$jscomp$1.input.length) {
          var result$jscomp$15 = null;
          if (ENVIRONMENT_IS_NODE$jscomp$0) {
            var BUFSIZE$jscomp$0 = 256;
            var buf$jscomp$10 = new Buffer(BUFSIZE$jscomp$0);
            var bytesRead$jscomp$1 = 0;
            var isPosixPlatform$jscomp$0 = process.platform != "win32";
            var fd$jscomp$4 = process.stdin.fd;
            if (isPosixPlatform$jscomp$0) {
              var usingDevice$jscomp$0 = false;
              try {
                fd$jscomp$4 = fs$jscomp$0.openSync("/dev/stdin", "r");
                usingDevice$jscomp$0 = true;
              } catch (e$jscomp$258) {
              }
            }
            try {
              bytesRead$jscomp$1 = fs$jscomp$0.readSync(fd$jscomp$4, buf$jscomp$10, 0, BUFSIZE$jscomp$0, null);
            } catch (e$jscomp$259) {
              if (e$jscomp$259.toString().indexOf("EOF") != -1) {
                bytesRead$jscomp$1 = 0;
              } else {
                throw e$jscomp$259;
              }
            }
            if (usingDevice$jscomp$0) {
              fs$jscomp$0.closeSync(fd$jscomp$4);
            }
            if (bytesRead$jscomp$1 > 0) {
              result$jscomp$15 = buf$jscomp$10.slice(0, bytesRead$jscomp$1).toString("utf-8");
            } else {
              result$jscomp$15 = null;
            }
          } else {
            if (typeof window != "undefined" && typeof window.prompt == "function") {
              result$jscomp$15 = window.prompt("Input: ");
              if (result$jscomp$15 !== null) {
                result$jscomp$15 = result$jscomp$15 + "\n";
              }
            } else {
              if (typeof readline == "function") {
                result$jscomp$15 = readline();
                if (result$jscomp$15 !== null) {
                  result$jscomp$15 = result$jscomp$15 + "\n";
                }
              }
            }
          }
          if (!result$jscomp$15) {
            return null;
          }
          tty$jscomp$1.input = intArrayFromString$jscomp$0(result$jscomp$15, true);
        }
        return tty$jscomp$1.input.shift();
      },
      put_char : function(tty$jscomp$2, val$jscomp$2) {
        if (val$jscomp$2 === null || val$jscomp$2 === 10) {
          out$jscomp$0(UTF8ArrayToString$jscomp$0(tty$jscomp$2.output, 0));
          tty$jscomp$2.output = [];
        } else {
          if (val$jscomp$2 != 0) {
            tty$jscomp$2.output.push(val$jscomp$2);
          }
        }
      },
      flush : function(tty$jscomp$3) {
        if (tty$jscomp$3.output && tty$jscomp$3.output.length > 0) {
          out$jscomp$0(UTF8ArrayToString$jscomp$0(tty$jscomp$3.output, 0));
          tty$jscomp$3.output = [];
        }
      }
    },
    default_tty1_ops : {
      put_char : function(tty$jscomp$4, val$jscomp$3) {
        if (val$jscomp$3 === null || val$jscomp$3 === 10) {
          err$jscomp$3(UTF8ArrayToString$jscomp$0(tty$jscomp$4.output, 0));
          tty$jscomp$4.output = [];
        } else {
          if (val$jscomp$3 != 0) {
            tty$jscomp$4.output.push(val$jscomp$3);
          }
        }
      },
      flush : function(tty$jscomp$5) {
        if (tty$jscomp$5.output && tty$jscomp$5.output.length > 0) {
          err$jscomp$3(UTF8ArrayToString$jscomp$0(tty$jscomp$5.output, 0));
          tty$jscomp$5.output = [];
        }
      }
    }
  };
  var MEMFS$jscomp$0 = {
    ops_table : null,
    mount : function(mount$jscomp$0) {
      return MEMFS$jscomp$0.createNode(null, "/", 16384 | 511, 0);
    },
    createNode : function(parent$jscomp$2, name$jscomp$76, mode$jscomp$19, dev$jscomp$1) {
      if (FS$jscomp$0.isBlkdev(mode$jscomp$19) || FS$jscomp$0.isFIFO(mode$jscomp$19)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      if (!MEMFS$jscomp$0.ops_table) {
        MEMFS$jscomp$0.ops_table = {
          dir : {
            node : {
              getattr : MEMFS$jscomp$0.node_ops.getattr,
              setattr : MEMFS$jscomp$0.node_ops.setattr,
              lookup : MEMFS$jscomp$0.node_ops.lookup,
              mknod : MEMFS$jscomp$0.node_ops.mknod,
              rename : MEMFS$jscomp$0.node_ops.rename,
              unlink : MEMFS$jscomp$0.node_ops.unlink,
              rmdir : MEMFS$jscomp$0.node_ops.rmdir,
              readdir : MEMFS$jscomp$0.node_ops.readdir,
              symlink : MEMFS$jscomp$0.node_ops.symlink
            },
            stream : {
              llseek : MEMFS$jscomp$0.stream_ops.llseek
            }
          },
          file : {
            node : {
              getattr : MEMFS$jscomp$0.node_ops.getattr,
              setattr : MEMFS$jscomp$0.node_ops.setattr
            },
            stream : {
              llseek : MEMFS$jscomp$0.stream_ops.llseek,
              read : MEMFS$jscomp$0.stream_ops.read,
              write : MEMFS$jscomp$0.stream_ops.write,
              allocate : MEMFS$jscomp$0.stream_ops.allocate,
              mmap : MEMFS$jscomp$0.stream_ops.mmap,
              msync : MEMFS$jscomp$0.stream_ops.msync
            }
          },
          link : {
            node : {
              getattr : MEMFS$jscomp$0.node_ops.getattr,
              setattr : MEMFS$jscomp$0.node_ops.setattr,
              readlink : MEMFS$jscomp$0.node_ops.readlink
            },
            stream : {}
          },
          chrdev : {
            node : {
              getattr : MEMFS$jscomp$0.node_ops.getattr,
              setattr : MEMFS$jscomp$0.node_ops.setattr
            },
            stream : FS$jscomp$0.chrdev_stream_ops
          }
        };
      }
      var node$jscomp$2 = FS$jscomp$0.createNode(parent$jscomp$2, name$jscomp$76, mode$jscomp$19, dev$jscomp$1);
      if (FS$jscomp$0.isDir(node$jscomp$2.mode)) {
        node$jscomp$2.node_ops = MEMFS$jscomp$0.ops_table.dir.node;
        node$jscomp$2.stream_ops = MEMFS$jscomp$0.ops_table.dir.stream;
        node$jscomp$2.contents = {};
      } else {
        if (FS$jscomp$0.isFile(node$jscomp$2.mode)) {
          node$jscomp$2.node_ops = MEMFS$jscomp$0.ops_table.file.node;
          node$jscomp$2.stream_ops = MEMFS$jscomp$0.ops_table.file.stream;
          node$jscomp$2.usedBytes = 0;
          node$jscomp$2.contents = null;
        } else {
          if (FS$jscomp$0.isLink(node$jscomp$2.mode)) {
            node$jscomp$2.node_ops = MEMFS$jscomp$0.ops_table.link.node;
            node$jscomp$2.stream_ops = MEMFS$jscomp$0.ops_table.link.stream;
          } else {
            if (FS$jscomp$0.isChrdev(node$jscomp$2.mode)) {
              node$jscomp$2.node_ops = MEMFS$jscomp$0.ops_table.chrdev.node;
              node$jscomp$2.stream_ops = MEMFS$jscomp$0.ops_table.chrdev.stream;
            }
          }
        }
      }
      node$jscomp$2.timestamp = Date.now();
      if (parent$jscomp$2) {
        parent$jscomp$2.contents[name$jscomp$76] = node$jscomp$2;
      }
      return node$jscomp$2;
    },
    getFileDataAsRegularArray : function(node$jscomp$3) {
      if (node$jscomp$3.contents && node$jscomp$3.contents.subarray) {
        var arr$jscomp$10 = [];
        var i$jscomp$60 = 0;
        for (; i$jscomp$60 < node$jscomp$3.usedBytes; ++i$jscomp$60) {
          arr$jscomp$10.push(node$jscomp$3.contents[i$jscomp$60]);
        }
        return arr$jscomp$10;
      }
      return node$jscomp$3.contents;
    },
    getFileDataAsTypedArray : function(node$jscomp$4) {
      if (!node$jscomp$4.contents) {
        return new Uint8Array;
      }
      if (node$jscomp$4.contents.subarray) {
        return node$jscomp$4.contents.subarray(0, node$jscomp$4.usedBytes);
      }
      return new Uint8Array(node$jscomp$4.contents);
    },
    expandFileStorage : function(node$jscomp$5, newCapacity$jscomp$0) {
      if (node$jscomp$5.contents && node$jscomp$5.contents.subarray && newCapacity$jscomp$0 > node$jscomp$5.contents.length) {
        node$jscomp$5.contents = MEMFS$jscomp$0.getFileDataAsRegularArray(node$jscomp$5);
        node$jscomp$5.usedBytes = node$jscomp$5.contents.length;
      }
      if (!node$jscomp$5.contents || node$jscomp$5.contents.subarray) {
        var prevCapacity$jscomp$0 = node$jscomp$5.contents ? node$jscomp$5.contents.length : 0;
        if (prevCapacity$jscomp$0 >= newCapacity$jscomp$0) {
          return;
        }
        var CAPACITY_DOUBLING_MAX$jscomp$0 = 1024 * 1024;
        newCapacity$jscomp$0 = Math.max(newCapacity$jscomp$0, prevCapacity$jscomp$0 * (prevCapacity$jscomp$0 < CAPACITY_DOUBLING_MAX$jscomp$0 ? 2 : 1.125) | 0);
        if (prevCapacity$jscomp$0 != 0) {
          newCapacity$jscomp$0 = Math.max(newCapacity$jscomp$0, 256);
        }
        var oldContents$jscomp$0 = node$jscomp$5.contents;
        node$jscomp$5.contents = new Uint8Array(newCapacity$jscomp$0);
        if (node$jscomp$5.usedBytes > 0) {
          node$jscomp$5.contents.set(oldContents$jscomp$0.subarray(0, node$jscomp$5.usedBytes), 0);
        }
        return;
      }
      if (!node$jscomp$5.contents && newCapacity$jscomp$0 > 0) {
        node$jscomp$5.contents = [];
      }
      for (; node$jscomp$5.contents.length < newCapacity$jscomp$0;) {
        node$jscomp$5.contents.push(0);
      }
    },
    resizeFileStorage : function(node$jscomp$6, newSize$jscomp$0) {
      if (node$jscomp$6.usedBytes == newSize$jscomp$0) {
        return;
      }
      if (newSize$jscomp$0 == 0) {
        node$jscomp$6.contents = null;
        node$jscomp$6.usedBytes = 0;
        return;
      }
      if (!node$jscomp$6.contents || node$jscomp$6.contents.subarray) {
        var oldContents$jscomp$1 = node$jscomp$6.contents;
        node$jscomp$6.contents = new Uint8Array(new ArrayBuffer(newSize$jscomp$0));
        if (oldContents$jscomp$1) {
          node$jscomp$6.contents.set(oldContents$jscomp$1.subarray(0, Math.min(newSize$jscomp$0, node$jscomp$6.usedBytes)));
        }
        node$jscomp$6.usedBytes = newSize$jscomp$0;
        return;
      }
      if (!node$jscomp$6.contents) {
        node$jscomp$6.contents = [];
      }
      if (node$jscomp$6.contents.length > newSize$jscomp$0) {
        node$jscomp$6.contents.length = newSize$jscomp$0;
      } else {
        for (; node$jscomp$6.contents.length < newSize$jscomp$0;) {
          node$jscomp$6.contents.push(0);
        }
      }
      node$jscomp$6.usedBytes = newSize$jscomp$0;
    },
    node_ops : {
      getattr : function(node$jscomp$7) {
        var attr$jscomp$0 = {};
        attr$jscomp$0.dev = FS$jscomp$0.isChrdev(node$jscomp$7.mode) ? node$jscomp$7.id : 1;
        attr$jscomp$0.ino = node$jscomp$7.id;
        attr$jscomp$0.mode = node$jscomp$7.mode;
        attr$jscomp$0.nlink = 1;
        attr$jscomp$0.uid = 0;
        attr$jscomp$0.gid = 0;
        attr$jscomp$0.rdev = node$jscomp$7.rdev;
        if (FS$jscomp$0.isDir(node$jscomp$7.mode)) {
          attr$jscomp$0.size = 4096;
        } else {
          if (FS$jscomp$0.isFile(node$jscomp$7.mode)) {
            attr$jscomp$0.size = node$jscomp$7.usedBytes;
          } else {
            if (FS$jscomp$0.isLink(node$jscomp$7.mode)) {
              attr$jscomp$0.size = node$jscomp$7.link.length;
            } else {
              attr$jscomp$0.size = 0;
            }
          }
        }
        attr$jscomp$0.atime = new Date(node$jscomp$7.timestamp);
        attr$jscomp$0.mtime = new Date(node$jscomp$7.timestamp);
        attr$jscomp$0.ctime = new Date(node$jscomp$7.timestamp);
        attr$jscomp$0.blksize = 4096;
        attr$jscomp$0.blocks = Math.ceil(attr$jscomp$0.size / attr$jscomp$0.blksize);
        return attr$jscomp$0;
      },
      setattr : function(node$jscomp$8, attr$jscomp$1) {
        if (attr$jscomp$1.mode !== undefined) {
          node$jscomp$8.mode = attr$jscomp$1.mode;
        }
        if (attr$jscomp$1.timestamp !== undefined) {
          node$jscomp$8.timestamp = attr$jscomp$1.timestamp;
        }
        if (attr$jscomp$1.size !== undefined) {
          MEMFS$jscomp$0.resizeFileStorage(node$jscomp$8, attr$jscomp$1.size);
        }
      },
      lookup : function(parent$jscomp$3, name$jscomp$77) {
        throw FS$jscomp$0.genericErrors[ERRNO_CODES$jscomp$0.ENOENT];
      },
      mknod : function(parent$jscomp$4, name$jscomp$78, mode$jscomp$20, dev$jscomp$2) {
        return MEMFS$jscomp$0.createNode(parent$jscomp$4, name$jscomp$78, mode$jscomp$20, dev$jscomp$2);
      },
      rename : function(old_node$jscomp$0, new_dir$jscomp$0, new_name$jscomp$0) {
        if (FS$jscomp$0.isDir(old_node$jscomp$0.mode)) {
          var new_node$jscomp$0;
          try {
            new_node$jscomp$0 = FS$jscomp$0.lookupNode(new_dir$jscomp$0, new_name$jscomp$0);
          } catch (e$jscomp$260) {
          }
          if (new_node$jscomp$0) {
            var i$jscomp$61;
            for (i$jscomp$61 in new_node$jscomp$0.contents) {
              throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTEMPTY);
            }
          }
        }
        delete old_node$jscomp$0.parent.contents[old_node$jscomp$0.name];
        old_node$jscomp$0.name = new_name$jscomp$0;
        new_dir$jscomp$0.contents[new_name$jscomp$0] = old_node$jscomp$0;
        old_node$jscomp$0.parent = new_dir$jscomp$0;
      },
      unlink : function(parent$jscomp$5, name$jscomp$79) {
        delete parent$jscomp$5.contents[name$jscomp$79];
      },
      rmdir : function(parent$jscomp$6, name$jscomp$80) {
        var node$jscomp$9 = FS$jscomp$0.lookupNode(parent$jscomp$6, name$jscomp$80);
        var i$jscomp$62;
        for (i$jscomp$62 in node$jscomp$9.contents) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTEMPTY);
        }
        delete parent$jscomp$6.contents[name$jscomp$80];
      },
      readdir : function(node$jscomp$10) {
        var entries$jscomp$0 = [".", ".."];
        var key$jscomp$42;
        for (key$jscomp$42 in node$jscomp$10.contents) {
          if (!node$jscomp$10.contents.hasOwnProperty(key$jscomp$42)) {
            continue;
          }
          entries$jscomp$0.push(key$jscomp$42);
        }
        return entries$jscomp$0;
      },
      symlink : function(parent$jscomp$7, newname$jscomp$0, oldpath$jscomp$0) {
        var node$jscomp$11 = MEMFS$jscomp$0.createNode(parent$jscomp$7, newname$jscomp$0, 511 | 40960, 0);
        node$jscomp$11.link = oldpath$jscomp$0;
        return node$jscomp$11;
      },
      readlink : function(node$jscomp$12) {
        if (!FS$jscomp$0.isLink(node$jscomp$12.mode)) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
        }
        return node$jscomp$12.link;
      }
    },
    stream_ops : {
      read : function(stream$jscomp$22, buffer$jscomp$32, offset$jscomp$25, length$jscomp$36, position$jscomp$0) {
        var contents$jscomp$1 = stream$jscomp$22.node.contents;
        if (position$jscomp$0 >= stream$jscomp$22.node.usedBytes) {
          return 0;
        }
        var size$jscomp$33 = Math.min(stream$jscomp$22.node.usedBytes - position$jscomp$0, length$jscomp$36);
        assert$jscomp$0(size$jscomp$33 >= 0);
        if (size$jscomp$33 > 8 && contents$jscomp$1.subarray) {
          buffer$jscomp$32.set(contents$jscomp$1.subarray(position$jscomp$0, position$jscomp$0 + size$jscomp$33), offset$jscomp$25);
        } else {
          var i$jscomp$63 = 0;
          for (; i$jscomp$63 < size$jscomp$33; i$jscomp$63++) {
            buffer$jscomp$32[offset$jscomp$25 + i$jscomp$63] = contents$jscomp$1[position$jscomp$0 + i$jscomp$63];
          }
        }
        return size$jscomp$33;
      },
      write : function(stream$jscomp$23, buffer$jscomp$33, offset$jscomp$26, length$jscomp$37, position$jscomp$1, canOwn$jscomp$0) {
        if (!length$jscomp$37) {
          return 0;
        }
        var node$jscomp$13 = stream$jscomp$23.node;
        node$jscomp$13.timestamp = Date.now();
        if (buffer$jscomp$33.subarray && (!node$jscomp$13.contents || node$jscomp$13.contents.subarray)) {
          if (canOwn$jscomp$0) {
            node$jscomp$13.contents = buffer$jscomp$33.subarray(offset$jscomp$26, offset$jscomp$26 + length$jscomp$37);
            node$jscomp$13.usedBytes = length$jscomp$37;
            return length$jscomp$37;
          } else {
            if (node$jscomp$13.usedBytes === 0 && position$jscomp$1 === 0) {
              node$jscomp$13.contents = new Uint8Array(buffer$jscomp$33.subarray(offset$jscomp$26, offset$jscomp$26 + length$jscomp$37));
              node$jscomp$13.usedBytes = length$jscomp$37;
              return length$jscomp$37;
            } else {
              if (position$jscomp$1 + length$jscomp$37 <= node$jscomp$13.usedBytes) {
                node$jscomp$13.contents.set(buffer$jscomp$33.subarray(offset$jscomp$26, offset$jscomp$26 + length$jscomp$37), position$jscomp$1);
                return length$jscomp$37;
              }
            }
          }
        }
        MEMFS$jscomp$0.expandFileStorage(node$jscomp$13, position$jscomp$1 + length$jscomp$37);
        if (node$jscomp$13.contents.subarray && buffer$jscomp$33.subarray) {
          node$jscomp$13.contents.set(buffer$jscomp$33.subarray(offset$jscomp$26, offset$jscomp$26 + length$jscomp$37), position$jscomp$1);
        } else {
          var i$jscomp$64 = 0;
          for (; i$jscomp$64 < length$jscomp$37; i$jscomp$64++) {
            node$jscomp$13.contents[position$jscomp$1 + i$jscomp$64] = buffer$jscomp$33[offset$jscomp$26 + i$jscomp$64];
          }
        }
        node$jscomp$13.usedBytes = Math.max(node$jscomp$13.usedBytes, position$jscomp$1 + length$jscomp$37);
        return length$jscomp$37;
      },
      llseek : function(stream$jscomp$24, offset$jscomp$27, whence$jscomp$1) {
        var position$jscomp$2 = offset$jscomp$27;
        if (whence$jscomp$1 === 1) {
          position$jscomp$2 = position$jscomp$2 + stream$jscomp$24.position;
        } else {
          if (whence$jscomp$1 === 2) {
            if (FS$jscomp$0.isFile(stream$jscomp$24.node.mode)) {
              position$jscomp$2 = position$jscomp$2 + stream$jscomp$24.node.usedBytes;
            }
          }
        }
        if (position$jscomp$2 < 0) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
        }
        return position$jscomp$2;
      },
      allocate : function(stream$jscomp$25, offset$jscomp$28, length$jscomp$38) {
        MEMFS$jscomp$0.expandFileStorage(stream$jscomp$25.node, offset$jscomp$28 + length$jscomp$38);
        stream$jscomp$25.node.usedBytes = Math.max(stream$jscomp$25.node.usedBytes, offset$jscomp$28 + length$jscomp$38);
      },
      mmap : function(stream$jscomp$26, buffer$jscomp$34, offset$jscomp$29, length$jscomp$39, position$jscomp$3, prot$jscomp$1, flags$jscomp$9) {
        if (!FS$jscomp$0.isFile(stream$jscomp$26.node.mode)) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENODEV);
        }
        var ptr$jscomp$29;
        var allocated$jscomp$1;
        var contents$jscomp$2 = stream$jscomp$26.node.contents;
        if (!(flags$jscomp$9 & 2) && (contents$jscomp$2.buffer === buffer$jscomp$34 || contents$jscomp$2.buffer === buffer$jscomp$34.buffer)) {
          allocated$jscomp$1 = false;
          ptr$jscomp$29 = contents$jscomp$2.byteOffset;
        } else {
          if (position$jscomp$3 > 0 || position$jscomp$3 + length$jscomp$39 < stream$jscomp$26.node.usedBytes) {
            if (contents$jscomp$2.subarray) {
              contents$jscomp$2 = contents$jscomp$2.subarray(position$jscomp$3, position$jscomp$3 + length$jscomp$39);
            } else {
              contents$jscomp$2 = Array.prototype.slice.call(contents$jscomp$2, position$jscomp$3, position$jscomp$3 + length$jscomp$39);
            }
          }
          allocated$jscomp$1 = true;
          var fromHeap$jscomp$0 = buffer$jscomp$34.buffer == HEAP8$jscomp$0.buffer;
          ptr$jscomp$29 = _malloc$jscomp$0(length$jscomp$39);
          if (!ptr$jscomp$29) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOMEM);
          }
          (fromHeap$jscomp$0 ? HEAP8$jscomp$0 : buffer$jscomp$34).set(contents$jscomp$2, ptr$jscomp$29);
        }
        return {
          ptr : ptr$jscomp$29,
          allocated : allocated$jscomp$1
        };
      },
      msync : function(stream$jscomp$27, buffer$jscomp$35, offset$jscomp$30, length$jscomp$40, mmapFlags$jscomp$0) {
        if (!FS$jscomp$0.isFile(stream$jscomp$27.node.mode)) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENODEV);
        }
        if (mmapFlags$jscomp$0 & 2) {
          return 0;
        }
        var bytesWritten$jscomp$1 = MEMFS$jscomp$0.stream_ops.write(stream$jscomp$27, buffer$jscomp$35, 0, length$jscomp$40, offset$jscomp$30, false);
        return 0;
      }
    }
  };
  var IDBFS$jscomp$0 = {
    dbs : {},
    indexedDB : function() {
      if (typeof indexedDB !== "undefined") {
        return indexedDB;
      }
      var ret$jscomp$23 = null;
      if (typeof window === "object") {
        ret$jscomp$23 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      }
      assert$jscomp$0(ret$jscomp$23, "IDBFS used, but indexedDB not supported");
      return ret$jscomp$23;
    },
    DB_VERSION : 21,
    DB_STORE_NAME : "FILE_DATA",
    mount : function(mount$jscomp$1) {
      return MEMFS$jscomp$0.mount.apply(null, arguments);
    },
    syncfs : function(mount$jscomp$2, populate$jscomp$0, callback$jscomp$47) {
      IDBFS$jscomp$0.getLocalSet(mount$jscomp$2, function(err$jscomp$9, local$jscomp$0) {
        if (err$jscomp$9) {
          return callback$jscomp$47(err$jscomp$9);
        }
        IDBFS$jscomp$0.getRemoteSet(mount$jscomp$2, function(err$jscomp$10, remote$jscomp$0) {
          if (err$jscomp$10) {
            return callback$jscomp$47(err$jscomp$10);
          }
          var src$jscomp$3 = populate$jscomp$0 ? remote$jscomp$0 : local$jscomp$0;
          var dst$jscomp$2 = populate$jscomp$0 ? local$jscomp$0 : remote$jscomp$0;
          IDBFS$jscomp$0.reconcile(src$jscomp$3, dst$jscomp$2, callback$jscomp$47);
        });
      });
    },
    getDB : function(name$jscomp$81, callback$jscomp$48) {
      var db$jscomp$1 = IDBFS$jscomp$0.dbs[name$jscomp$81];
      if (db$jscomp$1) {
        return callback$jscomp$48(null, db$jscomp$1);
      }
      var req$jscomp$0;
      try {
        req$jscomp$0 = IDBFS$jscomp$0.indexedDB().open(name$jscomp$81, IDBFS$jscomp$0.DB_VERSION);
      } catch (e$jscomp$261) {
        return callback$jscomp$48(e$jscomp$261);
      }
      if (!req$jscomp$0) {
        return callback$jscomp$48("Unable to connect to IndexedDB");
      }
      req$jscomp$0.onupgradeneeded = function(e$jscomp$262) {
        var db$jscomp$2 = e$jscomp$262.target.result;
        var transaction$jscomp$0 = e$jscomp$262.target.transaction;
        var fileStore$jscomp$0;
        if (db$jscomp$2.objectStoreNames.contains(IDBFS$jscomp$0.DB_STORE_NAME)) {
          fileStore$jscomp$0 = transaction$jscomp$0.objectStore(IDBFS$jscomp$0.DB_STORE_NAME);
        } else {
          fileStore$jscomp$0 = db$jscomp$2.createObjectStore(IDBFS$jscomp$0.DB_STORE_NAME);
        }
        if (!fileStore$jscomp$0.indexNames.contains("timestamp")) {
          fileStore$jscomp$0.createIndex("timestamp", "timestamp", {
            unique : false
          });
        }
      };
      req$jscomp$0.onsuccess = function() {
        db$jscomp$1 = req$jscomp$0.result;
        IDBFS$jscomp$0.dbs[name$jscomp$81] = db$jscomp$1;
        callback$jscomp$48(null, db$jscomp$1);
      };
      req$jscomp$0.onerror = function(e$jscomp$263) {
        callback$jscomp$48(this.error);
        e$jscomp$263.preventDefault();
      };
    },
    getLocalSet : function(mount$jscomp$3, callback$jscomp$49) {
      function isRealDir$jscomp$0(p$jscomp$7) {
        return p$jscomp$7 !== "." && p$jscomp$7 !== "..";
      }
      function toAbsolute$jscomp$0(root$jscomp$3) {
        return function(p$jscomp$8) {
          return PATH$jscomp$0.join2(root$jscomp$3, p$jscomp$8);
        };
      }
      var entries$jscomp$1 = {};
      var check$jscomp$1 = FS$jscomp$0.readdir(mount$jscomp$3.mountpoint).filter(isRealDir$jscomp$0).map(toAbsolute$jscomp$0(mount$jscomp$3.mountpoint));
      for (; check$jscomp$1.length;) {
        var path$jscomp$20 = check$jscomp$1.pop();
        var stat$jscomp$0;
        try {
          stat$jscomp$0 = FS$jscomp$0.stat(path$jscomp$20);
        } catch (e$jscomp$264) {
          return callback$jscomp$49(e$jscomp$264);
        }
        if (FS$jscomp$0.isDir(stat$jscomp$0.mode)) {
          check$jscomp$1.push.apply(check$jscomp$1, FS$jscomp$0.readdir(path$jscomp$20).filter(isRealDir$jscomp$0).map(toAbsolute$jscomp$0(path$jscomp$20)));
        }
        entries$jscomp$1[path$jscomp$20] = {
          timestamp : stat$jscomp$0.mtime
        };
      }
      return callback$jscomp$49(null, {
        type : "local",
        entries : entries$jscomp$1
      });
    },
    getRemoteSet : function(mount$jscomp$4, callback$jscomp$50) {
      var entries$jscomp$2 = {};
      IDBFS$jscomp$0.getDB(mount$jscomp$4.mountpoint, function(err$jscomp$11, db$jscomp$3) {
        if (err$jscomp$11) {
          return callback$jscomp$50(err$jscomp$11);
        }
        try {
          var transaction$jscomp$1 = db$jscomp$3.transaction([IDBFS$jscomp$0.DB_STORE_NAME], "readonly");
          transaction$jscomp$1.onerror = function(e$jscomp$265) {
            callback$jscomp$50(this.error);
            e$jscomp$265.preventDefault();
          };
          var store$jscomp$0 = transaction$jscomp$1.objectStore(IDBFS$jscomp$0.DB_STORE_NAME);
          var index$jscomp$278 = store$jscomp$0.index("timestamp");
          index$jscomp$278.openKeyCursor().onsuccess = function(event$jscomp$1) {
            var cursor$jscomp$0 = event$jscomp$1.target.result;
            if (!cursor$jscomp$0) {
              return callback$jscomp$50(null, {
                type : "remote",
                db : db$jscomp$3,
                entries : entries$jscomp$2
              });
            }
            entries$jscomp$2[cursor$jscomp$0.primaryKey] = {
              timestamp : cursor$jscomp$0.key
            };
            cursor$jscomp$0.continue();
          };
        } catch (e$jscomp$266) {
          return callback$jscomp$50(e$jscomp$266);
        }
      });
    },
    loadLocalEntry : function(path$jscomp$21, callback$jscomp$51) {
      var stat$jscomp$1;
      var node$jscomp$14;
      try {
        var lookup$jscomp$0 = FS$jscomp$0.lookupPath(path$jscomp$21);
        node$jscomp$14 = lookup$jscomp$0.node;
        stat$jscomp$1 = FS$jscomp$0.stat(path$jscomp$21);
      } catch (e$jscomp$267) {
        return callback$jscomp$51(e$jscomp$267);
      }
      if (FS$jscomp$0.isDir(stat$jscomp$1.mode)) {
        return callback$jscomp$51(null, {
          timestamp : stat$jscomp$1.mtime,
          mode : stat$jscomp$1.mode
        });
      } else {
        if (FS$jscomp$0.isFile(stat$jscomp$1.mode)) {
          node$jscomp$14.contents = MEMFS$jscomp$0.getFileDataAsTypedArray(node$jscomp$14);
          return callback$jscomp$51(null, {
            timestamp : stat$jscomp$1.mtime,
            mode : stat$jscomp$1.mode,
            contents : node$jscomp$14.contents
          });
        } else {
          return callback$jscomp$51(new Error("node type not supported"));
        }
      }
    },
    storeLocalEntry : function(path$jscomp$22, entry$jscomp$0, callback$jscomp$52) {
      try {
        if (FS$jscomp$0.isDir(entry$jscomp$0.mode)) {
          FS$jscomp$0.mkdir(path$jscomp$22, entry$jscomp$0.mode);
        } else {
          if (FS$jscomp$0.isFile(entry$jscomp$0.mode)) {
            FS$jscomp$0.writeFile(path$jscomp$22, entry$jscomp$0.contents, {
              canOwn : true
            });
          } else {
            return callback$jscomp$52(new Error("node type not supported"));
          }
        }
        FS$jscomp$0.chmod(path$jscomp$22, entry$jscomp$0.mode);
        FS$jscomp$0.utime(path$jscomp$22, entry$jscomp$0.timestamp, entry$jscomp$0.timestamp);
      } catch (e$jscomp$268) {
        return callback$jscomp$52(e$jscomp$268);
      }
      callback$jscomp$52(null);
    },
    removeLocalEntry : function(path$jscomp$23, callback$jscomp$53) {
      try {
        var lookup$jscomp$1 = FS$jscomp$0.lookupPath(path$jscomp$23);
        var stat$jscomp$2 = FS$jscomp$0.stat(path$jscomp$23);
        if (FS$jscomp$0.isDir(stat$jscomp$2.mode)) {
          FS$jscomp$0.rmdir(path$jscomp$23);
        } else {
          if (FS$jscomp$0.isFile(stat$jscomp$2.mode)) {
            FS$jscomp$0.unlink(path$jscomp$23);
          }
        }
      } catch (e$jscomp$269) {
        return callback$jscomp$53(e$jscomp$269);
      }
      callback$jscomp$53(null);
    },
    loadRemoteEntry : function(store$jscomp$1, path$jscomp$24, callback$jscomp$54) {
      var req$jscomp$1 = store$jscomp$1.get(path$jscomp$24);
      req$jscomp$1.onsuccess = function(event$jscomp$2) {
        callback$jscomp$54(null, event$jscomp$2.target.result);
      };
      req$jscomp$1.onerror = function(e$jscomp$270) {
        callback$jscomp$54(this.error);
        e$jscomp$270.preventDefault();
      };
    },
    storeRemoteEntry : function(store$jscomp$2, path$jscomp$25, entry$jscomp$1, callback$jscomp$55) {
      var req$jscomp$2 = store$jscomp$2.put(entry$jscomp$1, path$jscomp$25);
      req$jscomp$2.onsuccess = function() {
        callback$jscomp$55(null);
      };
      req$jscomp$2.onerror = function(e$jscomp$271) {
        callback$jscomp$55(this.error);
        e$jscomp$271.preventDefault();
      };
    },
    removeRemoteEntry : function(store$jscomp$3, path$jscomp$26, callback$jscomp$56) {
      var req$jscomp$3 = store$jscomp$3.delete(path$jscomp$26);
      req$jscomp$3.onsuccess = function() {
        callback$jscomp$56(null);
      };
      req$jscomp$3.onerror = function(e$jscomp$272) {
        callback$jscomp$56(this.error);
        e$jscomp$272.preventDefault();
      };
    },
    reconcile : function(src$jscomp$4, dst$jscomp$3, callback$jscomp$57) {
      function done$jscomp$0(err$jscomp$12) {
        if (err$jscomp$12) {
          if (!done$jscomp$0.errored) {
            done$jscomp$0.errored = true;
            return callback$jscomp$57(err$jscomp$12);
          }
          return;
        }
        if (++completed$jscomp$0 >= total$jscomp$1) {
          return callback$jscomp$57(null);
        }
      }
      var total$jscomp$1 = 0;
      var create$jscomp$0 = [];
      Object.keys(src$jscomp$4.entries).forEach(function(key$jscomp$43) {
        var e$jscomp$273 = src$jscomp$4.entries[key$jscomp$43];
        var e2$jscomp$0 = dst$jscomp$3.entries[key$jscomp$43];
        if (!e2$jscomp$0 || e$jscomp$273.timestamp > e2$jscomp$0.timestamp) {
          create$jscomp$0.push(key$jscomp$43);
          total$jscomp$1++;
        }
      });
      var remove$jscomp$0 = [];
      Object.keys(dst$jscomp$3.entries).forEach(function(key$jscomp$44) {
        var e$jscomp$274 = dst$jscomp$3.entries[key$jscomp$44];
        var e2$jscomp$1 = src$jscomp$4.entries[key$jscomp$44];
        if (!e2$jscomp$1) {
          remove$jscomp$0.push(key$jscomp$44);
          total$jscomp$1++;
        }
      });
      if (!total$jscomp$1) {
        return callback$jscomp$57(null);
      }
      var completed$jscomp$0 = 0;
      var db$jscomp$4 = src$jscomp$4.type === "remote" ? src$jscomp$4.db : dst$jscomp$3.db;
      var transaction$jscomp$2 = db$jscomp$4.transaction([IDBFS$jscomp$0.DB_STORE_NAME], "readwrite");
      var store$jscomp$4 = transaction$jscomp$2.objectStore(IDBFS$jscomp$0.DB_STORE_NAME);
      transaction$jscomp$2.onerror = function(e$jscomp$275) {
        done$jscomp$0(this.error);
        e$jscomp$275.preventDefault();
      };
      create$jscomp$0.sort().forEach(function(path$jscomp$27) {
        if (dst$jscomp$3.type === "local") {
          IDBFS$jscomp$0.loadRemoteEntry(store$jscomp$4, path$jscomp$27, function(err$jscomp$13, entry$jscomp$2) {
            if (err$jscomp$13) {
              return done$jscomp$0(err$jscomp$13);
            }
            IDBFS$jscomp$0.storeLocalEntry(path$jscomp$27, entry$jscomp$2, done$jscomp$0);
          });
        } else {
          IDBFS$jscomp$0.loadLocalEntry(path$jscomp$27, function(err$jscomp$14, entry$jscomp$3) {
            if (err$jscomp$14) {
              return done$jscomp$0(err$jscomp$14);
            }
            IDBFS$jscomp$0.storeRemoteEntry(store$jscomp$4, path$jscomp$27, entry$jscomp$3, done$jscomp$0);
          });
        }
      });
      remove$jscomp$0.sort().reverse().forEach(function(path$jscomp$28) {
        if (dst$jscomp$3.type === "local") {
          IDBFS$jscomp$0.removeLocalEntry(path$jscomp$28, done$jscomp$0);
        } else {
          IDBFS$jscomp$0.removeRemoteEntry(store$jscomp$4, path$jscomp$28, done$jscomp$0);
        }
      });
    }
  };
  var NODEFS$jscomp$0 = {
    isWindows : false,
    staticInit : function() {
      NODEFS$jscomp$0.isWindows = !!process.platform.match(/^win/);
      var flags$jscomp$10 = process["binding"]("constants");
      if (flags$jscomp$10["fs"]) {
        flags$jscomp$10 = flags$jscomp$10["fs"];
      }
      NODEFS$jscomp$0.flagsForNodeMap = {
        1024 : flags$jscomp$10["O_APPEND"],
        64 : flags$jscomp$10["O_CREAT"],
        128 : flags$jscomp$10["O_EXCL"],
        0 : flags$jscomp$10["O_RDONLY"],
        2 : flags$jscomp$10["O_RDWR"],
        4096 : flags$jscomp$10["O_SYNC"],
        512 : flags$jscomp$10["O_TRUNC"],
        1 : flags$jscomp$10["O_WRONLY"]
      };
    },
    bufferFrom : function(arrayBuffer$jscomp$0) {
      return Buffer.alloc ? Buffer.from(arrayBuffer$jscomp$0) : new Buffer(arrayBuffer$jscomp$0);
    },
    mount : function(mount$jscomp$5) {
      assert$jscomp$0(ENVIRONMENT_IS_NODE$jscomp$0);
      return NODEFS$jscomp$0.createNode(null, "/", NODEFS$jscomp$0.getMode(mount$jscomp$5.opts.root), 0);
    },
    createNode : function(parent$jscomp$8, name$jscomp$82, mode$jscomp$21, dev$jscomp$3) {
      if (!FS$jscomp$0.isDir(mode$jscomp$21) && !FS$jscomp$0.isFile(mode$jscomp$21) && !FS$jscomp$0.isLink(mode$jscomp$21)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var node$jscomp$15 = FS$jscomp$0.createNode(parent$jscomp$8, name$jscomp$82, mode$jscomp$21);
      node$jscomp$15.node_ops = NODEFS$jscomp$0.node_ops;
      node$jscomp$15.stream_ops = NODEFS$jscomp$0.stream_ops;
      return node$jscomp$15;
    },
    getMode : function(path$jscomp$29) {
      var stat$jscomp$3;
      try {
        stat$jscomp$3 = fs$jscomp$0.lstatSync(path$jscomp$29);
        if (NODEFS$jscomp$0.isWindows) {
          stat$jscomp$3.mode = stat$jscomp$3.mode | (stat$jscomp$3.mode & 292) >> 2;
        }
      } catch (e$jscomp$276) {
        if (!e$jscomp$276.code) {
          throw e$jscomp$276;
        }
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$276.code]);
      }
      return stat$jscomp$3.mode;
    },
    realPath : function(node$jscomp$16) {
      var parts$jscomp$3 = [];
      for (; node$jscomp$16.parent !== node$jscomp$16;) {
        parts$jscomp$3.push(node$jscomp$16.name);
        node$jscomp$16 = node$jscomp$16.parent;
      }
      parts$jscomp$3.push(node$jscomp$16.mount.opts.root);
      parts$jscomp$3.reverse();
      return PATH$jscomp$0.join.apply(null, parts$jscomp$3);
    },
    flagsForNode : function(flags$jscomp$11) {
      flags$jscomp$11 = flags$jscomp$11 & ~2097152;
      flags$jscomp$11 = flags$jscomp$11 & ~2048;
      flags$jscomp$11 = flags$jscomp$11 & ~32768;
      flags$jscomp$11 = flags$jscomp$11 & ~524288;
      var newFlags$jscomp$0 = 0;
      var k$jscomp$0;
      for (k$jscomp$0 in NODEFS$jscomp$0.flagsForNodeMap) {
        if (flags$jscomp$11 & k$jscomp$0) {
          newFlags$jscomp$0 = newFlags$jscomp$0 | NODEFS$jscomp$0.flagsForNodeMap[k$jscomp$0];
          flags$jscomp$11 = flags$jscomp$11 ^ k$jscomp$0;
        }
      }
      if (!flags$jscomp$11) {
        return newFlags$jscomp$0;
      } else {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
    },
    node_ops : {
      getattr : function(node$jscomp$17) {
        var path$jscomp$30 = NODEFS$jscomp$0.realPath(node$jscomp$17);
        var stat$jscomp$4;
        try {
          stat$jscomp$4 = fs$jscomp$0.lstatSync(path$jscomp$30);
        } catch (e$jscomp$277) {
          if (!e$jscomp$277.code) {
            throw e$jscomp$277;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$277.code]);
        }
        if (NODEFS$jscomp$0.isWindows && !stat$jscomp$4.blksize) {
          stat$jscomp$4.blksize = 4096;
        }
        if (NODEFS$jscomp$0.isWindows && !stat$jscomp$4.blocks) {
          stat$jscomp$4.blocks = (stat$jscomp$4.size + stat$jscomp$4.blksize - 1) / stat$jscomp$4.blksize | 0;
        }
        return {
          dev : stat$jscomp$4.dev,
          ino : stat$jscomp$4.ino,
          mode : stat$jscomp$4.mode,
          nlink : stat$jscomp$4.nlink,
          uid : stat$jscomp$4.uid,
          gid : stat$jscomp$4.gid,
          rdev : stat$jscomp$4.rdev,
          size : stat$jscomp$4.size,
          atime : stat$jscomp$4.atime,
          mtime : stat$jscomp$4.mtime,
          ctime : stat$jscomp$4.ctime,
          blksize : stat$jscomp$4.blksize,
          blocks : stat$jscomp$4.blocks
        };
      },
      setattr : function(node$jscomp$18, attr$jscomp$2) {
        var path$jscomp$31 = NODEFS$jscomp$0.realPath(node$jscomp$18);
        try {
          if (attr$jscomp$2.mode !== undefined) {
            fs$jscomp$0.chmodSync(path$jscomp$31, attr$jscomp$2.mode);
            node$jscomp$18.mode = attr$jscomp$2.mode;
          }
          if (attr$jscomp$2.timestamp !== undefined) {
            var date$jscomp$34 = new Date(attr$jscomp$2.timestamp);
            fs$jscomp$0.utimesSync(path$jscomp$31, date$jscomp$34, date$jscomp$34);
          }
          if (attr$jscomp$2.size !== undefined) {
            fs$jscomp$0.truncateSync(path$jscomp$31, attr$jscomp$2.size);
          }
        } catch (e$jscomp$278) {
          if (!e$jscomp$278.code) {
            throw e$jscomp$278;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$278.code]);
        }
      },
      lookup : function(parent$jscomp$9, name$jscomp$83) {
        var path$jscomp$32 = PATH$jscomp$0.join2(NODEFS$jscomp$0.realPath(parent$jscomp$9), name$jscomp$83);
        var mode$jscomp$22 = NODEFS$jscomp$0.getMode(path$jscomp$32);
        return NODEFS$jscomp$0.createNode(parent$jscomp$9, name$jscomp$83, mode$jscomp$22);
      },
      mknod : function(parent$jscomp$10, name$jscomp$84, mode$jscomp$23, dev$jscomp$4) {
        var node$jscomp$19 = NODEFS$jscomp$0.createNode(parent$jscomp$10, name$jscomp$84, mode$jscomp$23, dev$jscomp$4);
        var path$jscomp$33 = NODEFS$jscomp$0.realPath(node$jscomp$19);
        try {
          if (FS$jscomp$0.isDir(node$jscomp$19.mode)) {
            fs$jscomp$0.mkdirSync(path$jscomp$33, node$jscomp$19.mode);
          } else {
            fs$jscomp$0.writeFileSync(path$jscomp$33, "", {
              mode : node$jscomp$19.mode
            });
          }
        } catch (e$jscomp$279) {
          if (!e$jscomp$279.code) {
            throw e$jscomp$279;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$279.code]);
        }
        return node$jscomp$19;
      },
      rename : function(oldNode$jscomp$0, newDir$jscomp$0, newName$jscomp$2) {
        var oldPath$jscomp$0 = NODEFS$jscomp$0.realPath(oldNode$jscomp$0);
        var newPath$jscomp$0 = PATH$jscomp$0.join2(NODEFS$jscomp$0.realPath(newDir$jscomp$0), newName$jscomp$2);
        try {
          fs$jscomp$0.renameSync(oldPath$jscomp$0, newPath$jscomp$0);
        } catch (e$jscomp$280) {
          if (!e$jscomp$280.code) {
            throw e$jscomp$280;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$280.code]);
        }
      },
      unlink : function(parent$jscomp$11, name$jscomp$85) {
        var path$jscomp$34 = PATH$jscomp$0.join2(NODEFS$jscomp$0.realPath(parent$jscomp$11), name$jscomp$85);
        try {
          fs$jscomp$0.unlinkSync(path$jscomp$34);
        } catch (e$jscomp$281) {
          if (!e$jscomp$281.code) {
            throw e$jscomp$281;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$281.code]);
        }
      },
      rmdir : function(parent$jscomp$12, name$jscomp$86) {
        var path$jscomp$35 = PATH$jscomp$0.join2(NODEFS$jscomp$0.realPath(parent$jscomp$12), name$jscomp$86);
        try {
          fs$jscomp$0.rmdirSync(path$jscomp$35);
        } catch (e$jscomp$282) {
          if (!e$jscomp$282.code) {
            throw e$jscomp$282;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$282.code]);
        }
      },
      readdir : function(node$jscomp$20) {
        var path$jscomp$36 = NODEFS$jscomp$0.realPath(node$jscomp$20);
        try {
          return fs$jscomp$0.readdirSync(path$jscomp$36);
        } catch (e$jscomp$283) {
          if (!e$jscomp$283.code) {
            throw e$jscomp$283;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$283.code]);
        }
      },
      symlink : function(parent$jscomp$13, newName$jscomp$3, oldPath$jscomp$1) {
        var newPath$jscomp$1 = PATH$jscomp$0.join2(NODEFS$jscomp$0.realPath(parent$jscomp$13), newName$jscomp$3);
        try {
          fs$jscomp$0.symlinkSync(oldPath$jscomp$1, newPath$jscomp$1);
        } catch (e$jscomp$284) {
          if (!e$jscomp$284.code) {
            throw e$jscomp$284;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$284.code]);
        }
      },
      readlink : function(node$jscomp$21) {
        var path$jscomp$37 = NODEFS$jscomp$0.realPath(node$jscomp$21);
        try {
          path$jscomp$37 = fs$jscomp$0.readlinkSync(path$jscomp$37);
          path$jscomp$37 = NODEJS_PATH$jscomp$0.relative(NODEJS_PATH$jscomp$0.resolve(node$jscomp$21.mount.opts.root), path$jscomp$37);
          return path$jscomp$37;
        } catch (e$jscomp$285) {
          if (!e$jscomp$285.code) {
            throw e$jscomp$285;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$285.code]);
        }
      }
    },
    stream_ops : {
      open : function(stream$jscomp$28) {
        var path$jscomp$38 = NODEFS$jscomp$0.realPath(stream$jscomp$28.node);
        try {
          if (FS$jscomp$0.isFile(stream$jscomp$28.node.mode)) {
            stream$jscomp$28.nfd = fs$jscomp$0.openSync(path$jscomp$38, NODEFS$jscomp$0.flagsForNode(stream$jscomp$28.flags));
          }
        } catch (e$jscomp$286) {
          if (!e$jscomp$286.code) {
            throw e$jscomp$286;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$286.code]);
        }
      },
      close : function(stream$jscomp$29) {
        try {
          if (FS$jscomp$0.isFile(stream$jscomp$29.node.mode) && stream$jscomp$29.nfd) {
            fs$jscomp$0.closeSync(stream$jscomp$29.nfd);
          }
        } catch (e$jscomp$287) {
          if (!e$jscomp$287.code) {
            throw e$jscomp$287;
          }
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$287.code]);
        }
      },
      read : function(stream$jscomp$30, buffer$jscomp$36, offset$jscomp$31, length$jscomp$41, position$jscomp$4) {
        if (length$jscomp$41 === 0) {
          return 0;
        }
        try {
          return fs$jscomp$0.readSync(stream$jscomp$30.nfd, NODEFS$jscomp$0.bufferFrom(buffer$jscomp$36.buffer), offset$jscomp$31, length$jscomp$41, position$jscomp$4);
        } catch (e$jscomp$288) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$288.code]);
        }
      },
      write : function(stream$jscomp$31, buffer$jscomp$37, offset$jscomp$32, length$jscomp$42, position$jscomp$5) {
        try {
          return fs$jscomp$0.writeSync(stream$jscomp$31.nfd, NODEFS$jscomp$0.bufferFrom(buffer$jscomp$37.buffer), offset$jscomp$32, length$jscomp$42, position$jscomp$5);
        } catch (e$jscomp$289) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$289.code]);
        }
      },
      llseek : function(stream$jscomp$32, offset$jscomp$33, whence$jscomp$2) {
        var position$jscomp$6 = offset$jscomp$33;
        if (whence$jscomp$2 === 1) {
          position$jscomp$6 = position$jscomp$6 + stream$jscomp$32.position;
        } else {
          if (whence$jscomp$2 === 2) {
            if (FS$jscomp$0.isFile(stream$jscomp$32.node.mode)) {
              try {
                var stat$jscomp$5 = fs$jscomp$0.fstatSync(stream$jscomp$32.nfd);
                position$jscomp$6 = position$jscomp$6 + stat$jscomp$5.size;
              } catch (e$jscomp$290) {
                throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0[e$jscomp$290.code]);
              }
            }
          }
        }
        if (position$jscomp$6 < 0) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
        }
        return position$jscomp$6;
      }
    }
  };
  var WORKERFS$jscomp$0 = {
    DIR_MODE : 16895,
    FILE_MODE : 33279,
    reader : null,
    mount : function(mount$jscomp$6) {
      function ensureParent$jscomp$0(path$jscomp$39) {
        var parts$jscomp$4 = path$jscomp$39.split("/");
        var parent$jscomp$14 = root$jscomp$4;
        var i$jscomp$65 = 0;
        for (; i$jscomp$65 < parts$jscomp$4.length - 1; i$jscomp$65++) {
          var curr$jscomp$3 = parts$jscomp$4.slice(0, i$jscomp$65 + 1).join("/");
          if (!createdParents$jscomp$0[curr$jscomp$3]) {
            createdParents$jscomp$0[curr$jscomp$3] = WORKERFS$jscomp$0.createNode(parent$jscomp$14, parts$jscomp$4[i$jscomp$65], WORKERFS$jscomp$0.DIR_MODE, 0);
          }
          parent$jscomp$14 = createdParents$jscomp$0[curr$jscomp$3];
        }
        return parent$jscomp$14;
      }
      function base$jscomp$3(path$jscomp$40) {
        var parts$jscomp$5 = path$jscomp$40.split("/");
        return parts$jscomp$5[parts$jscomp$5.length - 1];
      }
      assert$jscomp$0(ENVIRONMENT_IS_WORKER$jscomp$0);
      if (!WORKERFS$jscomp$0.reader) {
        WORKERFS$jscomp$0.reader = new FileReaderSync;
      }
      var root$jscomp$4 = WORKERFS$jscomp$0.createNode(null, "/", WORKERFS$jscomp$0.DIR_MODE, 0);
      var createdParents$jscomp$0 = {};
      Array.prototype.forEach.call(mount$jscomp$6.opts["files"] || [], function(file$jscomp$1) {
        WORKERFS$jscomp$0.createNode(ensureParent$jscomp$0(file$jscomp$1.name), base$jscomp$3(file$jscomp$1.name), WORKERFS$jscomp$0.FILE_MODE, 0, file$jscomp$1, file$jscomp$1.lastModifiedDate);
      });
      (mount$jscomp$6.opts["blobs"] || []).forEach(function(obj$jscomp$25) {
        WORKERFS$jscomp$0.createNode(ensureParent$jscomp$0(obj$jscomp$25["name"]), base$jscomp$3(obj$jscomp$25["name"]), WORKERFS$jscomp$0.FILE_MODE, 0, obj$jscomp$25["data"]);
      });
      (mount$jscomp$6.opts["packages"] || []).forEach(function(pack$jscomp$0) {
        pack$jscomp$0["metadata"].files.forEach(function(file$jscomp$2) {
          var name$jscomp$87 = file$jscomp$2.filename.substr(1);
          WORKERFS$jscomp$0.createNode(ensureParent$jscomp$0(name$jscomp$87), base$jscomp$3(name$jscomp$87), WORKERFS$jscomp$0.FILE_MODE, 0, pack$jscomp$0["blob"].slice(file$jscomp$2.start, file$jscomp$2.end));
        });
      });
      return root$jscomp$4;
    },
    createNode : function(parent$jscomp$15, name$jscomp$88, mode$jscomp$24, dev$jscomp$5, contents$jscomp$3, mtime$jscomp$0) {
      var node$jscomp$22 = FS$jscomp$0.createNode(parent$jscomp$15, name$jscomp$88, mode$jscomp$24);
      node$jscomp$22.mode = mode$jscomp$24;
      node$jscomp$22.node_ops = WORKERFS$jscomp$0.node_ops;
      node$jscomp$22.stream_ops = WORKERFS$jscomp$0.stream_ops;
      node$jscomp$22.timestamp = (mtime$jscomp$0 || new Date).getTime();
      assert$jscomp$0(WORKERFS$jscomp$0.FILE_MODE !== WORKERFS$jscomp$0.DIR_MODE);
      if (mode$jscomp$24 === WORKERFS$jscomp$0.FILE_MODE) {
        node$jscomp$22.size = contents$jscomp$3.size;
        node$jscomp$22.contents = contents$jscomp$3;
      } else {
        node$jscomp$22.size = 4096;
        node$jscomp$22.contents = {};
      }
      if (parent$jscomp$15) {
        parent$jscomp$15.contents[name$jscomp$88] = node$jscomp$22;
      }
      return node$jscomp$22;
    },
    node_ops : {
      getattr : function(node$jscomp$23) {
        return {
          dev : 1,
          ino : undefined,
          mode : node$jscomp$23.mode,
          nlink : 1,
          uid : 0,
          gid : 0,
          rdev : undefined,
          size : node$jscomp$23.size,
          atime : new Date(node$jscomp$23.timestamp),
          mtime : new Date(node$jscomp$23.timestamp),
          ctime : new Date(node$jscomp$23.timestamp),
          blksize : 4096,
          blocks : Math.ceil(node$jscomp$23.size / 4096)
        };
      },
      setattr : function(node$jscomp$24, attr$jscomp$3) {
        if (attr$jscomp$3.mode !== undefined) {
          node$jscomp$24.mode = attr$jscomp$3.mode;
        }
        if (attr$jscomp$3.timestamp !== undefined) {
          node$jscomp$24.timestamp = attr$jscomp$3.timestamp;
        }
      },
      lookup : function(parent$jscomp$16, name$jscomp$89) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      },
      mknod : function(parent$jscomp$17, name$jscomp$90, mode$jscomp$25, dev$jscomp$6) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      },
      rename : function(oldNode$jscomp$1, newDir$jscomp$1, newName$jscomp$4) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      },
      unlink : function(parent$jscomp$18, name$jscomp$91) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      },
      rmdir : function(parent$jscomp$19, name$jscomp$92) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      },
      readdir : function(node$jscomp$25) {
        var entries$jscomp$3 = [".", ".."];
        var key$jscomp$45;
        for (key$jscomp$45 in node$jscomp$25.contents) {
          if (!node$jscomp$25.contents.hasOwnProperty(key$jscomp$45)) {
            continue;
          }
          entries$jscomp$3.push(key$jscomp$45);
        }
        return entries$jscomp$3;
      },
      symlink : function(parent$jscomp$20, newName$jscomp$5, oldPath$jscomp$2) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      },
      readlink : function(node$jscomp$26) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
    },
    stream_ops : {
      read : function(stream$jscomp$33, buffer$jscomp$38, offset$jscomp$34, length$jscomp$43, position$jscomp$7) {
        if (position$jscomp$7 >= stream$jscomp$33.node.size) {
          return 0;
        }
        var chunk$jscomp$5 = stream$jscomp$33.node.contents.slice(position$jscomp$7, position$jscomp$7 + length$jscomp$43);
        var ab$jscomp$0 = WORKERFS$jscomp$0.reader.readAsArrayBuffer(chunk$jscomp$5);
        buffer$jscomp$38.set(new Uint8Array(ab$jscomp$0), offset$jscomp$34);
        return chunk$jscomp$5.size;
      },
      write : function(stream$jscomp$34, buffer$jscomp$39, offset$jscomp$35, length$jscomp$44, position$jscomp$8) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
      },
      llseek : function(stream$jscomp$35, offset$jscomp$36, whence$jscomp$3) {
        var position$jscomp$9 = offset$jscomp$36;
        if (whence$jscomp$3 === 1) {
          position$jscomp$9 = position$jscomp$9 + stream$jscomp$35.position;
        } else {
          if (whence$jscomp$3 === 2) {
            if (FS$jscomp$0.isFile(stream$jscomp$35.node.mode)) {
              position$jscomp$9 = position$jscomp$9 + stream$jscomp$35.node.size;
            }
          }
        }
        if (position$jscomp$9 < 0) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
        }
        return position$jscomp$9;
      }
    }
  };
  STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + 16;
  STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + 16;
  STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + 16;
  var FS$jscomp$0 = {
    root : null,
    mounts : [],
    devices : {},
    streams : [],
    nextInode : 1,
    nameTable : null,
    currentPath : "/",
    initialized : false,
    ignorePermissions : true,
    trackingDelegate : {},
    tracking : {
      openFlags : {
        READ : 1,
        WRITE : 2
      }
    },
    ErrnoError : null,
    genericErrors : {},
    filesystems : null,
    syncFSRequests : 0,
    handleFSError : function(e$jscomp$291) {
      if (!(e$jscomp$291 instanceof FS$jscomp$0.ErrnoError)) {
        throw e$jscomp$291 + " : " + stackTrace$jscomp$0();
      }
      return ___setErrNo$jscomp$0(e$jscomp$291.errno);
    },
    lookupPath : function(path$jscomp$41, opts$jscomp$2) {
      path$jscomp$41 = PATH$jscomp$0.resolve(FS$jscomp$0.cwd(), path$jscomp$41);
      opts$jscomp$2 = opts$jscomp$2 || {};
      if (!path$jscomp$41) {
        return {
          path : "",
          node : null
        };
      }
      var defaults$jscomp$0 = {
        follow_mount : true,
        recurse_count : 0
      };
      var key$jscomp$46;
      for (key$jscomp$46 in defaults$jscomp$0) {
        if (opts$jscomp$2[key$jscomp$46] === undefined) {
          opts$jscomp$2[key$jscomp$46] = defaults$jscomp$0[key$jscomp$46];
        }
      }
      if (opts$jscomp$2.recurse_count > 8) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ELOOP);
      }
      var parts$jscomp$6 = PATH$jscomp$0.normalizeArray(path$jscomp$41.split("/").filter(function(p$jscomp$9) {
        return !!p$jscomp$9;
      }), false);
      var current$jscomp$0 = FS$jscomp$0.root;
      var current_path$jscomp$0 = "/";
      var i$jscomp$66 = 0;
      for (; i$jscomp$66 < parts$jscomp$6.length; i$jscomp$66++) {
        var islast$jscomp$0 = i$jscomp$66 === parts$jscomp$6.length - 1;
        if (islast$jscomp$0 && opts$jscomp$2.parent) {
          break;
        }
        current$jscomp$0 = FS$jscomp$0.lookupNode(current$jscomp$0, parts$jscomp$6[i$jscomp$66]);
        current_path$jscomp$0 = PATH$jscomp$0.join2(current_path$jscomp$0, parts$jscomp$6[i$jscomp$66]);
        if (FS$jscomp$0.isMountpoint(current$jscomp$0)) {
          if (!islast$jscomp$0 || islast$jscomp$0 && opts$jscomp$2.follow_mount) {
            current$jscomp$0 = current$jscomp$0.mounted.root;
          }
        }
        if (!islast$jscomp$0 || opts$jscomp$2.follow) {
          var count$jscomp$37 = 0;
          for (; FS$jscomp$0.isLink(current$jscomp$0.mode);) {
            var link$jscomp$0 = FS$jscomp$0.readlink(current_path$jscomp$0);
            current_path$jscomp$0 = PATH$jscomp$0.resolve(PATH$jscomp$0.dirname(current_path$jscomp$0), link$jscomp$0);
            var lookup$jscomp$2 = FS$jscomp$0.lookupPath(current_path$jscomp$0, {
              recurse_count : opts$jscomp$2.recurse_count
            });
            current$jscomp$0 = lookup$jscomp$2.node;
            if (count$jscomp$37++ > 40) {
              throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ELOOP);
            }
          }
        }
      }
      return {
        path : current_path$jscomp$0,
        node : current$jscomp$0
      };
    },
    getPath : function(node$jscomp$27) {
      var path$jscomp$42;
      for (; true;) {
        if (FS$jscomp$0.isRoot(node$jscomp$27)) {
          var mount$jscomp$7 = node$jscomp$27.mount.mountpoint;
          if (!path$jscomp$42) {
            return mount$jscomp$7;
          }
          return mount$jscomp$7[mount$jscomp$7.length - 1] !== "/" ? mount$jscomp$7 + "/" + path$jscomp$42 : mount$jscomp$7 + path$jscomp$42;
        }
        path$jscomp$42 = path$jscomp$42 ? node$jscomp$27.name + "/" + path$jscomp$42 : node$jscomp$27.name;
        node$jscomp$27 = node$jscomp$27.parent;
      }
    },
    hashName : function(parentid$jscomp$0, name$jscomp$93) {
      var hash$jscomp$0 = 0;
      var i$jscomp$67 = 0;
      for (; i$jscomp$67 < name$jscomp$93.length; i$jscomp$67++) {
        hash$jscomp$0 = (hash$jscomp$0 << 5) - hash$jscomp$0 + name$jscomp$93.charCodeAt(i$jscomp$67) | 0;
      }
      return (parentid$jscomp$0 + hash$jscomp$0 >>> 0) % FS$jscomp$0.nameTable.length;
    },
    hashAddNode : function(node$jscomp$28) {
      var hash$jscomp$1 = FS$jscomp$0.hashName(node$jscomp$28.parent.id, node$jscomp$28.name);
      node$jscomp$28.name_next = FS$jscomp$0.nameTable[hash$jscomp$1];
      FS$jscomp$0.nameTable[hash$jscomp$1] = node$jscomp$28;
    },
    hashRemoveNode : function(node$jscomp$29) {
      var hash$jscomp$2 = FS$jscomp$0.hashName(node$jscomp$29.parent.id, node$jscomp$29.name);
      if (FS$jscomp$0.nameTable[hash$jscomp$2] === node$jscomp$29) {
        FS$jscomp$0.nameTable[hash$jscomp$2] = node$jscomp$29.name_next;
      } else {
        var current$jscomp$1 = FS$jscomp$0.nameTable[hash$jscomp$2];
        for (; current$jscomp$1;) {
          if (current$jscomp$1.name_next === node$jscomp$29) {
            current$jscomp$1.name_next = node$jscomp$29.name_next;
            break;
          }
          current$jscomp$1 = current$jscomp$1.name_next;
        }
      }
    },
    lookupNode : function(parent$jscomp$21, name$jscomp$94) {
      var err$jscomp$15 = FS$jscomp$0.mayLookup(parent$jscomp$21);
      if (err$jscomp$15) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$15, parent$jscomp$21);
      }
      var hash$jscomp$3 = FS$jscomp$0.hashName(parent$jscomp$21.id, name$jscomp$94);
      var node$jscomp$30 = FS$jscomp$0.nameTable[hash$jscomp$3];
      for (; node$jscomp$30; node$jscomp$30 = node$jscomp$30.name_next) {
        var nodeName$jscomp$0 = node$jscomp$30.name;
        if (node$jscomp$30.parent.id === parent$jscomp$21.id && nodeName$jscomp$0 === name$jscomp$94) {
          return node$jscomp$30;
        }
      }
      return FS$jscomp$0.lookup(parent$jscomp$21, name$jscomp$94);
    },
    createNode : function(parent$jscomp$22, name$jscomp$95, mode$jscomp$26, rdev$jscomp$0) {
      if (!FS$jscomp$0.FSNode) {
        FS$jscomp$0.FSNode = function(parent$jscomp$23, name$jscomp$96, mode$jscomp$27, rdev$jscomp$1) {
          if (!parent$jscomp$23) {
            parent$jscomp$23 = this;
          }
          this.parent = parent$jscomp$23;
          this.mount = parent$jscomp$23.mount;
          this.mounted = null;
          this.id = FS$jscomp$0.nextInode++;
          this.name = name$jscomp$96;
          this.mode = mode$jscomp$27;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev$jscomp$1;
        };
        FS$jscomp$0.FSNode.prototype = {};
        var readMode$jscomp$0 = 292 | 73;
        var writeMode$jscomp$0 = 146;
        Object.defineProperties(FS$jscomp$0.FSNode.prototype, {
          read : {
            get : function() {
              return (this.mode & readMode$jscomp$0) === readMode$jscomp$0;
            },
            set : function(val$jscomp$4) {
              if (val$jscomp$4) {
                this.mode |= readMode$jscomp$0;
              } else {
                this.mode &= ~readMode$jscomp$0;
              }
            }
          },
          write : {
            get : function() {
              return (this.mode & writeMode$jscomp$0) === writeMode$jscomp$0;
            },
            set : function(val$jscomp$5) {
              if (val$jscomp$5) {
                this.mode |= writeMode$jscomp$0;
              } else {
                this.mode &= ~writeMode$jscomp$0;
              }
            }
          },
          isFolder : {
            get : function() {
              return FS$jscomp$0.isDir(this.mode);
            }
          },
          isDevice : {
            get : function() {
              return FS$jscomp$0.isChrdev(this.mode);
            }
          }
        });
      }
      var node$jscomp$31 = new FS$jscomp$0.FSNode(parent$jscomp$22, name$jscomp$95, mode$jscomp$26, rdev$jscomp$0);
      FS$jscomp$0.hashAddNode(node$jscomp$31);
      return node$jscomp$31;
    },
    destroyNode : function(node$jscomp$32) {
      FS$jscomp$0.hashRemoveNode(node$jscomp$32);
    },
    isRoot : function(node$jscomp$33) {
      return node$jscomp$33 === node$jscomp$33.parent;
    },
    isMountpoint : function(node$jscomp$34) {
      return !!node$jscomp$34.mounted;
    },
    isFile : function(mode$jscomp$28) {
      return (mode$jscomp$28 & 61440) === 32768;
    },
    isDir : function(mode$jscomp$29) {
      return (mode$jscomp$29 & 61440) === 16384;
    },
    isLink : function(mode$jscomp$30) {
      return (mode$jscomp$30 & 61440) === 40960;
    },
    isChrdev : function(mode$jscomp$31) {
      return (mode$jscomp$31 & 61440) === 8192;
    },
    isBlkdev : function(mode$jscomp$32) {
      return (mode$jscomp$32 & 61440) === 24576;
    },
    isFIFO : function(mode$jscomp$33) {
      return (mode$jscomp$33 & 61440) === 4096;
    },
    isSocket : function(mode$jscomp$34) {
      return (mode$jscomp$34 & 49152) === 49152;
    },
    flagModes : {
      "r" : 0,
      "rs" : 1052672,
      "r+" : 2,
      "w" : 577,
      "wx" : 705,
      "xw" : 705,
      "w+" : 578,
      "wx+" : 706,
      "xw+" : 706,
      "a" : 1089,
      "ax" : 1217,
      "xa" : 1217,
      "a+" : 1090,
      "ax+" : 1218,
      "xa+" : 1218
    },
    modeStringToFlags : function(str$jscomp$19) {
      var flags$jscomp$12 = FS$jscomp$0.flagModes[str$jscomp$19];
      if (typeof flags$jscomp$12 === "undefined") {
        throw new Error("Unknown file open mode: " + str$jscomp$19);
      }
      return flags$jscomp$12;
    },
    flagsToPermissionString : function(flag$jscomp$3) {
      var perms$jscomp$0 = ["r", "w", "rw"][flag$jscomp$3 & 3];
      if (flag$jscomp$3 & 512) {
        perms$jscomp$0 = perms$jscomp$0 + "w";
      }
      return perms$jscomp$0;
    },
    nodePermissions : function(node$jscomp$35, perms$jscomp$1) {
      if (FS$jscomp$0.ignorePermissions) {
        return 0;
      }
      if (perms$jscomp$1.indexOf("r") !== -1 && !(node$jscomp$35.mode & 292)) {
        return ERRNO_CODES$jscomp$0.EACCES;
      } else {
        if (perms$jscomp$1.indexOf("w") !== -1 && !(node$jscomp$35.mode & 146)) {
          return ERRNO_CODES$jscomp$0.EACCES;
        } else {
          if (perms$jscomp$1.indexOf("x") !== -1 && !(node$jscomp$35.mode & 73)) {
            return ERRNO_CODES$jscomp$0.EACCES;
          }
        }
      }
      return 0;
    },
    mayLookup : function(dir$jscomp$1) {
      var err$jscomp$16 = FS$jscomp$0.nodePermissions(dir$jscomp$1, "x");
      if (err$jscomp$16) {
        return err$jscomp$16;
      }
      if (!dir$jscomp$1.node_ops.lookup) {
        return ERRNO_CODES$jscomp$0.EACCES;
      }
      return 0;
    },
    mayCreate : function(dir$jscomp$2, name$jscomp$97) {
      try {
        var node$jscomp$36 = FS$jscomp$0.lookupNode(dir$jscomp$2, name$jscomp$97);
        return ERRNO_CODES$jscomp$0.EEXIST;
      } catch (e$jscomp$292) {
      }
      return FS$jscomp$0.nodePermissions(dir$jscomp$2, "wx");
    },
    mayDelete : function(dir$jscomp$3, name$jscomp$98, isdir$jscomp$0) {
      var node$jscomp$37;
      try {
        node$jscomp$37 = FS$jscomp$0.lookupNode(dir$jscomp$3, name$jscomp$98);
      } catch (e$jscomp$293) {
        return e$jscomp$293.errno;
      }
      var err$jscomp$17 = FS$jscomp$0.nodePermissions(dir$jscomp$3, "wx");
      if (err$jscomp$17) {
        return err$jscomp$17;
      }
      if (isdir$jscomp$0) {
        if (!FS$jscomp$0.isDir(node$jscomp$37.mode)) {
          return ERRNO_CODES$jscomp$0.ENOTDIR;
        }
        if (FS$jscomp$0.isRoot(node$jscomp$37) || FS$jscomp$0.getPath(node$jscomp$37) === FS$jscomp$0.cwd()) {
          return ERRNO_CODES$jscomp$0.EBUSY;
        }
      } else {
        if (FS$jscomp$0.isDir(node$jscomp$37.mode)) {
          return ERRNO_CODES$jscomp$0.EISDIR;
        }
      }
      return 0;
    },
    mayOpen : function(node$jscomp$38, flags$jscomp$13) {
      if (!node$jscomp$38) {
        return ERRNO_CODES$jscomp$0.ENOENT;
      }
      if (FS$jscomp$0.isLink(node$jscomp$38.mode)) {
        return ERRNO_CODES$jscomp$0.ELOOP;
      } else {
        if (FS$jscomp$0.isDir(node$jscomp$38.mode)) {
          if (FS$jscomp$0.flagsToPermissionString(flags$jscomp$13) !== "r" || flags$jscomp$13 & 512) {
            return ERRNO_CODES$jscomp$0.EISDIR;
          }
        }
      }
      return FS$jscomp$0.nodePermissions(node$jscomp$38, FS$jscomp$0.flagsToPermissionString(flags$jscomp$13));
    },
    MAX_OPEN_FDS : 4096,
    nextfd : function(fd_start$jscomp$0, fd_end$jscomp$0) {
      fd_start$jscomp$0 = fd_start$jscomp$0 || 0;
      fd_end$jscomp$0 = fd_end$jscomp$0 || FS$jscomp$0.MAX_OPEN_FDS;
      var fd$jscomp$5 = fd_start$jscomp$0;
      for (; fd$jscomp$5 <= fd_end$jscomp$0; fd$jscomp$5++) {
        if (!FS$jscomp$0.streams[fd$jscomp$5]) {
          return fd$jscomp$5;
        }
      }
      throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EMFILE);
    },
    getStream : function(fd$jscomp$6) {
      return FS$jscomp$0.streams[fd$jscomp$6];
    },
    createStream : function(stream$jscomp$36, fd_start$jscomp$1, fd_end$jscomp$1) {
      if (!FS$jscomp$0.FSStream) {
        FS$jscomp$0.FSStream = function() {
        };
        FS$jscomp$0.FSStream.prototype = {};
        Object.defineProperties(FS$jscomp$0.FSStream.prototype, {
          object : {
            get : function() {
              return this.node;
            },
            set : function(val$jscomp$6) {
              this.node = val$jscomp$6;
            }
          },
          isRead : {
            get : function() {
              return (this.flags & 2097155) !== 1;
            }
          },
          isWrite : {
            get : function() {
              return (this.flags & 2097155) !== 0;
            }
          },
          isAppend : {
            get : function() {
              return this.flags & 1024;
            }
          }
        });
      }
      var newStream$jscomp$1 = new FS$jscomp$0.FSStream;
      var p$jscomp$10;
      for (p$jscomp$10 in stream$jscomp$36) {
        newStream$jscomp$1[p$jscomp$10] = stream$jscomp$36[p$jscomp$10];
      }
      stream$jscomp$36 = newStream$jscomp$1;
      var fd$jscomp$7 = FS$jscomp$0.nextfd(fd_start$jscomp$1, fd_end$jscomp$1);
      stream$jscomp$36.fd = fd$jscomp$7;
      FS$jscomp$0.streams[fd$jscomp$7] = stream$jscomp$36;
      return stream$jscomp$36;
    },
    closeStream : function(fd$jscomp$8) {
      FS$jscomp$0.streams[fd$jscomp$8] = null;
    },
    chrdev_stream_ops : {
      open : function(stream$jscomp$37) {
        var device$jscomp$2 = FS$jscomp$0.getDevice(stream$jscomp$37.node.rdev);
        stream$jscomp$37.stream_ops = device$jscomp$2.stream_ops;
        if (stream$jscomp$37.stream_ops.open) {
          stream$jscomp$37.stream_ops.open(stream$jscomp$37);
        }
      },
      llseek : function() {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ESPIPE);
      }
    },
    major : function(dev$jscomp$7) {
      return dev$jscomp$7 >> 8;
    },
    minor : function(dev$jscomp$8) {
      return dev$jscomp$8 & 255;
    },
    makedev : function(ma$jscomp$0, mi$jscomp$0) {
      return ma$jscomp$0 << 8 | mi$jscomp$0;
    },
    registerDevice : function(dev$jscomp$9, ops$jscomp$1) {
      FS$jscomp$0.devices[dev$jscomp$9] = {
        stream_ops : ops$jscomp$1
      };
    },
    getDevice : function(dev$jscomp$10) {
      return FS$jscomp$0.devices[dev$jscomp$10];
    },
    getMounts : function(mount$jscomp$8) {
      var mounts$jscomp$0 = [];
      var check$jscomp$2 = [mount$jscomp$8];
      for (; check$jscomp$2.length;) {
        var m$jscomp$0 = check$jscomp$2.pop();
        mounts$jscomp$0.push(m$jscomp$0);
        check$jscomp$2.push.apply(check$jscomp$2, m$jscomp$0.mounts);
      }
      return mounts$jscomp$0;
    },
    syncfs : function(populate$jscomp$1, callback$jscomp$58) {
      function doCallback$jscomp$0(err$jscomp$18) {
        assert$jscomp$0(FS$jscomp$0.syncFSRequests > 0);
        FS$jscomp$0.syncFSRequests--;
        return callback$jscomp$58(err$jscomp$18);
      }
      function done$jscomp$1(err$jscomp$19) {
        if (err$jscomp$19) {
          if (!done$jscomp$1.errored) {
            done$jscomp$1.errored = true;
            return doCallback$jscomp$0(err$jscomp$19);
          }
          return;
        }
        if (++completed$jscomp$1 >= mounts$jscomp$1.length) {
          doCallback$jscomp$0(null);
        }
      }
      if (typeof populate$jscomp$1 === "function") {
        callback$jscomp$58 = populate$jscomp$1;
        populate$jscomp$1 = false;
      }
      FS$jscomp$0.syncFSRequests++;
      if (FS$jscomp$0.syncFSRequests > 1) {
        console.log("warning: " + FS$jscomp$0.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
      }
      var mounts$jscomp$1 = FS$jscomp$0.getMounts(FS$jscomp$0.root.mount);
      var completed$jscomp$1 = 0;
      mounts$jscomp$1.forEach(function(mount$jscomp$9) {
        if (!mount$jscomp$9.type.syncfs) {
          return done$jscomp$1(null);
        }
        mount$jscomp$9.type.syncfs(mount$jscomp$9, populate$jscomp$1, done$jscomp$1);
      });
    },
    mount : function(type$jscomp$141, opts$jscomp$3, mountpoint$jscomp$0) {
      var root$jscomp$5 = mountpoint$jscomp$0 === "/";
      var pseudo$jscomp$0 = !mountpoint$jscomp$0;
      var node$jscomp$39;
      if (root$jscomp$5 && FS$jscomp$0.root) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
      } else {
        if (!root$jscomp$5 && !pseudo$jscomp$0) {
          var lookup$jscomp$3 = FS$jscomp$0.lookupPath(mountpoint$jscomp$0, {
            follow_mount : false
          });
          mountpoint$jscomp$0 = lookup$jscomp$3.path;
          node$jscomp$39 = lookup$jscomp$3.node;
          if (FS$jscomp$0.isMountpoint(node$jscomp$39)) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
          }
          if (!FS$jscomp$0.isDir(node$jscomp$39.mode)) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTDIR);
          }
        }
      }
      var mount$jscomp$10 = {
        type : type$jscomp$141,
        opts : opts$jscomp$3,
        mountpoint : mountpoint$jscomp$0,
        mounts : []
      };
      var mountRoot$jscomp$0 = type$jscomp$141.mount(mount$jscomp$10);
      mountRoot$jscomp$0.mount = mount$jscomp$10;
      mount$jscomp$10.root = mountRoot$jscomp$0;
      if (root$jscomp$5) {
        FS$jscomp$0.root = mountRoot$jscomp$0;
      } else {
        if (node$jscomp$39) {
          node$jscomp$39.mounted = mount$jscomp$10;
          if (node$jscomp$39.mount) {
            node$jscomp$39.mount.mounts.push(mount$jscomp$10);
          }
        }
      }
      return mountRoot$jscomp$0;
    },
    unmount : function(mountpoint$jscomp$1) {
      var lookup$jscomp$4 = FS$jscomp$0.lookupPath(mountpoint$jscomp$1, {
        follow_mount : false
      });
      if (!FS$jscomp$0.isMountpoint(lookup$jscomp$4.node)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var node$jscomp$40 = lookup$jscomp$4.node;
      var mount$jscomp$11 = node$jscomp$40.mounted;
      var mounts$jscomp$2 = FS$jscomp$0.getMounts(mount$jscomp$11);
      Object.keys(FS$jscomp$0.nameTable).forEach(function(hash$jscomp$4) {
        var current$jscomp$2 = FS$jscomp$0.nameTable[hash$jscomp$4];
        for (; current$jscomp$2;) {
          var next$jscomp$2 = current$jscomp$2.name_next;
          if (mounts$jscomp$2.indexOf(current$jscomp$2.mount) !== -1) {
            FS$jscomp$0.destroyNode(current$jscomp$2);
          }
          current$jscomp$2 = next$jscomp$2;
        }
      });
      node$jscomp$40.mounted = null;
      var idx$jscomp$1 = node$jscomp$40.mount.mounts.indexOf(mount$jscomp$11);
      assert$jscomp$0(idx$jscomp$1 !== -1);
      node$jscomp$40.mount.mounts.splice(idx$jscomp$1, 1);
    },
    lookup : function(parent$jscomp$24, name$jscomp$99) {
      return parent$jscomp$24.node_ops.lookup(parent$jscomp$24, name$jscomp$99);
    },
    mknod : function(path$jscomp$43, mode$jscomp$35, dev$jscomp$11) {
      var lookup$jscomp$5 = FS$jscomp$0.lookupPath(path$jscomp$43, {
        parent : true
      });
      var parent$jscomp$25 = lookup$jscomp$5.node;
      var name$jscomp$100 = PATH$jscomp$0.basename(path$jscomp$43);
      if (!name$jscomp$100 || name$jscomp$100 === "." || name$jscomp$100 === "..") {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var err$jscomp$20 = FS$jscomp$0.mayCreate(parent$jscomp$25, name$jscomp$100);
      if (err$jscomp$20) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$20);
      }
      if (!parent$jscomp$25.node_ops.mknod) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      return parent$jscomp$25.node_ops.mknod(parent$jscomp$25, name$jscomp$100, mode$jscomp$35, dev$jscomp$11);
    },
    create : function(path$jscomp$44, mode$jscomp$36) {
      mode$jscomp$36 = mode$jscomp$36 !== undefined ? mode$jscomp$36 : 438;
      mode$jscomp$36 = mode$jscomp$36 & 4095;
      mode$jscomp$36 = mode$jscomp$36 | 32768;
      return FS$jscomp$0.mknod(path$jscomp$44, mode$jscomp$36, 0);
    },
    mkdir : function(path$jscomp$45, mode$jscomp$37) {
      mode$jscomp$37 = mode$jscomp$37 !== undefined ? mode$jscomp$37 : 511;
      mode$jscomp$37 = mode$jscomp$37 & (511 | 512);
      mode$jscomp$37 = mode$jscomp$37 | 16384;
      return FS$jscomp$0.mknod(path$jscomp$45, mode$jscomp$37, 0);
    },
    mkdirTree : function(path$jscomp$46, mode$jscomp$38) {
      var dirs$jscomp$0 = path$jscomp$46.split("/");
      var d$jscomp$0 = "";
      var i$jscomp$68 = 0;
      for (; i$jscomp$68 < dirs$jscomp$0.length; ++i$jscomp$68) {
        if (!dirs$jscomp$0[i$jscomp$68]) {
          continue;
        }
        d$jscomp$0 = d$jscomp$0 + ("/" + dirs$jscomp$0[i$jscomp$68]);
        try {
          FS$jscomp$0.mkdir(d$jscomp$0, mode$jscomp$38);
        } catch (e$jscomp$294) {
          if (e$jscomp$294.errno != ERRNO_CODES$jscomp$0.EEXIST) {
            throw e$jscomp$294;
          }
        }
      }
    },
    mkdev : function(path$jscomp$47, mode$jscomp$39, dev$jscomp$12) {
      if (typeof dev$jscomp$12 === "undefined") {
        dev$jscomp$12 = mode$jscomp$39;
        mode$jscomp$39 = 438;
      }
      mode$jscomp$39 = mode$jscomp$39 | 8192;
      return FS$jscomp$0.mknod(path$jscomp$47, mode$jscomp$39, dev$jscomp$12);
    },
    symlink : function(oldpath$jscomp$1, newpath$jscomp$0) {
      if (!PATH$jscomp$0.resolve(oldpath$jscomp$1)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      var lookup$jscomp$6 = FS$jscomp$0.lookupPath(newpath$jscomp$0, {
        parent : true
      });
      var parent$jscomp$26 = lookup$jscomp$6.node;
      if (!parent$jscomp$26) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      var newname$jscomp$1 = PATH$jscomp$0.basename(newpath$jscomp$0);
      var err$jscomp$21 = FS$jscomp$0.mayCreate(parent$jscomp$26, newname$jscomp$1);
      if (err$jscomp$21) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$21);
      }
      if (!parent$jscomp$26.node_ops.symlink) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      return parent$jscomp$26.node_ops.symlink(parent$jscomp$26, newname$jscomp$1, oldpath$jscomp$1);
    },
    rename : function(old_path$jscomp$1, new_path$jscomp$1) {
      var old_dirname$jscomp$0 = PATH$jscomp$0.dirname(old_path$jscomp$1);
      var new_dirname$jscomp$0 = PATH$jscomp$0.dirname(new_path$jscomp$1);
      var old_name$jscomp$0 = PATH$jscomp$0.basename(old_path$jscomp$1);
      var new_name$jscomp$1 = PATH$jscomp$0.basename(new_path$jscomp$1);
      var lookup$jscomp$7;
      var old_dir$jscomp$0;
      var new_dir$jscomp$1;
      try {
        lookup$jscomp$7 = FS$jscomp$0.lookupPath(old_path$jscomp$1, {
          parent : true
        });
        old_dir$jscomp$0 = lookup$jscomp$7.node;
        lookup$jscomp$7 = FS$jscomp$0.lookupPath(new_path$jscomp$1, {
          parent : true
        });
        new_dir$jscomp$1 = lookup$jscomp$7.node;
      } catch (e$jscomp$295) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
      }
      if (!old_dir$jscomp$0 || !new_dir$jscomp$1) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      if (old_dir$jscomp$0.mount !== new_dir$jscomp$1.mount) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EXDEV);
      }
      var old_node$jscomp$1 = FS$jscomp$0.lookupNode(old_dir$jscomp$0, old_name$jscomp$0);
      var relative$jscomp$0 = PATH$jscomp$0.relative(old_path$jscomp$1, new_dirname$jscomp$0);
      if (relative$jscomp$0.charAt(0) !== ".") {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      relative$jscomp$0 = PATH$jscomp$0.relative(new_path$jscomp$1, old_dirname$jscomp$0);
      if (relative$jscomp$0.charAt(0) !== ".") {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTEMPTY);
      }
      var new_node$jscomp$1;
      try {
        new_node$jscomp$1 = FS$jscomp$0.lookupNode(new_dir$jscomp$1, new_name$jscomp$1);
      } catch (e$jscomp$296) {
      }
      if (old_node$jscomp$1 === new_node$jscomp$1) {
        return;
      }
      var isdir$jscomp$1 = FS$jscomp$0.isDir(old_node$jscomp$1.mode);
      var err$jscomp$22 = FS$jscomp$0.mayDelete(old_dir$jscomp$0, old_name$jscomp$0, isdir$jscomp$1);
      if (err$jscomp$22) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$22);
      }
      err$jscomp$22 = new_node$jscomp$1 ? FS$jscomp$0.mayDelete(new_dir$jscomp$1, new_name$jscomp$1, isdir$jscomp$1) : FS$jscomp$0.mayCreate(new_dir$jscomp$1, new_name$jscomp$1);
      if (err$jscomp$22) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$22);
      }
      if (!old_dir$jscomp$0.node_ops.rename) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      if (FS$jscomp$0.isMountpoint(old_node$jscomp$1) || new_node$jscomp$1 && FS$jscomp$0.isMountpoint(new_node$jscomp$1)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
      }
      if (new_dir$jscomp$1 !== old_dir$jscomp$0) {
        err$jscomp$22 = FS$jscomp$0.nodePermissions(old_dir$jscomp$0, "w");
        if (err$jscomp$22) {
          throw new FS$jscomp$0.ErrnoError(err$jscomp$22);
        }
      }
      try {
        if (FS$jscomp$0.trackingDelegate["willMovePath"]) {
          FS$jscomp$0.trackingDelegate["willMovePath"](old_path$jscomp$1, new_path$jscomp$1);
        }
      } catch (e$jscomp$297) {
        console.log("FS.trackingDelegate['willMovePath']('" + old_path$jscomp$1 + "', '" + new_path$jscomp$1 + "') threw an exception: " + e$jscomp$297.message);
      }
      FS$jscomp$0.hashRemoveNode(old_node$jscomp$1);
      try {
        old_dir$jscomp$0.node_ops.rename(old_node$jscomp$1, new_dir$jscomp$1, new_name$jscomp$1);
      } catch (e$jscomp$298) {
        throw e$jscomp$298;
      } finally {
        FS$jscomp$0.hashAddNode(old_node$jscomp$1);
      }
      try {
        if (FS$jscomp$0.trackingDelegate["onMovePath"]) {
          FS$jscomp$0.trackingDelegate["onMovePath"](old_path$jscomp$1, new_path$jscomp$1);
        }
      } catch (e$jscomp$299) {
        console.log("FS.trackingDelegate['onMovePath']('" + old_path$jscomp$1 + "', '" + new_path$jscomp$1 + "') threw an exception: " + e$jscomp$299.message);
      }
    },
    rmdir : function(path$jscomp$48) {
      var lookup$jscomp$8 = FS$jscomp$0.lookupPath(path$jscomp$48, {
        parent : true
      });
      var parent$jscomp$27 = lookup$jscomp$8.node;
      var name$jscomp$101 = PATH$jscomp$0.basename(path$jscomp$48);
      var node$jscomp$41 = FS$jscomp$0.lookupNode(parent$jscomp$27, name$jscomp$101);
      var err$jscomp$23 = FS$jscomp$0.mayDelete(parent$jscomp$27, name$jscomp$101, true);
      if (err$jscomp$23) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$23);
      }
      if (!parent$jscomp$27.node_ops.rmdir) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      if (FS$jscomp$0.isMountpoint(node$jscomp$41)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
      }
      try {
        if (FS$jscomp$0.trackingDelegate["willDeletePath"]) {
          FS$jscomp$0.trackingDelegate["willDeletePath"](path$jscomp$48);
        }
      } catch (e$jscomp$300) {
        console.log("FS.trackingDelegate['willDeletePath']('" + path$jscomp$48 + "') threw an exception: " + e$jscomp$300.message);
      }
      parent$jscomp$27.node_ops.rmdir(parent$jscomp$27, name$jscomp$101);
      FS$jscomp$0.destroyNode(node$jscomp$41);
      try {
        if (FS$jscomp$0.trackingDelegate["onDeletePath"]) {
          FS$jscomp$0.trackingDelegate["onDeletePath"](path$jscomp$48);
        }
      } catch (e$jscomp$301) {
        console.log("FS.trackingDelegate['onDeletePath']('" + path$jscomp$48 + "') threw an exception: " + e$jscomp$301.message);
      }
    },
    readdir : function(path$jscomp$49) {
      var lookup$jscomp$9 = FS$jscomp$0.lookupPath(path$jscomp$49, {
        follow : true
      });
      var node$jscomp$42 = lookup$jscomp$9.node;
      if (!node$jscomp$42.node_ops.readdir) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTDIR);
      }
      return node$jscomp$42.node_ops.readdir(node$jscomp$42);
    },
    unlink : function(path$jscomp$50) {
      var lookup$jscomp$10 = FS$jscomp$0.lookupPath(path$jscomp$50, {
        parent : true
      });
      var parent$jscomp$28 = lookup$jscomp$10.node;
      var name$jscomp$102 = PATH$jscomp$0.basename(path$jscomp$50);
      var node$jscomp$43 = FS$jscomp$0.lookupNode(parent$jscomp$28, name$jscomp$102);
      var err$jscomp$24 = FS$jscomp$0.mayDelete(parent$jscomp$28, name$jscomp$102, false);
      if (err$jscomp$24) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$24);
      }
      if (!parent$jscomp$28.node_ops.unlink) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      if (FS$jscomp$0.isMountpoint(node$jscomp$43)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBUSY);
      }
      try {
        if (FS$jscomp$0.trackingDelegate["willDeletePath"]) {
          FS$jscomp$0.trackingDelegate["willDeletePath"](path$jscomp$50);
        }
      } catch (e$jscomp$302) {
        console.log("FS.trackingDelegate['willDeletePath']('" + path$jscomp$50 + "') threw an exception: " + e$jscomp$302.message);
      }
      parent$jscomp$28.node_ops.unlink(parent$jscomp$28, name$jscomp$102);
      FS$jscomp$0.destroyNode(node$jscomp$43);
      try {
        if (FS$jscomp$0.trackingDelegate["onDeletePath"]) {
          FS$jscomp$0.trackingDelegate["onDeletePath"](path$jscomp$50);
        }
      } catch (e$jscomp$303) {
        console.log("FS.trackingDelegate['onDeletePath']('" + path$jscomp$50 + "') threw an exception: " + e$jscomp$303.message);
      }
    },
    readlink : function(path$jscomp$51) {
      var lookup$jscomp$11 = FS$jscomp$0.lookupPath(path$jscomp$51);
      var link$jscomp$1 = lookup$jscomp$11.node;
      if (!link$jscomp$1) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      if (!link$jscomp$1.node_ops.readlink) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      return PATH$jscomp$0.resolve(FS$jscomp$0.getPath(link$jscomp$1.parent), link$jscomp$1.node_ops.readlink(link$jscomp$1));
    },
    stat : function(path$jscomp$52, dontFollow$jscomp$0) {
      var lookup$jscomp$12 = FS$jscomp$0.lookupPath(path$jscomp$52, {
        follow : !dontFollow$jscomp$0
      });
      var node$jscomp$44 = lookup$jscomp$12.node;
      if (!node$jscomp$44) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      if (!node$jscomp$44.node_ops.getattr) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      return node$jscomp$44.node_ops.getattr(node$jscomp$44);
    },
    lstat : function(path$jscomp$53) {
      return FS$jscomp$0.stat(path$jscomp$53, true);
    },
    chmod : function(path$jscomp$54, mode$jscomp$40, dontFollow$jscomp$1) {
      var node$jscomp$45;
      if (typeof path$jscomp$54 === "string") {
        var lookup$jscomp$13 = FS$jscomp$0.lookupPath(path$jscomp$54, {
          follow : !dontFollow$jscomp$1
        });
        node$jscomp$45 = lookup$jscomp$13.node;
      } else {
        node$jscomp$45 = path$jscomp$54;
      }
      if (!node$jscomp$45.node_ops.setattr) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      node$jscomp$45.node_ops.setattr(node$jscomp$45, {
        mode : mode$jscomp$40 & 4095 | node$jscomp$45.mode & ~4095,
        timestamp : Date.now()
      });
    },
    lchmod : function(path$jscomp$55, mode$jscomp$41) {
      FS$jscomp$0.chmod(path$jscomp$55, mode$jscomp$41, true);
    },
    fchmod : function(fd$jscomp$9, mode$jscomp$42) {
      var stream$jscomp$38 = FS$jscomp$0.getStream(fd$jscomp$9);
      if (!stream$jscomp$38) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      FS$jscomp$0.chmod(stream$jscomp$38.node, mode$jscomp$42);
    },
    chown : function(path$jscomp$56, uid$jscomp$1, gid$jscomp$0, dontFollow$jscomp$2) {
      var node$jscomp$46;
      if (typeof path$jscomp$56 === "string") {
        var lookup$jscomp$14 = FS$jscomp$0.lookupPath(path$jscomp$56, {
          follow : !dontFollow$jscomp$2
        });
        node$jscomp$46 = lookup$jscomp$14.node;
      } else {
        node$jscomp$46 = path$jscomp$56;
      }
      if (!node$jscomp$46.node_ops.setattr) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      node$jscomp$46.node_ops.setattr(node$jscomp$46, {
        timestamp : Date.now()
      });
    },
    lchown : function(path$jscomp$57, uid$jscomp$2, gid$jscomp$1) {
      FS$jscomp$0.chown(path$jscomp$57, uid$jscomp$2, gid$jscomp$1, true);
    },
    fchown : function(fd$jscomp$10, uid$jscomp$3, gid$jscomp$2) {
      var stream$jscomp$39 = FS$jscomp$0.getStream(fd$jscomp$10);
      if (!stream$jscomp$39) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      FS$jscomp$0.chown(stream$jscomp$39.node, uid$jscomp$3, gid$jscomp$2);
    },
    truncate : function(path$jscomp$58, len$jscomp$7) {
      if (len$jscomp$7 < 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var node$jscomp$47;
      if (typeof path$jscomp$58 === "string") {
        var lookup$jscomp$15 = FS$jscomp$0.lookupPath(path$jscomp$58, {
          follow : true
        });
        node$jscomp$47 = lookup$jscomp$15.node;
      } else {
        node$jscomp$47 = path$jscomp$58;
      }
      if (!node$jscomp$47.node_ops.setattr) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EPERM);
      }
      if (FS$jscomp$0.isDir(node$jscomp$47.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EISDIR);
      }
      if (!FS$jscomp$0.isFile(node$jscomp$47.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var err$jscomp$25 = FS$jscomp$0.nodePermissions(node$jscomp$47, "w");
      if (err$jscomp$25) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$25);
      }
      node$jscomp$47.node_ops.setattr(node$jscomp$47, {
        size : len$jscomp$7,
        timestamp : Date.now()
      });
    },
    ftruncate : function(fd$jscomp$11, len$jscomp$8) {
      var stream$jscomp$40 = FS$jscomp$0.getStream(fd$jscomp$11);
      if (!stream$jscomp$40) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if ((stream$jscomp$40.flags & 2097155) === 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      FS$jscomp$0.truncate(stream$jscomp$40.node, len$jscomp$8);
    },
    utime : function(path$jscomp$59, atime$jscomp$0, mtime$jscomp$1) {
      var lookup$jscomp$16 = FS$jscomp$0.lookupPath(path$jscomp$59, {
        follow : true
      });
      var node$jscomp$48 = lookup$jscomp$16.node;
      node$jscomp$48.node_ops.setattr(node$jscomp$48, {
        timestamp : Math.max(atime$jscomp$0, mtime$jscomp$1)
      });
    },
    open : function(path$jscomp$60, flags$jscomp$14, mode$jscomp$43, fd_start$jscomp$2, fd_end$jscomp$2) {
      if (path$jscomp$60 === "") {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      flags$jscomp$14 = typeof flags$jscomp$14 === "string" ? FS$jscomp$0.modeStringToFlags(flags$jscomp$14) : flags$jscomp$14;
      mode$jscomp$43 = typeof mode$jscomp$43 === "undefined" ? 438 : mode$jscomp$43;
      if (flags$jscomp$14 & 64) {
        mode$jscomp$43 = mode$jscomp$43 & 4095 | 32768;
      } else {
        mode$jscomp$43 = 0;
      }
      var node$jscomp$49;
      if (typeof path$jscomp$60 === "object") {
        node$jscomp$49 = path$jscomp$60;
      } else {
        path$jscomp$60 = PATH$jscomp$0.normalize(path$jscomp$60);
        try {
          var lookup$jscomp$17 = FS$jscomp$0.lookupPath(path$jscomp$60, {
            follow : !(flags$jscomp$14 & 131072)
          });
          node$jscomp$49 = lookup$jscomp$17.node;
        } catch (e$jscomp$304) {
        }
      }
      var created$jscomp$0 = false;
      if (flags$jscomp$14 & 64) {
        if (node$jscomp$49) {
          if (flags$jscomp$14 & 128) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EEXIST);
          }
        } else {
          node$jscomp$49 = FS$jscomp$0.mknod(path$jscomp$60, mode$jscomp$43, 0);
          created$jscomp$0 = true;
        }
      }
      if (!node$jscomp$49) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      if (FS$jscomp$0.isChrdev(node$jscomp$49.mode)) {
        flags$jscomp$14 = flags$jscomp$14 & ~512;
      }
      if (flags$jscomp$14 & 65536 && !FS$jscomp$0.isDir(node$jscomp$49.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTDIR);
      }
      if (!created$jscomp$0) {
        var err$jscomp$26 = FS$jscomp$0.mayOpen(node$jscomp$49, flags$jscomp$14);
        if (err$jscomp$26) {
          throw new FS$jscomp$0.ErrnoError(err$jscomp$26);
        }
      }
      if (flags$jscomp$14 & 512) {
        FS$jscomp$0.truncate(node$jscomp$49, 0);
      }
      flags$jscomp$14 = flags$jscomp$14 & ~(128 | 512);
      var stream$jscomp$41 = FS$jscomp$0.createStream({
        node : node$jscomp$49,
        path : FS$jscomp$0.getPath(node$jscomp$49),
        flags : flags$jscomp$14,
        seekable : true,
        position : 0,
        stream_ops : node$jscomp$49.stream_ops,
        ungotten : [],
        error : false
      }, fd_start$jscomp$2, fd_end$jscomp$2);
      if (stream$jscomp$41.stream_ops.open) {
        stream$jscomp$41.stream_ops.open(stream$jscomp$41);
      }
      if (Module$jscomp$0["logReadFiles"] && !(flags$jscomp$14 & 1)) {
        if (!FS$jscomp$0.readFiles) {
          FS$jscomp$0.readFiles = {};
        }
        if (!(path$jscomp$60 in FS$jscomp$0.readFiles)) {
          FS$jscomp$0.readFiles[path$jscomp$60] = 1;
          err$jscomp$26("read file: " + path$jscomp$60);
        }
      }
      try {
        if (FS$jscomp$0.trackingDelegate["onOpenFile"]) {
          var trackingFlags$jscomp$0 = 0;
          if ((flags$jscomp$14 & 2097155) !== 1) {
            trackingFlags$jscomp$0 = trackingFlags$jscomp$0 | FS$jscomp$0.tracking.openFlags.READ;
          }
          if ((flags$jscomp$14 & 2097155) !== 0) {
            trackingFlags$jscomp$0 = trackingFlags$jscomp$0 | FS$jscomp$0.tracking.openFlags.WRITE;
          }
          FS$jscomp$0.trackingDelegate["onOpenFile"](path$jscomp$60, trackingFlags$jscomp$0);
        }
      } catch (e$jscomp$305) {
        console.log("FS.trackingDelegate['onOpenFile']('" + path$jscomp$60 + "', flags) threw an exception: " + e$jscomp$305.message);
      }
      return stream$jscomp$41;
    },
    close : function(stream$jscomp$42) {
      if (FS$jscomp$0.isClosed(stream$jscomp$42)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (stream$jscomp$42.getdents) {
        stream$jscomp$42.getdents = null;
      }
      try {
        if (stream$jscomp$42.stream_ops.close) {
          stream$jscomp$42.stream_ops.close(stream$jscomp$42);
        }
      } catch (e$jscomp$306) {
        throw e$jscomp$306;
      } finally {
        FS$jscomp$0.closeStream(stream$jscomp$42.fd);
      }
      stream$jscomp$42.fd = null;
    },
    isClosed : function(stream$jscomp$43) {
      return stream$jscomp$43.fd === null;
    },
    llseek : function(stream$jscomp$44, offset$jscomp$37, whence$jscomp$4) {
      if (FS$jscomp$0.isClosed(stream$jscomp$44)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (!stream$jscomp$44.seekable || !stream$jscomp$44.stream_ops.llseek) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ESPIPE);
      }
      stream$jscomp$44.position = stream$jscomp$44.stream_ops.llseek(stream$jscomp$44, offset$jscomp$37, whence$jscomp$4);
      stream$jscomp$44.ungotten = [];
      return stream$jscomp$44.position;
    },
    read : function(stream$jscomp$45, buffer$jscomp$40, offset$jscomp$38, length$jscomp$45, position$jscomp$10) {
      if (length$jscomp$45 < 0 || position$jscomp$10 < 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      if (FS$jscomp$0.isClosed(stream$jscomp$45)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if ((stream$jscomp$45.flags & 2097155) === 1) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (FS$jscomp$0.isDir(stream$jscomp$45.node.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EISDIR);
      }
      if (!stream$jscomp$45.stream_ops.read) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      var seeking$jscomp$0 = typeof position$jscomp$10 !== "undefined";
      if (!seeking$jscomp$0) {
        position$jscomp$10 = stream$jscomp$45.position;
      } else {
        if (!stream$jscomp$45.seekable) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ESPIPE);
        }
      }
      var bytesRead$jscomp$2 = stream$jscomp$45.stream_ops.read(stream$jscomp$45, buffer$jscomp$40, offset$jscomp$38, length$jscomp$45, position$jscomp$10);
      if (!seeking$jscomp$0) {
        stream$jscomp$45.position += bytesRead$jscomp$2;
      }
      return bytesRead$jscomp$2;
    },
    write : function(stream$jscomp$46, buffer$jscomp$41, offset$jscomp$39, length$jscomp$46, position$jscomp$11, canOwn$jscomp$1) {
      if (length$jscomp$46 < 0 || position$jscomp$11 < 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      if (FS$jscomp$0.isClosed(stream$jscomp$46)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if ((stream$jscomp$46.flags & 2097155) === 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (FS$jscomp$0.isDir(stream$jscomp$46.node.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EISDIR);
      }
      if (!stream$jscomp$46.stream_ops.write) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      if (stream$jscomp$46.flags & 1024) {
        FS$jscomp$0.llseek(stream$jscomp$46, 0, 2);
      }
      var seeking$jscomp$1 = typeof position$jscomp$11 !== "undefined";
      if (!seeking$jscomp$1) {
        position$jscomp$11 = stream$jscomp$46.position;
      } else {
        if (!stream$jscomp$46.seekable) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ESPIPE);
        }
      }
      var bytesWritten$jscomp$2 = stream$jscomp$46.stream_ops.write(stream$jscomp$46, buffer$jscomp$41, offset$jscomp$39, length$jscomp$46, position$jscomp$11, canOwn$jscomp$1);
      if (!seeking$jscomp$1) {
        stream$jscomp$46.position += bytesWritten$jscomp$2;
      }
      try {
        if (stream$jscomp$46.path && FS$jscomp$0.trackingDelegate["onWriteToFile"]) {
          FS$jscomp$0.trackingDelegate["onWriteToFile"](stream$jscomp$46.path);
        }
      } catch (e$jscomp$307) {
        console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + e$jscomp$307.message);
      }
      return bytesWritten$jscomp$2;
    },
    allocate : function(stream$jscomp$47, offset$jscomp$40, length$jscomp$47) {
      if (FS$jscomp$0.isClosed(stream$jscomp$47)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (offset$jscomp$40 < 0 || length$jscomp$47 <= 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EINVAL);
      }
      if ((stream$jscomp$47.flags & 2097155) === 0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      if (!FS$jscomp$0.isFile(stream$jscomp$47.node.mode) && !FS$jscomp$0.isDir(stream$jscomp$47.node.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENODEV);
      }
      if (!stream$jscomp$47.stream_ops.allocate) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EOPNOTSUPP);
      }
      stream$jscomp$47.stream_ops.allocate(stream$jscomp$47, offset$jscomp$40, length$jscomp$47);
    },
    mmap : function(stream$jscomp$48, buffer$jscomp$42, offset$jscomp$41, length$jscomp$48, position$jscomp$12, prot$jscomp$2, flags$jscomp$15) {
      if ((stream$jscomp$48.flags & 2097155) === 1) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EACCES);
      }
      if (!stream$jscomp$48.stream_ops.mmap) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENODEV);
      }
      return stream$jscomp$48.stream_ops.mmap(stream$jscomp$48, buffer$jscomp$42, offset$jscomp$41, length$jscomp$48, position$jscomp$12, prot$jscomp$2, flags$jscomp$15);
    },
    msync : function(stream$jscomp$49, buffer$jscomp$43, offset$jscomp$42, length$jscomp$49, mmapFlags$jscomp$1) {
      if (!stream$jscomp$49 || !stream$jscomp$49.stream_ops.msync) {
        return 0;
      }
      return stream$jscomp$49.stream_ops.msync(stream$jscomp$49, buffer$jscomp$43, offset$jscomp$42, length$jscomp$49, mmapFlags$jscomp$1);
    },
    munmap : function(stream$jscomp$50) {
      return 0;
    },
    ioctl : function(stream$jscomp$51, cmd$jscomp$1, arg$jscomp$12) {
      if (!stream$jscomp$51.stream_ops.ioctl) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTTY);
      }
      return stream$jscomp$51.stream_ops.ioctl(stream$jscomp$51, cmd$jscomp$1, arg$jscomp$12);
    },
    readFile : function(path$jscomp$61, opts$jscomp$4) {
      opts$jscomp$4 = opts$jscomp$4 || {};
      opts$jscomp$4.flags = opts$jscomp$4.flags || "r";
      opts$jscomp$4.encoding = opts$jscomp$4.encoding || "binary";
      if (opts$jscomp$4.encoding !== "utf8" && opts$jscomp$4.encoding !== "binary") {
        throw new Error('Invalid encoding type "' + opts$jscomp$4.encoding + '"');
      }
      var ret$jscomp$24;
      var stream$jscomp$52 = FS$jscomp$0.open(path$jscomp$61, opts$jscomp$4.flags);
      var stat$jscomp$6 = FS$jscomp$0.stat(path$jscomp$61);
      var length$jscomp$50 = stat$jscomp$6.size;
      var buf$jscomp$11 = new Uint8Array(length$jscomp$50);
      FS$jscomp$0.read(stream$jscomp$52, buf$jscomp$11, 0, length$jscomp$50, 0);
      if (opts$jscomp$4.encoding === "utf8") {
        ret$jscomp$24 = UTF8ArrayToString$jscomp$0(buf$jscomp$11, 0);
      } else {
        if (opts$jscomp$4.encoding === "binary") {
          ret$jscomp$24 = buf$jscomp$11;
        }
      }
      FS$jscomp$0.close(stream$jscomp$52);
      return ret$jscomp$24;
    },
    writeFile : function(path$jscomp$62, data$jscomp$43, opts$jscomp$5) {
      opts$jscomp$5 = opts$jscomp$5 || {};
      opts$jscomp$5.flags = opts$jscomp$5.flags || "w";
      var stream$jscomp$53 = FS$jscomp$0.open(path$jscomp$62, opts$jscomp$5.flags, opts$jscomp$5.mode);
      if (typeof data$jscomp$43 === "string") {
        var buf$jscomp$12 = new Uint8Array(lengthBytesUTF8$jscomp$0(data$jscomp$43) + 1);
        var actualNumBytes$jscomp$0 = stringToUTF8Array$jscomp$0(data$jscomp$43, buf$jscomp$12, 0, buf$jscomp$12.length);
        FS$jscomp$0.write(stream$jscomp$53, buf$jscomp$12, 0, actualNumBytes$jscomp$0, undefined, opts$jscomp$5.canOwn);
      } else {
        if (ArrayBuffer.isView(data$jscomp$43)) {
          FS$jscomp$0.write(stream$jscomp$53, data$jscomp$43, 0, data$jscomp$43.byteLength, undefined, opts$jscomp$5.canOwn);
        } else {
          throw new Error("Unsupported data type");
        }
      }
      FS$jscomp$0.close(stream$jscomp$53);
    },
    cwd : function() {
      return FS$jscomp$0.currentPath;
    },
    chdir : function(path$jscomp$63) {
      var lookup$jscomp$18 = FS$jscomp$0.lookupPath(path$jscomp$63, {
        follow : true
      });
      if (lookup$jscomp$18.node === null) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOENT);
      }
      if (!FS$jscomp$0.isDir(lookup$jscomp$18.node.mode)) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.ENOTDIR);
      }
      var err$jscomp$27 = FS$jscomp$0.nodePermissions(lookup$jscomp$18.node, "x");
      if (err$jscomp$27) {
        throw new FS$jscomp$0.ErrnoError(err$jscomp$27);
      }
      FS$jscomp$0.currentPath = lookup$jscomp$18.path;
    },
    createDefaultDirectories : function() {
      FS$jscomp$0.mkdir("/tmp");
      FS$jscomp$0.mkdir("/home");
      FS$jscomp$0.mkdir("/home/web_user");
    },
    createDefaultDevices : function() {
      FS$jscomp$0.mkdir("/dev");
      FS$jscomp$0.registerDevice(FS$jscomp$0.makedev(1, 3), {
        read : function() {
          return 0;
        },
        write : function(stream$jscomp$54, buffer$jscomp$44, offset$jscomp$43, length$jscomp$51, pos$jscomp$3) {
          return length$jscomp$51;
        }
      });
      FS$jscomp$0.mkdev("/dev/null", FS$jscomp$0.makedev(1, 3));
      TTY$jscomp$0.register(FS$jscomp$0.makedev(5, 0), TTY$jscomp$0.default_tty_ops);
      TTY$jscomp$0.register(FS$jscomp$0.makedev(6, 0), TTY$jscomp$0.default_tty1_ops);
      FS$jscomp$0.mkdev("/dev/tty", FS$jscomp$0.makedev(5, 0));
      FS$jscomp$0.mkdev("/dev/tty1", FS$jscomp$0.makedev(6, 0));
      var random_device$jscomp$0;
      if (typeof crypto !== "undefined") {
        var randomBuffer$jscomp$0 = new Uint8Array(1);
        random_device$jscomp$0 = function() {
          crypto.getRandomValues(randomBuffer$jscomp$0);
          return randomBuffer$jscomp$0[0];
        };
      } else {
        if (ENVIRONMENT_IS_NODE$jscomp$0) {
          random_device$jscomp$0 = function() {
            return require("crypto")["randomBytes"](1)[0];
          };
        } else {
          random_device$jscomp$0 = function() {
            return Math.random() * 256 | 0;
          };
        }
      }
      FS$jscomp$0.createDevice("/dev", "random", random_device$jscomp$0);
      FS$jscomp$0.createDevice("/dev", "urandom", random_device$jscomp$0);
      FS$jscomp$0.mkdir("/dev/shm");
      FS$jscomp$0.mkdir("/dev/shm/tmp");
    },
    createSpecialDirectories : function() {
      FS$jscomp$0.mkdir("/proc");
      FS$jscomp$0.mkdir("/proc/self");
      FS$jscomp$0.mkdir("/proc/self/fd");
      FS$jscomp$0.mount({
        mount : function() {
          var node$jscomp$50 = FS$jscomp$0.createNode("/proc/self", "fd", 16384 | 511, 73);
          node$jscomp$50.node_ops = {
            lookup : function(parent$jscomp$29, name$jscomp$103) {
              var fd$jscomp$12 = +name$jscomp$103;
              var stream$jscomp$55 = FS$jscomp$0.getStream(fd$jscomp$12);
              if (!stream$jscomp$55) {
                throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
              }
              var ret$jscomp$25 = {
                parent : null,
                mount : {
                  mountpoint : "fake"
                },
                node_ops : {
                  readlink : function() {
                    return stream$jscomp$55.path;
                  }
                }
              };
              ret$jscomp$25.parent = ret$jscomp$25;
              return ret$jscomp$25;
            }
          };
          return node$jscomp$50;
        }
      }, {}, "/proc/self/fd");
    },
    createStandardStreams : function() {
      if (Module$jscomp$0["stdin"]) {
        FS$jscomp$0.createDevice("/dev", "stdin", Module$jscomp$0["stdin"]);
      } else {
        FS$jscomp$0.symlink("/dev/tty", "/dev/stdin");
      }
      if (Module$jscomp$0["stdout"]) {
        FS$jscomp$0.createDevice("/dev", "stdout", null, Module$jscomp$0["stdout"]);
      } else {
        FS$jscomp$0.symlink("/dev/tty", "/dev/stdout");
      }
      if (Module$jscomp$0["stderr"]) {
        FS$jscomp$0.createDevice("/dev", "stderr", null, Module$jscomp$0["stderr"]);
      } else {
        FS$jscomp$0.symlink("/dev/tty1", "/dev/stderr");
      }
      var stdin$jscomp$0 = FS$jscomp$0.open("/dev/stdin", "r");
      assert$jscomp$0(stdin$jscomp$0.fd === 0, "invalid handle for stdin (" + stdin$jscomp$0.fd + ")");
      var stdout$jscomp$0 = FS$jscomp$0.open("/dev/stdout", "w");
      assert$jscomp$0(stdout$jscomp$0.fd === 1, "invalid handle for stdout (" + stdout$jscomp$0.fd + ")");
      var stderr$jscomp$0 = FS$jscomp$0.open("/dev/stderr", "w");
      assert$jscomp$0(stderr$jscomp$0.fd === 2, "invalid handle for stderr (" + stderr$jscomp$0.fd + ")");
    },
    ensureErrnoError : function() {
      if (FS$jscomp$0.ErrnoError) {
        return;
      }
      FS$jscomp$0.ErrnoError = function ErrnoError$jscomp$0(errno$jscomp$0, node$jscomp$51) {
        this.node = node$jscomp$51;
        this.setErrno = function(errno$jscomp$1) {
          this.errno = errno$jscomp$1;
          var key$jscomp$47;
          for (key$jscomp$47 in ERRNO_CODES$jscomp$0) {
            if (ERRNO_CODES$jscomp$0[key$jscomp$47] === errno$jscomp$1) {
              this.code = key$jscomp$47;
              break;
            }
          }
        };
        this.setErrno(errno$jscomp$0);
        this.message = ERRNO_MESSAGES$jscomp$0[errno$jscomp$0];
        if (this.stack) {
          Object.defineProperty(this, "stack", {
            value : (new Error).stack,
            writable : true
          });
        }
      };
      FS$jscomp$0.ErrnoError.prototype = new Error;
      FS$jscomp$0.ErrnoError.prototype.constructor = FS$jscomp$0.ErrnoError;
      [ERRNO_CODES$jscomp$0.ENOENT].forEach(function(code$jscomp$3) {
        FS$jscomp$0.genericErrors[code$jscomp$3] = new FS$jscomp$0.ErrnoError(code$jscomp$3);
        FS$jscomp$0.genericErrors[code$jscomp$3].stack = "<generic error, no stack>";
      });
    },
    staticInit : function() {
      FS$jscomp$0.ensureErrnoError();
      FS$jscomp$0.nameTable = new Array(4096);
      FS$jscomp$0.mount(MEMFS$jscomp$0, {}, "/");
      FS$jscomp$0.createDefaultDirectories();
      FS$jscomp$0.createDefaultDevices();
      FS$jscomp$0.createSpecialDirectories();
      FS$jscomp$0.filesystems = {
        "MEMFS" : MEMFS$jscomp$0,
        "IDBFS" : IDBFS$jscomp$0,
        "NODEFS" : NODEFS$jscomp$0,
        "WORKERFS" : WORKERFS$jscomp$0
      };
    },
    init : function(input$jscomp$8, output$jscomp$3, error$jscomp$3) {
      assert$jscomp$0(!FS$jscomp$0.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
      FS$jscomp$0.init.initialized = true;
      FS$jscomp$0.ensureErrnoError();
      Module$jscomp$0["stdin"] = input$jscomp$8 || Module$jscomp$0["stdin"];
      Module$jscomp$0["stdout"] = output$jscomp$3 || Module$jscomp$0["stdout"];
      Module$jscomp$0["stderr"] = error$jscomp$3 || Module$jscomp$0["stderr"];
      FS$jscomp$0.createStandardStreams();
    },
    quit : function() {
      FS$jscomp$0.init.initialized = false;
      var fflush$jscomp$0 = Module$jscomp$0["_fflush"];
      if (fflush$jscomp$0) {
        fflush$jscomp$0(0);
      }
      var i$jscomp$69 = 0;
      for (; i$jscomp$69 < FS$jscomp$0.streams.length; i$jscomp$69++) {
        var stream$jscomp$56 = FS$jscomp$0.streams[i$jscomp$69];
        if (!stream$jscomp$56) {
          continue;
        }
        FS$jscomp$0.close(stream$jscomp$56);
      }
    },
    getMode : function(canRead$jscomp$0, canWrite$jscomp$0) {
      var mode$jscomp$44 = 0;
      if (canRead$jscomp$0) {
        mode$jscomp$44 = mode$jscomp$44 | (292 | 73);
      }
      if (canWrite$jscomp$0) {
        mode$jscomp$44 = mode$jscomp$44 | 146;
      }
      return mode$jscomp$44;
    },
    joinPath : function(parts$jscomp$7, forceRelative$jscomp$0) {
      var path$jscomp$64 = PATH$jscomp$0.join.apply(null, parts$jscomp$7);
      if (forceRelative$jscomp$0 && path$jscomp$64[0] == "/") {
        path$jscomp$64 = path$jscomp$64.substr(1);
      }
      return path$jscomp$64;
    },
    absolutePath : function(relative$jscomp$1, base$jscomp$4) {
      return PATH$jscomp$0.resolve(base$jscomp$4, relative$jscomp$1);
    },
    standardizePath : function(path$jscomp$65) {
      return PATH$jscomp$0.normalize(path$jscomp$65);
    },
    findObject : function(path$jscomp$66, dontResolveLastLink$jscomp$0) {
      var ret$jscomp$26 = FS$jscomp$0.analyzePath(path$jscomp$66, dontResolveLastLink$jscomp$0);
      if (ret$jscomp$26.exists) {
        return ret$jscomp$26.object;
      } else {
        ___setErrNo$jscomp$0(ret$jscomp$26.error);
        return null;
      }
    },
    analyzePath : function(path$jscomp$67, dontResolveLastLink$jscomp$1) {
      try {
        var lookup$jscomp$19 = FS$jscomp$0.lookupPath(path$jscomp$67, {
          follow : !dontResolveLastLink$jscomp$1
        });
        path$jscomp$67 = lookup$jscomp$19.path;
      } catch (e$jscomp$308) {
      }
      var ret$jscomp$27 = {
        isRoot : false,
        exists : false,
        error : 0,
        name : null,
        path : null,
        object : null,
        parentExists : false,
        parentPath : null,
        parentObject : null
      };
      try {
        lookup$jscomp$19 = FS$jscomp$0.lookupPath(path$jscomp$67, {
          parent : true
        });
        ret$jscomp$27.parentExists = true;
        ret$jscomp$27.parentPath = lookup$jscomp$19.path;
        ret$jscomp$27.parentObject = lookup$jscomp$19.node;
        ret$jscomp$27.name = PATH$jscomp$0.basename(path$jscomp$67);
        lookup$jscomp$19 = FS$jscomp$0.lookupPath(path$jscomp$67, {
          follow : !dontResolveLastLink$jscomp$1
        });
        ret$jscomp$27.exists = true;
        ret$jscomp$27.path = lookup$jscomp$19.path;
        ret$jscomp$27.object = lookup$jscomp$19.node;
        ret$jscomp$27.name = lookup$jscomp$19.node.name;
        ret$jscomp$27.isRoot = lookup$jscomp$19.path === "/";
      } catch (e$jscomp$309) {
        ret$jscomp$27.error = e$jscomp$309.errno;
      }
      return ret$jscomp$27;
    },
    createFolder : function(parent$jscomp$30, name$jscomp$104, canRead$jscomp$1, canWrite$jscomp$1) {
      var path$jscomp$68 = PATH$jscomp$0.join2(typeof parent$jscomp$30 === "string" ? parent$jscomp$30 : FS$jscomp$0.getPath(parent$jscomp$30), name$jscomp$104);
      var mode$jscomp$45 = FS$jscomp$0.getMode(canRead$jscomp$1, canWrite$jscomp$1);
      return FS$jscomp$0.mkdir(path$jscomp$68, mode$jscomp$45);
    },
    createPath : function(parent$jscomp$31, path$jscomp$69, canRead$jscomp$2, canWrite$jscomp$2) {
      parent$jscomp$31 = typeof parent$jscomp$31 === "string" ? parent$jscomp$31 : FS$jscomp$0.getPath(parent$jscomp$31);
      var parts$jscomp$8 = path$jscomp$69.split("/").reverse();
      for (; parts$jscomp$8.length;) {
        var part$jscomp$0 = parts$jscomp$8.pop();
        if (!part$jscomp$0) {
          continue;
        }
        var current$jscomp$3 = PATH$jscomp$0.join2(parent$jscomp$31, part$jscomp$0);
        try {
          FS$jscomp$0.mkdir(current$jscomp$3);
        } catch (e$jscomp$310) {
        }
        parent$jscomp$31 = current$jscomp$3;
      }
      return current$jscomp$3;
    },
    createFile : function(parent$jscomp$32, name$jscomp$105, properties$jscomp$0, canRead$jscomp$3, canWrite$jscomp$3) {
      var path$jscomp$70 = PATH$jscomp$0.join2(typeof parent$jscomp$32 === "string" ? parent$jscomp$32 : FS$jscomp$0.getPath(parent$jscomp$32), name$jscomp$105);
      var mode$jscomp$46 = FS$jscomp$0.getMode(canRead$jscomp$3, canWrite$jscomp$3);
      return FS$jscomp$0.create(path$jscomp$70, mode$jscomp$46);
    },
    createDataFile : function(parent$jscomp$33, name$jscomp$106, data$jscomp$44, canRead$jscomp$4, canWrite$jscomp$4, canOwn$jscomp$2) {
      var path$jscomp$71 = name$jscomp$106 ? PATH$jscomp$0.join2(typeof parent$jscomp$33 === "string" ? parent$jscomp$33 : FS$jscomp$0.getPath(parent$jscomp$33), name$jscomp$106) : parent$jscomp$33;
      var mode$jscomp$47 = FS$jscomp$0.getMode(canRead$jscomp$4, canWrite$jscomp$4);
      var node$jscomp$52 = FS$jscomp$0.create(path$jscomp$71, mode$jscomp$47);
      if (data$jscomp$44) {
        if (typeof data$jscomp$44 === "string") {
          var arr$jscomp$11 = new Array(data$jscomp$44.length);
          var i$jscomp$70 = 0;
          var len$jscomp$9 = data$jscomp$44.length;
          for (; i$jscomp$70 < len$jscomp$9; ++i$jscomp$70) {
            arr$jscomp$11[i$jscomp$70] = data$jscomp$44.charCodeAt(i$jscomp$70);
          }
          data$jscomp$44 = arr$jscomp$11;
        }
        FS$jscomp$0.chmod(node$jscomp$52, mode$jscomp$47 | 146);
        var stream$jscomp$57 = FS$jscomp$0.open(node$jscomp$52, "w");
        FS$jscomp$0.write(stream$jscomp$57, data$jscomp$44, 0, data$jscomp$44.length, 0, canOwn$jscomp$2);
        FS$jscomp$0.close(stream$jscomp$57);
        FS$jscomp$0.chmod(node$jscomp$52, mode$jscomp$47);
      }
      return node$jscomp$52;
    },
    createDevice : function(parent$jscomp$34, name$jscomp$107, input$jscomp$9, output$jscomp$4) {
      var path$jscomp$72 = PATH$jscomp$0.join2(typeof parent$jscomp$34 === "string" ? parent$jscomp$34 : FS$jscomp$0.getPath(parent$jscomp$34), name$jscomp$107);
      var mode$jscomp$48 = FS$jscomp$0.getMode(!!input$jscomp$9, !!output$jscomp$4);
      if (!FS$jscomp$0.createDevice.major) {
        FS$jscomp$0.createDevice.major = 64;
      }
      var dev$jscomp$13 = FS$jscomp$0.makedev(FS$jscomp$0.createDevice.major++, 0);
      FS$jscomp$0.registerDevice(dev$jscomp$13, {
        open : function(stream$jscomp$58) {
          stream$jscomp$58.seekable = false;
        },
        close : function(stream$jscomp$59) {
          if (output$jscomp$4 && output$jscomp$4.buffer && output$jscomp$4.buffer.length) {
            output$jscomp$4(10);
          }
        },
        read : function(stream$jscomp$60, buffer$jscomp$45, offset$jscomp$44, length$jscomp$52, pos$jscomp$4) {
          var bytesRead$jscomp$3 = 0;
          var i$jscomp$71 = 0;
          for (; i$jscomp$71 < length$jscomp$52; i$jscomp$71++) {
            var result$jscomp$16;
            try {
              result$jscomp$16 = input$jscomp$9();
            } catch (e$jscomp$311) {
              throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
            }
            if (result$jscomp$16 === undefined && bytesRead$jscomp$3 === 0) {
              throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EAGAIN);
            }
            if (result$jscomp$16 === null || result$jscomp$16 === undefined) {
              break;
            }
            bytesRead$jscomp$3++;
            buffer$jscomp$45[offset$jscomp$44 + i$jscomp$71] = result$jscomp$16;
          }
          if (bytesRead$jscomp$3) {
            stream$jscomp$60.node.timestamp = Date.now();
          }
          return bytesRead$jscomp$3;
        },
        write : function(stream$jscomp$61, buffer$jscomp$46, offset$jscomp$45, length$jscomp$53, pos$jscomp$5) {
          var i$jscomp$72 = 0;
          for (; i$jscomp$72 < length$jscomp$53; i$jscomp$72++) {
            try {
              output$jscomp$4(buffer$jscomp$46[offset$jscomp$45 + i$jscomp$72]);
            } catch (e$jscomp$312) {
              throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
            }
          }
          if (length$jscomp$53) {
            stream$jscomp$61.node.timestamp = Date.now();
          }
          return i$jscomp$72;
        }
      });
      return FS$jscomp$0.mkdev(path$jscomp$72, mode$jscomp$48, dev$jscomp$13);
    },
    createLink : function(parent$jscomp$35, name$jscomp$108, target$jscomp$118, canRead$jscomp$5, canWrite$jscomp$5) {
      var path$jscomp$73 = PATH$jscomp$0.join2(typeof parent$jscomp$35 === "string" ? parent$jscomp$35 : FS$jscomp$0.getPath(parent$jscomp$35), name$jscomp$108);
      return FS$jscomp$0.symlink(target$jscomp$118, path$jscomp$73);
    },
    forceLoadFile : function(obj$jscomp$26) {
      if (obj$jscomp$26.isDevice || obj$jscomp$26.isFolder || obj$jscomp$26.link || obj$jscomp$26.contents) {
        return true;
      }
      var success$jscomp$3 = true;
      if (typeof XMLHttpRequest !== "undefined") {
        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else {
        if (Module$jscomp$0["read"]) {
          try {
            obj$jscomp$26.contents = intArrayFromString$jscomp$0(Module$jscomp$0["read"](obj$jscomp$26.url), true);
            obj$jscomp$26.usedBytes = obj$jscomp$26.contents.length;
          } catch (e$jscomp$313) {
            success$jscomp$3 = false;
          }
        } else {
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
      }
      if (!success$jscomp$3) {
        ___setErrNo$jscomp$0(ERRNO_CODES$jscomp$0.EIO);
      }
      return success$jscomp$3;
    },
    createLazyFile : function(parent$jscomp$36, name$jscomp$109, url$jscomp$24, canRead$jscomp$6, canWrite$jscomp$6) {
      function LazyUint8Array$jscomp$0() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      LazyUint8Array$jscomp$0.prototype.get = function LazyUint8Array_get$jscomp$0(idx$jscomp$2) {
        if (idx$jscomp$2 > this.length - 1 || idx$jscomp$2 < 0) {
          return undefined;
        }
        var chunkOffset$jscomp$0 = idx$jscomp$2 % this.chunkSize;
        var chunkNum$jscomp$0 = idx$jscomp$2 / this.chunkSize | 0;
        return this.getter(chunkNum$jscomp$0)[chunkOffset$jscomp$0];
      };
      LazyUint8Array$jscomp$0.prototype.setDataGetter = function LazyUint8Array_setDataGetter$jscomp$0(getter$jscomp$0) {
        this.getter = getter$jscomp$0;
      };
      LazyUint8Array$jscomp$0.prototype.cacheLength = function LazyUint8Array_cacheLength$jscomp$0() {
        var xhr$jscomp$3 = new XMLHttpRequest;
        xhr$jscomp$3.open("HEAD", url$jscomp$24, false);
        xhr$jscomp$3.send(null);
        if (!(xhr$jscomp$3.status >= 200 && xhr$jscomp$3.status < 300 || xhr$jscomp$3.status === 304)) {
          throw new Error("Couldn't load " + url$jscomp$24 + ". Status: " + xhr$jscomp$3.status);
        }
        var datalength$jscomp$0 = Number(xhr$jscomp$3.getResponseHeader("Content-length"));
        var header$jscomp$2;
        var hasByteServing$jscomp$0 = (header$jscomp$2 = xhr$jscomp$3.getResponseHeader("Accept-Ranges")) && header$jscomp$2 === "bytes";
        var usesGzip$jscomp$0 = (header$jscomp$2 = xhr$jscomp$3.getResponseHeader("Content-Encoding")) && header$jscomp$2 === "gzip";
        var chunkSize$jscomp$0 = 1024 * 1024;
        if (!hasByteServing$jscomp$0) {
          chunkSize$jscomp$0 = datalength$jscomp$0;
        }
        var doXHR$jscomp$0 = function(from$jscomp$1, to$jscomp$1) {
          if (from$jscomp$1 > to$jscomp$1) {
            throw new Error("invalid range (" + from$jscomp$1 + ", " + to$jscomp$1 + ") or no bytes requested!");
          }
          if (to$jscomp$1 > datalength$jscomp$0 - 1) {
            throw new Error("only " + datalength$jscomp$0 + " bytes available! programmer error!");
          }
          var xhr$jscomp$4 = new XMLHttpRequest;
          xhr$jscomp$4.open("GET", url$jscomp$24, false);
          if (datalength$jscomp$0 !== chunkSize$jscomp$0) {
            xhr$jscomp$4.setRequestHeader("Range", "bytes=" + from$jscomp$1 + "-" + to$jscomp$1);
          }
          if (typeof Uint8Array != "undefined") {
            xhr$jscomp$4.responseType = "arraybuffer";
          }
          if (xhr$jscomp$4.overrideMimeType) {
            xhr$jscomp$4.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr$jscomp$4.send(null);
          if (!(xhr$jscomp$4.status >= 200 && xhr$jscomp$4.status < 300 || xhr$jscomp$4.status === 304)) {
            throw new Error("Couldn't load " + url$jscomp$24 + ". Status: " + xhr$jscomp$4.status);
          }
          if (xhr$jscomp$4.response !== undefined) {
            return new Uint8Array(xhr$jscomp$4.response || []);
          } else {
            return intArrayFromString$jscomp$0(xhr$jscomp$4.responseText || "", true);
          }
        };
        var lazyArray$jscomp$1 = this;
        lazyArray$jscomp$1.setDataGetter(function(chunkNum$jscomp$1) {
          var start$jscomp$15 = chunkNum$jscomp$1 * chunkSize$jscomp$0;
          var end$jscomp$6 = (chunkNum$jscomp$1 + 1) * chunkSize$jscomp$0 - 1;
          end$jscomp$6 = Math.min(end$jscomp$6, datalength$jscomp$0 - 1);
          if (typeof lazyArray$jscomp$1.chunks[chunkNum$jscomp$1] === "undefined") {
            lazyArray$jscomp$1.chunks[chunkNum$jscomp$1] = doXHR$jscomp$0(start$jscomp$15, end$jscomp$6);
          }
          if (typeof lazyArray$jscomp$1.chunks[chunkNum$jscomp$1] === "undefined") {
            throw new Error("doXHR failed!");
          }
          return lazyArray$jscomp$1.chunks[chunkNum$jscomp$1];
        });
        if (usesGzip$jscomp$0 || !datalength$jscomp$0) {
          chunkSize$jscomp$0 = datalength$jscomp$0 = 1;
          datalength$jscomp$0 = this.getter(0).length;
          chunkSize$jscomp$0 = datalength$jscomp$0;
          console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength$jscomp$0;
        this._chunkSize = chunkSize$jscomp$0;
        this.lengthKnown = true;
      };
      if (typeof XMLHttpRequest !== "undefined") {
        if (!ENVIRONMENT_IS_WORKER$jscomp$0) {
          throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        }
        var lazyArray$jscomp$0 = new LazyUint8Array$jscomp$0;
        Object.defineProperties(lazyArray$jscomp$0, {
          length : {
            get : function() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
          },
          chunkSize : {
            get : function() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
        });
        var properties$jscomp$1 = {
          isDevice : false,
          contents : lazyArray$jscomp$0
        };
      } else {
        properties$jscomp$1 = {
          isDevice : false,
          url : url$jscomp$24
        };
      }
      var node$jscomp$53 = FS$jscomp$0.createFile(parent$jscomp$36, name$jscomp$109, properties$jscomp$1, canRead$jscomp$6, canWrite$jscomp$6);
      if (properties$jscomp$1.contents) {
        node$jscomp$53.contents = properties$jscomp$1.contents;
      } else {
        if (properties$jscomp$1.url) {
          node$jscomp$53.contents = null;
          node$jscomp$53.url = properties$jscomp$1.url;
        }
      }
      Object.defineProperties(node$jscomp$53, {
        usedBytes : {
          get : function() {
            return this.contents.length;
          }
        }
      });
      var stream_ops$jscomp$0 = {};
      var keys$jscomp$0 = Object.keys(node$jscomp$53.stream_ops);
      keys$jscomp$0.forEach(function(key$jscomp$48) {
        var fn$jscomp$0 = node$jscomp$53.stream_ops[key$jscomp$48];
        stream_ops$jscomp$0[key$jscomp$48] = function forceLoadLazyFile$jscomp$0() {
          if (!FS$jscomp$0.forceLoadFile(node$jscomp$53)) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
          }
          return fn$jscomp$0.apply(null, arguments);
        };
      });
      stream_ops$jscomp$0.read = function stream_ops_read$jscomp$0(stream$jscomp$62, buffer$jscomp$47, offset$jscomp$46, length$jscomp$54, position$jscomp$13) {
        if (!FS$jscomp$0.forceLoadFile(node$jscomp$53)) {
          throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EIO);
        }
        var contents$jscomp$4 = stream$jscomp$62.node.contents;
        if (position$jscomp$13 >= contents$jscomp$4.length) {
          return 0;
        }
        var size$jscomp$34 = Math.min(contents$jscomp$4.length - position$jscomp$13, length$jscomp$54);
        assert$jscomp$0(size$jscomp$34 >= 0);
        if (contents$jscomp$4.slice) {
          var i$jscomp$73 = 0;
          for (; i$jscomp$73 < size$jscomp$34; i$jscomp$73++) {
            buffer$jscomp$47[offset$jscomp$46 + i$jscomp$73] = contents$jscomp$4[position$jscomp$13 + i$jscomp$73];
          }
        } else {
          i$jscomp$73 = 0;
          for (; i$jscomp$73 < size$jscomp$34; i$jscomp$73++) {
            buffer$jscomp$47[offset$jscomp$46 + i$jscomp$73] = contents$jscomp$4.get(position$jscomp$13 + i$jscomp$73);
          }
        }
        return size$jscomp$34;
      };
      node$jscomp$53.stream_ops = stream_ops$jscomp$0;
      return node$jscomp$53;
    },
    createPreloadedFile : function(parent$jscomp$37, name$jscomp$110, url$jscomp$25, canRead$jscomp$7, canWrite$jscomp$7, onload$jscomp$1, onerror$jscomp$1, dontCreateFile$jscomp$0, canOwn$jscomp$3, preFinish$jscomp$0) {
      function processData$jscomp$0(byteArray$jscomp$0) {
        function finish$jscomp$0(byteArray$jscomp$1) {
          if (preFinish$jscomp$0) {
            preFinish$jscomp$0();
          }
          if (!dontCreateFile$jscomp$0) {
            FS$jscomp$0.createDataFile(parent$jscomp$37, name$jscomp$110, byteArray$jscomp$1, canRead$jscomp$7, canWrite$jscomp$7, canOwn$jscomp$3);
          }
          if (onload$jscomp$1) {
            onload$jscomp$1();
          }
          removeRunDependency$jscomp$0(dep$jscomp$0);
        }
        var handled$jscomp$0 = false;
        Module$jscomp$0["preloadPlugins"].forEach(function(plugin$jscomp$0) {
          if (handled$jscomp$0) {
            return;
          }
          if (plugin$jscomp$0["canHandle"](fullname$jscomp$0)) {
            plugin$jscomp$0["handle"](byteArray$jscomp$0, fullname$jscomp$0, finish$jscomp$0, function() {
              if (onerror$jscomp$1) {
                onerror$jscomp$1();
              }
              removeRunDependency$jscomp$0(dep$jscomp$0);
            });
            handled$jscomp$0 = true;
          }
        });
        if (!handled$jscomp$0) {
          finish$jscomp$0(byteArray$jscomp$0);
        }
      }
      Browser$jscomp$0.init();
      var fullname$jscomp$0 = name$jscomp$110 ? PATH$jscomp$0.resolve(PATH$jscomp$0.join2(parent$jscomp$37, name$jscomp$110)) : parent$jscomp$37;
      var dep$jscomp$0 = getUniqueRunDependency$jscomp$0("cp " + fullname$jscomp$0);
      addRunDependency$jscomp$0(dep$jscomp$0);
      if (typeof url$jscomp$25 == "string") {
        Browser$jscomp$0.asyncLoad(url$jscomp$25, function(byteArray$jscomp$2) {
          processData$jscomp$0(byteArray$jscomp$2);
        }, onerror$jscomp$1);
      } else {
        processData$jscomp$0(url$jscomp$25);
      }
    },
    indexedDB : function() {
      return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    },
    DB_NAME : function() {
      return "EM_FS_" + window.location.pathname;
    },
    DB_VERSION : 20,
    DB_STORE_NAME : "FILE_DATA",
    saveFilesToDB : function(paths$jscomp$1, onload$jscomp$2, onerror$jscomp$2) {
      onload$jscomp$2 = onload$jscomp$2 || function() {
      };
      onerror$jscomp$2 = onerror$jscomp$2 || function() {
      };
      var indexedDB$jscomp$1 = FS$jscomp$0.indexedDB();
      try {
        var openRequest$jscomp$0 = indexedDB$jscomp$1.open(FS$jscomp$0.DB_NAME(), FS$jscomp$0.DB_VERSION);
      } catch (e$jscomp$314) {
        return onerror$jscomp$2(e$jscomp$314);
      }
      openRequest$jscomp$0.onupgradeneeded = function openRequest_onupgradeneeded$jscomp$0() {
        console.log("creating db");
        var db$jscomp$5 = openRequest$jscomp$0.result;
        db$jscomp$5.createObjectStore(FS$jscomp$0.DB_STORE_NAME);
      };
      openRequest$jscomp$0.onsuccess = function openRequest_onsuccess$jscomp$0() {
        function finish$jscomp$1() {
          if (fail$jscomp$2 == 0) {
            onload$jscomp$2();
          } else {
            onerror$jscomp$2();
          }
        }
        var db$jscomp$6 = openRequest$jscomp$0.result;
        var transaction$jscomp$3 = db$jscomp$6.transaction([FS$jscomp$0.DB_STORE_NAME], "readwrite");
        var files$jscomp$0 = transaction$jscomp$3.objectStore(FS$jscomp$0.DB_STORE_NAME);
        var ok$jscomp$0 = 0;
        var fail$jscomp$2 = 0;
        var total$jscomp$2 = paths$jscomp$1.length;
        paths$jscomp$1.forEach(function(path$jscomp$74) {
          var putRequest$jscomp$0 = files$jscomp$0.put(FS$jscomp$0.analyzePath(path$jscomp$74).object.contents, path$jscomp$74);
          putRequest$jscomp$0.onsuccess = function putRequest_onsuccess$jscomp$0() {
            ok$jscomp$0++;
            if (ok$jscomp$0 + fail$jscomp$2 == total$jscomp$2) {
              finish$jscomp$1();
            }
          };
          putRequest$jscomp$0.onerror = function putRequest_onerror$jscomp$0() {
            fail$jscomp$2++;
            if (ok$jscomp$0 + fail$jscomp$2 == total$jscomp$2) {
              finish$jscomp$1();
            }
          };
        });
        transaction$jscomp$3.onerror = onerror$jscomp$2;
      };
      openRequest$jscomp$0.onerror = onerror$jscomp$2;
    },
    loadFilesFromDB : function(paths$jscomp$2, onload$jscomp$3, onerror$jscomp$3) {
      onload$jscomp$3 = onload$jscomp$3 || function() {
      };
      onerror$jscomp$3 = onerror$jscomp$3 || function() {
      };
      var indexedDB$jscomp$2 = FS$jscomp$0.indexedDB();
      try {
        var openRequest$jscomp$1 = indexedDB$jscomp$2.open(FS$jscomp$0.DB_NAME(), FS$jscomp$0.DB_VERSION);
      } catch (e$jscomp$315) {
        return onerror$jscomp$3(e$jscomp$315);
      }
      openRequest$jscomp$1.onupgradeneeded = onerror$jscomp$3;
      openRequest$jscomp$1.onsuccess = function openRequest_onsuccess$jscomp$1() {
        function finish$jscomp$2() {
          if (fail$jscomp$3 == 0) {
            onload$jscomp$3();
          } else {
            onerror$jscomp$3();
          }
        }
        var db$jscomp$7 = openRequest$jscomp$1.result;
        try {
          var transaction$jscomp$4 = db$jscomp$7.transaction([FS$jscomp$0.DB_STORE_NAME], "readonly");
        } catch (e$jscomp$316) {
          onerror$jscomp$3(e$jscomp$316);
          return;
        }
        var files$jscomp$1 = transaction$jscomp$4.objectStore(FS$jscomp$0.DB_STORE_NAME);
        var ok$jscomp$1 = 0;
        var fail$jscomp$3 = 0;
        var total$jscomp$3 = paths$jscomp$2.length;
        paths$jscomp$2.forEach(function(path$jscomp$75) {
          var getRequest$jscomp$0 = files$jscomp$1.get(path$jscomp$75);
          getRequest$jscomp$0.onsuccess = function getRequest_onsuccess$jscomp$0() {
            if (FS$jscomp$0.analyzePath(path$jscomp$75).exists) {
              FS$jscomp$0.unlink(path$jscomp$75);
            }
            FS$jscomp$0.createDataFile(PATH$jscomp$0.dirname(path$jscomp$75), PATH$jscomp$0.basename(path$jscomp$75), getRequest$jscomp$0.result, true, true, true);
            ok$jscomp$1++;
            if (ok$jscomp$1 + fail$jscomp$3 == total$jscomp$3) {
              finish$jscomp$2();
            }
          };
          getRequest$jscomp$0.onerror = function getRequest_onerror$jscomp$0() {
            fail$jscomp$3++;
            if (ok$jscomp$1 + fail$jscomp$3 == total$jscomp$3) {
              finish$jscomp$2();
            }
          };
        });
        transaction$jscomp$4.onerror = onerror$jscomp$3;
      };
      openRequest$jscomp$1.onerror = onerror$jscomp$3;
    }
  };
  var SYSCALLS$jscomp$0 = {
    DEFAULT_POLLMASK : 5,
    mappings : {},
    umask : 511,
    calculateAt : function(dirfd$jscomp$0, path$jscomp$76) {
      if (path$jscomp$76[0] !== "/") {
        var dir$jscomp$4;
        if (dirfd$jscomp$0 === -100) {
          dir$jscomp$4 = FS$jscomp$0.cwd();
        } else {
          var dirstream$jscomp$0 = FS$jscomp$0.getStream(dirfd$jscomp$0);
          if (!dirstream$jscomp$0) {
            throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
          }
          dir$jscomp$4 = dirstream$jscomp$0.path;
        }
        path$jscomp$76 = PATH$jscomp$0.join2(dir$jscomp$4, path$jscomp$76);
      }
      return path$jscomp$76;
    },
    doStat : function(func$jscomp$15, path$jscomp$77, buf$jscomp$13) {
      try {
        var stat$jscomp$7 = func$jscomp$15(path$jscomp$77);
      } catch (e$jscomp$317) {
        if (e$jscomp$317 && e$jscomp$317.node && PATH$jscomp$0.normalize(path$jscomp$77) !== PATH$jscomp$0.normalize(FS$jscomp$0.getPath(e$jscomp$317.node))) {
          return -ERRNO_CODES$jscomp$0.ENOTDIR;
        }
        throw e$jscomp$317;
      }
      HEAP32$jscomp$0[buf$jscomp$13 >> 2] = stat$jscomp$7.dev;
      HEAP32$jscomp$0[buf$jscomp$13 + 4 >> 2] = 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 8 >> 2] = stat$jscomp$7.ino;
      HEAP32$jscomp$0[buf$jscomp$13 + 12 >> 2] = stat$jscomp$7.mode;
      HEAP32$jscomp$0[buf$jscomp$13 + 16 >> 2] = stat$jscomp$7.nlink;
      HEAP32$jscomp$0[buf$jscomp$13 + 20 >> 2] = stat$jscomp$7.uid;
      HEAP32$jscomp$0[buf$jscomp$13 + 24 >> 2] = stat$jscomp$7.gid;
      HEAP32$jscomp$0[buf$jscomp$13 + 28 >> 2] = stat$jscomp$7.rdev;
      HEAP32$jscomp$0[buf$jscomp$13 + 32 >> 2] = 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 36 >> 2] = stat$jscomp$7.size;
      HEAP32$jscomp$0[buf$jscomp$13 + 40 >> 2] = 4096;
      HEAP32$jscomp$0[buf$jscomp$13 + 44 >> 2] = stat$jscomp$7.blocks;
      HEAP32$jscomp$0[buf$jscomp$13 + 48 >> 2] = stat$jscomp$7.atime.getTime() / 1E3 | 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 52 >> 2] = 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 56 >> 2] = stat$jscomp$7.mtime.getTime() / 1E3 | 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 60 >> 2] = 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 64 >> 2] = stat$jscomp$7.ctime.getTime() / 1E3 | 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 68 >> 2] = 0;
      HEAP32$jscomp$0[buf$jscomp$13 + 72 >> 2] = stat$jscomp$7.ino;
      return 0;
    },
    doMsync : function(addr$jscomp$2, stream$jscomp$63, len$jscomp$10, flags$jscomp$16) {
      var buffer$jscomp$48 = new Uint8Array(HEAPU8$jscomp$0.subarray(addr$jscomp$2, addr$jscomp$2 + len$jscomp$10));
      FS$jscomp$0.msync(stream$jscomp$63, buffer$jscomp$48, 0, len$jscomp$10, flags$jscomp$16);
    },
    doMkdir : function(path$jscomp$78, mode$jscomp$49) {
      path$jscomp$78 = PATH$jscomp$0.normalize(path$jscomp$78);
      if (path$jscomp$78[path$jscomp$78.length - 1] === "/") {
        path$jscomp$78 = path$jscomp$78.substr(0, path$jscomp$78.length - 1);
      }
      FS$jscomp$0.mkdir(path$jscomp$78, mode$jscomp$49, 0);
      return 0;
    },
    doMknod : function(path$jscomp$79, mode$jscomp$50, dev$jscomp$14) {
      switch(mode$jscomp$50 & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break;
        default:
          return -ERRNO_CODES$jscomp$0.EINVAL;
      }
      FS$jscomp$0.mknod(path$jscomp$79, mode$jscomp$50, dev$jscomp$14);
      return 0;
    },
    doReadlink : function(path$jscomp$80, buf$jscomp$14, bufsize$jscomp$1) {
      if (bufsize$jscomp$1 <= 0) {
        return -ERRNO_CODES$jscomp$0.EINVAL;
      }
      var ret$jscomp$28 = FS$jscomp$0.readlink(path$jscomp$80);
      var len$jscomp$11 = Math.min(bufsize$jscomp$1, lengthBytesUTF8$jscomp$0(ret$jscomp$28));
      var endChar$jscomp$0 = HEAP8$jscomp$0[buf$jscomp$14 + len$jscomp$11];
      stringToUTF8$jscomp$0(ret$jscomp$28, buf$jscomp$14, bufsize$jscomp$1 + 1);
      HEAP8$jscomp$0[buf$jscomp$14 + len$jscomp$11] = endChar$jscomp$0;
      return len$jscomp$11;
    },
    doAccess : function(path$jscomp$81, amode$jscomp$1) {
      if (amode$jscomp$1 & ~7) {
        return -ERRNO_CODES$jscomp$0.EINVAL;
      }
      var node$jscomp$54;
      var lookup$jscomp$20 = FS$jscomp$0.lookupPath(path$jscomp$81, {
        follow : true
      });
      node$jscomp$54 = lookup$jscomp$20.node;
      var perms$jscomp$2 = "";
      if (amode$jscomp$1 & 4) {
        perms$jscomp$2 = perms$jscomp$2 + "r";
      }
      if (amode$jscomp$1 & 2) {
        perms$jscomp$2 = perms$jscomp$2 + "w";
      }
      if (amode$jscomp$1 & 1) {
        perms$jscomp$2 = perms$jscomp$2 + "x";
      }
      if (perms$jscomp$2 && FS$jscomp$0.nodePermissions(node$jscomp$54, perms$jscomp$2)) {
        return -ERRNO_CODES$jscomp$0.EACCES;
      }
      return 0;
    },
    doDup : function(path$jscomp$82, flags$jscomp$17, suggestFD$jscomp$0) {
      var suggest$jscomp$0 = FS$jscomp$0.getStream(suggestFD$jscomp$0);
      if (suggest$jscomp$0) {
        FS$jscomp$0.close(suggest$jscomp$0);
      }
      return FS$jscomp$0.open(path$jscomp$82, flags$jscomp$17, 0, suggestFD$jscomp$0, suggestFD$jscomp$0).fd;
    },
    doReadv : function(stream$jscomp$64, iov$jscomp$2, iovcnt$jscomp$2, offset$jscomp$47) {
      var ret$jscomp$29 = 0;
      var i$jscomp$74 = 0;
      for (; i$jscomp$74 < iovcnt$jscomp$2; i$jscomp$74++) {
        var ptr$jscomp$30 = HEAP32$jscomp$0[iov$jscomp$2 + i$jscomp$74 * 8 >> 2];
        var len$jscomp$12 = HEAP32$jscomp$0[iov$jscomp$2 + (i$jscomp$74 * 8 + 4) >> 2];
        var curr$jscomp$4 = FS$jscomp$0.read(stream$jscomp$64, HEAP8$jscomp$0, ptr$jscomp$30, len$jscomp$12, offset$jscomp$47);
        if (curr$jscomp$4 < 0) {
          return -1;
        }
        ret$jscomp$29 = ret$jscomp$29 + curr$jscomp$4;
        if (curr$jscomp$4 < len$jscomp$12) {
          break;
        }
      }
      return ret$jscomp$29;
    },
    doWritev : function(stream$jscomp$65, iov$jscomp$3, iovcnt$jscomp$3, offset$jscomp$48) {
      var ret$jscomp$30 = 0;
      var i$jscomp$75 = 0;
      for (; i$jscomp$75 < iovcnt$jscomp$3; i$jscomp$75++) {
        var ptr$jscomp$31 = HEAP32$jscomp$0[iov$jscomp$3 + i$jscomp$75 * 8 >> 2];
        var len$jscomp$13 = HEAP32$jscomp$0[iov$jscomp$3 + (i$jscomp$75 * 8 + 4) >> 2];
        var curr$jscomp$5 = FS$jscomp$0.write(stream$jscomp$65, HEAP8$jscomp$0, ptr$jscomp$31, len$jscomp$13, offset$jscomp$48);
        if (curr$jscomp$5 < 0) {
          return -1;
        }
        ret$jscomp$30 = ret$jscomp$30 + curr$jscomp$5;
      }
      return ret$jscomp$30;
    },
    varargs : 0,
    get : function(varargs$jscomp$31) {
      SYSCALLS$jscomp$0.varargs += 4;
      var ret$jscomp$31 = HEAP32$jscomp$0[SYSCALLS$jscomp$0.varargs - 4 >> 2];
      return ret$jscomp$31;
    },
    getStr : function() {
      var ret$jscomp$32 = Pointer_stringify$jscomp$0(SYSCALLS$jscomp$0.get());
      return ret$jscomp$32;
    },
    getStreamFromFD : function() {
      var stream$jscomp$66 = FS$jscomp$0.getStream(SYSCALLS$jscomp$0.get());
      if (!stream$jscomp$66) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      return stream$jscomp$66;
    },
    getSocketFromFD : function() {
      var socket$jscomp$0 = SOCKFS.getSocket(SYSCALLS$jscomp$0.get());
      if (!socket$jscomp$0) {
        throw new FS$jscomp$0.ErrnoError(ERRNO_CODES$jscomp$0.EBADF);
      }
      return socket$jscomp$0;
    },
    getSocketAddress : function(allowNull$jscomp$0) {
      var addrp$jscomp$0 = SYSCALLS$jscomp$0.get();
      var addrlen$jscomp$0 = SYSCALLS$jscomp$0.get();
      if (allowNull$jscomp$0 && addrp$jscomp$0 === 0) {
        return null;
      }
      var info$jscomp$11 = __read_sockaddr(addrp$jscomp$0, addrlen$jscomp$0);
      if (info$jscomp$11.errno) {
        throw new FS$jscomp$0.ErrnoError(info$jscomp$11.errno);
      }
      info$jscomp$11.addr = DNS.lookup_addr(info$jscomp$11.addr) || info$jscomp$11.addr;
      return info$jscomp$11;
    },
    get64 : function() {
      var low$jscomp$2 = SYSCALLS$jscomp$0.get();
      var high$jscomp$2 = SYSCALLS$jscomp$0.get();
      if (low$jscomp$2 >= 0) {
        assert$jscomp$0(high$jscomp$2 === 0);
      } else {
        assert$jscomp$0(high$jscomp$2 === -1);
      }
      return low$jscomp$2;
    },
    getZero : function() {
      assert$jscomp$0(SYSCALLS$jscomp$0.get() === 0);
    }
  };
  var DLFCN$jscomp$0 = {
    error : null,
    errorMsg : null,
    loadedLibs : {},
    loadedLibNames : {}
  };
  var Browser$jscomp$0 = {
    mainLoop : {
      scheduler : null,
      method : "",
      currentlyRunningMainloop : 0,
      func : null,
      arg : 0,
      timingMode : 0,
      timingValue : 0,
      currentFrameNumber : 0,
      queue : [],
      pause : function() {
        Browser$jscomp$0.mainLoop.scheduler = null;
        Browser$jscomp$0.mainLoop.currentlyRunningMainloop++;
      },
      resume : function() {
        Browser$jscomp$0.mainLoop.currentlyRunningMainloop++;
        var timingMode$jscomp$0 = Browser$jscomp$0.mainLoop.timingMode;
        var timingValue$jscomp$0 = Browser$jscomp$0.mainLoop.timingValue;
        var func$jscomp$16 = Browser$jscomp$0.mainLoop.func;
        Browser$jscomp$0.mainLoop.func = null;
        _emscripten_set_main_loop$jscomp$0(func$jscomp$16, 0, false, Browser$jscomp$0.mainLoop.arg, true);
        _emscripten_set_main_loop_timing$jscomp$0(timingMode$jscomp$0, timingValue$jscomp$0);
        Browser$jscomp$0.mainLoop.scheduler();
      },
      updateStatus : function() {
        if (Module$jscomp$0["setStatus"]) {
          var message$jscomp$24 = Module$jscomp$0["statusMessage"] || "Please wait...";
          var remaining$jscomp$1 = Browser$jscomp$0.mainLoop.remainingBlockers;
          var expected$jscomp$1 = Browser$jscomp$0.mainLoop.expectedBlockers;
          if (remaining$jscomp$1) {
            if (remaining$jscomp$1 < expected$jscomp$1) {
              Module$jscomp$0["setStatus"](message$jscomp$24 + " (" + (expected$jscomp$1 - remaining$jscomp$1) + "/" + expected$jscomp$1 + ")");
            } else {
              Module$jscomp$0["setStatus"](message$jscomp$24);
            }
          } else {
            Module$jscomp$0["setStatus"]("");
          }
        }
      },
      runIter : function(func$jscomp$17) {
        if (ABORT$jscomp$0) {
          return;
        }
        if (Module$jscomp$0["preMainLoop"]) {
          var preRet$jscomp$0 = Module$jscomp$0["preMainLoop"]();
          if (preRet$jscomp$0 === false) {
            return;
          }
        }
        try {
          func$jscomp$17();
        } catch (e$jscomp$318) {
          if (e$jscomp$318 instanceof ExitStatus$jscomp$0) {
            return;
          } else {
            if (e$jscomp$318 && typeof e$jscomp$318 === "object" && e$jscomp$318.stack) {
              err$jscomp$3("exception thrown: " + [e$jscomp$318, e$jscomp$318.stack]);
            }
            throw e$jscomp$318;
          }
        }
        if (Module$jscomp$0["postMainLoop"]) {
          Module$jscomp$0["postMainLoop"]();
        }
      }
    },
    isFullscreen : false,
    pointerLock : false,
    moduleContextCreatedCallbacks : [],
    workers : [],
    init : function() {
      function pointerLockChange$jscomp$0() {
        Browser$jscomp$0.pointerLock = document["pointerLockElement"] === Module$jscomp$0["canvas"] || document["mozPointerLockElement"] === Module$jscomp$0["canvas"] || document["webkitPointerLockElement"] === Module$jscomp$0["canvas"] || document["msPointerLockElement"] === Module$jscomp$0["canvas"];
      }
      if (!Module$jscomp$0["preloadPlugins"]) {
        Module$jscomp$0["preloadPlugins"] = [];
      }
      if (Browser$jscomp$0.initted) {
        return;
      }
      Browser$jscomp$0.initted = true;
      try {
        new Blob;
        Browser$jscomp$0.hasBlobConstructor = true;
      } catch (e$jscomp$319) {
        Browser$jscomp$0.hasBlobConstructor = false;
        console.log("warning: no blob constructor, cannot create blobs with mimetypes");
      }
      Browser$jscomp$0.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser$jscomp$0.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
      Browser$jscomp$0.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
      if (!Module$jscomp$0.noImageDecoding && typeof Browser$jscomp$0.URLObject === "undefined") {
        console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
        Module$jscomp$0.noImageDecoding = true;
      }
      var imagePlugin$jscomp$0 = {};
      imagePlugin$jscomp$0["canHandle"] = function imagePlugin_canHandle$jscomp$0(name$jscomp$111) {
        return !Module$jscomp$0.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name$jscomp$111);
      };
      imagePlugin$jscomp$0["handle"] = function imagePlugin_handle$jscomp$0(byteArray$jscomp$3, name$jscomp$112, onload$jscomp$4, onerror$jscomp$4) {
        var b$jscomp$0 = null;
        if (Browser$jscomp$0.hasBlobConstructor) {
          try {
            b$jscomp$0 = new Blob([byteArray$jscomp$3], {
              type : Browser$jscomp$0.getMimetype(name$jscomp$112)
            });
            if (b$jscomp$0.size !== byteArray$jscomp$3.length) {
              b$jscomp$0 = new Blob([(new Uint8Array(byteArray$jscomp$3)).buffer], {
                type : Browser$jscomp$0.getMimetype(name$jscomp$112)
              });
            }
          } catch (e$jscomp$320) {
            warnOnce$jscomp$0("Blob constructor present but fails: " + e$jscomp$320 + "; falling back to blob builder");
          }
        }
        if (!b$jscomp$0) {
          var bb$jscomp$0 = new Browser$jscomp$0.BlobBuilder;
          bb$jscomp$0.append((new Uint8Array(byteArray$jscomp$3)).buffer);
          b$jscomp$0 = bb$jscomp$0.getBlob();
        }
        var url$jscomp$26 = Browser$jscomp$0.URLObject.createObjectURL(b$jscomp$0);
        var img$jscomp$2 = new Image;
        img$jscomp$2.onload = function img_onload$jscomp$0() {
          assert$jscomp$0(img$jscomp$2.complete, "Image " + name$jscomp$112 + " could not be decoded");
          var canvas$jscomp$6 = document.createElement("canvas");
          canvas$jscomp$6.width = img$jscomp$2.width;
          canvas$jscomp$6.height = img$jscomp$2.height;
          var ctx$jscomp$0 = canvas$jscomp$6.getContext("2d");
          ctx$jscomp$0.drawImage(img$jscomp$2, 0, 0);
          Module$jscomp$0["preloadedImages"][name$jscomp$112] = canvas$jscomp$6;
          Browser$jscomp$0.URLObject.revokeObjectURL(url$jscomp$26);
          if (onload$jscomp$4) {
            onload$jscomp$4(byteArray$jscomp$3);
          }
        };
        img$jscomp$2.onerror = function img_onerror$jscomp$0(event$jscomp$3) {
          console.log("Image " + url$jscomp$26 + " could not be decoded");
          if (onerror$jscomp$4) {
            onerror$jscomp$4();
          }
        };
        img$jscomp$2.src = url$jscomp$26;
      };
      Module$jscomp$0["preloadPlugins"].push(imagePlugin$jscomp$0);
      var audioPlugin$jscomp$0 = {};
      audioPlugin$jscomp$0["canHandle"] = function audioPlugin_canHandle$jscomp$0(name$jscomp$113) {
        return !Module$jscomp$0.noAudioDecoding && name$jscomp$113.substr(-4) in {
          ".ogg" : 1,
          ".wav" : 1,
          ".mp3" : 1
        };
      };
      audioPlugin$jscomp$0["handle"] = function audioPlugin_handle$jscomp$0(byteArray$jscomp$4, name$jscomp$114, onload$jscomp$5, onerror$jscomp$5) {
        function finish$jscomp$3(audio$jscomp$1) {
          if (done$jscomp$2) {
            return;
          }
          done$jscomp$2 = true;
          Module$jscomp$0["preloadedAudios"][name$jscomp$114] = audio$jscomp$1;
          if (onload$jscomp$5) {
            onload$jscomp$5(byteArray$jscomp$4);
          }
        }
        function fail$jscomp$4() {
          if (done$jscomp$2) {
            return;
          }
          done$jscomp$2 = true;
          Module$jscomp$0["preloadedAudios"][name$jscomp$114] = new Audio;
          if (onerror$jscomp$5) {
            onerror$jscomp$5();
          }
        }
        var done$jscomp$2 = false;
        if (Browser$jscomp$0.hasBlobConstructor) {
          try {
            var b$jscomp$1 = new Blob([byteArray$jscomp$4], {
              type : Browser$jscomp$0.getMimetype(name$jscomp$114)
            });
          } catch (e$jscomp$321) {
            return fail$jscomp$4();
          }
          var url$jscomp$27 = Browser$jscomp$0.URLObject.createObjectURL(b$jscomp$1);
          var audio$jscomp$0 = new Audio;
          audio$jscomp$0.addEventListener("canplaythrough", function() {
            finish$jscomp$3(audio$jscomp$0);
          }, false);
          audio$jscomp$0.onerror = function audio_onerror$jscomp$0(event$jscomp$4) {
            function encode64$jscomp$0(data$jscomp$45) {
              var BASE$jscomp$0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
              var PAD$jscomp$0 = "=";
              var ret$jscomp$33 = "";
              var leftchar$jscomp$0 = 0;
              var leftbits$jscomp$0 = 0;
              var i$jscomp$76 = 0;
              for (; i$jscomp$76 < data$jscomp$45.length; i$jscomp$76++) {
                leftchar$jscomp$0 = leftchar$jscomp$0 << 8 | data$jscomp$45[i$jscomp$76];
                leftbits$jscomp$0 = leftbits$jscomp$0 + 8;
                for (; leftbits$jscomp$0 >= 6;) {
                  var curr$jscomp$6 = leftchar$jscomp$0 >> leftbits$jscomp$0 - 6 & 63;
                  leftbits$jscomp$0 = leftbits$jscomp$0 - 6;
                  ret$jscomp$33 = ret$jscomp$33 + BASE$jscomp$0[curr$jscomp$6];
                }
              }
              if (leftbits$jscomp$0 == 2) {
                ret$jscomp$33 = ret$jscomp$33 + BASE$jscomp$0[(leftchar$jscomp$0 & 3) << 4];
                ret$jscomp$33 = ret$jscomp$33 + (PAD$jscomp$0 + PAD$jscomp$0);
              } else {
                if (leftbits$jscomp$0 == 4) {
                  ret$jscomp$33 = ret$jscomp$33 + BASE$jscomp$0[(leftchar$jscomp$0 & 15) << 2];
                  ret$jscomp$33 = ret$jscomp$33 + PAD$jscomp$0;
                }
              }
              return ret$jscomp$33;
            }
            if (done$jscomp$2) {
              return;
            }
            console.log("warning: browser could not fully decode audio " + name$jscomp$114 + ", trying slower base64 approach");
            audio$jscomp$0.src = "data:audio/x-" + name$jscomp$114.substr(-3) + ";base64," + encode64$jscomp$0(byteArray$jscomp$4);
            finish$jscomp$3(audio$jscomp$0);
          };
          audio$jscomp$0.src = url$jscomp$27;
          Browser$jscomp$0.safeSetTimeout(function() {
            finish$jscomp$3(audio$jscomp$0);
          }, 1E4);
        } else {
          return fail$jscomp$4();
        }
      };
      Module$jscomp$0["preloadPlugins"].push(audioPlugin$jscomp$0);
      var canvas$jscomp$5 = Module$jscomp$0["canvas"];
      if (canvas$jscomp$5) {
        canvas$jscomp$5.requestPointerLock = canvas$jscomp$5["requestPointerLock"] || canvas$jscomp$5["mozRequestPointerLock"] || canvas$jscomp$5["webkitRequestPointerLock"] || canvas$jscomp$5["msRequestPointerLock"] || function() {
        };
        canvas$jscomp$5.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function() {
        };
        canvas$jscomp$5.exitPointerLock = canvas$jscomp$5.exitPointerLock.bind(document);
        document.addEventListener("pointerlockchange", pointerLockChange$jscomp$0, false);
        document.addEventListener("mozpointerlockchange", pointerLockChange$jscomp$0, false);
        document.addEventListener("webkitpointerlockchange", pointerLockChange$jscomp$0, false);
        document.addEventListener("mspointerlockchange", pointerLockChange$jscomp$0, false);
        if (Module$jscomp$0["elementPointerLock"]) {
          canvas$jscomp$5.addEventListener("click", function(ev$jscomp$0) {
            if (!Browser$jscomp$0.pointerLock && Module$jscomp$0["canvas"].requestPointerLock) {
              Module$jscomp$0["canvas"].requestPointerLock();
              ev$jscomp$0.preventDefault();
            }
          }, false);
        }
      }
    },
    createContext : function(canvas$jscomp$7, useWebGL$jscomp$0, setInModule$jscomp$0, webGLContextAttributes$jscomp$0) {
      if (useWebGL$jscomp$0 && Module$jscomp$0.ctx && canvas$jscomp$7 == Module$jscomp$0.canvas) {
        return Module$jscomp$0.ctx;
      }
      var ctx$jscomp$1;
      var contextHandle$jscomp$4;
      if (useWebGL$jscomp$0) {
        var contextAttributes$jscomp$1 = {
          antialias : false,
          alpha : false
        };
        if (webGLContextAttributes$jscomp$0) {
          var attribute$jscomp$0;
          for (attribute$jscomp$0 in webGLContextAttributes$jscomp$0) {
            contextAttributes$jscomp$1[attribute$jscomp$0] = webGLContextAttributes$jscomp$0[attribute$jscomp$0];
          }
        }
        contextHandle$jscomp$4 = GL$jscomp$0.createContext(canvas$jscomp$7, contextAttributes$jscomp$1);
        if (contextHandle$jscomp$4) {
          ctx$jscomp$1 = GL$jscomp$0.getContext(contextHandle$jscomp$4).GLctx;
        }
      } else {
        ctx$jscomp$1 = canvas$jscomp$7.getContext("2d");
      }
      if (!ctx$jscomp$1) {
        return null;
      }
      if (setInModule$jscomp$0) {
        if (!useWebGL$jscomp$0) {
          assert$jscomp$0(typeof GLctx$jscomp$0 === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
        }
        Module$jscomp$0.ctx = ctx$jscomp$1;
        if (useWebGL$jscomp$0) {
          GL$jscomp$0.makeContextCurrent(contextHandle$jscomp$4);
        }
        Module$jscomp$0.useWebGL = useWebGL$jscomp$0;
        Browser$jscomp$0.moduleContextCreatedCallbacks.forEach(function(callback$jscomp$59) {
          callback$jscomp$59();
        });
        Browser$jscomp$0.init();
      }
      return ctx$jscomp$1;
    },
    destroyContext : function(canvas$jscomp$8, useWebGL$jscomp$1, setInModule$jscomp$1) {
    },
    fullscreenHandlersInstalled : false,
    lockPointer : undefined,
    resizeCanvas : undefined,
    requestFullscreen : function(lockPointer$jscomp$0, resizeCanvas$jscomp$0, vrDevice$jscomp$0) {
      function fullscreenChange$jscomp$0() {
        Browser$jscomp$0.isFullscreen = false;
        var canvasContainer$jscomp$1 = canvas$jscomp$9.parentNode;
        if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer$jscomp$1) {
          canvas$jscomp$9.exitFullscreen = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {
          };
          canvas$jscomp$9.exitFullscreen = canvas$jscomp$9.exitFullscreen.bind(document);
          if (Browser$jscomp$0.lockPointer) {
            canvas$jscomp$9.requestPointerLock();
          }
          Browser$jscomp$0.isFullscreen = true;
          if (Browser$jscomp$0.resizeCanvas) {
            Browser$jscomp$0.setFullscreenCanvasSize();
          } else {
            Browser$jscomp$0.updateCanvasDimensions(canvas$jscomp$9);
          }
        } else {
          canvasContainer$jscomp$1.parentNode.insertBefore(canvas$jscomp$9, canvasContainer$jscomp$1);
          canvasContainer$jscomp$1.parentNode.removeChild(canvasContainer$jscomp$1);
          if (Browser$jscomp$0.resizeCanvas) {
            Browser$jscomp$0.setWindowedCanvasSize();
          } else {
            Browser$jscomp$0.updateCanvasDimensions(canvas$jscomp$9);
          }
        }
        if (Module$jscomp$0["onFullScreen"]) {
          Module$jscomp$0["onFullScreen"](Browser$jscomp$0.isFullscreen);
        }
        if (Module$jscomp$0["onFullscreen"]) {
          Module$jscomp$0["onFullscreen"](Browser$jscomp$0.isFullscreen);
        }
      }
      Browser$jscomp$0.lockPointer = lockPointer$jscomp$0;
      Browser$jscomp$0.resizeCanvas = resizeCanvas$jscomp$0;
      Browser$jscomp$0.vrDevice = vrDevice$jscomp$0;
      if (typeof Browser$jscomp$0.lockPointer === "undefined") {
        Browser$jscomp$0.lockPointer = true;
      }
      if (typeof Browser$jscomp$0.resizeCanvas === "undefined") {
        Browser$jscomp$0.resizeCanvas = false;
      }
      if (typeof Browser$jscomp$0.vrDevice === "undefined") {
        Browser$jscomp$0.vrDevice = null;
      }
      var canvas$jscomp$9 = Module$jscomp$0["canvas"];
      if (!Browser$jscomp$0.fullscreenHandlersInstalled) {
        Browser$jscomp$0.fullscreenHandlersInstalled = true;
        document.addEventListener("fullscreenchange", fullscreenChange$jscomp$0, false);
        document.addEventListener("mozfullscreenchange", fullscreenChange$jscomp$0, false);
        document.addEventListener("webkitfullscreenchange", fullscreenChange$jscomp$0, false);
        document.addEventListener("MSFullscreenChange", fullscreenChange$jscomp$0, false);
      }
      var canvasContainer$jscomp$0 = document.createElement("div");
      canvas$jscomp$9.parentNode.insertBefore(canvasContainer$jscomp$0, canvas$jscomp$9);
      canvasContainer$jscomp$0.appendChild(canvas$jscomp$9);
      canvasContainer$jscomp$0.requestFullscreen = canvasContainer$jscomp$0["requestFullscreen"] || canvasContainer$jscomp$0["mozRequestFullScreen"] || canvasContainer$jscomp$0["msRequestFullscreen"] || (canvasContainer$jscomp$0["webkitRequestFullscreen"] ? function() {
        canvasContainer$jscomp$0["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
      } : null) || (canvasContainer$jscomp$0["webkitRequestFullScreen"] ? function() {
        canvasContainer$jscomp$0["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
      } : null);
      if (vrDevice$jscomp$0) {
        canvasContainer$jscomp$0.requestFullscreen({
          vrDisplay : vrDevice$jscomp$0
        });
      } else {
        canvasContainer$jscomp$0.requestFullscreen();
      }
    },
    requestFullScreen : function(lockPointer$jscomp$1, resizeCanvas$jscomp$1, vrDevice$jscomp$1) {
      err$jscomp$3("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
      Browser$jscomp$0.requestFullScreen = function(lockPointer$jscomp$2, resizeCanvas$jscomp$2, vrDevice$jscomp$2) {
        return Browser$jscomp$0.requestFullscreen(lockPointer$jscomp$2, resizeCanvas$jscomp$2, vrDevice$jscomp$2);
      };
      return Browser$jscomp$0.requestFullscreen(lockPointer$jscomp$1, resizeCanvas$jscomp$1, vrDevice$jscomp$1);
    },
    nextRAF : 0,
    fakeRequestAnimationFrame : function(func$jscomp$18) {
      var now$jscomp$2 = Date.now();
      if (Browser$jscomp$0.nextRAF === 0) {
        Browser$jscomp$0.nextRAF = now$jscomp$2 + 1E3 / 60;
      } else {
        for (; now$jscomp$2 + 2 >= Browser$jscomp$0.nextRAF;) {
          Browser$jscomp$0.nextRAF += 1E3 / 60;
        }
      }
      var delay$jscomp$3 = Math.max(Browser$jscomp$0.nextRAF - now$jscomp$2, 0);
      setTimeout(func$jscomp$18, delay$jscomp$3);
    },
    requestAnimationFrame : function requestAnimationFrame$jscomp$1(func$jscomp$19) {
      if (typeof window === "undefined") {
        Browser$jscomp$0.fakeRequestAnimationFrame(func$jscomp$19);
      } else {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = window["requestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["msRequestAnimationFrame"] || window["oRequestAnimationFrame"] || Browser$jscomp$0.fakeRequestAnimationFrame;
        }
        window.requestAnimationFrame(func$jscomp$19);
      }
    },
    safeCallback : function(func$jscomp$20) {
      return function() {
        if (!ABORT$jscomp$0) {
          return func$jscomp$20.apply(null, arguments);
        }
      };
    },
    allowAsyncCallbacks : true,
    queuedAsyncCallbacks : [],
    pauseAsyncCallbacks : function() {
      Browser$jscomp$0.allowAsyncCallbacks = false;
    },
    resumeAsyncCallbacks : function() {
      Browser$jscomp$0.allowAsyncCallbacks = true;
      if (Browser$jscomp$0.queuedAsyncCallbacks.length > 0) {
        var callbacks$jscomp$1 = Browser$jscomp$0.queuedAsyncCallbacks;
        Browser$jscomp$0.queuedAsyncCallbacks = [];
        callbacks$jscomp$1.forEach(function(func$jscomp$21) {
          func$jscomp$21();
        });
      }
    },
    safeRequestAnimationFrame : function(func$jscomp$22) {
      return Browser$jscomp$0.requestAnimationFrame(function() {
        if (ABORT$jscomp$0) {
          return;
        }
        if (Browser$jscomp$0.allowAsyncCallbacks) {
          func$jscomp$22();
        } else {
          Browser$jscomp$0.queuedAsyncCallbacks.push(func$jscomp$22);
        }
      });
    },
    safeSetTimeout : function(func$jscomp$23, timeout$jscomp$3) {
      Module$jscomp$0["noExitRuntime"] = true;
      return setTimeout(function() {
        if (ABORT$jscomp$0) {
          return;
        }
        if (Browser$jscomp$0.allowAsyncCallbacks) {
          func$jscomp$23();
        } else {
          Browser$jscomp$0.queuedAsyncCallbacks.push(func$jscomp$23);
        }
      }, timeout$jscomp$3);
    },
    safeSetInterval : function(func$jscomp$24, timeout$jscomp$4) {
      Module$jscomp$0["noExitRuntime"] = true;
      return setInterval(function() {
        if (ABORT$jscomp$0) {
          return;
        }
        if (Browser$jscomp$0.allowAsyncCallbacks) {
          func$jscomp$24();
        }
      }, timeout$jscomp$4);
    },
    getMimetype : function(name$jscomp$115) {
      return {
        "jpg" : "image/jpeg",
        "jpeg" : "image/jpeg",
        "png" : "image/png",
        "bmp" : "image/bmp",
        "ogg" : "audio/ogg",
        "wav" : "audio/wav",
        "mp3" : "audio/mpeg"
      }[name$jscomp$115.substr(name$jscomp$115.lastIndexOf(".") + 1)];
    },
    getUserMedia : function(func$jscomp$25) {
      if (!window.getUserMedia) {
        window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
      }
      window.getUserMedia(func$jscomp$25);
    },
    getMovementX : function(event$jscomp$5) {
      return event$jscomp$5["movementX"] || event$jscomp$5["mozMovementX"] || event$jscomp$5["webkitMovementX"] || 0;
    },
    getMovementY : function(event$jscomp$6) {
      return event$jscomp$6["movementY"] || event$jscomp$6["mozMovementY"] || event$jscomp$6["webkitMovementY"] || 0;
    },
    getMouseWheelDelta : function(event$jscomp$7) {
      var delta$jscomp$1 = 0;
      switch(event$jscomp$7.type) {
        case "DOMMouseScroll":
          delta$jscomp$1 = event$jscomp$7.detail;
          break;
        case "mousewheel":
          delta$jscomp$1 = event$jscomp$7.wheelDelta;
          break;
        case "wheel":
          delta$jscomp$1 = event$jscomp$7["deltaY"];
          break;
        default:
          throw "unrecognized mouse wheel event: " + event$jscomp$7.type;
      }
      return delta$jscomp$1;
    },
    mouseX : 0,
    mouseY : 0,
    mouseMovementX : 0,
    mouseMovementY : 0,
    touches : {},
    lastTouches : {},
    calculateMouseEvent : function(event$jscomp$8) {
      if (Browser$jscomp$0.pointerLock) {
        if (event$jscomp$8.type != "mousemove" && "mozMovementX" in event$jscomp$8) {
          Browser$jscomp$0.mouseMovementX = Browser$jscomp$0.mouseMovementY = 0;
        } else {
          Browser$jscomp$0.mouseMovementX = Browser$jscomp$0.getMovementX(event$jscomp$8);
          Browser$jscomp$0.mouseMovementY = Browser$jscomp$0.getMovementY(event$jscomp$8);
        }
        if (typeof SDL != "undefined") {
          Browser$jscomp$0.mouseX = SDL.mouseX + Browser$jscomp$0.mouseMovementX;
          Browser$jscomp$0.mouseY = SDL.mouseY + Browser$jscomp$0.mouseMovementY;
        } else {
          Browser$jscomp$0.mouseX += Browser$jscomp$0.mouseMovementX;
          Browser$jscomp$0.mouseY += Browser$jscomp$0.mouseMovementY;
        }
      } else {
        var rect$jscomp$0 = Module$jscomp$0["canvas"].getBoundingClientRect();
        var cw$jscomp$0 = Module$jscomp$0["canvas"].width;
        var ch$jscomp$1 = Module$jscomp$0["canvas"].height;
        var scrollX$jscomp$0 = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
        var scrollY$jscomp$0 = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
        if (event$jscomp$8.type === "touchstart" || event$jscomp$8.type === "touchend" || event$jscomp$8.type === "touchmove") {
          var touch$jscomp$0 = event$jscomp$8.touch;
          if (touch$jscomp$0 === undefined) {
            return;
          }
          var adjustedX$jscomp$0 = touch$jscomp$0.pageX - (scrollX$jscomp$0 + rect$jscomp$0.left);
          var adjustedY$jscomp$0 = touch$jscomp$0.pageY - (scrollY$jscomp$0 + rect$jscomp$0.top);
          adjustedX$jscomp$0 = adjustedX$jscomp$0 * (cw$jscomp$0 / rect$jscomp$0.width);
          adjustedY$jscomp$0 = adjustedY$jscomp$0 * (ch$jscomp$1 / rect$jscomp$0.height);
          var coords$jscomp$0 = {
            x : adjustedX$jscomp$0,
            y : adjustedY$jscomp$0
          };
          if (event$jscomp$8.type === "touchstart") {
            Browser$jscomp$0.lastTouches[touch$jscomp$0.identifier] = coords$jscomp$0;
            Browser$jscomp$0.touches[touch$jscomp$0.identifier] = coords$jscomp$0;
          } else {
            if (event$jscomp$8.type === "touchend" || event$jscomp$8.type === "touchmove") {
              var last$jscomp$1 = Browser$jscomp$0.touches[touch$jscomp$0.identifier];
              if (!last$jscomp$1) {
                last$jscomp$1 = coords$jscomp$0;
              }
              Browser$jscomp$0.lastTouches[touch$jscomp$0.identifier] = last$jscomp$1;
              Browser$jscomp$0.touches[touch$jscomp$0.identifier] = coords$jscomp$0;
            }
          }
          return;
        }
        var x$jscomp$88 = event$jscomp$8.pageX - (scrollX$jscomp$0 + rect$jscomp$0.left);
        var y$jscomp$67 = event$jscomp$8.pageY - (scrollY$jscomp$0 + rect$jscomp$0.top);
        x$jscomp$88 = x$jscomp$88 * (cw$jscomp$0 / rect$jscomp$0.width);
        y$jscomp$67 = y$jscomp$67 * (ch$jscomp$1 / rect$jscomp$0.height);
        Browser$jscomp$0.mouseMovementX = x$jscomp$88 - Browser$jscomp$0.mouseX;
        Browser$jscomp$0.mouseMovementY = y$jscomp$67 - Browser$jscomp$0.mouseY;
        Browser$jscomp$0.mouseX = x$jscomp$88;
        Browser$jscomp$0.mouseY = y$jscomp$67;
      }
    },
    asyncLoad : function(url$jscomp$28, onload$jscomp$6, onerror$jscomp$6, noRunDep$jscomp$0) {
      var dep$jscomp$1 = !noRunDep$jscomp$0 ? getUniqueRunDependency$jscomp$0("al " + url$jscomp$28) : "";
      Module$jscomp$0["readAsync"](url$jscomp$28, function(arrayBuffer$jscomp$1) {
        assert$jscomp$0(arrayBuffer$jscomp$1, 'Loading data file "' + url$jscomp$28 + '" failed (no arrayBuffer).');
        onload$jscomp$6(new Uint8Array(arrayBuffer$jscomp$1));
        if (dep$jscomp$1) {
          removeRunDependency$jscomp$0(dep$jscomp$1);
        }
      }, function(event$jscomp$9) {
        if (onerror$jscomp$6) {
          onerror$jscomp$6();
        } else {
          throw 'Loading data file "' + url$jscomp$28 + '" failed.';
        }
      });
      if (dep$jscomp$1) {
        addRunDependency$jscomp$0(dep$jscomp$1);
      }
    },
    resizeListeners : [],
    updateResizeListeners : function() {
      var canvas$jscomp$10 = Module$jscomp$0["canvas"];
      Browser$jscomp$0.resizeListeners.forEach(function(listener$jscomp$54) {
        listener$jscomp$54(canvas$jscomp$10.width, canvas$jscomp$10.height);
      });
    },
    setCanvasSize : function(width$jscomp$29, height$jscomp$27, noUpdates$jscomp$0) {
      var canvas$jscomp$11 = Module$jscomp$0["canvas"];
      Browser$jscomp$0.updateCanvasDimensions(canvas$jscomp$11, width$jscomp$29, height$jscomp$27);
      if (!noUpdates$jscomp$0) {
        Browser$jscomp$0.updateResizeListeners();
      }
    },
    windowedWidth : 0,
    windowedHeight : 0,
    setFullscreenCanvasSize : function() {
      if (typeof SDL != "undefined") {
        var flags$jscomp$18 = HEAPU32$jscomp$0[SDL.screen >> 2];
        flags$jscomp$18 = flags$jscomp$18 | 8388608;
        HEAP32$jscomp$0[SDL.screen >> 2] = flags$jscomp$18;
      }
      Browser$jscomp$0.updateCanvasDimensions(Module$jscomp$0["canvas"]);
      Browser$jscomp$0.updateResizeListeners();
    },
    setWindowedCanvasSize : function() {
      if (typeof SDL != "undefined") {
        var flags$jscomp$19 = HEAPU32$jscomp$0[SDL.screen >> 2];
        flags$jscomp$19 = flags$jscomp$19 & ~8388608;
        HEAP32$jscomp$0[SDL.screen >> 2] = flags$jscomp$19;
      }
      Browser$jscomp$0.updateCanvasDimensions(Module$jscomp$0["canvas"]);
      Browser$jscomp$0.updateResizeListeners();
    },
    updateCanvasDimensions : function(canvas$jscomp$12, wNative$jscomp$0, hNative$jscomp$0) {
      if (wNative$jscomp$0 && hNative$jscomp$0) {
        canvas$jscomp$12.widthNative = wNative$jscomp$0;
        canvas$jscomp$12.heightNative = hNative$jscomp$0;
      } else {
        wNative$jscomp$0 = canvas$jscomp$12.widthNative;
        hNative$jscomp$0 = canvas$jscomp$12.heightNative;
      }
      var w$jscomp$9 = wNative$jscomp$0;
      var h$jscomp$9 = hNative$jscomp$0;
      if (Module$jscomp$0["forcedAspectRatio"] && Module$jscomp$0["forcedAspectRatio"] > 0) {
        if (w$jscomp$9 / h$jscomp$9 < Module$jscomp$0["forcedAspectRatio"]) {
          w$jscomp$9 = Math.round(h$jscomp$9 * Module$jscomp$0["forcedAspectRatio"]);
        } else {
          h$jscomp$9 = Math.round(w$jscomp$9 / Module$jscomp$0["forcedAspectRatio"]);
        }
      }
      if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas$jscomp$12.parentNode && typeof screen != "undefined") {
        var factor$jscomp$2 = Math.min(screen.width / w$jscomp$9, screen.height / h$jscomp$9);
        w$jscomp$9 = Math.round(w$jscomp$9 * factor$jscomp$2);
        h$jscomp$9 = Math.round(h$jscomp$9 * factor$jscomp$2);
      }
      if (Browser$jscomp$0.resizeCanvas) {
        if (canvas$jscomp$12.width != w$jscomp$9) {
          canvas$jscomp$12.width = w$jscomp$9;
        }
        if (canvas$jscomp$12.height != h$jscomp$9) {
          canvas$jscomp$12.height = h$jscomp$9;
        }
        if (typeof canvas$jscomp$12.style != "undefined") {
          canvas$jscomp$12.style.removeProperty("width");
          canvas$jscomp$12.style.removeProperty("height");
        }
      } else {
        if (canvas$jscomp$12.width != wNative$jscomp$0) {
          canvas$jscomp$12.width = wNative$jscomp$0;
        }
        if (canvas$jscomp$12.height != hNative$jscomp$0) {
          canvas$jscomp$12.height = hNative$jscomp$0;
        }
        if (typeof canvas$jscomp$12.style != "undefined") {
          if (w$jscomp$9 != wNative$jscomp$0 || h$jscomp$9 != hNative$jscomp$0) {
            canvas$jscomp$12.style.setProperty("width", w$jscomp$9 + "px", "important");
            canvas$jscomp$12.style.setProperty("height", h$jscomp$9 + "px", "important");
          } else {
            canvas$jscomp$12.style.removeProperty("width");
            canvas$jscomp$12.style.removeProperty("height");
          }
        }
      }
    },
    wgetRequests : {},
    nextWgetRequestHandle : 0,
    getNextWgetRequestHandle : function() {
      var handle$jscomp$14 = Browser$jscomp$0.nextWgetRequestHandle;
      Browser$jscomp$0.nextWgetRequestHandle++;
      return handle$jscomp$14;
    }
  };
  var JSEvents$jscomp$0 = {
    keyEvent : 0,
    mouseEvent : 0,
    wheelEvent : 0,
    uiEvent : 0,
    focusEvent : 0,
    deviceOrientationEvent : 0,
    deviceMotionEvent : 0,
    fullscreenChangeEvent : 0,
    pointerlockChangeEvent : 0,
    visibilityChangeEvent : 0,
    touchEvent : 0,
    lastGamepadState : null,
    lastGamepadStateFrame : null,
    numGamepadsConnected : 0,
    previousFullscreenElement : null,
    previousScreenX : null,
    previousScreenY : null,
    removeEventListenersRegistered : false,
    _onGamepadConnected : function() {
      ++JSEvents$jscomp$0.numGamepadsConnected;
    },
    _onGamepadDisconnected : function() {
      --JSEvents$jscomp$0.numGamepadsConnected;
    },
    staticInit : function() {
      if (typeof window !== "undefined") {
        window.addEventListener("gamepadconnected", JSEvents$jscomp$0._onGamepadConnected);
        window.addEventListener("gamepaddisconnected", JSEvents$jscomp$0._onGamepadDisconnected);
        var firstState$jscomp$0 = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null;
        if (firstState$jscomp$0) {
          JSEvents$jscomp$0.numGamepadsConnected = firstState$jscomp$0.length;
        }
      }
    },
    removeAllEventListeners : function() {
      var i$jscomp$77 = JSEvents$jscomp$0.eventHandlers.length - 1;
      for (; i$jscomp$77 >= 0; --i$jscomp$77) {
        JSEvents$jscomp$0._removeHandler(i$jscomp$77);
      }
      JSEvents$jscomp$0.eventHandlers = [];
      JSEvents$jscomp$0.deferredCalls = [];
      window.removeEventListener("gamepadconnected", JSEvents$jscomp$0._onGamepadConnected);
      window.removeEventListener("gamepaddisconnected", JSEvents$jscomp$0._onGamepadDisconnected);
    },
    registerRemoveEventListeners : function() {
      if (!JSEvents$jscomp$0.removeEventListenersRegistered) {
        __ATEXIT__$jscomp$0.push(JSEvents$jscomp$0.removeAllEventListeners);
        JSEvents$jscomp$0.removeEventListenersRegistered = true;
      }
    },
    findEventTarget : function(target$jscomp$119) {
      try {
        if (!target$jscomp$119) {
          return window;
        }
        if (typeof target$jscomp$119 === "number") {
          target$jscomp$119 = Pointer_stringify$jscomp$0(target$jscomp$119);
        }
        if (target$jscomp$119 === "#window") {
          return window;
        } else {
          if (target$jscomp$119 === "#document") {
            return document;
          } else {
            if (target$jscomp$119 === "#screen") {
              return window.screen;
            } else {
              if (target$jscomp$119 === "#canvas") {
                return Module$jscomp$0["canvas"];
              }
            }
          }
        }
        return typeof target$jscomp$119 === "string" ? document.getElementById(target$jscomp$119) : target$jscomp$119;
      } catch (e$jscomp$322) {
        return null;
      }
    },
    findCanvasEventTarget : function(target$jscomp$120) {
      if (typeof target$jscomp$120 === "number") {
        target$jscomp$120 = Pointer_stringify$jscomp$0(target$jscomp$120);
      }
      if (!target$jscomp$120 || target$jscomp$120 === "#canvas") {
        if (typeof GL$jscomp$0 !== "undefined" && GL$jscomp$0.offscreenCanvases["canvas"]) {
          return GL$jscomp$0.offscreenCanvases["canvas"];
        }
        return Module$jscomp$0["canvas"];
      }
      if (typeof GL$jscomp$0 !== "undefined" && GL$jscomp$0.offscreenCanvases[target$jscomp$120]) {
        return GL$jscomp$0.offscreenCanvases[target$jscomp$120];
      }
      return JSEvents$jscomp$0.findEventTarget(target$jscomp$120);
    },
    deferredCalls : [],
    deferCall : function(targetFunction$jscomp$0, precedence$jscomp$0, argsList$jscomp$0) {
      function arraysHaveEqualContent$jscomp$0(arrA$jscomp$0, arrB$jscomp$0) {
        if (arrA$jscomp$0.length != arrB$jscomp$0.length) {
          return false;
        }
        var i$jscomp$79;
        for (i$jscomp$79 in arrA$jscomp$0) {
          if (arrA$jscomp$0[i$jscomp$79] != arrB$jscomp$0[i$jscomp$79]) {
            return false;
          }
        }
        return true;
      }
      var i$jscomp$78;
      for (i$jscomp$78 in JSEvents$jscomp$0.deferredCalls) {
        var call$jscomp$0 = JSEvents$jscomp$0.deferredCalls[i$jscomp$78];
        if (call$jscomp$0.targetFunction == targetFunction$jscomp$0 && arraysHaveEqualContent$jscomp$0(call$jscomp$0.argsList, argsList$jscomp$0)) {
          return;
        }
      }
      JSEvents$jscomp$0.deferredCalls.push({
        targetFunction : targetFunction$jscomp$0,
        precedence : precedence$jscomp$0,
        argsList : argsList$jscomp$0
      });
      JSEvents$jscomp$0.deferredCalls.sort(function(x$jscomp$89, y$jscomp$68) {
        return x$jscomp$89.precedence < y$jscomp$68.precedence;
      });
    },
    removeDeferredCalls : function(targetFunction$jscomp$1) {
      var i$jscomp$80 = 0;
      for (; i$jscomp$80 < JSEvents$jscomp$0.deferredCalls.length; ++i$jscomp$80) {
        if (JSEvents$jscomp$0.deferredCalls[i$jscomp$80].targetFunction == targetFunction$jscomp$1) {
          JSEvents$jscomp$0.deferredCalls.splice(i$jscomp$80, 1);
          --i$jscomp$80;
        }
      }
    },
    canPerformEventHandlerRequests : function() {
      return JSEvents$jscomp$0.inEventHandler && JSEvents$jscomp$0.currentEventHandler.allowsDeferredCalls;
    },
    runDeferredCalls : function() {
      if (!JSEvents$jscomp$0.canPerformEventHandlerRequests()) {
        return;
      }
      var i$jscomp$81 = 0;
      for (; i$jscomp$81 < JSEvents$jscomp$0.deferredCalls.length; ++i$jscomp$81) {
        var call$jscomp$1 = JSEvents$jscomp$0.deferredCalls[i$jscomp$81];
        JSEvents$jscomp$0.deferredCalls.splice(i$jscomp$81, 1);
        --i$jscomp$81;
        call$jscomp$1.targetFunction.apply(this, call$jscomp$1.argsList);
      }
    },
    inEventHandler : 0,
    currentEventHandler : null,
    eventHandlers : [],
    isInternetExplorer : function() {
      return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0;
    },
    removeAllHandlersOnTarget : function(target$jscomp$121, eventTypeString$jscomp$0) {
      var i$jscomp$82 = 0;
      for (; i$jscomp$82 < JSEvents$jscomp$0.eventHandlers.length; ++i$jscomp$82) {
        if (JSEvents$jscomp$0.eventHandlers[i$jscomp$82].target == target$jscomp$121 && (!eventTypeString$jscomp$0 || eventTypeString$jscomp$0 == JSEvents$jscomp$0.eventHandlers[i$jscomp$82].eventTypeString)) {
          JSEvents$jscomp$0._removeHandler(i$jscomp$82--);
        }
      }
    },
    _removeHandler : function(i$jscomp$83) {
      var h$jscomp$10 = JSEvents$jscomp$0.eventHandlers[i$jscomp$83];
      h$jscomp$10.target.removeEventListener(h$jscomp$10.eventTypeString, h$jscomp$10.eventListenerFunc, h$jscomp$10.useCapture);
      JSEvents$jscomp$0.eventHandlers.splice(i$jscomp$83, 1);
    },
    registerOrRemoveHandler : function(eventHandler$jscomp$0) {
      var jsEventHandler$jscomp$0 = function jsEventHandler$jscomp$1(event$jscomp$10) {
        ++JSEvents$jscomp$0.inEventHandler;
        JSEvents$jscomp$0.currentEventHandler = eventHandler$jscomp$0;
        JSEvents$jscomp$0.runDeferredCalls();
        eventHandler$jscomp$0.handlerFunc(event$jscomp$10);
        JSEvents$jscomp$0.runDeferredCalls();
        --JSEvents$jscomp$0.inEventHandler;
      };
      if (eventHandler$jscomp$0.callbackfunc) {
        eventHandler$jscomp$0.eventListenerFunc = jsEventHandler$jscomp$0;
        eventHandler$jscomp$0.target.addEventListener(eventHandler$jscomp$0.eventTypeString, jsEventHandler$jscomp$0, eventHandler$jscomp$0.useCapture);
        JSEvents$jscomp$0.eventHandlers.push(eventHandler$jscomp$0);
        JSEvents$jscomp$0.registerRemoveEventListeners();
      } else {
        var i$jscomp$84 = 0;
        for (; i$jscomp$84 < JSEvents$jscomp$0.eventHandlers.length; ++i$jscomp$84) {
          if (JSEvents$jscomp$0.eventHandlers[i$jscomp$84].target == eventHandler$jscomp$0.target && JSEvents$jscomp$0.eventHandlers[i$jscomp$84].eventTypeString == eventHandler$jscomp$0.eventTypeString) {
            JSEvents$jscomp$0._removeHandler(i$jscomp$84--);
          }
        }
      }
    },
    registerKeyEventCallback : function(target$jscomp$122, userData$jscomp$20, useCapture$jscomp$19, callbackfunc$jscomp$19, eventTypeId$jscomp$0, eventTypeString$jscomp$1, targetThread$jscomp$19) {
      if (!JSEvents$jscomp$0.keyEvent) {
        JSEvents$jscomp$0.keyEvent = _malloc$jscomp$0(164);
      }
      var keyEventHandlerFunc$jscomp$0 = function(event$jscomp$11) {
        var e$jscomp$323 = event$jscomp$11 || window.event;
        var keyEventData$jscomp$0 = JSEvents$jscomp$0.keyEvent;
        stringToUTF8$jscomp$0(e$jscomp$323.key ? e$jscomp$323.key : "", keyEventData$jscomp$0 + 0, 32);
        stringToUTF8$jscomp$0(e$jscomp$323.code ? e$jscomp$323.code : "", keyEventData$jscomp$0 + 32, 32);
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 64 >> 2] = e$jscomp$323.location;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 68 >> 2] = e$jscomp$323.ctrlKey;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 72 >> 2] = e$jscomp$323.shiftKey;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 76 >> 2] = e$jscomp$323.altKey;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 80 >> 2] = e$jscomp$323.metaKey;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 84 >> 2] = e$jscomp$323.repeat;
        stringToUTF8$jscomp$0(e$jscomp$323.locale ? e$jscomp$323.locale : "", keyEventData$jscomp$0 + 88, 32);
        stringToUTF8$jscomp$0(e$jscomp$323.char ? e$jscomp$323.char : "", keyEventData$jscomp$0 + 120, 32);
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 152 >> 2] = e$jscomp$323.charCode;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 156 >> 2] = e$jscomp$323.keyCode;
        HEAP32$jscomp$0[keyEventData$jscomp$0 + 160 >> 2] = e$jscomp$323.which;
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$19, eventTypeId$jscomp$0, keyEventData$jscomp$0, userData$jscomp$20)) {
          e$jscomp$323.preventDefault();
        }
      };
      var eventHandler$jscomp$1 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$122),
        allowsDeferredCalls : JSEvents$jscomp$0.isInternetExplorer() ? false : true,
        eventTypeString : eventTypeString$jscomp$1,
        callbackfunc : callbackfunc$jscomp$19,
        handlerFunc : keyEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$19
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$1);
    },
    getBoundingClientRectOrZeros : function(target$jscomp$123) {
      return target$jscomp$123.getBoundingClientRect ? target$jscomp$123.getBoundingClientRect() : {
        left : 0,
        top : 0
      };
    },
    fillMouseEventData : function(eventStruct$jscomp$0, e$jscomp$324, target$jscomp$124) {
      HEAPF64$jscomp$0[eventStruct$jscomp$0 >> 3] = JSEvents$jscomp$0.tick();
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 8 >> 2] = e$jscomp$324.screenX;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 12 >> 2] = e$jscomp$324.screenY;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 16 >> 2] = e$jscomp$324.clientX;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 20 >> 2] = e$jscomp$324.clientY;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 24 >> 2] = e$jscomp$324.ctrlKey;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 28 >> 2] = e$jscomp$324.shiftKey;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 32 >> 2] = e$jscomp$324.altKey;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 36 >> 2] = e$jscomp$324.metaKey;
      HEAP16$jscomp$0[eventStruct$jscomp$0 + 40 >> 1] = e$jscomp$324.button;
      HEAP16$jscomp$0[eventStruct$jscomp$0 + 42 >> 1] = e$jscomp$324.buttons;
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 44 >> 2] = e$jscomp$324["movementX"];
      HEAP32$jscomp$0[eventStruct$jscomp$0 + 48 >> 2] = e$jscomp$324["movementY"];
      if (Module$jscomp$0["canvas"]) {
        var rect$jscomp$1 = Module$jscomp$0["canvas"].getBoundingClientRect();
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 60 >> 2] = e$jscomp$324.clientX - rect$jscomp$1.left;
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 64 >> 2] = e$jscomp$324.clientY - rect$jscomp$1.top;
      } else {
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 60 >> 2] = 0;
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 64 >> 2] = 0;
      }
      if (target$jscomp$124) {
        rect$jscomp$1 = JSEvents$jscomp$0.getBoundingClientRectOrZeros(target$jscomp$124);
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 52 >> 2] = e$jscomp$324.clientX - rect$jscomp$1.left;
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 56 >> 2] = e$jscomp$324.clientY - rect$jscomp$1.top;
      } else {
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 52 >> 2] = 0;
        HEAP32$jscomp$0[eventStruct$jscomp$0 + 56 >> 2] = 0;
      }
      if (e$jscomp$324.type !== "wheel" && e$jscomp$324.type !== "mousewheel") {
        JSEvents$jscomp$0.previousScreenX = e$jscomp$324.screenX;
        JSEvents$jscomp$0.previousScreenY = e$jscomp$324.screenY;
      }
    },
    registerMouseEventCallback : function(target$jscomp$125, userData$jscomp$21, useCapture$jscomp$20, callbackfunc$jscomp$20, eventTypeId$jscomp$1, eventTypeString$jscomp$2, targetThread$jscomp$20) {
      if (!JSEvents$jscomp$0.mouseEvent) {
        JSEvents$jscomp$0.mouseEvent = _malloc$jscomp$0(72);
      }
      target$jscomp$125 = JSEvents$jscomp$0.findEventTarget(target$jscomp$125);
      var mouseEventHandlerFunc$jscomp$0 = function(event$jscomp$12) {
        var e$jscomp$325 = event$jscomp$12 || window.event;
        JSEvents$jscomp$0.fillMouseEventData(JSEvents$jscomp$0.mouseEvent, e$jscomp$325, target$jscomp$125);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$20, eventTypeId$jscomp$1, JSEvents$jscomp$0.mouseEvent, userData$jscomp$21)) {
          e$jscomp$325.preventDefault();
        }
      };
      var eventHandler$jscomp$2 = {
        target : target$jscomp$125,
        allowsDeferredCalls : eventTypeString$jscomp$2 != "mousemove" && eventTypeString$jscomp$2 != "mouseenter" && eventTypeString$jscomp$2 != "mouseleave",
        eventTypeString : eventTypeString$jscomp$2,
        callbackfunc : callbackfunc$jscomp$20,
        handlerFunc : mouseEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$20
      };
      if (JSEvents$jscomp$0.isInternetExplorer() && eventTypeString$jscomp$2 == "mousedown") {
        eventHandler$jscomp$2.allowsDeferredCalls = false;
      }
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$2);
    },
    registerWheelEventCallback : function(target$jscomp$126, userData$jscomp$22, useCapture$jscomp$21, callbackfunc$jscomp$21, eventTypeId$jscomp$2, eventTypeString$jscomp$3, targetThread$jscomp$21) {
      if (!JSEvents$jscomp$0.wheelEvent) {
        JSEvents$jscomp$0.wheelEvent = _malloc$jscomp$0(104);
      }
      target$jscomp$126 = JSEvents$jscomp$0.findEventTarget(target$jscomp$126);
      var wheelHandlerFunc$jscomp$0 = function(event$jscomp$13) {
        var e$jscomp$326 = event$jscomp$13 || window.event;
        var wheelEvent$jscomp$0 = JSEvents$jscomp$0.wheelEvent;
        JSEvents$jscomp$0.fillMouseEventData(wheelEvent$jscomp$0, e$jscomp$326, target$jscomp$126);
        HEAPF64$jscomp$0[wheelEvent$jscomp$0 + 72 >> 3] = e$jscomp$326["deltaX"];
        HEAPF64$jscomp$0[wheelEvent$jscomp$0 + 80 >> 3] = e$jscomp$326["deltaY"];
        HEAPF64$jscomp$0[wheelEvent$jscomp$0 + 88 >> 3] = e$jscomp$326["deltaZ"];
        HEAP32$jscomp$0[wheelEvent$jscomp$0 + 96 >> 2] = e$jscomp$326["deltaMode"];
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$21, eventTypeId$jscomp$2, wheelEvent$jscomp$0, userData$jscomp$22)) {
          e$jscomp$326.preventDefault();
        }
      };
      var mouseWheelHandlerFunc$jscomp$0 = function(event$jscomp$14) {
        var e$jscomp$327 = event$jscomp$14 || window.event;
        JSEvents$jscomp$0.fillMouseEventData(JSEvents$jscomp$0.wheelEvent, e$jscomp$327, target$jscomp$126);
        HEAPF64$jscomp$0[JSEvents$jscomp$0.wheelEvent + 72 >> 3] = e$jscomp$327["wheelDeltaX"] || 0;
        HEAPF64$jscomp$0[JSEvents$jscomp$0.wheelEvent + 80 >> 3] = -(e$jscomp$327["wheelDeltaY"] ? e$jscomp$327["wheelDeltaY"] : e$jscomp$327["wheelDelta"]);
        HEAPF64$jscomp$0[JSEvents$jscomp$0.wheelEvent + 88 >> 3] = 0;
        HEAP32$jscomp$0[JSEvents$jscomp$0.wheelEvent + 96 >> 2] = 0;
        var shouldCancel$jscomp$0 = Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$21, eventTypeId$jscomp$2, JSEvents$jscomp$0.wheelEvent, userData$jscomp$22);
        if (shouldCancel$jscomp$0) {
          e$jscomp$327.preventDefault();
        }
      };
      var eventHandler$jscomp$3 = {
        target : target$jscomp$126,
        allowsDeferredCalls : true,
        eventTypeString : eventTypeString$jscomp$3,
        callbackfunc : callbackfunc$jscomp$21,
        handlerFunc : eventTypeString$jscomp$3 == "wheel" ? wheelHandlerFunc$jscomp$0 : mouseWheelHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$21
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$3);
    },
    pageScrollPos : function() {
      if (window.pageXOffset > 0 || window.pageYOffset > 0) {
        return [window.pageXOffset, window.pageYOffset];
      }
      if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
        return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      }
      return [document.body.scrollLeft | 0, document.body.scrollTop | 0];
    },
    registerUiEventCallback : function(target$jscomp$127, userData$jscomp$23, useCapture$jscomp$22, callbackfunc$jscomp$22, eventTypeId$jscomp$3, eventTypeString$jscomp$4, targetThread$jscomp$22) {
      if (!JSEvents$jscomp$0.uiEvent) {
        JSEvents$jscomp$0.uiEvent = _malloc$jscomp$0(36);
      }
      if (eventTypeString$jscomp$4 == "scroll" && !target$jscomp$127) {
        target$jscomp$127 = document;
      } else {
        target$jscomp$127 = JSEvents$jscomp$0.findEventTarget(target$jscomp$127);
      }
      var uiEventHandlerFunc$jscomp$0 = function(event$jscomp$15) {
        var e$jscomp$328 = event$jscomp$15 || window.event;
        if (e$jscomp$328.target != target$jscomp$127) {
          return;
        }
        var scrollPos$jscomp$0 = JSEvents$jscomp$0.pageScrollPos();
        var uiEvent$jscomp$0 = JSEvents$jscomp$0.uiEvent;
        HEAP32$jscomp$0[uiEvent$jscomp$0 >> 2] = e$jscomp$328.detail;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 4 >> 2] = document.body.clientWidth;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 8 >> 2] = document.body.clientHeight;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 12 >> 2] = window.innerWidth;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 16 >> 2] = window.innerHeight;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 20 >> 2] = window.outerWidth;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 24 >> 2] = window.outerHeight;
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 28 >> 2] = scrollPos$jscomp$0[0];
        HEAP32$jscomp$0[uiEvent$jscomp$0 + 32 >> 2] = scrollPos$jscomp$0[1];
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$22, eventTypeId$jscomp$3, uiEvent$jscomp$0, userData$jscomp$23)) {
          e$jscomp$328.preventDefault();
        }
      };
      var eventHandler$jscomp$4 = {
        target : target$jscomp$127,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$4,
        callbackfunc : callbackfunc$jscomp$22,
        handlerFunc : uiEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$22
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$4);
    },
    getNodeNameForTarget : function(target$jscomp$128) {
      if (!target$jscomp$128) {
        return "";
      }
      if (target$jscomp$128 == window) {
        return "#window";
      }
      if (target$jscomp$128 == window.screen) {
        return "#screen";
      }
      return target$jscomp$128 && target$jscomp$128.nodeName ? target$jscomp$128.nodeName : "";
    },
    registerFocusEventCallback : function(target$jscomp$129, userData$jscomp$24, useCapture$jscomp$23, callbackfunc$jscomp$23, eventTypeId$jscomp$4, eventTypeString$jscomp$5, targetThread$jscomp$23) {
      if (!JSEvents$jscomp$0.focusEvent) {
        JSEvents$jscomp$0.focusEvent = _malloc$jscomp$0(256);
      }
      var focusEventHandlerFunc$jscomp$0 = function(event$jscomp$16) {
        var e$jscomp$329 = event$jscomp$16 || window.event;
        var nodeName$jscomp$1 = JSEvents$jscomp$0.getNodeNameForTarget(e$jscomp$329.target);
        var id$jscomp$36 = e$jscomp$329.target.id ? e$jscomp$329.target.id : "";
        var focusEvent$jscomp$0 = JSEvents$jscomp$0.focusEvent;
        stringToUTF8$jscomp$0(nodeName$jscomp$1, focusEvent$jscomp$0 + 0, 128);
        stringToUTF8$jscomp$0(id$jscomp$36, focusEvent$jscomp$0 + 128, 128);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$23, eventTypeId$jscomp$4, focusEvent$jscomp$0, userData$jscomp$24)) {
          e$jscomp$329.preventDefault();
        }
      };
      var eventHandler$jscomp$5 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$129),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$5,
        callbackfunc : callbackfunc$jscomp$23,
        handlerFunc : focusEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$23
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$5);
    },
    tick : function() {
      if (window["performance"] && window["performance"]["now"]) {
        return window["performance"]["now"]();
      } else {
        return Date.now();
      }
    },
    fillDeviceOrientationEventData : function(eventStruct$jscomp$1, e$jscomp$330, target$jscomp$130) {
      HEAPF64$jscomp$0[eventStruct$jscomp$1 >> 3] = JSEvents$jscomp$0.tick();
      HEAPF64$jscomp$0[eventStruct$jscomp$1 + 8 >> 3] = e$jscomp$330.alpha;
      HEAPF64$jscomp$0[eventStruct$jscomp$1 + 16 >> 3] = e$jscomp$330.beta;
      HEAPF64$jscomp$0[eventStruct$jscomp$1 + 24 >> 3] = e$jscomp$330.gamma;
      HEAP32$jscomp$0[eventStruct$jscomp$1 + 32 >> 2] = e$jscomp$330.absolute;
    },
    registerDeviceOrientationEventCallback : function(target$jscomp$131, userData$jscomp$25, useCapture$jscomp$24, callbackfunc$jscomp$24, eventTypeId$jscomp$5, eventTypeString$jscomp$6, targetThread$jscomp$24) {
      if (!JSEvents$jscomp$0.deviceOrientationEvent) {
        JSEvents$jscomp$0.deviceOrientationEvent = _malloc$jscomp$0(40);
      }
      var deviceOrientationEventHandlerFunc$jscomp$0 = function(event$jscomp$17) {
        var e$jscomp$331 = event$jscomp$17 || window.event;
        JSEvents$jscomp$0.fillDeviceOrientationEventData(JSEvents$jscomp$0.deviceOrientationEvent, e$jscomp$331, target$jscomp$131);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$24, eventTypeId$jscomp$5, JSEvents$jscomp$0.deviceOrientationEvent, userData$jscomp$25)) {
          e$jscomp$331.preventDefault();
        }
      };
      var eventHandler$jscomp$6 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$131),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$6,
        callbackfunc : callbackfunc$jscomp$24,
        handlerFunc : deviceOrientationEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$24
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$6);
    },
    fillDeviceMotionEventData : function(eventStruct$jscomp$2, e$jscomp$332, target$jscomp$132) {
      HEAPF64$jscomp$0[eventStruct$jscomp$2 >> 3] = JSEvents$jscomp$0.tick();
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 8 >> 3] = e$jscomp$332.acceleration.x;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 16 >> 3] = e$jscomp$332.acceleration.y;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 24 >> 3] = e$jscomp$332.acceleration.z;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 32 >> 3] = e$jscomp$332.accelerationIncludingGravity.x;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 40 >> 3] = e$jscomp$332.accelerationIncludingGravity.y;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 48 >> 3] = e$jscomp$332.accelerationIncludingGravity.z;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 56 >> 3] = e$jscomp$332.rotationRate.alpha;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 64 >> 3] = e$jscomp$332.rotationRate.beta;
      HEAPF64$jscomp$0[eventStruct$jscomp$2 + 72 >> 3] = e$jscomp$332.rotationRate.gamma;
    },
    registerDeviceMotionEventCallback : function(target$jscomp$133, userData$jscomp$26, useCapture$jscomp$25, callbackfunc$jscomp$25, eventTypeId$jscomp$6, eventTypeString$jscomp$7, targetThread$jscomp$25) {
      if (!JSEvents$jscomp$0.deviceMotionEvent) {
        JSEvents$jscomp$0.deviceMotionEvent = _malloc$jscomp$0(80);
      }
      var deviceMotionEventHandlerFunc$jscomp$0 = function(event$jscomp$18) {
        var e$jscomp$333 = event$jscomp$18 || window.event;
        JSEvents$jscomp$0.fillDeviceMotionEventData(JSEvents$jscomp$0.deviceMotionEvent, e$jscomp$333, target$jscomp$133);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$25, eventTypeId$jscomp$6, JSEvents$jscomp$0.deviceMotionEvent, userData$jscomp$26)) {
          e$jscomp$333.preventDefault();
        }
      };
      var eventHandler$jscomp$7 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$133),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$7,
        callbackfunc : callbackfunc$jscomp$25,
        handlerFunc : deviceMotionEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$25
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$7);
    },
    screenOrientation : function() {
      if (!window.screen) {
        return undefined;
      }
      return window.screen.orientation || window.screen.mozOrientation || window.screen.webkitOrientation || window.screen.msOrientation;
    },
    fillOrientationChangeEventData : function(eventStruct$jscomp$3, e$jscomp$334) {
      var orientations$jscomp$0 = ["portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"];
      var orientations2$jscomp$0 = ["portrait", "portrait", "landscape", "landscape"];
      var orientationString$jscomp$0 = JSEvents$jscomp$0.screenOrientation();
      var orientation$jscomp$1 = orientations$jscomp$0.indexOf(orientationString$jscomp$0);
      if (orientation$jscomp$1 == -1) {
        orientation$jscomp$1 = orientations2$jscomp$0.indexOf(orientationString$jscomp$0);
      }
      HEAP32$jscomp$0[eventStruct$jscomp$3 >> 2] = 1 << orientation$jscomp$1;
      HEAP32$jscomp$0[eventStruct$jscomp$3 + 4 >> 2] = window.orientation;
    },
    registerOrientationChangeEventCallback : function(target$jscomp$134, userData$jscomp$27, useCapture$jscomp$26, callbackfunc$jscomp$26, eventTypeId$jscomp$7, eventTypeString$jscomp$8, targetThread$jscomp$26) {
      if (!JSEvents$jscomp$0.orientationChangeEvent) {
        JSEvents$jscomp$0.orientationChangeEvent = _malloc$jscomp$0(8);
      }
      if (!target$jscomp$134) {
        target$jscomp$134 = window.screen;
      } else {
        target$jscomp$134 = JSEvents$jscomp$0.findEventTarget(target$jscomp$134);
      }
      var orientationChangeEventHandlerFunc$jscomp$0 = function(event$jscomp$19) {
        var e$jscomp$335 = event$jscomp$19 || window.event;
        var orientationChangeEvent$jscomp$0 = JSEvents$jscomp$0.orientationChangeEvent;
        JSEvents$jscomp$0.fillOrientationChangeEventData(orientationChangeEvent$jscomp$0, e$jscomp$335);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$26, eventTypeId$jscomp$7, orientationChangeEvent$jscomp$0, userData$jscomp$27)) {
          e$jscomp$335.preventDefault();
        }
      };
      if (eventTypeString$jscomp$8 == "orientationchange" && window.screen.mozOrientation !== undefined) {
        eventTypeString$jscomp$8 = "mozorientationchange";
      }
      var eventHandler$jscomp$8 = {
        target : target$jscomp$134,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$8,
        callbackfunc : callbackfunc$jscomp$26,
        handlerFunc : orientationChangeEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$26
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$8);
    },
    fullscreenEnabled : function() {
      return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    },
    fillFullscreenChangeEventData : function(eventStruct$jscomp$4, e$jscomp$336) {
      var fullscreenElement$jscomp$0 = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      var isFullscreen$jscomp$0 = !!fullscreenElement$jscomp$0;
      HEAP32$jscomp$0[eventStruct$jscomp$4 >> 2] = isFullscreen$jscomp$0;
      HEAP32$jscomp$0[eventStruct$jscomp$4 + 4 >> 2] = JSEvents$jscomp$0.fullscreenEnabled();
      var reportedElement$jscomp$0 = isFullscreen$jscomp$0 ? fullscreenElement$jscomp$0 : JSEvents$jscomp$0.previousFullscreenElement;
      var nodeName$jscomp$2 = JSEvents$jscomp$0.getNodeNameForTarget(reportedElement$jscomp$0);
      var id$jscomp$37 = reportedElement$jscomp$0 && reportedElement$jscomp$0.id ? reportedElement$jscomp$0.id : "";
      stringToUTF8$jscomp$0(nodeName$jscomp$2, eventStruct$jscomp$4 + 8, 128);
      stringToUTF8$jscomp$0(id$jscomp$37, eventStruct$jscomp$4 + 136, 128);
      HEAP32$jscomp$0[eventStruct$jscomp$4 + 264 >> 2] = reportedElement$jscomp$0 ? reportedElement$jscomp$0.clientWidth : 0;
      HEAP32$jscomp$0[eventStruct$jscomp$4 + 268 >> 2] = reportedElement$jscomp$0 ? reportedElement$jscomp$0.clientHeight : 0;
      HEAP32$jscomp$0[eventStruct$jscomp$4 + 272 >> 2] = screen.width;
      HEAP32$jscomp$0[eventStruct$jscomp$4 + 276 >> 2] = screen.height;
      if (isFullscreen$jscomp$0) {
        JSEvents$jscomp$0.previousFullscreenElement = fullscreenElement$jscomp$0;
      }
    },
    registerFullscreenChangeEventCallback : function(target$jscomp$135, userData$jscomp$28, useCapture$jscomp$27, callbackfunc$jscomp$27, eventTypeId$jscomp$8, eventTypeString$jscomp$9, targetThread$jscomp$27) {
      if (!JSEvents$jscomp$0.fullscreenChangeEvent) {
        JSEvents$jscomp$0.fullscreenChangeEvent = _malloc$jscomp$0(280);
      }
      if (!target$jscomp$135) {
        target$jscomp$135 = document;
      } else {
        target$jscomp$135 = JSEvents$jscomp$0.findEventTarget(target$jscomp$135);
      }
      var fullscreenChangeEventhandlerFunc$jscomp$0 = function(event$jscomp$20) {
        var e$jscomp$337 = event$jscomp$20 || window.event;
        var fullscreenChangeEvent$jscomp$0 = JSEvents$jscomp$0.fullscreenChangeEvent;
        JSEvents$jscomp$0.fillFullscreenChangeEventData(fullscreenChangeEvent$jscomp$0, e$jscomp$337);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$27, eventTypeId$jscomp$8, fullscreenChangeEvent$jscomp$0, userData$jscomp$28)) {
          e$jscomp$337.preventDefault();
        }
      };
      var eventHandler$jscomp$9 = {
        target : target$jscomp$135,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$9,
        callbackfunc : callbackfunc$jscomp$27,
        handlerFunc : fullscreenChangeEventhandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$27
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$9);
    },
    resizeCanvasForFullscreen : function(target$jscomp$136, strategy$jscomp$2) {
      var restoreOldStyle$jscomp$0 = __registerRestoreOldStyle(target$jscomp$136);
      var cssWidth$jscomp$0 = strategy$jscomp$2.softFullscreen ? window.innerWidth : screen.width;
      var cssHeight$jscomp$0 = strategy$jscomp$2.softFullscreen ? window.innerHeight : screen.height;
      var rect$jscomp$2 = target$jscomp$136.getBoundingClientRect();
      var windowedCssWidth$jscomp$0 = rect$jscomp$2.right - rect$jscomp$2.left;
      var windowedCssHeight$jscomp$0 = rect$jscomp$2.bottom - rect$jscomp$2.top;
      var canvasSize$jscomp$0 = emscripten_get_canvas_element_size_js$jscomp$0(target$jscomp$136.id);
      var windowedRttWidth$jscomp$0 = canvasSize$jscomp$0[0];
      var windowedRttHeight$jscomp$0 = canvasSize$jscomp$0[1];
      if (strategy$jscomp$2.scaleMode == 3) {
        __setLetterbox$jscomp$0(target$jscomp$136, (cssHeight$jscomp$0 - windowedCssHeight$jscomp$0) / 2, (cssWidth$jscomp$0 - windowedCssWidth$jscomp$0) / 2);
        cssWidth$jscomp$0 = windowedCssWidth$jscomp$0;
        cssHeight$jscomp$0 = windowedCssHeight$jscomp$0;
      } else {
        if (strategy$jscomp$2.scaleMode == 2) {
          if (cssWidth$jscomp$0 * windowedRttHeight$jscomp$0 < windowedRttWidth$jscomp$0 * cssHeight$jscomp$0) {
            var desiredCssHeight$jscomp$0 = windowedRttHeight$jscomp$0 * cssWidth$jscomp$0 / windowedRttWidth$jscomp$0;
            __setLetterbox$jscomp$0(target$jscomp$136, (cssHeight$jscomp$0 - desiredCssHeight$jscomp$0) / 2, 0);
            cssHeight$jscomp$0 = desiredCssHeight$jscomp$0;
          } else {
            var desiredCssWidth$jscomp$0 = windowedRttWidth$jscomp$0 * cssHeight$jscomp$0 / windowedRttHeight$jscomp$0;
            __setLetterbox$jscomp$0(target$jscomp$136, 0, (cssWidth$jscomp$0 - desiredCssWidth$jscomp$0) / 2);
            cssWidth$jscomp$0 = desiredCssWidth$jscomp$0;
          }
        }
      }
      if (!target$jscomp$136.style.backgroundColor) {
        target$jscomp$136.style.backgroundColor = "black";
      }
      if (!document.body.style.backgroundColor) {
        document.body.style.backgroundColor = "black";
      }
      target$jscomp$136.style.width = cssWidth$jscomp$0 + "px";
      target$jscomp$136.style.height = cssHeight$jscomp$0 + "px";
      if (strategy$jscomp$2.filteringMode == 1) {
        target$jscomp$136.style.imageRendering = "optimizeSpeed";
        target$jscomp$136.style.imageRendering = "-moz-crisp-edges";
        target$jscomp$136.style.imageRendering = "-o-crisp-edges";
        target$jscomp$136.style.imageRendering = "-webkit-optimize-contrast";
        target$jscomp$136.style.imageRendering = "optimize-contrast";
        target$jscomp$136.style.imageRendering = "crisp-edges";
        target$jscomp$136.style.imageRendering = "pixelated";
      }
      var dpiScale$jscomp$0 = strategy$jscomp$2.canvasResolutionScaleMode == 2 ? window.devicePixelRatio : 1;
      if (strategy$jscomp$2.canvasResolutionScaleMode != 0) {
        var newWidth$jscomp$0 = cssWidth$jscomp$0 * dpiScale$jscomp$0 | 0;
        var newHeight$jscomp$0 = cssHeight$jscomp$0 * dpiScale$jscomp$0 | 0;
        if (!target$jscomp$136.controlTransferredOffscreen) {
          target$jscomp$136.width = newWidth$jscomp$0;
          target$jscomp$136.height = newHeight$jscomp$0;
        } else {
          emscripten_set_canvas_element_size_js$jscomp$0(target$jscomp$136.id, newWidth$jscomp$0, newHeight$jscomp$0);
        }
        if (target$jscomp$136.GLctxObject) {
          target$jscomp$136.GLctxObject.GLctx.viewport(0, 0, newWidth$jscomp$0, newHeight$jscomp$0);
        }
      }
      return restoreOldStyle$jscomp$0;
    },
    requestFullscreen : function(target$jscomp$137, strategy$jscomp$3) {
      if (strategy$jscomp$3.scaleMode != 0 || strategy$jscomp$3.canvasResolutionScaleMode != 0) {
        JSEvents$jscomp$0.resizeCanvasForFullscreen(target$jscomp$137, strategy$jscomp$3);
      }
      if (target$jscomp$137.requestFullscreen) {
        target$jscomp$137.requestFullscreen();
      } else {
        if (target$jscomp$137.msRequestFullscreen) {
          target$jscomp$137.msRequestFullscreen();
        } else {
          if (target$jscomp$137.mozRequestFullScreen) {
            target$jscomp$137.mozRequestFullScreen();
          } else {
            if (target$jscomp$137.mozRequestFullscreen) {
              target$jscomp$137.mozRequestFullscreen();
            } else {
              if (target$jscomp$137.webkitRequestFullscreen) {
                target$jscomp$137.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              } else {
                if (typeof JSEvents$jscomp$0.fullscreenEnabled() === "undefined") {
                  return -1;
                } else {
                  return -3;
                }
              }
            }
          }
        }
      }
      if (strategy$jscomp$3.canvasResizedCallback) {
        Module$jscomp$0["dynCall_iiii"](strategy$jscomp$3.canvasResizedCallback, 37, 0, strategy$jscomp$3.canvasResizedCallbackUserData);
      }
      return 0;
    },
    fillPointerlockChangeEventData : function(eventStruct$jscomp$5, e$jscomp$338) {
      var pointerLockElement$jscomp$0 = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked$jscomp$0 = !!pointerLockElement$jscomp$0;
      HEAP32$jscomp$0[eventStruct$jscomp$5 >> 2] = isPointerlocked$jscomp$0;
      var nodeName$jscomp$3 = JSEvents$jscomp$0.getNodeNameForTarget(pointerLockElement$jscomp$0);
      var id$jscomp$38 = pointerLockElement$jscomp$0 && pointerLockElement$jscomp$0.id ? pointerLockElement$jscomp$0.id : "";
      stringToUTF8$jscomp$0(nodeName$jscomp$3, eventStruct$jscomp$5 + 4, 128);
      stringToUTF8$jscomp$0(id$jscomp$38, eventStruct$jscomp$5 + 132, 128);
    },
    registerPointerlockChangeEventCallback : function(target$jscomp$138, userData$jscomp$29, useCapture$jscomp$28, callbackfunc$jscomp$28, eventTypeId$jscomp$9, eventTypeString$jscomp$10, targetThread$jscomp$28) {
      if (!JSEvents$jscomp$0.pointerlockChangeEvent) {
        JSEvents$jscomp$0.pointerlockChangeEvent = _malloc$jscomp$0(260);
      }
      if (!target$jscomp$138) {
        target$jscomp$138 = document;
      } else {
        target$jscomp$138 = JSEvents$jscomp$0.findEventTarget(target$jscomp$138);
      }
      var pointerlockChangeEventHandlerFunc$jscomp$0 = function(event$jscomp$21) {
        var e$jscomp$339 = event$jscomp$21 || window.event;
        var pointerlockChangeEvent$jscomp$0 = JSEvents$jscomp$0.pointerlockChangeEvent;
        JSEvents$jscomp$0.fillPointerlockChangeEventData(pointerlockChangeEvent$jscomp$0, e$jscomp$339);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$28, eventTypeId$jscomp$9, pointerlockChangeEvent$jscomp$0, userData$jscomp$29)) {
          e$jscomp$339.preventDefault();
        }
      };
      var eventHandler$jscomp$10 = {
        target : target$jscomp$138,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$10,
        callbackfunc : callbackfunc$jscomp$28,
        handlerFunc : pointerlockChangeEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$28
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$10);
    },
    registerPointerlockErrorEventCallback : function(target$jscomp$139, userData$jscomp$30, useCapture$jscomp$29, callbackfunc$jscomp$29, eventTypeId$jscomp$10, eventTypeString$jscomp$11) {
      if (!target$jscomp$139) {
        target$jscomp$139 = document;
      } else {
        target$jscomp$139 = JSEvents$jscomp$0.findEventTarget(target$jscomp$139);
      }
      var pointerlockErrorEventHandlerFunc$jscomp$0 = function(event$jscomp$22) {
        var e$jscomp$340 = event$jscomp$22 || window.event;
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$29, eventTypeId$jscomp$10, 0, userData$jscomp$30)) {
          e$jscomp$340.preventDefault();
        }
      };
      var eventHandler$jscomp$11 = {
        target : target$jscomp$139,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$11,
        callbackfunc : callbackfunc$jscomp$29,
        handlerFunc : pointerlockErrorEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$29
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$11);
    },
    requestPointerLock : function(target$jscomp$140) {
      if (target$jscomp$140.requestPointerLock) {
        target$jscomp$140.requestPointerLock();
      } else {
        if (target$jscomp$140.mozRequestPointerLock) {
          target$jscomp$140.mozRequestPointerLock();
        } else {
          if (target$jscomp$140.webkitRequestPointerLock) {
            target$jscomp$140.webkitRequestPointerLock();
          } else {
            if (target$jscomp$140.msRequestPointerLock) {
              target$jscomp$140.msRequestPointerLock();
            } else {
              if (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) {
                return -3;
              } else {
                return -1;
              }
            }
          }
        }
      }
      return 0;
    },
    fillVisibilityChangeEventData : function(eventStruct$jscomp$6, e$jscomp$341) {
      var visibilityStates$jscomp$0 = ["hidden", "visible", "prerender", "unloaded"];
      var visibilityState$jscomp$0 = visibilityStates$jscomp$0.indexOf(document.visibilityState);
      HEAP32$jscomp$0[eventStruct$jscomp$6 >> 2] = document.hidden;
      HEAP32$jscomp$0[eventStruct$jscomp$6 + 4 >> 2] = visibilityState$jscomp$0;
    },
    registerVisibilityChangeEventCallback : function(target$jscomp$141, userData$jscomp$31, useCapture$jscomp$30, callbackfunc$jscomp$30, eventTypeId$jscomp$11, eventTypeString$jscomp$12, targetThread$jscomp$29) {
      if (!JSEvents$jscomp$0.visibilityChangeEvent) {
        JSEvents$jscomp$0.visibilityChangeEvent = _malloc$jscomp$0(8);
      }
      if (!target$jscomp$141) {
        target$jscomp$141 = document;
      } else {
        target$jscomp$141 = JSEvents$jscomp$0.findEventTarget(target$jscomp$141);
      }
      var visibilityChangeEventHandlerFunc$jscomp$0 = function(event$jscomp$23) {
        var e$jscomp$342 = event$jscomp$23 || window.event;
        var visibilityChangeEvent$jscomp$0 = JSEvents$jscomp$0.visibilityChangeEvent;
        JSEvents$jscomp$0.fillVisibilityChangeEventData(visibilityChangeEvent$jscomp$0, e$jscomp$342);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$30, eventTypeId$jscomp$11, visibilityChangeEvent$jscomp$0, userData$jscomp$31)) {
          e$jscomp$342.preventDefault();
        }
      };
      var eventHandler$jscomp$12 = {
        target : target$jscomp$141,
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$12,
        callbackfunc : callbackfunc$jscomp$30,
        handlerFunc : visibilityChangeEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$30
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$12);
    },
    registerTouchEventCallback : function(target$jscomp$142, userData$jscomp$32, useCapture$jscomp$31, callbackfunc$jscomp$31, eventTypeId$jscomp$12, eventTypeString$jscomp$13, targetThread$jscomp$30) {
      if (!JSEvents$jscomp$0.touchEvent) {
        JSEvents$jscomp$0.touchEvent = _malloc$jscomp$0(1684);
      }
      target$jscomp$142 = JSEvents$jscomp$0.findEventTarget(target$jscomp$142);
      var touchEventHandlerFunc$jscomp$0 = function(event$jscomp$24) {
        var e$jscomp$343 = event$jscomp$24 || window.event;
        var touches$jscomp$2 = {};
        var i$jscomp$85 = 0;
        for (; i$jscomp$85 < e$jscomp$343.touches.length; ++i$jscomp$85) {
          var touch$jscomp$1 = e$jscomp$343.touches[i$jscomp$85];
          touches$jscomp$2[touch$jscomp$1.identifier] = touch$jscomp$1;
        }
        i$jscomp$85 = 0;
        for (; i$jscomp$85 < e$jscomp$343.changedTouches.length; ++i$jscomp$85) {
          touch$jscomp$1 = e$jscomp$343.changedTouches[i$jscomp$85];
          touches$jscomp$2[touch$jscomp$1.identifier] = touch$jscomp$1;
          touch$jscomp$1.changed = true;
        }
        i$jscomp$85 = 0;
        for (; i$jscomp$85 < e$jscomp$343.targetTouches.length; ++i$jscomp$85) {
          touch$jscomp$1 = e$jscomp$343.targetTouches[i$jscomp$85];
          touches$jscomp$2[touch$jscomp$1.identifier].onTarget = true;
        }
        var touchEvent$jscomp$0 = JSEvents$jscomp$0.touchEvent;
        var ptr$jscomp$32 = touchEvent$jscomp$0;
        HEAP32$jscomp$0[ptr$jscomp$32 + 4 >> 2] = e$jscomp$343.ctrlKey;
        HEAP32$jscomp$0[ptr$jscomp$32 + 8 >> 2] = e$jscomp$343.shiftKey;
        HEAP32$jscomp$0[ptr$jscomp$32 + 12 >> 2] = e$jscomp$343.altKey;
        HEAP32$jscomp$0[ptr$jscomp$32 + 16 >> 2] = e$jscomp$343.metaKey;
        ptr$jscomp$32 = ptr$jscomp$32 + 20;
        var canvasRect$jscomp$0 = Module$jscomp$0["canvas"] ? Module$jscomp$0["canvas"].getBoundingClientRect() : undefined;
        var targetRect$jscomp$0 = JSEvents$jscomp$0.getBoundingClientRectOrZeros(target$jscomp$142);
        var numTouches$jscomp$0 = 0;
        for (i$jscomp$85 in touches$jscomp$2) {
          var t$jscomp$2 = touches$jscomp$2[i$jscomp$85];
          HEAP32$jscomp$0[ptr$jscomp$32 >> 2] = t$jscomp$2.identifier;
          HEAP32$jscomp$0[ptr$jscomp$32 + 4 >> 2] = t$jscomp$2.screenX;
          HEAP32$jscomp$0[ptr$jscomp$32 + 8 >> 2] = t$jscomp$2.screenY;
          HEAP32$jscomp$0[ptr$jscomp$32 + 12 >> 2] = t$jscomp$2.clientX;
          HEAP32$jscomp$0[ptr$jscomp$32 + 16 >> 2] = t$jscomp$2.clientY;
          HEAP32$jscomp$0[ptr$jscomp$32 + 20 >> 2] = t$jscomp$2.pageX;
          HEAP32$jscomp$0[ptr$jscomp$32 + 24 >> 2] = t$jscomp$2.pageY;
          HEAP32$jscomp$0[ptr$jscomp$32 + 28 >> 2] = t$jscomp$2.changed;
          HEAP32$jscomp$0[ptr$jscomp$32 + 32 >> 2] = t$jscomp$2.onTarget;
          if (canvasRect$jscomp$0) {
            HEAP32$jscomp$0[ptr$jscomp$32 + 44 >> 2] = t$jscomp$2.clientX - canvasRect$jscomp$0.left;
            HEAP32$jscomp$0[ptr$jscomp$32 + 48 >> 2] = t$jscomp$2.clientY - canvasRect$jscomp$0.top;
          } else {
            HEAP32$jscomp$0[ptr$jscomp$32 + 44 >> 2] = 0;
            HEAP32$jscomp$0[ptr$jscomp$32 + 48 >> 2] = 0;
          }
          HEAP32$jscomp$0[ptr$jscomp$32 + 36 >> 2] = t$jscomp$2.clientX - targetRect$jscomp$0.left;
          HEAP32$jscomp$0[ptr$jscomp$32 + 40 >> 2] = t$jscomp$2.clientY - targetRect$jscomp$0.top;
          ptr$jscomp$32 = ptr$jscomp$32 + 52;
          if (++numTouches$jscomp$0 >= 32) {
            break;
          }
        }
        HEAP32$jscomp$0[touchEvent$jscomp$0 >> 2] = numTouches$jscomp$0;
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$31, eventTypeId$jscomp$12, touchEvent$jscomp$0, userData$jscomp$32)) {
          e$jscomp$343.preventDefault();
        }
      };
      var eventHandler$jscomp$13 = {
        target : target$jscomp$142,
        allowsDeferredCalls : eventTypeString$jscomp$13 == "touchstart" || eventTypeString$jscomp$13 == "touchend",
        eventTypeString : eventTypeString$jscomp$13,
        callbackfunc : callbackfunc$jscomp$31,
        handlerFunc : touchEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$31
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$13);
    },
    fillGamepadEventData : function(eventStruct$jscomp$7, e$jscomp$344) {
      HEAPF64$jscomp$0[eventStruct$jscomp$7 >> 3] = e$jscomp$344.timestamp;
      var i$jscomp$86 = 0;
      for (; i$jscomp$86 < e$jscomp$344.axes.length; ++i$jscomp$86) {
        HEAPF64$jscomp$0[eventStruct$jscomp$7 + i$jscomp$86 * 8 + 16 >> 3] = e$jscomp$344.axes[i$jscomp$86];
      }
      i$jscomp$86 = 0;
      for (; i$jscomp$86 < e$jscomp$344.buttons.length; ++i$jscomp$86) {
        if (typeof e$jscomp$344.buttons[i$jscomp$86] === "object") {
          HEAPF64$jscomp$0[eventStruct$jscomp$7 + i$jscomp$86 * 8 + 528 >> 3] = e$jscomp$344.buttons[i$jscomp$86].value;
        } else {
          HEAPF64$jscomp$0[eventStruct$jscomp$7 + i$jscomp$86 * 8 + 528 >> 3] = e$jscomp$344.buttons[i$jscomp$86];
        }
      }
      i$jscomp$86 = 0;
      for (; i$jscomp$86 < e$jscomp$344.buttons.length; ++i$jscomp$86) {
        if (typeof e$jscomp$344.buttons[i$jscomp$86] === "object") {
          HEAP32$jscomp$0[eventStruct$jscomp$7 + i$jscomp$86 * 4 + 1040 >> 2] = e$jscomp$344.buttons[i$jscomp$86].pressed;
        } else {
          HEAP32$jscomp$0[eventStruct$jscomp$7 + i$jscomp$86 * 4 + 1040 >> 2] = e$jscomp$344.buttons[i$jscomp$86] == 1;
        }
      }
      HEAP32$jscomp$0[eventStruct$jscomp$7 + 1296 >> 2] = e$jscomp$344.connected;
      HEAP32$jscomp$0[eventStruct$jscomp$7 + 1300 >> 2] = e$jscomp$344.index;
      HEAP32$jscomp$0[eventStruct$jscomp$7 + 8 >> 2] = e$jscomp$344.axes.length;
      HEAP32$jscomp$0[eventStruct$jscomp$7 + 12 >> 2] = e$jscomp$344.buttons.length;
      stringToUTF8$jscomp$0(e$jscomp$344.id, eventStruct$jscomp$7 + 1304, 64);
      stringToUTF8$jscomp$0(e$jscomp$344.mapping, eventStruct$jscomp$7 + 1368, 64);
    },
    registerGamepadEventCallback : function(target$jscomp$143, userData$jscomp$33, useCapture$jscomp$32, callbackfunc$jscomp$32, eventTypeId$jscomp$13, eventTypeString$jscomp$14, targetThread$jscomp$31) {
      if (!JSEvents$jscomp$0.gamepadEvent) {
        JSEvents$jscomp$0.gamepadEvent = _malloc$jscomp$0(1432);
      }
      var gamepadEventHandlerFunc$jscomp$0 = function(event$jscomp$25) {
        var e$jscomp$345 = event$jscomp$25 || window.event;
        var gamepadEvent$jscomp$0 = JSEvents$jscomp$0.gamepadEvent;
        JSEvents$jscomp$0.fillGamepadEventData(gamepadEvent$jscomp$0, e$jscomp$345.gamepad);
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$32, eventTypeId$jscomp$13, gamepadEvent$jscomp$0, userData$jscomp$33)) {
          e$jscomp$345.preventDefault();
        }
      };
      var eventHandler$jscomp$14 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$143),
        allowsDeferredCalls : true,
        eventTypeString : eventTypeString$jscomp$14,
        callbackfunc : callbackfunc$jscomp$32,
        handlerFunc : gamepadEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$32
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$14);
    },
    registerBeforeUnloadEventCallback : function(target$jscomp$144, userData$jscomp$34, useCapture$jscomp$33, callbackfunc$jscomp$33, eventTypeId$jscomp$14, eventTypeString$jscomp$15) {
      var beforeUnloadEventHandlerFunc$jscomp$0 = function(event$jscomp$26) {
        var e$jscomp$346 = event$jscomp$26 || window.event;
        var confirmationMessage$jscomp$0 = Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$33, eventTypeId$jscomp$14, 0, userData$jscomp$34);
        if (confirmationMessage$jscomp$0) {
          confirmationMessage$jscomp$0 = Pointer_stringify$jscomp$0(confirmationMessage$jscomp$0);
        }
        if (confirmationMessage$jscomp$0) {
          e$jscomp$346.preventDefault();
          e$jscomp$346.returnValue = confirmationMessage$jscomp$0;
          return confirmationMessage$jscomp$0;
        }
      };
      var eventHandler$jscomp$15 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$144),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$15,
        callbackfunc : callbackfunc$jscomp$33,
        handlerFunc : beforeUnloadEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$33
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$15);
    },
    battery : function() {
      return navigator.battery || navigator.mozBattery || navigator.webkitBattery;
    },
    fillBatteryEventData : function(eventStruct$jscomp$8, e$jscomp$347) {
      HEAPF64$jscomp$0[eventStruct$jscomp$8 >> 3] = e$jscomp$347.chargingTime;
      HEAPF64$jscomp$0[eventStruct$jscomp$8 + 8 >> 3] = e$jscomp$347.dischargingTime;
      HEAPF64$jscomp$0[eventStruct$jscomp$8 + 16 >> 3] = e$jscomp$347.level;
      HEAP32$jscomp$0[eventStruct$jscomp$8 + 24 >> 2] = e$jscomp$347.charging;
    },
    registerBatteryEventCallback : function(target$jscomp$145, userData$jscomp$35, useCapture$jscomp$34, callbackfunc$jscomp$34, eventTypeId$jscomp$15, eventTypeString$jscomp$16, targetThread$jscomp$32) {
      if (!JSEvents$jscomp$0.batteryEvent) {
        JSEvents$jscomp$0.batteryEvent = _malloc$jscomp$0(32);
      }
      var batteryEventHandlerFunc$jscomp$0 = function(event$jscomp$27) {
        var e$jscomp$348 = event$jscomp$27 || window.event;
        var batteryEvent$jscomp$0 = JSEvents$jscomp$0.batteryEvent;
        JSEvents$jscomp$0.fillBatteryEventData(batteryEvent$jscomp$0, JSEvents$jscomp$0.battery());
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$34, eventTypeId$jscomp$15, batteryEvent$jscomp$0, userData$jscomp$35)) {
          e$jscomp$348.preventDefault();
        }
      };
      var eventHandler$jscomp$16 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$145),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$16,
        callbackfunc : callbackfunc$jscomp$34,
        handlerFunc : batteryEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$34
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$16);
    },
    registerWebGlEventCallback : function(target$jscomp$146, userData$jscomp$36, useCapture$jscomp$35, callbackfunc$jscomp$35, eventTypeId$jscomp$16, eventTypeString$jscomp$17, targetThread$jscomp$33) {
      if (!target$jscomp$146) {
        target$jscomp$146 = Module$jscomp$0["canvas"];
      }
      var webGlEventHandlerFunc$jscomp$0 = function(event$jscomp$28) {
        var e$jscomp$349 = event$jscomp$28 || window.event;
        if (Module$jscomp$0["dynCall_iiii"](callbackfunc$jscomp$35, eventTypeId$jscomp$16, 0, userData$jscomp$36)) {
          e$jscomp$349.preventDefault();
        }
      };
      var eventHandler$jscomp$17 = {
        target : JSEvents$jscomp$0.findEventTarget(target$jscomp$146),
        allowsDeferredCalls : false,
        eventTypeString : eventTypeString$jscomp$17,
        callbackfunc : callbackfunc$jscomp$35,
        handlerFunc : webGlEventHandlerFunc$jscomp$0,
        useCapture : useCapture$jscomp$35
      };
      JSEvents$jscomp$0.registerOrRemoveHandler(eventHandler$jscomp$17);
    }
  };
  var __currentFullscreenStrategy$jscomp$0 = {};
  var GL$jscomp$0 = {
    counter : 1,
    lastError : 0,
    buffers : [],
    mappedBuffers : {},
    programs : [],
    framebuffers : [],
    renderbuffers : [],
    textures : [],
    uniforms : [],
    shaders : [],
    vaos : [],
    contexts : [],
    currentContext : null,
    offscreenCanvases : {},
    timerQueriesEXT : [],
    queries : [],
    samplers : [],
    transformFeedbacks : [],
    syncs : [],
    byteSizeByTypeRoot : 5120,
    byteSizeByType : [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
    programInfos : {},
    stringCache : {},
    stringiCache : {},
    tempFixedLengthArray : [],
    packAlignment : 4,
    unpackAlignment : 4,
    init : function() {
      GL$jscomp$0.miniTempBuffer = new Float32Array(GL$jscomp$0.MINI_TEMP_BUFFER_SIZE);
      var i$jscomp$87 = 0;
      for (; i$jscomp$87 < GL$jscomp$0.MINI_TEMP_BUFFER_SIZE; i$jscomp$87++) {
        GL$jscomp$0.miniTempBufferViews[i$jscomp$87] = GL$jscomp$0.miniTempBuffer.subarray(0, i$jscomp$87 + 1);
      }
      i$jscomp$87 = 0;
      for (; i$jscomp$87 < 32; i$jscomp$87++) {
        GL$jscomp$0.tempFixedLengthArray.push(new Array(i$jscomp$87));
      }
    },
    recordError : function recordError$jscomp$0(errorCode$jscomp$0) {
      if (!GL$jscomp$0.lastError) {
        GL$jscomp$0.lastError = errorCode$jscomp$0;
      }
    },
    getNewId : function(table$jscomp$0) {
      var ret$jscomp$34 = GL$jscomp$0.counter++;
      var i$jscomp$88 = table$jscomp$0.length;
      for (; i$jscomp$88 < ret$jscomp$34; i$jscomp$88++) {
        table$jscomp$0[i$jscomp$88] = null;
      }
      return ret$jscomp$34;
    },
    MINI_TEMP_BUFFER_SIZE : 256,
    miniTempBuffer : null,
    miniTempBufferViews : [0],
    getSource : function(shader$jscomp$18, count$jscomp$38, string$jscomp$4, length$jscomp$55) {
      var source$jscomp$16 = "";
      var i$jscomp$89 = 0;
      for (; i$jscomp$89 < count$jscomp$38; ++i$jscomp$89) {
        var frag$jscomp$0;
        if (length$jscomp$55) {
          var len$jscomp$14 = HEAP32$jscomp$0[length$jscomp$55 + i$jscomp$89 * 4 >> 2];
          if (len$jscomp$14 < 0) {
            frag$jscomp$0 = Pointer_stringify$jscomp$0(HEAP32$jscomp$0[string$jscomp$4 + i$jscomp$89 * 4 >> 2]);
          } else {
            frag$jscomp$0 = Pointer_stringify$jscomp$0(HEAP32$jscomp$0[string$jscomp$4 + i$jscomp$89 * 4 >> 2], len$jscomp$14);
          }
        } else {
          frag$jscomp$0 = Pointer_stringify$jscomp$0(HEAP32$jscomp$0[string$jscomp$4 + i$jscomp$89 * 4 >> 2]);
        }
        source$jscomp$16 = source$jscomp$16 + frag$jscomp$0;
      }
      return source$jscomp$16;
    },
    createContext : function(canvas$jscomp$13, webGLContextAttributes$jscomp$1) {
      function onContextCreationError$jscomp$0(event$jscomp$29) {
        errorInfo$jscomp$0 = event$jscomp$29.statusMessage || errorInfo$jscomp$0;
      }
      if (typeof webGLContextAttributes$jscomp$1["majorVersion"] === "undefined" && typeof webGLContextAttributes$jscomp$1["minorVersion"] === "undefined") {
        if (typeof WebGL2RenderingContext !== "undefined") {
          webGLContextAttributes$jscomp$1["majorVersion"] = 2;
        } else {
          webGLContextAttributes$jscomp$1["majorVersion"] = 1;
        }
        webGLContextAttributes$jscomp$1["minorVersion"] = 0;
      }
      var ctx$jscomp$2;
      var errorInfo$jscomp$0 = "?";
      webGLContextAttributes$jscomp$1["powerPreference"] = "high-performance";
      try {
        canvas$jscomp$13.addEventListener("webglcontextcreationerror", onContextCreationError$jscomp$0, false);
        try {
          if (webGLContextAttributes$jscomp$1["majorVersion"] == 1 && webGLContextAttributes$jscomp$1["minorVersion"] == 0) {
            ctx$jscomp$2 = canvas$jscomp$13.getContext("webgl", webGLContextAttributes$jscomp$1) || canvas$jscomp$13.getContext("experimental-webgl", webGLContextAttributes$jscomp$1);
          } else {
            if (webGLContextAttributes$jscomp$1["majorVersion"] == 2 && webGLContextAttributes$jscomp$1["minorVersion"] == 0) {
              ctx$jscomp$2 = canvas$jscomp$13.getContext("webgl2", webGLContextAttributes$jscomp$1);
            } else {
              throw "Unsupported WebGL context version " + majorVersion + "." + minorVersion + "!";
            }
          }
        } finally {
          canvas$jscomp$13.removeEventListener("webglcontextcreationerror", onContextCreationError$jscomp$0, false);
        }
        if (!ctx$jscomp$2) {
          throw ":(";
        }
      } catch (e$jscomp$350) {
        out$jscomp$0("Could not create canvas: " + [errorInfo$jscomp$0, e$jscomp$350, JSON.stringify(webGLContextAttributes$jscomp$1)]);
        return 0;
      }
      if (!ctx$jscomp$2) {
        return 0;
      }
      var context$jscomp$1 = GL$jscomp$0.registerContext(ctx$jscomp$2, webGLContextAttributes$jscomp$1);
      return context$jscomp$1;
    },
    registerContext : function(ctx$jscomp$3, webGLContextAttributes$jscomp$2) {
      function getChromeVersion$jscomp$0() {
        var raw$jscomp$0 = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        return raw$jscomp$0 ? parseInt(raw$jscomp$0[2], 10) : false;
      }
      var handle$jscomp$15 = _malloc$jscomp$0(8);
      HEAP32$jscomp$0[handle$jscomp$15 >> 2] = webGLContextAttributes$jscomp$2["explicitSwapControl"];
      var context$jscomp$2 = {
        handle : handle$jscomp$15,
        attributes : webGLContextAttributes$jscomp$2,
        version : webGLContextAttributes$jscomp$2["majorVersion"],
        GLctx : ctx$jscomp$3
      };
      context$jscomp$2.supportsWebGL2EntryPoints = context$jscomp$2.version >= 2 && (getChromeVersion$jscomp$0() === false || getChromeVersion$jscomp$0() >= 58);
      if (ctx$jscomp$3.canvas) {
        ctx$jscomp$3.canvas.GLctxObject = context$jscomp$2;
      }
      GL$jscomp$0.contexts[handle$jscomp$15] = context$jscomp$2;
      if (typeof webGLContextAttributes$jscomp$2["enableExtensionsByDefault"] === "undefined" || webGLContextAttributes$jscomp$2["enableExtensionsByDefault"]) {
        GL$jscomp$0.initExtensions(context$jscomp$2);
      }
      if (webGLContextAttributes$jscomp$2["renderViaOffscreenBackBuffer"]) {
        return 0;
      }
      return handle$jscomp$15;
    },
    makeContextCurrent : function(contextHandle$jscomp$5) {
      if (!contextHandle$jscomp$5) {
        GLctx$jscomp$0 = Module$jscomp$0.ctx = GL$jscomp$0.currentContext = null;
        return true;
      }
      var context$jscomp$3 = GL$jscomp$0.contexts[contextHandle$jscomp$5];
      if (!context$jscomp$3) {
        return false;
      }
      GLctx$jscomp$0 = Module$jscomp$0.ctx = context$jscomp$3.GLctx;
      GL$jscomp$0.currentContext = context$jscomp$3;
      return true;
    },
    getContext : function(contextHandle$jscomp$6) {
      return GL$jscomp$0.contexts[contextHandle$jscomp$6];
    },
    deleteContext : function(contextHandle$jscomp$7) {
      if (!contextHandle$jscomp$7) {
        return;
      }
      if (GL$jscomp$0.currentContext === GL$jscomp$0.contexts[contextHandle$jscomp$7]) {
        GL$jscomp$0.currentContext = null;
      }
      if (typeof JSEvents$jscomp$0 === "object") {
        JSEvents$jscomp$0.removeAllHandlersOnTarget(GL$jscomp$0.contexts[contextHandle$jscomp$7].GLctx.canvas);
      }
      if (GL$jscomp$0.contexts[contextHandle$jscomp$7] && GL$jscomp$0.contexts[contextHandle$jscomp$7].GLctx.canvas) {
        GL$jscomp$0.contexts[contextHandle$jscomp$7].GLctx.canvas.GLctxObject = undefined;
      }
      _free$jscomp$0(GL$jscomp$0.contexts[contextHandle$jscomp$7]);
      GL$jscomp$0.contexts[contextHandle$jscomp$7] = null;
    },
    initExtensions : function(context$jscomp$4) {
      if (!context$jscomp$4) {
        context$jscomp$4 = GL$jscomp$0.currentContext;
      }
      if (context$jscomp$4.initExtensionsDone) {
        return;
      }
      context$jscomp$4.initExtensionsDone = true;
      var GLctx$jscomp$1 = context$jscomp$4.GLctx;
      context$jscomp$4.maxVertexAttribs = GLctx$jscomp$1.getParameter(GLctx$jscomp$1.MAX_VERTEX_ATTRIBS);
      if (context$jscomp$4.version < 2) {
        var instancedArraysExt$jscomp$0 = GLctx$jscomp$1.getExtension("ANGLE_instanced_arrays");
        if (instancedArraysExt$jscomp$0) {
          GLctx$jscomp$1["vertexAttribDivisor"] = function(index$jscomp$279, divisor$jscomp$1) {
            instancedArraysExt$jscomp$0["vertexAttribDivisorANGLE"](index$jscomp$279, divisor$jscomp$1);
          };
          GLctx$jscomp$1["drawArraysInstanced"] = function(mode$jscomp$51, first$jscomp$6, count$jscomp$39, primcount$jscomp$4) {
            instancedArraysExt$jscomp$0["drawArraysInstancedANGLE"](mode$jscomp$51, first$jscomp$6, count$jscomp$39, primcount$jscomp$4);
          };
          GLctx$jscomp$1["drawElementsInstanced"] = function(mode$jscomp$52, count$jscomp$40, type$jscomp$142, indices$jscomp$2, primcount$jscomp$5) {
            instancedArraysExt$jscomp$0["drawElementsInstancedANGLE"](mode$jscomp$52, count$jscomp$40, type$jscomp$142, indices$jscomp$2, primcount$jscomp$5);
          };
        }
        var vaoExt$jscomp$0 = GLctx$jscomp$1.getExtension("OES_vertex_array_object");
        if (vaoExt$jscomp$0) {
          GLctx$jscomp$1["createVertexArray"] = function() {
            return vaoExt$jscomp$0["createVertexArrayOES"]();
          };
          GLctx$jscomp$1["deleteVertexArray"] = function(vao$jscomp$3) {
            vaoExt$jscomp$0["deleteVertexArrayOES"](vao$jscomp$3);
          };
          GLctx$jscomp$1["bindVertexArray"] = function(vao$jscomp$4) {
            vaoExt$jscomp$0["bindVertexArrayOES"](vao$jscomp$4);
          };
          GLctx$jscomp$1["isVertexArray"] = function(vao$jscomp$5) {
            return vaoExt$jscomp$0["isVertexArrayOES"](vao$jscomp$5);
          };
        }
        var drawBuffersExt$jscomp$0 = GLctx$jscomp$1.getExtension("WEBGL_draw_buffers");
        if (drawBuffersExt$jscomp$0) {
          GLctx$jscomp$1["drawBuffers"] = function(n$jscomp$21, bufs$jscomp$1) {
            drawBuffersExt$jscomp$0["drawBuffersWEBGL"](n$jscomp$21, bufs$jscomp$1);
          };
        }
      }
      GLctx$jscomp$1.disjointTimerQueryExt = GLctx$jscomp$1.getExtension("EXT_disjoint_timer_query");
      var automaticallyEnabledExtensions$jscomp$0 = ["OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "EXT_texture_norm16", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", 
      "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2", "WEBKIT_WEBGL_compressed_texture_pvrtc"];
      var exts$jscomp$3 = GLctx$jscomp$1.getSupportedExtensions();
      if (exts$jscomp$3 && exts$jscomp$3.length > 0) {
        GLctx$jscomp$1.getSupportedExtensions().forEach(function(ext$jscomp$1) {
          if (automaticallyEnabledExtensions$jscomp$0.indexOf(ext$jscomp$1) != -1) {
            GLctx$jscomp$1.getExtension(ext$jscomp$1);
          }
        });
      }
    },
    populateUniformTable : function(program$jscomp$42) {
      var p$jscomp$11 = GL$jscomp$0.programs[program$jscomp$42];
      GL$jscomp$0.programInfos[program$jscomp$42] = {
        uniforms : {},
        maxUniformLength : 0,
        maxAttributeLength : -1,
        maxUniformBlockNameLength : -1
      };
      var ptable$jscomp$2 = GL$jscomp$0.programInfos[program$jscomp$42];
      var utable$jscomp$1 = ptable$jscomp$2.uniforms;
      var numUniforms$jscomp$0 = GLctx$jscomp$0.getProgramParameter(p$jscomp$11, GLctx$jscomp$0.ACTIVE_UNIFORMS);
      var i$jscomp$90 = 0;
      for (; i$jscomp$90 < numUniforms$jscomp$0; ++i$jscomp$90) {
        var u$jscomp$2 = GLctx$jscomp$0.getActiveUniform(p$jscomp$11, i$jscomp$90);
        var name$jscomp$116 = u$jscomp$2.name;
        ptable$jscomp$2.maxUniformLength = Math.max(ptable$jscomp$2.maxUniformLength, name$jscomp$116.length + 1);
        if (name$jscomp$116.indexOf("]", name$jscomp$116.length - 1) !== -1) {
          var ls$jscomp$1 = name$jscomp$116.lastIndexOf("[");
          name$jscomp$116 = name$jscomp$116.slice(0, ls$jscomp$1);
        }
        var loc$jscomp$0 = GLctx$jscomp$0.getUniformLocation(p$jscomp$11, name$jscomp$116);
        if (loc$jscomp$0 != null) {
          var id$jscomp$39 = GL$jscomp$0.getNewId(GL$jscomp$0.uniforms);
          utable$jscomp$1[name$jscomp$116] = [u$jscomp$2.size, id$jscomp$39];
          GL$jscomp$0.uniforms[id$jscomp$39] = loc$jscomp$0;
          var j$jscomp$0 = 1;
          for (; j$jscomp$0 < u$jscomp$2.size; ++j$jscomp$0) {
            var n$jscomp$22 = name$jscomp$116 + "[" + j$jscomp$0 + "]";
            loc$jscomp$0 = GLctx$jscomp$0.getUniformLocation(p$jscomp$11, n$jscomp$22);
            id$jscomp$39 = GL$jscomp$0.getNewId(GL$jscomp$0.uniforms);
            GL$jscomp$0.uniforms[id$jscomp$39] = loc$jscomp$0;
          }
        }
      }
    }
  };
  var ___tm_current$jscomp$0 = STATICTOP$jscomp$0;
  STATICTOP$jscomp$0 = STATICTOP$jscomp$0 + 48;
  var ___tm_timezone$jscomp$0 = allocate$jscomp$0(intArrayFromString$jscomp$0("GMT"), "i8", ALLOC_STATIC$jscomp$0);
  var _llvm_ceil_f32$jscomp$0 = Math_ceil$jscomp$0;
  var _llvm_ceil_f64$jscomp$0 = Math_ceil$jscomp$0;
  var _llvm_fabs_f32$jscomp$0 = Math_abs$jscomp$0;
  var _llvm_fabs_f64$jscomp$0 = Math_abs$jscomp$0;
  var _llvm_floor_f32$jscomp$0 = Math_floor$jscomp$0;
  var _llvm_floor_f64$jscomp$0 = Math_floor$jscomp$0;
  var _llvm_pow_f64$jscomp$0 = Math_pow$jscomp$0;
  var _llvm_sqrt_f32$jscomp$0 = Math_sqrt$jscomp$0;
  var _llvm_trunc_f32$jscomp$0 = Math_trunc$jscomp$0;
  var PTHREAD_SPECIFIC$jscomp$0 = {};
  var PTHREAD_SPECIFIC_NEXT_KEY$jscomp$0 = 1;
  var __MONTH_DAYS_LEAP$jscomp$0 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var __MONTH_DAYS_REGULAR$jscomp$0 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  FS$jscomp$0.staticInit();
  __ATINIT__$jscomp$0.unshift(function() {
    if (!Module$jscomp$0["noFSInit"] && !FS$jscomp$0.init.initialized) {
      FS$jscomp$0.init();
    }
  });
  __ATMAIN__$jscomp$0.push(function() {
    FS$jscomp$0.ignorePermissions = false;
  });
  __ATEXIT__$jscomp$0.push(function() {
    FS$jscomp$0.quit();
  });
  Module$jscomp$0["FS_createPath"] = FS$jscomp$0.createPath;
  Module$jscomp$0["FS_createDataFile"] = FS$jscomp$0.createDataFile;
  __ATINIT__$jscomp$0.unshift(function() {
    TTY$jscomp$0.init();
  });
  __ATEXIT__$jscomp$0.push(function() {
    TTY$jscomp$0.shutdown();
  });
  if (ENVIRONMENT_IS_NODE$jscomp$0) {
    fs$jscomp$0 = require("fs");
    var NODEJS_PATH$jscomp$0 = require("path");
    NODEFS$jscomp$0.staticInit();
  }
  if (ENVIRONMENT_IS_NODE$jscomp$0) {
    _emscripten_get_now$jscomp$0 = function _emscripten_get_now_actual$jscomp$0() {
      var t$jscomp$3 = process["hrtime"]();
      return t$jscomp$3[0] * 1E3 + t$jscomp$3[1] / 1E6;
    };
  } else {
    if (typeof dateNow !== "undefined") {
      _emscripten_get_now$jscomp$0 = dateNow;
    } else {
      if (typeof self === "object" && self["performance"] && typeof self["performance"]["now"] === "function") {
        _emscripten_get_now$jscomp$0 = function() {
          return self["performance"]["now"]();
        };
      } else {
        if (typeof performance === "object" && typeof performance["now"] === "function") {
          _emscripten_get_now$jscomp$0 = function() {
            return performance["now"]();
          };
        } else {
          _emscripten_get_now$jscomp$0 = Date.now;
        }
      }
    }
  }
  Module$jscomp$0["requestFullScreen"] = function Module_requestFullScreen$jscomp$0(lockPointer$jscomp$3, resizeCanvas$jscomp$3, vrDevice$jscomp$3) {
    err$jscomp$3("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
    Module$jscomp$0["requestFullScreen"] = Module$jscomp$0["requestFullscreen"];
    Browser$jscomp$0.requestFullScreen(lockPointer$jscomp$3, resizeCanvas$jscomp$3, vrDevice$jscomp$3);
  };
  Module$jscomp$0["requestFullscreen"] = function Module_requestFullscreen$jscomp$0(lockPointer$jscomp$4, resizeCanvas$jscomp$4, vrDevice$jscomp$4) {
    Browser$jscomp$0.requestFullscreen(lockPointer$jscomp$4, resizeCanvas$jscomp$4, vrDevice$jscomp$4);
  };
  Module$jscomp$0["requestAnimationFrame"] = function Module_requestAnimationFrame$jscomp$0(func$jscomp$26) {
    Browser$jscomp$0.requestAnimationFrame(func$jscomp$26);
  };
  Module$jscomp$0["setCanvasSize"] = function Module_setCanvasSize$jscomp$0(width$jscomp$30, height$jscomp$28, noUpdates$jscomp$1) {
    Browser$jscomp$0.setCanvasSize(width$jscomp$30, height$jscomp$28, noUpdates$jscomp$1);
  };
  Module$jscomp$0["pauseMainLoop"] = function Module_pauseMainLoop$jscomp$0() {
    Browser$jscomp$0.mainLoop.pause();
  };
  Module$jscomp$0["resumeMainLoop"] = function Module_resumeMainLoop$jscomp$0() {
    Browser$jscomp$0.mainLoop.resume();
  };
  Module$jscomp$0["getUserMedia"] = function Module_getUserMedia$jscomp$0() {
    Browser$jscomp$0.getUserMedia();
  };
  Module$jscomp$0["createContext"] = function Module_createContext$jscomp$0(canvas$jscomp$14, useWebGL$jscomp$2, setInModule$jscomp$2, webGLContextAttributes$jscomp$3) {
    return Browser$jscomp$0.createContext(canvas$jscomp$14, useWebGL$jscomp$2, setInModule$jscomp$2, webGLContextAttributes$jscomp$3);
  };
  JSEvents$jscomp$0.staticInit();
  var GLctx$jscomp$0;
  GL$jscomp$0.init();
  DYNAMICTOP_PTR$jscomp$0 = staticAlloc$jscomp$0(4);
  STACK_BASE$jscomp$0 = STACKTOP$jscomp$0 = alignMemory$jscomp$0(STATICTOP$jscomp$0);
  STACK_MAX$jscomp$0 = STACK_BASE$jscomp$0 + TOTAL_STACK$jscomp$0;
  DYNAMIC_BASE$jscomp$0 = alignMemory$jscomp$0(STACK_MAX$jscomp$0);
  HEAP32$jscomp$0[DYNAMICTOP_PTR$jscomp$0 >> 2] = DYNAMIC_BASE$jscomp$0;
  staticSealed$jscomp$0 = true;
  Module$jscomp$0["wasmTableSize"] = 48435;
  Module$jscomp$0["wasmMaxTableSize"] = 48435;
  Module$jscomp$0.asmGlobalArg = {};
  Module$jscomp$0.asmLibraryArg = {
    "abort" : abort$jscomp$0,
    "assert" : assert$jscomp$0,
    "enlargeMemory" : enlargeMemory$jscomp$0,
    "getTotalMemory" : getTotalMemory$jscomp$0,
    "abortOnCannotGrowMemory" : abortOnCannotGrowMemory$jscomp$0,
    "invoke_dddi" : invoke_dddi$jscomp$0,
    "invoke_ddi" : invoke_ddi$jscomp$0,
    "invoke_dfi" : invoke_dfi$jscomp$0,
    "invoke_di" : invoke_di$jscomp$0,
    "invoke_diddi" : invoke_diddi$jscomp$0,
    "invoke_didi" : invoke_didi$jscomp$0,
    "invoke_dii" : invoke_dii$jscomp$0,
    "invoke_diii" : invoke_diii$jscomp$0,
    "invoke_diiii" : invoke_diiii$jscomp$0,
    "invoke_dji" : invoke_dji$jscomp$0,
    "invoke_f" : invoke_f$jscomp$0,
    "invoke_fdi" : invoke_fdi$jscomp$0,
    "invoke_ff" : invoke_ff$jscomp$0,
    "invoke_fff" : invoke_fff$jscomp$0,
    "invoke_ffffi" : invoke_ffffi$jscomp$0,
    "invoke_fffi" : invoke_fffi$jscomp$0,
    "invoke_fffifffi" : invoke_fffifffi$jscomp$0,
    "invoke_ffi" : invoke_ffi$jscomp$0,
    "invoke_fi" : invoke_fi$jscomp$0,
    "invoke_fif" : invoke_fif$jscomp$0,
    "invoke_fiffi" : invoke_fiffi$jscomp$0,
    "invoke_fifi" : invoke_fifi$jscomp$0,
    "invoke_fifii" : invoke_fifii$jscomp$0,
    "invoke_fii" : invoke_fii$jscomp$0,
    "invoke_fiifi" : invoke_fiifi$jscomp$0,
    "invoke_fiifii" : invoke_fiifii$jscomp$0,
    "invoke_fiii" : invoke_fiii$jscomp$0,
    "invoke_fiiii" : invoke_fiiii$jscomp$0,
    "invoke_fiiiif" : invoke_fiiiif$jscomp$0,
    "invoke_fji" : invoke_fji$jscomp$0,
    "invoke_i" : invoke_i$jscomp$0,
    "invoke_idi" : invoke_idi$jscomp$0,
    "invoke_idiii" : invoke_idiii$jscomp$0,
    "invoke_ifffi" : invoke_ifffi$jscomp$0,
    "invoke_iffi" : invoke_iffi$jscomp$0,
    "invoke_ifi" : invoke_ifi$jscomp$0,
    "invoke_ifiii" : invoke_ifiii$jscomp$0,
    "invoke_ii" : invoke_ii$jscomp$0,
    "invoke_iidi" : invoke_iidi$jscomp$0,
    "invoke_iidii" : invoke_iidii$jscomp$0,
    "invoke_iif" : invoke_iif$jscomp$0,
    "invoke_iifffi" : invoke_iifffi$jscomp$0,
    "invoke_iiffi" : invoke_iiffi$jscomp$0,
    "invoke_iifi" : invoke_iifi$jscomp$0,
    "invoke_iifii" : invoke_iifii$jscomp$0,
    "invoke_iifiii" : invoke_iifiii$jscomp$0,
    "invoke_iii" : invoke_iii$jscomp$0,
    "invoke_iiif" : invoke_iiif$jscomp$0,
    "invoke_iiiff" : invoke_iiiff$jscomp$0,
    "invoke_iiifi" : invoke_iiifi$jscomp$0,
    "invoke_iiifii" : invoke_iiifii$jscomp$0,
    "invoke_iiifiii" : invoke_iiifiii$jscomp$0,
    "invoke_iiifiiii" : invoke_iiifiiii$jscomp$0,
    "invoke_iiii" : invoke_iiii$jscomp$0,
    "invoke_iiiifi" : invoke_iiiifi$jscomp$0,
    "invoke_iiiifii" : invoke_iiiifii$jscomp$0,
    "invoke_iiiifiii" : invoke_iiiifiii$jscomp$0,
    "invoke_iiiifiiii" : invoke_iiiifiiii$jscomp$0,
    "invoke_iiiii" : invoke_iiiii$jscomp$0,
    "invoke_iiiiifi" : invoke_iiiiifi$jscomp$0,
    "invoke_iiiiii" : invoke_iiiiii$jscomp$0,
    "invoke_iiiiiifffiiifiii" : invoke_iiiiiifffiiifiii$jscomp$0,
    "invoke_iiiiiiffiiiiiiiiiffffiii" : invoke_iiiiiiffiiiiiiiiiffffiii$jscomp$0,
    "invoke_iiiiiiffiiiiiiiiiffffiiii" : invoke_iiiiiiffiiiiiiiiiffffiiii$jscomp$0,
    "invoke_iiiiiiffiiiiiiiiiiiiiii" : invoke_iiiiiiffiiiiiiiiiiiiiii$jscomp$0,
    "invoke_iiiiiii" : invoke_iiiiiii$jscomp$0,
    "invoke_iiiiiiii" : invoke_iiiiiiii$jscomp$0,
    "invoke_iiiiiiiii" : invoke_iiiiiiiii$jscomp$0,
    "invoke_iiiiiiiiii" : invoke_iiiiiiiiii$jscomp$0,
    "invoke_iiiiiiiiiii" : invoke_iiiiiiiiiii$jscomp$0,
    "invoke_iiiiiiiiiiii" : invoke_iiiiiiiiiiii$jscomp$0,
    "invoke_iiiiiiiiiiiii" : invoke_iiiiiiiiiiiii$jscomp$0,
    "invoke_iiiiiiiiiiiiii" : invoke_iiiiiiiiiiiiii$jscomp$0,
    "invoke_iiiiiji" : invoke_iiiiiji$jscomp$0,
    "invoke_iiiij" : invoke_iiiij$jscomp$0,
    "invoke_iiiiji" : invoke_iiiiji$jscomp$0,
    "invoke_iiiijii" : invoke_iiiijii$jscomp$0,
    "invoke_iiiijiii" : invoke_iiiijiii$jscomp$0,
    "invoke_iiij" : invoke_iiij$jscomp$0,
    "invoke_iiiji" : invoke_iiiji$jscomp$0,
    "invoke_iiijii" : invoke_iiijii$jscomp$0,
    "invoke_iiijiii" : invoke_iiijiii$jscomp$0,
    "invoke_iij" : invoke_iij$jscomp$0,
    "invoke_iiji" : invoke_iiji$jscomp$0,
    "invoke_iijii" : invoke_iijii$jscomp$0,
    "invoke_iijiii" : invoke_iijiii$jscomp$0,
    "invoke_iijji" : invoke_iijji$jscomp$0,
    "invoke_iijjii" : invoke_iijjii$jscomp$0,
    "invoke_iijjiii" : invoke_iijjiii$jscomp$0,
    "invoke_iijjji" : invoke_iijjji$jscomp$0,
    "invoke_ij" : invoke_ij$jscomp$0,
    "invoke_iji" : invoke_iji$jscomp$0,
    "invoke_ijiii" : invoke_ijiii$jscomp$0,
    "invoke_ijj" : invoke_ijj$jscomp$0,
    "invoke_ijji" : invoke_ijji$jscomp$0,
    "invoke_j" : invoke_j$jscomp$0,
    "invoke_jdi" : invoke_jdi$jscomp$0,
    "invoke_jdii" : invoke_jdii$jscomp$0,
    "invoke_jfi" : invoke_jfi$jscomp$0,
    "invoke_ji" : invoke_ji$jscomp$0,
    "invoke_jidi" : invoke_jidi$jscomp$0,
    "invoke_jidii" : invoke_jidii$jscomp$0,
    "invoke_jii" : invoke_jii$jscomp$0,
    "invoke_jiii" : invoke_jiii$jscomp$0,
    "invoke_jiiii" : invoke_jiiii$jscomp$0,
    "invoke_jiiiii" : invoke_jiiiii$jscomp$0,
    "invoke_jiiiiii" : invoke_jiiiiii$jscomp$0,
    "invoke_jiiiiiiiiii" : invoke_jiiiiiiiiii$jscomp$0,
    "invoke_jiiji" : invoke_jiiji$jscomp$0,
    "invoke_jiji" : invoke_jiji$jscomp$0,
    "invoke_jijii" : invoke_jijii$jscomp$0,
    "invoke_jijiii" : invoke_jijiii$jscomp$0,
    "invoke_jijj" : invoke_jijj$jscomp$0,
    "invoke_jijji" : invoke_jijji$jscomp$0,
    "invoke_jji" : invoke_jji$jscomp$0,
    "invoke_v" : invoke_v$jscomp$0,
    "invoke_vd" : invoke_vd$jscomp$0,
    "invoke_vf" : invoke_vf$jscomp$0,
    "invoke_vff" : invoke_vff$jscomp$0,
    "invoke_vffff" : invoke_vffff$jscomp$0,
    "invoke_vfi" : invoke_vfi$jscomp$0,
    "invoke_vi" : invoke_vi$jscomp$0,
    "invoke_vid" : invoke_vid$jscomp$0,
    "invoke_vidi" : invoke_vidi$jscomp$0,
    "invoke_vif" : invoke_vif$jscomp$0,
    "invoke_viff" : invoke_viff$jscomp$0,
    "invoke_vifff" : invoke_vifff$jscomp$0,
    "invoke_viffff" : invoke_viffff$jscomp$0,
    "invoke_viffffi" : invoke_viffffi$jscomp$0,
    "invoke_viffffii" : invoke_viffffii$jscomp$0,
    "invoke_vifffi" : invoke_vifffi$jscomp$0,
    "invoke_vifffii" : invoke_vifffii$jscomp$0,
    "invoke_viffi" : invoke_viffi$jscomp$0,
    "invoke_viffii" : invoke_viffii$jscomp$0,
    "invoke_viffiii" : invoke_viffiii$jscomp$0,
    "invoke_vifi" : invoke_vifi$jscomp$0,
    "invoke_vifii" : invoke_vifii$jscomp$0,
    "invoke_vii" : invoke_vii$jscomp$0,
    "invoke_viid" : invoke_viid$jscomp$0,
    "invoke_viidi" : invoke_viidi$jscomp$0,
    "invoke_viidii" : invoke_viidii$jscomp$0,
    "invoke_viif" : invoke_viif$jscomp$0,
    "invoke_viiff" : invoke_viiff$jscomp$0,
    "invoke_viifff" : invoke_viifff$jscomp$0,
    "invoke_viiffi" : invoke_viiffi$jscomp$0,
    "invoke_viiffii" : invoke_viiffii$jscomp$0,
    "invoke_viifi" : invoke_viifi$jscomp$0,
    "invoke_viifii" : invoke_viifii$jscomp$0,
    "invoke_viifiii" : invoke_viifiii$jscomp$0,
    "invoke_viifiiii" : invoke_viifiiii$jscomp$0,
    "invoke_viii" : invoke_viii$jscomp$0,
    "invoke_viiidi" : invoke_viiidi$jscomp$0,
    "invoke_viiif" : invoke_viiif$jscomp$0,
    "invoke_viiifffi" : invoke_viiifffi$jscomp$0,
    "invoke_viiiffi" : invoke_viiiffi$jscomp$0,
    "invoke_viiifi" : invoke_viiifi$jscomp$0,
    "invoke_viiififfi" : invoke_viiififfi$jscomp$0,
    "invoke_viiififi" : invoke_viiififi$jscomp$0,
    "invoke_viiififii" : invoke_viiififii$jscomp$0,
    "invoke_viiififiii" : invoke_viiififiii$jscomp$0,
    "invoke_viiifii" : invoke_viiifii$jscomp$0,
    "invoke_viiifiii" : invoke_viiifiii$jscomp$0,
    "invoke_viiii" : invoke_viiii$jscomp$0,
    "invoke_viiiif" : invoke_viiiif$jscomp$0,
    "invoke_viiiififii" : invoke_viiiififii$jscomp$0,
    "invoke_viiiifii" : invoke_viiiifii$jscomp$0,
    "invoke_viiiii" : invoke_viiiii$jscomp$0,
    "invoke_viiiiif" : invoke_viiiiif$jscomp$0,
    "invoke_viiiiiffi" : invoke_viiiiiffi$jscomp$0,
    "invoke_viiiiiffii" : invoke_viiiiiffii$jscomp$0,
    "invoke_viiiiifi" : invoke_viiiiifi$jscomp$0,
    "invoke_viiiiii" : invoke_viiiiii$jscomp$0,
    "invoke_viiiiiif" : invoke_viiiiiif$jscomp$0,
    "invoke_viiiiiii" : invoke_viiiiiii$jscomp$0,
    "invoke_viiiiiiifi" : invoke_viiiiiiifi$jscomp$0,
    "invoke_viiiiiiii" : invoke_viiiiiiii$jscomp$0,
    "invoke_viiiiiiiii" : invoke_viiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiii" : invoke_viiiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiiii" : invoke_viiiiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiiiii" : invoke_viiiiiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiiiiiii" : invoke_viiiiiiiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiiiiiiii" : invoke_viiiiiiiiiiiiiii$jscomp$0,
    "invoke_viiiiiiiiiiiiiiiiii" : invoke_viiiiiiiiiiiiiiiiii$jscomp$0,
    "invoke_viiiijiiii" : invoke_viiiijiiii$jscomp$0,
    "invoke_viiiji" : invoke_viiiji$jscomp$0,
    "invoke_viiijji" : invoke_viiijji$jscomp$0,
    "invoke_viij" : invoke_viij$jscomp$0,
    "invoke_viiji" : invoke_viiji$jscomp$0,
    "invoke_viijii" : invoke_viijii$jscomp$0,
    "invoke_viijiijiii" : invoke_viijiijiii$jscomp$0,
    "invoke_viijijii" : invoke_viijijii$jscomp$0,
    "invoke_viijijiii" : invoke_viijijiii$jscomp$0,
    "invoke_viijj" : invoke_viijj$jscomp$0,
    "invoke_viijji" : invoke_viijji$jscomp$0,
    "invoke_viijjiii" : invoke_viijjiii$jscomp$0,
    "invoke_viijjji" : invoke_viijjji$jscomp$0,
    "invoke_vij" : invoke_vij$jscomp$0,
    "invoke_viji" : invoke_viji$jscomp$0,
    "invoke_vijii" : invoke_vijii$jscomp$0,
    "invoke_vijiii" : invoke_vijiii$jscomp$0,
    "invoke_vijiji" : invoke_vijiji$jscomp$0,
    "invoke_vijijji" : invoke_vijijji$jscomp$0,
    "invoke_vijji" : invoke_vijji$jscomp$0,
    "invoke_vijjii" : invoke_vijjii$jscomp$0,
    "invoke_vji" : invoke_vji$jscomp$0,
    "invoke_vjiiii" : invoke_vjiiii$jscomp$0,
    "invoke_vjji" : invoke_vjji$jscomp$0,
    "_JS_Cursor_SetImage" : _JS_Cursor_SetImage$jscomp$0,
    "_JS_Cursor_SetShow" : _JS_Cursor_SetShow$jscomp$0,
    "_JS_Eval_ClearInterval" : _JS_Eval_ClearInterval$jscomp$0,
    "_JS_Eval_SetInterval" : _JS_Eval_SetInterval$jscomp$0,
    "_JS_FileSystem_Initialize" : _JS_FileSystem_Initialize$jscomp$0,
    "_JS_FileSystem_Sync" : _JS_FileSystem_Sync$jscomp$0,
    "_JS_Log_Dump" : _JS_Log_Dump$jscomp$0,
    "_JS_Log_StackTrace" : _JS_Log_StackTrace$jscomp$0,
    "_JS_Sound_Create_Channel" : _JS_Sound_Create_Channel$jscomp$0,
    "_JS_Sound_GetLength" : _JS_Sound_GetLength$jscomp$0,
    "_JS_Sound_GetLoadState" : _JS_Sound_GetLoadState$jscomp$0,
    "_JS_Sound_Init" : _JS_Sound_Init$jscomp$0,
    "_JS_Sound_Load" : _JS_Sound_Load$jscomp$0,
    "_JS_Sound_Load_PCM" : _JS_Sound_Load_PCM$jscomp$0,
    "_JS_Sound_Play" : _JS_Sound_Play$jscomp$0,
    "_JS_Sound_ReleaseInstance" : _JS_Sound_ReleaseInstance$jscomp$0,
    "_JS_Sound_ResumeIfNeeded" : _JS_Sound_ResumeIfNeeded$jscomp$0,
    "_JS_Sound_Set3D" : _JS_Sound_Set3D$jscomp$0,
    "_JS_Sound_SetListenerOrientation" : _JS_Sound_SetListenerOrientation$jscomp$0,
    "_JS_Sound_SetListenerPosition" : _JS_Sound_SetListenerPosition$jscomp$0,
    "_JS_Sound_SetLoop" : _JS_Sound_SetLoop$jscomp$0,
    "_JS_Sound_SetLoopPoints" : _JS_Sound_SetLoopPoints$jscomp$0,
    "_JS_Sound_SetPaused" : _JS_Sound_SetPaused$jscomp$0,
    "_JS_Sound_SetPitch" : _JS_Sound_SetPitch$jscomp$0,
    "_JS_Sound_SetPosition" : _JS_Sound_SetPosition$jscomp$0,
    "_JS_Sound_SetVolume" : _JS_Sound_SetVolume$jscomp$0,
    "_JS_Sound_Stop" : _JS_Sound_Stop$jscomp$0,
    "_JS_SystemInfo_GetCanvasClientSize" : _JS_SystemInfo_GetCanvasClientSize$jscomp$0,
    "_JS_SystemInfo_GetDocumentURL" : _JS_SystemInfo_GetDocumentURL$jscomp$0,
    "_JS_SystemInfo_GetGPUInfo" : _JS_SystemInfo_GetGPUInfo$jscomp$0,
    "_JS_SystemInfo_GetMatchWebGLToCanvasSize" : _JS_SystemInfo_GetMatchWebGLToCanvasSize$jscomp$0,
    "_JS_SystemInfo_GetMemory" : _JS_SystemInfo_GetMemory$jscomp$0,
    "_JS_SystemInfo_GetOS" : _JS_SystemInfo_GetOS$jscomp$0,
    "_JS_SystemInfo_GetPreferredDevicePixelRatio" : _JS_SystemInfo_GetPreferredDevicePixelRatio$jscomp$0,
    "_JS_SystemInfo_GetScreenSize" : _JS_SystemInfo_GetScreenSize$jscomp$0,
    "_JS_SystemInfo_HasCursorLock" : _JS_SystemInfo_HasCursorLock$jscomp$0,
    "_JS_SystemInfo_HasFullscreen" : _JS_SystemInfo_HasFullscreen$jscomp$0,
    "_JS_SystemInfo_HasWebGL" : _JS_SystemInfo_HasWebGL$jscomp$0,
    "__ZSt18uncaught_exceptionv" : __ZSt18uncaught_exceptionv$jscomp$0,
    "___atomic_compare_exchange_8" : ___atomic_compare_exchange_8$jscomp$0,
    "___atomic_fetch_add_8" : ___atomic_fetch_add_8$jscomp$0,
    "___buildEnvironment" : ___buildEnvironment$jscomp$0,
    "___cxa_allocate_exception" : ___cxa_allocate_exception$jscomp$0,
    "___cxa_begin_catch" : ___cxa_begin_catch$jscomp$0,
    "___cxa_end_catch" : ___cxa_end_catch$jscomp$0,
    "___cxa_find_matching_catch" : ___cxa_find_matching_catch$jscomp$0,
    "___cxa_find_matching_catch_2" : ___cxa_find_matching_catch_2$jscomp$0,
    "___cxa_find_matching_catch_3" : ___cxa_find_matching_catch_3$jscomp$0,
    "___cxa_find_matching_catch_4" : ___cxa_find_matching_catch_4$jscomp$0,
    "___cxa_free_exception" : ___cxa_free_exception$jscomp$0,
    "___cxa_pure_virtual" : ___cxa_pure_virtual$jscomp$0,
    "___cxa_rethrow" : ___cxa_rethrow$jscomp$0,
    "___cxa_throw" : ___cxa_throw$jscomp$0,
    "___gxx_personality_v0" : ___gxx_personality_v0$jscomp$0,
    "___lock" : ___lock$jscomp$0,
    "___map_file" : ___map_file$jscomp$0,
    "___resumeException" : ___resumeException$jscomp$0,
    "___setErrNo" : ___setErrNo$jscomp$0,
    "___syscall10" : ___syscall10$jscomp$0,
    "___syscall122" : ___syscall122$jscomp$0,
    "___syscall140" : ___syscall140$jscomp$0,
    "___syscall142" : ___syscall142$jscomp$0,
    "___syscall145" : ___syscall145$jscomp$0,
    "___syscall146" : ___syscall146$jscomp$0,
    "___syscall15" : ___syscall15$jscomp$0,
    "___syscall183" : ___syscall183$jscomp$0,
    "___syscall192" : ___syscall192$jscomp$0,
    "___syscall193" : ___syscall193$jscomp$0,
    "___syscall195" : ___syscall195$jscomp$0,
    "___syscall196" : ___syscall196$jscomp$0,
    "___syscall197" : ___syscall197$jscomp$0,
    "___syscall199" : ___syscall199$jscomp$0,
    "___syscall202" : ___syscall202$jscomp$0,
    "___syscall220" : ___syscall220$jscomp$0,
    "___syscall221" : ___syscall221$jscomp$0,
    "___syscall268" : ___syscall268$jscomp$0,
    "___syscall3" : ___syscall3$jscomp$0,
    "___syscall33" : ___syscall33$jscomp$0,
    "___syscall38" : ___syscall38$jscomp$0,
    "___syscall39" : ___syscall39$jscomp$0,
    "___syscall4" : ___syscall4$jscomp$0,
    "___syscall40" : ___syscall40$jscomp$0,
    "___syscall5" : ___syscall5$jscomp$0,
    "___syscall54" : ___syscall54$jscomp$0,
    "___syscall6" : ___syscall6$jscomp$0,
    "___syscall77" : ___syscall77$jscomp$0,
    "___syscall85" : ___syscall85$jscomp$0,
    "___syscall91" : ___syscall91$jscomp$0,
    "___unlock" : ___unlock$jscomp$0,
    "__addDays" : __addDays$jscomp$0,
    "__arraySum" : __arraySum$jscomp$0,
    "__emscripten_do_request_fullscreen" : __emscripten_do_request_fullscreen$jscomp$0,
    "__emscripten_sample_gamepad_data" : __emscripten_sample_gamepad_data$jscomp$0,
    "__emscripten_traverse_stack" : __emscripten_traverse_stack$jscomp$0,
    "__exit" : __exit$jscomp$0,
    "__formatString" : __formatString$jscomp$0,
    "__isLeapYear" : __isLeapYear$jscomp$0,
    "__reallyNegative" : __reallyNegative$jscomp$0,
    "__setLetterbox" : __setLetterbox$jscomp$0,
    "_abort" : _abort$jscomp$0,
    "_atexit" : _atexit$jscomp$0,
    "_clock" : _clock$jscomp$0,
    "_clock_getres" : _clock_getres$jscomp$0,
    "_clock_gettime" : _clock_gettime$jscomp$0,
    "_difftime" : _difftime$jscomp$0,
    "_dlclose" : _dlclose$jscomp$0,
    "_dlopen" : _dlopen$jscomp$0,
    "_dlsym" : _dlsym$jscomp$0,
    "_emscripten_asm_const_i" : _emscripten_asm_const_i$jscomp$0,
    "_emscripten_asm_const_sync_on_main_thread_i" : _emscripten_asm_const_sync_on_main_thread_i$jscomp$0,
    "_emscripten_cancel_main_loop" : _emscripten_cancel_main_loop$jscomp$0,
    "_emscripten_exit_fullscreen" : _emscripten_exit_fullscreen$jscomp$0,
    "_emscripten_exit_pointerlock" : _emscripten_exit_pointerlock$jscomp$0,
    "_emscripten_get_callstack_js" : _emscripten_get_callstack_js$jscomp$0,
    "_emscripten_get_canvas_element_size" : _emscripten_get_canvas_element_size$jscomp$0,
    "_emscripten_get_canvas_element_size_calling_thread" : _emscripten_get_canvas_element_size_calling_thread$jscomp$0,
    "_emscripten_get_canvas_element_size_main_thread" : _emscripten_get_canvas_element_size_main_thread$jscomp$0,
    "_emscripten_get_fullscreen_status" : _emscripten_get_fullscreen_status$jscomp$0,
    "_emscripten_get_gamepad_status" : _emscripten_get_gamepad_status$jscomp$0,
    "_emscripten_get_main_loop_timing" : _emscripten_get_main_loop_timing$jscomp$0,
    "_emscripten_get_now" : _emscripten_get_now$jscomp$0,
    "_emscripten_get_now_is_monotonic" : _emscripten_get_now_is_monotonic$jscomp$0,
    "_emscripten_get_now_res" : _emscripten_get_now_res$jscomp$0,
    "_emscripten_get_num_gamepads" : _emscripten_get_num_gamepads$jscomp$0,
    "_emscripten_has_threading_support" : _emscripten_has_threading_support$jscomp$0,
    "_emscripten_html5_remove_all_event_listeners" : _emscripten_html5_remove_all_event_listeners$jscomp$0,
    "_emscripten_is_webgl_context_lost" : _emscripten_is_webgl_context_lost$jscomp$0,
    "_emscripten_log" : _emscripten_log$jscomp$0,
    "_emscripten_log_js" : _emscripten_log_js$jscomp$0,
    "_emscripten_memcpy_big" : _emscripten_memcpy_big$jscomp$0,
    "_emscripten_num_logical_cores" : _emscripten_num_logical_cores$jscomp$0,
    "_emscripten_request_fullscreen" : _emscripten_request_fullscreen$jscomp$0,
    "_emscripten_request_pointerlock" : _emscripten_request_pointerlock$jscomp$0,
    "_emscripten_set_blur_callback_on_thread" : _emscripten_set_blur_callback_on_thread$jscomp$0,
    "_emscripten_set_canvas_element_size" : _emscripten_set_canvas_element_size$jscomp$0,
    "_emscripten_set_dblclick_callback_on_thread" : _emscripten_set_dblclick_callback_on_thread$jscomp$0,
    "_emscripten_set_devicemotion_callback_on_thread" : _emscripten_set_devicemotion_callback_on_thread$jscomp$0,
    "_emscripten_set_deviceorientation_callback_on_thread" : _emscripten_set_deviceorientation_callback_on_thread$jscomp$0,
    "_emscripten_set_focus_callback_on_thread" : _emscripten_set_focus_callback_on_thread$jscomp$0,
    "_emscripten_set_fullscreenchange_callback_on_thread" : _emscripten_set_fullscreenchange_callback_on_thread$jscomp$0,
    "_emscripten_set_gamepadconnected_callback_on_thread" : _emscripten_set_gamepadconnected_callback_on_thread$jscomp$0,
    "_emscripten_set_gamepaddisconnected_callback_on_thread" : _emscripten_set_gamepaddisconnected_callback_on_thread$jscomp$0,
    "_emscripten_set_keydown_callback_on_thread" : _emscripten_set_keydown_callback_on_thread$jscomp$0,
    "_emscripten_set_keypress_callback_on_thread" : _emscripten_set_keypress_callback_on_thread$jscomp$0,
    "_emscripten_set_keyup_callback_on_thread" : _emscripten_set_keyup_callback_on_thread$jscomp$0,
    "_emscripten_set_main_loop" : _emscripten_set_main_loop$jscomp$0,
    "_emscripten_set_main_loop_timing" : _emscripten_set_main_loop_timing$jscomp$0,
    "_emscripten_set_mousedown_callback_on_thread" : _emscripten_set_mousedown_callback_on_thread$jscomp$0,
    "_emscripten_set_mousemove_callback_on_thread" : _emscripten_set_mousemove_callback_on_thread$jscomp$0,
    "_emscripten_set_mouseup_callback_on_thread" : _emscripten_set_mouseup_callback_on_thread$jscomp$0,
    "_emscripten_set_touchcancel_callback_on_thread" : _emscripten_set_touchcancel_callback_on_thread$jscomp$0,
    "_emscripten_set_touchend_callback_on_thread" : _emscripten_set_touchend_callback_on_thread$jscomp$0,
    "_emscripten_set_touchmove_callback_on_thread" : _emscripten_set_touchmove_callback_on_thread$jscomp$0,
    "_emscripten_set_touchstart_callback_on_thread" : _emscripten_set_touchstart_callback_on_thread$jscomp$0,
    "_emscripten_set_wheel_callback_on_thread" : _emscripten_set_wheel_callback_on_thread$jscomp$0,
    "_emscripten_webgl_create_context" : _emscripten_webgl_create_context$jscomp$0,
    "_emscripten_webgl_destroy_context" : _emscripten_webgl_destroy_context$jscomp$0,
    "_emscripten_webgl_destroy_context_calling_thread" : _emscripten_webgl_destroy_context_calling_thread$jscomp$0,
    "_emscripten_webgl_do_create_context" : _emscripten_webgl_do_create_context$jscomp$0,
    "_emscripten_webgl_do_get_current_context" : _emscripten_webgl_do_get_current_context$jscomp$0,
    "_emscripten_webgl_enable_extension" : _emscripten_webgl_enable_extension$jscomp$0,
    "_emscripten_webgl_enable_extension_calling_thread" : _emscripten_webgl_enable_extension_calling_thread$jscomp$0,
    "_emscripten_webgl_get_current_context" : _emscripten_webgl_get_current_context$jscomp$0,
    "_emscripten_webgl_init_context_attributes" : _emscripten_webgl_init_context_attributes$jscomp$0,
    "_emscripten_webgl_make_context_current" : _emscripten_webgl_make_context_current$jscomp$0,
    "_exit" : _exit$jscomp$0,
    "_flock" : _flock$jscomp$0,
    "_getenv" : _getenv$jscomp$0,
    "_getpagesize" : _getpagesize$jscomp$0,
    "_getpwuid" : _getpwuid$jscomp$0,
    "_gettimeofday" : _gettimeofday$jscomp$0,
    "_glActiveTexture" : _glActiveTexture$jscomp$0,
    "_glAttachShader" : _glAttachShader$jscomp$0,
    "_glBeginQuery" : _glBeginQuery$jscomp$0,
    "_glBeginTransformFeedback" : _glBeginTransformFeedback$jscomp$0,
    "_glBindAttribLocation" : _glBindAttribLocation$jscomp$0,
    "_glBindBuffer" : _glBindBuffer$jscomp$0,
    "_glBindBufferBase" : _glBindBufferBase$jscomp$0,
    "_glBindBufferRange" : _glBindBufferRange$jscomp$0,
    "_glBindFramebuffer" : _glBindFramebuffer$jscomp$0,
    "_glBindRenderbuffer" : _glBindRenderbuffer$jscomp$0,
    "_glBindSampler" : _glBindSampler$jscomp$0,
    "_glBindTexture" : _glBindTexture$jscomp$0,
    "_glBindTransformFeedback" : _glBindTransformFeedback$jscomp$0,
    "_glBindVertexArray" : _glBindVertexArray$jscomp$0,
    "_glBlendEquation" : _glBlendEquation$jscomp$0,
    "_glBlendEquationSeparate" : _glBlendEquationSeparate$jscomp$0,
    "_glBlendFuncSeparate" : _glBlendFuncSeparate$jscomp$0,
    "_glBlitFramebuffer" : _glBlitFramebuffer$jscomp$0,
    "_glBufferData" : _glBufferData$jscomp$0,
    "_glBufferSubData" : _glBufferSubData$jscomp$0,
    "_glCheckFramebufferStatus" : _glCheckFramebufferStatus$jscomp$0,
    "_glClear" : _glClear$jscomp$0,
    "_glClearBufferfi" : _glClearBufferfi$jscomp$0,
    "_glClearBufferfv" : _glClearBufferfv$jscomp$0,
    "_glClearBufferuiv" : _glClearBufferuiv$jscomp$0,
    "_glClearColor" : _glClearColor$jscomp$0,
    "_glClearDepthf" : _glClearDepthf$jscomp$0,
    "_glClearStencil" : _glClearStencil$jscomp$0,
    "_glClientWaitSync" : _glClientWaitSync$jscomp$0,
    "_glColorMask" : _glColorMask$jscomp$0,
    "_glCompileShader" : _glCompileShader$jscomp$0,
    "_glCompressedTexImage2D" : _glCompressedTexImage2D$jscomp$0,
    "_glCompressedTexImage3D" : _glCompressedTexImage3D$jscomp$0,
    "_glCompressedTexSubImage2D" : _glCompressedTexSubImage2D$jscomp$0,
    "_glCompressedTexSubImage3D" : _glCompressedTexSubImage3D$jscomp$0,
    "_glCopyBufferSubData" : _glCopyBufferSubData$jscomp$0,
    "_glCopyTexImage2D" : _glCopyTexImage2D$jscomp$0,
    "_glCopyTexSubImage2D" : _glCopyTexSubImage2D$jscomp$0,
    "_glCreateProgram" : _glCreateProgram$jscomp$0,
    "_glCreateShader" : _glCreateShader$jscomp$0,
    "_glCullFace" : _glCullFace$jscomp$0,
    "_glDeleteBuffers" : _glDeleteBuffers$jscomp$0,
    "_glDeleteFramebuffers" : _glDeleteFramebuffers$jscomp$0,
    "_glDeleteProgram" : _glDeleteProgram$jscomp$0,
    "_glDeleteQueries" : _glDeleteQueries$jscomp$0,
    "_glDeleteRenderbuffers" : _glDeleteRenderbuffers$jscomp$0,
    "_glDeleteSamplers" : _glDeleteSamplers$jscomp$0,
    "_glDeleteShader" : _glDeleteShader$jscomp$0,
    "_glDeleteSync" : _glDeleteSync$jscomp$0,
    "_glDeleteTextures" : _glDeleteTextures$jscomp$0,
    "_glDeleteTransformFeedbacks" : _glDeleteTransformFeedbacks$jscomp$0,
    "_glDeleteVertexArrays" : _glDeleteVertexArrays$jscomp$0,
    "_glDepthFunc" : _glDepthFunc$jscomp$0,
    "_glDepthMask" : _glDepthMask$jscomp$0,
    "_glDetachShader" : _glDetachShader$jscomp$0,
    "_glDisable" : _glDisable$jscomp$0,
    "_glDisableVertexAttribArray" : _glDisableVertexAttribArray$jscomp$0,
    "_glDrawArrays" : _glDrawArrays$jscomp$0,
    "_glDrawArraysInstanced" : _glDrawArraysInstanced$jscomp$0,
    "_glDrawBuffers" : _glDrawBuffers$jscomp$0,
    "_glDrawElements" : _glDrawElements$jscomp$0,
    "_glDrawElementsInstanced" : _glDrawElementsInstanced$jscomp$0,
    "_glEnable" : _glEnable$jscomp$0,
    "_glEnableVertexAttribArray" : _glEnableVertexAttribArray$jscomp$0,
    "_glEndQuery" : _glEndQuery$jscomp$0,
    "_glEndTransformFeedback" : _glEndTransformFeedback$jscomp$0,
    "_glFenceSync" : _glFenceSync$jscomp$0,
    "_glFinish" : _glFinish$jscomp$0,
    "_glFlush" : _glFlush$jscomp$0,
    "_glFlushMappedBufferRange" : _glFlushMappedBufferRange$jscomp$0,
    "_glFramebufferRenderbuffer" : _glFramebufferRenderbuffer$jscomp$0,
    "_glFramebufferTexture2D" : _glFramebufferTexture2D$jscomp$0,
    "_glFramebufferTextureLayer" : _glFramebufferTextureLayer$jscomp$0,
    "_glFrontFace" : _glFrontFace$jscomp$0,
    "_glGenBuffers" : _glGenBuffers$jscomp$0,
    "_glGenFramebuffers" : _glGenFramebuffers$jscomp$0,
    "_glGenQueries" : _glGenQueries$jscomp$0,
    "_glGenRenderbuffers" : _glGenRenderbuffers$jscomp$0,
    "_glGenSamplers" : _glGenSamplers$jscomp$0,
    "_glGenTextures" : _glGenTextures$jscomp$0,
    "_glGenTransformFeedbacks" : _glGenTransformFeedbacks$jscomp$0,
    "_glGenVertexArrays" : _glGenVertexArrays$jscomp$0,
    "_glGenerateMipmap" : _glGenerateMipmap$jscomp$0,
    "_glGetActiveAttrib" : _glGetActiveAttrib$jscomp$0,
    "_glGetActiveUniform" : _glGetActiveUniform$jscomp$0,
    "_glGetActiveUniformBlockName" : _glGetActiveUniformBlockName$jscomp$0,
    "_glGetActiveUniformBlockiv" : _glGetActiveUniformBlockiv$jscomp$0,
    "_glGetActiveUniformsiv" : _glGetActiveUniformsiv$jscomp$0,
    "_glGetAttribLocation" : _glGetAttribLocation$jscomp$0,
    "_glGetError" : _glGetError$jscomp$0,
    "_glGetFramebufferAttachmentParameteriv" : _glGetFramebufferAttachmentParameteriv$jscomp$0,
    "_glGetIntegeri_v" : _glGetIntegeri_v$jscomp$0,
    "_glGetIntegerv" : _glGetIntegerv$jscomp$0,
    "_glGetInternalformativ" : _glGetInternalformativ$jscomp$0,
    "_glGetProgramBinary" : _glGetProgramBinary$jscomp$0,
    "_glGetProgramInfoLog" : _glGetProgramInfoLog$jscomp$0,
    "_glGetProgramiv" : _glGetProgramiv$jscomp$0,
    "_glGetQueryObjectuiv" : _glGetQueryObjectuiv$jscomp$0,
    "_glGetQueryiv" : _glGetQueryiv$jscomp$0,
    "_glGetRenderbufferParameteriv" : _glGetRenderbufferParameteriv$jscomp$0,
    "_glGetShaderInfoLog" : _glGetShaderInfoLog$jscomp$0,
    "_glGetShaderPrecisionFormat" : _glGetShaderPrecisionFormat$jscomp$0,
    "_glGetShaderSource" : _glGetShaderSource$jscomp$0,
    "_glGetShaderiv" : _glGetShaderiv$jscomp$0,
    "_glGetString" : _glGetString$jscomp$0,
    "_glGetStringi" : _glGetStringi$jscomp$0,
    "_glGetTexParameteriv" : _glGetTexParameteriv$jscomp$0,
    "_glGetUniformBlockIndex" : _glGetUniformBlockIndex$jscomp$0,
    "_glGetUniformIndices" : _glGetUniformIndices$jscomp$0,
    "_glGetUniformLocation" : _glGetUniformLocation$jscomp$0,
    "_glGetUniformiv" : _glGetUniformiv$jscomp$0,
    "_glGetVertexAttribiv" : _glGetVertexAttribiv$jscomp$0,
    "_glInvalidateFramebuffer" : _glInvalidateFramebuffer$jscomp$0,
    "_glIsEnabled" : _glIsEnabled$jscomp$0,
    "_glIsVertexArray" : _glIsVertexArray$jscomp$0,
    "_glLinkProgram" : _glLinkProgram$jscomp$0,
    "_glMapBufferRange" : _glMapBufferRange$jscomp$0,
    "_glPixelStorei" : _glPixelStorei$jscomp$0,
    "_glPolygonOffset" : _glPolygonOffset$jscomp$0,
    "_glProgramBinary" : _glProgramBinary$jscomp$0,
    "_glProgramParameteri" : _glProgramParameteri$jscomp$0,
    "_glReadBuffer" : _glReadBuffer$jscomp$0,
    "_glReadPixels" : _glReadPixels$jscomp$0,
    "_glRenderbufferStorage" : _glRenderbufferStorage$jscomp$0,
    "_glRenderbufferStorageMultisample" : _glRenderbufferStorageMultisample$jscomp$0,
    "_glSamplerParameteri" : _glSamplerParameteri$jscomp$0,
    "_glScissor" : _glScissor$jscomp$0,
    "_glShaderSource" : _glShaderSource$jscomp$0,
    "_glStencilFuncSeparate" : _glStencilFuncSeparate$jscomp$0,
    "_glStencilMask" : _glStencilMask$jscomp$0,
    "_glStencilOpSeparate" : _glStencilOpSeparate$jscomp$0,
    "_glTexImage2D" : _glTexImage2D$jscomp$0,
    "_glTexImage3D" : _glTexImage3D$jscomp$0,
    "_glTexParameterf" : _glTexParameterf$jscomp$0,
    "_glTexParameteri" : _glTexParameteri$jscomp$0,
    "_glTexParameteriv" : _glTexParameteriv$jscomp$0,
    "_glTexStorage2D" : _glTexStorage2D$jscomp$0,
    "_glTexStorage3D" : _glTexStorage3D$jscomp$0,
    "_glTexSubImage2D" : _glTexSubImage2D$jscomp$0,
    "_glTexSubImage3D" : _glTexSubImage3D$jscomp$0,
    "_glTransformFeedbackVaryings" : _glTransformFeedbackVaryings$jscomp$0,
    "_glUniform1fv" : _glUniform1fv$jscomp$0,
    "_glUniform1i" : _glUniform1i$jscomp$0,
    "_glUniform1iv" : _glUniform1iv$jscomp$0,
    "_glUniform1uiv" : _glUniform1uiv$jscomp$0,
    "_glUniform2fv" : _glUniform2fv$jscomp$0,
    "_glUniform2iv" : _glUniform2iv$jscomp$0,
    "_glUniform2uiv" : _glUniform2uiv$jscomp$0,
    "_glUniform3fv" : _glUniform3fv$jscomp$0,
    "_glUniform3iv" : _glUniform3iv$jscomp$0,
    "_glUniform3uiv" : _glUniform3uiv$jscomp$0,
    "_glUniform4fv" : _glUniform4fv$jscomp$0,
    "_glUniform4iv" : _glUniform4iv$jscomp$0,
    "_glUniform4uiv" : _glUniform4uiv$jscomp$0,
    "_glUniformBlockBinding" : _glUniformBlockBinding$jscomp$0,
    "_glUniformMatrix3fv" : _glUniformMatrix3fv$jscomp$0,
    "_glUniformMatrix4fv" : _glUniformMatrix4fv$jscomp$0,
    "_glUnmapBuffer" : _glUnmapBuffer$jscomp$0,
    "_glUseProgram" : _glUseProgram$jscomp$0,
    "_glValidateProgram" : _glValidateProgram$jscomp$0,
    "_glVertexAttrib4f" : _glVertexAttrib4f$jscomp$0,
    "_glVertexAttrib4fv" : _glVertexAttrib4fv$jscomp$0,
    "_glVertexAttribIPointer" : _glVertexAttribIPointer$jscomp$0,
    "_glVertexAttribPointer" : _glVertexAttribPointer$jscomp$0,
    "_glViewport" : _glViewport$jscomp$0,
    "_gmtime" : _gmtime$jscomp$0,
    "_gmtime_r" : _gmtime_r$jscomp$0,
    "_llvm_ceil_f32" : _llvm_ceil_f32$jscomp$0,
    "_llvm_ceil_f64" : _llvm_ceil_f64$jscomp$0,
    "_llvm_copysign_f64" : _llvm_copysign_f64$jscomp$0,
    "_llvm_cttz_i32" : _llvm_cttz_i32$jscomp$0,
    "_llvm_eh_typeid_for" : _llvm_eh_typeid_for$jscomp$0,
    "_llvm_exp2_f32" : _llvm_exp2_f32$jscomp$0,
    "_llvm_fabs_f32" : _llvm_fabs_f32$jscomp$0,
    "_llvm_fabs_f64" : _llvm_fabs_f64$jscomp$0,
    "_llvm_floor_f32" : _llvm_floor_f32$jscomp$0,
    "_llvm_floor_f64" : _llvm_floor_f64$jscomp$0,
    "_llvm_log10_f32" : _llvm_log10_f32$jscomp$0,
    "_llvm_log2_f32" : _llvm_log2_f32$jscomp$0,
    "_llvm_pow_f64" : _llvm_pow_f64$jscomp$0,
    "_llvm_sqrt_f32" : _llvm_sqrt_f32$jscomp$0,
    "_llvm_trap" : _llvm_trap$jscomp$0,
    "_llvm_trunc_f32" : _llvm_trunc_f32$jscomp$0,
    "_localtime" : _localtime$jscomp$0,
    "_localtime_r" : _localtime_r$jscomp$0,
    "_longjmp" : _longjmp$jscomp$0,
    "_mktime" : _mktime$jscomp$0,
    "_nanosleep" : _nanosleep$jscomp$0,
    "_pthread_getspecific" : _pthread_getspecific$jscomp$0,
    "_pthread_key_create" : _pthread_key_create$jscomp$0,
    "_pthread_once" : _pthread_once$jscomp$0,
    "_pthread_setspecific" : _pthread_setspecific$jscomp$0,
    "_setenv" : _setenv$jscomp$0,
    "_sigaction" : _sigaction$jscomp$0,
    "_sigemptyset" : _sigemptyset$jscomp$0,
    "_strftime" : _strftime$jscomp$0,
    "_sysconf" : _sysconf$jscomp$0,
    "_time" : _time$jscomp$0,
    "_tzset" : _tzset$jscomp$0,
    "_unsetenv" : _unsetenv$jscomp$0,
    "_usleep" : _usleep$jscomp$0,
    "_utime" : _utime$jscomp$0,
    "emscriptenWebGLComputeImageSize" : emscriptenWebGLComputeImageSize$jscomp$0,
    "emscriptenWebGLGet" : emscriptenWebGLGet$jscomp$0,
    "emscriptenWebGLGetBufferBinding" : emscriptenWebGLGetBufferBinding$jscomp$0,
    "emscriptenWebGLGetHeapForType" : emscriptenWebGLGetHeapForType$jscomp$0,
    "emscriptenWebGLGetIndexed" : emscriptenWebGLGetIndexed$jscomp$0,
    "emscriptenWebGLGetShiftForType" : emscriptenWebGLGetShiftForType$jscomp$0,
    "emscriptenWebGLGetTexPixelData" : emscriptenWebGLGetTexPixelData$jscomp$0,
    "emscriptenWebGLGetUniform" : emscriptenWebGLGetUniform$jscomp$0,
    "emscriptenWebGLGetVertexAttrib" : emscriptenWebGLGetVertexAttrib$jscomp$0,
    "emscriptenWebGLValidateMapBufferTarget" : emscriptenWebGLValidateMapBufferTarget$jscomp$0,
    "emscripten_get_canvas_element_size_js" : emscripten_get_canvas_element_size_js$jscomp$0,
    "emscripten_set_canvas_element_size_js" : emscripten_set_canvas_element_size_js$jscomp$0,
    "DYNAMICTOP_PTR" : DYNAMICTOP_PTR$jscomp$0,
    "tempDoublePtr" : tempDoublePtr$jscomp$0,
    "ABORT" : ABORT$jscomp$0,
    "STACKTOP" : STACKTOP$jscomp$0,
    "STACK_MAX" : STACK_MAX$jscomp$0
  };
  var asm$jscomp$0 = Module$jscomp$0["asm"](Module$jscomp$0.asmGlobalArg, Module$jscomp$0.asmLibraryArg, buffer$jscomp$9);
  Module$jscomp$0["asm"] = asm$jscomp$0;
  var _SendMessage$jscomp$0 = Module$jscomp$0["_SendMessage"] = function() {
    return Module$jscomp$0["asm"]["_SendMessage"].apply(null, arguments);
  };
  var _SendMessageFloat$jscomp$0 = Module$jscomp$0["_SendMessageFloat"] = function() {
    return Module$jscomp$0["asm"]["_SendMessageFloat"].apply(null, arguments);
  };
  var _SendMessageString$jscomp$0 = Module$jscomp$0["_SendMessageString"] = function() {
    return Module$jscomp$0["asm"]["_SendMessageString"].apply(null, arguments);
  };
  var _SetFullscreen$jscomp$0 = Module$jscomp$0["_SetFullscreen"] = function() {
    return Module$jscomp$0["asm"]["_SetFullscreen"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AIScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AIScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AIScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AccessibilityScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AnimationClip_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AnimationClip_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AnimationClip_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AnimationScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AnimationScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AnimationScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AssetBundleFileSystem_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AssetBundleFileSystem_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AssetBundleFileSystem_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AssetBundleScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_AudioScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_AudioScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_AudioScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_ClothScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_ClothScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_ClothScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_DirectorScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_DirectorScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_DirectorScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_External_Yoga_Yoga_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_GUITexture_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_GUITexture_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_GUITexture_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_GfxDeviceNull_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_GfxDeviceNull_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_GfxDeviceNull_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_GridScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_GridScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_GridScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_IMGUIScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_IMGUIScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_IMGUIScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_InputLegacyScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_InputScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_InputScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_InputScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_LogAssert_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_LogAssert_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_LogAssert_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_gc_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_mono_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_os_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_os_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_os_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_utils_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_vm_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Mesh_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Mesh_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Mesh_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Animation_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Animation_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Animation_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Animation_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Animation_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Animation_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Animation_7_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Animation_7_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Animation_7_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Audio_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Audio_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Audio_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Audio_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Audio_Public_3_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Audio_Public_3_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_3_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Cloth_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Cloth_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Cloth_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Grid_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Grid_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Grid_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_IMGUI_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_IMGUI_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_IMGUI_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_IMGUI_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_IMGUI_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_IMGUI_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Input_Private_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Input_Private_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Input_Private_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_ParticleSystem_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Physics_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Physics_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Physics_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Physics_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Physics_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Physics_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Profiler_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Subsystems_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Subsystems_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Subsystems_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Terrain_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Terrain_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Terrain_Public_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Terrain_Public_3_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Terrain_VR_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Tilemap_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Tilemap_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Tilemap_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_UI_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_UI_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_UI_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_UI_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_UI_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_UI_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_UI_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_UI_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_UI_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_VFX_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_VFX_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_VFX_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_VFX_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_VR_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_VR_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_VR_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_VR_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_VR_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_VR_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Stats_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Stats_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Stats_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Modules_XR_Tracing_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Physics2DScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Physics2DScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Physics2DScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PhysicsQuery_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PhysicsQuery_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PhysicsQuery_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PhysicsScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PhysicsScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PhysicsScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_PluginInterfaceVR_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_PluginInterfaceVR_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_PluginInterfaceVR_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Allocator_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Allocator_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Allocator_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Application_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Application_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Application_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_BaseClasses_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_BaseClasses_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_BaseClasses_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_BaseClasses_3_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Burst_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Burst_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Burst_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_6_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_6_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_6_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_7_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_7_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_7_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_8_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_8_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_8_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Containers_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Containers_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Containers_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Director_Core_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Director_Core_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Director_Core_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_File_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_File_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_File_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Geometry_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Geometry_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Geometry_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_3_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_4_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_10_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_10_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_10_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_11_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_11_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_11_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_4_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_4_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_4_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_6_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_6_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_6_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_8_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_8_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_8_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Input_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Input_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Input_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Interfaces_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Interfaces_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Interfaces_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Interfaces_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Interfaces_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Interfaces_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Jobs_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Jobs_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Jobs_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Jobs_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Jobs_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Jobs_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Math_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Math_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Math_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Math_Random_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Math_Random_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Math_Random_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Misc_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Misc_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Misc_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Misc_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Misc_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Misc_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Misc_4_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Misc_4_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Misc_4_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Misc_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Misc_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Misc_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Modules_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Modules_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Modules_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Mono_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Mono_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Mono_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_PluginInterface_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_PreloadManager_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Profiler_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Profiler_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Profiler_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Profiler_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Profiler_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Profiler_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_SceneManager_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_SceneManager_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_SceneManager_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Scripting_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Scripting_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Scripting_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Scripting_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Scripting_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Scripting_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Scripting_3_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Scripting_3_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Scripting_3_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Serialize_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Serialize_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Serialize_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Serialize_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Serialize_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Serialize_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_4_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_4_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_4_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Transform_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Transform_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Transform_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Transform_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Transform_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Transform_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Utilities_2_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Utilities_2_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Utilities_2_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Utilities_5_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Utilities_5_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Utilities_5_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Utilities_6_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Utilities_6_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Utilities_6_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Utilities_7_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Utilities_7_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Utilities_7_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Utilities_9_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Utilities_9_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Utilities_9_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_Video_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_Video_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_Video_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Shader_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Shader_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Shader_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Shadows_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Shadows_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Shadows_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_ShapeModule_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_ShapeModule_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_ShapeModule_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_SubsystemsScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_SwInterCollision_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_SwInterCollision_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_SwInterCollision_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_SwSolverKernel_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_SwSolverKernel_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_SwSolverKernel_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TLSModule_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TLSModule_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TLSModule_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TemplateInstantiations_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TemplateInstantiations_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TemplateInstantiations_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TerrainScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TerrainScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TerrainScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TextCoreScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TextCoreScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TextCoreScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TextRenderingScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_TilemapScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_TilemapScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_TilemapScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UIScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UIScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UIScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UVModule_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UVModule_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UVModule_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UnityAdsSettings_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UnityAdsSettings_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UnityAdsSettings_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_VFXScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_VFXScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_VFXScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_VRScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_VRScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_VRScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_VideoScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_VideoScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_VideoScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_VisualEffectAsset_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_VisualEffectAsset_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_VisualEffectAsset_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_Wind_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_Wind_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_Wind_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_XRAudio_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_XRAudio_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_XRAudio_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_XRPreInit_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_XRPreInit_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_XRPreInit_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_XRScriptingClasses_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_XRScriptingClasses_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_XRScriptingClasses_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_XRWindowsLocatableCamera_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_nvcloth_src_0_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_nvcloth_src_0_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_nvcloth_src_0_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_nvcloth_src_1_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_nvcloth_src_1_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_nvcloth_src_1_cpp"].apply(null, arguments);
  };
  var __GLOBAL__sub_I_umbra_cpp$jscomp$0 = Module$jscomp$0["__GLOBAL__sub_I_umbra_cpp"] = function() {
    return Module$jscomp$0["asm"]["__GLOBAL__sub_I_umbra_cpp"].apply(null, arguments);
  };
  var ___cxa_can_catch$jscomp$0 = Module$jscomp$0["___cxa_can_catch"] = function() {
    return Module$jscomp$0["asm"]["___cxa_can_catch"].apply(null, arguments);
  };
  var ___cxa_is_pointer_type$jscomp$0 = Module$jscomp$0["___cxa_is_pointer_type"] = function() {
    return Module$jscomp$0["asm"]["___cxa_is_pointer_type"].apply(null, arguments);
  };
  var ___cxx_global_var_init_104$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_104"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_104"].apply(null, arguments);
  };
  var ___cxx_global_var_init_131$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_131"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_131"].apply(null, arguments);
  };
  var ___cxx_global_var_init_18$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_18"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_18"].apply(null, arguments);
  };
  var ___cxx_global_var_init_18_1172$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_18_1172"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_18_1172"].apply(null, arguments);
  };
  var ___cxx_global_var_init_19$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_19"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_19"].apply(null, arguments);
  };
  var ___cxx_global_var_init_192$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_192"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_192"].apply(null, arguments);
  };
  var ___cxx_global_var_init_20$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_20"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_20"].apply(null, arguments);
  };
  var ___cxx_global_var_init_23$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_23"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_23"].apply(null, arguments);
  };
  var ___cxx_global_var_init_3738$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_3738"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_3738"].apply(null, arguments);
  };
  var ___cxx_global_var_init_61$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_61"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_61"].apply(null, arguments);
  };
  var ___cxx_global_var_init_8760$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_8760"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_8760"].apply(null, arguments);
  };
  var ___cxx_global_var_init_89$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_89"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_89"].apply(null, arguments);
  };
  var ___cxx_global_var_init_9$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_9"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_9"].apply(null, arguments);
  };
  var ___cxx_global_var_init_9153$jscomp$0 = Module$jscomp$0["___cxx_global_var_init_9153"] = function() {
    return Module$jscomp$0["asm"]["___cxx_global_var_init_9153"].apply(null, arguments);
  };
  var ___emscripten_environ_constructor$jscomp$0 = Module$jscomp$0["___emscripten_environ_constructor"] = function() {
    return Module$jscomp$0["asm"]["___emscripten_environ_constructor"].apply(null, arguments);
  };
  var ___errno_location$jscomp$0 = Module$jscomp$0["___errno_location"] = function() {
    return Module$jscomp$0["asm"]["___errno_location"].apply(null, arguments);
  };
  var __get_daylight$jscomp$0 = Module$jscomp$0["__get_daylight"] = function() {
    return Module$jscomp$0["asm"]["__get_daylight"].apply(null, arguments);
  };
  var __get_environ$jscomp$0 = Module$jscomp$0["__get_environ"] = function() {
    return Module$jscomp$0["asm"]["__get_environ"].apply(null, arguments);
  };
  var __get_timezone$jscomp$0 = Module$jscomp$0["__get_timezone"] = function() {
    return Module$jscomp$0["asm"]["__get_timezone"].apply(null, arguments);
  };
  var __get_tzname$jscomp$0 = Module$jscomp$0["__get_tzname"] = function() {
    return Module$jscomp$0["asm"]["__get_tzname"].apply(null, arguments);
  };
  var _emscripten_replace_memory$jscomp$0 = Module$jscomp$0["_emscripten_replace_memory"] = function() {
    return Module$jscomp$0["asm"]["_emscripten_replace_memory"].apply(null, arguments);
  };
  var _free$jscomp$0 = Module$jscomp$0["_free"] = function() {
    return Module$jscomp$0["asm"]["_free"].apply(null, arguments);
  };
  var _htonl$jscomp$0 = Module$jscomp$0["_htonl"] = function() {
    return Module$jscomp$0["asm"]["_htonl"].apply(null, arguments);
  };
  var _htons$jscomp$0 = Module$jscomp$0["_htons"] = function() {
    return Module$jscomp$0["asm"]["_htons"].apply(null, arguments);
  };
  var _i64Add$jscomp$0 = Module$jscomp$0["_i64Add"] = function() {
    return Module$jscomp$0["asm"]["_i64Add"].apply(null, arguments);
  };
  var _llvm_bswap_i16$jscomp$0 = Module$jscomp$0["_llvm_bswap_i16"] = function() {
    return Module$jscomp$0["asm"]["_llvm_bswap_i16"].apply(null, arguments);
  };
  var _llvm_bswap_i32$jscomp$0 = Module$jscomp$0["_llvm_bswap_i32"] = function() {
    return Module$jscomp$0["asm"]["_llvm_bswap_i32"].apply(null, arguments);
  };
  var _llvm_ctlz_i64$jscomp$0 = Module$jscomp$0["_llvm_ctlz_i64"] = function() {
    return Module$jscomp$0["asm"]["_llvm_ctlz_i64"].apply(null, arguments);
  };
  var _llvm_ctpop_i32$jscomp$0 = Module$jscomp$0["_llvm_ctpop_i32"] = function() {
    return Module$jscomp$0["asm"]["_llvm_ctpop_i32"].apply(null, arguments);
  };
  var _llvm_maxnum_f32$jscomp$0 = Module$jscomp$0["_llvm_maxnum_f32"] = function() {
    return Module$jscomp$0["asm"]["_llvm_maxnum_f32"].apply(null, arguments);
  };
  var _llvm_maxnum_f64$jscomp$0 = Module$jscomp$0["_llvm_maxnum_f64"] = function() {
    return Module$jscomp$0["asm"]["_llvm_maxnum_f64"].apply(null, arguments);
  };
  var _llvm_minnum_f32$jscomp$0 = Module$jscomp$0["_llvm_minnum_f32"] = function() {
    return Module$jscomp$0["asm"]["_llvm_minnum_f32"].apply(null, arguments);
  };
  var _llvm_round_f32$jscomp$0 = Module$jscomp$0["_llvm_round_f32"] = function() {
    return Module$jscomp$0["asm"]["_llvm_round_f32"].apply(null, arguments);
  };
  var _main$jscomp$0 = Module$jscomp$0["_main"] = function() {
    return Module$jscomp$0["asm"]["_main"].apply(null, arguments);
  };
  var _malloc$jscomp$0 = Module$jscomp$0["_malloc"] = function() {
    return Module$jscomp$0["asm"]["_malloc"].apply(null, arguments);
  };
  var _memalign$jscomp$0 = Module$jscomp$0["_memalign"] = function() {
    return Module$jscomp$0["asm"]["_memalign"].apply(null, arguments);
  };
  var _memcpy$jscomp$0 = Module$jscomp$0["_memcpy"] = function() {
    return Module$jscomp$0["asm"]["_memcpy"].apply(null, arguments);
  };
  var _memmove$jscomp$0 = Module$jscomp$0["_memmove"] = function() {
    return Module$jscomp$0["asm"]["_memmove"].apply(null, arguments);
  };
  var _memset$jscomp$0 = Module$jscomp$0["_memset"] = function() {
    return Module$jscomp$0["asm"]["_memset"].apply(null, arguments);
  };
  var _ntohs$jscomp$0 = Module$jscomp$0["_ntohs"] = function() {
    return Module$jscomp$0["asm"]["_ntohs"].apply(null, arguments);
  };
  var _realloc$jscomp$0 = Module$jscomp$0["_realloc"] = function() {
    return Module$jscomp$0["asm"]["_realloc"].apply(null, arguments);
  };
  var _saveSetjmp$jscomp$0 = Module$jscomp$0["_saveSetjmp"] = function() {
    return Module$jscomp$0["asm"]["_saveSetjmp"].apply(null, arguments);
  };
  var _sbrk$jscomp$0 = Module$jscomp$0["_sbrk"] = function() {
    return Module$jscomp$0["asm"]["_sbrk"].apply(null, arguments);
  };
  var _strlen$jscomp$0 = Module$jscomp$0["_strlen"] = function() {
    return Module$jscomp$0["asm"]["_strlen"].apply(null, arguments);
  };
  var _testSetjmp$jscomp$0 = Module$jscomp$0["_testSetjmp"] = function() {
    return Module$jscomp$0["asm"]["_testSetjmp"].apply(null, arguments);
  };
  var establishStackSpace$jscomp$0 = Module$jscomp$0["establishStackSpace"] = function() {
    return Module$jscomp$0["asm"]["establishStackSpace"].apply(null, arguments);
  };
  var getTempRet0$jscomp$0 = Module$jscomp$0["getTempRet0"] = function() {
    return Module$jscomp$0["asm"]["getTempRet0"].apply(null, arguments);
  };
  var runPostSets$jscomp$0 = Module$jscomp$0["runPostSets"] = function() {
    return Module$jscomp$0["asm"]["runPostSets"].apply(null, arguments);
  };
  var setTempRet0$jscomp$0 = Module$jscomp$0["setTempRet0"] = function() {
    return Module$jscomp$0["asm"]["setTempRet0"].apply(null, arguments);
  };
  var setThrew$jscomp$0 = Module$jscomp$0["setThrew"] = function() {
    return Module$jscomp$0["asm"]["setThrew"].apply(null, arguments);
  };
  var stackAlloc$jscomp$0 = Module$jscomp$0["stackAlloc"] = function() {
    return Module$jscomp$0["asm"]["stackAlloc"].apply(null, arguments);
  };
  var stackRestore$jscomp$0 = Module$jscomp$0["stackRestore"] = function() {
    return Module$jscomp$0["asm"]["stackRestore"].apply(null, arguments);
  };
  var stackSave$jscomp$0 = Module$jscomp$0["stackSave"] = function() {
    return Module$jscomp$0["asm"]["stackSave"].apply(null, arguments);
  };
  var dynCall_dddi$jscomp$0 = Module$jscomp$0["dynCall_dddi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_dddi"].apply(null, arguments);
  };
  var dynCall_ddi$jscomp$0 = Module$jscomp$0["dynCall_ddi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ddi"].apply(null, arguments);
  };
  var dynCall_dfi$jscomp$0 = Module$jscomp$0["dynCall_dfi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_dfi"].apply(null, arguments);
  };
  var dynCall_di$jscomp$0 = Module$jscomp$0["dynCall_di"] = function() {
    return Module$jscomp$0["asm"]["dynCall_di"].apply(null, arguments);
  };
  var dynCall_diddi$jscomp$0 = Module$jscomp$0["dynCall_diddi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_diddi"].apply(null, arguments);
  };
  var dynCall_didi$jscomp$0 = Module$jscomp$0["dynCall_didi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_didi"].apply(null, arguments);
  };
  var dynCall_dii$jscomp$0 = Module$jscomp$0["dynCall_dii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_dii"].apply(null, arguments);
  };
  var dynCall_diii$jscomp$0 = Module$jscomp$0["dynCall_diii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_diii"].apply(null, arguments);
  };
  var dynCall_diiii$jscomp$0 = Module$jscomp$0["dynCall_diiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_diiii"].apply(null, arguments);
  };
  var dynCall_dji$jscomp$0 = Module$jscomp$0["dynCall_dji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_dji"].apply(null, arguments);
  };
  var dynCall_f$jscomp$0 = Module$jscomp$0["dynCall_f"] = function() {
    return Module$jscomp$0["asm"]["dynCall_f"].apply(null, arguments);
  };
  var dynCall_fdi$jscomp$0 = Module$jscomp$0["dynCall_fdi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fdi"].apply(null, arguments);
  };
  var dynCall_ff$jscomp$0 = Module$jscomp$0["dynCall_ff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ff"].apply(null, arguments);
  };
  var dynCall_fff$jscomp$0 = Module$jscomp$0["dynCall_fff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fff"].apply(null, arguments);
  };
  var dynCall_ffffi$jscomp$0 = Module$jscomp$0["dynCall_ffffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ffffi"].apply(null, arguments);
  };
  var dynCall_fffi$jscomp$0 = Module$jscomp$0["dynCall_fffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fffi"].apply(null, arguments);
  };
  var dynCall_fffifffi$jscomp$0 = Module$jscomp$0["dynCall_fffifffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fffifffi"].apply(null, arguments);
  };
  var dynCall_ffi$jscomp$0 = Module$jscomp$0["dynCall_ffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ffi"].apply(null, arguments);
  };
  var dynCall_fi$jscomp$0 = Module$jscomp$0["dynCall_fi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fi"].apply(null, arguments);
  };
  var dynCall_fif$jscomp$0 = Module$jscomp$0["dynCall_fif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fif"].apply(null, arguments);
  };
  var dynCall_fiffi$jscomp$0 = Module$jscomp$0["dynCall_fiffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiffi"].apply(null, arguments);
  };
  var dynCall_fifi$jscomp$0 = Module$jscomp$0["dynCall_fifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fifi"].apply(null, arguments);
  };
  var dynCall_fifii$jscomp$0 = Module$jscomp$0["dynCall_fifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fifii"].apply(null, arguments);
  };
  var dynCall_fii$jscomp$0 = Module$jscomp$0["dynCall_fii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fii"].apply(null, arguments);
  };
  var dynCall_fiifi$jscomp$0 = Module$jscomp$0["dynCall_fiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiifi"].apply(null, arguments);
  };
  var dynCall_fiifii$jscomp$0 = Module$jscomp$0["dynCall_fiifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiifii"].apply(null, arguments);
  };
  var dynCall_fiii$jscomp$0 = Module$jscomp$0["dynCall_fiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiii"].apply(null, arguments);
  };
  var dynCall_fiiii$jscomp$0 = Module$jscomp$0["dynCall_fiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiiii"].apply(null, arguments);
  };
  var dynCall_fiiiif$jscomp$0 = Module$jscomp$0["dynCall_fiiiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fiiiif"].apply(null, arguments);
  };
  var dynCall_fji$jscomp$0 = Module$jscomp$0["dynCall_fji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_fji"].apply(null, arguments);
  };
  var dynCall_i$jscomp$0 = Module$jscomp$0["dynCall_i"] = function() {
    return Module$jscomp$0["asm"]["dynCall_i"].apply(null, arguments);
  };
  var dynCall_idi$jscomp$0 = Module$jscomp$0["dynCall_idi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_idi"].apply(null, arguments);
  };
  var dynCall_idiii$jscomp$0 = Module$jscomp$0["dynCall_idiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_idiii"].apply(null, arguments);
  };
  var dynCall_ifffi$jscomp$0 = Module$jscomp$0["dynCall_ifffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ifffi"].apply(null, arguments);
  };
  var dynCall_iffi$jscomp$0 = Module$jscomp$0["dynCall_iffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iffi"].apply(null, arguments);
  };
  var dynCall_ifi$jscomp$0 = Module$jscomp$0["dynCall_ifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ifi"].apply(null, arguments);
  };
  var dynCall_ifiii$jscomp$0 = Module$jscomp$0["dynCall_ifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ifiii"].apply(null, arguments);
  };
  var dynCall_ii$jscomp$0 = Module$jscomp$0["dynCall_ii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ii"].apply(null, arguments);
  };
  var dynCall_iidi$jscomp$0 = Module$jscomp$0["dynCall_iidi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iidi"].apply(null, arguments);
  };
  var dynCall_iidii$jscomp$0 = Module$jscomp$0["dynCall_iidii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iidii"].apply(null, arguments);
  };
  var dynCall_iif$jscomp$0 = Module$jscomp$0["dynCall_iif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iif"].apply(null, arguments);
  };
  var dynCall_iifffi$jscomp$0 = Module$jscomp$0["dynCall_iifffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iifffi"].apply(null, arguments);
  };
  var dynCall_iiffi$jscomp$0 = Module$jscomp$0["dynCall_iiffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiffi"].apply(null, arguments);
  };
  var dynCall_iifi$jscomp$0 = Module$jscomp$0["dynCall_iifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iifi"].apply(null, arguments);
  };
  var dynCall_iifii$jscomp$0 = Module$jscomp$0["dynCall_iifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iifii"].apply(null, arguments);
  };
  var dynCall_iifiii$jscomp$0 = Module$jscomp$0["dynCall_iifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iifiii"].apply(null, arguments);
  };
  var dynCall_iii$jscomp$0 = Module$jscomp$0["dynCall_iii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iii"].apply(null, arguments);
  };
  var dynCall_iiif$jscomp$0 = Module$jscomp$0["dynCall_iiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiif"].apply(null, arguments);
  };
  var dynCall_iiiff$jscomp$0 = Module$jscomp$0["dynCall_iiiff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiff"].apply(null, arguments);
  };
  var dynCall_iiifi$jscomp$0 = Module$jscomp$0["dynCall_iiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiifi"].apply(null, arguments);
  };
  var dynCall_iiifii$jscomp$0 = Module$jscomp$0["dynCall_iiifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiifii"].apply(null, arguments);
  };
  var dynCall_iiifiii$jscomp$0 = Module$jscomp$0["dynCall_iiifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiifiii"].apply(null, arguments);
  };
  var dynCall_iiifiiii$jscomp$0 = Module$jscomp$0["dynCall_iiifiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiifiiii"].apply(null, arguments);
  };
  var dynCall_iiii$jscomp$0 = Module$jscomp$0["dynCall_iiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiii"].apply(null, arguments);
  };
  var dynCall_iiiifi$jscomp$0 = Module$jscomp$0["dynCall_iiiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiifi"].apply(null, arguments);
  };
  var dynCall_iiiifii$jscomp$0 = Module$jscomp$0["dynCall_iiiifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiifii"].apply(null, arguments);
  };
  var dynCall_iiiifiii$jscomp$0 = Module$jscomp$0["dynCall_iiiifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiifiii"].apply(null, arguments);
  };
  var dynCall_iiiifiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiifiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiifiiii"].apply(null, arguments);
  };
  var dynCall_iiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiii"].apply(null, arguments);
  };
  var dynCall_iiiiifi$jscomp$0 = Module$jscomp$0["dynCall_iiiiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiifi"].apply(null, arguments);
  };
  var dynCall_iiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiifffiiifiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiifffiiifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiifffiiifiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiffiiiiiiiiiffffiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiffffiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiffiiiiiiiiiffffiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiffffiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiffiiiiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiffiiiiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiffiiiiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_iiiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_iiiiiji$jscomp$0 = Module$jscomp$0["dynCall_iiiiiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiiji"].apply(null, arguments);
  };
  var dynCall_iiiij$jscomp$0 = Module$jscomp$0["dynCall_iiiij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiij"].apply(null, arguments);
  };
  var dynCall_iiiiji$jscomp$0 = Module$jscomp$0["dynCall_iiiiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiiji"].apply(null, arguments);
  };
  var dynCall_iiiijii$jscomp$0 = Module$jscomp$0["dynCall_iiiijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiijii"].apply(null, arguments);
  };
  var dynCall_iiiijiii$jscomp$0 = Module$jscomp$0["dynCall_iiiijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiijiii"].apply(null, arguments);
  };
  var dynCall_iiij$jscomp$0 = Module$jscomp$0["dynCall_iiij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiij"].apply(null, arguments);
  };
  var dynCall_iiiji$jscomp$0 = Module$jscomp$0["dynCall_iiiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiiji"].apply(null, arguments);
  };
  var dynCall_iiijii$jscomp$0 = Module$jscomp$0["dynCall_iiijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiijii"].apply(null, arguments);
  };
  var dynCall_iiijiii$jscomp$0 = Module$jscomp$0["dynCall_iiijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiijiii"].apply(null, arguments);
  };
  var dynCall_iij$jscomp$0 = Module$jscomp$0["dynCall_iij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iij"].apply(null, arguments);
  };
  var dynCall_iiji$jscomp$0 = Module$jscomp$0["dynCall_iiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iiji"].apply(null, arguments);
  };
  var dynCall_iijii$jscomp$0 = Module$jscomp$0["dynCall_iijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijii"].apply(null, arguments);
  };
  var dynCall_iijiii$jscomp$0 = Module$jscomp$0["dynCall_iijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijiii"].apply(null, arguments);
  };
  var dynCall_iijji$jscomp$0 = Module$jscomp$0["dynCall_iijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijji"].apply(null, arguments);
  };
  var dynCall_iijjii$jscomp$0 = Module$jscomp$0["dynCall_iijjii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijjii"].apply(null, arguments);
  };
  var dynCall_iijjiii$jscomp$0 = Module$jscomp$0["dynCall_iijjiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijjiii"].apply(null, arguments);
  };
  var dynCall_iijjji$jscomp$0 = Module$jscomp$0["dynCall_iijjji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iijjji"].apply(null, arguments);
  };
  var dynCall_ij$jscomp$0 = Module$jscomp$0["dynCall_ij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ij"].apply(null, arguments);
  };
  var dynCall_iji$jscomp$0 = Module$jscomp$0["dynCall_iji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_iji"].apply(null, arguments);
  };
  var dynCall_ijiii$jscomp$0 = Module$jscomp$0["dynCall_ijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ijiii"].apply(null, arguments);
  };
  var dynCall_ijj$jscomp$0 = Module$jscomp$0["dynCall_ijj"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ijj"].apply(null, arguments);
  };
  var dynCall_ijji$jscomp$0 = Module$jscomp$0["dynCall_ijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ijji"].apply(null, arguments);
  };
  var dynCall_j$jscomp$0 = Module$jscomp$0["dynCall_j"] = function() {
    return Module$jscomp$0["asm"]["dynCall_j"].apply(null, arguments);
  };
  var dynCall_jdi$jscomp$0 = Module$jscomp$0["dynCall_jdi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jdi"].apply(null, arguments);
  };
  var dynCall_jdii$jscomp$0 = Module$jscomp$0["dynCall_jdii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jdii"].apply(null, arguments);
  };
  var dynCall_jfi$jscomp$0 = Module$jscomp$0["dynCall_jfi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jfi"].apply(null, arguments);
  };
  var dynCall_ji$jscomp$0 = Module$jscomp$0["dynCall_ji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_ji"].apply(null, arguments);
  };
  var dynCall_jidi$jscomp$0 = Module$jscomp$0["dynCall_jidi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jidi"].apply(null, arguments);
  };
  var dynCall_jidii$jscomp$0 = Module$jscomp$0["dynCall_jidii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jidii"].apply(null, arguments);
  };
  var dynCall_jii$jscomp$0 = Module$jscomp$0["dynCall_jii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jii"].apply(null, arguments);
  };
  var dynCall_jiii$jscomp$0 = Module$jscomp$0["dynCall_jiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiii"].apply(null, arguments);
  };
  var dynCall_jiiii$jscomp$0 = Module$jscomp$0["dynCall_jiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiiii"].apply(null, arguments);
  };
  var dynCall_jiiiii$jscomp$0 = Module$jscomp$0["dynCall_jiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiiiii"].apply(null, arguments);
  };
  var dynCall_jiiiiii$jscomp$0 = Module$jscomp$0["dynCall_jiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiiiiii"].apply(null, arguments);
  };
  var dynCall_jiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_jiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_jiiji$jscomp$0 = Module$jscomp$0["dynCall_jiiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiiji"].apply(null, arguments);
  };
  var dynCall_jiji$jscomp$0 = Module$jscomp$0["dynCall_jiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jiji"].apply(null, arguments);
  };
  var dynCall_jijii$jscomp$0 = Module$jscomp$0["dynCall_jijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jijii"].apply(null, arguments);
  };
  var dynCall_jijiii$jscomp$0 = Module$jscomp$0["dynCall_jijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jijiii"].apply(null, arguments);
  };
  var dynCall_jijj$jscomp$0 = Module$jscomp$0["dynCall_jijj"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jijj"].apply(null, arguments);
  };
  var dynCall_jijji$jscomp$0 = Module$jscomp$0["dynCall_jijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jijji"].apply(null, arguments);
  };
  var dynCall_jji$jscomp$0 = Module$jscomp$0["dynCall_jji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_jji"].apply(null, arguments);
  };
  var dynCall_v$jscomp$0 = Module$jscomp$0["dynCall_v"] = function() {
    return Module$jscomp$0["asm"]["dynCall_v"].apply(null, arguments);
  };
  var dynCall_vd$jscomp$0 = Module$jscomp$0["dynCall_vd"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vd"].apply(null, arguments);
  };
  var dynCall_vf$jscomp$0 = Module$jscomp$0["dynCall_vf"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vf"].apply(null, arguments);
  };
  var dynCall_vff$jscomp$0 = Module$jscomp$0["dynCall_vff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vff"].apply(null, arguments);
  };
  var dynCall_vffff$jscomp$0 = Module$jscomp$0["dynCall_vffff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vffff"].apply(null, arguments);
  };
  var dynCall_vfi$jscomp$0 = Module$jscomp$0["dynCall_vfi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vfi"].apply(null, arguments);
  };
  var dynCall_vi$jscomp$0 = Module$jscomp$0["dynCall_vi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vi"].apply(null, arguments);
  };
  var dynCall_vid$jscomp$0 = Module$jscomp$0["dynCall_vid"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vid"].apply(null, arguments);
  };
  var dynCall_vidi$jscomp$0 = Module$jscomp$0["dynCall_vidi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vidi"].apply(null, arguments);
  };
  var dynCall_vif$jscomp$0 = Module$jscomp$0["dynCall_vif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vif"].apply(null, arguments);
  };
  var dynCall_viff$jscomp$0 = Module$jscomp$0["dynCall_viff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viff"].apply(null, arguments);
  };
  var dynCall_vifff$jscomp$0 = Module$jscomp$0["dynCall_vifff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vifff"].apply(null, arguments);
  };
  var dynCall_viffff$jscomp$0 = Module$jscomp$0["dynCall_viffff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffff"].apply(null, arguments);
  };
  var dynCall_viffffi$jscomp$0 = Module$jscomp$0["dynCall_viffffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffffi"].apply(null, arguments);
  };
  var dynCall_viffffii$jscomp$0 = Module$jscomp$0["dynCall_viffffii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffffii"].apply(null, arguments);
  };
  var dynCall_vifffi$jscomp$0 = Module$jscomp$0["dynCall_vifffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vifffi"].apply(null, arguments);
  };
  var dynCall_vifffii$jscomp$0 = Module$jscomp$0["dynCall_vifffii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vifffii"].apply(null, arguments);
  };
  var dynCall_viffi$jscomp$0 = Module$jscomp$0["dynCall_viffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffi"].apply(null, arguments);
  };
  var dynCall_viffii$jscomp$0 = Module$jscomp$0["dynCall_viffii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffii"].apply(null, arguments);
  };
  var dynCall_viffiii$jscomp$0 = Module$jscomp$0["dynCall_viffiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viffiii"].apply(null, arguments);
  };
  var dynCall_vifi$jscomp$0 = Module$jscomp$0["dynCall_vifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vifi"].apply(null, arguments);
  };
  var dynCall_vifii$jscomp$0 = Module$jscomp$0["dynCall_vifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vifii"].apply(null, arguments);
  };
  var dynCall_vii$jscomp$0 = Module$jscomp$0["dynCall_vii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vii"].apply(null, arguments);
  };
  var dynCall_viid$jscomp$0 = Module$jscomp$0["dynCall_viid"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viid"].apply(null, arguments);
  };
  var dynCall_viidi$jscomp$0 = Module$jscomp$0["dynCall_viidi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viidi"].apply(null, arguments);
  };
  var dynCall_viidii$jscomp$0 = Module$jscomp$0["dynCall_viidii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viidii"].apply(null, arguments);
  };
  var dynCall_viif$jscomp$0 = Module$jscomp$0["dynCall_viif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viif"].apply(null, arguments);
  };
  var dynCall_viiff$jscomp$0 = Module$jscomp$0["dynCall_viiff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiff"].apply(null, arguments);
  };
  var dynCall_viifff$jscomp$0 = Module$jscomp$0["dynCall_viifff"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viifff"].apply(null, arguments);
  };
  var dynCall_viiffi$jscomp$0 = Module$jscomp$0["dynCall_viiffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiffi"].apply(null, arguments);
  };
  var dynCall_viiffii$jscomp$0 = Module$jscomp$0["dynCall_viiffii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiffii"].apply(null, arguments);
  };
  var dynCall_viifi$jscomp$0 = Module$jscomp$0["dynCall_viifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viifi"].apply(null, arguments);
  };
  var dynCall_viifii$jscomp$0 = Module$jscomp$0["dynCall_viifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viifii"].apply(null, arguments);
  };
  var dynCall_viifiii$jscomp$0 = Module$jscomp$0["dynCall_viifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viifiii"].apply(null, arguments);
  };
  var dynCall_viifiiii$jscomp$0 = Module$jscomp$0["dynCall_viifiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viifiiii"].apply(null, arguments);
  };
  var dynCall_viii$jscomp$0 = Module$jscomp$0["dynCall_viii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viii"].apply(null, arguments);
  };
  var dynCall_viiidi$jscomp$0 = Module$jscomp$0["dynCall_viiidi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiidi"].apply(null, arguments);
  };
  var dynCall_viiif$jscomp$0 = Module$jscomp$0["dynCall_viiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiif"].apply(null, arguments);
  };
  var dynCall_viiifffi$jscomp$0 = Module$jscomp$0["dynCall_viiifffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiifffi"].apply(null, arguments);
  };
  var dynCall_viiiffi$jscomp$0 = Module$jscomp$0["dynCall_viiiffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiffi"].apply(null, arguments);
  };
  var dynCall_viiifi$jscomp$0 = Module$jscomp$0["dynCall_viiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiifi"].apply(null, arguments);
  };
  var dynCall_viiififfi$jscomp$0 = Module$jscomp$0["dynCall_viiififfi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiififfi"].apply(null, arguments);
  };
  var dynCall_viiififi$jscomp$0 = Module$jscomp$0["dynCall_viiififi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiififi"].apply(null, arguments);
  };
  var dynCall_viiififii$jscomp$0 = Module$jscomp$0["dynCall_viiififii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiififii"].apply(null, arguments);
  };
  var dynCall_viiififiii$jscomp$0 = Module$jscomp$0["dynCall_viiififiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiififiii"].apply(null, arguments);
  };
  var dynCall_viiifii$jscomp$0 = Module$jscomp$0["dynCall_viiifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiifii"].apply(null, arguments);
  };
  var dynCall_viiifiii$jscomp$0 = Module$jscomp$0["dynCall_viiifiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiifiii"].apply(null, arguments);
  };
  var dynCall_viiii$jscomp$0 = Module$jscomp$0["dynCall_viiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiii"].apply(null, arguments);
  };
  var dynCall_viiiif$jscomp$0 = Module$jscomp$0["dynCall_viiiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiif"].apply(null, arguments);
  };
  var dynCall_viiiififii$jscomp$0 = Module$jscomp$0["dynCall_viiiififii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiififii"].apply(null, arguments);
  };
  var dynCall_viiiifii$jscomp$0 = Module$jscomp$0["dynCall_viiiifii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiifii"].apply(null, arguments);
  };
  var dynCall_viiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiii"].apply(null, arguments);
  };
  var dynCall_viiiiif$jscomp$0 = Module$jscomp$0["dynCall_viiiiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiif"].apply(null, arguments);
  };
  var dynCall_viiiiiffi$jscomp$0 = Module$jscomp$0["dynCall_viiiiiffi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiffi"].apply(null, arguments);
  };
  var dynCall_viiiiiffii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiffii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiffii"].apply(null, arguments);
  };
  var dynCall_viiiiifi$jscomp$0 = Module$jscomp$0["dynCall_viiiiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiifi"].apply(null, arguments);
  };
  var dynCall_viiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiif$jscomp$0 = Module$jscomp$0["dynCall_viiiiiif"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiif"].apply(null, arguments);
  };
  var dynCall_viiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiifi$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiifi"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiifi"].apply(null, arguments);
  };
  var dynCall_viiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiiiiiiiiiiiiiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiiiiiiiiiiiiiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiiiiiiiiiiiiiiii"].apply(null, arguments);
  };
  var dynCall_viiiijiiii$jscomp$0 = Module$jscomp$0["dynCall_viiiijiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiijiiii"].apply(null, arguments);
  };
  var dynCall_viiiji$jscomp$0 = Module$jscomp$0["dynCall_viiiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiiji"].apply(null, arguments);
  };
  var dynCall_viiijji$jscomp$0 = Module$jscomp$0["dynCall_viiijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiijji"].apply(null, arguments);
  };
  var dynCall_viij$jscomp$0 = Module$jscomp$0["dynCall_viij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viij"].apply(null, arguments);
  };
  var dynCall_viiji$jscomp$0 = Module$jscomp$0["dynCall_viiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viiji"].apply(null, arguments);
  };
  var dynCall_viijii$jscomp$0 = Module$jscomp$0["dynCall_viijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijii"].apply(null, arguments);
  };
  var dynCall_viijiijiii$jscomp$0 = Module$jscomp$0["dynCall_viijiijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijiijiii"].apply(null, arguments);
  };
  var dynCall_viijijii$jscomp$0 = Module$jscomp$0["dynCall_viijijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijijii"].apply(null, arguments);
  };
  var dynCall_viijijiii$jscomp$0 = Module$jscomp$0["dynCall_viijijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijijiii"].apply(null, arguments);
  };
  var dynCall_viijj$jscomp$0 = Module$jscomp$0["dynCall_viijj"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijj"].apply(null, arguments);
  };
  var dynCall_viijji$jscomp$0 = Module$jscomp$0["dynCall_viijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijji"].apply(null, arguments);
  };
  var dynCall_viijjiii$jscomp$0 = Module$jscomp$0["dynCall_viijjiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijjiii"].apply(null, arguments);
  };
  var dynCall_viijjji$jscomp$0 = Module$jscomp$0["dynCall_viijjji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viijjji"].apply(null, arguments);
  };
  var dynCall_vij$jscomp$0 = Module$jscomp$0["dynCall_vij"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vij"].apply(null, arguments);
  };
  var dynCall_viji$jscomp$0 = Module$jscomp$0["dynCall_viji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_viji"].apply(null, arguments);
  };
  var dynCall_vijii$jscomp$0 = Module$jscomp$0["dynCall_vijii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijii"].apply(null, arguments);
  };
  var dynCall_vijiii$jscomp$0 = Module$jscomp$0["dynCall_vijiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijiii"].apply(null, arguments);
  };
  var dynCall_vijiji$jscomp$0 = Module$jscomp$0["dynCall_vijiji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijiji"].apply(null, arguments);
  };
  var dynCall_vijijji$jscomp$0 = Module$jscomp$0["dynCall_vijijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijijji"].apply(null, arguments);
  };
  var dynCall_vijji$jscomp$0 = Module$jscomp$0["dynCall_vijji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijji"].apply(null, arguments);
  };
  var dynCall_vijjii$jscomp$0 = Module$jscomp$0["dynCall_vijjii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vijjii"].apply(null, arguments);
  };
  var dynCall_vji$jscomp$0 = Module$jscomp$0["dynCall_vji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vji"].apply(null, arguments);
  };
  var dynCall_vjiiii$jscomp$0 = Module$jscomp$0["dynCall_vjiiii"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vjiiii"].apply(null, arguments);
  };
  var dynCall_vjji$jscomp$0 = Module$jscomp$0["dynCall_vjji"] = function() {
    return Module$jscomp$0["asm"]["dynCall_vjji"].apply(null, arguments);
  };
  Module$jscomp$0["asm"] = asm$jscomp$0;
  Module$jscomp$0["ccall"] = ccall$jscomp$0;
  Module$jscomp$0["cwrap"] = cwrap$jscomp$0;
  Module$jscomp$0["stackTrace"] = stackTrace$jscomp$0;
  Module$jscomp$0["addRunDependency"] = addRunDependency$jscomp$0;
  Module$jscomp$0["removeRunDependency"] = removeRunDependency$jscomp$0;
  Module$jscomp$0["FS_createPath"] = FS$jscomp$0.createPath;
  Module$jscomp$0["FS_createDataFile"] = FS$jscomp$0.createDataFile;
  ExitStatus$jscomp$0.prototype = new Error;
  ExitStatus$jscomp$0.prototype.constructor = ExitStatus$jscomp$0;
  var initialStackTop$jscomp$0;
  var calledMain$jscomp$0 = false;
  dependenciesFulfilled$jscomp$0 = function runCaller$jscomp$0() {
    if (!Module$jscomp$0["calledRun"]) {
      run$jscomp$0();
    }
    if (!Module$jscomp$0["calledRun"]) {
      dependenciesFulfilled$jscomp$0 = runCaller$jscomp$0;
    }
  };
  Module$jscomp$0["callMain"] = function callMain$jscomp$0(args$jscomp$4) {
    args$jscomp$4 = args$jscomp$4 || [];
    ensureInitRuntime$jscomp$0();
    var argc$jscomp$0 = args$jscomp$4.length + 1;
    var argv$jscomp$0 = stackAlloc$jscomp$0((argc$jscomp$0 + 1) * 4);
    HEAP32$jscomp$0[argv$jscomp$0 >> 2] = allocateUTF8OnStack$jscomp$0(Module$jscomp$0["thisProgram"]);
    var i$jscomp$91 = 1;
    for (; i$jscomp$91 < argc$jscomp$0; i$jscomp$91++) {
      HEAP32$jscomp$0[(argv$jscomp$0 >> 2) + i$jscomp$91] = allocateUTF8OnStack$jscomp$0(args$jscomp$4[i$jscomp$91 - 1]);
    }
    HEAP32$jscomp$0[(argv$jscomp$0 >> 2) + argc$jscomp$0] = 0;
    try {
      var ret$jscomp$35 = Module$jscomp$0["_main"](argc$jscomp$0, argv$jscomp$0, 0);
      exit$jscomp$0(ret$jscomp$35, true);
    } catch (e$jscomp$351) {
      if (e$jscomp$351 instanceof ExitStatus$jscomp$0) {
        return;
      } else {
        if (e$jscomp$351 == "SimulateInfiniteLoop") {
          Module$jscomp$0["noExitRuntime"] = true;
          return;
        } else {
          var toLog$jscomp$0 = e$jscomp$351;
          if (e$jscomp$351 && typeof e$jscomp$351 === "object" && e$jscomp$351.stack) {
            toLog$jscomp$0 = [e$jscomp$351, e$jscomp$351.stack];
          }
          err$jscomp$3("exception thrown: " + toLog$jscomp$0);
          Module$jscomp$0["quit"](1, e$jscomp$351);
        }
      }
    } finally {
      calledMain$jscomp$0 = true;
    }
  };
  Module$jscomp$0["run"] = run$jscomp$0;
  Module$jscomp$0["abort"] = abort$jscomp$0;
  if (Module$jscomp$0["preInit"]) {
    if (typeof Module$jscomp$0["preInit"] == "function") {
      Module$jscomp$0["preInit"] = [Module$jscomp$0["preInit"]];
    }
    for (; Module$jscomp$0["preInit"].length > 0;) {
      Module$jscomp$0["preInit"].pop()();
    }
  }
  var shouldRunNow$jscomp$0 = true;
  if (Module$jscomp$0["noInitialRun"]) {
    shouldRunNow$jscomp$0 = false;
  }
  Module$jscomp$0["noExitRuntime"] = true;
  run$jscomp$0();
}
;