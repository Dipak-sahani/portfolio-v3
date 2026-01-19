import React, { createContext, useState, useContext, useCallback, useRef } from 'react';

// Toast Context
const ToastContext = createContext(null);

// Toast Colors Configuration
const TOAST_TYPES = {
  SUCCESS: {
    background: '#D1FAE5',
    border: '#10B981',
    text: '#065F46',
    icon: '✅'
  },
  ERROR: {
    background: '#FEE2E2',
    border: '#EF4444',
    text: '#991B1B',
    icon: '❌'
  },
  WARNING: {
    background: '#FEF3C7',
    border: '#F59E0B',
    text: '#92400E',
    icon: '⚠️'
  },
  INFO: {
    background: '#DBEAFE',
    border: '#3B82F6',
    text: '#1E40AF',
    icon: 'ℹ️'
  }
};

// Toast Component
const Toast = ({ message, type, onClose, id }) => {
  const colors = TOAST_TYPES[type] || TOAST_TYPES.INFO;

  return (
    <div className="animate-slideIn">
      <div
        className="relative flex items-center w-full max-w-sm p-4 mb-3 rounded-lg shadow-lg transform transition-all duration-300"
        style={{
          backgroundColor: colors.background,
          borderLeft: `4px solid ${colors.border}`,
          color: colors.text
        }}
      >
        <div className="text-xl mr-3">{colors.icon}</div>
        <div className="flex-1">
          <p className="font-medium">{message.title || type}</p>
          <p className="text-sm opacity-90 mt-1">{message.description || message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 text-lg hover:opacity-70 transition-opacity"
          style={{ color: colors.border }}
          aria-label="Close toast"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIds = useRef(new Set()); // Track toast IDs to prevent duplicates

  // Add a toast with duplicate prevention
  const addToast = useCallback((message, type = 'INFO', duration = 5000) => {
    const id = Date.now() + Math.random();
    
    // Prevent duplicate toasts with same message
    const messageString = typeof message === 'string' ? message : JSON.stringify(message);
    if (toastIds.current.has(messageString)) {
      return id;
    }
    
    toastIds.current.add(messageString);

    const toastMessage = typeof message === 'string' 
      ? { description: message } 
      : message;

    const newToast = {
      id,
      message: toastMessage,
      type: type.toUpperCase(),
      duration
    };

    setToasts(prev => {
      // Limit number of toasts to prevent infinite growth
      if (prev.length >= 5) {
        const oldestToast = prev[0];
        toastIds.current.delete(typeof oldestToast.message === 'string' 
          ? oldestToast.message 
          : JSON.stringify(oldestToast.message));
        return [...prev.slice(1), newToast];
      }
      return [...prev, newToast];
    });

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id, messageString);
      }, duration);
    }

    return id;
  }, []);

  // Remove a toast
  const removeToast = useCallback((id, messageString = null) => {
    setToasts(prev => {
      const newToasts = prev.filter(toast => toast.id !== id);
      
      // Clean up toast IDs set
      if (messageString) {
        toastIds.current.delete(messageString);
      } else {
        // If messageString not provided, find and remove
        const removedToast = prev.find(t => t.id === id);
        if (removedToast) {
          const msgString = typeof removedToast.message === 'string' 
            ? removedToast.message 
            : JSON.stringify(removedToast.message);
          toastIds.current.delete(msgString);
        }
      }
      
      return newToasts;
    });
  }, []);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([]);
    toastIds.current.clear();
  }, []);

  // Safe toast methods with error handling
  const toast = {
    success: (message, duration) => {
      try {
        return addToast(message, 'SUCCESS', duration);
      } catch (error) {
        console.error('Toast error:', error);
        return null;
      }
    },
    error: (message, duration) => {
      try {
        return addToast(message, 'ERROR', duration);
      } catch (error) {
        console.error('Toast error:', error);
        return null;
      }
    },
    warning: (message, duration) => {
      try {
        return addToast(message, 'WARNING', duration);
      } catch (error) {
        console.error('Toast error:', error);
        return null;
      }
    },
    info: (message, duration) => {
      try {
        return addToast(message, 'INFO', duration);
      } catch (error) {
        console.error('Toast error:', error);
        return null;
      }
    },
    remove: (id) => {
      try {
        removeToast(id);
      } catch (error) {
        console.error('Toast remove error:', error);
      }
    },
    clearAll: () => {
      try {
        clearAllToasts();
      } catch (error) {
        console.error('Toast clear error:', error);
      }
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};