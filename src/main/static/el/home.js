/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init() {
    // 引用: lib/ui/calculator
    var calculator = require('lib/ui/calculator');
    EL.log('Hello ' + calculator.name() + ' - Powered by SystemJS!');

    // 报红
    EL.red('此处显示报错信息 ...');
  }

  return init;
});
