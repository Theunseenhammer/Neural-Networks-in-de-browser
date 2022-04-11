"""
MNIST converter naar JSON
Benodigdheden: MNIST ubyte dataset



Data structuur:
{
    input: [0,0,0,1,1, ... ,0,0], // a 784-length array of floats representing each pixel of the 28 x 28 image, normalized between 0 and 1
    output: [0,0,0,0,0,0,1,0,0,0] // a 10-length binary array that tells which digits (from 0 to 9) is in that image
}
"""
from mlxtend.data import loadlocal_mnist
import numpy as np
from json import JSONEncoder
import json


class NumpyArrayDecoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.uint8):
            return int(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NumpyArrayDecoder, self).default(obj)

x, y = loadlocal_mnist(
        images_path='train-images.idx3-ubyte', 
        labels_path='train-labels.idx1-ubyte')

x_list = []
y_list = []
json_list = []


def bitfield(n):
    output = [0,0,0,0,0,0,0,0,0,0]
    output[n] = 1
    return output


for index in range(0, len(x)):
    for num in range(len(x[index])):
        if(x[index][num] != 0):
            x[index][num] = 1
    
    

    json_list.append({"input" : x[index], "output" : bitfield(y[index])})

with open("mnist.json", "w") as output_file:
     json.dump(json_list, output_file, indent= 4, cls=NumpyArrayDecoder)
