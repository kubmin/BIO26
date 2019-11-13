import os
import time
import random
import pickle
import argparse
import keras
from keras.preprocessing import image
from keras.applications.imagenet_utils import decode_predictions, preprocess_input
from keras.models import Model
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from PIL import ImageFile, Image
import numpy as np
from scipy.spatial import distance
from igraph import *
from tqdm import tqdm
import json

Image.MAX_IMAGE_PIXELS = None

parser = argparse.ArgumentParser()
parser.add_argument('-d', '--dataset', required=False, default='biov4', help="location of the dataset")
parser.add_argument('-s', '--save', required=False, default='biov4', help="save location of the trained features")
args = vars(parser.parse_args())

"""
Extracting features from a given dataset using a previously trained VGG16
network
"""
# truncated files fix
ImageFile.LOAD_TRUNCATED_IMAGES = True

images_path = 'datasets/' + args["dataset"]
image_extensions = ['.jpg', '.png', '.jpeg']
max_num_images = 50000
tic = time.perf_counter()
features = []

def load_image(path):
    """
    Pre-processing an image file to feature vectors in order to serve as
    input for the network
    """
    img = image.load_img(path, target_size=model.input_shape[1:3])
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return img, x

print('[INFO] Extracting features')
# pre-trained VGG16 network with imagenet weights
model = keras.applications.VGG16(weights='imagenet', include_top=True)
# Remove the last prediction layer in favour of the fc2 layer, giving
# accurate representations of the image
feat_extractor = Model(inputs=model.input, outputs=model.get_layer("fc2").output)

# grab images in the image_path folder and add it to the images array
# max_num_images is effective here
images = [os.path.join(dp, f) for dp, dn, filenames in os.walk(images_path) for
          f in filenames if os.path.splitext(f)[1].lower() in image_extensions]
if max_num_images < len(images):
    images = [images[i] for i in sorted(random.sample(range(len(images)),
                                                      max_num_images))]

# loop over every image in the images array, extract its features and append
# it to the features list
for i, image_path in enumerate(images):
    if i % 10 == 0:
        toc = time.perf_counter()
        elap = toc-tic
        print("Analyzing image %d / %d – Time: %4.4f seconds" % (i, len(images), elap))
        TIC = time.perf_counter()
    img, x = load_image(image_path)
    feat = feat_extractor.predict(x)[0]
    features.append(feat)

print('[INFO] Finished extracting features for %d images' % len(images))


# reduce the dimensionality of the feature vectors down to 300 to speed things
# up.
features = np.array(features)
pca = PCA(n_components=62)
pca.fit(features)
pca_features = pca.transform(features)

print('[INFO] Saving extracted features')
print('[INFO] Building graph')
# save extracted images, pca_features and pca to use later
pickle.dump([images, pca_features, pca], open('data/' + 'features_' + args["save"] + '.p', 'wb'))

images, pca_features, pca  = pickle.load(open('data/' + 'features_' + args["save"] + '.p', 'rb'))

kNN = 30

graph = Graph(directed=True)
graph.add_vertices(len(images))

for i in tqdm(range(len(images))):
    distances = [ distance.cosine(pca_features[i], feat) for feat in pca_features ]
    idx_kNN = sorted(range(len(distances)), key=lambda k: distances[k])[1:kNN+1]
    for j in idx_kNN:
        graph.add_edge(i, j, weight=distances[j])

summary(graph)

pickle.dump([images, graph], open('data/graph_' + args["save"] + '_30knn.p', 'wb'))
