import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/common/ItemCard';
import { CATEGORIES, HOW_IT_WORKS, PLATFORM_STATS } from '../data/mockData';
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
  Users
} from 'lucide-react';

const categoryIcons = {
  Layers: Layers,
  Laptop: Laptop,
  Wallet: Wallet,
  Key: Key,
  Briefcase: Briefcase,
  FileText: FileText,
  Watch: Watch,
  Glasses: Glasses,
  Heart: Heart,
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

  // Filter items for recent section
  const recentItems = items.filter(item => {
    if (activeTab === 'lost') return item.type === 'lost';
    if (activeTab === 'found') return item.type === 'found';
    return true;
  }).slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden hero-pattern pt-12 pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* AI pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider shadow-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Smart AI-Assisted Matching Algorithm</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Lose Something? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600">
                Let’s Reconnect You Fast.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              FindIt is the official community lost-and-found portal. Cross-referencing lost reports with found property logs to reunite items safely, quickly, and securely.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('report-lost')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-lost-600 to-amber-600 hover:from-lost-700 hover:to-amber-700 text-white shadow-elevated hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                Report a Lost Item
              </button>

              <button
                onClick={() => navigate('report-found')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-elevated hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <CheckCircle className="w-4 h-4" />
                I Found an Item
              </button>

              <button
                onClick={() => navigate('browse')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-soft transition-all flex items-center gap-2"
              >
                Browse All Reports
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Unified Smart Search Card */}
          <div className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-elevated border border-slate-200/90">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Keyword query */}
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="What item are you looking for?"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                />
              </div>

              {/* Category selector */}
              <div className="sm:col-span-3">
                <select
                  value={heroCategory}
                  onChange={(e) => setHeroCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-slate-700 transition-all cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Location input */}
              <div className="sm:col-span-2 relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Location / Zone"
                  value={heroLocation}
                  onChange={(e) => setHeroLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                />
              </div>

              {/* Search button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Impact Stats Counter Bar */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-blue-50 text-brand-600 mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{PLATFORM_STATS.totalReported}+</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Total Items Reported</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{PLATFORM_STATS.reunitedTotal}+</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Safely Reunited</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-amber-50 text-amber-600 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{PLATFORM_STATS.successRate}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Community Recovery Rate</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{PLATFORM_STATS.avgReunionHours}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Average Turnaround Time</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Recent Lost & Found Reports */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
              <Clock className="w-3.5 h-3.5" /> Live Feed
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recently Reported Items
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Check if an item you lost was recently logged or help spot an owner.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'lost' 
                  ? 'bg-amber-500 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

        {/* Browse more link */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('browse')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-brand-600 transition-colors shadow-sm"
          >
            Explore All Items ({items.length}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. How FindIt Works (Visual Process Pipeline) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/60 px-3 py-1 rounded-full">
              Seamless Workflow
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              How FindIt Smart Portal Works
            </h2>
            <p className="text-sm text-slate-600">
              A secure, verified four-step architecture designed to stop fraudulent claims and reunite owners with peace of mind.
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
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-brand-600">
                  Step {idx + 1} of 4
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select a category to filter through all reported belongings.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
            const Icon = categoryIcons[cat.icon] || HelpCircle;
            const count = items.filter(i => i.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => navigate('browse', { filters: { category: cat.id } })}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-brand-500 hover:shadow-elevated transition-all cursor-pointer group text-center flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-brand-50 text-slate-600 group-hover:text-brand-600 transition-colors flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                    {count} active reports
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Safe Handover Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Certified Safe Exchange Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Safety First: Never Meet Unverified Strangers Alone.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use our certified Campus Safety desks or designated municipal security booths for item handovers. FindIt provides verifiable handoff receipts and verification codes for both parties.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('browse')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Learn Safety Guidelines
              </button>
              <button
                onClick={() => navigate('report-found')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
              >
                Drop Off Found Property
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
