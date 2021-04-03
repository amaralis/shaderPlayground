const frag = `

varying vec2 v_Uv;
varying vec4 v_Pos;

uniform float u_Resolution;
uniform float u_Time;

float halve(float coord){
    return coord * 0.5;
}

float smoothStripeFn(float axis){
    return 1.0 - abs(axis);
}

float starrify(float color, vec2 uv){
    float smoothStripeX = smoothStripeFn(uv.x);
    float smoothStripeY = smoothStripeFn(uv.y);

    float newColor = color;

    newColor += float(smoothStripeX);
    newColor += float(smoothStripeY);

    return (newColor + (1.0 - smoothStripeX * smoothStripeY));
}

void main() {
    vec2 uv = (v_Uv - 0.5) * 20.0;

    vec4 color = vec4(0.0);

    color = vec4(starrify(color.r, uv), starrify(color.g, uv), starrify(color.b, uv), 1.0);

    gl_FragColor = vec4(color);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export default frag;