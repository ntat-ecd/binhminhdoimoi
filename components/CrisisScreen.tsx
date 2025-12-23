
import React, { useState } from 'react';
import { CRISIS_ITEMS } from '../constants';
import { CrisisItem } from '../types';

interface CrisisScreenProps {
  onComplete: () => void;
}

const CrisisScreen: React.FC<CrisisScreenProps> = ({ onComplete }) => {
  const [collected, setCollected] = useState<string[]>([]);
  const [activeFact, setActiveFact] = useState<string | null>(null);

  const handleCollect = (item: CrisisItem) => {
    if (!collected.includes(item.id)) {
      const newList = [...collected, item.id];
      setCollected(newList);
      setActiveFact(item.fact);
      
      if (newList.length === CRISIS_ITEMS.length) {
        setTimeout(onComplete, 3000);
      }
    } else {
        setActiveFact(item.fact);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-[#d4c5a1] p-8 grayscale-[0.6]">
      <div className="max-w-4xl w-full text-center space-y-8">
        <header className="space-y-2 animate-fadeIn">
          <h1 className="text-5xl font-black tracking-tighter text-red-700 uppercase italic">
            Việt Nam 1986
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Khám phá thực trạng kinh tế - xã hội của đất nước trước thềm Đại hội VI. 
            Bạn cần kiểm tra tất cả các hiện vật để nắm rõ tình hình.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {CRISIS_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCollect(item)}
              className={`group relative p-6 border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 hover:scale-105
                ${collected.includes(item.id) 
                  ? 'border-amber-600/30 bg-amber-900/10 opacity-40 grayscale' 
                  : 'border-[#d4c5a1] hover:bg-white/5 shadow-lg shadow-black/50'
                }`}
            >
              <span className="text-5xl group-hover:animate-bounce">{item.icon}</span>
              <span className="text-sm font-bold tracking-widest uppercase">{item.label}</span>
              {collected.includes(item.id) && (
                <div className="absolute top-2 right-2 text-green-500 font-bold">✓</div>
              )}
            </button>
          ))}
        </div>

        <div className="h-24 flex items-center justify-center">
          {activeFact ? (
            <div className="bg-black/40 p-4 border-l-4 border-red-600 animate-slideInRight max-w-2xl">
              <p className="text-lg italic leading-relaxed">"{activeFact}"</p>
            </div>
          ) : (
            <p className="animate-pulse">Nhấp vào một vật phẩm để kiểm tra...</p>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-around opacity-70">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">774.7%</div>
            <div className="text-xs uppercase tracking-widest">Lạm phát</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">1,000,000T</div>
            <div className="text-xs uppercase tracking-widest">Thiếu hụt lương thực</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">BẾ TẮC</div>
            <div className="text-xs uppercase tracking-widest">Cơ chế quản lý</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisScreen;
