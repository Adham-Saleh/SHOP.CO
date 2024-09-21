import View from "./View.js";

class ReviewsView extends View {
  _parentElement = document.querySelector(".review-section");

  constructor() {
    super();
    this.addHandlerRightArr();
    this.addHandlerleftArr();
    this.reviewTransform();
  }

  reviewTransform() {
    if(!this._parentElement) return
    const reviews = Array.from(this._parentElement.querySelectorAll(".review"));
    const screenWidth = window.innerWidth;
    reviews.forEach((review) => {
      screenWidth > 750 ? (review.style.transform = "translateX(-80%)") : "";
    });
  }

  addHandlerRightArr() {
    if(!this._parentElement) return
    this._parentElement.addEventListener("click", (e) => {
      const rightArrBtn = e.target.parentElement
        .closest("button")
        .classList.contains("slide-right-arr");
      if (!rightArrBtn) return;
      this.moveReviews(-1);
    });
  }

  addHandlerleftArr() {
    if(!this._parentElement) return
    this._parentElement.addEventListener("click", (e) => {
      const leftArrBtn = e.target.parentElement
        .closest("button")
        .classList.contains("slide-left-arr");
      if (!leftArrBtn) return;
      this.moveReviews(1);
    });
  }

  moveReviews(direction) {
    const reviews = Array.from(this._parentElement.querySelectorAll(".review"));
    const screenWidth = window.innerWidth;
    reviews.forEach((review) => {
      const oldTransform = review.style.transform;
      const oldTransformValue = +oldTransform.split("(")[1].split("%")[0];
      review.style.transform = `translateX(${
        oldTransformValue + (screenWidth > 750 ? 80 : 105) * direction
      }%)`;
      this.handlerReviewIntersection(review)
    });
  }

  ReviewIntersectionCallBack(entries) {
    entries.forEach((entry) => {
      const isNotFullyVisibleX = entry.boundingClientRect.left < 0 || entry.boundingClientRect.right > window.innerWidth;

      if (isNotFullyVisibleX) {
        entry.target.classList.add('intersecting');
      } else {
        entry.target.classList.remove('intersecting');
      }
      
    });
  }
  
  handlerReviewIntersection(review) {
    const options = {
      root: null,
      threshold: 1,
    };
    const observer = new IntersectionObserver(
      this.ReviewIntersectionCallBack.bind(this),
      options
    );
    observer.observe(review);
  }
  
}

export default new ReviewsView();
