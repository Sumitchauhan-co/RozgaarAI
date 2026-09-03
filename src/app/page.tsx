import AuthInitializer from "./components/auth/AuthInitialiser";
import Footer from "./components/Footer";
import LandingPage from "./components/home/LandingPage";
import Navbar from "./components/Navbar";

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#FCFBF9]">
      <AuthInitializer />
      <Navbar />
      <LandingPage />
      <Footer />
    </main>
  );
}
