import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { History, TrendingDown, TrendingUp, Calendar, Filter } from 'lucide-react';
import { mockPriceHistoryData, mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function PriceHistoryView() {
  const [timeRange, setTimeRange] = useState('3 THÁNG');
  const [selectedSku, setSelectedSku] = useState(mockProducts[0].id);

  const product = mockProducts.find(p => p.id === selectedSku) || mockProducts[0];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1">
          <div className="font-black text-slate-300 pb-1 border-b border-slate-800">{label}</div>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between gap-4" style={{ color: entry.color }}>
              <span>{entry.name}:</span>
              <span className="font-mono font-bold">{formatVND(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Lịch Sử Biến Động Giá & Kháng Cự (TradingView Style)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Biểu đồ biến động giá lịch sử theo thời gian thực giữa Lock&King, Trung bình thị trường và các đối thủ chính (Sunhouse, Kalite, Bear).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSku}
            onChange={(e) => setSelectedSku(e.target.value)}
            className="py-1.5 sm:py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-bold text-slate-900 flex-1 sm:flex-none"
          >
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
            ))}
          </select>

          {/* Time range selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {['7 NGÀY', '30 NGÀY', '3 THÁNG', '6 THÁNG', '1 NĂM'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 sm:px-3 py-1 rounded-lg transition-all text-[10px] sm:text-xs whitespace-nowrap ${
                  timeRange === range ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-900 text-white mr-2">
              {product.sku}
            </span>
            <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">{product.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-rose-600 rounded"></span> Lock&King</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-slate-400 rounded"></span> TB Thị Trường</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-orange-500 rounded"></span> Sunhouse</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-blue-600 rounded"></span> Kalite</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-amber-500 rounded"></span> Bear</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-64 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPriceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                domain={['dataMin - 100000', 'dataMax + 100000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="lkPrice" name="Lock&King" stroke="#e11d48" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="marketAvg" name="TB Thị Trường" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              <Line type="monotone" dataKey="sunhouse" name="Sunhouse" stroke="#f97316" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kalite" name="Kalite" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="bear" name="Bear" stroke="#d97706" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>💡 <strong>Quan sát từ AI:</strong> Giá Lock&King duy trì ổn định quanh 1.79M, đối thủ Sunhouse và Bear thường giảm giá sâu vào các đợt Mega Sale 9.9, 10.10, 11.11.</span>
          <span className="text-emerald-700 font-bold font-mono whitespace-nowrap">Độ ổn định giá: 95/100</span>
        </div>
      </div>
    </div>
  );
}
