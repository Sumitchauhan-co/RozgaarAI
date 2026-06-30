import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <Navbar />
      <Hero />
      <Categories />
      <Footer />
    </main>
  );
}
