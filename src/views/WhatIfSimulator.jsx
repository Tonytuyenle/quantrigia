import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  RotateCcw,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { calculateTrueCost, calculatePCS, formatVND, formatPercent } from '../utils/pricingEngine';

export default function WhatIfSimulator({ selectedProduct }) {
  const defaultProduct = selectedProduct || mockProducts[0];
  const [currentSkuId, setCurrentSkuId] = useState(defaultProduct.id);

  const product = mockProducts.find(p => p.id === currentSkuId) || defaultProduct;

  // Simulator Sliders State
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [marketplaceFeePct, setMarketplaceFeePct] = useState(9);
  const [affiliatePct, setAffiliatePct] = useState(3);
  const [marketingPct, setMarketingPct] = useState(8);
  const [promotionPct, setPromotionPct] = useState(4);
  const [estimatedMonthlyVolume, setEstimatedMonthlyVolume] = useState(product.avgMonthlySales || 500);

  const handleReset = () => {
    setSellingPrice(product.sellingPrice);
    setMarketplaceFeePct(9);
    setAffiliatePct(3);
    setMarketingPct(8);
    setPromotionPct(4);
    setEstimatedMonthlyVolume(product.avgMonthlySales || 500);
  };

  const baseLanded = product.landedCost;
  const fixedOpsUnit = 80000;
  const variableChannelUnit = sellingPrice * ((marketplaceFeePct + affiliatePct + marketingPct + promotionPct) / 100);
  const simTrueCost = baseLanded + fixedOpsUnit + variableChannelUnit;

  const simGrossProfitUnit = sellingPrice - simTrueCost;
  const simGrossMarginPct = (simGrossProfitUnit / sellingPrice) * 100;

  const totalMonthlyRevenue = sellingPrice * estimatedMonthlyVolume;
  const totalMonthlyCost = simTrueCost * estimatedMonthlyVolume;
  const totalMonthlyProfit = simGrossProfitUnit * estimatedMonthlyVolume;

  const simPriceIndex = ((sellingPrice / product.marketAverage) * 100).toFixed(1);

  const simPcs = calculatePCS({
    sellingPrice,
    marketAverage: product.marketAverage,
    productValueScore: 85,
    featureScore: 85,
    grossMargin: simGrossMarginPct / 100,
    demandScore: 80
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Mô Phỏng Giá Động (What-if Dynamic Simulator)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Kéo thả thanh trượt để giả lập tác động của Giá bán, Phí sàn, Marketing và Sản lượng lên Lợi nhuận và Điểm PCS thời gian thực.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={currentSkuId}
            onChange={(e) => {
              setCurrentSkuId(e.target.value);
              const found = mockProducts.find(p => p.id === e.target.value);
              if (found) setSellingPrice(found.sellingPrice);
            }}
            className="py-1.5 sm:py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-bold text-slate-900 flex-1"
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
            ))}
          </select>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Đặt lại mặc định"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Side: Sliders Controls (6 cols) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Bảng Điều Khiển Tham Số Đầu Vào
            </h2>
            <span className="font-mono text-xs font-bold text-rose-600">
              SKU: {product.sku}
            </span>
          </div>

          {/* Slider 1: Selling Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">1. Giá Bán Lẻ Đề Xuất</label>
              <span className="font-mono font-black text-sm text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                {formatVND(sellingPrice)}
              </span>
            </div>
            <input
              type="range"
              min={Math.round(product.floorPrice * 0.8)}
              max={Math.round(product.listPrice * 1.1)}
              step={10000}
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Sàn: {formatVND(product.floorPrice)}</span>
              <span>TB TT: {formatVND(product.marketAverage)}</span>
              <span>Niêm yết: {formatVND(product.listPrice)}</span>
            </div>
          </div>

          {/* Slider 2: Marketplace Fee % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">2. Phí Sàn TMĐT (Shopee / TikTok ~9%)</label>
              <span className="font-mono font-bold text-slate-900">{marketplaceFeePct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={marketplaceFeePct}
              onChange={(e) => setMarketplaceFeePct(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>

          {/* Slider 3: Affiliate KOC % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">3. Chiết Khấu Affiliate KOC</label>
              <span className="font-mono font-bold text-slate-900">{affiliatePct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={affiliatePct}
              onChange={(e) => setAffiliatePct(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>

          {/* Slider 4: Marketing Ads % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">4. Ngân Sách Marketing & Ads</label>
              <span className="font-mono font-bold text-slate-900">{marketingPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={marketingPct}
              onChange={(e) => setMarketingPct(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>

          {/* Slider 5: Voucher & Promotion % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">5. Quỹ Voucher & Khuyến Mãi</label>
              <span className="font-mono font-bold text-slate-900">{promotionPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={promotionPct}
              onChange={(e) => setPromotionPct(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>

          {/* Slider 6: Estimated Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">6. Sản Lượng Bán Dự Kiến (Cái / Tháng)</label>
              <span className="font-mono font-bold text-slate-900">{estimatedMonthlyVolume.toLocaleString()} cái</span>
            </div>
            <input
              type="range"
              min={50}
              max={3000}
              step={50}
              value={estimatedMonthlyVolume}
              onChange={(e) => setEstimatedMonthlyVolume(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>
        </div>

        {/* Right Side: Output Results (6 cols) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                Kết Quả Tài Chính Giả Lập
              </span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                simGrossMarginPct >= 35 ? 'bg-emerald-500 text-white' :
                simGrossMarginPct >= 25 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {simGrossMarginPct >= 35 ? 'Biên Lãi Khỏe' : 'Biên Lãi Mỏng'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400">Doanh Thu / Tháng</span>
                <div className="text-lg sm:text-2xl font-black text-white font-mono mt-0.5">
                  {formatVND(totalMonthlyRevenue)}
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Lãi Gộp / Tháng</span>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  {formatVND(totalMonthlyProfit)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400">Biên Lãi Gộp</span>
                <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">{simGrossMarginPct.toFixed(1)}%</div>
              </div>
              <div className="bg-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400">Price Index</span>
                <div className="text-sm sm:text-base font-black text-white mt-0.5">{simPriceIndex}%</div>
              </div>
              <div className="bg-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400">Điểm PCS Mới</span>
                <div className="text-sm sm:text-base font-black text-teal-400 mt-0.5">{simPcs.score}/100</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Cơ Cấu Giá Trị Trên 1 Sản Phẩm
            </h3>

            <div className="space-y-1.5 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Giá bán lẻ:</span>
                <span className="font-mono font-bold text-slate-900">{formatVND(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Giá vốn Landed:</span>
                <span className="font-mono text-slate-700">- {formatVND(baseLanded)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Chi phí cố định:</span>
                <span className="font-mono text-slate-700">- {formatVND(fixedOpsUnit)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Chi phí biến đổi kênh:</span>
                <span className="font-mono text-rose-600">- {formatVND(variableChannelUnit)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-black text-xs sm:text-sm text-slate-900">
                <span>Lãi gộp trên 1 cái:</span>
                <span className="font-mono text-emerald-600">{formatVND(simGrossProfitUnit)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
