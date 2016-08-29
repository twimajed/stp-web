/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {
  var _tmpls = {};

  var listView_reqProxy = {
    url: 'api/mock/pm004_listView',
    argsBuilder: argsBuilder,
    callback: renderTable,   //回调
    sortSelector: '.pm004>.listView .table-master',
    /*pagingSelector: '.pm004>.listView .stp-fm001-list',*/
    trigger: '.pm004>.listView .search-btn',
    immediately: true
  };

  //请求参数列表
  function argsBuilder() {
    return {};
  }

  //渲染模板
  function renderTable(resultsData) {
    EL.log("--------pm004", resultsData);
    var tmpl = Handlebars.compile($('.pm004 .hbs-listView').html());
    $('.pm004 .listView-data').html(tmpl(resultsData));
    /*loadTotalData();*/
    EL.dtp('.pm004>.listView .el-dtp');
    return listenListClick();

  }

  /*var partMsg_reqProxy = {
    url: 'api/mock/pm004_partMsg',
    argsBuilder: argsBuilder,
    callback: renderPartMsg,   //回调
    sortSelector: '.pm004 .addProView .table-master',
    /!*pagingSelector: '.pm004>.listView .stp-fm001-list',*!/
    trigger: '.pm004>.addProView  .addBtn',
    immediately: true
  };*/

  //渲染模板
  /*function renderPartMsg(partMsgData) {
    EL.log("--------PartMsg", partMsgData);
   /!* var tmpl = Handlebars.compile($('.pm004 .hbs-listView').html());
    $('.pm004 .listView-data').html(tmpl(resultsData));*!/
    /!*loadTotalData();*!/
    $('.addProView  .partMsg').html(_tmpls['partMsg'](partMsgData));

  }*/


  function loadPartMsgDate() {
    return $.when(
      EL.get('api/mock/pm004_prodBig'),
      EL.get('api/mock/pm004_prodSmall'),
      EL.get('api/mock/pm004_bindType'),
      EL.get('api/mock/pm004_bindSon'),
      EL.get('api/mock/pm004_colorStandard'),
      EL.get('api/mock/pm004_colormatchStandard'),
      EL.get('api/mock/pm004_paperType'),
      EL.get('api/mock/pm004_partMsg')
    ).then(function (prodBigData,prodSmallData,bindTypeData,bindSonData,colorStandardData,colormatchStandardData,paperTypeData,partMsgData) {
      EL.log("!!!!!!!!!!!!!!!!",prodBigData);
      $('.pm004 .prodBig').html(_tmpls['prodBig'](prodBigData[0]));
      $('.pm004 .prodSmall').html(_tmpls['prodSmall'](prodSmallData[0]));
      $('.pm004 .bindType').html(_tmpls['bindType'](bindTypeData[0]));
      $('.pm004 .bindSon').html(_tmpls['bindSon'](bindSonData[0]));
      $('.pm004 .colorStandard').html(_tmpls['colorStandard'](colorStandardData[0]));
      $('.pm004 .colormatchStandard').html(_tmpls['colormatchStandard'](colormatchStandardData[0]));
      $('.pm004 .paperType').html(_tmpls['paperType'](paperTypeData[0]));
      $('.pm004 .partMsg').html(_tmpls['partMsg'](partMsgData[0]));
    })
  }


  function listenListClick() {
    $('.pm004 .search-toggle-btn').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.pm004 .search-toggle-content').toggle();
    });

    $('.pm004 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
        view(viewId);
    });


    $('.pm004 .listView  .quoteTable').on('click',function(){
     /*var objValue=$(this).parent().parent().attr("data-view-value");*/
      view("createPriceBtn");
    });


    //退回页面-确认按钮事件
    $(".pm004 .el-msg-returnBtn .modal-footer .return").click(function () {
      var textareaContent = $(".pm004 .modal-body .orderPriceBackTextarea").val();
      if (!textareaContent) {
        //EL.view('el-msg-tip');
        $('.pm004 .msg-tip').addClass('el-hide');
        $('.pm004 .msg-tip').removeClass('el-hide');
        return false;
        //EL.msg('请填写退回原因','green');
      }
      else {
        view('listView');
      }
    });


    $('.pm004>.editView  .addFieldset  .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
      view(viewId);
    });

    $('.pm004>.editView .panel-heading .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
      view(viewId);
    });

    $('.pm004>.editView .panel-heading  .returnList').on('click', function () {
      //view('listView');
      optClass('listView');
    });

    $('.pm004>.printView .panel-heading > .btn').on('click', function () {
      //view('listView');
      optClass('editView');
    });

  }

  /*function listenEditClick() {

  }*/


