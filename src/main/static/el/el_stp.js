

/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

/*------------------+
 |   STP UI COMMON   |
 +==================*/

// 各种缺省配置选项
EL.opts = {
  // @see https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
  dtp: {
    language: EL.ctxt.lang,
    format: 'yyyy-mm-dd',
    // clearBtn: true,
    // todayBtn: true,
    todayHighlight: true,
    autoclose: true
  }
};

// 页面刷新切换
EL.view = function (part, viewId) {
  $('.'+part+'> .view').addClass('el-hide');
  $('.'+part+'> .'+viewId).removeClass('el-hide');
};

// 时间选择控件初始化
EL.dtp = function (selector, opts) {
  $(selector).datepicker(opts || EL.opts.dtp);
};

// 报红信息显示
EL.red = function (msg) {
  $('.el-warn').text(msg).removeClass('el-hide');
};

// 出一个对话框(Promise-Style)
EL.dlg = function (btns, txts, color) {
  var msgs = typeof txts === 'string' ? [txts] : txts,
    $msgs = $('<ul/>').addClass(color || '');
  for (var i = 0, n = msgs.length; i < n; i++) {
    $('<li>' + msgs[i] + '</li>').appendTo($msgs);
  }

  var $dlg = $('.el-msg');
  $dlg.find('.modal-title').text('盛通印刷云平台');
  $dlg.find('.modal-body').empty().append($msgs);

  var dfd = $.Deferred();
  $dlg.find('.ok').text(btns.ok || 'OK').on('click', function () {
    dfd.resolve();
  });
  btns.cancel ?
    $dlg.find('.cancel').removeClass('hide')
      .text(btns.cancel || 'Cancel').on('click', function () {
      dfd.reject();
    }) :
    $dlg.find('.cancel').addClass('hide');

  $dlg.modal();

  return dfd.promise();
};

// 出一个消息框
EL.msg = function (txts, color) {
  return EL.dlg({
    ok: '确定'
  }, txts, color);
};

// 出一个错误框
EL.err = function (txts) {
  return EL.msg(txts, 'red');
};

// 出一个确认框
EL.ask = function (txts) {
  return EL.dlg({
    ok: '确定',
    cancel: '取消'
  }, txts);
};

// 取得`data-`属性值列表
EL.vals = function ($els, dataAttrId) {
  return $els.map(function() {
    return $(this).data(dataAttrId);
  })
    .get();
};

/*-------------------+
 |        TABLE       |
 +===================*/

EL.table = function (req) {
  req.url ? (req.pagingSelector ? EL.paging(req) : EL.scroll(req)) : EL._table.init(req);
};

/*-------------------+
 |   TABLE & PAGING   |
 +===================*/

