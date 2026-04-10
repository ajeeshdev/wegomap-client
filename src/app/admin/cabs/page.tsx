"use client";

import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { Car, ShieldCheck, Zap, Sparkles, Clock, Ship, ChevronDown, Check, AlertCircle, Info, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import '../cms-premium.scss';

export default function CabsAdmin() {
  const defaultPricing = {
    sedan: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    innova: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    seater912: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    seater17: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' }
  };

  const [pricing, setPricing] = useState<any>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPricing(); }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${API_URL}/options?key=cab_pricing`);
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        const fetchedData = json.data[0].value;
        const mergedData: any = { ...defaultPricing };
        
        // Find keys that are not in defaults (custom vehicles)
        const customVehicles = Object.keys(fetchedData)
          .filter(key => !Object.keys(defaultPricing).includes(key))
          .map(key => ({
            key,
            label: key.replace(/_/g, ' ').toUpperCase(),
            icon: '🚘'
          }));

        setVehicleTypes(prev => {
          const baseKeys = ['sedan', 'innova', 'seater912', 'seater17'];
          const baseTypes = prev.filter(v => baseKeys.includes(v.key));
          return [...baseTypes, ...customVehicles];
        });

        Object.keys(fetchedData).forEach(key => {
          mergedData[key] = {
            ...(defaultPricing[key as keyof typeof defaultPricing] || { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' }),
            ...fetchedData[key]
          };
        });
        setPricing(mergedData);
      }
    } catch (err) { 
        console.error(err); 
    } finally { 
        setLoading(false); 
    }
  };

  const handleChange = (type: string, field: string, value: string) => {
    setPricing((prev: any) => ({
      ...prev,
      [type]: { ...(prev[type] || {}), [field]: value }
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/options/bulk`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          options: [{ key: 'cab_pricing', value: pricing, type: 'pricing' }]
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Transport rates synchronized successfully');
      }
    } catch (err) { 
        toast.error('Sync failure detected');
    } finally { 
        setSaving(false); 
    }
  };

  if (loading) return (
    <div className="property-edit-container flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Accessing Fleet Matrix...</p>
    </div>
  );

  const [vehicleTypes, setVehicleTypes] = useState([
    { key: 'sedan', label: 'Sedan', icon: '🚗' },
    { key: 'innova', label: 'Innova', icon: '🚐' },
    { key: 'seater912', label: '9/12 Seater', icon: '🚌' },
    { key: 'seater17', label: '17 Seater', icon: '🚍' }
  ]);

  const addVehicleType = () => {
    const name = prompt("Enter Vehicle Name (e.g. Luxury SUV):");
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, '_');
    if (vehicleTypes.find(v => v.key === key)) {
      toast.error('Vehicle type already exists');
      return;
    }
    
    setVehicleTypes([...vehicleTypes, { key, label: name, icon: '🚘' }]);
    setPricing({ ...pricing, [key]: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' } });
  };

  const removeVehicleType = (key: string) => {
    if (!confirm('Remove this vehicle and all its pricing data?')) return;
    setVehicleTypes(vehicleTypes.filter(v => v.key !== key));
    const newPricing = { ...pricing };
    delete newPricing[key];
    setPricing(newPricing);
  };

  const durations = [
    { key: 'n2d3', label: '2 Nights 3 Days' },
    { key: 'n3d4', label: '3 Nights 4 Days' },
    { key: 'n4d5', label: '4 Nights 5 Days' },
    { key: 'n5d6', label: '5 Nights 6 Days' },
    { key: 'n6d7', label: '6 Nights 7 Days' }
  ];

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <div className="p-3 bg-slate-50 border border-slate-100 rounded-full text-amber-500"><Car size={20} /></div>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Cab Fleet Pricing</h2>
              <p className="status-badge">GLOBAL TRANSPORT MATRIX</p>
           </div>
        </div>
        <div className="header-actions flex gap-3">
           <button onClick={addVehicleType} className="p-2.5 bg-white border border-slate-200 rounded-xl text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm flex items-center gap-2 font-bold text-xs uppercase px-4">
              <Plus size={16} /> Add Vehicle
           </button>
           <button onClick={() => handleSave()} disabled={saving} className="save-btn font-black uppercase text-[11px] tracking-widest px-6">
              <ShieldCheck size={18} /> {saving ? 'Applying...' : 'Save Fleet Data'}
           </button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
          <div className="tab-panel space-y-8">
            {vehicleTypes.map((vehicle) => (
              <div key={vehicle.key} className="editor-card group hover:border-amber-200 transition-all">
                <div className="card-header bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{vehicle.icon}</div>
                    <h3 className="serif text-xl font-bold group-hover:text-amber-600 transition-colors uppercase tracking-tight">{vehicle.label}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => removeVehicleType(vehicle.key)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Online</span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {durations.map((duration) => (
                      <div key={duration.key} className="admin-form-group mb-0">
                        <label className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                          {duration.label}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-300">₹</span>
                          <input 
                            type="text" 
                            value={pricing[vehicle.key]?.[duration.key] || ''}
                            onChange={e => handleChange(vehicle.key, duration.key, e.target.value)}
                            className="pl-10 !bg-slate-50 border-slate-100 hover:bg-white focus:bg-white transition-all font-black text-slate-900"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="meta-sidebar">
          <div className="meta-card">
            <div className="card-header"><h4 className="serif">Fleet Integrity</h4></div>
            <div className="card-body space-y-6">
               <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Check size={18} />
                  </div>
                  <div>
                    <div className="text-[12px] font-black text-emerald-900 leading-none uppercase tracking-tight">Active Sync</div>
                    <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Live Pricing Protocols</div>
                  </div>
               </div>

               <div className="mt-6 p-4 bg-slate-900 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20">
                           <Zap size={14} />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Transport Logic</span>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter italic">
                        All rates are processed via the internal normalization engine. Changes update the Tour Package cost calculation nodes globally.
                     </p>
                  </div>
               </div>

               <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                     <Info size={16} className="text-blue-600" />
                     <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Protocol Tip</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Ensure all nights/days combinations are filled to prevent calculation errors in the frontend tour builder.
                  </p>
               </div>
            </div>
          </div>
          
          <div className="meta-card">
            <div className="card-header"><h4 className="serif">System Statistics</h4></div>
            <div className="card-body">
               <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fleet Segments</div>
                     <div className="text-xl font-black text-slate-900">0{vehicleTypes.length}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Protocol Sync</div>
                     <div className="text-[10px] font-black text-slate-900 uppercase">{new Date().toLocaleDateString()}</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}