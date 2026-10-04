// Core Pricing, PCS, POS and Matching Engine for LOCK&KING (100% Vietnamese)

/**
 * Định dạng tiền tệ VND
 */
export const formatVND = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

/**
 * Định dạng rút gọn (ví dụ: 1.79M, 850K)
 */
export const formatShortVND = (amount) => {
  if (!amount && amount !== 0) return '0';
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2).replace(/\.00$/, '') + ' tr';
  }
  if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + ' k';
  }
  return amount.toString();
};

/**
 * Định dạng phần trăm
 */
export const formatPercent = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '0%';
  return `${(val >= 0 ? '+' : '')}${Number(val).toFixed(1)}%`;
};

/**
 * Tính Giá Vốn Toàn Phần (True Cost)
 * Giá vốn = FOB quy đổi + Thuế + Cước vận tải + Lưu kho + Vận hành + Dự phòng bảo hành + Marketing + Phí sàn + Phí thanh toán + Affiliate + Voucher
 */
export const calculateTrueCost = (params) => {
  const {
    fobPrice = 0,
    exchangeRate = 25400, // Tỷ giá USD/VND
    importTaxRate = 0.05, // 5% Thuế nhập khẩu
    vatRate = 0.10, // 10% VAT
    logisticsPerUnit = 45000,
    warehouseCost = 25000,
    operatingCost = 35000,
    warrantyProvision = 30000,
    marketingPercent = 0.08, // 8% Giá bán lẻ
    platformFeePercent = 0.09, // 9% Phí sàn Shopee/TikTok
    paymentFeePercent = 0.025, // 2.5% Phí cổng thanh toán
    affiliatePercent = 0.03, // 3% Hoa hồng KOC
    promotionPercent = 0.04, // 4% Quỹ Voucher
    targetPrice = 1000000
  } = params;

  const baseVnd = fobPrice * exchangeRate;
  const taxCost = baseVnd * (importTaxRate + vatRate);
  const landedCost = baseVnd + taxCost + logisticsPerUnit;
  const directFixedCost = landedCost + warehouseCost + operatingCost + warrantyProvision;
  const variableChannelCost = targetPrice * (marketingPercent + platformFeePercent + paymentFeePercent + affiliatePercent + promotionPercent);

  const totalTrueCost = directFixedCost + variableChannelCost;

  return {
    fobVnd: baseVnd,
    taxCost,
    landedCost,
    directFixedCost,
    variableChannelCost,
    totalTrueCost,
    breakdown: {
      fob: baseVnd,
      tax: taxCost,
      logistics: logisticsPerUnit,
      warehouse: warehouseCost,
      operating: operatingCost,
      warranty: warrantyProvision,
      marketing: targetPrice * marketingPercent,
      platformFee: targetPrice * platformFeePercent,
      paymentFee: targetPrice * paymentFeePercent,
      affiliate: targetPrice * affiliatePercent,
      promotion: targetPrice * promotionPercent
    }
  };
};

/**
 * Tính Thang Giá 6 Cấp Độ (Price Ladder)
 */
export const calculatePriceLadder = (trueCost, marketAveragePrice, targetMargin = 0.35) => {
  const breakEvenPrice = Math.round(trueCost);
  const floorPrice = Math.round(trueCost * 1.12 / 10000) * 10000;
  const attackPrice = Math.round(Math.min(marketAveragePrice * 0.90, trueCost / (1 - 0.22)) / 10000) * 10000;
  const competitivePrice = Math.round(marketAveragePrice * 0.96 / 10000) * 10000;
  const targetPrice = Math.round((trueCost / (1 - targetMargin)) / 10000) * 10000;
  const premiumPrice = Math.round(targetPrice * 1.15 / 10000) * 10000;
  const listPrice = Math.round(targetPrice * 1.45 / 10000) * 10000;

  return {
    breakEvenPrice,
    floorPrice,
    attackPrice,
    competitivePrice,
    targetPrice,
    premiumPrice,
    listPrice
  };
};

/**
 * Tính Price Index
 * Price Index = (Giá Lock&King / TB Thị Trường) * 100
 */
export const calculatePriceIndex = (sellingPrice, marketAverage) => {
  if (!marketAverage || marketAverage === 0) return 100;
  return Number(((sellingPrice / marketAverage) * 100).toFixed(1));
};

/**
 * Tính Chỉ Số Cạnh Tranh Giá (PCS) 0-100
 */
