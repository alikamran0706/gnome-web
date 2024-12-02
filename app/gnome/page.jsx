'use client';
import Model from "@/components/View";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className=" items-center w-full justify-items-center 
      font-[family-name:var(--font-geist-sans)]">
            <main className=" w-full items-center bg-gradient-to-tr from-slate-900 to-gray-500 h-full">
                <div className="flex justify-between">
                    <Link href="/" className="cursor-pointer p-6 ml-6">
                        {/* Using the Image component correctly */}
                        <Image src="/logo.png" alt="Logo" width={82} height={82} />
                    </Link>

                    <Link
                        href="/about-us"
                        className="text-xl absolute top-6 right-6 cursor-pointer text-gray-300 font-bold py-2 px-6 bg-transparent hover:text-[#6ee7b7] hover:underline transition-all duration-300"
                    >
                        About Us
                    </Link>
                </div>
                <Model />
            </main>
        </div>
    );
}
