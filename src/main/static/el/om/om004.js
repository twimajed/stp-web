/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  function view(viewId) {
    EL.view('om004', 'listView');//页面切换
    EL.dtp('.om004  .listView .el-dtp');//日期控件
    EL.table(new _req('listView', argsListview, renderListView));
    return listenClick();
  }

  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om004_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om004 .om004-table-' + moduleId;
    this.trigger = '.om004 .om004-' + moduleId + '-search';
    this.pagingSelector = '.om004 .om004-paging-' + moduleId;
    this.immediately = true
  }

  //渲染模板
  function renderListView(resultsData) {
    $('.om004 .panel .om004_listView').html(_tmpls['listView'](resultsData));
  }
  //请求参数
  function argsListview() {
    var condition = {};
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om004ProDemd'),
      EL.get('api/mock/om004PackDemd'),
      EL.get('api/mock/om004TransDemd'),
      EL.get('api/mock/om004_printView'),
      EL.get('api/mock/om004_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om004_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om004_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om004_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om004_product').html(_tmpls['printView'](printData[0]));
      $('.om004_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function backTableList() {
    $('.om004 >.printView >.panel>.panel-heading> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
  }
  function detailView(soNo){
        EL.view('om004','printView');//页面切换
        EL.dtp('.om004  .printView .el-dtp');//日期控件
        backTableList();
        loadDblData();
         $('.om004 .tablelist .om004_product').on('click',function (e) {
                   var dlg = $('#om004-link-prodview-modal');
                   dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                   dlg.find('.modal-body').html($('#om004-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                });
                $('.om004 .tablelist .om004_products').on('click',function (e) {
                    var dlg = $('#om004-link-suitview-modal');
                    dlg.find('.modal-body').html($('#om004-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                 });
    }

  function listenClick() {
   $('.om004 .panel .om004_listView').on('click',function (e) {
          var $clicked = $(e.target);
          var param = $clicked.data('param');
          detailView(param);
        });
    $('.om004 > .listView  .navbarbtn > .form-group> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
    $('.om004 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.om004 .search-toggle-content').toggle();
    });
  }

  function init() {
    $('.om004> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
