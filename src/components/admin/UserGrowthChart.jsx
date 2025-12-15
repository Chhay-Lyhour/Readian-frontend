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
import { useUserGrowth } from '../../hooks/useAnalytics';
import { TrendingUp, Users } from 'lucide-react';

const UserGrowthChart = () => {
  const [period, setPeriod] = useState('week');
  const { data, loading, error } = useUserGrowth(period);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1A5632] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading user growth data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#1A5632] flex items-center gap-2">
            <TrendingUp size={28} />
            User Growth
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center h-96 text-red-600">
          <span className="text-5xl mb-4">⚠️</span>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const hasData = data && data.data && data.data.length > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#1A5632] flex items-center gap-2">
            <TrendingUp size={28} />
            User Growth
          </h3>
          {data && <p className="text-sm text-gray-600 mt-1">{data.periodLabel}</p>}
        </div>
        <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />
      </div>

      {/* Summary Stats */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#C0FFB3] rounded-lg p-4 border-2 border-[#1A5632]">
            <p className="text-sm text-gray-700 font-semibold mb-1">Total Users</p>
            <p className="text-3xl font-bold text-[#1A5632]">{data.summary.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-[#FFD7DF] rounded-lg p-4 border-2 border-[#FF69B4]">
            <p className="text-sm text-gray-700 font-semibold mb-1">New Users</p>
            <p className="text-3xl font-bold text-[#FF1493]">{data.summary.newUsersInPeriod.toLocaleString()}</p>
          </div>
          <div className="bg-[#FFFDEE] rounded-lg p-4 border-2 border-[#00A819]">
            <p className="text-sm text-gray-700 font-semibold mb-1">Growth Rate</p>
            <p className="text-3xl font-bold text-[#00A819]">{data.summary.growthRate}%</p>
          </div>
        </div>
      )}

      {/* Chart or No Data Message */}
      <div className="bg-gray-50 rounded-lg p-4">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <TrendingUp size={64} className="mb-4 text-gray-300" />
            <p className="text-lg font-semibold">No user growth data for this period</p>
            <p className="text-sm mt-2">Try selecting a different time period</p>
          </div>
        ) : (
          <>
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
                label="Users"
                tickFormat={(t) => Math.round(t)}
                style={{
                  axisLabel: { fontSize: 12, padding: 55 },
                  tickLabels: { fontSize: 10 }
                }}
              />

              {/* New Users Line */}
              <VictoryLine
                data={data.data}
                x="date"
                y="newUsers"
                style={{
                  data: { stroke: "#1A5632", strokeWidth: 3 }
                }}
                labels={({ datum }) => `New: ${datum.newUsers}`}
                labelComponent={<VictoryTooltip />}
              />

              {/* Cumulative Line */}
              <VictoryLine
                data={data.data}
                x="date"
                y="cumulative"
                style={{
                  data: {
                    stroke: "#00A819",
                    strokeWidth: 2,
                    strokeDasharray: "5,5"
                  }
                }}
                labels={({ datum }) => `Total: ${datum.cumulative}`}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-[#1A5632] rounded"></div>
                <span className="text-sm text-gray-700 font-semibold">New Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-[#00A819] rounded" style={{ backgroundImage: 'repeating-linear-gradient(to right, #00A819, #00A819 5px, transparent 5px, transparent 10px)' }}></div>
                <span className="text-sm text-gray-700 font-semibold">Cumulative Total</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserGrowthChart;
