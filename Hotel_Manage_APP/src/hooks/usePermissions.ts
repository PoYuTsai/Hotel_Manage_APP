import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Permission, PERMISSIONS, ROLE_PERMISSIONS } from '../types/permissions';

export function usePermissions() {
  const { user } = useContext(AuthContext);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
  };

  const canViewFinancial = () => hasPermission(PERMISSIONS.VIEW_FINANCIAL);
  const canManageFinancial = () => hasPermission(PERMISSIONS.MANAGE_FINANCIAL);
  const canManageBookings = () => hasPermission(PERMISSIONS.MANAGE_BOOKINGS);
  const canViewBookings = () => hasPermission(PERMISSIONS.VIEW_BOOKINGS);
  const canManageStaff = () => hasPermission(PERMISSIONS.MANAGE_STAFF);

  return {
    hasPermission,
    canViewFinancial,
    canManageFinancial,
    canManageBookings,
    canViewBookings,
    canManageStaff,
  };
}