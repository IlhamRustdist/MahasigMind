import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg"

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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-sky-500 rounded-3xl flex items-center justify-center shadow-lg shadow-sky-500/30 mb-6 animate-bounce-slow">
          {/* <span className="text-6xl font-bold text-white">M</span> */}
          <img
            src={logo}
            alt="MahasigMind"
            className="w-32 h-32 drop-shadow-lg"
          />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">MahasigMind</h1>
        <p className="text-slate-400 text-sm mb-12">Teman kesehatan mental mahasiswa</p>

        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 font-mono">{progress}%</p>
      </div>
    </div>
  );
}
