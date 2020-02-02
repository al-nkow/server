const urlService = () => {
  /**
   * Get full url and return object of urlParams as { key: value }
   * @returns {object}}
   */
  function getUrlParamsAsObject() {
    const vars = {};
    window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      (m, key, value) => {
        vars[key] = value;
      },
    );
    return vars;
  }

  /**
   * Get params as object and return string (?param1=a?param2=b...)
   * @param {object} objectParams
   * @returns {string}
   */
  function createUrlParamsString(objectParams) {
    let queryString = '';
    for (let key in objectParams) {
      queryString = queryString
        ? queryString + '&'
        : queryString + '?';
      queryString += key + '=' + objectParams[key];
    }
    return queryString;
  }

  return {
    getUrlParamsAsObject,
    createUrlParamsString,
  };
};

export default urlService();
