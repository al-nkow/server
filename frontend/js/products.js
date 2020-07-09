import urlService from './urlService';
import renderProductsList from './renderProductsList';
import windowScrollService from './windowScrollService';

const Products = () => {
  const PRODUCTS_PORTION_SIZE = 9;
  const searchForm = document.getElementById('searchForm');
  const searchInp = document.getElementById('searchInp');
  const categorySelect = document.getElementById('categorySelect');
  const brandSelect = document.getElementById('brandSelect');
  const baseUrl = window.location.href.split('?')[0];
  const filtersBlock = document.getElementById(
    'productsFiltersBlock',
  );
  const filtersAmount = document.getElementById('filtersAmount');
  const productsListWrap = document.getElementById('productsListWrap');
  const coopBtn = document.getElementById('coopBtn');

  const fromToInputIds = [
    'heightFrom',
    'heightTo',
    'widthFrom',
    'widthTo',
    'thicknessFrom',
    'thicknessTo',
    'weightFrom',
    'weightTo',
    'volumeLFrom',
    'volumeLTo',
    'volumeMFrom',
    'volumeMTo',
    'areaFrom',
    'areaTo',
  ];

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
    return value && typeof value === 'string'
      ? value.replace(/[^\s0-9а-яА-Яa-zA-Z]/gi, '')
      : '';
  }

  /**
   * Search input validation
   */
  function initSearchInputValidation() {
    searchInp.addEventListener('keyup', function(event) {
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
      element.addEventListener('input', function(event) {
        const { value: inpValue } = event.target;
        const str = inpValue.replace(/[^+\d]/g, '');
        event.target.value = str;
        addParameterToUrl(key, str);
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
          searchRequest();
        }, 500);
      });
    });
  }

  /**
   * Set the values of all filters according to the url parameters
   */
  function initFilterValues() {
    const queryParams = urlService.getUrlParamsAsObject();
    const searchInputValue = queryParams.search;
    const categoryValue = queryParams.category;
    const brandValue = queryParams.brand;
    const coopOnlyValue = queryParams.coopOnly;

    fromToInputIds.forEach(item => {
      const inpValue = queryParams[item];
      if (inpValue) document.getElementById(item).value = inpValue;
    });

    if (searchInputValue)
      searchInp.value = decodeURIComponent(searchInputValue);
    if (brandValue)
      brandSelect.value = decodeURIComponent(brandValue);
    if (categoryValue) categorySelect.value = categoryValue;
    if (coopOnlyValue === 'true') {
      coopBtn.classList.add('active');
    }
  }

  /**
   * Perform search request
   */
  async function searchRequest() {
    const body = urlService.getUrlParamsAsObject();

    if (isEmpty(body)) {
      productsListWrap.innerHTML = '<div class="col-12 no-filters-selected">Задайте какие-нибудь параметры поиска!</div>';
      fullProductsList = [];
      return false;
    }

    filtersAmount.innerHTML = Object.keys(body).length;

    if (body.search) body.search = decodeURIComponent(body.search);
    if (body.brand) body.brand = decodeURIComponent(body.brand);

    const SEARCH_URL = '/api/products/search';
    const myHeaders = new Headers();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    try {
      // start loading
      productsListWrap.innerHTML = '<div class="loader">Loading...</div>';
      disableControls(true);
      
      const response = await fetch(SEARCH_URL, fetchData);
      const json = await response.json();
      const data = json && json.searchResult ? json.searchResult : null;
      const count = data ? data.length : null;

      // end loading
      disableControls(false);

      setMobileFiltersDataCount(count);
      // renderProductsList(data, true); // - render full list
      fullProductsList = data.slice();
      showProductsPortion(true);

    } catch (error) {
      console.log('SEARCH ERROR:', error);
      disableControls(false);
    }
  }

  /**
   * Check if object is empty
   * @param {object} obj 
   */
  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  /**
   * Disable or enable ol filters and search input
   * @param {boolean} val 
   */
  function disableControls(val) {
    const elements = [...filtersBlock.elements, ...searchForm.elements];
    elements.forEach(item => item.disabled = val);
    
    const btnMethod = val ? 'add' : 'remove';
    coopBtn.classList[btnMethod]('disabled');
  }

  /**
   * Set result into filters button
   * @param {number|null} count 
   */
  function setMobileFiltersDataCount(count) {
    const counterEl = document.getElementById('filterResult');
    counterEl.innerHTML = count || 0;
  }

  /**
   * Render or append portion of products in to products list wrap section
   * @param {boolean} clear - do we need to clear block if no products?
   */
  function showProductsPortion(clear) {
    if ((!fullProductsList || !fullProductsList.length) && !clear)
      return;

    productsPortion =
      fullProductsList && fullProductsList.length
        ? fullProductsList.splice(0, PRODUCTS_PORTION_SIZE)
        : [];
    renderProductsList(productsPortion, clear);
  }

  /**
   * Add parameter to url (without reload)
   * @param {string} key
   * @param {string} value
   */
  function addParameterToUrl(key, value) {
    const queryParams = urlService.getUrlParamsAsObject();
    queryParams[key] = value;
    const queryString = urlService.createUrlParamsString(queryParams);
    const url = baseUrl + queryString;
    if (history.pushState)
      window.history.pushState({ path: url }, '', url);
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

  /**
   * Only cooperations button
   */
  function coopBtnChangeHandler() {
    const disabled = coopBtn.classList.contains('disabled');
    if (!disabled) {
      const selected = coopBtn.classList.contains('active');
      coopBtn.classList.toggle('active');
      addParameterToUrl('coopOnly', !selected);
      searchRequest();
    }
  }

  categorySelect.addEventListener(
    'change',
    categorySelectChangeHandler,
  );
  brandSelect.addEventListener('change', brandSelectChangeHandler);
  coopBtn.addEventListener('click', coopBtnChangeHandler);
  searchForm.addEventListener('submit', searchFormSubmitHandler);

  initFilterValues();
  initFromToInputsChangeListeners();
  windowScrollService(showProductsPortion);
  searchRequest();
  initSearchInputValidation();

  ['productsFiltersToggle', 'productsFiltersToggleHead', 'countFilters'].forEach(
    id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('click', () => {
          filtersBlock.classList.toggle('active');
        });
      }
    },
  );

  document.getElementById('clearFilters').addEventListener('click', () => {
    filtersBlock.reset();
    if (history.pushState) {
      window.history.pushState({ path: baseUrl }, '', baseUrl);
      searchRequest();
    }
  });

};

export default Products;
