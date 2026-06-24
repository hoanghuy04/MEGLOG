import React from 'react';
import { ArrowLeft, Camera, Edit } from 'lucide-react';

export default function Step1Screen({
  exteriorImages,
  setExteriorImages,
  interiorImages = [],
  setInteriorImages,
  setCapturingSlotIndex,
  navigateTo,
  getAngleLabel,
  CONTAINER_IMAGES,
  setEditingImage
}) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('home')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900 m-0">Kiểm tra Container</h2>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
          Bước 1/2
        </span>
      </div>

      {/* Stepper */}
      <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</div>
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase">HÌNH ẢNH GIÁM ĐỊNH</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-300"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">2</div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">THÔNG TIN CONTAINER</span>
          </div>
        </div>
      </div>

      {/* Grid image slots */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-4">

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">GÓC NGOÀI (10 ảnh ngoại thất)</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array(10).fill(null).map((_, index) => {
              const imgUrl = exteriorImages[index];
              return (
                <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm relative">
                  <div
                    onClick={() => {
                      if (imgUrl) {
                        setEditingImage({ slot: index, url: imgUrl, type: 'exterior', label: getAngleLabel(index) });
                        navigateTo('edit-image');
                      } else {
                        setCapturingSlotIndex(index);
                        navigateTo('camera');
                      }
                    }}
                    className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative cursor-pointer group overflow-hidden"
                  >
                    {imgUrl ? (
                      <>
                        <img src={imgUrl} alt={`Góc ${index + 1}`} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
                        <div className="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wide">
                          ĐÃ CHỤP
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Camera className="w-7 h-7 text-slate-400 mb-1" />
                        <span className="text-[10px] text-slate-400 font-medium font-sans">Chưa chụp</span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imgUrl) {
                          setEditingImage({ slot: index, url: imgUrl, type: 'exterior', label: getAngleLabel(index) });
                          navigateTo('edit-image');
                        } else {
                          setCapturingSlotIndex(index);
                          navigateTo('camera');
                        }
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white rounded-lg transition"
                    >
                      <Edit className="w-3 h-3 text-slate-100" />
                    </button>
                  </div>
                  <div className="py-1.5 px-3 bg-slate-50 border-t border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      {getAngleLabel(index)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ảnh bên trong */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
            ẢNH BÊN TRONG (Nội thất)
          </h3>

          {interiorImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {/* Captured list */}
              {interiorImages.map((imgUrl, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm relative">
                  <div
                    onClick={() => {
                      setEditingImage({ slot: `interior-${idx}`, url: imgUrl, type: 'interior', label: `Nội thất ${idx + 1}` });
                      navigateTo('edit-image');
                    }}
                    className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden cursor-pointer"
                  >
                    <img src={imgUrl} alt={`Interior ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = interiorImages.filter((_, i) => i !== idx);
                        setInteriorImages(updated);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-650 bg-red-600 text-white rounded hover:bg-red-700 text-[9px] font-bold px-1.5 py-0.5 z-10"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingImage({ slot: `interior-${idx}`, url: imgUrl, type: 'interior', label: `Nội thất ${idx + 1}` });
                        navigateTo('edit-image');
                      }}
                      className="absolute top-2 left-2 p-1.5 bg-slate-900/80 text-white rounded-lg hover:bg-slate-950 transition border border-slate-700 z-10"
                    >
                      <Edit className="w-3 h-3 text-slate-100" />
                    </button>
                  </div>
                  <div className="py-1.5 px-3 bg-slate-50 border-t border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      NỘI THẤT {idx + 1}
                    </span>
                  </div>
                </div>
              ))}

              {/* Add more button */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm relative">
                <button
                  onClick={() => {
                    setCapturingSlotIndex('interior-new');
                    navigateTo('camera');
                  }}
                  className="aspect-[4/3] w-full border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 flex flex-col items-center justify-center p-2 transition group"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-200 group-hover:bg-emerald-50 flex items-center justify-center transition">
                    <Camera className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 group-hover:text-emerald-700 mt-1.5 uppercase text-center leading-none">Chụp thêm</span>
                </button>
                <div className="py-1.5 px-3 bg-slate-50 border-t border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    CHỤP NỘI THẤT
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setCapturingSlotIndex('interior-new');
                navigateTo('camera');
              }}
              className="w-full aspect-[16/9] border-2 border-dashed border-slate-350 hover:border-emerald-500 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-4 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-emerald-50 flex items-center justify-center transition">
                <Camera className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 mt-2">CHỤP ẢNH BÊN TRONG</span>
              <span className="text-[10px] text-slate-400 mt-1">Ấn để chụp hoặc tải lên ảnh nội thất</span>
            </button>
          )}

          {/* Nút Tiếp Tục ở cuối danh sách cuộn */}
          <div className="pt-4 pb-8">
            <button
              onClick={() => navigateTo('step2')}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 uppercase shadow-sm"
            >
              <span>TIẾP TỤC</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
