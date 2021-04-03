const frag = `

varying vec2 v_Uv;
varying vec4 v_Pos;

uniform vec2 u_Resolution;
uniform float u_Time;
uniform vec2 u_Mouse;

void main() {
    vec2 st = (gl_FragCoord.xy / u_Resolution.xy);
    vec2 uv = v_Uv;
    vec2 mouse = u_Mouse / u_Resolution;

    // Values passed from javascript have origin in top-left corner, let's just invert that to be bottom-left
    mouse.y = 1.0 - mouse.y;

    vec4 color = vec4(0.0);

    // color = vec4(uv.x, uv.y, 0.0, 1.0);
    // color = vec4(st.x, st.y, 0.0, 1.0);
    color = vec4(mouse.x, mouse.y, 0.0, 1.0);

    gl_FragColor = color;
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export default frag;