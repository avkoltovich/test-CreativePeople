class NewsController {
  constructor(container, newsList, shownNewsCount) {
    this._container = container;
    this._newsList = newsList;
    this._shownNewsCount = shownNewsCount;
    this._shownNewsCountStep = shownNewsCount;
    this._shownNewsList = this._newsList.slice(0, this._shownNewsCount);
    this._filterComponent = null;
    this._newsListComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
  }

  render() {

    this._filterComponent = this._createFilterElement();
    this._newsListComponent = this._createNewsListElement();

    render(this._container, this._filterComponent);

    render(this._container, this._newsListComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick)
    render(this._container, this._loadMoreButtonComponent);
  }

  _createFilterElement() {
    const newsYearsList = this._getDownSortedItems(Array.from(new Set(this._shownNewsList.map((item) => item.date.slice(-4)))));
    const newsMonthsList = this._getUpSortedItems(Array.from(new Set(this._shownNewsList.map((item) => item.date.slice(3, 5)))));

    const filterElement = new Filter(newsYearsList, newsMonthsList);

    return filterElement;
  }

  _createNewsListElement() {
    const newsListElement = new NewsList();

    for (const newsItem of this._shownNewsList) {
      const newsItemElement = new NewsItem(newsItem);

      render(newsListElement, newsItemElement);
    }

    return newsListElement;
  }

  _onLoadMoreButtonClick() {
    this._shownNewsCount += this._shownNewsCountStep;
    this._shownNewsList = this._newsList.slice(0, this._shownNewsCount);

    this._rerenderFilterElement()
    this._rerenderNewsListElement();

    if (this._shownNewsCount >= this._newsList.length) {
      this._loadMoreButtonComponent.getElement().remove();
    }
  }

  _getUpSortedItems(items) {
    return items.slice().sort((a, b) => ((+a) - (+b)))
  };

  _getDownSortedItems(items) {
    return items.slice().sort((a, b) => ((+b) - (+a)))
  };

  _rerenderFilterElement() {
    const newFilterElement = this._createFilterElement();
    replace(newFilterElement, this._filterComponent);
    this._filterComponent = newFilterElement;
  }

  _rerenderNewsListElement() {
    const newNewsListElement = this._createNewsListElement();
    replace(newNewsListElement, this._newsListComponent);
    this._newsListComponent = newNewsListElement;
  }
};
