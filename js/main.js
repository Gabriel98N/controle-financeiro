/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cadastro.js":
/*!************************!*\
  !*** ./js/cadastro.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cadastro)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./js/dom.js\");\n\r\n\r\nconst dom = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\nfunction Cadastro() {\r\n  const instituicao = dom.el(\"#instituicao\");\r\n  const nomeImpr = dom.el(\"#nome-impresso\");\r\n  const diaVenc = dom.el(\"#vencimento\");\r\n  const limite = dom.el(\"#limite\");\r\n  const btnConfirmar = dom.el(\".btn-confirmar\");\r\n\r\n  const arrStorageCartao = dom.getStorage(\"cartao\");\r\n  const arrCartao = arrStorageCartao ? arrStorageCartao : [];\r\n\r\n  const listaCartao = dom.el(\".lista-cartao-cadastrado\");\r\n\r\n  async function dadosJSON() {\r\n    const response = await fetch(\"js/dados.json\");\r\n    const dados = await response.json();\r\n    return dados;\r\n  }\r\n\r\n  async function criarSelectCartao() {\r\n    const dados = await dadosJSON();\r\n    if (instituicao) {\r\n      dados.forEach(({ nome_inst }) => {\r\n        const option = dom.create(\"option\");\r\n        option.innerText = nome_inst;\r\n        option.value = nome_inst;\r\n        instituicao.appendChild(option);\r\n      });\r\n    }\r\n  }\r\n\r\n  function fnCartao(nomeImp, diaVenc, imgBandeira, bandeira, corCartao) {\r\n    const cartao = dom.create(\"li\");\r\n    cartao.classList.add(\"cartao\");\r\n    cartao.style.backgroundColor = corCartao;\r\n\r\n    if (listaCartao) {\r\n      cartao.innerHTML = `\r\n      <p class=\"nome-impresso\">${nomeImp}</p>\r\n        <div class=\"vencimento\">\r\n          <div>\r\n            <span>Venc</span>\r\n            <p>${diaVenc}</p>\r\n          </div>\r\n          <img src=\"${imgBandeira}\" alt=\"${bandeira}\">\r\n        </div>\r\n      `;\r\n      listaCartao.appendChild(cartao);\r\n    }\r\n  }\r\n\r\n  async function criarCartao() {\r\n    const dados = await dadosJSON();\r\n    if (btnConfirmar) {\r\n      btnConfirmar.addEventListener(\"click\", (e) => {\r\n        e.preventDefault();\r\n        dados.forEach(({ nome_inst, bandeira, logo_bandeira, cor_cartao }) => {\r\n          if (nome_inst === instituicao.value) {\r\n            arrCartao.push({\r\n              instituicao: instituicao.value,\r\n              nomeImp: nomeImpr.value.toUpperCase(),\r\n              diaVenc: diaVenc.value,\r\n              limite: limite.value,\r\n              bandeira: bandeira,\r\n              logoBandeira: logo_bandeira,\r\n              corCartao: cor_cartao,\r\n            });\r\n            dom.setStorage(\"cartao\", arrCartao);\r\n            fnCartao(\r\n              nomeImpr.value,\r\n              diaVenc.value,\r\n              logo_bandeira,\r\n              bandeira,\r\n              cor_cartao\r\n            );\r\n          }\r\n        });\r\n      });\r\n    }\r\n  }\r\n\r\n  function salvarCartao() {\r\n    arrCartao.forEach(\r\n      ({ nomeImp, diaVenc, logoBandeira, bandeira, corCartao }) => {\r\n        fnCartao(nomeImp, diaVenc, logoBandeira, bandeira, corCartao);\r\n      }\r\n    );\r\n  }\r\n\r\n  function init() {\r\n    criarSelectCartao();\r\n    criarCartao();\r\n    salvarCartao();\r\n  }\r\n\r\n  return { init };\r\n}\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/cadastro.js?");

/***/ }),

