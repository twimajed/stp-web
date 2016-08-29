/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
    return EL.get('api/mock/cm203_'+viewId)
      .then(function (data) {
        return $('.cm203>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

//视图函数
  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.cm203> .view').addClass('hide');
      $view.removeClass('hide');
      if (viewId === 'listView') {
        loadSelectData().then(function () {
          return listenClick();//监听页面点击事件
        });
      }else if(viewId === 'dblView'){//
        backTableList();
        loadDblData();
        btnFrameList();
        loadSelectData().then(function () {
          EL.dtp('.cm203 .el-dtp'); //日期
        });
        btnClick();
      }
    });
  }

//返回公司查询
  function backTableList(){
    $('.cm203 .panel-heading > .btn').on('click', function () {
      view('listView');
    });
  }

//加载公司查询-产能数据，印刷订单，工艺价格的数据
  function loadDblData(){
    return $.when(
      EL.get('api/mock/cm204capacity'),
      EL.get('api/mock/cm204print'),
      EL.get('api/mock/cm204price')
    ).then(function (capacityData,printData,priceData) {

      EL.log(capacityData,printData,priceData);
      $('.capacity_data').html(_tmpls['capacity_table'](capacityData[0]));
      $('.print_data').html(_tmpls['print_table'](printData[0]));
      $('.price_data').html(_tmpls['price_table'](priceData[0]));
    });
  }

//select数据
  function loadSelectData() {
    return $.when(
      //公司查询的select数据
      EL.get('api/mock/cm203_quantityLevel'),
      EL.get('api/mock/cm203_printLevel'),
      EL.get('api/mock/cm203_bindLevel'),
      //公司查询-产能数据 工序类型select数据
      EL.get('api/mock/cm004_routeType'),
      //公司查询-印刷订单 生产状态select数据
      EL.get('api/mock/cm004_status')
    ).then(function (quantityLevel,printLevel,bindLevel,routeType,status) {
      EL.log(quantityLevel,printLevel,bindLevel,routeType,status);
      $('.cm203 .quantityLevel').append(_tmpls['quantityLevel'](quantityLevel[0]));
      $('.cm203 .printLevel').append(_tmpls['printLevel'](printLevel[0]));
      $('.cm203 .bindLevel').append(_tmpls['bindLevel'](bindLevel[0]));
      $('.cm203 .routeType').append(_tmpls['routeType'](routeType[0]));
      //$('.cm203 .status').append(_tmpls['status'](status[0]));
    });
  }

//按钮组事件
  function btnFrameList() {
    $('.cm203 .btn').on('click', function () {
      var viewid=$(this).data('viewId');
      if(viewid==='proQueryBtn'){
        EL.msg('产能信息','green');
      }
    });
  }

//监听事件
  function listenClick() {
    //每行数据绑定双击事件
    $('.cm203 .listView .ouTablelist').on("click",function(){
      var objValue=$(this).parent().parent().attr("data-view-value");
      EL.log($(this).data('viewId'));
      view($(this).parent().parent().data('viewId'));
    });

    //隐藏、显示
    $('.cm203 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.cm203 .search-toggle-content').toggle();
    });
  }

  function btnClick(){
    $('.cm203 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).data('viewId');
      if (viewId === 'cm203-search-btn') {
        EL.msg('查询', 'green');
      } else if (viewId === 'cm203-one-btn') {
        EL.msg('一个月', 'green');
      }else if (viewId === 'cm203-three-btn') {
        EL.msg('三个月', 'green');
      }else if (viewId === 'cm203-three-btn') {
        EL.msg('三个月', 'green');
      }else if(viewId === 'cm203-redist-btn'){
        EL.msg('重新分配', 'green');
      }else if(viewId === 'cm203-distFinish-btn'){
        EL.msg('订单完结', 'green');
      }
    });
  }

  //初始化
  function init() {
    $('.cm203> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }
  return init;

});
