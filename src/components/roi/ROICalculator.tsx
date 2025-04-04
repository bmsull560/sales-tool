import { useState } from 'react';
import { ROIModel, ROIMetric } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ROICalculatorProps {
  model: ROIModel;
  metrics: ROIMetric[];
}

export function ROICalculator({ model, metrics }: ROICalculatorProps) {
  const [timeframe, setTimeframe] = useState(model.timeframe);
  
  // Calculate totals
  const costSavings = metrics
    .filter(m => m.category === 'cost_savings')
    .reduce((sum, metric) => sum + (metric.projected_value - metric.current_value) * timeframe, 0);
  
  const revenueIncrease = metrics
    .filter(m => m.category === 'revenue_increase')
    .reduce((sum, metric) => sum + (metric.projected_value - metric.current_value) * timeframe, 0);
  
  const riskReduction = metrics
    .filter(m => m.category === 'risk_reduction')
    .reduce((sum, metric) => sum + (metric.projected_value - metric.current_value) * timeframe, 0);
  
  const totalValue = costSavings + revenueIncrease + riskReduction;
  
  // Prepare chart data
  const chartData = [
    { name: 'Cost Savings', value: costSavings },
    { name: 'Revenue Increase', value: revenueIncrease },
    { name: 'Risk Reduction', value: riskReduction },
  ];
  
  // Prepare metrics data for detailed view
  const metricsData = metrics.map(metric => {
    const difference = (metric.projected_value - metric.current_value) * timeframe;
    return {
      ...metric,
      difference,
      percentChange: metric.current_value ? (difference / metric.current_value) * 100 : 0
    };
  });
  
  if (!metrics.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-slate-500">Add metrics to calculate ROI</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{model.name}</h3>
          <div className="space-x-2">
            <label htmlFor="timeframe" className="text-sm font-medium text-slate-700">
              Timeframe (months):
            </label>
            <input
              type="number"
              id="timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              min={1}
              max={60}
              className="w-20 px-3 py-1 border border-slate-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-700 mb-1">Cost Savings</h4>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(costSavings, model.currency)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-700 mb-1">Revenue Increase</h4>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(revenueIncrease, model.currency)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-700 mb-1">Risk Reduction</h4>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(riskReduction, model.currency)}
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Total Value</h4>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalValue, model.currency)}
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, model.currency)} />
                <Legend />
                <Bar dataKey="value" name="Value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Projected Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Difference
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                % Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {metricsData.map((metric) => (
              <tr key={metric.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-slate-900">{metric.name}</div>
                  {metric.notes && (
                    <div className="text-xs text-slate-500 mt-1">{metric.notes}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getCategoryBadgeClass(metric.category)}>
                    {formatCategory(metric.category)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {formatValue(metric.current_value, metric.unit, model.currency)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {formatValue(metric.projected_value, metric.unit, model.currency)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <span className={getDifferenceClass(metric.difference)}>
                    {formatValue(metric.difference, metric.unit, model.currency)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <span className={getDifferenceClass(metric.percentChange)}>
                    {metric.percentChange.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper functions
function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatValue(value: number, unit: string, currency: string): string {
  if (unit === 'currency') {
    return formatCurrency(value, currency);
  }
  return `${value.toLocaleString()} ${unit}`;
}

function formatCategory(category: string): string {
  switch (category) {
    case 'cost_savings':
      return 'Cost Savings';
    case 'revenue_increase':
      return 'Revenue Increase';
    case 'risk_reduction':
      return 'Risk Reduction';
    default:
      return category;
  }
}

function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case 'cost_savings':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
    case 'revenue_increase':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    case 'risk_reduction':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800';
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800';
  }
}

function getDifferenceClass(value: number): string {
  if (value > 0) {
    return 'text-green-600';
  }
  if (value < 0) {
    return 'text-red-600';
  }
  return '';
}
