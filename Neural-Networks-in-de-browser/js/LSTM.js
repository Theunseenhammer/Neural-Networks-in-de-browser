import { recurrent } from 'brain.js';
import { NeuralNetworkGPU, NeuralNetwork } from 'brain.js'
var network
    //Counter to know if output has changed
var counter = 0
    //amount of training iterations
var Iteration = 200
    //Error threshold selected
var ErrorThreshold = 0.005
    //maped training data
var trainingData
    //The file
var uploadedJsonFile = {}
    //The content
var uploadedJsonData = {}
    //Iterations slider
var slider = document.getElementById("Input-Iterations");
var output = document.getElementById("Iterations-Show");
output.value = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.value = this.value;
    Iteration = this.value
}

//Train a NN
function trainNN() {
    if (trainingData == null) {
        window.alert("Please select a Dataset before training.");
    } else {
        //create new LSTM network called network

        network = new recurrent.LSTM();

        //network = new NeuralNetworkGPU();
        console.log("Training has begun")
        console.log("Number of iterations used: " + Iteration)
        console.log("Error Threshold used: " + ErrorThreshold)
        network.train(trainingData, {
            iterations: Iteration,
            errorThresh: ErrorThreshold,
            log: true
        })

        console.log("Training is complete")
        const jsonTest = network.toJSON();
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonTest));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "leukebestandsnaam.json");
        dlAnchorElem.click();
    }
}

function enterData() {
    if (typeof network == 'undefined') {
        window.alert("Please select or train a NN before testing.");
    } else {
        const val = document.getElementById('Input-NN').value;
        var output = network.run(val)
        console.log(val)
        console.log('raw: ' + output)
        if (output.includes("frontend")) {
            output = "frontend"
        } else if (output.includes("backend")) {
            output = "backend"
        } else {
            output = "Error"
        }
        counter++
        output = (counter + ': ' + output)
        console.log(`Category: ${output}`)
        document.getElementById('Output-NN').innerHTML = output
    }
}


function showData() {
    uploadedJsonFile = document.getElementById('Upload-NN').files[0]
    var index = "NN"
    console.log(uploadedJsonFile)
    console.log(`Name: ${uploadedJsonFile.name}\nFile Type: ${uploadedJsonFile.type}\nFile Size: ${formatBytes(uploadedJsonFile.size)}`)
    fileToJSON(uploadedJsonFile, index)
}

//Starts filereader and saves found data to var UploadedJsonData
function loadDataset() {
    uploadedJsonFile = document.getElementById('Upload-Dataset').files[0]
    var index = "DS"
    console.log(uploadedJsonFile)
    console.log(`Name: ${uploadedJsonFile.name}\nFile Type: ${uploadedJsonFile.type}\nFile Size: ${formatBytes(uploadedJsonFile.size)}`)
    fileToJSON(uploadedJsonFile, index)
}

function fileToJSON(file, what) {
    var reader = new FileReader()
    if (what == "DS") {
        reader.onload = onReaderLoadDS
    } else {
        reader.onload = onReaderLoad
    }
    reader.readAsText(file)
}

function onReaderLoad(file) {
    var obj = JSON.parse(file.target.result)
    console.log(obj)
    uploadedJsonData = obj
        //create new LSTM network called network
    network = new recurrent.LSTM();
    network.fromJSON(uploadedJsonData)
}

function onReaderLoadDS(file) {
    var obj = JSON.parse(file.target.result)
    console.log(obj)
    //mapDS(obj)
    trainingData = obj
}

function mapDS(file) {
    trainingData = file.map(item => ({
        input: item.text,
        output: item.category
    }));
    console.log(trainingData)
}

//Convert bytes to kb
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function ChangeIterations() {
    Iteration = document.getElementById('Iterations-Show').value;
    console.log("Number of iterations selected:" + Iteration)
}

function ErrorThresh() {
    ErrorThreshold = document.getElementById('Input-ErrorThresh').value;
    console.log("Error Threshold selected:" + ErrorThreshold)
}

document.getElementById('Submit-input').addEventListener('click', enterData)

document.getElementById('Train-NN').addEventListener('click', trainNN)

//On upload(change) execute function LogData
document.getElementById('Upload-NN').addEventListener('change', showData, false)

document.getElementById('Upload-Dataset').addEventListener('change', loadDataset, false)

document.getElementById('Iterations-Show').addEventListener('change', ChangeIterations)

document.getElementById('Submit-ErrorThresh').addEventListener('click', ErrorThresh)