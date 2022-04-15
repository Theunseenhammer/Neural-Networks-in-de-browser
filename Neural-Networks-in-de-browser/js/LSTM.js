//NOTE!!!! THIS APP ONLY HAS TESTING FEATURES FOR THE ADDED LSTM TEST DATASET,
// TRAINING WILL WORK WITH ANY DATASET HOWEVER!!!!

//Import for Recurrent LSTM NN
import { recurrent } from 'brain.js';

//Var declaration for network selection
var network

//Counter to know if output has changed
var counter = 0

//Var declaration for NN arguments
var Iteration = 200
var ErrorThreshold = 0.005

//Var declarations for input files and data
var uploadedJsonFile = {}
var uploadedJsonData = {}
var trainingData

//Iterations slider
var slider = document.getElementById("Input-Iterations");
var output = document.getElementById("Iterations-Show");
output.value = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.value = this.value;
    Iteration = this.value
}

//Training of a LSTM network
function trainNN() {
    if (trainingData == null) {
        window.alert("Please select a Dataset before training.");
    } else {
        //create new LSTM network called network
        network = new recurrent.LSTM();
        //Start timer
        var start = new Date().getTime();
        console.log("Training has begun")
        console.log("Number of iterations used: " + Iteration)
        console.log("Error Threshold used: " + ErrorThreshold)
        //Train NN with selected training variables
        network.train(trainingData, {
            iterations: Iteration,
            errorThresh: ErrorThreshold,
            learningRate: 0.3,
            log: true,
            logPeriod: 1,
        })

        //Stop timer and show time taken
        var end = new Date().getTime();
        var time = end - start;

        //Save NN as Json file called Trained_LSTM_NN.json
        console.log(`Training is completed in ${msToHMS(time)}`)
        const jsonTest = network.toJSON();
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonTest));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "Trained_LSTM_NN.json");
        dlAnchorElem.click();
    }
}

//Function to show timer time in hrs, mins, secs
function msToHMS(ms) {
    var seconds = ms / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return ("\nHours " + hours + "\n" + "Minutes " + minutes + "\n" + "Seconds " + seconds);
}

//Function for testing a trained model !!!!This testing only works for the added lstm test dataset!!!!
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

//Start of filereader for pretrained NN's 
function LoadNN() {
    uploadedJsonFile = document.getElementById('Upload-NN').files[0]
    var index = "NN"
    console.log(uploadedJsonFile)
    console.log(`Name: ${uploadedJsonFile.name}\nFile Type: ${uploadedJsonFile.type}\nFile Size: ${formatBytes(uploadedJsonFile.size)}`)
    fileToJSON(uploadedJsonFile, index)
}

//Start of filereader that loads raw data, transforms and saves found data to var UploadedJsonData
function loadDataset() {
    uploadedJsonFile = document.getElementById('Upload-Dataset').files[0]
    var index = "DS"
    console.log(uploadedJsonFile)
    console.log(`Name: ${uploadedJsonFile.name}\nFile Type: ${uploadedJsonFile.type}\nFile Size: ${formatBytes(uploadedJsonFile.size)}`)
    fileToJSON(uploadedJsonFile, index)
}

//Initializes new filereader and sends to Dataset reader or NN reader
function fileToJSON(file, what) {
    var reader = new FileReader()
    if (what == "DS") {
        reader.onload = onReaderLoadDS
    } else {
        reader.onload = onReaderLoad
    }
    reader.readAsText(file)
}

//Pretrained NN reader
function onReaderLoad(file) {
    var obj = JSON.parse(file.target.result)
    console.log(obj)
    uploadedJsonData = obj
    //create new LSTM network called network
    network = new recurrent.LSTM();
    network.fromJSON(uploadedJsonData)
}

//Raw dataset reader
function onReaderLoadDS(file) {
    var obj = JSON.parse(file.target.result)
    console.log(obj)
        //mapDS(obj)
    trainingData = obj
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

//Change iterations to selected amount
function ChangeIterations() {
    Iteration = document.getElementById('Iterations-Show').value;
    console.log("Number of iterations selected:" + Iteration)
}

//Change Error threshold to selected amount
function ErrorThresh() {
    ErrorThreshold = document.getElementById('Input-ErrorThresh').value;
    console.log("Error Threshold selected:" + ErrorThreshold)
}

//Event listiners for all changables
document.getElementById('Submit-input').addEventListener('click', enterData)
document.getElementById('Train-NN').addEventListener('click', trainNN)
document.getElementById('Upload-NN').addEventListener('change', LoadNN, false)
document.getElementById('Upload-Dataset').addEventListener('change', loadDataset, false)
document.getElementById('Iterations-Show').addEventListener('change', ChangeIterations)
document.getElementById('Submit-ErrorThresh').addEventListener('click', ErrorThresh)