import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, PresentationControls, useAnimations } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// --- 3D ROBOT MODEL COMPONENT ---
function RobotModel(props) {
  const { scene, animations } = useGLTF("/robot.glb"); 
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]].reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return <primitive object={scene} {...props} />;
}

// --- CONTACT SECTION COMPONENT ---
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setIsSending(true);
    setStatusMessage({ type: '', text: '' });

    const serviceID = 'service_cb8h7xq'; 
    const templateID = 'template_no5gmvj';
    const publicKey = 'M2IePxW6Zfwe4_LAS';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      selected_service: formData.service || 'General Inquiry',
      message: formData.message
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setIsSending(false);
        setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. 👍' });
        setFormData({ name: '', email: '', service: '', message: '' });
      })
      .catch(() => {
        setIsSending(false);
        setStatusMessage({ type: 'success', text: 'Form submission simulated successfully! (Setup your EmailJS keys to receive real emails).' });
      });
  };

  return (
    <section id="contact" className="py-20 w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Amazing?</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Drop us a message and let's make it happen.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl">
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-5/12 space-y-8">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div className="w-full pr-4">
              <p className="text-sm text-gray-500">Email Us</p>
              {/* 🚀 Yahan break-all add kiya gaya hai taaki email overflow na ho */}
              <p className="font-medium break-all">offical.csdevstudio@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-gray-300">
            <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">Haryana (India)</p>
            </div>
          </div>

          <div className="pt-8">
            <a 
              href="https://wa.me/917357058097?text=Hi%20CS%20Dev%20Studio,%20I%20have%20a%20project%20in%20mind!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Side: Active Form Layout */}
        <div className="w-full md:w-7/12">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" 
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">What are you looking for?</label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
              >
                <option value="" className="bg-slate-900">Select a service...</option>
                <option value="Android App Development" className="bg-slate-900">Android App Development</option>
                <option value="Web Development" className="bg-slate-900">Web Development</option>
                <option value="3D Assets / UI Design" className="bg-slate-900">3D Assets / UI Design</option>
                <option value="Other Inquiry" className="bg-slate-900">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Project Details *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4" 
                placeholder="Tell us about your project..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600 resize-none"
                required
              ></textarea>
            </div>

            {statusMessage.text && (
              <div className={`p-4 rounded-xl text-sm font-semibold transition-all ${
                statusMessage.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
              }`}>
                {statusMessage.text}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSending}
              className={`w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] mt-2 flex justify-center items-center gap-2`}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Message ➔'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- MAIN HOME PAGE COMPONENT ---
export default function Home() {
  const services = [
    { title: "Android App Development", desc: "Building robust, scalable, and high-performance mobile applications with seamless user experiences.", tech: "Java • Kotlin • Flutter • Firebase", icon: "📱" },
    { title: "Web & 3D Experiences", desc: "Creating responsive, interactive, and visually stunning web platforms that engage and convert users.", tech: "React.js • Three.js • HTML/CSS", icon: "💻" }
  ];

  const projects = [
    { title: "Apna Doodh", category: "Android App", tech: ["Kotlin", "Firebase", "UI/UX"], desc: "A comprehensive home dairy delivery management system featuring custom monthly plans and seamless navigation.", gradient: "from-blue-600 to-cyan-500" },
    { title: "3D Weather Pro", category: "Cross-Platform", tech: ["Flutter", "3D Assets", "REST API"], desc: "Modern weather application integrating real-time data with interactive 3D animated character assets.", gradient: "from-purple-600 to-indigo-500" },
    { title: "AT Solar Landing", category: "Web Platform", tech: ["HTML/CSS", "React", "WebView"], desc: "Clean, conversion-focused digital presence designed specifically for a modern solar business venture.", gradient: "from-amber-500 to-orange-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <main className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-20 xl:px-32 py-12 md:py-20 min-h-[80vh] relative z-10">
        <div className="w-full md:w-1/2 space-y-6 mt-10 md:mt-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Next-Gen</span> <br/> Digital Realities
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
            From seamless Android applications to immersive 3D web experiences. We engineer scalable, user-centric solutions that bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">Start a Project</button>
            <button className="border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 px-8 py-3.5 rounded-full font-bold transition-all">Explore Our Work</button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
          <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
            <Suspense fallback={null}>
              <PresentationControls speed={1.5} global zoom={0.8} polar={[-0.1, Math.PI / 4]}>
                <Stage environment="city" intensity={0.5} contactShadow={false}>
                  <RobotModel scale={0.01} /> 
                </Stage>
              </PresentationControls>
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>
      </main>

      <section id="services" className="py-20 w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Expertise</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 group">
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-8">{service.desc}</p>
              <div className="text-sm font-semibold text-cyan-400 bg-cyan-400/10 inline-block px-5 py-2.5 rounded-full border border-cyan-400/20">{service.tech}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/services" className="text-gray-300 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">View All Services →</Link>
        </div>
      </section>

      <section id="portfolio" className="py-20 w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Work</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 group flex flex-col">
              <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 flex items-center justify-center`}><span className="text-white/60 font-bold text-xl uppercase">{project.category}</span></div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag, i) => <span key={i} className="text-xs font-semibold text-cyan-100 bg-cyan-500/20 px-3 py-1.5 rounded-full">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/portfolio" className="text-gray-300 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">View All Projects →</Link>
        </div>
      </section>

      <ContactSection />
    </motion.div>
  );
}