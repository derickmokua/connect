from PIL import Image

def remove_white_bg(input_path, output_path, threshold=240):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_bg(r"c:\Users\ADMIN\connect\public\ChatGPT Image Aug 16, 2026, 02_03_20 PM.png", r"c:\Users\ADMIN\connect\public\ChatGPT_Image_nobg_fast.png")
