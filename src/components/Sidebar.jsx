import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="px-4 py-5">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Navigation
        </div>
        <nav className="space-y-1">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/teams" className={linkClass}>
            Teams Journey
          </NavLink>
          <NavLink to="/leaderboard" className={linkClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/probability" className={linkClass}>
            Win Probability
          </NavLink>
          <NavLink to="/notifications" className={linkClass}>
            Notifications
          </NavLink>
          <NavLink to="/controls" className={linkClass}>
            Problem Controls
          </NavLink>
          <NavLink to="/problems" className={linkClass}>
            Problems
          </NavLink>
          <NavLink to="/final-results" className={linkClass}>
            Final Results
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
