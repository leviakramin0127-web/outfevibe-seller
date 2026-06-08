'use client';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <Navbar />
      <Sidebar />
      <div className="dashboard-layout">
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
