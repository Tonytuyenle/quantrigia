import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  TrendingDown,
  Globe
} from 'lucide-react';
import { mockCompetitorBrands, mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function CompetitorsView({ onSelectCompetitorToCompare }) {
  const [selectedBrand, setSelectedBrand] = useState('TẤT CẢ');
  const [searchQuery, setSearchQuery] = useState('');

  const allCompetitorSkus = [];
  mockProducts.forEach(p => {
    p.matchedCompetitors?.forEach(c => {
      allCompetitorSkus.push({
        ...c,
        lkMatchedSku: p.sku,
        lkMatchedName: p.name,
        category: p.category
      });
    });
  });

  const filteredSkus = allCompetitorSkus.filter(c => {
    const matchBrand = selectedBrand === 'TẤT CẢ' || c.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Cơ Sở Dữ Liệu Đối Thủ Cạnh Tranh (Competitor Intelligence)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Theo dõi 10 thương hiệu gia dụng & cookware lớn: Giá niêm yết, Shopee Mall, TikTok Shop và điểm tin cậy dữ liệu.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-100 p-2 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-700">Ngưỡng tin cậy tối thiểu: <strong className="text-slate-900">85%</strong></span>
        </div>
      </div>

      {/* Brand Share Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {mockCompetitorBrands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(selectedBrand === brand.name ? 'TẤT CẢ' : brand.name)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedBrand === brand.name
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-xs sm:text-sm truncate">{brand.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                selectedBrand === brand.name ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}>
                {brand.marketShare}
              </span>
            </div>
            <div className={`text-[10px] sm:text-[11px] truncate ${selectedBrand === brand.name ? 'text-slate-400' : 'text-slate-500'}`}>
              {brand.tier} • {brand.skuCount} SKU
            </div>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo model đối thủ, tên sản phẩm..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
          Hiển thị <strong>{filteredSkus.length}</strong> SKU đối thủ đã khớp
        </div>
      </div>

      {/* Competitor Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredSkus.map((c, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white uppercase">
                  {c.brand}
                </span>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Tin cậy {c.confidence}%</span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-0.5">{c.name}</h3>
              <div className="text-[10px] text-slate-400 font-mono mb-2.5">Model: {c.model}</div>

              {/* Price Channels Strip */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 mb-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" /> Website:
                  </span>
                  <span className="font-mono font-bold text-slate-800">{formatVND(c.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3 text-orange-500" /> Shopee Mall:
                  </span>
                  <span className="font-mono font-bold text-rose-600">{formatVND(c.shopeePrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3 text-slate-900" /> TikTok Shop:
                  </span>
                  <span className="font-mono font-bold text-slate-900">{formatVND(c.tiktokPrice)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1 mb-2.5 bg-white p-2 rounded-lg border border-slate-100">
                <div>• Công nghệ: <strong className="text-slate-800">{c.specs?.tech}</strong></div>
                <div>• Vật liệu: <strong className="text-slate-800">{c.specs?.material}</strong></div>
                <div>• Bảo hành: <strong className="text-slate-800">{c.specs?.warranty}</strong></div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[10px] text-slate-500">
                Khớp: <strong className="text-slate-900 font-mono">{c.lkMatchedSku}</strong>
                <span className="text-rose-600 font-bold ml-1">({c.matchScore}%)</span>
              </div>
              <button
                onClick={() => onSelectCompetitorToCompare(c)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                So sánh →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
