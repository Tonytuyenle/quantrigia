import React from 'react';
import {
  LayoutDashboard,
  Package,
  Sparkles,
  Sliders,
  Bot,
  Menu
} from 'lucide-react';

export default function MobileBottomNav({ currentTab, onSelectTab, onOpenMenu }) {
  const navItems = [
    { id: 'dashboard', name: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'product-center', name: 'Sản Phẩm', icon: Package },
    { id: 'new-product', name: 'Nhập Hàng', icon: Sparkles, badge: 'POS' },
    { id: 'what-if-simulator', name: 'Mô Phỏng', icon: Sliders },
    { id: 'ai-advisor', name: 'AI Cố Vấn', icon: Bot, isAi: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-inset-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive
                ? 'text-rose-500 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-rose-500' : 'text-slate-400'}`} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-3 text-[9px] font-black bg-rose-600 text-white px-1 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              {item.name}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-rose-500 rounded-full"></span>
            )}
          </button>
        );
      })}

      {/* Menu drawer button */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
      >
        <Menu className="w-5 h-5 text-slate-400" />
        <span className="text-[10px] tracking-tight mt-0.5">Tất Cả</span>
      </button>
    </nav>
  );
}
