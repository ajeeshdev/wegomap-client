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
      <label className="admin-form-label text-[10px] flex items-center gap-3 mb-2 font-black uppercase tracking-[0.2em] text-slate-400">
        <ImageIcon size={14} className="text-blue-600" /> {label}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {value.map((url, index) => (
          <div key={index} className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-50 transition-all hover:shadow-md">
            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute top-2 right-2 flex items-center justify-center">
              <button
                onClick={() => removeImage(index)}
                className="w-7 h-7 bg-red-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                title="Remove Image"
              >
                <X size={14} />
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
            h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300
            ${uploading ? 'bg-blue-50/50 border-blue-200 animate-pulse' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-blue-400 hover:shadow-md'}
          `}>
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all
              ${uploading ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white'}
            `}>
              {uploading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 text-center px-4">
              {uploading ? 'UPLOADING...' : 'ADD IMAGE'}
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
    </div>
  );
}
