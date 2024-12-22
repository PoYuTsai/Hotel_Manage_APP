import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User, USER_ROLE_LABELS } from '../types/user';
import { UserForm } from '../components/users/UserForm';
import { usePermissions } from '../hooks/usePermissions';

export function UsersPage() {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { canManageStaff } = usePermissions();

  const handleAddUser = (user: User) => {
    setUsers([...users, user]);
    setShowForm(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm(t('users.confirmDelete'))) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (!canManageStaff()) {
    return (
      <div className="p-6 text-center text-gray-500">
        {t('users.noAccess')}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('users.title')}</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          {t('users.add')}
        </button>
      </div>

      {showForm && (
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setShowForm(false)}
          user={selectedUser}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {t('users.name')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {t('users.email')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {t('users.role')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                {t('users.status')}
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                {t('users.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm">{user.name}</td>
                <td className="px-6 py-4 text-sm">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  {USER_ROLE_LABELS[user.role][i18n.language] || USER_ROLE_LABELS[user.role]['en']}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {t(`users.statuses.${user.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title={t('common.edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800"
                    title={t('common.delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}