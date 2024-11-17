import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';

function App() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Background />
      <Navbar />
      <Hero />
      <Events />
    </main>
  );
}

export default App;