"use client";

import { API_URL, UPLOADS_URL } from '@/config';
import { useState } from 'react';
import { Upload, X, Globe, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  size?: 'standard' | 'small' | 'icon' | 'landscape';
  objectFit?: 'cover' | 'contain';
  hideUrlInput?: boolean;
  hideRemove?: boolean;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  dimensions?: string;
}

export default function ImageUpload({ value, onChange, label = "Featured Image", size = 'standard', objectFit = 'cover', hideUrlInput = true, hideRemove = false, altValue = "wegomap", onAltChange, dimensions }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      if (!API_URL) {
        setError('API URL not configured');
        setUploading(false);
        return;
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
        // Construct the full URL if the backend returns a relative path
        const imageUrl = data.data.startsWith('http')
          ? data.data
          : `${UPLOADS_URL}${data.data}`;
        onChange(imageUrl);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Connection error');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <label className="admin-form-label !mb-0 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            {label}
          </label>
          {dimensions && (
            <div className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100/50 flex items-center gap-1.5 group/dim hover:bg-blue-100 transition-colors">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">Rec:</span>
              <span className="text-[10px] font-black text-blue-700 font-mono tracking-tighter">{dimensions}</span>
            </div>
          )}
        </div>

      {value ? (
        <div className={`relative group overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 ${size === 'icon' ? 'w-24 h-24 mx-auto' :
          size === 'small' ? 'aspect-[4/4]' :
            size === 'landscape' ? 'aspect-[3/1]' :
              'max-w-full aspect-video'
          }`}>
          <img src={value} alt="Preview" className={`w-full h-full ${size === 'icon' ? 'object-contain p-2' : (objectFit === 'contain' ? 'object-contain' : 'object-cover')}`} />

          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2.5 flex items-center justify-between shadow-lg border border-blue-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={10} strokeWidth={3} />
                </div>
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-tight leading-none">Active</span>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  title=""
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <button className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] changeBtn font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 leading-none">
                  {uploading ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} strokeWidth={3} />}
                  <span>Change</span>
                </button>
              </div>
            </div>
          </div>

          {!hideRemove && (
            <div className="absolute top-2 right-2">
              <button
                onClick={removeImage}
                className="w-7 h-7 bg-rose-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-rose-600 transition-all active:scale-90"
                title="Remove image"
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`
            border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300
            ${uploading ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50/50 border-slate-200 group-hover:bg-white group-hover:border-blue-400 group-hover:shadow-2xl group-hover:shadow-blue-500/10'}
          `}>
            <div className={`
              w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
              ${uploading ? 'bg-blue-600 text-white animate-bounce' : 'bg-white text-blue-400 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white'}
            `}>
              {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={22} strokeWidth={2.5} />}
            </div>
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 group-hover:text-blue-600 transition-colors">
                {uploading ? 'Processing Architecture...' : 'Click to upload media'}
              </p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors">
                High-res JPG, PNG or WebP
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 animate-in slide-in-from-top-2">
          <AlertCircle size={14} className="shrink-0" strokeWidth={3} />
          <p className="text-[10px] font-black uppercase tracking-tight">{error}</p>
        </div>
      )}

      {!hideUrlInput && (
        <div className="pt-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Globe size={10} />
            </div>
            <input
              type="text"
              placeholder="External Image URL..."
              value={value}
              onChange={e => onChange(e.target.value)}
              className="admin-form-input !pl-8 text-[10px] h-9 rounded-lg font-mono bg-slate-50 border-slate-100 focus:bg-white"
            />
          </div>
        </div>
      )}

      {onAltChange && value && (
        <div className="pt-2">
           <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                 <div className="w-1 h-2 bg-emerald-500 rounded-full"></div>
                 Image Alt Text (SEO)
              </label>
              <input 
                type="text"
                value={altValue}
                onChange={e => onAltChange(e.target.value)}
                placeholder="e.g. Kerala Backwaters Image"
                className="admin-form-input !h-10 text-xs font-bold bg-white/50 border-slate-100 focus:bg-white"
              />
           </div>
        </div>
      )}
    </div>
  );
}
