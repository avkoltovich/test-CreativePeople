const monthMap = {
  'all': `Все месяцы`,
  '01': `Январь`,
  '02': `Феварль`,
  '03': `Март`,
  '04': `Апрель`,
  '05': `Май`,
  '06': `Июнь`,
  '07': `Июль`,
  '08': `Август`,
  '09': `Сентябрь`,
  '10': `Октябрь`,
  '11': `Ноябрь`,
  '12': `Декабрь`
}

const createFilterByYearMarkup = (year) => {
  return (
    `<label class="news__filter-item">
      ${year}
      <input class="visually-hidden" type="radio" name="news-year" id="year-${year}" value="${year}">
    </label>`
  );
};

const createFilterByMonthMarkup = (month) => {
  return (
    `<label class="news__filter-item">
      ${monthMap[month]}
      <input class="visually-hidden" type="radio" name="news-month" id="month-${month}" value="${month}">
    </label>`
  );
};

const createFilterTemplate = (filterArguments) => {
  const {newsMonthsList, newsYearsList, filterMonth, filterYear} = filterArguments;
  const filterByYearsMarkup = newsYearsList.map((item) => createFilterByYearMarkup(item)).join(`\n`);
  const filterByMonthMarkup = newsMonthsList.map((item) => createFilterByMonthMarkup(item)).join(`\n`);
  const yearsLabel = filterYear === `all` ? `Все года` : `${filterYear} год`;


  return `<div class="news__filter">
    <div class="news__filter-news">
      <label class="news__filter-button" for="news-year-dropdown">
        ${yearsLabel}
      </label>
      <input class="visually-hidden" type="checkbox" name="news-year-dropdown" id="news-year-dropdown">
      <fieldset class="news__filter-list" id="years-fieldset">
        <label class="news__filter-item">
          Все года
          <input class="visually-hidden" type="radio" name="news-year" id="year-all" value="all">
        </label>
        ${filterByYearsMarkup}
      </fieldset>
    </div>
    <div class="news__filter-month">
      <label class="news__filter-button" for="news-month-dropdown">
        ${monthMap[filterMonth]}
      </label>
      <input class="visually-hidden" type="checkbox" name="news-month-dropdown" id="news-month-dropdown">
      <fieldset class="news__filter-list" id="months-fieldset">
        <label class="news__filter-item">
          Все месяцы
          <input class="visually-hidden" type="radio" name="news-year" id="month-all" value="all">
        </label>
        ${filterByMonthMarkup}
      </fieldset>
    </div>
  </div>`;
};

class Filter extends AbstractComponent {
  constructor(years, months) {
    super();

    this._years = years;
    this._months = months;
  }

  getTemplate() {
    return createFilterTemplate(this._years, this._months);
  }

  setMonthFilterChangeHandler(handler) {
    const fieldset = this.getElement().querySelector(`#months-fieldset`);
    fieldset.addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      const label = this.getElement().querySelector(`[for="news-month-dropdown"]`);
      label.textContent = monthMap[filterName];
      handler(filterName);
    });
  };

  setYearFilterChangeHandler(handler) {
    const fieldset = this.getElement().querySelector(`#years-fieldset`);
    fieldset.addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      const label = this.getElement().querySelector(`[for="news-year-dropdown"]`);
      label.textContent = filterName === `all` ? `Все года` : `${filterName} год`;
      handler(filterName);
    });
  };
}
