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

  let fullProductsList = [];
  let productsPortion = [];

  /**
   * Submit search form
   */
  function searchFormSubmitHandler(event) {
    event.preventDefault();
    addParameterToUrl('search', searchInp.value);
    searchRequest();
  }

  /**
   * Init filter inputs (from/to) change listeners
   */
  function initFromToInputsChangeListeners() {
    const inputIds = [
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
    inputIds.forEach(key => {
      const element = document.getElementById(key);
      element.addEventListener('input', function(event) {
        const { value: inpValue } = event.target;
        const str = inpValue.replace(/[^+\d]/g, '');
        event.target.value = str;
        addParameterToUrl(key, str);
        searchRequest();
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

    if (searchInputValue)
      searchInp.value = decodeURIComponent(searchInputValue);
    if (brandValue)
      brandSelect.value = decodeURIComponent(brandValue);
    if (categoryValue) categorySelect.value = categoryValue;
  }

  /**
   * Perform search request
   */
  function searchRequest() {
    const body = urlService.getUrlParamsAsObject();
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

    fetch(SEARCH_URL, fetchData)
      .then(response => response.json())
      .then(function(res) {
        const data =
          res && res.searchResult ? res.searchResult : null;
        // renderProductsList(data, true); // - render full list
        fullProductsList = data;
        showProductsPortion(true);
      })
      .catch(function(error) {
        console.log('SEARCH ERROR:', error);
      });
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

  categorySelect.addEventListener(
    'change',
    categorySelectChangeHandler,
  );
  brandSelect.addEventListener('change', brandSelectChangeHandler);
  searchForm.addEventListener('submit', searchFormSubmitHandler);
  initFilterValues();
  initFromToInputsChangeListeners();
  windowScrollService(showProductsPortion);
  searchRequest();

  // =========================
  ['productsFiltersToggle', 'productsFiltersToggleHead'].forEach(
    id => {
      document.getElementById(id).addEventListener('click', () => {
        filtersBlock.classList.toggle('active');
      });
    },
  );
};

export default Products;
