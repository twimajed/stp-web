/**
 * Created by Spring on 2016/7/20.
 */

define(function (require) {

  function init() {
    var  _tmpl = Handlebars.compile($('#cm210_table').html());
    EL.get('api/mock/cm210').then(function (json) {
      $('.cm210_data').html(_tmpl(json));
    });

    var  _tmpl1 = Handlebars.compile($('#cm210_table_1').html());
    EL.get('api/mock/cm210_1').then(function (json) {
      $('.cm210_data_1').html(_tmpl1(json));
    });

    var  _tmpl2 = Handlebars.compile($('#cm210_table_2').html());
    EL.get('api/mock/cm210_2').then(function (json) {
      $('.cm210_data_2').html(_tmpl2(json));
    });

    var  _tmpl3 = Handlebars.compile($('#cm210_table_3').html());
    EL.get('api/mock/cm210_3').then(function (json) {
      $('.cm210_data_3').html(_tmpl3(json));
    });

    var  _tmpl4 = Handlebars.compile($('#cm210_table_4').html());
    EL.get('api/mock/cm210_4').then(function (json) {
      $('.cm210_data_4').html(_tmpl4(json));
    });

    var  _tmpl5 = Handlebars.compile($('#cm210_table_5').html());
    EL.get('api/mock/cm210_5').then(function (json) {
      $('.cm210_data_5').html(_tmpl5(json));
    });

  }
  return init;
});


