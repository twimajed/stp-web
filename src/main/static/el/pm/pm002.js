/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {
  var _tmpls = {};

  var listView_reqProxy = {
    url: 'api/mock/pm002_listView',
    argsBuilder: argsBuilder,
    callback: renderTable,   //回调
    sortSelector: '.pm002>.listView .table-master',
    /*pagingSelector: '.pm002>.listView .stp-fm001-list',*/
    trigger: '.pm002>.listView .search-btn',
    immediately: true
  };

  //请求参数列表
  function argsBuilder() {
    return {};
  }

  //渲染模板
  function renderTable(resultsData) {
    EL.log("--------pm002", resultsData);
    var tmpl = Handlebars.compile($('.pm002 .hbs-listView').html());
    $('.pm002 .listView-data').html(tmpl(resultsData));
    /*loadTotalData();*/
    EL.dtp('.pm002>.listView .el-dtp');
    return listenListClick();

  }

  /*var partMsg_reqProxy = {
    url: 'api/mock/pm002_partMsg',
    argsBuilder: argsBuilder,
    callback: renderPartMsg,   //回调
    sortSelector: '.pm002 .addProView .table-master',
    /!*pagingSelector: '.pm002>.listView .stp-fm001-list',*!/
    trigger: '.pm002>.addProView  .addBtn',
    immediately: true
  };*/

  //渲染模板
  /*function renderPartMsg(partMsgData) {
    EL.log("--------PartMsg", partMsgData);
   /!* var tmpl = Handlebars.compile($('.pm002 .hbs-listView').html());
    $('.pm002 .listView-data').html(tmpl(resultsData));*!/
    /!*loadTotalData();*!/
    $('.addProView  .partMsg').html(_tmpls['partMsg'](partMsgData));

  }*/


  function loadPartMsgDate() {
    return $.when(
      EL.get('api/mock/pm002_prodBig'),
      EL.get('api/mock/pm002_prodSmall'),
      EL.get('api/mock/pm002_bindType'),
      EL.get('api/mock/pm002_bindSon'),
      EL.get('api/mock/pm002_colorStandard'),
      EL.get('api/mock/pm002_colormatchStandard'),
      EL.get('api/mock/pm002_paperType'),
      EL.get('api/mock/pm002_partMsg')
    ).then(function (prodBigData,prodSmallData,bindTypeData,bindSonData,colorStandardData,colormatchStandardData,paperTypeData,partMsgData) {
      EL.log("!!!!!!!!!!!!!!!!",prodBigData);
      $('.pm002 .prodBig').html(_tmpls['prodBig'](prodBigData[0]));
      $('.pm002 .prodSmall').html(_tmpls['prodSmall'](prodSmallData[0]));
      $('.pm002 .bindType').html(_tmpls['bindType'](bindTypeData[0]));
      $('.pm002 .bindSon').html(_tmpls['bindSon'](bindSonData[0]));
      $('.pm002 .colorStandard').html(_tmpls['colorStandard'](colorStandardData[0]));
      $('.pm002 .colormatchStandard').html(_tmpls['colormatchStandard'](colormatchStandardData[0]));
      $('.pm002 .paperType').html(_tmpls['paperType'](paperTypeData[0]));
      $('.pm002 .partMsg').html(_tmpls['partMsg'](partMsgData[0]));
    }).then(function () {
      var $opt_sel = $("#asd");
      EL.log("-----------",$opt_sel);
      $opt_sel.on("change", function(){
        EL.log(this);
        var $this = $(this);
        if($this.val() === "1002"){
          $('.pm002 .el-msg-addProdBtn .book').removeClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .magazine').addClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .packaging').addClass('el-hide');
        }else if($this.val() === "1003"){
          $('.pm002 .el-msg-addProdBtn .magazine').removeClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .book').addClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .packaging').addClass('el-hide');
        }else if($this.val() === "1005"){
          $('.pm002 .el-msg-addProdBtn .packaging').removeClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .book').addClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .magazine').addClass('el-hide');
        }else{
          $('.pm002 .el-msg-addProdBtn .book').addClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .packaging').addClass('el-hide');
          $('.pm002 .el-msg-addProdBtn .magazine').addClass('el-hide');

        }
      });
    })
  }


  function listenListClick() {
    $('.pm002 .search-toggle-btn ').on('click', function () {
      $(this).find('i').toggleClass("fa-plus");
      $(this).find('i').toggleClass("fa-minus");
      $('.pm002 .search-toggle-content').toggle();
    });

    $('.pm002 .navbarbtn > .form-group> .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
      view(viewId);
    });

    $('.pm002 >.editView  .panel-heading .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
      view(viewId);
    });


    $('.pm002 .listView  .quoteTable').on('click',function(){
     /*var objValue=$(this).parent().parent().attr("data-view-value");*/
      view("editView");
    });


    //退回页面-确认按钮事件
    $(".pm002 .el-msg-returnBtn .modal-footer .return").click(function () {
      var textareaContent = $(".pm002 .modal-body .orderPriceBackTextarea").val();
      if (!textareaContent) {
        //EL.view('el-msg-tip');
        $('.pm002 .msg-tip').addClass('el-hide');
        $('.pm002 .msg-tip').removeClass('el-hide');
        return false;
        //EL.msg('请填写退回原因','green');
      }
      else {
        view('listView');
      }
    });


    $('.pm002>.editView  .addFieldset  .btn').on('click', function () {
      var viewId = $(this).attr('data-view-id');
      view(viewId);
    });

    $('.pm002>.editView .panel-heading  .returnList').on('click', function () {
      //view('listView');
      optClass('listView');
    });

    $('.pm002>.printView .panel-heading > .btn').on('click', function () {
      //view('listView');
      optClass('editView');
    });

  }

  /*function listenEditClick() {

  }*/


