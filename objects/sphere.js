import * as THREE from '../node_modules/three/build/three.module.js';
import vert from '../shaders/openSimplexTiled/vert.js';
import frag from '../shaders/openSimplexTiled/frag.js';

const sphereGeo = new THREE.SphereGeometry(8.0, 32, 32);

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
const sphereMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag
});

const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);

export default sphere;