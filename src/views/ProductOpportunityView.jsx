import React from 'react';
import {
  Lightbulb,
  Sparkles,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

export default function ProductOpportunityView({ onNavigateNewProduct }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Cơ Hội Mở Rộng Danh Mục Sản Phẩm (POS Matrix)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Bảng xếp hạng cơ hội sản phẩm mới (POS) và danh mục tiềm năng Lock&King cần lấp đầy khoảng trống thị trường.
          </p>
        </div>

        <button
          onClick={onNavigateNewProduct}
          className="px-3.5 sm:px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Thẩm Định SKU Mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {[
          { title: 'Nồi chiên hấp kết hợp Steam Air Fryer 7L', pos: 94, margin: '42%', tag: 'PHÂN KHÚC VÀNG', desc: 'Thị trường chưa có thương hiệu nào thống trị phân khúc nồi chiên hấp hơi nước dưới 2 triệu.' },
          { title: 'Máy ép chậm miệng lớn nguyên quả 250W', pos: 88, margin: '38%', tag: 'NHU CẦU CAO', desc: 'Nhu cầu mùa hè và sống khỏe tăng mạnh, Lock&King chưa có sản phẩm máy ép chậm.' },
          { title: 'Nồi cơm điện lòng gốm sứ Niêu Đất 1.5L', pos: 84, margin: '36%', tag: 'CƠ HỘI TỐT', desc: 'Đánh trúng tâm lý người tiêu dùng thích cơm niêu truyền thống nhưng công nghệ thông minh.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                  {item.tag}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-600 font-mono">POS {item.pos}/100</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Margin dự kiến: <strong className="text-slate-900">{item.margin}</strong></span>
              <button onClick={onNavigateNewProduct} className="text-rose-600 font-bold hover:underline">
                Thẩm định ngay →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
