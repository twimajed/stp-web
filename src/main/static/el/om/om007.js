/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};
  function collapse(){
      //收缩按钮
      $('#om007-collapse-btn').off('click').on('click', function () {
        $(this).find('i').toggleClass("fa-plus");
        $(this).find('i').toggleClass("fa-minus");
        $(this).parent().find('.search-toggle-content').toggle();
      });
  }
  function view(viewId) {
    EL.view('om007', 'listView');//页面切换
    EL.dtp('.om007  .listView .el-dtp');//日期控件
      collapse();
      EL.table(new _req('listView', argsListview, renderListView));
      return listenClick();
  }


  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om007_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om007 .om007-table-' + moduleId;
    this.trigger = '.om007 .om007-' + moduleId + '-search';
    this.pagingSelector = '.om007 .om007-paging-' + moduleId;
    this.immediately = true
  }

  //渲染模板
  function renderListView(resultsData) {
    $('.om007 .panel .om007_listView').html(_tmpls['listView'](resultsData));
  }
  //请求参数
  function argsListview() {
    var condition = {};
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om007ProDemd'),
      EL.get('api/mock/om007PackDemd'),
      EL.get('api/mock/om007TransDemd'),
      EL.get('api/mock/om007_printView'),
      EL.get('api/mock/om007_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om007_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om007_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om007_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om007_product').html(_tmpls['printView'](printData[0]));
      $('.om007_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function backTableList() {
    $('.om007 >.printView >.panel>.panel-heading> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
  }
  function detailView(soNo){
        EL.view('om007','printView');//页面切换
        EL.dtp('.om007  .printView .el-dtp');//日期控件
        backTableList();
        loadDblData();
         $('.om007 .tablelist .om007_product').on('click',function (e) {
                   var dlg = $('#om007-link-prodview-modal');
                   dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                   dlg.find('.modal-body').html($('#om007-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                });
                $('.om007 .tablelist .om007_products').on('click',function (e) {
                    var dlg = $('#om007-link-suitview-modal');
                    dlg.find('.modal-body').html($('#om007-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                 });
    }
  function listenClick() {
   $('.om007 .panel .om007_listView').on('click',function (e) {
              var $clicked = $(e.target);
              var param = $clicked.data('param');
              detailView(param);
            });
    $('.om007 > .listView  .navbarbtn > .form-group> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
  }

  function init() {
    $('.om007> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
