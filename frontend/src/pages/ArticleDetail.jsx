import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const articles = [
    {
        id: 1,
        title: "Mengelola stres sebelum ujian",
        content: "Ujian seringkali menjadi sumber stres utama bagi mahasiswa. Namun, stres yang dikelola dengan baik justru bisa menjadi motivasi. Mulailah dengan membuat jadwal belajar yang realistis, jangan lupa istirahat, dan tetap terhidrasi. Teknik pernapasan dalam juga sangat membantu saat merasa cemas berlebih."
    },
    {
        id: 2,
        title: "Cara membangun kebiasaan journaling",
        content: "Journaling bukan hanya tentang menulis diary. Ini adalah cara untuk memproses emosi. Mulailah dengan 3 menit sehari. Tuliskan 3 hal yang kamu syukuri, atau satu hal yang mengganggumu. Konsistensi lebih penting daripada panjang tulisan."
    },
    {
        id: 3,
        title: "Kapan perlu ke psikolog?",
        content: "Jika perasaan sedih, cemas, atau lelah berlangsung lebih dari 2 minggu dan mengganggu aktivitas sehari-hari, itu tanda kamu mungkin butuh bantuan profesional. Jangan ragu untuk mencari bantuan. Psikolog ada untuk mendengarkan tanpa menghakimi."
    },
];

export default function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = articles.find(a => a.id === parseInt(id));

    if (!article) return <div>Artikel tidak ditemukan</div>;

    return (
        <AppShell>
            <div className="space-y-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Kembali</span>
                </button>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">{article.title}</h1>
                    <div className="h-48 bg-slate-200 rounded-2xl mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                    </div>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {article.content}
                    </p>
                </div>
            </div>
        </AppShell>
    );
}
