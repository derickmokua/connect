from rembg import remove
from PIL import Image

input_path = r"c:\Users\ADMIN\connect\public\ChatGPT Image Aug 16, 2026, 02_03_20 PM.png"
output_path = r"c:\Users\ADMIN\connect\public\ChatGPT_Image_nobg.png"

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
