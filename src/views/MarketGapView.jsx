import React, { useState } from 'react';
import {
  PieChart,
  Sparkles,
  TrendingUp,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { mockMarketGaps, mockProducts } from '../data/mockData';

export default function MarketGapView({ onNavigateNewProduct }) {
  const [selectedGap, setSelectedGap] = useState(mockMarketGaps[4]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Khoảng Trống Thị Trường & Đại Dương Xanh (Market Gap)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Phân bổ toàn bộ thị trường gia dụng thành 6 dải giá chiến lược để tìm ra "Đại Dương Xanh" nơi nhu cầu cao nhưng ít đối thủ cạnh tranh.
          </p>
        </div>

        <button
          onClick={onNavigateNewProduct}
          className="px-3.5 sm:px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>Khai Thác Khoảng Trống Mới</span>
        </button>
      </div>

      {/* 6 Tiers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {mockMarketGaps.map((gap, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedGap(gap)}
            className={`p-3 sm:p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedGap.range === gap.range
                ? 'bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-black text-xs sm:text-sm text-slate-900">{gap.range}</span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  gap.opportunityScore >= 90 ? 'bg-emerald-100 text-emerald-800' :
                  gap.opportunityScore >= 75 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  POS {gap.opportunityScore}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mb-2">
                {gap.totalProducts} Sản phẩm ({gap.lkProducts} LK)
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full block text-center truncate ${gap.competitionBadge}`}>
                {gap.competitionLevel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Gap Selected Section */}
      {selectedGap && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                Phân Tích Chi Tiết Dải Giá
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
                Dải Giá {selectedGap.range} — {selectedGap.whiteSpaceOpportunity}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Biên Lãi Kỳ Vọng</div>
                <div className="text-base sm:text-lg font-black text-emerald-600">{selectedGap.avgMargin}</div>
              </div>
              <div className="text-right pl-3 border-l border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Sức Mua Thị Trường</div>
                <div className="text-base sm:text-lg font-black text-slate-900">{selectedGap.marketDemand}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5 bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-rose-600" />
                Đánh Giá Tiềm Năng & Cơ Hội
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedGap.insight}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <div>• Tổng sản phẩm toàn thị trường: <strong className="text-slate-900">{selectedGap.totalProducts} SKU</strong></div>
                <div>• Lock&King hiện diện: <strong className="text-slate-900">{selectedGap.lkProducts} SKU</strong></div>
                <div>• Mức độ cạnh tranh: <strong className="text-slate-900">{selectedGap.competitionLevel}</strong></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 sm:p-5 rounded-xl space-y-2.5">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
                <Sparkles className="w-4 h-4" />
                <span>LỜI KHUYÊN CHIẾN LƯỢC TỪ AI</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedGap.opportunityScore >= 85
                  ? 'Đây là vùng giá VÀNG (Sweet Spot). Khách hàng có xu hướng nâng cấp từ phân khúc giá rẻ lên phân khúc trung-cao cấp. Lock&King nên đẩy mạnh các sản phẩm có công nghệ Titanium, IH hoặc Rapid Air để độc chiếm dải này.'
                  : 'Phân khúc này chịu áp lực cạnh tranh khốc liệt về giá từ các thương hiệu OEM giá rẻ. Không nên tung thêm sản phẩm cơ bản vào đây nếu không có USP cực kỳ khác biệt.'}
              </p>
              <button
                onClick={onNavigateNewProduct}
                className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 pt-1"
              >
                Tạo đề xuất SKU mới cho phân khúc này →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
