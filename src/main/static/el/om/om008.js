/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  var _tmpls = {};

  function view(viewId) {
    EL.view('om008', 'listView');//页面切换
    EL.dtp('.om008  .listView .el-dtp');//日期控件
      EL.table(new _req('listView', argsListview, renderListView));
      return listenClick();
  }

  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om008_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om008 .om008-table-' + moduleId;
    this.trigger = '.om008 .om008-' + moduleId + '-search';
    this.pagingSelector = '.om008 .om008-paging-' + moduleId;
    this.immediately = true
  }

  //渲染模板
  function renderListView(resultsData) {
    $('.om008 .panel .om008_listView').html(_tmpls['listView'](resultsData));
  }

  //请求参数
  function argsListview() {
    var condition = {};
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om008ProDemd'),
      EL.get('api/mock/om008PackDemd'),
      EL.get('api/mock/om008TransDemd'),
      EL.get('api/mock/om008_printView'),
      EL.get('api/mock/om008_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om008_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om008_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om008_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om008_product').html(_tmpls['printView'](printData[0]));
      $('.om008_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function backTableList() {
    $('.om008 >.printView >.panel>.panel-heading> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
  }

  function detailView(soNo){
          EL.view('om008','printView');//页面切换
          EL.dtp('.om008  .printView .el-dtp');//日期控件
          backTableList();
          loadDblData();
           $('.om008 .tablelist .om008_product').on('click',function (e) {
                     var dlg = $('#om008-link-prodview-modal');
                     dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                     dlg.find('.modal-body').html($('#om008-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                  });
                  $('.om008 .tablelist .om008_products').on('click',function (e) {
                      var dlg = $('#om008-link-suitview-modal');
                      dlg.find('.modal-body').html($('#om008-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                   });
      }
    function listenClick() {
     $('.om008 .panel .om008_listView').on('click',function (e) {
                var $clicked = $(e.target);
                var param = $clicked.data('param');
                detailView(param);
              });
    $('.om008 > .listView  .navbarbtn > .form-group> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
    $('.om008 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.om008 .search-toggle-content').toggle();
    });
  }

  function init() {
    $('.om008> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
