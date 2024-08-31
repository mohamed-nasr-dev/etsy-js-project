"use strict";
// ********************************************************for showing the products********************************************************
const productsBox = document.querySelector(".products-box"); //this is the parent that holds the cards of products.
const imgsDescription = document.querySelector(".imgs");
const mainImgDescription = document.querySelector(".img");
const descriptionDetails = document.querySelector(".description-details");
const searchIconBtn = document.querySelector(".search-icon");
let searchInputTag = document.querySelector("#search");
const productCardBox = document.querySelector(".product");
let searchValue;
let searchedProductObj;
let rateForDescriptionPage = "";
const prevPageButton = document.querySelector(".prev-page");
const nextPageButton = document.querySelector(".next-page");
const pageInfo = document.querySelector(".page-info");
const itemsPerPage = 9; // Number of products per page
let currentPage = 1;
let products;

// fetching the data from the json file to get the products
const cart = [];
const xhr = new XMLHttpRequest();
xhr.open("get", "./json.json");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    products = JSON.parse(xhr.response);
    showProducts(currentPage);

    // add event to the parent(productsBox) that holds the cards
    productsBox.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.tagName === "BUTTON") {
        // products.find(pro=>{e.target.parentNode.parentNode});
        // get the id of the product that i pressed on it
        let id = e.target.parentNode.parentNode.dataset.id;
        const productObj = products.find((pro) => pro.id == id);
        //after we take the object we will push it into a new array and add it to local storage.
        cart.push(productObj); //add the object to the array cart.
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(productObj.title, " Added to cart 💹");
      }
      // add event to the img box card to open the description of the product
      if (e.target.classList.contains("product-img")) {
        let id = e.target.parentNode.dataset.id;
        const productObj = products.find((pro) => pro.id == id);
        console.log(productObj);
        sessionStorage.setItem(
          "searchedProductObj",
          JSON.stringify(productObj)
        ); // send the object to the description page using session storage.
        const descriptionWindow = window.open(
          "./productDescription.html",
          "_blank"
        );
        descriptionWindow.focus();
      }
    });
  }
};
xhr.send();

// for pagination
function showProducts(page) {
  productsBox.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedProducts = products.slice(start, end);
  let rate = "";
  paginatedProducts.forEach((product) => {
    let productRate = Math.floor(product.rate);
    let rate = getRate(productRate);
    rateForDescriptionPage = getRate(productRate);

    let productCard = `<div class="product" data-id="${product.id}">
                          <img
                            src=${product.mainImg}
                            alt=${product.title}
                            class="product-img"
                          />
                          <div class="product-details">
                            <p class="product-title">${product.title}</p>
                            <p class="product-rate">(${product.rate}) ${rate}</p>
                            <p class="product-price-box">
                              The price of this item is:
                              <span class="product-price">${product.price}</span>
                            </p>
                            <button class="add-to-cart-btn">
                              Add to Cart <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                          </div>
                    </div>`;

    productsBox.innerHTML += productCard;

    sessionStorage.setItem(
      "rateForDescriptionPage",
      JSON.stringify(rateForDescriptionPage)
    );
  });
  // Update page info
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    products.length / itemsPerPage
  )}`;
}

// Event listeners for pagination buttons
prevPageButton?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showProducts(currentPage);
  }
});

nextPageButton?.addEventListener("click", () => {
  if (currentPage < Math.ceil(products.length / itemsPerPage)) {
    currentPage++;
    showProducts(currentPage);
  }
});

// get the rate function
function getRate(productRate) {
  let rate = "";
  if (productRate == 1) {
    rate = "★☆☆☆☆";
  } else if (productRate == 2) {
    rate = "★★☆☆☆";
  } else if (productRate == 3) {
    rate = "★★★☆☆";
  } else if (productRate == 4) {
    rate = "★★★★☆";
  } else {
    rate = "★★★★★";
  }
  return rate;
}

//*******************************************************************handling the search input***********************************************
function searchTitle(e) {
  let searchInput = searchInputTag.value;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./json.json", false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      let titlesList = document.getElementById("titles");
      titlesList.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let key = data[i];

        if (key.title.toLowerCase().includes(searchInput.toLowerCase())) {
          let option = document.createElement("option");
          option.value = data[i].title;
          titlesList.appendChild(option);
        }
      }

      const value = searchInputTag.value;
      if (value) {
        searchValue = value;

        // mainImgDescription.innerHTML = "";
        // imgsDescription.innerHTML = "";
        searchedProductObj = data.find((pro) => pro.title == value);
        sessionStorage.setItem(
          "searchedProductObj",
          JSON.stringify(searchedProductObj)
        ); // send the object to the description page using session storage.
      }
    }
  };

  xhr.send();
}

searchInputTag.addEventListener("input", searchTitle);
searchIconBtn.addEventListener("click", (e) => {
  const descriptionWindow = window.open("./productDescription.html", "_blank");
  descriptionWindow.focus();
});

// for category button
// document.querySelector(".dropdownlist").addEventListener("click", function () {
//   var dropdown = document.getElementById("myDropdown");
//   if (dropdown.style.display === "none") {
//     dropdown.style.display = "block";
//   } else {
//     dropdown.style.display = "none";
//   }
// });

function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".categories-btn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
