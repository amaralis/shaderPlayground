import * as THREE from '../node_modules/three/build/three.module.js';
import vert from '../shaders/openSimplexTiledLooping/vert.js';
import frag from '../shaders/openSimplexTiledLooping/frag.js';

// const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
// const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const planeGeometry = new THREE.PlaneGeometry(30, 30.0);

// Uniforms to pass into the shader

const uniforms = {
    u_Time: {value: 0.0},
    u_Resolution: {value: new THREE.Vector2(0.0, 0.0)},
    u_Mouse: {value: new THREE.Vector2(0.0, 0.0)},
    // u_NoiseOffsetX: {value: 1.337},
    // u_NoiseOffsetY: {value: 1.337},
    // u_NoiseOffsetZ: {value: 1.337},
}

// Material //

// const material = new THREE.MeshPhongMaterial({color: 0x55FFFF});
const planeMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

export default plane;