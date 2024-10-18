// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbital Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Camera position
camera.position.set(5, 5, 5);
controls.update();

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 7);
scene.add(directionalLight);

// Field (simple plane)
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Forest (placeholder, replace with tree models)
const forestMaterial = new THREE.MeshPhongMaterial({color: 0x008000});
const forestGeometry = new THREE.BoxGeometry(10, 20, 10);
const forest = new THREE.Mesh(forestGeometry, forestMaterial);
forest.position.set(0, 10, -50);
scene.add(forest);

// Lightning Effect (basic, not animated)
const lightningGeometry = new THREE.BufferGeometry();
const lightningMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const lightningPoints = [];
for (let i = 0; i < 10; i++) {
    lightningPoints.push(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 + 5, Math.random() * 10 - 5));
}
lightningGeometry.setFromPoints(lightningPoints);
const lightning = new THREE.Line(lightningGeometry, lightningMaterial);
scene.add(lightning);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});