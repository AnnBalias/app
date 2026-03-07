import React, { useState } from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import MyDealsScreen from '../screens/MyDealsScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import { TabType } from '../components/TabBar';

type Screen = 'profile' | 'discover' | 'mydeals' | 'accountDetails';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mydeals');
  const [activeTab, setActiveTab] = useState<TabType>('mydeals');

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'profile') setCurrentScreen('profile');
    else if (tab === 'discover') setCurrentScreen('discover');
    else setCurrentScreen('mydeals');
  };

  const handleEditProfile = () => {
    setCurrentScreen('accountDetails');
  };

  const handleBackFromAccountDetails = () => {
    setCurrentScreen('profile');
  };

  if (currentScreen === 'accountDetails') {
    return (
      <AccountDetailsScreen onBack={handleBackFromAccountDetails} />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onEditProfile={handleEditProfile}
        onTabPress={handleTabPress}
      />
    );
  }

  if (currentScreen === 'discover') {
    return <DiscoverScreen onTabPress={handleTabPress} />;
  }

  return <MyDealsScreen onTabPress={handleTabPress} />;
}
