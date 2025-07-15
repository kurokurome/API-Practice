window.addEventListener("DOMContentLoaded", () => {
  const defaultUsername = " ";
  loadPlayer(defaultUsername);
  loadPlayerStats(defaultUsername);
});

const input = document.getElementById("search-user");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    username = input.value;
    loadPlayer(username);
    loadPlayerStats(username);
  }
});

const errorData = "Error loading data";

async function loadPlayer(username) {
  try {
    const res = await fetch(`https://api.chess.com/pub/player/${username}`);
    const data = await res.json();

    const date = new Date(data.joined * 1000);
    const dateParts = date.toDateString().split(" ");

    const countryRes = await fetch(data.country);
    const countryData = await countryRes.json();
    const countryName = countryData.name;

    document.getElementById("user-country").innerText = countryName;

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${data.username}background=00FFFF`;

    document.getElementById("player-name").innerText = data.name || data.username || "Unknown";
    document.getElementById("player-avatar").src = data.avatar || fallbackAvatar;
    document.getElementById("joined-date").innerText = `Joined: ${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
  } catch (error) {
    document.getElementById("player-name").innerText = errorData;
    document.getElementById("player-avatar").src = "https://ui-avatars.com/api/?name=NA";
    document.getElementById("user-country").innerText = errorData;
    document;
    document.getElementById("joined-date").innerText = errorData;

    console.error("API Error:", error);
  }
}

async function loadPlayerStats(username) {
  try {
    const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const data = await res.json();

    const rapid = data.chess_rapid;
    const lastMatchRapid = rapid?.last?.date;

    const bullet = data.chess_bullet;
    const lastMatchBullet = bullet?.last?.date;

    const blitz = data.chess_blitz;
    const lastMatchBlitz = blitz?.last?.date;

    // Rapid
    document.getElementById("rating-rapid").innerText = rapid?.last?.rating ?? "No data";

    const lastMatchRapidInfo = lastMatchRapid ? new Date(rapid.last.date * 1000).toDateString() : "No match data";
    document.getElementById("last-match-rapid").innerText = lastMatchRapidInfo;

    // Bullet
    document.getElementById("rating-bullet").innerText = bullet?.last?.rating ?? "No data";

    const lastMatchBulletInfo = lastMatchBullet ? new Date(bullet.last.date * 1000).toDateString() : "No match data";
    document.getElementById("last-match-bullet").innerText = lastMatchBulletInfo;

    // Blitz
    document.getElementById("rating-blitz").innerText = blitz?.last?.rating ?? "No data";

    const lastMatchBlitzInfo = lastMatchBlitz ? new Date(blitz.last.date * 1000).toDateString() : "No match data";
    document.getElementById("last-match-blitz").innerText = lastMatchBlitzInfo;
  } catch (error) {
    document.getElementById("rating-rapid").innerText = errorData;
    document.getElementById("rating-bullet").innerText = errorData;
    document.getElementById("rating-blitz").innerText = errorData;
    document.getElementById("last-match-rapid").innerText = errorData;
    document.getElementById("last-match-bullet").innerText = errorData;
    document.getElementById("last-match-blitz").innerText = errorData;

    console.error("API Error:", error);
  }
}
