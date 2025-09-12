"use client";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { NavbarComponent } from "@/components/Navbar";
import Scanner from "@/components/Scanner";

export default function Home() {
      const handlePagesUploaded = (pages: any[]) => {
    console.log("Pages uploaded:", pages);
    // send to your backend if needed
  };

  return (

    <>    
    
    
        <NavbarComponent  />

        <div className="container mx-auto p-8 pt-30 text-left max-w-7xl">
       <Scanner onPagesUploaded={handlePagesUploaded} />
          <Hero/>
       
          <Features/>

        </div>


    </>


  )
}