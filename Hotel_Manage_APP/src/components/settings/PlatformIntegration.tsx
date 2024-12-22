import React, { useState } from 'react';
import { platformIntegration } from '../../services/api/platformIntegration';
import { bookingPlatformApi } from '../../services/api/bookingPlatformApi';
import { platformSyncService } from '../../services/platformSyncService';

export function PlatformIntegration() {
  const [apiKey, setApiKey] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await platformIntegration.connectPlatform('booking.com', { apiKey, platformId });
      bookingPlatformApi.setCredentials(apiKey, platformId);
      platformSyncService.startSync();
      setSuccess('Successfully connected to Booking.com');
    } catch (error) {
      setError('Failed to connect to Booking.com');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Connect to Booking.com</h2>
      
      <form onSubmit={handleConnect} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Platform ID</label>
          <input
            type="text"
            value={platformId}
            onChange={(e) => setPlatformId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Connect Platform
        </button>
      </form>
    </div>
  );
}