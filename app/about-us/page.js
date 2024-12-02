'use client';

// import Cursor from '@/components/CanvasWrapper';
import '../globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const AboutUs = () => {
  const textRef = useRef(null);
  const headerRef = useRef(null);  // Reference for the h1 element

  useEffect(() => {
    // GSAP timeline for multiple animations
    const timeline = gsap.timeline({ defaults: { ease: 'power1.out', duration: 1 } });

    // First, animate the "About Us" header with a slide-up and fade-in effect
    timeline.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },  // Start below the screen and invisible
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' } // Fade in and slide up
    );

    // GSAP animation with the TextPlugin to create typing effect on paragraph text
    if (textRef.current) {
      timeline.fromTo(
        textRef.current,
        {
          text: '', // Start with an empty string
        },
        {
          text: "Gnome Labs is a global team of crypto-native game developers, artists, software engineers, and AI researchers, who are driven by a passion for the latest in gaming, AI, and blockchain innovation. With a spirit of play and curiosity, we bring emerging technology to life, crafting products and experiences that spark joy for people of all ages. Our mission? To redefine what's possible in gaming by weaving generative AI and smart agents into immersive, interactive worlds. At Gnome Labs, we're on a quest to make cutting-edge tech irresistibly fun.",
          duration: 5, // Duration of the typing animation
          ease: "power1.out", // Smooth easing effect
          delay: 0.5, // Optional delay before starting the animation
        }
      );
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Glowing light border */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1848&q=80')",
          clipPath: "url(#welcome-section-clippath)"
        }}
      ></div>
      <div className="yellow-light absolute top-0 left-0 w-full h-full border-4 border-transparent bg-gradient-to-r from-blue-800 to-slate-900 animate-glowing"></div>

      {/* <Cursor /> */}

      {/* Page Content */}
      <div className="relative z-10 text-white h-full px-12 py-6">
        <Link href="/" className="cursor-pointer">
          {/* Using the Image component correctly */}
          <Image src="/logo.png" alt="Logo" width={82} height={82} />
        </Link>
        <h1 ref={headerRef} className="text-5xl font-bold mt-14">About Us</h1>
        <div className="flex flex-col items-center justify-center h-1/2">
          <p
            ref={textRef}
            className="text-xl w-full pt-12 md:pt-0 md:w-1/2 font-poppins tracking-widest"
          >
            {/* Empty text initially, GSAP will animate the typing effect */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
