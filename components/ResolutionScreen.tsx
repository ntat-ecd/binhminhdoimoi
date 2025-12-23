
import React from 'react';
import { SessionOption } from '../types';

interface ResolutionScreenProps {
  choices: SessionOption[];
  onFinish: () => void;
  onSFX: (url: string) => void;
  sfxAssets: any;
}

const ResolutionScreen: React.FC<ResolutionScreenProps> = ({ choices, onFinish, onSFX, sfxAssets }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Tense Background Visual */}
      <div className="absolute inset-0 bg-red-900/5 animate-pulse pointer-events-none"></div>

      <div className="max-w-3xl w-full bg-[#fdfaf1] p-12 text-black shadow-[25px_25px_0_rgba(185,28,28,0.2)] border-4 border-black relative overflow-hidden animate-slideUp">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none"></div>
        
        <header className="text-center mb-12 border-b-4 border-black pb-8 relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Dự thảo Nghị quyết Đại hội VI</h2>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 italic">Hà Nội, tháng 12 năm 1986 // Lưu hành nội bộ</p>
        </header>

        <div className="space-y-8 font-serif leading-relaxed text-lg relative z-10">
          <p className="font-bold text-center italic border-y border-black/10 py-4">
            "Sau những ngày thảo luận sôi nổi và thẳng thắn, Đại hội đã đi đến những thống nhất quan trọng, mở ra con đường Đổi Mới toàn diện đất nước."
          </p>

          <div className="space-y-8">
            {choices.map((choice, i) => (
              <div key={i} className="flex gap-4 animate-fadeIn" style={{ animationDelay: `${i * 0.4}s` }}>
                <span className="font-black shrink-0 text-red-600 text-xl">{i + 1}.</span>
                <p className="font-medium border-b border-black/5 pb-2">{choice.resolutionText}</p>
              </div>
            ))}
            
            {choices.every(c => c.isInnovation) && (
              <div className="flex gap-4 animate-fadeIn" style={{ animationDelay: `1.5s` }}>
                <span className="font-black shrink-0 text-red-600 text-xl">4.</span>
                <p className="font-medium italic text-red-800">Tập trung thực hiện ba chương trình mục tiêu lớn: Lương thực - thực phẩm, Hàng tiêu dùng và Hàng xuất khẩu.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 relative z-10">
          <button
            onClick={() => {
              onSFX(sfxAssets.SFX_CLICK);
              onFinish();
            }}
            className="px-16 py-5 bg-black text-white font-black uppercase tracking-[0.2em] hover:bg-red-800 transition-all shadow-2xl active:scale-95 transform hover:-translate-y-1"
          >
            Thông qua Nghị quyết
          </button>
          <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Ấn để chính thức ban hành văn bản</span>
        </div>
      </div>
    </div>
  );
};

export default ResolutionScreen;
