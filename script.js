const productDiv = document.getElementById("products");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");

const form = document.getElementById("search-form");
const searchbar = document.getElementById("search-bar");

let allproducts = [];
let currentPage = 1;
let windowSize = 8;

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(({ products }) => {
    allproducts = products; 
    render();
  })
  .catch(err => console.error("Fetch failed:", err));

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




form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchbar.value.trim();
  if (!query) return;
  
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
  let exists = history.some(item => item.query.toLowerCase() === query.toLowerCase())

  if(!exists){
    history.unshift({
      query: query,
      time: Date.now()
    });
  }
  localStorage.setItem("searchHistory",JSON.stringify(history));

  window.location.href = `search.html?search=${encodeURIComponent(query)}`;
});

const suggestionBox = document.getElementById("suggestion-box");
searchbar.addEventListener("input", () => {
  suggestionBox.style.display = "block"
  const text = searchbar.value.trim().toLowerCase();
  suggestionBox.innerHTML = "";
  
  if (!text) {
    suggestionBox.style.display = "none"
    return;
  }
  
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );
  
  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item.query;

    div.addEventListener("click", () => {
      searchbar.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);
  });
});

function goToSearchHistory(){
  window.location.href = 'history.html'
} 
function goToViewHistory(){
  window.location.href = 'viewhistory.html'
} 