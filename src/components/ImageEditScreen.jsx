import React, { useState, useRef } from 'react';
import { ArrowLeft, MoreVertical, RotateCw, Play, Upload, Save, FlipHorizontal } from 'lucide-react';

export default function ImageEditScreen({
  editingImageUrl,
  onSave,
  onBack,
  onRetake,
  slotLabel
}) {
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [aspectRatio, setAspectRatio] = useState('GỐC'); // GỐC, 1:1, 4:3, 16:9
  const [isFlipped, setIsFlipped] = useState(false);

  // Crop box state as percentages from the edges
  const [crop, setCrop] = useState({
    top: 8,
    bottom: 8,
    left: 8,
    right: 8
  });

  const viewportRef = useRef(null);

  // Set crop presets
  const handleRatioChange = (ratio) => {
    setAspectRatio(ratio);
    switch (ratio) {
      case '1:1':
        setCrop({ top: 10, bottom: 10, left: 22, right: 22 });
        break;
      case '4:3':
        setCrop({ top: 12, bottom: 12, left: 10, right: 10 });
        break;
      case '16:9':
        setCrop({ top: 22, bottom: 22, left: 5, right: 5 });
        break;
      case 'GỐC':
      default:
        setCrop({ top: 8, bottom: 8, left: 8, right: 8 });
        break;
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Drag handler for crop box corners/edges
  const handleDragStart = (e, handleType) => {
    e.preventDefault();
    if (!viewportRef.current) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = viewportRef.current.getBoundingClientRect();
    const startCrop = { ...crop };

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Convert pixel delta to percentage of viewport dimensions
      const deltaXPercent = (deltaX / rect.width) * 100;
      const deltaYPercent = (deltaY / rect.height) * 100;

      setCrop((prev) => {
        let nextTop = startCrop.top;
        let nextBottom = startCrop.bottom;
        let nextLeft = startCrop.left;
        let nextRight = startCrop.right;

        const minSize = 15; // Min width/height percentage

        if (handleType.includes('n')) {
          nextTop = Math.max(0, Math.min(100 - startCrop.bottom - minSize, startCrop.top + deltaYPercent));
        }
        if (handleType.includes('s')) {
          nextBottom = Math.max(0, Math.min(100 - startCrop.top - minSize, startCrop.bottom - deltaYPercent));
        }
        if (handleType.includes('w')) {
          nextLeft = Math.max(0, Math.min(100 - startCrop.right - minSize, startCrop.left + deltaXPercent));
        }
        if (handleType.includes('e')) {
          nextRight = Math.max(0, Math.min(100 - startCrop.left - minSize, startCrop.right - deltaXPercent));
        }

        return {
          top: Number(nextTop.toFixed(1)),
          bottom: Number(nextBottom.toFixed(1)),
          left: Number(nextLeft.toFixed(1)),
          right: Number(nextRight.toFixed(1))
        };
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch event drag handler for mobile/tablet devices
  const handleTouchStart = (e, handleType) => {
    if (!viewportRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const rect = viewportRef.current.getBoundingClientRect();
    const startCrop = { ...crop };

    const handleTouchMove = (moveEvent) => {
      if (moveEvent.touches.length === 0) return;
      const currentTouch = moveEvent.touches[0];
      const deltaX = currentTouch.clientX - startX;
      const deltaY = currentTouch.clientY - startY;

      const deltaXPercent = (deltaX / rect.width) * 100;
      const deltaYPercent = (deltaY / rect.height) * 100;

      setCrop((prev) => {
        let nextTop = startCrop.top;
        let nextBottom = startCrop.bottom;
        let nextLeft = startCrop.left;
        let nextRight = startCrop.right;

        const minSize = 15;

        if (handleType.includes('n')) {
          nextTop = Math.max(0, Math.min(100 - startCrop.bottom - minSize, startCrop.top + deltaYPercent));
        }
        if (handleType.includes('s')) {
          nextBottom = Math.max(0, Math.min(100 - startCrop.top - minSize, startCrop.bottom - deltaYPercent));
        }
        if (handleType.includes('w')) {
          nextLeft = Math.max(0, Math.min(100 - startCrop.right - minSize, startCrop.left + deltaXPercent));
        }
        if (handleType.includes('e')) {
          nextRight = Math.max(0, Math.min(100 - startCrop.left - minSize, startCrop.right - deltaXPercent));
        }

        return {
          top: Number(nextTop.toFixed(1)),
          bottom: Number(nextBottom.toFixed(1)),
          left: Number(nextLeft.toFixed(1)),
          right: Number(nextRight.toFixed(1))
        };
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleUploadMock = () => {
    alert("Đã kích hoạt tải lên ảnh mới từ thiết bị!");
  };

  const handleExtractFromVideoMock = () => {
    alert("Đang trích xuất ảnh chất lượng cao từ luồng video camera...");
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden text-slate-800 select-none">
      
      {/* HEADER */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-900 m-0">Chỉnh sửa hình ảnh</h2>
            {slotLabel && <span className="text-[10px] text-slate-500 font-bold block -mt-0.5 uppercase tracking-wide">{slotLabel}</span>}
          </div>
        </div>
        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">
        
        {/* IMAGE VIEWPORT WITH CROP GRID */}
        <div 
          ref={viewportRef}
          className="relative w-full aspect-[4/3] max-w-md mx-auto bg-slate-950 rounded-xl overflow-hidden shadow-md flex items-center justify-center select-none"
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            <img 
              src={editingImageUrl} 
              alt="Editing preview" 
              className="w-full h-full object-cover transition-transform duration-200"
              style={{
                transform: `rotate(${rotation}deg) scaleX(${isFlipped ? -1 : 1})`,
                maxHeight: '100%',
                maxWidth: '100%'
              }}
            />
          </div>

          {/* CROP GREEN BOX OVERLAY */}
          <div 
            className="absolute border-2 border-emerald-500 transition-all duration-75 select-none"
            style={{
              top: `${crop.top}%`,
              bottom: `${crop.bottom}%`,
              left: `${crop.left}%`,
              right: `${crop.right}%`,
            }}
          >
            {/* Rules of third grid lines */}
            <div className="absolute inset-0 grid grid-cols-3 divide-x divide-emerald-500/40 pointer-events-none">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="absolute inset-0 grid grid-rows-3 divide-y divide-emerald-500/40 pointer-events-none">
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* CORNER HANDLES */}
            <div 
              onMouseDown={(e) => handleDragStart(e, 'nw')}
              onTouchStart={(e) => handleTouchStart(e, 'nw')}
              className="absolute -top-2.5 -left-2.5 w-6 h-6 cursor-nwse-resize pointer-events-auto flex items-center justify-center group z-10"
            >
              <div className="w-4.5 h-4.5 border-t-[3px] border-l-[3px] border-emerald-500 active:border-emerald-300"></div>
            </div>

            <div 
              onMouseDown={(e) => handleDragStart(e, 'ne')}
              onTouchStart={(e) => handleTouchStart(e, 'ne')}
              className="absolute -top-2.5 -right-2.5 w-6 h-6 cursor-nesw-resize pointer-events-auto flex items-center justify-center group z-10"
            >
              <div className="w-4.5 h-4.5 border-t-[3px] border-r-[3px] border-emerald-500 active:border-emerald-300"></div>
            </div>

            <div 
              onMouseDown={(e) => handleDragStart(e, 'sw')}
              onTouchStart={(e) => handleTouchStart(e, 'sw')}
              className="absolute -bottom-2.5 -left-2.5 w-6 h-6 cursor-nesw-resize pointer-events-auto flex items-center justify-center group z-10"
            >
              <div className="w-4.5 h-4.5 border-b-[3px] border-l-[3px] border-emerald-500 active:border-emerald-300"></div>
            </div>

            <div 
              onMouseDown={(e) => handleDragStart(e, 'se')}
              onTouchStart={(e) => handleTouchStart(e, 'se')}
              className="absolute -bottom-2.5 -right-2.5 w-6 h-6 cursor-nwse-resize pointer-events-auto flex items-center justify-center group z-10"
            >
              <div className="w-4.5 h-4.5 border-b-[3px] border-r-[3px] border-emerald-500 active:border-emerald-300"></div>
            </div>

            {/* EDGE DRAG ZONES */}
            <div 
              onMouseDown={(e) => handleDragStart(e, 'n')}
              onTouchStart={(e) => handleTouchStart(e, 'n')}
              className="absolute -top-2 left-4 right-4 h-4 cursor-ns-resize pointer-events-auto z-10"
            ></div>
            <div 
              onMouseDown={(e) => handleDragStart(e, 's')}
              onTouchStart={(e) => handleTouchStart(e, 's')}
              className="absolute -bottom-2 left-4 right-4 h-4 cursor-ns-resize pointer-events-auto z-10"
            ></div>
            <div 
              onMouseDown={(e) => handleDragStart(e, 'w')}
              onTouchStart={(e) => handleTouchStart(e, 'w')}
              className="absolute -left-2 top-4 bottom-4 w-4 cursor-ew-resize pointer-events-auto z-10"
            ></div>
            <div 
              onMouseDown={(e) => handleDragStart(e, 'e')}
              onTouchStart={(e) => handleTouchStart(e, 'e')}
              className="absolute -right-2 top-4 bottom-4 w-4 cursor-ew-resize pointer-events-auto z-10"
            ></div>
          </div>
        </div>

        {/* 3 ACTION BUTTONS (CHỤP LẠI, TẢI LÊN, LẤY TỪ VIDEO) */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={onRetake}
            className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition text-slate-700 shadow-sm"
          >
            <div className="p-2 bg-slate-50 text-slate-800 rounded-lg">
              <RotateCw className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Chụp lại</span>
          </button>

          <button 
            onClick={handleUploadMock}
            className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition text-slate-700 shadow-sm"
          >
            <div className="p-2 bg-slate-50 text-slate-800 rounded-lg">
              <Upload className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Tải lên</span>
          </button>

          <button 
            onClick={handleExtractFromVideoMock}
            className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition text-slate-700 shadow-sm"
          >
            <div className="p-2 bg-slate-50 text-slate-800 rounded-lg">
              <Play className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Lấy từ video</span>
          </button>
        </div>

        {/* EDITING TOOLS ROW */}
        <div className="space-y-2 text-left">
          <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            Công cụ chỉnh sửa
          </h4>
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleRotate}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition"
                title="Xoay 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleFlip}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition"
                title="Lập ảnh"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            {/* Ratio selection */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['GỐC', '1:1', '4:3', '16:9'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => handleRatioChange(ratio)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide transition border ${
                    aspectRatio === ratio
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* SAVE ACTION BUTTON */}
      <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0 z-10">
        <button
          onClick={() => onSave({ rotation, isFlipped, aspectRatio, crop })}
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm tracking-wider rounded-lg transition flex items-center justify-center gap-2 uppercase shadow-md"
        >
          <Save className="w-5 h-5 text-slate-950" />
          <span>Lưu hình ảnh</span>
        </button>
      </div>

    </div>
  );
}
