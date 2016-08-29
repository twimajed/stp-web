/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {
  function rd() {
    return Math.floor(Math.random() * 100 + 1);
  }

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
  var dataList = new Array();
  var title = "";

  function loadChar() {

    for (var i = 0; i < 8; i++) {
      dataList[i] = rd();
    }

    var _config = {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [{
          label: title==''?'产能利用率':title,
          data: dataList,
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: '盛通驾驶舱产能利用率统计'
        },
        tooltips: {
          mode: 'label',
          callbacks: {}
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
              labelString: '%'
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 120,
            }
          }]
        }
      }
    };

    //渲染颜色
    $.each(_config.data.datasets, function (i, dataset) {
      dataset.borderColor = randomColor(0.4);
      dataset.backgroundColor = randomColor(0.5);
      dataset.pointBorderColor = randomColor(0.7);
      dataset.pointBackgroundColor = randomColor(0.5);
      dataset.pointBorderWidth = 1;
    });

    var _canvasCtx = $('.cm201 >.panel >.canvaslist > .myChart')[0].getContext('2d');
    var _lineChart = new Chart(_canvasCtx, _config);

  }

  function init() {
    // -- RENDERING --

    // -- INTEROPS --

    //加载下拉选择项
    var processType = Handlebars.compile($('#processType').html());
    EL.get('api/mock/cm001').then(function (list) {
      $('.cm201 .processType').append(processType(list));

      $(".cm201 .processType").change(function(){
        var seleText= $(".cm201 .processTypeSele").find("option:selected").text();
        title = seleText + " 产能利用率";
        loadChar();
      });

    });
    loadChar();

  }

  return init;

});
