import Products from './js/products';
import CoopForm from './js/coopForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles/style.scss';

const currentUrl = window.location.href;

if (currentUrl.indexOf('/products') !== -1) Products();
if (currentUrl.indexOf('/prices') !== -1) CoopForm();