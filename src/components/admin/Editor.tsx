"use client";

import { API_URL } from '@/config';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { Code, Type } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

export default function RichTextEditor({ value, onChange, height = 400 }: RichTextEditorProps) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="rich-editor-wrapper rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white relative z-20">
      <div className="flex justify-end p-2 bg-slate-50 border-b border-slate-100">
        <button 
          type="button"
          onClick={() => setShowRaw(!showRaw)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-tight text-slate-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
        >
          {showRaw ? <Type size={12} /> : <Code size={12} />}
          {showRaw ? "Visual Editor" : "Markdown / HTML Source"}
        </button>
      </div>

      {showRaw ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{ height: height }}
          className="w-full p-6 font-mono text-sm border-none focus:ring-0 resize-none bg-slate-900 text-slate-300 min-h-[250px]"
          placeholder="Enter content here..."
        />
      ) : (
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          value={value || ''}
          onEditorChange={(content) => onChange(content)}
          init={{
            height: height,
            menubar: 'file edit view insert format tools table',
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
            skin: 'oxide',
            promotion: false,
            branding: false,
            images_upload_handler: async (blobInfo: any) => {
              const formData = new FormData();
              formData.append('image', blobInfo.blob(), blobInfo.filename());

              const apiUrl = API_URL || 'http://localhost:5001/api';
              
              try {
                const res = await fetch(`${apiUrl}/upload`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: formData
                });

                if (!res.ok) throw new Error('HTTP Error: ' + res.status);

                const json = await res.json();
                if (!json.success) throw new Error('Upload failed: ' + json.error);

                // Construct the full URL for the uploaded image
                const baseUrl = apiUrl.replace(/\/api$/, '');
                return `${baseUrl}${json.data}`;
              } catch (err) {
                console.error('TinyMCE upload error:', err);
                throw err;
              }
            },
          }}
        />
      )}
    </div>
  );
}
