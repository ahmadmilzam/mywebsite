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

  var sendGAEvent = function(){

    var type = this.getAttribute('data-type');

    ga('send', {
      hitType: 'event',
      eventCategory: 'CTAMeeting-'+type,
      eventAction: 'click',
      eventLabel: 'Arrange a meeting'
    });
  }
  var btnMeetings = document.getElementsByClassName('js-meeting');

  for (var i = 0; i < btnMeetings.length; i++) {
    btnMeetings[i].addEventListener('click', sendGAEvent);
  };

  var formContact = document.getElementById('js-contactForm'),
      formFeedback = document.getElementById('js-feedback');

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

      // SVG feature detection
      var supports = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
      if ( supports ) { // If SVG is supported, add `.svg` class to <html> element
        document.documentElement.className += (document.documentElement.className ? ' ' : '') + 'svg';
      }

      // Smoothscrol for link
      smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false
      });

      // contact us handler
      formHandler();
    }
  }
}());

// RUN THEM ALL !!
App.init();