/***/ "./js/cartao.js":
/*!**********************!*\
  !*** ./js/cartao.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cartao)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./js/dom.js\");\n/* harmony import */ var _outside_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./outside-event.js */ \"./js/outside-event.js\");\n\r\n\r\n\r\nconst dom = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\nfunction Cartao() {\r\n  const cartao = dom.el(\".header-cartao .cartao\");\r\n  const selectBanco = dom.el(\"#banco\");\r\n  const arrCartao = dom.getStorage(\"cartao\");\r\n\r\n  const formTransacao = dom.el(\".form-transacao\");\r\n  const btnAdicionar = dom.el(\".btn-adicionar\");\r\n  const btnTransacao = dom.el(\".adicionar-transacao\");\r\n  const active = \"active\";\r\n\r\n  const arrTransacaoStorage = dom.getStorage(\"transacao\");\r\n  const arrTransacao = arrTransacaoStorage ? arrTransacaoStorage : [];\r\n\r\n  const nomeTransacao = dom.el(\"#nome-transacao\");\r\n  const valorTransacao = dom.el(\"#valor\");\r\n  const tipoTransacao = dom.el(\"#tipo-transacao\");\r\n\r\n  function mostrarBancoSelecionado(\r\n    nomeImp,\r\n    diaVenc,\r\n    logoBandeira,\r\n    bandeira,\r\n    corCartao,\r\n    limite,\r\n    id\r\n  ) {\r\n    if (cartao) {\r\n      const nome_imp = cartao.querySelector(\".nome-impresso\");\r\n      const vencimento = cartao.querySelector(\".vencimento p\");\r\n      const imgLogo = cartao.querySelector(\".vencimento img\");\r\n      const limiteDisponivel = dom.el(\".limite-disponivel\");\r\n\r\n      btnAdicionar.disabled = false;\r\n\r\n      cartao.style.backgroundColor = corCartao;\r\n      cartao.setAttribute(\"data-id\", id);\r\n\r\n      nome_imp.innerText = nomeImp;\r\n      vencimento.innerText = diaVenc;\r\n\r\n      imgLogo.src = logoBandeira;\r\n      imgLogo.alt = bandeira;\r\n\r\n      limiteDisponivel.innerText = dom.conversorMoeda(limite, \"PT-BR\", \"BRL\");\r\n    }\r\n  }\r\n\r\n  function selecionarBanco() {\r\n    if (arrCartao && selectBanco) {\r\n      selectBanco.disabled = false;\r\n      arrCartao.forEach(({ instituicao, nomeImp }) => {\r\n        const option = dom.create(\"option\");\r\n        option.innerText = `${instituicao} - ${nomeImp}`;\r\n        option.value = instituicao;\r\n        selectBanco.appendChild(option);\r\n      });\r\n\r\n      selectBanco.addEventListener(\"change\", (e) => {\r\n        arrCartao.forEach(\r\n          (\r\n            {\r\n              instituicao,\r\n              nomeImp,\r\n              corCartao,\r\n              bandeira,\r\n              diaVenc,\r\n              logoBandeira,\r\n              limite,\r\n            },\r\n            index\r\n          ) => {\r\n            if (instituicao === e.target.value) {\r\n              mostrarBancoSelecionado(\r\n                nomeImp,\r\n                diaVenc,\r\n                logoBandeira,\r\n                bandeira,\r\n                corCartao,\r\n                limite,\r\n                index\r\n              );\r\n              dom.setStorage(\"idCartao\", index);\r\n            }\r\n          }\r\n        );\r\n      });\r\n    }\r\n  }\r\n\r\n  function cartaoAtivo() {\r\n    const idCartao = dom.getStorage(\"idCartao\");\r\n    const optionBanco = dom.els(\"#banco option\");\r\n\r\n    if (arrCartao) {\r\n      arrCartao.forEach(\r\n        (\r\n          {\r\n            instituicao,\r\n            nomeImp,\r\n            corCartao,\r\n            bandeira,\r\n            diaVenc,\r\n            logoBandeira,\r\n            limite,\r\n          },\r\n          index\r\n        ) => {\r\n          if (idCartao == index) {\r\n            mostrarBancoSelecionado(\r\n              nomeImp,\r\n              diaVenc,\r\n              logoBandeira,\r\n              bandeira,\r\n              corCartao,\r\n              limite,\r\n              index\r\n            );\r\n            optionBanco.forEach((option) => {\r\n              if (instituicao === option.value)\r\n                option.setAttribute(\"selected\", \"\");\r\n            });\r\n          }\r\n        }\r\n      );\r\n    }\r\n  }\r\n\r\n  function handleClickAbrirForm(e) {\r\n    e.preventDefault();\r\n    formTransacao.classList.add(active);\r\n    (0,_outside_event_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\r\n      formTransacao,\r\n      () => {\r\n        formTransacao.classList.remove(active);\r\n      },\r\n      [\"click\"]\r\n    );\r\n  }\r\n\r\n  function handleClickTransacao(e) {\r\n    e.preventDefault();\r\n    const verificarTipoTransacao =\r\n      tipoTransacao.value === \"despesa\" ? \"-\" : \"+\";\r\n\r\n    arrTransacao.push({\r\n      nomeTransacao: nomeTransacao.value,\r\n      valor: valorTransacao.value,\r\n      tipo_transacao: [tipoTransacao.value, verificarTipoTransacao],\r\n    });\r\n\r\n    nomeTransacao.value = \"\";\r\n    nomeTransacao.focus();\r\n    valor.value = \"\";\r\n\r\n    dom.setStorage(\"transacao\", arrTransacao);\r\n  }\r\n\r\n  function adicionarTransacao() {\r\n    if (btnAdicionar) {\r\n      btnAdicionar.addEventListener(\"click\", handleClickAbrirForm);\r\n      btnTransacao.addEventListener(\"click\", handleClickTransacao);\r\n    }\r\n  }\r\n\r\n  function init() {\r\n    selecionarBanco();\r\n    cartaoAtivo();\r\n    adicionarTransacao();\r\n  }\r\n\r\n  return { init };\r\n}\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/cartao.js?");

