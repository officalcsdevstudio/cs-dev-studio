import { Suspense, useEffect } from 'react'; // useEffect add kiya hai
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
// useAnimations ko import kiya hai
import { OrbitControls, useGLTF, Stage, PresentationControls, useAnimations } from '@react-three/drei';

// 1. 3D Model Loader Component (Yahin Asli Jaadu Hai)
function Model(props) {
  // 'scene' ke saath 'animations' ko bhi file se bahar nikaalein
  const { scene, animations } = useGLTF("/robot.glb"); 
  
  // Animations ko Model ke saath jodein
  const { actions, names } = useAnimations(animations, scene);

  // Component load hote hi animation play karne ka command
  useEffect(() => {
    // Agar file ke andar koi bhi animation hai (length > 0)
    if (names.length > 0) {
      // Sabse pehli (0th) animation ko play kar do
      actions[names[0]].reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return <primitive object={scene} {...props} />;
}

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[#050816] px-6 py-20 md:py-0">
      
      {/* Background Effect: Abstract Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* LEFT SIDE: Text Content */}
      <div className="flex-1 flex flex-col justify-center items-start z-10 text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-black text-white text-[40px] xs:text-[50px] sm:text-[60px] lg:text-[80px] leading-tight">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Next-Gen</span>
            <br /> Digital Realities
          </h1>
          
          <p className="text-[#dfd9ff] font-medium lg:text-[24px] sm:text-[20px] text-[16px] lg:leading-[40px] mt-4 max-w-lg">
            Specializing in Native Android, Flutter Apps, 
            and immersive 3D Web Experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              View Projects
            </button>
            <button className="border border-cyan-500/50 hover:border-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: 3D Model Area */}
      <div className="flex-1 w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] mt-10 md:mt-0 relative">
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} className="cursor-grab active:cursor-grabbing">
          <color attach="background" args={['#050816']} />
          <Suspense fallback={null}>
            <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
              <Stage environment="city" intensity={0.6} contactShadow={false}>
                {/* 3D Model yahan load hoga */}
                <Model scale={0.01} /> 
              </Stage>
            </PresentationControls>
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 w-full flex justify-center items-center md:hidden">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/20 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="w-3 h-3 rounded-full bg-cyan-400 mb-1"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;