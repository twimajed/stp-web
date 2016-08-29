/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */
define(function (require) {

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm006_table1').html());
    $('.sm006_data1').html(tablesTmpl(results));

    $("input[name=sm006_table1]:eq(0)").attr("checked",'checked');
    }

    var _reqProxy = {
      url: 'api/mock/sm006_listView',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.sm006 .panel .sm006-listView-table',
      pagingSelector: '.sm006  .stp-paging-sm006',
      trigger: '.sm006 .search-btn',
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
      EL.dtp('.sm006 .el-dtp');
      var _tmpl = Handlebars.compile($('#sm006_table2').html());
      EL.get('api/mock/sm006_editView')
        .then(function (json) {
          $('.sm006_data2').html(_tmpl(json));
          EL.dtp('.sm006 .el-dtp');
        });
      }
      return init;
    });
