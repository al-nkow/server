const Home = () => {
  const btn = document.getElementById('searchBtn');

  btn.addEventListener('click', searchClickHandler);

  function searchClickHandler() {
    const inp = document.getElementById('searchInp');
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
        console.log('>>>>>>', res);
      })
      .catch(function(error) {
        console.log('ERROR >>>>>>', error);
      });
  }
};

export default Home;
