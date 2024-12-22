export type UserRole = 'owner' | 'manager' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  status: 'active' | 'inactive';
}

export const USER_ROLE_LABELS: Record<UserRole, Record<string, string>> = {
  owner: {
    'en': 'Owner',
    'th': 'เจ้าของ',
    'zh-TW': '飯店老闆',
    'zh-CN': '酒店老板'
  },
  manager: {
    'en': 'Manager',
    'th': 'ผู้จัดการ',
    'zh-TW': '飯店經理',
    'zh-CN': '酒店经理'
  },
  staff: {
    'en': 'Staff',
    'th': 'พนักงาน',
    'zh-TW': '飯店人員',
    'zh-CN': '酒店员工'
  }
};