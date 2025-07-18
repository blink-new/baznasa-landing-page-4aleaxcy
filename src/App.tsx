import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Components
import SwipePage from './components/SwipePage';
import UrgencyBar from './components/UrgencyBar';
import HeroSection from './components/HeroSection';
import ProgressBar from './components/ProgressBar';
import DiagnoseQuiz from './components/DiagnoseQuiz';
import PricingLadder from './components/PricingLadder';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import ExitIntentModal from './components/ExitIntentModal';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Handle quiz start
  const handleStartQuiz = () => {
    setShowQuiz(true);
    // Auto-navigate to quiz section after a short delay
    setTimeout(() => {
      setCurrentSection(2); // Quiz is section 2
    }, 500);
  };

  // Handle quiz completion
  const handleQuizComplete = (email: string) => {
    setUserEmail(email);
    
    // Simulate PDF generation and sending
    toast.success('🎉 تم إرسال تقريرك بنجاح!', {
      duration: 4000,
      style: {
        background: '#20E3B2',
        color: '#0D1B2A',
        fontWeight: 'bold',
        direction: 'rtl'
      }
    });

    // Show pricing after a delay
    setTimeout(() => {
      setShowPricing(true);
      setTimeout(() => {
        setCurrentSection(3); // Pricing is section 3
      }, 500);
    }, 2000);

    // Show secondary CTA button
    setTimeout(() => {
      toast('💡 اشترِ مفتاح فك الفرملة الآن!', {
        duration: 6000,
        style: {
          background: '#FF7A00',
          color: 'white',
          fontWeight: 'bold',
          direction: 'rtl'
        },
        onClick: () => setCurrentSection(3)
      });
    }, 5000);
  };

  // Handle purchase
  const handlePurchase = (planId: string) => {
    // Show loading message
    toast.loading('جارٍ تأمين مقعدك... لا تغلق الصفحة', {
      duration: 3000,
      style: {
        background: '#0D1B2A',
        color: '#20E3B2',
        fontWeight: 'bold',
        direction: 'rtl'
      }
    });

    // Simulate Stripe checkout
    setTimeout(() => {
      toast.dismiss();
      
      // In a real app, this would redirect to Stripe Checkout
      const checkoutUrl = `https://checkout.stripe.com/pay/${planId}?prefilled_email=${encodeURIComponent(userEmail)}`;
      
      toast.success('🚀 يتم توجيهك لإتمام الدفع...', {
        duration: 2000,
        style: {
          background: '#20E3B2',
          color: '#0D1B2A',
          fontWeight: 'bold',
          direction: 'rtl'
        }
      });

      // Open in new tab for mobile compatibility
      setTimeout(() => {
        window.open(checkoutUrl, '_blank');
      }, 1000);
    }, 3000);
  };

  // Handle exit intent modal
  const handleExitModalClose = () => {
    setShowExitModal(false);
  };

  const handleExitModalAccept = () => {
    setShowExitModal(false);
    // Apply 10% discount and redirect to pricing
    toast.success('🎉 تم تطبيق خصم ١٠٪!', {
      duration: 3000,
      style: {
        background: '#FF7A00',
        color: 'white',
        fontWeight: 'bold',
        direction: 'rtl'
      }
    });
    setCurrentSection(3); // Go to pricing section
  };

  // Handle section changes
  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    
    // Auto-show quiz when reaching quiz section
    if (index === 2 && !showQuiz) {
      setShowQuiz(true);
    }
    
    // Auto-show pricing when reaching pricing section
    if (index === 3 && !showPricing) {
      setShowPricing(true);
    }
  };

  // Define all sections
  const sections = [
    // Section 0: Hero + Urgency Bar
    <div key="hero" className="relative min-h-screen">
      <UrgencyBar />
      <HeroSection onStartQuiz={handleStartQuiz} />
    </div>,

    // Section 1: Progress Bar
    <div key="progress" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-baznasa-dark to-baznasa-dark/95">
      <div className="w-full">
        <ProgressBar />
        <div className="text-center mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-arabic">
            انضم إلى <span className="gradient-text">آلاف</span> الناجحين
          </h2>
          <p className="text-xl text-baznasa-gray max-w-2xl mx-auto px-6">
            الذين فكوا فرملتهم المالية وحققوا نتائج مذهلة في وقت قياسي
          </p>
        </div>
      </div>
    </div>,

    // Section 2: Quiz
    <div key="quiz" className="min-h-screen">
      {showQuiz && (
        <DiagnoseQuiz 
          isVisible={showQuiz} 
          onComplete={handleQuizComplete} 
        />
      )}
      {!showQuiz && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-baznasa-dark/95 to-baznasa-dark">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-arabic">
              جاهز لاكتشاف <span className="gradient-text">فرملتك</span>؟
            </h2>
            <button
              onClick={handleStartQuiz}
              className="bg-baznasa-turquoise hover:bg-baznasa-turquoise/90 text-baznasa-dark font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl pulse-glow transition-all duration-300 transform hover:scale-105"
            >
              ابدأ التشخيص الآن
            </button>
          </div>
        </div>
      )}
    </div>,

    // Section 3: Pricing
    <div key="pricing" className="min-h-screen">
      {showPricing && (
        <PricingLadder 
          isVisible={showPricing} 
          onPurchase={handlePurchase} 
        />
      )}
      {!showPricing && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-baznasa-dark to-baznasa-dark/95">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-arabic">
              اختر <span className="gradient-text">مفتاحك</span> لفك الفرملة
            </h2>
            <p className="text-xl text-baznasa-gray mb-8">
              أكمل التشخيص أولاً لرؤية الباقات المناسبة لك
            </p>
            <button
              onClick={() => setCurrentSection(2)}
              className="bg-baznasa-orange hover:bg-baznasa-orange/90 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              ارجع للتشخيص
            </button>
          </div>
        </div>
      )}
    </div>,

    // Section 4: Social Proof
    <div key="social" className="min-h-screen">
      <SocialProof />
    </div>,

    // Section 5: Footer
    <div key="footer" className="min-h-screen flex items-end">
      <Footer />
    </div>
  ];

  return (
    <div className="min-h-screen bg-baznasa-dark grain-bg">
      <SwipePage onSectionChange={handleSectionChange}>
        {sections}
      </SwipePage>

      {/* Exit Intent Modal */}
      <ExitIntentModal 
        onClose={handleExitModalClose}
        onAccept={handleExitModalAccept}
      />

      {/* Floating Action Buttons */}
      {currentSection === 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleStartQuiz}
            className="bg-baznasa-turquoise hover:bg-baznasa-turquoise/90 text-baznasa-dark font-bold px-6 py-3 rounded-full shadow-2xl pulse-glow animate-bounce"
          >
            ابدأ الآن
          </button>
        </div>
      )}

      {currentSection === 2 && showQuiz && (
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <button
            onClick={() => setCurrentSection(2)}
            className="bg-baznasa-turquoise hover:bg-baznasa-turquoise/90 text-baznasa-dark font-bold px-6 py-3 rounded-full shadow-2xl pulse-glow"
          >
            أكمل التشخيص
          </button>
        </div>
      )}

      {currentSection === 3 && showPricing && (
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <button
            onClick={() => setCurrentSection(3)}
            className="bg-baznasa-orange hover:bg-baznasa-orange/90 text-white font-bold px-6 py-3 rounded-full shadow-2xl pulse-glow"
          >
            اشترِ الآن
          </button>
        </div>
      )}
    </div>
  );
}

export default App;