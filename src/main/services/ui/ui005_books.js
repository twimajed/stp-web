module.exports = function books(q) {
  var results = [
    {color: 'blue', code: 'A', name: 'Clean Code', isbn: '978-7-115-37675-1'},
    {color: 'orange', code: 'B', name: 'Refactor', isbn: '978-7-115-37675-2'},
    {color: 'purple', code: 'C', name: 'Domain-Driven Design', isbn: '978-7-115-37675-3'}
  ];
  q.rev && results.reverse();
  return results;
};
