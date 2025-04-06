'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardBase, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card-base';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Calculator, FileText, BarChart4, Download } from 'lucide-react';
import { Heading, Text, Label } from '@/components/ui/typography';
import { DemoSection } from '@/components/ui/demo-section';

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
    <DemoSection 
      title="ROI & Business Case"
      subtitle="Calculate ROI and build compelling business cases for your solutions"
      action={
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
      }
    >
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
            <CardBase className="md:col-span-1">
              <CardHeader>
                <CardTitle>Assumptions</CardTitle>
                <CardDescription>
                  Adjust the values to calculate ROI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Average Order Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={assumptions.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Monthly Orders</Label>
                  <Input
                    type="number"
                    value={assumptions.monthlyOrders}
                    onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Conversion Rate Increase (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="pr-7"
                      value={assumptions.conversionRateIncrease}
                      onChange={(e) => handleInputChange('conversionRateIncrease', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Operational Cost Reduction (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="pr-7"
                      value={assumptions.operationalCostReduction}
                      onChange={(e) => handleInputChange('operationalCostReduction', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Implementation Cost</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={assumptions.implementationCost}
                      onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Annual Subscription</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={assumptions.annualSubscription}
                      onChange={(e) => handleInputChange('annualSubscription', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Implementation Time (months)</Label>
                  <Input
                    type="number"
                    value={assumptions.timeToImplementMonths}
                    onChange={(e) => handleInputChange('timeToImplementMonths', e.target.value)}
                  />
                </div>
              </CardContent>
            </CardBase>

            {/* ROI Analysis */}
            <CardBase className="md:col-span-2">
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>
                  Based on your assumptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Heading size="sm" className="mb-4">Key Metrics</Heading>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <Text size="sm" className="text-slate-500">First Year ROI</Text>
                      <Heading size="lg" className="text-slate-900">{roiMetrics.firstYearROI}</Heading>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <Text size="sm" className="text-slate-500">3-Year ROI</Text>
                      <Heading size="lg" className="text-slate-900">{roiMetrics.threeYearROI}</Heading>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <Text size="sm" className="text-slate-500">Payback Period</Text>
                      <Heading size="lg" className="text-slate-900">{roiMetrics.paybackPeriod}</Heading>
                    </div>
                  </div>
                </div>

                <div>
                  <Heading size="sm" className="mb-4">Detailed Breakdown</Heading>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <Text>Annual Revenue (Before)</Text>
                      <Text className="font-medium">{roiMetrics.annualRevenueBefore}</Text>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <Text>Annual Revenue (After)</Text>
                      <Text className="font-medium">{roiMetrics.annualRevenueAfter}</Text>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <Text>Revenue Increase</Text>
                      <Text className="font-medium text-green-600">{roiMetrics.revenueIncrease}</Text>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <Text>Operational Savings</Text>
                      <Text className="font-medium text-green-600">{roiMetrics.operationalSavings}</Text>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <Text>Total Annual Benefit</Text>
                      <Text className="font-medium text-green-600">{roiMetrics.totalAnnualBenefit}</Text>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <Text>First Year Cost</Text>
                      <Text className="font-medium text-red-600">{roiMetrics.totalFirstYearCost}</Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardBase>
          </div>
        </TabsContent>

        <TabsContent value="business-case" className="space-y-4">
          <CardBase className="w-full">
            <CardHeader>
              <CardTitle>Business Case Builder</CardTitle>
              <CardDescription>
                Create a complete business case document based on ROI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Business case content will appear here. Select the ROI Calculator tab to update assumptions.</Text>
            </CardContent>
          </CardBase>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <CardBase className="w-full">
            <CardHeader>
              <CardTitle>ROI Visualization</CardTitle>
              <CardDescription>
                Visual representation of your ROI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Charts and visualization content will appear here.</Text>
            </CardContent>
          </CardBase>
        </TabsContent>
      </Tabs>
    </DemoSection>
  );
}
