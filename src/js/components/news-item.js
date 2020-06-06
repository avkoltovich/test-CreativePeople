class NewsItem extends AbstractComponent {
  constructor(newsItem) {
    super();

    this._newsItem = newsItem;
  }

  getTemplate() {
    return this._createNewsItemTemplate(this._newsItem);
  }

  _createNewsItemTemplate(newsItem) {
    const {title, content, date, photo} = newsItem;
    return (
      `<li class="news__item">
        <div class="news__img-wrapper">
          <picture>
            <source media="(min-width: 768px)" srcset="img/news-photo/768/${photo}">
            <img class="news__img" src="img/news-photo/320/${photo}" alt="Описание новости">
          </picture>
        </div>
        <a href="#" class="news__link">
          <h3 class="news__item-heading">
            ${title}
          </h3>
        </a>
        <p class="news__item-text">
          ${content}
        </p>
        <small class="news__date">${date}</small>
      </li>`
    );
  }
}
