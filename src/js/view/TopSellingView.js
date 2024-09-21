import MainProductsView from "./MainProductsView.js";

class TopSellingView extends MainProductsView {
  _mainParentElement = document.querySelector(".top-selling-section");
  _parentElement = this._mainParentElement?.querySelector(".products");

  constructor() {
    super();
    this._handlerParentViewIntersection();
  }
}

export default new TopSellingView();
