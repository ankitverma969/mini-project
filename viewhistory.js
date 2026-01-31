const historySection = document.getElementById("products");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");

let viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];
let allproducts = [];
let currentPage = 1;
let windowSize = 8;

if (viewHistory.length === 0) {
  historySection.innerHTML = "<p>No view history yet.</p>";
} else {
  viewHistory
    .sort((a, b) => b.time - a.time);

  Promise.all(
    viewHistory.map(item =>
      fetch(`https://dummyjson.com/products/${item.id}`)
        .then(res => res.json())
        .catch(() => null)
    )
  ).then(products => {
    allproducts = products.filter(Boolean);
    render();
  });
}

function render() {
  historySection.innerHTML = "";

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

    historySection.appendChild(product);
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

const clearViewHistory = () => {
  localStorage.removeItem("viewHistory");
  viewHistory = [];
  allproducts = [];
  currentPage = 1;
  historySection.innerHTML = `<p class="empty-history">No view history yet.</p>`;
};

function goToSearchHistory(){
  window.location.href = 'history.html'
} 


function goToHome(){
    window.location.href = 'index.html'
}