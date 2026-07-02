import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Navbar from "./components/layout/Navbar";

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
