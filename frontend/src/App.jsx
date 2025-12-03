import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Chat from "./pages/Chat";
import Consultation from "./pages/Consultation";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import Mood from "./pages/Mood";
import AuthCallback from "./pages/AuthCallback";
import PsychologistDashboard from "./pages/PsychologistDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/mood" element={<Mood />} />
        {/* semua path lain jatuh ke sini */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
