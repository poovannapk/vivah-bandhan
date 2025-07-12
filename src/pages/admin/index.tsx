import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminDashboard from './AdminDashboard';
import FlaggedMessages from './FlaggedMessages';
import FlaggedPhotos from './FlaggedPhotos';
import Users from './Users';
import SubscriptionAnalytics from './SubscriptionAnalytics';

// Placeholder components for FAQ and Blog
const FAQManagement = () => <div className="p-6">FAQ Management (Coming Soon)</div>;
const BlogManagement = () => <div className="p-6">Blog Management (Coming Soon)</div>;

const AdminRoutes: React.FC = () => (
  <ProtectedAdminRoute>
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="subscription-analytics" element={<SubscriptionAnalytics />} />
        <Route path="flagged-messages" element={<FlaggedMessages />} />
        <Route path="flagged-photos" element={<FlaggedPhotos />} />
        <Route path="faq" element={<FAQManagement />} />
        <Route path="blog" element={<BlogManagement />} />
        {/* Add more admin routes as needed */}
      </Routes>
    </AdminLayout>
  </ProtectedAdminRoute>
);

export default AdminRoutes;
