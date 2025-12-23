
import React from 'react';
import { Stats } from '../types';

interface ResultScreenProps {
  stats: Stats;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ stats }) => {
  const total = stats.economy + stats.people + stats.stability;
  
  let resultType: 'high' | 'medium' | 'low' = 'low';
  if (total > 180) resultType = 'high';
  else if (total >= 100) resultType = 'medium';

  const content = {
    high: {
      title: 'Kỷ Nguyên Đổi Mới',
      eval: 'Chúc mừng! Với tầm nhìn sáng suốt và những quyết sách táo bạo, bạn đã cùng Đảng đưa đất nước vào kỷ nguyên Đổi Mới. Kinh tế phát triển, đời sống nhân dân được cải thiện rõ rệt, lòng dân tin tưởng vào sự lãnh đạo của Đảng. Việt Nam đã vững bước tiến lên con đường xã hội chủ nghĩa.',
      lesson: 'Đại hội VI đã để lại bài học vô giá về việc nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật và chủ động đổi mới.',
      bg: 'bg-gradient-to-br from-blue-900 via-emerald-900 to-black',
      img: '🏢',
      status: 'XUẤT SẮC',
      accent: 'text-amber-400'
    },
    medium: {
      title: 'Chuyển Mình Gian Khó',
      eval: 'Bạn đã cố gắng, nhưng một số quyết sách của bạn vẫn còn do dự hoặc chưa đủ mạnh mẽ. Đất nước vẫn sẽ phải đối mặt với nhiều khó khăn để thoát khỏi khủng hoảng. Cần có những quyết định táo bạo hơn để thực sự tạo ra đột phá.',
      lesson: 'Công cuộc Đổi Mới đòi hỏi sự dũng cảm và quyết tâm cao độ. Những cải cách nửa vời sẽ không thể mang lại kết quả như mong đợi.',
      bg: 'bg-gradient-to-br from-amber-900 via-stone-900 to-black',
      img: '🚗',
      status: 'KHÁ',
      accent: 'text-amber-500'
    },
    low: {
      title: 'Bế Tắc Kéo Dài',
      eval: 'Tiếc rằng, những quyết định của bạn đã không thể giúp đất nước vượt qua khủng hoảng. Nền kinh tế tiếp tục suy thoái, đời sống nhân dân khó khăn trầm trọng, lòng dân không yên. Đất nước chìm trong khó khăn và mất niềm tin.',
      lesson: 'Nếu không có tinh thần Đổi Mới đúng đắn, Việt Nam đã không thể có được ngày hôm nay. Sai lầm trong lịch sử có thể dẫn đến những hậu quả nghiêm trọng.',
      bg: 'bg-gradient-to-br from-red-950 via-black to-red-900',
      img: '🚲',
      status: 'CẦN CỐ GẮNG',
      accent: 'text-red-500'
    }
  }[resultType];

  return (
    <div className={`min-h-screen ${content.bg} text-white flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative overflow-hidden`}>
      {/* Cinematic Lighting Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_80%)]"></div>

      <div className="max-w-6xl w-full space-y-16 relative z-10">
        <header className="space-y-6">
          <div className="inline-block px-6 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black tracking-[0.6em] mb-4 shadow-xl">KẾT THÚC ĐẠI HỘI VI (1986)</div>
          <h1 className={`text-7xl md:text-[9rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 uppercase drop-shadow-2xl leading-none`}>
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium uppercase tracking-[0.3em] italic">"Lịch sử được viết bởi những người dũng cảm"</p>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            <div className="text-[14rem] md:text-[22rem] leading-none drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] animate-float shrink-0">
              {content.img}
            </div>

            <div className="flex-1 max-w-xl space-y-10 text-left">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Kinh tế', val: stats.economy },
                  { label: 'Lòng dân', val: stats.people },
                  { label: 'Ổn định', val: stats.stability }
                ].map((s, i) => (
                  <div key={i} className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl group hover:border-amber-500/50 transition-colors">
                    <span className="block text-[9px] uppercase font-bold text-white/30 mb-2 tracking-widest">{s.label}</span>
                    <span className={`text-4xl font-black ${content.accent} tabular-nums`}>{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-3xl">
                <p className="text-xl md:text-2xl leading-relaxed text-gray-100 font-serif italic antialiased">
                  "{content.eval}"
                </p>
                <div className="pt-8 border-t border-white/10">
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em] block mb-4">Bài học lịch sử để lại:</span>
                  <p className="text-amber-100/80 text-lg font-medium leading-relaxed italic">{content.lesson}</p>
                </div>
              </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-8">
            <button
              onClick={() => window.location.reload()}
              className={`px-20 py-6 bg-white text-black font-black text-2xl rounded-full hover:bg-amber-500 transition-all transform hover:scale-110 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.2)] uppercase tracking-widest`}
            >
              Chơi lại
            </button>
            <div className="flex flex-col items-center md:items-start opacity-30">
               <span className="text-[10px] font-black uppercase tracking-[0.6em]">Xếp hạng quyết sách</span>
               <span className="text-xl font-bold italic tracking-widest">{content.status}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
