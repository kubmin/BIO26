import os
from pdf2image import convert_from_path

pdf_input = '/input/'
pdf_output = './output'

os.chdir(os.getcwd() + pdf_input)

for pdf_file in os.listdir(os.getcwd()):

    if pdf_file.endswith(".pdf"):
        print("Saving pages as jpeg from {}".format(pdf_file))

        pages = convert_from_path(pdf_file, 300)
        pdf_file = pdf_file[:-4]

        for page in pages:

           page.save("../output/%s-page%d.jpg" % (pdf_file,pages.index(page)), "JPEG")
