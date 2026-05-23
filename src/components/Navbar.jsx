import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AIChatbot from './AIChatbot'; 

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  // पापा, यहाँ हमने मोबाइल मेनू को खोलने/बंद करने की स्टेट ऐड की है
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🚀 मास्टर फंक्शन जो किसी भी सेक्शन पर स्क्रॉल करेगा
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    // बटन दबाते ही मोबाइल मेनू अपने आप बंद हो जाएगा
    setIsMobileMenuOpen(false); 

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAIAssistantClick = () => {
    setIsMobileMenuOpen(false); // AI चैट खोलते वक़्त भी मोबाइल मेनू बंद हो जाएगा
    setIsChatOpen(true);
  };

  return (
    <>
      {/* यहाँ z-50 लगा दिया है ताकि मेनू 3D मॉडल के पीछे न छुपे */}
      <nav className="flex justify-between items-center w-full px-6 md:px-12 lg:px-20 xl:px-32 py-6 relative z-50">
        <Link to="/" className="text-2xl font-bold tracking-wider text-white z-50">
          <span className="text-cyan-400">CS</span> Dev Studio
        </Link>
        
        {/* Desktop Menu (सिर्फ लैपटॉप पर दिखेगा) */}
        <div className="hidden md:flex space-x-10 text-gray-300 font-medium items-center">
          <button onClick={(e) => handleScroll(e, 'home')} className="hover:text-cyan-400 transition-colors cursor-pointer">Home</button>
          <button onClick={(e) => handleScroll(e, 'services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Services</button>
          <button onClick={(e) => handleScroll(e, 'portfolio')} className="hover:text-cyan-400 transition-colors cursor-pointer">Portfolio</button>
          <button onClick={(e) => handleScroll(e, 'contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">Contact Us</button>
        </div>

        <button 
          onClick={handleAIAssistantClick} 
          className="hidden md:flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Let's Talk (AI)
        </button>

        {/* Hamburger Icon (यह सिर्फ फोन पर दिखेगा) */}
        <button 
          className="md:hidden text-gray-300 hover:text-cyan-400 z-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* अगर मेनू खुला है तो क्रॉस (X) दिखेगा, नहीं तो 3 लाइन दिखेंगी */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>

        {/* Mobile Menu Dropdown (फोन में खुलने वाला मेनू) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#070913]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-6 md:hidden shadow-2xl z-40">
            <button onClick={(e) => handleScroll(e, 'home')} className="text-left text-xl text-gray-300 hover:text-cyan-400 font-semibold transition-colors">Home</button>
            <button onClick={(e) => handleScroll(e, 'services')} className="text-left text-xl text-gray-300 hover:text-cyan-400 font-semibold transition-colors">Services</button>
            <button onClick={(e) => handleScroll(e, 'portfolio')} className="text-left text-xl text-gray-300 hover:text-cyan-400 font-semibold transition-colors">Portfolio</button>
            <button onClick={(e) => handleScroll(e, 'contact')} className="text-left text-xl text-gray-300 hover:text-cyan-400 font-semibold transition-colors">Contact Us</button>
            
            {/* Mobile के लिए AI वाला बटन */}
            <button 
              onClick={handleAIAssistantClick} 
              className="flex items-center justify-center gap-2 bg-cyan-500 text-slate-900 px-6 py-3.5 rounded-xl font-bold mt-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Let's Talk (AI)
            </button>
          </div>
        )}
      </nav>

      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}