export let debounce = function (func, wait) {
  var timeout = null;
  return function (...args) {
    var later = () => {
      timeout = null;
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
