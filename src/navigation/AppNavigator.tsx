import React, { useState } from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import MyDealsScreen from '../screens/MyDealsScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import RatingScreen from '../screens/RatingScreen';
import { TabType } from '../components/TabBar';
import { RestaurantCardData } from '../components/RestaurantCard';
import { ReclaimedDealData } from '../components/ReclaimedDealCard';

type Screen = 'profile' | 'discover' | 'mydeals' | 'accountDetails' | 'favourites' | 'rating';

const INITIAL_RECLAIMED_DEALS: ReclaimedDealData[] = [
  {
    id: '1',
    restaurantName: 'PAUL Budejovicka',
    address: 'Budejovicka 22/3, Praha 4, 140 00',
    dealName: '1+1 Cheesecake',
    dateReclaimed: '13.10.2026',
    orderId: '123abc456def0',
    paymentMethod: 'Credit card',
    total: '139,00 CZK',
    isRated: false,
  },
  {
    id: '2',
    restaurantName: 'Cafe Central',
    address: 'Václavské nám. 1, Praha 1, 110 00',
    dealName: 'Coffee 2+1',
    dateReclaimed: '10.10.2026',
    orderId: '789xyz012abc',
    paymentMethod: 'Cash',
    total: '89,00 CZK',
    isRated: true,
    rating: 4,
  },
];

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
  const [myDealsActiveTab, setMyDealsActiveTab] = useState<'booked' | 'reclaimed'>('reclaimed');
  const [favourites, setFavourites] = useState<RestaurantCardData[]>(INITIAL_FAVOURITES);
  const [reclaimedDeals, setReclaimedDeals] = useState<ReclaimedDealData[]>(INITIAL_RECLAIMED_DEALS);
  const [ratingDealId, setRatingDealId] = useState<string | null>(null);
  const [initialRating, setInitialRating] = useState<number>(0);

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

  const handleRateDeal = (dealId: string, rating: number = 0) => {
    setRatingDealId(dealId);
    setInitialRating(rating);
    setCurrentScreen('rating');
  };

  const handleRatingBack = () => {
    setRatingDealId(null);
    setInitialRating(0);
    setCurrentScreen('mydeals');
  };

  const handleRatingSubmit = (dealId: string, rating: number, _comment?: string) => {
    setReclaimedDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, isRated: true, rating } : d
      )
    );
    // Navigation happens when user closes the Thank You modal (via onBack)
  };

  const handleRemoveFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((r) => r.id !== id));
  };

  if (currentScreen === 'rating' && ratingDealId) {
    const deal = reclaimedDeals.find((d) => d.id === ratingDealId);
    return (
      <RatingScreen
        deal={deal}
        dealId={ratingDealId}
        initialRating={initialRating}
        onBack={handleRatingBack}
        onSend={(rating, comment) => handleRatingSubmit(ratingDealId, rating, comment)}
      />
    );
  }

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

  return (
    <MyDealsScreen
      onTabPress={handleTabPress}
      reclaimedDeals={reclaimedDeals}
      onRateDeal={handleRateDeal}
      activeTab={myDealsActiveTab}
      onActiveTabChange={setMyDealsActiveTab}
    />
  );
}
