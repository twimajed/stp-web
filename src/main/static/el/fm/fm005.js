/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {

  var _tmpls = {};

  //请求参数列表
  function argsBuilder() {
   /* var ouName = $('.fm005 .listView .ouName').val();
    var suppName= $('.fm005 .listView .suppName').val();
    var prodName= $('.fm005 .listView .prodName').val();
    var poNo= $('.fm005 .listView .poNo').val();
    var poDateFrom= $('.fm005 .listView .poDateFrom').val();
    var poDateTo= $('.fm005 .listView .poDateTo').val();
    var condition = {
      ouName: ouName,
      suppName:suppName,
      prodName:prodName,
      poNo:poNo,
      poDateFrom:poDateFrom,
      poDateTo:poDateTo
    };
    return condition;*/
  }


  function renderTable22 (data) {
    EL.log('------------fm005--->', data);
    var tmpl = Handlebars.compile($('.fm005 .hbs-totalView').html());
    $('.fm005 .totalView-data').html(tmpl(data));
    loadTotalData();
    listenClick();
    EL.dtp('.fm005 .el-dtp');
  }

  function listenClick() {
    $('.fm005 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.fm005 .search-toggle-content').toggle();
    });
  }

  function loadTotalData() {
    var param = argsBuilder();
    $.when(
      EL.get('api/mock/fm005_totalView',param)
    ).then(function (total) {
      $('.fm005>.listView>.panel>.box-wrap .totalView-data').append(_tmpls['total'](total));
    });
  }

  function init() {
    $('.fm005> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });


      EL.table({
      url: 'api/mock/fm005_listView',
      argsBuilder: argsBuilder,
      callback: renderTable22,
      selector: '.fm005 .table-master',
      /*pagingSelector: '.fm005 .stp-fm005-printPo',*/
      trigger: '.fm005 .search-btn',  //检索按钮绑定
      immediately: true
    })


  }

  return init;
  /* var _tmpls = {};

   function load(viewId) {
   return EL.get('api/fm/fm005/' + viewId)
   .then(function (data) {
   console.log(data);
   console.log(data.amtTotal);
   return $('.fm005>  .' + viewId).html(_tmpls[viewId](data.printPoDomains));
   //$('.qwe').append(_tmpls['totalView'](data.amtTotal));

   });
   }

   function view(viewId) {
   load(viewId).then(function ($view) {
   $('.fm005> .view').addClass('hide');
   $view.removeClass('hide');
   if (viewId === 'listView') {
   //渲染页面异步加载数据（先将页面加载完，再监听）
   EL.dtp('.fm005 .el-dtp');
   return listenClick();//监听页面点击事件

   } else if (viewId === 'editView') {
   backTableList();
   } else if (viewId === 'dblView') {
   backTableList();
   }
   });
   }

   function backTableList() {
   $('.fm005 .panel-heading > .btn').on('click', function () {
   view('listView');
   });
   }


   function listenClick() {
   $('.fm005 .navbarbtn > .form-group> .btn').on('click', function () {
   view($(this).data('viewId'));
   });

   }

   function init() {
   $('.fm005> .hbs').each(function () {
   var $hbs = $(this), viewId = $hbs.data('viewId');
   _tmpls[viewId] = Handlebars.compile($hbs.html());
   });

   view('listView');
   }

   return init;*/
});

