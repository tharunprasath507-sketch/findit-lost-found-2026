import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_USERS } from '../data/mockData';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Building2,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const Auth = () => {
  const { authMode, navigate, loginUser, showToast } = useApp();
  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [role, setRole] = useState('user'); // 'user' | 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }
    loginUser(email, role);
  };

  const handleQuickDemo = (userType) => {
    if (userType === 'user') {
      loginUser(INITIAL_USERS[0].email, 'user');
    } else {
      loginUser(INITIAL_USERS[1].email, 'admin');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Brand highlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            RIT Campus Single Sign-On
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Recover Items Across All RIT Blocks.
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            Sign in with your RIT student roll number or institutional email. Receive real-time AI match alerts when calculators, ID cards, or keys are turned in at Campus Security Gate 1.
          </p>

          {/* Quick Demo Login Cards */}
          <div className="bg-slate-100/80 p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <p className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              1-Click RIT Campus Demo Logins:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                className="p-3 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-brand-700 flex items-center justify-center text-xs font-black">
                    TP
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 group-hover:text-brand-700 truncate">Tharun Prasath</p>
                    <p className="text-[10px] text-slate-500 font-semibold">22CS104 (CSE)</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    SR
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">Insp. Ramanathan</p>
                    <p className="text-[10px] text-slate-500 font-semibold">Gate 1 Security Head</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Direct integration with RIT Gate 1 Lost Property Lockers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Secret anti-fraud verification question prevents mistaken handovers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-elevated overflow-hidden p-6 sm:p-8">
            
            {/* Tab switch */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  isLogin ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                RIT Student Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  !isLogin ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                New Registration
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tharun Prasath"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Roll Number / Staff ID</label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. 22CS104"
                          value={rollNo}
                          onChange={(e) => setRollNo(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Department</label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                      >
                        <option value="CSE">Computer Science & Engineering (CSE)</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="AIDS">Artificial Intelligence & Data Science</option>
                        <option value="ECE">Electronics & Communication (ECE)</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="EEE">Electrical & Electronics (EEE)</option>
                        <option value="BIOMED">Biomedical Engineering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          placeholder="+91 98401 23456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">College Email / Username</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="rollno@rit-campus.ac.in or personal email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => showToast('Password reset link sent to your college email', 'info')}
                      className="text-[11px] font-bold text-brand-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              {isLogin && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    defaultChecked
                    className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 font-medium">
                    Keep me signed in on this campus device
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{isLogin ? 'Sign In to RIT Portal' : 'Register Student Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-slate-500 pt-3">
                {isLogin ? "New student or staff? " : "Already registered? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-black text-brand-600 hover:underline"
                >
                  {isLogin ? 'Register now' : 'Sign In'}
                </button>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
