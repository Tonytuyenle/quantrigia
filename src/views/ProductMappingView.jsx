import React, { useState } from 'react';
import {
  Layers,
  Sliders,
  CheckCircle,
  GitCompare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { calculateProductMatchScore, formatVND } from '../utils/pricingEngine';

export default function ProductMappingView({ onCompareSelected }) {
  const [selectedSkuId, setSelectedSkuId] = useState(mockProducts[0].id);
  const [topCount, setTopCount] = useState(5);
  const [customWeights, setCustomWeights] = useState({
    category: 0.20,
    function: 0.15,
    capacity: 0.15,
    power: 0.10,
    material: 0.10,
    tech: 0.10,
    features: 0.10,
    segment: 0.05,
    warranty: 0.05,
  });

  const currentProduct = mockProducts.find(p => p.id === selectedSkuId) || mockProducts[0];
  const matchedCompetitors = currentProduct.matchedCompetitors || [];

  const handleResetWeights = () => {
    setCustomWeights({
      category: 0.20,
      function: 0.15,
      capacity: 0.15,
      power: 0.10,
      material: 0.10,
      tech: 0.10,
      features: 0.10,
      segment: 0.05,
      warranty: 0.05,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Ánh Xạ Sản Phẩm & Thuật Toán Tương Đồng (Mapping Engine)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Thuật toán chuẩn hóa thuộc tính đa chiều và tìm kiếm TOP sản phẩm đối thủ giống nhất trên thị trường.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedSkuId}
            onChange={(e) => setSelectedSkuId(e.target.value)}
            className="py-1.5 sm:py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-bold text-slate-900 flex-1"
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-900 text-white">
                  {currentProduct.sku}
                </span>
                <span className="text-xs font-bold text-slate-800">Thuộc Tính Chuẩn Hóa</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                100% Đã Khớp
              </span>
            </div>

            <div className="space-y-1.5 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Danh mục chuẩn:</span>
                <span className="font-bold text-slate-800">{currentProduct.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Nhóm công năng:</span>
                <span className="font-bold text-slate-800">{currentProduct.productGroup}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Dung tích:</span>
                <span className="font-bold text-slate-800">{currentProduct.capacity || currentProduct.size}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Công suất điện:</span>
                <span className="font-bold text-slate-800">{currentProduct.power}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Chất liệu thân / lòng:</span>
                <span className="font-bold text-slate-800 text-right max-w-[180px]">{currentProduct.material}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Công nghệ cốt lõi:</span>
                <span className="font-bold text-rose-600 text-right max-w-[180px]">{currentProduct.technology}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Bảo hành:</span>
                <span className="font-bold text-slate-800">{currentProduct.warranty}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs font-black text-slate-900 uppercase">
                <Sliders className="w-4 h-4 text-rose-600" />
                <span>Trọng Số Tính Điểm Tương Đồng</span>
              </div>
              <button
                onClick={handleResetWeights}
                className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Mặc định
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              {[
                { key: 'category', label: '1. Khớp Danh Mục (20%)', val: customWeights.category },
                { key: 'function', label: '2. Khớp Nhóm Công Năng (15%)', val: customWeights.function },
                { key: 'capacity', label: '3. Khớp Dung Tích (15%)', val: customWeights.capacity },
                { key: 'power', label: '4. Khớp Công Suất Watt (10%)', val: customWeights.power },
                { key: 'material', label: '5. Khớp Vật Liệu & Phủ Men (10%)', val: customWeights.material },
                { key: 'tech', label: '6. Khớp Công Nghệ IH/3D (10%)', val: customWeights.tech },
                { key: 'features', label: '7. Khớp Tính Năng Thông Minh (10%)', val: customWeights.features },
                { key: 'warranty', label: '8. Khớp Chính Sách Bảo Hành (5%)', val: customWeights.warranty },
              ].map((w) => (
                <div key={w.key} className="flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">{w.label}</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">{(w.val * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 7 cols */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900">
              Đối Thủ Tương Đương Cho <span className="text-rose-600 font-mono">{currentProduct.sku}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-500 text-[11px]">Hiển thị:</span>
              {[3, 5, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setTopCount(num)}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    topCount === num ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  TOP {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {matchedCompetitors.slice(0, topCount).map((comp, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 uppercase">
                          {comp.brand}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Model: {comp.model}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Điểm Khớp</span>
                    <div className="text-base sm:text-lg font-black text-rose-600">{comp.matchScore}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-xl text-xs text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans">Giá Web</span>
                    <div className="font-bold text-slate-800">{formatVND(comp.price)}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans">Shopee</span>
                    <div className="font-bold text-rose-600">{formatVND(comp.shopeePrice)}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans">TikTok</span>
                    <div className="font-bold text-slate-800">{formatVND(comp.tiktokPrice)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
