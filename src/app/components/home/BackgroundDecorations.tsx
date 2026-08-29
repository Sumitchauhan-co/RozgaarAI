"use client";

import Image from "next/image";

export default function BackgroundDecorations() {
  return (
    <>
      <Image
        src="/images/herobg.png"
        alt=""
        width={1800}
        height={1000}
        priority
        className="pointer-events-none absolute top-48 left-1/2 w-[150%] -translate-x-1/2 opacity-40 select-none lg:top-0 lg:w-full lg:opacity-60"
      />
      <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-[#F6C98F] opacity-25 blur-[80px] lg:h-[600px] lg:w-[600px] lg:opacity-35 lg:blur-[140px]" />
      <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F2D9C4] opacity-25 blur-[80px] lg:h-[500px] lg:w-[500px] lg:opacity-35 lg:blur-[120px]" />

      <Image
        src="/images/leaf.png"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute top-0 right-0 opacity-10 select-none lg:w-[260px] lg:opacity-20"
      />
      <Image
        src="/images/leaf.png"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute -top-10 -right-10 opacity-5 select-none lg:-top-20 lg:-right-20 lg:w-[420px] lg:opacity-10"
      />
    </>
  );
}
