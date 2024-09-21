import View from "./View.js";

class ShopMenuView extends View {
  _parentElement = document.querySelectorAll(".shop-menu");

  _mobileMenuWindow = document.querySelector('.nav-menu')
  _mobileMenuBtn = document.querySelector('.mobile-menu-btn')

  constructor() {
    super();
    this._addHandlerShopMenuOptions();
    this._addHandlerCloseShopMenu();
  }

  _addHandlerCloseShopMenu() {
    if(!this._parentElement) return
    this._parentElement[0].addEventListener("mouseout", () => {
      this._parentElement[0].classList.toggle("hidden");
    });
  }

  _addHandlerShopMenuOptions() {
    if(!this._parentElement) return
    this._parentElement.forEach((parentElement) =>
      parentElement.addEventListener("click", (e) => {
        const optionBtn = e.target.classList.contains("shop-menu-option");
        if (!optionBtn) return;
        const goToSection = document.querySelector(`.${e.target.dataset.goto}`);
        this._mobileMenuWindow.classList.add('hidden')
        Array.from(this._mobileMenuBtn.children).forEach(btn => btn.classList.toggle('hidden'))
        goToSection.scrollIntoView({ behavior: "smooth" });
      })
    );
  }
}

export default new ShopMenuView();
