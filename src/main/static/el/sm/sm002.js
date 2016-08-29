/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm002_table1').html());
    $('.sm002_data1').html(tablesTmpl(results));

    $("input[name=sm002_table1]:eq(0)").attr("checked",'checked');
    }

    var _reqProxy = {
      url: 'api/mock/sm002_listView',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.sm002 .panel .sm002-listView-table',
      pagingSelector: '.sm002  .stp-paging-sm002',
      trigger: '.sm002 .search-btn',
      immediately: true
    };
    function argsBuilder () {
      var condition = {
          test: 'test'
    };
    return condition;
    }
    function init () {
      EL.paging(_reqProxy);
      EL.dtp('.sm002 .el-dtp');
      var _tmpl = Handlebars.compile($('#sm002_table2').html());
      EL.get('api/mock/sm002_editView')
        .then(function (json) {
          $('.sm002_data2').html(_tmpl(json));
          EL.dtp('.sm002 .el-dtp');
        });
        $('#sm002-2-removeBtn').on('click', function() {

                 var checkList = $("input[name='checkItem']:checked");
                  if(checkList.length<=0){
                   EL.msg('至少选择一行!');
                   return false;
                 }else{
                    var ids = "";
                    for (var i = 0; i < checkList.length; i++) {
                      $(checkList[i]).parents('tr').remove();
                    }
                 }
               });
      }
      return init;
    });
