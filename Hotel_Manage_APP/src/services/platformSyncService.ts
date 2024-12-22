import { bookingService } from './bookingService';
import { bookingPlatformApi } from './api/bookingPlatformApi';
import { platformIntegration } from './api/platformIntegration';

class PlatformSyncService {
  private syncInterval: number | null = null;

  startSync() {
    // Sync every 5 minutes
    this.syncInterval = window.setInterval(() => {
      this.syncBookings();
    }, 5 * 60 * 1000);

    // Initial sync
    this.syncBookings();
  }

  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  private async syncBookings() {
    try {
      // Only sync if platform is connected
      if (!platformIntegration.isPlatformConnected('booking.com')) {
        return;
      }

      const newReservations = await bookingPlatformApi.fetchNewReservations();
      
      for (const reservation of newReservations) {
        try {
          await bookingService.createBooking(reservation);
          console.log(`Synced booking ${reservation.id} from Booking.com`);
        } catch (error) {
          console.error(`Failed to sync booking ${reservation.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error during booking sync:', error);
    }
  }
}

export const platformSyncService = new PlatformSyncService();