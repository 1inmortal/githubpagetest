uniform float time;
uniform float hoverIntensity;
uniform float dissolve;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

// Simplex/Perlin noise de ejemplo (puedes mejorar)
float snoise(vec3 v) {
    return fract(sin(dot(v, vec3(12.9898,78.233,45.164))) * 43758.5453);
}

void main() {
    float n = snoise(vPosition * 2.0 + time * 0.7);
    float liquid = 0.5 + 0.5 * sin(time + vPosition.y * 2.0 + n * 3.0 + hoverIntensity * 2.0);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 2.0);
    float alpha = 1.0 - dissolve;
    if (liquid < dissolve) discard;
    // Mezcla de colores Figma (rojo, verde, azul, morado, naranja)
    vec3 color1 = vec3(0.95,0.25,0.25); // rojo
    vec3 color2 = vec3(0.15,0.85,0.45); // verde
    vec3 color3 = vec3(0.25,0.55,0.95); // azul
    vec3 color4 = vec3(0.7,0.3,0.95);   // morado
    vec3 color5 = vec3(0.98,0.65,0.25); // naranja
    float t = 0.5 + 0.5 * sin(time + vUv.x*6.0 + vUv.y*6.0 + n*2.0);
    vec3 color = mix(color1, color2, t);
    color = mix(color, color3, abs(sin(time*0.7 + vUv.y*8.0)));
    color = mix(color, color4, abs(sin(time*0.5 + vUv.x*8.0)));
    color = mix(color, color5, abs(sin(time*0.9 + vUv.x*4.0 + vUv.y*4.0)));
    // Aberración cromática sutil
    color += fresnel * vec3(0.2,0.1,0.3);
    gl_FragColor = vec4(color, alpha * 0.9);
} 