import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  User, 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  LayoutDashboard, 
  FilePlus, 
  CheckCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    currentPage, 
    navigate, 
    notifications, 
    markNotificationRead,
    clearAllNotifications,
    switchUserRole,
    logoutUser 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const userRef = useRef(null);
  const notifRef = useRef(null);

  const unreadNotifs = notifications.filter(n => !n.read);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate('browse', { filters: { query: quickSearch } });
      setQuickSearch('');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Items' },
    { id: 'user-dashboard', label: 'My Dashboard' },
    { id: 'admin-dashboard', label: 'Admin Portal', adminOnly: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-400 flex items-center justify-center shadow-blue-glow group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-extrabold text-xl tracking-tight">F</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute bottom-3 right-3 shadow-sm" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">Find<span className="text-brand-600">It</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200/60 px-1.5 py-0.5 rounded-md">Smart Portal</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">Reuniting Belongings Securely</p>
            </div>
          </div>

          {/* Quick Search in Nav (Desktop) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm relative"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search lost laptop, keys, wallet..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 rounded-xl border border-transparent focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.adminOnly && currentUser?.role !== 'admin') {
                return null;
              }
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive 
                      ? 'text-brand-700 bg-brand-50/80 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2.5">
            {/* Report Actions */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => navigate('report-lost')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-lost-700 bg-lost-50 hover:bg-lost-100 border border-lost-100 transition-all shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5 text-lost-600" />
                Report Lost
              </button>

              <button
                onClick={() => navigate('report-found')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-found-700 bg-found-50 hover:bg-found-100 border border-found-100 transition-all shadow-xs"
              >
                <CheckCircle className="w-3.5 h-3.5 text-found-600" />
                Report Found
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <span className="text-xs bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded-full">
                        {unreadNotifs.length} new
                      </span>
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button 
                        onClick={clearAllNotifications}
                        className="text-[11px] font-semibold text-brand-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-6 text-center text-xs text-slate-400">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 5).map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.itemId) {
                              navigate('item-details', { itemId: notif.itemId });
                              setNotifDropdownOpen(false);
                            }
                          }}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-brand-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        navigate('user-dashboard');
                        setNotifDropdownOpen(false);
                      }}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-800"
                    >
                      View All in Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Toggle */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-100"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] font-semibold text-brand-600 uppercase tracking-wide">
                      {currentUser.role === 'admin' ? 'Safety Officer' : 'Student/Citizen'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden z-50 animate-fade-in">
                    <div className="p-4 bg-gradient-to-r from-brand-50 to-sky-50 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              ★ {currentUser.trustScore || 98}% Trust Score
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      {/* Role switcher badge */}
                      <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                        <p className="text-[11px] font-medium text-slate-500 mb-1">Demo Quick Switcher:</p>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              switchUserRole('user');
                              setUserDropdownOpen(false);
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-colors ${
                              currentUser.role === 'user' 
                                ? 'bg-brand-600 text-white shadow-xs' 
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            User (Alex)
                          </button>
                          <button
                            onClick={() => {
                              switchUserRole('admin');
                              setUserDropdownOpen(false);
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-colors ${
                              currentUser.role === 'admin' 
                                ? 'bg-slate-900 text-white shadow-xs' 
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            Admin (Sarah)
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate('user-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        My Dashboard
                      </button>

                      <button
                        onClick={() => {
                          navigate('admin-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <Shield className="w-4 h-4 text-brand-600" />
                        Admin Safety Portal
                      </button>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logoutUser();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('auth', { authMode: 'login' })}
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-brand-600 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('auth', { authMode: 'register' })}
                  className="px-4 py-2 text-xs font-bold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all shadow-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search items..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none"
            />
          </form>

          {/* Nav links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Report Mobile Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                navigate('report-lost');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-lost-50 text-lost-700 border border-lost-100 flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-lost-600" />
              Report Lost
            </button>

            <button
              onClick={() => {
                navigate('report-found');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-found-50 text-found-700 border border-found-100 flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4 text-found-600" />
              Report Found
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
