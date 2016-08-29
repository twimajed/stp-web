/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _calOpts = {
    lang: 'zh-cn',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: '' // 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2016-06-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: void 0
  };

  return function init() {

    var product_tmpl = Handlebars.compile($('.cm007_product_table').html());
    EL.get('api/mock/cm007_detail')
      .then(function (json) {
        $('.cm007_product_data').html(product_tmpl(json));
      });

    var order_tmpl = Handlebars.compile($('.cm007_order_table').html());
    EL.get('api/mock/cm007_order')
      .then(function (json) {
        EL.log(json);
        $('.cm007_order_data').html(order_tmpl(json));
      });

    var progress_tmpl = Handlebars.compile($('.cm007_progress_table').html());
    EL.get('api/mock/cm007_progress')
      .then(function (json) {
        EL.log(json);
        $('.cm007_progress_data').html(progress_tmpl(json));
      });

    //产能需求
    var cm007_capacity_tmpl = Handlebars.compile($('.cm007_capacity_data').html());
    EL.get('api/mock/cm010_capacity')
      .then(function (json) {
        $('.cm007_capacity_table').html(cm007_capacity_tmpl(json));
      });
    //完成列表
    var cm007_finish_tmpl = Handlebars.compile($('.cm007_finish_data').html());
    EL.get('api/mock/cm010_capacity')
      .then(function (json) {
        $('.cm007_finish_table').html(cm007_finish_tmpl(json));
      });
  };
});
