const frag = `

// IMPLEMENTATION DEMOS AT https://stegu.github.io/webgl-noise/webdemo/

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

//////////////////////////////// End noise code ////////////////////////////////

varying vec2 v_Uv;
varying vec4 v_Pos;

uniform vec2 u_Resolution;
uniform float u_Time;
uniform vec2 u_Mouse;

float applyFrequency(float lacunarity, float exponent){
    return pow(lacunarity, exponent);
}

float applyAmplitude(float persistence, float exponent){
    return pow(persistence, exponent);
}

float offsetNoise(float coord, float offset){
    return coord + offset;
}

float normalize01(float value){
    return value * 0.5 + 0.5;
}

void main() {
    vec2 uv = v_Uv;
    
    float frequency = 1.0;
    float timeMult = 0.2;
    float blurrinessMult = 0.3;
    float lacunarity = 2.0;
    float persistence = 0.5;
    float scale = 1.0;
    float offset = 1.3;

    // Use fragcoords if noise should be relative to entire screen instead of object uv
    // vec2 P = gl_FragCoord.xy / u_Resolution.y * scale - 1.0;
    
    // Use uv coords if noise should be relative to uv instead of entire screen
    vec2 P = uv * scale;  
    
    float noise1 = snoise(vec2(offset * 1.0 + P.x * applyFrequency(lacunarity, 0.0), offset * 1.0 + P.y * applyFrequency(lacunarity, 0.0))) * applyAmplitude(persistence, 0.0);
    float noise2 = snoise(vec2(offset * 2.0 + P.x * applyFrequency(lacunarity, 1.0), offset * 2.0 + P.y * applyFrequency(lacunarity, 1.0))) * applyAmplitude(persistence, 1.0);
    float noise3 = snoise(vec2(offset * 3.0 + P.x * applyFrequency(lacunarity, 2.0), offset * 3.0 + P.y * applyFrequency(lacunarity, 2.0))) * applyAmplitude(persistence, 2.0);
    float noise4 = snoise(vec2(offset * 4.0 + P.x * applyFrequency(lacunarity, 3.0), offset * 4.0 + P.y * applyFrequency(lacunarity, 3.0))) * applyAmplitude(persistence, 3.0);

    float normNoise = normalize01(noise1 + noise2 + noise3 + noise4);

    gl_FragColor = vec4(vec3(normNoise), 1.0);
}
`

export default frag;