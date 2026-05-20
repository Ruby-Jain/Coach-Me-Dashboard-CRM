"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const reportData = [
  { month: 'Jan', revenue: 4000, cac: 2400, netGrowth: 1600 },
  { month: 'Feb', revenue: 5000, cac: 2200, netGrowth: 2800 },
  { month: 'Mar', revenue: 6000, cac: 2600, netGrowth: 3400 },
  { month: 'Apr', revenue: 5500, cac: 2100, netGrowth: 3400 },
  { month: 'May', revenue: 7000, cac: 2800, netGrowth: 4200 },
  { month: 'Jun', revenue: 8500, cac: 3000, netGrowth: 5500 },
];

export default function ReportsPage() {
  const handleDownloadCSV = () => {
    // Generate headers
    const headers = ["Month", "Gross Revenue", "Acquisition Cost", "Net Growth", "Margin (%)"];
    
    // Generate rows
    const rows = reportData.map(row => {
      const margin = ((row.netGrowth / row.revenue) * 100).toFixed(1);
      return [
        row.month,
        row.revenue,
        row.cac,
        row.netGrowth,
        `${margin}%`
      ];
    });
    
    // Combine to CSV format
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_breakdown_h1.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8">
      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Financial Analytics</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Growth Reports</h2>
      </div>

      {/* Composed Chart Section */}
      <GlassCard className="p-6 h-[400px] flex flex-col mb-8" glow="tertiary">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Revenue vs Client Acquisition Cost</h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={reportData} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.02)'}}
                contentStyle={{ backgroundColor: 'rgba(10, 12, 16, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
              <Bar dataKey="revenue" barSize={32} fill="#01F5A0" name="Revenue ($)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="cac" stroke="#E9A9FF" strokeWidth={3} name="Acquisition Cost ($)" dot={{ r: 4, fill: '#E9A9FF', strokeWidth: 0 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Financial Breakdown Table */}
      <GlassCard className="flex flex-col overflow-hidden" glow="primary">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface">Financial Breakdown (H1)</h3>
          <button 
            onClick={handleDownloadCSV}
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary/20 transition-colors cursor-pointer"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Month</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Gross Revenue</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Acquisition Cost</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Net Growth</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reportData.map((row, index) => {
                const margin = ((row.netGrowth / row.revenue) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <span className="font-body-base text-on-surface group-hover:text-primary transition-colors">{row.month}</span>
                    </td>
                    <td className="p-4 text-sm font-medium text-primary">${row.revenue.toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-tertiary">${row.cac.toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-secondary">${row.netGrowth.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-on-surface font-bold">{margin}%</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-16">
                          <div className="h-full bg-secondary" style={{ width: `${margin}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </main>
  );
}
