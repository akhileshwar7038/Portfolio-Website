# Akhileshwar Reddy Songala — Professional Portfolio

A premium, high-performance developer portfolio website designed for **Akhileshwar Reddy Songala**, Senior Java Fullstack Developer. 

Built using semantic **HTML5**, custom responsive **Vanilla CSS**, and **Vanilla JavaScript** to achieve near-instant load speeds, fluid animations, and absolute layout control without large framework dependencies.

---

## 🎨 Design System: "The Neon Architect"

The interface leverages the **Neon Architect** visual design:
- **Tonal Hierarchy**: Deep cosmic slate background (`#0a0f1d`) contrasted with high-fidelity electric teal (`#0d9488`) and violet (`#8b5cf6`) gradient highlights.
- **Glassmorphism**: Translucent panels (`backdrop-filter: blur(16px)`) with subtle `8%` white outlines mimicking polished glass sheets.
- **Micro-interactions**: Magnetic buttons, subtle glowing endpoints on scroll, hover states, and smooth collapsible grids.
- **Dual Themes**: A persistent, smooth toggling Dark (Default) & Light mode theme.

---

## 🚀 Key Features

- **SEO & Semantics**: Search-optimized, semantic HTML tags, responsive viewport settings, and clean typography layouts (using Outfit and Inter google fonts).
- **Dynamic Skills Tabs**: Filters technologies (Backend, Frontend, Databases, DevOps & Tools) dynamically using script logic.
- **Interactive Career Timeline**: Collapsible accordion cards for past roles (Lenovo, Gen Digital/Norton Lifelock, Columbia Bank, etc.) displaying detailed responsibilities without cluttering the landing view.
- **Case Study Cards**: Highlights key system architecture components along with performance metrics (throughput and latency reductions).
- **Vercel Configured**: Ready to deploy with routing rules (`vercel.json`).

---

## 📂 Project Structure

```bash
├── assets/
│   └── avatar.png       # Stylized developer avatar (derived from photo)
├── dist/                # Production build directory (minified & compiled)
│   ├── assets/
│   │   └── avatar.png
│   ├── index.html       # Minified HTML markup
│   ├── styles.css       # Minified Vanilla CSS stylesheet
│   ├── script.js        # Minified JavaScript interaction logic
│   ├── resume.txt       # Raw resume text
│   └── vercel.json      # Routing and clean URL rules
├── index.html           # Main HTML source file
├── styles.css           # Vanilla CSS source stylesheet
├── script.js            # JavaScript interaction source file
├── build.py             # Python automation build script
├── vercel.json          # Deployment configuration
├── resume.txt           # Extracted resume text file
└── README.md            # Repository documentation
```

---

## 🛠️ Local Development & Build Commands

### 1. Run Local Preview
You can run a local preview of the development workspace by starting a simple HTTP server:
```bash
python -m http.server 8000
```
Then visit: **[http://localhost:8000](http://localhost:8000)**

### 2. Build for Production (Minification)
To compile and minify the HTML, CSS, and JS files into the self-contained `dist/` directory, execute:
```bash
python build.py
```
This runs custom regex minifiers that reduce source files:
- **HTML**: ~36% compression.
- **CSS**: ~25% compression.
- **JS**: ~26% compression.

To preview this production-ready build locally, run:
```bash
cd dist
python -m http.server 8001
```
Then visit: **[http://localhost:8001](http://localhost:8001)**

---

## 🌐 Deployment to Hosting Platforms

### Vercel (Recommended)
This repository is pre-configured with a `vercel.json` file.
- **Direct Upload**: Upload only the contents of the `dist/` folder directly into the Vercel dashboard.
- **Git Continuous Integration**:
  - Connect your Git repository to Vercel.
  - Set **Build Command** to: `python build.py`
  - Set **Output Directory** to: `dist`

### Netlify / GitHub Pages
Upload or configure your build target to publish the compiled static files in the **`dist/`** directory.
