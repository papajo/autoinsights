
import { MarketCategory, MarketDataPoint, MarketAnalysis } from '../types';

const MANUFACTURERS = [
  { name: 'HERO MOTOCORP LTD', category: MarketCategory.TWO_WHEELER, isListed: true },
  { name: 'HONDA MOTORCYCLE AND SCOOTER', category: MarketCategory.TWO_WHEELER, isListed: false },
  { name: 'TVS MOTOR COMPANY LTD', category: MarketCategory.TWO_WHEELER, isListed: true },
  { name: 'BAJAJ AUTO LTD', category: MarketCategory.TWO_WHEELER, isListed: true },
  { name: 'MARUTI SUZUKI INDIA LTD', category: MarketCategory.FOUR_WHEELER, isListed: true },
  { name: 'TATA MOTORS LTD', category: MarketCategory.FOUR_WHEELER, isListed: true },
  { name: 'HYUNDAI MOTOR INDIA LTD', category: MarketCategory.FOUR_WHEELER, isListed: false },
  { name: 'MAHINDRA & MAHINDRA LTD', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true },
  { name: 'ASHOK LEYLAND LTD', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true },
  { name: 'OLA ELECTRIC', category: MarketCategory.ELECTRIC_VEHICLE, isListed: false },
  { name: 'ATHER ENERGY', category: MarketCategory.ELECTRIC_VEHICLE, isListed: false },
];

export const generateMockMarketData = (): MarketDataPoint[] => {
  const data: MarketDataPoint[] = [];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  MANUFACTURERS.forEach(m => {
    let baseSales = Math.floor(Math.random() * 500000) + 100000;
    years.forEach(year => {
      // Add some trend logic
      const growthFactor = 0.9 + Math.random() * 0.3; // -10% to +20%
      baseSales = Math.floor(baseSales * growthFactor);
      data.push({
        year,
        manufacturer: m.name,
        category: m.category,
        sales: baseSales,
        isListed: m.isListed
      });
    });
  });

  return data;
};

export const getAggregatedData = (
  data: MarketDataPoint[], 
  category: MarketCategory,
  listedOnly: boolean
): MarketAnalysis[] => {
  const filtered = data.filter(d => 
    d.category === category && 
    (!listedOnly || d.isListed)
  );

  const manufacturers = Array.from(new Set(filtered.map(d => d.manufacturer)));
  const years = Array.from(new Set(filtered.map(d => d.year))).sort();
  const latestYear = Math.max(...years);
  const prevYear = latestYear - 1;

  const totalMarketSalesLatest = filtered
    .filter(d => d.year === latestYear)
    .reduce((sum, d) => sum + d.sales, 0);

  return manufacturers.map(name => {
    const manufacturerData = filtered.filter(d => d.manufacturer === name);
    const dataByYear: Record<number, number> = {};
    manufacturerData.forEach(d => dataByYear[d.year] = d.sales);

    const latestSales = dataByYear[latestYear] || 0;
    const prevSales = dataByYear[prevYear] || 0;

    return {
      manufacturer: name,
      data: dataByYear,
      totalSales: latestSales,
      marketShare: totalMarketSalesLatest > 0 ? (latestSales / totalMarketSalesLatest) * 100 : 0,
      yoyGrowth: prevSales > 0 ? ((latestSales - prevSales) / prevSales) * 100 : 0
    };
  }).sort((a, b) => b.totalSales - a.totalSales);
};
