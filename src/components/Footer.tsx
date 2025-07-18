import React from 'react';
import { PedalIcon, WhatsAppIcon, TelegramIcon, TikTokIcon, XIcon } from './Icons';
import { Button } from './ui/button';

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('مرحباً، أريد الاستفسار عن برامج بزنسة');
    window.open(`https://wa.me/966500000000?text=${message}`, '_blank');
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      telegram: 'https://t.me/baznasa_official',
      tiktok: 'https://tiktok.com/@baznasa',
      x: 'https://x.com/baznasa'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <footer className="bg-baznasa-dark border-t border-baznasa-turquoise/20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <PedalIcon className="w-10 h-10 text-baznasa-turquoise" />
              <div>
                <h3 className="text-2xl font-bold text-white font-arabic">بزنسة</h3>
                <p className="text-baznasa-turquoise text-sm">من فرملة الدخل إلى دعسة المكسب</p>
              </div>
            </div>
            
            <p className="text-baznasa-gray mb-6 leading-relaxed">
              نساعدك على اكتشاف وفك الفرملة المالية التي تمنعك من تحقيق أهدافك. 
              انضم لآلاف العملاء الذين حققوا نقلة مالية حقيقية معنا.
            </p>

            {/* WhatsApp Support */}
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl"
            >
              <WhatsAppIcon className="w-5 h-5 ml-2" />
              تواصل مع الدعم
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 font-arabic">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#quiz" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  التشخيص المجاني
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  الباقات
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  قصص النجاح
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-4 font-arabic">قانوني</h4>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="/terms" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="/refund" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  سياسة الاسترداد
                </a>
              </li>
              <li>
                <a href="/contact" className="text-baznasa-gray hover:text-baznasa-turquoise transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="border-t border-baznasa-turquoise/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-baznasa-gray">تابعنا على:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSocialClick('telegram')}
                  className="w-10 h-10 bg-baznasa-turquoise/10 hover:bg-baznasa-turquoise/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <TelegramIcon className="w-5 h-5 text-baznasa-turquoise" />
                </button>
                <button
                  onClick={() => handleSocialClick('tiktok')}
                  className="w-10 h-10 bg-baznasa-turquoise/10 hover:bg-baznasa-turquoise/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <TikTokIcon className="w-5 h-5 text-baznasa-turquoise" />
                </button>
                <button
                  onClick={() => handleSocialClick('x')}
                  className="w-10 h-10 bg-baznasa-turquoise/10 hover:bg-baznasa-turquoise/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <XIcon className="w-5 h-5 text-baznasa-turquoise" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <p className="text-baznasa-gray text-sm mb-1">
                للاستفسارات والدعم الفني
              </p>
              <a 
                href="mailto:support@baznasa.com" 
                className="text-baznasa-turquoise hover:text-baznasa-turquoise/80 transition-colors"
              >
                support@baznasa.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-baznasa-turquoise/20 pt-8 mt-8 text-center">
          <p className="text-baznasa-gray text-sm">
            © ٢٠٢٤ بزنسة. جميع الحقوق محفوظة. | صنع بـ ❤️ في المملكة العربية السعودية
          </p>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-baznasa-gray">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>دفع آمن ١٠٠٪</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-baznasa-turquoise rounded-full" />
              <span>شهادة SSL</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-baznasa-orange rounded-full" />
              <span>ضمان الاسترداد</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button for Mobile */}
      <div className="fixed bottom-6 left-6 md:hidden z-50">
        <Button
          onClick={handleWhatsAppClick}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-2xl animate-pulse"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;