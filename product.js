// ===============================
// READ PRODUCT ID FROM URL
// ===============================

// Create an object to read URL parameters
let params = new URLSearchParams(window.location.search);

// Get product ID from query string (?id=...)
let productId = params.get("id");

// Log product ID for debugging
console.log("On product page, id =", productId);


// ===============================
// FETCH PRODUCT DETAILS FROM API
// ===============================

fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {

    // Log full product data for debugging
    console.log("Product data:", product);

    // ===============================
    // BASIC PRODUCT INFORMATION
    // ===============================

    // Set product title
    document.getElementById("title").innerText = product.title;

    // Set product image
    document.getElementById("thumbnail").src = product.thumbnail;

    // Set product description
    document.getElementById("description").innerText = product.description;

    // Set product price
    document.getElementById("price").innerText = product.price;

    // Display availability based on stock count
    document.getElementById("availability").innerText =
      product.stock > 0 ? "In Stock" : "Out of Stock";


    // ===============================
    // PRODUCT DETAILS LIST
    // ===============================

    // Get the details list container
    let details = document.getElementById("details");

    // Populate product details dynamically
    details.innerHTML = `
      <li><b>Brand:</b> ${product.brand}</li>
      <li><b>Category:</b> ${product.category}</li>
      <li><b>Rating:</b> ${product.rating}</li>
      <li><b>Stock:</b> ${product.stock}</li>
      <li><b>Discount:</b> ${product.discountPercentage}</li>
      <li><b>SKU:</b> ${product.sku}</li>
      <li><b>Weight:</b> ${product.weight}</li>
      <li><b>Warranty:</b> ${product.warrantyInformation}</li>
      <li><b>Return Policy:</b> ${product.returnPolicy}</li>
      <li><b>Shipping:</b> ${product.shippingInformation}</li>
      <li><b>Minimum Order:</b> ${product.minimumOrderQuantity}</li>
    `;


    // ===============================
    // PRODUCT TAGS
    // ===============================

    // Get tags container
    let tagsDiv = document.getElementById("tags");

    // Clear any existing tags
    tagsDiv.innerHTML = "";

    // Create and append tag elements
    product.tags.forEach(tag => {
      let span = document.createElement("span");
      span.className = "tag";
      span.innerText = tag;
      tagsDiv.appendChild(span);
    });
  })
  .catch(err => console.log(err));
