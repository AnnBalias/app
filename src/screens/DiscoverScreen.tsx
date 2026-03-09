import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from '../constants/theme';
import TabBar, { TabType } from '../components/TabBar';
import RestaurantCard, { RestaurantCardData } from '../components/RestaurantCard';

interface DiscoverScreenProps {
  onTabPress: (tab: TabType) => void;
}

interface Category {
  id: string;
  emoji: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { id: '1', emoji: '🥗', label: 'Bowls' },
  { id: '2', emoji: '🍔', label: 'Burgers' },
  { id: '3', emoji: '☕️', label: 'Coffee' },
  { id: '4', emoji: '🍕', label: 'Pizza' },
  { id: '5', emoji: '🌯', label: 'Durum' },
];

const MOCK_DEALS: RestaurantCardData[] = [
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
    name: 'Paul Budejovicka',
    category: 'Food',
    categoryEmoji: '🥗',
    rating: 5.0,
    distance: '1.1 km',
    deals: ['Dish 1+1', 'Discount 30%'],
  },
];

export default function DiscoverScreen({ onTabPress }: DiscoverScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(true);

  const renderDealCard = ({ item }: { item: RestaurantCardData }) => (
    <RestaurantCard
      restaurant={item}
      variant="full"
      isFavourite={false}
      onFavouritePress={() => {}}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header - Location */}
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <Ionicons
              name="location"
              size={24}
              color={COLORS.textPrimary}
              style={styles.locationIcon}
            />
            <View>
              <Text style={styles.locationLabel}>Current location:</Text>
              <Text style={styles.locationValue}>Prague 4, Ulica kakayato</Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Search row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="location-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={22}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === index && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(index)}
            >
              <Text style={styles.categoryChipEmoji}>{cat.emoji}</Text>
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === index && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort + Toggle */}
        <View style={styles.sortRow}>
          <View style={styles.sortBy}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <Text style={styles.sortValue}>Distance</Text>
            <Ionicons name="chevron-up" size={14} color={COLORS.textPrimary} />
          </View>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsListView(!isListView)}
          >
            {isListView ? (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={20}
                color={COLORS.textPrimary}
              />
            ) : (
              <MaterialCommunityIcons
                name="map-outline"
                size={20}
                color={COLORS.textPrimary}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Deal cards list */}
        <FlatList
          data={MOCK_DEALS}
          renderItem={renderDealCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: 120 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        />

        <TabBar activeTab="discover" onTabPress={onTabPress} bottomInset={insets.bottom} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.separator,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    paddingBottom: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.separator,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.categoryActive,
    borderColor: COLORS.separator,
  },
  categoryChipEmoji: {
    fontSize: 18,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  categoryChipTextActive: {
    color: COLORS.textPrimary,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sortBy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  sortValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tabActive,
  },
  toggleButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.separator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
});
