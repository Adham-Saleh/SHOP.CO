import View from "./View.js";

class SearchBarView extends View {
  _parentElement = document.querySelector(".search-results");
  _searchField = document.querySelector(".search-input");

  searchBarSingleProducts(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const product = e.target.closest(".result");
      if (!product) return;
      handler(`#${product.dataset.id}`);
    });
  }

  addHandlerSearchFieldInput(handler) {
    ["keyup", "focusout"].forEach((event) =>
      this._searchField.addEventListener(event, () => {
        event === "keyup"
          ? handler(this._searchField.value)
          : setTimeout(
              () => this._parentElement.parentElement.classList.add("hidden"),
              100
            );
      })
    );
  }

  generateSearchResults(products) {
    const markup = `${products
      .map((product) => this._generateSearchResultsMarkup(product))
      .join("")}`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    products.length > 0
      ? this._parentElement.parentElement.classList.remove("hidden")
      : this._parentElement.parentElement.classList.add("hidden");
  }

  _generateSearchResultsMarkup(product) {
    return `
        <a href = "${
          window.location.href.includes("product")
            ? `#${product.id}`
            : `product.html/#${product.id}`
        }">
        <div class="result" data-id ="${product.id}">
          <div class="result-img-container">
            <img src="${product.image}" alt="" class="result-img">
          </div>
          <div class="result-title-container">
            <span class="result-title">${product.title}</span>
          </div>
        </div>`;
  }
}

export default new SearchBarView();
