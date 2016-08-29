/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {
  var _tmpls = {};
  var ouId = void(0);

  var listView_reqProxy = {
    url: 'api/mock/fm002_listView',
    argsBuilder: argsBuilder,
    callback: renderTable22,
    selector: '.fm002>.listView .table-master-listView',
    /*pagingSelector: '.fm002>.listView .stp-fm002-listView',*/
    trigger: '.fm002>.listView .search-btn',  //检索按钮绑定
    immediately: true
  };
  var soProdView_reqProxy = {
    url: 'api/mock/fm002_soProdView',
    argsBuilder: argsBuilder,
    callback: renderSoProd,
    selector: '.fm002 .table-master-soProdView',
    /*pagingSelector: '.fm002 .stp-fm002-prodIn',*/
    trigger: '.fm002 .search-btn',  //检索按钮绑定
    immediately: true
  };

  var prodInView_reqProxy = {
    url: 'api/mock/fm002_prodInView',
    argsBuilder: argsBuilder,
    callback: renderProdIn,
    selector: '.fm002 .table-master-prodInView',
    /*pagingSelector: '.fm002 .stp-fm002-prodIn',*/
    trigger: '.fm002 .search-btn',  //检索按钮绑定
    immediately: true
  };
  var delinoteProdView_reqProxy = {
    url: 'api/mock/fm002_delinoteProdView',
    argsBuilder: argsBuilder,
    callback: renderDelinoteProd,
    selector: '.fm002 .table-master-delinoteProdView',
    /*pagingSelector: '.fm002 .stp-fm002-delinoteProd',*/
    trigger: '.fm002 .search-btn',  //检索按钮绑定
    immediately: true
  };

  var statementView_reqProxy = {
    url: 'api/mock/fm002_statementView',
    argsBuilder: argsBuilder,
    callback: renderStatementView,
    selector: '.fm002 .table-master-statementView',
    /*pagingSelector: '.fm002 .stp-fm002-statement',*/
    trigger: '.fm002 .search-btn',
    immediately: true
  };

  var ticketView_reqProxy = {
    url: 'api/mock/fm002_ticketView',
    argsBuilder: argsBuilder,
    callback: renderTicketlView,
    selector: '.fm002 .table-master-ticketView',
    /*pagingSelector: '.fm002 .stp-fm002-ticket',*/
    trigger: '.fm002 .search-btn',
    immediately: true
  };

  var payView_reqProxy = {
    url: 'api/mock/fm002_payView',
    argsBuilder: argsBuilder,
    callback: renderPayView,
    selector: '.fm002 .table-master-payView',
    /*pagingSelector: '.fm002 .stp-fm002-pay',*/
    trigger: '.fm002 .search-btn',
    immediately: true
  };


  //请求参数列表
  function argsBuilder() {
    /*var ouName = $('.fm002 .listView .ouName').val();
     var agentId = $('.fm002 .listView .agentId').val();
     var prodName = $('.fm002 .listView .prodName').val();
     var soNo = $('.fm002 .listView .soNo').val();
     var custName = $('.fm002 .listView .custName').val();
     var soDateFrom = $('.fm002 .listView .soDateFrom').val();
     var soDateTo = $('.fm002 .listView .soDateTo').val();

     var condition = {
     ouName: ouName,
     agentId: agentId,
     prodName: prodName,
     soNo: soNo,
     custName : custName,
     soDateFrom:soDateFrom,
     soDateTo:soDateTo
     };
     return condition;*/
  }


  /*function argsProdIn (){
   var ouName = $('.fm002 .listView .ouName').val();
   var addrName = $('.fm002 .listView .addrName').val();
   var prodName = $('.fm002 .listView .prodName').val();
   var soNo = $('.fm002 .listView .poNo').val();
   var custName = $('.fm002 .listView .custName').val();

   var condition = {
   ouName: ouName,
   addrName: addrName,
   prodName: prodName,
   soNo: soNo,
   custName : custName
   };
   return condition;
   }


   function argsTicket () {
   var ouName = $('.fm002>.ticketView .ouName').val();
   var custCode = $('.fm002>.ticketView .custCode').val();

   EL.log("----ouName",ouName);

   var condition = {
   ouName: ouName,
   custCode: custCode,
   ouId:ouId
   };
   return condition;
   }

   function argsPay () {
   var ouName = $('.fm002>.payView .ouName').val();
   var custCode = $('.fm002>.payView .custCode').val();
   var recvDateFrom = $('.fm002>.payView .recvDateFrom').val();
   var recvDateTo = $('.fm002>.payView .recvDateTo').val();
   var invDateFrom = $('.fm002>.payView .invDateFrom').val();
   var invDateTo = $('.fm002>.payView .invDateTo').val();

   var condition = {
   ouName: ouName,
   custCode: custCode,
   ouId:ouId,
   recvDateFrom:recvDateFrom,
   recvDateTo:recvDateTo,
   invDateFrom : invDateFrom,
   invDateTo : invDateTo

   };
   return condition;
   }

   function argsStatement () {
   var ouCode = $('.fm002>.statementView .ouCode').val();
   var custCode = $('.fm002>.statementView .custCode').val();
   var soNo = $('.fm002>.statementView .soNo').val();
   var prodCode = $('.fm002>.statementView .prodCode').val();

   var condition = {
   ouName: ouCode,
   custCode: custCode,
   ouId:ouId,
   soNo:soNo,
   prodCode:prodCode
   };
   return condition;
   }*/


  function renderTable22(data) {
    EL.log('------------fm002--->', data);
    $('.fm002 .listView-data').html(_tmpls['listView'](data));
    /* return  listenClick();*/
    /*return loadListTotalData();*/
  }

  function renderSoProd(data) {
    EL.log('------------soProd--->', data);
    $('.fm002 .soProdView-data').html(_tmpls['soProdView'](data));
    /* return  listenClick();*/
  }

  function renderProdIn(data) {
    EL.log('------------prodIn--->', data);
    $('.fm002 .prodInView-data').html(_tmpls['prodInView'](data));
    /* return  listenClick();*/
  }

  function renderDelinoteProd(data) {
    EL.log('------------renderDelinoteProd--->', data);
    $('.fm002 .delinoteProdView-data').html(_tmpls['delinoteProdView'](data));
    /* return  listenClick();*/
  }


  //渲染ticketView模板
  function renderTicketlView(data) {
    EL.log("-------", data);
    $('.fm002 .ticketView-data').html(_tmpls['ticketView'](data));
    /* return backTableList();*/
    /*return loadTicketTotalData();*/
  }

  //渲染payView模板
  function renderPayView(data) {
    EL.log("渲染payView模板------->", data);
    $('.fm002 .payView-data').html(_tmpls['payView'](data));
    /*return loadPayTotalData();*/
    /*return backTableList();*/

  }

  /*function loadPayTotalData(){
   var param = argsBuilder();
   $.when(
   EL.get('api/mock/fm002_payTotal',param)
   ).then(function (total) {
   $('.fm002  .payView-data').append(_tmpls['payTotal'](total));
   });
   }*/

  /*function loadListTotalData(){
   var param = argsBuilder();
   $.when(
   EL.get('api/mock/fm002_listTotal',param)
   ).then(function (total) {
   $('.fm002  .listView-data').append(_tmpls['listTotal'](total));
   });
   }
   function loadTicketTotalData(){
   EL.log('------------prodIn--->');
   var param = argsBuilder();
   $.when(
   EL.get('api/mock/fm002_ticketTotal',param)
   ).then(function (total) {
   EL.log("11111",total);
   $('.fm002  .ticketView-data').append(_tmpls['ticketTotal'](total));
   });
   }
   function loadStatementTotalData(){
   var param = argsBuilder();
   $.when(
   EL.get('api/mock/fm002_statementTotal',param)
   ).then(function (total) {
   $('.fm002  .statementView-data').append(_tmpls['statementTotal'](total));
   });
   }*/


  //渲染statementView模板
  function renderStatementView(data) {
    $('.fm002  .statementView-data').html(_tmpls['statementView'](data));
    /*return backTableList();*/
    /*return loadStatementTotalData();*/
  }

  function optClass(viewId) {
    $('.fm002> .view .accountTable').addClass('el-hide');
    $('.fm002 .' + viewId + "_table").removeClass('el-hide');
    EL.log('.fm002> .' + viewId + "_table");
  }


  function loadStatus() {
    EL.get('api/mock/fm002_docStatus').then(function (docStatusData) {
      $('.fm002 .docStatus').html(_tmpls['docStatus'](docStatusData));

    })
  }

  function view(viewId) {

    var radioInput = $('.fm002 .stp-table-accountName  input[name="fm002_table"]:checked');
    var soProdId = radioInput.val();

    if (viewId === 'listView') {
      optClass(viewId);
      EL.dtp('.fm002  .' + viewId + ' .el-dtp');//日期控件
      EL.table(listView_reqProxy);
      loadStatus();
    } else {

      if (soProdId == void(0)) {
        EL.msg("请选择一条数据")
      } else {
        EL.log('viewId-->', viewId);
        optClass(viewId);
        $('.class').val();

        if (viewId === 'payView') {
          EL.table(payView_reqProxy);
          EL.log('payView_reqProxy--+>', payView_reqProxy);
        } else if (viewId === 'ticketView') {
          EL.table(ticketView_reqProxy);
        } else if (viewId === 'statementView') {
          EL.table(statementView_reqProxy);
        } else if (viewId === 'prodInView') {
          EL.log("!!!!!!!!!!进来了");
          EL.table(prodInView_reqProxy);
        } else if (viewId === 'delinoteProdView') {
          EL.table(delinoteProdView_reqProxy);
        }else if(viewId === 'soProdView'){
          EL.table(soProdView_reqProxy);
        }
        else {
          EL.msg('请求无效', 'green')
        }
      }
    }
  }

  /*function backTableList() {
   return $('.fm002 .panel-heading > .btn').on('click', function () {
   view('listView');
   });
   }*/

  function clean() {
    EL.log("--------清空");
    $('.fm002 .listView .ouName').val("");
    $('.fm002 .listView .agentId').val("");
    $('.fm002 .listView .prodName').val("");
    $('.fm002 .listView .soNo').val("");
    $('.fm002 .listView .custName').val("");
    $('.fm002 .listView .soDateFrom').val("");
    $('.fm002 .listView .soDateTo').val("");
  }

  function listenClick() {
    $('.fm002 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.fm002 .search-toggle-content').toggle();
    });


    $('.fm002 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).data('viewId');
      clean();
      EL.log('!!!!!viewId is:' + viewId);
      if (viewId === 'handStatementView') {
        handStatement();
      } else {
        view(viewId);
      }

    });
  }

  function handStatement() {
    //获取所选参数
    var radioInput = $('.fm002 .stp-table-accountName  input[name="fm002_table"]:checked');
    var soProdId = radioInput.val();
    var settleFlag = radioInput.attr('data-settleFlag');
    var deliQty = radioInput.attr('data-deliQty');
    var manuQty = radioInput.attr('data-manuQty');
    EL.log("!!!!!soProdId is:" + soProdId + "!!!!!settleFlag is:" + settleFlag);
    //校验数据
    if (soProdId == void(0)) {
      EL.msg('请选择数据！');
    } else {
      EL.msg("结算单已生成");
      view('listView');
      /*else if (settleFlag == 'Y') {
      EL.msg('请勿重复结算！');
    } else if (parseInt(deliQty) >= parseInt(manuQty)) {
      EL.msg('发货数量' + deliQty + '大于等于订单数量' + manuQty + '时，无法手动生成结算单！');
    } else {
      //调用手动结算服务
      EL.get("api/mock/fm002_handStatementView", {soProdId: soProdId}).then(function (data) {
        if (data) {
          EL.msg('结算单已生成');
        } else {
          EL.msg('结算单生成失败');
        }
        view('listView');
      });*/

    }

  }

  function init() {
    $('.fm002> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
    listenClick();

  }

  return init;
});


/*define(function (require) {

 var _tmpls = {};

 //请求参数列表


 /!*function loadTotalData() {
 var param = argsBuilder();
 $.when(
 EL.get('api/fm/fm002/totalView', param)
 ).then(function (total) {
 $('.fm005>.listView>.panel>.box-wrap .totalView-data').append(_tmpls['total'](total));
 });
 }*!/


 return init;
 });*/
