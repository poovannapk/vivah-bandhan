import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
