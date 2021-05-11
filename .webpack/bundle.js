module.exports = /******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = './packages/api/script/generateSwagger.ts'));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './packages/api/script/generateSwagger.ts':
      /*!************************************************!*\
  !*** ./packages/api/script/generateSwagger.ts ***!
  \************************************************/
      /*! exports provided: onExit */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'onExit', function () {
          return onExit;
        });
        /* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! child_process */ 'child_process',
        );
        /* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          child_process__WEBPACK_IMPORTED_MODULE_0__,
        );
        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ 'path');
        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          path__WEBPACK_IMPORTED_MODULE_1__,
        );

        const cwd = process.cwd();
        function onExit(childProcess) {
          return new Promise((resolve, reject) => {
            childProcess.once('exit', (code) => {
              if (code === 0) {
                resolve(undefined);
              } else {
                reject(new Error(`Exit with error code: ${code}`));
              }
            });
            childProcess.once('error', (err) => {
              reject(err);
            });
          });
        }

        const runProcess = async (command, args, cwdCommand) => {
          const childProcess = Object(child_process__WEBPACK_IMPORTED_MODULE_0__['spawn'])(command, args, {
            stdio: [process.stdin, process.stdout, process.stderr],
            cwd: cwdCommand,
          });
          await onExit(childProcess);
        };

        const generateSwagger = async () => {
          const command = 'yarn';
          const apiPackage = './packages/api';
          const swaggerConfig = './src/swagger/swaggerConfig.js';
          const apiPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(cwd, apiPackage);
          const swaggerConfigPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(apiPath, swaggerConfig);
          const authPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(cwd, './packages/api/src/api/auth/v1');
          const authRegex = `${authPath}/**/*.yml`;
          console.log(' authRegex', authRegex);
          const args = ['swagger-jsdoc', '-d', swaggerConfigPath, authRegex, '-o'];
          const argsYml = [...args, './src/swagger/fpApi.yml'];
          const argsJson = [...args, './src/swagger/fpApi.json'];
          await runProcess(command, argsYml, apiPath);
          await runProcess(command, argsJson, apiPath);
        };

        (async () => {
          try {
            await generateSwagger();
          } catch (err) {
            // eslint-disable-next-line
            console.log('err: ', err);
          }

          process.exit(0);
        })();

        /***/
      },

    /***/ child_process:
      /*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        module.exports = require('child_process');

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /*! no static exports found */
      /***/ function (module, exports) {
        module.exports = require('path');

        /***/
      },

    /******/
  },
);
