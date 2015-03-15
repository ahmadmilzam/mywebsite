/*!
 * my-online-portfolio
 * Ahmad Milzam - Frontend Web Architect and Developer
 * https://github.com/ahmadmilzam/csskit
 * @author Ahmad Milzam <email@ahmadmilzam.com>
 * @version 0.0.1
 * Copyright . MIT licensed.
 * 2015-03-16
 */
(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define('smoothScroll', factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.smoothScroll = factory(root);
  }
})(window || this, function (root) {

  'use strict';

  //
  // Variables
  //

  var smoothScroll = {}; // Object for public APIs
  var supports = !!document.querySelector && !!root.addEventListener; // Feature test
  var settings;

  // Default settings
  var defaults = {
    speed: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true,
    callbackBefore: function () {},
    callbackAfter: function () {}
  };


  //
  // Methods
  //

  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists
   * @private
   * @param {Array|Object|NodeList} collection Collection of items to iterate
   * @param {Function} callback Callback function for each iteration
   * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
   */
  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function ( defaults, options ) {
    var extended = {};
    forEach(defaults, function (value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function (value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  /**
   * Get the closest matching element up the DOM tree
   * @param {Element} elem Starting element
   * @param {String} selector Selector to match against (class, ID, or data attribute)
   * @return {Boolean|Element} Returns false if not match found
   */
  var getClosest = function (elem, selector) {
    var firstChar = selector.charAt(0);
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( firstChar === '.' ) {
        if ( elem.classList.contains( selector.substr(1) ) ) {
          return elem;
        }
      } else if ( firstChar === '#' ) {
        if ( elem.id === selector.substr(1) ) {
          return elem;
        }
      } else if ( firstChar === '[' ) {
        if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
          return elem;
        }
      }
    }
    return false;
  };

  /**
   * Escape special characters for use with querySelector
   * @private
   * @param {String} id The anchor ID to escape
   * @author Mathias Bynens
   * @link https://github.com/mathiasbynens/CSS.escape
   */
  var escapeCharacters = function ( id ) {
    var string = String(id);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);
    while (++index < length) {
      codeUnit = string.charCodeAt(index);
      // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.

      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.
      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError(
          'Invalid character: the input contains U+0000.'
        );
      }

      if (
        // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
        // U+007F, […]
        (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
        // If the character is the first character and is in the range [0-9]
        // (U+0030 to U+0039), […]
        (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
        // If the character is the second character and is in the range [0-9]
        // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
        (
          index === 1 &&
          codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
          firstCodeUnit === 0x002D
        )
      ) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }

      // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]
      if (
        codeUnit >= 0x0080 ||
        codeUnit === 0x002D ||
        codeUnit === 0x005F ||
        codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
        codeUnit >= 0x0041 && codeUnit <= 0x005A ||
        codeUnit >= 0x0061 && codeUnit <= 0x007A
      ) {
        // the character itself
        result += string.charAt(index);
        continue;
      }

      // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character
      result += '\\' + string.charAt(index);

    }
    return result;
  };

  /**
   * Calculate the easing pattern
   * @private
   * @link https://gist.github.com/gre/1650294
   * @param {String} type Easing pattern
   * @param {Number} time Time animation should take to complete
   * @returns {Number}
   */
  var easingPattern = function ( type, time ) {
    var pattern;
    if ( type === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
    if ( type === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
    if ( type === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
    if ( type === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
    if ( type === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
    if ( type === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
    if ( type === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
    if ( type === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
    if ( type === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
    if ( type === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
    if ( type === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
    if ( type === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
    return pattern || time; // no easing, no acceleration
  };

  /**
   * Calculate how far to scroll
   * @private
   * @param {Element} anchor The anchor element to scroll to
   * @param {Number} headerHeight Height of a fixed header, if any
   * @param {Number} offset Number of pixels by which to offset scroll
   * @returns {Number}
   */
  var getEndLocation = function ( anchor, headerHeight, offset ) {
    var location = 0;
    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }
    location = location - headerHeight - offset;
    return location >= 0 ? location : 0;
  };

  /**
   * Determine the document's height
   * @private
   * @returns {Number}
   */
  var getDocumentHeight = function () {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  };

  /**
   * Convert data-options attribute into an object of key/value pairs
   * @private
   * @param {String} options Link-specific options as a data attribute string
   * @returns {Object}
   */
  var getDataOptions = function ( options ) {
    return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
  };

  /**
   * Update the URL
   * @private
   * @param {Element} anchor The element to scroll to
   * @param {Boolean} url Whether or not to update the URL history
   */
  var updateUrl = function ( anchor, url ) {
    if ( history.pushState && (url || url === 'true') ) {
      history.pushState( {
        pos: anchor.id
      }, '', window.location.pathname + anchor );
    }
  };

  /**
   * Start/stop the scrolling animation
   * @public
   * @param {Element} toggle The element that toggled the scroll event
   * @param {Element} anchor The element to scroll to
   * @param {Object} settings
   * @param {Event} event
   */
  smoothScroll.animateScroll = function ( toggle, anchor, options ) {

    // Options and overrides
    var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
    var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
    settings = extend( settings, overrides );
    anchor = escapeCharacters(anchor.substr(1)); // Escape special characters and leading numbers

    // Selectors and variables
    var anchorElem = document.getElementById(anchor);
    var fixedHeader = document.querySelector('[data-scroll-header]'); // Get the fixed header
    var headerHeight = fixedHeader === null ? 0 : (fixedHeader.offsetHeight + fixedHeader.offsetTop); // Get the height of a fixed header if one exists
    var startLocation = root.pageYOffset; // Current location on the page
    var endLocation = getEndLocation( anchorElem, headerHeight, parseInt(settings.offset, 10) ); // Scroll to location
    var animationInterval; // interval timer
    var distance = endLocation - startLocation; // distance to travel
    var documentHeight = getDocumentHeight();
    var timeLapsed = 0;
    var percentage, position;

    // Update URL
    updateUrl(anchor, settings.updateURL);

    /**
     * Stop the scroll animation when it reaches its target (or the bottom/top of page)
     * @private
     * @param {Number} position Current position on the page
     * @param {Number} endLocation Scroll to location
     * @param {Number} animationInterval How much to scroll on this loop
     */
    var stopAnimateScroll = function (position, endLocation, animationInterval) {
      var currentLocation = root.pageYOffset;
      if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {
        clearInterval(animationInterval);
        anchorElem.focus();
        settings.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
      }
    };

    /**
     * Loop scrolling animation
     * @private
     */
    var loopAnimateScroll = function () {
      timeLapsed += 16;
      percentage = ( timeLapsed / parseInt(settings.speed, 10) );
      percentage = ( percentage > 1 ) ? 1 : percentage;
      position = startLocation + ( distance * easingPattern(settings.easing, percentage) );
      root.scrollTo( 0, Math.floor(position) );
      stopAnimateScroll(position, endLocation, animationInterval);
    };

    /**
     * Set interval timer
     * @private
     */
    var startAnimateScroll = function () {
      settings.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
      animationInterval = setInterval(loopAnimateScroll, 16);
    };

    /**
     * Reset position to fix weird iOS bug
     * @link https://github.com/cferdinandi/smooth-scroll/issues/45
     */
    if ( root.pageYOffset === 0 ) {
      root.scrollTo( 0, 0 );
    }

    // Start scrolling animation
    startAnimateScroll();

  };

  /**
   * If smooth scroll element clicked, animate scroll
   * @private
   */
  var eventHandler = function (event) {
    var toggle = getClosest(event.target, '[data-scroll]');
    if ( toggle && toggle.tagName.toLowerCase() === 'a' ) {
      event.preventDefault(); // Prevent default click event
      smoothScroll.animateScroll( toggle, toggle.hash, settings, event ); // Animate scroll
    }
  };

  /**
   * Destroy the current initialization.
   * @public
   */
  smoothScroll.destroy = function () {
    if ( !settings ) return;
    document.removeEventListener( 'click', eventHandler, false );
    settings = null;
  };

  /**
   * Initialize Smooth Scroll
   * @public
   * @param {Object} options User settings
   */
  smoothScroll.init = function ( options ) {

    // feature test
    if ( !supports ) return;

    // Destroy any existing initializations
    smoothScroll.destroy();

    // Selectors and variables
    settings = extend( defaults, options || {} ); // Merge user options with defaults

    // When a toggle is clicked, run the click handler
    document.addEventListener('click', eventHandler, false);

  };


  //
  // Public APIs
  //

  return smoothScroll;

});
/*
// @name: Responsive-img.js
// @version: 1.1
//
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under the MIT license
*/

// function isElementInViewport (el) {

//   //special bonus for those using jQuery
//   if (typeof jQuery === "function" && el instanceof jQuery) {
//     el = el[0];
//   }

//   var rect = el.getBoundingClientRect();

//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
//   );
// }

function makeImagesResponsive(){

  var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  ////////GET ALL IMAGES////////

  var images = document.getElementsByTagName('body')[0].getElementsByTagName('img');
  if( images.length === 0 ){
    return;
  }

  ////////HAS ATTR FUNCTION////////

  var hasAttr;
  if(!images[0].hasAttribute){ //IE <=7 fix

    hasAttr = function(el, attrName){ //IE does not support Object.Prototype
      return el.getAttribute(attrName) !== null;
    };

  } else {

    hasAttr = function(el, attrName){
      return el.hasAttribute(attrName);
    };

  }

  ////////CHECK IF DISPLAY IS RETINA////////

  var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;

  ////////LOOP ALL IMAGES////////

  for (var i = 0; i < images.length; i++) {

    var image = images[i];

    // if ( isElementInViewport(image) ) {

      //set attr names
      var srcAttr = ( retina && hasAttr(image, 'data-src2x') ) ? 'data-src2x' : 'data-src';
      var baseAttr = ( retina && hasAttr(image, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';

      //check image attributes
      if( !hasAttr(image, srcAttr) ){
        continue;
      }

      var basePath = hasAttr(image, baseAttr) ? image.getAttribute(baseAttr) : '';


      //get attributes
      var queries = image.getAttribute(srcAttr);

      //split defined query list
      var queries_array = queries.split(',');

      //loop queries
      for(var j = 0; j < queries_array.length; j++){

        //split each individual query
        var query = queries_array[j].replace(':','||').split('||');

        //get condition and response
        var condition = query[0];
        var response = query[1];


        //set empty variables
        var conditionpx;
        var bool;


        //check if condition is below
        if(condition.indexOf('<') !== -1){

          conditionpx = condition.split('<');

          if(queries_array[(j -1)]){

            var prev_query = queries_array[(j - 1)].split(/:(.+)/);
            var prev_cond = prev_query[0].split('<');

            bool =  (viewport <= conditionpx[1] && viewport > prev_cond[1]);

          } else {

            bool =  (viewport <= conditionpx[1]);

          }

        } else {

          conditionpx = condition.split('>');

          if(queries_array[(j +1)]){

            var next_query = queries_array[(j +1)].split(/:(.+)/);
            var next_cond = next_query[0].split('>');

            bool = (viewport >= conditionpx[1] && viewport < next_cond[1]);

          } else {

            bool = (viewport >= conditionpx[1]);

          }

        }


        //check if document.width meets condition
        if(bool){

          var isCrossDomain = response.indexOf('//') !== -1 ? 1 : 0;

          var new_source;
          if(isCrossDomain === 1){
            new_source = response;
          } else {
            new_source = basePath + response;
          }

          if(image.src !== new_source){

            //change img src to basePath + response
            image.setAttribute('src', new_source);

          }

          //break loop
          break;
        }

      }
    // }

  }

}

if(window.addEventListener){

  window.addEventListener('load', makeImagesResponsive, false);
  window.addEventListener('resize', makeImagesResponsive, false);
  // window.addEventListener('scroll', makeImagesResponsive, false);

} else { //ie <=8 fix

  window.attachEvent('onload', makeImagesResponsive);
  window.attachEvent('onresize', makeImagesResponsive);
  // window.attachEvent('onscroll', makeImagesResponsive);

}
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