EL.paging = (function() {

  var MAX_PAGE_COUNT = 10;

  Handlebars.registerHelper('paging', function (pageIndex, pageCount) {
    var pn = pageCount > MAX_PAGE_COUNT ? MAX_PAGE_COUNT : pageCount
      , items = [];
    for (var pi = 0; pi < pn; pi++) {
      pi === pageIndex
        ? items.push('<li class="item idx active"><span data-pi="' + pi + '">' + (pi + 1) + '</span></li>')
        : items.push('<li class="item idx"><span data-pi="' + pi + '">' + (pi + 1) + '</span></li>');
    }
    return new Handlebars.SafeString(items.join(''));
  });

  function _onSort(req) {
    var selector = req.selector;
    $(selector + ' table thead th.sorting').on('click', function () {
      var $el = $(this);
      $el.toggleClass(function () {
        var order;
        if ($el.is('.asc')) {
          $el.removeClass('asc');
          order = 'desc';
        }
        else {
          $el.removeClass('desc');
          order = 'asc';
        }
        $el.siblings().removeClass('asc').removeClass('desc');
        req.args.order = order;
        req.args.pageIndex = 0;
        req.args.field = $el.data('field');
        _paging(req);
        _resetPaging(req);
        return order;
      });
    });
  }

  function _onPaging(req) {
    var selector = req.pagingSelector;
    $(selector + ' .pagination .item').on('click', function () {
      var pi, $el = $(this),
        $span = $el.find('span');
      if ($el.is('.disabled') || $el.is('.active')) return;
      if ($el.hasClass('previous')) {
        pi = parseInt($el.data('pi'), 10);
        pi -= 1;
        if (pi < 0) pi = 0;
      }
      else if ($el.hasClass('next')) {
        var pc = parseInt($el.data('pc'), 10);
        pi = parseInt($el.data('pi'), 10);
        pi += 1;
        if (pi > pc) pi = pc;
      }
      else {
        pi = parseInt($span.data('pi'), 10);
        $el.siblings().removeClass('active');
        $el.addClass('active');
      }
      req.args.pageIndex = pi;
      _paging(req);
      _animatePaging(req, $el);
    });
  }

  function _paging(req) {
    var argsBuilder = req.argsBuilder ?
        (typeof req.argsBuilder === 'object' ? req.argsBuilder : req.argsBuilder()) : {},
      args = $.extend({}, argsBuilder, req.args);
    EL.get(req.url, args)
      .then(function (data) {
        req.callback(data.results);
        EL._table.reset(req);
        _renderPaging(data.paging, req);
      });
  }

  function _renderPaging(paging, req) {
    var selector = req.pagingSelector;
    //分页组件第一次渲染
    if ($(selector).is('.el-hide')) {
      _loadPaging(paging, req);
      _onSort(req);
      _onPaging(req);
    }
    //修改显示记录,重新渲染分页组件
    else if (req.args.hasChange) {
      req.args.hasChange = false;
      _reloadPaging(paging, req);
      _onPaging(req);
    }
    //点击分页页码
    else {
      _selector(req).$opt.data('pi', paging.pageIndex).data('pc', paging.pageCount);
    }
  }

  function _reloadPaging(paging, req) {
    var selector = req.pagingSelector;
    $(selector).html(_pagingTmpl(paging));
    $(selector).parent()
      .find('.total .pn').text(paging.pageCount).end()
      .find('.total .rn').text(paging.rowCount);
  }

  function _trigger(req) {
    $(req.trigger).on('click', function () {
      req.args.pageIndex = 0;
      req.args.hasChange = true;
      _paging(req);
      _resetPaging(req);
    });
  }

  function _selector(req) {
    return {
      $item: $(req.pagingSelector + ' .pagination .item.idx'),
      $prev: $(req.pagingSelector + ' .pagination .item.previous'),
      $next: $(req.pagingSelector + ' .pagination .item.next'),
      $opt: $(req.pagingSelector + ' .pagination .item.previous,' +
        req.pagingSelector + ' .pagination .item.next')
    };
  }

  function _resetPaging(req) {
    var $prev = _selector(req).$prev;
    $prev.siblings().removeClass('active').removeClass('disabled');
    $prev.addClass('disabled');
    !$prev.next().is('.next') && $prev.next().addClass('active');
    $prev.closest('.right-pages').find('input.chosePage').val('');
    $(req.selector + ' table thead th.sorting').siblings().removeClass('asc').removeClass('desc');
    _changePaging(req);
    EL._table.resetPosition(req);
  }

  function _animatePaging(req, $el) {
    var selector = _selector(req),
      $prev = selector.$prev,
      $next = selector.$next,
      $item = selector.$item,
      pi = req.args.pageIndex,
      pc = parseInt($next.data('pc'), 10);
    pi === 0 ? $prev.addClass('disabled') : $prev.removeClass('disabled');
    pi === pc - 1 ? $next.addClass('disabled') : $next.removeClass('disabled');
    $prev.closest('.right-pages').find('input.chosePage').val('');
    EL._table.resetPosition(req);
    _changePaging(req);
    //上一页、下一页切换页码时样式
    if (!$el || $el.is('.active')) return;
    $.each($item, function (idx, val) {
      var pageIndex = $(val).is('.active') ? $(val).find('span').data('pi') : pi;
      if (pi !== pageIndex) {
        $el.siblings().removeClass('active');
        if ($el.is('.previous')) $(val).prev().addClass('active');
        else if ($el.is('.next')) $(val).next().addClass('active');
      }
    });
  }

  function _changePaging(req) {
    var selector = _selector(req),
      pages = [],
      $next = selector.$next,
      $item = selector.$item,
      pi = req.args.pageIndex,
      pc = parseInt($next.data('pc'), 10),
      cnt = pi > 4 ? (pi + 5 > pc ? pc : pi + 5) : 10;
    for (var i = cnt >= 10 ? cnt - 10 : 0; i < cnt; i++) pages.push(i);
    $item.siblings().removeClass('active');
    $.each($item, function (idx, val) {
      $(val).find('span').data('pi', pages[idx]).text(pages[idx] + 1);
      pi === pages[idx] && $(val).addClass('active');
    });
  }

  function _pagingTmpl(data) {
    var isDisabled = data.pageCount === 1 ? 'disabled' : '',
      html = '<ul class="pagination"><li class="item previous disabled" data-pi="{{pageIndex}}"><span>上一页</span></li>' +
        '{{paging pageIndex pageCount}}' +
        '<li class="item next ' + isDisabled + '" data-pi="{{pageIndex}}" data-pc="{{pageCount}}"><span>下一页</span></li></ul>',
      tmpl = Handlebars.compile(html);
    return tmpl(data);
  }

  function _loadPaging(paging, req) {
    var selector = req.pagingSelector,
      records = '<div class="left-records">显示记录<select class="records"><option value="10">10</option>' +
        '<option value="20">20</option><option value="40">40</option></select></div>',
      total = '<div class="total">共<span class="pn">' + paging.pageCount +
        '</span>页/<span class="rn">' + paging.rowCount + '</span>条</div>',
      chosePage = '<input type="number" min="1" max="3" placeholder="页码" class="chosePage">',
      forwardBtn = '<button type="button" class="btn btn-primary forward">跳转</button>';

    $(selector).wrap('<div class="paging-wrap"><div class="right-pages"></div></div>');
    $(records).insertBefore($(selector).parent());
    $(selector).html(_pagingTmpl(paging));
    $(selector).parent().append(forwardBtn).append(chosePage).append(total);
    $(selector).toggleClass('el-hide');

    $(selector).closest('.paging-wrap').find('select.records').on('change', function () {
      $(selector).children().remove();
      req.args.pageSize = $(this).val();
      req.args.pageIndex = 0;
      req.args.hasChange = true;
      _paging(req);
    });

    $(selector).parent().find('button.forward').on('click', function () {
      var $next = _selector(req).$next,
        pc = parseInt($next.data('pc'), 10),
        page = $(this).siblings('input').val();
      if(page) {
        req.args.pageIndex = page < 1 ? 0 : (page > pc ? pc - 1 : page - 1);
        _paging(req);
        _animatePaging(req);
      }
    });
  }

  return function (req) {
    EL._table.register(req);
    req.args = {
      pageIndex: 0,
      hasChange: false
    };
    req.trigger && _trigger(req);
    ((req.trigger && req.immediately) || (!req.trigger && !req.immediately)) && _paging(req);
  };

})();

