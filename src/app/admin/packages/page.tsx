"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { API_URL, getImageUrl } from '@/config';
import { 
  Edit, Trash2, Plus, Search, MapPin, Tag, 
  ShieldCheck, Sparkles, Zap, Layers, GripVertical, 
  ChevronUp, ChevronDown 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// DND Kit Imports
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableRowProps {
  pkg: any;
  onDelete: (id: string) => void;
  onStatusToggle: (pkg: any) => void;
  onOrderChange: (pkg: any, val: string) => void;
}

function SortableRow({ pkg, onDelete, onStatusToggle, onOrderChange }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: pkg._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    position: 'relative' as const,
    backgroundColor: isDragging ? '#f8fafc' : undefined,
    boxShadow: isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : undefined,
  };

  return (
    <tr ref={setNodeRef} style={style} className={`cms-table-row ${isDragging ? 'dragging-active' : ''}`}>
      <td className="cms-table-cell">
        <div className="flex items-center gap-3">
          <div 
            {...attributes} 
            {...listeners} 
            className="cursor-grab active:cursor-grabbing p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            title="Drag to reorder"
          >
            <GripVertical size={18} />
          </div>
          <div className="cms-cell-product">
            <div className="cms-cell-image">
              {pkg.thumb || (pkg.images && pkg.images[0]) ? (
                <img src={getImageUrl(pkg.thumb || pkg.images[0])} alt="" />
              ) : (
                <div className="w-small h-small flex items-center justify-center text-slate-300">
                  <Layers size={24} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="cms-cell-title">
                {pkg.title}
              </div>
              <div className="cms-cell-meta">
                <span className="cms-meta-badge">
                  <ShieldCheck size={9} style={{ color: '#3b82f6' }} /> #{pkg.pcode || 'UNTYPED'}
                </span>
                <span className="cms-meta-badge">
                  <Layers size={9} style={{ color: '#0ea5e9' }} /> {pkg.slug || 'no-slug'}
                </span>
                {pkg.onoffer && (
                  <span className="px-1.5 py-0.5 bg-rose-50 text-emerald-500 rounded-lg text-[8px] font-black uppercase tracking-tighter border border-rose-100 flex items-center gap-1">
                    <Zap size={8} className="fill-current" /> Special Offer
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="cms-table-cell">
        <div className="cms-cat-badge">
          <MapPin size={11} style={{ color: '#f43f5e' }} />
          <span>{pkg.location || 'GLOBAL CORE'}</span>
        </div>
      </td>
      <td className="cms-table-cell">
        <div className="cms-cell-price">
          <div className="cms-price-current">₹{pkg.price ? Number(pkg.price).toLocaleString() : '0'} <span className="text-[8px] opacity-50">{pkg.per || '/ NODE'}</span></div>
          {pkg.oldamt && (
            <div className="cms-price-old">₹{Number(pkg.oldamt).toLocaleString()}</div>
          )}
        </div>
      </td>
      <td className="cms-table-cell">
        <div className="flex flex-wrap gap-1 max-w-[150px]">
          {(pkg.categories && pkg.categories.length > 0) ? (
            pkg.categories.map((cat: string, i: number) => (
              <span key={i} className="cms-cat-badge whitespace-nowrap">
                <Tag size={10} /> {cat}
              </span>
            ))
          ) : (
            <span className="cms-cat-badge whitespace-nowrap">
              <Tag size={10} /> {pkg.category || 'Standard'}
            </span>
          )}
        </div>
      </td>
      <td className="cms-table-cell">
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={pkg.order || 0} 
            onChange={(e) => onOrderChange(pkg, e.target.value)}
            className="w-12 h-8 text-[10px] font-bold text-center border rounded bg-slate-50 focus:bg-white transition-all pointer-events-auto"
          />
        </div>
      </td>
      <td className="cms-table-cell">
          <button 
            onClick={() => onStatusToggle(pkg)}
            className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border transition-all ${
              pkg.status === 'Published' 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
              : 'bg-rose-50 text-rose-500 border-rose-200 opacity-60'
            }`}
          >
            {pkg.status === 'Published' ? 'Active' : 'Disabled'}
          </button>
      </td>
      <td className="cms-table-cell">
        <div className="cms-action-group">
          <Link href={`/admin/packages/${pkg._id}/edit`} className="cms-btn-icon cms-btn-edit" title="Edit Package">
            <Edit size={16} />
          </Link>
          <button onClick={() => onDelete(pkg._id)} className="cms-btn-icon cms-btn-delete" title="Remove Package">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReordering, setIsReordering] = useState(false);

  // DND Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`);
      const data = await res.json();
      if (data.success) {
        setPackages(data.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch (err) {
      console.error('Error fetching packages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const res = await fetch(`${API_URL}/packages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setPackages(packages.filter((pkg: any) => pkg._id !== id));
        toast.success('Package deleted');
      }
    } catch (err) {
      console.error('Failed to delete', err);
      toast.error('Deletion failed');
    }
  }

  const handleStatusToggle = async (pkg: any) => {
    const newStatus = pkg.status === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await fetch(`${API_URL}/packages/${pkg._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...pkg, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setPackages(packages.map((p: any) => p._id === pkg._id ? { ...p, status: newStatus } : p));
        toast.success(`Package ${newStatus === 'Published' ? 'Enabled' : 'Disabled'}`);
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
      toast.error('Update failed');
    }
  };

  const handleOrderChange = async (pkg: any, newOrder: string) => {
    const orderNum = parseInt(newOrder) || 0;
    try {
      const res = await fetch(`${API_URL}/packages/${pkg._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...pkg, order: orderNum })
      });
      const data = await res.json();
      if (data.success) {
        setPackages(packages.map((p: any) => p._id === pkg._id ? { ...p, order: orderNum } : p)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch (err) {
       console.error('Failed to update order', err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = packages.findIndex((pkg) => pkg._id === active.id);
      const newIndex = packages.findIndex((pkg) => pkg._id === over.id);

      const newPackages = arrayMove(packages, oldIndex, newIndex).map((pkg, index) => ({
        ...pkg,
        order: index + 1
      }));

      setPackages(newPackages);
      
      // Sync with backend
      setIsReordering(true);
      try {
        const res = await fetch(`${API_URL}/packages/reorder`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ 
            orders: newPackages.map(p => ({ id: p._id, order: p.order }))
          })
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Display order updated');
        } else {
          toast.error('Failed to save order');
          fetchPackages(); // rollback
        }
      } catch (err) {
        toast.error('Network error updating order');
        fetchPackages(); // rollback
      } finally {
        setIsReordering(false);
      }
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg: any) =>
      (pkg.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.categories || []).some((c: string) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pkg.pcode || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  return (
    <div className="cms-page-wrapper">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Packages
          </h2>
          <p className="admin-page-subtitle">Manage your travel packages and itineraries.</p>
        </div>
        <div className="cms-search-bar">
          <div className="cms-search-input-wrap">
            <Search className="cms-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-search-input"
            />
          </div>
          <Link href="/admin/packages/create" className="admin-btn admin-btn-primary h-11 shrink-0">
            <Plus size={18} /> New Package
          </Link>
        </div>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading packages...</p>
        </div>
      ) : (
        <div className="cms-listing-card">
          <div className="overflow-x-auto">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <table className="admin-table">
                <thead className="cms-table-header">
                  <tr>
                    <th style={{ width: '35%' }}>Package Details</th>
                    <th style={{ width: '15%' }}>Location</th>
                    <th style={{ width: '10%' }}>Price</th>
                    <th style={{ width: '15%' }}>Category</th>
                    <th style={{ width: '8%' }}>Order</th>
                    <th style={{ width: '10%' }}>Status</th>
                    <th style={{ width: '7%', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SortableContext 
                    items={filteredPackages.map(p => p._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredPackages.map((pkg: any) => (
                      <SortableRow 
                        key={pkg._id} 
                        pkg={pkg} 
                        onDelete={handleDelete}
                        onStatusToggle={handleStatusToggle}
                        onOrderChange={handleOrderChange}
                      />
                    ))}
                  </SortableContext>
                  
                  {filteredPackages.length === 0 && (
                    <tr>
                      <td colSpan={7}>
                        <div className="cms-empty-state">
                          <div className="cms-empty-icon">
                            <Layers size={64} />
                          </div>
                          <p className="cms-empty-text">No packages found in your inventory</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </DndContext>
          </div>
        </div>
      )}

      {/* Reordering Overlay */}
      {isReordering && (
        <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-bottom-4">
           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
           <span className="text-xs font-bold uppercase tracking-widest">Saving display order...</span>
        </div>
      )}

      {/* Summary Matrix */}
      {!loading && filteredPackages.length > 0 && (
        <div className="admin-card !p-6 flex items-center justify-between mt-6">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-base uppercase tracking-tight">Inventory Summary</h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">View your current active package statistics.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Inventory</p>
              <h5 className="text-xl font-bold text-slate-900 leading-none mt-1">{(filteredPackages.length).toString().padStart(2, '0')}</h5>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Inventory Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={10} className="text-blue-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pricing Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
