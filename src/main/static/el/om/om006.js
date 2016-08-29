/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  function view(viewId) {
    EL.view('om006', 'listView');//页面切换
    EL.dtp('.om006  .listView .el-dtp');//日期控件
      EL.table(new _req('listView', argsListview, renderListView));
      return listenClick();
  }

  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om006_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om006 .om006-table-' + moduleId;
    this.trigger = '.om006 .om006-' + moduleId + '-search';
    this.pagingSelector = '.om006 .om006-paging-' + moduleId;
    this.immediately = true
  }

  //渲染模板
  function renderListView(resultsData) {
    $('.om006 .panel .om006_listView').html(_tmpls['listView'](resultsData));
  }

  //请求参数
  function argsListview() {
    var condition = {};
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om006ProDemd'),
      EL.get('api/mock/om006PackDemd'),
      EL.get('api/mock/om006TransDemd'),
      EL.get('api/mock/om006_printView'),
      EL.get('api/mock/om006_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om006_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om006_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om006_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om006_product').html(_tmpls['printView'](printData[0]));
      $('.om006_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function backTableList() {
    $('.om006 >.printView >.panel>.panel-heading> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
  }
  function detailView(soNo){
        EL.view('om006','printView');//页面切换
        EL.dtp('.om006  .printView .el-dtp');//日期控件
        backTableList();
        loadDblData();
         $('.om006 .tablelist .om006_product').on('click',function (e) {
                   var dlg = $('#om006-link-prodview-modal');
                   dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                   dlg.find('.modal-body').html($('#om006-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                });
                $('.om006 .tablelist .om006_products').on('click',function (e) {
                    var dlg = $('#om006-link-suitview-modal');
                    dlg.find('.modal-body').html($('#om006-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                 });
    }
  function listenClick() {
   $('.om006 .panel .om006_listView').on('click',function (e) {
            var $clicked = $(e.target);
            var param = $clicked.data('param');
            detailView(param);
          });
    $('.om006 > .listView  .navbarbtn > .form-group> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
    $('.om006 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.om006 .search-toggle-content').toggle();
    });
  }

  function init() {
    $('.om006> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
