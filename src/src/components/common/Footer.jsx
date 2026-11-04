import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAFE_HANDOVER_STATIONS } from '../../data/mockData';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';

export const Footer = () => {
  const { navigate, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast('Subscribed to RIT Campus Lost & Found Digest!', 'success');
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white font-black text-xl shadow-md">
                R
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                FindIt <span className="text-brand-400">@ RIT</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The official smart lost and found portal for <strong>Rajalakshmi Institute of Technology (RIT)</strong>. Connecting students, faculty, and campus security to recover misplaced property across campus zones.
            </p>

            {/* Trust badge */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RIT Security Gate 1 Monitored</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Anti-Fraud Verification</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Portal Shortcuts</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
                  Campus Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('browse')} className="hover:text-white transition-colors">
                  Browse Campus Items
                </button>
              </li>
              <li>
                <button onClick={() => navigate('report-lost')} className="hover:text-amber-400 transition-colors">
                  Report Lost Property
                </button>
              </li>
              <li>
                <button onClick={() => navigate('report-found')} className="hover:text-emerald-400 transition-colors">
                  Turn in Found Item
                </button>
              </li>
              <li>
                <button onClick={() => navigate('user-dashboard')} className="hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Official RIT Campus Helpdesks */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Official Safe Desks</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>RIT Campus, Kuthambakkam, Chennai, Tamil Nadu 600124</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-semibold text-slate-300">+91 (044) 2715-6750 (Gate 1)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>lostfound@rit-campus.ac.in</span>
              </li>
            </ul>
          </div>

          {/* Campus Alerts Digest */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3">Campus Alert Digest</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get pinged when high-value items (RIT IDs, calculators, keys) are handed into security.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="rollno@rit-campus.ac.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                Join Campus Alerts <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FindIt @ RIT Campus. Rajalakshmi Institute of Technology. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Security Guidelines</span>
            <span className="hover:text-slate-400 cursor-pointer">Anti-Fraud Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Gate 1 Desk Timings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
