import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "./Button.jsx";
import { cn } from "../utils/cn.js";

const links = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", to: "/dashboard#projects", icon: FolderKanban }
];

const NavItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition",
          isActive
            ? "bg-white/80 text-neutral-950 shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
            : "text-neutral-500 hover:bg-white/70 hover:text-neutral-950"
        )
      }
      onClick={onClick}
      to={item.to}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  );
};

export default function Sidebar({ isMobileOpen, onClose }) {
  const { logout } = useAuth();

  const content = (
    <div className="flex h-full flex-col border-r border-white/70 bg-gradient-to-b from-white/90 via-white/80 to-white/70 text-neutral-900 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="flex h-16 items-center justify-between border-b border-white/70 px-6">
        <div className="min-w-0">
          <p className="text-xl font-semibold">TaskFlow</p>
          <p className="mt-1 text-xs text-neutral-500">Project command center</p>
        </div>
        <Button
          aria-label="Close sidebar"
          className="text-neutral-600 hover:bg-white/70 hover:text-neutral-900 lg:hidden"
          icon={X}
          onClick={onClose}
          size="icon"
          variant="ghost"
        />
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {links.map((item) => (
          <NavItem item={item} key={item.label} onClick={onClose} />
        ))}
      </nav>

      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/80 text-neutral-950 shadow-sm">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900">Focus mode</p>
              <p className="mt-1 truncate text-xs text-neutral-500">
                Ship the next meaningful thing.
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-4 w-full"
          icon={LogOut}
          onClick={logout}
          variant="ghost"
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        {content}
      </aside>
      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close sidebar overlay"
            className="absolute inset-0 cursor-default bg-black/40"
            onClick={onClose}
          />
          <aside className="relative h-full w-[min(18rem,86vw)] shadow-soft animate-fade-in">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
