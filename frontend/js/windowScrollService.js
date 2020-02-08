/**
 * Watch window scroll and perform callback when almost bottom
 * @param {function} callback
 */

export default callback => {
  window.addEventListener('scroll', function() {
    const browserWinHeight = window.innerHeight;
    const windowScrollValue = window.pageYOffset;
    const siteHeader = document.getElementById('siteHeader');
    const productsSearchBlock = document.getElementById(
      'productsSearchBlock',
    );
    const productsListBlock = document.getElementById(
      'productsListBlock',
    );
    const pageHeight =
      siteHeader.offsetHeight +
      productsSearchBlock.offsetHeight +
      productsListBlock.offsetHeight;
    const fullScroll = windowScrollValue + browserWinHeight;

    if (pageHeight - fullScroll < 50) {
      callback();
    }
  });
};
