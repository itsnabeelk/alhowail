$.js = function (el) {
    return $('[data-js=' + el + ']')
};

function carousel() {
  $.js('timeline-carousel').slick({
    infinite: false,
    arrows: true,
    arrows: true,
    prevArrow: '<div class="slick-prev"> <div class="btn mr-3 btn-warning d-flex justify-content-center align-items-center"> <div>Previous</div><svg class="ml-1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M10.1,19.1l1.5-1.5L7,13h14.1v-2H7l4.6-4.6l-1.5-1.5L3,12L10.1,19.1z"/> </svg></div></div>',
    nextArrow: '<div class="slick-next"> <div class="btn btn-warning d-flex justify-content-center align-items-center"> <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"/> </svg> <div>Next</div></div></div>',
    dots: false,
    autoplay: false,
    speed: 1100,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  });
}

carousel();

// scroller
  $(document).ready(function () {
      $('.a-pagepiling').pagepiling({

          menu: '#menu',
          anchors: ['Banner', 'Sectors', 'Vision', 'Timeline',],
          loopTop: false,
          loopBottom: false,
          navigation:false,
          afterLoad: function (anchorLink, index) {
              if (index == 1 || index == 3 || index == 5) { // Section with dark backgrounds
                  $('body').addClass('dark-horizontal');
              }
              else {
                  $('body').removeClass('dark-horizontal');
              }


              /*Counter Animation*/
              for (var i = 1; i < 10; i++) {
                  if (i == index) {
                      if ($('.a-counter.counter' + i).length > 0) {
                          $('.a-counter.counter' + i + ':in-viewport').each(function () {
                              //if ( !$(this).hasClass('animated') ){
                              //debugger;
                              $(this).addClass('animated');
                              var thisElement = $(this);
                              $({ count: 0 }).animate({ count: thisElement.attr('data-value') }, {
                                  duration: 5000,
                                  easing: 'swing',
                                  step: function step() {
                                      var mathCount = Math.ceil(this.count);
                                      thisElement.text(mathCount.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
                                  }
                              });
                              //}
                          });

                      }
                  }
              }
          },
          onLeave: function () {
              $('.section.active .slide-bg-list .slide-bg').removeClass('active').eq(0).addClass('active')
          }
      });

      $('.a-pp-prev').on('click', function () {
          $.fn.pagepiling.moveSectionUp();
      });
      $('.a-pp-next').on('click', function () {
          $.fn.pagepiling.moveSectionDown();
      });
  });

//close



var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit Form";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("step");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("signUpForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

// video-script-banner
var bannerVideo = document.getElementById('banner-video');

bannerVideo.addEventListener('click', function() {
  if (bannerVideo.paused) {
    bannerVideo.play();
  } else {
    bannerVideo.pause();
  }
});