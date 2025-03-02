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

// Dummy user data (Replace with API calls later)
const allUsers = [
    { id: 1, username: "stargazer123" },
    { id: 2, username: "cosmic_journey" },
    { id: 3, username: "galaxyexplorer" },
    { id: 4, username: "astrolover" },
    { id: 5, username: "nebula_hunter" }
];

let friends = []; // Store added friends

// Open "Add Friend" Popup
function openAddFriendPopup() {
    document.getElementById("addFriendModal").style.display = "flex";
}

// Close "Add Friend" Popup
function closeAddFriendPopup() {
    document.getElementById("addFriendModal").style.display = "none";
}

// Open "View Friends" Popup
function openViewFriendsPopup() {
    document.getElementById("viewFriendsModal").style.display = "flex";
    updateFriendList();
}

// Close "View Friends" Popup
function closeViewFriendsPopup() {
    document.getElementById("viewFriendsModal").style.display = "none";
}

// Search Users
function searchUsers() {
    const searchInput = document.getElementById("friendSearch").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    const filteredUsers = allUsers.filter(user => user.username.toLowerCase().includes(searchInput));

    if (filteredUsers.length === 0) {
        resultsContainer.innerHTML = "<p>No users found.</p>";
    } else {
        filteredUsers.forEach(user => {
            const userItem = document.createElement("div");
            userItem.classList.add("user-item");

            userItem.innerHTML = `
                <span>${user.username}</span>
                <button class="add-friend-btn" onclick="addFriend(${user.id})">Add</button>
            `;

            resultsContainer.appendChild(userItem);
        });
    }
}

// Add Friend
function addFriend(userId) {
    const userToAdd = allUsers.find(user => user.id === userId);
    if (userToAdd && !friends.some(friend => friend.id === userId)) {
        friends.push(userToAdd);
        alert(`${userToAdd.username} has been added as a friend!`);
    }
}

// Update Friend List
function updateFriendList() {
    const friendListContainer = document.getElementById("friendList");
    friendListContainer.innerHTML = ""; // Clear previous list

    if (friends.length === 0) {
        friendListContainer.innerHTML = "<p>You have no friends yet.</p>";
    } else {
        friends.forEach(friend => {
            const friendItem = document.createElement("div");
            friendItem.classList.add("user-item");

            friendItem.innerHTML = `
                <span>${friend.username}</span>
                <button class="add-friend-btn" onclick="viewFriendProfile('${friend.username}')">View</button>
            `;

            friendListContainer.appendChild(friendItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const profileModal = document.getElementById("friendProfileModal");
    const closeProfileModal = document.getElementById("closeProfileModal");
    const friendName = document.getElementById("friendName");
    const friendProfilePic = document.getElementById("friendProfilePic");
    const friendUsername = document.getElementById("friendUsername");

    // Ensure the modal exists
    if (!profileModal) {
        console.error("Profile modal not found!");
        return;
    }

    // Function to open the friend profile popup
    function viewFriendProfile(username, imageUrl) {
        console.log(`Opening profile for: ${username}`); // Debugging log
        friendName.textContent = username;
        friendUsername.textContent = "@" + username.toLowerCase().replace(" ", "");
        friendProfilePic.src = imageUrl;

        profileModal.style.display = "flex"; // Show the modal
    }

    // Attach event listener to dynamically generated buttons
    function attachViewProfileListeners() {
        document.querySelectorAll(".viewProfileBtn").forEach(button => {
            button.addEventListener("click", function () {
                const username = this.getAttribute("data-username");
                const imageUrl = this.getAttribute("data-image");

                if (username && imageUrl) {
                    viewFriendProfile(username, imageUrl);
                } else {
                    console.error("Username or Image URL missing!");
                }
            });
        });
    }

    // Close modal when clicking the close button
    closeProfileModal.addEventListener("click", () => {
        profileModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = "none";
        }
    });

    // Attach the function globally so it can be called from HTML
    window.viewFriendProfile = viewFriendProfile;
    attachViewProfileListeners();
});


// Attach Event Listeners
document.getElementById("addFriend").addEventListener("click", openAddFriendPopup);
document.getElementById("viewFriends").addEventListener("click", openViewFriendsPopup);

// Attach Close Button Event Listeners
document.querySelector("#addFriendModal .modal-close").addEventListener("click", closeAddFriendPopup);
document.querySelector("#viewFriendsModal .modal-close").addEventListener("click", closeViewFriendsPopup);

// Close modals when clicking outside of modal-content
window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("addFriendModal")) {
        closeAddFriendPopup();
    }
    if (event.target === document.getElementById("viewFriendsModal")) {
        closeViewFriendsPopup();
    }
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