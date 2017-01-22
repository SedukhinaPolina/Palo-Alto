
$( document ).ready(function () {

  nunjucks.configure({
    autoescape: true,
    web: {
      async: true
    }
  });

  $.ajax({
    url: "./mockapi/content.json",
    success: function(data, status) {
        nunjucks.render('./partials/article.html', data, function (err, res) {
          $('.js-articles').append(res);
        });

    },
      error: function(data, status) {
          debugger
      }
  });
});


