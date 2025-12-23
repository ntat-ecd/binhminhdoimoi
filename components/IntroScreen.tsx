
import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 md:p-12 text-center animate-fadeIn relative overflow-hidden">
      {/* Decorative Red Tint */}
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
      
      <div className="max-w-4xl space-y-12 relative z-10">
        <div className="space-y-6">
          <h1 className="text-red-600 text-6xl md:text-9xl font-black tracking-tighter italic glitch-text drop-shadow-[0_0_20px_rgba(255,0,0,0.4)] uppercase">
            Bình Minh Đổi Mới
          </h1>
          <h2 className="text-amber-500 text-xl md:text-3xl font-bold tracking-[0.5em] uppercase border-y border-amber-500/20 py-4">
            Đại Hội Đại Biểu Toàn Quốc Lần Thứ VI
          </h2>
        </div>

        <div className="bg-white/5 border border-amber-500/10 p-8 md:p-12 rounded-3xl shadow-2xl space-y-8 text-lg md:text-2xl leading-relaxed text-gray-200 backdrop-blur-md">
          <p className="animate-slideUp italic font-serif opacity-90">
            "Năm 1986. Đất nước Việt Nam đang đứng trước những thử thách cam go. Nền kinh tế kiệt quệ, lạm phát phi mã, đời sống nhân dân vô vàn khó khăn... Đòi hỏi những quyết sách dũng cảm để vực dậy đất nước."
          </p>
          
          <div className="border-l-4 border-red-700 pl-8 py-4 bg-red-950/20 text-left rounded-r-xl">
            <p className="text-red-500 font-black italic mb-3 uppercase tracking-widest text-sm">Trọng trách của bạn:</p>
            <p className="text-gray-100 font-medium">
              Trong vai trò một Đại biểu dự Đại hội VI, bạn phải lắng nghe tiếng nói của nhân dân, thấu hiểu thực trạng và đưa ra những quyết định sống còn để xây dựng Báo cáo Chính trị - Kim chỉ nam cho sự nghiệp Đổi Mới.
            </p>
          </div>

          <p className="font-bold text-amber-500 uppercase tracking-[0.3em] text-sm animate-pulse">
            Nhiệm vụ: Phá bỏ xiềng xích cũ, mở ra tương lai mới.
          </p>
        </div>

        <button
          onClick={onStart}
          className="group relative px-24 py-6 bg-red-700 hover:bg-red-600 text-white font-black text-3xl rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(185,28,28,0.5)] uppercase tracking-widest"
        >
          <span className="relative z-10">Bắt đầu</span>
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
