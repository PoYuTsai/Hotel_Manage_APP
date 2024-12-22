import { HotelManager } from '../types/hotel';

// In a real app, these would be environment variables
const GOOGLE_CLIENT_ID = 'your-google-client-id';
const FACEBOOK_APP_ID = 'your-facebook-app-id';

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {
    this.initializeSocialAuth();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeSocialAuth() {
    // Initialize Google Sign-In
    window.addEventListener('load', () => {
      // @ts-ignore - Google Sign-In types
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: this.handleGoogleSignIn.bind(this),
      });
    });

    // Load Facebook SDK
    window.fbAsyncInit = () => {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };
  }

  async login(email: string, password: string): Promise<HotelManager> {
    // In a real app, this would make an API call
    if (email === 'manager@huensanfang.com' && password === 'demo123') {
      const manager: HotelManager = {
        id: '1',
        email,
        name: 'Hotel Manager',
        hotelId: 'hsf-001',
        role: 'manager'
      };
      localStorage.setItem('hotelManager', JSON.stringify(manager));
      return manager;
    }
    throw new Error('Invalid credentials');
  }

  private async handleGoogleSignIn(response: any) {
    try {
      // Decode the JWT token
      const payload = this.decodeJwtResponse(response.credential);
      
      // In a real app, verify this with your backend
      const manager: HotelManager = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        hotelId: 'hsf-001',
        role: 'manager'
      };

      localStorage.setItem('hotelManager', JSON.stringify(manager));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  }

  async handleFacebookSignIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      FB.login(async (response) => {
        if (response.authResponse) {
          try {
            const userInfo = await this.getFacebookUserInfo();
            const manager: HotelManager = {
              id: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              hotelId: 'hsf-001',
              role: 'manager'
            };
            
            localStorage.setItem('hotelManager', JSON.stringify(manager));
            window.location.href = '/dashboard';
            resolve();
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('Facebook login cancelled'));
        }
      }, { scope: 'email,public_profile' });
    });
  }

  private async getFacebookUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.api('/me', { fields: 'name,email' }, (response: any) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  }

  private decodeJwtResponse(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  logout(): void {
    localStorage.removeItem('hotelManager');
    window.location.href = '/login';
  }
}

export const authService = AuthService.getInstance();