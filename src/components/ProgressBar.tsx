import React, { useState, useEffect } from 'react';
import { CheckIcon } from './Icons';

const ProgressBar = () => {
  const [completedToday, setCompletedToday] = useState(1247);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('progress-bar');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Increment counter every 30 seconds
    const interval = setInterval(() => {
      setCompletedToday(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="progress-bar" className="py-16 bg-baznasa-dark/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
          <div className="bg-baznasa-dark/80 rounded-3xl p-8 border border-baznasa-turquoise/20 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CheckIcon className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-white font-arabic">
                تم اجتياز التشخيص اليوم
              </h3>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                {completedToday.toLocaleString('ar-SA')}
              </div>
              <p className="text-baznasa-gray text-lg">
                شخص اكتشف فرملته المالية اليوم
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-baznasa-dark/50 rounded-full h-4 mb-4">
                <div 
                  className={`h-4 bg-gradient-to-r from-baznasa-turquoise to-baznasa-orange rounded-full transition-all duration-2000 ${isVisible ? 'progress-fill' : 'w-0'}`}
                  style={{ '--progress-width': '78%' } as React.CSSProperties}
                />
              </div>
              <div className="flex justify-between text-sm text-baznasa-gray">
                <span>الهدف اليومي: ١٦٠٠</span>
                <span>٧٨٪ مكتمل</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-baznasa-turquoise">
              <div className="w-2 h-2 bg-baznasa-turquoise rounded-full animate-pulse" />
              <span className="text-sm">يتم التحديث كل ٣٠ ثانية</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;