import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hi there! I am the CS Dev Studio AI Assistant. How can I help you build your digital reality today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    
    // User ka message UI par dikhayein
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // AI Processing Start
    setTimeout(async () => {
      let responseText = "";
      const msgLower = userMessage.toLowerCase();

      // 1. Smart Local Logic (Super Enhanced Keywords)
      if (msgLower.includes("price") || msgLower.includes("cost") || msgLower.includes("charge") || msgLower.includes("budget") || msgLower.includes("quote")) {
          responseText = "For accurate pricing and project estimates, please use the 'Contact Us' form below to discuss your requirements with our human team!";
      } 
      else if (msgLower.includes("service") || msgLower.includes("what do you do") || msgLower.includes("skills")) {
          responseText = "We specialize in Native Android Apps (Kotlin/Java), Cross-Platform Apps (Flutter), React.js Web Experiences, 3D Web (Three.js), and Firebase backends.";
      } 
      else if (msgLower.includes("ecommerce") || msgLower.includes("e-commerce") || msgLower.includes("business") || msgLower.includes("platform") || msgLower.includes("project") || msgLower.includes("build") || msgLower.includes("built") || msgLower.includes("develop") || msgLower.includes("create")) {
          responseText = "Yes, absolutely! We can build a scalable and custom solution for your business. Let's discuss your exact project details via the Contact form below.";
      }
      else if (msgLower.includes("react") || msgLower.includes("android") || msgLower.includes("flutter") || msgLower.includes("web") || msgLower.includes("app") || msgLower.includes("tech")) {
          responseText = "Yes, we are experts in that technology! We use modern tech stacks to build high-performance digital realities.";
      }
      // YAHAN FIX KIYA HAI: "mail", "official", "message" add kar diya
      else if (msgLower.includes("contact") || msgLower.includes("hire") || msgLower.includes("email") || msgLower.includes("mail") || msgLower.includes("phone") || msgLower.includes("official") || msgLower.includes("message")) {
          responseText = "You can reach out to us at our official email or by filling out the 'Contact Us' form in the section below. We would love to work with you!";
      } 
      else {
          // 2. Wikipedia CORS-Free API Fallback
          try {
            const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(userMessage)}&utf8=&format=json&origin=*`);
            const data = await res.json();
            
            if (data.query.search.length > 0) {
                // YAHAN FIX KIYA HAI: &quot; ko hatane ka code lagaya hai
                let snippet = data.query.search[0].snippet.replace(/(<([^>]+)>)/gi, "");
                snippet = snippet.replace(/&quot;/g, '"'); 
                
                responseText = `Here is some quick info: "${snippet}..." If you need development services related to this, CS Dev Studio is here for you!`;
            } else {
                responseText = "That sounds interesting! At CS Dev Studio, we focus on building digital realities. How can we help you with Web, App, or 3D development today?";
            }
          } catch (err) {
            console.error("Wikipedia Fallback Error:", err);
            responseText = "I'm your CS Dev Studio assistant! Ask me about our tech stack, services, or how to contact us.";
          }
      }

      // AI ka jawab screen par dikhayein
      setMessages(prev => [...prev, { text: responseText, isBot: true }]);
      setIsTyping(false);
      
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 w-80 md:w-96 bg-slate-900 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(6,182,212,0.2)] z-50 overflow-hidden flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-full text-cyan-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-white font-bold tracking-wide">CS Assistant</h3>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.isBot 
                    ? 'bg-slate-800 text-gray-200 rounded-tl-sm border border-white/5' 
                    : 'bg-cyan-500 text-slate-900 rounded-tr-sm font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-gray-400 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950 border-t border-white/5">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-500 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-gray-400 text-slate-900 p-2.5 rounded-xl transition-colors flex justify-center items-center"
              >
                <svg className="w-5 h-5 translate-x-px -translate-y-px" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}