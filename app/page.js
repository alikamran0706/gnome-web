'use client';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Cursor from '@/components/CanvasWrapper';
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const sectionsRef = useRef([]);
    const collapseRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const sections = [
        {
            title: "Morpheus",
            description: "Creating immersive gaming experiences tailored for all platforms.",
            link: "https://github.com/GnomeLabsLLC/MorpheusUnitySDK"
        },
        {
            title: "Gnomeville",
            description:
                "Experts in developing mixed reality games and experiences for Apple Vision Pro, Meta, Pico, and other XR hardware.",
            link: "https://gnomeville.io"
        },
    ];

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
        const section = collapseRef.current[index];
        gsap.to(section.querySelector(".description"), {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = (index) => {
        setActiveIndex(null);
        const section = collapseRef.current[index];
        gsap.to(section.querySelector(".description"), {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    useEffect(() => {
        sectionsRef.current?.forEach((section, i) => {
            // Animate sections turning black and restoring color on scroll
            gsap.to(section, {
                backgroundColor: "black",
                color: "white",
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    onLeaveBack: () => {
                        gsap.to(section, { backgroundColor: "", color: "" });
                    },
                },
            });
        });
    }, []);

    const textRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window !== undefined) {
          const textSpans = textRef.current.querySelectorAll("span");
    
          const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
    
            textSpans.forEach((span) => {
              const spanRect = span.getBoundingClientRect();
              const spanCenterX = spanRect.left + spanRect.width / 2;
              const spanCenterY = spanRect.top + spanRect.height / 2;
    
              const distance = Math.sqrt(
                Math.pow(clientX - spanCenterX, 2) + Math.pow(clientY - spanCenterY, 2)
              );
    
              // Animate spans within a certain distance
              if (distance < 100) {
                gsap.to(span, {
                  scale: 1.5,
                  color: "#00f2ff",
                  textShadow: "0px 0px 10px rgba(0, 242, 255, 0.8)",
                  duration: 0.4,
                  ease: "power3.out",
                });
              } else {
                gsap.to(span, {
                  scale: 1,
                  color: "white",
                  textShadow: "none",
                  duration: 0.4,
                  ease: "power3.out",
                });
              }
            });
          };
    
          window.addEventListener("mousemove", handleMouseMove);
    
          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }
      }, []);
    

    return (
        <div className="font-sans relative">
            <Cursor />
            {/* Header Section */}
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                {/* Logo in the Top Left Corner */}
                <div className="flex justify-between">
                    <div className="absolute top-6 left-6">
                        <Image src="/logo.png" alt="Logo" width={82} height={82} />
                    </div>
                    {/* About Us Button */}
                    <Link
                            href="/about-us"
                            className="text-xl absolute top-6 right-6 cursor-pointer text-gray-300 font-bold py-2 px-6 bg-transparent hover:text-[#6ee7b7] hover:underline transition-all duration-300"
                        >
                            About Us
                        </Link>
                </div>
                {/* Main Content */}
                <div className="text-center">
                    <h1
                        className="text-6xl md:text-8xl font-extrabold mb-4 tracking-wide cursor-pointer"
                        ref={textRef}
                    >
                        {"GnomeVille".split("").map((char, index) => (
                            <span
                                key={index}
                                className="inline-block transition-all duration-300"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p className="text-lg md:text-2xl mb-8">
                        Exploring the Frontier of Fun
                    </p>
                    {/* <div className="mt-10">
                        <a href="#our-work" className="text-white text-lg uppercase tracking-widest hover:underline">
                            OUR WORK →
                        </a>
                    </div> */}
                </div>
            </div>

            {/* Section 1 */}
            <div
                ref={(el) => (sectionsRef.current[0] = el)}
                className=" bg-pink-500"
            >
                {/* Collapsible Section */}
                <div className="min-h-screen flex p-14">
                    <div className="w-full mx-auto space-y-4">
                        {sections.map((section, index) => (
                            <a
                                key={index}
                                href={section.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div
                                    key={index}
                                    ref={(el) => (collapseRef.current[index] = el)}
                                    className="border-t border-gray-300 overflow-hidden cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    <h2
                                        className={`text-7xl font-bold ${activeIndex === index ? "text-[#6ee7b7]" : "text-white"
                                            }`}
                                    >
                                        {section.title}
                                    </h2>
                                    <p
                                        className="description text-lg text-white mt-4"
                                        style={{
                                            height: 0,
                                            opacity: 0,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {section.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-black text-white py-12 flex items-start w-full flex-col  px-12">
                <div className="w-full mb-6 flex justify-between">
                    {/* Social Media Links */}
                    <div className="flex justify-center space-x-6 mb-4">
                        {/* Twitter Link */}
                        <a href="#" rel="noopener noreferrer">
                            <Image
                                src="/twitter.svg"
                                alt="Logo"
                                width={42}
                                height={42}
                                className="mx-auto"
                            />
                        </a>

                        {/* LinkedIn Link */}
                        <a href="#" rel="noopener noreferrer">
                            <Image
                                src="/linkedin.svg"
                                alt="Logo"
                                width={38}
                                height={38}
                                className="mx-auto"
                            />
                        </a>

                        {/* Medium Link */}
                        <a href="#" rel="noopener noreferrer">
                            <Image
                                src="/medium.svg"
                                alt="Logo"
                                width={38}
                                height={38}
                                className="mx-auto"
                            />
                        </a>
                    </div>

                  
                    <p className="text-sm text-gray-400">
                        Copyright &copy; {new Date().getFullYear()} Gnome Labs LLC. All rights reserved.
                    </p>
                </div>

                {/* Footer Text */}
                {/* <div className="text-end">
                    <p className="text-sm text-gray-400">
                        Copyright &copy; {new Date().getFullYear()} Gnome Labs LLC. All rights reserved.
                    </p>
                </div> */}
            </footer>
        </div>
    );
}
