import os
import re
import shutil

def create_dist_dirs():
    dist_dir = 'dist'
    assets_dir = os.path.join(dist_dir, 'assets')
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    os.makedirs(dist_dir)
    os.makedirs(assets_dir)
    print("Created dist/ and dist/assets/ directories.")

def minify_css(css_content):
    # Remove CSS comments
    css = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    # Remove unnecessary whitespace and newlines
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([\{\};:,])\s*', r'\1', css)
    return css.strip()

def minify_js(js_content):
    # Remove single line comments (keeping http:// etc)
    js = re.sub(r'(?<!:)\/\/.*$', '', js_content, flags=re.MULTILINE)
    # Remove block comments
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    # Replace multiple spaces/newlines with single space
    js = re.sub(r'\s+', ' ', js)
    return js.strip()

def minify_html(html_content):
    # Remove HTML comments (except SSI or conditional comments if any, but none here)
    html = re.sub(r'<!--(?!\[if).*?-->', '', html_content, flags=re.DOTALL)
    # Compress whitespaces
    html = re.sub(r'\s+', ' ', html)
    # Remove space around tags
    html = re.sub(r'>\s+<', '><', html)
    return html.strip()

def build():
    create_dist_dirs()
    
    # 1. Minify CSS
    with open('styles.css', 'r', encoding='utf-8') as f:
        css = f.read()
    minified_css = minify_css(css)
    with open('dist/styles.css', 'w', encoding='utf-8') as f:
        f.write(minified_css)
    print(f"Minified styles.css: {len(css)} bytes -> {len(minified_css)} bytes.")
    
    # 2. Minify JS
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
    minified_js = minify_js(js)
    with open('dist/script.js', 'w', encoding='utf-8') as f:
        f.write(minified_js)
    print(f"Minified script.js: {len(js)} bytes -> {len(minified_js)} bytes.")
    
    # 3. Minify HTML
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    minified_html = minify_html(html)
    with open('dist/index.html', 'w', encoding='utf-8') as f:
        f.write(minified_html)
    print(f"Minified index.html: {len(html)} bytes -> {len(minified_html)} bytes.")
    
    # 4. Copy assets
    avatar_src = 'assets/avatar.png'
    avatar_dst = 'dist/assets/avatar.png'
    if os.path.exists(avatar_src):
        shutil.copy(avatar_src, avatar_dst)
        print("Copied avatar.png to dist/assets/.")
    else:
        print("Warning: avatar.png not found in assets/!")
        
    # 5. Copy resume.txt
    resume_src = 'resume.txt'
    resume_dst = 'dist/resume.txt'
    if os.path.exists(resume_src):
        shutil.copy(resume_src, resume_dst)
        print("Copied resume.txt to dist/.")
    else:
        print("Warning: resume.txt not found in workspace!")
        
    # 6. Copy vercel.json
    vercel_src = 'vercel.json'
    vercel_dst = 'dist/vercel.json'
    if os.path.exists(vercel_src):
        shutil.copy(vercel_src, vercel_dst)
        print("Copied vercel.json to dist/.")
    else:
        print("Warning: vercel.json not found in workspace!")
        
    print("\nProduction deployment build completed successfully in the 'dist' directory!")

if __name__ == '__main__':
    build()
