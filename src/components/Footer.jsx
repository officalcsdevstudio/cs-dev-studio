export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-12 relative z-10">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2026 CS Dev Studio. All rights reserved.</p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          Built with <span className="text-cyan-400">React</span> & <span className="text-purple-400">Three.js</span>
        </p>
      </div>
    </footer>
  );
}