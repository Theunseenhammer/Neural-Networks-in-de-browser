import { NeuralNetworkGPU, NeuralNetwork } from 'brain.js'

const xorTrainingData = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
];


function gpuTrain() {
    const net = new NeuralNetworkGPU();



    net.train(xorTrainingData, { iterations: 10000000, log: true, errorThresh: 0.0000000001 });

    console.log(net.run([0, 0]));
    console.log(net.run([0, 1]));
    console.log(net.run([1, 0]));
    console.log(net.run([1, 1]));

}


document.getElementById('Train-NN-GPU').addEventListener('click', gpuTrain)