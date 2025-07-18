import React, { useState, useEffect } from 'react';
import { StarIcon, MoneyIcon } from './Icons';

interface Testimonial {
  id: number;
  name: string;
  initial: string;
  result: string;
  amount: number;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد م.',
    initial: 'أ',
    result: 'ضاعف دخله ٣ مرات في شهرين',
    amount: 45000,
    avatar: '#20E3B2',
    rating: 5
  },
  {
    id: 2,
    name: 'فاطمة ع.',
    initial: 'ف',
    result: 'بدأت مشروعها وحققت ٨٠ألف في الشهر الأول',
    amount: 80000,
    avatar: '#FF7A00',
    rating: 5
  },
  {
    id: 3,
    name: 'محمد ص.',
    initial: 'م',
    result: 'انتقل من موظف إلى رائد أعمال',
    amount: 120000,
    avatar: '#20E3B2',
    rating: 5
  },
  {
    id: 4,
    name: 'نورا ح.',
    initial: 'ن',
    result: 'حققت الحرية المالية في ٩٠ يوم',
    amount: 95000,
    avatar: '#FF7A00',
    rating: 5
  },
  {
    id: 5,
    name: 'خالد ر.',
    initial: 'خ',
    result: 'زاد دخله من ٥ آلاف إلى ٢٥ ألف شهرياً',
    amount: 25000,
    avatar: '#20E3B2',
    rating: 5
  },
  {
    id: 6,
    name: 'سارة ل.',
    initial: 'س',
    result: 'بنت إمبراطورية رقمية من الصفر',
    amount: 150000,
    avatar: '#FF7A00',
    rating: 5
  }
];

const SocialProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(345000);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('social-proof');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-scroll testimonials
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update earnings counter every 30 seconds
    const interval = setInterval(() => {
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 5000) + 2000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="social-proof" className="py-20 bg-baznasa-dark/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">
            <span className="gradient-text">نتائج حقيقية</span> من عملاء حقيقيين
          </h2>
          <p className="text-xl text-baznasa-gray">
            آلاف الأشخاص فكوا فرملتهم المالية وحققوا نتائج مذهلة
          </p>
        </div>

        {/* Live Earnings Counter */}
        <div className={`text-center mb-16 ${isVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="bg-baznasa-dark/80 rounded-3xl p-8 border border-baznasa-turquoise/20 shadow-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <MoneyIcon className="w-12 h-12 text-baznasa-turquoise animate-pulse" />
              <h3 className="text-2xl font-bold text-white font-arabic">
                أرباح جديدة اليوم
              </h3>
            </div>
            
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
              +{totalEarnings.toLocaleString('ar-SA')} ر.س
            </div>
            
            <p className="text-baznasa-gray">
              يتم التحديث كل ٣٠ ثانية
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 text-sm font-bold">مباشر</span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`${isVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-baznasa-dark/80 rounded-2xl p-6 border border-baznasa-turquoise/20 shadow-xl h-full">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: testimonial.avatar }}
                      >
                        {testimonial.initial}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <p className="text-baznasa-gray mb-4 text-sm leading-relaxed">
                      "{testimonial.result}"
                    </p>

                    {/* Amount */}
                    <div className="bg-baznasa-turquoise/10 rounded-lg p-3">
                      <div className="text-baznasa-turquoise font-bold text-lg">
                        {testimonial.amount.toLocaleString('ar-SA')} ر.س
                      </div>
                      <div className="text-baznasa-gray text-xs">
                        دخل شهري جديد
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-baznasa-turquoise' : 'bg-baznasa-gray/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${isVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">٥٢٠٠+</div>
            <p className="text-baznasa-gray">عميل سعيد</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">٩٨٪</div>
            <p className="text-baznasa-gray">معدل النجاح</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">٧٢ ساعة</div>
            <p className="text-baznasa-gray">متوسط ظهور النتائج</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;