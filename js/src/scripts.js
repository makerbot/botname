!(function(window, document) {
  // some jquery-esque functions
  function $1(selector, context) {
    return (context || document).querySelector(selector);
  }
  function css(el, styles) {
    for (var property in styles)
      el.style[property] = styles[property];
  }
  
  

})(window, document);
