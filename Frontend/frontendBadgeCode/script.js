// script.js

//changing the colour of the bage based on the provided level
function giveBadgeMeat(badgeLevel){
if (badgeLevel == 1){
  document.getElementById("badge-svg").classList.replace("badge-colour-1","badge-bronze-1");
  document.getElementById("badge-svg").classList.replace("badge-colour-2","badge-bronze-2")
  document.getElementById("badge-svg").classList.replace("badge-colour-3","badge-bronze-3")
}else if (badgeLevel == 2){
  document.getElementById("badge-svg").classList.replace("badge-colour-1","badge-silver-1");
  document.getElementById("badge-svg").classList.replace("badge-colour-2","badge-silver-2")
  document.getElementById("badge-svg").classList.replace("badge-colour-3","badge-silver-3")
}else if (badgeLevel == 3){
  document.getElementById("badge-svg").classList.replace("badge-colour-1","badge-gold-1");
  document.getElementById("badge-svg").classList.replace("badge-colour-2","badge-gold-2")
  document.getElementById("badge-svg").classList.replace("badge-colour-3","badge-gold-3")
}

document.getElementById("inner-badge-image").src="C:\Users\slunt\UniversityStuff\UBC_Year_3\Hackathon2025\Frontend\badgeGraphics\innerBadgeGraphics\constellation.jpg";
}
//ai stuff
/*document.addEventListener("DOMContentLoaded", function () {
  const badgeName = document.getElementById("badge-name");
  const badgeDescription = document.getElementById("badge-description");
  const badgeLevel = document.getElementById("level-value");
  const badgeInnerImage = document.getElementById("badge-inner-image");
  const badgeSvg = document.getElementById("badge-svg");
  const badgeIdInput = document.getElementById("badge-id");
  const loadBadgeBtn = document.getElementById("load-badge-btn");

  // Load badge data when the button is clicked
  loadBadgeBtn.addEventListener("click", function () {
    const badgeId = badgeIdInput.value;
    if (badgeId) {
      fetch(`/api/badges/${badgeId}`)
        .then((response) => response.json())
        .then((data) => {
          // Update badge details
          badgeName.textContent = data.name;
          badgeDescription.textContent = data.description;
          badgeLevel.textContent = data.level;

          // Update inner image
          badgeInnerImage.src = data.innerImagePath;

          // Update badge color based on level
          const badgeColorClass = badgeSvg.querySelector(".cls-2");
          if (data.level === 1) {
            badgeColorClass.setAttribute("fill", "#cc852d"); // Bronze
          } else if (data.level === 2) {
            badgeColorClass.setAttribute("fill", "#c0c0c0"); // Silver
          } else if (data.level === 3) {
            badgeColorClass.setAttribute("fill", "#ffd700"); // Gold
          }
        })
        .catch((error) => {
          console.error("Error fetching badge data:", error);
          alert("Failed to load badge. Please check the badge ID.");
        });
    } else {
      alert("Please enter a valid badge ID.");
    }
  });
});*/