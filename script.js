function debounce(func, wait = 40, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function checkSlide(e){
    sliderImages.forEach(sliderImage => {
      const windowBottom = window.scrollY + window.innerHeight
      const slideInAt = windowBottom + sliderImage.height / 8
      const imageBottom = sliderImage.offsetTop + sliderImage.height
      
      const isHalfShown = slideInAt > sliderImage.offsetTop
      const isNotScrolledPast = window.scrollY < imageBottom
      
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active')
      } else {
        sliderImage.classList.remove('active')
      }
    })
  }

  const sliderImages = document.querySelectorAll('.slide-in')
  window.addEventListener('scroll', debounce(checkSlide))