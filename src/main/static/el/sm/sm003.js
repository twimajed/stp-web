define(function (require) {

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm003_table').html());
    $('.sm003_data').html(tablesTmpl(results));
    }

    var _reqProxy = {
      url: 'api/mock/sm003',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.sm003 .panel .stp-table-sm003',
      pagingSelector: '.sm003 .stp-paging-sm003',
      trigger: '.sm003 .search-btn',
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
      EL.dtp('.sm003 .el-dtp');
      EL.dtp('.sm003 .el-dtp');
      }
      return init;
    });
