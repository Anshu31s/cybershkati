import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentPricing, getRegistrationCount } from '../lib/api';

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [dbCount, setDbCount] = useState(0);
  const [pricing, setPricing] = useState(null);
  const [databaseAvailable, setDatabaseAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [justDecremented, setJustDecremented] = useState(false);

  const triggerAnimation = useCallback(() => {
    setJustDecremented(true);
    const timer = setTimeout(() => setJustDecremented(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const fetchCount = useCallback(async () => {
    const [res, currentPricing] = await Promise.all([getRegistrationCount(), getCurrentPricing()]);
    setDbCount(res.count);
    setPricing(currentPricing);
    setDatabaseAvailable(res.databaseAvailable !== false);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCount();

    // Poll Prisma backend periodically for live seat count synchronization
    const interval = setInterval(() => {
      fetchCount();
    }, databaseAvailable ? 15000 : 60000);

    return () => clearInterval(interval);
  }, [databaseAvailable, fetchCount]);

  const currentTier = pricing?.tier || pricing?.tiers?.[0] || null;
  const totalSeats = pricing?.mode === 'auto' ? currentTier?.max ?? null : null;
  const totalEnrolled = dbCount;
  const seatsRemaining = totalSeats == null ? null : Math.max(0, totalSeats - totalEnrolled);
  const isEarlyBirdAvailable = seatsRemaining == null || seatsRemaining > 0;
  const percentageFilled = totalSeats ? Math.min(100, Math.round((totalEnrolled / totalSeats) * 100)) : 0;

  const notifyNewRegistration = () => {
    setDbCount(prev => prev + 1);
    triggerAnimation();
    fetchCount();
  };

  return (
    <RegistrationContext.Provider
      value={{
        totalSeats,
        totalEnrolled,
        seatsRemaining,
        isEarlyBirdAvailable,
        percentageFilled,
        currentTier,
        currentPrice: pricing?.amount ?? currentTier?.amount ?? 1000,
        pricingMode: pricing?.mode || 'auto',
        databaseAvailable,
        loading,
        justDecremented,
        refreshCount: fetchCount,
        notifyNewRegistration
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
