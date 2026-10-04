import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Menu,
  ChevronDown,
  UserCheck,
  Shield,
  Download,
  RefreshCw,
  X
} from 'lucide-react';
import { mockAlerts } from '../../data/mockData';

export const userRoles = [
  { id: 'CEO', label: 'CEO - Ban Điều Hành', description: 'Toàn quyền ra quyết định & xem mọi chỉ số tài chính' },
  { id: 'SALES', label: 'Phòng Kinh Doanh', description: 'Theo dõi giá Lock&King, đối thủ & chiết khấu đại lý' },
  { id: 'MARKETING', label: 'Phòng Marketing', description: 'Theo dõi giá sàn TMĐT, chiến dịch & đối thủ' },
  { id: 'PURCHASING', label: 'Phòng Mua Hàng', description: 'Thẩm định sản phẩm mới, tính FOB & POS' },
  { id: 'AUDIT', label: 'Ban Kiểm Soát', description: 'Kiểm soát sai lệch giá sàn & rủi ro thất thoát' },
  { id: 'ADMIN', label: 'Quản Trị Hệ Thống', description: 'Cấu hình dữ liệu, trọng số thuật toán & phân quyền' }
];

export default function Header({
  activeRole,
  onSelectRole,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  onOpenAlerts,
  onOpenAiCommand
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  const unreadAlerts = mockAlerts.filter(a => !a.isRead);

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white border-b border-slate-200/90 px-3 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left side: Hamburger toggle + Search */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 max-w-xl">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          title="Mở Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Trigger */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:block p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title="Thu gọn / Mở rộng Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo SKU, Model, Đối thủ (Sunhouse, Kalite, Bear, Tefal)..."
            className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border border-transparent focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right side: AI Command + Alerts + Role Switcher */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick AI Command trigger */}
        <button
          onClick={onOpenAiCommand}
          className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-rose-50 to-indigo-50 hover:from-rose-100 hover:to-indigo-100 border border-rose-200/80 text-slate-800 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold shadow-2xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>Lệnh AI CEO</span>
        </button>

        {/* Notifications Alert */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
            className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Thông báo & Cảnh báo thị trường"
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotificationDrawer && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Cảnh Báo Thị Trường ({mockAlerts.length})</span>
                </div>
                <button
                  onClick={() => setShowNotificationDrawer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 text-xs hover:bg-slate-50 transition-colors ${!alert.isRead ? 'bg-rose-50/40' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                        alert.severity === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-[10px] text-slate-400">{alert.time}</span>
                    </div>
                    <div className="font-bold text-slate-800 mb-0.5">{alert.title}</div>
                    <p className="text-slate-500 text-[11px] leading-relaxed mb-2">{alert.description}</p>
                    <button
                      onClick={() => {
                        setShowNotificationDrawer(false);
                        onOpenAlerts();
                      }}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                    >
                      {alert.actionText} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              {activeRole.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-extrabold text-slate-900 leading-none">{activeRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-3.5 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Chuyển đổi góc nhìn phân quyền
              </div>
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    onSelectRole(role.id);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-start space-x-2.5 transition-colors ${
                    activeRole === role.id ? 'bg-rose-50 text-rose-700 font-bold' : 'text-slate-700'
                  }`}
                >
                  <UserCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeRole === role.id ? 'text-rose-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold">{role.label}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
