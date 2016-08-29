/*
 * EL UI - 1.0.0
 * http://www.elitesland.com/
 *
 * Copyright 2016 Elitesland.com
 */

define(function (require) {

  var _tmpls = {};

  function load(viewId) {
      return EL.get('api/mock/ui005_' + viewId)
        .then(function (data) {
          var viewData = {};
          viewData[viewId] = data;
          return $('.ui005>.' + viewId).html(_tmpls[viewId](viewData));
        });
  }

  function view(viewId) {
    load(viewId).then(function ($view) {
      $('.ui005>.view').addClass('hide');
      $view.removeClass('hide');
    });
  }

  function init() {
    $('.ui005>.hbs-view').each(function () {
      var $hbs = $(this), viewId = $hbs.data('viewId');
      _tmpls[viewId] = Handlebars.compile($hbs.html());
    });

    $('.ui005>.ctls>.btn').on('click', function() {
      view($(this).data('viewId'));
    });

    loadMyBook().then(function () {
      return view('fruits');
    })
  }

  function loadMyBook() {
    var tmpl = Handlebars.compile($('.hbs-my-book').html());
    return $.when(
      EL.get('api/mock/ui005_books?rev=1'),
      EL.get('api/mock/ui005_my_book')
    )
    .then(function (booksData, myBookData) {
      $('.ui005 .my-book').html(tmpl({
        books: booksData[0],
        myBook: myBookData[0]
      }));
    });
  }

  return init;

});
