define(function (require) {

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm004_table').html());
    $('.sm004_data').html(tablesTmpl(results));
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
      url: 'api/mock/sm004',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.sm004 .panel .stp-table-sm004',
      pagingSelector: '.sm004 .stp-paging-sm004',
      trigger: '.sm004 .search-btn',
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
      EL.dtp('.sm004 .el-dtp');
      }
      return init;
    });
