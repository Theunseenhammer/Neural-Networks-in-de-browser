import { recurrent } from 'brain.js';
//const fs = require("fs");
//import { fs } from 'fs';  
// provide optional config object (or undefined). Defaults shown.
//import data from '../test_Dataset.json';
const network = new recurrent.LSTM();
//const json = network.toJSON();
function TrainNN() {
    console.log("Training has begun")
    network.train([
        {
            input: "the user interface component is fixed",
            output: "frontend"
        },
        {
            input: "the css file look inituitive",
            output: "frontend"
        },
        {
            input: "i need a few ui designs",
            output: "frontend"
        },
        {
            input: "the database has issues",
            output: "backend"
        },
        {
            input: "the button is centered",
            output: "frontend"
        },
        {
            input: "make it clickable",
            output: "frontend"
        },
        {
            input: "i did the api integration",
            output: "backend"
        },
        {
            input: "a driver code should have less memory usgae",
            output: "backend"
        },
        {
            input: "it needs more memory",
            output: "backend"
        },
        {
            input: "code with responsive design in users interface",
            output: "frontend"
        },
        {
            input: "navigate the website easily",
            output: "frontend"
        },
        {
            input: "user login and authentication",
            output: "backend"
        },
        {
            input: "forms and dropdowns lists",
            output: "frontend"
        },
        {
            input: "username password email are stored",
            output: "backend"
        },
        {
            input: "programming loading animation",
            output: "frontend"
        },
        {
            input: "mysql, mongo, firebase databases",
            output: "backend"
        },
        {
            input: "restful api is useful with backend",
            output: "backend"
        },
        {
            input: "data access layer is not presentation layer",
            output: "backend"
        },
        {
            input: "the web browser loads dynamic webpages slowly",
            output: "frontend"
        }
    ],
        {
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
//network.toFunction()

function EnterData() {
    const json = network.toJSON();
    //const json = document.getElementById('file-input');
    console.log(json)
    const val = document.getElementById('Input-NN').value;
    network.fromJSON(json)
    var output = network.run(val)
    console.log(val)
    console.log('raw: ' + output)
    if (output.includes("frontend")) {
        output = "frontend"
    }
    else if (output.includes("backend")) {
        output = "backend"
    }
    else {
        output = "Error"
    }
    counter++
    output = (counter + ': ' + output)
    console.log(`Category: ${output}`)
    document.getElementById('Output-NN').innerHTML = output
}


var counter = 0
document.getElementById('Submit-input').addEventListener('click', EnterData)
document.getElementById('Train-NN').addEventListener('click', TrainNN)
