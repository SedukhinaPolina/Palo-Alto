
$(document).ready(function () {

  nunjucks.configure({
    autoescape: true,
    web: {
      async: true
    }
  });

  $.ajax({
    url: "./mockapi/content.json",
    success: function(data, status) {
      for (item in articles) {
        nunjucks.render('./article.html', data.articles[item], function (err, res) {
          $('.js-articles').append(res);
        });
      }
    }
  });

});
