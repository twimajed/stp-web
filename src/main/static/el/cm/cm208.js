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

//common data start 产品明细
var commonProductDetail_tmpl = Handlebars.compile($('#commonProductDetail_table').html());
EL.get('api/mock/cm208')
  .then(function (json) {
    $('.commonProductDetail_data').html(commonProductDetail_tmpl(json));
  });
  //产能需求
  var commonProductRequire_tmpl = Handlebars.compile($('#commonProductRequire_table').html());
  EL.get('api/mock/cm208ProductRequire')
    .then(function (json) {
      $('.commonProductRequire_data').html(commonProductRequire_tmpl(json));
    });
//common data end



//fileCheck start
    var fileCheck_tmpl = Handlebars.compile($('#fileCheck_table').html());
    EL.get('api/mock/cm208fileCheck')
      .then(function (json) {
        $('.fileCheck_data').html(fileCheck_tmpl(json));
      });

      var fileProductRequire_tmpl = Handlebars.compile($('#fileProductRequire_table').html());
      EL.get('api/mock/cm208ProductRequire')
        .then(function (json) {
          $('.fileProductRequire_data').html(fileProductRequire_tmpl(json));
        });

        var  _myModal_file_query = Handlebars.compile($('.myModal_file_query').html());
        $('#cm208_fileQuery').click(function () {
              $('.modal-title').text("产品信息"); //modal title
              $('.modal-body').html(_myModal_file_query());//modal content
              $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').hide(); //modal cancel
              $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').text("关闭"); //modal cancel
              $('.el-msg').modal('show');
        });
// fileCheck end

//pageCheck start
var pageCheck_tmpl = Handlebars.compile($('#pageCheck_table').html());
EL.get('api/mock/cm208pageCheck')
  .then(function (json) {
    $('.pageCheck_data').html(pageCheck_tmpl(json));
  });

  var  _myModal_page_query = Handlebars.compile($('.myModal_page_query').html());
  $('#cm208_pageQuery').click(function () {
        $('.modal-title').text("产品信息"); //modal title
        $('.modal-body').html(_myModal_page_query());//modal content
        $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').hide(); //modal cancel
        $('.el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').text("关闭"); //modal cancel
        $('.el-msg').modal('show');
  });

//pageCheck end

//product start
var product_tmpl = Handlebars.compile($('#product_table').html());
EL.get('api/mock/cm208product')
  .then(function (json) {
    $('.product_data').html(product_tmpl(json));
  });

  var productSave_tmpl = Handlebars.compile($('#productSave_table').html());
  EL.get('api/mock/cm208fileCheck')
    .then(function (json) {
      $('.productSave_data').html(productSave_tmpl(json));
    });
//product  end

//record start
var record_tmpl = Handlebars.compile($('#record_table').html());
EL.get('api/mock/cm208record')
  .then(function (json) {
    $('.record_data').html(record_tmpl(json));
  });

  var recordSave_tmpl = Handlebars.compile($('#recordSave_table').html());
  EL.get('api/mock/cm208fileCheck')
    .then(function (json) {
      $('.recordSave_data').html(recordSave_tmpl(json));
    });
//record end

//finish start
var finish_tmpl = Handlebars.compile($('#finish_table').html());
EL.get('api/mock/cm208finish')
  .then(function (json) {
    $('.finish_data').html(finish_tmpl(json));
  });

  var finishSave_tmpl = Handlebars.compile($('#finishSave_table').html());
  EL.get('api/mock/cm208finish')
    .then(function (json) {
      $('.finishSave_data').html(finishSave_tmpl(json));
    });
//finish end


  };

});
