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


