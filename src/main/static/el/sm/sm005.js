/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {
  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm005_table').html());
      $('.sm005_data').html(tablesTmpl(results));
      $('.dateFrom').datepicker({
        todayHighlight: true,
        autoclose: true
      });
      $('.dateTo').datepicker({
        todayHighlight: true,
        autoclose: true
      });
    }

    var _reqProxy = {
      url: 'api/mock/sm005',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.sm005 .panel .stp-table-sm005',
      pagingSelector: '.sm005 .stp-paging-sm005',
      trigger: '.sm005 .search-btn',
      immediately: true
    };
    function argsBuilder () {
      var condition = {
        test: 'test'
      };
      return condition;
    }
    Handlebars.registerHelper("substring",function(str, start, end) {
        if(typeof str === 'string'){
            if(str.length>end) {
                return str.substring(start,end)+'...';
            }else{
                return str;
            }
        }else{
            return "";
        }
    });
    function init () {
      EL.paging(_reqProxy);
      EL.dtp('.sm005 .el-dtp');
    }
    return init;
  });
