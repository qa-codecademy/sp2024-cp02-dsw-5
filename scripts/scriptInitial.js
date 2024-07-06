
document.addEventListener('DOMContentLoaded', function() {

  let currentPage = 1;
  let pageSize = 24;


  function handleNavClick(event) {
    event.preventDefault();

    let navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    this.classList.add('active');

    let target = this.getAttribute('data-target');
    let pageSections = document.querySelectorAll('.page-section');

    pageSections.forEach(section => {
      section.classList.remove('active');
    });

    document.getElementById(target).classList.add('active');


    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });

    if (target === 'categoryPage') {
      loadCategoryData();
    }
    if(target === "salesPage"){
      loadSalesData();
    }
  }

  let navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  })
});

  // Set the home page as active by default
document.querySelector('.nav-link[data-target="homePage"]').classList.add('active');
document.getElementById('homePage').classList.add('active');

let salePageNavButton = document.getElementById("salePageNavButton");
let homeToSale = document.getElementById("homeToSale");
homeToSale.addEventListener("click", function(){
  salePageNavButton.classList.add('active');
});

