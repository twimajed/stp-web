/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var selected;

  function renderSelectable (results) {
    var tablesTmpl = Handlebars.compile($('.ui010 .hbs-selectable').html());
    $('.ui010 .table-selectable .el-tbody').html(tablesTmpl(results));

    selected = EL.multiSelect({
      selector: '.ui010 .table-multiselect',
      callback: renderSelection,
      items: results
    });
  }

  function renderSelection (results) {
    var tablesTmpl = Handlebars.compile($('.ui010 .hbs-selection').html());
    $('.ui010 .table-selection .el-tbody').html(tablesTmpl(results));
  }

  function init () {
    EL.table({
      /*[必填]*/url: 'api/mock/ui008',
      /*[必填]*/callback: renderSelectable,
      /*[必填]*/selector: '.ui010 .table-selectable',
      /*[可选]*/width: 300//或者class
    });

    EL.table({
      /*[必填]*/selector: '.ui010 .table-selection',
      /*[可选]*/width: 300//或者class
    });

    $('.submit-btn').on('click', function () {
      EL.log(selected);
      EL.msg(['选中了' + selected.length + '项']);
    });
  }

  return init;

});
