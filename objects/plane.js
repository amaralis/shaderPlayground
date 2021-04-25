import * as THREE from '../node_modules/three/build/three.module.js';
// import vert from '../shaders/cellular3d/vert.js';
// import frag from '../shaders/cellular3d/frag.js';
import vert from '../shaders/ridgeNoise/vert.js';
import frag from '../shaders/ridgeNoise/frag.js';

// const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
// const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const planeGeometry = new THREE.PlaneGeometry(50, 50.0);

// Uniforms to pass into the shader

const uniforms = {
    u_Time: {value: 0.0},
    u_Resolution: {value: new THREE.Vector2(0.0, 0.0)},
    u_Mouse: {value: new THREE.Vector2(0.0, 0.0)},
}

// Material //

const planeMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

export default plane;