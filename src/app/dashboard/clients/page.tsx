"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const pipelineData = [
  { stage: 'Onboarding', clients: 12 },
  { stage: 'Active Sync', clients: 45 },
  { stage: 'Review', clients: 8 },
  { stage: 'Graduated', clients: 34 },
];

const clientTableData = [
  { id: "C-001", name: "Elena Rostova", focus: "Executive Leadership", status: "Active", nextSession: "Oct 24, 2023", progress: 85 },
  { id: "C-002", name: "Marcus Chen", focus: "Career Pivot", status: "Onboarding", nextSession: "Oct 25, 2023", progress: 15 },
  { id: "C-003", name: "Sarah Jenkins", focus: "Mindset & Resilience", status: "Active", nextSession: "Oct 28, 2023", progress: 60 },
  { id: "C-004", name: "David Kim", focus: "Startup Scaling", status: "Review", nextSession: "Oct 30, 2023", progress: 95 },
  { id: "C-005", name: "Priya Patel", focus: "Public Speaking", status: "Active", nextSession: "Nov 02, 2023", progress: 40 },
];

export default function ClientsPage() {
  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8">
      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Client Management</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Pipeline Overview</h2>
      </div>

      {/* Chart Section */}
      <GlassCard className="p-6 h-[350px] flex flex-col mb-8" glow="primary">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Client Distribution by Stage</h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis dataKey="stage" type="category" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 12}} tickLine={false} axisLine={false} width={100} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.02)'}}
                contentStyle={{ backgroundColor: 'rgba(10, 12, 16, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#01F5A0' }}
              />
              <Bar dataKey="clients" radius={[0, 4, 4, 0]} barSize={24} name="Total Clients">
                {
                  pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#01F5A0' : '#00D1FF'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Table Section */}
      <GlassCard className="flex flex-col overflow-hidden" glow="secondary">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-headline-md text-headline-md text-on-surface">Active Client Roster</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Client Name</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Current Focus</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Next Session</th>
                <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientTableData.map((client) => (
                <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-body-base text-on-surface group-hover:text-primary transition-colors">{client.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">{client.focus}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      client.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 
                      client.status === 'Onboarding' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 
                      'bg-secondary/10 text-secondary border-secondary/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">{client.nextSession}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-24">
                        <div className="h-full bg-primary" style={{ width: `${client.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-primary">{client.progress}%</span>
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
