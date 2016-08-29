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
    EL.view('om009', 'listView');//页面切换
    EL.dtp('.om009  .listView .el-dtp');//日期控件
      EL.table(new _req('listView', argsListview, renderListView));
      return listenClick();
  }

  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om009_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om009 .om009-table-' + moduleId;
    this.trigger = '.om009 .om009-' + moduleId + '-search';
    this.pagingSelector = '.om009 .om009-paging-' + moduleId;
    this.immediately = true
  }

  //渲染模板
  function renderListView(resultsData) {
    $('.om009 .panel .om009_listView').html(_tmpls['listView'](resultsData));
  }

  //请求参数
  function argsListview() {
    var condition = {};
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om009ProDemd'),
      EL.get('api/mock/om009PackDemd'),
      EL.get('api/mock/om009TransDemd'),
      EL.get('api/mock/om009_printView'),
      EL.get('api/mock/om009_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om009_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om009_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om009_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om009_product').html(_tmpls['printView'](printData[0]));
      $('.om009_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function backTableList() {
    $('.om009 >.printView >.panel>.panel-heading> .btn').off('click').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      if (dataviewvalue === 'listView') {
        view(dataviewvalue);
      } else if (dataviewvalue === 'paperConfView') {
        paperconfData();
        var dlg = $('.el-msg');
        dlg.find('.modal-content').css("width", "900px")
        dlg.find('.modal-title').text('纸张确认');
        dlg.find('.modal-body').html($('#paperConf').html());
        dlg.find('.modal-footer .ok').text('确认');
        dlg.find('.modal-footer .cancel').text('取消');

        dlg.modal();
      }
    });
  }


  function detailView(soNo){
            EL.view('om009','printView');//页面切换
            EL.dtp('.om009  .printView .el-dtp');//日期控件
            backTableList();
            loadDblData();
             $('.om009 .tablelist .om009_product').on('click',function (e) {
                       var dlg = $('#om009-link-prodview-modal');
                       dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                       dlg.find('.modal-body').html($('#om009-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                    });
                    $('.om009 .tablelist .om009_products').on('click',function (e) {
                        var dlg = $('#om009-link-suitview-modal');
                        dlg.find('.modal-body').html($('#om009-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
                     });
        }
   function listenClick() {
       $('.om009 .panel .om009_listView').off('click').on('click',function (e) {
                  var $clicked = $(e.target);
                  var param = $clicked.data('param');
                  detailView(param);
                });
    $('.om009 > .listView  .navbarbtn > .form-group> .btn').off('click').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      view(dataviewvalue);
    });
    $('.om009 .search-toggle-btn').off('click').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.om009 .search-toggle-content').toggle();
    });
  }

  function paperconfData() {
    var _tmpl = Handlebars.compile($('.om009_paperConfData').html());
    EL.get('api/mock/om009_paperConf')
      .then(function (json) {
        $('.om009_paperConf').html(_tmpl(json));
      });
  }

  function init() {
    $('.om009> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
