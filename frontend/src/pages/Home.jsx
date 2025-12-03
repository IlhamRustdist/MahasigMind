import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

import { logClientEvent } from "../utils/logger";

const articles = [
  { id: 1, title: "Mengelola stres sebelum ujian", excerpt: "Tips praktis menenangkan pikiran menjelang hari H.", image: "bg-blue-100" },
  { id: 2, title: "Cara membangun kebiasaan journaling", excerpt: "Mulai dari 3 menit sehari untuk mengenali dirimu.", image: "bg-purple-100" },
  { id: 3, title: "Kapan perlu ke psikolog?", excerpt: "Kenali tanda-tandanya supaya tidak terlambat.", image: "bg-green-100" },
];

const moods = [
  { id: 1, emoji: "😍", label: "Sangat senang" },
  { id: 2, emoji: "😦", label: "Cemas" },
  { id: 3, emoji: "😐", label: "Biasa saja" },
  { id: 4, emoji: "😔", label: "Sedih" },
  { id: 5, emoji: "😴", label: "Lelah" },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);
  const [burst, setBurst] = useState(false);
  const [moodRecorded, setMoodRecorded] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Check if mood already recorded today
  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/moods/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.length > 0) {
            const lastMood = new Date(data.data[0].createdAt);
            const today = new Date();
            if (lastMood.toDateString() === today.toDateString()) {
              setMoodRecorded(true);
            }
          }
        })
        .catch(err => console.error(err));
    }
  }, [token]);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Reset burst animation with extended duration
  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(false), 800); // 800ms for full animation
    return () => clearTimeout(t);
  }, [burst]);

  const current = articles[index];

  const handleMoodClick = async (m) => {
    if (moodRecorded) return;

    setSelectedMood(m.id);
    setBurst(false);
    setTimeout(() => setBurst(true), 10);

    // Save to backend
    try {
      const res = await fetch('http://localhost:5000/api/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mood: m.label })
      });
      const data = await res.json();
      if (data.success) {
        setMoodRecorded(true);
        logClientEvent('MOOD_SAVED', {
          mood: m.label,
          timestamp: new Date().toISOString(),
          withBurst: true
        });
      }
    } catch (err) {
      console.error("Failed to save mood", err);
    }
  };

  const nextArticle = () => setIndex((prev) => (prev + 1) % articles.length);
  const prevArticle = () => setIndex((prev) => (prev - 1 + articles.length) % articles.length);

  return (
    <AppShell>
      <section className="space-y-8 animate-fade-in pb-10">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Selamat datang,</p>
              <h2 className="text-2xl font-bold text-slate-800 heading-dynamic">
                {user?.name || "Mahasiswa"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">{user?.email || "user@kampus.ac.id"}</p>
            </div>

            {/* Mood Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 w-full md:w-auto min-w-[300px]">
              <p className="text-xs text-slate-500 mb-3 font-medium text-center">
                {moodRecorded ? "Mood hari ini sudah tercatat!" : "Apa yang kamu rasakan hari ini?"}
              </p>
              <div className="flex justify-between items-center relative px-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMoodClick(m)}
                    disabled={moodRecorded}
                    className={`transition-all duration-300 p-2 rounded-full relative ${moodRecorded
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:shadow-sm hover:scale-110"
                      } ${selectedMood === m.id ? "scale-125 bg-white shadow-md" : ""}`}
                  >
                    <span className="text-2xl block filter drop-shadow-sm">{m.emoji}</span>
                  </button>
                ))}


                {/* Enhanced Emoji Burst Animation */}
                {burst && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const angle = (i / 20) * 360;
                      const distance = 80 + Math.random() * 40;
                      const tx = Math.cos((angle * Math.PI) / 180) * distance;
                      const ty = Math.sin((angle * Math.PI) / 180) * distance;
                      const rotation = Math.random() * 360;
                      const scale = 0.6 + Math.random() * 0.4;

                      return (
                        <span
                          key={i}
                          className="absolute text-2xl animate-emoji-burst"
                          style={{
                            '--tx': `${tx}px`,
                            '--ty': `${ty}px`,
                            '--r': `${rotation}deg`,
                            '--s': scale,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          {moods.find((m) => m.id === selectedMood)?.emoji}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/chat")}
            className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-100 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-sky-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-sky-600 transition-colors">Chat Psikolog</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Konsultasi privat dengan ahli
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/journal")}
            className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-100 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">Jurnal Harian</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Catat perasaanmu hari ini
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Article Carousel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-slate-800 text-lg">Artikel Pilihan</h3>
            <div className="flex gap-2">
              <button
                onClick={prevArticle}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={nextArticle}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group">
            <div className={`h-32 ${current.image} relative transition-colors duration-500`}>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              <div className="absolute bottom-3 left-5">
                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Edukasi
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-slate-800 mb-2 text-lg line-clamp-1">
                {current.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                {current.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/articles/${current.id}`)}
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Baca selengkapnya
                </button>

                <div className="flex gap-1.5">
                  {articles.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-sky-500" : "w-1.5 bg-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Further Section */}
        <div className="pt-8 pb-4 animate-fade-in-up delay-200">
          <div className="bg-sky-50/60 rounded-3xl p-8 border border-sky-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Eksplor MahasigMind</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Block 1: Feature Recommendation */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Belum coba Jurnal?</h4>
                <p className="text-sm text-slate-500 mb-4">
                  Menulis jurnal bisa membantumu mengurai benang kusut di pikiran. Coba tulis satu kalimat hari ini.
                </p>
                <button
                  onClick={() => navigate('/journal')}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700"
                >
                  Mulai Menulis &rarr;
                </button>
              </div>

              {/* Block 2: Popular Topics */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <span className="text-xl">🔥</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Topik Populer</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="cursor-pointer hover:text-orange-500 transition">• Stres sebelum ujian</li>
                  <li className="cursor-pointer hover:text-orange-500 transition">• Overthinking tugas akhir</li>
                  <li className="cursor-pointer hover:text-orange-500 transition">• Masalah relasi & keluarga</li>
                </ul>
              </div>

              {/* Block 3: Mission */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <span className="text-xl">🤝</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Tentang Kami</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  MahasigMind hadir sebagai teman bercerita yang aman dan suportif bagi mahasiswa. Kami percaya kesehatan mental sama pentingnya dengan IPK.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/chat')}
                className="inline-flex items-center justify-center px-6 py-3 bg-sky-500 text-white font-bold rounded-full hover:bg-sky-400 transition shadow-lg shadow-sky-200 transform hover:scale-105"
              >
                Ajukan Konsultasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
