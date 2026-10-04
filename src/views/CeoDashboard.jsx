import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Boxes,
  Zap,
  DollarSign,
  Layers,
  ChevronRight,
  BarChart3,
  Flame,
  Clock,
  ExternalLink
} from 'lucide-react';
import { mockProducts, mockPriceWarAlerts, mockMarketGaps } from '../data/mockData';
import { formatVND, formatPercent } from '../utils/pricingEngine';

export default function CeoDashboard({ onSelectProduct, onNavigate }) {
  const [selectedDecisionFilter, setSelectedDecisionFilter] = useState('TẤT CẢ');

  // Executive KPI Aggregations
  const totalLkSku = mockProducts.length;
  const totalCompetitorSku = 680;
  const avgPcs = Math.round(mockProducts.reduce((acc, p) => acc + p.pcs, 0) / totalLkSku);
  const highCompSkus = mockProducts.filter(p => p.pcs >= 80).length;
  const highPriceSkus = mockProducts.filter(p => p.priceIndex > 105).length;
  const lowMarginSkus = mockProducts.filter(p => p.grossMargin < 0.25).length;
  const priceHikeOpportunities = mockProducts.filter(p => p.pcs >= 85 && p.priceIndex < 98).length;
  const riskStockSkus = mockProducts.filter(p => p.stockCoverageMonths > 6).length;
  const activePriceWars = mockPriceWarAlerts.filter(w => w.status === 'CHIẾN_TRANH_GIÁ_ĐANG_DIỄN_RA').length;
  const avgGrossMargin = (mockProducts.reduce((acc, p) => acc + p.grossMargin, 0) / totalLkSku * 100).toFixed(1);
  const avgNetMargin = (mockProducts.reduce((acc, p) => acc + p.netMargin, 0) / totalLkSku * 100).toFixed(1);

  // Today's Decision Items (100% Tiếng Việt)
  const todaysDecisions = [
    {
      id: 'DEC-01',
      sku: 'LK-8418',
      productName: 'Nồi cơm điện cao tần Titanium 1.8L IH',
      condition: 'Giá cao hơn trung bình thị trường 4.1% (Price Index 104.1)',
      proposal: 'Đề xuất Target Price: 1.790.000 đ (Giữ giá) + Tặng kèm muỗng Inox thay vì giảm giá',
      rationale: 'Lợi thế độc quyền lòng nồi Titanium dày 3.5mm & bảo hành 24 tháng. Khách hàng sẵn sàng chi thêm tiền cho công nghệ cao.',
      impact: 'Bảo vệ biên lợi nhuận 37.4% (~400 triệu VND lãi gộp/quý)',
      actionType: 'KEEP_PRICE_GIFT',
      badge: 'Bảo Vệ Lợi Nhuận',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'DEC-02',
      sku: 'LK-3118',
      productName: 'Nồi chiên không dầu Rapid Air 6.5L Turbo',
      condition: 'Giá thấp hơn thị trường 7.2% và điểm PCS đạt 89/100 (RẤT MẠNH)',
      proposal: 'Đề xuất tăng giá bán lẻ thêm 4.6% lên 1.350.000 đ',
      rationale: 'Tồn kho chỉ còn 1.4 tháng, sản phẩm hero bán chạy nhất, tăng giá không làm giảm sản lượng.',
      impact: '+45 triệu VND lợi nhuận/tháng & cân đối tốc độ ra hàng',
      actionType: 'PRICE_HIKE',
      badge: 'Tăng Giá +3-5%',
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'DEC-03',
      sku: 'NEW-028',
      productName: 'Nồi lẩu nướng đa năng Ceramic 2 ngăn thế hệ mới',
      condition: 'Điểm POS đạt 88/100 (RẤT NÊN NHẬP) - Mẫu Canton Fair',
      proposal: 'PHÊ DUYỆT ĐẶT HÀNG LÔ ĐẦU 2.000 CÁI (FOB $13.5, Giá bán 790.000 đ)',
      rationale: 'Khoảng trống giá 690K-850K chưa có đối thủ có lớp Ceramic màu Pastel.',
      impact: 'Doanh thu dự kiến 1.5 tỷ VND / 60 ngày đầu',
      actionType: 'APPROVE_IMPORT',
      badge: 'NÊN NHẬP NGAY',
      badgeColor: 'bg-rose-600 text-white font-bold'
    },
    {
      id: 'DEC-04',
      sku: 'LK-990',
      productName: 'Máy hút mùi chữ T Smart Sensor 70cm',
      condition: 'Tồn kho 8.9 tháng (> 6 tháng ngưỡng rủi ro) - Điểm PCS 58/100',
      proposal: 'DỪNG NHẬP MỚI & CHẠY COMBO VỚI BẾP TỪ LK-4420',
      rationale: 'Chi phí lưu kho cao, bán chậm (54 cái/tháng). Cần giải phóng 350 cái trong 60 ngày.',
      impact: 'Thu hồi vốn lưu động 1.15 tỷ VND',
      actionType: 'CLEAR_STOCK',
      badge: 'DỪNG NHẬP / XẢ KHO',
      badgeColor: 'bg-orange-100 text-orange-800 font-bold'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* CEO Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-rose-600/10 to-transparent pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-rose-600 text-white uppercase tracking-wider">
                TRUNG TÂM ĐIỀU HÀNH CEO
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Cập nhật lúc: 02:30 • 10 Đối thủ • 1.450 SKU
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Bảng Điều Hành Chiến Lược Giá & Sản Phẩm
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Dữ liệu được chuyển hóa trực tiếp thành quyết định hành động: <strong>Dữ liệu $\rightarrow$ Thấu hiểu $\rightarrow$ Khuyến nghị $\rightarrow$ Quyết định</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('new-product')}
              className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Thẩm Định SKU Mới</span>
            </button>
            <button
              onClick={() => onNavigate('what-if-simulator')}
              className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-rose-400" />
              <span>Mô Phỏng Giá</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive KPI Grid (Mobile 2 cols, Desktop 6 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Tổng SKU Lock&King
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{totalLkSku}</span>
            <span className="text-[10px] text-slate-400 font-medium">/ 680 Đối thủ</span>
          </div>
          <div className="mt-1.5 text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +2 SKU quý này
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Điểm PCS Trung Bình
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-emerald-600">{avgPcs}<span className="text-xs font-semibold">/100</span></span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold">RẤT TỐT</span>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-500 truncate">
            {highCompSkus} SKU cạnh tranh tốt
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Biên Lãi Gộp TB (Gross)
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{avgGrossMargin}%</span>
            <span className="text-[9px] text-slate-400 font-mono">Net {avgNetMargin}%</span>
          </div>
          <div className="mt-1.5 text-[10px] text-emerald-600 font-bold">
            Đạt mục tiêu {'>'} 35%
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Cơ Hội Tăng Giá
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-teal-600">{priceHikeOpportunities} <span className="text-xs font-normal text-slate-500">SKU</span></span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-50 text-teal-700 font-bold">+3-5%</span>
          </div>
          <div className="mt-1.5 text-[10px] text-teal-600 font-medium truncate">
            LK-3118 bán rất mạnh
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Tồn Kho Rủi Ro
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-rose-600">{riskStockSkus} <span className="text-xs font-normal text-slate-500">SKU</span></span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-bold">{'>'}6 tháng</span>
          </div>
          <div className="mt-1.5 text-[10px] text-rose-600 font-medium truncate">
            LK-990 cần xả kho
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
            Chiến Tranh Giá
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-amber-600">{activePriceWars} <span className="text-xs font-normal text-slate-500">nhóm</span></span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold">CẢNH BÁO</span>
          </div>
          <div className="mt-1.5 text-[10px] text-amber-600 font-medium truncate">
            Nồi chiên không dầu
          </div>
        </div>
      </div>

      {/* TODAY'S DECISIONS SECTION */}
      <div className="bg-white rounded-2xl border-2 border-rose-500/30 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black shadow-md shadow-rose-600/30 flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                QUYẾT ĐỊNH HÔM NAY (TODAY'S DECISIONS)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                4 Đề xuất hành động kinh doanh quan trọng nhất cần CEO phê duyệt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['TẤT CẢ', 'GIÁ BÁN', 'NHẬP HÀNG', 'TỒN KHO'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedDecisionFilter(filter)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDecisionFilter === filter
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Decisions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {todaysDecisions.map((decision) => (
            <div
              key={decision.id}
              className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-300"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-900 text-white">
                      {decision.sku}
                    </span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {decision.productName}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase whitespace-nowrap ${decision.badgeColor}`}>
                    {decision.badge}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 mb-2 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0"></span>
                  <span><strong className="text-slate-700">Hiện trạng:</strong> {decision.condition}</span>
                </div>

                <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/80 mb-2">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 text-rose-600 mb-1">
                    💡 {decision.proposal}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {decision.rationale}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-200/60 mt-1 gap-2">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  📈 Tác động: {decision.impact}
                </span>
                <button
                  onClick={() => {
                    if (decision.sku.startsWith('NEW')) {
                      onNavigate('new-product');
                    } else {
                      const prod = mockProducts.find(p => p.sku === decision.sku);
                      if (prod) onSelectProduct(prod);
                      else onNavigate('product-center');
                    }
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center justify-end gap-1 hover:underline"
                >
                  Thực thi ngay →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns on Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Price War Radar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Bộ Dò Chiến Tranh Giá
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Phát hiện áp lực giảm giá từ đối thủ</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('price-war')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700"
            >
              Chi tiết →
            </button>
          </div>

          <div className="space-y-3">
            {mockPriceWarAlerts.map((war) => (
              <div key={war.id} className="p-3 sm:p-3.5 bg-rose-50/60 rounded-xl border border-rose-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-900">{war.category}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                    MỨC ĐỘ {war.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-2">{war.triggerSummary}</p>
                <div className="bg-white p-2 rounded-lg border border-rose-100 text-[11px] text-slate-600 mb-2">
                  <strong className="text-rose-700">Kịch bản đối phó:</strong> {war.aiDefenseStrategy.action}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>SKU ảnh hưởng: <strong className="text-slate-900 font-mono">{war.lkAffectedSku}</strong></span>
                  <span>{war.detectedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Gap Opportunities */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Khoảng Trống Thị Trường (Market Gap)
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Phân khúc tiềm năng Lock&King nên khai thác</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('market-gap')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Khám phá →
            </button>
          </div>

          <div className="space-y-2.5">
            {mockMarketGaps.slice(2, 5).map((gap, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-slate-900 font-mono">{gap.range}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${gap.competitionBadge}`}>
                      {gap.competitionLevel}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 font-mono">
                    POS {gap.opportunityScore}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{gap.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Summary Table */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
              Danh Mục Sản Phẩm Trọng Tâm Lock&King
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Chỉ số cạnh tranh giá, lợi nhuận gộp và mức độ bao phủ kho</p>
          </div>
          <button
            onClick={() => onNavigate('product-center')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="pb-3 font-semibold">SKU / Model</th>
                <th className="pb-3 font-semibold">Tên Sản Phẩm</th>
                <th className="pb-3 font-semibold text-right">Giá Bán Lẻ</th>
                <th className="pb-3 font-semibold text-right">TB Thị Trường</th>
                <th className="pb-3 font-semibold text-center">Chỉ Số PCS</th>
                <th className="pb-3 font-semibold text-right">Biên Lãi Gộp</th>
                <th className="pb-3 font-semibold text-center">Tồn Kho</th>
                <th className="pb-3 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="hover:bg-rose-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 font-mono font-bold text-slate-900">{p.sku}</td>
                  <td className="py-3 font-medium text-slate-800 max-w-[200px] truncate">{p.name}</td>
                  <td className="py-3 font-bold text-slate-900 text-right font-mono">{formatVND(p.sellingPrice)}</td>
                  <td className="py-3 text-slate-500 text-right font-mono">{formatVND(p.marketAverage)}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                      p.pcs >= 85 ? 'bg-emerald-100 text-emerald-800' :
                      p.pcs >= 75 ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.pcs} - {p.pcsStatus}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-right font-mono text-emerald-700">
                    {(p.grossMargin * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 text-center">
                    <span className={`font-semibold ${p.stockCoverageMonths > 6 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                      {p.stockCoverageMonths} tháng
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-rose-600 hover:text-rose-800 font-bold">
                      Xem →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
