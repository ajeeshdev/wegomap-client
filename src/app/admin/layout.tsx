"use client";

import Link from 'next/link';
import { ChevronDown, Package, FileText, Users, Home, Settings, LogOut,
  MapPin, Car, Anchor, MessageSquare, HelpCircle,
  Image as ImageIcon, List, File, CheckCircle, Sliders,
  PartyPopper, Calendar, Inbox, Briefcase, Globe
 } from 'lucide-react';
 import { usePathname, useRouter } from 'next/navigation';
 import { useEffect, useState } from 'react';

import './admin.css';
import './cms-common.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userProfile = localStorage.getItem('userProfile');
    
    if (!token) {
        router.push('/admin-login');
        return;
    }

    try {
        if (userProfile) {
            const user = JSON.parse(userProfile);
            if (user.role !== 'admin' && user.role !== 'manager') {
                router.push('/admin-login');
                return;
            }
        }
        setAuthorized(true);
    } catch (e) {
        router.push('/admin-login');
    }
  }, [router]);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Blogs': true,
    'Packages': false,
    'Home': true,
    'Site Pages': false,
    'Advanced': false,
    'General Settings': true,
  });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  if (!authorized && pathname !== '/admin-login') {
      return (
          <div className="flex items-center justify-center min-h-screen bg-slate-950">
              <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
      );
  }

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: Home },
    { 
      label: 'General Settings', 
      href: '/admin/site-options', 
      icon: Settings,
      subItems: [
        { label: 'Site Profile', href: '/admin/site-options' },
        { label: 'Navigation Menus', href: '/admin/menus' },
      ]
    },
    { 
      label: 'Blogs', 
      href: '/admin/blogs', 
      icon: FileText,
      subItems: [
        { label: 'All blogs', href: '/admin/blogs' },
        { label: 'Blog categories', href: '/admin/categories' },
      ]
    },
    { 
      label: 'Packages', 
      href: '/admin/packages', 
      icon: Package,
      subItems: [
        { label: 'Packages', href: '/admin/packages' },
        { label: 'Add Package', href: '/admin/packages/create' },
        { label: 'Package Categories', href: '/admin/categories' },
      ]
    },
    { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { 
      label: 'Home', 
      href: '/admin/home-settings', 
      icon: Home,
      subItems: [
        { label: 'Home Page Layout', href: '/admin/home-settings' },
        { label: 'Banner Sliders', href: '/admin/sliders' },
        { label: 'SEO Settings', href: '/admin/pages/69b2119212e7a77684ef09fd/edit' },
      ]
    },
    { 
      label: 'Site Pages', // Changed from 'Landing Page'
      href: '/admin/pages', 
      icon: File,
      subItems: [
        { label: 'All Pages', href: '/admin/pages' },
        { label: 'Add New Page', href: '/admin/pages/create' },
        { label: 'About Page', href: '/admin/about-page' },
        { label: 'Services Page', href: '/admin/services-page' },
        { label: 'Testimonials', href: '/admin/testimonials' },
        { label: 'Amenities', href: '/admin/amenities' }, // Fixed typo 'Aminities'
      ]
    },
    { 
      label: 'Events', 
      href: '/admin/events', 
      icon: Calendar,
      subItems: [
        { label: 'All Events', href: '/admin/events' },
        { label: 'Add New', href: '/admin/events/create' },
      ]
    },
    { 
      label: 'Special Events', 
      href: '/admin/special-events', 
      icon: PartyPopper,
      subItems: [
        { label: 'All Special Events', href: '/admin/special-events' },
        { label: 'Add New', href: '/admin/special-events/create' },
      ]
    },
    { 
      label: 'Inquiries', 
      href: '/admin/leads', 
      icon: Inbox,
      subItems: [
        { label: 'All Leads', href: '/admin/leads' },
        { label: 'All Contact', href: '/admin/contacts' },
      ]
    },
    { label: 'Houseboat', href: '/admin/houseboat', icon: Anchor },
    { label: 'Cabs', href: '/admin/cabs', icon: Car },
    { label: 'Faqs', href: '/admin/faqs', icon: HelpCircle },
    { 
      label: 'Banners', 
      href: '/admin/banners', 
      icon: ImageIcon,
      subItems: [
        { label: 'All Banners', href: '/admin/banners' },
        { label: 'Add New Banner', href: '/admin/banners/create' },
      ]
    },
    { 
      label: 'Services', 
      href: '/admin/services', 
      icon: Briefcase,
      subItems: [
        { label: 'Page Welcome Text', href: '/admin/services-page' },
        { label: 'All Services List', href: '/admin/services' },
        { label: 'Add New Service', href: '/admin/services/create' },
      ]
    },
    { 
      label: 'SEO', 
      href: '/admin/seo', 
      icon: Globe,
    },
    { 
      label: 'Advanced', 
      href: '/admin/settings', 
      icon: Sliders,
      subItems: [
        { label: 'System Settings', href: '/admin/settings' },
      ]
    },
  ];

  return (
    <div className="admin-layout selection:bg-blue-500/20">
      {/* Sidebar */}
      <div className="admin-sidebar shadow-sm">
        
        {/* Branding */}
        <div className="admin-sidebar-header">
          <div className="admin-logo-icon">W</div>
          <h2 className="admin-logo-text">Wegomap</h2>
        </div>

        {/* Navigation */}
        <nav className="admin-nav custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openMenus[item.label];
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
            
            if (hasSubItems) {
              return (
                <div key={item.label} className="admin-nav-group">
                  <div 
                    className={`admin-nav-item admin-nav-item-header ${isActive ? 'parent-active' : ''}`}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="admin-nav-icon" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown size={14} className={`admin-nav-chevron ${isOpen ? 'open' : ''}`} />
                  </div>
                  
                  {isOpen && (
                    <div className="admin-nav-submenu">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link 
                            key={sub.href}
                            href={sub.href}
                            className={`admin-submenu-item ${isSubActive ? 'active' : ''}`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} className="admin-nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-logout-btn">
            <LogOut size={18} className="admin-logout-icon" />
            <span>Exit CMS</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="flex items-center gap-4">
            <h1 className="admin-header-title">
              System Administration
            </h1>
          </div>
          <div className="admin-header-actions">
            <div className="admin-user-info">
              <p className="admin-user-name">Administrator</p>
              <p className="admin-user-role">System Settings</p>
            </div>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        
        {/* Dynamic Content */}
        <div className="admin-content-area">
          <div className="admin-content-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

// Add these styles to globals.css if possible, but for now we rely on tailwind
