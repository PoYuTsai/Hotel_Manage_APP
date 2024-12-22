import { HotelManager } from '../../types/hotel';

declare global {
  interface Window {
    google: any;
    handleGoogleSignIn: (response: any) => void;
  }
}

export class GoogleAuthService {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  initialize(): Promise<void> {
    return new Promise((resolve) => {
      // Set up global callback before initializing Google Sign-In
      window.handleGoogleSignIn = this.handleSignIn.bind(this);

      // Wait for the Google Sign-In script to load
      window.addEventListener('load', () => {
        window.google?.accounts.id.initialize({
          client_id: this.clientId,
          callback: window.handleGoogleSignIn,
        });
        resolve();
      });
    });
  }

  private async handleSignIn(response: any) {
    try {
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      const payload = this.decodeJwtResponse(response.credential);
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
      throw error;
    }
  }

  private decodeJwtResponse(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}