/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};


  function load(viewId) {
    return EL.get('api/mock/ui006_' + viewId)
      .then(function (data) {
        return $('.ui006>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.ui006> .view').addClass('hide');
      $view.removeClass('hide');
      if (viewId === 'listView') {
        asyncLoad().then(function () {//渲染页面异步加载数据（先将页面加载完，再监听）
          EL.dtp('.ui006 .el-dtp');
          return listenClick();//监听页面点击事件
        });
      }else{
        $('.panel-heading > .btn').on('click', function () {
           view('listView');
        });
      }
    });
  }

  //异步加载页面数据
  function asyncLoad() {
    return $.when(
      EL.get('api/mock/ui006_designStatus'),
      EL.get('api/mock/ui006_productStatus')
    ).then(function (designStatusData,productStatusData) {
        EL.log(designStatusData,productStatusData);
        $('.designStatus').append(_tmpls['designStatus'](designStatusData[0]));
        $('.productStatus').append(_tmpls['productStatus'](productStatusData[0]));
      });
  }

  function listenClick() {
    $('.ui006 >.view >.panel>.navbarbtn > .form-group> .btn').on('click', function () {
        view($(this).data('viewId'));
    });
    $('.ui006 >.view >.panel>.tablelist > .table > tbody > tr').on("click", function () {
        var objValue=$(this).attr("data-view-value");
        EL.log(objValue);
        view($(this).data('viewId'));
    });
  }

  function init() {
    $('.ui006> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }

  return init;
});
