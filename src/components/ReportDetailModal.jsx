import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ReportDetailModal({
  activeReportDetail,
  setActiveReportDetail,
  navigateTo
}) {
  if (!activeReportDetail) return null;

  const interiorList = activeReportDetail.interiorImages || 
    (activeReportDetail.interiorImage ? [activeReportDetail.interiorImage] : []);

  return (
    <div className="absolute inset-0 bg-white z-55 flex flex-col overflow-hidden text-left text-slate-805">
      
      {/* Header with Back button */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setActiveReportDetail(null);
              navigateTo('profile');
            }} 
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-650 transition"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-base font-bold text-slate-900 m-0">Chi tiết Báo cáo giám định</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        
        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 font-extrabold block uppercase tracking-wider">Số Container</span>
            <span className="text-sm font-black text-emerald-600 block mt-0.5">{activeReportDetail.id}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-extrabold block uppercase tracking-wider">Ngày giám định</span>
            <span className="text-xs text-slate-900 font-bold block mt-1">{activeReportDetail.details.inspectionDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-extrabold block uppercase tracking-wider">Hãng khai thác</span>
            <span className="text-xs text-slate-900 font-bold block mt-1">{activeReportDetail.details.shippingLine}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-extrabold block uppercase tracking-wider">Kích cỡ</span>
            <span className="text-xs text-slate-900 font-bold block mt-1">{activeReportDetail.details.size || 'Chưa chọn'}</span>
          </div>
        </div>

        {/* Technical Details Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">CHI TIẾT KỸ THUẬT</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-t border-slate-150 pt-2.5">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Hướng xuất/nhập:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.direction}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Số PinCode:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.pincode || 'Không có'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Năm sản xuất:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.productionYear || 'Chưa chọn'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Tình trạng vỏ:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.condition}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Phân loại:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.classification}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Phương án vệ sinh:</span>
              <span className="font-bold text-slate-900">{activeReportDetail.details.cleaningType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 col-span-2">
              <span className="text-slate-500">Tiền cược vỏ:</span>
              <span className="font-bold text-emerald-600">{activeReportDetail.details.depositFee}</span>
            </div>
            <div className="col-span-2 pt-1.5">
              <span className="text-slate-500 block mb-1">Ghi chú giám định:</span>
              <p className="bg-slate-50 p-2.5 rounded-lg text-slate-700 border border-slate-200 text-xs leading-relaxed">
                {activeReportDetail.details.notes || 'Không có ghi chú thêm.'}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            ẢNH CHỤP GIÁM ĐỊNH ({activeReportDetail.imagesCount} ảnh)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 border-t border-slate-150 pt-2.5">
            {activeReportDetail.exteriorImages.map((img, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col">
                <div className="aspect-[4/3] bg-slate-100 flex-1">
                  {img ? (
                    <img src={img} alt={`Góc ${idx + 1}`} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                      Trống
                    </div>
                  )}
                </div>
                <div className="p-1.5 bg-slate-50 text-center text-[9px] font-bold text-slate-600 border-t border-slate-200">
                  Góc {idx + 1}
                </div>
              </div>
            ))}

            {interiorList.map((img, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col">
                <div className="aspect-[4/3] bg-slate-100 flex-1">
                  <img src={img} alt={`Nội thất ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
                <div className="p-1.5 bg-slate-50 text-center text-[9px] font-bold text-slate-600 border-t border-slate-200">
                  Nội thất {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút Về Trang Chủ */}
        <div className="pt-6 pb-4">
          <button
            onClick={() => {
              setActiveReportDetail(null);
              navigateTo('home');
            }}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 uppercase shadow-sm"
          >
            Về Trang Chủ
          </button>
        </div>

      </div>

    </div>
  );
}

