// script.js
document.addEventListener("DOMContentLoaded", function () {
  const badgeForm = document.getElementById("badge-form");
  const badgeName = document.getElementById("badge-name");
  const badgeDescription = document.getElementById("badge-description");
  const badgeLevel = document.getElementById("level-value");
  const badgeInnerImage = document.getElementById("badge-inner-image");
  const badgeSvg = document.getElementById("badge-svg");
  const saveBadgeBtn = document.getElementById("save-badge-btn");

  let currentBadge = {
    name: "",
    description: "",
    level: 1,
    innerImagePath: "",
  };

  // Update badge preview when the form is submitted
  badgeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    currentBadge.name = document.getElementById("name").value;
    currentBadge.description = document.getElementById("description").value;
    currentBadge.level = parseInt(document.getElementById("level").value);
    currentBadge.innerImagePath = document.getElementById("inner-image-path").value;

    // Update badge display
    badgeName.textContent = currentBadge.name;
    badgeDescription.textContent = currentBadge.description;
    badgeLevel.textContent = currentBadge.level;
    badgeInnerImage.src = currentBadge.innerImagePath;

    // Update badge color based on level
    const badgeColorClass = badgeSvg.querySelector(".cls-2");
    if (currentBadge.level === 1) {
      badgeColorClass.setAttribute("fill", "#cc852d"); // Bronze
    } else if (currentBadge.level === 2) {
      badgeColorClass.setAttribute("fill", "#c0c0c0"); // Silver
    } else if (currentBadge.level === 3) {
      badgeColorClass.setAttribute("fill", "#ffd700"); // Gold
    }
  });

  // Save badge to the database
  saveBadgeBtn.addEventListener("click", function () {
    fetch("/api/badges", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        name: currentBadge.name,
        description: currentBadge.description,
        level: currentBadge.level,
        innerImagePath: currentBadge.innerImagePath,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Badge saved successfully!");
        console.log("Saved badge:", data);
      })
      .catch((error) => {
        console.error("Error saving badge:", error);
        alert("Failed to save badge.");
      });
  });
});