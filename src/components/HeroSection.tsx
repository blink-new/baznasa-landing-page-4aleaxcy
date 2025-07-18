import React, { useState, useEffect } from 'react';
import { PedalIcon, ArrowUpIcon } from './Icons';
import { Button } from './ui/button';

const HeroSection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pulseButton, setPulseButton] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Pulse button every 7 seconds
    const interval = setInterval(() => {
      setPulseButton(true);
      setTimeout(() => setPulseButton(false), 500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-bg">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-baznasa-dark via-baznasa-dark/95 to-baznasa-dark/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--baznasa-turquoise)/0.1)_0%,_transparent_70%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <PedalIcon className="w-16 h-16 text-baznasa-turquoise float" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <ArrowUpIcon className="w-12 h-12 text-baznasa-orange float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className={`mb-8 ${isLoaded ? 'slide-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <PedalIcon className="w-12 h-12 text-baznasa-turquoise" />
            <h1 className="text-4xl md:text-6xl font-bold text-white font-arabic">
              بزنسة
            </h1>
          </div>
          <p className="text-baznasa-turquoise text-lg md:text-xl font-medium">
            من فرملة الدخل إلى دعسة المكسب
          </p>
        </div>

        {/* Main Headline */}
        <div className={`mb-8 ${isLoaded ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-arabic">
            <span className="gradient-text">وصلتك فرملة؟</span>
            <br />
            <span className="text-shadow-glow">دوسها وطلع دخلك في ٧٢ ساعة</span>
          </h2>
          <p className="text-xl md:text-2xl text-baznasa-gray mb-8 max-w-2xl mx-auto">
            لا تسوّق لنفسك قبل ما تفك فرملتك
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`space-y-4 ${isLoaded ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={onStartQuiz}
            size="lg"
            className={`
              bg-baznasa-turquoise hover:bg-baznasa-turquoise/90 
              text-baznasa-dark font-bold text-xl px-12 py-6 
              rounded-2xl shadow-2xl pulse-glow
              ${pulseButton ? 'shake-gentle' : ''}
              transition-all duration-300 transform hover:scale-105
            `}
          >
            <PedalIcon className="w-6 h-6 ml-3" />
            ابدأ تشخيص فرملتك الآن
          </Button>
          
          <div className="text-center">
            <button className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors duration-300 text-lg underline">
              أريد مشاهدة تجارب الآخرين أولاً
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-12 ${isLoaded ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-baznasa-gray">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>تشخيص مجاني ١٠٠٪</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-baznasa-turquoise rounded-full animate-pulse" />
              <span>تقرير PDF فوري</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-baznasa-orange rounded-full animate-pulse" />
              <span>ضمان ١٥٠٪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-baznasa-turquoise rounded-full flex justify-center">
          <div className="w-1 h-3 bg-baznasa-turquoise rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;