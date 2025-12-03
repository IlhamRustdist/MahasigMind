// src/components/layout/AppShell.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO.svg";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/home", label: "Beranda", roles: ['student', 'psychologist'] },
  { path: "/chat", label: "Chat Psikolog", roles: ['student'] },
  { path: "/journal", label: "Jurnal", roles: ['student'] },
  { path: "/psychologist", label: "Dashboard Psikolog", roles: ['psychologist'] },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const visibleNavItems = navItems.filter(item =>
    !item.roles || item.roles.includes(user?.role || 'student')
  );

  const navLink = (active) =>
    `text-xs sm:text-sm px-3 py-1 rounded-full ${active ? "bg-sky-100 text-sky-700 font-semibold" : "text-slate-600"
    } hover:bg-sky-50 hover:text-sky-700 transition`;

  return (
    <div className="min-h-screen bg-sky-300 flex flex-col">
      {/* HEADER GLOBAL - STICKY */}
      <header className="sticky top-0 z-30 bg-white/95 shadow-sm">
        <div className="mx-auto w-full max-w-6xl flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          {/* kiri: logo + nama */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="MahasigMind" className="h-6 w-6 object-contain brightness-0 invert" />
            </div>
            <span className="text-lg font-semibold text-sky-700">
              MahasigMind
            </span>
          </Link>

          {/* nav desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={navLink(location.pathname === item.path)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* kanan: button + menu mobile */}
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block">
              <button className="px-4 py-1.5 rounded-full bg-sky-500 text-white text-xs sm:text-sm font-semibold hover:bg-sky-400">
                Masuk
              </button>
            </Link>
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setOpen(true)}
            >
              <span className="w-5 h-[2px] bg-slate-700" />
              <span className="w-5 h-[2px] bg-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER MOBILE: SELALU ADA, DI-CONTROL DENGAN TRANSITION */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* overlay */}
        <div
          className="flex-1 bg-black/40"
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <div
          className={`w-72 max-w-[80%] bg-white h-full shadow-xl flex flex-col transform transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <img src={logo} alt="MahasigMind" className="h-7 w-7" />
              <span className="text-base font-semibold text-sky-700">
                MahasigMind
              </span>
            </div>
            <button
              className="text-xl text-slate-500"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm">
            {visibleNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  setOpen(false);
                  if (location.pathname !== item.path) {
                    navigate(item.path);
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-lg ${location.pathname === item.path
                  ? "bg-sky-100 text-sky-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* BODY */}
      <main className="flex-1 flex flex-col">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
          <div className="bg-sky-200 rounded-3xl shadow-xl overflow-hidden min-h-[80vh]">
            <div className="pt-4 pb-16 px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
