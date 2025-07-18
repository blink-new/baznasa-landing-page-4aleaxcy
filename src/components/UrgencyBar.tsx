import React, { useState, useEffect } from 'react';
import { HourglassIcon } from './Icons';

const UrgencyBar = () => {
  const [seatsLeft, setSeatsLeft] = useState(7);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show urgency bar after scrolling
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate decreasing seats
    const interval = setInterval(() => {
      setSeatsLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 2)));
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-baznasa-orange text-white py-3 px-4 shadow-lg animate-slide-in-up">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center">
        <HourglassIcon className="w-5 h-5 animate-pulse" />
        <span className="font-bold text-sm md:text-base">
          ⚠️ باقي {seatsLeft} مقاعد فقط في هذه الدفعة - احجز مقعدك الآن!
        </span>
        <HourglassIcon className="w-5 h-5 animate-pulse" />
      </div>
    </div>
  );
};

export default UrgencyBar;