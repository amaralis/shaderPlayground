const frag = `
varying vec2 v_Uv;
uniform float u_Time;
void main() {
    vec2 uv = v_Uv;
    
    float frequency = 1.0;
    float timeMult = 0.2;
    float time = u_Time * timeMult;
    float blurrinessMult = 0.3;
    float lacunarity = 2.0;
    float persistence = 0.5;
    float scale = 1.0;
    float offset = 1.3;

    gl_FragColor = vec4(0.1);
}
`

export default frag;