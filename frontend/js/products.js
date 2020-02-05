import urlService from './urlService';
import renderProductsList from './renderProductsList';

const Products = () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInp = document.getElementById('searchInp');
  const ctategorySelect = document.getElementById('categorySelect');
  const baseUrl = window.location.href.split('?')[0];

  function searchClickHandler() {
    addParameterToUrl('search', searchInp.value);
    searchRequest();
  }

  function initFilterValues() {
    const queryParams = urlService.getUrlParamsAsObject();
    const searchInputValue = queryParams.search;
    const categoryValue = queryParams.category;

    if (searchInputValue)
      searchInp.value = decodeURIComponent(searchInputValue);
    if (categoryValue) ctategorySelect.value = categoryValue;
  }

  function searchRequest() {
    const body = urlService.getUrlParamsAsObject();
    if (body.search) body.search = decodeURIComponent(body.search);

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

  ctategorySelect.addEventListener(
    'change',
    categorySelectChangeHandler,
  );

  searchBtn.addEventListener('click', searchClickHandler);
  initFilterValues();
};

export default Products;
