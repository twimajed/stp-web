/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};

  var listView_reqProxy = {
    url: 'api/mock/fm001_listView',
    argsBuilder: argsBuilder,
    callback: renderTable,   //回调
    selector: '.fm001>.listView .table-master',
    /*pagingSelector: '.fm001>.listView .stp-fm001-list',*/
    trigger: '.fm001>.listView .search-btn',
    immediately: true

  };

  //请求参数列表
  function argsBuilder () {
    return {};
  }

  //渲染模板
  function renderTable (resultsData) {
    EL.log("--------fm001",resultsData);
    var tmpl = Handlebars.compile($('.fm001 .hbs-listView').html());
    $('.fm001 .listView-data').html(tmpl(resultsData));
    /*loadTotalData();*/
    EL.dtp('.fm001>.listView .el-dtp');

  }

  //视图
  function view(viewId) {
    if (viewId === 'listView') {
      EL.table(listView_reqProxy);
    }
  }

  function init(){
    $('.fm001> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });
    view('listView');
    listenClick();
  }
  return init;

  function listenClick() {

    $('.fm001 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.fm001 .search-toggle-content').toggle();
    });


    $('.fm001 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId=$(this).data('viewId');
      EL.log('!!!!!!!!!!!!!!!!!!!!viewId is:'+viewId);
      if(viewId === 'accountView'){
        account();
      }else{
        view(viewId);
      }
    });

  }

  /**
   * 立账操作
   * */
  function account(){
    //获取所选参数
    var radioInput = $('.fm001 .stp-table-accountSettle  input[name="fm001_table"]:checked');
    var settleId = radioInput.val();
    var accountFlag = radioInput.attr('data-accountFlag');
    EL.log('!!!!!settleId is:'+settleId+'!!!!!accountFlag is:'+accountFlag);
    //校验数据
    if( settleId == void(0)){
      EL.msg('请选择数据！');
    }else if(accountFlag == 'Y'){
      EL.msg('请勿重复立账！');
    }else{
      /*EL.get("api/fm/fm001/accountView",{settleId:settleId}).then(function (data) {
        if(data){
          EL.msg('立账成功');
          EL.table(listView_reqProxy);
        }else{
          alert('立账失败');
        }
      });*/
      EL.msg("立账成功");
      view('listView');

    }

  }

  /** 以下是修改之前的代码 备份使用 **/
  // function load(viewId) {
  //   return EL.get('api/fm/fm001/' + viewId)
  //     .then(function (data) {
  //       return $('.fm001>  .' + viewId).html(_tmpls[viewId](data));
  //     });
  // }
  //
  // function view(viewId) {
  //   load(viewId).then(function ($view) {
  //     $('.fm001> .view').addClass('hide');
  //     $view.removeClass('hide');
  //     if (viewId === 'listView') {
  //       asyncLoad().then(function () {//渲染页面异步加载数据（先将页面加载完，再监听）
  //         EL.dtp('.fm001 .el-dtp');
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
  //   $('.fm001 .panel-heading > .btn').on('click', function () {
  //     view('listView');
  //   });
  // }
  //
  // function asyncLoad() {
  //   return $.when(
  //     EL.get('api/mock/fm001_orderStatus')
  //   ).then(function (orderStatus) {
  //     EL.log(orderStatus);
  //     $('.fm001 .orderStatus').append(_tmpls['orderStatus'](orderStatus));
  //
  //   });
  // }
  //
  //
  // function listenClick() {
  //   $('.fm001 .navbarbtn > .form-group> .btn').on('click', function () {
  //     view($(this).data('viewId'));
  //   });
  //
  // }
  //
  // function init() {
  //   $('.fm001> .hbs').each(function () {
  //     var $hbs = $(this), viewId = $hbs.data('viewId');
  //     _tmpls[viewId] = Handlebars.compile($hbs.html());
  //   });
  //
  //   view('listView');
  // }
  //
  // return init;
});

