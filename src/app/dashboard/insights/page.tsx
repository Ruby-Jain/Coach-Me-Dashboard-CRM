"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const insightsData = [
  { subject: 'Mindset', cohortAverage: 75, topPerformers: 95, fullMark: 100 },
  { subject: 'Leadership', cohortAverage: 82, topPerformers: 90, fullMark: 100 },
  { subject: 'Communication', cohortAverage: 65, topPerformers: 85, fullMark: 100 },
  { subject: 'Strategy', cohortAverage: 70, topPerformers: 92, fullMark: 100 },
  { subject: 'Resilience', cohortAverage: 88, topPerformers: 98, fullMark: 100 },
  { subject: 'Execution', cohortAverage: 60, topPerformers: 88, fullMark: 100 },
];

const insightsTableData = [
  { skill: 'Resilience', trend: '+12%', status: 'Excelling', priority: 'Low', score: 88 },
  { skill: 'Leadership', trend: '+8%', status: 'On Track', priority: 'Medium', score: 82 },
  { skill: 'Mindset', trend: '+5%', status: 'On Track', priority: 'Medium', score: 75 },
  { skill: 'Strategy', trend: '-2%', status: 'Needs Attention', priority: 'High', score: 70 },
  { skill: 'Communication', trend: '+1%', status: 'Lagging', priority: 'High', score: 65 },
];

export default function InsightsPage() {
  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8">
      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Data & Intelligence</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Client Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Radar Chart */}
        <GlassCard className="p-6 h-[450px] flex flex-col lg:col-span-1" glow="secondary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Skill Progression</h3>
          <p className="text-on-surface-variant text-sm mb-6">Cohort Average vs Top Performers</p>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={insightsData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: 'rgba(255,255,255,0.7)', fontSize: 11}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 12, 16, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Radar name="Cohort Average" dataKey="cohortAverage" stroke="#00D1FF" fill="#00D1FF" fillOpacity={0.3} />
                <Radar name="Top Performers" dataKey="topPerformers" stroke="#50FFAF" fill="#50FFAF" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Matrix Table */}
        <GlassCard className="flex flex-col overflow-hidden lg:col-span-2" glow="primary">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Skill Progression Matrix</h3>
              <p className="text-sm text-on-surface-variant mt-1">Aggregated scoring for active clients</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-on-surface text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Skill Area</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Avg Score</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">30-Day Trend</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Coaching Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {insightsTableData.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <span className="font-body-base text-on-surface group-hover:text-primary transition-colors">{row.skill}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-on-surface font-bold">{row.score}</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-16">
                          <div className="h-full bg-primary" style={{ width: `${row.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${row.trend.startsWith('+') ? 'text-secondary' : 'text-error'}`}>
                        {row.trend}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        row.status === 'Excelling' ? 'bg-secondary/10 text-secondary border-secondary/20' : 
                        row.status === 'On Track' ? 'bg-primary/10 text-primary border-primary/20' : 
                        'bg-error-container/20 text-error border-error/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1 text-sm ${row.priority === 'High' ? 'text-error' : row.priority === 'Medium' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                        {row.priority === 'High' && <span className="material-symbols-outlined text-[14px]">warning</span>}
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
