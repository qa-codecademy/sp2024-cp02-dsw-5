document.addEventListener('DOMContentLoaded', function() {
  function handleNavClick(event) {
    event.preventDefault();

    let navLinks = document.querySelectorAll('.navlink');
    
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
  }

  let navLinks = document.querySelectorAll('.navlink');

  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Set the home page as active by default
  document.querySelector('.navlink[data-target="homePage"]').classList.add('active');
  document.getElementById('homePage').classList.add('active');
});
