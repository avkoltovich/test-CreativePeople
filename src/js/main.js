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
