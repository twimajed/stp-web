/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  var payView_reqProxy = {
    url: 'api/mock/fm004_payView',
    argsBuilder: argsBuilder,
    callback: renderTable,   //回调
    selector: '.fm004>.payView .table-master',
    /*pagingSelector: '.fm004>.listView .stp-fm004-list',*/
    trigger: '.fm004>.payView .search-btn',
    immediately: true

  };

  //请求参数列表
  function argsBuilder () {
    return {};
  }

  //渲染模板
  function renderTable (resultsData) {
    EL.log("--------fm004",resultsData);
    $('.fm004 .payView-data').html(_tmpls['payView'](resultsData));
    EL.dtp('.fm004>.payView .el-dtp');
    listenClick();
  }
 function listenClick() {
   $('.fm004 .search-toggle-btn').on('click', function () {
     $(this).find('i').toggleClass("fa-plus");
     $(this).find('i').toggleClass("fa-minus");
     $('.fm004 .search-toggle-content').toggle();
   });
 }
  //视图
  function view(viewId) {
    if (viewId === 'payView') {
      EL.table(payView_reqProxy);
    }
  }

  function init(){
    $('.fm004> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });
    view('payView');
  }
  return init;

  /*function listenClick() {
   $('.fm004 .navbarbtn > .form-group> .btn').on('click', function () {
   var viewId=$(this).data('viewId');
   EL.log('!!!!!!!!!!!!!!!!!!!!viewId is:'+viewId);
   if(viewId === 'accountView'){
   account();
   }else{
   view(viewId);
   }
   });

   }*/

});

/** 以下是修改之前的代码 备份使用 **/
// function load(viewId) {
//   return EL.get('api/fm/fm004/' + viewId)
//     .then(function (data) {
//       return $('.fm004>  .' + viewId).html(_tmpls[viewId](data));
//     });
// }
//
// function view(viewId) {
//   load(viewId).then(function ($view) {
//     $('.fm004> .view').addClass('hide');
//     $view.removeClass('hide');
//     if (viewId === 'listView') {
//       asyncLoad().then(function () {//渲染页面异步加载数据（先将页面加载完，再监听）
//         EL.dtp('.fm004 .el-dtp');
//         return listenClick();//监听页面点击事件
//       });
//     } else if (viewId === 'editView') {
//       backTableList();
//     } else if (viewId === 'dblView') {
//       backTableList();
//     }
//   });
// }
//
// function backTableList() {
//   $('.fm004 .panel-heading > .btn').on('click', function () {
//     view('listView');
//   });
// }
//
// function asyncLoad() {
//   return $.when(
//     EL.get('api/mock/fm004_orderStatus')
//   ).then(function (orderStatus) {
//     EL.log(orderStatus);
//     $('.fm004 .orderStatus').append(_tmpls['orderStatus'](orderStatus));
//
//   });
// }
//
//
// function listenClick() {
//   $('.fm004 .navbarbtn > .form-group> .btn').on('click', function () {
//     view($(this).data('viewId'));
//   });
//
// }
//
// function init() {
//   $('.fm004> .hbs').each(function () {
//     var $hbs = $(this), viewId = $hbs.data('viewId');
//     _tmpls[viewId] = Handlebars.compile($hbs.html());
//   });
//
//   view('listView');
// }
//
// return init;


