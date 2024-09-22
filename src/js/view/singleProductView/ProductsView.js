import View from "../View.js";
import * as viewHelpers from "../ViewHelpers.js";

class ProductView extends View {
  _parentElement = document.querySelector(".product");

  constructor() {
    super();
    this.addHandlerOpenProducts();
    this._addHandlerSelectImg();
  }

  async addHandlerOpenProducts(handler) {
    const productId = window.location.hash;
    typeof handler === "function" ? await handler(productId) : "";
  }

  addHandlerAddToCart(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const addToCartBtn = e.target.closest(".add-to-cart");
      if (!addToCartBtn) return;
      handler();
    });
  }

  addHandlerIncrementProductQuantity(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const incrementBtn =
        e.target.closest(".decrease-btn") || e.target.closest(".increase-btn");
      if (!incrementBtn) return;
      const currentQuantity = document.querySelector(".current-quantity");
      incrementBtn.className.includes("decrease")
        ? +currentQuantity.innerHTML > 1
          ? currentQuantity.innerHTML--
          : ""
        : currentQuantity.innerHTML++;
      handler(null, null, currentQuantity.innerHTML);
    });
  }

  addHandlerSelectSize(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const selectedSize = e.target.closest(".current-size");
      if (!selectedSize) return;
      const allSizes = Array.from(document.querySelectorAll(".current-size"));
      allSizes.forEach((size) => {
        size.classList.remove("selected");
      });
      selectedSize.classList.add("selected");
      handler(null, selectedSize.innerHTML);
    });
  }

  addHandlerSelectColor(handler) {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const selectedColor = e.target.closest(".current-color");
      if (!selectedColor) return;
      const allColors = Array.from(document.querySelectorAll(".current-color"));
      allColors.forEach((color) => (color.innerHTML = ""));
      const markedMarkup = ` 
                            <svg width="15" height="11" viewBox="0 0 15 11" class="marked" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9463 1.89809L5.48459 10.3598C5.41089 10.4337 5.32332 10.4924 5.22689 10.5325C5.13047 10.5725 5.02708 10.5931 4.92268 10.5931C4.81827 10.5931 4.71489 10.5725 4.61846 10.5325C4.52204 10.4924 4.43447 10.4337 4.36077 10.3598L0.658776 6.6578C0.584985 6.58401 0.526451 6.49641 0.486515 6.39999C0.44658 6.30358 0.426025 6.20025 0.426025 6.09589C0.426025 5.99153 0.44658 5.8882 0.486515 5.79179C0.526451 5.69537 0.584985 5.60777 0.658776 5.53398C0.732567 5.46019 0.82017 5.40166 0.916582 5.36172C1.01299 5.32178 1.11633 5.30123 1.22069 5.30123C1.32504 5.30123 1.42838 5.32178 1.52479 5.36172C1.6212 5.40166 1.7088 5.46019 1.7826 5.53398L4.92334 8.67472L12.8238 0.775597C12.9728 0.626569 13.1749 0.542847 13.3857 0.542847C13.5965 0.542847 13.7986 0.626569 13.9476 0.775597C14.0966 0.924625 14.1804 1.12675 14.1804 1.33751C14.1804 1.54826 14.0966 1.75039 13.9476 1.89942L13.9463 1.89809Z" fill="white"/>
                            </svg>     `;
      selectedColor.insertAdjacentHTML("afterBegin", markedMarkup);
      handler(selectedColor.className.split(" ")[1]);
    });
  }

  _addHandlerSelectImg() {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const img = e.target.closest(".img-option");
      if (!img) return;
      const allListImgs = Array.from(
        e.target.closest(".img-list").querySelectorAll(".img-option")
      );
      const mainImg =
        this._parentElement.firstElementChild.firstElementChild
          .firstElementChild;

      mainImg.src = img.src;
      allListImgs.forEach((img) => img.classList.remove("focus-img"));
      img.classList.add("focus-img");
    });
  }

  generateSingleProductMarkup(product) {
    const markup = `
            <div class="product-imgs">
                <div class="main-img">
                    <img src="${product.image}" alt="productImage">
                </div>
                <div class="img-list">
                    <span><img src="${
                      product.image
                    }" class="img-option focus-img" alt=""></span>
                    <span><img src="${
                      product.image
                    }" class="img-option" alt=""></span>
                    <span><img src="${
                      product.image
                    }" class="img-option" alt=""></span>
                </div>
            </div>
            <div class="product-details">
                <div class="product-title">
                    <span>${product.title.split('-')}</span>
                </div>
                <div class="product-review">
                    ${viewHelpers.generateProductRates(product.rating.rate)}
                    ${product.rating.rate}                    
                </div>
                <div class="product-price">
                    <span class="new-price">$${product.price}</span>
                </div>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                <div class="section-hr">
                    <hr>
                </div>
                <div class="colors">
                    <span class="color-title">Select Colors</span>
                    <div class="avaiable-colors">
                        <span class="current-color dark-brown">
                            <svg width="15" height="11" viewBox="0 0 15 11" class="marked" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9463 1.89809L5.48459 10.3598C5.41089 10.4337 5.32332 10.4924 5.22689 10.5325C5.13047 10.5725 5.02708 10.5931 4.92268 10.5931C4.81827 10.5931 4.71489 10.5725 4.61846 10.5325C4.52204 10.4924 4.43447 10.4337 4.36077 10.3598L0.658776 6.6578C0.584985 6.58401 0.526451 6.49641 0.486515 6.39999C0.44658 6.30358 0.426025 6.20025 0.426025 6.09589C0.426025 5.99153 0.44658 5.8882 0.486515 5.79179C0.526451 5.69537 0.584985 5.60777 0.658776 5.53398C0.732567 5.46019 0.82017 5.40166 0.916582 5.36172C1.01299 5.32178 1.11633 5.30123 1.22069 5.30123C1.32504 5.30123 1.42838 5.32178 1.52479 5.36172C1.6212 5.40166 1.7088 5.46019 1.7826 5.53398L4.92334 8.67472L12.8238 0.775597C12.9728 0.626569 13.1749 0.542847 13.3857 0.542847C13.5965 0.542847 13.7986 0.626569 13.9476 0.775597C14.0966 0.924625 14.1804 1.12675 14.1804 1.33751C14.1804 1.54826 14.0966 1.75039 13.9476 1.89942L13.9463 1.89809Z" fill="white"/>
                            </svg>                            
                        </span>
                        <span class="current-color dark-green"></span>
                        <span class="current-color dark-blue"></span>
                    </div>
                </div>
                <div class="section-hr">
                    <hr>
                </div>
                <div class="size">
                    <span class="size-title">Choose Size</span>
                    <div class="available-sizes">
                        <span class="current-size">Small</span>
                        <span class="current-size">Medium</span>
                        <span class="current-size selected">Large</span>
                        <span class="current-size">X-Large</span>
                    </div>
                </div>
                <div class="section-hr">
                    <hr>
                </div>
                <div class="product-action">
                    <div class="product-quantity">
                        <span>
                            <button class="decrease-btn">
                                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8125 1C15.8125 1.24864 15.7137 1.4871 15.5379 1.66291C15.3621 1.83873 15.1236 1.9375 14.875 1.9375H1.125C0.87636 1.9375 0.637903 1.83873 0.462087 1.66291C0.286272 1.4871 0.1875 1.24864 0.1875 1C0.1875 0.75136 0.286272 0.512903 0.462087 0.337087C0.637903 0.161272 0.87636 0.0625 1.125 0.0625H14.875C15.1236 0.0625 15.3621 0.161272 15.5379 0.337087C15.7137 0.512903 15.8125 0.75136 15.8125 1Z" fill="black"/>
                                </svg>   
                            </button>                         
                        </span>
                        <span class="current-quantity">1</span>
                        <span>
                            <button class ="increase-btn">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8125 8C15.8125 8.24864 15.7137 8.4871 15.5379 8.66291C15.3621 8.83873 15.1236 8.9375 14.875 8.9375H8.9375V14.875C8.9375 15.1236 8.83873 15.3621 8.66291 15.5379C8.4871 15.7137 8.24864 15.8125 8 15.8125C7.75136 15.8125 7.5129 15.7137 7.33709 15.5379C7.16127 15.3621 7.0625 15.1236 7.0625 14.875V8.9375H1.125C0.87636 8.9375 0.637903 8.83873 0.462087 8.66291C0.286272 8.4871 0.1875 8.24864 0.1875 8C0.1875 7.75136 0.286272 7.5129 0.462087 7.33709C0.637903 7.16127 0.87636 7.0625 1.125 7.0625H7.0625V1.125C7.0625 0.87636 7.16127 0.637903 7.33709 0.462087C7.5129 0.286272 7.75136 0.1875 8 0.1875C8.24864 0.1875 8.4871 0.286272 8.66291 0.462087C8.83873 0.637903 8.9375 0.87636 8.9375 1.125V7.0625H14.875C15.1236 7.0625 15.3621 7.16127 15.5379 7.33709C15.7137 7.5129 15.8125 7.75136 15.8125 8Z" fill="black"/>
                                </svg>                                
                            </button>
                        </span>
                    </div>
                    <div class="action-btn">
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    this._clear();
    document.querySelector('.product-category').textContent = product.category
    document.title = product.title
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ProductView();
