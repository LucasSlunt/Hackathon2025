const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");
const fileNameText = document.querySelector(".file-name");
const submitButton = document.getElementById("submit-btn");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        fileNameText.textContent = file.name;

        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        fileNameText.textContent = "No file chosen";
        imagePreview.style.display = "none";
    }
});

submitButton.addEventListener("click", function () {
    if (fileInput.files.length === 0) {
        alert("Please upload a picture first.");
    } else {
        alert("Picture submitted: " + fileNameText.textContent);
    }
});
