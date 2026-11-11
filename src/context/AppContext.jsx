import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_ITEMS, 
  INITIAL_USERS, 
  INITIAL_CLAIMS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('findit_rit_items_v2');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('findit_rit_user_v2');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default: Tharun Prasath (Student)
  });

  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('findit_rit_claims_v2');
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('findit_rit_notifs_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [savedItemIds, setSavedItemIds] = useState(() => {
    const saved = localStorage.getItem('findit_rit_saved_v2');
    return saved ? JSON.parse(saved) : ['rit-101', 'rit-202'];
  });

  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState('rit-101');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Global Search & Filter State
  const [filterState, setFilterState] = useState({
    query: '',
    type: 'all', // 'all' | 'lost' | 'found'
    category: 'all',
    location: 'all',
    sortBy: 'newest', // 'newest' | 'reward' | 'urgency'
    hasRewardOnly: false,
    viewMode: 'grid' // 'grid' | 'list'
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('findit_rit_items_v2', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('findit_rit_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('findit_rit_claims_v2', JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem('findit_rit_notifs_v2', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('findit_rit_saved_v2', JSON.stringify(savedItemIds));
  }, [savedItemIds]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigate = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params.itemId) {
      setSelectedItemId(params.itemId);
    }
    if (params.authMode) {
      setAuthMode(params.authMode);
    }
    if (params.filters) {
      setFilterState(prev => ({ ...prev, ...params.filters }));
    }
    setCurrentPage(page);
  };

  // Add a new reported item (lost or found)
  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      reportedBy: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '+1 (555) 000-0000',
        avatar: currentUser.avatar
      },
      status: 'active',
      views: 1,
      matches: []
    };

    // Simulate smart AI matching logic
    const matched = items.filter(it => 
      it.type !== newItem.type &&
      it.category === newItem.category &&
      (it.location.toLowerCase().includes(newItem.location.toLowerCase().split(' ')[0]) ||
       newItem.title.toLowerCase().split(' ').some(word => word.length > 3 && it.title.toLowerCase().includes(word)))
    );

    if (matched.length > 0) {
      newItem.matches = matched.map(m => ({
        matchedItemId: m.id,
        score: Math.floor(82 + Math.random() * 16),
        reason: `High correlation detected in category "${newItem.category}" and location vicinity.`
      }));

      // Add smart match alert notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'Smart Match Detected!',
        message: `Your newly reported ${newItem.title} matches a reported ${matched[0].type} item!`,
        time: 'Just now',
        type: 'match',
        read: false,
        itemId: matched[0].id
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    setItems(prev => [newItem, ...prev]);
    showToast(`Successfully reported "${newItem.title}"!`, 'success');
    return newItem;
  };

  // Submit claim on found item
  const submitClaim = ({ itemId, verificationAnswer, proofDescription }) => {
    const item = items.find(i => i.id === itemId);
    const newClaim = {
      id: `claim-${Date.now()}`,
      itemId,
      itemTitle: item ? item.title : 'Item',
      claimedBy: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone
      },
      verificationAnswer,
      proofDescription,
      status: 'pending',
      dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setClaims(prev => [newClaim, ...prev]);
    
    // Notify reporter
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Claim Received',
      message: `${currentUser.name} submitted a claim verification for "${item?.title}".`,
      time: 'Just now',
      type: 'claim',
      read: false,
      itemId
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast('Claim submitted for verification review!', 'success');
  };

  // Update claim status (Approve / Reject)
  const updateClaimStatus = (claimId, newStatus) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return { ...c, status: newStatus };
      }
      return c;
    }));

    if (newStatus === 'approved') {
      const claim = claims.find(c => c.id === claimId);
      if (claim) {
        updateItemStatus(claim.itemId, 'resolved');
      }
      showToast('Claim approved! Item marked as resolved.', 'success');
    } else {
      showToast('Claim rejected.', 'info');
    }
  };

  // Update item status
  const updateItemStatus = (itemId, status) => {
    setItems(prev => prev.map(it => it.id === itemId ? { ...it, status } : it));
    showToast(`Item status updated to ${status}.`, 'info');
  };

  // Delete item
  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(it => it.id !== itemId));
    showToast('Item report removed.', 'info');
  };

  // Bookmark / Save item
  const toggleSaveItem = (itemId) => {
    setSavedItemIds(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast('Removed from saved items', 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Item saved to your list!', 'success');
        return [...prev, itemId];
      }
    });
  };

  // Fast user switch (User <-> Admin) for easy grading & testing
  const switchUserRole = (targetRole) => {
    if (targetRole === 'admin') {
      setCurrentUser(INITIAL_USERS[1]);
      showToast('Switched to RIT Security Officer Ramanathan mode', 'info');
    } else {
      setCurrentUser(INITIAL_USERS[0]);
      showToast('Switched to RIT Student Tharun Prasath mode', 'info');
    }
  };

  const loginUser = (email, role = 'user') => {
    const existing = INITIAL_USERS.find(u => u.email === email) || {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 019-2831',
      trustScore: 90,
      joinedDate: 'Nov 2026'
    };
    setCurrentUser(existing);
    showToast(`Welcome back, ${existing.name}!`, 'success');
    navigate(role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been signed out.', 'info');
    navigate('home');
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        items,
        currentUser,
        claims,
        notifications,
        savedItemIds,
        currentPage,
        selectedItemId,
        authMode,
        filterState,
        toast,
        setFilterState,
        navigate,
        addItem,
        submitClaim,
        updateClaimStatus,
        updateItemStatus,
        deleteItem,
        toggleSaveItem,
        switchUserRole,
        loginUser,
        logoutUser,
        markNotificationRead,
        clearAllNotifications,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
