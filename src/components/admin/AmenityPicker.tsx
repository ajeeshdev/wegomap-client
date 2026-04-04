"use client";

import React, { ChangeEvent } from 'react';
import { 
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag, Plus, X, LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag
};

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

export default function AmenityPicker({ value = [], onChange, max = 4 }: AmenityPickerProps) {
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
    <div className="flex flex-wrap items-center gap-2">
      {Array.isArray(value) && value.map((am, idx) => {
        const IconComponent = ICON_MAP[am.icon] || Star;
        
        return (
          <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg py-1 px-1.5 shadow-sm group hover:border-blue-400 transition-all">
             <div className="relative group/icon cursor-pointer">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-xs">
                   <IconComponent size={12} />
                </div>
                <select 
                   value={am.icon}
                   onChange={(e: ChangeEvent<HTMLSelectElement>) => updateAmenity(idx, { icon: e.target.value })}
                   className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                   title="Change Icon"
                >
                   {Object.keys(ICON_MAP).sort().map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                   ))}
                </select>
             </div>
             
             <input 
                type="text" 
                value={am.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateAmenity(idx, { label: e.target.value })}
                placeholder="Label"
                className="w-20 md:w-28 bg-transparent border-none text-[10px] font-black text-slate-800 outline-none placeholder:text-slate-300 uppercase tracking-tight"
             />

             <button 
                type="button"
                onClick={() => removeAmenity(idx)}
                className="w-4 h-4 text-slate-300 hover:text-rose-500 transition-colors flex items-center justify-center"
                title="Remove"
             >
                <X size={10} />
             </button>
          </div>
        );
      })}

      {value.length < max && (
        <button 
          type="button"
          onClick={addAmenity}
          className="flex items-center gap-1 px-3 py-1 border border-dashed border-slate-300 rounded-lg text-slate-400 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all h-8"
        >
          <Plus size={12} />
          <span className="text-[9px] font-black uppercase tracking-tighter">Add</span>
        </button>
      )}
    </div>
  );
}
