import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://mahasigmind.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        login(data.data.token, data.data.user);
        navigate("/home");
      } else {
        setError(data.error?.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-400 px-4">
      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="px-8 pt-8 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">MahasigMind</p>
              <p className="text-xs text-slate-500">Teman kesehatan mental untuk mahasiswa</p>
            </div>
          </div>
        </div>

        <div className="px-8 pt-6 pb-8 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">Masuk</h1>
            <p className="text-sm text-slate-500">Lanjutkan perjalanan kesehatan mentalmu.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@kampus.ac.id"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded-xl font-bold hover:bg-sky-400 transition shadow-lg shadow-sky-200 disabled:opacity-50"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Atau masuk dengan</span>
              </div>
            </div>

            <a
              href="http://localhost:5000/api/auth/google"
              className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 mt-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span>MahasigMind &copy; 2025</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
