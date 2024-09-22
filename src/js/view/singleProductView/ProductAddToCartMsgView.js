import View from "../View.js";

class ProductAddToCartView extends View {
  _parentElement = document.querySelector(".add-to-cart-msg");

  constructor() {
    super();
    this._addHandlerCloseAddedMsg();
  }

  generateShopAddedMsg(msg = "product added to cart successfully") {
    if(!this._parentElement) return
    const markup = `<div class="message-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            <span>${msg}</span>
            <button class="add-to-cart-remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
        </div>`;
    this._parentElement.classList.remove("hidden");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _addHandlerCloseAddedMsg() {
    if(!this._parentElement) return
    this._parentElement.addEventListener("click", (e) => {
      const closeMsgBtn = e.target.closest(".add-to-cart-remove");
      if (!closeMsgBtn) return;
      this._parentElement.removeChild(closeMsgBtn.parentElement);
    });
  }
}

export default new ProductAddToCartView();
