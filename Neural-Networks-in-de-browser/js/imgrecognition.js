import { NeuralNetwork, NeuralNetworkGPU } from 'brain.js'

//Brain js
var LearningRate = 0.01
    //learningrate
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

//Train the mnist dataset
function trainNN() {
    if (trainingData == null) {
        window.alert("Please select a Dataset before training.");
    } else {
        var start = new Date().getTime();
        network = new NeuralNetworkGPU();

        console.log("Training has begun")
        console.log("Number of iterations used: " + Iteration)
        console.log("Error Threshold used: " + ErrorThreshold)
        network.train(trainingData, {
            iterations: Iteration,
            errorThresh: ErrorThreshold,
            log: true,
            learningRate: LearningRate
        })

        var end = new Date().getTime();
        var time = end - start;

        console.log(`Training is completed in ${msToHMS(time)}`)
        const jsonTest = network.toJSON();
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonTest));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "leukebestandsnaam.json");
        dlAnchorElem.click();
    }
}

function msToHMS(ms) {
    var seconds = ms / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return (hours + ":" + minutes + ":" + seconds);
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
    network = new NeuralNetworkGPU();
    network.fromJSON(uploadedJsonData)
    startPredict = true;
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

function ChangeLearningRate() {
    LearningRate = document.getElementById('LearningRate-Show').value;
    console.log("Number of iterations selected:" + LearningRate)
}

function ErrorThresh() {
    ErrorThreshold = document.getElementById('Input-ErrorThresh').value;
    console.log("Error Threshold selected:" + ErrorThreshold)
}




//img recognition + canvas logic
var canvasWidth = 28;
var canvasHeight = 28;
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;
var startPredict = false;

var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");
var clearBtn = document.querySelector("#Reset-input");
var doneBtn = document.querySelector("#Submit-input");
var outputField = document.querySelector("#Output-NN");

canvas.setAttribute('id', 'canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
document.querySelector('#canvas-wrapper').appendChild(canvas);


canvas.onmousedown = function(e) {
    console.log("drawing")
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
};

canvas.onmousemove = function(e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
};

canvas.onmouseleave = function(e) {
    paint = false;
};

canvas.onmouseup = function(e) {
    paint = false;
};

const clearCanvas = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

const resetAll = () => {
    clickX = [];
    clickY = [];
    clickDrag = [];
    paint = false;
}

const redraw = () => {
    clearCanvas();

    context.strokeStyle = "#FFF";
    context.lineJoin = "round";
    context.lineWidth = 1;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();

        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

const addClick = (x, y, dragging) => {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

clearBtn.onclick = () => {
    clearCanvas();
    resetAll();
}

doneBtn.onclick = () => {
    var x = new Array(canvasWidth).fill(0);
    var y = new Array(canvasHeight).fill(0);

    clickX.forEach(axis => {
        x[axis] = 1;
    });
    clickY.forEach(axis => {
        y[axis] = 1;
    });

    var input = x.concat(y);
    console.log(input)
    if (startPredict) {
        resetAll();
        predict(input);
        return;
    }

    clearCanvas();
    resetAll();
}

const predict = (testData) => {
    const output = network.run(testData);

    outputField.innerHTML = "<h4>The probability</h4><pre>" + JSON.stringify(output, null, "  ") + "</pre>";

    console.log(output)

    Object.entries(output).forEach(([num, probability]) => {
        [...document.querySelectorAll(`.num-${num}`)].forEach(elem => {
            elem.style.zoom = Math.pow(1 + probability, 2);
        });
    });
}





document.getElementById('Train-NN').addEventListener('click', trainNN)

//On upload(change) execute function LogData
document.getElementById('Upload-NN').addEventListener('change', showData, false)
document.getElementById('Upload-Dataset').addEventListener('change', loadDataset, false)
document.getElementById('Iterations-Show').addEventListener('change', ChangeIterations)
document.getElementById('LearningRate-Show').addEventListener('change', ChangeLearningRate)
document.getElementById('Submit-ErrorThresh').addEventListener('click', ErrorThresh)