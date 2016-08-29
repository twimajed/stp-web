/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _calOpts = {
    lang: 'zh-cn',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: '' // 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2016-06-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: void 0
  };

  return function init() {

    EL.get('api/mock/ui001')
      .then(function (calEvents) {
        _calOpts.events = calEvents;
        $('.ui001>.calendar').fullCalendar(_calOpts);
      });

  };

});
