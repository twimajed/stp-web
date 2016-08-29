module.exports = function items(args) {

  console.log(args);

  var results = [], data = [
    {code: 'Mouth', name: 'Mouth'},
    {code: 'Will', name: 'Will'},
    {code: 'Billy', name: 'Billy'},
    {code: 'Conway', name: 'Conway'},
    {code: 'Max', name: 'Max'},
    {code: 'Josh', name: 'Josh'},
    {code: 'Cindy', name: 'Cindy'},
    {code: 'Hao', name: 'Hao'}
  ];

  for (var i = 0, len = data.length; i < len; i++) {
    if (data[i].name.indexOf(args.key) !== -1) {
      results.push(data[i]);
    }
  }

  return results;
};
