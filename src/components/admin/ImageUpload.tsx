"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { Upload, X, ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Featured Image" }: ImageUploadProps) {
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
          : `${API_URL.replace('/api', '')}${data.data}`;
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

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <label className="admin-form-label">
        <ImageIcon size={14} className="text-blue-500" /> {label}
      </label>

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={removeImage}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-all active:scale-95 shadow-lg"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
          <div className="absolute bottom-3 right-3">
             <span className="admin-status-badge admin-status-badge-success bg-white shadow-sm">
                <CheckCircle2 size={10} /> Uploaded
             </span>
          </div>
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
            border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300
            ${uploading ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50/50 border-slate-200 group-hover:bg-white group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/5'}
          `}>
            <div className={`
              admin-icon-enclosure
              ${uploading ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}
            `}>
              {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={20} />}
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900">
                {uploading ? 'Uploading...' : 'Click to upload'}
              </p>
              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                PNG, JPG or WebP
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 animate-in fade-in duration-300">
          <AlertCircle size={12} className="shrink-0" />
          <p className="text-[9px] font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}
      
      <div className="pt-1">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder="Or paste image URL here..."
          className="admin-form-input text-[11px] h-9 px-3 rounded-lg opacity-60 hover:opacity-100 focus:opacity-100 transition-all font-mono" 
        />
      </div>
    </div>
  );
}
