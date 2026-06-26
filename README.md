# 3D Rotating Cube

A beginner-friendly 3D project built with [Three.js](https://threejs.org/).  
A colorful cube spins automatically on a dark background, and you can grab it with your mouse or finger to rotate it any way you like.

---

## What's inside

```
├── index.html   – page structure and script tags
├── style.css    – dark background + full-screen canvas
├── main.js      – all the Three.js code (well-commented)
└── README.md    – this file
```

---

## How to run it

No build tools or installs needed — Three.js is loaded from a CDN.

### Option 1 – Open directly in a browser (simplest)

1. Download or clone this folder.
2. Double-click `index.html`.  
   It will open in your default browser and just work.

### Option 2 – Use a local dev server (recommended)

Some browsers block local file imports. A tiny server avoids that.

**With VS Code + Live Server extension:**
1. Open the folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

**With Node.js:**
```bash
npx serve .
```
Then open the URL it prints (usually `http://localhost:3000`).

**With Python:**
```bash
# Python 3
python -m http.server 8080
```
Then open `http://localhost:8080`.

---

## Controls

| Action | Result |
|---|---|
| Click + drag | Rotate the cube |
| Scroll wheel | Zoom in / out |
| Touch + drag | Rotate on mobile |
| Pinch | Zoom on mobile |

---

## How it works (quick overview)

Three.js needs four core pieces to show anything:

1. **Scene** – the empty 3D world where objects live.
2. **Camera** – your viewpoint into that world.
3. **Renderer** – draws everything onto the `<canvas>`.
4. **Mesh** – a 3D object made of *geometry* (shape) + *material* (surface look).

Lighting is added so the cube faces look shaded and colorful instead of flat.  
`OrbitControls` wires up mouse and touch events so you can spin the cube interactively.  
An animation loop (`requestAnimationFrame`) redraws the scene ~60 times per second, nudging the cube's rotation a tiny bit each frame.

---

## Next steps to explore

- Change the cube colors in `main.js` (look for `0xff6b6b` etc.)
- Swap `BoxGeometry` for `SphereGeometry`, `TorusGeometry`, or `ConeGeometry`
- Try different materials: `MeshStandardMaterial`, `MeshBasicMaterial`, `MeshNormalMaterial`
- Add more lights or change their colors
- Load a texture image and wrap it around the cube

Happy coding! 🎲
