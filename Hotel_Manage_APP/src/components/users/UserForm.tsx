import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, UserRole, USER_ROLE_LABELS } from '../../types/user';

interface UserFormProps {
  onSubmit: (user: User) => void;
  onCancel: () => void;
  user?: User | null;
}

export function UserForm({ onSubmit, onCancel, user }: UserFormProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'staff' as UserRole,
    status: user?.status || 'active' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: user?.id || crypto.randomUUID(),
      ...formData,
      createdAt: user?.createdAt || new Date(),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {user ? t('users.edit') : t('users.add')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('users.name')}</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('users.email')}</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('users.role')}</label>
          <select
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.entries(USER_ROLE_LABELS).map(([value, labels]) => (
              <option key={value} value={value}>{labels[i18n.language] || labels['en']}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('users.status')}</label>
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="active">{t('users.active')}</option>
            <option value="inactive">{t('users.inactive')}</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {user ? t('common.save') : t('common.add')}
          </button>
        </div>
      </form>
    </div>
  );
}