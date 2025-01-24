export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        return matchingItem = item;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

export function removeFromCart(productId) {
  cart = cart.filter((item) => {
    return productId !== item.productId;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}