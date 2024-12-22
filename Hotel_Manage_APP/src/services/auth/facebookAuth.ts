import { HotelManager } from '../../types/hotel';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export class FacebookAuthService {
  private appId: string;
  private initialized: boolean = false;

  constructor(appId: string) {
    this.appId = appId;
  }

  initialize(): Promise<void> {
    return new Promise((resolve) => {
      // Define the async init function
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        
        this.initialized = true;
        resolve();
      };
    });
  }

  async signIn(): Promise<HotelManager> {
    if (!this.initialized) {
      throw new Error('Facebook SDK not initialized');
    }

    try {
      const response = await this.loginWithFacebook();
      if (!response.authResponse) {
        throw new Error('Facebook login failed');
      }

      const userInfo = await this.getUserInfo();
      if (!userInfo.email) {
        throw new Error('Email is required');
      }

      const manager: HotelManager = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        hotelId: 'hsf-001',
        role: 'manager'
      };

      return manager;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  }

  private loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.FB.login((response: any) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      }, { scope: 'email,public_profile' });
    });
  }

  private getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  }
}