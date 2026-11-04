import React from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Coffee, 
  BookOpen, 
  Cpu, 
  Bus, 
  Trophy, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const CampusMapModal = ({ isOpen, onClose }) => {
  const { items, navigate } = useApp();

  const getZoneCount = (keyword) => {
    return items.filter(it => it.location.toLowerCase().includes(keyword.toLowerCase())).length;
  };

  const campusHubs = [
    {
      title: 'Central Library',
      keyword: 'Library',
      zone: 'zone-library',
      coords: 'col-span-1 sm:col-span-1',
      icon: BookOpen,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      badgeColor: 'bg-indigo-600',
      desc: '2nd Floor Digital Hall & Reading Pods'
    },
    {
      title: 'CSE & IT Tech Block',
      keyword: 'CSE',
      zone: 'zone-tech',
      coords: 'col-span-1 sm:col-span-1',
      icon: Cpu,
      color: 'bg-sky-50 border-sky-200 text-sky-700',
      badgeColor: 'bg-sky-600',
      desc: 'AI/ML Labs, IoT Center & Server Room'
    },
    {
      title: 'Academic Main Block',
      keyword: 'Academic',
      zone: 'zone-academic',
      coords: 'col-span-1 sm:col-span-1',
      icon: Building2,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      badgeColor: 'bg-blue-600',
      desc: 'Dean Office, Exam Halls & Classrooms'
    },
    {
      title: 'Main Food Court & Canteen',
      keyword: 'Canteen',
      zone: 'zone-food',
      coords: 'col-span-1 sm:col-span-1',
      icon: Coffee,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      badgeColor: 'bg-amber-600',
      desc: 'Dining Tables, Juice Bar & Quad'
    },
    {
      title: 'College Bus Bay & Parking',
      keyword: 'Bus',
      zone: 'zone-transport',
      coords: 'col-span-1 sm:col-span-1',
      icon: Bus,
      color: 'bg-rose-50 border-rose-200 text-rose-700',
      badgeColor: 'bg-rose-600',
      desc: 'Bus Slots 1–40 & Two-Wheeler Bay'
    },
    {
      title: 'Indoor Sports Arena',
      keyword: 'Sports',
      zone: 'zone-sports',
      coords: 'col-span-1 sm:col-span-1',
      icon: Trophy,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      badgeColor: 'bg-emerald-600',
      desc: 'Badminton Courts & Gym Pavilion'
    },
    {
      title: 'Gate 1 Security & Reception',
      keyword: 'Gate',
      zone: 'zone-security',
      coords: 'col-span-1 sm:col-span-2',
      icon: ShieldCheck,
      color: 'bg-slate-100 border-slate-300 text-slate-800',
      badgeColor: 'bg-slate-900',
      desc: 'Official 24/7 Lost Property Locker & Handover Desk'
    }
  ];

  const handleSelectHub = (keyword) => {
    const matchedLoc = items.find(i => i.location.toLowerCase().includes(keyword.toLowerCase()))?.location || 'all';
    navigate('browse', {
      filters: {
        location: matchedLoc
      }
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="RIT Campus Interactive Zone Map"
      subtitle="Click any campus building to inspect lost and found items in that zone"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Visual Map Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-200">Active Campus Radar</p>
              <p className="text-sm font-black">Rajalakshmi Institute of Technology (RIT)</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {items.length} Active Listings
          </span>
        </div>

        {/* Building Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {campusHubs.map((hub) => {
            const count = getZoneCount(hub.keyword);
            const Icon = hub.icon;
            return (
              <div
                key={hub.title}
                onClick={() => handleSelectHub(hub.keyword)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-elevated hover:scale-[1.01] group flex items-start justify-between ${hub.color}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                      {hub.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{hub.desc}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-bold text-brand-600 flex items-center gap-0.5 group-hover:underline">
                        Explore Zone <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full text-white shadow-xs ${hub.badgeColor}`}>
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            Showing real-time campus locations reported today
          </p>
          <button
            onClick={() => {
              navigate('browse');
              onClose();
            }}
            className="font-bold text-brand-600 hover:underline"
          >
            View Full Directory →
          </button>
        </div>
      </div>
    </Modal>
  );
};
