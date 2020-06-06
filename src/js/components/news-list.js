class NewsList extends AbstractComponent {
  getTemplate() {
    return this._createNewsListTemplate();
  }

  _createNewsListTemplate() {
    return (
      `<ul class="news__list"></ul>`
    );
  }
}
