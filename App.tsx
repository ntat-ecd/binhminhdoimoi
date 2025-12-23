
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameStage, Stats, SessionOption } from './types';
import { INITIAL_STATS } from './constants';
import IntroScreen from './components/IntroScreen';
import SurveyScreen from './components/SurveyScreen';
import CongressScreen from './components/CongressScreen';
import ResolutionScreen from './components/ResolutionScreen';
import ResultScreen from './components/ResultScreen';
import Timer from './components/Timer';
import GlitchOverlay from './components/GlitchOverlay';

// High-quality royalty-free audio assets from public sources
const AUDIO_ASSETS = {
  // Background Music
  BGM_INTRO: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c369c73b0a.mp3', // Epic & Heroic
  BGM_SURVEY: 'https://cdn.pixabay.com/audio/2022/02/07/audio_65b3a3998b.mp3', // Somber/Reflective
  BGM_CONGRESS: 'https://cdn.pixabay.com/audio/2022/10/25/audio_108620e29b.mp3', // Tense/Solemn
  BGM_SUCCESS: 'https://cdn.pixabay.com/audio/2022/01/21/audio_317424168c.mp3', // Triumphant
  BGM_FAIL: 'https://cdn.pixabay.com/audio/2021/08/09/audio_824647385a.mp3', // Melancholy
  
  // Sound Effects
  SFX_CLICK: 'https://cdn.pixabay.com/audio/2022/03/15/audio_50269f8263.mp3',
  SFX_COLLECT: 'https://cdn.pixabay.com/audio/2021/08/04/audio_062562479e.mp3',
  SFX_GAVEL: 'https://www.soundjay.com/misc/sounds/gavel-01.mp3',
  SFX_PAPER: 'https://www.soundjay.com/misc/sounds/paper-flip-1.mp3'
};

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.INTRO);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [choices, setChoices] = useState<SessionOption[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Plays a one-shot sound effect.
   */
  const playSFX = useCallback((url: string) => {
    if (isMuted) return;
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Silence errors if audio is blocked by browser policy
    });
  }, [isMuted]);

  /**
   * Manages Background Music (BGM) transitions based on game stage.
   */
  useEffect(() => {
    // Stop current track cleanly
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current = null;
    }

    let trackUrl = AUDIO_ASSETS.BGM_INTRO;
    switch (stage) {
      case GameStage.SURVEY: trackUrl = AUDIO_ASSETS.BGM_SURVEY; break;
      case GameStage.CONGRESS: 
      case GameStage.RESOLUTION: trackUrl = AUDIO_ASSETS.BGM_CONGRESS; break;
      case GameStage.RESULT: 
        const total = stats.economy + stats.people + stats.stability;
        trackUrl = (total > 180) ? AUDIO_ASSETS.BGM_SUCCESS : AUDIO_ASSETS.BGM_FAIL; 
        break;
      default: trackUrl = AUDIO_ASSETS.BGM_INTRO;
    }

    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.3;
    bgmRef.current = audio;

    // We don't autoplay on INTRO stage to respect browser interaction requirements.
    // The play() call in startSurvey() will trigger the first audio playback.
    if (stage !== GameStage.INTRO) {
      audio.play().catch(() => console.log("BGM autoplay postponed until interaction"));
    }

    return () => {
      audio.pause();
    };
  }, [stage, isMuted, stats]);

  const handleTimeUp = useCallback(() => {
    if (stage !== GameStage.RESULT && stage !== GameStage.INTRO) {
      alert("Hết thời gian! Vận mệnh đất nước đã trôi qua tầm tay. Hãy thử lại để đưa ra quyết sách kịp thời!");
      window.location.reload();
    }
  }, [stage]);

  const startSurvey = () => {
    playSFX(AUDIO_ASSETS.SFX_CLICK);
    setStage(GameStage.SURVEY);
    setIsTimerActive(true);
    // Crucial: Start BGM here as it follows a direct user interaction
    if (bgmRef.current) {
      bgmRef.current.play().catch(e => console.error("BGM Play Error:", e));
    }
  };

  const startCongress = () => {
    playSFX(AUDIO_ASSETS.SFX_CLICK);
    setStage(GameStage.CONGRESS);
  };

  const handleCongressComplete = (finalChoices: SessionOption[], finalStats: Stats) => {
    setChoices(finalChoices);
    setStats(finalStats);
    setStage(GameStage.RESOLUTION);
    setIsTimerActive(false);
    playSFX(AUDIO_ASSETS.SFX_PAPER);
  };

  const finishGame = () => {
    playSFX(AUDIO_ASSETS.SFX_CLICK);
    setStage(GameStage.RESULT);
  };

  return (
    <div className="relative min-h-screen bg-black font-sans text-gray-100 selection:bg-amber-500 selection:text-black transition-colors duration-1000">
      {/* Global Mute Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 right-6 z-[200] bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-full hover:bg-white/10 transition-all shadow-2xl active:scale-90"
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        <span className="text-2xl">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      {/* Visual Overlays */}
      {stage !== GameStage.RESULT && stage !== GameStage.INTRO && (
        <>
          <GlitchOverlay />
          <Timer initialSeconds={180} onTimeUp={handleTimeUp} isActive={isTimerActive} />
        </>
      )}

      {/* Game Stages Routing */}
      <main className="relative z-10">
        {stage === GameStage.INTRO && (
          <IntroScreen onStart={startSurvey} />
        )}

        {stage === GameStage.SURVEY && (
          <SurveyScreen 
            stats={stats} 
            onComplete={startCongress} 
            onSFX={playSFX} 
            sfxAssets={AUDIO_ASSETS} 
          />
        )}

        {stage === GameStage.CONGRESS && (
          <CongressScreen 
            stats={stats} 
            onComplete={handleCongressComplete} 
            onSFX={playSFX} 
            sfxAssets={AUDIO_ASSETS} 
          />
        )}

        {stage === GameStage.RESOLUTION && (
          <ResolutionScreen 
            choices={choices} 
            onFinish={finishGame} 
            onSFX={playSFX} 
            sfxAssets={AUDIO_ASSETS} 
          />
        )}

        {stage === GameStage.RESULT && (
          <ResultScreen stats={stats} />
        )}
      </main>

      {/* Immersive Branding UI */}
      <div className="fixed bottom-4 left-4 flex flex-col pointer-events-none z-[100] animate-fadeIn">
        <span className="text-[10px] uppercase tracking-[0.6em] opacity-30 text-white font-black drop-shadow-md">
          BÌNH MINH ĐỔI MỚI // v4.0
        </span>
        <span className="text-[8px] uppercase tracking-[0.2em] opacity-20 text-white italic">
          Mô phỏng lịch sử Đại hội VI (1986)
        </span>
      </div>
    </div>
  );
};

export default App;
