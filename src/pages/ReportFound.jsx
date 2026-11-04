import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, LOCATIONS } from '../data/mockData';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Upload, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  Info
} from 'lucide-react';

const SAMPLE_FOUND_IMAGES = [
  'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
];

export const ReportFound = () => {
  const { addItem, navigate, showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'electronics',
    brand: '',
    color: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    location: LOCATIONS[0],
    customLocation: '',
    description: '',
    safeCustodyLocation: 'Central Campus Security Office Room 104',
    verificationQuestion: '',
    image: SAMPLE_FOUND_IMAGES[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        showToast('Photo uploaded successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.verificationQuestion.trim()) {
      showToast('Please fill out the title, description, and verification question', 'error');
      return;
    }

    const submission = {
      type: 'found',
      title: formData.title,
      category: formData.category,
      brand: formData.brand || 'N/A',
      color: formData.color || 'Unspecified',
      date: formData.date,
      time: formData.time,
      location: formData.customLocation ? formData.customLocation : formData.location,
      description: formData.description,
      safeCustodyLocation: formData.safeCustodyLocation,
      verificationQuestion: formData.verificationQuestion,
      reward: 0,
      urgency: 'normal',
      image: formData.image
    };

    const createdItem = addItem(submission);
    navigate('item-details', { itemId: createdItem.id });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Community Good Samaritan Registry
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Report a Found Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Thank you for turning in found property! Let's log its details and set up a secret verification question so the real owner can reclaim it safely.
        </p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-elevated space-y-6">
        
        {/* Section 1: Item Basic Info */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
            What Did You Find?
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Found Item Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="title"
              placeholder="e.g. Set of Toyota Car Keys with Blue Lanyard"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Brand / Color</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Toyota / Black"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: When & Where */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
            Discovery Location & Date
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date Found</label>
              <input
                type="date"
                required
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Approximate Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Area / Building</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Custody Drop-off Point</label>
              <input
                type="text"
                name="safeCustodyLocation"
                placeholder="e.g. Turned into Campus Security Room 104"
                value={formData.safeCustodyLocation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Public Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              name="description"
              placeholder="Give general details so an owner knows it might be theirs, without revealing secret marks..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Section 3: Smart Security Verification Question */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
            Owner Verification Question (Smart Anti-Fraud Feature)
          </h3>

          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-900 leading-relaxed">
              Create a question that only the real owner can answer. For example: <em>"What is the brand of the key tag?"</em> or <em>"What image is set as the lock screen wallpaper?"</em>. This keeps dishonest people from claiming items that don't belong to them!
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Verification Question <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="verificationQuestion"
              placeholder="e.g. What specific design is on the keychain / sticker?"
              value={formData.verificationQuestion}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Section 4: Photo */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
            Item Photo
          </h3>

          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 flex-1">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                <Upload className="w-4 h-4" /> Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomImageUpload}
                  className="hidden"
                />
              </label>

              <div>
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Or choose a generic item photo:</p>
                <div className="flex gap-2 flex-wrap">
                  {SAMPLE_FOUND_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, image: img }))}
                      className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                        formData.image === img ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-elevated flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Publish Found Item Log
          </button>
        </div>

      </form>

    </div>
  );
};
