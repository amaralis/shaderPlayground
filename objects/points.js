import * as THREE from '../node_modules/three/build/three.module.js';
import vert from '../shaders/cellularAutomata/vert.js';
import frag from '../shaders/cellularAutomata/frag.js';

const width = window.innerWidth;
const height = window.innerHeight;

const particleCount = 5;
const position = [];

for(let i = 0; i < particleCount; i++){
    const posX = i;
    const posY = i + 1;
    const posZ = 0;

    position.push(posX, posY, posZ);
}

const pointsGeo = new THREE.BufferGeometry();
pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
const pointsMat = new THREE.PointsMaterial({color: 0xFF0000, size: 0.1});
const particleMesh = new THREE.Points(pointsGeo, pointsMat);

export default particleMesh;