import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-white">Pulse'25</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Home</a>
            <a href="#events" className="text-gray-300 hover:text-purple-400 transition-colors">Events</a>
            <a href="#schedule" className="text-gray-300 hover:text-purple-400 transition-colors">Schedule</a>
            <a href="#sponsors" className="text-gray-300 hover:text-purple-400 transition-colors">Sponsors</a>
          </div>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105">
            Register Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
}