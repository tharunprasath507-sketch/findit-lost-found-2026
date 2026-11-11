import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/common/ItemCard';
import { CATEGORIES, HOW_IT_WORKS, PLATFORM_STATS, RIT_CAMPUS_ZONES, SAFE_HANDOVER_STATIONS } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Layers,
  Laptop,
  Wallet,
  Key,
  Briefcase,
  FileText,
  Watch,
  Glasses,
  Heart,
  HelpCircle,
  TrendingUp,
  Clock,
  Users,
  Building2,
  Cpu,
  BookOpen,
  Coffee,
  Bus,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Calculator,
  Headphones
} from 'lucide-react';

const categoryIcons = {
  Layers: Layers,
  Laptop: Laptop,
  FileText: FileText,
  Calculator: Calculator,
  Key: Key,
  Headphones: Headphones,
  Wallet: Wallet,
  Briefcase: Briefcase,
  Watch: Watch,
  HelpCircle: HelpCircle
};

export const Home = () => {
  const { items, navigate } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [heroCategory, setHeroCategory] = useState('all');
  const [heroLocation, setHeroLocation] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'lost' | 'found'

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate('browse', {
      filters: {
        query: heroSearch,
        category: heroCategory,
        location: heroLocation || 'all'
      }
    });
  };

  const handleQuickKeyword = (keyword) => {
    navigate('browse', {
      filters: {
        query: keyword
      }
    });
  };

  const handleZoneClick = (locationName) => {
    navigate('browse', {
      filters: {
        location: locationName
      }
    });
  };

  // Filter items for recent section
  const recentItems = items.filter(item => {
    if (activeTab === 'lost') return item.type === 'lost';
    if (activeTab === 'found') return item.type === 'found';
    return true;
  }).slice(0, 6);

  // Suggested keywords for RIT students
  const campusSuggestions = [
    'Casio Calculator',
    'RIT ID Card',
    'Bike Key',
    'Boat Earbuds',
    'Lab Record',
    'Laptop Charger'
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. RIT Campus Hero Section */}
      <section className="relative overflow-hidden hero-pattern pt-12 pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Campus badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-black uppercase tracking-wider shadow-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Official RIT Campus Lost & Found System</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Lost Something at <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600">
                RIT Campus?
              </span> We’ll Find It.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Connecting students across the <strong>Central Library, CSE Labs, Food Court, Bus Bay, and Gate 1 Security</strong> with instant AI match verification.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('report-lost')}
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-lost-600 to-amber-600 hover:from-lost-700 hover:to-amber-700 text-white shadow-elevated hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                Report Lost Item
              </button>

              <button
                onClick={() => navigate('report-found')}
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-elevated hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <CheckCircle className="w-4 h-4" />
                Turn In Found Property
              </button>

              <button
                onClick={() => navigate('browse')}
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-soft transition-all flex items-center gap-2"
              >
                Browse Campus Items
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Keyword Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Frequently Lost:</span>
              {campusSuggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickKeyword(item)}
                  className="px-3 py-1 rounded-full bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-600 hover:text-brand-700 font-semibold transition-all shadow-2xs text-[11px]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Campus Search Card */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-elevated border border-slate-200/90">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Casio fx-991, RIT ID card, Dell charger..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={heroCategory}
                  onChange={(e) => setHeroCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 outline-none text-slate-700 cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Campus Zone"
                  value={heroLocation}
                  onChange={(e) => setHeroLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 outline-none text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* RIT Campus Hotspots Live Ticker */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                Popular RIT Campus Hotspots (Click to view items)
              </span>
              <button 
                onClick={() => navigate('browse')}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                View all zones →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'Central Library', query: 'Central Library', count: 2, icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
                { name: 'CSE & IT Labs', query: 'CSE', count: 2, icon: Cpu, color: 'text-sky-600 bg-sky-50' },
                { name: 'Food Court', query: 'Food Court', count: 2, icon: Coffee, color: 'text-amber-600 bg-amber-50' },
                { name: 'College Bus Bay', query: 'Bus Bay', count: 1, icon: Bus, color: 'text-rose-600 bg-rose-50' },
                { name: 'Gate 1 Security', query: 'Gate 1', count: 1, icon: ShieldCheck, color: 'text-slate-700 bg-slate-100' }
              ].map((spot) => {
                const Icon = spot.icon;
                return (
                  <div
                    key={spot.name}
                    onClick={() => handleZoneClick(spot.query)}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400 hover:shadow-soft transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${spot.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                          {spot.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">{spot.count} reported</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Stats Counter Bar */}
          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-blue-50 text-brand-600 mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{PLATFORM_STATS.totalReported}+</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Total RIT Reports</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600">{PLATFORM_STATS.reunitedTotal}+</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Safely Returned to Students</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-amber-50 text-amber-600 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{PLATFORM_STATS.successRate}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Campus Recovery Rate</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{PLATFORM_STATS.avgReunionHours}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Average Turnaround Time</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Live Campus Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
              <Clock className="w-3.5 h-3.5" /> Live RIT Property Log
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recently Reported Belongings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Check if an item lost in classrooms or canteens has been turned in today.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'lost' 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'found' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Found Property
            </button>
          </div>
        </div>

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('browse')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-brand-600 transition-colors shadow-sm"
          >
            Explore All Campus Reports ({items.length}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Live AI Match Radar Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Live Campus AI Match Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                How Our Algorithm Linked Tharun's Calculator in Minutes.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When Tharun logged a lost Casio fx-991CW in Academic Block Exam Hall 204, FindIt automatically matched it against property submitted to Security Desk Gate 1 based on timestamp and serial tags.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigate('item-details', { itemId: 'rit-101' })}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center gap-1.5 shadow-md"
                >
                  Inspect Match Case <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Match Comparison Box */}
            <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-slate-300">Match Correlation</span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  96% Confidence
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Category:</span>
                  <span className="font-bold text-white">Calculators & Stationary ✓</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Location Vicinity:</span>
                  <span className="font-bold text-white">Academic Block 204 ✓</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Time Gap:</span>
                  <span className="font-bold text-white">45 minutes ✓</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Handover held safely at Gate 1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How FindIt Works (4-Step Student Workflow) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-100/60 px-3 py-1 rounded-full">
              RIT Student Guide
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              4 Steps to Recover Belongings on Campus
            </h2>
            <p className="text-sm text-slate-600">
              Designed specifically for college students to ensure items are quickly returned and never misappropriated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {HOW_IT_WORKS.map((step, idx) => (
              <div 
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft relative flex flex-col justify-between hover:border-brand-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {step.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-sm`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-bold text-brand-600">
                  Phase {idx + 1} of 4
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Safe Handover Points Across RIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Campus Drop Stations
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Official RIT Safe Handover Points
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Never meet strangers in unlit zones. Use these official college desks for secure exchanges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAFE_HANDOVER_STATIONS.map((st) => (
            <div key={st.name} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{st.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{st.landmark}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                <p className="font-semibold text-slate-700">🕒 {st.timing}</p>
                <p className="font-semibold text-brand-600">📞 {st.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
