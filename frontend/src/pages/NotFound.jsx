import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 select-none relative">
          404
          <span className="absolute inset-0 text-sky-500/20 blur-sm animate-pulse">404</span>
        </h1>

        <div className="space-y-4 -mt-10">
          <h2 className="text-2xl font-bold text-white">Halaman Tidak Ditemukan</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Maaf, halaman yang kamu cari sepertinya tersesat atau sudah tidak ada.
          </p>

          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-8 py-3 bg-sky-500 text-white font-bold rounded-full hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
