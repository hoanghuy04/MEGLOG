import React from 'react';

export default function ProfileScreen({
  username,
  submittedReports,
  setActiveReportDetail,
  logout,
  navigateTo
}) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-bold text-slate-900 m-0">Hồ sơ cá nhân</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        
        {/* User info card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow">
            {username.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900">{username.toUpperCase()}</h3>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Mã giám định: INS-0042</span>
            <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-semibold inline-block mt-2">
              Giám định viên hiện trường
            </span>
          </div>
        </div>

        {/* Submitted history */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-left">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">LỊCH SỬ GIÁM ĐỊNH GẦN ĐÂY</h4>
          {submittedReports.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-xs">
              Chưa có báo cáo nào được nộp.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {submittedReports.map((rep, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveReportDetail(rep);
                    navigateTo('report-detail');
                  }}
                  className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
                >
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">{rep.id}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{rep.time}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    {rep.imagesCount} ảnh
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-650 text-xs font-bold rounded-lg transition border border-red-200"
        >
          ĐĂNG XUẤT
        </button>

      </div>
    </div>
  );
}
