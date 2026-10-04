import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { calculateTrueCost, calculatePriceLadder, calculatePOS, calculatePCS, formatVND, formatPercent } from '../utils/pricingEngine';
import { mockCategories } from '../data/mockData';

export default function NewProductIntelligence() {
  const [formData, setFormData] = useState({
    model: 'NEW-028',
    name: 'Nồi lẩu nướng đa năng Ceramic Lock&King 2 Ngăn Độc Lập',
    category: 'Nồi cơm điện cao tần & điện tử',
    fobUsd: 13.5,
    supplier: 'Nhà máy Shunde Smart Cooker',
    moq: 2000,
    logisticsVnd: 45000,
    capacity: '4.5L (Lẩu 2.5L + Nướng 2.0L)',
    power: '1600W (Mỗi bên 800W độc lập)',
    material: 'Hợp kim nhôm đúc phủ men gốm Ceramic chống dính hữu cơ',
    technology: 'Mâm nhiệt kép riêng biệt + Cảm biến tự ngắt quá nhiệt',
    features: '2 núm xoay điều chỉnh nhiệt riêng, khay tháo rời vệ sinh máy rửa bát',
    warranty: '24 tháng',
    marketBenchmarkPrice: 890000
  });

  const [analyzedResult, setAnalyzedResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const costResult = calculateTrueCost({
        fobPrice: parseFloat(formData.fobUsd) || 12,
        logisticsPerUnit: parseFloat(formData.logisticsVnd) || 45000,
        targetPrice: 790000
      });

      const ladder = calculatePriceLadder(costResult.totalTrueCost, formData.marketBenchmarkPrice, 0.38);

      const posResult = calculatePOS({
        marginPotential: 88,
        marketDemand: 85,
        marketGap: 90,
        differentiation: 92,
        competitionIntensity: 80,
        onlinePotential: 90,
        offlinePotential: 82,
        inventoryRisk: 85
      });

      const pcsResult = calculatePCS({
        sellingPrice: ladder.targetPrice,
        marketAverage: formData.marketBenchmarkPrice,
        productValueScore: 88,
        featureScore: 90,
        grossMargin: 0.38,
        demandScore: 85
      });

      setAnalyzedResult({
        cost: costResult,
        ladder,
        pos: posResult,
        pcs: pcsResult,
        targetMargin: ((ladder.targetPrice - costResult.totalTrueCost) / ladder.targetPrice * 100).toFixed(1)
      });
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Thẩm Định Sản Phẩm Mới & Điểm Cơ Hội POS
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Hỗ trợ phòng Mua Hàng & Ban Điều Hành thẩm định SKU mới: Tự động tính True Cost, Thang Giá, điểm POS và ra quyết định Nhập / Dừng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            ✓ Thuật toán POS 8 Trọng Số
          </span>
        </div>
      </div>

      {/* Form and Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Form: 5 cols */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-rose-600" />
              Thông Số Đề Xuất Nhập Hàng
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">Mẫu Canton Fair</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mã Dự Kiến / Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Danh Mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:bg-white"
                >
                  {mockCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tên Sản Phẩm Đầy Đủ</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">FOB (USD)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fobUsd}
                  onChange={(e) => setFormData({ ...formData, fobUsd: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-rose-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">MOQ (Cái)</label>
                <input
                  type="number"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Cước Vận Tải</label>
                <input
                  type="number"
                  value={formData.logisticsVnd}
                  onChange={(e) => setFormData({ ...formData, logisticsVnd: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Giá Thị Trường Dự Kiến (VND)</label>
              <input
                type="number"
                step="10000"
                value={formData.marketBenchmarkPrice}
                onChange={(e) => setFormData({ ...formData, marketBenchmarkPrice: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Dung Tích</label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Công Suất</label>
                <input
                  type="text"
                  value={formData.power}
                  onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Vật Liệu Thân & Lòng</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01]"
          >
            {isAnalyzing ? (
              <span>Đang tính toán ma trận POS...</span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>PHÂN TÍCH SẢN PHẨM & TÍNH ĐIỂM POS</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output: 7 cols */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {analyzedResult ? (
            <div className="space-y-4 sm:space-y-6">
              {/* DECISION CARD */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-2xl p-4 sm:p-6 border-2 border-emerald-500 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    KẾT LUẬN TỪ BỘ RA QUYẾT ĐỊNH (DECISION ENGINE)
                  </span>
                  <span className="text-[10px] sm:text-xs bg-emerald-900/80 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/40">
                    Độ Tin Cậy {analyzedResult.pos.confidence}%
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 border-y border-slate-800 my-2.5">
                  <div>
                    <div className="text-[11px] text-slate-400">Điểm Đánh Giá Cơ Hội Sản Phẩm (POS)</div>
                    <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2 mt-0.5">
                      <span className="text-emerald-400">{analyzedResult.pos.score}</span>
                      <span className="text-base text-slate-400">/ 100</span>
                    </div>
                  </div>

                  <div className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider text-center shadow-lg ${analyzedResult.pos.badgeColor}`}>
                    {analyzedResult.pos.decision}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl space-y-1">
                    <div className="font-bold text-emerald-300 mb-1">✓ Lý do nên nhập (Lợi thế):</div>
                    <div className="text-slate-300">• Biên lợi nhuận gộp mục tiêu đạt {analyzedResult.targetMargin}%</div>
                    <div className="text-slate-300">• Giá nhập FOB ${formData.fobUsd} rất cạnh tranh</div>
                    <div className="text-slate-300">• Phân khúc 690K-850K chỉ có 4 đối thủ trực tiếp</div>
                  </div>

                  <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl space-y-1">
                    <div className="font-bold text-rose-300 mb-1">⚠ Rủi ro cần kiểm soát:</div>
                    <div className="text-slate-300">• MOQ {formData.moq?.toLocaleString()} cái cần ngân sách ~650M</div>
                    <div className="text-slate-300">• Cần test kiểm tra độ bền chống dính Ceramic</div>
                  </div>
                </div>
              </div>

              {/* Price Ladder Output */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Đề Xuất Thang Giá & Điểm Hòa Vốn
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">True Cost (Giá vốn)</span>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 font-mono">
                      {formatVND(analyzedResult.cost.totalTrueCost)}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-rose-600 font-bold uppercase">Floor Price (Giá Sàn)</span>
                    <div className="text-xs sm:text-sm font-black text-rose-700 mt-0.5 font-mono">
                      {formatVND(analyzedResult.ladder.floorPrice)}
                    </div>
                  </div>
                  <div className="bg-rose-50 p-2.5 rounded-xl border-2 border-rose-500">
                    <span className="text-[10px] text-rose-700 font-extrabold uppercase">Target (Mục Tiêu)</span>
                    <div className="text-xs sm:text-sm font-black text-rose-600 mt-0.5 font-mono">
                      {formatVND(analyzedResult.ladder.targetPrice)}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Niêm Yết (MSRP)</span>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 font-mono">
                      {formatVND(analyzedResult.ladder.listPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center text-slate-400 space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-bold text-slate-700 text-xs sm:text-sm">Chưa có kết quả thẩm định</div>
              <p className="text-[11px] sm:text-xs max-w-sm text-slate-500">
                Hãy điền báo giá FOB và thông số kỹ thuật bên trái, sau đó nhấn nút <strong>"PHÂN TÍCH SẢN PHẨM"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
