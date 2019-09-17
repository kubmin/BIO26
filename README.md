# BIO26 App

[![BIO 26 App](https://i.imgur.com/SK2QXvL.jpg)](https://www.youtube.com/watch?v=cFHTQ0yzrnE "BIO 26 App")

This repository contains all the files for the **BIO26 – Library Team app**. The **client** (work in progress) is made with [Vue.js](https://vuejs.org/) and talks to the [Flask](https://palletsprojects.com/p/flask/) **server** (work in progress), which runs the [image-path](https://github.com/ml4a/ml4a-guides/blob/master/notebooks/image-path.ipynb) **algorithm** and returns the result back to the **client**.

# NN (nearest neighbour) algorithm

The [image-path](https://github.com/ml4a/ml4a-guides/blob/master/notebooks/image-path.ipynb) algorithm can be found in ``server/image-path`` and is split up in two Python scripts. You will need to install the pip packages found in ``requirements.txt`` to be able to run the scripts. NOTE: it is advised to create a [virtualenv](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) for this repo.

```
$ python3 -m pip install -r requirements.txt
```

**Step 1: Analysing images**

To analyse an folder with images you will need to place a folder with images in the ``server/image-path/datasets/`` folder and run the following command (this could take a while, 2000 images takes about 15 minutes):

```
$ python3 analyse.py
```

**Step 2: Generating output**

After analysing, you will have two new files (or weights) in the ``server/data`` folder. These files will be used by the second script to generate an output. To view the output, run the following commands:

```
$ python3 image-path.py
```

This will pick two random images and generate the shortest path between them.

![
](https://i.imgur.com/9GhCbk8.png "Output")
