import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
// import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Guarantee } from "@/components/sections/Guarantee";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Trust } from "@/components/sections/Trust";
import { Faq } from "@/components/sections/Faq";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* <Work /> */}
        <Services />
        <Guarantee />
        <Process />
        <About />
        <Team />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
