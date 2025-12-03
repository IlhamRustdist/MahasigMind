import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/layout/TopBar";
import BottomNav from "../components/layout/BottomNav";

import { useState } from "react";
import axios from "axios";

export default function Mood() {
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/mood",
        { mood },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Mood berhasil disimpan! 😊");
    } catch (e) {
      setMessage("Gagal menyimpan mood 😢");
    }
  };

  return (
    <MobileLayout>
      <TopBar title="Mood Tracker" />

      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <h2 className="text-2xl text-indigo-700 mb-6 font-semibold">
          Bagaimana perasaanmu hari ini?
        </h2>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700 w-full"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Pilih mood...</option>
          <option value="happy">😊 Bahagia</option>
          <option value="sad">😢 Sedih</option>
          <option value="stressed">😣 Stres</option>
          <option value="calm">😌 Tenang</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
        >
          Simpan Mood
        </button>

        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
