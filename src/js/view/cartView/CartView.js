import View from "../View.js";

class CartView extends View {
  _parentElement = document.querySelector(".cart-products");

  addHandlerRemoveProduct(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".delete-product-btn");
      if (!removeBtn) return;
      const productTimeStampId =
        e.target.closest(".product-details").dataset.timeid;
      handler(productTimeStampId);
    });
  }

  addHandlerIncrementProductQuantity(handler, removeHandler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const incrementBtn =
        e.target.closest(".decrease-btn") || e.target.closest(".increase-btn");
      if (!incrementBtn) return;

      const currentProduct = e.target.closest(".product-details");
      const currentQuantity =
        currentProduct.lastElementChild.lastElementChild.children[1];
      const productTimeStampId = currentProduct.dataset.timeid;

      if (incrementBtn.className.includes("decrease")) {
        +currentQuantity.innerHTML > 1 ? currentQuantity.innerHTML-- : removeHandler(productTimeStampId);
        handler(productTimeStampId, currentQuantity.innerHTML);
      }

      if (incrementBtn.className.includes("increase")) {
        currentQuantity.innerHTML++;
        handler(productTimeStampId, currentQuantity.innerHTML);
      }
    });
  }

  addHandlerGenerateCartProducts(cartProducts) {
    if (!this._parentElement) return;
    const markup = `${cartProducts
      .map((product) => this._generateCartProductMarkup(product))
      .join("")}`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateCartProductMarkup(product) {
    return `
                <div class="cart-product">
                        <div class="product-img">
                            <img src="${product.img}" alt="">
                        </div>
                        <div class="product-details" data-timeid = '${product.timeStampId}'>
                            <div class="product-title">
                                <span class="title">${product.name}</span>
                                <button class="delete-product-btn" data-info = '${product.id} ${product.quantity} ${product.color} ${product.size}'>
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.875 2.75H11.75V2.125C11.75 1.62772 11.5525 1.15081 11.2008 0.799175C10.8492 0.447544 10.3723 0.25 9.875 0.25H6.125C5.62772 0.25 5.15081 0.447544 4.79917 0.799175C4.44754 1.15081 4.25 1.62772 4.25 2.125V2.75H1.125C0.95924 2.75 0.800269 2.81585 0.683058 2.93306C0.565848 3.05027 0.5 3.20924 0.5 3.375C0.5 3.54076 0.565848 3.69973 0.683058 3.81694C0.800269 3.93415 0.95924 4 1.125 4H1.75V15.25C1.75 15.5815 1.8817 15.8995 2.11612 16.1339C2.35054 16.3683 2.66848 16.5 3 16.5H13C13.3315 16.5 13.6495 16.3683 13.8839 16.1339C14.1183 15.8995 14.25 15.5815 14.25 15.25V4H14.875C15.0408 4 15.1997 3.93415 15.3169 3.81694C15.4342 3.69973 15.5 3.54076 15.5 3.375C15.5 3.20924 15.4342 3.05027 15.3169 2.93306C15.1997 2.81585 15.0408 2.75 14.875 2.75ZM6.75 12.125C6.75 12.2908 6.68415 12.4497 6.56694 12.5669C6.44973 12.6842 6.29076 12.75 6.125 12.75C5.95924 12.75 5.80027 12.6842 5.68306 12.5669C5.56585 12.4497 5.5 12.2908 5.5 12.125V7.125C5.5 6.95924 5.56585 6.80027 5.68306 6.68306C5.80027 6.56585 5.95924 6.5 6.125 6.5C6.29076 6.5 6.44973 6.56585 6.56694 6.68306C6.68415 6.80027 6.75 6.95924 6.75 7.125V12.125ZM10.5 12.125C10.5 12.2908 10.4342 12.4497 10.3169 12.5669C10.1997 12.6842 10.0408 12.75 9.875 12.75C9.70924 12.75 9.55027 12.6842 9.43306 12.5669C9.31585 12.4497 9.25 12.2908 9.25 12.125V7.125C9.25 6.95924 9.31585 6.80027 9.43306 6.68306C9.55027 6.56585 9.70924 6.5 9.875 6.5C10.0408 6.5 10.1997 6.56585 10.3169 6.68306C10.4342 6.80027 10.5 6.95924 10.5 7.125V12.125ZM10.5 2.75H5.5V2.125C5.5 1.95924 5.56585 1.80027 5.68306 1.68306C5.80027 1.56585 5.95924 1.5 6.125 1.5H9.875C10.0408 1.5 10.1997 1.56585 10.3169 1.68306C10.4342 1.80027 10.5 1.95924 10.5 2.125V2.75Z" fill="#FF3333"/>
                                    </svg>                                        
                                </button>
                            </div>
                            <div class="product-information">
                                <p>Size: <span class="product-size">${product.size}</span></p>
                                <p>Color: <span class="product-color">${product.color}</span></p>
                            </div>
                            <div class="product-price">
                                <span class="price">$${product.price}</span>
                                <div class="quantity">
                                    <button class ="decrease-btn">
                                        <span>
                                            <svg width="13" height="3" viewBox="0 0 13 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.75 1.5C12.75 1.69891 12.671 1.88968 12.5303 2.03033C12.3897 2.17098 12.1989 2.25 12 2.25H1C0.801088 2.25 0.610322 2.17098 0.46967 2.03033C0.329018 1.88968 0.25 1.69891 0.25 1.5C0.25 1.30109 0.329018 1.11032 0.46967 0.96967C0.610322 0.829018 0.801088 0.75 1 0.75H12C12.1989 0.75 12.3897 0.829018 12.5303 0.96967C12.671 1.11032 12.75 1.30109 12.75 1.5Z" fill="black"/>
                                        </svg>
                                    </button>                                            
                                    </span>
                                    <span class="current-quantity">${product.quantity}</span>
                                    <button class ="increase-btn">
                                        <span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.75 6.5C12.75 6.69891 12.671 6.88968 12.5303 7.03033C12.3897 7.17098 12.1989 7.25 12 7.25H7.25V12C7.25 12.1989 7.17098 12.3897 7.03033 12.5303C6.88968 12.671 6.69891 12.75 6.5 12.75C6.30109 12.75 6.11032 12.671 5.96967 12.5303C5.82902 12.3897 5.75 12.1989 5.75 12V7.25H1C0.801088 7.25 0.610322 7.17098 0.46967 7.03033C0.329018 6.88968 0.25 6.69891 0.25 6.5C0.25 6.30109 0.329018 6.11032 0.46967 5.96967C0.610322 5.82902 0.801088 5.75 1 5.75H5.75V1C5.75 0.801088 5.82902 0.610322 5.96967 0.46967C6.11032 0.329018 6.30109 0.25 6.5 0.25C6.69891 0.25 6.88968 0.329018 7.03033 0.46967C7.17098 0.610322 7.25 0.801088 7.25 1V5.75H12C12.1989 5.75 12.3897 5.82902 12.5303 5.96967C12.671 6.11032 12.75 6.30109 12.75 6.5Z" fill="black"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr-container">
                        <hr>
                </div>`;
  }
}

export default new CartView();
