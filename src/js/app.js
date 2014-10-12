var myapp = (function($, window, document) {

  /**
  *
  * Variable declaration
  *
  **/
  var body = $('body'),
      // sidebar = $('#js-sidebar'),
      // toggle = $('#js-toggle-sidebar'),
      // exit_sidebar = $('#js-close-sidebar'),
      buttonSubmit = $('#button-form-submit'),
      form = $('#ajax-form'),
      steadyText = 'SEND',
      loadingText = 'Please wait..';

  // var handle_loader = function(){
  //   setTimeout(function(){
  //     body.addClass('loaded');
  //   }, 1000);
  // }

  // var formatCurrency = function(amount, decimalSeparator, thousandsSeparator, nDecimalDigits){

  //   var num = parseFloat( amount ); //convert to float
  //   //default values
  //   decimalSeparator = decimalSeparator || '.';
  //   thousandsSeparator = thousandsSeparator || ',';
  //   nDecimalDigits = nDecimalDigits == null ? 2 : nDecimalDigits;

  //   var fixed = num.toFixed(nDecimalDigits); //limit or add decimal digits
  //   //separate begin [$1], middle [$2] and decimal digits [$4]
  //   var parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{' + nDecimalDigits + '}))?$').exec(fixed);

  //   if(parts){ //num >= 1000 || num < = -1000
  //     return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + (parts[4] ? decimalSeparator + parts[4] : '');
  //   }else{
  //     return fixed.replace('.', decimalSeparator);
  //   }
  // }

  // var handle_nav_toggle = function(){
  //   toggle.click(function(){
  //     body.toggleClass('sidebar-opened');
  //   });
  //   exit_sidebar.click(function(){
  //     body.removeClass('sidebar-opened');
  //   });
  // }

  // var handle_active_nav = function(){
  //   sidebar.onePageNav({
  //     offset: 0,
  //     updateHash: false,
  //     filter: ':not(.not-this)',
  //     currentClass: 'active',
  //     easing: 'easeInOutExpo',
  //     speed: 1500
  //   });
  // }

  /**
  *
  * Init parallax with stellar
  * run parallax only in bigger device
  *
  **/
  // var handle_parallax = function(){
  //   if ($(window).width() > 1024) {
  //     $.stellar({
  //       horizontalScrolling: false,
  //       verticalOffset: 50
  //     });
  //   }
  // }

  /**
   *
   * WOW scrolling reveal
   *
   **/
  var wowHandler = function(){
    var wow = new WOW({
      mobile: false // trigger animations on mobile devices (true is default)
    });
    wow.init();
  }

  /**
  *
  * Handle scroll to
  *
  **/
  var scrollToHandler = function(){
    $('.js-button-scroll').click(function(){
      var el = $(this).data("scroll");
      myapp.scrollToEl(el);
    });
  }

  /**
  *
  * Ajax contact form
  *
  **/
  var contactFormHandler = function(){
    form.on('valid', function(e){
      e.preventDefault();

      var url = form.attr('action'),
          type = form.attr('method'),
          data = {};

      myapp.setBtnLoading();

      form.find('[name]').each(function(){
        var that = $(this),
        name = that.attr('name'),
        value = that.val();

        data[name] = value;
      });

      myapp.sendEmail(url, type, data).done(function(response){
        form.clearForm();
        $('#feedback').html(response.msg);
      })
      .fail(function(xhr, status, err){
        $('#feedback').html(err);
      })
      .always(function(){
        myapp.setBtnSteady();
      });

      return false;
    });
  }

  var galleryHandler = function(gallery){
    if($.fn.owlCarousel){
      $('#'+gallery.id).owlCarousel(gallery.config);
    }
    else{
      alert('Owl Carousel not loaded');
    }
  }

  return {
    init: function(obj){

      /**
      *
      * Foundation init
      *
      **/
      $(document).foundation();

      wowHandler();

      if(typeof obj == "object"){
        if(typeof obj.gallery == "undefined"){
          console.log('this website need gallery id and some config');
        }
        else{
          //initialize gallery
          galleryHandler(obj.gallery);
        }
      }
      else
      {
        alert('undefined gallery settings');
      }

      scrollToHandler();
      contactFormHandler();

      // handle_nav_toggle();
      // handle_active_nav();
      // handle_parallax();
      // handle_loader();

    },

    //public function start here
    scrollToEl: function(el, off_set, options){

      var target = $(el),
          pos = (target.size() > 0) ? target.offset().top : 0,
          myEasing = (options && options.easing) ? options.easing : '[1,.1,0,.97]',
          myDuration = (options && options.duration) ? options.duration : 1300;
      console.log(target);
      // console.log(pos);

      target.velocity("scroll", {
        duration: myDuration,
        easing: myEasing
      });

      return false;
    },
    scrolltoTop: function(){
      myapp.scrollToEl();
    },
    /**
    *
    * Actual send email ajax promise call
    *
    **/
    sendEmail: function(url, type, data){
      return $.ajax({
        url : url,
        type : type,
        dataType: 'json',
        data : data
      });
    },
    setBtnLoading: function(){
      buttonSubmit.html(loadingText);
    },
    setBtnSteady: function(){
      buttonSubmit.html(steadyText);
    }
  }
}(jQuery, window, document));