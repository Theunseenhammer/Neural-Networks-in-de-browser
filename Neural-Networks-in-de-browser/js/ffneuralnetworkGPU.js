import { NeuralNetworkGPU, NeuralNetwork } from 'brain.js'


function gpuTrain() {
    const net = new NeuralNetworkGPU();



    // net.train(xorTrainingData, { iterations: 100, log: true });

    //console.log(net.run([0, 0]));
    //console.log(net.run([0, 1]));
    //console.log(net.run([1, 0]));
    //console.log(net.run([1, 1]));

}


//Starts filereader and saves found data to var UploadedJsonData
function loadDataset() {
    const mnistFile = document.getElementById('Load-MNIST').files[0]
    console.log(mnistFile)
    console.log(`Name: ${mnistFile.name}\nFile Size: ${formatBytes(mnistFile.size)}`)

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


document.getElementById('Train-NN-GPU').addEventListener('click', gpuTrain)
document.getElementById('Load-MNIST').addEventListener('change', loadDataset, false)