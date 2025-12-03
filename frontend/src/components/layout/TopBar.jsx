import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function TopBar({ onOpenDrawer }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Beranda', path: '/home' },
    { name: 'Chat Psikolog', path: '/chat' },
    { name: 'Jurnal', path: '/journal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 font-bold shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm leading-tight tracking-tight group-hover:text-sky-600 transition-colors">
                MahasigMind
              </span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Teman kesehatan mental mahasiswa
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${isActive(link.path)
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:block px-5 py-2 bg-sky-500 text-white text-xs font-bold rounded-full hover:bg-sky-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Masuk
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenDrawer}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition active:scale-95"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
