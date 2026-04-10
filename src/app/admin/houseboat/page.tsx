"use client";
import { getImageUrl } from "@/config";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Ship, Anchor, Waves, Sparkles, MoreVertical, Zap, Clock, ShieldCheck, Layers, MapPin, Globe, LayoutGrid, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import '../cms-premium.scss';

export default function HouseboatMainAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'pricing'
  const [pricing, setPricing] = useState<Record<string, any>>({});
  const [savingPricing, setSavingPricing] = useState(false);

  useEffect(() => { 
    fetchData(); 
    fetchPricing();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/houseboats`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${API_URL}/options?key=houseboat_package`);
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        setPricing(json.data[0].value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this houseboat?')) return;
    try {
      const res = await fetch(`${API_URL}/houseboats/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      if (json.success) {
        setData(data.filter((item: any) => item._id !== id));
        toast.success('Vessel removed from fleet');
      }
    } catch (err) { console.error('Failed to delete', err); }
  }

  const handleSavePricing = async () => {
    setSavingPricing(true);
    try {
      const res = await fetch(`${API_URL}/options/bulk`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          options: [{ key: 'houseboat_package', value: pricing, type: 'pricing' }]
        })
      });
      const data = await res.json();
      if (data.success) toast.success('Pricing protocols updated');
    } catch (err) {
      toast.error('Sync failed');
    } finally {
      setSavingPricing(false);
    }
  };

  const filteredData = data.filter((item: any) =>
    (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="property-edit-header">
        <div className="header-left">
           <div className="p-3 bg-slate-50 border border-slate-100 rounded-full text-blue-600"><Ship size={20} /></div>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Houseboat Hub</h2>
              <p className="status-badge">COMMAND CENTER : <span className="active">{activeTab.toUpperCase()}</span></p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'inventory' && (
            <>
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search vessels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 !bg-slate-50 border-none !h-11 font-semibold text-xs"
                />
              </div>
              <Link href="/admin/houseboats/create" className="save-btn !h-11">
                <Plus size={16} /> Add Vessel
              </Link>
            </>
          )}
          {activeTab === 'pricing' && (
            <button onClick={handleSavePricing} disabled={savingPricing} className="save-btn !h-11">
              <ShieldCheck size={18} /> {savingPricing ? 'Applying...' : 'Apply Pricing'}
            </button>
          )}
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
          {/* Navigation Tabs */}
          <div className="tabs-header !mb-6">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`tab-btn-top ${activeTab === 'inventory' ? 'active' : ''}`}
            >
              <div className="icon-wrap"><Anchor size={14} /></div>
              <span>Active Fleet</span>
            </button>
            <button 
              onClick={() => setActiveTab('pricing')}
              className={`tab-btn-top ${activeTab === 'pricing' ? 'active' : ''}`}
            >
              <div className="icon-wrap"><Zap size={14} /></div>
              <span>Pricing Global</span>
            </button>
          </div>

          {/* Content Display */}
          {activeTab === 'inventory' ? (
            loading ? (
              <div className="editor-card flex flex-col items-center justify-center p-20 gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Syncing fleet data...</p>
              </div>
            ) : (
              <div className="tab-panel">
                <div className="space-y-4">
                  {filteredData.map((item: any) => (
                    <div key={item._id} className="editor-card hover:border-blue-200 transition-all group">
                      <div className="p-6 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden relative">
                          {item.thumb ? (
                            <img src={getImageUrl(item.thumb)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Ship size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-slate-900 uppercase text-[12px] tracking-tight">{item.title || item.name}</h3>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-100">
                              {item.category || 'Standard'}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1 font-medium italic">{item.short_desc || 'No brief description set.'}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                              <ShieldCheck size={10} className="text-emerald-500" /> ID: #{String(item._id).toUpperCase().slice(-6)}
                            </span>
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {item.status || 'Active'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/houseboats/${item._id}/edit`} className="p-2.5 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100 shadow-sm" title="Edit Properties">
                            <Edit size={16} />
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="p-2.5 bg-slate-50 text-slate-300 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-slate-100 shadow-sm" title="Decommission">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredData.length === 0 && (
                    <div className="editor-card p-20 text-center text-slate-300">
                      <Ship size={48} className="mx-auto mb-4 opacity-10" />
                      <p className="font-black text-[10px] uppercase tracking-widest">No vessels found in hangar</p>
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="tab-panel">
              <div className="editor-card p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200"><Zap size={20} /></div>
                  <div>
                    <h3 className="serif text-xl font-bold">Global Price Protocol</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Configures starting rates for tiers across the platform</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Object.entries(pricing).map(([key, data]: any) => (
                    <div key={key} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all duration-500">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-white rounded-lg border border-slate-100 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors">{key}</span>
                        <Sparkles size={14} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="admin-form-group mb-0">
                        <label>Base Price (₹)</label>
                        <input 
                          type="text" 
                          value={data.price} 
                          onChange={e => setPricing({...pricing, [key]: {...data, price: e.target.value}})}
                          className="title-input !text-xl !font-black !bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
