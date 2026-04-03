import { Navbar } from "@/components/layout/Navbar"; // Assuming you have this
import { Footer } from "@/components/layout/Footer"; // Assuming you have this

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
      {/* 1. Navbar spans full width */}
      <Navbar />

      {/* 2. Main Layout Container */}
      {/* max-w-[1920px] ensures the site doesn't stretch infinitely on 4k screens */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto flex justify-center">

        {/* --- MAIN CONTENT CENTER --- */}
        {/* flex-1 allows it to take remaining space.*/}
        <main className="flex-1 w-full min-h-screen pt-10 md:pt-15">
          {children}
        </main>
      </div>

      {/* 3. Footer spans full width */}
      <Footer />
    </>
  );
}