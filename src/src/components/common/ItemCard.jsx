import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Calendar, 
  Sparkles, 
  Bookmark, 
  ArrowRight, 
  Award,
  Clock,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const ItemCard = ({ item, viewMode = 'grid' }) => {
  const { navigate, savedItemIds, toggleSaveItem } = useApp();
  const isSaved = savedItemIds.includes(item.id);

  const isLost = item.type === 'lost';
  const hasReward = item.reward && item.reward > 0;
  const hasMatch = item.matches && item.matches.length > 0;

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => navigate('item-details', { itemId: item.id })}
        className="group bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:border-brand-400 hover:shadow-elevated transition-all duration-200 cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
      >
        <div className="flex gap-4 items-center w-full sm:w-auto">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
              isLost ? 'bg-amber-500 text-white shadow-sm' : 'bg-emerald-600 text-white shadow-sm'
            }`}>
              {item.type}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-md">
                {item.category}
              </span>
              {hasReward && (
                <span className="inline-flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  <Award className="w-3.5 h-3.5 text-amber-600" /> ₹{item.reward} Reward
                </span>
              )}
              {hasMatch && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> AI Matched
                </span>
              )}
            </div>

            <h3 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate">
              {item.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {item.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                {item.location}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveItem(item.id);
            }}
            className={`p-2.5 rounded-xl border transition-colors ${
              isSaved 
                ? 'bg-brand-50 border-brand-200 text-brand-600' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
          </button>

          <button 
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => navigate('item-details', { itemId: item.id })}
      className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden card-hover transition-all duration-300 cursor-pointer flex flex-col h-full hover:border-brand-300"
    >
      {/* Image container */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Type Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md ${
            isLost 
              ? 'bg-amber-500 text-white' 
              : 'bg-emerald-600 text-white'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {item.type} Property
          </span>
        </div>

        {/* Bookmark & AI Match */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          {hasMatch && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-indigo-600 text-white shadow-md">
              <Sparkles className="w-3 h-3 text-amber-300" /> {item.matches[0].score}% Match
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveItem(item.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isSaved 
                ? 'bg-white text-brand-600 shadow' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-brand-600 text-brand-600' : ''}`} />
          </button>
        </div>

        {/* Reward pill over image */}
        {hasReward && (
          <div className="absolute bottom-3.5 left-3.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-amber-500 text-white shadow-md">
              <Award className="w-3.5 h-3.5" /> ₹{item.reward} Reward
            </span>
          </div>
        )}

        {/* Category tag bottom right */}
        <div className="absolute bottom-3.5 right-3.5">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="inline-flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {item.date}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" />
              {item.time || '12:00'}
            </span>
          </div>

          <h3 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1.5">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1.5 text-slate-700 truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="truncate font-semibold">{item.location}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-brand-600 font-bold group-hover:translate-x-0.5 transition-transform">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
