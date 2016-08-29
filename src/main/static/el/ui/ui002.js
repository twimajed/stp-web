/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var MONTHS = _.range(1, 13).map(function (m) {
    return m + '月';
  });

  var _randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
    //return 0;
  };
  var _randomColorFactor = function () {
    return Math.round(Math.random() * 255);
  };
  var randomColor = function (opacity) {
    return 'rgba(' + _randomColorFactor() + ',' + _randomColorFactor() + ',' +
      _randomColorFactor() +
      ',' + (opacity || '.3') + ')';
  };

  var _config = {
    type: 'line',
    data: {
      labels: MONTHS.slice(0, 7),
      datasets: [{
        label: 'My First dataset',
        data: [_randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor()
        ],
        fill: false,
        borderDash: [5, 5],
      }, {
        hidden: true,
        label: 'hidden dataset',
        data: [_randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor()
        ],
      }, {
        label: 'My Second dataset',
        data: [_randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
          _randomScalingFactor()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          // beforeTitle: function() {
          //     return '...beforeTitle';
          // },
          // afterTitle: function() {
          //     return '...afterTitle';
          // },
          // beforeBody: function() {
          //     return '...beforeBody';
          // },
          // afterBody: function() {
          //     return '...afterBody';
          // },
          // beforeFooter: function() {
          //     return '...beforeFooter';
          // },
          // footer: function() {
          //     return 'Footer';
          // },
          // afterFooter: function() {
          //     return '...afterFooter';
          // },
        }
      },
      hover: {
        mode: 'dataset'
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            suggestedMin: -10,
            suggestedMax: 250,
          }
        }]
      }
    }
  };

  $.each(_config.data.datasets, function (i, dataset) {
    dataset.borderColor = randomColor(0.4);
    dataset.backgroundColor = randomColor(0.5);
    dataset.pointBorderColor = randomColor(0.7);
    dataset.pointBackgroundColor = randomColor(0.5);
    dataset.pointBorderWidth = 1;
  });

  function init() {

    // -- RENDERING --

    var _canvasCtx = $('.ui002>canvas')[0].getContext('2d');
    var _lineChart = new Chart(_canvasCtx, _config);

    // -- INTEROPS --

    $('#randomizeData').click(function () {
      $.each(_config.data.datasets, function (i, dataset) {
        dataset.data = dataset.data.map(function () {
          return _randomScalingFactor();
        });

      });

      _lineChart.update();
    });

    $('#changeDataObject').click(function () {
      _config.data = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'My First dataset',
          data: [_randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
            _randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor()
          ],
          fill: false,
        }, {
          label: 'My Second dataset',
          fill: false,
          data: [_randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor(),
            _randomScalingFactor(), _randomScalingFactor(), _randomScalingFactor()
          ],
        }]
      };

      $.each(_config.data.datasets, function (i, dataset) {
        dataset.borderColor = randomColor(0.4);
        dataset.backgroundColor = randomColor(0.5);
        dataset.pointBorderColor = randomColor(0.7);
        dataset.pointBackgroundColor = randomColor(0.5);
        dataset.pointBorderWidth = 1;
      });

      // Update the chart
      _lineChart.update();
    });

    $('#addDataset').click(function () {
      var newDataset = {
        label: 'Dataset ' + _config.data.datasets.length,
        borderColor: randomColor(0.4),
        backgroundColor: randomColor(0.5),
        pointBorderColor: randomColor(0.7),
        pointBackgroundColor: randomColor(0.5),
        pointBorderWidth: 1,
        data: [],
      };

      for (var index = 0; index < _config.data.labels.length; ++index) {
        newDataset.data.push(_randomScalingFactor());
      }

      _config.data.datasets.push(newDataset);
      _lineChart.update();
    });

    $('#addData').click(function () {
      if (_config.data.datasets.length > 0) {
        var month = MONTHS[_config.data.labels.length % MONTHS.length];
        _config.data.labels.push(month);

        $.each(_config.data.datasets, function (i, dataset) {
          dataset.data.push(_randomScalingFactor());
        });

        _lineChart.update();
      }
    });

    $('#removeDataset').click(function () {
      _config.data.datasets.splice(0, 1);
      _lineChart.update();
    });

    $('#removeData').click(function () {
      _config.data.labels.splice(-1, 1); // remove the label first

      _config.data.datasets.forEach(function (dataset, datasetIndex) {
        dataset.data.pop();
      });

      _lineChart.update();
    });

  }

  return init;

});
