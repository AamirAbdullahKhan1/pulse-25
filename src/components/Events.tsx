import { motion } from 'framer-motion';
import { Trophy, Users, Gamepad, Code, MonitorPlay, Cpu } from 'lucide-react';

const events = [
  {
    title: "Gaming Tournament",
    description: "Compete in various gaming competitions and win exciting prizes",
    icon: Trophy,
    color: "from-purple-400 to-pink-600"
  },
  {
    title: "Game Development Workshop",
    description: "Learn game development from industry experts",
    icon: Code,
    color: "from-blue-400 to-purple-600"
  },
  {
    title: "VR Experience Zone",
    description: "Experience the latest in Virtual Reality gaming",
    icon: MonitorPlay,
    color: "from-green-400 to-blue-600"
  },
  {
    title: "eSports Championship",
    description: "Participate in professional eSports tournaments",
    icon: Gamepad,
    color: "from-yellow-400 to-orange-600"
  },
  {
    title: "Tech Talks",
    description: "Insights from gaming industry professionals",
    icon: Cpu,
    color: "from-red-400 to-pink-600"
  },
  {
    title: "Networking Session",
    description: "Connect with fellow gaming enthusiasts",
    icon: Users,
    color: "from-indigo-400 to-purple-600"
  }
];

export default function Events() {
  return (
    <section id="events" className="py-20 px-4 bg-black/40">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Featured Events
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center mb-4`}>
                <event.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-gray-400">{event.description}</p>
              <button className="mt-4 text-purple-400 hover:text-purple-300 font-medium">
                Learn more →
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}