function enterPay() {
   $.when(
    EL.get('api/mock/pm002_enterPay')
  ).then(function (enterPayData) {
    EL.log("!!!!!!!!!!!!!!!!",enterPayData);
    $('.enterPay').html(_tmpls['enterPay'](enterPayData));
  })/*.then(function() {
     var $data_tbl = $(".pm002 .el-msg-enterPayBtn .table");
     EL.log("enterPay---------->", $data_tbl);
     $.each($data_tbl.find("tr"), function () {
       var $this = $(this);

       var inputNum = $this.find("td:eq(2)").text();

       if(inputNum === "0"){
         console.log(" -- ", inputNum);
         $this.find("input").attr('readOnly',true);
       }
     })
   })*/
}

  function addProds() {
    return $.when(
      EL.get('api/mock/pm002_addProds')
    ).then(function (addProdsData) {
      EL.log("!!!!!!!!!!!!!!!!",addProdsData);
      $('.pm002 .addProds').html(_tmpls['addProds'](addProdsData));
    });
  }



  function loadDblData() {
    return $.when(
      EL.get('api/mock/pm002_proDemd'),
      EL.get('api/mock/pm002_packDemd'),
      EL.get('api/mock/pm002_transDemd'),
      EL.get('api/mock/pm002_printView'),
      EL.get('api/mock/pm002_print2View')
    ).then(function (proDemdData, packDemdData, transDemdData, printData, print2Data) {
      EL.log("print2Data",print2Data);
      $('.pm002_proDemd').html(_tmpls['proDemdView'](proDemdData[0]));
      $('.pm002_packDemd').html(_tmpls['packDemdView'](packDemdData[0]));
      $('.pm002_transDemd').html(_tmpls['transDemdView'](transDemdData[0]));
      $('.pm002_product').html(_tmpls['printView'](printData[0]));
      $('.pm002_products').html(_tmpls['print2View'](print2Data[0]));
    });
  }


  function loadChangeData() {
    return $.when(
      EL.get('api/mock/pm002_change')//变更
    ).then(function (changeData){
      $('.pm002 .change').html(_tmpls['change'](changeData));
    })
  }

function payDetail() {
  return $.when(
    EL.get('api/mock/pm002_paperCost'),//纸张费用
    EL.get('api/mock/pm002_accessCost'),//辅料费用
    EL.get('api/mock/pm002_printCost'),//印刷费用
    EL.get('api/mock/pm002_dealCost'),//表面处理费用
    EL.get('api/mock/pm002_bindCost'),//装订费用
    EL.get('api/mock/pm002_handCost'),//手工费用
    EL.get('api/mock/pm002_printlnCost'),//印前费用
    EL.get('api/mock/pm002_packCost'),//包装费用
    EL.get('api/mock/pm002_transCost')//物流费用
  ).then(function (paperCostData, accessCostData, printCostData, dealCostData, bindCostData, handCostData, printlnCostData, packCostData, transCostData) {
    $('.pm002 .paperCost').html(_tmpls['paperCost'](paperCostData[0]));
    $('.pm002 .accessCost').html(_tmpls['accessCost'](accessCostData[0]));
    $('.pm002 .printCost').html(_tmpls['printCost'](printCostData[0]));
    $('.pm002 .dealCost').html(_tmpls['dealCost'](dealCostData[0]));
    $('.pm002 .bindCost').html(_tmpls['bindCost'](bindCostData[0]));
    $('.pm002 .handCost').html(_tmpls['handCost'](handCostData[0]));
    $('.pm002 .printlnCost').html(_tmpls['printlnCost'](printlnCostData[0]));
    $('.pm002 .packCost').html(_tmpls['packCost'](packCostData[0]));
    $('.pm002 .transCost').html(_tmpls['transCost'](transCostData[0]));
  });
}

