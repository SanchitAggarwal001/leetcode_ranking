const form = document.getElementById("ranking-form");
const rankingList = document.getElementById("ranking-list");

// Load saved rankings from localStorage on page load
document.addEventListener("DOMContentLoaded", loadRankings);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page refresh on form submission
  
  const date = document.getElementById("date").value;
  const ranking = document.getElementById("ranking").value;

  if (date && ranking) {
    // Create a new ranking object
    const newRanking = { date, ranking };

    // Save the ranking in localStorage
    saveRanking(newRanking);

    // Add the new ranking to the UI
    addRankingToUI(newRanking);

    // Clear input fields
    document.getElementById("date").value = "";
    document.getElementById("ranking").value = "";
  } else {
    alert("Please enter both date and ranking!");
  }
});

// Function to add ranking to the UI
function addRankingToUI(ranking) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span><strong>${ranking.date}</strong> - Ranking: ${ranking.ranking}</span>
    <button onclick="removeItem(this, '${ranking.date}')">Remove</button>
  `;

  // Add the new ranking to the top of the list
  rankingList.insertBefore(listItem, rankingList.firstChild);
}

// Function to save ranking to localStorage
function saveRanking(ranking) {
  const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  rankings.unshift(ranking); // Add the new ranking to the beginning
  localStorage.setItem("rankings", JSON.stringify(rankings));
}

// Function to load rankings from localStorage
function loadRankings() {
  const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  
  // Add rankings to the UI in reverse order so that latest ranking is on top
  rankings.reverse().forEach((ranking) => {
    if (ranking.date && ranking.ranking) {
      addRankingToUI(ranking);
    }
  });
}

// Function to remove a ranking
function removeItem(button, date) {
  // Remove from UI
  button.parentElement.remove();

  // Remove from localStorage
  let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  rankings = rankings.filter((ranking) => ranking.date !== date);
  localStorage.setItem("rankings", JSON.stringify(rankings));
}
