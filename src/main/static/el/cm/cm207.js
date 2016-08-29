/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
    return EL.get('api/mock/cm207_'+viewId)
      .then(function (data) {
        return $('.cm207>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

//视图函数
  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.cm207> .view').addClass('hide');
      $view.removeClass('hide');
      if (viewId === 'listView') {
        loadSelectData().then(function () {
        return listenClick();//监听页面点击事件
        });
      }else if(viewId === 'dblView'){//
        backTableList();
        btnFrameList(); // 按钮组
        btnList(); //tab 按钮组事件
        loadDblData().then(function () {
         // productDetailPanelBtn();
        });
      }
    });
  }

  //点击产品明细，显示产能需求事件
  //   function productDetailPanelBtn(){
  //     $('.cm207 .productBtn > .table > tbody > tr').on('dblclick', function () {
  //       $('.cm207 .productNeedBtn').removeClass('hide');
  //     });
  //   }

  //select数据
    function loadSelectData() {
      return $.when(
        //生产管理的select数据 (两个)
        EL.get('api/mock/cm207_paperAppr')
      ).then(function (paperAppr) {
        EL.log(paperAppr);
        $('.paperAppr').append(_tmpls['paperAppr'](paperAppr));
        $('.prodAppr').append(_tmpls['prodAppr'](paperAppr));
      });
    }

    //返回公司查询
      function backTableList(){
        $('.cm207 .panel-heading > .btn').on('click', function () {
          view('listView');
        });
      }


      //弹框按钮 事件
        function btnFrameList(){
          $('.cm207 .btn').on('click', function () {
            var viewid=$(this).data('viewId');
            if(viewid==='cancelBtn'){
              EL.ask('是否取消？');
            }// end if
            else if(viewid==='fileInfo'){
               EL.ask('是否确认？');
            }// end else if
            else if(viewid==='fileQuery'){
              var dlgModal = $('.cm207 .dblView .selectProductMsgModal');
              dlgModal.find('.modal-body').html(_tmpls['productMsgView']());
              dlgModal.find('.modal-content').css("width","1000px").css("left","-200px");
              dlgModal.modal();
            }// end else if
            else if(viewid==='pageSub'){
              var id = $('.cm207 .pageCheck_data input[name="pageCheck_table_data"]:checked').val();
              if(!id){
                EL.msg('请先选择','green');
              }else {
                EL.ask('是否确认？');
              }
            }// end else if
            else if(viewid==='pageQuery'){
              var dlgModal = $('.cm207 .dblView .selectPaperCheckModal');
              dlgModal.find('.modal-body').html(_tmpls['selectPaperView']());
              dlgModal.find('.modal-content').css("width","1000px").css("left","-200px");
              dlgModal.modal();
              //EL.msg('纸张信息','green');
            }// end else if
          })
        }


      //切换按钮 事件
        function btnList(){
          $('.cm207 .btn').on('click', function () {
            var viewid=$(this).data('viewId');
            var btn_txt=$(this).text();
            if(viewid==='proBtn'){
              if(btn_txt === '报工'){
                $(this).text('保存');
                $('.cm207> .view .proSave').removeClass('hide');
              }else{
                $(this).text('报工');
                $('.cm207> .view .proSave').addClass('hide');
              } //end else
            }// end if
            else if(viewid==='recBtn'){
              if(btn_txt === '新增'){
                $(this).text('保存');
                $('.cm207> .view .recSave').removeClass('hide');
              }else{
                $(this).text('新增');
                $('.cm207> .view .recSave').addClass('hide');
              } //end else
            }// end else if
            else if(viewid==='ducBtn'){
              if(btn_txt === '入库'){
                $(this).text('保存');
                $('.cm207> .view .ducSave').removeClass('hide');
              }else{
                $(this).text('入库');
                $('.cm207> .view .ducSave').addClass('hide');
              } //end else
            }// end else
          })
        }

      //加载公司查询-产能数据，印刷订单，工艺价格的数据
        function loadDblData(){
          return $.when(
            //主面板的产品明细
            EL.get('api/mock/cm208'),
            //主面板的产能需求
            EL.get('api/mock/cm208ProductRequire'),
            //文件检查
            EL.get('api/mock/cm208fileCheck'),
            //纸张检查 cm208pageCheck
            EL.get('api/mock/cm208pageCheck'),
            //生产报工
            EL.get('api/mock/cm208product'),
            //记录上报
            EL.get('api/mock/cm208record'),
            //完工入库
            EL.get('api/mock/cm208finish')
          ).then(function (commonProductDetail,commonProductRequire,fileCheck,pageCheck,product,record,finish) {
            EL.log(commonProductDetail,commonProductRequire,fileCheck,pageCheck,product,record,finish);
            $('.commonProductDetail_data').html(_tmpls['commonProductDetail_table'](commonProductDetail[0]));
            $('.commonProductRequire_data').html(_tmpls['commonProductRequire_table'](commonProductRequire[0]));
            $('.fileCheck_data').html(_tmpls['fileCheck_table'](fileCheck[0]));
            $('.fileProductRequire_data').html(_tmpls['fileProductRequire_table'](commonProductRequire[0]));
            $('.pageCheck_data').html(_tmpls['pageCheck_table'](pageCheck[0]));
            $('.product_data').html(_tmpls['product_table'](product[0]));
            $('.record_data').html(_tmpls['record_table'](record[0]));
            $('.finish_data').html(_tmpls['finish_table'](finish[0]));
            $('.productSave_data').html(_tmpls['productSave_table'](product[0]));
            $('.recordSave_data').html(_tmpls['recordSave_table'](record[0]));
            $('.finishSave_data').html(_tmpls['finishSave_table'](finish[0]));
          });
        }


        //监听事件
          function listenClick() {
            //每行数据绑定双击事件
            $('.cm207 .listView .productionTable').on("click",function(){
              var objValue=$(this).parent().parent().attr("data-view-value");
              EL.log($(this).data('viewId'));
              view($(this).parent().parent().data('viewId'));
            });

            //隐藏、显示
            $('.cm207 .search-toggle-btn').on('click', function () {
              $(this).find('i').toggleClass("fa-plus");
              $(this).find('i').toggleClass("fa-minus");
              $('.cm207 .search-toggle-content').toggle();
            });
          }




  function init() {
    $('.cm207> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }
  return init;

});
