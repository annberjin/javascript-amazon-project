import {cart, removeFromCart, getCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((item) => {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === item.productId) {
      return matchingProduct = product;
    }
  });

  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === item.deliveryOptions) {
      deliveryOption = option;
    }
  })

  const currentDate = dayjs();
  const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'day');
  const formattedDate = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
  <div class="cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        ${formattedDate}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
            Update
            </span>
            <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, item)}
        </div>
  </div>
  </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, item) {
  let html = '';
  deliveryOptions.forEach((option) => {
    const currentDate = dayjs();
    const deliveryDate = currentDate.add(option.deliveryDays, 'day');
    const formattedDate = deliveryDate.format('dddd, MMMM D');
    const isChecked = option.id === item.deliveryOptions;
    html += `
    <div class="delivery-option">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      <div>
      <div class="delivery-option-date">
          ${formattedDate}
      </div>
      <div class="delivery-option-price">
          ${option.priceCents===0?'FREE shipping' : `$${(option.priceCents/100).toFixed(2)} - Shipping`}
      </div>
      </div>
    </div>
    `
  });
  return html;
};

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);

    const container = document.querySelector(`.cart-item-container-${productId}`);
    container.remove();
    document.querySelector('.js-return-to-home-link').innerHTML = `${getCartQuantity()} items`;
  });
});

document.querySelector('.js-return-to-home-link').innerHTML = `${getCartQuantity()} items`;