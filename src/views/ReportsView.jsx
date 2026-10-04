import React from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Layers,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function ReportsView() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Báo Cáo Quản Trị & Bản Tóm Tắt Quyết Định
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Báo cáo định kỳ dành cho Ban Điều Hành, Hội Đồng Quản Trị và các Giám đốc Khối.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Báo Cáo CEO (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {[
          { title: 'Báo Cáo Sức Cạnh Tranh & Biên Lợi Nhuận Q3', date: '04/10/2026', type: 'PDF / Excel', status: 'SẴN SÀNG', desc: 'Đánh giá 7 SKU chủ lực, phân tích biến động giá Sunhouse/Kalite và đề xuất Thang Giá Q4.' },
          { title: 'Báo Cáo Thẩm Định 12 Mẫu Sản Phẩm Mới Canton Fair', date: '01/10/2026', type: 'Excel Master', status: 'SẴN SÀNG', desc: 'Bảng chấm điểm POS, tính toán FOB, True Cost và khuyến nghị quyết định nhập 3 mẫu tiềm năng nhất.' },
          { title: 'Báo Cáo Kiểm Soát Tồn Kho & Chiến Lược Combo', date: '28/09/2026', type: 'PDF', status: 'SẴN SÀNG', desc: 'Phân tích SKU LK-990 tồn kho 8.9 tháng và kế hoạch đóng gói combo thu hồi 1.15 tỷ VND vốn lưu động.' },
        ].map((rep, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-rose-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                  {rep.status}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{rep.date}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">{rep.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rep.desc}</p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{rep.type}</span>
              <button className="text-rose-600 font-bold hover:underline flex items-center gap-1">
                Tải về <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
