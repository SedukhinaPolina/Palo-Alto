var errorNull = true;
var errorPhone = true;
var errorEmail = true;

var checkNull = function(){
  if ($(this).val() =="") {
     $(this).after("<label class='about-form__error'>You must fill in this field</label>"); 
      $(this).css({'border-style': 'solid',
    'border-width': '1px', 'border-color':'red'});
    errorNull = true;
    $('#submit').attr('disabled', 'disabled');
  } else {
    errorNull = false;
      $(this).css({'border-style': 'none'})
      $('.about-form__error').remove();
  }
};

var checkPhone = function() {
    if ($("#phone").val().length != 16) {
     $("#phone").after("<label class='about-form__error'>You must fill in this field</label>"); 
      $(this).css({'border-style': 'solid',
      'border-width': '1px', 'border-color':'red'});
        $("#submit").attr('disabled', 'disabled');
        errorPhone = true;
  } else {
      errorPhone = false;
      $("#phone").css({'border-style': 'none'})
      $('.about-form__error').remove();
  }
}

var checkEmail = function() {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/;
    if (pattern.test($(this).val())) {
    $(this).after("<label class='about-form__error'>You must fill in this field correctly</label>"); 
    $(this).css({'border-style': 'solid',
    'border-width': '1px', 'border-color':'red'});
    $("#submit").attr('disabled', 'disabled');
    errorEmail = true;
  } else {
  }
}



jQuery(function($) {
$(document).ready(function() {
    $("#phone").inputmask("+7(999)999-99-99");
    $("#datepicker").datepicker();
    $("#datepicker").inputmask("99/99/9999");
});
});
$("#firstname").focusout(checkNull);
$("#lastname").focusout(checkNull);
$("#e-mail").focusout(checkNull);
$("#phone").focusout(checkNull);
$("#datepicker").focusout(checkNull);
$("#e-mail").focusout(checkEmail);
$("#phone").focusout(checkPhone);

$("#submit").click(function(){
  if (!(errorNull) && !(errorPhone)) {
    $('#submit').prop('disabled', false);
    $("#about-form").submit();
  } else {
    $('#submit').attr('disabled', 'disabled');
  }
});
