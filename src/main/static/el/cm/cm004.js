/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
    return EL.get('api/mock/cm004_'+viewId)
      .then(function (data) {
        console.log(data);
        return $('.cm004>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.cm004> .view').addClass('hide');
      $view.removeClass('hide');
      if (viewId === 'listView') {
        loadSelectData();
        return listenClick();//监听页面点击事件
      } else if(viewId === 'dblView'){//
        backTableList();
        loadDblData();
        loadSelectData().then(function () {
          EL.dtp('.cm004 .el-dtp');
          return clickOrderDetail();
        });
        btnClick();
      }else if(viewId === 'printOrderView'){//
        loadSelectData();
        loadPrintOrderData();
        btnFrameList();
      }
    });
  }

  function btnClick(){
    $('.cm004 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).data('viewId');
      if (viewId === 'cm004-search-btn') {
        EL.msg('查询', 'green');
      } else if (viewId === 'cm004-one-btn') {
        EL.msg('一个月', 'green');
      }else if (viewId === 'cm004-three-btn') {
        EL.msg('三个月', 'green');
      }else if (viewId === 'cm004-three-btn') {
        EL.msg('三个月', 'green');
      }else if(viewId === 'cm004-redist-btn'){
        EL.msg('重新分配', 'green');
      }else if(viewId === 'cm004-distFinish-btn'){
        EL.msg('订单完结', 'green');
      }
    });
  }

  //双击印刷订单弹出订单生产明细
  function clickOrderDetail() {
    $('.cm004 .dblView .cm004_print tr').on("dblclick",function(){
        // $('.cm004 .modal-title').text("消息");
        // $('.cm004 .el-msg >.modal-dialog> .modal-content> .modal-footer >.ok').hide(); //modal ok
        // $('.cm004 .el-msg >.modal-dialog> .modal-content> .modal-footer >.cancel').hide(); //modal cancel
        // $('.cm004 .el-msg >.modal-dialog> .modal-content').css('min-width', '960px');
        //
        // $('.cm004 .el-msg .modal-body').html($('#printOrderView').html());
        // $('.cm004 .el-msg').modal('show');

        view('printOrderView');
     // modalBtn();
    });
  }

  //按钮组事件
  function btnFrameList() {
    $('.cm004 .closeBtn').on('click', function () {
      view('dblView');
    });

    $('.cm004 .printBtn').on('click', function () {
      EL.msg('打印成功','green');
    });

  }

  //modal按钮
  // function modalBtn(){
  //   $('.cm004 .closeBtn').on('click', function () {
  //     //$('.cm004 .el-msg').modal('hide');
  //     alert('aaaaa');
  //     view('dblView');
  //   });
  //   $('.cm004 .printBtn').on('click', function () {
  //     EL.msg('打印成功','green');
  //     $('.cm004 .el-msg').modal('hide');
  //   });
  // }

  function loadDblData(){
    return $.when(
      EL.get('api/mock/cm005_capacity'),
      EL.get('api/mock/cm005print'),
      EL.get('api/mock/cm005route')
    ).then(function (capacityData,printData,routeData) {

      EL.log(capacityData);
      $('.cm004_capacity').html(_tmpls['capacityView'](capacityData[0]));
      $('.cm004_print').html(_tmpls['printView'](printData[0]));
      $('.cm004_route').html(_tmpls['routeView'](routeData[0]));
    });
  }

  //加载工厂查询 印刷订单 订单生产明细数据
  function loadPrintOrderData(){
    return $.when(
      EL.get('api/mock/cm210_2'),
      EL.get('api/mock/cm210'),
      EL.get('api/mock/cm210_3'),
      EL.get('api/mock/cm210_4'),
      EL.get('api/mock/cm210_5')
    ).then(function (cm210_2,cm210,cm210_3,cm210_4,cm210_5) {

      EL.log(cm210_2,cm210,cm210_3,cm210_4,cm210_5);
      $('.cm210_data_2').html(_tmpls['cm210_table_2'](cm210_2[0]));
      $('.cm210_data').html(_tmpls['cm210_table'](cm210[0]));
      $('.cm210_data_3').html(_tmpls['cm210_table_3'](cm210_3[0]));
      $('.cm210_data_4').html(_tmpls['cm210_table_4'](cm210_4[0]));
      $('.cm210_data_5').html(_tmpls['cm210_table_5'](cm210_5[0]));
    });
  }

  //select 数据
  function loadSelectData() {
    return $.when(
      EL.get('api/mock/cm004_routeType'),
      EL.get('api/mock/cm004_qualifyLevel'),
      EL.get('api/mock/cm004_status')
    ).then(function (routeType,qualifyLevel,status) {
      EL.log(routeType,qualifyLevel,status);
      $('.cm004 .routeType').append(_tmpls['routeType'](routeType[0]));
      $('.cm004 .qualifyLevel').append(_tmpls['qualifyLevel'](qualifyLevel[0]));
      $('.cm004 .status').append(_tmpls['status'](status[0]));
    });
  }

  function listenClick() {
    $('.cm004 .navbarbtn > .form-group> .btn').on('click', function () {
      view($(this).data('viewId'));
    });

    //隐藏、显示
      $('.cm004 .search-toggle-btn').on('click', function () {
          $(this).find('i').toggleClass("fa-plus");
          $(this).find('i').toggleClass("fa-minus");
          $('.cm004 .search-toggle-content').toggle();
      });

    //每行数据绑定双击事件
    // $('.cm004 >.view>.panel> .tablelist > .table > tbody > tr').on("dblclick",function(){
    //   var objValue=$(this).attr("data-view-value");
    //   EL.log($(this).data('viewId'));
    //   view($(this).data('viewId'));
    // });

    $('.cm004 .listView .factoryTablelist').on("click",function(){
      var objValue=$(this).parent().parent().attr("data-view-value");
      EL.log("-----------cm004",$(this).parent().parent().data('viewId'));
      view($(this).parent().parent().data('viewId'));
    });

  }

  //返回
  function backTableList(){
    $('.cm004 .panel-heading > .btn').on('click', function () {
      EL.log("fanuh");
      view('listView');
    });
  }


  //初始化
  function init() {
    $('.cm004> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }
  return init;

});
