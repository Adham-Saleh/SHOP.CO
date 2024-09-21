import MainProductsView from "./MainProductsView.js";

class NewArrivalsView extends MainProductsView {
  _mainParentElement = document.querySelector(".new-arrivals-section");
  _parentElement = this._mainParentElement?.querySelector(".products");

  constructor() {
    super();
    this._handlerParentViewIntersection();
  }
}

export default new NewArrivalsView();
