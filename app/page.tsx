import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Menu } from "@/components/sections/menu";
import { Shelter } from "@/components/sections/shelter";
import { Visit } from "@/components/sections/visit";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Menu />
        <Shelter />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
