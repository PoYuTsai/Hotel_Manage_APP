import { BookingSource } from '../../types/booking';

export interface PlatformConfig {
  apiKey: string;
  platformId: string;
}

export class PlatformIntegration {
  private configs: Map<BookingSource, PlatformConfig> = new Map();

  async connectPlatform(platform: BookingSource, config: PlatformConfig): Promise<void> {
    // In a real implementation, this would validate the API key with the platform
    this.configs.set(platform, config);
  }

  async disconnectPlatform(platform: BookingSource): Promise<void> {
    this.configs.delete(platform);
  }

  isPlatformConnected(platform: BookingSource): boolean {
    return this.configs.has(platform);
  }

  getConnectedPlatforms(): BookingSource[] {
    return Array.from(this.configs.keys());
  }
}

export const platformIntegration = new PlatformIntegration();