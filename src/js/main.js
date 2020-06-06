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

const activateMobileSlider = (container, slideClass, activeSlideClass) => {
  const slider = document.querySelector(container);
  const slides = slider.querySelectorAll(slideClass);
  let currentActiveSlide = 0;
  let start = 0;
  let end = 0;

  slider.addEventListener(`touchstart`, (evt) => {
    start = evt.touches[0].pageX;
  });

  slider.addEventListener(`touchend`, (evt) => {
    end = evt.changedTouches[0].pageX;

    if (start < end) {
      if (currentActiveSlide !== 0) {
        slides[currentActiveSlide].classList.remove(activeSlideClass);
        currentActiveSlide--;
        slides[currentActiveSlide].classList.add(activeSlideClass);
      }
    } else {
      if ((currentActiveSlide + 1) !== slides.length) {
        slides[currentActiveSlide].classList.remove(activeSlideClass);
        currentActiveSlide++;
        slides[currentActiveSlide].classList.add(activeSlideClass);
      }
    }
  });
}

const activateImageSlider = () => {
  const slider = document.querySelector(`.main-info__slider`);
  const slides = slider.querySelectorAll(`.slider__slide`);
  const sliderControls = document.querySelector(`.main-info__slider-controls`);
  const sliderButtonLeft = sliderControls.querySelector(`.slider-controls__button--left`);
  const sliderButtonRight = sliderControls.querySelector(`.slider-controls__button--right`);
  let currentActiveSlide = 0;

  sliderButtonLeft.addEventListener(`click`, () => {
    if (currentActiveSlide !== 0) {
      slides[currentActiveSlide].classList.remove(`slider__slide--active`);
      currentActiveSlide--;
      slides[currentActiveSlide].classList.add(`slider__slide--active`);
    }
  });

  sliderButtonRight.addEventListener(`click`, () => {
    if ((currentActiveSlide + 1) !== slides.length) {
      slides[currentActiveSlide].classList.remove(`slider__slide--active`);
      currentActiveSlide++;
      slides[currentActiveSlide].classList.add(`slider__slide--active`);
    }
  });
};

activateScrollSiteHeader();
smoothScrollToSection(`#main-info`, `#main-info-scroll-link`);
smoothScrollToSection(`#news-section`, `#news-scroll-link`);

if (window.innerWidth < 768) {
  activateMobileSlider(`.main-info__slider`, `.slider__slide`, `slider__slide--active`);
  activateMobileSlider(`.main-info__text-slider`, `.text-slider__slide`, `text-slider__slide--active`);
} else {
  activateImageSlider();
}

const newsContainer = document.querySelector(`#news-section`);
const SHOWN_NEWS_COUNT = 3;
const newsController = new NewsController(newsContainer, newsMockList, SHOWN_NEWS_COUNT);
newsController.render();
