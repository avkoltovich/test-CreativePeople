const siteHeader = document.querySelector(`.site-header`);

const scrollSiteHeaderHandler = () => {
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

scrollSiteHeaderHandler();

const smoothScrollToSection = (sectionID, buttonID) => {
  const section = document.querySelector(sectionID);
  const button = document.querySelector(buttonID);

  button.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    section.scrollIntoView({block: "start", inline: "center", behavior: "smooth"});
  });
};

smoothScrollToSection(`#main-info`, `#main-info-scroll-link`);
smoothScrollToSection(`#news-section`, `#news-scroll-link`);
