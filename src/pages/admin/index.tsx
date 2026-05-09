import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import FlaggedMessages from './FlaggedMessages';
import FlaggedPhotos from './FlaggedPhotos';
import Users from './Users';
import SubscriptionAnalytics from './SubscriptionAnalytics';

const FAQManagement = () => <div className="p-6">FAQ Management (Coming Soon)</div>;
const BlogManagement = () => <div className="p-6">Blog Management (Coming Soon)</div>;

const protectedPage = (page: React.ReactNode) => (
  <ProtectedAdminRoute>
    <AdminLayout>
      {page}
    </AdminLayout>
  </ProtectedAdminRoute>
);

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path="login" element={<AdminLogin />} />
    <Route index element={protectedPage(<AdminDashboard />)} />
    <Route path="dashboard" element={protectedPage(<AdminDashboard />)} />
    <Route path="users" element={protectedPage(<Users />)} />
    <Route path="subscription-analytics" element={protectedPage(<SubscriptionAnalytics />)} />
    <Route path="flagged-messages" element={protectedPage(<FlaggedMessages />)} />
    <Route path="flagged-photos" element={protectedPage(<FlaggedPhotos />)} />
    <Route path="faq" element={protectedPage(<FAQManagement />)} />
    <Route path="blog" element={protectedPage(<BlogManagement />)} />
  </Routes>
);

export default AdminRoutes;
