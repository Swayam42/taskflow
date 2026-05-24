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
          "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
          isActive
            ? "bg-white text-neutral-950 shadow-line"
            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
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
    <div className="flex h-full flex-col bg-neutral-950 text-white">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <div className="min-w-0">
          <p className="text-xl font-semibold">TaskFlow</p>
          <p className="mt-1 text-xs text-neutral-400">Project command center</p>
        </div>
        <Button
          aria-label="Close sidebar"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
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
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-950">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Focus mode</p>
              <p className="mt-1 truncate text-xs text-neutral-400">
                Ship the next meaningful thing.
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-4 w-full border-white/10 bg-transparent text-white hover:bg-white/10"
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
            className="absolute inset-0 cursor-default bg-black/50"
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
