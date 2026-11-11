import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PLATFORM_STATS, INITIAL_USERS } from '../data/mockData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Check, 
  RefreshCw,
  ExternalLink,
  GraduationCap,
  Building2
} from 'lucide-react';

export const AdminDashboard = () => {
  const { items, claims, updateItemStatus, deleteItem, updateClaimStatus, navigate, showToast } = useApp();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState('moderation');

  const filteredItems = items.filter(it => {
    if (filterType !== 'all' && it.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return it.title.toLowerCase().includes(q) || it.reportedBy.name.toLowerCase().includes(q) || it.location.toLowerCase().includes(q);
    }
    return true;
  });

  const highMatchItems = items.filter(it => it.matches && it.matches.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              RIT Campus Security Command • Gate 1 Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Safety Officer & Property Administration Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Inspector S. Ramanathan — Managing lost & found property across RIT Academic Blocks, Laboratories, Library, and Student Hostels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Campus records synchronized', 'info')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync RIT DB
            </button>
            <button
              onClick={() => navigate('report-found')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Log Gate 1 Property
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-left">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400">Total RIT Reports</p>
            <p className="text-2xl font-black text-white mt-1">{items.length + 940}</p>
            <p className="text-[10px] text-emerald-400 mt-1 font-bold">↑ +8 today across labs</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400">Active Lost Items</p>
            <p className="text-2xl font-black text-amber-400 mt-1">
              {items.filter(i => i.type === 'lost' && i.status === 'active').length}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Inquiries pending</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400">In Gate 1 Lockers</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              {items.filter(i => i.type === 'found' && i.status === 'active').length}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Safe campus custody</p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400">Claims to Adjudicate</p>
            <p className="text-2xl font-black text-brand-400 mt-1">
              {claims.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-[10px] text-amber-300 mt-1 font-bold">Requires question verification</p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'moderation', label: `Moderation Queue (${items.length})` },
          { id: 'matches', label: `AI Match Hub (${highMatchItems.length})` },
          { id: 'users', label: 'RIT Student Accounts' },
          { id: 'analytics', label: 'Campus Zone Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
              activeAdminTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Moderation Queue */}
      {activeAdminTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden space-y-4">
          
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search items, roll nos, RIT zones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none text-slate-700 font-bold"
              >
                <option value="all">All Item Types</option>
                <option value="lost">Lost Reports</option>
                <option value="found">Found Property</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Item</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reported By</th>
                  <th className="py-3 px-4">RIT Zone</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 max-w-[200px] truncate">{item.title}</p>
                          <span className="text-[10px] text-slate-400">ID: #{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        item.type === 'lost' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-semibold">{item.category}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {item.reportedBy.name}
                      {item.reportedBy.rollNo && (
                        <span className="block text-[10px] text-slate-400">{item.reportedBy.rollNo}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-[160px] truncate font-semibold text-slate-700">{item.location}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black capitalize ${
                        item.status === 'resolved' 
                          ? 'bg-blue-100 text-blue-800' 
                          : item.status === 'flagged'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigate('item-details', { itemId: item.id })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status !== 'resolved' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'resolved')}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                            title="Verify Handover"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                          title="Remove Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 2: AI Match Hub */}
      {activeAdminTab === 'matches' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft">
            <h3 className="text-base font-black text-slate-900 mb-1">RIT AI Smart Match Correlated Cases</h3>
            <p className="text-xs text-slate-500 mb-6">
              Automatically paired reports based on item categories, location radius, and timestamp proximity.
            </p>

            <div className="space-y-4">
              {highMatchItems.map(item => {
                const matchedTarget = items.find(i => i.id === item.matches[0].matchedItemId);
                return (
                  <div 
                    key={item.id}
                    className="p-5 rounded-2xl border border-brand-200 bg-brand-50/30 flex flex-col lg:flex-row items-center justify-between gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-3/4">
                      {/* Item A */}
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                            item.type === 'lost' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.type}
                          </span>
                          <p className="text-xs font-black text-slate-900 truncate mt-1">{item.title}</p>
                          <p className="text-[10px] text-slate-500 truncate">{item.location}</p>
                        </div>
                      </div>

                      {/* Item B */}
                      {matchedTarget && (
                        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                          <img src={matchedTarget.image} alt={matchedTarget.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                              matchedTarget.type === 'lost' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {matchedTarget.type}
                            </span>
                            <p className="text-xs font-black text-slate-900 truncate mt-1">{matchedTarget.title}</p>
                            <p className="text-[10px] text-slate-500 truncate">{matchedTarget.location}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                      <div className="text-center">
                        <span className="text-xl font-black text-brand-600 block">
                          {item.matches[0].score}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Confidence</span>
                      </div>

                      <button
                        onClick={() => navigate('item-details', { itemId: item.id })}
                        className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-black shadow-sm"
                      >
                        Inspect Match Case
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">RIT Registered Community Directory</h3>
            <p className="text-xs text-slate-500">Track student trust scores, verified roll numbers, and active reports.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {INITIAL_USERS.map(u => (
              <div key={u.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-slate-900">{u.name}</h4>
                      {u.rollNo && (
                        <span className="text-[10px] font-black bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                          {u.rollNo}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{u.email} • {u.department}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {u.trustScore}% Trust Score
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {u.itemsReported} reports • {u.itemsResolved} reunited
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase">
                    {u.role}
                  </span>
                  <button
                    onClick={() => showToast(`Student ${u.name} status verified`, 'success')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    View Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Analytics */}
      {activeAdminTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
            <h3 className="text-base font-black text-slate-900">RIT Category Breakdown</h3>
            <div className="space-y-3">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                const count = items.filter(i => i.category === cat.id).length;
                const percentage = Math.round((count / items.length) * 100) || 4;
                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 font-bold">{cat.name}</span>
                      <span className="text-slate-400">{count} items ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-600 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
            <h3 className="text-base font-black text-slate-900">Campus Recovery Metrics</h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <p className="font-bold text-slate-800">Average Turnaround: 6.5 Hours</p>
              <p className="text-slate-500 leading-relaxed font-normal">
                Calculators and student ID cards logged in Academic Blocks have the quickest reunion turnaround, with 94% collected within 8 hours from Gate 1 Security.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2 text-xs text-emerald-900">
              <p className="font-bold">Zero Fraud Handover Guarantee</p>
              <p className="text-emerald-700 leading-relaxed font-normal">
                The mandatory verification question protocol has successfully prevented mistaken identity handovers this academic semester.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
