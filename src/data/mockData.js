// RIT Campus Smart Lost & Found Portal Mock Data

export const RIT_CAMPUS_ZONES = [
  { id: 'zone-academic', name: 'Academic & Admin Blocks', color: 'from-blue-500 to-indigo-600', icon: 'Building2' },
  { id: 'zone-tech', name: 'CSE, IT & Tech Labs', color: 'from-sky-500 to-cyan-600', icon: 'Cpu' },
  { id: 'zone-library', name: 'Central Library & Reading Halls', color: 'from-indigo-500 to-purple-600', icon: 'BookOpen' },
  { id: 'zone-food', name: 'Food Court & Canteen', color: 'from-amber-500 to-orange-600', icon: 'Coffee' },
  { id: 'zone-sports', name: 'Sports Complex & Grounds', color: 'from-emerald-500 to-teal-600', icon: 'Trophy' },
  { id: 'zone-transport', name: 'Bus Bay & Vehicle Parking', color: 'from-rose-500 to-pink-600', icon: 'Bus' },
  { id: 'zone-hostel', name: 'Hostel Blocks & Mess', color: 'from-violet-500 to-fuchsia-600', icon: 'Home' },
  { id: 'zone-security', name: 'Main Security Gates & Reception', color: 'from-slate-700 to-slate-900', icon: 'ShieldCheck' }
];

export const LOCATIONS = [
  'Central Library (2nd Floor Digital Hall)',
  'CSE & IT Block - Lab 3 (AI/ML Lab)',
  'Main Food Court & College Canteen',
  'Academic Main Block (Dean Office Lobby)',
  'College Bus Bay & Parking Zone 2',
  'Indoor Sports Arena & Badminton Court',
  'ECE & EEE Department Ground Floor',
  'Mechanical Sciences CAD/CAM Lab',
  'Main Auditorium & OAT Quad',
  'Boys Hostel Block A (Common Room)',
  'Girls Hostel Block B (Lobby)',
  'RIT Main Security Gate 1'
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Layers' },
  { id: 'electronics', name: 'Laptops & Gadgets', icon: 'Laptop' },
  { id: 'id-cards', name: 'RIT ID Cards & Documents', icon: 'FileText' },
  { id: 'calculators', name: 'Calculators & Stationary', icon: 'Calculator' },
  { id: 'keys', name: 'Vehicle & Room Keys', icon: 'Key' },
  { id: 'audio', name: 'Earbuds & Headphones', icon: 'Headphones' },
  { id: 'wallets', name: 'Wallets & Money Pouches', icon: 'Wallet' },
  { id: 'bags', name: 'Backpacks & Lab Coats', icon: 'Briefcase' },
  { id: 'wearables', name: 'Watches & Eyewear', icon: 'Watch' },
  { id: 'other', name: 'Other Campus Belongings', icon: 'HelpCircle' }
];

export const INITIAL_USERS = [
  {
    id: 'user-1',
    name: 'Tharun Prasath',
    email: 'tharun.p@rit-campus.ac.in',
    rollNo: '22CS104',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98401 23456',
    department: 'Computer Science & Engineering',
    year: '3rd Year B.E.',
    badge: 'Verified RIT Student',
    itemsReported: 3,
    itemsResolved: 2,
    trustScore: 98,
    joinedDate: 'Aug 2024'
  },
  {
    id: 'admin-1',
    name: 'Inspector S. Ramanathan',
    email: 'security.head@rit-campus.ac.in',
    rollNo: 'STAFF-SEC-01',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+91 94440 98765',
    department: 'RIT Campus Security & Lost Property Desk',
    badge: 'Chief Safety Administrator',
    itemsReported: 34,
    itemsResolved: 31,
    trustScore: 100,
    joinedDate: 'Jan 2023'
  }
];

