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

let correctAnswer = "orion"; // Set correct answer for now

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
    } else {
        feedbackMessage.textContent = "Try again!";
        feedbackMessage.style.color = "red";
    }
});

// Close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = "none";
});

//just added

const ws = new WebSocket("ws:localhost:3000");

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

// Save and update profile picture
// uploadButton.addEventListener('click', () => {
   
//     const photo = document.getElementById('FileInput');
//     const formData = new FormData();
//     formData.append('photo', photo);

//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         const photoPath = data.filePath;
//         const message = JSON.stringify({ photoPath: photoPath });
//         ws.send(message);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

    

//     alert("Image saved!");
//      // Redirect to another page
//     //window.location.href = 'points.html';
// });

// Close the modal when clicking outside of modal-content
// window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// });
