module.exports = function calEvents() {
  return [{
    title: 'All Day Event',
    start: '2016-06-01',
    backgroundColor: "#f56954", //red
    borderColor: "#f56954" //red
  }, {
    title: 'Long Event',
    start: '2016-06-07',
    end: '2016-06-10',
    backgroundColor: "#f39c12", //yellow
    borderColor: "#f39c12" //yellow
  }, {
    id: 999,
    title: 'Repeating Event',
    start: '2016-06-09T16:00:00',
    backgroundColor: "#0073b7", //Blue
    borderColor: "#0073b7" //Blue
  }, {
    id: 999,
    title: 'Repeating Event',
    start: '2016-06-16T16:00:00',
    backgroundColor: "#00c0ef", //Info (aqua)
    borderColor: "#00c0ef" //Info (aqua)
  }, {
    title: 'Conference',
    start: '2016-06-11',
    end: '2016-06-13',
    backgroundColor: "#00a65a", //Success (green)
    borderColor: "#00a65a" //Success (green)
  }, {
    title: 'Meeting',
    start: '2016-06-12T10:30:00',
    end: '2016-06-12T12:30:00',
    backgroundColor: "#3c8dbc", //Primary (light-blue)
    borderColor: "#3c8dbc" //Primary (light-blue)
  }, {
    title: 'Lunch',
    start: '2016-06-12T12:00:00'
  }, {
    title: 'Meeting',
    start: '2016-06-12T14:30:00'
  }, {
    title: 'Happy Hour',
    start: '2016-06-12T17:30:00'
  }, {
    title: 'Dinner',
    start: '2016-06-12T20:00:00'
  }, {
    title: 'Birthday Party',
    start: '2016-06-13T07:00:00'
  }, {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2016-06-28'
  }];
};
