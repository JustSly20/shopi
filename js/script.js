const filterBtn = document.querySelectorAll(".box");
const sideBar = document.querySelector(".side-bar");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-side-bar");
const searchForm = document.querySelector(".search-form");
const searchBtn = document.querySelector("#search-btn");
const cartIcon = document.querySelector(".header .icons .fa-shopping-cart");
const cartTotal = document.querySelector(".cart-total");
const cartDOM = document.querySelector(".shopping-cart .box-container");
const productsDOM = document.querySelector(".products .box-container");

// SWIPER JS SETUP

var swiper = new Swiper(".home-slider", {
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 7500,
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  breakpoints: {
    450: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// FETCHING PRODUCTS FROM THE JSON FILE

const fetchProducts = async () => {
  try {
    const res = await fetch("../products.json");
    const products = await res.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

// INSERTING PRODUCTS INTO THE DOM
const insertProducts = async () => {
  let productHtml = "";
  const products = await fetchProducts();
  await products.forEach((product) => {
    productHtml += `<div class="box">
          <div class="image">
            <img src=${product.image} class="main-img" alt="" />
            <img src=${product.image2} class="hover-img" alt="" />
            <div class="icons">
              <a class="fas fa-shopping-cart" id=${product.id}></a>
              <a class="fas fa-search-plus"></a>
              <a class="fas fa-heart"></a>
              <a class="fas fa-share"></a>
            </div>
          </div>
          <div class="content">
          <h3>${product.title}</h3>
          <div class="price">$${product.newPrice} <span>$${product.oldPrice}</span></div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            </div>
        </div>`;
  });
  productsDOM.innerHTML += productHtml;
};
document.addEventListener("DOMContentLoaded", insertProducts);

// TOGGLING ACTIVE INDICATOR
const toggleIndicator = () => {
  filterBtn.forEach((el) => {
    el.onclick = () => {
      for (btn of filterBtn) {
        btn.classList.remove("active");
      }
      el.classList.add("active");
    };
  });
};
toggleIndicator();
// FILTERING PRODUCTS BY THEIR CATEGORY

const filterProducts = async (id) => {
  const products = await fetchProducts();
  let newProducts = products.filter((product) => product.category === id);
  return newProducts;
};

const filterBtnClick = () => {
  filterBtn.forEach((btn) => {
    const id = btn.dataset.id;

    btn.addEventListener("click", async () => {
      let productHtml = "";
      const newProducts = await filterProducts(id);
      newProducts.forEach((product) => {
        productHtml += `<div class="box">
          <div class="image">
            <img src=${product.image} class="main-img" alt="" />
            <img src=${product.image2} class="hover-img" alt="" />
            <div class="icons">
              <a class="fas fa-shopping-cart" id=${product.id}></a>
              <a class="fas fa-search-plus"></a>
              <a class="fas fa-heart"></a>
              <a class="fas fa-share"></a>
            </div>
          </div>
          <div class="content">
            <h3>${product.title}</h3>
            <div class="price">$${product.newPrice} <span>$${product.oldPrice}</span></div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
          </div>
        </div>`;
      });
      productsDOM.innerHTML = productHtml;
    });
  });
};
filterBtnClick();

// TOGGLING SIDEBAR

menuBtn.onclick = () => {
  sideBar.classList.toggle("active");
};

// CLOSING MENU FUNTIONALITY

closeMenuBtn.onclick = () => {
  sideBar.classList.remove("active");
};

searchBtn.onclick = () => {
  searchForm.classList.toggle("active");
};

window.onscroll = () => {
  sideBar.classList.remove("active");
  searchForm.classList.remove("active");
};

document
  .querySelectorAll(".accordion-container .accordion")
  .forEach((accordion) => {
    accordion.onclick = () => {
      accordion.classList.toggle("active");
    };
  });

// LOCAL STORAGE

// Retrieving Items from Local Storage
const getCart = () => {
  let cart;
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    cart = [];
  }

  return cart;
};

// Initializing Cart
let cart = getCart();

// Setting Item to Cart and Storing it in Local Storage
const setCartItem = (item) => {
  cart = getCart();
  const inCart = cart.find((x) => x.id === item.id);
  if (inCart) {
    return;
  } else {
    cart = [...cart, { ...item, qty: 1 }];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Deleting Item from Local Storage and Storing new Cart value
const deleteCartItem = (id) => {
  const cart = getCart();
  cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// CARTING FUNCTIONALITY

const addItemToCart = async () => {
  const products = await fetchProducts();
  productsDOM.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-shopping-cart")) {
      const item = products.find((x) => x.id === e.target.id);
      if (item) {
        setCartItem(item);
        updateCartValue();
        updateTotal();
      }
    }
  });
};

addItemToCart();
const span = document.querySelector(".cart-span");

// Updating Cart Value
const updateCartValue = () => {
  let tQty = +0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      tQty += +item.qty;
    });
    span.classList.add("active");
    cartIcon.classList.add("cart-icon");
    span.textContent = tQty;
  } else {
    span.classList.remove("active");
  }
};

updateCartValue();

// Rendering Cart Items To The DOM
const renderCartItems = () => {
  let cartHtml = "";
  cart.forEach((item) => {
    cartHtml += `
        <div class="box">
          <i class="fas fa-times" data-id=${item.id}></i>
          <img src=${item.image} alt="" />
          <div class="content">
            <h3>${item.title}</h3>
            <form action="">
              <span>quantity : </span>
              <input type="number" name="" value=${item.qty} data-id=${item.id} id="quantity" min="1" />
            </form>
            <div class="price">$${item.newPrice} <span>$${item.oldPrice}</span></div>
          </div>
        </div>
        `;
  });
  cartDOM.innerHTML = cartHtml;
};

renderCartItems();

// Updating Item Quantity
const updateItemQty = () => {
  cartDOM.addEventListener("change", (e) => {
    if (e.target.id === "quantity") {
      cart = getCart();
      const id = e.target.dataset.id;
      cart.map((item) => {
        if (item.id === id) {
          item.qty = e.target.value;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartValue();
          renderCartItems();
          updateTotal();
        }
      });
    }
  });
};
updateItemQty();

// Deleting from cart
const deleteItem = () => {
  cartDOM.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-times")) {
      cart = getCart();
      const id = e.target.dataset.id;
      cart = cart.filter((x) => x.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartValue();
      renderCartItems();
      updateTotal();
    }
  });
};
deleteItem();
const updateTotal = () => {
  const totalValue = cart.reduce((a, c) => a + c.newPrice * c.qty, 0);
  const discount = totalValue * 0.1;
  const grandTotal = totalValue - discount;

  if (cart.length < 1) {
    cartTotal.innerHTML = `<h1 style="text-align: center;">Cart is empty. Start shopping!</h1>`;
    cartTotal.style.minHeight = "33vh";
  } else {
    cartTotal.innerHTML = `
          <h3>subtotal : <span>$${totalValue.toFixed(2)}</span></h3>
          <h3>discount : <span>$${discount.toFixed(2)}</span></h3>
          <h3>subtotal : <span>$${grandTotal.toFixed(2)}</span></h3>`;
  }
};
updateTotal();
