import View from "./View.js";

class MobileNavMenuView extends View {
  _parentElement = document.querySelector(".nav-menu");

  constructor() {
    super();
    this._addHandlerShopMenuOptions();
  }

  _addHandlerShopMenuOptions() {
    // this._parentElement.addEventListener("click", (e) => {
    //   const optionBtn = e.target.classList.contains("shop-menu-option");
    //   if (!optionBtn) return;
    //   const goToSection = document.querySelector(`.${e.target.dataset.goto}`);
    //   this._parentElement.classList.add("hidden");
    //   goToSection.scrollIntoView({ behavior: "smooth" });
    // });
  }
}

export default new MobileNavMenuView();
