import * as THREE from '../node_modules/three/build/three.module.js';
import vert from '../shaders/openSimplexTiled/vert.js';
import frag from '../shaders/openSimplexTiled/frag.js';

const cubeGeo = new THREE.BoxGeometry(10.0, 10.0, 10.0);

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

// const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x55FFFF});
const boxMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag
});

const cube = new THREE.Mesh(cubeGeo, boxMaterial);

export default cube;