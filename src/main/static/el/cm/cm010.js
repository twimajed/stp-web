/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    // var _tmpl = Handlebars.compile($('.cm010_order_table').html());
    // EL.get('api/mock/cm010')
    //   .then(function (json) {
    //     $('.cm010_order_data').html(_tmpl(json));
    //   });

    //产品明细
    var detail_tmpl = Handlebars.compile($('.cm010_detail_data').html());
    EL.get('api/mock/cm010_detail')
      .then(function (json) {
        $('.cm010_detail_table').html(detail_tmpl(json));
      });

    //产能需求
    var capacity_tmpl = Handlebars.compile($('.cm010_capacity_data').html());
    EL.get('api/mock/cm010_capacity')
      .then(function (json) {
        $('.cm010_capacity_table').html(capacity_tmpl(json));
      });

    var info_tmpl = Handlebars.compile($('.cm010_info_data').html());
    EL.get('api/mock/cm010_info')
      .then(function (json) {
        $('.cm010_info_table').html(info_tmpl(json));
      });

  }

  return init;

});
