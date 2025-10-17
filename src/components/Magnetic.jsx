import React, { useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
  const ref = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    gsap.to(ref.current, {
      x: middleX * 0.1,
      y: middleY * 0.1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const reset = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="relative"
    >
      {children}
    </div>
  );
};

export default Magnetic;