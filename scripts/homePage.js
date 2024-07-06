// let homebtns = document.querySelectorAll(".homeNavLink");

// homebtns.forEach(b => {
//     //let category = this.getAttribute('data-category');
//     b.addEventListener("click",(e) => {
//         e.preventDefault();
//         // let category = e.getAttribute('data-category');
//         let category = e.currentTarget.attributes["data-category"].nodeValue;
//         navigateToCategoryPage(category);
//     });
// })

// function handleCategoryClick(event) {
//     //event.preventDefault();
//     let category = this.getAttribute('data-category');
//     navigateToCategoryPage(category);
//   }

//   function navigateToCategoryPage(category) {
//     let categoryPageLink = document.getElementsByClassName("getCategory");
//     categoryPageLink[0].click();  // Navigate to the category page
//     let selectedCategory = document.getElementById("categories");
//     selectedCategory.value = category;

//     filterProducts();  // Apply the filter
//   }

// function handleCategoryClick(event) {
//   let category = this.getAttribute('data-category');
//   navigateToCategoryPage(category);
// }

document.addEventListener('DOMContentLoaded', function() {
  let homebtns = document.querySelectorAll(".homeNavLink");

  homebtns.forEach(b => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      let category = e.currentTarget.getAttribute('data-category');
      navigateToCategoryPage(category);
    });
  });
});


function navigateToCategoryPage(category) {
  let categoryPageLink = document.getElementsByClassName("getCategory");
  if (categoryPageLink.length > 0) {
    categoryPageLink[0].click();  // navigate to category page
  }
  
  // Use setTimeout to ensure that the category page has time to load before setting the value
  setTimeout(() => {
    let selectedCategory = document.getElementById("categories");
    selectedCategory.value = category;

    // Trigger the change event to apply the filter
    let event = new Event('change');
    selectedCategory.dispatchEvent(event);

    filterProducts();  // Apply the filter
  }, 150);  // Adjust the delay if necessary
  window.scrollTo(0, 0);

}

// function filterProducts() {
//   const selectedCategory = document.getElementById("categories").value;
//   const selectedMaterial = document.getElementById("materials").value;
//   const priceRange = document.getElementById("priceRange").value;
//   const productsUrl = "assets/products.json";

//   fetch(productsUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       let filteredProducts = data.filter((product) => {
//         if (selectedCategory !== "all" && product.category !== selectedCategory) {
//           return false;
//         }
//         if (selectedMaterial !== "all" && product.material.toLowerCase() !== selectedMaterial.toLowerCase()) {
//           return false;
//         }
//         if (product.price > priceRange) {
//           return false;
//         }
//         return true;
//       });

//       populateProducts(filteredProducts);

//       document.getElementById("priceRangeValue").textContent = `$0 - $${priceRange}`;
//     })
//     .catch((error) => console.error("Error filtering products:", error));
// }

// function populateProducts(products) {
//   const productList = document.getElementById("productList");
//   productList.innerHTML = "";

//   let startIndex = (currentPage - 1) * pageSize;
//   let endIndex = currentPage * pageSize;

//   products.slice(startIndex, endIndex).forEach((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.className = "card m-2 col-sm-6 col-md-4 col-lg-3 position-relative";
//     productDiv.innerHTML = `
//       <img src="${product.img}" class="card-img-top" alt="${product.name}">
//       <div class="card-body d-flex flex-column">
//         <h5 class="card-title">${product.name}</h5>
//         <p class="card-text">${product.material}</p>
//         <p class="card-description flex-grow-1">${product.description}</p>
//         <div class="mt-auto">
//           <p class="card-text" style="font-size: 1.5em;">$${product.price}</p>
//           <button class="btn btn-primary add-to-cart-btn mt-3 addToCartBtn" data-product-id="${product.id}">Add to Cart</button>
//         </div>
//       </div>
//     `;
//     productList.appendChild(productDiv);
//   });

//   setupPagination(products);
//   attachAddToCartListeners();
// }


