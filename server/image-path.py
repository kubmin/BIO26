import os
import random
import numpy as np
import pickle
import matplotlib.pyplot as plt
from matplotlib.pyplot import imshow
from PIL import Image
from scipy.spatial import distance
from igraph import *
from tqdm import tqdm

def get_concatenated_images(indexes, thumb_height):
    thumbs = []
    for idx in indexes:
        img = Image.open(images[idx])
        img = img.convert('RGB')
        img = img.resize((int(img.width * thumb_height / img.height), thumb_height))
        thumbs.append(img)
    concat_image = np.concatenate([np.asarray(t) for t in thumbs], axis=1)
    return concat_image

images, graph = pickle.load(open('data/graph_images_30knn.p', 'rb'))

# pick two random indices
idx1 = int(len(images) * random.random())
idx2 = int(len(images) * random.random())

# # run get_shortest_paths
path = graph.get_shortest_paths(idx1, to=idx2, mode=OUT, output='vpath', weights='weight')[0]

# retrieve the images, concatenate into one, and display them
results_image = get_concatenated_images(path, 200)
# show image
plt.imshow(results_image)
plt.show()
