import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Hotel,
  Settings,
  DollarSign,
  UserPlus
} from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ElementType;
  requiredPermission?: string;
}

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { t } = useTranslation();
  const { canManageStaff } = usePermissions();

  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'bookings', name: t('nav.bookings'), icon: CalendarDays },
    { id: 'guests', name: t('nav.guests'), icon: Users },
    { id: 'rooms', name: t('nav.rooms'), icon: Hotel },
    { id: 'financial', name: t('nav.financial'), icon: DollarSign },
    { id: 'users', name: t('nav.users'), icon: UserPlus, requiredPermission: 'MANAGE_STAFF' },
    { id: 'settings', name: t('nav.settings'), icon: Settings },
  ];

  return (
    <aside className="bg-white w-64 fixed left-0 top-16 bottom-0 hidden lg:block border-r border-gray-200">
      <nav className="h-full py-6">
        {menuItems.map((item) => {
          if (item.requiredPermission && !canManageStaff()) {
            return null;
          }

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group ${
                currentPage === item.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                currentPage === item.id ? 'text-blue-600' : 'group-hover:text-blue-600'
              }`} />
              <span className="text-sm font-medium truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}