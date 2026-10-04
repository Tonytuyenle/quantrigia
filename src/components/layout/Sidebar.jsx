import React from 'react';
import {
  LayoutDashboard,
  Package,
  Users,
  GitCompare,
  Sparkles,
  DollarSign,
  TrendingUp,
  History,
  PieChart,
  Lightbulb,
  Sliders,
  Boxes,
  ShieldAlert,
  Bell,
  Bot,
  FileSpreadsheet,
  Database,
  Settings,
  ShieldCheck,
  ChevronRight,
  Layers,
  X
} from 'lucide-react';

export const navigationSections = [
  {
    title: 'ĐIỀU HÀNH & TỔNG QUAN',
    items: [
      { id: 'dashboard', name: 'Tổng Quan CEO', icon: LayoutDashboard, badge: 'Trực tiếp', badgeColor: 'bg-rose-500 text-white' },
      { id: 'ai-advisor', name: 'Trợ Lý Chiến Lược AI', icon: Bot, badge: 'AI Pro', badgeColor: 'bg-indigo-600 text-white' },
      { id: 'price-war', name: 'Bộ Dò Chiến Tranh Giá', icon: ShieldAlert, badge: '2 Cảnh báo', badgeColor: 'bg-rose-600 text-white animate-pulse' },
      { id: 'alerts', name: 'Trung Tâm Cảnh Báo', icon: Bell, badge: '5 mới', badgeColor: 'bg-amber-500 text-white' },
    ]
  },
  {
    title: 'SẢN PHẨM & ĐỐI THỦ',
    items: [
      { id: 'product-center', name: 'Trung Tâm Sản Phẩm', icon: Package },
      { id: 'competitors', name: 'Đối Thủ Cạnh Tranh', icon: Users },
      { id: 'product-mapping', name: 'Ánh Xạ Sản Phẩm (Mapping)', icon: Layers },
      { id: 'compare-products', name: 'So Sánh Đối Đầu', icon: GitCompare },
      { id: 'new-product', name: 'Thẩm Định Sản Phẩm Mới', icon: Sparkles, badge: 'Điểm POS', badgeColor: 'bg-emerald-600 text-white' },
    ]
  },
  {
    title: 'ĐỊNH GIÁ & THỊ TRƯỜNG',
    items: [
      { id: 'pricing-intelligence', name: 'Định Giá & Giá Vốn', icon: DollarSign },
      { id: 'market-price', name: 'Giá Thị Trường Đa Kênh', icon: TrendingUp },
      { id: 'price-history', name: 'Lịch Sử Biến Động Giá', icon: History },
      { id: 'market-gap', name: 'Khoảng Trống Thị Trường', icon: PieChart, badge: 'Cơ hội', badgeColor: 'bg-blue-600 text-white' },
      { id: 'product-opportunity', name: 'Cơ Hội Danh Mục Mở Rộng', icon: Lightbulb },
      { id: 'what-if-simulator', name: 'Mô Phỏng Giá What-If', icon: Sliders, badge: 'Tương tác', badgeColor: 'bg-purple-600 text-white' },
    ]
  },
  {
    title: 'QUẢN TRỊ & DỮ LIỆU',
    items: [
      { id: 'inventory-intelligence', name: 'Quản Trị Tồn Kho & Rủi Ro', icon: Boxes },
      { id: 'reports', name: 'Báo Cáo Quản Trị', icon: FileSpreadsheet },
      { id: 'data-center', name: 'Trung Tâm Dữ Liệu & Audit', icon: Database },
      { id: 'settings', name: 'Cài Đặt Trọng Số Thuật Toán', icon: Settings },
      { id: 'user-permission', name: 'Phân Quyền & Người Dùng', icon: ShieldCheck },
    ]
  }
];

export default function Sidebar({
  currentTab,
  onSelectTab,
  isCollapsed,
  isOpenMobile,
  onCloseMobile
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 z-50 bg-slate-950 text-slate-200 transition-all duration-300 flex flex-col border-r border-slate-800 ${
          isOpenMobile
            ? 'left-0 w-72 shadow-2xl'
            : '-left-72 lg:left-0 ' + (isCollapsed ? 'w-20' : 'w-72')
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center font-black text-white text-lg tracking-wider shadow-lg shadow-rose-600/30 flex-shrink-0">
              LK
            </div>
            {(!isCollapsed || isOpenMobile) && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-white text-sm tracking-wider uppercase truncate">
                  LOCK&KING
                </span>
                <span className="text-[10px] text-rose-400 font-bold tracking-wide uppercase truncate">
                  Trí Tuệ Sản Phẩm & Giá
                </span>
              </div>
            )}
          </div>

          {/* Close button for Mobile Drawer */}
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 pb-20 lg:pb-4">
          {navigationSections.map((section, sIndex) => (
            <div key={sIndex} className="space-y-1">
              {(!isCollapsed || isOpenMobile) && (
                <div className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      if (isOpenMobile) onCloseMobile();
                    }}
                    title={isCollapsed && !isOpenMobile ? item.name : undefined}
                    className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-rose-400'}`} />
                      {(!isCollapsed || isOpenMobile) && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </div>
                    {(!isCollapsed || isOpenMobile) && item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* System Status Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 hidden lg:block">
          {!isCollapsed ? (
            <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-bold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Bộ Thu Thập Dữ Liệu
                </span>
                <span className="text-emerald-400 font-mono text-[10px] font-bold">98.4% Khớp</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                Quét 1.450 SKU lúc 02:30 hôm nay
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
