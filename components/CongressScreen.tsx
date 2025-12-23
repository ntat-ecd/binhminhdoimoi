
import React, { useState } from 'react';
import { CONGRESS_SESSIONS } from '../constants';
import { Stats, SessionOption } from '../types';

interface CongressScreenProps {
  onComplete: (choices: SessionOption[], finalStats: Stats) => void;
  stats: Stats;
  onSFX: (url: string) => void;
  sfxAssets: any;
}

const CongressScreen: React.FC<CongressScreenProps> = ({ onComplete, stats, onSFX, sfxAssets }) => {
  const [currentSessionIdx, setCurrentSessionIdx] = useState(0);
  const [choices, setChoices] = useState<SessionOption[]>([]);
  const [currentStats, setCurrentStats] = useState<Stats>(stats);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentSession = CONGRESS_SESSIONS[currentSessionIdx];

  const handleChoice = (option: SessionOption) => {
    onSFX(sfxAssets.SFX_GAVEL); // Solemn decision sound
    
    const newStats = {
      economy: Math.min(100, Math.max(0, currentStats.economy + (option.impact.economy || 0))),
      people: Math.min(100, Math.max(0, currentStats.people + (option.impact.people || 0))),
      stability: Math.min(100, Math.max(0, currentStats.stability + (option.impact.stability || 0))),
    };

    setChoices([...choices, option]);
    setCurrentStats(newStats);
    setFeedback(option.feedback);

    setTimeout(() => {
      setFeedback(null);
      if (currentSessionIdx + 1 < CONGRESS_SESSIONS.length) {
        setCurrentSessionIdx(currentSessionIdx + 1);
      } else {
        onComplete([...choices, option], newStats);
      }
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-soviet flex flex-col p-6 md:p-12 items-center justify-center relative">
      {/* Dynamic Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 p-4 border-t border-amber-500/30 flex justify-center gap-12 z-50 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="text-center group">
          <span className="block text-[10px] uppercase opacity-50 text-white tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Kinh tế</span>
          <span className="text-2xl font-black text-amber-500">{currentStats.economy}</span>
        </div>
        <div className="text-center group">
          <span className="block text-[10px] uppercase opacity-50 text-white tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Lòng dân</span>
          <span className="text-2xl font-black text-amber-500">{currentStats.people}</span>
        </div>
        <div className="text-center group">
          <span className="block text-[10px] uppercase opacity-50 text-white tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Ổn định</span>
          <span className="text-2xl font-black text-amber-500">{currentStats.stability}</span>
        </div>
      </div>

      <div className="max-w-4xl w-full bg-black/90 backdrop-blur-xl p-8 md:p-12 rounded-lg border-[10px] border-amber-600 shadow-2xl relative animate-fadeIn">
        <header className="mb-10 text-center border-b border-amber-500/20 pb-6">
          <h2 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">Đại hội đại biểu toàn quốc lần thứ VI</h2>
          <h3 className="text-3xl font-black text-white italic tracking-tight uppercase leading-tight">{currentSession.title}</h3>
        </header>

        {feedback ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
            <p className="text-2xl font-bold text-amber-500 text-center uppercase tracking-widest drop-shadow-lg">{feedback}</p>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-lg leading-relaxed text-gray-300 shadow-inner">
              <p className="mb-4 italic opacity-80 border-l-2 border-amber-500/50 pl-4">"{currentSession.intro}"</p>
              <p className="text-white font-bold text-xl">{currentSession.question}</p>
            </div>

            <div className="grid gap-4">
              {currentSession.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt)}
                  className="w-full text-left p-6 border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/20 transition-all rounded-xl group flex items-start gap-4 shadow-lg active:scale-[0.98] hover:border-amber-500"
                >
                  <span className="w-10 h-10 bg-amber-500 text-black font-black flex items-center justify-center rounded-full shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-lg font-medium group-hover:text-amber-400">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CongressScreen;
