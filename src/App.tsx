import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PricingPage } from './pages/PricingPage';
import { SearchPage } from './pages/SearchPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import AdminRoutes from './pages/admin';
import { Modal } from './components/ui/Modal';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import SocialLoginSuccess from './pages/SocialLoginSuccess';
import CompleteProfilePage from './pages/CompleteProfilePage';
import ProkeralaMatchPage from './pages/compatibility/ProkeralaMatchPage';
import ToastProvider from './components/ui/ToastProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastProvider />
      <Header
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenRegisterModal={() => setShowRegisterModal(true)}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenRegisterModal={() => setShowRegisterModal(true)} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/social-login-success" element={<SocialLoginSuccess />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/compatibility/prokerala" element={<ProkeralaMatchPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {isAdmin ? <AdminDashboard /> : <DashboardPage />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchPage onOpenRegisterModal={() => setShowRegisterModal(true)} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <MessagesPage onOpenRegisterModal={() => setShowRegisterModal(true)} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Only Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {/* Modals for global access */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Sign In">
        <LoginPage onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }} />
      </Modal>
      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Create Account">
        <RegisterPage onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }} />
      </Modal>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;