import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckIcon, HourglassIcon } from './Icons';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    emoji: string;
    value: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "ما هو مستوى دخلك الحالي شهرياً؟",
    options: [
      { text: "أقل من ٥٠٠٠ ريال", emoji: "😔", value: "low" },
      { text: "٥٠٠٠ - ١٥٠٠٠ ريال", emoji: "😐", value: "medium" },
      { text: "١٥٠٠٠ - ٣٠٠٠٠ ريال", emoji: "🙂", value: "good" },
      { text: "أكثر من ٣٠٠٠٠ ريال", emoji: "😊", value: "high" }
    ]
  },
  {
    id: 2,
    question: "كم مرة حاولت زيادة دخلك في السنة الماضية؟",
    options: [
      { text: "لم أحاول أبداً", emoji: "😴", value: "never" },
      { text: "مرة أو مرتين", emoji: "🤔", value: "few" },
      { text: "عدة مرات", emoji: "💪", value: "several" },
      { text: "أحاول باستمرار", emoji: "🔥", value: "always" }
    ]
  },
  {
    id: 3,
    question: "ما هو أكبر تحدي يواجهك في زيادة الدخل؟",
    options: [
      { text: "نقص المعرفة", emoji: "🤷", value: "knowledge" },
      { text: "نقص الوقت", emoji: "⏰", value: "time" },
      { text: "نقص رأس المال", emoji: "💰", value: "capital" },
      { text: "الخوف من المخاطرة", emoji: "😰", value: "fear" }
    ]
  },
  {
    id: 4,
    question: "كم تستثمر شهرياً في تطوير نفسك مالياً؟",
    options: [
      { text: "لا أستثمر شيئاً", emoji: "❌", value: "nothing" },
      { text: "أقل من ٥٠٠ ريال", emoji: "💸", value: "little" },
      { text: "٥٠٠ - ٢٠٠٠ ريال", emoji: "💳", value: "moderate" },
      { text: "أكثر من ٢٠٠٠ ريال", emoji: "💎", value: "high" }
    ]
  },
  {
    id: 5,
    question: "ما مدى استعدادك لتغيير وضعك المالي خلال ٧٢ ساعة؟",
    options: [
      { text: "غير مستعد", emoji: "😑", value: "not_ready" },
      { text: "مستعد نوعاً ما", emoji: "🤨", value: "somewhat" },
      { text: "مستعد جداً", emoji: "😤", value: "very_ready" },
      { text: "مستعد ١٠٠٪", emoji: "🚀", value: "fully_ready" }
    ]
  }
];

interface DiagnoseQuizProps {
  isVisible: boolean;
  onComplete: (email: string) => void;
}

const DiagnoseQuiz: React.FC<DiagnoseQuizProps> = ({ isVisible, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            setShowEmailForm(true);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      // Quiz completed, start loading
      setTimeout(() => {
        setIsLoading(true);
        setLoadingProgress(0);
      }, 500);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onComplete(email);
    }
  };

  if (!isVisible) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-baznasa-dark to-baznasa-dark/95">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-arabic">
            تشخيص <span className="gradient-text">Diagnose-19</span>
          </h2>
          <p className="text-xl text-baznasa-gray">
            ٥ أسئلة فقط لاكتشاف فرملتك المالية
          </p>
        </div>

        {!showEmailForm && !isLoading && (
          <div className="bg-baznasa-dark/80 rounded-3xl p-8 border border-baznasa-turquoise/20 shadow-2xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-baznasa-gray">
                  السؤال {currentQuestion + 1} من {quizQuestions.length}
                </span>
                <span className="text-baznasa-turquoise font-bold">
                  {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-baznasa-dark/50 rounded-full h-3">
                <div 
                  className="h-3 bg-gradient-to-r from-baznasa-turquoise to-baznasa-orange rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="slide-in-right">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-arabic">
                {quizQuestions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    variant="outline"
                    className="p-6 h-auto text-right border-baznasa-turquoise/30 hover:border-baznasa-turquoise hover:bg-baznasa-turquoise/10 transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <span className="text-3xl">{option.emoji}</span>
                      <span className="text-lg font-medium text-white flex-1">
                        {option.text}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading Screen */}
        {isLoading && (
          <div className="bg-baznasa-dark/80 rounded-3xl p-12 border border-baznasa-turquoise/20 shadow-2xl text-center">
            <div className="mb-8">
              <HourglassIcon className="w-16 h-16 text-baznasa-turquoise mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-white mb-4 font-arabic">
                جارٍ تحليل إجاباتك...
              </h3>
              <p className="text-baznasa-gray text-lg">
                يتم إعداد تقريرك الشخصي الآن
              </p>
            </div>

            <div className="w-full bg-baznasa-dark/50 rounded-full h-4 mb-4">
              <div 
                className="h-4 bg-gradient-to-r from-baznasa-turquoise to-baznasa-orange rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-baznasa-turquoise font-bold">
              {loadingProgress}% مكتمل
            </p>
          </div>
        )}

        {/* Email Form */}
        {showEmailForm && (
          <div className="bg-baznasa-dark/80 rounded-3xl p-8 border border-baznasa-turquoise/20 shadow-2xl slide-in-up">
            <div className="text-center mb-8">
              <CheckIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4 font-arabic">
                تم تحليل فرملتك بنجاح!
              </h3>
              <p className="text-baznasa-gray text-lg">
                أدخل بريدك الإلكتروني لاستلام تقرير "فرملتك ومفتاحك.pdf"
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="mb-6">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-right bg-baznasa-dark/50 border-baznasa-turquoise/30 text-white placeholder:text-baznasa-gray text-lg p-4"
                  required
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-baznasa-orange hover:bg-baznasa-orange/90 text-white font-bold text-xl py-4 rounded-2xl pulse-glow"
              >
                أرسل التقرير (مجاناً)
              </Button>
              
              <p className="text-center text-sm text-baznasa-gray mt-4">
                سيصلك التقرير خلال ١٠ ثوانٍ
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiagnoseQuiz;