precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

// todo #3 - receive texture coordinates and verify correctness by 
// using them to set the pixel color 
varying vec2 vTextcoords;

void main(void) {
    // todo #5

    // todo #3
    vec4 texture = texture2D(uTexture, vTextcoords);
    gl_FragColor = vec4(texture.xyz, uAlpha);
}

// EOF 00100001-10
