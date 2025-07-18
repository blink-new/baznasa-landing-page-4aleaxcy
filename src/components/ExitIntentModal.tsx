import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { HourglassIcon, PedalIcon } from './Icons';

interface ExitIntentModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClose, onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    // Also trigger on scroll up near top
    const handleScroll = () => {
      if (window.scrollY < 100 && !hasShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsOpen(false);
      onClose();
    }
  }, [isOpen, timeLeft, onClose]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-baznasa-dark border-2 border-baznasa-orange shadow-2xl">
        <DialogTitle className="sr-only">
          انتظر! لا تفوت هذه الفرصة - خصم حصري ١٠٪
        </DialogTitle>
        <div className="text-center p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PedalIcon className="w-12 h-12 text-baznasa-orange animate-pulse" />
              <h2 className="text-3xl font-bold text-white font-arabic">
                انتظر! لا تفوت هذه الفرصة
              </h2>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-baznasa-turquoise to-baznasa-orange mx-auto rounded-full" />
          </div>

          {/* Offer */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              خصم حصري ١٠٪ لمدة محدودة!
            </h3>
            <p className="text-baznasa-gray text-lg mb-6">
              نحن نعلم أنك مهتم بفك فرملتك المالية. احصل على خصم ١٠٪ على أي باقة الآن
            </p>

            {/* Timer */}
            <div className="bg-baznasa-orange/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <HourglassIcon className="w-8 h-8 text-baznasa-orange animate-pulse" />
                <span className="text-white font-bold text-lg">العرض ينتهي خلال:</span>
              </div>
              <div className="text-4xl font-bold text-baznasa-orange">
                {formatTime(timeLeft)}
              </div>
              <p className="text-baznasa-gray text-sm mt-2">
                هذا العرض متاح لمرة واحدة فقط
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-baznasa-dark/50 rounded-xl p-4 border border-baznasa-turquoise/20">
                <div className="text-baznasa-turquoise font-bold text-lg mb-1">وفر حتى ١٢٥ ر.س</div>
                <div className="text-baznasa-gray text-sm">على الباقة المميزة</div>
              </div>
              <div className="bg-baznasa-dark/50 rounded-xl p-4 border border-baznasa-turquoise/20">
                <div className="text-baznasa-turquoise font-bold text-lg mb-1">تفعيل فوري</div>
                <div className="text-baznasa-gray text-sm">ابدأ خلال دقائق</div>
              </div>
              <div className="bg-baznasa-dark/50 rounded-xl p-4 border border-baznasa-turquoise/20">
                <div className="text-baznasa-turquoise font-bold text-lg mb-1">ضمان ١٠٠٪</div>
                <div className="text-baznasa-gray text-sm">استرداد كامل</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleAccept}
              size="lg"
              className="w-full bg-baznasa-orange hover:bg-baznasa-orange/90 text-white font-bold text-xl py-4 rounded-2xl pulse-glow"
            >
              نعم! أريد الخصم ١٠٪ الآن
            </Button>
            
            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full border-baznasa-gray/30 text-baznasa-gray hover:text-white hover:border-baznasa-gray"
            >
              لا شكراً، سأدفع السعر الكامل لاحقاً
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-6 text-center">
            <p className="text-baznasa-gray text-sm">
              🔒 هذا العرض آمن ومضمون ١٠٠٪
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;