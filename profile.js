document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("uploadModal");
    const openModalBtn = document.getElementById("openChangeProfile");
    const closeModalBtn = document.querySelector(".close-btn");
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const profilePic = document.querySelector(".user img");

    // Ensure the modal is hidden on page load
    modal.style.display = "none"; 

    // Open the modal when button is clicked
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex"; 
    });

    // Close the modal when clicking the close button (X)
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside of modal-content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    /*
    Updating the profile picture here
    */
    // Show preview of selected image
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Save and update profile picture
    document.getElementById("uploadImage").addEventListener("click", () => {
        profilePic.src = imagePreview.src;
        modal.style.display = "none"; 
    });
});

let selectedTrophies = [];

// Simulated fetch function (replace this when backend is ready)
async function fetchTrophiesFromDatabase() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([]);
        }, 500); // Simulates API delay
    });
}

// Open Modal & Load Trophies
async function openTrophySelector() {
    const trophyContainer = document.getElementById("all-trophies");
    trophyContainer.innerHTML = "<p>Loading trophies...</p>"; // Show loading state

    try {
        const trophies = await fetchTrophiesFromDatabase(); // Fetch trophies dynamically
        trophyContainer.innerHTML = ""; // Clear loading text

        if (trophies.length === 0) {
            // If no trophies, display message inside modal
            trophyContainer.innerHTML = `
                <p class="no-trophies-message">You have no trophies to display.</p>
            `;
        } else {
            // Create Trophy Elements
            trophies.forEach(trophy => {
                const trophyElement = document.createElement("div");
                trophyElement.classList.add("trophy");
                trophyElement.textContent = trophy;

                if (selectedTrophies.includes(trophy)) {
                    trophyElement.classList.add("selected");
                }

                trophyElement.addEventListener("click", () => toggleTrophySelection(trophy, trophyElement));
                trophyContainer.appendChild(trophyElement);
            });
        }
    } catch (error) {
        trophyContainer.innerHTML = `
            <p class="no-trophies-message">Error loading trophies.</p>
        `;
        console.error("Error fetching trophies:", error);
    }

    document.getElementById("trophyModal").style.display = "flex";
}

// Close Modal
function closeTrophySelector() {
    document.getElementById("trophyModal").style.display = "none";
}

// Toggle Trophy Selection (Max 3)
function toggleTrophySelection(trophy, element) {
    if (selectedTrophies.includes(trophy)) {
        selectedTrophies = selectedTrophies.filter(t => t !== trophy);
        element.classList.remove("selected");
    } else {
        if (selectedTrophies.length < 3) {
            selectedTrophies.push(trophy);
            element.classList.add("selected");
        } else {
            alert("You can only select up to 3 trophies!");
        }
    }
}

// Save & Display Selected Trophies
function saveSelectedTrophies() {
    const displayContainer = document.getElementById("selected-trophies");
    displayContainer.innerHTML = "";

    if (selectedTrophies.length === 0) {
        displayContainer.innerHTML = "<p>Select up to 3 trophies.</p>";
    } else {
        selectedTrophies.forEach(trophy => {
            const trophyElement = document.createElement("div");
            trophyElement.classList.add("trophy");
            trophyElement.textContent = trophy;
            displayContainer.appendChild(trophyElement);
        });
    }

    closeTrophySelector();
}