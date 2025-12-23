
import React, { useState } from 'react';
import { SURVEY_POINTS } from '../constants';
import { SurveyPoint, Stats } from '../types';

interface SurveyScreenProps {
  onComplete: (collectedKeywords: string[]) => void;
  stats: Stats;
  onSFX: (url: string) => void;
  sfxAssets: any;
}

const SurveyScreen: React.FC<SurveyScreenProps> = ({ onComplete, stats, onSFX, sfxAssets }) => {
  const [activePoint, setActivePoint] = useState<SurveyPoint | null>(null);
  const [collectedKeywords, setCollectedKeywords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);

  const handlePointClick = (point: SurveyPoint) => {
    onSFX(sfxAssets.SFX_CLICK);
    setActivePoint(point);
    setFeedback(null);
  };

  const handleOption = (option: { label: string; collects: boolean; feedback: string }, point: SurveyPoint) => {
    if (option.collects) {
      onSFX(sfxAssets.SFX_COLLECT);
      const newKeywords = Array.from(new Set([...collectedKeywords, ...point.keywords]));
      setCollectedKeywords(newKeywords);
    } else {
      onSFX(sfxAssets.SFX_CLICK);
    }
    setFeedback(option.feedback);
    if (!visited.includes(point.id)) {
      setVisited([...visited, point.id]);
    }
  };

  const allVisited = visited.length === SURVEY_POINTS.length;
  const enoughKeywords = collectedKeywords.length >= 6;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#d4c5a1] flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>

      {/* Dynamic HUD Header */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-black/90 border-b border-amber-500/20 backdrop-blur-xl shadow-2xl">
        <div className="border-r border-white/5 px-4">
          <span className="block text-[9px] uppercase font-bold text-gray-500 tracking-widest mb-1">Kinh tế</span>
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]" style={{ width: `${stats.economy}%` }}></div>
            </div>
            <span className="text-xl font-black text-red-500 tabular-nums">{stats.economy}</span>
          </div>
        </div>
        <div className="border-r border-white/5 px-4">
          <span className="block text-[9px] uppercase font-bold text-gray-500 tracking-widest mb-1">Lòng dân</span>
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]" style={{ width: `${stats.people}%` }}></div>
            </div>
            <span className="text-xl font-black text-red-500 tabular-nums">{stats.people}</span>
          </div>
        </div>
        <div className="border-r border-white/5 px-4">
          <span className="block text-[9px] uppercase font-bold text-gray-500 tracking-widest mb-1">Ổn định xã hội</span>
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]" style={{ width: `${stats.stability}%` }}></div>
            </div>
            <span className="text-xl font-black text-red-500 tabular-nums">{stats.stability}</span>
          </div>
        </div>
        <div className="px-4 bg-amber-900/10 rounded-xl border border-amber-500/20 flex flex-col justify-center items-center shadow-inner">
          <span className="text-[9px] uppercase font-bold text-amber-500/70 tracking-widest">Từ khóa Crisis</span>
          <span className="text-2xl font-black text-amber-400">{collectedKeywords.length} <span className="text-sm opacity-40">/ 7</span></span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">
        {/* Geographic Exploration Map */}
        <div className="md:w-1/2 p-8 flex flex-col items-center justify-center relative bg-black/20">
          <div className="w-full max-w-md aspect-[3/4] relative bg-stone-900/60 rounded-[2.5rem] border-4 border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden p-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-5"></div>
            <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-white/10 mb-12">Hành trình tìm hiểu thực trạng 1986</h2>
            
            <div className="relative h-full w-full">
              {SURVEY_POINTS.map((point) => (
                <button
                  key={point.id}
                  onClick={() => handlePointClick(point)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full transition-all duration-500
                    ${activePoint?.id === point.id 
                      ? 'bg-amber-500 text-black ring-[12px] ring-amber-500/10 scale-125 z-20 shadow-[0_0_40px_rgba(251,191,36,0.4)]' 
                      : 'bg-red-900/40 text-white hover:bg-red-800 hover:scale-110 z-10'
                    }
                    ${visited.includes(point.id) ? 'border-2 border-green-500/50' : 'animate-pulse ring-4 ring-red-500/10'}
                  `}
                  style={{
                    top: point.id === 'hanoi' ? '15%' : point.id === 'rural' ? '45%' : '85%',
                    left: point.id === 'hanoi' ? '60%' : point.id === 'rural' ? '55%' : '40%',
                  }}
                >
                  <span className="text-4xl">{point.icon}</span>
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-[10px] font-black uppercase tracking-widest bg-black/80 px-3 py-1 rounded-full border border-white/5 transition-colors ${activePoint?.id === point.id ? 'text-amber-400 border-amber-500/30' : 'text-gray-400'}`}>
                    {point.name}
                  </span>
                </button>
              ))}
              
              {/* Decorative Connectivity Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" viewBox="0 0 100 100">
                <path d="M60 15 L55 45 L40 85" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="3" />
              </svg>
            </div>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/20 text-center max-w-xs leading-relaxed">
            "Sâu sát thực tế - Lắng nghe dân tâm"
          </p>
        </div>

        {/* Narrative & Decision Panel */}
        <div className="md:w-1/2 p-4 md:p-10 flex flex-col">
          <div className="flex-1 bg-stone-900/90 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] border border-white/5 shadow-inner-xl overflow-y-auto custom-scrollbar">
            {activePoint ? (
              <div className="space-y-10 animate-slideInRight">
                <header>
                  <div className="inline-block px-4 py-1.5 bg-red-900/30 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest mb-6 rounded-lg">Khu vực: {activePoint.name}</div>
                  <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">{activePoint.title}</h3>
                </header>

                <div className="space-y-8">
                  {activePoint.description.map((line, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-1.5 h-full min-h-[3rem] bg-amber-500/20 group-hover:bg-amber-500 transition-colors shrink-0 rounded-full"></div>
                      <p className="text-xl text-stone-300 leading-relaxed font-serif italic antialiased opacity-90 group-hover:opacity-100 transition-opacity">"{line}"</p>
                    </div>
                  ))}
                </div>

                {feedback && (
                  <div className="p-8 bg-green-950/20 border border-green-500/20 rounded-2xl text-green-400 font-bold animate-fadeIn flex items-center gap-5 shadow-lg">
                    <span className="text-4xl drop-shadow-md">📝</span>
                    <p className="text-lg">{feedback}</p>
                  </div>
                )}

                <div className="pt-10 space-y-4">
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.4em] mb-4">Lựa chọn hành động:</p>
                  {activePoint.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOption(opt, activePoint)}
                      className="w-full text-left p-7 border border-white/5 rounded-3xl hover:bg-white/5 transition-all group flex items-center justify-between hover:border-amber-500/30 shadow-sm"
                    >
                      <span className="text-xl font-medium group-hover:text-amber-500 transition-colors pr-4">{opt.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-all text-amber-500 transform translate-x-2 group-hover:translate-x-0">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-30 grayscale">
                <div className="text-9xl animate-float">📍</div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black uppercase tracking-widest">Tiến hành khảo sát</h3>
                  <p className="text-stone-400 max-w-sm text-lg italic">Hãy chọn một điểm sáng trên bản đồ để bắt đầu thu thập chứng cứ cho Báo cáo Chính trị.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Footer */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2 justify-center">
               {collectedKeywords.map((kw, idx) => (
                 <span key={idx} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[10px] font-black rounded-full uppercase tracking-widest">{kw}</span>
               ))}
            </div>
            {allVisited && (
              <div className="animate-fadeIn w-full md:w-auto">
                {enoughKeywords ? (
                  <button
                    onClick={() => onComplete(collectedKeywords)}
                    className="w-full md:w-auto px-12 py-5 bg-red-700 hover:bg-red-600 text-white font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(185,28,28,0.3)] uppercase tracking-widest text-base flex items-center justify-center gap-4 animate-pulse transform hover:scale-105 active:scale-95"
                  >
                    Bắt đầu Đại Hội VI <span>→</span>
                  </button>
                ) : (
                  <div className="bg-red-900/20 px-8 py-5 rounded-2xl border border-red-500/30 text-red-500 font-bold text-sm uppercase tracking-widest text-center shadow-lg">
                    Chưa thu thập đủ từ khóa mấu chốt!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyScreen;
