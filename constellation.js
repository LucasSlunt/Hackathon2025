document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("constellation-list");
    const searchInput = document.getElementById("searchInput");

    // Fetch constellations data
    fetch("constellation.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            list.innerHTML = ""; // Clear "Loading..." text
            displayConstellations(data);

            // Attach search functionality
            searchInput.addEventListener("input", () => filterConstellations(data));
        })
        .catch(error => {
            console.error("Error loading constellations:", error);
            list.innerHTML = "<p>Error loading constellations.</p>";
        });
});

// Function to display constellations
function displayConstellations(data) {
    const list = document.getElementById("constellation-list");
    list.innerHTML = ""; // Clear any existing content

    data.forEach(constellation => {
        const div = document.createElement("div");
        div.classList.add("constellation");

        div.innerHTML = `
            <h3>${constellation.name}</h3>
            <p><strong>Area of Sky Covered:</strong> ${constellation.area_of_sky_covered}</p>
            <p><strong>Best Month to See:</strong> ${constellation.best_month_to_see}</p>
        `;

        // Click event to open modal
        div.addEventListener("click", () => {
            document.getElementById("modal-title").innerText = constellation.name;
            document.getElementById("modal-description").innerText = constellation.meaning_mythology;
            document.getElementById("modal-brightest-star").innerText = constellation.brightest_star;
            document.getElementById("modal-first-appearance").innerText = constellation.first_appearance;
            document.getElementById("modal-best-month").innerText = constellation.best_month_to_see;
            document.getElementById("modal-represents").innerText = constellation.represents;
            document.getElementById("modal-history").innerText = constellation.history || "No history available."; // Use a fallback text if history is not available
            document.getElementById("modal-fun-fact").innerText = constellation.fun_fact || "No fun fact available."; // Use a fallback text if fun fact is not available
            document.getElementById("modal").style.display = "flex";
        });

        list.appendChild(div);
    });
}

// Function to filter constellations based on any field in the JSON
function filterConstellations(data) {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    const filteredData = data.filter(constellation =>
        Object.values(constellation).some(value =>
            typeof value === "string" && value.toLowerCase().includes(searchTerm)
        )
    );

    displayConstellations(filteredData); // Display the filtered data
}

// Close modal functionality
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Close modal when clicking outside of content
window.addEventListener("click", (event) => {
    if (event.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
});
