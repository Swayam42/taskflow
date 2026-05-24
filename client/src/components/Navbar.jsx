import { Menu, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { initials } from "../utils/formatters.js";
import Button from "./Button.jsx";

export default function Navbar({ onMenuClick, title }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            aria-label="Open sidebar"
            className="lg:hidden"
            icon={Menu}
            onClick={onMenuClick}
            size="icon"
            variant="secondary"
          />
          <div className="min-w-0">
            <p className="text-sm text-neutral-500">Workspace</p>
            <h1 className="truncate text-xl font-semibold text-neutral-950 sm:text-2xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden h-11 w-72 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-500 md:flex">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Search workspace</span>
          </div>
          <div className="flex h-11 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-2.5 py-2 shadow-line">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-xs font-semibold text-white">
              {initials(user?.name)}
            </div>
            <div className="hidden min-w-0 pr-2 sm:block">
              <p className="truncate text-sm font-medium text-neutral-950">
                {user?.name || "TaskFlow User"}
              </p>
              <p className="truncate text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
