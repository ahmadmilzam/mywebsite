var App = (function(){

  var hasClass = function(el, classname){
    if (el.classList){
      return el.classList.contains(classname);
    }
    else{
      return new RegExp('(^| )' + classname + '( |$)', 'gi').test(el.className);
    }
  }

  var addClass = function(el, classname){
    if (el.classList){
      el.classList.add(classname);
    }
    else{
      el.className += ' ' + classname;
    }
  }

  var removeClass = function(el, classname){
    if (el.classList){
      el.classList.remove(classname);
    }
    else{
      el.className = el.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  var formContact = document.getElementById('contactForm'),
      formFeedback = document.getElementById('feedback');

  var formHandler = function(){
    formContact.addEventListener('submit', function(e){
      e.preventDefault();
      e.stopPropagation;

      var formAction = this.getAttribute('action'),
          formMethod = this.getAttribute('method').toUpperCase(),
          formData = '',
          formInputs,
          btn = document.getElementById('buttonSubmit'),
          btnOldHtml = btn.innerHTML,
          btnLoadingState = btn.getAttribute('data-loading');


      // collect form data
      formInputs = formContact.querySelectorAll('[name]');
      var i,
          len = formInputs.length,
          first = true;

      for (i = 0; i < len; i++) {
        if(i == 0){
          formData += formInputs[i].name + '=' + formInputs[i].value;
        }
        else{
          formData += '&' + formInputs[i].name + '=' + formInputs[i].value;
        }
      }


      btn.innerHTML = btnLoadingState;

      // send data via ajax
      var request = new XMLHttpRequest();
      request.open(formMethod, formAction, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onreadystatechange = function () {
        if (request.readyState != 4 || request.status != 200) return;
        var responseJson = JSON.parse(request.responseText);

        if(responseJson.status == 200){

          if (hasClass(formFeedback, 'error')){
            removeClass(formFeedback, 'error');
            if(formFeedback.classList.contains('error'))
              formFeedback.classList.remove('error');
          }

          // reset form
          formContact.reset();

        }else{
          addClass(formFeedback, 'error');
        }

        // print responsetext
        formFeedback.innerHTML = responseJson.msg;

        // set button state to normal
        btn.innerHTML = btnOldHtml;

      };
      request.send(formData);
    });
  }

  return {
    init: function(){

      smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false
      });

      formHandler();

    }
  }
}());

// RUN THEM ALL !!
App.init();