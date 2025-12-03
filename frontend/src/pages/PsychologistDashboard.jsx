import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

export default function PsychologistDashboard() {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [consultations, setConsultations] = useState([]);
    const [moodSummary, setMoodSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'psychologist') {
            navigate('/home');
            return;
        }

        fetchData();
    }, [user, token, navigate]);

    const fetchData = async () => {
        try {
            const [consultsRes, moodRes] = await Promise.all([
                fetch('http://localhost:5000/api/psychologist/consultations', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/psychologist/mood-summary', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const consultsData = await consultsRes.json();
            const moodData = await moodRes.json();

            if (consultsData.success) setConsultations(consultsData.data);
            if (moodData.success) setMoodSummary(moodData.data);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/api/psychologist/consultations/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await res.json();
            if (data.success) {
                setConsultations(prev => prev.map(c => c._id === id ? data.data : c));
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    if (loading) {
        return (
            <AppShell>
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500">Memuat dashboard...</p>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard Psikolog</h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola permintaan konsultasi dan lihat ringkasan mood mahasiswa</p>
                </div>

                {/* Mood Summary Card */}
                {moodSummary && (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-100">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            Ringkasan Mood (7 Hari Terakhir)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-sky-600">{moodSummary.total}</p>
                                <p className="text-xs text-slate-500 mt-1">Total Entri</p>
                            </div>
                            {Object.entries(moodSummary.breakdown).map(([mood, count]) => (
                                <div key={mood} className="bg-white rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-slate-700">{count}</p>
                                    <p className="text-xs text-slate-500 mt-1">{mood}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Consultations List */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-xl">💬</span>
                        Daftar Permintaan Konsultasi
                    </h3>

                    {consultations.length === 0 ? (
                        <p className="text-center text-slate-400 py-8">Belum ada permintaan konsultasi.</p>
                    ) : (
                        <div className="space-y-3">
                            {consultations.map((consult) => (
                                <div key={consult._id} className="border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-slate-800">{consult.user?.name || 'Unknown'}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${consult.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                        consult.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                    }`}>
                                                    {consult.status === 'new' ? 'Baru' : consult.status === 'in_progress' ? 'Diproses' : 'Selesai'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500">{consult.user?.email}</p>
                                            <p className="text-sm text-slate-600 mt-2">
                                                <span className="font-medium">Kategori:</span> {consult.category} |
                                                <span className="font-medium"> Waktu:</span> {consult.preferredTime}
                                            </p>
                                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{consult.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {consult.status === 'new' && (
                                                <button
                                                    onClick={() => updateStatus(consult._id, 'in_progress')}
                                                    className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-xl hover:bg-yellow-400 transition"
                                                >
                                                    Proses
                                                </button>
                                            )}
                                            {consult.status === 'in_progress' && (
                                                <button
                                                    onClick={() => updateStatus(consult._id, 'completed')}
                                                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-400 transition"
                                                >
                                                    Selesai
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
