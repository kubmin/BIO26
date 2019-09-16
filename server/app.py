from flask import Flask, jsonify, send_file, send_from_directory, request
from flask_cors import CORS
import random
import collections
import numpy as np
import pickle
from PIL import Image
from scipy.spatial import distance
from igraph import *


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__, static_url_path='/image-path/')
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# load images array and graph
images, graph = pickle.load(open('data/graph_images_30knn.p', 'rb'))

@app.route('/', methods=['GET'])
def random_images():
    image_list = []
    for _ in range(8):
        idx = int(len(images) * random.random())
        data = { 'id': idx, 'url': images[idx] }
        image_list.append(data)
    return jsonify(image_list)

# nearest neighbour POST and GET endpoint
@app.route('/nn', methods=['GET', 'POST'])
def nearest_neighbour():
    def get_concatenated_images_path(indexes):
        image_list = []
        for idx in indexes:
            data = { 'id': idx, 'url': images[idx] }
            image_list.append(data)
        return image_list

    if request.method == 'POST':
        # request to unordered dict
        dict = request.form.to_dict()
        # parse values (image id) in a list
        list_values = [ v for v in dict.values() ]

        idx1 = int(list_values[0])
        idx2 = int(list_values[1])

    else:
        idx1 = int(len(images) * random.random())
        idx2 = int(len(images) * random.random())

    path = graph.get_shortest_paths(idx1, to=idx2, mode='OUT', output='vpath', weights='weight')[0]

    results_image = get_concatenated_images_path(path)

    return jsonify(results_image)

@app.route('/datasets/images/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    print(filename)
    return send_from_directory(directory='datasets/images/', filename=filename)



if __name__ == '__main__':
    app.run()
