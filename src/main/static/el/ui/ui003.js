/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _reqProxy = {
    /*[必填]*/url: 'api/mock/ui003',
    /*[必填]*/callback: renderTable,
    /*[必填]*/selector: '.ui003 .table-example',
    /*[必填]*/pagingSelector: '.ui003 .stp-paging-name',
    // /*[可选]*/argsBuilder: argsBuilder,
    // /*[可选]*/trigger: '.ui003 .search-btn',
    // /*[可选]*/immediately: false
    // /*[可选]*/width: 900//或者class
  };

  function init () {
    EL.table(_reqProxy);
  }

  function argsBuilder () {
    var condition = {
      test: 'test'
    };
    return condition;
  }

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('.ui003 .hbs-tables').html());
    $('.ui003 .table-example .el-tbody').html(tablesTmpl(results));
  }

  return init;

});
