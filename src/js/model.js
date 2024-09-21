export const productsResults = {
  results: [],
};

export const getProducts = async function () {
  try {
    const allProductsRequest = await fetch("https://fakestoreapi.com/products");
    if (!allProductsRequest.ok) throw new Error(allProductsRequest.status);
    const allProducts = await allProductsRequest.json();
    allProducts.forEach((product) => productsResults.results.push(product));
  } catch (err) {
    throw err;
  }
};

export const getSomeProducts = function (productsPage) {
  const start = (productsPage - 1) * 4;
  const end = productsPage * 4;
  return productsResults.results.slice(start, end);
};

export const getSingleProduct = async function (productId) {
  try {
    const singleProductRequest = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!singleProductRequest.ok) throw new Error(singleProductRequest.status);
    return singleProductRequest.json();
  } catch (err) {
    throw err;
  }
};

export const getProductBy = function (productCategory) {
  const filteredProduct = productsResults.results.filter(
    (product) => product.category === productCategory
  );
  return filteredProduct.slice(0, 4);
};

export const getCartData = function () {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  return cartData;
};

export const updateCartData = function (cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
};
