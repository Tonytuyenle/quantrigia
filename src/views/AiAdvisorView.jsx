import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatVND } from '../utils/pricingEngine';

export default function AiAdvisorView({ onSelectProduct }) {
  const quickPrompts = [
    'Sản phẩm nào đang bị định giá quá cao?',
    '5 SKU có PCS thấp nhất cần xử lý?',
    'Sản phẩm nào có thể tăng giá ngay?',
    'Nếu mục tiêu margin 35%, hãy đề xuất giá mới.',
    'Phân khúc nào Lock&King còn thiếu sản phẩm?',
    'Sản phẩm nào nên dừng nhập vì rủi ro tồn kho?'
  ];

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Xin chào CEO & Ban Điều Hành Lock&King. Tôi là Trợ Lý Chiến Lược Định Giá AI (AI Pricing Advisor). Tôi đã tải toàn bộ dữ liệu 1.450 SKU, giá 10 đối thủ, chi phí True Cost và tồn kho. Hãy chọn câu hỏi gợi ý bên dưới hoặc nhập yêu cầu tự nhiên để phân tích.',
      structuredResult: null
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = {
        sender: 'ai',
        text: '',
        structuredResult: null
      };

      const lowerQ = q.toLowerCase();

      if (lowerQ.includes('quá cao') || lowerQ.includes('định giá cao')) {
        aiResponse.text = 'Phân tích hệ thống ghi nhận 2 SKU có Price Index vượt ngưỡng an toàn so với đối thủ:';
        aiResponse.structuredResult = {
          finding: 'LK-990 (Máy hút mùi 70cm) và LK-8418 đang có giá niêm yết cao hơn trung bình thị trường từ 4.1% đến 6.1%.',
          evidence: 'LK-990 bán 3.290.000 đ trong khi Sunhouse SHB-6629 bán 2.890.000 đ (-12%). Tốc độ bán LK-990 giảm còn 54 cái/tháng, tồn kho lên tới 8.9 tháng.',
          risk: 'Khách hàng chuyển sang mua Sunhouse/Kangaroo trên Shopee; chi phí lưu kho ăn mòn lợi nhuận ròng.',
          recommendation: 'Giảm giá LK-990 từ 3.29M xuống Target 2.99M hoặc đóng gói Combo với Bếp từ LK-4420. Riêng LK-8418 giữ nguyên giá vì có USP lòng nồi Titanium.',
          action: 'Áp dụng ngay kịch bản Combo LK-4420 + LK-990 giảm 1.200.000 đ cho đại lý.'
        };
      } else if (lowerQ.includes('tăng giá') || lowerQ.includes('có thể tăng')) {
        aiResponse.text = 'Phân tích cơ hội tăng giá dựa trên điểm PCS cao và tồn kho thấp:';
        aiResponse.structuredResult = {
          finding: 'SKU LK-3118 (Nồi chiên 6.5L Turbo) và LK-102 (Chảo xào Titanium 28cm) có đủ điều kiện tăng giá an toàn.',
          evidence: 'LK-3118 có điểm PCS 89/100, giá đang rẻ hơn đối thủ 7.2%, bán rất chạy (660 cái/tháng), tồn kho chỉ còn 1.4 tháng.',
          risk: 'Tăng quá 5% có thể ảnh hưởng đến tỷ lệ chuyển đổi trên TikTok Shop.',
          recommendation: 'Tăng giá bán lẻ LK-3118 từ 1.290.000 đ lên 1.350.000 đ (+4.6%), đồng thời mở PO đặt hàng mới 2.500 cái.',
          action: 'Cập nhật giá niêm yết trên các sàn TMĐT và thông báo đại lý trước 3 ngày.'
        };
      } else if (lowerQ.includes('dừng nhập') || lowerQ.includes('rủi ro tồn')) {
        aiResponse.text = 'Cảnh báo sản phẩm rủi ro tồn kho cao:';
        aiResponse.structuredResult = {
          finding: 'SKU LK-990 (Máy hút mùi Smart Sensor) đang ở pha SUY THOÁI và tồn kho rủi ro.',
          evidence: 'Bao phủ tồn kho đạt 8.9 tháng (vượt ngưỡng an toàn 6 tháng). Vốn lưu động tồn đọng 1.15 tỷ VND.',
          risk: 'Lỗi thời mẫu mã và tốn phí lưu kho nếu kéo dài sang năm tới.',
          recommendation: 'Lập tức dừng ký PO mới với nhà máy Shengzhou. Triển khai chiến dịch xả hàng thu hồi vốn trong 60 ngày.',
          action: 'Kích hoạt chính sách chiết khấu thêm 8% cho đại lý dự án căn hộ hoàn thiện nội thất.'
        };
      } else {
        aiResponse.text = `AI đã quét toàn bộ danh mục sản phẩm và đối thủ liên quan đến "${q}":`;
        aiResponse.structuredResult = {
          finding: 'Tất cả các chỉ số giá và biên lợi nhuận của Lock&King đang nằm trong tầm kiểm soát với Gross Margin trung bình 37.4%.',
          evidence: 'Có 6/7 SKU chủ lực đạt điểm PCS trên 80 (Cạnh tranh tốt), thị phần online đang tăng trưởng 12% so với cùng kỳ.',
          risk: 'Đối thủ Sunhouse và Kalite đang chủ động giảm giá nhóm Air Fryer để kéo traffic.',
          recommendation: 'Bảo vệ giá các Hero SKU bằng cách tặng quà và voucher thay vì hạ giá niêm yết.',
          action: 'Xem chi tiết tại Tổng Quan CEO hoặc mở Mô Phỏng Giá What-If để thử nghiệm các mức giá mới.'
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-4 sm:p-5 rounded-2xl border border-indigo-900/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white uppercase tracking-wider flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" />
              CỐ VẤN CHIẾN LƯỢC ĐỊNH GIÁ AI
            </span>
            <span className="text-[11px] text-indigo-300">Lập luận 5 bước: Phát hiện $\rightarrow$ Bằng chứng $\rightarrow$ Rủi ro $\rightarrow$ Khuyến nghị $\rightarrow$ Hành động</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
            Trung Tâm Lệnh Trí Tuệ Nhân Tạo (AI Command Center)
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
            Cố vấn AI chuyên sâu về định giá, phân tích đối thủ, bảo vệ biên lợi nhuận và tối ưu tồn kho cho Lock&King.
          </p>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-slate-500 whitespace-nowrap text-[11px]">Gợi ý:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(prompt)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-slate-200 text-slate-700 font-semibold transition-all whitespace-nowrap text-[11px] shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Conversation Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4 min-h-[360px] sm:min-h-[420px] max-h-[560px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-rose-600 text-white font-medium rounded-tr-none shadow-xs'
                : 'bg-slate-50 text-slate-900 border border-slate-200/90 rounded-tl-none space-y-3'
            }`}>
              <p className="font-medium">{msg.text}</p>

              {/* Structured AI Finding Box */}
              {msg.structuredResult && (
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5 text-xs">
                  <div>
                    <span className="font-black uppercase text-[10px] sm:text-[11px] block text-indigo-700">
                      1. PHÁT HIỆN CỐT LÕI (FINDING)
                    </span>
                    <p className="text-slate-800 font-bold mt-0.5">{msg.structuredResult.finding}</p>
                  </div>

                  <div>
                    <span className="font-black uppercase text-[10px] sm:text-[11px] block text-slate-500">
                      2. DỮ LIỆU & BẰNG CHỨNG (EVIDENCE)
                    </span>
                    <p className="text-slate-600 mt-0.5">{msg.structuredResult.evidence}</p>
                  </div>

                  <div>
                    <span className="font-black uppercase text-[10px] sm:text-[11px] block text-rose-600">
                      3. RỦI RO TIỀM ẨN (RISK)
                    </span>
                    <p className="text-rose-900 bg-rose-50 p-2 rounded-lg mt-0.5">{msg.structuredResult.risk}</p>
                  </div>

                  <div>
                    <span className="font-black uppercase text-[10px] sm:text-[11px] block text-emerald-700">
                      4. KHUYẾN NGHỊ CHIẾN LƯỢC (RECOMMENDATION)
                    </span>
                    <p className="text-emerald-900 bg-emerald-50 p-2 rounded-lg mt-0.5">{msg.structuredResult.recommendation}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-black uppercase text-[10px] block text-slate-400">
                      5. HÀNH ĐỘNG TỨC THÌ (ACTION)
                    </span>
                    <p className="text-slate-900 font-extrabold text-xs mt-0.5">{msg.structuredResult.action}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-500 rounded-xl px-3.5 py-2 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              <span>AI Advisor đang truy vấn dữ liệu...</span>
            </div>
          </div>
        )}
      </div>

      {/* Query Input */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Nhập câu hỏi tự nhiên cho AI (ví dụ: 'Tìm sản phẩm margin cao nhưng PCS thấp'...)"
          className="flex-1 text-xs sm:text-sm text-slate-900 px-2 sm:px-3 py-1.5 sm:py-2 bg-transparent focus:outline-hidden font-medium"
        />
        <button
          onClick={() => handleAsk()}
          disabled={!inputQuery.trim() || isTyping}
          className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all flex-shrink-0"
        >
          <span className="hidden sm:inline">Gửi Lệnh</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
