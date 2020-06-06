const thumbUp = `<svg class="has-coop" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m1.75 23h2.5c.965 0 1.75-.785 1.75-1.75v-11.5c0-.965-.785-1.75-1.75-1.75h-2.5c-.965 0-1.75.785-1.75 1.75v11.5c0 .965.785 1.75 1.75 1.75z"/><path d="m12.781.75c-1 0-1.5.5-1.5 3 0 2.376-2.301 4.288-3.781 5.273v12.388c1.601.741 4.806 1.839 9.781 1.839h1.6c1.95 0 3.61-1.4 3.94-3.32l1.12-6.5c.42-2.45-1.46-4.68-3.94-4.68h-4.72s.75-1.5.75-4c0-3-2.25-4-3.25-4z"/></svg>`

const renderProductsList = (data, clear) => {

  const wrap = document.getElementById('productsListWrap');

  if (!data || !data.length) {
    wrap.innerHTML =
      '<div class="col-12">По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col-12', 'col-md-6', 'col-lg-4');

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
        ${item.hasCooperation ? `<div class="has-coop-wrap">${thumbUp}</div>` : ''}
        <img class="card-img-top" src="${item.image ||
          '/images/noimg.png'}" alt="">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          ${
            item.brand
              ? '<h6 class="card-subtitle mb-2 text-muted">' +
                item.brand +
                '</h6>'
              : ''
          }
          <p class="card-text">
            <div class="row">
              ${propsLayout}
            </div>
          </p>
          ${
            item.minPrice
              ? '<p class="card-text product-card__price">' +
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

    if (clear) wrap.innerHTML = '';
    fragment.appendChild(card);
  });

  wrap.appendChild(fragment);
};

export default renderProductsList;
