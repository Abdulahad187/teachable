// script.js
let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = "https://teachablemachine.withgoogle.com/models/your_model_url/model.json";
    const metadataURL = "https://teachablemachine.withgoogle.com/models/your_model_url/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

async function predict() {
    const imageUpload = document.getElementById('imageUpload');
    const file = imageUpload.files[0];
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.onload = async () => {
        const prediction = await model.predict(image);
        const highestPrediction = prediction.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
        document.getElementById('prediction').innerText = `Prediction: ${highestPrediction.className} - Probability: ${(highestPrediction.probability * 100).toFixed(2)}%`;
    };
}

// Initialize the model
init();