function optClass(viewId) {
  $('.pm002> .view').addClass('el-hide');
  $('.pm002> .' + viewId).removeClass('el-hide');
}


  /**
   * radio当checkbox使用
   */
  var radioToCheckbox = function (selector ,singleSelect) {
    // 初始化参数
    var $radio = $(selector);
    // 对name属性进行处理
    var name = $radio.attr("name");
    EL.log("----------",name);
    var valueArray = [];
    if (name instanceof Array) {
      return;
    }
    // 循环第一次获得所有radio的值,将名称移除，值归类
    if (!singleSelect) {// 单选取消
      $.each($radio, function () {
        $(this).has("name") || $(this).removeAttr("name");
        valueArray.push($(this).val() || "");
      });

      $.each($radio, function (index) {
        var tempradio = null;
        $(this).on("click", function () {
          // 用假节点替换真节点使选中取消
          if (tempradio == this) {
            tempradio.checked = false;
            tempradio = null;
          } else {
            tempradio = this;
          }
        });
      });
    }

  };



//视图
function view(viewId) {
  if (viewId === 'listView') {
    optClass(viewId);
    EL.table(listView_reqProxy);
  }else if(viewId === 'editView'){
    $('.pm002 >.editView  .printProd').removeClass('el-hide');
    $('.pm002 >.editView  .prods').removeClass('el-hide');
    $('.pm002 >.editView  .pm002_proDemd').removeClass('el-hide');
    $('.pm002 >.editView  .pm002_packDemd').removeClass('el-hide');
    $('.pm002 >.editView  .pm002_transDemd').removeClass('el-hide');
    optClass(viewId);
    loadDblData();
  }
  else if (viewId === 'createPriceBtn') {
     $('.pm002 >.editView  .printProd').addClass('el-hide');
     $('.pm002 >.editView  .prods').addClass('el-hide');
    $('.pm002 >.editView  .pm002_proDemd').addClass('el-hide');
    $('.pm002 >.editView  .pm002_packDemd').addClass('el-hide');
    $('.pm002 >.editView  .pm002_transDemd').addClass('el-hide');
    optClass('editView');
    /*loadDblData();*/
    /*listenEditClick();*/
    EL.dtp('.pm002>.editView .el-dtp');
  }else if(viewId === 'saveBtn'){
    El.msg("保存成功");
    view("editView");
  }else if(viewId === 'passBtn'){
    optClass('listView');
  }else if(viewId === 'enterPayBtn'){
    $(".pm002 .el-msg-enterPayBtn").modal();
    enterPay();
    $(".pm002 .el-msg-enterPayBtn .commit").on('click',function () {
     view('listView');
    });
    /*if(){
    }*/
  } else if (viewId === 'payDetailBtn') {
    $(".pm002 .el-msg-payDetailBtn").modal();
    payDetail();
  } else if (viewId === 'returnBtn') {
    $(".pm002 .modal-body .orderPriceBackTextarea").val("");
    $('.pm002 .msg-tip').addClass('el-hide');
    $(".pm002 .el-msg-returnBtn").modal();
  }else if (viewId === 'addPro'){
    $(".pm002 .el-msg-addProdBtn").modal();
    $(".pm002 .el-msg-addProdBtn .sure").on('click',function () {
      $('.pm002 >.editView  .printProd').removeClass('el-hide');
      loadDblData();
    });
    EL.log("进来addpro了");
    loadPartMsgDate();
    /*EL.table(partMsg_reqProxy);*/
  }else if (viewId === 'addProds'){
    $(".pm002 .el-msg-addProdsBtn").modal();
    addProds();
    $(".pm002 .el-msg-addProdsBtn .commit").on('click',function () {
      $('.pm002 >.editView  .prods').removeClass('el-hide');
      loadDblData();
    });
  }else if(viewId === 'jumpOrder'){
    optClass('printView');
    loadDblData();
  }else if(viewId === 'changeBtn'){
    $(".pm002 .el-msg-changeBtn").modal();
    loadChangeData();
  }
}

function init() {
  $('.pm002> .hbs').each(function () {
    var $hbs = $(this), viewId = $hbs.data('viewId');
    _tmpls[viewId] = Handlebars.compile($hbs.html());
  });
  view('listView');

}
return init;
});
