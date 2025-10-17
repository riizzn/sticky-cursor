import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const StickyCursor = ({ stickyElement }) => {
  const [isHovered, setIsHovered] = useState(false);
  const size = isHovered ? 60 : 20;
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef(null);
  const animationId = useRef(null);
  const scale = useRef({ x: 1, y: 1 });

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };
  const moveCircle = (x, y,scaleX = 1, scaleY = 1) => {
    gsap.to(circle.current, {
      x,
      y,
      scaleX, // Add scaleX
      scaleY,
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
      const distX = (mouse.current.x - centerX);
      const distY = (mouse.current.y - centerY) ;
      const targetX = centerX + distX * 0.1;
      const targetY = centerY + distY* 0.1;
      const absDistance = Math.max(Math.abs(distX), Math.abs(distY));
      const newScaleX = gsap.utils.mapRange(0, width / 2, 1, 1.3, absDistance);
      const newScaleY = gsap.utils.mapRange(0, height / 2, 1, 0.8, absDistance);
      scale.current.x = newScaleX;
      scale.current.y = newScaleY;

      moveCircle(targetX, targetY,newScaleX, newScaleY);
    } else {
      moveCircle(mouse.current.x, mouse.current.y,1,1);
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
