import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { NavbarComponent } from "@/components/Navbar";


export default function Home() {
  return (
    <>    
    
        <NavbarComponent  />

        <div className="container mx-auto p-8 pt-30 text-left max-w-7xl">

          <Hero/>
       
          <Features/>

        </div>


    </>


  )
}