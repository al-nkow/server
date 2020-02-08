import urlService from './urlService';
import renderProductsList from './renderProductsList';

const Products = () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInp = document.getElementById('searchInp');
  const categorySelect = document.getElementById('categorySelect');
  const brandSelect = document.getElementById('brandSelect');
  const baseUrl = window.location.href.split('?')[0];

  /**
   * Submit search form
   */
  function searchClickHandler() {
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

  function searchRequest() {
    const body = urlService.getUrlParamsAsObject();
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
        renderProductsList(res);
      })
      .catch(function(error) {
        console.log('ERROR >>>>>>', error);
      });
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

  function categorySelectChangeHandler(event) {
    addParameterToUrl('category', event.target.value);
    searchRequest();
  }

  function brandSelectChangeHandler(event) {
    addParameterToUrl('brand', event.target.value);
    searchRequest();
  }

  categorySelect.addEventListener(
    'change',
    categorySelectChangeHandler,
  );

  brandSelect.addEventListener('change', brandSelectChangeHandler);

  searchBtn.addEventListener('click', searchClickHandler);
  initFilterValues();
  initFromToInputsChangeListeners();
};

export default Products;
