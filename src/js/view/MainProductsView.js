import View from "./View";
import * as viewHelper from "./ViewHelpers.js";

export default class MainProductsView extends View {
  _viewSection(entries) {
    entries.forEach((entries) => {
      if (!entries.isIntersecting) return;
      entries.target.classList.remove("out-of-port");
    });
  }

  _handlerParentViewIntersection() {
    if (!this._mainParentElement) return;
    const options = {
      root: null,
      threshold: 0.6,
    };
    const observer = new IntersectionObserver(
      this._viewSection.bind(this),
      options
    );
    observer.observe(this._mainParentElement);
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
                <a href="product.html/#${product.id}" class='product-link'>
                    <div class="product" data-id = '${product.id}'>
                        <div class="product-img">
                            <img src="${product.image}" class="product__img">
                        </div>
                        <div class="product-name">
                        <span class="product__name">${product.title}</span>
                        </div>
                        <span class="product__rate">
                            ${viewHelper.generateProductRates(
                              product.rating.rate
                            )}
                            ${product.rating.rate}
                        </span>
                        <span class="product__price">$${product.price}</span>
                    </div>
                </a>
                `;
  }
}
