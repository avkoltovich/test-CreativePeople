class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return this._createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  _createLoadMoreButtonTemplate() {
    return (
      `<button class="news__load-more-btn" type="button">загрузить еще</button>`
    );
  }
}
