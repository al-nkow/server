import RentForm from './rentForm';
import smoothscroll from 'smoothscroll-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../styles/style.scss';
import Siema from 'siema';

smoothscroll.polyfill();

const categoriesBlock = document.getElementById('categoriesBlock');
const showMoreCategories = document.getElementById('showMoreCategories');

RentForm();

function initSiema() {
  const mainSiema = new Siema({
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
  });
  
  const prev = document.querySelector('.siema-prev');
  const next = document.querySelector('.siema-next');
  
  prev.addEventListener('click', () => mainSiema.prev());
  next.addEventListener('click', () => mainSiema.next());
}

function initScrollTo() {
  const scrolls = document.getElementsByClassName('scroll-to');

  [...scrolls].forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset ? item.dataset.target : null;
      const targetEl = document.getElementsByClassName(target)[0];
      const viewportOffset = targetEl.getBoundingClientRect();
      const top = viewportOffset.top + window.pageYOffset;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var inpValue = document.getElementById('searchInp').value;
  if (inpValue) {
      var searchVal = inpValue.replace(/[^\s0-9а-яА-Яa-zA-Z]/gi, '')
      window.location.href = '/products?search=' + searchVal;
  }
});

if (showMoreCategories) {
  showMoreCategories.addEventListener('click', function() {
    categoriesBlock.classList.add('all-visible');
    this.style.display = 'none';
  });
}

document.getElementById('currentYear').innerHTML = new Date().getFullYear();

document.getElementsByClassName('bc-slide-link')[0].addEventListener('click', function(e) {
  e.stopPropagation();
});

initSiema();
initScrollTo();