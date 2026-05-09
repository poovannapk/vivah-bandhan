import React from 'react';
import {
  BarChart3,
  BookOpenText,
  Camera,
  HelpCircle,
  LogOut,
  MessageSquareWarning,
  Users,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Overview', icon: BarChart3 },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/subscription-analytics', label: 'Subscriptions', icon: BarChart3 },
  { to: '/admin/flagged-messages', label: 'Flagged Messages', icon: MessageSquareWarning },
  { to: '/admin/flagged-photos', label: 'Flagged Photos', icon: Camera },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/blog', label: 'Blog', icon: BookOpenText },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="w-64 h-full bg-[#111827] text-white border-r border-white/10 p-5 fixed top-0 left-0 shadow-xl flex flex-col">
      <div>
        <div className="mb-8 flex items-center gap-3 rounded-lg bg-white/6 p-3">
          <img src="/logo192.png" alt="Logo" className="w-9 h-9 rounded-md bg-white" />
          <div>
            <span className="block font-bold text-lg leading-tight">Vivah Admin</span>
            <span className="text-xs text-white/60">Owner Console</span>
          </div>
        </div>
        <nav className="space-y-1.5">
          {links.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to || (link.to === '/admin' && location.pathname === '/admin/dashboard');

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-white text-slate-950 shadow-sm' : 'text-white/72 hover:bg-white/10 hover:text-white'}`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/10 pt-5">
        {user?.email && (
          <div className="mb-3 rounded-lg bg-white/6 px-3 py-3">
            <p className="text-xs uppercase tracking-wide text-white/50">Signed in as</p>
            <p className="truncate text-sm font-medium text-white">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:bg-red-500/15 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
