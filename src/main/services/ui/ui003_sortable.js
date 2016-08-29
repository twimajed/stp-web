module.exports = function tableItems(q) {

  var results =  [
    {engine: 'Presto1', browser: 'Opera 9.5', platform: 'Win 88+ / OSX.3+', version: '-', grade: '	A'},
    {engine: 'Presto2', browser: 'Opera 9.0', platform: 'Win 95+ / OSX.3+', version: '-', grade: '	A'},
    {engine: 'Presto3', browser: 'Opera for Wii', platform: 'Wii', version: '-', grade: '	A'},
    {engine: 'Presto4', browser: 'Opera 8.5', platform: 'Win 95+ / OSX.2+', version: '-', grade: '	A'},
    {engine: 'Presto5', browser: 'Nokia N800', platform: 'N800', version: '-', grade: '	A'},
    {engine: 'Presto6', browser: 'Opera 9.2', platform: 'Win 88+ / OSX.3+', version: '-', grade: '	A'},
    {engine: 'Presto7', browser: 'Internet Explorer 4.5', platform: 'Mac OS 8-9', version: '-', grade: '	X'},
    {engine: 'Presto8', browser: 'Nokia N800', platform: 'N800', version: '-', grade: '	A'},
    {engine: 'Presto9', browser: 'Opera 9.2', platform: 'Win 88+ / OSX.3+', version: '-', grade: '	A'},
    {engine: 'Presto10', browser: 'Internet Explorer 4.5', platform: 'Mac OS 8-9', version: '-', grade: '	X'}
  ];

  console.log(q.type, q.field);

  q.type !== 'asc' && results.reverse();
  return {
    results: results,
    paging: {
      pageIndex: 1,
      pageCount: 1,
      pages: [1]
    }
  };
};