/*-------------------+
 |   TABLE & SCROLL   |
 +===================*/

EL._table = (function () {

  function _reset(req) {
    var selector = req.selector,
      width = (typeof req.width === 'number' ? req.width : $(req.width).outerWidth()) || req.tableWidth - 2,
      height = $(selector + ' .box-inner').height();//设置表格高度避免IE BUG
    req.pagingSelector && $(req.pagingSelector + '.paging').width(width + 'px');
    $(selector + ' .box-inner, ' + selector + ' .box-inner .antiscroll-inner').width(width + 'px').height(height + 'px');
    $(selector + '.box-head').width(width + 'px');
    $(selector + '.box-wrap').antiscroll();
    _resetPosition(req);
  }

  function _resetPosition(req) {
    var selector = req.selector;
    $(selector + ' .box-inner .antiscroll-inner').scrollLeft(0).scrollTop(0);
    $(selector + '.box-head').scrollLeft(0).scrollTop(0);
  }

  function _register(req) {
    //初始化获取表格宽度，避免IE多次调用width()偶尔失败BUG
    req.tableWidth = $('div.tab-content').width();

    $(req.selector + ' .box-inner .antiscroll-inner').on('scroll', function(){
      $(req.selector + '.box-head').scrollLeft($(this).scrollLeft());
    });
    $(window).on('resize', function () {
      req.tableWidth = $('div.tab-content').width();
      _reset(req);
    });
  }

  function _init(req) {
    _register(req);
    _reset(req);
  }

  function _injectIndex (i, item) {
    item.idx = i;
    return item;
  }

  return {
    register: _register,
    reset: _reset,
    resetPosition: _resetPosition,
    injectIndex: _injectIndex,
    init: _init
  };

})();

