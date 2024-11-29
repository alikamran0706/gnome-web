import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export const InteractiveSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(sectionRef.current, {
        backgroundColor: '#00ffcc',
        duration: 0.5,
      });

      gsap.fromTo(
        sectionRef.current.querySelector('.text'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(sectionRef.current, {
        backgroundColor: '#000000',
        duration: 0.5,
      });
    };

    const sectionEl = sectionRef.current;
    sectionEl.addEventListener('mouseenter', handleMouseEnter);
    sectionEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      sectionEl.removeEventListener('mouseenter', handleMouseEnter);
      sectionEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-black text-white transition-colors"
    >
      <h1 className="text-4xl text">Amazing Effects</h1>
    </section>
  );
};
