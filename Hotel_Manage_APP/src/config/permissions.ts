import { Permission, RolePermissions } from '../types/auth';

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_BOOKINGS: 'view_bookings',
  MANAGE_BOOKINGS: 'manage_bookings',
  VIEW_GUESTS: 'view_guests',
  MANAGE_GUESTS: 'manage_guests',
  VIEW_ROOMS: 'view_rooms',
  MANAGE_ROOMS: 'manage_rooms',
  VIEW_FINANCIAL: 'view_financial',
  MANAGE_FINANCIAL: 'manage_financial',
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_STAFF: 'manage_staff',
} as const;

export const permissionsList: Permission[] = [
  {
    id: PERMISSIONS.VIEW_DASHBOARD,
    name: 'View Dashboard',
    description: 'Access to view the dashboard',
  },
  {
    id: PERMISSIONS.VIEW_BOOKINGS,
    name: 'View Bookings',
    description: 'Access to view booking information',
  },
  {
    id: PERMISSIONS.MANAGE_BOOKINGS,
    name: 'Manage Bookings',
    description: 'Create, edit, and delete bookings',
  },
  {
    id: PERMISSIONS.VIEW_GUESTS,
    name: 'View Guests',
    description: 'Access to view guest information',
  },
  {
    id: PERMISSIONS.MANAGE_GUESTS,
    name: 'Manage Guests',
    description: 'Edit guest information and manage guest profiles',
  },
  {
    id: PERMISSIONS.VIEW_ROOMS,
    name: 'View Rooms',
    description: 'Access to view room information',
  },
  {
    id: PERMISSIONS.MANAGE_ROOMS,
    name: 'Manage Rooms',
    description: 'Update room status and manage room settings',
  },
  {
    id: PERMISSIONS.VIEW_FINANCIAL,
    name: 'View Financial',
    description: 'Access to view financial reports',
  },
  {
    id: PERMISSIONS.MANAGE_FINANCIAL,
    name: 'Manage Financial',
    description: 'Manage financial data and create expenses',
  },
  {
    id: PERMISSIONS.VIEW_SETTINGS,
    name: 'View Settings',
    description: 'Access to view system settings',
  },
  {
    id: PERMISSIONS.MANAGE_SETTINGS,
    name: 'Manage Settings',
    description: 'Modify system settings',
  },
  {
    id: PERMISSIONS.MANAGE_STAFF,
    name: 'Manage Staff',
    description: 'Manage staff accounts and permissions',
  },
];

export const rolePermissions: RolePermissions = {
  manager: permissionsList,
  staff: [
    permissionsList.find(p => p.id === PERMISSIONS.VIEW_DASHBOARD)!,
    permissionsList.find(p => p.id === PERMISSIONS.VIEW_BOOKINGS)!,
    permissionsList.find(p => p.id === PERMISSIONS.VIEW_GUESTS)!,
    permissionsList.find(p => p.id === PERMISSIONS.VIEW_ROOMS)!,
  ],
};