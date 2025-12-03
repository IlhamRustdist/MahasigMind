import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg";

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 30); // 30ms * 50 steps = 1.5s approx

    // Redirect after animation
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo SVG */}
        <img
          src={logo}
          alt="MahasigMind"
          className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-2xl mb-6 animate-bounce-slow"
        />

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">MahasigMind</h1>
        <p className="text-white/80 text-sm md:text-base mb-12">Teman kesehatan mental mahasiswa</p>

        {/* Loading Bar */}
        <div className="w-64 md:w-80 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/60 mt-3 font-mono">{progress}%</p>
      </div>
    </div>
  );
}
