import View from "../View.js";
import * as viewHelper from "../ViewHelpers.js";

class ProductsMightLikeView extends View {
  _mainParentElement = document.querySelector(".products-might-like-section");
  _parentElement = this._mainParentElement?.querySelector(".products");

  addHandlerChangeSingleProduct(handler) {
    window.addEventListener("hashchange", () => {
      const productId = window.location.hash;
      handler(productId);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }

  productsMarkup(products) {
    if (!this._parentElement) return;
    const markup = `${products
      .map((product) => this._generateProductMarkup(product))
      .join("")}`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateProductMarkup(product) {
    return `
          <a href="#${product.id}" class = 'product-link'>
            <div class="product-might-like">
                <img src="${
                  product.image
                }" alt="t-shirtProduct" class="product__img"> <br>
              <span class="product__name">${product.title}</span><br>
                <span class="product__rate">
                    ${viewHelper.generateProductRates(
                      product.rating.rate
                    )}                      
                    ${product.rating.rate}
                  </span>
                  <div class="price">
                    <span class="product__price">$${product.price}</span>
                  </div>
            </div>
          </a>`;
  }
}

export default new ProductsMightLikeView();
