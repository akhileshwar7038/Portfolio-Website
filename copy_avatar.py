import os
import shutil

src = r"C:\Users\akhil\.gemini\antigravity\brain\a6ebd61b-9d31-4935-b858-c064666ddb51\stylized_avatar_1780078954459.png"
dst_dir = r"c:\akhil\New folder (2)\assets"
dst = os.path.join(dst_dir, "avatar.png")

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

shutil.copy(src, dst)
print("Stylized avatar copied successfully to assets/avatar.png")
