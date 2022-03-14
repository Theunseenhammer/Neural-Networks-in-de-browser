import { recurrent } from 'brain.js';
//const fs = require("fs");
//import { fs } from 'fs';  
// provide optional config object (or undefined). Defaults shown.
import data from '../test_Dataset.json';
const network = new recurrent.LSTM();
//const json = network.toJSON();

var trainingData = data.map(item => ({
    input: item.text,
    output: item.category
  }));

//The file
var uploadedJsonFile = {}

//The content
var uploadedJsonData = {}

function trainNN() {
    console.log("Training has begun")
    network.train(trainingData, {
        iterations: 1000
    })

    console.log("Training is complete")
    const jsonTest = network.toJSON();
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonTest));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "leukebestandsnaam.json");
    dlAnchorElem.click();
}


function enterData() {
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


function showData() {
    uploadedJsonFile = document.getElementById('Upload-NN').files[0]
    console.log(uploadedJsonFile)
    console.log(`Name: ${uploadedJsonFile.name}\nFile Type: ${uploadedJsonFile.type}\nFile Size: ${formatBytes(uploadedJsonFile.size)}`)
    fileToJSON(uploadedJsonFile)
}

//Starts filereader and saves found data to var UploadedJsonData 
function fileToJSON(file) {
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(file)
}

function onReaderLoad(file) {
    var obj = JSON.parse(file.target.result)
    console.log(obj)
    uploadedJsonData = obj
    network.fromJSON(uploadedJsonData)
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


var counter = 0
document.getElementById('Submit-input').addEventListener('click', enterData)
document.getElementById('Train-NN').addEventListener('click', trainNN)

//On upload(change) execute function LogData
document.getElementById('Upload-NN').addEventListener('change', showData, false)