import React from 'react';
import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Owner Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/subscription-analytics', label: 'Subscription Analytics' },
  { to: '/admin/flagged-messages', label: 'Flagged Messages' },
  { to: '/admin/flagged-photos', label: 'Flagged Photos' },
  { to: '/admin/faq', label: 'FAQ Management' },
  { to: '/admin/blog', label: 'Blog Management' },
  // Add more admin links as needed
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
    <aside className="w-64 h-full bg-gradient-to-b from-blue-700 to-blue-500 text-white border-r p-6 fixed top-0 left-0 shadow-lg flex flex-col">
      <div>
        <div className="mb-8 flex items-center gap-2">
          <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg">Vivah Admin</span>
        </div>
        <nav className="space-y-4">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded transition-colors ${location.pathname === link.to || (link.to === '/admin' && location.pathname === '/admin/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-white/90 hover:text-blue-900'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/20 pt-5">
        {user?.email && (
          <div className="mb-3 px-3">
            <p className="text-xs uppercase tracking-wide text-white/70">Signed in as</p>
            <p className="truncate text-sm font-medium text-white">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-white/90 transition-colors hover:bg-white/15 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
