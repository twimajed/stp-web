/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function renderTable2(results) {
    var tablesTmpl = Handlebars.compile($('#summary_table').html());
    $('.summary_data').html(tablesTmpl(results));
    $("input[name=fc007_table1]:eq(0)").attr("checked", 'checked');
    return listenClick();
  }

  function listenClick() {
    $('#detail_btn').on('click', function () {
      var _tmpl = Handlebars.compile($('#detail_table').html());
      EL.get('api/mock/fc007detail')
        .then(function (json) {
          $('.detail_data').html(_tmpl(json));
        });
      $('#listEditDiv').addClass('hide');

    });
    $('#summary_btn').on('click', function () {
      $('#listEditDiv').removeClass('hide');
    });
    $('.summary_data > tr').on('dblclick', function () {
      $('#detail_btn').click();

    });
  }

  var _reqProxy2 = {
    url: 'api/mock/fc007summary',
    argsBuilder: argsBuilder,
    callback: renderTable2,
    selector: '.fc007 .panel .stp-table-fc007_2',
    pagingSelector: '.fc007 .panel .stp-paging-fc007_2',
    trigger: '.fc007 .search-btn',
    immediately: true
  };

  function argsBuilder() {
    var condition = {

      };
    return condition;
  }

  function init() {
    EL.paging(_reqProxy2);
    EL.dtp('.fc007 .el-dtp');
  }

  return init;

});
