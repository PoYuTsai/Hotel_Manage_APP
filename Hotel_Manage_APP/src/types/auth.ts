export type UserRole = 'manager' | 'staff';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermissions {
  manager: Permission[];
  staff: Permission[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}