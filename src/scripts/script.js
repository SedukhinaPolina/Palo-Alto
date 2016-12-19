
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

var errorNull = true, errorMail = true;

var checkNull = function(){
  $(this).val($(this).val().trim());
  if ($(this).val() =="") {
      $('#errorlabel').add("You must fill in this field");
    //$('#errorlabel').notify.add("You must fill in this field"); 
    //$(this).addClass("about-form__error");
    errorNull = true;
  } else {
    errorNull = false;
    $(this).removeClass("about-form__error");
  }
};

$("#firstname").focusout(checkNull);
$("#lastname").focusout(checkNull);
$("#e-mail").focusout(checkNull);
$("#phone").focusout(checkNull);
$("#date").focusout(checkNull);

$("#submit").click(function(){
  if (!(errorNull || errorMail)) {
    $("#about-form").submit();
  } else {
    $(this).notify("Form is empty", "error");
  }
});

