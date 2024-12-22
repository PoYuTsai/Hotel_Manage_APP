import React from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { Permission } from '../types/permissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: Permission;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  fallback = <AccessDenied />
}: ProtectedRouteProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

function AccessDenied() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}