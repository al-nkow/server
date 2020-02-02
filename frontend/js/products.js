import urlService from './urlService';
import renderProductsList from './renderProductsList';

const Products = () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInp = document.getElementById('searchInp');

  function searchClickHandler() {
    const baseUrl = window.location.href.split('?')[0];
    const queryParams = urlService.getUrlParamsAsObject();

    // set new value of url param
    queryParams.search = searchInp.value;

    const queryString = urlService.createUrlParamsString(queryParams);

    const url = baseUrl + queryString;

    // set url params without reloading page
    if (history.pushState)
      window.history.pushState({ path: url }, '', url);
    searchRequest(searchInp.value);

    // document.location.search = queryString;

    // const wrap = document.getElementById('productsList');
    // const inp = document.getElementById('searchInp');
    // wrap.innerHTML = '';
    // searchRequest(inp.value);
  }

  function initFilterValues() {
    const queryParams = urlService.getUrlParamsAsObject();
    const searchInputValue = queryParams.search;

    if (searchInputValue)
      searchInp.value = decodeURIComponent(searchInputValue);
  }

  function searchRequest(searchStr) {
    const SEARCH_URL = '/api/products/search';
    const myHeaders = new Headers();
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({ search: searchStr }),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    fetch(SEARCH_URL, fetchData)
      .then(response => response.json())
      .then(function(res) {
        if (res && res.searchResult && res.searchResult.length) {
          // if no - shoe message "no items"
          renderProductsList(res.searchResult);
        }
      })
      .catch(function(error) {
        console.log('ERROR >>>>>>', error);
      });
  }

  searchBtn.addEventListener('click', searchClickHandler);
  initFilterValues();
};

export default Products;
