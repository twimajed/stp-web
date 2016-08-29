/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};
  function view(viewId) {
    EL.view('om002',viewId);//页面切换
    EL.dtp('.om002  .' + viewId + ' .el-dtp');//日期控件
    if (viewId === 'listView') {
      EL.table(new _req('listView', argsListview, renderListView));
      return listenClick();
    }/*else if (viewId === 'printView') {
      backTableList();
      loadDblData();
    }*/else if (viewId === 'transView') {
      EL.table(new _req('transView', argsListview, renderTransView));
      return listenClick2();
    }
  }
  /*
   * 请求数据
   * @param moduleId 模块名称 listView/printView/transView
   */
  function _req(moduleId, argsBuilder, callback) {
    this.url = 'api/mock/om002_' + moduleId;
    this.argsBuilder = argsBuilder;
    this.callback = callback;
    this.selector = '.om002 .om002-table-' + moduleId;
    this.trigger = '.om002 .om002-' + moduleId + '-search';
    this.pagingSelector = '.om002 .om002-paging-' + moduleId;
    this.immediately = true
  }
  //渲染模板
  function renderListView(resultsData) {
    $('.om002 .panel .om002_listView').html(_tmpls['listView'](resultsData));
  }
  //渲染发货通知单查询模板
  function renderTransView(resultsData) {
    $('.om002 .panel .om002_transView').html(_tmpls['transView'](resultsData));
  }

  //请求参数
  function argsListview() {
    var condition = {

    };
    return condition;
  }

  function loadDblData() {
    return $.when(
      EL.get('api/mock/om002ProDemd'),
      EL.get('api/mock/om002PackDemd'),
      EL.get('api/mock/om002TransDemd'),
      EL.get('api/mock/om002_printView'),
      EL.get('api/mock/om002_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      $('.om002_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.om002_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.om002_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.om002_product').html(_tmpls['printView'](printData[0]));
      $('.om002_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }
  //全选框
  $(".checkall").click(function(){
    if($(this).is(':checked')){
      $(".checkItem").prop("checked",true );
    }else{
      $(".checkItem").prop("checked",false);
    };

  });
  function backTableList() {
   $('.om002 >.printView >.panel>.panel-heading> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      if (dataviewvalue === 'listView') {
        view(dataviewvalue);
      } else if (dataviewvalue === 'paperConfView') {
        paperconfData();
        var dlg = $('.el-msg');
        dlg.find('.modal-content').css("width","900px");
        dlg.find('.modal-title').text('纸张确认');
        dlg.find('.modal-body').html($('#paperConf').html());
        dlg.find('.modal-footer .ok').text('确认');
        dlg.find('.modal-footer .cancel').text('取消');

        dlg.modal();
      } else if (dataviewvalue === 'editOrderView') {
        var dlg = $('.el-msg');
        dlg.find('.modal-content').css("width","900px")
        dlg.find('.modal-title').text('订单变更内容');
        dlg.find('.modal-body').html($('#editOrder').html());
        dlg.find('.modal-footer .ok').text('确认');
        dlg.find('.modal-footer .cancel').text('取消');
        dlg.modal();
      } else if (dataviewvalue === 'payDetail') {
        payDetail();
        var dlg = $('.el-msg');
        dlg.find('.modal-content').css("width","900px")
        dlg.find('.modal-title').text('价格明细');
        dlg.find('.modal-body').html($('#payDetail').html());
        dlg.find('.modal-footer .ok').text('确认');
        dlg.find('.modal-footer .cancel').text('取消');
        dlg.modal();
      }
    });
  }

  function payDetail() {
    return $.when(
      EL.get('api/mock/om002_paperCost'),//纸张费用
      EL.get('api/mock/om002_accessCost'),//辅料费用
      EL.get('api/mock/om002_printCost'),//印刷费用
      EL.get('api/mock/om002_dealCost'),//表面处理费用
      EL.get('api/mock/om002_bindCost'),//装订费用
      EL.get('api/mock/om002_handCost'),//手工费用
      EL.get('api/mock/om002_printlnCost'),//印前费用
      EL.get('api/mock/om002_packCost'),//包装费用
      EL.get('api/mock/om002_transCost')//物流费用
    ).then(function (paperCostData, accessCostData, printCostData, dealCostData, bindCostData, handCostData, printlnCostData, packCostData, transCostData) {

      $('.paperCost').html(_tmpls['paperCost'](paperCostData[0]));
      $('.accessCost').html(_tmpls['accessCost'](accessCostData[0]));
      $('.printCost').html(_tmpls['printCost'](printCostData[0]));
      $('.dealCost').html(_tmpls['dealCost'](dealCostData[0]));
      $('.bindCost').html(_tmpls['bindCost'](bindCostData[0]));
      $('.handCost').html(_tmpls['handCost'](handCostData[0]));
      $('.printlnCost').html(_tmpls['printlnCost'](printlnCostData[0]));
      $('.packCost').html(_tmpls['packCost'](packCostData[0]));
      $('.transCost').html(_tmpls['transCost'](transCostData[0]));
    });
  }

  function paperconfData() {
    var _tmpl = Handlebars.compile($('.om002_paperConfData').html());
    EL.get('api/mock/om002_paperConf')
      .then(function (json) {
        $('.om002_paperConf').html(_tmpl(json));
      });
  }
  function detailView(soNo){
      EL.view('om002','printView');//页面切换
      EL.dtp('.om002  .printView .el-dtp');//日期控件
      backTableList();
      loadDblData();
       $('.om002 .tablelist .om002_product').on('click',function (e) {
                 var dlg = $('#om002-link-prodview-modal');
                 dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                 dlg.find('.modal-body').html($('#om002-2-prod-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
              });
              $('.om002 .tablelist .om002_products').on('click',function (e) {
                  var dlg = $('#om002-link-suitview-modal');
                  dlg.find('.modal-body').html($('#om002-2-suit-look-tmpl').html());//与工艺评审公用了，实际开发需要根据参数调整显示
               });
  }
  function listenClick() {
    $('.om002 .panel .om002_listView').on('click',function (e) {
          var $clicked = $(e.target);
          var param = $clicked.data('param');
          detailView(param);
        });
    $('.om002 > .listView  .navbarbtn > .form-group> .btn').off('click').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      if (dataviewvalue != 'stockView') {
        view(dataviewvalue);
      } else {
        stockData();
        var dlg = $('.el-msg');
        dlg.find('.modal-content').css("width","600px")
        dlg.find('.modal-title').text('库存查询');
        dlg.find('.modal-body').html($('#stockNum').html());
        dlg.find('.modal-footer .ok').text('确认');
        dlg.find('.modal-footer .cancel').text('取消');
        dlg.modal();
      }
    });
    $('.om002 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.om002 .search-toggle-content').toggle();
    });
  }

  function stockData() {
    return $.when(
      EL.get('api/mock/om002_productNum'),
      EL.get('api/mock/om002_stockNum')
    ).then(function (productData, stockData) {
      $('.om002_productNum').html(_tmpls['productNum'](productData[0]));
      $('.om002_stockNum').html(_tmpls['stockNum'](stockData[0]));
    });
  }

  function listenClick2() {
    $('.om002 .panel-heading > .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      if(dataviewvalue==='listView'){
      view('listView');
      }
    });
    $('.om002 .navbarbtn > .form-group> .btn').on('click', function () {
      var dataviewvalue = $(this).attr('data-view-value');
      if(dataviewvalue =='saveBtn'){
        EL.msg('保存成功!');
      }else if(dataviewvalue == 'removeBtn'){
        var checkList = $("input[name='checkItem']:checked");
        if(checkList.length<=0){
          EL.msg('至少选择一行!');
          return false;
        }else{
          var ids = "";
          for (var i = 0; i < checkList.length; i++) {
            $(checkList[i]).parents('tr').remove();
          }
        }
      }
    });
  }

  function init() {
    $('.om002> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
