import React, { useState, useEffect } from 'react';
import { BookingList } from '../components/bookings/BookingList';
import { BookingFormWrapper } from '../components/bookings/BookingFormWrapper';
import { BookingHeader } from '../components/bookings/BookingHeader';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Booking } from '../types/booking';
import { bookingService } from '../services/bookingService';

export function BookingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      if (data.length === 0) {
        // Add default booking if no bookings exist
        const defaultBooking = await bookingService.createDefaultBooking();
        setBookings([defaultBooking]);
      } else {
        setBookings(data);
      }
    } catch (error) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (bookingData: Partial<Booking>) => {
    try {
      setError(null);
      const newBooking = await bookingService.createBooking(bookingData);
      setBookings([...bookings, newBooking]);
      handleCancel();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create booking');
    }
  };

  const handleUpdateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      setError(null);
      const updatedBooking = await bookingService.updateBooking(id, updates);
      setBookings(bookings.map(b => b.id === id ? updatedBooking : b));
      handleCancel();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update booking');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      setError(null);
      await bookingService.deleteBooking(id);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      setError('Failed to delete booking');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedBooking(null);
    setError(null);
  };

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  return (
    <div className="p-6">
      <BookingHeader onNewBooking={() => setShowForm(true)} />
      <ErrorMessage message={error} />

      {showForm ? (
        <BookingFormWrapper
          selectedBooking={selectedBooking}
          onSubmit={selectedBooking 
            ? (data) => handleUpdateBooking(selectedBooking.id, data)
            : handleCreateBooking}
          onCancel={handleCancel}
        />
      ) : (
        <BookingList
          bookings={bookings}
          onViewDetails={(booking) => {
            setSelectedBooking(booking);
            setShowForm(true);
          }}
          onDeleteBooking={handleDeleteBooking}
        />
      )}
    </div>
  );
}