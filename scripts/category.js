async function loadCategoryData() {
  const categoriesUrl = "./assets/categories.json";
  const productsUrl = "./assets/products.json";

  try {
    const [categoriesResponse, productsResponse] = await Promise.all([
      fetch(categoriesUrl),
      fetch(productsUrl),
    ]);

    const categoriesData = await categoriesResponse.json();
    const productsData = await productsResponse.json();

    populateCategories(categoriesData.categories);

    updatePageSize();

    setupPagination(productsData);

    document.getElementById("categories").addEventListener("change", function () {
      currentPage = 1;
      filterProducts(); 
    });
    
    document.getElementById("materials").addEventListener("change", function () {
      currentPage = 1;
      filterProducts();
    });
    
    document.getElementById("pageSize").addEventListener("change", function () {
      currentPage = 1;
      updatePageSize();
    });
    
    document.getElementById("priceRange").addEventListener("input", function () {
      currentPage = 1; 
      filterProducts();
    });
} catch (error) {
  console.error("Error loading data:", error);
}
}

async function loadSalesData() {
  const productsUrl = './assets/products.json';

  try {
    const productsResponse = await fetch(productsUrl);
    const productsData = await productsResponse.json();

    const onSaleProducts = productsData.filter(product => product.onSale);
    populateSalesProducts(onSaleProducts);

  } catch (error) {
    console.error('Error loading sales data:', error);
  }
}

function populateCategories(categories) {
  const categoriesSelect = document.getElementById("categories");
  categoriesSelect.innerHTML = '<option value="all">All</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categoriesSelect.appendChild(option);
  });
}

function populateProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = currentPage * pageSize;

  products.slice(startIndex, endIndex).forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className =
      "card m-2 col-sm-6 col-md-4 col-lg-3 position-relative";
    productDiv.innerHTML = `
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.material}</p>
          <p class="card-description flex-grow-1 hide-on-small-screen">${product.description}</p>
          <div class="mt-auto">
            <p class="card-text" style="font-size: 1.5em;">$${product.price}</p>
            <button class="btn btn-primary add-to-cart-btn mt-3 addToCartBtn" data-product-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
    productList.appendChild(productDiv);
  });

  setupPagination(products);

  attachAddToCartListeners();
}


//Function to handle the sales page products display
function populateSalesProducts(products) {
  const salesProductList = document.getElementById('salesProductList');
  salesProductList.innerHTML = '';

  products.forEach(product => {

    const productDiv = document.createElement('div');
    productDiv.className = 'card m-2 col-sm-6 col-md-4 col-lg-3 position-relative';
    productDiv.innerHTML = `
      <img src="${product.img}" class="card-img-top" alt="${product.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.material}</p>
        <p class="card-description flex-grow-1">${product.description}</p>
        <div class="mt-auto">
          <p class="card-text" style="font-size: 1.5em;">$${product.price}</p>
          <button class="btn btn-primary add-to-cart-btn mt-3 addToCartBtn" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    salesProductList.appendChild(productDiv);
  });
  attachAddToCartListeners();
}
/*
function populateSalesProducts(products) {
  const salesProductList = document.getElementById('salesProductList');
  salesProductList.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'card m-2 col-sm-6 col-md-4 col-lg-3 position-relative';

    // Constructing the product card with hover description
    productDiv.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-description">
          <p>${product.description}</p>
        </div>
      </div>
      <div class="card-body-items d-flex flex-column">
      <h5 class="card-title">${product.name}</h5>
        <div class="card-text">${product.material}</div>
        <div class="mt-auto">
          <p class="card-text" style="font-size: 1.5em;">$${product.price}</p>
          <button class="btn btn-primary add-to-cart-btn mt-3 addToCartBtn" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    salesProductList.appendChild(productDiv);
  });
  attachAddToCartListeners();
}

*/
function filterProducts() {
  const selectedCategory = document.getElementById("categories").value;
  const selectedMaterial = document.getElementById("materials").value;
  const priceRange = document.getElementById("priceRange").value;
  const productsUrl = "assets/products.json";

  fetch(productsUrl)
    .then((response) => response.json())
    .then((data) => {
      let filteredProducts = data.filter((product) => {
        if (
          selectedCategory !== "all" &&
          product.category !== selectedCategory
        ) {
          return false;
        }
        if (
          selectedMaterial !== "all" &&
          product.material.toLowerCase() !== selectedMaterial.toLowerCase()
        ) {
          return false;
        }
        if (product.price > priceRange) {
          return false;
        }
        return true;
      });

      populateProducts(filteredProducts);

      document.getElementById(
        "priceRangeValue"
      ).textContent = `$0 - $${priceRange}`;
    })

    .catch((error) => console.error("Error filtering products:", error));
}

function updatePageSize() {
  pageSize = parseInt(document.getElementById("pageSize").value);
  currentPage = 1;
  filterProducts();
}

function setupPagination(products) {
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = "";

  const pageCount = Math.ceil(products.length / pageSize);

  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
     //here
     if (i === currentPage) {
      li.classList.add("active");
    }
    //to here
    const link = document.createElement("a");
    link.classList.add("page-link");
    link.href = "#";
    link.textContent = i;
    li.appendChild(link);

    link.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      filterProducts();
      window.scrollTo(0, 0);
      updateActivePage(); 
    });

    paginationElement.appendChild(li);
  }
}

function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      addProductToCart(productId);
      //console.log("Product added to cart:", productId);
    });
  });
}

// });


function updateActivePage() {
  const paginationItems = document.querySelectorAll(".pagination .page-item");

  paginationItems.forEach((item, index) => {
    if (index + 1 === currentPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

//search


document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  let searchValue = document.getElementById('searchInput').value.toLowerCase().trim();
  //console.log(searchValue.value);
  // Navigate to searchPage
  let pageSections = document.querySelectorAll('.page-section');
  pageSections.forEach(section => {
    section.classList.remove('active');
  });

  document.getElementById('searchPage').classList.add('active');
  filterProductsByName(searchValue);
});



async function filterProductsByName(searchValue) {
  let productsUrl = "./assets/products.json";
  try {
    let response = await fetch(productsUrl);
    let productsData = await response.json();

    let filteredProducts = productsData.filter(prod => prod.name.toLowerCase().includes(searchValue));

    if (filteredProducts.length > 0) {
      document.getElementById('searchMessage').innerHTML = '<h3>Search Results for: <span style="color:green; font-size:30px">' + searchValue + '</span></h3>';
      populateProductsSearch(filteredProducts);
    } else {
      document.getElementById('searchMessage').innerHTML = '<h3 id="noProductsFound">No products were found for: <span style="color:red; font-size:30px">' + searchValue + '</span></h3>';
      searchProductList.innerHTML = ' ';
    }
  } catch (e) {
    document.getElementById('searchMessage').innerHTML = '<h3>Error filtering' + '</h3>';
  }

};

let searchProductList = document.getElementById("searchProductList");

function populateProductsSearch(products) {

  searchProductList.innerHTML = ' ';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'card m-2 col-sm-6 col-md-4 col-lg-3 position-relative';
    productDiv.innerHTML = `
      <img src="${product.img}" class="card-img-top" alt="${product.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.material}</p>
        <p class="card-description flex-grow-1 hide-on-small-screen">${product.description}</p>
        <div class="mt-auto">
          <p class="card-text" style="font-size: 1.5em;">$${product.price}</p>
          <button class="btn btn-primary add-to-cart-btn mt-3 addToCartBtn" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    searchProductList.appendChild(productDiv);
  });
  attachAddToCartListeners();
}