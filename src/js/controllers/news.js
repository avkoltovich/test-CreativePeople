class NewsController {
  constructor(container, newsList, shownNewsCount) {
    this._container = container;
    this._newsList = newsList;
    this._shownNewsCount = shownNewsCount;
    this._shownNewsCountStep = shownNewsCount;
    this._newsListComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
  }

  render() {
    this._newsListComponent = this._createNewsListElement();

    render(this._container, this._newsListComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick)
    render(this._container, this._loadMoreButtonComponent);
  }

  _createNewsListElement() {
    const newsListElement= new NewsList();

    for (let index = 0; index < this._shownNewsCount; index++) {
      const newsItemElement = new NewsItem(this._newsList[index]);

      render(newsListElement, newsItemElement);
    }

    return newsListElement;
  }

  _onLoadMoreButtonClick() {
    this._shownNewsCount += this._shownNewsCountStep;

    const newNewsListElement = this._createNewsListElement();
    replace(newNewsListElement, this._newsListComponent);
    this._newsListComponent = newNewsListElement;

    if (this._shownNewsCount >= this._newsList.length) {
      this._loadMoreButtonComponent.getElement().remove();
    }
  }
};