function enterPay() {
   $.when(
    EL.get('api/mock/pm004_enterPay')
  ).then(function (enterPayData) {
    EL.log("!!!!!!!!!!!!!!!!",enterPayData);
    $('.enterPay').html(_tmpls['enterPay'](enterPayData));
  }).then(function() {
     var $data_tbl = $(".pm004 .el-msg-enterPayBtn .table");
     EL.log("enterPay---------->", $data_tbl);
     $.each($data_tbl.find("tr"), function () {
       var $this = $(this);

       var inputNum = $this.find("td:eq(2)").text();

       if(inputNum === "0"){
         console.log(" -- ", inputNum);
         $this.find("input").attr('readOnly',true);
       }
     })
   }
)
}

  function addProds() {
    return $.when(
      EL.get('api/mock/pm004_addProds')
    ).then(function (addProdsData) {
      EL.log("!!!!!!!!!!!!!!!!",addProdsData);
      $('.pm004 .addProds').html(_tmpls['addProds'](addProdsData));
    });
  }



  function loadDblData() {
    return $.when(
      EL.get('api/mock/pm004_proDemd'),
      EL.get('api/mock/pm004_packDemd'),
      EL.get('api/mock/pm004_transDemd'),
      EL.get('api/mock/pm004_printView'),
      EL.get('api/mock/pm004_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      EL.log("print2Data",print2Data);
      $('.pm004_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.pm004_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.pm004_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.pm004_product').html(_tmpls['printView'](printData[0]));
      $('.pm004_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }

  function loadChangeData() {
    return $.when(
      EL.get('api/mock/pm004_change')//变更
    ).then(function (changeData){
      $('.pm004 .change').html(_tmpls['change'](changeData));
    })
  }

function payDetail() {
  return $.when(
    EL.get('api/mock/pm004_paperCost'),//纸张费用
    EL.get('api/mock/pm004_accessCost'),//辅料费用
    EL.get('api/mock/pm004_printCost'),//印刷费用
    EL.get('api/mock/pm004_dealCost'),//表面处理费用
    EL.get('api/mock/pm004_bindCost'),//装订费用
    EL.get('api/mock/pm004_handCost'),//手工费用
    EL.get('api/mock/pm004_printlnCost'),//印前费用
    EL.get('api/mock/pm004_packCost'),//包装费用
    EL.get('api/mock/pm004_transCost')//物流费用
  ).then(function (paperCostData, accessCostData, printCostData, dealCostData, bindCostData, handCostData, printlnCostData, packCostData, transCostData) {
    $('.pm004 .paperCost').html(_tmpls['paperCost'](paperCostData[0]));
    $('.pm004 .accessCost').html(_tmpls['accessCost'](accessCostData[0]));
    $('.pm004 .printCost').html(_tmpls['printCost'](printCostData[0]));
    $('.pm004 .dealCost').html(_tmpls['dealCost'](dealCostData[0]));
    $('.pm004 .bindCost').html(_tmpls['bindCost'](bindCostData[0]));
    $('.pm004 .handCost').html(_tmpls['handCost'](handCostData[0]));
    $('.pm004 .printlnCost').html(_tmpls['printlnCost'](printlnCostData[0]));
    $('.pm004 .packCost').html(_tmpls['packCost'](packCostData[0]));
    $('.pm004 .transCost').html(_tmpls['transCost'](transCostData[0]));
  });
}

function optClass(viewId) {
  $('.pm004> .view').addClass('el-hide');
  $('.pm004> .' + viewId).removeClass('el-hide');
}

//视图
function view(viewId) {
  if (viewId === 'listView') {
    optClass(viewId);
    EL.table(listView_reqProxy);
  }else if (viewId === 'createPriceBtn') {
    optClass('editView');
    loadDblData();
    /*listenEditClick();*/
    EL.dtp('.pm004>.editView .el-dtp');
  }else if(viewId === 'saveBtn'){
    optClass('listView');
  }else if(viewId === 'passBtn'){
    optClass('listView');
  }else if(viewId === 'enterPayBtn'){
    $(".pm004 .el-msg-enterPayBtn").modal();
    enterPay();
    /*if(){
    }*/
  } else if (viewId === 'payDetailBtn') {
    /*payDetail();
    var dlg = $('.el-msg');
    dlg.find('.modal-content').css("width", "700px");
    dlg.find('.modal-title').text('价格明细');
    dlg.find('.modal-body').html($('.pm004 .payDetail').html());
    dlg.find('.modal-footer .ok').text('确认');
    dlg.find('.modal-footer .cancel').text('取消');
    dlg.modal();*/
    $(".pm004 .el-msg-payDetailBtn").modal();
    payDetail();

  } else if (viewId === 'returnBtn') {
    $(".pm004 .modal-body .orderPriceBackTextarea").val("");
    $('.pm004 .msg-tip').addClass('el-hide');
    $(".pm004 .el-msg-returnBtn").modal();
  }else if (viewId === 'addPro'){
    $(".pm004 .el-msg-addProdBtn").modal();
    EL.log("进来addpro了");
    loadPartMsgDate();
    /*EL.table(partMsg_reqProxy);*/
  }else if (viewId === 'addProds'){
    $(".pm004 .el-msg-addProdsBtn").modal();
    addProds();
  }else if(viewId === 'jumpOrder'){
    optClass('printView');
    loadDblData();
  }else if(viewId === 'changeBtn'){
    $(".pm004 .el-msg-changeBtn").modal();
    loadChangeData();
  }
}

function init() {
  $('.pm004> .hbs').each(function () {
    var $hbs = $(this), viewId = $hbs.data('viewId');
    _tmpls[viewId] = Handlebars.compile($hbs.html());
  });
  view('listView');
}
return init;
});
