import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Globe,
  ShoppingBag,
  ExternalLink,
  Clock,
  RefreshCw
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function MarketPriceView() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Giá Thị Trường Đa Kênh Thời Gian Thực
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Theo dõi giá bán đa kênh (Website, Shopee Mall, TikTok Shop, NPP/Đại lý) kèm chỉ số Tin Cậy Dữ Liệu (Data Confidence).
          </p>
        </div>

        <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200 self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Quét lại toàn sàn</span>
        </button>
      </div>

      {/* Market Price Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4">Sản Phẩm & Thương Hiệu</th>
                <th className="py-3 px-3 text-right">Giá Website</th>
                <th className="py-3 px-3 text-right">Giá Shopee Mall</th>
                <th className="py-3 px-3 text-right">Giá TikTok Shop</th>
                <th className="py-3 px-3 text-right">Giá NPP / Đại Lý</th>
                <th className="py-3 px-3 text-center">Độ Tin Cậy</th>
                <th className="py-3 px-3 sm:px-4 text-center">Cập Nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProducts.map((p) => (
                <React.Fragment key={p.id}>
                  {/* Lock&King Row */}
                  <tr className="bg-rose-50/40 font-bold">
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded flex-shrink-0">
                          {p.sku}
                        </span>
                        <span className="text-slate-900 truncate max-w-[200px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-900 whitespace-nowrap">{formatVND(p.sellingPrice)}</td>
                    <td className="py-3 px-3 text-right font-mono text-rose-600 whitespace-nowrap">{formatVND(p.marketplacePrice)}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-900 whitespace-nowrap">{formatVND(p.facebookPrice)}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600 whitespace-nowrap">{formatVND(p.nppPrice)}</td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        100% Nội bộ
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center text-slate-400 text-[10px] whitespace-nowrap">Trực tiếp</td>
                  </tr>

                  {/* Competitor Matched Rows */}
                  {p.matchedCompetitors?.map((comp, cIdx) => (
                    <tr key={cIdx} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                      <td className="py-2.5 px-3 sm:px-4 pl-6 sm:pl-8 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 flex-shrink-0">
                            {comp.brand}
                          </span>
                          <span className="truncate max-w-[180px]">{comp.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">{formatVND(comp.price)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-600 font-semibold whitespace-nowrap">{formatVND(comp.shopeePrice)}</td>
                      <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">{formatVND(comp.tiktokPrice)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">-</td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                          {comp.confidence}% Xác thực
                        </span>
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-center text-slate-400 text-[10px] whitespace-nowrap">15 phút trước</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