EL.scroll = (function () {

  function _trigger(req) {
    $(req.trigger).on('click', function () {
      _search(req);
    });
  }

  function _search(req) {
    var args = req.argsBuilder ? (typeof req.argsBuilder === 'object' ? req.argsBuilder : req.argsBuilder()) : {};
    EL.get(req.url, args).then(function (data) {
      if (typeof data === 'object') {
        $.each(data, EL._table.injectIndex);
      }
      req.callback(data);
      EL._table.reset(req);
    });
  }

  return function (req) {
    EL._table.register(req);
    req.trigger && _trigger(req);
    ((req.trigger && req.immediately) || (!req.trigger && !req.immediately)) && _search(req);
  };

})();

/*---------------------+
 |     表格选择器样式     |
 +=====================*/

EL.multiSelect = (function () {

  function _register(req) {
    var selector = req.selector;
    $(selector + ' .el-check-all').on('change', function () {
      var checked = $(this).is(':checked'),
        target = $(this).data('target');
      $(target).prop('checked', checked);
    });

    $(selector + ' table tbody').on('click', 'tr', function (e) {
      if($(e.target).is('input[type=checkbox]')) return;
      var $cbox = $(this).find('input[type=checkbox]'),
        checked = $cbox.is(':checked');
      $cbox.prop('checked', !checked);
    });
  }

  function _multiSelect (req) {
    req.details = [];
    $(req.selector + ' .col-middle').on('click', 'button', function () {
      var $el = $(this);
      $el.is('.el-add') && _add(req);
      $el.is('.el-del') && _del(req);
      $el.is('.el-add-all') && _addAll(req);
      $el.is('.el-del-all') && _delAll(req);
    });
    return req.details;
  }

  function _renderDetail (req) {
    $.each(req.details, EL._table.injectIndex);
    req.callback(req.details);
    EL._table.reset({
      selector: req.selector + ' .col-right > div',
      width: req.selector + ' .col-left > .box-head'
    });
    $(req.selector + ' .col-left input[type=checkbox]').prop('checked', false);
  }

  function _addAll (req) {
    var details = req.details;
    details.splice(0, details.length);
    $.each(req.items, function (i, item) {
      req.details.push(item);
    });
    _renderDetail(req);
  }

  function _add (req) {
    var $items = $(req.selector + ' .col-left .item-choice:checked'),
      idxes = EL.vals($items, 'idx');
    if (!idxes.length) {
      EL.msg(['请选择添加的明细项.']);
      return;
    }
    for (var i = 0, len = idxes.length; i < len; i++) {
      var item = req.items[idxes[i]];
      if (req.details.indexOf(item) === -1) {
        req.details.push(item);
      }
    }
    _renderDetail(req);
  }

  function _delAll (req) {
    $(req.selector + ' .col-right table tbody').children().remove();
    req.details.splice(0, req.details.length);
  }

  function _del (req) {
    var $details = $(req.selector + ' .col-right .detail-choice:checked'),
      idxes = EL.vals($details, 'idx');
    if (!idxes.length) {
      EL.msg(['请选择删除的明细项.']);
      return;
    }
    $details.map(function () {
      $(this).closest('tr').remove();
    });
    $.each(idxes.reverse(), function (i, idx) {
      req.details.splice(idx, 1);
    });
    _renderDetail(req);
  }

  return function (req) {
    _register(req);
    return _multiSelect(req);
  };

})();

/*-------------------+
 |     Suggestion     |
 +===================*/

