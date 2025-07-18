import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

interface SwipePageProps {
  children: React.ReactNode[];
  onSectionChange?: (index: number) => void;
}

const SwipePage: React.FC<SwipePageProps> = ({ children, onSectionChange }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const totalSections = children.length;

  // Handle section navigation
  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    onSectionChange?.(index);
    
    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 800);
  }, [totalSections, isScrolling, onSectionChange]);

  // Handle wheel events
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      // Scroll down
      goToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up
      goToSection(currentSection - 1);
    }
  }, [currentSection, totalSections, isScrolling, goToSection]);

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSection < totalSections - 1) {
      // Swipe up - next section
      goToSection(currentSection + 1);
    } else if (isRightSwipe && currentSection > 0) {
      // Swipe down - previous section
      goToSection(currentSection - 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling) return;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        if (currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        }
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        if (currentSection > 0) {
          goToSection(currentSection - 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        goToSection(0);
        break;
      case 'End':
        e.preventDefault();
        goToSection(totalSections - 1);
        break;
    }
  }, [currentSection, totalSections, isScrolling, goToSection]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  // Navigation dots component
  const NavigationDots = () => (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`
              w-3 h-3 rounded-full border-2 nav-dot
              ${currentSection === index 
                ? 'bg-baznasa-turquoise border-baznasa-turquoise scale-125 active' 
                : 'bg-transparent border-baznasa-gray hover:border-baznasa-turquoise'
              }
            `}
            aria-label={`الانتقال إلى القسم ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  // Navigation arrows
  const NavigationArrows = () => (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      <button
        onClick={() => goToSection(currentSection - 1)}
        disabled={currentSection === 0}
        className={`
          p-3 rounded-full transition-all duration-300
          ${currentSection === 0 
            ? 'bg-baznasa-gray/20 text-baznasa-gray/50 cursor-not-allowed' 
            : 'bg-baznasa-turquoise/20 text-baznasa-turquoise hover:bg-baznasa-turquoise hover:text-baznasa-dark'
          }
        `}
        aria-label="القسم السابق"
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => goToSection(currentSection + 1)}
        disabled={currentSection === totalSections - 1}
        className={`
          p-3 rounded-full transition-all duration-300
          ${currentSection === totalSections - 1 
            ? 'bg-baznasa-gray/20 text-baznasa-gray/50 cursor-not-allowed' 
            : 'bg-baznasa-turquoise/20 text-baznasa-turquoise hover:bg-baznasa-turquoise hover:text-baznasa-dark'
          }
        `}
        aria-label="القسم التالي"
      >
        <ChevronDownIcon className="w-6 h-6" />
      </button>
    </div>
  );

  // Section progress indicator
  const ProgressIndicator = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-baznasa-dark/50 z-50">
      <div 
        className="h-full bg-gradient-to-r from-baznasa-turquoise to-baznasa-orange transition-all duration-800 ease-out"
        style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
      />
    </div>
  );

  // Mobile swipe indicator
  const SwipeIndicator = () => (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="bg-baznasa-dark/80 backdrop-blur-md rounded-full px-6 py-3 border border-baznasa-turquoise/30 swipe-indicator">
        <div className="flex items-center gap-3 text-baznasa-turquoise">
          <div className="text-sm font-medium">
            {currentSection + 1} / {totalSections}
          </div>
          <div className="flex flex-col gap-1">
            <ChevronUpIcon className="w-4 h-4 animate-bounce" />
            <ChevronDownIcon className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Indicator */}
      <ProgressIndicator />
      
      {/* Navigation Elements */}
      <NavigationDots />
      <NavigationArrows />
      <SwipeIndicator />
      
      {/* Sections Container */}
      <div className="relative w-full h-full">
        {children.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`
              absolute inset-0 w-full h-full transition-all duration-800 ease-in-out
              ${currentSection === index 
                ? 'opacity-100 translate-y-0 z-10' 
                : currentSection > index 
                  ? 'opacity-0 -translate-y-full z-0'
                  : 'opacity-0 translate-y-full z-0'
              }
            `}
            style={{
              transform: `translateY(${(index - currentSection) * 100}%)`,
            }}
          >
            <div className="w-full h-full overflow-y-auto">
              {child}
            </div>
          </div>
        ))}
      </div>
      
      {/* Section Counter */}
      <div className="fixed top-4 right-4 z-50 bg-baznasa-dark/80 backdrop-blur-md rounded-lg px-4 py-2 border border-baznasa-turquoise/30">
        <div className="text-baznasa-turquoise text-sm font-medium">
          {currentSection + 1} / {totalSections}
        </div>
      </div>
    </div>
  );
};

export default SwipePage;