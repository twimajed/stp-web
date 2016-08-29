/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  //Date range picker
  $('#reservation').daterangepicker();

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

    var cm005_cap_tmpl = Handlebars.compile($('.cm005_cadata').html());
    EL.get('api/mock/cm005_capacity')
      .then(function (json) {
        $('.cm005_catable').html(cm005_cap_tmpl(json));
      });

    var print_tmpl = Handlebars.compile($('#print_table').html());
    EL.get('api/mock/cm005print')
      .then(function (json) {
        $('.print_data').html(print_tmpl(json));
      });

    var route_tmpl = Handlebars.compile($('#route_table').html());
    EL.get('api/mock/cm005route')
      .then(function (json) {
        $('.route_data').html(route_tmpl(json));
      });

    //产能需求
    var cm005_capacity_tmpl = Handlebars.compile($('.cm005_capacity_data').html());
    EL.get('api/mock/cm010_capacity')
      .then(function (json) {
        $('.cm005_capacity_table').html(cm005_capacity_tmpl(json));
      });
  };
});
