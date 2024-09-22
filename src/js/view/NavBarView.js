import View from "./View.js";

class NavBarView extends View {
  _parentElement = document.querySelector(".nav-content");

  _menuWindow = document.querySelector(".nav-menu");
  _shopWindow = Array.from(document.querySelectorAll(".shop-menu"));
  _navOptions =
    this._parentElement?.querySelector(".nav-options").firstElementChild;

  constructor() {
    super();
    this._addHandlerOpenNavMenu();
    this._addHandlerShopMenu();
    this._addHandlerNewArrivals();
  }

  _addHandlerOpenNavMenu() {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const menuBtn = e.target.closest(".mobile-menu-btn");
      if (!menuBtn) return;
      Array.from(menuBtn.children).forEach((btn) =>
        btn.classList.toggle("hidden")
      );
      this._menuWindow.classList.toggle("hidden");
    });
  }

  _addHandlerShopMenu() {
    document.addEventListener(
      window.innerWidth >= 1370 ? "mouseover" : "click",
      (e) => {
        const shopBtn = e.target.classList.contains("shop");
        if (!shopBtn) return;
        e.target.lastElementChild.classList.toggle("hidden");
      }
    );
  }

  _addHandlerNewArrivals() {
    document.addEventListener("click", (e) => {
      const newArrivalBtn = e.target.classList.contains("new-arrival-btn");
      if (!newArrivalBtn) return;
      const goToSection = document.querySelector(`.${e.target.dataset.goto}`);
      this._menuWindow.classList.add("hidden");
      Array.from(
        this._parentElement.firstElementChild.firstElementChild.children
      ).forEach((btn) => btn.classList.toggle("hidden"));
      goToSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  addHandlerViewCartItemsCount(cartProductsCount) {
    if (!this._parentElement) return;
    const navBtns = Array.from(this._parentElement.lastElementChild.children);
    const cartBtn = navBtns.filter((button) =>
      button.classList.contains("cart-container")
    );
    const [cartContainer] = cartBtn;
    cartContainer.lastElementChild.lastElementChild.innerHTML =
      cartProductsCount;
    cartProductsCount > 0
      ? cartContainer.lastElementChild.classList.remove("hidden")
      : cartContainer.lastElementChild.classList.add("hidden");
  }
}

export default new NavBarView();
