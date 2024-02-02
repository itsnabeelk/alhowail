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
