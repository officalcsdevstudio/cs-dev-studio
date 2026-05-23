import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AIChatbot from './AIChatbot'; 

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🚀 यह एक मास्टर फंक्शन है जो किसी भी सेक्शन पर स्क्रॉल करेगा
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // अगर किसी और पेज (जैसे View All) पर हैं, तो पहले Home पर जाओ, फिर स्क्रॉल करो
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    } else {
      // अगर होम पेज पर ही हैं, तो सीधा स्क्रॉल करो
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAIAssistantClick = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <nav className="flex justify-between items-center w-full px-6 md:px-12 lg:px-20 xl:px-32 py-6 relative z-10">
        <Link to="/" className="text-2xl font-bold tracking-wider text-white">
          <span className="text-cyan-400">CS</span> Dev Studio
        </Link>
        
        {/* Desktop Menu - यहाँ <Link> की जगह <button> कर दिया है ताकि पेज न बदले */}
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
      </nav>

      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}