import RentForm from './rentForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../styles/style.scss';
import Siema from 'siema';

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


document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var inpValue = document.getElementById('searchInp').value;
  if (inpValue) {
      var searchVal = inpValue.replace(/[^\s0-9а-яА-Яa-zA-Z]/gi, '')
      window.location.href = '/products?search=' + searchVal;
  }
});

showMoreCategories.addEventListener('click', function() {
  categoriesBlock.classList.add('all-visible');
  this.style.display = 'none';
});

initSiema();