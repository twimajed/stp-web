/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _reqProxy = {
    url: 'api/mock/om005',
    callback: renderTable,
    selector: '.om005 .om005-listView-table',
    pagingSelector: '.om005 .om005-listView-paging',
    //argsBuilder : argsBuilder,
    trigger: '.om005 .om005-listView-searchBtn',
    immediately: true,
    width: 1121
  };

  function argsBuilder() {
    var condition = {};
    return condition;
  }

  function renderTable(results) {
    var tablesTmpl = Handlebars.compile($('#om005-listViewTpl').html());
    $('#om005-listViewData').html(tablesTmpl(results));

  }
  function collapse(){
      //收缩按钮
      $('#om005-collapse-btn').on('click', function () {
        $(this).find('i').toggleClass("fa-plus");
        $(this).find('i').toggleClass("fa-minus");
        $(this).parent().find('.search-toggle-content').toggle();
      });
  }

  function init() {
    EL.dtp('.om005 .el-dtp');
    collapse();
    EL.paging(_reqProxy);
  }

  return init;

});
