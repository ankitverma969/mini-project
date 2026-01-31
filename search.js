// ===============================
// READ SEARCH QUERY FROM URL
// ===============================

// Create an object to read URL parameters
let param = new URLSearchParams(window.location.search);

// Get the search query value (?q=...)
let query = param.get("q");


// ===============================
// FETCH PRODUCT DATA FROM API
// ===============================

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {

    // Store all products received from API
    let products = data.products;

    // Filter products based on search query (case-insensitive)
    let filtered = products.filter((p) => {
      return p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });

    // Get container where results will be displayed
    let container = document.getElementById("prod");

    // ===============================
    // DISPLAY FILTERED PRODUCTS
    // ===============================

    filtered.forEach(product => {

      // Create product card
      let card = document.createElement("div");
      card.className = "card";

      // Product image
      let img = document.createElement("img");
      img.src = product.thumbnail;

      // Product title
      let title = document.createElement("h3");
      title.innerText = product.title;

      // Product price
      let price = document.createElement("p");
      price.innerText = "₹ " + product.price;

      // Append elements to card
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);

      // Add card to container
      container.appendChild(card);
    });
  })
  .catch(err => console.log(err));