export const calculatePCS = ({
  sellingPrice,
  marketAverage,
  marketLow,
  productValueScore = 80,
  featureScore = 85,
  grossMargin = 0.35,
  demandScore = 75,
  priceStabilityScore = 90
}) => {
  let priceScore = 50;
  const ratio = sellingPrice / (marketAverage || sellingPrice);
  if (ratio <= 0.85) priceScore = 98;
  else if (ratio <= 0.95) priceScore = 90;
  else if (ratio <= 1.02) priceScore = 80;
  else if (ratio <= 1.10) priceScore = 65;
  else if (ratio <= 1.20) priceScore = 48;
  else priceScore = 30;

  let marginScore = 50;
  if (grossMargin >= 0.40) marginScore = 95;
  else if (grossMargin >= 0.32) marginScore = 85;
  else if (grossMargin >= 0.25) marginScore = 70;
  else if (grossMargin >= 0.18) marginScore = 50;
  else marginScore = 25;

  const pcs = (
    priceScore * 0.30 +
    productValueScore * 0.25 +
    featureScore * 0.15 +
    marginScore * 0.15 +
    demandScore * 0.10 +
    priceStabilityScore * 0.05
  );

  const rounded = Math.round(pcs);
  let status = 'TRUNG BÌNH';
  let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

  if (rounded >= 85) {
    status = 'RẤT MẠNH';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (rounded >= 75) {
    status = 'CẠNH TRANH TỐT';
    badgeColor = 'bg-teal-100 text-teal-800 border-teal-300';
  } else if (rounded >= 60) {
    status = 'TRUNG BÌNH';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  } else if (rounded >= 45) {
    status = 'YẾU';
    badgeColor = 'bg-orange-100 text-orange-800 border-orange-300';
  } else {
    status = 'NGUY HIỂM';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
  }

  return {
    score: rounded,
    status,
    badgeColor,
    breakdown: {
      priceScore,
      productValueScore,
      featureScore,
      marginScore,
      demandScore,
      priceStabilityScore
    }
  };
};

/**
 * Tính Điểm Cơ Hội Sản Phẩm Mới (POS) 0-100
 */
export const calculatePOS = ({
  marginPotential = 85,
  marketDemand = 80,
  marketGap = 85,
  differentiation = 90,
  competitionIntensity = 70,
  onlinePotential = 85,
  offlinePotential = 80,
  inventoryRisk = 80
}) => {
  const pos = (
    marginPotential * 0.25 +
    marketDemand * 0.20 +
    marketGap * 0.15 +
    differentiation * 0.15 +
    competitionIntensity * 0.10 +
    onlinePotential * 0.05 +
    offlinePotential * 0.05 +
    inventoryRisk * 0.05
  );

  const rounded = Math.round(pos);
  let decision = 'CÂN NHẮC';
  let badgeColor = 'bg-amber-500 text-white';

  if (rounded >= 85) {
    decision = 'RẤT NÊN NHẬP';
    badgeColor = 'bg-emerald-600 text-white';
  } else if (rounded >= 75) {
    decision = 'NÊN NHẬP';
    badgeColor = 'bg-teal-600 text-white';
  } else if (rounded >= 60) {
    decision = 'CÂN NHẮC';
    badgeColor = 'bg-amber-600 text-white';
  } else if (rounded >= 45) {
    decision = 'RỦI RO';
    badgeColor = 'bg-orange-600 text-white';
  } else {
    decision = 'KHÔNG NÊN NHẬP';
    badgeColor = 'bg-rose-600 text-white';
  }

  return {
    score: rounded,
    decision,
    badgeColor,
    confidence: Math.min(96, Math.max(78, Math.round(85 + (rounded > 75 ? 7 : -5)))),
    breakdown: {
      marginPotential,
      marketDemand,
      marketGap,
      differentiation,
      competitionIntensity,
      onlinePotential,
      offlinePotential,
      inventoryRisk
    }
  };
};

/**
 * Tính Điểm Tương Đồng Sản Phẩm (Match Score)
 */
export const calculateProductMatchScore = (lkProduct, compProduct, customWeights = {}) => {
  const weights = {
    category: 0.20,
    function: 0.15,
    capacity: 0.15,
    power: 0.10,
    material: 0.10,
    tech: 0.10,
    features: 0.10,
    segment: 0.05,
    warranty: 0.05,
    ...customWeights
  };

  let score = 0;

  if (lkProduct.category?.toLowerCase() === compProduct.category?.toLowerCase()) {
    score += weights.category * 100;
  }

  if (lkProduct.productGroup === compProduct.productGroup) {
    score += weights.function * 100;
  } else {
    score += weights.function * 60;
  }

  if (lkProduct.capacity && compProduct.capacity) {
    const lkCap = parseFloat(lkProduct.capacity);
    const compCap = parseFloat(compProduct.capacity);
    if (lkCap && compCap) {
      const diffRatio = Math.abs(lkCap - compCap) / lkCap;
      if (diffRatio === 0) score += weights.capacity * 100;
      else if (diffRatio <= 0.1) score += weights.capacity * 90;
      else if (diffRatio <= 0.25) score += weights.capacity * 70;
      else score += weights.capacity * 40;
    } else {
      score += weights.capacity * 80;
    }
  } else {
    score += weights.capacity * 75;
  }

  if (lkProduct.power && compProduct.power) {
    const lkP = parseFloat(lkProduct.power);
    const compP = parseFloat(compProduct.power);
    if (lkP && compP) {
      const diffRatio = Math.abs(lkP - compP) / lkP;
      if (diffRatio <= 0.05) score += weights.power * 100;
      else if (diffRatio <= 0.20) score += weights.power * 85;
      else score += weights.power * 50;
    } else {
      score += weights.power * 80;
    }
  } else {
    score += weights.power * 75;
  }

  if (lkProduct.material && compProduct.material) {
    if (lkProduct.material.toLowerCase().includes('titanium') && compProduct.material.toLowerCase().includes('titanium')) {
      score += weights.material * 100;
    } else if (lkProduct.material.toLowerCase() === compProduct.material.toLowerCase()) {
      score += weights.material * 95;
    } else {
      score += weights.material * 60;
    }
  } else {
    score += weights.material * 70;
  }

  if (lkProduct.technology && compProduct.technology) {
    if (lkProduct.technology.toLowerCase() === compProduct.technology.toLowerCase()) {
      score += weights.technology * 100;
    } else {
      score += weights.technology * 55;
    }
  } else {
    score += weights.technology * 70;
  }

  score += weights.features * 85;

  if (lkProduct.segment === compProduct.segment) {
    score += weights.segment * 100;
  } else {
    score += weights.segment * 60;
  }

  if (lkProduct.warranty === compProduct.warranty) {
    score += weights.warranty * 100;
  } else {
    score += weights.warranty * 75;
  }

  return Math.min(99, Math.round(score));
};
