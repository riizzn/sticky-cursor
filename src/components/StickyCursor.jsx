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
    animationId.current = requestAnimationFrame(animate);

    moveCircle(mouse.current.x, mouse.current.y);
  };
  const manageMouseOver = (e) => {
    const { clientX, clientY } = e;

    setIsHovered(true);
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
    }
    const { left, top, width, height } =
      stickyElement.current.getBoundingClientRect();
    const di = {
      x: clientX - (left + width / 2),
      y: clientY - (top + height / 2),
    };
    moveCircle(((left + width / 2)+di.x*0.01), (top + height / 2)+di.y*0.01);
  };
  const manageMouseLeave = () => {
    setIsHovered(false);
    animate();
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
  }, []);
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
