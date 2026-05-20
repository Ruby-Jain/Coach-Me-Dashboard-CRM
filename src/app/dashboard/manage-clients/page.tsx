"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Client {
  id: string;
  name: string;
  email: string;
  focus: string;
  status: string;
}

export default function ManageClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Elena Rostova", email: "elena@example.com", focus: "Executive Leadership", status: "Active" },
    { id: "2", name: "Marcus Chen", email: "marcus@example.com", focus: "Career Pivot", status: "Onboarding" },
  ]);
  
  const [newClient, setNewClient] = useState({ name: "", email: "", focus: "", status: "Onboarding" });
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const sendStatusEmail = async (client: Omit<Client, "id"> & { id?: string }) => {
    try {
      const res = await fetch("/api/clients/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: client.name,
          email: client.email,
          focus: client.focus,
          status: client.status,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Email notification sent to ${client.name} via ${data.transport}`);
      } else {
        showToast(data.error || "Failed to deliver email notification.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error trying to deliver notification.", "error");
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) return;
    
    const clientToAdd = { ...newClient, id: Date.now().toString() };
    setClients(prev => [...prev, clientToAdd]);
    setNewClient({ name: "", email: "", focus: "", status: "Onboarding" });
    
    // Auto trigger email notification on add
    setSendingId(clientToAdd.id);
    await sendStatusEmail(clientToAdd);
    setSendingId(null);
  };

  const handleSendEmailManual = async (client: Client) => {
    setSendingId(client.id);
    await sendStatusEmail(client);
    setSendingId(null);
  };

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8 relative animate-fade-in">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-fade-in flex items-center gap-3 ${
          notification.type === "success" 
            ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_20px_rgba(1,245,160,0.2)]" 
            : "bg-error-container/20 border-error/30 text-error shadow-[0_0_20px_rgba(255,82,82,0.2)]"
        }`}>
          <span className="material-symbols-outlined">{notification.type === "success" ? "check_circle" : "error"}</span>
          <span className="font-body-base text-sm font-semibold">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-85">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Client Administration</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Manage Clients</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Client Form */}
        <GlassCard className="p-6 h-fit lg:col-span-1" glow="primary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Add New Client</h3>
          <form onSubmit={handleAddClient} className="space-y-4">
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                value={newClient.name}
                onChange={e => setNewClient({...newClient, name: e.target.value})}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required 
              />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                value={newClient.email}
                onChange={e => setNewClient({...newClient, email: e.target.value})}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required 
              />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Coaching Focus</label>
              <input 
                type="text" 
                value={newClient.focus}
                onChange={e => setNewClient({...newClient, focus: e.target.value})}
                placeholder="e.g. Leadership, Mindset"
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required 
              />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Initial Status</label>
              <select 
                value={newClient.status}
                onChange={e => setNewClient({...newClient, status: e.target.value})}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary appearance-none"
              >
                <option>Onboarding</option>
                <option>Active</option>
                <option>Review</option>
              </select>
            </div>
            <button 
              type="submit"
              disabled={sendingId !== null}
              className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary-container text-on-primary font-bold shadow-[0_0_15px_rgba(1,245,160,0.3)] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">person_add</span>
              {sendingId ? "Creating & Notifying..." : "Add Client"}
            </button>
          </form>
        </GlassCard>

        {/* Clients List */}
        <GlassCard className="flex flex-col overflow-hidden lg:col-span-2" glow="secondary">
          <div className="p-6 border-b border-white/5">
            <h3 className="font-headline-md text-headline-md text-on-surface">Client Database</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Name</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Focus</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                  <th className="p-4 font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">No clients found. Add one to get started.</td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-body-base text-on-surface">{client.name}</span>
                          <span className="text-xs text-on-surface-variant">{client.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-on-surface-variant">{client.focus}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                          client.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 
                          client.status === 'Review' ? 'bg-error-container/10 text-error border-error/20' :
                          'bg-tertiary/10 text-tertiary border-tertiary/20'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleSendEmailManual(client)}
                          disabled={sendingId === client.id}
                          className="mr-2 p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors disabled:opacity-50 inline-flex items-center justify-center cursor-pointer"
                          title="Send Status Email"
                        >
                          {sendingId === client.id ? (
                            <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                          ) : (
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                          )}
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-2 rounded-lg bg-error-container/10 text-error hover:bg-error/20 transition-colors border border-error/20 inline-flex items-center justify-center cursor-pointer"
                          title="Delete Client"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </main>
  );
}

