import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'

const Loading = ({ setIsLoading }) => {
    const logoWrapperRef = useRef(null);
    const logoRef = useRef(null);
    const whiteImageRef = useRef(null);
    const outlineImageRef = useRef(null);
    const grayImageRef = useRef(null);

    useEffect(() => {
        // GSAP Timeline for sequential animations
        const timeline = gsap.timeline({ defaults: { ease: 'power1.inOut', duration: 1 } });

        // Animate white image
        timeline.fromTo(whiteImageRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

        // Animate outline image
        timeline.fromTo(outlineImageRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.5'); // Overlap with the white image

        // Animate gray image
        timeline.fromTo(grayImageRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.5');

        // Animate logo after everything else
        timeline.fromTo(logoRef.current, { opacity: 0, }, { opacity: 1, duration: 1.5 }, '-=0.5');

        // Final step: After all animations, hide the loading screen and show the page content
        timeline.call(() => setIsLoading(false), null, '+=1'); // Hide loading after animations

    }, []);
    return (
        <div
            ref={logoWrapperRef}
            className="fixed inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center z-50"
        >
            <div>
                <div className="relative mx-auto">
                    {/* Different versions of the logo */}
                    <Image
                        ref={whiteImageRef}
                        src="/logo-white.png" // Example white logo version
                        alt="White Logo"
                        width={82}
                        height={82}
                        className="absolute opacity-0"
                    />
                    <Image
                        ref={outlineImageRef}
                        src="/logo-outline.png" // Example outline logo version
                        alt="Outline Logo"
                        width={82}
                        height={82}
                        className="absolute opacity-0"
                    />
                    <Image
                        ref={grayImageRef}
                        src="/logo-gray.png" // Example gray logo version
                        alt="Gray Logo"
                        width={82}
                        height={82}
                        className="absolute opacity-0"
                    />
                    <Image
                        ref={logoRef}
                        src="/logo.png" // Final logo
                        alt="Final Logo"
                        width={82}
                        height={82}
                        className="absolute opacity-0"
                    />
                </div>
                <div className="text-white text-xl font-bold mt-4 w-20"></div>
            </div>
        </div>
    )
}

export default Loading