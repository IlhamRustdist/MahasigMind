import { useState, useEffect } from "react";
import AppShell from "../components/layout/AppShell";
import { useAuth } from "../context/AuthContext";
import { ClockIcon, CalendarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const categories = ['Akademik', 'Relasi', 'Finansial', 'Pribadi', 'Lainnya'];
const times = ['Pagi (08:00 - 12:00)', 'Siang (13:00 - 16:00)', 'Sore (16:00 - 18:00)'];

export default function Consultation() {
    const [requests, setRequests] = useState([]);
    const [category, setCategory] = useState("Akademik");
    const [preferredTime, setPreferredTime] = useState(times[0]);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const fetchRequests = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/consultations", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setRequests(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (token) fetchRequests();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/consultations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ category, preferredTime, description }),
            });
            const data = await res.json();
            if (data.success) {
                setDescription("");
                fetchRequests();
                alert("Permintaan konsultasi berhasil dikirim!");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppShell>
            <div className="space-y-8 animate-fade-in pb-10">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Konsultasi Psikolog</h1>
                        <p className="text-indigo-100 text-sm max-w-md leading-relaxed">
                            Jadwalkan sesi konseling dengan psikolog profesional kami. Ceritakan masalahmu, kami siap mendengarkan.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl" />
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6" />
                            </div>
                            <h2 className="font-bold text-slate-800 text-lg">Buat Janji Temu</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Topik Masalah</label>
                                    <div className="relative">
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Waktu Preferensi</label>
                                    <div className="relative">
                                        <select
                                            value={preferredTime}
                                            onChange={(e) => setPreferredTime(e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                                        >
                                            {times.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ClockIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Keluhan Singkat</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition h-32 resize-none leading-relaxed"
                                    placeholder="Ceritakan sedikit tentang apa yang kamu rasakan..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-indigo-500 transition shadow-md shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
                            >
                                {loading ? "Mengirim..." : "Kirim Permintaan"}
                            </button>
                        </form>
                    </div>

                    {/* History */}
                    <div className="lg:col-span-5 space-y-5">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold text-slate-800">Riwayat Permintaan</h2>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {requests.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm">Belum ada permintaan konsultasi.</p>
                                </div>
                            ) : (
                                requests.map((req) => (
                                    <div key={req._id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                                                {req.category}
                                            </span>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${req.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    req.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">{req.description}</p>
                                        <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <ClockIcon className="w-3 h-3" />
                                                <span>{req.preferredTime}</span>
                                            </div>
                                            <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
