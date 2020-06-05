const activateScrollSiteHeader = () => {
  const siteHeader = document.querySelector(`.site-header`);

  let lastScrollPosition = 0;

  window.addEventListener(`scroll`, () => {
    let currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
      if (!(siteHeader.classList.contains(`site-header--scrolled-down`))) {
        siteHeader.classList.add(`site-header--scrolled-down`);
      }
      lastScrollPosition = window.pageYOffset;
    } else {
      siteHeader.classList.remove(`site-header--scrolled-down`);
      lastScrollPosition = window.pageYOffset;
    }
  });
};

const smoothScrollToSection = (sectionID, buttonID) => {
  const section = document.querySelector(sectionID);
  const button = document.querySelector(buttonID);

  button.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    section.scrollIntoView({block: "start", inline: "center", behavior: "smooth"});
  });
};

const activateImageMobileSlider = () => {
  const mainInfoSlider = document.querySelector(`.main-info__slider`);
  const mainInfoSlides = mainInfoSlider.querySelectorAll(`.slider__slide`);
  let currentActiveSlide = 0;

  mainInfoSlider.addEventListener(`click`, () => {
    if ((currentActiveSlide + 1) !== mainInfoSlides.length) {
      mainInfoSlides[currentActiveSlide].classList.remove(`slider__slide--active`);
      currentActiveSlide++;
      mainInfoSlides[currentActiveSlide].classList.add(`slider__slide--active`);
    } else {
      console.log(`end`)
    }
  });
}

activateScrollSiteHeader();
smoothScrollToSection(`#main-info`, `#main-info-scroll-link`);
smoothScrollToSection(`#news-section`, `#news-scroll-link`);
activateImageMobileSlider();
