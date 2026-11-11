import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Printer, 
  ShieldCheck, 
  ArrowLeft, 
  Award, 
  Send, 
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Building2,
  GraduationCap
} from 'lucide-react';

export const ItemDetails = () => {
  const { 
    items, 
    selectedItemId, 
    navigate, 
    savedItemIds, 
    toggleSaveItem, 
    submitClaim, 
    showToast 
  } = useApp();

  const item = items.find(i => i.id === selectedItemId) || items[0];

  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  const [verificationAnswer, setVerificationAnswer] = useState('');
  const [proofDescription, setProofDescription] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 font-bold">Item report not found.</p>
        <button 
          onClick={() => navigate('browse')}
          className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const isLost = item.type === 'lost';
  const isSaved = savedItemIds.includes(item.id);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!verificationAnswer.trim()) {
      showToast('Please provide an answer to the verification question', 'error');
      return;
    }
    submitClaim({
      itemId: item.id,
      verificationAnswer,
      proofDescription
    });
    setClaimModalOpen(false);
    setVerificationAnswer('');
    setProofDescription('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) {
      showToast('Please enter your message', 'error');
      return;
    }
    showToast(`Inquiry sent to ${item.reportedBy.name}!`, 'success');
    setContactModalOpen(false);
    setContactMessage('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Report URL copied to clipboard!', 'success');
    } else {
      showToast('Ready to share!', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top back button & breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('browse')}
          className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Campus Directory
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs"
            title="Share report"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={() => setPosterModalOpen(true)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs"
            title="Print Campus Notice"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Notice Poster</span>
          </button>

          <button
            onClick={() => toggleSaveItem(item.id)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs ${
              isSaved
                ? 'bg-brand-50 border-brand-200 text-brand-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Media & Custody Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-elevated">
            <div className="relative h-80 sm:h-96 w-full bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md ${
                isLost ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {item.type} Property
              </span>

              {item.reward && item.reward > 0 && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-white shadow-lg">
                    <Award className="w-4 h-4" /> ₹{item.reward} Recovery Reward
                  </span>
                </div>
              )}
            </div>

            {/* Quick metadata strip */}
            <div className="p-5 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs bg-slate-50/50">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                <span className="font-black text-slate-800 capitalize">{item.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Brand / Maker</span>
                <span className="font-black text-slate-800">{item.brand || 'Unbranded'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Color</span>
                <span className="font-black text-slate-800">{item.color || 'Standard'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Serial / Label</span>
                <span className="font-black text-slate-800 font-mono">{item.serialMasked || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Reporter & Handover Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {isLost ? 'Reported By RIT Student' : 'Finder / Security Custodian'}
            </h4>
            
            <div className="flex items-center gap-3.5">
              <img
                src={item.reportedBy.avatar}
                alt={item.reportedBy.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-black text-slate-900">{item.reportedBy.name}</p>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">
                  {item.reportedBy.rollNo ? `Roll No: ${item.reportedBy.rollNo}` : 'RIT Security Staff'}
                </p>
              </div>
            </div>

            {item.safeCustodyLocation && (
              <div className="p-3.5 bg-brand-50/90 rounded-2xl border border-brand-200/80 text-xs">
                <p className="font-black text-brand-900 flex items-center gap-1.5 mb-1">
                  <Building2 className="w-4 h-4 text-brand-600" /> Safe Custody Drop Point:
                </p>
                <p className="text-brand-800 font-medium">{item.safeCustodyLocation}</p>
                <p className="text-[11px] text-brand-600 font-bold mt-1">Open for verification during college working hours</p>
              </div>
            )}

            <button
              onClick={() => setContactModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Contact via Campus Messaging
            </button>
          </div>
        </div>

        {/* Right Col: Details, AI Match & Claiming */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-elevated space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  Report #{item.id}
                </span>
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                  Active Listing
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {item.title}
              </h1>
            </div>

            {/* Loss / Discovery Details Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">RIT Campus Zone</span>
                  <span className="font-black text-slate-800">{item.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Date & Period</span>
                  <span className="font-black text-slate-800">{item.date} at {item.time || '12:00'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Full Campus Report Details
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                {item.description}
              </p>
            </div>

            {/* Verification question preview */}
            {item.verificationQuestion && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Anti-Fraud Verification Question:
                </div>
                <p className="text-xs text-amber-800 italic font-semibold">
                  "{item.verificationQuestion}"
                </p>
                <p className="text-[11px] text-amber-700">
                  Only the genuine student owner can answer this to claim the item.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              {item.type === 'found' ? (
                <button
                  onClick={() => setClaimModalOpen(true)}
                  className="w-full sm:flex-1 py-3 px-6 rounded-2xl text-xs sm:text-sm font-black bg-brand-600 hover:bg-brand-700 text-white shadow-elevated transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  This is Mine — Claim Ownership
                </button>
              ) : (
                <button
                  onClick={() => navigate('report-found')}
                  className="w-full sm:flex-1 py-3 px-6 rounded-2xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-elevated transition-all flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  I Found This on Campus
                </button>
              )}

              <button
                onClick={() => setContactModalOpen(true)}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                Direct Inquiry
              </button>
            </div>
          </div>

          {/* AI Smart Match Correlation Hub */}
          {item.matches && item.matches.length > 0 && (
            <div className="bg-gradient-to-tr from-brand-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-7 shadow-elevated space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-amber-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black">AI Campus Match Radar</h3>
                    <p className="text-xs text-brand-200">High probability correlation detected</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-sm">
                  {item.matches[0].score}% Match
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {item.matches[0].reason}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => navigate('item-details', { itemId: item.matches[0].matchedItemId })}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-white text-brand-900 hover:bg-brand-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    View Correlated Item ({item.matches[0].matchedItemId}) <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Safe Handover Rules */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              RIT Campus Handover Security Protocol
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
              <li>Meet at <strong>Main Security Gate 1</strong> or the <strong>Central Library Counter</strong>.</li>
              <li>Present your RIT Student Smart ID Card to the security officer on duty.</li>
              <li>Do not send advance cash transfers for item retrieval.</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Claim Modal */}
      <Modal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        title="Submit RIT Item Ownership Claim"
        subtitle={`Verifying claim for "${item.title}"`}
      >
        <form onSubmit={handleClaimSubmit} className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <strong>Security Rule:</strong> The reporter or Security Desk has set a verification question to confirm you are the true owner.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Verification Question:
            </label>
            <p className="text-xs text-slate-600 p-2.5 bg-slate-100 rounded-xl italic mb-2 font-medium">
              "{item.verificationQuestion || 'Please describe stickers, scratches, or unique identifying tags.'}"
            </p>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Answer <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide exact details only the true owner would know..."
              value={verificationAnswer}
              onChange={(e) => setVerificationAnswer(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Student ID / Bill / Serial Proof
            </label>
            <textarea
              rows={2}
              placeholder="e.g. My student ID matches 22CS104, or bill from college store..."
              value={proofDescription}
              onChange={(e) => setProofDescription(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setClaimModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md"
            >
              Submit Claim for Security Review
            </button>
          </div>
        </form>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Direct Campus Message"
        subtitle={`Connecting securely with ${item.reportedBy.name}`}
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Hi, I am contacting you regarding your report logged at RIT..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send Message
            </button>
          </div>
        </form>
      </Modal>

      {/* Poster Modal with RIT Notice Header */}
      <Modal
        isOpen={posterModalOpen}
        onClose={() => setPosterModalOpen(false)}
        title="RIT Campus Bulletin Board Notice"
        subtitle="Printable format for academic notice boards & library desks"
        maxWidth="max-w-md"
      >
        <div className="border-4 border-slate-900 p-6 rounded-2xl bg-white text-center space-y-4 font-sans">
          <div className="bg-slate-900 text-white py-2 px-4 rounded-lg">
            <p className="text-[10px] font-black tracking-widest uppercase text-brand-300">RAJALAKSHMI INSTITUTE OF TECHNOLOGY</p>
            <h2 className="text-xl font-black uppercase tracking-widest mt-0.5">
              {item.type === 'lost' ? 'LOST PROPERTY NOTICE' : 'FOUND PROPERTY NOTICE'}
            </h2>
          </div>

          <div className="w-44 h-44 mx-auto rounded-xl overflow-hidden border border-slate-200">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{item.description}</p>
          </div>

          {item.reward && item.reward > 0 && (
            <div className="py-1 px-3 bg-amber-100 text-amber-900 font-black text-sm rounded-lg border border-amber-300">
              CASH REWARD: ₹{item.reward}
            </div>
          )}

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            <p>Report #{item.id} • Zone: {item.location}</p>
            <p className="font-bold text-slate-800 mt-1">Claim online or visit Gate 1 Security Desk</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button
            onClick={() => setPosterModalOpen(false)}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={() => {
              window.print();
              setPosterModalOpen(false);
            }}
            className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-brand-600 transition-colors"
          >
            Print Notice
          </button>
        </div>
      </Modal>

    </div>
  );
};
