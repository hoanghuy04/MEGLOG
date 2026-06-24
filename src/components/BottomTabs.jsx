import React from 'react';
import { Sliders, Camera, User } from 'lucide-react';

export default function BottomTabs({ isLoggedIn, currentScreen, activeTab, navigateTo, startInspection }) {
  if (!isLoggedIn || currentScreen === 'camera' || currentScreen === 'edit-image' || currentScreen === 'report-detail') return null;

  // Only show the floating camera button on the home (Giám sát) screen
  const showCameraButton = currentScreen === 'home';

  const handleInspectClick = () => {
    startInspection();
  };

  return (
    <div className="h-16 bg-white border-t border-slate-200 flex justify-center flex-shrink-0 z-20 relative">
      <div className="w-full max-w-[360px] h-full flex items-center justify-around relative px-2">
        
        {/* Tab 1: Giám sát */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center w-20 h-full transition ${
            activeTab === 'giamsat' ? 'text-slate-950 border-t-2 border-slate-950' : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Giám sát</span>
        </button>

        {/* Center Spacer for Floating Button - Always rendered to keep layout position stable */}
        <div className="w-16 h-full flex items-center justify-center">
          {showCameraButton && (
            <button
              onClick={handleInspectClick}
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center border-4 border-slate-50 transition ready-glow z-30"
              title="Kiểm tra"
            >
              <Camera className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Tab 2: Cá nhân */}
        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center justify-center w-20 h-full transition ${
            activeTab === 'canhan' ? 'text-slate-950 border-t-2 border-slate-950' : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Cá nhân</span>
        </button>

      </div>
    </div>
  );
}
