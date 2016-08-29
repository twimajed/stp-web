/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    var _tmpl = Handlebars.compile($('.cm002_product_table').html());
    EL.get('api/mock/cm002')
      .then(function (json) {
        console.log(json);
        $('.cm002_product_data').html(_tmpl(json));
      });
  }
  return init;

});
