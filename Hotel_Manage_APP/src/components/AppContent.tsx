import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { BookingsPage } from '../pages/BookingsPage';
import { FinancialReportPage } from '../pages/FinancialReportPage';
import { UsersPage } from '../pages/UsersPage';
import { HotelHeader } from './HotelHeader';
import { Sidebar } from './Sidebar';
import { ProtectedRoute } from './ProtectedRoute';
import { PERMISSIONS } from '../types/permissions';

export function AppContent() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DASHBOARD}>
            <DashboardPage />
          </ProtectedRoute>
        );
      case 'bookings':
        return (
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_BOOKINGS}>
            <BookingsPage />
          </ProtectedRoute>
        );
      case 'financial':
        return (
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL}>
            <FinancialReportPage />
          </ProtectedRoute>
        );
      case 'users':
        return (
          <ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_STAFF}>
            <UsersPage />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DASHBOARD}>
            <DashboardPage />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HotelHeader 
        hotelName="Huen San Fang Hotel"
        managerName={user.name}
      />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-[1400px] mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}