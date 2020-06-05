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

const filterNews = (year) => {
  const newsList = document.querySelector(`.news__list`);
  const newsItems = newsList.querySelectorAll(`.news__item`);

  newsItems.forEach(item => {
    const newsDate = item.querySelector(`.news__date`).textContent.slice(-4);
    if (item.classList.contains(`news__item--hidden`)) {
      item.classList.remove(`news__item--hidden`);
    }

    if (year !== newsDate && year !== `all`) {
      item.classList.add(`news__item--hidden`);
    }
  });
};

const onInputYearChange = (evt) => {
  const selectedYear = evt.target.id;
  filterNews(selectedYear);
};

activateScrollSiteHeader();
smoothScrollToSection(`#main-info`, `#main-info-scroll-link`);
smoothScrollToSection(`#news-section`, `#news-scroll-link`);
activateMobileSlider(`.main-info__slider`, `.slider__slide`, `slider__slide--active`);
activateMobileSlider(`.main-info__text-slider`, `.text-slider__slide`, `text-slider__slide--active`);
document.querySelector(`#years-fieldset`).addEventListener(`change`, onInputYearChange);
