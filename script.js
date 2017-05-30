const sliderImages = document.querySelectorAll('.slide-in')
window.addEventListener('scroll', debounce(checkSlide))

const links = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)

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

  function highlightLink(){
    // gives location of an item in window on page load
    const linkCoords = this.getBoundingClientRect()
    
    // account for scroll in calculatedCoords
    const calculatedCoords = {
      width: linkCoords.width,
      height: linkCoords.height,
      left: linkCoords.left + window.scrollX,
      top: linkCoords.top + window.scrollY,
    }

    highlight.style.width = `${calculatedCoords.width}px`
    highlight.style.height = `${calculatedCoords.height}px`
    highlight.style.transform = `translate(${calculatedCoords.left}px, ${calculatedCoords.top}px)`
    console.log(highlight)

  }

  links.forEach(a => {
    a.addEventListener('mouseenter', highlightLink)
  })