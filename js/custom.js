// dropdown-script

document.addEventListener("DOMContentLoaded", function() {
  var dropdownToggles = document.querySelectorAll(".drop-menu");

  dropdownToggles.forEach(function(dropdownToggle) {
    var dropdownMenu = dropdownToggle.nextElementSibling;
    var isOpen = false;

    dropdownToggle.addEventListener("click", function() {
      isOpen = !isOpen;

      if (isOpen) {
        dropdownMenu.style.maxHeight = "0";
        dropdownMenu.style.display = "block";
        var height = dropdownMenu.scrollHeight;
        dropdownMenu.style.maxHeight = height + "px";
        dropdownToggle.querySelector("i").classList.replace("fa-plus", "fa-minus");
      } else {
        dropdownMenu.style.maxHeight = "0";
        setTimeout(function() {
          dropdownMenu.style.display = "none";
          dropdownToggle.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }, 300);
      }
    });
  });
})
// close


// timeline
  var timelineBlocks = document.querySelectorAll('.timeline-block-right, .timeline-block-left');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

timelineBlocks.forEach(function (block) {
  observer.observe(block);
});
// timeline



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

