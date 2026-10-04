import React, { useState } from 'react';
import {
  GitCompare,
  Trophy,
  CheckCircle2,
  MinusCircle,
  XCircle,
  Sparkles,
  Download,
  Layers
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function CompareProductsView() {
  const [selectedLkSku, setSelectedLkSku] = useState(mockProducts[0].id);

  const lkProduct = mockProducts.find(p => p.id === selectedLkSku) || mockProducts[0];

  const comp1 = lkProduct.matchedCompetitors?.[0] || {
    brand: 'Sunhouse',
    model: 'SHD-8868G',
    price: 1690000,
    specs: { capacity: '1.8L', power: '1200W', material: 'Hợp kim nhôm men Whitford', tech: 'IH Cao tần', warranty: '24 tháng' }
  };

  const comp2 = lkProduct.matchedCompetitors?.[1] || {
    brand: 'Kalite',
    model: 'KL-888',
    price: 1890000,
    specs: { capacity: '1.8L', power: '1300W', material: 'Inox 304 tráng Ceramic', tech: 'IH Cao tần', warranty: '12 tháng' }
  };

  const comp3 = lkProduct.matchedCompetitors?.[2] || {
    brand: 'Bear',
    model: 'DFH-B20J1',
    price: 1590000,
    specs: { capacity: '1.8L', power: '1100W', material: 'Nhôm Ceramic', tech: 'Nhiệt 3D', warranty: '18 tháng' }
  };

  const comparisonRows = [
    {
      criterion: 'Giá Bán Lẻ (Retail Price)',
      lk: formatVND(lkProduct.sellingPrice),
      c1: formatVND(comp1.price),
      c2: formatVND(comp2.price),
      c3: formatVND(comp3.price),
      status: 'HÒA',
      statusText: 'HÒA',
      statusColor: 'bg-amber-500 text-white',
      cellColor: 'bg-amber-50 text-amber-950',
      reason: 'Giá Lock&King định vị tại vùng giá ngọt 1.79M, cân bằng giữa tính năng cao và lợi nhuận.'
    },
    {
      criterion: 'Dung Tích Thực (Capacity)',
      lk: lkProduct.capacity || '1.8L',
      c1: comp1.specs?.capacity || '1.8L',
      c2: comp2.specs?.capacity || '1.8L',
      c3: comp3.specs?.capacity || '1.8L',
      status: 'HÒA',
      statusText: 'HÒA',
      statusColor: 'bg-amber-500 text-white',
      cellColor: 'bg-amber-50 text-amber-950',
      reason: 'Các bên đều đạt chuẩn 1.8L cho gia đình 4-8 người.'
    },
    {
      criterion: 'Công Suất Gia Nhiệt (Power)',
      lk: `${lkProduct.power} (IH Biến Tần)`,
      c1: comp1.specs?.power || '1200W',
      c2: comp2.specs?.power || '1300W',
      c3: comp3.specs?.power || '1100W',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Lock&King 1300W gia nhiệt nhanh nhất nhóm cùng Kalite.'
    },
    {
      criterion: 'Chất Liệu Lòng Nồi (Material)',
      lk: 'Lòng Titanium 3.5mm kim cương',
      c1: comp1.specs?.material || 'Nhôm men Whitford',
      c2: comp2.specs?.material || 'Inox Ceramic',
      c3: comp3.specs?.material || 'Nhôm Ceramic',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Vật liệu Titanium vượt trội về độ bền bỉ so với men Whitford/Ceramic.'
    },
    {
      criterion: 'Công Nghệ Cốt Lõi (Tech)',
      lk: 'IH Cao tần 360° + Cảm biến kép',
      c1: 'IH Cao tần tiêu chuẩn',
      c2: 'IH Cao tần',
      c3: 'Mâm nhiệt 3D (Không IH)',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Công nghệ IH kết hợp cảm biến kép giữ cơm dẻo ngon không bị nát.'
    },
    {
      criterion: 'Bảo Hành Chính Hãng',
      lk: '24 tháng đổi mới 30 ngày',
      c1: comp1.specs?.warranty || '24 tháng',
      c2: comp2.specs?.warranty || '12 tháng',
      c3: comp3.specs?.warranty || '18 tháng',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Bảo hành 24 tháng vượt Kalite (12 tháng) và Bear (18 tháng).'
    },
    {
      criterion: 'Số Chế Độ Nấu Tự Động',
      lk: '12 Chế độ OLED',
      c1: '8 Chế độ',
      c2: '10 Chế độ',
      c3: '6 Chế độ',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Menu đa dạng nhất phục vụ cả nấu cháo, súp, cơm niêu, ngũ cốc.'
    },
    {
      criterion: 'Chỉ Số Cạnh Tranh (PCS)',
      lk: `${lkProduct.pcs}/100 (RẤT MẠNH)`,
      c1: '78/100 (Khá)',
      c2: '74/100 (Trung bình)',
      c3: '72/100 (Bình dân)',
      status: 'THẮNG',
      statusText: 'THẮNG',
      statusColor: 'bg-emerald-600 text-white',
      cellColor: 'bg-emerald-50 text-emerald-950',
      reason: 'Tổng hòa giá trị/giá bán của Lock&King dẫn đầu phân khúc.'
    }
  ];

  const winCount = comparisonRows.filter(r => r.status === 'THẮNG').length;
  const drawCount = comparisonRows.filter(r => r.status === 'HÒA').length;
  const loseCount = comparisonRows.filter(r => r.status === 'THUA').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Ma Trận So Sánh Đối Đầu (Compare Matrix)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            So sánh đối đầu trực diện giữa Lock&King và 3 đối thủ lớn (Sunhouse, Kalite, Bear) theo tiêu chuẩn màu sắc trực quan.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedLkSku}
            onChange={(e) => setSelectedLkSku(e.target.value)}
            className="py-1.5 sm:py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-bold text-slate-900"
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-lg shadow-rose-600/40 flex-shrink-0">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs text-rose-400 font-bold uppercase tracking-wider">
              Kết Quả Đối Đầu Ma Trận Tính Năng & Giá
            </div>
            <div className="text-sm sm:text-lg font-black">
              LOCK&KING <span className="text-rose-500">{lkProduct.sku}</span> Áp Đảo Phân Khúc
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 text-xs font-bold">
          <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-center">
            <div className="text-xl sm:text-2xl font-black">{winCount}</div>
            <div className="text-[9px] uppercase">THẮNG (WIN)</div>
          </div>
          <div className="bg-amber-950 border border-amber-500/40 text-amber-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-center">
            <div className="text-xl sm:text-2xl font-black">{drawCount}</div>
            <div className="text-[9px] uppercase">HÒA (DRAW)</div>
          </div>
          <div className="bg-rose-950 border border-rose-500/40 text-rose-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-center">
            <div className="text-xl sm:text-2xl font-black">{loseCount}</div>
            <div className="text-[9px] uppercase">THUA (LOSE)</div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4 w-1/4">Tiêu Chí So Sánh</th>
                <th className="py-3 px-3 sm:px-4 w-1/4 bg-rose-950/80 border-x border-rose-900 text-rose-300 font-black">
                  LOCK&KING ({lkProduct.sku})
                </th>
                <th className="py-3 px-3 font-semibold">{comp1.brand}</th>
                <th className="py-3 px-3 font-semibold">{comp2.brand}</th>
                <th className="py-3 px-3 font-semibold">{comp3.brand}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-bold text-slate-800">
                    <div>{row.criterion}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{row.reason}</div>
                  </td>

                  <td className={`py-3 px-3 sm:px-4 font-bold border-x border-slate-200/80 ${row.cellColor}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{row.lk}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase flex-shrink-0 ${row.statusColor}`}>
                        {row.statusText}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-700">{row.c1}</td>
                  <td className="py-3 px-3 text-slate-700">{row.c2}</td>
                  <td className="py-3 px-3 text-slate-700">{row.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
