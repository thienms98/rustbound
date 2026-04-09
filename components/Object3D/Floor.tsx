const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      {/* <meshStandardMaterial color="gray" /> */}
      <shaderMaterial
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            float scale = 20.0;
            vec2 c = floor(vUv * scale);
            float checker = mod(c.x + c.y, 2.0);
            vec3 color = mix(vec3(0.8,0.8,0.8), vec3(0.2,0.2,0.2), checker);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
      />
    </mesh>
  );
};

export default Floor;
