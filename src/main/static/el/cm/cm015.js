/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    // var _tmpl = Handlebars.compile($('.cm015_order_table').html());
    // EL.get('api/mock/cm015')
    //   .then(function (json) {
    //     $('.cm015_order_data').html(_tmpl(json));
    //   });

    //产品明细
    var detail_tmpl = Handlebars.compile($('.cm015_detail_data').html());
    EL.get('api/mock/cm010_detail')
      .then(function (json) {
        $('.cm015_detail_table').html(detail_tmpl(json));
      });

    //产能需求
    var capacity_tmpl = Handlebars.compile($('.cm015_capacity_data').html());
    EL.get('api/mock/cm010_capacity')
      .then(function (json) {
        $('.cm015_capacity_table').html(capacity_tmpl(json));
      });

    var fact_tmpl = Handlebars.compile($('.cm015_fact_data').html());
    EL.get('api/mock/cm010_info')
      .then(function (json) {
        $('.cm015_fact_table').html(fact_tmpl(json));
      });

    var select_tmpl = Handlebars.compile($('.cm015_select_data').html());
    EL.get('api/mock/cm010_info')
      .then(function (json) {
        $('.cm015_select_table').html(select_tmpl(json));
      });

  }

  return init;

});
