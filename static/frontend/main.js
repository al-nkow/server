!(function(e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return (
      e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
    );
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, o) {
      n.o(e, t) ||
        Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: 'Module',
        }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule)
        return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', {
          enumerable: !0,
          value: e,
        }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function(t) {
              return e[t];
            }.bind(null, r),
          );
      return o;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 2));
})([
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {
    'use strict';
    n.r(t);
    var o = {
      getUrlParamsAsObject: function() {
        const e = {};
        return (
          window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            (t, n, o) => {
              e[n] = o;
            },
          ),
          e
        );
      },
      createUrlParamsString: function(e) {
        let t = '';
        for (let n in e)
          (t = t ? t + '&' : t + '?'), e[n] && (t += n + '=' + e[n]);
        return t;
      },
    };
    var r = (e, t) => {
      const n = document.getElementById('productsListWrap');
      if (!e || !e.length)
        return void (n.innerHTML =
          'По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку');
      const o = document.createDocumentFragment();
      e.forEach(e => {
        const r = document.createElement('div');
        r.classList.add('col-12', 'col-md-6', 'col-lg-4');
        const c = [
          { name: 'Ширина', key: 'width', units: 'мм' },
          { name: 'Высота', key: 'height', units: 'мм' },
          { name: 'Толщина', key: 'thickness', units: 'мм' },
          { name: 'Объём', key: 'volumeL', units: 'л' },
          { name: 'Объём', key: 'volumeM', units: 'м.куб' },
          { name: 'Вес', key: 'weight', units: 'кг' },
          { name: 'Площадь', key: 'area', units: 'м.кв' },
        ].reduce(
          (t, n) =>
            (t += `${
              e[n.key]
                ? `<div class="col-6">${
                    n.name
                  }: </div><div class="col-6">${e[n.key]}${
                    n.units
                  }</div>`
                : ''
            }`),
          '',
        );
        (r.innerHTML = `\n      <a class="product-card card mb-3" href="/prices?product=${
          e._id
        }">\n        <img class="card-img-top" src="${e.image ||
          'images/noimg.png'}" alt="">\n        <div class="card-body">\n          <h5 class="card-title">${
          e.name
        }</h5>\n          ${
          e.brand
            ? '<h6 class="card-subtitle mb-2 text-muted">' +
              e.brand +
              '</h6>'
            : ''
        }\n          <p class="card-text">\n            <div class="row">\n              ${c}\n            </div>\n          </p>\n          ${
          e.minPrice
            ? '<p class="card-text product-card__price">Цена от ' +
              e.minPrice +
              'руб.</p>'
            : ''
        }\n          ${
          e.categoryName
            ? '<p class="card-text"><small class="text-muted">' +
              e.categoryName +
              '</small></p>'
            : ''
        }\n        </div>\n      <a>\n    `),
          t && (n.innerHTML = ''),
          o.appendChild(r);
      }),
        n.appendChild(o);
    };
    var c = () => {
      const e = document.getElementById('searchForm'),
        t = document.getElementById('searchInp'),
        n = document.getElementById('categorySelect'),
        c = document.getElementById('brandSelect'),
        a = window.location.href.split('?')[0],
        i = document.getElementById('productsFiltersBlock'),
        s = document.getElementById('filtersAmount');
      let d,
        l = [],
        u = [];
      function m() {
        const e = o.getUrlParamsAsObject();
        (s.innerHTML = Object.keys(e).length),
          e.search && (e.search = decodeURIComponent(e.search)),
          e.brand && (e.brand = decodeURIComponent(e.brand));
        const t = new Headers(),
          n = { method: 'POST', body: JSON.stringify(e), headers: t };
        t.append('Content-Type', 'application/json'),
          fetch('/api/products/search', n)
            .then(e => e.json())
            .then(function(e) {
              const t = e && e.searchResult ? e.searchResult : null;
              (l = t), g(!0);
            })
            .catch(function(e) {
              console.log('SEARCH ERROR:', e);
            });
      }
      function g(e) {
        ((l && l.length) || e) &&
          ((u = l && l.length ? l.splice(0, 9) : []), r(u, e));
      }
      function f(e, t) {
        const n = o.getUrlParamsAsObject();
        n[e] = t;
        const r = o.createUrlParamsString(n),
          c = a + r;
        history.pushState &&
          window.history.pushState({ path: c }, '', c);
      }
      var p;
      n.addEventListener('change', function(e) {
        f('category', e.target.value), m();
      }),
        c.addEventListener('change', function(e) {
          f('brand', e.target.value), m();
        }),
        e.addEventListener('submit', function(e) {
          e.preventDefault(), f('search', t.value), m();
        }),
        (function() {
          const e = o.getUrlParamsAsObject(),
            r = e.search,
            a = e.category,
            i = e.brand;
          r && (t.value = decodeURIComponent(r)),
            i && (c.value = decodeURIComponent(i)),
            a && (n.value = a);
        })(),
        [
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
        ].forEach(e => {
          document
            .getElementById(e)
            .addEventListener('input', function(t) {
              const { value: n } = t.target,
                o = n.replace(/[^+\d]/g, '');
              (t.target.value = o),
                f(e, o),
                clearTimeout(d),
                (d = setTimeout(function() {
                  m();
                }, 500));
            });
        }),
        (p = g),
        window.addEventListener('scroll', function() {
          const e = window.innerHeight,
            t = window.pageYOffset,
            n = document.getElementById('siteHeader'),
            o = document.getElementById('productsSearchBlock'),
            r = document.getElementById('productsListBlock');
          n.offsetHeight + o.offsetHeight + r.offsetHeight - (t + e) <
            50 && p();
        }),
        m(),
        [
          'productsFiltersToggle',
          'productsFiltersToggleHead',
        ].forEach(e => {
          document.getElementById(e).addEventListener('click', () => {
            i.classList.toggle('active');
          });
        });
    };
    n(0), n(1);
    -1 !== window.location.href.indexOf('/products') && c();
  },
]);
