/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    var _tmpl = Handlebars.compile($('.cm006_order_table').html());
    EL.get('api/mock/cm006')
      .then(function (json) {
        $('.cm006_order_data').html(_tmpl(json));
      });
  }
  return init;

});
