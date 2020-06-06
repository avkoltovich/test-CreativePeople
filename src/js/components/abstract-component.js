class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement(this.getTemplate());
    }

    return this._element;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }
}
