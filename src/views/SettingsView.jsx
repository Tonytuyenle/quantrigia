import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  ShieldCheck,
  Save,
  RotateCcw,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function SettingsView() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [pcsWeights, setPcsWeights] = useState({
    pricePosition: 30,
    productValue: 25,
    featureAdvantage: 15,
    profitHealth: 15,
    marketDemand: 10,
    priceStability: 5
  });

  const [posWeights, setPosWeights] = useState({
    marginPotential: 25,
    marketDemand: 20,
    marketGap: 15,
    productDiff: 15,
    competition: 10,
    online: 5,
    offline: 5,
    inventoryRisk: 5
  });

  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [targetGrossMargin, setTargetGrossMargin] = useState(35);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Cài Đặt Trọng Số Thuật Toán & Hệ Thống (Settings)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Cấu hình trọng số tính điểm PCS, POS, ngưỡng tin cậy dữ liệu và chỉ tiêu biên lợi nhuận tối thiểu.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu Cấu Hình</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Đã lưu thành công! Toàn bộ công thức tính PCS và POS đã được cập nhật thời gian thực.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* PCS Weights Config */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              1. Trọng Số Chỉ Số Cạnh Tranh (PCS)
            </h2>
            <span className="font-mono text-xs font-bold text-rose-600">Tổng = 100%</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Vị thế giá bán (Price Position)', val: pcsWeights.pricePosition },
              { label: 'Giá trị sản phẩm (Product Value)', val: pcsWeights.productValue },
              { label: 'Lợi thế tính năng (Feature Advantage)', val: pcsWeights.featureAdvantage },
              { label: 'Sức khỏe lợi nhuận (Profit Health)', val: pcsWeights.profitHealth },
              { label: 'Nhu cầu thị trường (Market Demand)', val: pcsWeights.marketDemand },
              { label: 'Độ ổn định giá (Price Stability)', val: pcsWeights.priceStability },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-slate-700">{item.label}:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{item.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* POS Weights Config */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              2. Trọng Số Cơ Hội Sản Phẩm Mới (POS)
            </h2>
            <span className="font-mono text-xs font-bold text-rose-600">Tổng = 100%</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Tiềm năng biên lợi nhuận (Margin Potential)', val: posWeights.marginPotential },
              { label: 'Nhu cầu thị trường (Market Demand)', val: posWeights.marketDemand },
              { label: 'Khoảng trống thị trường (Market Gap)', val: posWeights.marketGap },
              { label: 'Tính năng khác biệt (Differentiation)', val: posWeights.productDiff },
              { label: 'Mức độ cạnh tranh (Competition Intensity)', val: posWeights.competition },
              { label: 'Tiềm năng Online (Online Potential)', val: posWeights.online },
              { label: 'Tiềm năng Offline (Offline Potential)', val: posWeights.offline },
              { label: 'Rủi ro tồn kho (Inventory Risk)', val: posWeights.inventoryRisk },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-slate-700">{item.label}:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{item.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Thresholds */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 md:col-span-2">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Ngưỡng Kiểm Soát Toàn Hệ Thống
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="font-bold text-slate-800 block mb-1">
                Ngưỡng Tin Cậy Dữ Liệu Tối Thiểu: {confidenceThreshold}%
              </label>
              <input
                type="range"
                min={50}
                max={99}
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Hệ thống tự động loại trừ các shop không chính thức có điểm tin cậy dưới {confidenceThreshold}%.
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="font-bold text-slate-800 block mb-1">
                Biên Lãi Gộp Mục Tiêu (Target Gross Margin): {targetGrossMargin}%
              </label>
              <input
                type="range"
                min={20}
                max={55}
                value={targetGrossMargin}
                onChange={(e) => setTargetGrossMargin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Căn cứ để tính toán Target Price và cảnh báo khi SKU có margin thấp hơn {targetGrossMargin}%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
