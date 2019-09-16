# BIO26 App

[![](https://video-to-markdown.netlify.com/.netlify/functions/image?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DcFHTQ0yzrnE%26feature%3Dyoutu.be)](https://www.youtube.com/watch?v=cFHTQ0yzrnE&feature=youtu.be "")

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
](https://lh3.googleusercontent.com/K2e-AJFeUB4mDybpHwRsb-4xQlkcKDMfX6dpR1za2P2_4_Be5-eUWaLHxJ3gf6kB48ehGvqLxMzPhqqMZAVuPcPO6XkUM74HRegmuL4btHSjOL1ibiwMtFlq93amZWewygKoS365PNQAWYEHF7iCbEhoVSBlSyNT9ao87fRe4rRSc7EaYbPaKCmlK3CQ8pLsGrGwegVqTrqFg9Riwqh7TI-JxOUU98Gr_wMhRPD7f9KwrV_Kqk_R7Ns3M3D0plgZtX74MpYzt9_XgNPVV-tTWQosYKOemHP8kRJpXh_KoaBYzoAv2ktzIMJZLuRj4hJ4NQFuzEtZdGJWUjepghyQdjHHWVbzJ5sg-ekhI6i0wHmFqXBLt3EAXDBScvzluMDDKvi2Vp7rq4wjTV3ud7M-PW26sXzhJ1Kx00MaQnPW6xGLwNb_O_dvc2jCyFS-ctYETDBJDR2IDCrqzAUG_EyaWQ64-lYzUNjiS6qoTENnDPC58SBWahlEsCMTrsf-DZ2xVaU9EqY1XNYh0-_jXd8NyZAl21yRC8gdkMDnpx9wl8NNByIqHpLyZVJ9RH4H_CuYgET36ahzCfaTwoHHkp3nKPG8FWhcRC1dqwpKY9Agz8OhP5H9B3MRzcSlf4ush0wIvZMdscDVROCPaXuBcgVO4dq4ksOjt2Ojczg6lotGh_ecRtYgjtfuMKU=w1551-h261-no "Output")
