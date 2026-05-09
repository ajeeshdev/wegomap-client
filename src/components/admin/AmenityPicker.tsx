import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { 
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag, Plus, X, LucideIcon,
  BedDouble, Bed, Hotel, Bath, ShowerHead, ThermometerSnowflake,
  Tv, Key, DoorOpen, Users, TreePalm, ChevronDown
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Utensils, Car, Plane, MapPin, Clock, 
  ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
  Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
  Heart, Sunset, ShoppingBag, BedDouble, Bed, Hotel, 
  Bath, ShowerHead, ThermometerSnowflake, Tv, Key, 
  DoorOpen, Users, TreePalm
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

export default function AmenityPicker({ value = [], onChange, max = 6 }: AmenityPickerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-2" ref={containerRef}>
      {Array.isArray(value) && value.map((am, idx) => {
        const IconComponent = ICON_MAP[am.icon] || Star;
        const isOpen = openIndex === idx;
        
        return (
          <div key={idx} className="flex items-center gap-1 bg-white border border-slate-200 rounded-full py-1 px-1 shadow-sm hover:border-blue-400 transition-all h-10 relative">
             <div className="relative">
                <button 
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-blue-600 hover:bg-blue-50'}`}
                >
                   <IconComponent size={14} />
                   <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[8px] text-slate-400 ${isOpen ? 'rotate-180' : ''} transition-transform`}>
                      <ChevronDown size={8} />
                   </div>
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] p-3 animate-in fade-in zoom-in duration-200 origin-top-left max-h-60 overflow-y-auto custom-scrollbar">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1 sticky top-0 bg-white py-1">Select Visual Icon</div>
                    <div className="grid grid-cols-6 gap-1">
                      {Object.keys(ICON_MAP).sort().map(iconName => {
                        const PickerIcon = ICON_MAP[iconName];
                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => updateAmenity(idx, { icon: iconName })}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${am.icon === iconName ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-blue-600'}`}
                            title={iconName}
                          >
                            <PickerIcon size={14} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
             </div>
             
             <input 
                type="text" 
                value={am.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateAmenity(idx, { label: e.target.value })}
                placeholder="Label"
                className="text-[11px] font-bold text-slate-800 outline-none placeholder:text-slate-300 uppercase tracking-tight"
                style={{ 
                   width: '90px', 
                   padding: '2px 8px', 
                   height: '32px', 
                   background: 'transparent', 
                   border: 'none',
                   boxShadow: 'none',
                   minHeight: 'auto'
                }}
             />

             <button 
                type="button"
                onClick={() => removeAmenity(idx)}
                className="w-6 h-6 text-slate-300 hover:text-rose-500 transition-colors flex items-center justify-center mr-1"
                title="Remove"
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
          className="flex items-center gap-1.5 px-4 py-1 border border-dashed border-slate-300 rounded-full text-slate-400 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all h-10"
        >
          <Plus size={14} />
          <span className="text-[10px] font-black uppercase tracking-tighter">Add Benefit</span>
        </button>
      )}
    </div>
  );
}
