// ===============================
// LOAD SEARCH HISTORY FROM STORAGE
// ===============================

// Retrieve search history from localStorage
// If no history exists, use an empty array
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Get container where history items will be displayed
let container = document.getElementById("historyList");


// ===============================
// SORT HISTORY BY MOST RECENT
// ===============================

// Sort search history in descending order of time
history.sort((a, b) => b.time - a.time);


// ===============================
// DISPLAY SEARCH HISTORY
// ===============================

history.forEach(item => {

  // Create a container for each history entry
  let div = document.createElement("div");
  div.className = "history-item";

  // Convert stored timestamp to Date object
  let dateObj = new Date(item.time);

  // Format date (DD Mon YYYY)
  let formattedDate = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  // Format time (HH:MM AM/PM)
  let formattedTime = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  // Insert search query, date, and time into history item
  div.innerHTML = `
    <strong>${item.query}</strong>
    <div class="date">${formattedDate}</div>
    <span class="time">${formattedTime}</span>
  `;

  // Redirect to search page when a history item is clicked
  div.addEventListener("click", () => {
    window.location.href = `search.html?q=${encodeURIComponent(item.query)}`;
  });

  // Add history item to the page
  container.appendChild(div);
});


// ===============================
// CLEAR SEARCH HISTORY FUNCTION
// ===============================

// Remove search history from localStorage
// Clear history display from the page
function clearHistory() {
  localStorage.removeItem("searchHistory");
  container.innerHTML = "";
}
