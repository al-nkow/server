const renderProductsList = data => {
  console.log('PIZDA >>>>>>', data);
  const wrap = document.getElementById('productsListWrap');
  const fragment = document.createDocumentFragment();

  wrap.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col-4');

    const props = [
      {
        name: 'Ширина',
        key: 'width',
        units: 'см',
      },
      {
        name: 'Высота',
        key: 'height',
        units: 'см',
      },
      {
        name: 'Толщина',
        key: 'thickness',
        units: 'см',
      },
      {
        name: 'Объём',
        key: 'volumeL',
        units: 'л',
      },
      {
        name: 'Объём',
        key: 'volumeM',
        units: 'м.куб',
      },
      {
        name: 'Вес',
        key: 'weight',
        units: 'кг',
      },
      {
        name: 'Площадь',
        key: 'area',
        units: 'м.кв',
      },
    ];

    const propsLayout = props.reduce((res, prop) => {
      res += `${
        item[prop.key]
          ? `<div class="col-6">${
              prop.name
            }: </div><div class="col-6">${item[prop.key]}${
              prop.units
            }</div>`
          : ''
      }`;
      return res;
    }, '');

    card.innerHTML = `
      <div class="card mb-3">
        <img class="card-img-top" src="${item.image ||
          'images/noimg.png'}" alt="">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            ${item.brand}
          </h6>
          <p class="card-text">
            <div class="row">
              ${propsLayout}
            </div>
          </p>
          ${
            item.categoryName
              ? '<p class="card-text"><small class="text-muted">' +
                item.categoryName +
                '</small></p>'
              : ''
          }
        </div>
      <div>
    `;

    fragment.appendChild(card);
  });

  // const wrap = document.getElementById('productsList');
  // const fragment = document.createDocumentFragment();
  //
  // data.forEach(item => {
  //   const card = document.createElement('div');
  //   card.classList.add('product-card');
  //   const name = document.createTextNode(item.name);
  //   card.appendChild(name);
  //   fragment.appendChild(card);
  // });
  //
  wrap.appendChild(fragment);
};

export default renderProductsList;