EL.suggestion = (function () {

  function _suggest(req)  {
    var selector = req.selector,
      width = $(selector).outerWidth();

    $(selector).after('<span class="suggestion el-hide" style="width:' + width + 'px"><ul></ul></span>');

    $(selector).on('input', function () {
      var key = $(this).val();
      if (!key || !key.trim()) {
        $(selector + ' + span ul').empty();
        return false;
      }
      EL.get(req.url, {key: key}).then(function (data) {
        _render(data, req);
      });
    });

    $(selector).on('focusin', function () {
      $(selector + ' + span').removeClass('el-hide').addClass('el-cell');
    });

    $(selector).on('focusout', function () {
      if($(selector + ' + span ul li:hover').length) return false;
      $(selector + ' + span').removeClass('el-cell').addClass('el-hide');
    });

    $(selector + ' + span').on('click', 'li', function () {
      $(this).siblings().removeClass('selected').end().addClass('selected');
      $(selector).val($(this).text()).data('code', $(this).data('code'));
      $(selector + ' + span').removeClass('el-cell').addClass('el-hide');
    });
  }

  function _render(data, req) {
    var items = [],
      selector = req.selector,
      results = data.length > 10 ? data.slice(0, 10) : data;
    data = null;
    $.each(results, function (idx, item) {
      items.push('<li data-code="' + item.code + '">' + item.name + '</li>');
    });
    $(selector + ' + span ul').empty().append(items.join(''));
    $(selector).focus();
  }

  return function (req) {
    _suggest(req);
  }

})();


/*----------------+
|   MENU & PAGE   |
+================*/

$(function () {

  function initTabBar() {

    var MENU_HOME = 'home';
    var RE_MENUID = /^([a-z]{2})\d{3}$/;

    var _tabNavTmpl = Handlebars.compile(
      '<li class={{menuId}}><a href="#{{menuId}}" data-toggle="tab"><i class="fa fa-{{menuIco}}"></i>' +
      '{{#if menuLbl}} {{menuLbl}}&nbsp;&nbsp;<i class="fa fa-close" data-menu-id="{{menuId}}"></i>{{/if}}</a></li>'
    );
    var _tabContentTmpl = Handlebars.compile('<div id="{{menuId}}" class="tab-pane"></div>');
    var _pageTmpl = Handlebars.compile(
      '<link rel="stylesheet" href="{{{pageUri}}}.css">{{{pageUI}}}');

    function _loadModule($menu) {
      var menu = {
        menuId: $menu.data('menuId'),
        menuIco: $menu.data('menuIco'),
        menuLbl: $menu.data('menuLbl'),
        menuFix: $menu.data('menuFix')
      };
      _activateTab(menu.menuId) || _createTab(menu);
    }

    function _createTab(menu) {
      var matched = menu.menuId.match(RE_MENUID),
        pageMod = matched ? (matched[1] + '/' + matched[0]) : menu.menuId,
        pageUri = 'static/el/' + pageMod;
      return EL.get(pageUri + '.html').then(function (pageUI) {
        var pageHtml = _pageTmpl({
          pageUri: EL.url(pageUri),
          pageUI: pageUI
        });

        var $tabNav = $(_tabNavTmpl(menu)).appendTo('.content>ul.nav'),
          $tabPane = $(_tabContentTmpl(menu)).html(pageHtml).appendTo('.content>.tab-content')

        var $tabClose = $tabNav.find('.fa-close');
        menu.menuFix ? $tabClose.remove() : $tabClose.on('click', _destroyTab);

        _activateTab(menu.menuId);

        SystemJS.import(pageUri).then(_fnCaller);
      });
    }

    function _fnCaller(fn) {
      fn();
    }

    function _destroyTab() {
      var menuId = $(this).data('menuId'),
        $tabNav = $('.content>ul.nav>li.' + menuId),
        isActive = $tabNav.hasClass('active');
      $tabNav.remove();
      $('.content>.tab-content>#' + menuId).remove();
      isActive && _activateTab(MENU_HOME);
    }

    function _activateTab(menuId) {
      var $tabContent = $('.content>.tab-content');
      var $tabPane = $tabContent.find('#' + menuId);
      if (!$tabPane.length) return false;
      if ($tabPane.hasClass('active')) return true;

      $tabContent.children().removeClass('active');
      $tabPane.addClass('active');
      $('.content>ul.nav>li.' + menuId).tab('show');
      return true;
    }

    var $menus = $('ul.sidebar-menu li.menu-item')
      .on('click', function () {
        var $menu = $(this);
        $menu.hasClass(MENU_HOME) ? EL.go() : _loadModule($menu);
      });
    _loadModule($($menus[0]));
  }

  /* used for stp-web */
  initTabBar();
  /* used for stp-svr
  EL.get('api/ui/menus').then(function(menus) {
    var tmpl = Handlebars.compile($('#el_menu').html());
    $('.sidebar-menu').html(tmpl({menus: menus, debug: true}));
    initTabBar();
  });*/

});
