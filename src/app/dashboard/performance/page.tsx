"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const performanceData = [
  { name: 'Jan', sessions: 45, satisfaction: 88, revenue: 3400 },
  { name: 'Feb', sessions: 52, satisfaction: 90, revenue: 4100 },
  { name: 'Mar', sessions: 48, satisfaction: 92, revenue: 3800 },
  { name: 'Apr', sessions: 70, satisfaction: 95, revenue: 5600 },
  { name: 'May', sessions: 61, satisfaction: 94, revenue: 4900 },
  { name: 'Jun', sessions: 85, satisfaction: 98, revenue: 6800 },
];

const recentSessionsData = [
  { id: 'S-101', date: 'Today, 10:00 AM', client: 'Elena Rostova', duration: '60 min', rating: 5.0, type: 'Executive Leadership' },
  { id: 'S-102', date: 'Yesterday, 2:30 PM', client: 'David Kim', duration: '45 min', rating: 4.8, type: 'Startup Scaling' },
  { id: 'S-103', date: 'Oct 18, 11:00 AM', client: 'Marcus Chen', duration: '90 min', rating: 4.5, type: 'Career Pivot' },
  { id: 'S-104', date: 'Oct 17, 4:00 PM', client: 'Sarah Jenkins', duration: '60 min', rating: 5.0, type: 'Mindset & Resilience' },
];

export default function PerformancePage() {
  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8">
      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Analytics & Metrics</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Coach Performance</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Session Growth Area Chart */}
        <GlassCard className="p-6 h-[400px] flex flex-col" glow="primary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Session Volume & Revenue</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#01F5A0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#01F5A0" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9A9FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E9A9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 12, 16, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area yAxisId="left" type="monotone" dataKey="sessions" stroke="#01F5A0" fillOpacity={1} fill="url(#colorSessions)" name="Sessions Hosted" />
                <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#E9A9FF" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Satisfaction Bar Chart */}
        <GlassCard className="p-6 h-[400px] flex flex-col" glow="secondary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Client Satisfaction Score</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(10, 12, 16, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#50FFAF' }}
                />
                <Bar dataKey="satisfaction" fill="#50FFAF" radius={[4, 4, 0, 0]} name="CSAT (%)" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Recent Sessions Table */}
      <GlassCard className="flex flex-col overflow-hidden" glow="tertiary">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Sessions Log</h3>
          <button className="text-primary font-label-sm hover:underline underline-offset-4 transition-all">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Date & Time</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Client</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Session Type</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Duration</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">CSAT Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentSessionsData.map((session) => (
                <tr key={session.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-sm text-on-surface-variant">{session.date}</td>
                  <td className="p-4">
                    <span className="font-body-base text-on-surface group-hover:text-primary transition-colors">{session.client}</span>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">{session.type}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{session.duration}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-sm font-bold text-on-surface">{session.rating.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </main>
  );
}
