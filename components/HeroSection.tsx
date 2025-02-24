"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
  id: string; // Unique ID for each particle
}

const HeroSection = () => {
  const [particles, setParticles] = useState<Position[]>([]);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Initialize autonomous particles
  useEffect(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Create initial particles in random positions
    const initialParticles: Position[] = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      id: `auto-${i}-${Date.now()}`
    }));
    
    setParticles(initialParticles);
    
    // Autonomous movement animation
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => {
          // Only animate autonomous particles when user is not interacting
          if (!isUserInteracting || !particle.id.includes('user')) {
            return {
              ...particle,
              x: particle.x + (Math.sin(Date.now() * 0.001 + parseInt(particle.id.split('-')[1])) * 2),
              y: particle.y + (Math.cos(Date.now() * 0.0015 + parseInt(particle.id.split('-')[1])) * 2)
            };
          }
          return particle;
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateParticles);
    
    // Clean up animation frame on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isUserInteracting]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      // Keep particles within bounds after resize
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: Math.min(particle.x, containerWidth),
          y: Math.min(particle.y, containerHeight)
        }))
      );
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle user interaction
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsUserInteracting(true);
    
    // Clear previous timeout if exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a timeout to mark the end of user interaction
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 1000);
    
    const { clientX, clientY } = e;
    
    // Add new user-controlled particle
    const newParticle = {
      x: clientX,
      y: clientY,
      id: `user-${Date.now()}`
    };
    
    setParticles(prev => {
      const filtered = prev.filter(p => !p.id.includes('user') || p.id === `user-${Date.now() - 300}`);
      return [...filtered, newParticle].slice(-20); // Keep maximum of 20 particles
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsUserInteracting(false)}
    >
      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {particles.map((particle) => {
            const isUserParticle = particle.id.includes('user');
            const baseSize = isUserParticle ? 40 : 25;
            
            return (
              <motion.div
                key={particle.id}
                initial={{ 
                  opacity: isUserParticle ? 0.2 : 0.6, 
                  scale: isUserParticle ? 0.8 : 1 
                }}
                animate={{ 
                  opacity: isUserParticle ? 0.8 : 0.6,
                  scale: isUserParticle ? 1 : [1, 1.1, 1],
                  x: particle.x - baseSize / 2,
                  y: particle.y - baseSize / 2,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 120,
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                className={`absolute rounded-full blur-sm ${
                  isUserParticle 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                    : "bg-gradient-to-r from-blue-300 to-indigo-400"
                }`}
                style={{
                  width: `${baseSize}px`,
                  height: `${baseSize}px`,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut" 
            }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ letterSpacing: "-0.05em" }}
              animate={{ letterSpacing: "0em" }}
              transition={{ duration: 1 }}
            >
              Hi, I&apos;m{" "}
              <motion.span 
                className="text-blue-600 dark:text-blue-400 inline-block"
                animate={{ 
                  rotate: [0, 1, -1, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1]
                }}
              >
                Your Name
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Full Stack Developer | UI/UX Enthusiast | Open Source Contributor
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                View My Work
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;