import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  Check
} from 'lucide-react';
import { mockAlerts } from '../data/mockData';

export default function AlertCenterView({ onNavigatePriceWar, onNavigateInventory, onSelectProduct }) {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [activeFilter, setActiveFilter] = useState('TẤT CẢ');

  const handleMarkAsRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const filtered = alerts.filter(a => {
    if (activeFilter === 'CHƯA ĐỌC') return !a.isRead;
    if (activeFilter === 'MỨC ĐỘ CAO') return a.severity === 'HIGH' || a.severity === 'CAO';
    if (activeFilter === 'CHIẾN TRANH GIÁ') return a.type.includes('CHIẾN TRANH') || a.type === 'PRICE_WAR';
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Trung Tâm Cảnh Báo Thị Trường (Alert Center)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Cảnh báo tập trung về biến động giá đối thủ, rủi ro tồn kho, sụt giảm PCS và cơ hội thị trường mới.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['TẤT CẢ', 'CHƯA ĐỌC', 'MỨC ĐỘ CAO', 'CHIẾN TRANH GIÁ'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              !alert.isRead ? 'bg-rose-50/40 border-rose-200' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-xl flex-shrink-0 ${
                alert.severity === 'HIGH' || alert.severity === 'CAO' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {alert.type.includes('CHIẾN TRANH') || alert.type === 'PRICE_WAR' ? <Flame className="w-4 h-4 sm:w-5 sm:h-5" /> : <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                    alert.severity === 'HIGH' || alert.severity === 'CAO' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {alert.type}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {alert.time}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{alert.title}</h3>
                <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5 max-w-2xl leading-relaxed">{alert.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              {!alert.isRead && (
                <button
                  onClick={() => handleMarkAsRead(alert.id)}
                  className="px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Đã đọc
                </button>
              )}
              <button
                onClick={() => {
                  if (alert.type.includes('CHIẾN TRANH') || alert.type === 'PRICE_WAR') onNavigatePriceWar();
                  else if (alert.type.includes('TỒN KHO') || alert.type === 'STOCK_RISK') onNavigateInventory();
                }}
                className="px-3.5 sm:px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] sm:text-xs font-bold shadow-2xs"
              >
                {alert.actionText} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
