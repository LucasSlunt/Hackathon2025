// const loadImageBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result.split(',')[1]); // Remove "data:image/png;base64,"
//         reader.onerror = (error) => reject(error);
//     });
// }

// async function runInf(){
//     const input = document.getElementById("fileInput");
//     if (!input.files.length) {
//         console.error("No file selected.");
//         return;
//     }

//     const image = await loadImageBase64(input.files[0]);
//     axios({
//         method: "POST",
//         url: "https://detect.roboflow.com/constellation-dsphi/1",
//         params: {
//             api_key: "FJk5lS5W35NQFxPljIrn"
//         },
//         data:  image , // Must be wrapped in an object
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     })
//     .then(function(response) {
//         console.log(response.data);
//     })
//     .catch(function(error) {
//         console.error(error.message);
//     });
// }
