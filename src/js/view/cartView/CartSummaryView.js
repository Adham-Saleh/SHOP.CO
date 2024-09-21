import View from "../View.js";

class CartSummaryView extends View {
  _parentElement = document.querySelector(".order-summary");

  constructor() {
    super();
    this._applyPromoCode();
  }

  calculateOrderSummary(cartProducts) {
    if (!this._parentElement) return;
    const orderSummary = {
      subTotal: 0,
      discount: 0,
      deliveryFees: 0,
      total: 0,

      calcTotal() {
        this.total = this.subTotal + -this.discount + this.deliveryFees;
      },
      calcDiscount() {
        this.discount = this.subTotal * 0.2;
      },
    };
    cartProducts.forEach((product) => {
      orderSummary.subTotal += product.price * product.quantity;
      orderSummary.deliveryFees += Math.floor(product.price / 3);
    });
    orderSummary.calcDiscount();
    orderSummary.calcTotal();
    this._generateOrderSummaryMarkup(orderSummary);
  }

  _applyPromoCode() {
    if(!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const promoBtn = e.target.closest(".apply-btn");
      const promoInput = document.querySelector(".promo-code-user-input");
      const promoIcon = document.querySelector(".promo-icon");
      if (!promoBtn || !promoInput.value) return;
      promoInput.disabled = true;
      promoIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>`;
      promoBtn.textContent = "Applied!";
    });
  }

  _generateOrderSummaryMarkup(orderSummary) {
    const markup = `
                        <span class="summary-title">Order Summary</span>
                        <div class="order">
                            <div class="subtotal order-info">
                                <span class="summart-section-title">Subtotal</span>
                                <span class="summary-section-price">$${orderSummary.subTotal.toFixed(
                                  2
                                )}</span>
                            </div> 
                            <div class="discount order-info">
                                <span class="summart-section-title">Discount (-20%)</span>
                                <span class="summary-section-price summary-discount">-$${orderSummary.discount.toFixed(
                                  2
                                )}</span>
                            </div>
                            <div class="delivery-fee order-info">
                                <span class="summart-section-title">Delivery Fee</span>
                                <span class="summary-section-price">$${
                                  orderSummary.deliveryFees
                                }</span>
                            </div>
                        </div>
                        <div class="hr-container">
                            <hr>
                        </div>
                        <div class="final-price">
                            <span class="summart-section-title">Total</span>
                            <span class="summary-section-price">$${orderSummary.total.toFixed(
                              2
                            )}</span>
                        </div>
                        <div class="promo">
                            <div class="promo-code-input">
                                <div class="promo-icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.2305 8.40469L9.4711 0.645319C9.32643 0.499696 9.15429 0.384242 8.96466 0.305654C8.77503 0.227066 8.57168 0.186908 8.36641 0.187507H1.12501C0.876366 0.187507 0.637909 0.286279 0.462094 0.462094C0.286279 0.637909 0.187507 0.876366 0.187507 1.12501V8.36641C0.186908 8.57168 0.227066 8.77503 0.305654 8.96466C0.384242 9.15429 0.499696 9.32643 0.645319 9.4711L8.40469 17.2305C8.69771 17.5234 9.09506 17.688 9.50938 17.688C9.9237 17.688 10.3211 17.5234 10.6141 17.2305L17.2305 10.6141C17.5234 10.3211 17.688 9.9237 17.688 9.50938C17.688 9.09506 17.5234 8.69771 17.2305 8.40469ZM9.50938 15.6836L2.06251 8.23438V2.06251H8.23438L15.6813 9.50938L9.50938 15.6836ZM5.81251 4.56251C5.81251 4.80973 5.7392 5.05141 5.60184 5.25697C5.46449 5.46253 5.26927 5.62275 5.04086 5.71736C4.81245 5.81197 4.56112 5.83672 4.31864 5.78849C4.07617 5.74026 3.85344 5.62121 3.67862 5.44639C3.50381 5.27157 3.38476 5.04885 3.33652 4.80637C3.28829 4.56389 3.31305 4.31256 3.40766 4.08415C3.50227 3.85574 3.66248 3.66052 3.86804 3.52317C4.07361 3.38582 4.31528 3.31251 4.56251 3.31251C4.89403 3.31251 5.21197 3.4442 5.44639 3.67862C5.68081 3.91304 5.81251 4.23099 5.81251 4.56251Z" fill="black" fill-opacity="0.4"/>
                                    </svg>                                        
                                </div>
                                <div class="promo-input">
                                    <input type="text" class = 'promo-code-user-input' placeholder="Add promo code">
                                </div>
                            </div>
                            <div class="apply">
                                <button class="apply-btn">Apply</button>
                            </div>
                        </div>
                        <div class="checkout">
                            <button class="checkout-btn">
                                <span>Checkout</span>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.91328 0.711753L15.5383 6.33675C15.6257 6.42385 15.695 6.52734 15.7423 6.6413C15.7897 6.75525 15.814 6.87743 15.814 7.00082C15.814 7.1242 15.7897 7.24638 15.7423 7.36033C15.695 7.47429 15.6257 7.57778 15.5383 7.66488L9.91328 13.2899C9.73716 13.466 9.49829 13.5649 9.24922 13.5649C9.00015 13.5649 8.76128 13.466 8.58516 13.2899C8.40904 13.1138 8.31009 12.8749 8.31009 12.6258C8.31009 12.3767 8.40904 12.1379 8.58516 11.9618L12.6094 7.93753L1.125 7.93753C0.87636 7.93753 0.637903 7.83876 0.462087 7.66295C0.286272 7.48713 0.1875 7.24867 0.1875 7.00003C0.1875 6.75139 0.286272 6.51294 0.462087 6.33712C0.637903 6.16131 0.87636 6.06253 1.125 6.06253L12.6094 6.06253L8.58437 2.03832C8.40825 1.8622 8.30931 1.62333 8.30931 1.37425C8.30931 1.12518 8.40825 0.886312 8.58437 0.710192C8.76049 0.534071 8.99937 0.435125 9.24844 0.435125C9.49751 0.435125 9.73638 0.534071 9.9125 0.710192L9.91328 0.711753Z" fill="white"/>
                                </svg>                                    
                            </button>
                        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new CartSummaryView();
