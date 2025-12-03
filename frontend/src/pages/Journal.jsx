import { useState, useEffect } from "react";
import AppShell from "../components/layout/AppShell";
import { useAuth } from "../context/AuthContext";
import { PlusIcon, TrashIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const categories = ['Kuliah', 'Keluarga', 'Relasi', 'Keuangan', 'Lainnya'];

export default function Journal() {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { token } = useAuth();

    // Form State
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Lainnya");

    const fetchJournals = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/journals", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setJournals(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchJournals();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/journals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, category }),
            });
            const data = await res.json();
            if (data.success) {
                setShowForm(false);
                setTitle("");
                setContent("");
                setCategory("Lainnya");
                fetchJournals();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus jurnal ini?")) return;
        try {
            await fetch(`http://localhost:5000/api/journals/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchJournals();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AppShell>
            <div className="space-y-8 animate-fade-in pb-10">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 heading-dynamic">Jurnal Harian</h1>
                        <p className="text-sm text-slate-500 mt-1">Catat momen berhargamu hari ini.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${showForm
                                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                : "bg-sky-500 text-white hover:bg-sky-400 hover:shadow-md"
                            }`}
                    >
                        <PlusIcon className="w-5 h-5" />
                        {showForm ? "Batal" : "Tulis Jurnal"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-sky-50 border border-sky-100 space-y-5 animate-slide-down relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />

                        <div className="grid md:grid-cols-2 gap-5 relative z-10">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
                                    placeholder="Judul jurnal hari ini..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Kategori</label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
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
                        </div>

                        <div className="relative z-10">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Isi Jurnal</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition h-40 resize-none leading-relaxed"
                                placeholder="Bagaimana harimu?"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-sky-400 transition shadow-md shadow-sky-200 relative z-10"
                        >
                            Simpan Jurnal
                        </button>
                    </form>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    {loading ? (
                        <div className="col-span-full text-center py-12">
                            <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-slate-400 text-sm">Memuat jurnal...</p>
                        </div>
                    ) : journals.length === 0 ? (
                        <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <BookOpenIcon className="w-8 h-8" />
                            </div>
                            <p className="text-slate-500 font-medium">Belum ada jurnal</p>
                            <p className="text-slate-400 text-xs mt-1">Mulai tulis ceritamu hari ini!</p>
                        </div>
                    ) : (
                        journals.map((journal) => (
                            <div key={journal._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-100 transition group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="inline-block px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider">
                                        {journal.category}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(journal._id)}
                                        className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                <h3 className="font-bold text-slate-800 mb-2 text-lg">{journal.title}</h3>
                                <p className="text-sm text-slate-600 line-clamp-4 mb-4 leading-relaxed flex-1">
                                    {journal.content}
                                </p>

                                <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    {new Date(journal.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppShell>
    );
}
