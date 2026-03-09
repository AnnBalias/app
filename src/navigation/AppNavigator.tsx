import React, { useState } from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import MyDealsScreen from '../screens/MyDealsScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { TabType } from '../components/TabBar';
import { RestaurantCardData } from '../components/RestaurantCard';

type Screen = 'profile' | 'discover' | 'mydeals' | 'accountDetails' | 'favourites';

const INITIAL_FAVOURITES: RestaurantCardData[] = [
  {
    id: '1',
    name: 'Paul Budejovicka',
    category: 'Food',
    categoryEmoji: '🥗',
    rating: 5.0,
    distance: '1.1 km',
    deals: ['Dish 1+1', 'Discount 30%'],
  },
  {
    id: '2',
    name: 'Cafe Central',
    category: 'Coffee',
    categoryEmoji: '☕️',
    rating: 4.8,
    distance: '0.5 km',
    deals: ['Coffee 2+1'],
  },
];

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mydeals');
  const [activeTab, setActiveTab] = useState<TabType>('mydeals');
  const [favourites, setFavourites] = useState<RestaurantCardData[]>(INITIAL_FAVOURITES);

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

  const handleSeeAllFavourites = () => {
    setCurrentScreen('favourites');
  };

  const handleBackFromFavourites = () => {
    setCurrentScreen('profile');
  };

  const handleRemoveFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((r) => r.id !== id));
  };

  if (currentScreen === 'accountDetails') {
    return (
      <AccountDetailsScreen onBack={handleBackFromAccountDetails} />
    );
  }

  if (currentScreen === 'favourites') {
    return (
      <FavouritesScreen
        favourites={favourites}
        onBack={handleBackFromFavourites}
        onRemoveFavourite={handleRemoveFavourite}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        favourites={favourites}
        onEditProfile={handleEditProfile}
        onTabPress={handleTabPress}
        onSeeAllFavourites={handleSeeAllFavourites}
        onRemoveFavourite={handleRemoveFavourite}
      />
    );
  }

  if (currentScreen === 'discover') {
    return <DiscoverScreen onTabPress={handleTabPress} />;
  }

  return <MyDealsScreen onTabPress={handleTabPress} />;
}
