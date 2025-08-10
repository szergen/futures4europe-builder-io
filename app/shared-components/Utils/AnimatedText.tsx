// components/AnimatedText.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedText: React.FC = () => {
  const text =
    'Futures4Europe is the online home of the European foresight community!';
  const colors = ['#ff8787', '#3bc9db', '#ffd43b'];

  const [words, setWords] = useState(text.split(' '));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItem = {
    hidden: {
      opacity: 0,
      y: -10,
      rotate: -4,
    },
    show: (color: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      color: [colors[color], '#343a40'],
      transition: {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const resetAnimation = () => {
    setWords([]);
  };

  useEffect(() => {
    if (!words.length) {
      const timer = setTimeout(() => {
        // Add a slight delay for the animation
        setWords(text.split(' '));
      }, 100);
      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [words]);

  return (
    <div style={{ display: 'inline-block', maxWidth: '100%' }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={words.length ? 'show' : 'hidden'}
        style={{
          lineHeight: '.8',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="word"
            variants={listItem}
            custom={Math.floor(Math.random() * colors.length)}
            style={{ marginRight: '0.25rem' }} // Add marginRight to each word
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedText;
