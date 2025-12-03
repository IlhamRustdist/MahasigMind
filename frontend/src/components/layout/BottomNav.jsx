import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const linkBase = "flex flex-col items-center justify-center gap-1 text-[10px]";
const iconBase = "w-5 h-5";

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur border-t flex">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${linkBase} flex-1 ${
            isActive ? "text-sky-500" : "text-slate-500"
          }`
        }
      >
        <HomeIcon className={iconBase} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `${linkBase} flex-1 ${
            isActive ? "text-sky-500" : "text-slate-500"
          }`
        }
      >
        <ChatBubbleLeftRightIcon className={iconBase} />
        <span>Chat</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `${linkBase} flex-1 ${
            isActive ? "text-sky-500" : "text-slate-500"
          }`
        }
      >
        <Cog6ToothIcon className={iconBase} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}
