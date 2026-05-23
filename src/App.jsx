import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllServices from './pages/AllServices';
import AllProjects from './pages/AllProjects';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const GlobalBackground = () => (
  <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40">
    <Canvas>
      <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
        <GlobalBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/portfolio" element={<AllProjects />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}