import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Modal } from './components/ui/Modal';
import ToastProvider from './components/ui/ToastProvider';

const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage').then(module => ({ default: module.RegisterPage })));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const PricingPage = React.lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const SearchPage = React.lazy(() => import('./pages/SearchPage').then(module => ({ default: module.SearchPage })));
const MatchesPage = React.lazy(() => import('./pages/MatchesPage').then(module => ({ default: module.MatchesPage })));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage').then(module => ({ default: module.MessagesPage })));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const SuccessStoriesPage = React.lazy(() => import('./pages/SuccessStoriesPage').then(module => ({ default: module.SuccessStoriesPage })));
const AdminRoutes = React.lazy(() => import('./pages/admin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'));
const SocialLoginSuccess = React.lazy(() => import('./pages/SocialLoginSuccess'));
const CompleteProfilePage = React.lazy(() => import('./pages/CompleteProfilePage'));
const ProkeralaMatchPage = React.lazy(() => import('./pages/compatibility/ProkeralaMatchPage'));

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
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const isAdminArea = location.pathname.startsWith('/admin') || location.pathname.startsWith('/amin');

  const routeFallback = (
    <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <ToastProvider />
      {!isAdminArea && (
        <Header
          onOpenLoginModal={() => setShowLoginModal(true)}
          onOpenRegisterModal={() => setShowRegisterModal(true)}
        />
      )}
      <main className="flex-1">
        <Suspense fallback={routeFallback}>
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
              path="/matches" 
              element={
                <ProtectedRoute>
                  <MatchesPage />
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
            <Route path="/amin/*" element={<Navigate to="/admin" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminArea && <Footer />}
      {/* Modals for global access */}
      {!isAdminArea && <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Sign In" size="xl">
        <Suspense fallback={routeFallback}>
          <LoginPage onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }} onSuccess={() => setShowLoginModal(false)} embedded />
        </Suspense>
      </Modal>}
      {!isAdminArea && <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Create Account" size="auth">
        <Suspense fallback={routeFallback}>
          <RegisterPage onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }} onSuccess={() => setShowRegisterModal(false)} embedded />
        </Suspense>
      </Modal>}
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
