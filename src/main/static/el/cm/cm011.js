/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    var _tmpl = Handlebars.compile($('.cm011 .order_table_body').html());
    EL.get('api/mock/cm011')
      .then(function (json) {
        $('.cm011 .order_data').html(_tmpl(json));
      });
    $('.cm011 .agreeBtn').on("click",function () {
      var id = $('.cm011 .order_data input[name="cm011_table"]:checked').val();
      if(!id){
        EL.msg('请先选择核价信息！','green');
      }else{
        EL.msg('同意核价成功！','green');
      }
    });
    $('.cm011 .returnBtn').on("click",function () {
      var id = $('.cm011 .order_data input[name="cm011_table"]:checked').val();
      if(!id){
        EL.msg('请先选择核价信息！','green');
      }else{
        $(".cm011 .el-msg-returnBtn").modal();
      }
    });

    $(".cm011 .modal-footer .ok").click(function () {
      var textareaContent=$(".cm011 .modal-body .orderPriceBackTextarea").val();
      var orderId = $('.cm011 .listView-data input[name="cm011_table"]:checked').val();
      if(!textareaContent){
        //EL.view('el-msg-tip');
        $('.cm011 .el-msg-tip').addClass('el-hide');
        $('.cm011 .el-msg-tip').removeClass('el-hide');
        $(".cm011 .modal-body").append($(".cm011 .el-msg-tip"));
        return false;
      }else{
        EL.msg('退回成功！','green');
      }
    });
  }
  return init;
});
