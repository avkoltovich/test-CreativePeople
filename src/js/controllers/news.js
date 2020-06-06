class NewsController {
  constructor(container, newsList, shownNewsCount) {
    this._container = container;
    this._newsList = this._getSortedNewsByDate(newsList);
    this._filteredNewsList = this._newsList;
    this._shownNewsCount = shownNewsCount;
    this._shownNewsCountStep = shownNewsCount;
    this._shownNewsList = this._filteredNewsList.slice(0, this._shownNewsCount);
    this._filterComponent = null;
    this._newsListComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._filterArguments = {
      filterYear: `all`,
      filterMonth: `all`,
      newsYearsList: this._getDownSortedItems(Array.from(new Set(this._newsList.map((item) => item.date.slice(-4))))),
      newsMonthsList: this._getUpSortedItems(Array.from(new Set(this._newsList.map((item) => item.date.slice(3, 5)))))
    };

    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onMonthChange = this._onMonthChange.bind(this);
    this._onYearChange = this._onYearChange.bind(this);
  }

  render() {
    this._filterComponent = this._createFilterElement();
    this._newsListComponent = this._createNewsListElement();

    render(this._container, this._filterComponent);

    render(this._container, this._newsListComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
    render(this._container, this._loadMoreButtonComponent);
  }

  _checkLoadMoreButton() {
    if (this._shownNewsCount >= this._filteredNewsList.length) {
      this._loadMoreButtonComponent.getElement().remove();
      this._loadMoreButtonComponent = null;
    } else if(!(this._loadMoreButtonComponent)) {
      if (this._shownNewsCount < this._filteredNewsList.length) {
        this._loadMoreButtonComponent = new LoadMoreButton();
        this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
        render(this._container, this._loadMoreButtonComponent);
      }
    }
  }

  _createFilterElement() {
    const filterElement = new Filter(this._filterArguments);
    filterElement.setMonthFilterChangeHandler(this._onMonthChange);
    filterElement.setYearFilterChangeHandler(this._onYearChange);

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

  _getSortedNewsByDate(items) {
    return items.slice().sort((a, b) => {
      const dateA = a.date.split(`.`);
      const dateB = b.date.split(`.`);
      return new Date(dateB[2], dateB[1] - 1, dateB[0]) - new Date(dateA[2], dateA[1] - 1, dateA[0]);
    });
  }

  _getUpSortedItems(items) {
    return items.slice().sort((a, b) => ((+a) - (+b)))
  }

  _getDownSortedItems(items) {
    return items.slice().sort((a, b) => ((+b) - (+a)))
  }

  _onFilterChange() {
    this._filteredNewsList = this._newsList.slice();

    if (this._filterArguments.filterYear !== `all`) this._filteredNewsList = this._filteredNewsList.filter((item) => item.date.slice(-4) === this._filterArguments.filterYear);

    this._filterArguments.newsMonthsList = this._getUpSortedItems(Array.from(new Set(this._filteredNewsList.map((item) => item.date.slice(3, 5)))));

    if (this._filterArguments.filterMonth !== `all`) this._filteredNewsList = this._filteredNewsList.filter((item) => item.date.slice(3, 5) === this._filterArguments.filterMonth);

    this._shownNewsList = this._filteredNewsList.slice(0, this._shownNewsCount);

    this._rerenderFilterElement();
    this._rerenderNewsListElement();

    this._checkLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    this._shownNewsCount += this._shownNewsCountStep;
    this._shownNewsList = this._filteredNewsList.slice(0, this._shownNewsCount);

    this._rerenderNewsListElement();

    this._checkLoadMoreButton();
  }

  _onMonthChange(month) {
    this._filterArguments.filterMonth = month;

    this._onFilterChange();
  }

  _onYearChange(year) {
    this._filterArguments.filterYear = year;
    this._filterArguments.filterMonth = `all`;

    this._onFilterChange();
  }

  _rerenderFilterElement() {
    const newFilterElement = this._createFilterElement();
    replace(newFilterElement, this._filterComponent);
    this._filterComponent = newFilterElement;
  }

  _rerenderNewsListElement() {
    const newFilterElement = this._createNewsListElement();
    replace(newFilterElement, this._newsListComponent);
    this._newsListComponent = newFilterElement;
  }
};
