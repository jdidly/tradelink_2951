import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';
import { useRoleContext } from './RoleContextProvider';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roleContext, locationContext, userProfile, switchRole, isHomeowner, isTradie } = useRoleContext();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      roleAccess: 'both'
    },
    {
      label: isHomeowner ? 'My Jobs' : 'Available Jobs',
      path: '/jobs',
      icon: 'Briefcase',
      roleAccess: 'both'
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: 'MessageCircle',
      roleAccess: 'both'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      roleAccess: 'both'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
  };

  const handleLocationChange = (newLocation) => {
    setShowLocationMenu(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const getTrustBadgeColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-warning';
    return 'text-error';
  };

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">TradeLink</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Location Context Badge */}
          <div className="relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="MapPin" size={14} />
              <span className="hidden sm:inline">{locationContext?.suburb}</span>
              <Icon name="ChevronDown" size={12} />
            </button>

            {showLocationMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-medium z-200">
                <div className="p-3">
                  <div className="text-sm font-medium text-foreground mb-2">Current Location</div>
                  <div className="text-sm text-muted-foreground">
                    {locationContext?.suburb}, {locationContext?.state} {locationContext?.postcode}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    iconName="Search"
                    iconPosition="left"
                    onClick={() => handleLocationChange()}
                  >
                    Change Location
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Role Context Indicator */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                isHomeowner 
                  ? 'bg-accent/10 text-accent border border-accent/20' :'bg-primary/10 text-primary border border-primary/20'
              }`}
            >
              <Icon name={isHomeowner ? 'Home' : 'Wrench'} size={14} />
              <span className="hidden sm:inline capitalize">{roleContext}</span>
              <Icon name="ChevronDown" size={12} />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-medium z-200">
                <div className="p-2">
                  <button
                    onClick={() => handleRoleSwitch('homeowner')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                      isHomeowner ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name="Home" size={16} />
                    <span>Homeowner</span>
                    {isHomeowner && <Icon name="Check" size={14} className="ml-auto" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('tradie')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                      isTradie ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name="Wrench" size={16} />
                    <span>Tradie</span>
                    {isTradie && <Icon name="Check" size={14} className="ml-auto" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Indicator */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <div className="relative">
                <Image
                  src={userProfile?.avatar}
                  alt={userProfile?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {userProfile?.verificationStatus === 'verified' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={10} color="white" />
                  </div>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-medium text-foreground">{userProfile?.name}</div>
                <div className={`text-xs font-mono ${getTrustBadgeColor(userProfile?.trustScore)}`}>
                  ★ {userProfile?.trustScore}
                </div>
              </div>
              <Icon name="ChevronDown" size={12} className="text-muted-foreground" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-medium z-200">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={userProfile?.avatar}
                      alt={userProfile?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{userProfile?.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">{roleContext}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trust Score</span>
                      <span className={`font-mono font-medium ${getTrustBadgeColor(userProfile?.trustScore)}`}>
                        ★ {userProfile?.trustScore}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-mono font-medium text-success">{userProfile?.completionRate}%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      iconName="User"
                      iconPosition="left"
                      onClick={() => {
                        handleNavigation('/profile');
                        setShowProfileMenu(false);
                      }}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      iconName="Settings"
                      iconPosition="left"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-error hover:text-error"
                      iconName="LogOut"
                      iconPosition="left"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-150">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;