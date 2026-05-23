import { motion } from 'framer-motion';

export default function AllServices() {
  const fullServices = [
    {
      title: "Native Android Development",
      desc: "Hum advanced architectures (MVVM, Clean Architecture) ka use karke high-performance native Android apps banate hain jo ekdum fast aur secure hoti hain.",
      tech: "Kotlin • Java • Android Studio • Jetpack Compose",
      icon: "🤖"
    },
    {
      title: "Cross-Platform Apps",
      desc: "Ek single codebase se Android aur iOS dono platforms ke liye premium aur buttery-smooth applications deploy karna.",
      tech: "Flutter • Dart • Multi-Platform Frameworks",
      icon: "📱"
    },
    {
      title: "Full-Stack Web Systems",
      desc: "Highly scalable, responsive aur secure web applications ki development jo har screen size par seamlessly fit baithti hain.",
      tech: "React.js • Node.js • Tailwind CSS • Next.js",
      icon: "💻"
    },
    {
      title: "Immersive 3D Web & WebGL",
      desc: "Browser ke andar hi interactive 3D elements, custom environments aur configurations integrate karna jo user interaction ko 10x badha dete hain.",
      tech: "Three.js • React Three Fiber • WebGL",
      icon: "🌐"
    },
    {
      title: "Cloud & Backend Automation",
      desc: "Real-time databases, secure user authentication, serverless functions aur microservices ka complete architecture setup.",
      tech: "Firebase • MongoDB • REST APIs • Node",
      icon: "🔥"
    },
    {
      title: "UI/UX & 3D Prototyping",
      desc: "Wireframes aur clean design tools se lekar Blender mein custom 3D low-poly assets aur model sequences create karna.",
      tech: "Figma • Blender • Character Rigging",
      icon: "🎨"
    }
  ];

  return (
    <motion.div 
      className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-16 relative z-10 min-h-[85vh]"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Page Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Our Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Expertise Spectrum</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          From robust mobile infrastructures to immersive three-dimensional web landscapes. Hum business requirements ko scalable digital products mein convert karte hain.
        </p>
      </div>
      
      {/* Solid Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fullServices.map((service, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] flex flex-col justify-between group"
          >
            <div>
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>
            </div>
            
            <div className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-xl inline-block w-full text-center tracking-wide">
              {service.tech}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}