/***/ }),

/***/ "./js/dom.js":
/*!*******************!*\
  !*** ./js/dom.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Dom() {\r\n  function el(el) {\r\n    return document.querySelector(el);\r\n  }\r\n\r\n  function els(el) {\r\n    return document.querySelectorAll(el);\r\n  }\r\n\r\n  function create(tag) {\r\n    return document.createElement(tag);\r\n  }\r\n\r\n  function events(...event) {\r\n    return [...event];\r\n  }\r\n\r\n  function transformLowerCase(string) {\r\n    return string.toLowerCase();\r\n  }\r\n\r\n  function addClass(element, classe) {\r\n    el(element).classList.add(classe);\r\n    return element;\r\n  }\r\n\r\n  function removeClass(element, classe) {\r\n    el(element).classList.remove(classe);\r\n    return element;\r\n  }\r\n\r\n  function toggleClass(element, classe) {\r\n    el(element).classList.toggle(classe);\r\n    return element;\r\n  }\r\n\r\n  function conversorMoeda(numero, lang, type) {\r\n    return Number(numero).toLocaleString(lang, {\r\n      style: \"currency\",\r\n      currency: type,\r\n    });\r\n  }\r\n\r\n  function firstLetter(text) {\r\n    return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;\r\n  }\r\n\r\n  function eventListeners(el, evento, callback) {\r\n    const element = document.querySelectorAll(el);\r\n    element.forEach((item) => {\r\n      item.addEventListener(evento, callback);\r\n    });\r\n    return element;\r\n  }\r\n\r\n  function setStorage(key, arr) {\r\n    localStorage.setItem(key, JSON.stringify(arr));\r\n    return arr;\r\n  }\r\n\r\n  function getStorage(key) {\r\n    return JSON.parse(localStorage.getItem(key));\r\n  }\r\n\r\n  return {\r\n    el,\r\n    els,\r\n    create,\r\n    events,\r\n    transformLowerCase,\r\n    addClass,\r\n    removeClass,\r\n    toggleClass,\r\n    conversorMoeda,\r\n    firstLetter,\r\n    eventListeners,\r\n    setStorage,\r\n    getStorage,\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dom);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/dom.js?");

/***/ }),

/***/ "./js/outside-event.js":
/*!*****************************!*\
  !*** ./js/outside-event.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction outsideEvent(element, callback, eventos) {\r\n  eventos = eventos || [\"click\", \"touchstart\"];\r\n  const html = document.documentElement;\r\n  const outside = \"data-outside\";\r\n\r\n  if (!element.hasAttribute(outside)) {\r\n    setTimeout(() => {\r\n      eventos.forEach((evento) => {\r\n        html.addEventListener(evento, handleOutsideClick);\r\n      });\r\n    });\r\n    element.setAttribute(outside, \"\");\r\n  }\r\n\r\n  function handleOutsideClick(event) {\r\n    if (!element.contains(event.target)) {\r\n      element.removeAttribute(outside);\r\n      eventos.forEach((evento) => {\r\n        html.removeEventListener(evento, handleOutsideClick);\r\n      });\r\n      callback();\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (outsideEvent);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/outside-event.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cadastro_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cadastro.js */ \"./js/cadastro.js\");\n/* harmony import */ var _cartao_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartao.js */ \"./js/cartao.js\");\n/* harmony import */ var _validacao_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validacao.js */ \"./js/validacao.js\");\n\r\n\r\n\r\n\r\n(0,_validacao_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\".btn-confirmar\", \"[required]\");\r\n(0,_validacao_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\".adicionar-transacao\", \"[required]\");\r\n\r\nconst cadastro = (0,_cadastro_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\ncadastro.init();\r\n\r\nconst cartao = (0,_cartao_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\ncartao.init();\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/script.js?");

/***/ }),

/***/ "./js/validacao.js":
/*!*************************!*\
  !*** ./js/validacao.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Validacao)\n/* harmony export */ });\nfunction Validacao(button, input) {\r\n  const inputs = document.querySelectorAll(input);\r\n  const btn = document.querySelector(button);\r\n\r\n  if (btn && inputs) {\r\n    function checarInput(inputs) {\r\n      let campo = true;\r\n      inputs.forEach((input) => {\r\n        if (!input.value) {\r\n          campo = false;\r\n        }\r\n      });\r\n      return campo;\r\n    }\r\n\r\n    function validarFormulario() {\r\n      btn.disabled = true;\r\n      inputs.forEach((input) => {\r\n        input.addEventListener(\"input\", () => {\r\n          if (checarInput(inputs)) {\r\n            btn.disabled = false;\r\n          } else {\r\n            btn.disabled = true;\r\n          }\r\n        });\r\n      });\r\n    }\r\n    validarFormulario();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/validacao.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;