import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { calculateTrueCost, calculatePriceLadder, formatVND } from '../utils/pricingEngine';

export default function PricingIntelligenceView({ onOpenSimulator }) {
  const [selectedSkuId, setSelectedSkuId] = useState(mockProducts[0].id);

  const product = mockProducts.find(p => p.id === selectedSkuId) || mockProducts[0];
  const cost = calculateTrueCost({
    fobPrice: product.fobPriceUsd,
    targetPrice: product.sellingPrice
  });
  const ladder = calculatePriceLadder(cost.totalTrueCost, product.marketAverage, 0.35);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Định Giá & Giá Vốn Toàn Phần (True Cost Engine)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Không định giá cảm tính. Hệ thống tính toán toàn bộ 11 cấu phần chi phí True Cost để xây dựng 6 cấp độ Thang Giá chuẩn mực.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSkuId}
            onChange={(e) => setSelectedSkuId(e.target.value)}
            className="py-1.5 sm:py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-bold text-slate-900 flex-1 sm:flex-none"
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: True Cost (6 cols) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Cấu Trúc Giá Vốn Toàn Phần</span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Bóc Tách 11 Chi Phí True Cost</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400">Tổng True Cost</span>
              <div className="text-sm sm:text-base font-black text-rose-600 font-mono">{formatVND(cost.totalTrueCost)}</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1">
              <span className="text-slate-600">1. FOB Giá Xưởng (${product.fobPriceUsd} @ 25.400):</span>
              <span className="font-mono font-bold text-slate-900">{formatVND(cost.fobVnd)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">2. Thuế Nhập Khẩu (5%) + VAT (10%):</span>
              <span className="font-mono font-bold text-slate-900">{formatVND(cost.taxCost)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">3. Vận Tải Quốc Tế & Hải Quan:</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.logistics)}</span>
            </div>
            <div className="flex justify-between py-1 bg-slate-50 px-2 rounded">
              <span className="font-bold text-slate-800">= Giá Vốn Nhập Kho (Landed Cost):</span>
              <span className="font-mono font-black text-slate-900">{formatVND(cost.landedCost)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">4. Chi Phí Lưu Kho & Bốc Dỡ:</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.warehouse)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">5. Chi Phí Vận Hành Doanh Nghiệp:</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.operating)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">6. Dự Phòng Bảo Hành (24 tháng):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.warranty)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">7. Phí Sàn TMĐT (Shopee/TikTok ~9%):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.platformFee)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">8. Phí Cổng Thanh Toán (2.5%):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.paymentFee)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">9. Chi Phí Tiếp Thị (Marketing 8%):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.marketing)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">10. Tiếp Thị Liên Kết (Affiliate KOC 3%):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.affiliate)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">11. Quỹ Voucher & Khuyến Mãi (4%):</span>
              <span className="font-mono text-slate-700">{formatVND(cost.breakdown.promotion)}</span>
            </div>
          </div>
        </div>

        {/* Right: Price Ladder (6 cols) */}
        <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Khung Định Giá 6 Tầng</span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900">Thang Giá (Price Ladder)</h3>
            </div>
            <button
              onClick={() => onOpenSimulator(product)}
              className="px-2.5 sm:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Mô phỏng</span>
            </button>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Floor Price (Giá Sàn Tối Thiểu)', price: ladder.floorPrice, desc: 'Mức giá tối thiểu tuyệt đối để bảo toàn dòng tiền.', color: 'border-l-rose-500 bg-rose-50/40 text-rose-900' },
              { label: 'Attack Price (Giá Tấn Công / Mega Sale)', price: ladder.attackPrice, desc: 'Giá xả hoặc Mega Campaign để cướp thị phần.', color: 'border-l-amber-500 bg-amber-50/40 text-amber-900' },
              { label: 'Competitive Price (Giá Cạnh Tranh)', price: ladder.competitivePrice, desc: 'Giá ngang bằng đối thủ chính trên sàn.', color: 'border-l-blue-500 bg-blue-50/40 text-blue-900' },
              { label: 'Target Price (Giá Mục Tiêu Chuẩn)', price: ladder.targetPrice, desc: 'Giá chuẩn bảo đảm biên lợi nhuận mục tiêu 35-40%.', color: 'border-l-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold' },
              { label: 'Premium Price (Giá Kênh Cao Cấp)', price: ladder.premiumPrice, desc: 'Áp dụng cho chuỗi điện máy hoặc showroom.', color: 'border-l-purple-500 bg-purple-50/40 text-purple-900' },
              { label: 'List Price (Giá Niêm Yết MSRP)', price: ladder.listPrice, desc: 'Giá mỏ neo định vị thương hiệu.', color: 'border-l-slate-800 bg-slate-50 text-slate-900' },
            ].map((tier, idx) => (
              <div key={idx} className={`p-2.5 sm:p-3 rounded-xl border border-slate-200 border-l-4 flex items-center justify-between gap-2 ${tier.color}`}>
                <div>
                  <div className="text-xs font-black">{tier.label}</div>
                  <div className="text-[10px] text-slate-500">{tier.desc}</div>
                </div>
                <div className="font-mono font-black text-xs sm:text-base text-slate-900 whitespace-nowrap">
                  {formatVND(tier.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
