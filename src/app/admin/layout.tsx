"use client";

import Link from 'next/link';
import { ChevronDown, Package, FileText, Users, Home, Settings, LogOut,
  MapPin, Car, Anchor, MessageSquare, HelpCircle,
  Image as ImageIcon, List, File, CheckCircle, Sliders,
  PartyPopper, Calendar, Inbox, Briefcase, Globe, Layout
 } from 'lucide-react';
 import { usePathname, useRouter } from 'next/navigation';
 import { useEffect, useState } from 'react';
 import { API_URL } from '@/config';

import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import './cms-common.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [logo, setLogo] = useState('');
  const [siteTitle, setSiteTitle] = useState('Wegomap');
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userProfile = localStorage.getItem('userProfile');
    
    if (!token) {
        router.push('/login');
        return;
    }

    try {
        if (userProfile) {
            const user = JSON.parse(userProfile);
            if (user.role !== 'admin' && user.role !== 'manager') {
                router.push('/login');
                return;
            }
        }
        setAuthorized(true);
    } catch (e) {
        router.push('/login');
    }

    fetchSettings();
  }, [router]);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/options`);
      const json = await res.json();
      if (json.success && json.data) {
        const logoOpt = json.data.find((o: any) => o.key === 'site_logo');
        const titleOpt = json.data.find((o: any) => o.key === 'site_title');
        const favOpt = json.data.find((o: any) => o.key === 'site_favicon');
        
        if (logoOpt) setLogo(logoOpt.value);
        if (titleOpt) setSiteTitle(titleOpt.value);
        if (favOpt && favOpt.value) {
          setFavicon(favOpt.value);
          // Dynamic Favicon Update
          const link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = favOpt.value;
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Blogs': true,
    'Packages': false,
    'Home': true,
    'Landing Page': true,
    'Hotel Landing Page': true,
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

  if (!authorized && pathname !== '/login') {
      return (
          <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
        { label: 'Offer Banners', href: '/admin/offer-banners' },
      ]
    },
    { 
      label: 'Landing Page', 
      href: '/admin/landing-page', 
      icon: Layout,
      subItems: [
        { label: 'All Pages', href: '/admin/landing-page' },
        { label: 'Add New Page', href: '/admin/landing-page/create' },
        { label: 'Testimonials', href: '/admin/testimonials' },
      ]
    },
    { 
      label: 'Hotels', 
      href: '/admin/hotel-landing-page', 
      icon: Layout,
      subItems: [
        { label: 'All Hotel Pages', href: '/admin/hotel-landing-page' },
        { label: 'Add New Page', href: '/admin/hotel-landing-page/create' },
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
        { label: 'Page Intro Settings', href: '/admin/events-settings' },
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
      label: 'Enquiries', 
      href: '/admin/leads', 
      icon: Inbox,
      subItems: [
        { label: 'All Enquiries', href: '/admin/leads' },
        { label: 'All Contact', href: '/admin/contacts' },
      ]
    },
    { label: 'Customers', href: '/admin/customers', icon: Users },
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
    <div className="admin-layout selection:bg-blue-600/20">
      {/* Sidebar */}
      <div className="admin-sidebar shadow-sm">
        
        {/* Branding */}
        <div className="admin-sidebar-header">
          {logo ? (
            <img src={logo} alt={siteTitle} className="h-10 w-auto object-contain mx-auto lg:ml-0" />
          ) : (
            <>
              <div className="admin-logo-icon">{siteTitle.charAt(0)}</div>
              <h2 className="admin-logo-text">{siteTitle}</h2>
            </>
          )}
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
                            key={sub.label}
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
