 /*// SEARCH OPTION
 let searchValue = document.getElementById('searchInput');

 document.getElementById('searchForm').addEventListener('submit', function(event) {
     event.preventDefault();

     //console.log(searchValue.value);
     
     // Navigate to searchPage
     let pageSections = document.querySelectorAll('.page-section');
     pageSections.forEach(section => {
         section.classList.remove('active');
     });
     
     document.getElementById('searchPage').classList.add('active');
     
     // Optional: Set search results or any search-related logic here
     document.getElementById('searchPage').innerHTML = '<h3>Search Results for: ' + searchValue.value + '</h3>';
     /* call a funcion for filtering and displaying all items containing the search word
     ex callFunction(searchValue.value)
     
 });

 /*function displayProducts(searchValue){
        //filter products that contain searchValue
        (text would be the name (or category name) of the object(of the product))
        let result = text.includes(searchValue);
 }*/

// SEARCH OPTION



document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let searchValue = document.getElementById('searchInput').value.toLowerCase();
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
        document.getElementById('searchPage').innerHTML = '<h3>Search Results for: ' + searchValue + '</h3>';
        populateProductsSearch(filteredProducts);
      } else {
        document.getElementById('searchPage').innerHTML = '<h3>No products match: ' + searchValue + '</h3>';
      }
    } catch (e) {
      document.getElementById('searchPage').innerHTML = '<h3>Error filtering' + '</h3>';
    }
  
  };
  
  let searchProductList = document.getElementById("searchProductList");
  console.log(searchProductList);
  
  function populateProductsSearch(products) {

    searchProductList.innerHTML = ' ';
  
    console.log('Populating products search list:', products);
  
    products.forEach(product => {
      console.log('Creating product card for:', product);
  
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