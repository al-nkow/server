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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/index.js":
/*!***************************!*\
  !*** ./frontend/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/products */ "./frontend/js/products.js");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/style.scss */ "./frontend/styles/style.scss");
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_style_scss__WEBPACK_IMPORTED_MODULE_2__);



const currentUrl = window.location.href;
if (currentUrl.indexOf('/products') !== -1) Object(_js_products__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./frontend/js/products.js":
/*!*********************************!*\
  !*** ./frontend/js/products.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _urlService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlService */ "./frontend/js/urlService.js");
/* harmony import */ var _renderProductsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderProductsList */ "./frontend/js/renderProductsList.js");
/* harmony import */ var _windowScrollService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./windowScrollService */ "./frontend/js/windowScrollService.js");




const Products = () => {
  const PRODUCTS_PORTION_SIZE = 9;
  const searchForm = document.getElementById('searchForm');
  const searchInp = document.getElementById('searchInp');
  const categorySelect = document.getElementById('categorySelect');
  const brandSelect = document.getElementById('brandSelect');
  const baseUrl = window.location.href.split('?')[0];
  const filtersBlock = document.getElementById('productsFiltersBlock');
  const filtersAmount = document.getElementById('filtersAmount');
  const fromToInputIds = ['heightFrom', 'heightTo', 'widthFrom', 'widthTo', 'thicknessFrom', 'thicknessTo', 'weightFrom', 'weightTo', 'volumeLFrom', 'volumeLTo', 'volumeMFrom', 'volumeMTo', 'areaFrom', 'areaTo'];
  let searchTimeout;
  let fullProductsList = [];
  let productsPortion = [];
  /**
   * Submit search form
   */

  function searchFormSubmitHandler(event) {
    event.preventDefault();
    const searchValue = clearValue(searchInp.value);
    addParameterToUrl('search', searchValue);
    searchRequest();
  }
  /**
   * Replace all but numbers and letters
   */


  function clearValue(value) {
    return value && typeof value === 'string' ? value.replace(/[^\s0-9а-яА-Яa-zA-Z]/gi, '') : '';
  }
  /**
   * Search input validation
   */


  function initSearchInputValidation() {
    searchInp.addEventListener('keyup', function (event) {
      const value = clearValue(event.target.value);
      event.target.value = value;
    });
  }
  /**
   * Init filter inputs (from/to) change listeners
   */


  function initFromToInputsChangeListeners() {
    fromToInputIds.forEach(key => {
      const element = document.getElementById(key);
      element.addEventListener('input', function (event) {
        const {
          value: inpValue
        } = event.target;
        const str = inpValue.replace(/[^+\d]/g, '');
        event.target.value = str;
        addParameterToUrl(key, str);
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
          searchRequest();
        }, 500);
      });
    });
  }
  /**
   * Set the values of all filters according to the url parameters
   */


  function initFilterValues() {
    const queryParams = _urlService__WEBPACK_IMPORTED_MODULE_0__["default"].getUrlParamsAsObject();
    const searchInputValue = queryParams.search;
    const categoryValue = queryParams.category;
    const brandValue = queryParams.brand;
    fromToInputIds.forEach(item => {
      const inpValue = queryParams[item];
      if (inpValue) document.getElementById(item).value = inpValue;
    });
    if (searchInputValue) searchInp.value = decodeURIComponent(searchInputValue);
    if (brandValue) brandSelect.value = decodeURIComponent(brandValue);
    if (categoryValue) categorySelect.value = categoryValue;
  }
  /**
   * Perform search request
   */


  function searchRequest() {
    const body = _urlService__WEBPACK_IMPORTED_MODULE_0__["default"].getUrlParamsAsObject();
    filtersAmount.innerHTML = Object.keys(body).length;
    if (body.search) body.search = decodeURIComponent(body.search);
    if (body.brand) body.brand = decodeURIComponent(body.brand);
    const SEARCH_URL = '/api/products/search';
    const myHeaders = new Headers();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };
    myHeaders.append('Content-Type', 'application/json');
    fetch(SEARCH_URL, fetchData).then(response => response.json()).then(function (res) {
      const data = res && res.searchResult ? res.searchResult : null; // renderProductsList(data, true); // - render full list

      fullProductsList = data;
      showProductsPortion(true);
    }).catch(function (error) {
      console.log('SEARCH ERROR:', error);
    });
  }
  /**
   * Render or append portion of products in to products list wrap section
   * @param {boolean} clear - do we need to clear block if no products?
   */


  function showProductsPortion(clear) {
    if ((!fullProductsList || !fullProductsList.length) && !clear) return;
    productsPortion = fullProductsList && fullProductsList.length ? fullProductsList.splice(0, PRODUCTS_PORTION_SIZE) : [];
    Object(_renderProductsList__WEBPACK_IMPORTED_MODULE_1__["default"])(productsPortion, clear);
  }
  /**
   * Add parameter to url (without reload)
   * @param {string} key
   * @param {string} value
   */


  function addParameterToUrl(key, value) {
    const queryParams = _urlService__WEBPACK_IMPORTED_MODULE_0__["default"].getUrlParamsAsObject();
    queryParams[key] = value;
    const queryString = _urlService__WEBPACK_IMPORTED_MODULE_0__["default"].createUrlParamsString(queryParams);
    const url = baseUrl + queryString;
    if (history.pushState) window.history.pushState({
      path: url
    }, '', url);
  }
  /**
   * Category select change handler
   * @param event
   */


  function categorySelectChangeHandler(event) {
    addParameterToUrl('category', event.target.value);
    searchRequest();
  }
  /**
   * Brand select change handler
   * @param event
   */


  function brandSelectChangeHandler(event) {
    addParameterToUrl('brand', event.target.value);
    searchRequest();
  }

  categorySelect.addEventListener('change', categorySelectChangeHandler);
  brandSelect.addEventListener('change', brandSelectChangeHandler);
  searchForm.addEventListener('submit', searchFormSubmitHandler);
  initFilterValues();
  initFromToInputsChangeListeners();
  Object(_windowScrollService__WEBPACK_IMPORTED_MODULE_2__["default"])(showProductsPortion);
  searchRequest();
  initSearchInputValidation();
  ['productsFiltersToggle', 'productsFiltersToggleHead'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      filtersBlock.classList.toggle('active');
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Products);

