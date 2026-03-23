"use client";

import { API_URL, UPLOADS_URL } from '@/config';
import { useState } from 'react';
import { Upload, X, ImageIcon, CheckCircle2, AlertCircle, Loader2, Plus, GripVertical } from 'lucide-react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ value, onChange, label = "Gallery Assets" }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    const newUrls = [...value];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const formData = new FormData();
      formData.append('image', file);

      try {
        if (!API_URL) {
          setError('API URL not configured');
          break;
        }

        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        const data = await res.json();

        if (data.success) {
          const imageUrl = data.data.startsWith('http')
            ? data.data
            : `${UPLOADS_URL}${data.data}`;
          newUrls.push(imageUrl);
        }
      } catch (err) {
        console.error('Upload error:', err);
        setError('Connection error during some uploads');
      }
    }

    onChange(newUrls);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  return (
    <div className="space-y-6">
      <label className="admin-form-label text-[10px] flex items-center gap-3 mb-2 font-black uppercase tracking-[0.2em] opacity-60">
        <ImageIcon size={14} className="text-orange-500" /> {label}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {value.map((url, index) => (
          <div key={index} className="relative group rounded-[32px] overflow-hidden border-2 border-slate-100 shadow-sm aspect-square bg-slate-50 transition-all hover:shadow-xl hover:-translate-y-1">
            <img src={url} alt={`Gallery ${index}`} className="w-small h-small object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeImage(index)}
                className="admin-remove-btn"
                title="Deconstruct Asset"
              >
                <X size={16} />
              </button>
            </div>
            <div className="absolute top-3 left-3 w-6 h-6 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white text-[10px] font-black border border-white/20">
              {index + 1}
            </div>
          </div>
        ))}

        <div className="relative group aspect-square">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-small h-small opacity-0 cursor-pointer z-10"
          />
          <div className={`
            h-full border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all duration-500
            ${uploading ? 'bg-orange-50/50 border-orange-200 animate-pulse' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10'}
          `}>
            <div className={`
              w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-700
              ${uploading ? 'bg-orange-600 text-white' : 'bg-white text-slate-400 border border-slate-100 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white'}
            `}>
              {uploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 text-center px-4">
              {uploading ? 'APPENDING...' : 'DISCOVER ASSET'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}

      <div className="pt-4 border-t border-slate-50">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-3 italic">Raw Tectonic Gallery Manifest (Manual Calibration)</p>
        <div className="bg-slate-50/50 rounded-[32px] p-2 border border-slate-100 shadow-inner group-hover:bg-white transition-all">
          <textarea
            rows={4}
            value={value.join('\n')}
            onChange={e => onChange(e.target.value.split('\n').filter(l => l))}
            className="admin-form-textarea !bg-transparent border-none font-mono text-[9px] leading-relaxed text-orange-900 h-32"
            placeholder="Analytical list of URIs..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
