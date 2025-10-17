"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/ui/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map posix={[4.79029, -75.69003]} />
      </div>
    </>
  );
}
