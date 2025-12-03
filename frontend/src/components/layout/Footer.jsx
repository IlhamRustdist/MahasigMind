import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.svg";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center overflow-hidden">
                                <img src={logo} alt="MahasigMind" className="h-6 w-6 object-contain brightness-0 invert" />
                            </div>
                            <span className="text-lg font-bold text-white">MahasigMind</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Teman kesehatan mental mahasiswa. Membantu kamu mengelola stres, mencatat perasaan, dan terhubung dengan bantuan profesional.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Navigasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/home" className="hover:text-sky-400 transition">Beranda</Link></li>
                            <li><Link to="/chat" className="hover:text-sky-400 transition">Chat Psikolog</Link></li>
                            <li><Link to="/journal" className="hover:text-sky-400 transition">Jurnal Harian</Link></li>
                            <li><Link to="/home" className="hover:text-sky-400 transition">Artikel Edukasi</Link></li>
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Bantuan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="cursor-not-allowed text-slate-500">Tentang MahasigMind</span></li>
                            <li><span className="cursor-not-allowed text-slate-500">FAQ</span></li>
                            <li><span className="cursor-not-allowed text-slate-500">Dukungan Kampus</span></li>
                            <li><span className="cursor-not-allowed text-slate-500">Kebijakan Privasi</span></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:support@mahasigmind.id" className="hover:text-sky-400 transition">support@mahasigmind.id</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🏫</span>
                                <span>Gedung Layanan Mahasiswa Lt. 2</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {currentYear} MahasigMind. Untuk keperluan edukasi dan tugas besar.</p>
                    <p>Dibuat dengan ❤️ untuk kesehatan mentalmu.</p>
                </div>
            </div>
        </footer>
    );
}
