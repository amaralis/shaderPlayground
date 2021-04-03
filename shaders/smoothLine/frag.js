const frag = `

varying vec2 v_Uv;
varying vec4 v_Pos;

uniform float u_Resolution;
uniform float u_Time;

float smoothStripeFn(float axis){
    return 1.0 - abs(axis);
}

void main() {
    vec2 uv = (v_Uv - 0.5) * 20.0;

    vec4 color = vec4(0.0);

    color = vec4(smoothStripeFn(uv.x));

    gl_FragColor = vec4(color);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export default frag;