// Initial Mock Data for FindIt - Smart Lost & Found Portal

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Layers' },
  { id: 'electronics', name: 'Electronics & Gadgets', icon: 'Laptop' },
  { id: 'wallets', name: 'Wallets & Purses', icon: 'Wallet' },
  { id: 'keys', name: 'Keys & Access Cards', icon: 'Key' },
  { id: 'bags', name: 'Bags & Backpacks', icon: 'Briefcase' },
  { id: 'documents', name: 'IDs & Documents', icon: 'FileText' },
  { id: 'jewelry', name: 'Jewelry & Watches', icon: 'Watch' },
  { id: 'clothing', name: 'Clothing & Eyewear', icon: 'Glasses' },
  { id: 'pets', name: 'Pets', icon: 'Heart' },
  { id: 'other', name: 'Other Items', icon: 'HelpCircle' },
];

export const LOCATIONS = [
  'Central Library (2nd Floor)',
  'Student Activity Center',
  'Science & Tech Complex',
  'University Dining Hall',
  'Campus Recreation & Gym',
  'Engineering Hallway B',
  'North Parking Lot 4',
  'Campus Transit Shuttle Stop',
  'City Metro Green Line',
  'Administration Building',
];

export const INITIAL_USERS = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 234-5678',
    department: 'Computer Science Dept.',
    badge: 'Verified Community Member',
    itemsReported: 4,
    itemsResolved: 3,
    trustScore: 98,
    joinedDate: 'Jan 2025'
  },
  {
    id: 'admin-1',
    name: 'Officer Sarah Jenkins',
    email: 'admin@findit.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 890-1234',
    department: 'Campus Security & Lost Property Desk',
    badge: 'Senior Safety Administrator',
    itemsReported: 28,
    itemsResolved: 26,
    trustScore: 100,
    joinedDate: 'Aug 2023'
  }
];

