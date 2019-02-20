export default (parameter, defaultvalue) => {
  let urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
};
