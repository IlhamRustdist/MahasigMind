// src/pages/Settings.jsx
import MobileLayout from "../components/layout/MobileLayout";

export default function Settings() {
  return (
    <MobileLayout>
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Pengaturan</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-sm">
          <button className="w-full text-left py-2 border-b border-slate-100">
            Ubah password
          </button>
          <button className="w-full text-left py-2 border-b border-slate-100">
            Notifikasi
          </button>
          <button className="w-full text-left py-2 text-red-500">
            Keluar
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
