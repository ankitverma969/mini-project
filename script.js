// =======================
// PRODUCT LIST + PAGINATION
// =======================

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    const products = data.products;
    const container = document.getElementById("prod");
    const pagination = document.getElementById("pagination");

    const itemsPerPage = 8; // change if needed
    let currentPage = 1;

    function renderProducts(page) {
      container.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageProducts = products.slice(start, end);

      pageProducts.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        img.src = product.thumbnail;

        let title = document.createElement("h3");
        title.innerText = product.title;

        let price = document.createElement("p");
        price.innerText = "₹ " + product.price;

        card.append(img, title, price);
        container.appendChild(card);

        card.addEventListener("click", () => {
          let history = JSON.parse(localStorage.getItem("viewHistory")) || [];
          history.push({
            productId: product.id,
            time: Date.now()
          });
          localStorage.setItem("viewHistory", JSON.stringify(history));

          window.location.href = `product.html?id=${product.id}`;
        });
      });
    }

    function renderPagination() {
      pagination.innerHTML = "";
      const totalPages = Math.ceil(products.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.addEventListener("click", () => {
          currentPage = i;
          renderProducts(currentPage);
          renderPagination();
        });

        pagination.appendChild(btn);
      }
    }

    renderProducts(currentPage);
    renderPagination();
  })
  .catch(err => console.log(err));


// =======================
// SEARCH BUTTON
// =======================

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  if (!query) return;

  saveSearch(query);
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = "";
});


// =======================
// SAVE SEARCH HISTORY
// =======================

function saveSearch(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const exists = history.some(
    item => item.query.toLowerCase() === query.toLowerCase()
  );

  if (!exists) {
    history.push({
      query: query,
      time: Date.now()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}


// =======================
// SEARCH SUGGESTIONS
// =======================

const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );

  suggestionBox.innerHTML = "";

  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item.query;

    div.addEventListener("click", () => {
      searchInput.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);
  });
});
