import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[90]"
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.2 }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-teal/[0.03] blur-[80px]" />
    </motion.div>
  );
}
