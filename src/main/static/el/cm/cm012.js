/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
    return EL.get('api/mock/cm012_' + viewId)
      .then(function (data) {
        console.log('viewid=' + viewId);
        if(viewId === 'capacityInfo'){
          return $('.cm012 .factory_capacity_table').html(_tmpls[viewId](data));
        }
        return $('.cm012>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.cm012> .view').addClass('hide');
      $view.removeClass('hide');
      EL.log($view);
      btnClick();
      if (viewId === 'listView') {
        loadSelectData().then(function () {
          EL.dtp('.cm012 .el-dtp');
          return bindDblClick();
        });
      } else if (viewId === 'orderDetail') {//双击进入订单详情
        loadDblData();
      } else if (viewId === 'factorySelect') {//点击手工分单/自动分单按钮进入选择工厂
        loadFactoryData().then(function () {
          return factoryClick();
        });
      } else if (viewId === 'spiltOrder') {//点击分派订单进入分派订单模块
        loadSpiltOrderData();
      }
    });
  }

  //双击加载产品明细数据
  function loadDblData() {
    return $.when(
      EL.get('api/mock/cm012_prodDetail'),//产品明细数据
      EL.get('api/mock/cm010_capacity'),//工序产能数据
      EL.get('api/mock/cm007_order'),//分单对象
      EL.get('api/mock/cm007_progress'),//进度跟踪
      EL.get('api/mock/cm010_capacity')//完成列表
    ).then(function (prodDetails, capacityData, spiltOrderData, progressTracking, finishedList) {

      EL.log(prodDetails);
      $('.cm012-product-detail').html(_tmpls['prodDetail'](prodDetails[0]));
      $('.cm012-capacity-detail').html(_tmpls['capacityDetail'](capacityData[0]));
      $('.cm012-spilt-order').html(_tmpls['spiltOrderDetail'](spiltOrderData[0]));
      $('.progress-data').html(_tmpls['progressTracking'](progressTracking[0]));
      $('.finished-list').html(_tmpls['finishedList'](finishedList[0]))
    });
  }

  //点击分单按钮加载选择工厂数据
  function loadFactoryData() {
    return $.when(
      EL.get('api/mock/cm010_detail'),//产品明细数据
      EL.get('api/mock/cm010_capacity'),//产能数据
      EL.get('api/mock/cm010_info'),//工厂数据
      EL.get('api/mock/cm007_progress'),//进度跟踪
      EL.get('api/mock/cm010_capacity')//完成列表
    ).then(function (prodDetails, capacityData, factoryList, progressTracking, finishedList) {

      EL.log(capacityData);
      $('.factory-prod-detail').html(_tmpls['factoryProdDetail'](prodDetails[0]));
      $('.factory-capacity').html(_tmpls['factoryCapacity'](capacityData[0]));
      $('.factory-list').html(_tmpls['factoryList'](factoryList[0]));
      $('.progress-data').html(_tmpls['progressTracking'](progressTracking[0]));
      $('.finished-list').html(_tmpls['finishedList'](finishedList[0]))
    });
  }

  //点击分派订单按钮加载分派订单模块数据
  function loadSpiltOrderData() {
    return $.when(
      EL.get('api/mock/cm010_detail'),//产品明细数据
      EL.get('api/mock/cm010_capacity'),//产能数据
      EL.get('api/mock/cm010_info'),//工厂数据
      EL.get('api/mock/cm007_progress'),//进度跟踪
      EL.get('api/mock/cm010_capacity'),//完成列表
      EL.get('api/mock/cm010_info')//未分配完订单
    ).then(function (prodDetails, capacityData, factoryList, progressTracking, finishedList,unallocatedOrders) {

      EL.log(capacityData);
      $('.spilorder-prod-detail').html(_tmpls['factoryProdDetail'](prodDetails[0]));
      $('.spilorder-capacity').html(_tmpls['factoryCapacity'](capacityData[0]));
      $('.factory-list').html(_tmpls['factoryList'](factoryList[0]));
      $('.progress-data').html(_tmpls['progressTracking'](progressTracking[0]));
      $('.finished-list').html(_tmpls['finishedList'](finishedList[0]));
      $('.spiltorder-unallocated-order').html(_tmpls['unallocatedOrder'](unallocatedOrders[0]))
    });
  }

  //加载select数据
  function loadSelectData() {
    return $.when(
      EL.get('api/mock/cm012_docStatus')
    ).then(function (docStatus) {
      $('.docStatus').append(_tmpls['docStatus'](docStatus));
    });
  }

 //加载修改价格弹出框数据
  function updatePrice() {
    var _tmpl = Handlebars.compile($('.cm011_order_table').html());
    EL.get('api/mock/cm011')
      .then(function (json) {
        $('.cm011_order_data').html(_tmpl(json));
      });
  }

  //订单查询页面双击行
  function bindDblClick() {
    // $('.cm012 >.view>.panel> .tablelist > .table > tbody > tr').on("dblclick", function () {
    //   var objValue = $(this).attr("data-view-value");
    //   view($(this).data('viewId'));
    // });
    $('.cm012 .listView .orderDetailTable').on("click", function () {
      var objValue = $(this).parent().parent().attr("data-view-value");
      view($(this).parent().parent().data('viewId'));
    });

    //隐藏、显示
    $('.cm012 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.cm012 .search-toggle-content').toggle();
    });
  }

  //单击工厂加载产能信息
  function factoryClick() {
    $('.cm012-factory-table-001 >tbody').on("click", 'tr', function () {
      var objValue = $(this).attr("data-view-value");
      $('.cm012 .' + $(this).data('viewId')).removeClass('hide');
      load($(this).data('viewId'));
    });
  }

  //激活按钮事件
  function btnClick() {
    $('.cm012 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).data('viewId');
      if(viewId==='cm012-pause-btn'){
        var id = $('.cm012 .cm012_product_data input[name="cm012_table"]:checked').val();
        if(!id){
          EL.msg('请先选择订单信息！','green');
        }else{
          EL.msg('暂停分单','green');
        }
      }else if(viewId==='cm012-redist-btn'){
        var id = $('.cm012 .cm012_product_data input[name="cm012_table"]:checked').val();
        if(!id){
          EL.msg('请先选择订单信息！','green');
        }else {
          EL.ask('是否重新分配？').then(function () {
            view('factorySelect');
          })
        }
      }else if(viewId ==='cm012-dist-btn'){
        var id = $('.cm012 .cm012_product_data input[name="cm012_table"]:checked').val();
        if(!id){
          EL.msg('请先选择订单信息！','green');
        }else {
          EL.msg('自动分单已完成！');
        }
      } else if(viewId==='cm012-update-btn'){
        //EL.ask('是否修改价格？');
          updatePrice();
          // $('.cm012').append("<div class='cm012 el-msg modal fade'>"+$('.el-msg').html()+"</div>");
          // $('.cm012 .modal-title').text("盛通印刷云平台");
          // $('.cm012 .el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').text("确定"); //modal ok
          // $('.cm012 .el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').text("取消"); //modal cancel
          // // $('.cm012 .el-msg >.modal-dialog> .modal-content').css('min-width', '960px');
          //
          // $('.cm012 .el-msg .modal-body').html($('#updatePrice').html());
          // $('.cm012 .el-msg').modal('show');
          var dlg = $('.el-msg');
          dlg.find('.modal-title').text('盛通印刷云平台');
          dlg.find('.modal-body').html($('#updatePrice').html());
          dlg.modal();

      }else if(viewId==='detailQueryBtn'){
        queryProductModal();
      }else if(viewId==='cm012-look-btn'){
        queryProductModal();
      }else
      view($(this).data('viewId'));
    });
  }
  //返回按钮事件
  // function backTableList() {
  //   $('.cm012 >.view > .panel > .panel-heading > .navbarbtn > .form-group > .back-btn').on('click', function () {
  //     view('listView');
  //   });
  // }

  function queryProductModal() {
    var dlgModal = $('.cm012 .selectPaperViewModal');
    dlgModal.find('.modal-body').html(_tmpls['selectPaperView']());
    dlgModal.find('.modal-content').css("width","1000px").css("left","-200px");
    dlgModal.modal();
  }

  function init() {
    //编译所有模板
    $('.cm012> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    //初始化
    view('listView');
  }

  return init;


});
