
import React, { useState } from 'react';

const FutureScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const eras = [
    { threshold: 0, year: 1986, icon: '🚲', label: 'Bao cấp & Đói nghèo', desc: 'Xe đạp Thống Nhất là tài sản lớn. Gạo phải mua bằng tem phiếu.' },
    { threshold: 33, year: 1995, icon: '🏍️', label: 'Bình thường hóa quan hệ', desc: 'Xóa bỏ cấm vận, gia nhập ASEAN. Kinh tế bắt đầu cất cánh.' },
    { threshold: 66, year: 2007, icon: '🚗', label: 'Hội nhập toàn cầu', desc: 'Gia nhập WTO. Việt Nam trở thành điểm sáng thu hút đầu tư.' },
    { threshold: 100, year: 2024, icon: '🏢', label: 'Việt Nam hiện đại', desc: 'Số hóa, vươn mình ra biển lớn. Một trong những nền kinh tế năng động nhất.' }
  ];

  const currentEra = [...eras].reverse().find(e => progress >= e.threshold) || eras[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-emerald-900 to-black flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="max-w-4xl w-full space-y-12">
        <header className="space-y-2">
          <h1 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 uppercase">
            Tương lai trong tay bạn
          </h1>
          <p className="text-blue-200 uppercase tracking-[0.3em] font-medium">Hành trình {currentEra.year - 1986} năm đổi mới</p>
        </header>

        <div className="relative py-20 flex flex-col items-center justify-center">
            <div className="text-[12rem] leading-none mb-8 transition-all duration-700 transform hover:scale-110">
              {currentEra.icon}
            </div>
            
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-2xl w-full shadow-2xl animate-fadeIn">
              <h2 className="text-3xl font-bold text-amber-400 mb-2">{currentEra.year}: {currentEra.label}</h2>
              <p className="text-lg text-white/70 italic leading-relaxed">
                "{currentEra.desc}"
              </p>
            </div>
        </div>

        <div className="w-full max-w-2xl mx-auto space-y-6">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-sm uppercase tracking-widest text-white/50">Kéo thanh trượt để du hành thời gian</p>
        </div>

        {progress === 100 && (
          <div className="fixed inset-0 bg-black/90 z-[200] flex flex-col items-center justify-center p-8 animate-fadeIn">
            <div className="max-w-xl text-center space-y-8">
              <h2 className="text-6xl font-black italic text-amber-500">CHÚC MỪNG!</h2>
              <p className="text-2xl leading-relaxed">
                Bạn đã hoàn thành nhiệm vụ lịch sử. Quyết định Đổi Mới của bạn đã góp phần đưa Việt Nam thoát khỏi cảnh đói nghèo, vươn mình trở thành một quốc gia thịnh vượng và tự tin trên trường quốc tế.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-12 py-4 bg-amber-500 text-black font-black text-xl hover:bg-white transition-all transform hover:scale-105 rounded-full"
              >
                CHƠI LẠI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureScreen;
