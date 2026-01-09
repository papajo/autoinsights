
import { MarketCategory, MarketRegion, MarketCountry, MarketDataPoint, MarketAnalysis } from '../types';

const OEM_SEEDS: Record<MarketCountry, { name: string; category: MarketCategory; isListed: boolean; region: MarketRegion }[]> = {
  'USA': [
    { name: 'Tesla Inc', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Ford Motor Co', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'General Motors', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Rivian', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
  ],
  'India': [
    { name: 'Maruti Suzuki', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Tata Motors', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Mahindra & Mahindra', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Hero MotoCorp', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Bajaj Auto', category: MarketCategory.THREE_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'TVS Motor', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Ashok Leyland', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Ola Electric', category: MarketCategory.ELECTRIC_VEHICLE, isListed: false, region: MarketRegion.ASIA },
  ],
  'China': [
    { name: 'BYD Company', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'SAIC Motor', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Geely Auto', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'NIO Inc', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Great Wall Motor', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'XPeng', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
  ],
  'Germany': [
    { name: 'Volkswagen AG', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Mercedes-Benz', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'BMW Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
  ],
  'Japan': [
    { name: 'Toyota Motor', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Honda Motor', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
  ],
  'Canada': [], 'Mexico': [], 'France': [], 'UK': [], 'Italy': [], 'South Korea': [], 'Brazil': [], 'Argentina': [], 'South Africa': [], 'Nigeria': [], 'Egypt': [], 'Other': []
};

export const generateInitialData = (): MarketDataPoint[] => {
  const data: MarketDataPoint[] = [];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  Object.entries(OEM_SEEDS).forEach(([country, oems]) => {
    oems.forEach(oem => {
      let baseSales = Math.floor(Math.random() * 900000) + 150000;
      years.forEach(year => {
        const growthFactor = 0.88 + Math.random() * 0.28;
        baseSales = Math.floor(baseSales * growthFactor);
        data.push({
          id: crypto.randomUUID(),
          year,
          manufacturer: oem.name,
          category: oem.category,
          region: oem.region,
          country: country as MarketCountry,
          sales: baseSales,
          isListed: oem.isListed
        });
      });
    });
  });

  return data;
};

export const getAggregatedData = (
  data: MarketDataPoint[], 
  category: MarketCategory,
  region: MarketRegion,
  country: MarketCountry | 'All',
  listedOnly: boolean
): MarketAnalysis[] => {
  let filtered = data.filter(d => d.category === category && (!listedOnly || d.isListed));

  if (region !== MarketRegion.GLOBAL) {
    if (region === MarketRegion.EMEA) {
      filtered = filtered.filter(d => d.region === MarketRegion.EUROPE || d.region === MarketRegion.AFRICA);
    } else if (region === MarketRegion.ASIA_PAC) {
      filtered = filtered.filter(d => d.region === MarketRegion.ASIA);
    } else {
      filtered = filtered.filter(d => d.region === region);
    }
  }

  if (country !== 'All') {
    filtered = filtered.filter(d => d.country === country);
  }

  const manufacturers = Array.from(new Set(filtered.map(d => d.manufacturer)));
  const years = Array.from(new Set(filtered.map(d => d.year))).sort();
  const latestYear = Math.max(...years);
  const prevYear = latestYear - 1;

  const totalMarketSalesLatest = filtered
    .filter(d => d.year === latestYear)
    .reduce((sum, d) => sum + d.sales, 0);

  return manufacturers.map(name => {
    const mData = filtered.filter(d => d.manufacturer === name);
    const dataByYear: Record<number, number> = {};
    mData.forEach(d => dataByYear[d.year] = d.sales);

    const latestSales = dataByYear[latestYear] || 0;
    const prevSales = dataByYear[prevYear] || 0;

    return {
      manufacturer: name,
      data: dataByYear,
      totalSales: latestSales,
      marketShare: totalMarketSalesLatest > 0 ? (latestSales / totalMarketSalesLatest) * 100 : 0,
      yoyGrowth: prevSales > 0 ? ((latestSales - prevSales) / prevSales) * 100 : 0,
      region: mData[0]?.region || region,
      country: mData[0]?.country || 'Other'
    };
  }).sort((a, b) => b.totalSales - a.totalSales);
};