export const INITIAL_ITEMS = [
  {
    id: 'item-101',
    type: 'lost',
    title: 'Apple MacBook Pro 14" (Space Grey)',
    category: 'electronics',
    description: 'Left on desk 14 near the silent study section of Central Library. It has a distinctive turquoise sticker of a stylized mountain on the top cover and a slight scratch on the left corner.',
    date: '2026-11-02',
    time: '14:30',
    location: 'Central Library (2nd Floor)',
    status: 'active', // 'active' | 'claim_pending' | 'resolved' | 'flagged'
    reward: 100,
    urgency: 'high',
    brand: 'Apple',
    color: 'Space Grey',
    serialMasked: 'C02G****MD6T',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-1',
      name: 'Alex Rivera',
      phone: '+1 (555) 234-5678',
      email: 'alex.rivera@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    views: 142,
    matches: [
      {
        matchedItemId: 'item-201',
        score: 94,
        reason: 'Strong match on Model, Space Grey color, Central Library location and timestamp match.'
      }
    ]
  },
  {
    id: 'item-201',
    type: 'found',
    title: 'Space Grey Laptop with Stickers',
    category: 'electronics',
    description: 'Found unattended at library study desk table 14 around 4 PM. In safe custody at Central Lost Property Desk. Has laptop sleeve included.',
    date: '2026-11-02',
    time: '16:00',
    location: 'Central Library (2nd Floor)',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Apple',
    color: 'Space Grey',
    safeCustodyLocation: 'Campus Security Lost & Found Office, Room 104',
    verificationQuestion: 'What specific design sticker is located on the top lid, and what brand is the zippered sleeve?',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-2',
      name: 'Maya Lin',
      phone: '+1 (555) 432-8765',
      email: 'maya.lin@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    views: 89,
    matches: [
      {
        matchedItemId: 'item-101',
        score: 94,
        reason: 'Correlates with Alex Rivera\'s report of MacBook Pro 14".'
      }
    ]
  },
  {
    id: 'item-102',
    type: 'lost',
    title: 'Vintage Brown Leather Bifold Wallet',
    category: 'wallets',
    description: 'Bellroy brown leather wallet containing university student ID (Alex Rivera), driver license, and blue transit pass card. No cash expected back, just need the documents urgently!',
    date: '2026-11-01',
    time: '12:15',
    location: 'University Dining Hall',
    status: 'active',
    reward: 50,
    urgency: 'high',
    brand: 'Bellroy',
    color: 'Tan Brown',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-1',
      name: 'Alex Rivera',
      phone: '+1 (555) 234-5678',
      email: 'alex.rivera@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    views: 215,
    matches: []
  },
  {
    id: 'item-202',
    type: 'found',
    title: 'Toyota Car Key with Blue Carabiner & Lanyard',
    category: 'keys',
    description: 'Found on the bench right outside Student Activity Center entrance. Smart key fob with lock/unlock/trunk buttons and a silver gym tag attached.',
    date: '2026-11-03',
    time: '09:10',
    location: 'Student Activity Center',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Toyota',
    color: 'Black / Silver',
    safeCustodyLocation: 'Student Center Help Desk',
    verificationQuestion: 'What four-digit number is stamped on the back of the gym membership barcode tag?',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-3',
      name: 'Marcus Chen',
      phone: '+1 (555) 765-4321',
      email: 'marcus.c@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    views: 64,
    matches: []
  },
  {
    id: 'item-103',
    type: 'lost',
    title: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'electronics',
    description: 'Silver/Off-white Sony wireless headphones inside their original grey zippered carrying case. Left under the chair at Science & Tech Complex Room 302.',
    date: '2026-10-31',
    time: '17:45',
    location: 'Science & Tech Complex',
    status: 'active',
    reward: 40,
    urgency: 'normal',
    brand: 'Sony',
    color: 'Silver / Cream',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-4',
      name: 'Jessica Taylor',
      phone: '+1 (555) 987-6543',
      email: 'jess.taylor@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    views: 310,
    matches: []
  },
  {
    id: 'item-203',
    type: 'found',
    title: 'North Face Borealis Backpack (Navy Blue)',
    category: 'bags',
    description: 'Found on the campus transit shuttle bus around 6 PM. Contains several spiral notebooks, a calculus textbook, and an insulated water bottle.',
    date: '2026-11-02',
    time: '18:15',
    location: 'Campus Transit Shuttle Stop',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'The North Face',
    color: 'Navy Blue / Grey',
    safeCustodyLocation: 'Campus Transit Office / Bus Terminal Depot',
    verificationQuestion: 'What name or initials are written on the first page of the calculus textbook inside?',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'admin-1',
      name: 'Officer Sarah Jenkins',
      phone: '+1 (555) 890-1234',
      email: 'admin@findit.org',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    views: 120,
    matches: []
  },
  {
    id: 'item-104',
    type: 'lost',
    title: 'Gold Plated Fossil Chronograph Watch',
    category: 'jewelry',
    description: 'Lost in the Campus Recreation locker room or swimming pool spectator area. Engraved message on the back casing: "With Love, Always 2024". Enormous sentimental value.',
    date: '2026-11-01',
    time: '19:00',
    location: 'Campus Recreation & Gym',
    status: 'active',
    reward: 150,
    urgency: 'high',
    brand: 'Fossil',
    color: 'Gold',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-5',
      name: 'David Kim',
      phone: '+1 (555) 345-6789',
      email: 'david.kim@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    views: 450,
    matches: []
  },
  {
    id: 'item-204',
    type: 'found',
    title: 'Black Rimmed Ray-Ban Wayfarer Glasses',
    category: 'clothing',
    description: 'Prescription sunglasses left on the counter at University Dining Hall cashier line 2. Classic black matte frame.',
    date: '2026-11-03',
    time: '11:20',
    location: 'University Dining Hall',
    status: 'active',
    reward: 0,
    urgency: 'normal',
    brand: 'Ray-Ban',
    color: 'Matte Black',
    safeCustodyLocation: 'Dining Hall Manager Desk',
    verificationQuestion: 'Are these polarized and what is the exact color of the microfiber cleaning cloth inside the pouch?',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-6',
      name: 'Emily Watson',
      phone: '+1 (555) 678-1234',
      email: 'emily.w@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    views: 73,
    matches: []
  },
  {
    id: 'item-301',
    type: 'lost',
    title: 'Golden Retriever Pup (Answers to "Milo")',
    category: 'pets',
    description: 'Friendly 8-month-old Golden Retriever puppy slipped collar near North Parking Lot park trail. Wearing a red nylon harness with rabies vaccine tag.',
    date: '2026-11-02',
    time: '16:45',
    location: 'North Parking Lot 4',
    status: 'resolved',
    reward: 200,
    urgency: 'high',
    brand: 'N/A',
    color: 'Golden / Cream',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    reportedBy: {
      id: 'user-7',
      name: 'Liam Peterson',
      phone: '+1 (555) 890-5678',
      email: 'liam.p@example.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    views: 920,
    reunitedDate: '2026-11-03',
    matches: []
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-1',
    itemId: 'item-201',
    itemTitle: 'Space Grey Laptop with Stickers',
    claimedBy: {
      id: 'user-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      phone: '+1 (555) 234-5678'
    },
    verificationAnswer: 'The sticker is a geometric mountain with teal peaks, and the sleeve is a navy Tomtoc 360 padded zipper case.',
    proofDescription: 'I have the original purchase receipt and Apple ID serial number match.',
    status: 'pending', // 'pending' | 'approved' | 'rejected'
    dateSubmitted: '2026-11-02 17:30'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'AI Smart Match Alert!',
    message: 'We found a 94% match for your lost MacBook Pro 14" at Central Library!',
    time: '10 minutes ago',
    type: 'match',
    read: false,
    itemId: 'item-201'
  },
  {
    id: 'notif-2',
    title: 'Claim Update',
    message: 'Your verification submission for Item #201 has been received by Officer Jenkins.',
    time: '1 hour ago',
    type: 'claim',
    read: false,
    itemId: 'item-201'
  },
  {
    id: 'notif-3',
    title: 'Community Milestone',
    message: 'Milo the Golden Retriever was successfully reunited with Liam Peterson!',
    time: '3 hours ago',
    type: 'success',
    read: true,
    itemId: 'item-301'
  }
];

export const PLATFORM_STATS = {
  totalReported: 1482,
  activeLost: 247,
  activeFound: 189,
  reunitedTotal: 1046,
  successRate: '94.2%',
  avgReunionHours: '18 hrs',
  registeredUsers: 6420
};

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Report with Accuracy',
    desc: 'Submit photos, descriptions, timestamps, and specify exact drop-off or loss zones in under 2 minutes.',
    icon: 'FilePlus2',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    step: '02',
    title: 'Smart Matching Engine',
    desc: 'Our intelligent algorithms cross-reference categories, timestamps, and locations to instantly detect likely matches.',
    icon: 'Sparkles',
    color: 'from-sky-500 to-blue-600'
  },
  {
    step: '03',
    title: 'Secure Verification',
    desc: 'Claimers answer unique verification questions or provide proof before sensitive contact details are exchanged.',
    icon: 'ShieldCheck',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    step: '04',
    title: 'Safe Community Handover',
    desc: 'Meet safely at certified campus security desks or verified partner exchange stations with receipt confirmation.',
    icon: 'CheckCircle2',
    color: 'from-violet-500 to-purple-600'
  }
];
