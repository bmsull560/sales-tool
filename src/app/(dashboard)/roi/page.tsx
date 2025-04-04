'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Calculator, FileText, BarChart4, Download } from 'lucide-react';

export default function ROIPage() {
  const [assumptions, setAssumptions] = useState({
    averageOrderValue: 5000,
    monthlyOrders: 100,
    conversionRateIncrease: 15,
    operationalCostReduction: 20,
    implementationCost: 50000,
    annualSubscription: 36000,
    timeToImplementMonths: 2,
  });

  const handleInputChange = (field: string, value: string) => {
    setAssumptions({
      ...assumptions,
      [field]: parseFloat(value) || 0,
    });
  };

  // Calculate ROI metrics
  const calculateROI = () => {
    const {
      averageOrderValue,
      monthlyOrders,
      conversionRateIncrease,
      operationalCostReduction,
      implementationCost,
      annualSubscription,
      timeToImplementMonths,
    } = assumptions;

    // Annual revenue before
    const annualRevenueBefore = averageOrderValue * monthlyOrders * 12;
    
    // Annual revenue after (with increased conversion)
    const annualRevenueAfter = annualRevenueBefore * (1 + conversionRateIncrease / 100);
    
    // Revenue increase
    const revenueIncrease = annualRevenueAfter - annualRevenueBefore;
    
    // Operational savings
    const operationalSavings = annualRevenueBefore * (operationalCostReduction / 100);
    
    // Total benefit
    const totalAnnualBenefit = revenueIncrease + operationalSavings;
    
    // Total cost (implementation + subscription)
    const totalFirstYearCost = implementationCost + annualSubscription;
    
    // First year ROI
    const firstYearROI = ((totalAnnualBenefit - totalFirstYearCost) / totalFirstYearCost) * 100;
    
    // Three year ROI
    const threeYearBenefit = totalAnnualBenefit * 3;
    const threeYearCost = implementationCost + (annualSubscription * 3);
    const threeYearROI = ((threeYearBenefit - threeYearCost) / threeYearCost) * 100;
    
    // Payback period (in months)
    const monthlyBenefit = totalAnnualBenefit / 12;
    const paybackPeriod = (implementationCost + annualSubscription) / monthlyBenefit + timeToImplementMonths;

    return {
      annualRevenueBefore: formatCurrency(annualRevenueBefore),
      annualRevenueAfter: formatCurrency(annualRevenueAfter),
      revenueIncrease: formatCurrency(revenueIncrease),
      operationalSavings: formatCurrency(operationalSavings),
      totalAnnualBenefit: formatCurrency(totalAnnualBenefit),
      totalFirstYearCost: formatCurrency(totalFirstYearCost),
      firstYearROI: `${firstYearROI.toFixed(1)}%`,
      threeYearROI: `${threeYearROI.toFixed(1)}%`,
      paybackPeriod: `${paybackPeriod.toFixed(1)} months`,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const roiMetrics = calculateROI();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ROI & Business Case</h1>
          <p className="text-slate-500 mt-1">
            Calculate ROI and build compelling business cases for your solutions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="gap-1">
            <Plus size={16} />
            <span>New Business Case</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calculator">
            <Calculator size={16} className="mr-2" />
            ROI Calculator
          </TabsTrigger>
          <TabsTrigger value="business-case">
            <FileText size={16} className="mr-2" />
            Business Case
          </TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart4 size={16} className="mr-2" />
            Charts & Visuals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assumptions */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Assumptions</CardTitle>
                <CardDescription>
                  Adjust the values to calculate ROI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="averageOrderValue">Average Order Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="averageOrderValue"
                      type="number"
                      className="pl-7"
                      value={assumptions.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyOrders">Monthly Orders</Label>
                  <Input
                    id="monthlyOrders"
                    type="number"
                    value={assumptions.monthlyOrders}
                    onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conversionRateIncrease">Conversion Rate Increase (%)</Label>
                  <div className="relative">
                    <Input
                      id="conversionRateIncrease"
                      type="number"
                      className="pr-7"
                      value={assumptions.conversionRateIncrease}
                      onChange={(e) => handleInputChange('conversionRateIncrease', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operationalCostReduction">Operational Cost Reduction (%)</Label>
                  <div className="relative">
                    <Input
                      id="operationalCostReduction"
                      type="number"
                      className="pr-7"
                      value={assumptions.operationalCostReduction}
                      onChange={(e) => handleInputChange('operationalCostReduction', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="implementationCost">Implementation Cost</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="implementationCost"
                      type="number"
                      className="pl-7"
                      value={assumptions.implementationCost}
                      onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualSubscription">Annual Subscription</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="annualSubscription"
                      type="number"
                      className="pl-7"
                      value={assumptions.annualSubscription}
                      onChange={(e) => handleInputChange('annualSubscription', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeToImplementMonths">Implementation Time (months)</Label>
                  <Input
                    id="timeToImplementMonths"
                    type="number"
                    value={assumptions.timeToImplementMonths}
                    onChange={(e) => handleInputChange('timeToImplementMonths', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>
                  Based on your assumptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Metrics */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-700 font-medium">First Year ROI</div>
                          <div className="text-2xl font-bold text-blue-800">{roiMetrics.firstYearROI}</div>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-700 font-medium">3-Year ROI</div>
                          <div className="text-2xl font-bold text-green-800">{roiMetrics.threeYearROI}</div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-purple-700 font-medium">Payback Period</div>
                          <div className="text-2xl font-bold text-purple-800">{roiMetrics.paybackPeriod}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Annual Revenue (Before)</span>
                        <span className="font-medium">{roiMetrics.annualRevenueBefore}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Annual Revenue (After)</span>
                        <span className="font-medium">{roiMetrics.annualRevenueAfter}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Revenue Increase</span>
                        <span className="font-medium text-green-600">{roiMetrics.revenueIncrease}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Operational Savings</span>
                        <span className="font-medium text-green-600">{roiMetrics.operationalSavings}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Total Annual Benefit</span>
                        <span className="font-medium text-green-600">{roiMetrics.totalAnnualBenefit}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">First Year Cost</span>
                        <span className="font-medium text-red-600">{roiMetrics.totalFirstYearCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business-case">
          <Card>
            <CardHeader>
              <CardTitle>Business Case Builder</CardTitle>
              <CardDescription>
                Create comprehensive business cases with executive summaries, value propositions, and financial analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Business Cases Yet</h3>
                <p className="text-gray-500 mb-4">Create your first business case to get started</p>
                <Button>
                  <Plus size={16} className="mr-2" />
                  Create Business Case
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle>ROI Visualizations</CardTitle>
              <CardDescription>
                Visual charts and graphs to illustrate ROI and financial impact
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart4 size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Charts Coming Soon</h3>
                <p className="text-gray-500 mb-4">We're working on adding interactive charts and visualizations</p>
                <Button variant="outline">
                  Request Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
