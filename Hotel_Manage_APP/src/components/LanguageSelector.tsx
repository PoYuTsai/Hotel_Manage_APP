import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'th', name: 'ไทย' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              i18n.language === lang.code ? 'text-blue-600 font-medium' : 'text-gray-700'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}