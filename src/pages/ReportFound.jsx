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
  Building2,
  Info
} from 'lucide-react';

const SAMPLE_FOUND_IMAGES = [
  'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80', // Calculator
  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=800&q=80', // Keys
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', // Charger
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'  // Watch
];

export const ReportFound = () => {
  const { addItem, navigate, showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'calculators',
    brand: '',
    color: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:30',
    location: LOCATIONS[0],
    customLocation: '',
    description: '',
    safeCustodyLocation: 'RIT Main Security Gate 1 Lost Property Locker',
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          RIT Campus Good Samaritan Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Turn In a Found Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Thank you for keeping RIT trustworthy! Log where you found it, specify where you dropped it off, and set a private verification question.
        </p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-elevated space-y-6">
        
        {/* Section 1: Item Basic Info */}
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">1</span>
            What Did You Pick Up?
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Found Item Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="title"
              placeholder="e.g. Casio fx-991CW Calculator found in Library"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-700"
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
                placeholder="e.g. Casio / Black"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Discovery Location & Safe Custody */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">2</span>
            Discovery Location & Safe Custody Handover Point
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
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Time Found</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Found at Campus Zone</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-700"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Safe Custody Handover Location</label>
              <select
                name="safeCustodyLocation"
                value={formData.safeCustodyLocation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-700"
              >
                <option value="RIT Main Security Gate 1 Lost Property Locker">RIT Main Security Gate 1 Lost Property Locker</option>
                <option value="Central Library Main Circulation Counter">Central Library Main Circulation Counter</option>
                <option value="CSE Department HOD Office">CSE Department HOD Office</option>
                <option value="Dean Student Affairs Office (Academic Block Room 102)">Dean Student Affairs Office (Room 102)</option>
                <option value="In My Personal Possession (Contact Me)">In My Personal Possession (Contact Me)</option>
              </select>
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
              placeholder="Give a basic description without revealing secret stickers or passcode clues..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Section 3: Smart Anti-Fraud Question */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">3</span>
            Owner Verification Question (Smart Anti-Fraud Feature)
          </h3>

          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-900 leading-relaxed">
              To prevent someone else from claiming this item, set a question only the real owner knows. For example: <em>"What sticker or initials are on the slide cover?"</em> or <em>"What color is the pouch?"</em>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Secret Question <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="verificationQuestion"
              placeholder="e.g. What specific design or letters are on the back tag?"
              value={formData.verificationQuestion}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Section 4: Photo */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">4</span>
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
                <p className="text-[11px] font-bold text-slate-500 mb-1.5">Or choose a generic preset:</p>
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
            className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-elevated flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Log Property with RIT Portal
          </button>
        </div>

      </form>

    </div>
  );
};
