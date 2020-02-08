const renderProductsList = data => {
  const wrap = document.getElementById('productsListWrap');

  if (!data || !data.searchResult || !data.searchResult.length) {
    wrap.innerHTML =
      'По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку';
    return;
  }

  const fragment = document.createDocumentFragment();

  data.searchResult.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col-4');

    const props = [
      {
        name: 'Ширина',
        key: 'width',
        units: 'мм',
      },
      {
        name: 'Высота',
        key: 'height',
        units: 'мм',
      },
      {
        name: 'Толщина',
        key: 'thickness',
        units: 'мм',
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
      <a class="product-card card mb-3" href="/prices?product=${
        item._id
      }">
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
            item.minPrice
              ? '<p class="card-text">' +
                'Цена от ' +
                item.minPrice +
                'руб.' +
                '</p>'
              : ''
          }
          ${
            item.categoryName
              ? '<p class="card-text"><small class="text-muted">' +
                item.categoryName +
                '</small></p>'
              : ''
          }
        </div>
      <a>
    `;

    wrap.innerHTML = '';
    fragment.appendChild(card);
  });

  wrap.appendChild(fragment);
};

export default renderProductsList;
