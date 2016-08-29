/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    var _tmpl = Handlebars.compile($('.cm003_product_table').html());
    EL.get('api/mock/cm003')
      .then(function (json) {
        $('.product_data').html(_tmpl(json.a));

      });
  }
  return init;

});
