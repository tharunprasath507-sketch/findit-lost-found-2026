import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, LOCATIONS } from '../data/mockData';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Upload, 
  Award, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Image as ImageIcon,
  Shield,
  HelpCircle
} from 'lucide-react';

const SAMPLE_LOST_IMAGES = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
];

export const ReportLost = () => {
  const { addItem, navigate, showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'electronics',
    brand: '',
    color: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    location: LOCATIONS[0],
    customLocation: '',
    description: '',
    serialMasked: '',
    reward: 0,
    urgency: 'high',
    image: SAMPLE_LOST_IMAGES[0]
  });

  const [activeStep, setActiveStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
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
    if (!formData.title.trim() || !formData.description.trim()) {
      showToast('Please fill out the item title and description', 'error');
      return;
    }

    const submission = {
      type: 'lost',
      title: formData.title,
      category: formData.category,
      brand: formData.brand || 'N/A',
      color: formData.color || 'Unspecified',
      date: formData.date,
      time: formData.time,
      location: formData.customLocation ? formData.customLocation : formData.location,
      description: formData.description,
      serialMasked: formData.serialMasked,
      reward: Number(formData.reward) || 0,
      urgency: formData.urgency,
      image: formData.image
    };

    const createdItem = addItem(submission);
    navigate('item-details', { itemId: createdItem.id });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <PlusCircle className="w-4 h-4 text-amber-600" />
          Official Loss Report Form
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Report a Lost Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Our smart system will instantly search our database of turned-in items and alert campus safety staff.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {[
          { step: 1, label: 'Item Details' },
          { step: 2, label: 'Loss Info' },
          { step: 3, label: 'Photos & Reward' }
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                activeStep === s.step
                  ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                  : activeStep > s.step
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {activeStep > s.step ? '✓' : s.step}
            </button>
            <span className={`text-xs font-semibold hidden sm:inline ${
              activeStep === s.step ? 'text-slate-900' : 'text-slate-400'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-elevated space-y-6">
        
        {/* STEP 1: Basic Details */}
        {activeStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Step 1: Item Identification</h3>
              <p className="text-xs text-slate-500">Provide general details so people can distinguish your property.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Item Title / Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                name="title"
                placeholder="e.g. MacBook Pro 14-inch Space Grey with Stickers"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Brand / Manufacturer</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="e.g. Apple, Bellroy, Sony, Nike"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Color(s)</label>
                <input
                  type="text"
                  name="color"
                  placeholder="e.g. Matte Black / Silver"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Masked Serial Number / IMEI (Optional)
                </label>
                <input
                  type="text"
                  name="serialMasked"
                  placeholder="e.g. C02G****MD6T"
                  value={formData.serialMasked}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!formData.title) {
                    showToast('Please enter an item title', 'error');
                    return;
                  }
                  setActiveStep(2);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md flex items-center gap-1.5"
              >
                Next: Loss Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Loss Circumstances */}
        {activeStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Step 2: When & Where Was It Lost?</h3>
              <p className="text-xs text-slate-500">Accurate locations speed up cross-matching with security logs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Date Lost <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Approximate Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Zone / Facility</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Specific Spot / Room / Landmark (Optional)
              </label>
              <input
                type="text"
                name="customLocation"
                placeholder="e.g. Desk #14 near second floor quiet reading window"
                value={formData.customLocation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Detailed Description & Distinguishing Marks <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                name="description"
                placeholder="Include scratches, stickers, keychain contents, phone wallpaper or case details..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!formData.description) {
                    showToast('Please provide a description', 'error');
                    return;
                  }
                  setActiveStep(3);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md flex items-center gap-1.5"
              >
                Next: Photo & Reward <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Photos, Reward & Urgency */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Step 3: Item Photo, Urgency & Reward</h3>
              <p className="text-xs text-slate-500">Adding a photo and optional reward increases recovery speed by 70%.</p>
            </div>

            {/* Photo preview & sample selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Item Photo</label>
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 relative bg-slate-100 shrink-0">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" /> Upload Custom Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Or pick a sample catalog image:</p>
                    <div className="flex gap-2 flex-wrap">
                      {SAMPLE_LOST_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleImageSelect(img)}
                          className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                            formData.image === img ? 'border-brand-600 ring-2 ring-brand-200' : 'border-transparent'
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

            {/* Urgency & Reward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Urgency Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Normal' },
                    { id: 'high', label: 'High' },
                    { id: 'critical', label: 'Critical' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, urgency: lvl.id }))}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all ${
                        formData.urgency === lvl.id
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Optional Cash Reward ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    name="reward"
                    placeholder="0"
                    value={formData.reward}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-lost-600 to-amber-600 hover:from-lost-700 hover:to-amber-700 text-white shadow-elevated flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                Publish Lost Item Report
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
};
