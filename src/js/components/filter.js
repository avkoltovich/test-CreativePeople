const monthMap = {
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
      <input class="visually-hidden" type="radio" name="news-year" id="all" value="all">
    </label>`
  );
};

const createFilterByMonthMarkup = (month) => {
  return (
    `<label class="news__filter-item">
      ${monthMap[month]}
      <input class="visually-hidden" type="radio" name="news-year" id="all" value="all">
    </label>`
  );
};

const createFilterTemplate = (years, months) => {
  const filterByYearsMarkup = years.map((item) => createFilterByYearMarkup(item)).join(`\n`);
  const filterByMonthMarkup = months.map((item) => createFilterByMonthMarkup(item)).join(`\n`);

  return `<div class="news__filter">
    <div class="news__filter-news">
      <label class="news__filter-button" for="news-year-dropdown">
        ${years[years.length - 1]} год
      </label>
      <input class="visually-hidden" type="checkbox" name="news-year-dropdown" id="news-year-dropdown">
      <fieldset class="news__filter-list" id="years-fieldset">
        ${filterByYearsMarkup}
      </fieldset>
    </div>
    <div class="news__filter-month">
      <label class="news__filter-button" for="news-month-dropdown">
        Все месяцы
      </label>
      <input class="visually-hidden" type="checkbox" name="news-month-dropdown" id="news-month-dropdown">
      <fieldset class="news__filter-list" id="months-fieldset">
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
