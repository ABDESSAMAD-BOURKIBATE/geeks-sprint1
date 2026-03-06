import React, { useState, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useOutletContext } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import HowItWorks from './components/sections/HowItWorks';
import HeroSection from './components/sections/HeroSection';
import TopDestinations from './components/sections/TopDestinations';
import Benefits from './components/sections/Benefits';
import Footer from './components/sections/Footer';
import MoroccoTravelBlog from './components/sections/UserReviews';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load the pages
const BlogsPage = React.lazy(() => import('./pages/BlogsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Layout component to keep Navbar, Footer, and Modal
function Layout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar 
        onLoginClick={handleLoginClick} 
        isAuthenticated={isAuthenticated}
        onLogout={logout}
      />

      {/* Main content with flex-grow */}
      <div className="flex-grow">
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Outlet context={{ handleLoginClick }} />
        </Suspense>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 z-[998]" onClick={handleCloseLogin}></div>
            </div>
            <div className="inline-block align-bottom bg-gray-50 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <Login onClose={handleCloseLogin} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Home Component separated for the index route
function Home() {
  const { handleLoginClick } = useOutletContext();
  return (
    <main className="pt-0">
      <HeroSection onLoginClick={handleLoginClick} />
      <TopDestinations />
      <HowItWorks />
      <MoroccoTravelBlog />
      <Benefits />
      <Footer />
    </main>
  );
}

// Error Boundary
function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </a>
    </div>
  );
}

// Advanced Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "blogs",
        element: (
          <ProtectedRoute>
            <BlogsPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;