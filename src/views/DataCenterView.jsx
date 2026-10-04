import React, { useState } from 'react';
import {
  Database,
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldCheck,
  FileText,
  User
} from 'lucide-react';
import { mockAuditLogs, mockProducts } from '../data/mockData';

export default function DataCenterView() {
  const [activeTab, setActiveTab] = useState('health');
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleSimulateImport = (e) => {
    e.preventDefault();
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Trung Tâm Dữ Liệu & Nhật Ký Kiểm Soát (Data Center & Audit)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Kiểm soát chất lượng dữ liệu giá thị trường, nhập xuất Excel/CSV và theo dõi toàn bộ lịch sử Audit Log thay đổi giá.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold overflow-x-auto">
          {[
            { id: 'health', label: '1. Sức Khỏe Dữ Liệu' },
            { id: 'import', label: '2. Import Excel/CSV' },
            { id: 'audit', label: '3. Nhật Ký Audit Log' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-[11px] sm:text-xs ${
                activeTab === tab.id ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: DATA HEALTH METRICS */}
      {activeTab === 'health' && (
        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Độ Tin Cậy Trung Bình</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">96.8%</div>
              <span className="text-[10px] text-emerald-700 font-semibold">Đạt chuẩn ra quyết định</span>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Thiếu Thông Số (Specs)</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">0 <span className="text-xs font-normal text-slate-500">SKU</span></div>
              <span className="text-[10px] text-emerald-600 font-semibold">Đã chuẩn hóa 100%</span>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Quá Hạn ({'>'}72h)</span>
              <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">3 <span className="text-xs font-normal text-slate-500">Shop</span></div>
              <span className="text-[10px] text-amber-700 font-semibold">TikTok Shop ngoài</span>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Trùng Lặp Mã (Duplicate)</span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">0 <span className="text-xs font-normal text-slate-500">SKU</span></div>
              <span className="text-[10px] text-emerald-600 font-semibold">Duy nhất tuyệt đối</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Trạng Thái Đồng Bộ Nguồn Dữ Liệu Sàn TMĐT
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { source: 'Shopee Official Mall', status: 'TRỰC TIẾP', latency: '15 phút', confidence: '99%' },
                { source: 'TikTok Shop Verified Mall', status: 'TRỰC TIẾP', latency: '30 phút', confidence: '97%' },
                { source: 'Lazada LazMall', status: 'TRỰC TIẾP', latency: '1 giờ', confidence: '96%' },
                { source: 'Website Chính Hãng Đối Thủ', status: 'TRỰC TIẾP', latency: '6 giờ', confidence: '98%' },
              ].map((src, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-800">{src.source}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                    <span className="hidden sm:inline">Độ trễ: {src.latency}</span>
                    <span className="font-bold text-slate-900">Tin cậy: {src.confidence}</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">
                      {src.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IMPORT EXCEL / CSV */}
      {activeTab === 'import' && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="max-w-xl mx-auto text-center space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">Import Bảng Báo Giá / File Đối Thủ Mới</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kéo thả file .XLSX hoặc .CSV chứa danh mục SKU, giá FOB, giá bán lẻ đối thủ để hệ thống tự động nhận diện và tính toán.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-6 sm:p-8 transition-colors bg-slate-50/50 flex flex-col items-center justify-center space-y-2 cursor-pointer">
              <FileSpreadsheet className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-rose-600">Chọn file từ thiết bị</span> hoặc kéo thả vào đây
              </div>
              <span className="text-[10px] text-slate-400">Hỗ trợ .xlsx, .csv (Tối đa 50MB)</span>
            </div>

            {importSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã nạp và khớp thành công 120 SKU đối thủ mới vào hệ thống!</span>
              </div>
            )}

            <button
              onClick={handleSimulateImport}
              disabled={isImporting}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 disabled:bg-slate-300"
            >
              {isImporting ? 'Đang đọc & xác thực dữ liệu...' : 'Bắt Đầu Xử Lý File'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Nhật Ký Thay Đổi & Phê Duyệt Giá (Audit Log)
            </h3>
            <span className="text-[10px] text-slate-400">Minh bạch & bảo mật</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3 sm:px-4">Người Thực Hiện</th>
                  <th className="py-3 px-3">Hành Động</th>
                  <th className="py-3 px-3">Giá Cũ</th>
                  <th className="py-3 px-3">Giá Mới</th>
                  <th className="py-3 px-3">Thời Gian</th>
                  <th className="py-3 px-3 sm:px-4">Lý Do Phê Duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{log.user}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">{log.action}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 line-through whitespace-nowrap">{log.oldValue}</td>
                    <td className="py-3 px-3 font-mono font-bold text-rose-600 whitespace-nowrap">{log.newValue}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-3 sm:px-4 text-slate-600 text-[11px]">{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
