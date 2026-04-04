"use client";

import React from 'react';
import { 
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag, Plus, Trash2, X
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag
};

const COLORS = [
  { name: 'Blue', value: 'blue' },
  { name: 'Rose', value: 'rose' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Amber', value: 'amber' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Slate', value: 'slate' },
  { name: 'Violet', value: 'violet' }
];

interface Amenity {
  icon: string;
  label: string;
  color?: string;
}

interface AmenityPickerProps {
  value: Amenity[];
  onChange: (am: Amenity[]) => void;
  max?: number;
}

export default function AmenityPicker({ value = [], onChange, max = 6 }: AmenityPickerProps) {
  const addAmenity = () => {
    if (value.length >= max) return;
    onChange([...value, { icon: 'Star', label: '', color: 'blue' }]);
  };

  const removeAmenity = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const updateAmenity = (idx: number, updates: Partial<Amenity>) => {
    const newVal = [...value];
    newVal[idx] = { ...newVal[idx], ...updates };
    onChange(newVal);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((am, idx) => {
          const IconComponent = ICON_MAP[am.icon] || Star;
          
          return (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)] relative group animate-in zoom-in duration-300">
               <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${am.color || 'blue'}-100 text-${am.color || 'blue'}-600 flex items-center justify-center shrink-0 shadow-sm shadow-${am.color || 'blue'}-500/10`}>
                     <IconComponent size={24} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                     <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Label</label>
                        <input 
                           type="text" 
                           value={am.label}
                           onChange={e => updateAmenity(idx, { label: e.target.value })}
                           placeholder="e.g. Luxury Stays"
                           className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                           <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono">Icon</label>
                           <select 
                              value={am.icon}
                              onChange={e => updateAmenity(idx, { icon: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-blue-500 transition-all cursor-pointer"
                           >
                              {Object.keys(ICON_MAP).sort().map(iconName => (
                                 <option key={iconName} value={iconName}>{iconName}</option>
                              ))}
                           </select>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono">Color</label>
                           <select 
                              value={am.color || 'blue'}
                              onChange={e => updateAmenity(idx, { color: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-blue-500 transition-all cursor-pointer"
                           >
                              {COLORS.map(c => (
                                 <option key={c.value} value={c.value}>{c.name}</option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                  onClick={() => removeAmenity(idx)}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
               >
                  <X size={14} />
               </button>
            </div>
          );
        })}

        {value.length < max && (
          <button 
            type="button"
            onClick={addAmenity}
            className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.33%-1rem)] aspect-[4/2] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
               <Plus size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Add Feature Option</span>
          </button>
        )}
      </div>
    </div>
  );
}
