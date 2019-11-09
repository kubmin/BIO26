import os, sys

path = "/Users/megatrends/Sites/bio-26/api/datasets/biov3/"
dirs = os.listdir( path )

for item in dirs:
    if os.path.isfile(path+item):
        # print(item)
        old_filename, e = os.path.splitext(item)
        # print(old_filename)
        new_filename = old_filename.replace(":", "_")
        print(new_filename)
        os.rename(path + old_filename +'.jpg', path + new_filename + '.jpg')
