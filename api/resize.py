from PIL import Image
import os, sys

Image.MAX_IMAGE_PIXELS = None

path = "/Users/megatrends/Sites/bio-26/api/datasets/big/"
dirs = os.listdir( path )

def resize():
    for item in dirs:
        if os.path.isfile(path+item):
            print(path+item)
            im = Image.open(path+item)
            f, e = os.path.splitext(path+item)
            im.thumbnail((2500,2500), Image.ANTIALIAS)
            im.save(f + '.jpg', 'JPEG', quality=90)
resize()
