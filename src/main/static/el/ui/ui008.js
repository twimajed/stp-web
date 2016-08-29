/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _reqProxy = {
    /*[必填]*/url: 'api/mock/ui008',
    /*[必填]*/callback: renderTable,
    /*[必填]*/selector: '.ui008 .table-example',
    // /*[可选]*/argsBuilder: argsBuilder,
    // /*[可选]*/trigger: '.ui008 .search-btn',
    // /*[可选]*/immediately: true
    // /*[可选]*/width: 900//或者class
  };

  function argsBuilder () {
    var condition = {
      test: 'test'
    };
    return condition;
  }

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('.ui008 .hbs-tables').html());
    $('.ui008 .table-example .el-tbody').html(tablesTmpl(results));
  }

  //--------------------------------------------------------------------

  var _reqProxy2 = {
    /*[必填]*/url: 'api/mock/ui008',
    /*[必填]*/callback: renderTable2,
    /*[必填]*/selector: '.ui008 .table-example2',
    /*[可选]*/width: 900//或者class
  };

  function renderTable2 (results) {
    var tablesTmpl = Handlebars.compile($('.ui008 .hbs-tables2').html());
    $('.ui008 .table-example2 .el-tbody').html(tablesTmpl(results));
  }

  function init () {
    EL.table(_reqProxy);
    EL.table(_reqProxy2);
  }

  return init;

});
