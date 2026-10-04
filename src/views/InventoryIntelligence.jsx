import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function InventoryIntelligence({ onSelectProduct }) {
  const [filterRisk, setFilterRisk] = useState('TẤT CẢ');

  const filteredProducts = mockProducts.filter((p) => {
    if (filterRisk === 'RỦI RO CAO') return p.stockCoverageMonths > 6;
    if (filterRisk === 'SẮP HẾT') return p.stockCoverageMonths < 1.5;
    if (filterRisk === 'AN TOÀN') return p.stockCoverageMonths >= 1.5 && p.stockCoverageMonths <= 6;
    return true;
  });

  const totalInventoryValue = mockProducts.reduce((acc, p) => acc + (p.inventory * p.landedCost), 0);
  const totalUnits = mockProducts.reduce((acc, p) => acc + p.inventory, 0);
  const highRiskCount = mockProducts.filter(p => p.stockCoverageMonths > 6).length;
  const lowStockCount = mockProducts.filter(p => p.stockCoverageMonths < 1.5).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Quản Trị Tồn Kho & Ma Trận Rủi Ro (Inventory Intelligence)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Theo dõi số tháng bao phủ tồn kho (Stock Coverage = Tồn kho ÷ Bán hàng tháng), cảnh báo ứ đọng và tự động đề xuất giải pháp kích cầu / xả hàng.
          </p>
        </div>

        <div className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 self-start sm:self-auto">
          Tổng giá trị tồn kho: <strong className="font-mono text-slate-900">{formatVND(totalInventoryValue)}</strong>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng Tồn Kho</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{totalUnits.toLocaleString()} <span className="text-xs font-normal text-slate-500">cái</span></div>
          <span className="text-[10px] text-slate-500">{mockProducts.length} SKU đang bán</span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tồn Kho Tối Ưu (1.5 - 6 thg)</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">{mockProducts.length - highRiskCount - lowStockCount} <span className="text-xs font-normal text-slate-500">SKU</span></div>
          <span className="text-[10px] text-emerald-700 font-semibold">Tốc độ ra hàng đều</span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Nguy Cơ Đứt Hàng ({'<'} 1.5 thg)</span>
          <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">{lowStockCount} <span className="text-xs font-normal text-slate-500">SKU</span></div>
          <span className="text-[10px] text-amber-700 font-semibold">Cần đặt hàng bổ sung</span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tồn Đọng Rủi Ro ({'>'} 6 thg)</span>
          <div className="text-xl sm:text-2xl font-black text-rose-600 mt-0.5">{highRiskCount} <span className="text-xs font-normal text-slate-500">SKU</span></div>
          <span className="text-[10px] text-rose-700 font-semibold">Cần xả kho / tạo combo</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'TẤT CẢ', label: 'Tất cả SKU' },
          { id: 'RỦI RO CAO', label: 'Tồn đọng rủi ro (>6 tháng)' },
          { id: 'SẮP HẾT', label: 'Nguy cơ đứt hàng (<1.5 tháng)' },
          { id: 'AN TOÀN', label: 'Tồn kho tối ưu' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilterRisk(btn.id)}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              filterRisk === btn.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4">SKU / Sản Phẩm</th>
                <th className="py-3 px-3 text-right">Số Lượng Tồn</th>
                <th className="py-3 px-3 text-right">Bán / Ngày</th>
                <th className="py-3 px-3 text-right">Bán / Tháng</th>
                <th className="py-3 px-3 text-center">Bao Phủ (Tháng)</th>
                <th className="py-3 px-3 text-right">Giá Trị Tồn (Landed)</th>
                <th className="py-3 px-3">Mức Độ Rủi Ro</th>
                <th className="py-3 px-3 sm:px-4">Khuyến Nghị Tồn Kho Từ AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4">
                    <div className="font-mono font-bold text-slate-900">{p.sku}</div>
                    <div className="text-[11px] text-slate-600 truncate max-w-[200px]">{p.name}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                    {p.inventory?.toLocaleString()} cái
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                    {p.avgDailySales} cái
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900 font-semibold whitespace-nowrap">
                    {p.avgMonthlySales} cái
                  </td>
                  <td className="py-3 px-3 text-center font-mono whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${
                      p.stockCoverageMonths > 6 ? 'bg-rose-100 text-rose-800 animate-pulse' :
                      p.stockCoverageMonths < 1.5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.stockCoverageMonths} tháng
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 font-bold whitespace-nowrap">
                    {formatVND(p.inventory * p.landedCost)}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                      p.stockCoverageMonths > 6 ? 'bg-rose-600 text-white' :
                      p.stockCoverageMonths < 1.5 ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {p.stockCoverageMonths > 6 ? 'RỦI RO CAO' : p.stockCoverageMonths < 1.5 ? 'SẮP HẾT' : 'AN TOÀN'}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-[11px] text-slate-700">
                    {p.stockCoverageMonths > 6 ? (
                      <span className="text-rose-600 font-bold">Dừng nhập + Tạo Combo Bếp để xả 350 cái</span>
                    ) : p.stockCoverageMonths < 1.5 ? (
                      <span className="text-amber-700 font-bold">Tăng giá +3% & Đặt thêm 2.500 cái</span>
                    ) : (
                      <span className="text-emerald-700">Duy trì tốc độ bán hiện tại</span>
                    )}
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
