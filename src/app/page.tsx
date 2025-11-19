"use client";
import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
}

export default function Home() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [clicks, setClicks] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 스크롤할 때마다 하트 생성
      if (Math.random() > 0.7) {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 2 + Math.random() * 2
        };
        setHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 4000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rotation = (scrollY % 360);
  const scale = 1 + Math.sin(scrollY / 100) * 0.2;

  return (
    <div className="min-h-[300vh] bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* 떠다니는 하트들 */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `float-up ${heart.duration}s linear`
          }}
        >
          <Heart className="text-pink-500 fill-pink-500" size={24} />
        </div>
      ))}

      {/* 첫 번째 섹션 */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div 
          className="text-center"
          style={{
            transform: `scale(${scale}) rotate(${rotation * 0.1}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative inline-block">
            <Sparkles className="absolute -top-8 -left-8 text-yellow-400 animate-pulse" size={32} />
            <Sparkles className="absolute -top-8 -right-8 text-pink-400 animate-pulse" size={32} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              윤동건
            </h1>
          </div>
        </div>
      </div>

      {/* 두 번째 섹션 */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div 
          className="text-center"
          style={{
            transform: `translateX(${Math.sin(scrollY / 100) * 20}px) rotate(${-rotation * 0.05}deg)`,
          }}
        >
          <div className="relative">
            <div className="text-8xl animate-bounce inline-block">
              👅
            </div>
            <h2 className="text-7xl font-bold mt-4 text-purple-600" style={{
              textShadow: '3px 3px 0px #ec4899'
            }}>
              메롱
            </h2>
          </div>
        </div>
      </div>

      {/* 세 번째 섹션 - 인터랙티브 */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <button
            onClick={() => setClicks(prev => prev + 1)}
            className="relative group"
            style={{
              transform: `scale(${1 + clicks * 0.1}) rotate(${clicks * 10}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <Star className="absolute top-0 left-0 text-yellow-400 animate-spin" size={40} style={{ animationDuration: '3s' }} />
            <Star className="absolute bottom-0 right-0 text-pink-400 animate-spin" size={40} style={{ animationDuration: '2s' }} />
            
            <div className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white px-12 py-8 rounded-full text-5xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110">
              사랑해
              <div className="text-2xl mt-2 animate-pulse">
                💕💕💕
              </div>
            </div>
          </button>
          
          {clicks > 0 && (
            <div className="mt-8 text-3xl font-bold text-pink-600 animate-bounce">
              {'❤️'.repeat(Math.min(clicks, 10))}
            </div>
          )}
          
          {clicks >= 10 && (
            <div className="mt-4 text-xl text-purple-600 font-semibold animate-pulse">
              완전 많이 사랑해!! 🎉✨
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}