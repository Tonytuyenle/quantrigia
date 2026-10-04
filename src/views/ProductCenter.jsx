import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { formatVND, formatPercent } from '../utils/pricingEngine';

export default function ProductCenter({ onSelectProduct, onAddNewProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortKey, setSortKey] = useState('pcs');
  const [sortOrder, setSortOrder] = useState('desc');
  const [lifecycleFilter, setLifecycleFilter] = useState('TẤT CẢ');

  const filteredProducts = mockProducts.filter((p) => {
    const matchCat = selectedCategory === 'Tất cả danh mục' || p.category === selectedCategory;
    const matchSearch =
      p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.model.toLowerCase().includes(searchFilter.toLowerCase());
    const matchLifecycle =
      lifecycleFilter === 'TẤT CẢ' ||
      (lifecycleFilter === 'TĂNG TRƯỞNG' && p.lifecycle === 'TĂNG TRƯỞNG') ||
      (lifecycleFilter === 'BÃO HÒA' && p.lifecycle === 'BÃO HÒA') ||
      (lifecycleFilter === 'SUY THOÁI' && p.lifecycle === 'SUY THOÁI');
    return matchCat && matchSearch && matchLifecycle;
  }).sort((a, b) => {
    let valA = a[sortKey] || 0;
    let valB = b[sortKey] || 0;
    if (sortKey === 'margin') {
      valA = a.grossMargin;
      valB = b.grossMargin;
    }
    if (sortKey === 'price') {
      valA = a.sellingPrice;
      valB = b.sellingPrice;
    }
    if (sortKey === 'stock') {
      valA = a.stockCoverageMonths;
      valB = b.stockCoverageMonths;
    }
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const handleExportCsv = () => {
    const csvHeader = 'SKU,Model,Ten San Pham,Danh Muc,Gia FOB USD,Gia Landed,Gia True Cost,Gia NPP,Gia Ban Le,TB Thi Truong,Price Index,Diem PCS,Bien Lai Gop,Ton Kho Thang,Vong Doi\n';
    const csvRows = filteredProducts.map(p =>
      `"${p.sku}","${p.model}","${p.name}","${p.category}",${p.fobPriceUsd},${p.landedCost},${p.trueCost},${p.nppPrice},${p.sellingPrice},${p.marketAverage},${p.priceIndex},${p.pcs},${p.grossMargin},${p.stockCoverageMonths},"${p.lifecycle}"`
    ).join('\n');
    
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BANG_DANH_MUC_SAN_PHAM_LOCK_KING_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Trung Tâm Sản Phẩm (Product Master)
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
              {filteredProducts.length} SKU
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Quản lý thông số kỹ thuật, giá vốn True Cost, giá các kênh bán, tồn kho và chỉ số cạnh tranh PCS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Excel / CSV</span>
          </button>
          <button
            onClick={onAddNewProduct}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thẩm Định SKU Mới</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Tìm theo SKU (LK-8418), Tên sản phẩm, Model..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-medium text-slate-700"
            >
              {mockCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Lifecycle Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['TẤT CẢ', 'TĂNG TRƯỞNG', 'BÃO HÒA', 'SUY THOÁI'].map((lf) => (
              <button
                key={lf}
                onClick={() => setLifecycleFilter(lf)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
                  lifecycleFilter === lf
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lf}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Sorting Toggles */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
          <span className="text-[11px] font-medium">Sắp xếp theo:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { key: 'pcs', label: 'Điểm PCS' },
              { key: 'margin', label: 'Biên lợi nhuận' },
              { key: 'price', label: 'Giá bán' },
              { key: 'stock', label: 'Tồn kho' }
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  if (sortKey === s.key) {
                    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                  } else {
                    setSortKey(s.key);
                    setSortOrder('desc');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                  sortKey === s.key ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200' : 'hover:bg-slate-100'
                }`}
              >
                <span>{s.label}</span>
                {sortKey === s.key && (
                  <span className="text-[10px]">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Table (Horizontal Scroll on Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4">Sản Phẩm Lock&King</th>
                <th className="py-3 px-3">Danh Mục</th>
                <th className="py-3 px-3 text-right">Giá Vốn (True Cost)</th>
                <th className="py-3 px-3 text-right">Giá Bán Lẻ</th>
                <th className="py-3 px-3 text-right">TB Thị Trường</th>
                <th className="py-3 px-3 text-center">Price Index</th>
                <th className="py-3 px-3 text-center">Chỉ Số PCS</th>
                <th className="py-3 px-3 text-right">Biên Lãi Gộp</th>
                <th className="py-3 px-3 text-center">Tồn Kho</th>
                <th className="py-3 px-3 text-center">Vòng Đời</th>
                <th className="py-3 px-3 sm:px-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="hover:bg-rose-50/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 sm:px-4">
                    <div className="flex items-center space-x-2.5 sm:space-x-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono font-extrabold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded text-[11px]">
                            {p.sku}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono truncate">{p.model}</span>
                        </div>
                        <div className="font-bold text-slate-800 line-clamp-1 text-xs mt-0.5" title={p.name}>
                          {p.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-600 text-[11px] font-medium whitespace-nowrap">
                    {p.category.split('&')[0]}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-700 whitespace-nowrap">
                    <div className="font-bold">{formatVND(p.trueCost)}</div>
                    <div className="text-[10px] text-slate-400">FOB: ${p.fobPriceUsd}</div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                    <div className="text-xs">{formatVND(p.sellingPrice)}</div>
                    <div className="text-[10px] text-slate-400 font-normal">NPP: {formatVND(p.nppPrice)}</div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-500 whitespace-nowrap">
                    {formatVND(p.marketAverage)}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      p.priceIndex > 105 ? 'bg-rose-100 text-rose-800' :
                      p.priceIndex < 95 ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {p.priceIndex}%
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-extrabold border ${
                      p.pcs >= 85 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                      p.pcs >= 75 ? 'bg-teal-50 text-teal-800 border-teal-300' : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {p.pcs} - {p.pcsStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {(p.grossMargin * 100).toFixed(1)}%
                  </td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      p.stockCoverageMonths > 6 ? 'bg-rose-100 text-rose-700' :
                      p.stockCoverageMonths < 1.5 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {p.stockCoverageMonths} tháng
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-slate-100 text-slate-700">
                      {p.lifecycle}
                    </span>
                  </td>

                  <td className="py-3 px-3 sm:px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-rose-600 hover:text-white rounded-md text-[11px] font-bold text-slate-700 transition-colors whitespace-nowrap"
                    >
                      Chi tiết
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
