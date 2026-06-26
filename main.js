// ─────────────────────────────────────────────
//  IMPORTS
//  We pull in Three.js and OrbitControls using
//  ES module imports. The browser resolves the
//  paths using the import map in index.html.
// ─────────────────────────────────────────────
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// ─────────────────────────────────────────────
//  1. SCENE
//  The scene is the container for everything:
//  objects, lights, cameras, etc.
// ─────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f0f); // dark background


// ─────────────────────────────────────────────
//  2. CAMERA
//  PerspectiveCamera mimics how human eyes see.
//  Arguments: fov, aspect ratio, near clip, far clip
// ─────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  60,                                      // field of view (degrees)
  window.innerWidth / window.innerHeight,  // aspect ratio
  0.1,                                     // nearest visible distance
  1000                                     // farthest visible distance
);

// Pull the camera back along the Z axis so the cube is visible
camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0); // point it at the center of the scene


// ─────────────────────────────────────────────
//  3. RENDERER
//  The renderer draws the scene onto the canvas.
// ─────────────────────────────────────────────
const canvas = document.getElementById('cube-canvas');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true // smooth edges
});

// Size the renderer to the actual window pixels
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2× for performance


// ─────────────────────────────────────────────
//  4. LIGHTS
//  MeshPhongMaterial needs light to show color.
//  We add three lights so every face is visible.
// ─────────────────────────────────────────────

// Soft overall light — prevents any face from being pure black
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Main directional light — creates highlights and depth
const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
mainLight.position.set(4, 4, 4);
scene.add(mainLight);

// Fill light from the opposite side — softens shadows
const fillLight = new THREE.DirectionalLight(0xaaaaff, 0.5);
fillLight.position.set(-4, -2, -4);
scene.add(fillLight);


// ─────────────────────────────────────────────
//  5. CUBE
//  A Mesh = Geometry (shape) + Material (look).
//  We give each of the 6 faces a different color.
// ─────────────────────────────────────────────
const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);

// One material per face (6 faces total)
const materials = [
  new THREE.MeshPhongMaterial({ color: 0xff6b6b }), // right  — coral red
  new THREE.MeshPhongMaterial({ color: 0xffa94d }), // left   — orange
  new THREE.MeshPhongMaterial({ color: 0xffd43b }), // top    — yellow
  new THREE.MeshPhongMaterial({ color: 0x69db7c }), // bottom — green
  new THREE.MeshPhongMaterial({ color: 0x74c0fc }), // front  — sky blue
  new THREE.MeshPhongMaterial({ color: 0xda77f2 }), // back   — purple
];

const cube = new THREE.Mesh(geometry, materials);
cube.position.set(0, 0, 0); // center of the scene
scene.add(cube);


// ─────────────────────────────────────────────
//  6. ORBIT CONTROLS
//  Lets the user drag to rotate and scroll to zoom.
//  Works with both mouse and touch input.
// ─────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;   // adds a smooth "ease out" to dragging
controls.dampingFactor = 0.05;
controls.enableZoom = true;      // scroll wheel / pinch to zoom
controls.enablePan = false;      // keep the cube locked to center
controls.minDistance = 1.5;      // max zoom in
controls.maxDistance = 8;        // max zoom out


// ─────────────────────────────────────────────
//  7. HANDLE WINDOW RESIZE
//  Update camera and renderer whenever the
//  browser window is resized.
// ─────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // apply changed aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// ─────────────────────────────────────────────
//  8. ANIMATION LOOP
//  requestAnimationFrame calls animate() ~60×/sec.
//  Each frame we rotate the cube a tiny bit and
//  redraw the scene.
// ─────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  // Auto-rotate the cube slowly
  cube.rotation.x += 0.004;
  cube.rotation.y += 0.006;

  // Required every frame when enableDamping is true
  controls.update();

  // Draw the scene
  renderer.render(scene, camera);
}

animate(); // start the loop
