import View from "../View.js";

class ProductReviewView extends View {
  _parentElement = document.querySelector(".rates");

  _writeReviewWindow = document.querySelector(".add-review-page-container");

  constructor() {
    super();
    this._addHandlerOpenWriteReviewSection();
    this._addHandlerSubmitReview()
    this._addHandlerCloseReviewSection()
  }

  _addHandlerOpenWriteReviewSection() {
    if (!this._parentElement) return;
    this._parentElement.addEventListener("click", (e) => {
      const writeReviewBtn = e.target.closest(".write-review");
      if (!writeReviewBtn) return;
      this._writeReviewWindow.classList.toggle("hidden");
      this._writeReviewWindow.firstElementChild.classList.toggle("hidden");
      window.scroll({ top: 0, behavior: "smooth" });
    });
  }

  _addHandlerSubmitReview() {
    if(!this._writeReviewWindow) return;
    this._writeReviewWindow.addEventListener('click', (e) => {
        const submitReviewBtn = e.target.closest(".users-review-submit");
        if(!submitReviewBtn) return;
        this._writeReviewWindow.children[1].classList.toggle("hidden");
        this._writeReviewWindow.lastElementChild.classList.toggle("hidden");
    })
  }

  _addHandlerCloseReviewSection() {
    if(!this._writeReviewWindow) return;
    this._writeReviewWindow.firstElementChild.addEventListener('click', (e) => {
        this._writeReviewWindow.classList.toggle("hidden");
        this._writeReviewWindow.children[1].classList.toggle("hidden");
        this._writeReviewWindow.lastElementChild.classList.toggle("hidden");
    })
  }

}

export default new ProductReviewView();
