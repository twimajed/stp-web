
define(function (require) {

  return {
    name: function() {
      return 'Demo Calculator';
    },
    '+': function (a, b) {
      return a + b;
    },
    '-': function (a, b) {
      return a - b;
    },
    '*': function (a, b) {
      return a * b;
    },
    '/': function (a, b) {
      return a / b;
    }
  };

});
