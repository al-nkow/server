const thumbUp = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.237 11.1021C19.6447 10.5633 19.8704 9.9032 19.8704 9.2164C19.8704 8.12672 19.2613 7.09529 18.2808 
6.52012C18.0284 6.37207 17.741 6.29415 17.4484 6.29442H11.6287L11.7743 3.31177C11.8083 2.59098 11.5535 1.9066 11.0584 
1.38482C10.8154 1.12764 10.5223 0.923013 10.1971 0.783593C9.87197 0.644174 9.52166 0.57292 9.16786 0.574237C7.90588 
0.574237 6.78951 1.42365 6.4546 2.63952L4.3699 10.1872H1.23193C0.802368 10.1872 0.455322 10.5342 0.455322 
10.9638V19.7976C0.455322 20.2272 0.802368 20.5742 1.23193 20.5742H15.8248C16.0481 20.5742 16.2665 20.5306 16.4679 
20.4432C17.6231 19.9505 18.3682 18.822 18.3682 17.5698C18.3682 17.264 18.3245 16.963 18.2372 16.6718C18.6449 16.133 
18.8706 15.4729 18.8706 14.7861C18.8706 14.4803 18.8269 14.1794 18.7395 13.8882C19.1472 13.3494 19.3729 12.6893 19.3729 
12.0025C19.3681 11.6967 19.3244 11.3933 19.237 11.1021ZM2.20268 18.8269V11.9345H4.16847V18.8269H2.20268ZM17.6474 
10.26L17.1159 10.7211L17.4533 11.3375C17.5644 11.5406 17.622 11.7686 17.6207 12C17.6207 12.4005 17.446 12.7815 
17.1451 13.0436L16.6136 13.5047L16.9509 14.1211C17.062 14.3242 17.1197 14.5522 17.1184 14.7837C17.1184 15.1841 
16.9436 15.5651 16.6427 15.8272L16.1112 16.2884L16.4485 16.9048C16.5597 17.1078 16.6173 17.3358 16.616 17.5673C16.616 
18.1109 16.2956 18.6012 15.8006 18.8245H5.72168V11.8569L8.13643 3.10791C8.1987 2.88367 8.33236 2.68583 8.51717 
2.54438C8.70198 2.40293 8.92786 2.32557 9.16058 2.32402C9.34502 2.32402 9.52704 2.37742 9.67265 2.48663C9.91292 2.66622 
10.0415 2.93803 10.027 3.22683L9.794 8.04178H17.4241C17.8561 8.30631 18.1231 8.75286 18.1231 9.2164C18.1231 9.61683 
17.9484 9.99543 17.6474 10.26Z" fill="white" /></svg>`;

const renderProductsList = (data, clear) => {

  const wrap = document.getElementById('productsListWrap');

  if (!data || !data.length) {
    wrap.innerHTML =
      '<div class="col-12 no-filters-selected">По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col-12', 'col-sm-6', 'col-lg-4');

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
          ? `<div class="row"><div class="col-6">${
              prop.name
            }: </div><div class="col-6">${item[prop.key]}${
              prop.units
            }</div></div>`
          : ''
      }`;
      return res;
    }, '');

    card.innerHTML = `
      <a class="bc-card" href="/prices?product=${
        item._id
      }">
        ${item.hasCooperation ? `<div class="bc-card__like">${thumbUp}</div>` : ''}
        <div class="bc-card__image-wrap">
          <img class="bc-card__image" src="${item.image ||
            '/images/no-img.png'}" alt="">
        </div>
        <div class="bc-card__title">${item.name}</div>
        ${
          item.brand
            ? '<div class="bc-card__brand">' +
              item.brand +
              '</div>'
            : ''
        }
        <p class="bc-card__params">
          ${propsLayout}
        </p>
      <a>
    `;

    // ${
    //   item.minPrice
    //     ? '<p class="card-text product-card__price">' +
    //       'Цена от ' +
    //       item.minPrice +
    //       'руб.' +
    //       '</p>'
    //     : ''
    // }
    // ${
    //   item.categoryName
    //     ? '<p class="card-text"><small class="text-muted">' +
    //       item.categoryName +
    //       '</small></p>'
    //     : ''
    // }

    if (clear) wrap.innerHTML = '';
    fragment.appendChild(card);
  });

  wrap.appendChild(fragment);
};

export default renderProductsList;
