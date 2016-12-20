var errorNull = true;
var errorPhone = true;

var checkNull = function(){
  if ($(this).val() =="") {
     $(this).after("<label class='about-form__error'>You must fill in this field</label>"); 
      $(this).css({'border-style': 'solid',
    'border-width': '1px', 'border-color':'red'});
    errorNull = true;
  } else {
    errorNull = false;
      $("#errorlabel").text("");
      $(this).css({'border-style': 'none'})
      $('.about-form__error').remove();
  }
};

var checkPhone = function() {
    if ($('#phone').val().length != 16) {
     $('#phone').after("<label class='about-form__error'>You must fill in this field</label>"); 
      $(this).css({'border-style': 'solid',
    'border-width': '1px', 'border-color':'red'});
    errorPhone = true;
  } else {
    errorPhone = false;
      $("#errorlabel").text("");
      $('#phone').css({'border-style': 'none'})
      $('.about-form__error').remove();
  }
}

jQuery(function($) {
$(document).ready(function() {
    $("#phone").inputmask("+7(999)999-99-99");
    $("#datepicker").datepicker();
});
});
$("#firstname").focusout(checkNull);
$("#lastname").focusout(checkNull);
$("#e-mail").focusout(checkNull);
$("#phone").focusout(checkNull);
$("#phone").focusout(checkPhone);
$("#datepicker").focusout(checkNull);

$("#submit").click(function(){
  if (!(errorNull)) {
    $("#about-form").submit();
  } else {
    $(this).notify("Form is empty", "error");
  }
});
