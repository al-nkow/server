const Home = () => {
  const btn = document.getElementById('searchBtn');

  btn.addEventListener('click', searchClickHandler);

  function searchClickHandler() {
    const wrap = document.getElementById('productsList');
    const inp = document.getElementById('searchInp');
    wrap.innerHTML = '';
    searchRequest(inp.value);
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
          renderProductsList(res.searchResult);
        }
      })
      .catch(function(error) {
        console.log('ERROR >>>>>>', error);
      });
  }

  function renderProductsList(data) {
    console.log('>>>>>>', data);
    const wrap = document.getElementById('productsList');
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      const name = document.createTextNode(item.name);
      card.appendChild(name);
      fragment.appendChild(card);
    });

    wrap.appendChild(fragment);
  }
};

export default Home;
