import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Hotel, LogOut } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { AuthContext } from '../contexts/AuthContext';

interface HotelHeaderProps {
  hotelName: string;
  managerName: string;
}

export function HotelHeader({ hotelName, managerName }: HotelHeaderProps) {
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white shadow h-16">
      <div className="max-w-[1400px] mx-auto h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <Hotel className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 truncate max-w-[200px] lg:max-w-none">
                {hotelName}
              </h1>
              <p className="text-sm text-gray-500 truncate max-w-[200px] lg:max-w-none">
                {t('common.welcome')}, {managerName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}