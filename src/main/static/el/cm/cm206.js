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

    EL.get('api/mock/ui001')
      .then(function (calEvents) {
        console.log(calEvents);
        _calOpts.events = calEvents;
        $('.cm>.calendar').fullCalendar(_calOpts);
      });

    var productDetail_tmpl = Handlebars.compile($('#productDetail_table').html());
    EL.get('api/mock/cm206productDetail')
      .then(function (json) {
        $('.productDetail_data').html(productDetail_tmpl(json));
      });

      var produceData_tmpl = Handlebars.compile($('#produceData_table').html());
      EL.get('api/mock/cm206produceData')
        .then(function (json) {
          $('.produceData_data').html(produceData_tmpl(json));
        });

      var  _myModal_cm206_refuse = Handlebars.compile($('.myModal_cm206_refuse').html());
      $('#cm206_refuse').click(function () {
            $('.modal-title').text("拒绝接单"); //modal title
            $('.modal-body').html(_myModal_cm206_refuse());//modal content
            $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').text("提交").show(); //modal ok
            $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').text("取消"); //modal cancel
            $('.el-msg').modal('show');
      });

      var  _myModal_cm206_info = Handlebars.compile($('.myModal_cm206_info').html());
      $('#cm206_query').click(function () {
            $('.modal-title').text("产品信息"); //modal title
            $('.modal-body').html(_myModal_cm206_info());//modal content
            $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').hide(); //modal cancel
            $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').text("关闭"); //modal cancel
            $('.el-msg').modal('show');
      });

  };

});
