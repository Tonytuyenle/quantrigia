import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Gift,
  PackagePlus,
  Tag,
  Share2
} from 'lucide-react';
import { mockPriceWarAlerts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function PriceWarDetector() {
  const [selectedAlert, setSelectedAlert] = useState(mockPriceWarAlerts[0]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white p-4 sm:p-6 rounded-2xl border border-rose-900 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              CẢNH BÁO SỚM
            </span>
            <span className="text-xs text-slate-400">Tự động phát hiện hành vi xả hàng giảm giá</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
            Bộ Dò Chiến Tranh Giá & Kịch Bản Phòng Thủ (Price War Detector)
          </h1>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
            Hệ thống tự động phát hiện khi nhiều đối thủ cùng giảm giá mạnh {'>'} 5% trong cùng 1 phân khúc, phân tích nguyên nhân và đưa ra <strong>Kịch Bản Phòng Thủ Bền Vững</strong> để bảo vệ thương hiệu và biên lợi nhuận.
          </p>
        </div>

        <div className="bg-rose-900/40 border border-rose-700/50 p-2.5 sm:p-3 rounded-xl text-xs text-center self-start sm:self-auto">
          <div className="text-slate-400 text-[10px] uppercase font-bold">Trạng Thái Thị Trường</div>
          <div className="text-rose-400 font-black text-sm mt-0.5">2 Cụm Chiến Tranh Giá</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left List: 5 cols */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Các Điểm Nóng Giá Đang Xảy Ra
          </h2>

          <div className="space-y-2.5 sm:space-y-3">
            {mockPriceWarAlerts.map((war) => (
              <div
                key={war.id}
                onClick={() => setSelectedAlert(war)}
                className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedAlert.id === war.id
                    ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-900">{war.category}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    war.severity === 'CAO' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    MỨC ĐỘ {war.severity}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-medium mb-2">{war.triggerSummary}</div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>SKU Lock&King: <strong className="text-slate-900 font-mono">{war.lkAffectedSku}</strong></span>
                  <span className="text-rose-600 font-bold">{war.detectedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Playbook: 7 cols */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {selectedAlert && (
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Đối Thủ Giảm Giá Trong Đợt Này
                  </h3>
                  <span className="text-[10px] text-slate-500">Phân khúc: {selectedAlert.segment}</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {selectedAlert.competitorsInvolved.map((comp, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-slate-900">{comp.brand}</span>
                        <span className="text-slate-500 font-mono ml-1">({comp.model})</span>
                        <div className="text-[10px] text-slate-400">Kênh: {comp.channel}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="line-through text-slate-400 font-mono">{formatVND(comp.oldPrice)}</span>
                          <span className="font-bold text-slate-900 font-mono">{formatVND(comp.newPrice)}</span>
                        </div>
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                          {comp.dropPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Defense Strategy Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3.5">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>KỊCH BẢN PHÒNG THỦ KHÔNG GIẢM GIÁ (COUNTER-PLAYBOOK)</span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-white">
                  {selectedAlert.aiDefenseStrategy.action}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="font-bold text-amber-400 mb-0.5">🔍 Đánh giá bối cảnh từ AI:</div>
                  {selectedAlert.aiDefenseStrategy.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">🎯 3 Hành động đề xuất tức thì:</div>
                  {selectedAlert.aiDefenseStrategy.playbook.map((p, i) => (
                    <div key={i} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 flex items-start gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
