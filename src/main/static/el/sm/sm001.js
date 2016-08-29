define(function (require) {

  function renderTable (results) {
    var tablesTmpl = Handlebars.compile($('#sm001_table').html());
    $('.sm001_data').html(tablesTmpl(results));
  }

  var _reqProxy = {
    url: 'api/mock/sm001',
    argsBuilder: argsBuilder,
    callback: renderTable,
    selector: '.sm001 .panel .stp-table-sm001',
    pagingSelector: '.sm001 .stp-paging-sm001',
    trigger: '.sm001 .search-btn',
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
    EL.dtp('.sm001 .el-dtp');
  }
    return init;
});
