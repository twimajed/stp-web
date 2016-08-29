/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  function init () {
    EL.get('api/mock/ui007').then(search);
    return false;
  }

  function search(results) {
    if (results.length) {
      var tablesTmpl = Handlebars.compile($('.ui007>.hbs-tables').html());
      $('.ui007 .el-tbody').html(tablesTmpl(results))
        .find('.ops').on('click', function() {
          var $el = $(this);
          $el.hasClass('editing') ? saveRow($el) : editRow($el);
        });
    }
    else {
      $('.ui007 .el-tbody').empty();
    }
  }

  // 进入编辑模式
  function editRow($el) {
    var $tr = $el.closest('tr');
    $tr.addClass('edit');
    $el.html('保存').addClass('editing');
  }

  // 保存修改并退出编辑模式
  function saveRow($el) {
    var $tr = $el.closest('tr');
    var msgs = [], args = rowInput($tr, msgs);
    msgs.length ? EL.msg(msgs) : EL.get(
      'api/mock/ui007_save', args).then(function(data) {
        _inputAmt($tr.find('.orderAmt'), msgs, '订单金额', data);
        msgs.length ? EL.msg(msgs) : rowSaved($tr, $el, args);
      });
  }

  // 更新完成后的处理
  function rowSaved($tr, $el, data) {
    var dataView = {
      deliverDay: data.deliverDay,
      orderAmt: data.orderAmt
    };
    $tr.find('span').each(function() {
      var $span = $(this), propName = $span.data('prop');
      $span.text(dataView[propName]);
    });
    $tr.removeClass('edit');
    $el.html('修改').removeClass('editing');
  }

  // 数据收集及校验
  function rowInput($tr, msgs) {
    var data = {};
    $tr.find('.error').removeClass('error');
    data.orderNo = $tr.find('.orderNo').val();
    data.deliverDay = _inputDay($tr.find('.deliverDay'), msgs, '送货日期');
    data.orderAmt = _inputAmt($tr.find('.orderAmt'), msgs, '订单金额');
    return data;
  }

  function _inputAmt($el, msgs, label, data) {
    var input = $el.val();
    if (!/^\d+(\.\d+)?$/.test(input)) {
      $el.addClass('error');
      msgs.push(label + ': 无效金额');
    }
    if (data && data.orderAmt < 10000) {
      $el.addClass('error');
      msgs.push(label + ':订单金额不能低于10000: ¥' + data.orderAmt);
    }
    return input;
  }

  function _inputDay($el, msgs, label) {
    var input = $el.val();
    if (!/^\d\d?$/.test(input)) {
      $el.addClass('error');
      msgs.push(label + ': 无效日期');
      return input;
    }
    var day = parseInt(input, 10);
    if (day < 1 || day > 28) {
      $el.addClass('error');
      msgs.push(label + ': 无效日期(有效范围:1~28)');
    }
    return input;
  }

  return init;

});