/***/ }),

/***/ "./frontend/js/renderProductsList.js":
/*!*******************************************!*\
  !*** ./frontend/js/renderProductsList.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const renderProductsList = (data, clear) => {
  const wrap = document.getElementById('productsListWrap');

  if (!data || !data.length) {
    wrap.innerHTML = '<div class="col-12">По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку</div>';
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col-12', 'col-md-6', 'col-lg-4');
    const props = [{
      name: 'Ширина',
      key: 'width',
      units: 'мм'
    }, {
      name: 'Высота',
      key: 'height',
      units: 'мм'
    }, {
      name: 'Толщина',
      key: 'thickness',
      units: 'мм'
    }, {
      name: 'Объём',
      key: 'volumeL',
      units: 'л'
    }, {
      name: 'Объём',
      key: 'volumeM',
      units: 'м.куб'
    }, {
      name: 'Вес',
      key: 'weight',
      units: 'кг'
    }, {
      name: 'Площадь',
      key: 'area',
      units: 'м.кв'
    }];
    const propsLayout = props.reduce((res, prop) => {
      res += `${item[prop.key] ? `<div class="col-6">${prop.name}: </div><div class="col-6">${item[prop.key]}${prop.units}</div>` : ''}`;
      return res;
    }, '');
    card.innerHTML = `
      <a class="product-card card mb-3" href="/prices?product=${item._id}">
        <img class="card-img-top" src="${item.image || 'images/noimg.png'}" alt="">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          ${item.brand ? '<h6 class="card-subtitle mb-2 text-muted">' + item.brand + '</h6>' : ''}
          <p class="card-text">
            <div class="row">
              ${propsLayout}
            </div>
          </p>
          ${item.minPrice ? '<p class="card-text product-card__price">' + 'Цена от ' + item.minPrice + 'руб.' + '</p>' : ''}
          ${item.categoryName ? '<p class="card-text"><small class="text-muted">' + item.categoryName + '</small></p>' : ''}
        </div>
      <a>
    `;
    if (clear) wrap.innerHTML = '';
    fragment.appendChild(card);
  });
  wrap.appendChild(fragment);
};

/* harmony default export */ __webpack_exports__["default"] = (renderProductsList);

/***/ }),

/***/ "./frontend/js/urlService.js":
/*!***********************************!*\
  !*** ./frontend/js/urlService.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const urlService = () => {
  /**
   * Get full url and return object of urlParams as { key: value }
   * @returns {object}}
   */
  function getUrlParamsAsObject() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
    });
    return vars;
  }
  /**
   * Get params as object and return string (?param1=a?param2=b...)
   * @param {object} objectParams
   * @returns {string}
   */


  function createUrlParamsString(objectParams) {
    let queryString = '';

    for (let key in objectParams) {
      queryString = queryString ? queryString + '&' : queryString + '?';
      if (objectParams[key]) queryString += key + '=' + objectParams[key];
    }

    return queryString;
  }

  return {
    getUrlParamsAsObject,
    createUrlParamsString
  };
};

/* harmony default export */ __webpack_exports__["default"] = (urlService());

/***/ }),

/***/ "./frontend/js/windowScrollService.js":
/*!********************************************!*\
  !*** ./frontend/js/windowScrollService.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Watch window scroll and perform callback when almost bottom
 * @param {function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (callback => {
  window.addEventListener('scroll', function () {
    const browserWinHeight = window.innerHeight;
    const windowScrollValue = window.pageYOffset;
    const siteHeader = document.getElementById('siteHeader');
    const productsSearchBlock = document.getElementById('productsSearchBlock');
    const productsListBlock = document.getElementById('productsListBlock');
    const pageHeight = siteHeader.offsetHeight + productsSearchBlock.offsetHeight + productsListBlock.offsetHeight;
    const fullScroll = windowScrollValue + browserWinHeight;

    if (pageHeight - fullScroll < 50) {
      callback();
    }
  });
});

/***/ }),

/***/ "./frontend/styles/style.scss":
/*!************************************!*\
  !*** ./frontend/styles/style.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.js.map