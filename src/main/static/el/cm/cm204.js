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
    defaultDate: '2016-07-19',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: void 0
  };

  return function init() {

    EL.dtp('.cm204 .dtp');

      //产能数据模板编译、数据加载
      var capacity_tmpl = Handlebars.compile($('#capacity_table').html());
      EL.get('api/mock/cm204capacity')
        .then(function (json) {
          $('.capacity_data').html(capacity_tmpl(json));
        });


    //印刷订单模板编译、数据加载
    var print_tmpl = Handlebars.compile($('#print_table').html());
    EL.get('api/mock/cm204print')
      .then(function (json) {
        $('.print_data').html(print_tmpl(json));
      });

    //工艺价格模板编译、数据加载
    var price_tmpl = Handlebars.compile($('#price_table').html());
    EL.get('api/mock/cm204price')
      .then(function (json) {
        $('.price_data').html(price_tmpl(json));
      });
  };
});
