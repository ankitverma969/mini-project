const params = new URLSearchParams(window.location.search);
const query = params.get("id");
const productDetail = document.getElementById("product-detail")
const form = document.getElementById("search-form");
const searchbar = document.getElementById("search-bar");

console.log(query)
fetch(`https://dummyjson.com/products/${query}`)
.then(response => response.json())
.then((product)=>{
    console.log(product);
    document.getElementById("image").src = product.images[0]
    document.getElementById("availability").innerText = product.availabilityStatus
    document.getElementById("title").innerText = product.title
    document.getElementById("brand").innerText = "Brand: "+product.brand
    document.getElementById("rating").innerText = "Rating: "+product.rating
    document.getElementById("price").innerText = "Price: $" +product.price
    document.getElementById("description").innerText = `Description: ${product.description}`
    document.getElementById("minOrder").innerText = "Minimum Order Quantity: "+product.minimumOrderQuantity
    
    document.getElementById("availability").style.color = product.availabilityStatus == "In Stock" ? "green" : "red";
    document.getElementById("availability").style.border = product.availabilityStatus == "In Stock" ? "2px solid green" : "2px solid red";
})

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

function goToHistory(){
  window.location.href = 'history.html'
} 

function goToSearchHistory(){
  window.location.href = 'history.html'
} 
function goToViewHistory(){
  window.location.href = 'viewhistory.html'
} 