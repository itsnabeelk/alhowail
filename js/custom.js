animejsPlugins.scrollContainer({
    sectionSelector: '.section-scroll',
    wrapperSelector: '.master',
    duration: 1000,
    easing: 'easeInOutQuad',
    onBegin: (index, anime) => {
      disappear()
    },
    onComplete: (index, anime) => {
      appear(index);
    } 
  })
  
  function appear(index) {
    anime({
      targets: `.section-scroll:nth-child(${index}) h1`,
      opacity: [0, 1],
      duration: anime.random(300, 600),
      easing: 'easeInOutQuad'
    })
  }
  
  function disappear() {
    anime({
      targets: `h1`,
      opacity: [1, 0],
      duration: anime.random(200, 400),
      easing: 'easeInOutQuad'
    })
  }