export const INITIAL_ITEMS = [
  {
    id: 'rit-101',
    type: 'lost',
    title: 'Casio fx-991CW ClassWiz Scientific Calculator',
    category: 'calculators',
    description: 'Black and white Casio ClassWiz scientific calculator left on desk 24 of Main Academic Block Exam Hall 204 after the Engineering Mathematics internal assessment. Has a blue metallic sticker with initials "TP" on the slide cover.',
    date: '2026-11-04',
    time: '13:15',
    location: 'Academic Main Block (Dean Office Lobby)',
    campusZone: 'zone-academic',
    status: 'active',
    reward: 200,
    urgency: 'high',
    brand: 'Casio',
    color: 'Black / White',
    serialMasked: '991CW-****82',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-1',
      name: 'Tharun Prasath',
      rollNo: '22CS104',
      phone: '+91 98401 23456',
      email: 'tharun.p@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    views: 184,
    matches: [
      {
        matchedItemId: 'rit-201',
        score: 96,
        reason: 'Exact category match (Calculator), Casio 991 brand match, and found in Main Academic Block 2nd floor corridor right after the exam hour.'
      }
    ]
  },
  {
    id: 'rit-201',
    type: 'found',
    title: 'Casio Scientific Calculator with Slide Case',
    category: 'calculators',
    description: 'Found unattended on a bench in the 2nd floor corridor near Exam Hall 204. Handed over to RIT Main Security Desk at Gate 1.',
    date: '2026-11-04',
    time: '14:00',
    location: 'Academic Main Block (Dean Office Lobby)',
    campusZone: 'zone-academic',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Casio',
    color: 'Black / White',
    safeCustodyLocation: 'RIT Main Security Gate 1 Lost Property Locker',
    verificationQuestion: 'What letter initials or sticker is affixed on the top right edge of the protective slide cover?',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'admin-1',
      name: 'Inspector S. Ramanathan',
      rollNo: 'STAFF-SEC-01',
      phone: '+91 94440 98765',
      email: 'security.head@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    views: 92,
    matches: [
      {
        matchedItemId: 'rit-101',
        score: 96,
        reason: 'Correlates with Tharun Prasath\'s lost Casio calculator report.'
      }
    ]
  },
  {
    id: 'rit-102',
    type: 'lost',
    title: 'RIT Student ID Card with Maroon Lanyard',
    category: 'id-cards',
    description: 'Official RIT Student Smart Card with blue bar and campus library barcode. In a clear plastic holder attached to an RIT printed maroon lanyard. Urgent for upcoming semester exams!',
    date: '2026-11-03',
    time: '12:30',
    location: 'Main Food Court & College Canteen',
    campusZone: 'zone-food',
    status: 'active',
    reward: 100,
    urgency: 'high',
    brand: 'RIT Campus Authority',
    color: 'Maroon / White',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-2',
      name: 'Kavitha Sundaram',
      rollNo: '23IT045',
      phone: '+91 97890 12345',
      email: 'kavitha.s@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    views: 312,
    matches: []
  },
  {
    id: 'rit-202',
    type: 'found',
    title: 'Royal Enfield Bike Key with Metal RIT Keychain',
    category: 'keys',
    description: 'Found near Bus Number 14 slot in the College Bus Bay. Heavy metal Royal Enfield ignition key with a custom engraved copper tag.',
    date: '2026-11-04',
    time: '09:20',
    location: 'College Bus Bay & Parking Zone 2',
    campusZone: 'zone-transport',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Royal Enfield',
    color: 'Silver / Brass',
    safeCustodyLocation: 'Campus Transport Officer Desk (Bus Bay Cabin)',
    verificationQuestion: 'What bike model (Classic / Hunter / Meteor) or registration ending digits are engraved on the back tag?',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-3',
      name: 'Dinesh Kumar',
      rollNo: '21ME078',
      phone: '+91 96001 87654',
      email: 'dinesh.k@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    views: 145,
    matches: []
  },
  {
    id: 'rit-103',
    type: 'lost',
    title: 'Boat Airdopes 141 ANC Case (Carbon Black)',
    category: 'audio',
    description: 'Black matte charging case with right earbud inside. Left on table 6 near the fresh juice counter of the Main Canteen during lunch break.',
    date: '2026-11-03',
    time: '13:45',
    location: 'Main Food Court & College Canteen',
    campusZone: 'zone-food',
    status: 'active',
    reward: 150,
    urgency: 'normal',
    brand: 'boAt',
    color: 'Matte Carbon Black',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-4',
      name: 'Gowtham Raj',
      rollNo: '23EC032',
      phone: '+91 98840 54321',
      email: 'gowtham.r@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    views: 240,
    matches: []
  },
  {
    id: 'rit-203',
    type: 'found',
    title: 'Dell 65W USB-C Laptop Charger with Power Cable',
    category: 'electronics',
    description: 'Found plugged into socket row 3 in the 2nd Floor Central Digital Library hall. Original Dell genuine adapter with black cable tie.',
    date: '2026-11-04',
    time: '11:10',
    location: 'Central Library (2nd Floor Digital Hall)',
    campusZone: 'zone-library',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Dell',
    color: 'Black',
    safeCustodyLocation: 'Central Library Main Circulation Counter',
    verificationQuestion: 'Is the power cable a 3-pin round connector or standard flat pin, and what colored tape is wrapped near the plug?',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-5',
      name: 'Ananya Ramesh',
      rollNo: '22AI012',
      phone: '+91 98411 99887',
      email: 'ananya.r@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    views: 88,
    matches: []
  },
  {
    id: 'rit-104',
    type: 'lost',
    title: 'Data Structures & Algorithms Laboratory Record',
    category: 'bags',
    description: 'Bound white spiral laboratory record book with RIT college crest on front. Has 14 completed experiments evaluated by Dr. V. Murugan. Crucial for upcoming lab model exam!',
    date: '2026-11-02',
    time: '16:30',
    location: 'CSE & IT Block - Lab 3 (AI/ML Lab)',
    campusZone: 'zone-tech',
    status: 'active',
    reward: 100,
    urgency: 'high',
    brand: 'RIT Record Book',
    color: 'White / Navy Blue',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-1',
      name: 'Tharun Prasath',
      rollNo: '22CS104',
      phone: '+91 98401 23456',
      email: 'tharun.p@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    views: 195,
    matches: []
  },
  {
    id: 'rit-204',
    type: 'found',
    title: 'Titan Fastrack Digital Sports Watch (Blue Dial)',
    category: 'wearables',
    description: 'Found on the spectators bleachers at the Indoor Badminton Court after the inter-department tournament games. Blue silicone strap with stopwatch active.',
    date: '2026-11-03',
    time: '18:15',
    location: 'Indoor Sports Arena & Badminton Court',
    campusZone: 'zone-sports',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Fastrack',
    color: 'Navy Blue / Black',
    safeCustodyLocation: 'Physical Education Director Office (Sports Complex Room 02)',
    verificationQuestion: 'What time was displayed on the stopwatch freeze screen when turned in, or what scratch is on the bezel?',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'admin-1',
      name: 'Inspector S. Ramanathan',
      rollNo: 'STAFF-SEC-01',
      phone: '+91 94440 98765',
      email: 'security.head@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    views: 110,
    matches: []
  },
  {
    id: 'rit-301',
    type: 'lost',
    title: 'HP Pavilion 15 Gaming Laptop (Shadow Black)',
    category: 'electronics',
    description: 'Shadow Black HP Pavilion with green backlit keyboard. Left in CSE Lab 1 on workstation 18. Safely reclaimed through portal verification!',
    date: '2026-11-01',
    time: '17:00',
    location: 'CSE & IT Block - Lab 3 (AI/ML Lab)',
    campusZone: 'zone-tech',
    status: 'resolved',
    reward: 500,
    urgency: 'high',
    brand: 'HP',
    color: 'Shadow Black / Acid Green',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-6',
      name: 'Vikram Chandran',
      rollNo: '21CS089',
      phone: '+91 98409 11223',
      email: 'vikram.c@rit-campus.ac.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    views: 640,
    reunitedDate: '2026-11-02',
    matches: []
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-101',
    itemId: 'rit-201',
    itemTitle: 'Casio Scientific Calculator with Slide Case',
    claimedBy: {
      id: 'user-1',
      name: 'Tharun Prasath',
      rollNo: '22CS104',
      email: 'tharun.p@rit-campus.ac.in',
      phone: '+91 98401 23456'
    },
    verificationAnswer: 'The protective slide cover has a small blue metallic sticker with the letters "TP" printed on it.',
    proofDescription: 'I have the original bill from the college bookstore and the back serial label matches 991CW-1082.',
    status: 'pending',
    dateSubmitted: '2026-11-04 14:45'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '⚡ RIT Smart Match Detected!',
    message: '96% match found between your lost Casio Calculator and property logged at Gate 1 Security Desk!',
    time: '15 mins ago',
    type: 'match',
    read: false,
    itemId: 'rit-201'
  },
  {
    id: 'notif-2',
    title: 'Campus Security Notification',
    message: 'Inspector Ramanathan logged a new item turned in at Central Library Digital Hall.',
    time: '1 hour ago',
    type: 'claim',
    read: false,
    itemId: 'rit-203'
  },
  {
    id: 'notif-3',
    title: 'Reunion Success on Campus',
    message: 'HP Pavilion Laptop was safely reunited with Vikram Chandran (21CS089)!',
    time: 'Yesterday',
    type: 'success',
    read: true,
    itemId: 'rit-301'
  }
];

