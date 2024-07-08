
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




//sales page btn in the homepage acts as a navbar homepage btn
let salesPageBtnFromHomePage = document.getElementById("homeToSale");
salesPageBtnFromHomePage.addEventListener("click", (e) => {
  e.preventDefault();
  let salesPageBtnFromNavBar = document.getElementById("salePageNavButton");
  
  let clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
  });
  salesPageBtnFromNavBar.dispatchEvent(clickEvent);
});

//logo in the navbar acts same as homePage btn in navbar
let navLogo = document.getElementById("navLogo");
navLogo.addEventListener("click", (e) => {
  e.preventDefault();
  let homeBtnFromNavBar = document.querySelector(".getHomeBtnNav");
  
  let clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
  });
  homeBtnFromNavBar.dispatchEvent(clickEvent);
});
