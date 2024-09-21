import * as model from "./model.js";
import View from "./view/View.js";
import NavBarView from "./view/NavBarView.js";
import OfferView from "./view/OfferView.js";
import ShopMenuView from "./view/shopMenuView.js";
import NewArrivalsView from "./view/NewArrivalsView.js";
import TopSellingView from "./view/TopSellingView.js";
import ReviewsView from "./view/ReviewsView.js";
import ProductsView from "./view/singleProductView/ProductsView.js";
import ProductsMightLikeView from "./view/singleProductView/ProductsMightLikeView.js";
import productReviewView from "./view/singleProductView/productReviewView.js";
import CartView from "./view/cartView/CartView.js";
import CartSummaryView from "./view/cartView/CartSummaryView.js";
import MobileNavMenuView from "./view/MobileNavMenuView.js";
import LandingView from "./view/LandingView.js";

let cart = [];
const currentFocusedProduct = {
  id: null,
  name: "",
  color: "dark-brown",
  size: "large",
  img: "",
  category: "",
  price: null,
  quantity: 1,
};

const getProducts = async function () {
  try {
    NewArrivalsView.renderSpinner();
    TopSellingView.renderSpinner();
    await model.getProducts();
    fetchHomePageNewArrivalsProducts();
    fetchHomePageTopSellingProducts();
  } catch (err) {
    console.log(err);
    NewArrivalsView.renderMsg(err + " Bad Connection", true);
    TopSellingView.renderMsg(err + " Bad Connection", true);
  }
};

const checkCartEmpty = function (cart) {
  if (!(cart.length > 0)) {
    CartView.renderMsg("Cart is empty");
    CartSummaryView.calculateOrderSummary(cart);
    return true;
  }
};

const getCartProducts = async function () {
  CartView.renderSpinner();
  CartSummaryView.renderSpinner();
  const cartProducts = await model.getCartData();
  if (!cartProducts) return;
  if (checkCartEmpty(cartProducts)) return;
  NavBarView.addHandlerViewCartItemsCount(cartProducts.length);
  CartView.addHandlerGenerateCartProducts(cartProducts);
  CartSummaryView.calculateOrderSummary(cartProducts);
  cartProducts.forEach((product) => cart.push(product));
};

const fetchHomePageNewArrivalsProducts = function () {
  const products = model.getSomeProducts(1);
  NewArrivalsView.productsMarkup(products);
};

const fetchHomePageTopSellingProducts = function () {
  const products = model.getSomeProducts(5);
  TopSellingView.productsMarkup(products);
};

const fetchHomePageMightLikeProducts = function () {
  products = model.getProductBy(currentFocusedProduct.category);
  ProductsMightLikeView.productsMarkup(products);
};

const getSingleProductData = async function (id) {
  try {
    ProductsView.renderSpinner();
    if (!id) return;
    const singleProduct = await model.getSingleProduct(id.slice(1));
    if (!(typeof singleProduct === "object")) return;
    currentFocusedProduct.id = singleProduct.id;
    currentFocusedProduct.name = singleProduct.title;
    currentFocusedProduct.category = singleProduct.category;
    currentFocusedProduct.img = singleProduct.image;
    currentFocusedProduct.price = singleProduct.price;
    ProductsView.generateSingleProductMarkup(singleProduct);
    fetchHomePageMightLikeProducts();
  } catch (err) {
    ProductsView.renderMsg(err + ' Bad Connection', true)
  }
};

const getCurrentProductInfo = function (color, size, quantity) {
  const property = color
    ? "color"
    : "" || size
    ? "size"
    : "" || quantity
    ? "quantity"
    : "";
  currentFocusedProduct[`${property}`] = color || size || +quantity;
};

const addToCart = function () {
  let productExists = false;
  cart.forEach((product) => {
    if (
      product.id === currentFocusedProduct.id &&
      product.color.toLowerCase() ===
        currentFocusedProduct.color.toLowerCase() &&
      product.size.toLowerCase() === currentFocusedProduct.size.toLowerCase()
    ) {
      productExists = true;
      product.quantity += +currentFocusedProduct.quantity;
    }
  });
  currentFocusedProduct.timeStampId = (new Date().getTime() + "").slice(-6);
  const temp = { ...currentFocusedProduct };
  !productExists ? cart.push(temp) : "";
  updateCart(cart);
};

const updateCart = function (cart) {
  CartView.addHandlerGenerateCartProducts(cart);
  model.updateCartData(cart);
  CartSummaryView.calculateOrderSummary(cart);
  NavBarView.addHandlerViewCartItemsCount(cart.length);
  if (checkCartEmpty(cart)) return;
};

const addHandlerRemoveProducts = function (productTimeStampId) {
  cart = cart.filter((product) => product.timeStampId !== productTimeStampId);
  updateCart(cart);
};

const updateProductQuantity = function (productTimeStampId, productQuantity) {
  if (!(+productQuantity > 0)) return;
  cart.forEach((product) =>
    product.timeStampId === productTimeStampId
      ? (product.quantity = +productQuantity)
      : ""
  );
  CartSummaryView.calculateOrderSummary(cart);
  model.updateCartData(cart);
};

const init = function () {
  getProducts();
  getCartProducts();
  ProductsView.addHandlerOpenProducts(getSingleProductData);
  ProductsView.addHandlerSelectColor(getCurrentProductInfo);
  ProductsView.addHandlerSelectSize(getCurrentProductInfo);
  ProductsView.addHandlerIncrementProductQuantity(getCurrentProductInfo);
  ProductsView.addHandlerAddToCart(addToCart);
  CartView.addHandlerRemoveProduct(addHandlerRemoveProducts);
  CartView.addHandlerIncrementProductQuantity(updateProductQuantity, addHandlerRemoveProducts);
  ProductsMightLikeView.addHandlerChangeSingleProduct(getSingleProductData);
};
init();