export const PLATFORM_STATS = {
  totalReported: 948,
  activeLost: 142,
  activeFound: 98,
  reunitedTotal: 708,
  successRate: '96.4%',
  avgReunionHours: '6.5 hrs',
  registeredStudents: 4850
};

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Report Your Item',
    desc: 'Log photos, time, and specific RIT campus zone (Library, Canteen, CSE Labs, Bus Bay, or Hostels) in under 60 seconds.',
    icon: 'FilePlus2',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    step: '02',
    title: 'AI Campus Match Radar',
    desc: 'Our engine instantly scans reports from fellow RIT students and campus security logs, cross-referencing periods & zones.',
    icon: 'Sparkles',
    color: 'from-sky-500 to-blue-600'
  },
  {
    step: '03',
    title: 'Anti-Fraud Verification',
    desc: 'Claimants answer a private security question (e.g. sticker details or lock code) so items are never handed to the wrong person.',
    icon: 'ShieldCheck',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    step: '04',
    title: 'Safe RIT Security Handover',
    desc: 'Collect verified property at designated campus points: Gate 1 Security Office, Library Desk, or Student Affairs Office.',
    icon: 'CheckCircle2',
    color: 'from-violet-600 to-purple-700'
  }
];

export const SAFE_HANDOVER_STATIONS = [
  {
    name: 'Main Security Gate 1 Lost Property Desk',
    timing: 'Open 24/7 (All Days)',
    contact: '+91 (044) 2715-6750 / Ext 104',
    landmark: 'Opposite Main Entrance Arch & Admin Portico'
  },
  {
    name: 'Central Library Circulation Counter',
    timing: '8:00 AM – 7:30 PM (Working Days)',
    contact: 'library.help@rit-campus.ac.in',
    landmark: 'Ground Floor, Central Knowledge Center'
  },
  {
    name: 'Dean Student Affairs & Campus Office',
    timing: '9:00 AM – 5:00 PM',
    contact: 'student.affairs@rit-campus.ac.in',
    landmark: 'Academic Block 1st Floor, Room 102'
  }
];
