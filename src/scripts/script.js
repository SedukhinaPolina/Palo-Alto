
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
      for (item in data.articles) {
        nunjucks.render('./partials/article.html', data.articles[item], function (err, res) {
          $('.js-articles').append(res);
        });
      }
    },
      error: function(data, status) {
          debugger
      }
  });
});
