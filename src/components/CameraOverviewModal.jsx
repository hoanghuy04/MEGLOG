import React from 'react';
import { CameraOff } from 'lucide-react';

export default function CameraOverviewModal({
  camGridAllOpen,
  setCamGridAllOpen,
  cameras,
  getCameraStatusBadge,
  CONTAINER_IMAGES
}) {
  if (!camGridAllOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-2xl w-full text-slate-100 text-left">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">Hệ thống Camera Bến Bãi</h3>
            <p className="text-xs text-slate-400">Xem trực tiếp feed 10 camera giám định</p>
          </div>
          <button
            onClick={() => setCamGridAllOpen(false)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
          >
            Đóng
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[350px] overflow-y-auto pr-1">
          {cameras.map((cam) => (
            <div key={cam.id} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-850 flex flex-col">
              <div className="aspect-video relative bg-slate-950 flex items-center justify-center">
                {cam.status === 'offline' ? (
                  <CameraOff className="w-6 h-6 text-slate-700" />
                ) : (
                  <img src={cam.url || CONTAINER_IMAGES.main} alt={cam.name} className="w-full h-full object-contain" />
                )}
              </div>
              <div className="p-1.5 flex items-center justify-between bg-slate-900">
                <span className="text-[10px] font-bold font-mono">{cam.name}</span>
                {getCameraStatusBadge(cam.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

