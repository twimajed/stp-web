/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

var EL = {

  // 应用上下文
  ctxt: {
    name: '盛通印刷云平台',
    lang: 'zh-CN',
    root: '/',
    csrf: void 0 // {param: '_csrf', value: ...}
  },

  // 空函数
  nop: function () {},

  // 取代 console.log
  log: console.log.bind(console),

  // 变成整数
  num: function (str) {
    return str ? parseInt(str, 10) || 0 : 0;
  },
  // 变成浮点
  flt: function (str) {
    return str ? parseFloat(str) || 0 : 0;
  },

  // 加操作(默认加1)
  inc: function (num, inc) {
    var n = typeof num === 'number' ? num : parseInt(num, 10);
    if (n === NaN) return 'n/a';
    var i = typeof inc === 'number' ? inc : 1;
    return n + i;
  },

  // 金额保留几位小数(默认2位)
  dec: function (num, dec) {
    var n = typeof num === 'number' ? num : parseInt(num, 10);
    if (n === NaN) return 'n/a';
    var d = typeof dec === 'number' ? dec : 2;
    return n.toFixed(d);
  },

  // 请求路径
  url: function (path) {
    return EL.ctxt.root + (path || '');
  },
  // 跳转
  go: function (path) {
    window.location = EL.url(path);
  },
  // Ajax请求
  _ajax: function (fn, path, args) {
    return fn(EL.url(path), args).fail(function (jqXHR) {
      var statusCode = jqXHR.status;
      if (statusCode) {
        if (statusCode === 401) {
          EL.msg('访问超时, 请重新登录.').then(EL.go);
        }
        else if (statusCode === 500) {
          EL.msg('系统出错, 请联系管理员.');
        }
        else {
          EL.err('非法访问!'); //.then(EL.go);
        }
      }
    });
  },
  // 做一个 GET Ajax请求
  get: function (path, args) {
    return EL._ajax($.get, path, args);
  },
  // 做一个 POST Ajax请求
  post: function (path, args) {
    var csrf = EL.ctxt.csrf;
    if (csrf) {
      args = args || {};
      args[csrf.name] = csrf.value;
    }
    return EL._ajax($.post, path, args);
  },

  // 系统通知
  notify: function (txts, time) {
    if (!Notification) return false;
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    else {
      var notification = new Notification(EL.ctxt.name, {
        icon: EL.ctxt.logo,
        body: EL._txts(txts).join('\n'),
      });
      time !== 0 && setTimeout(
        notification.close.bind(notification), time || 5000);
    }
    return true;
  }

};

(function() {

  /*---------------------+
  |   JS LOADER CONFIG   |
  +=====================*/

  SystemJS.defaultJSExtensions = true;
  SystemJS.config({
    baseURL: EL.url(),
    map: {
      lib: 'static/el/lib'
    }
  });

  /*---------------------+
  |   COMMON TEMPLATES   |
  +=====================*/

  // Usage: {{inc @index}}
  Handlebars.registerHelper('inc', EL.inc);

  // Usage: {{dec money}}, {{dec price 4}}
  Handlebars.registerHelper('dec', EL.dec);

  // Model: {codeNames: [{code, name}]}
  // Usage: {{opt codeNames codeSelected}}
  Handlebars.registerHelper('opt', function (codeNames, codeSelected) {
    return new Handlebars.SafeString(_opts(codeNames, codeSelected));
  });
  // 生成 <option /> 元素
  function _opt(codeName, code) {
    return '<option value="' + codeName.code +
      (codeName.code === code ? '" selected>' : '">') +
      codeName.name + "</option>"
  }
  // 生成多个 <option /> 元素
  function _opts(codeNames, code) {
    if (!codeNames || !codeNames.length) return '';
    if (codeNames.length === 1) return opt(codeNames[0], code);
    var h = '';
    for (var i = 0, n = codeNames.length; i < n; i++) {
      h += _opt(codeNames[i], code);
    }
    return h;
  }

})();

$(function () {

  /*------------------------+
  |   COMMON INTERACTIONS   |
  +========================*/

  $('.el-quit').on('click', function () {
    EL.ask('真的要退出吗?').then(function () {
        // TODO LOGOUT
        EL.log('Yes, I will quit soon.');
      })
      .fail(function () {
        EL.log('No, I have something to do.');
      });
  });
  $('.el-home').on('click', function () {
    EL.go();
  });
  $('.el-back').on('click', function () {
    var url = $(this).data('url');
    url ? EL.go(url) : history.back();
  });

});
