
import { MarketCategory, MarketRegion, MarketCountry, MarketDataPoint, MarketAnalysis } from '../types';

/**
 * Enhanced Seed Data representing major global automotive players.
 * Data is structured to represent a comprehensive view of the global industry.
 */
const OEM_SEEDS: Record<MarketCountry, { name: string; category: MarketCategory; isListed: boolean; region: MarketRegion }[]> = {
  'USA': [
    { name: 'Tesla Inc', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Ford Motor Co', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'General Motors', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Rivian Automotive', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Lucid Group', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'PACCAR Inc', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Navistar International', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: false, region: MarketRegion.NORTH_AMERICA },
    { name: 'Harley-Davidson', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
  ],
  'India': [
    { name: 'Maruti Suzuki India', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Tata Motors Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Mahindra & Mahindra', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Hero MotoCorp', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Bajaj Auto', category: MarketCategory.THREE_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'TVS Motor Company', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Ashok Leyland', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Ola Electric', category: MarketCategory.ELECTRIC_VEHICLE, isListed: false, region: MarketRegion.ASIA },
    { name: 'Eicher Motors (Royal Enfield)', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Force Motors', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'JBM Auto', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Ather Energy', category: MarketCategory.ELECTRIC_VEHICLE, isListed: false, region: MarketRegion.ASIA },
  ],
  'China': [
    { name: 'BYD Company', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'SAIC Motor', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Geely Automobile', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'NIO Inc', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'XPeng Motors', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Li Auto', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Great Wall Motor', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Changan Automobile', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Dongfeng Motor', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'GAC Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Chery Automobile', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.ASIA },
    { name: 'Zeekr Intelligent', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA },
  ],
  'Germany': [
    { name: 'Volkswagen Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Mercedes-Benz Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'BMW Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Porsche AG', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Traton Group (MAN/Scania)', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Daimler Truck', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.EUROPE },
  ],
  'Japan': [
    { name: 'Toyota Motor Corp', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Honda Motor Co', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Nissan Motor Co', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Suzuki Motor Corp', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Mazda Motor Corp', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Subaru Corporation', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Mitsubishi Motors', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Isuzu Motors', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.ASIA },
    { name: 'Yamaha Motor', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.ASIA },
  ],
  'South Korea': [
    { name: 'Hyundai Motor Co', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'Kia Corporation', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
    { name: 'KG Mobility', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.ASIA },
  ],
  'France': [
    { name: 'Renault Group', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Stellantis (Peugeot/Citroen)', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
  ],
  'Italy': [
    { name: 'Ferrari NV', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Iveco Group', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Piaggio & C.', category: MarketCategory.TWO_WHEELER, isListed: true, region: MarketRegion.EUROPE },
  ],
  'UK': [
    { name: 'Jaguar Land Rover', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.EUROPE },
    { name: 'Aston Martin Lagonda', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'McLaren Group', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.EUROPE },
  ],
  // Corrected 'Sweden' entry by removing 'as any' and obsolete comments
  'Sweden': [
    { name: 'Volvo Group', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Volvo Cars', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.EUROPE },
    { name: 'Polestar', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.EUROPE },
  ],
  'Canada': [
    { name: 'Magna International', category: MarketCategory.FOUR_WHEELER, isListed: true, region: MarketRegion.NORTH_AMERICA },
    { name: 'Lion Electric', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.NORTH_AMERICA },
  ],
  'Mexico': [
    { name: 'DINA S.A.', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: false, region: MarketRegion.NORTH_AMERICA },
  ],
  'Brazil': [
    { name: 'Marcopolo S.A.', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.SOUTH_AMERICA },
    { name: 'Agrale', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: false, region: MarketRegion.SOUTH_AMERICA },
  ],
  'Argentina': [],
  'South Africa': [
    { name: 'Bell Equipment', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: true, region: MarketRegion.AFRICA },
  ],
  'Nigeria': [
    { name: 'Innoson Vehicle Manufacturing', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.AFRICA },
  ],
  'Egypt': [
    { name: 'MCV (Manufacturing Commercial Vehicles)', category: MarketCategory.COMMERCIAL_VEHICLE, isListed: false, region: MarketRegion.AFRICA },
  ],
  'Other': [
    { name: 'VinFast (Vietnam)', category: MarketCategory.ELECTRIC_VEHICLE, isListed: true, region: MarketRegion.ASIA_PAC },
    { name: 'Proton (Malaysia)', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.ASIA_PAC },
    { name: 'Perodua (Malaysia)', category: MarketCategory.FOUR_WHEELER, isListed: false, region: MarketRegion.ASIA_PAC },
  ]
};

export const generateInitialData = (): MarketDataPoint[] => {
  const data: MarketDataPoint[] = [];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  Object.entries(OEM_SEEDS).forEach(([country, oems]) => {
    oems.forEach(oem => {
      // Create a more realistic starting sales point based on company size
      let baseSales = Math.floor(Math.random() * 800000) + 200000;
      
      // Tier adjustments for realism
      if (['Toyota Motor Corp', 'Volkswagen Group', 'Tesla Inc', 'BYD Company', 'Maruti Suzuki India'].includes(oem.name)) {
        baseSales = Math.floor(Math.random() * 2000000) + 5000000; // Major Tier
      } else if (['Tata Motors Group', 'Hyundai Motor Co', 'Honda Motor Co', 'SAIC Motor'].includes(oem.name)) {
        baseSales = Math.floor(Math.random() * 1000000) + 2000000; // Mid Tier
      }

      years.forEach(year => {
        // Growth trends: 2020-2021 dip (COVID), 2023-2024 recovery, EV growth surge
        let growthFactor = 0.92 + Math.random() * 0.18; // General random walk
        
        if (year === 2020) growthFactor *= 0.85; // Global dip
        if (year === 2021) growthFactor *= 1.08; // Initial recovery
        if (oem.category === MarketCategory.ELECTRIC_VEHICLE && year > 2020) {
          growthFactor *= 1.25; // Accelerated EV growth
        }
        
        baseSales = Math.floor(baseSales * growthFactor);
        data.push({
          id: crypto.randomUUID(),
          year,
          manufacturer: oem.name,
          category: oem.category,
          region: oem.region,
          country: country as MarketCountry,
          sales: Math.max(baseSales, 1000), // Ensure no zero sales
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