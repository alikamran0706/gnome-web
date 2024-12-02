'use client';
import Model from "@/components/View";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="w-full min-h-screen bg-gradient-to-tr from-slate-900 to-gray-500 flex flex-col">
        {/* Header */}
        <div className="flex justify-between">
          {/* Logo */}
          <Link href="/" className="cursor-pointer p-6 ml-6">
            <Image src="/logo.png" alt="Logo" width={82} height={82} />
          </Link>

          {/* About Us Button */}
          <Link
            href="/about-us"
            className="text-xl absolute top-6 right-6 cursor-pointer text-gray-300 font-bold py-2 px-6 bg-transparent hover:text-[#6ee7b7] hover:underline transition-all duration-300"
          >
            About Us
          </Link>
        </div>

        {/* 3D Model */}
        <div className="flex justify-center items-center grow">
          <Model />
        </div>
      </main>
    </div>
  );
}
