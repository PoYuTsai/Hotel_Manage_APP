import { User } from '../../types/user';

class AuthService {
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
  }

  async login(email: string, password: string): Promise<User> {
    await this.initialize();

    // Demo credentials
    const validCredentials = [
      {
        email: 'admin@huensanfang.com',
        password: 'admin123',
        role: 'owner' as const,
        name: '系統管理員'
      },
      {
        email: 'manager@huensanfang.com',
        password: 'manager123',
        role: 'manager' as const,
        name: '飯店經理'
      },
      {
        email: 'staff@huensanfang.com',
        password: 'staff123',
        role: 'staff' as const,
        name: '飯店人員'
      }
    ];

    const matchedUser = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (matchedUser) {
      const user: User = {
        id: crypto.randomUUID(),
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        createdAt: new Date(),
        status: 'active'
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    throw new Error('Invalid credentials');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      return {
        ...user,
        createdAt: new Date(user.createdAt)
      };
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const authService = new AuthService();