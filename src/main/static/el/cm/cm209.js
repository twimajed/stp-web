/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
    return EL.get('api/mock/cm209_'+viewId)
      .then(function (data) {
        return $('.cm209>  .' + viewId).html(_tmpls[viewId](data));
      });
  }

//视图函数
  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.cm209> .view').addClass('hide');
      $view.removeClass('hide');
      if (viewId === 'listView') {
        loadSelectData().then(function () {
        EL.dtp('.cm209 .el-dtp'); //日期
        return listenClick();//监听页面点击事件
        });
      }else if(viewId === 'dblView'){//
        backTableList();
        loadDblData();
        btnFrameList();
      }
    });
  }

  //返回公司查询
    function backTableList(){
      $('.cm209 .panel-heading > .returnList').on('click', function () {
        view('listView');
      });
    }

    //加载公司查询-产能数据，印刷订单，工艺价格的数据
      function loadDblData(){
        return $.when(
          EL.get('api/mock/cm210'),
          EL.get('api/mock/cm210_1'),
          EL.get('api/mock/cm210_2'),
          EL.get('api/mock/cm210_3'),
          EL.get('api/mock/cm210_4'),
          EL.get('api/mock/cm210_5')
        ).then(function (cm210,cm210_1,cm210_2,cm210_3,cm210_4,cm210_5) {

          EL.log(cm210,cm210_1,cm210_2,cm210_3,cm210_4,cm210_5);
          $('.cm210_data').html(_tmpls['cm210_table'](cm210[0]));
          $('.cm210_data_1').html(_tmpls['cm210_table_1'](cm210_1[0]));
          $('.cm210_data_2').html(_tmpls['cm210_table_2'](cm210_2[0]));
          $('.cm210_data_3').html(_tmpls['cm210_table_3'](cm210_3[0]));
          $('.cm210_data_4').html(_tmpls['cm210_table_4'](cm210_4[0]));
          $('.cm210_data_5').html(_tmpls['cm210_table_5'](cm210_5[0]));
        });
      }

      //按钮组事件
        function btnFrameList() {
          $('.cm209 .btn').on('click', function () {
            var viewid=$(this).data('viewId');
            if(viewid==='queryProBtn'){
              var dlgModal = $('.cm209 .dblView .selectPaperViewModal');
              dlgModal.find('.modal-body').html(_tmpls['selectPaperView']());
              dlgModal.find('.modal-content').css("width","1000px").css("left","-200px");
              dlgModal.modal();
            }
          });
        }

  //监听事件
    function listenClick() {
      //每行数据绑定双击事件
      $('.cm209 .listView .orderSearchTable').on("click",function(){
        var objValue=$(this).parent().parent().attr("data-view-value");
        EL.log($(this).data('viewId'));
        view($(this).parent().parent().data('viewId'));
      });

      //隐藏、显示
      $('.cm209 .search-toggle-btn').on('click', function () {
        $(this).find('i').toggleClass("fa-plus");
        $(this).find('i').toggleClass("fa-minus");
        $('.cm209 .search-toggle-content').toggle();
      });
    }

  //select数据
    function loadSelectData() {
      return $.when(
        //公司查询的select数据
        EL.get('api/mock/cm209_manuStatus')
      ).then(function (manuStatus) {
        EL.log(manuStatus);
        $('.manuStatus').append(_tmpls['manuStatus'](manuStatus));
      });
    }

  function init() {

    $('.cm209> .hbs').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    view('listView');
  }
  return init;

});
