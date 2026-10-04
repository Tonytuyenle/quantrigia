import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  Lock,
  Users
} from 'lucide-react';

export default function UserPermissionView() {
  const permissionsMatrix = [
    { module: 'Tổng Quan CEO & Ra Quyết Định', ceo: true, sales: false, marketing: false, purchasing: false, audit: true, admin: true },
    { module: 'Trung Tâm Sản Phẩm & Thông Số Master', ceo: true, sales: true, marketing: true, purchasing: true, audit: true, admin: true },
    { module: 'Bóc Tách Chi Phí True Cost 11 Thành Phần', ceo: true, sales: false, marketing: false, purchasing: true, audit: true, admin: true },
    { module: 'Thang Giá (Price Ladder) & Phê Duyệt Giá', ceo: true, sales: true, marketing: false, purchasing: false, audit: true, admin: true },
    { module: 'Thẩm Định Sản Phẩm Mới & Điểm POS', ceo: true, sales: false, marketing: false, purchasing: true, audit: false, admin: true },
    { module: 'Mô Phỏng Giá What-If (Tài Chính Động)', ceo: true, sales: true, marketing: true, purchasing: true, audit: true, admin: true },
    { module: 'Bộ Dò Chiến Tranh Giá & Kịch Bản Phòng Thủ', ceo: true, sales: true, marketing: true, purchasing: false, audit: true, admin: true },
    { module: 'Trung Tâm Dữ Liệu & Import Excel/CSV', ceo: true, sales: false, marketing: false, purchasing: false, audit: false, admin: true },
    { module: 'Cài Đặt Trọng Số Thuật Toán & Hệ Thống', ceo: true, sales: false, marketing: false, purchasing: false, audit: false, admin: true },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Phân Quyền Vai Trò Người Dùng (RBAC Matrix)
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Ma trận phân quyền chi tiết giữa các bộ phận: CEO, Kinh Doanh, Marketing, Mua Hàng, Ban Kiểm Soát và Quản Trị Hệ Thống.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4">Phân Hệ Chức Năng</th>
                <th className="py-3 px-2.5 text-center bg-rose-950 text-rose-300">CEO</th>
                <th className="py-3 px-2.5 text-center">Kinh Doanh</th>
                <th className="py-3 px-2.5 text-center">Marketing</th>
                <th className="py-3 px-2.5 text-center">Mua Hàng</th>
                <th className="py-3 px-2.5 text-center">Kiểm Soát</th>
                <th className="py-3 px-2.5 text-center">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-bold text-slate-800 whitespace-nowrap sm:whitespace-normal">{p.module}</td>
                  <td className="py-3 px-2.5 text-center bg-rose-50/50">
                    {p.ceo ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-2.5 text-center">
                    {p.sales ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-2.5 text-center">
                    {p.marketing ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-2.5 text-center">
                    {p.purchasing ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-2.5 text-center">
                    {p.audit ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-2.5 text-center">
                    {p.admin ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
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
