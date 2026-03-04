import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.6, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction] || variants.up}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  direction: PropTypes.string,
};

export default ScrollReveal;
