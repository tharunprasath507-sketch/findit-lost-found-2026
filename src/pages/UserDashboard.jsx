import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/common/ItemCard';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  Bell, 
  PlusCircle, 
  FileText, 
  Trash2, 
  Eye, 
  Check, 
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const UserDashboard = () => {
  const { 
    currentUser, 
    items, 
    claims, 
    notifications, 
    savedItemIds, 
    navigate, 
    updateItemStatus, 
    deleteItem, 
    updateClaimStatus, 
    switchUserRole,
    clearAllNotifications 
  } = useApp();

  const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'found' | 'claims' | 'saved' | 'notifs'

  const user = currentUser || {
    id: 'user-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'user',
    trustScore: 98,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    department: 'Computer Science Dept.'
  };

  const myLostItems = items.filter(i => i.type === 'lost' && i.reportedBy?.id === user.id);
  const myFoundItems = items.filter(i => i.type === 'found' && i.reportedBy?.id === user.id);
  const mySavedItems = items.filter(i => savedItemIds.includes(i.id));

  // Claims where user is the claimant or user is the reporter
  const myClaims = claims.filter(c => c.claimedBy.id === user.id || items.find(it => it.id === c.itemId)?.reportedBy.id === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-elevated">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-brand-100 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-white ring-2 ring-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {user.role === 'admin' ? 'Campus Safety Admin' : 'Verified Member'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email} • {user.department || 'General Community'}</p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> {user.trustScore}% Trust Score
                </span>
                <span className="text-xs text-slate-400">• Joined {user.joinedDate || '2025'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate('report-lost')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-lost-50 text-lost-700 border border-lost-100 hover:bg-lost-100 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-lost-600" />
              Report Lost
            </button>
            <button
              onClick={() => navigate('report-found')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-found-50 text-found-700 border border-found-100 hover:bg-found-100 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-found-600" />
              Report Found
            </button>
            <button
              onClick={() => switchUserRole(user.role === 'admin' ? 'user' : 'admin')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-brand-600 transition-colors"
            >
              {user.role === 'admin' ? 'Switch to User View' : 'Demo: Switch to Admin View'}
            </button>
          </div>

        </div>

        {/* Dashboard Stat Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-extrabold text-slate-900">{myLostItems.length}</p>
            <p className="text-[11px] font-medium text-slate-500">My Lost Reports</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-extrabold text-slate-900">{myFoundItems.length}</p>
            <p className="text-[11px] font-medium text-slate-500">Items Turned In</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-extrabold text-emerald-600">{myClaims.length}</p>
            <p className="text-[11px] font-medium text-slate-500">Active Claims</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xl font-extrabold text-brand-600">{mySavedItems.length}</p>
            <p className="text-[11px] font-medium text-slate-500">Bookmarked Items</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'lost', label: `My Lost Reports (${myLostItems.length})` },
          { id: 'found', label: `My Found Property (${myFoundItems.length})` },
          { id: 'claims', label: `Claims & Verification (${myClaims.length})` },
          { id: 'saved', label: `Saved Items (${mySavedItems.length})` },
          { id: 'notifs', label: `Notifications (${notifications.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: My Lost Items */}
      {activeTab === 'lost' && (
        <div className="space-y-4">
          {myLostItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-sm text-slate-500">You haven't reported any lost items yet.</p>
              <button
                onClick={() => navigate('report-lost')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white"
              >
                Report a Lost Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myLostItems.map(item => (
                <div key={item.id} className="relative group">
                  <ItemCard item={item} />
                  <div className="mt-2 flex items-center justify-between px-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      Status: <span className="text-amber-600 capitalize">{item.status}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {item.status !== 'resolved' && (
                        <button
                          onClick={() => updateItemStatus(item.id, 'resolved')}
                          className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Mark Found
                        </button>
                      )}
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Found Items */}
      {activeTab === 'found' && (
        <div className="space-y-4">
          {myFoundItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-sm text-slate-500">You haven't logged any found property yet.</p>
              <button
                onClick={() => navigate('report-found')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
              >
                Report a Found Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myFoundItems.map(item => (
                <div key={item.id} className="relative group">
                  <ItemCard item={item} />
                  <div className="mt-2 flex items-center justify-between px-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      Custody: <span className="text-emerald-700 truncate max-w-[150px] inline-block align-bottom">{item.safeCustodyLocation}</span>
                    </span>
                    <button
                      onClick={() => updateItemStatus(item.id, 'resolved')}
                      className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Reunited
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Claims & Verification */}
      {activeTab === 'claims' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Claims & Verification Queue</h3>
              <p className="text-xs text-slate-500">Review answers to verification questions and approve rightful owner handovers.</p>
            </div>
          </div>

          {myClaims.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No active claims or verification inquiries.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {myClaims.map((claim) => (
                <div key={claim.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                          Claim #{claim.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{claim.itemTitle}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Claimed by: <strong>{claim.claimedBy.name}</strong> ({claim.claimedBy.email}) on {claim.dateSubmitted}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize self-start sm:self-auto ${
                      claim.status === 'approved' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : claim.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/70 space-y-2 text-xs">
                    <p className="font-bold text-slate-700">Claimant's Verification Answer:</p>
                    <p className="text-slate-800 italic bg-white p-3 rounded-xl border border-slate-200">
                      "{claim.verificationAnswer}"
                    </p>
                    {claim.proofDescription && (
                      <p className="text-slate-600 text-[11px] pt-1">
                        <strong>Supporting Proof:</strong> {claim.proofDescription}
                      </p>
                    )}
                  </div>

                  {claim.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => updateClaimStatus(claim.id, 'rejected')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject Claim
                      </button>
                      <button
                        onClick={() => updateClaimStatus(claim.id, 'approved')}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve & Confirm Handover
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Saved Items */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {mySavedItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-sm text-slate-500">
              No saved items yet. Bookmark items in the browse section to keep an eye on them.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mySavedItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Notifications */}
      {activeTab === 'notifs' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Notifications & Alerts</h3>
            <button
              onClick={clearAllNotifications}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => notif.itemId && navigate('item-details', { itemId: notif.itemId })}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  !notif.read ? 'bg-brand-50/50 border-brand-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl text-white shrink-0 mt-0.5 ${
                    notif.type === 'match' ? 'bg-indigo-600' : notif.type === 'claim' ? 'bg-amber-500' : 'bg-emerald-600'
                  }`}>
                    {notif.type === 'match' ? <Sparkles className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                  </div>
                </div>

                {notif.itemId && (
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
