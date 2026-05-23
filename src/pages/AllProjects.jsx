import { motion } from 'framer-motion';

export default function AllProjects() {
  const fullProjects = [
    {
      title: "Apna Doodh",
      category: "Android Application",
      desc: "A highly robust home dairy delivery and management application. Isme customers ke liye custom monthly delivery subscription plans, real-time tracking, aur automatic billing systems diye gaye hain.",
      tech: ["Kotlin", "Firebase", "Android SDK", "MVVM"],
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "3D Weather Pro",
      category: "Cross-Platform Suite",
      desc: "Ek futuristic weather tracking app jo real-time REST API data ko interactive 3D animated assets aur custom sequences ke saath connect karti hai, jisse user experience ekdum immersive ho jata hai.",
      tech: ["Flutter", "Blender 3D", "REST APIs", "Dart"],
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      title: "AT Solar Landing",
      category: "Web Architecture",
      desc: "Modern solar energy venture ke liye design kiya gaya ek sleek, high-conversion landing page framework. Yeh clean modern components, highly optimized load speed aur responsive design layouts ko handle karta hai.",
      tech: ["HTML/CSS", "React.js", "WebView", "Tailwind"],
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <motion.div 
      className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-16 relative z-10 min-h-[85vh]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Page Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Our Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Case Studies</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          A deep dive into the digital ecosystems we have built. Hum code quality, functional design aur seamless deployment par focus karte hain.
        </p>
      </div>

      {/* Solid Project Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fullProjects.map((project, index) => (
          <div 
            key={index} 
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full"
          >
            {/* Project Gradient Card Header */}
            <div className={`h-52 w-full bg-gradient-to-br ${project.gradient} opacity-75 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center relative p-6`}>
              <span className="text-xs font-bold tracking-widest bg-slate-950/60 backdrop-blur-md px-4 py-1.5 rounded-full mb-3 uppercase text-cyan-400 border border-white/10">
                {project.category}
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md text-center">
                {project.title}
              </h2>
            </div>

            {/* Project Body Context */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.desc}
              </p>
              
              {/* Tech Badges Hub */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((badge, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}