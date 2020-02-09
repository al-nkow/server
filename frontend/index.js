import Products from './js/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

const currentUrl = window.location.href;

if (currentUrl.indexOf('/products') !== -1) Products();
