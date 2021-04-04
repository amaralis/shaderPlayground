const vert = `
varying vec2 v_Uv;
varying vec4 v_Pos;

void main() {
    
    v_Uv = uv;
    v_Pos = gl_Position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`

export default vert;