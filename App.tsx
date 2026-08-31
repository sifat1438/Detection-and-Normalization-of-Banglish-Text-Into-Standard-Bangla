import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Converter from "./pages/Converter";
import HowItWorks from "./pages/HowItWorks";
import Research from "./pages/Research";
import Performance from "./pages/Performance";
import ErrorAnalysis from "./pages/ErrorAnalysis";
import Demo from "./pages/Demo";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/research" element={<Research />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/error-analysis" element={<ErrorAnalysis />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
