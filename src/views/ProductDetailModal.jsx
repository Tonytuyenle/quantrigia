import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldAlert,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Layers,
  ArrowRight,
  GitCompare,
  Sliders,
  ExternalLink,
  ChevronRight,
  Boxes,
  Clock,
  Award
} from 'lucide-react';
import { formatVND, formatPercent } from '../utils/pricingEngine';

export default function ProductDetailModal({ product, onClose, onOpenSimulator, onCompareWithCompetitor }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <span className="font-mono font-black text-xs px-2 sm:px-2.5 py-1 rounded bg-rose-600 text-white tracking-wider flex-shrink-0">
              {product.sku}
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black tracking-tight text-white truncate">
                {product.name}
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 truncate">
                <span>Model: {product.model}</span>
                <span>•</span>
                <span className="truncate">{product.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => onOpenSimulator(product)}
              className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Mô phỏng Giá</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs (Scrollable on mobile) */}
        <div className="bg-slate-100 px-3 sm:px-5 py-2 border-b border-slate-200 flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'overview', label: '1. Khuyến Nghị AI' },
            { id: 'ladder', label: '2. Thang Giá (6 Tầng)' },
            { id: 'cost', label: '3. Giá Vốn Toàn Phần (True Cost)' },
            { id: 'competitors', label: `4. Đối Thủ (${product.matchedCompetitors?.length || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Giá Bán Lẻ</span>
              <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">{formatVND(product.sellingPrice)}</div>
              <span className="text-[10px] text-slate-500">MSRP: {formatVND(product.listPrice)}</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TB Thị Trường</span>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-0.5">{formatVND(product.marketAverage)}</div>
              <span className="text-[10px] text-slate-500">Dải: {formatVND(product.marketLow)} - {formatVND(product.marketHigh)}</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Price Index</span>
              <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">{product.priceIndex}%</div>
              <span className={`text-[10px] font-bold ${product.priceIndex > 100 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {product.priceIndex > 100 ? `Cao hơn ${Math.abs(product.priceIndex - 100).toFixed(1)}%` : `Rẻ hơn ${(100 - product.priceIndex).toFixed(1)}%`}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Điểm PCS</span>
              <div className="text-sm sm:text-base font-black text-emerald-600 mt-0.5">{product.pcs}/100</div>
              <span className="text-[10px] font-bold text-emerald-700">{product.pcsStatus}</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Biên Lãi Gộp</span>
              <div className="text-sm sm:text-base font-black text-emerald-600 mt-0.5">{(product.grossMargin * 100).toFixed(1)}%</div>
              <span className="text-[10px] text-slate-500 font-mono">Net: {(product.netMargin * 100).toFixed(1)}%</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tồn Kho Bao Phủ</span>
              <div className={`text-sm sm:text-base font-black mt-0.5 ${product.stockCoverageMonths > 6 ? 'text-rose-600' : 'text-slate-900'}`}>
                {product.stockCoverageMonths} tháng
              </div>
              <span className="text-[10px] text-slate-500">Kho: {product.inventory} cái</span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* AI Strategic Recommendation Box */}
              <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-rose-400/60 shadow-xs">
                <div className="flex items-center space-x-2 text-rose-700 font-black text-[11px] sm:text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-rose-600 animate-spin" />
                  <span>KHUYẾN NGHỊ ĐỊNH GIÁ & CHIẾN LƯỢC TỪ AI</span>
                </div>
                <h3 className="text-sm sm:text-lg font-black text-slate-900 mb-2">
                  {product.aiRecommendation?.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 bg-white/90 p-3 sm:p-3.5 rounded-xl border border-rose-100">
                  {product.aiRecommendation?.details}
                </p>

                {/* Price Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Giá Niêm Yết</span>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 font-mono">{formatVND(product.listPrice)}</div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border-2 border-rose-500">
                    <span className="text-[10px] font-extrabold text-rose-600 uppercase">Target Price (Mục Tiêu)</span>
                    <div className="text-xs sm:text-sm font-black text-rose-600 mt-0.5 font-mono">{formatVND(product.targetPrice)}</div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Attack Price (Chiến Dịch)</span>
                    <div className="text-xs sm:text-sm font-black text-amber-700 mt-0.5 font-mono">{formatVND(product.attackPrice)}</div>
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-rose-200 bg-rose-50/50">
                    <span className="text-[10px] font-bold text-rose-700 uppercase">Floor Price (Giá Sàn)</span>
                    <div className="text-xs sm:text-sm font-black text-rose-900 mt-0.5 font-mono">{formatVND(product.floorPrice)}</div>
                  </div>
                </div>
              </div>

              {/* Specs & Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-slate-600" />
                    Thông Số Kỹ Thuật Chuẩn Hóa
                  </h4>
                  <div className="space-y-2 text-xs divide-y divide-slate-100">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Dung tích / Kích thước:</span>
                      <span className="font-bold text-slate-800">{product.capacity || product.size}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Công suất:</span>
                      <span className="font-bold text-slate-800">{product.power}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Chất liệu thân & lòng:</span>
                      <span className="font-bold text-slate-800 text-right">{product.material}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Công nghệ cốt lõi:</span>
                      <span className="font-bold text-rose-600 text-right">{product.technology}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Bảo hành:</span>
                      <span className="font-bold text-emerald-700">{product.warranty}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-rose-600" />
                    Lợi Thế Cạnh Tranh (USPs)
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {product.features?.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2 text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICE LADDER */}
          {activeTab === 'ladder' && (
            <div className="space-y-3">
              {[
                { name: 'Floor Price (Giá Sàn Tối Thiểu)', price: product.floorPrice, desc: 'Mức giá tối thiểu bảo toàn chi phí cố định và hòa vốn dòng tiền. Nghiêm cấm bán dưới mức này.', color: 'border-l-rose-500 bg-rose-50/40' },
                { name: 'Attack Price (Giá Tấn Công / Mega Sale)', price: product.attackPrice, desc: 'Dùng trong các ngày Mega Campaign (9.9, 11.11) hoặc livestream chớp nhoáng để cướp thị phần.', color: 'border-l-amber-500 bg-amber-50/40' },
                { name: 'Competitive Price (Giá Cạnh Tranh)', price: product.competitivePrice, desc: 'Giá ngang bằng hoặc cạnh tranh trực tiếp với sản phẩm đối thủ chính.', color: 'border-l-blue-500 bg-blue-50/40' },
                { name: 'Target Price (Giá Mục Tiêu Chuẩn)', price: product.targetPrice, desc: 'Giá bán lẻ tiêu chuẩn bền vững mang lại biên lợi nhuận mục tiêu 35-40%.', color: 'border-l-emerald-600 bg-emerald-50/60 font-bold' },
                { name: 'Premium Price (Giá Kênh Cao Cấp)', price: product.premiumPrice, desc: 'Dành cho showroom cao cấp, chuỗi siêu thị điện máy có chi phí trưng bày.', color: 'border-l-purple-500 bg-purple-50/40' },
                { name: 'List Price (Giá Niêm Yết MSRP)', price: product.listPrice, desc: 'Giá mỏ neo (Anchor Price) để làm căn cứ giảm giá và định vị thương hiệu.', color: 'border-l-slate-800 bg-slate-50' }
              ].map((tier, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border border-slate-200 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${tier.color}`}>
                  <div>
                    <div className="text-xs font-black uppercase">{tier.name}</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{tier.desc}</p>
                  </div>
                  <div className="font-mono font-black text-base sm:text-lg text-slate-900 whitespace-nowrap">
                    {formatVND(tier.price)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TRUE COST */}
          {activeTab === 'cost' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-rose-400 font-bold uppercase">Tổng Giá Vốn Toàn Phần (True Cost)</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono">{formatVND(product.trueCost)}</div>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[10px]">Lãi gộp trên Giá bán {formatVND(product.sellingPrice)}:</div>
                  <div className="text-base font-black text-emerald-400 font-mono">
                    {formatVND(product.sellingPrice - product.trueCost)} ({(product.grossMargin * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 uppercase pb-1.5 border-b border-slate-100 flex justify-between">
                    <span>1. Chi Phí Nhập Khẩu & Cố Định</span>
                    <span className="font-mono text-rose-600">{formatVND(product.landedCost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>FOB Giá xưởng (${product.fobPriceUsd}):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.fobVnd)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Thuế NK (5%) + VAT (10%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.fobVnd * 0.15)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cước vận chuyển & Hải quan:</span>
                    <span className="font-mono font-bold text-slate-900">45.000 đ</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Chi phí lưu kho & vận hành:</span>
                    <span className="font-mono font-bold text-slate-900">60.000 đ</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Dự phòng bảo hành 24 tháng:</span>
                    <span className="font-mono font-bold text-slate-900">30.000 đ</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 uppercase pb-1.5 border-b border-slate-100 flex justify-between">
                    <span>2. Chi Phí Kênh & Biến Phí</span>
                    <span className="font-mono text-rose-600">{formatVND(product.trueCost - product.landedCost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí sàn TMĐT (Shopee/TikTok ~9%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.sellingPrice * 0.09)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí cổng thanh toán (2.5%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.sellingPrice * 0.025)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Marketing & Quảng cáo (8%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.sellingPrice * 0.08)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Affiliate KOC (3%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.sellingPrice * 0.03)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Voucher & Khuyến mãi (4%):</span>
                    <span className="font-mono font-bold text-slate-900">{formatVND(product.sellingPrice * 0.04)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPETITORS */}
          {activeTab === 'competitors' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.matchedCompetitors?.map((comp, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white uppercase">
                          {comp.brand}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs mt-1">{comp.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Model: {comp.model}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400">Match Score</span>
                        <div className="text-base font-black text-rose-600">{comp.matchScore}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg text-[11px] text-center">
                      <div>
                        <div className="text-slate-400 text-[10px]">Website</div>
                        <div className="font-bold text-slate-800">{formatVND(comp.price)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">Shopee</div>
                        <div className="font-bold text-rose-600">{formatVND(comp.shopeePrice)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">TikTok</div>
                        <div className="font-bold text-slate-800">{formatVND(comp.tiktokPrice)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Xác thực bởi <strong className="text-slate-800">Lock&King Pricing Engine</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
