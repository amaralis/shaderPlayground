// Book of Shaders 05

const frag = `

varying vec2 v_Uv;
varying vec4 v_Pos;

uniform vec2 u_Resolution;
uniform float u_Time;
uniform vec2 u_Mouse;

float makeSmoothLine(vec2 uv){
    return smoothstep(0.02, 0.0, abs(uv.y - uv.x));
}

float makeResponsiveSmoothLine(vec2 uv, float percent){
    return smoothstep(percent - 0.03, percent, uv.y) - smoothstep(percent, percent + 0.03, uv.y);
}

float makeLine(vec2 uv){
    // Horizontal (switch to uv.x for vertical)
    // color = step(0.48, uv.y);
    // color -= step(0.52, uv.y);
    float color = step(0.48, uv.y) - step(0.52, uv.y);

    // Diagonal (follows x,y but with a slight offset to x, otherwise, it would have zero thickness, because x and y would always be the same along the diagonal)
    float testColor = step(uv.y - 0.01, uv.x) - step(uv.y + 0.01, uv.x);

    return testColor;
}

float makeResponsiveLine(vec2 uv, float y){
    return step(uv.y - 0.01, uv.x / y) - step(uv.y + 0.01, uv.x / y);
}

// Get more from https://www.iquilezles.org/www/articles/functions/functions.htm

float gain(float x, float k) 
{
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}

float sinc( float x, float k )
{
    float a = 3.14159265359*(k*x-1.0);
    return sin(a)/a;
}

// --------------------- //

void main() {
    vec2 mouse = u_Mouse / u_Resolution;
    mouse.y = 1.0- mouse.y;
    vec2 st = gl_FragCoord.xy / u_Resolution;
    vec2 uv = v_Uv;

    // Establish a linear interpolation between x and y
    // float y = v_Uv.x;

    // OR

    // Shape the line. For example, we can tie y to a power of x, instead of just x, or anything else
    // float power = pow(v_Uv.x, 5.0);
    // float sqRoot = sqrt(v_Uv.x);
    // float y = sin(v_Uv.x * 25.0) * 0.3 + 0.5;
    // float y = sign(uv.x);
    // float y = abs(uv.x);
    // float y = gain(uv.x, uv.y);
    // float y = gain(uv.x, 0.2);
    float y = sinc(uv.x, 20.0) * 0.7 + 0.2;
    // float y = uv.x;

    vec3 color = vec3(y);

    // Make gradient along x axis
    float gradient = v_Uv.x;

    // Make a line that goes from 0,0 to 1,1
    // float line = makeSmoothLine(v_Uv);
    // float line = makeLine(v_Uv);
    // float line = makeResponsiveLine(v_Uv, y);
    float line = makeResponsiveSmoothLine(v_Uv, y);

    // Add gradient and line to canvas

    // Select everything that's not the line
    // color = (1.0 - line);
    // This will throw a compile error. We need to make that selection the gradient first
    // color = (1.0 - line) * color;
    // Now we need to make the line red, so we add it in
    color = (1.0 - line) * color + vec3(line, 0.0, 0.0);

    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export default frag;