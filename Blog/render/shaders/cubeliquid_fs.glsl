uniform float time;
uniform float hoverIntensity;
uniform float dissolve;
varying vec3 vNormal;
varying vec3 vPosition;
float snoise(vec3 v) {
    return fract(sin(dot(v, vec3(12.9898,78.233,45.164))) * 43758.5453);
}
void main() {
    float n = snoise(vPosition * 1.5 + time * 0.5);
    float liquid = 0.5 + 0.5 * sin(time + vPosition.y * 2.0 + n * 2.0 + hoverIntensity * 2.0);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 2.0);
    float alpha = 1.0 - dissolve;
    if (liquid < dissolve) discard;
    vec3 color = mix(vec3(0.1,0.7,1.0), vec3(0.7,0.2,1.0), liquid);
    color += fresnel * vec3(0.3,0.2,0.5);
    gl_FragColor = vec4(color, alpha * 0.85);
} 