import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const StickyCursor = ({ stickyElement }) => {
  const [isHovered, setIsHovered] = useState(false);
  const size = isHovered ? 60 : 20;
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef(null);
  const animationId = useRef(null);
 

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };
  const moveCircle = (x, y) => {
    gsap.to(circle.current, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      delay: 0.02,
    });
  };
  const animate = () => {
    if (isHovered) {
      const { left, top, width, height } =
        stickyElement.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const targetX = centerX + (mouse.current.x - centerX) * 0.1;
      const targetY = centerY + (mouse.current.y - centerY) * 0.1;

      moveCircle(targetX, targetY);
    } else {
      moveCircle(mouse.current.x, mouse.current.y);
    }
   animationId.current = window.requestAnimationFrame(animate);
  };
  const manageMouseOver = () => {
    setIsHovered(true);
  };
  const manageMouseLeave = () => {
    setIsHovered(false);
    
  };
  useEffect(() => {
    const element = stickyElement.current;
    if (!element) return;
    animate();

    window.addEventListener("mousemove", manageMouseMove);
    element.addEventListener("mouseover", manageMouseOver);
    element.addEventListener("mouseleave", manageMouseLeave);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      element.removeEventListener("mouseover", manageMouseOver);
      element.removeEventListener("mouseleave", manageMouseLeave);
      if (animationId.current) {

        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isHovered]);
  return (
    <div
      ref={circle}
      className="fixed bg-black rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        transition: "height 0.3s ease-out , width 0.3s ease-out",
      }}
    ></div>
  );
};

export default StickyCursor;
