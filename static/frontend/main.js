!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=()=>{};var a={getUrlParamsAsObject:function(){const e={};return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,(t,n,r)=>{e[n]=r}),e},createUrlParamsString:function(e){let t="";for(let n in e)t=t?t+"&":t+"?",t+=n+"="+e[n];return t}};var c=e=>{const t=document.getElementById("productsListWrap");if(!e||!e.searchResult||!e.searchResult.length)return void(t.innerHTML="По Вашему запросу ничего не найдено, попробуйте изменить параметры поиска и повторить попытку");const n=document.createDocumentFragment();e.searchResult.forEach(e=>{const r=document.createElement("div");r.classList.add("col-4");const a=[{name:"Ширина",key:"width",units:"мм"},{name:"Высота",key:"height",units:"мм"},{name:"Толщина",key:"thickness",units:"мм"},{name:"Объём",key:"volumeL",units:"л"},{name:"Объём",key:"volumeM",units:"м.куб"},{name:"Вес",key:"weight",units:"кг"},{name:"Площадь",key:"area",units:"м.кв"}].reduce((t,n)=>t+=`${e[n.key]?`<div class="col-6">${n.name}: </div><div class="col-6">${e[n.key]}${n.units}</div>`:""}`,"");r.innerHTML=`\n      <a class="product-card card mb-3" href="/prices?product=${e._id}">\n        <img class="card-img-top" src="${e.image||"images/noimg.png"}" alt="">\n        <div class="card-body">\n          <h5 class="card-title">${e.name}</h5>\n          <h6 class="card-subtitle mb-2 text-muted">\n            ${e.brand}\n          </h6>\n          <p class="card-text">\n            <div class="row">\n              ${a}\n            </div>\n          </p>\n          ${e.categoryName?'<p class="card-text"><small class="text-muted">'+e.categoryName+"</small></p>":""}\n        </div>\n      <a>\n    `,t.innerHTML="",n.appendChild(r)}),t.appendChild(n)};var o=()=>{const e=document.getElementById("searchBtn"),t=document.getElementById("searchInp");e.addEventListener("click",(function(){const e=window.location.href.split("?")[0],n=a.getUrlParamsAsObject();n.search=t.value;const r=e+a.createUrlParamsString(n);history.pushState&&window.history.pushState({path:r},"",r),function(e){const t=new Headers,n={method:"POST",body:JSON.stringify({search:e}),headers:t};t.append("Content-Type","application/json"),fetch("/api/products/search",n).then(e=>e.json()).then((function(e){c(e)})).catch((function(e){console.log("ERROR >>>>>>",e)}))}(t.value)})),function(){const e=a.getUrlParamsAsObject().search;e&&(t.value=decodeURIComponent(e))}()};n(0),n(1);-1!==window.location.href.indexOf("/products")&&o(),r()}]);