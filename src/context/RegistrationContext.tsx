import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentPricing, getRegistrationCount } from '../lib/api';

const RegistrationContext = createContext(null);
const PRICING_CACHE_KEY = 'cyber-shakti-current-pricing';
const PRICING_CACHE_MAX_AGE = 60_000;

export function RegistrationProvider({ children }) {
  const [dbCount, setDbCount] = useState(0);
  const [pricing, setPricing] = useState(null);
  const [databaseAvailable, setDatabaseAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [justDecremented, setJustDecremented] = useState(false);

  const triggerAnimation = useCallback(() => {
    setJustDecremented(true);
    const timer = setTimeout(() => setJustDecremented(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const fetchPricing = useCallback(async () => {
    try {
      const currentPricing = await getCurrentPricing();
      setPricing(currentPricing);
      if (!currentPricing.error) {
        setDbCount(currentPricing.registrationCount ?? 0);
        setDatabaseAvailable(currentPricing.databaseAvailable !== false);
        if (currentPricing.databaseAvailable !== false) {
          try {
            localStorage.setItem(PRICING_CACHE_KEY, JSON.stringify({
              pricing: currentPricing,
              savedAt: Date.now(),
            }));
          } catch {
            // Pricing remains usable when browser storage is unavailable.
          }
        }
      } else {
        const count = await getRegistrationCount();
        setDbCount(count.count);
        setDatabaseAvailable(false);
      }
      setLoading(false);
    } finally {
      setPricingLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(PRICING_CACHE_KEY) || 'null');
      if (
        cached?.pricing &&
        Date.now() - cached.savedAt < PRICING_CACHE_MAX_AGE
      ) {
        setPricing(cached.pricing);
        setDbCount(cached.pricing.registrationCount ?? 0);
        setLoading(false);
        setPricingLoading(false);
      }
    } catch {
      // Ignore expired or malformed cached pricing and load from the server.
    }

    fetchPricing();

    // Pricing responses include the registration count, avoiding a duplicate
    // database query while keeping both values current.
    const interval = setInterval(() => {
      fetchPricing();
    }, databaseAvailable ? 15000 : 60000);

    return () => clearInterval(interval);
  }, [databaseAvailable, fetchPricing]);

  const currentTier = pricing?.tier || pricing?.tiers?.[0] || null;
  const totalSeats = pricing?.mode === 'auto' ? currentTier?.max ?? null : null;
  const totalEnrolled = dbCount;
  const seatsRemaining = totalSeats == null ? null : Math.max(0, totalSeats - totalEnrolled);
  const isEarlyBirdAvailable = seatsRemaining == null || seatsRemaining > 0;
  const percentageFilled = totalSeats ? Math.min(100, Math.round((totalEnrolled / totalSeats) * 100)) : 0;

  const notifyNewRegistration = () => {
    setDbCount(prev => prev + 1);
    triggerAnimation();
    fetchPricing();
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
        pricingLoading,
        justDecremented,
        refreshCount: fetchPricing,
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
