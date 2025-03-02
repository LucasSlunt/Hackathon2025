
const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove "data:image/png;base64,"
        reader.onerror = (error) => reject(error);
    });
}
let correctAnswer = "";

// Get elements from the DOM
//const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const fileNameDiv = document.getElementById('fileName');
//const uploadButton = document.getElementById('uploadImage');


//just addded

const uploadButton = document.getElementById('uploadImage');
const fileInput = document.getElementById('fileInput');
const modal = document.getElementById('modal');
const modalImagePreview = document.getElementById('modalImagePreview');
const submitGuessButton = document.getElementById('submitGuess');
const constellationDropdown = document.getElementById('constellationDropdown');
const feedbackMessage = document.getElementById('feedbackMessage');
const closeModalButton = document.getElementById('closeModal');



uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            modalImagePreview.src = e.target.result;
            modal.style.display = "block"; // Show the modal
        };
        reader.readAsDataURL(file);
    }
});

// Handle guessing
submitGuessButton.addEventListener('click', () => {
    const selectedAnswer = constellationDropdown.value;
    if (selectedAnswer === correctAnswer) {
        feedbackMessage.textContent = "+5 Points!";
        feedbackMessage.style.color = "green";
        addPoints(5);
    } else {
        feedbackMessage.textContent = "Try again!";
        feedbackMessage.style.color = "red";
    }
});

// Close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = "none";
});


//Check if there's a stored image in localStorage
if (localStorage.getItem('Image')) {
    imagePreview.src = localStorage.getItem('Image');
    imagePreview.style.display = 'block';
    fileNameDiv.textContent = localStorage.getItem('ImageName');
    fileNameDiv.style.display = 'block';
    uploadButton.style.display = 'block';
} else {
    // Reset the file input and preview when there is no stored image
    fileInput.value = '';  // Reset the file input field
    imagePreview.style.display = 'none';
    fileNameDiv.style.display = 'none';
    uploadButton.style.display = 'none';
}

// Handle image file input change
fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Display the image preview
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';

            

            // Show the upload button
            uploadButton.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Return null if not found
}

function addPoints(points) {
    const usr = getCookie("username");
    fetch(`http://localhost:8080/api/users/${usr}/add-points?points=${points}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
}

async function runInf(){
    const input = document.getElementById("fileInput");
    if (!input.files.length) {
        console.error("No file selected.");
        return;
    }

    const image = await loadImageBase64(input.files[0]);
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/constellation-dsphi/1",
        params: {
            api_key: "FJk5lS5W35NQFxPljIrn"
        },
        data:  image , 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function(response) {
        if (response.data.predictions.length > 0) {
            const constellationName = response.data.predictions[0].class;
            console.log("Detected Constellation:", constellationName);
            //known constellations from the dataset
            const constellations = [
                "aquila",
                "bootes",
                "canis_major",
                "canis_minor",
                "cassiopeia",
                "cygnus",
                "gemini",
                "leo",
                "lyra",
                "moon",
                "orion",
                "pleiades",
                "sagittarius",
                "scorpius",
                "taurus",
                "ursa_major"
            ];
            document.getElementById("h3modal").innerHTML = "Constellation Found! +3 Points";
            document.getElementById("pmodal").innerHTML = "Guess the correct constellation:";
            addPoints(3);
            const filteredConstellations = constellations.filter(name => name !== constellationName);
            const randomConstellations = filteredConstellations.sort(() => 0.5 - Math.random()).slice(0, 3);
            randomConstellations.push(constellationName);
            randomConstellations.sort(() => 0.5 - Math.random()); // Shuffle the array
            
            correctAnswer = constellationName;
            // Populate the dropdown with the options
            constellationDropdown.innerHTML = randomConstellations.map(name => `<option value="${name}">${name}</option>`).join('');
            //choose 3-4 random constellations along with the correct one
        } else {
            console.log("No constellation detected.");
            document.getElementById("h3modal").innerHTML = "No constellation detected";
            document.getElementById("pmodal").innerHTML = "Try another image!";
            //choose no constellation detected modal
        }
    })
    .catch(function(error) {
        console.error(error.message);
    });
}

// Close the modal when clicking outside of modal-content
// window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// });
