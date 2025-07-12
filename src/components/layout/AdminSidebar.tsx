import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
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
  return (
    <aside className="w-64 h-full bg-gradient-to-b from-blue-700 to-blue-500 text-white border-r p-6 fixed top-0 left-0 shadow-lg">
      <div className="mb-8 flex items-center gap-2">
        <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
        <span className="font-bold text-lg">Vivah Admin</span>
      </div>
      <nav className="space-y-4">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-3 py-2 rounded transition-colors ${location.pathname === link.to ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-800'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
