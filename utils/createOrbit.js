import * as THREE from '../node_modules/three/build/three.module.js';

export default function createOrbit(object3d, planet, orbitalDistX, orbitalDistY){
    const orbit = new THREE.Object3D();
    object3d.add(orbit);
    orbit.add(planet);
    planet.position.x = orbitalDistX;
    planet.position.y = orbitalDistY;

    return orbit;
}