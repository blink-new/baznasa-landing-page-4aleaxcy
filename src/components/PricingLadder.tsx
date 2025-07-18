import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckIcon, GuaranteeIcon, MoneyIcon, StarIcon } from './Icons';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  limited?: boolean;
  limitCount?: number;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'مفتاح فك الفرملة',
    price: 499,
    originalPrice: 799,
    description: 'الحل الأساسي لفك فرملتك المالية',
    features: [
      'تشخيص شامل لفرملتك المالية',
      'خطة عمل مخصصة لحالتك',
      'دليل خطوة بخطوة للتنفيذ',
      'دعم فني لمدة ٣٠ يوم',
      'ضمان استرداد ١٠٠٪'
    ],
    badge: 'الأكثر طلباً'
  },
  {
    id: 'premium',
    name: 'دعسة الانطلاقة',
    price: 749,
    originalPrice: 1299,
    description: 'للراغبين في تسريع النتائج',
    features: [
      'كل ما في الباقة الأساسية',
      'جلسة استشارة مباشرة ٦٠ دقيقة',
      'أدوات وقوالب جاهزة للتنفيذ',
      'متابعة أسبوعية لمدة شهرين',
      'ضمان مضاعفة الدخل ١٥٠٪'
    ],
    badge: 'ضمان ١٥٠٪',
    popular: true
  },
  {
    id: 'vip',
    name: 'تحدي مضاعفة الدخل',
    price: 1249,
    originalPrice: 2499,
    description: 'للجادين في تحقيق نقلة مالية',
    features: [
      'كل ما في الباقات السابقة',
      'برنامج مكثف لمدة ٩٠ يوم',
      'مجموعة VIP مغلقة',
      'لقاءات أسبوعية مباشرة',
      'ضمان مضاعفة الدخل ٣٠٠٪'
    ],
    badge: 'محدود',
    limited: true,
    limitCount: 100
  }
];

interface PricingLadderProps {
  isVisible: boolean;
  onPurchase: (planId: string) => void;
}

const PricingLadder: React.FC<PricingLadderProps> = ({ isVisible, onPurchase }) => {
  const [animatedCards, setAnimatedCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    if (isVisible) {
      pricingPlans.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedCards(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-baznasa-dark/95 to-baznasa-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">
            اختر <span className="gradient-text">مفتاحك</span> لفك الفرملة
          </h2>
          <p className="text-xl text-baznasa-gray max-w-2xl mx-auto">
            ثلاث باقات مصممة خصيصاً لتناسب مستوى طموحك المالي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`
                relative bg-baznasa-dark/80 rounded-3xl p-8 border-2 
                ${plan.popular ? 'border-baznasa-turquoise shadow-2xl shadow-baznasa-turquoise/20' : 'border-baznasa-turquoise/20'}
                ${animatedCards[index] ? 'slide-in-up' : 'opacity-0'}
                transform transition-all duration-500 hover:scale-105
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`
                  absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold
                  ${plan.popular ? 'bg-baznasa-turquoise text-baznasa-dark' : 
                    plan.limited ? 'bg-baznasa-orange text-white' : 'bg-green-500 text-white'}
                `}>
                  {plan.badge}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="mb-4">
                  {plan.popular && <StarIcon className="w-12 h-12 text-baznasa-turquoise mx-auto mb-2" />}
                  {plan.limited && <GuaranteeIcon className="w-12 h-12 text-baznasa-orange mx-auto mb-2" />}
                  {!plan.popular && !plan.limited && <MoneyIcon className="w-12 h-12 text-baznasa-turquoise mx-auto mb-2" />}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 font-arabic">
                  {plan.name}
                </h3>
                <p className="text-baznasa-gray mb-6">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  {plan.originalPrice && (
                    <div className="text-baznasa-gray line-through text-lg mb-1">
                      {plan.originalPrice.toLocaleString('ar-SA')} ر.س
                    </div>
                  )}
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {plan.price.toLocaleString('ar-SA')} ر.س
                  </div>
                  {plan.originalPrice && (
                    <div className="text-green-500 font-bold">
                      وفر {((plan.originalPrice - plan.price) / plan.originalPrice * 100).toFixed(0)}%
                    </div>
                  )}
                </div>

                {plan.limited && plan.limitCount && (
                  <div className="bg-baznasa-orange/20 rounded-lg p-3 mb-6">
                    <p className="text-baznasa-orange font-bold text-sm">
                      ⚠️ باقي {plan.limitCount} مقعد فقط
                    </p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-baznasa-gray text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => onPurchase(plan.id)}
                size="lg"
                className={`
                  w-full font-bold text-lg py-4 rounded-2xl transition-all duration-300
                  ${plan.popular 
                    ? 'bg-baznasa-turquoise hover:bg-baznasa-turquoise/90 text-baznasa-dark pulse-glow' 
                    : 'bg-baznasa-orange hover:bg-baznasa-orange/90 text-white'
                  }
                `}
              >
                {plan.limited ? 'احجز مقعدك الآن' : 'اشترِ الآن'}
              </Button>

              {/* Guarantee */}
              <div className="text-center mt-4">
                <p className="text-xs text-baznasa-gray">
                  {plan.id === 'premium' || plan.id === 'vip' 
                    ? '🛡️ ضمان مضاعفة الدخل أو استرداد كامل'
                    : '🛡️ ضمان استرداد ١٠٠٪ خلال ٣٠ يوم'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-baznasa-gray">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>دفع آمن ١٠٠٪</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-baznasa-turquoise rounded-full animate-pulse" />
              <span>Apple Pay & Tap متاح</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-baznasa-orange rounded-full animate-pulse" />
              <span>تفعيل فوري</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingLadder;