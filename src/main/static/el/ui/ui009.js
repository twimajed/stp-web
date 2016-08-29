/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init () {
    EL.suggestion({
      /*[必填]*/url: 'api/mock/ui009',
      /*[必填]*/selector: '.ui009 input.suggestion'
    });
  }

  return init;

});
