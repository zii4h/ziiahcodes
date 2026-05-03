/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dequal";
exports.ids = ["vendor-chunks/dequal"];
exports.modules = {

/***/ "(ssr)/./node_modules/dequal/lite/index.js":
/*!*******************************************!*\
  !*** ./node_modules/dequal/lite/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("var has = Object.prototype.hasOwnProperty;\n\nfunction dequal(foo, bar) {\n\tvar ctor, len;\n\tif (foo === bar) return true;\n\n\tif (foo && bar && (ctor=foo.constructor) === bar.constructor) {\n\t\tif (ctor === Date) return foo.getTime() === bar.getTime();\n\t\tif (ctor === RegExp) return foo.toString() === bar.toString();\n\n\t\tif (ctor === Array) {\n\t\t\tif ((len=foo.length) === bar.length) {\n\t\t\t\twhile (len-- && dequal(foo[len], bar[len]));\n\t\t\t}\n\t\t\treturn len === -1;\n\t\t}\n\n\t\tif (!ctor || typeof foo === 'object') {\n\t\t\tlen = 0;\n\t\t\tfor (ctor in foo) {\n\t\t\t\tif (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;\n\t\t\t\tif (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;\n\t\t\t}\n\t\t\treturn Object.keys(bar).length === len;\n\t\t}\n\t}\n\n\treturn foo !== foo && bar !== bar;\n}\n\nexports.dequal = dequal;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVxdWFsL2xpdGUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsY0FBYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxwb3RhdFxcRG93bmxvYWRzXFxmaWxlc1xcemlpYWhjb2Rlc1xcbm9kZV9tb2R1bGVzXFxkZXF1YWxcXGxpdGVcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBkZXF1YWwoZm9vLCBiYXIpIHtcblx0dmFyIGN0b3IsIGxlbjtcblx0aWYgKGZvbyA9PT0gYmFyKSByZXR1cm4gdHJ1ZTtcblxuXHRpZiAoZm9vICYmIGJhciAmJiAoY3Rvcj1mb28uY29uc3RydWN0b3IpID09PSBiYXIuY29uc3RydWN0b3IpIHtcblx0XHRpZiAoY3RvciA9PT0gRGF0ZSkgcmV0dXJuIGZvby5nZXRUaW1lKCkgPT09IGJhci5nZXRUaW1lKCk7XG5cdFx0aWYgKGN0b3IgPT09IFJlZ0V4cCkgcmV0dXJuIGZvby50b1N0cmluZygpID09PSBiYXIudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjdG9yID09PSBBcnJheSkge1xuXHRcdFx0aWYgKChsZW49Zm9vLmxlbmd0aCkgPT09IGJhci5sZW5ndGgpIHtcblx0XHRcdFx0d2hpbGUgKGxlbi0tICYmIGRlcXVhbChmb29bbGVuXSwgYmFyW2xlbl0pKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBsZW4gPT09IC0xO1xuXHRcdH1cblxuXHRcdGlmICghY3RvciB8fCB0eXBlb2YgZm9vID09PSAnb2JqZWN0Jykge1xuXHRcdFx0bGVuID0gMDtcblx0XHRcdGZvciAoY3RvciBpbiBmb28pIHtcblx0XHRcdFx0aWYgKGhhcy5jYWxsKGZvbywgY3RvcikgJiYgKytsZW4gJiYgIWhhcy5jYWxsKGJhciwgY3RvcikpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKCEoY3RvciBpbiBiYXIpIHx8ICFkZXF1YWwoZm9vW2N0b3JdLCBiYXJbY3Rvcl0pKSByZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoYmFyKS5sZW5ndGggPT09IGxlbjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZm9vICE9PSBmb28gJiYgYmFyICE9PSBiYXI7XG59XG5cbmV4cG9ydHMuZGVxdWFsID0gZGVxdWFsOyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dequal/lite/index.js\n");

/***/ })

};
;