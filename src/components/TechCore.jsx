import { Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';

export default function TechCore() {
  return (
    <group>
      {/* Andar ka glowing liquid core (Cyan) */}
      <Sphere args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial 
          color="#06b6d4" 
          emissive="#06b6d4" 
          emissiveIntensity={1} 
          distort={0.4} 
          speed={2.5} 
          roughness={0.2}
        />
      </Sphere>
      
      {/* Bahar ka tech wireframe shield (Purple) */}
      <Icosahedron args={[2.2, 1]}>
        <meshStandardMaterial 
          color="#a855f7" 
          wireframe={true} 
          emissive="#a855f7" 
          emissiveIntensity={0.8} />
      </Icosahedron>
    </group>
  );
}