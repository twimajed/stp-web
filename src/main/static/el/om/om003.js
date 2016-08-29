/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {
  var _tmpls = {};



    var _reqProxy = {
      url: 'api/mock/om003',
      argsBuilder: argsBuilder,
      callback: renderTable,
      selector: '.om003 .listView .table-om003',
      pagingSelector: '.om003 .listView .stp-paging-om003',
      trigger: '.om003 .panel-body .search-btn',
      immediately: true
    };

    function argsBuilder() {
      var condition = {
        'soName': $('#om003-soName').val(),
        'custName': $('#om003-custName').val(),
         'prodName': $('#om003-prodName').val(),
        'dateFrom': $('#om003-date-from').val(),
        'dateTo': $('#om003-date-to').val()
      };
      return condition;
    }
    function renderTable(results) {
          $('.om003 .table-om003 .om003_data').html(_tmpls['listView'](results));
          $('#om003-listView-div').removeClass('hide');
          return listenClick();
        }
     function collapse(){
          //收缩按钮
          $('#om003-collapse-btn').on('click', function () {
            $(this).find('i').toggleClass("fa-plus");
            $(this).find('i').toggleClass("fa-minus");
            $(this).parent().find('.search-toggle-content').toggle();
          });
      }

function listenClick() {
    //工艺评审按钮
		$('#om003-btn-gyps').off('click').on('click', function() {
          $('#om003-gypsView-div').removeClass('hide');
          $('#om003-listView-div').addClass('hide');
          //返回
          $('#om003-2-btn-back').off('click').on('click', function() {
                $('#om003-listView-div').removeClass('hide');
                $('#om003-gypsView-div').addClass('hide');
          });
          //保存
          $('#om003-2-btn-save').off('click').on('click', function() {
                    EL.msg('保存成功！');
              });
          //评审完成
          $('#om003-2-btn-finish').off('click').on('click', function() {
                    $('#om003-listView-div').removeClass('hide');
                    $('#om003-gypsView-div').addClass('hide');
              });
           $('#om003-2-btn-fade1-select').on('click',function(){
//                  selectPaper();
                   var dlg = $('#om003-2-btn-fade1-select-modal');
                   dlg.find('.modal-content').css("width","1000px").css("left","-200px");
                   dlg.find('.modal-body').html($('#om003-2-fade1-select-tmpl').html());
           });
            $('.om003-2-prod-tmpl .look').on('click',function(){
                  //var $click = $(e.target);
                   var dlg = $('#om003-2-btn-prod-look-modal');
                   dlg.find('.modal-content').css("width","1100px").css("left","-200px");
                     dlg.find('.modal-body').html($('#om003-2-prod-look-tmpl').html());
            });

		});


	}
	  function selectPaper() {
      var _tmpl = Handlebars.compile($('').html());
      EL.get('api/mock/om003_selectpaper')
        .then(function (json) {
          $('.om003_paper_data').html(_tmpl(json));
        });
    }
	  function  view(){
          EL.dtp('.om003 .el-dtp');
           collapse();
           EL.table(_reqProxy);
        };
    function init() {
       $('.om003 .hbs-tables').each(function () {
            var $hbs = $(this), viewId = $hbs.data('viewId');
            _tmpls[viewId] = Handlebars.compile($hbs.html());
        });
        view();
    }
    return init;

});
