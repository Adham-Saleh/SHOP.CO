import View from "./View";

class LandingView extends View {
  _parentElement = document.querySelector(".landing-section");

  constructor() {
    super();
    this._addHandlerShopBtn();
  }

  _addHandlerShopBtn() {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const shopBtn = e.target.closest(".shop-btn");
      if (!shopBtn) return;
      window.scrollTo({
        top: 880,
        behavior: "smooth",
      });
    });
  }
}

export default new LandingView();
