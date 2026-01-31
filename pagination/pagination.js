const productDiv = document.getElementById("products");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");

let allproducts = [];
let currentPage = 1;
let windowSize = 8;

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(({ products }) => {
    allproducts = products.reverse(); 
    render();
  });

function render() {
  productDiv.innerHTML = ""; 

  let start = (currentPage - 1) * windowSize;
  let end = start + windowSize;

  allproducts.slice(start, end).forEach(item => {
    const product = document.createElement("div");
    product.className = "product";

    product.innerHTML = `
      <img src="${item.thumbnail}" class="product-img" alt="${item.title}">
      <h3 class="product-title">${item.title}</h3>
      <p class="product-price">Price: $${item.price}</p>
    `;

    product.addEventListener("click", () => {
      let history = JSON.parse(localStorage.getItem("viewHistory")) || [];

      history = history.filter(h => h.id !== item.id);
      history.unshift({ id: item.id, time: Date.now() });

      localStorage.setItem("viewHistory", JSON.stringify(history));
      window.location.href = `product.html?id=${item.id}`;
    });

    productDiv.appendChild(product);
  });

  prevbtn.disabled = currentPage === 1;
  nextbtn.disabled = end >= allproducts.length;
}

prevbtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
});

nextbtn.addEventListener("click", () => {
  if (currentPage * windowSize < allproducts.length) {
    currentPage++;
    render();
  }
});