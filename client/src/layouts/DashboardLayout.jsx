import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const getTitle = (pathname) => {
  if (pathname.startsWith("/projects/")) return "Project board";
  return "Dashboard";
};

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const title = useMemo(() => getTitle(location.pathname), [location.pathname]);

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="min-h-screen lg:pl-72">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} title={title} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
