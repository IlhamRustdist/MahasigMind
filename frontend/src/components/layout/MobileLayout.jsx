import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

export default function MobileLayout({ children, showTopBar = true }) {
  return (
    <div className="min-h-screen bg-sky-300 flex items-center justify-center">
      <div className="bg-sky-200 w-full h-screen max-w-[430px] md:h-[900px] md:rounded-3xl shadow-lg overflow-hidden relative">
        {showTopBar && <TopBar />}
        <main className="h-full pt-10 pb-16 px-4 overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
