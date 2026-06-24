import React from 'react';
import { Camera, CameraOff, Maximize2, Play } from 'lucide-react';

export default function MonitorScreen({
  cameras,
  selectedCam,
  setSelectedCam,
  setCamGridAllOpen,
  CONTAINER_IMAGES,
  startInspection
}) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 m-0">Giám sát Hiện trường</h2>
          <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">
            CỔNG ĐẦU VÀO VÀ BÃI CHỨA
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        
        {/* Live Cam Title */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              CAMERA ĐANG XEM: CAM 0{selectedCam}
            </h3>
          </div>
        </div>

        {/* Live Cam Display Window */}
        <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-250 shadow-inner relative flex-shrink-0">
          {cameras[selectedCam - 1]?.status === 'offline' ? (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-400">
              <CameraOff className="w-10 h-10 text-slate-600 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Camera Mất Kết Nối</span>
            </div>
          ) : (
            <>
              <img
                src={cameras[selectedCam - 1]?.url || CONTAINER_IMAGES.main}
                alt="Live Cam Stream"
                className="w-full h-full object-cover opacity-85"
              />
              
              <div className="absolute top-3 left-3 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-slate-300 flex items-center gap-2 border border-slate-800">
                <span>ISO 400</span>
                <span className="text-slate-600">|</span>
                <span>f/2.8</span>
                <span className="text-slate-600">|</span>
                <span>60 FPS</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-red-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse border border-red-750">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>REC</span>
              </div>
            </>
          )}
        </div>

        {/* Lưới Camera */}
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              HỆ THỐNG CAMERA ({cameras.length})
            </h4>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {cameras.map((cam) => {
              const isActive = selectedCam === cam.id;
              const isFault = cam.status === 'fault';
              const isOffline = cam.status === 'offline';
              
              return (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCam(cam.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition flex flex-col items-center justify-center bg-slate-900 group ${
                    isActive
                      ? 'border-emerald-500 ring-2 ring-emerald-500/25'
                      : isFault
                        ? 'border-red-500'
                        : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {isOffline ? (
                    <div className="flex flex-col items-center justify-center">
                      <CameraOff className="w-4 h-4 text-slate-500" />
                    </div>
                  ) : isFault ? (
                    <div className="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center p-1 text-center text-white">
                      <span className="text-[8px] font-bold uppercase tracking-wider">FAULT</span>
                    </div>
                  ) : (
                    <>
                      <img src={cam.url || CONTAINER_IMAGES.main} alt={cam.name} className="w-full h-full object-cover opacity-60" />
                      {isActive && (
                        <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                          <span className="bg-emerald-500 text-slate-950 font-black text-[7px] px-1 py-0.2 rounded">
                            ACTIVE
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  <div className="absolute bottom-0.5 left-1 bg-slate-950/85 px-1 py-0.1 rounded text-[7px] font-mono text-slate-300">
                    {cam.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bảng trạng thái nhanh */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-left">
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Danh sách container cần bổ sung ảnh
            </h4>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <th className="px-3 py-2">THỜI GIAN</th>
                <th className="px-3 py-2">TRẠNG THÁI</th>
                <th className="px-3 py-2 text-right">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr className="hover:bg-slate-50">
                <td className="px-3 py-2.5 font-bold font-mono text-slate-900">
                  {(() => {
                    const d = new Date();
                    const dd = String(d.getDate()).padStart(2, '0');
                    const MM = String(d.getMonth() + 1).padStart(2, '0');
                    const HH = String(d.getHours()).padStart(2, '0');
                    const mm = String(d.getMinutes()).padStart(2, '0');
                    return `${dd}-${MM} ${HH}:${mm}`;
                  })()}
                </td>
                <td className="px-3 py-2.5">
                  <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">ĐANG CHỜ</span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button 
                    onClick={startInspection}
                    className="inline-flex items-center justify-center p-1 bg-emerald-500 hover:bg-emerald-600 rounded-full text-slate-950 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-slate-950" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-3 py-2.5 font-bold font-mono text-slate-900">
                  {(() => {
                    const d = new Date();
                    d.setMinutes(d.getMinutes() - 5);
                    const dd = String(d.getDate()).padStart(2, '0');
                    const MM = String(d.getMonth() + 1).padStart(2, '0');
                    const HH = String(d.getHours()).padStart(2, '0');
                    const mm = String(d.getMinutes()).padStart(2, '0');
                    return `${dd}-${MM} ${HH}:${mm}`;
                  })()}
                </td>
                <td className="px-3 py-2.5">
                  <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">ĐANG CHỜ</span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button 
                    onClick={startInspection}
                    className="inline-flex items-center justify-center p-1 bg-emerald-500 hover:bg-emerald-600 rounded-full text-slate-950 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-slate-950" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
