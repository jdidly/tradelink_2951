import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleContextProvider');
  }
  return context;
};

export const RoleContextProvider = ({ children }) => {
  const [roleContext, setRoleContext] = useState('homeowner');
  const [locationContext, setLocationContext] = useState({
    suburb: 'Sydney CBD',
    state: 'NSW',
    postcode: '2000'
  });
  const [userProfile, setUserProfile] = useState({
    name: 'John Smith',
    avatar: '/assets/images/no_image.png',
    trustScore: 4.8,
    verificationStatus: 'verified',
    completionRate: 95
  });

  useEffect(() => {
    const savedRole = localStorage.getItem('tradelink-role');
    const savedLocation = localStorage.getItem('tradelink-location');
    
    if (savedRole && ['homeowner', 'tradie']?.includes(savedRole)) {
      setRoleContext(savedRole);
    }
    
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setLocationContext(parsedLocation);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const switchRole = (newRole) => {
    if (['homeowner', 'tradie']?.includes(newRole)) {
      setRoleContext(newRole);
      localStorage.setItem('tradelink-role', newRole);
    }
  };

  const updateLocation = (newLocation) => {
    setLocationContext(newLocation);
    localStorage.setItem('tradelink-location', JSON.stringify(newLocation));
  };

  const updateProfile = (profileUpdates) => {
    setUserProfile(prev => ({ ...prev, ...profileUpdates }));
  };

  const value = {
    roleContext,
    locationContext,
    userProfile,
    switchRole,
    updateLocation,
    updateProfile,
    isHomeowner: roleContext === 'homeowner',
    isTradie: roleContext === 'tradie'
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;