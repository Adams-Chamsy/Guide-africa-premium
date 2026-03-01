import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ end, prefix = '', suffix = '', duration = 2.5, decimals = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <span ref={ref} style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontWeight: 700 }}>
      {inView ? (
        <CountUp end={end} prefix={prefix} suffix={suffix} duration={duration} decimals={decimals} separator=" " />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
};

export default AnimatedCounter;
