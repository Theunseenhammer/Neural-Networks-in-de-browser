import numpy as np

#Grootte van de dataset
inputsize = 8

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

if __name__ == "__main__":

    neural_network = ANN()
    #trainig data, gegeven situaties
    training_inputs = np.array([[0,0,0,0,0,0,0,0],
                                [1,0,0,0,0,0,0,0],
                                [0,1,0,0,0,0,0,0],
                                [1,1,0,0,0,0,0,0],
                                [0,0,1,0,0,0,0,0],
                                [1,0,1,0,0,0,0,0],
                                [0,1,1,0,0,0,0,0],
                                [1,1,1,0,0,0,0,0]])

    training_outputs = np.array([[1,0,1,1,0,0,1,0]]).T

    #training uitvoeren met de inputs, op de outputs
    neural_network.train(training_inputs, training_outputs, 50000)

    run = True
    while run:
        print( "Geef 3 waardes aan, de Neural network zal een nieuw nummer bepalen uit de gegeven situaties" )
        inp1 = str(input("Waarde 1: "))
        inp2 = str(input("Waarde 2: "))
        inp3 = str(input("Waarde 3: "))

        print( "Nieuwe waarde uit uw situatie" )
        print(neural_network.think(np.array([inp1,inp2,inp3,0,0,0,0,0])))
        
        option = str(input("Nieuwe test?(Y/n): ")).lower()
        if option == "y":
            print( "Volgende..." )
        elif option == "n":
            print( "Afsluiten..." )
            run = False
        else:
            print( "Volgende..." )
