from contextlib import redirect_stderr
from flask import render_template, request
from app import app
from app.forms import InputForm
import numpy as np


inputsize = 3

class ANN():
    
    def __init__(self):
        np.random.seed(1)
        #gewichten naar een 1 * 3 matrice, met waardes -1, 0 of 1
        self.synaptic_weights = 2 * np.random.random((inputsize, 1)) - 1
    
    #normalisatie
    def sigmoid(self, x):
        return 1/(1+np.exp(-x))
    def sigmoid_derivative(self, x):
        return x*(1-x)

    def train(self, training_inputs, training_outputs, training_iterations):
        #train op training_inputs met training_outputs voor lengte training_iterations
        for iteration in range(training_iterations):
            output = self.think(training_inputs)
            #bereken de fout op de berekende output met de huidige outputs
            error = training_outputs - output
            #bereken de aanpassing op de synapsen
            adjustments = np.dot(training_inputs.T, error * self.sigmoid_derivative(output))
            #voeg de aanpassing toe op de synapsen
            self.synaptic_weights += adjustments

    def think(self, inputs):
        #bereken waardes
        inputs = inputs.astype(float)
        output = self.sigmoid(np.dot(inputs, self.synaptic_weights))
        return output




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def index_post():
    inp1 = request.form['input1']
    inp2 = request.form['input2']
    inp3 = request.form['input3']

    neural_network = ANN()
    training_inputs = np.array([[0,0,1],
                                [1,1,1],
                                [1,0,1],
                                [0,1,1]])

    training_outputs = np.array([[0,1,1,0]]).T
    neural_network.train(training_inputs, training_outputs, 50000)
    output = neural_network.think(np.array([inp1, inp2, inp3]))

    

    return render_template('index.html', output=output)