/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  var ticketView_reqProxy = {
    url: 'api/mock/fm003_ticketView',
    argsBuilder: argsBuilder,
    callback: renderTable,   //回调
    selector: '.fm003>.ticketView .table-master',
    /*pagingSelector: '.fm003>.listView .stp-fm003-list',*/
    trigger: '.fm003>.ticketView .search-btn',
    immediately: true

  };

  //请求参数列表
  function argsBuilder () {
    return {};
  }

  //渲染模板
  function renderTable (resultsData) {
    EL.log("--------fm003",resultsData);
    $('.fm003 .ticketView-data').html(_tmpls['ticketView'](resultsData));
    EL.dtp('.fm003>.ticketView .el-dtp');
    listenClick();
  }

  function listenClick() {
    $('.fm003 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.fm003 .search-toggle-content').toggle();
    });
  }

  //视图
  function view(viewId) {
    if (viewId === 'ticketView') {
      EL.table(ticketView_reqProxy);
    }
  }

  function init(){
    $('.fm003> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });
    view('ticketView');
  }
  return init;

  /*function listenClick() {
    $('.fm003 .navbarbtn > .form-group> .btn').on('click', function () {
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
  //   return EL.get('api/fm/fm003/' + viewId)
  //     .then(function (data) {
  //       return $('.fm003>  .' + viewId).html(_tmpls[viewId](data));
  //     });
  // }
  //
  // function view(viewId) {
  //   load(viewId).then(function ($view) {
  //     $('.fm003> .view').addClass('hide');
  //     $view.removeClass('hide');
  //     if (viewId === 'listView') {
  //       asyncLoad().then(function () {//渲染页面异步加载数据（先将页面加载完，再监听）
  //         EL.dtp('.fm003 .el-dtp');
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
  //   $('.fm003 .panel-heading > .btn').on('click', function () {
  //     view('listView');
  //   });
  // }
  //
  // function asyncLoad() {
  //   return $.when(
  //     EL.get('api/mock/fm003_orderStatus')
  //   ).then(function (orderStatus) {
  //     EL.log(orderStatus);
  //     $('.fm003 .orderStatus').append(_tmpls['orderStatus'](orderStatus));
  //
  //   });
  // }
  //
  //
  // function listenClick() {
  //   $('.fm003 .navbarbtn > .form-group> .btn').on('click', function () {
  //     view($(this).data('viewId'));
  //   });
  //
  // }
  //
  // function init() {
  //   $('.fm003> .hbs').each(function () {
  //     var $hbs = $(this), viewId = $hbs.data('viewId');
  //     _tmpls[viewId] = Handlebars.compile($hbs.html());
  //   });
  //
  //   view('listView');
  // }
  //
  // return init;


