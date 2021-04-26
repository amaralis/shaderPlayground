import * as THREE from '../node_modules/three/build/three.module.js';
import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

import plane from './objects/plane.js';
import sphere from './objects/sphere.js';
import cube from './objects/cube.js';
import icosphere from './objects/icosphere.js';
import points from './objects/points.js';

// Canvas //

const canvas = document.querySelector('#canvas');
const width = window.innerWidth;
const height = window.innerHeight;
// const width = canvas.clientWidth;
// const height = canvas.clientHeight;
const resolution = width / height;

// Renderer //

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});


// Camera //

// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.0, 100 );
// camera.position.z = 20;

const fov = 75; // vertical, in degrees
const aspect = 2;
const near= 1;
const far = 500;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 70;

// Scene //

const scene = new THREE.Scene();

// Add Object3Ds to scene graph //

scene.add(plane);
scene.add(sphere);
scene.add(cube);
scene.add(icosphere);
sphere.position.x = - 50;
sphere.rotation.y = Math.PI / 1.2;
cube.position.x = 50;
icosphere.position.y = 50;
// scene.add(points); // for coords shader

// Testing light
const color = 0xFFFFAA;
const intensity = 1.0;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);

// Render scene //

renderer.render(scene, camera);

// Animate //

requestAnimationFrame(animate);

// Make canvas responsive //

function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;
    
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;

    if(needResize){
        // renderer.setSize(width, height, false);
    }

    return needResize;
}

let mouseX;
let mouseY;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

plane.material.uniforms.u_Resolution.value = new THREE.Vector2(canvas.clientWidth, canvas.clientHeight);
sphere.material.uniforms.u_Resolution.value = new THREE.Vector2(canvas.clientWidth, canvas.clientHeight);
console.log(canvas.clientWidth, canvas.clientHeight)

function animate(time){ // requestAnimationFrame(callback) passes the time since the page loaded to the callback function
    time *= 0.001; // convert time to seconds
    plane.material.uniforms.u_Time.value = time;
    plane.material.uniforms.u_Mouse.value = new THREE.Vector2(mouseX, mouseY);
    sphere.material.uniforms.u_Time.value = time;
    sphere.material.uniforms.u_Mouse.value = new THREE.Vector2(mouseX, mouseY);
    icosphere.material.uniforms.u_Time.value = time;
    icosphere.material.uniforms.u_Mouse.value = new THREE.Vector2(mouseX, mouseY);
    cube.material.uniforms.u_Time.value = time;
    cube.material.uniforms.u_Mouse.value = new THREE.Vector2(mouseX, mouseY);
    
    // Check if renderer needs to be resized and update camera properties //

    if(resizeRendererToDisplaySize(renderer)){
        // For orthographic camera:
        // camera.left = width / - 2;
        // camera.right = width / 2;
        // camera.top = height / 2;
        // camera.bottom = height / - 2;

        // For perspective camera:
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        camera.updateProjectionMatrix();
    }

    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

// Orbit Controls //

const controls = new OrbitControls(camera, canvas);
controls.target.set(0,0,0);
controls.update();

// GUI //

// const gui = new dat.GUI();
// gui.closed = false;

// const folder1 = gui.addFolder('Cube');
// // folder1.open();
// const folder2 = gui.addFolder('Plane');
// // folder2.open();
// const folder3 = gui.addFolder('Sphere');
// // folder3.open();

// folder1.add(cube.position, 'x', -10, 10, 0.1);
// folder1.add(cube.position, 'y', -10, 10, 0.1);
// folder1.add(cube.position, 'z', -10, 10, 0.1);

// folder2.add(plane.position, 'x', -10, 10, 0.1);
// folder2.add(plane.position, 'y', -10, 10, 0.1);
// folder2.add(plane.position, 'z', -10, 10, 0.1);

// folder3.add(sphere.position, 'x', -10, 10, 0.1);
// folder3.add(sphere.position, 'y', -10, 10, 0.1);
// folder3.add(sphere.position, 'z', -10, 10, 0.1);