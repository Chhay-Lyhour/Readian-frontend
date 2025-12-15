import React, { useState } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';
import PeriodSelector from './PeriodSelector';
import { useRevenueGrowth } from '../../hooks/useAnalytics';
import { DollarSign } from 'lucide-react';

const RevenueGrowthChart = () => {
  const [period, setPeriod] = useState('week');
  const { data, loading, error } = useRevenueGrowth(period);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1A5632] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#1A5632] flex items-center gap-2">
            <DollarSign size={28} />
            Revenue Growth
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center h-96 text-red-600">
          <span className="text-5xl mb-4">⚠️</span>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-[#1A5632] flex items-center gap-2">
            <DollarSign size={28} />
            Revenue Growth
          </h3>
          <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />
        </div>
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p className="text-lg">No revenue data available for this period</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#1A5632] flex items-center gap-2">
            <DollarSign size={28} />
            Revenue Growth
          </h3>
          <p className="text-sm text-gray-600 mt-1">{data.periodLabel}</p>
        </div>
        <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#C0FFB3] rounded-lg p-4 border-2 border-[#1A5632]">
          <p className="text-sm text-gray-700 font-semibold mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-[#1A5632]">${data.summary.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-[#FFD7DF] rounded-lg p-4 border-2 border-[#FF69B4]">
          <p className="text-sm text-gray-700 font-semibold mb-1">Period Revenue</p>
          <p className="text-3xl font-bold text-[#FF1493]">${data.summary.revenueInPeriod.toLocaleString()}</p>
        </div>
        <div className="bg-[#FFFDEE] rounded-lg p-4 border-2 border-[#00A819]">
          <p className="text-sm text-gray-700 font-semibold mb-1">Revenue by Plan</p>
          <div className="text-sm mt-2 space-y-1">
            {data.summary.revenueByPlan.map(plan => (
              <div key={plan.plan} className="flex justify-between">
                <span className="font-semibold capitalize">{plan.plan}:</span>
                <span className="text-[#00A819] font-bold">${plan.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          padding={{ top: 20, bottom: 60, left: 70, right: 20 }}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryAxis
            tickFormat={(t) => t}
            style={{
              tickLabels: {
                fontSize: 10,
                angle: period === 'year' ? 0 : -45,
                textAnchor: period === 'year' ? 'middle' : 'end',
                padding: 5
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Revenue ($)"
            style={{
              axisLabel: { fontSize: 12, padding: 55 },
              tickLabels: { fontSize: 10 }
            }}
            tickFormat={(t) => `$${t}`}
          />

          {/* Daily/Monthly Revenue Line */}
          <VictoryLine
            data={data.data}
            x="date"
            y="revenue"
            style={{
              data: { stroke: "#8b5cf6", strokeWidth: 3 }
            }}
            labels={({ datum }) => `$${datum.revenue.toFixed(2)}`}
            labelComponent={<VictoryTooltip />}
          />

          {/* Cumulative Revenue Line */}
          <VictoryLine
            data={data.data}
            x="date"
            y="cumulative"
            style={{
              data: {
                stroke: "#f59e0b",
                strokeWidth: 2,
                strokeDasharray: "5,5"
              }
            }}
            labels={({ datum }) => `Total: $${datum.cumulative.toFixed(2)}`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-[#8b5cf6] rounded"></div>
            <span className="text-sm text-gray-700 font-semibold">Period Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-[#f59e0b] rounded" style={{ backgroundImage: 'repeating-linear-gradient(to right, #f59e0b, #f59e0b 5px, transparent 5px, transparent 10px)' }}></div>
            <span className="text-sm text-gray-700 font-semibold">Cumulative Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueGrowthChart;

