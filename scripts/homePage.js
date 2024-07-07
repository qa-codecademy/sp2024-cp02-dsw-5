
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



