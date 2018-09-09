 (function (modules) {
   function require(moduleId) {
     var module = {
       exports: {}
     };
     modules[moduleId].call(module.exports, module, module.exports, require);
     return module.exports;
   }
   return require("./src/index.js");
 })
 ({
   "./src/index.js": (function (module, __webpack_exports__, require) {
     "use strict";
     eval("\n/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_0__ = require(/*! ./a.js */ \"./src/a.js\");\n/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/\n\nconsole.log(\"fengnovo's webpack test\");\n\n//# sourceURL=webpack:///./src/index.js?");
   }),
   "./src/a.js": (function (module, exports) {
     eval("console.log('来自a文件。。。');\n\n//# sourceURL=webpack:///./src/a.js?");
   })
 });