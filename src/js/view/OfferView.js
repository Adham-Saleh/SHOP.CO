import View from "./View.js";

class OfferView extends View {
  _parentElement = document.querySelector(".offer");

  constructor() {
    super();
    this._addHandlerCloseOfferLable()
  }

  _addHandlerCloseOfferLable() {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const closeOfferBtn = e.target.closest(".action");
      if (!closeOfferBtn) return;
      this._parentElement.classList.toggle("hidden");
    });
  }
}

export default new OfferView();
