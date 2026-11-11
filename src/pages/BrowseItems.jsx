import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/common/ItemCard';
import { CATEGORIES, LOCATIONS } from '../data/mockData';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  MapPin, 
  X, 
  PlusCircle, 
  CheckCircle, 
  Sparkles,
  Award,
  Building2
} from 'lucide-react';

export const BrowseItems = () => {
  const { items, filterState, setFilterState, navigate } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter handlers
  const handleTypeChange = (type) => {
    setFilterState(prev => ({ ...prev, type }));
  };

  const handleCategoryChange = (category) => {
    setFilterState(prev => ({ ...prev, category }));
  };

  const handleLocationChange = (location) => {
    setFilterState(prev => ({ ...prev, location }));
  };

  const handleSortChange = (sortBy) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  };

  const handleRewardToggle = () => {
    setFilterState(prev => ({ ...prev, hasRewardOnly: !prev.hasRewardOnly }));
  };

  const resetFilters = () => {
    setFilterState({
      query: '',
      type: 'all',
      category: 'all',
      location: 'all',
      sortBy: 'newest',
      hasRewardOnly: false,
      viewMode: filterState.viewMode
    });
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Type filter
      if (filterState.type !== 'all' && item.type !== filterState.type) {
        return false;
      }
      // Category filter
      if (filterState.category !== 'all' && item.category !== filterState.category) {
        return false;
      }
      // Location filter
      if (filterState.location !== 'all' && !item.location.toLowerCase().includes(filterState.location.toLowerCase())) {
        return false;
      }
      // Reward filter
      if (filterState.hasRewardOnly && (!item.reward || item.reward <= 0)) {
        return false;
      }
      // Search query filter
      if (filterState.query.trim()) {
        const q = filterState.query.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchBrand = item.brand ? item.brand.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchDesc && !matchLoc && !matchBrand) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'reward') {
        return (b.reward || 0) - (a.reward || 0);
      }
      if (filterState.sortBy === 'urgency') {
        const score = (it) => (it.urgency === 'high' ? 3 : it.urgency === 'normal' ? 2 : 1);
        return score(b) - score(a);
      }
      return new Date(b.date) - new Date(a.date);
    });
  }, [items, filterState]);

  const activeFilterCount = (
    (filterState.type !== 'all' ? 1 : 0) +
    (filterState.category !== 'all' ? 1 : 0) +
    (filterState.location !== 'all' ? 1 : 0) +
    (filterState.hasRewardOnly ? 1 : 0) +
    (filterState.query.trim() ? 1 : 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              RIT Campus Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Browse Lost & Found Belongings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Cross-reference property reported across RIT Academic Blocks, Labs, Library, and Gate 1.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => navigate('report-lost')}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-lost-50 text-lost-700 border border-lost-200/80 hover:bg-lost-100 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-lost-600" />
              Report Lost
            </button>
            <button
              onClick={() => navigate('report-found')}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-found-50 text-found-700 border border-found-200/80 hover:bg-found-100 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-found-600" />
              Report Found
            </button>
          </div>
        </div>

        {/* Search Bar & View Mode Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-6 border-t border-slate-100">
          
          {/* Main search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by item name, Casio model, ID card, brand..."
              value={filterState.query}
              onChange={(e) => setFilterState(prev => ({ ...prev, query: e.target.value }))}
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-brand-500 outline-none"
            />
            {filterState.query && (
              <button
                onClick={() => setFilterState(prev => ({ ...prev, query: '' }))}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Toggle Pills */}
          <div className="md:col-span-3 flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => handleTypeChange('all')}
              className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
                filterState.type === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTypeChange('lost')}
              className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
                filterState.type === 'lost' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Lost
            </button>
            <button
              onClick={() => handleTypeChange('found')}
              className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
                filterState.type === 'found' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Found
            </button>
          </div>

          {/* Sort By & View Toggles */}
          <div className="md:col-span-3 flex items-center justify-between gap-2">
            <select
              value={filterState.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none text-slate-700 font-semibold"
            >
              <option value="newest">Sort: Most Recent</option>
              <option value="reward">Sort: Cash Reward</option>
              <option value="urgency">Sort: High Urgency</option>
            </select>

            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'grid' }))}
                className={`p-1.5 rounded-lg transition-colors ${
                  filterState.viewMode === 'grid' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-400'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFilterState(prev => ({ ...prev, viewMode: 'list' }))}
                className={`p-1.5 rounded-lg transition-colors ${
                  filterState.viewMode === 'list' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-400'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {filterState.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold">
                Type: {filterState.type}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleTypeChange('all')} />
              </span>
            )}
            {filterState.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold">
                Category: {filterState.category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange('all')} />
              </span>
            )}
            {filterState.location !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold">
                Location: {filterState.location}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleLocationChange('all')} />
              </span>
            )}
            {filterState.hasRewardOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold">
                Reward Only
                <X className="w-3 h-3 cursor-pointer" onClick={handleRewardToggle} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-brand-600 hover:text-brand-800 font-bold ml-2 text-xs"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-soft space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-black text-slate-900">Campus Filters</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Reward toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs font-black text-amber-950">Cash Reward</p>
                  <p className="text-[10px] text-amber-700">Show only items with cash rewards</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={filterState.hasRewardOnly}
                onChange={handleRewardToggle}
                className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                Category
              </label>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = filterState.category === cat.id;
                  const count = cat.id === 'all' 
                    ? items.length 
                    : items.filter(i => i.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected 
                          ? 'bg-brand-600 text-white shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIT Campus Locations */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                RIT Campus Zone
              </label>
              <select
                value={filterState.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none text-slate-700 font-semibold"
              >
                <option value="all">All RIT Campus Locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

          </div>
        </aside>

        {/* Items Listing Area */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900 font-black">{filteredItems.length}</strong> items logged across RIT
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-800">No Matching Belongings Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                No reports match your selected criteria. Try selecting "All RIT Campus Locations" or submit a new report.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => navigate('report-lost')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                >
                  Report Lost Property
                </button>
              </div>
            </div>
          ) : (
            <div className={
              filterState.viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
            }>
              {filteredItems.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  viewMode={filterState.viewMode} 
                />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};
