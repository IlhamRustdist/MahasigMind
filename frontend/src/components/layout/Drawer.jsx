import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon, HomeIcon, ChatBubbleLeftRightIcon, BookOpenIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Drawer({ isOpen, onClose }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Beranda', path: '/home', icon: HomeIcon },
        { name: 'Chat Psikolog', path: '/chat', icon: ChatBubbleLeftRightIcon },
        { name: 'Jurnal', path: '/journal', icon: BookOpenIcon },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold">
                                M
                            </div>
                            <span className="font-bold text-slate-800">MahasigMind</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Utama</p>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                        ? 'bg-sky-50 text-sky-600 shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-5 border-t border-slate-50 bg-slate-50/50">
                        <Link
                            to="/login"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            Masuk Akun
                        </Link>
                        <p className="text-center text-[10px] text-slate-400 mt-4">
                            &copy; 2025 MahasigMind
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
