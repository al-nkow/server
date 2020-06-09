import RentForm from './rentForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../styles/style.scss';

RentForm();

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var inpValue = document.getElementById('searchInp').value;
  if (inpValue) {
      var searchVal = inpValue.replace(/[^\s0-9а-яА-Яa-zA-Z]/gi, '')
      window.location.href = '/products?search=' + searchVal;
  }
});