import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';

export interface RestaurantCardData {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  rating: number;
  distance: string;
  deals?: string[];
}

interface RestaurantCardProps {
  restaurant: RestaurantCardData;
  isFavourite?: boolean;
  onPress?: () => void;
  onFavouritePress?: () => void;
  variant?: 'compact' | 'full' | 'horizontal';
}

export default function RestaurantCard({
  restaurant,
  isFavourite = true,
  onPress,
  onFavouritePress,
  variant = 'compact',
}: RestaurantCardProps) {
  if (variant === 'horizontal') {
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.horizontalImage}>
          <View style={styles.imagePlaceholder} />
          <TouchableOpacity
            style={styles.horizontalLoveButton}
            onPress={onFavouritePress}
          >
            <MaterialCommunityIcons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavourite ? COLORS.danger : COLORS.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.horizontalCategoryBadge}>
            <Text style={styles.horizontalCategoryEmoji}>{restaurant.categoryEmoji}</Text>
            <Text style={styles.horizontalCategoryText}>{restaurant.category}</Text>
          </View>
        </View>
        <View style={styles.horizontalInfo}>
          <Text style={styles.horizontalName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.horizontalMeta}>
            <View style={styles.horizontalMetaItem}>
              <MaterialCommunityIcons name="star" size={12} color="#FFCC00" />
              <Text style={styles.horizontalMetaText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.horizontalMetaItem}>
              <Ionicons name="location" size={12} color={COLORS.textMuted} />
              <Text style={styles.horizontalMetaText}>{restaurant.distance}</Text>
            </View>
          </View>
          {restaurant.deals && restaurant.deals.length > 0 && (
            <View style={styles.horizontalDeals}>
              {restaurant.deals.slice(0, 2).map((deal) => (
                <LinearGradient
                  key={deal}
                  colors={[COLORS.dealGradientStart, COLORS.dealGradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.horizontalDealTag}
                >
                  <Text style={styles.horizontalDealTagText}>{deal}</Text>
                </LinearGradient>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'full') {
    return (
      <TouchableOpacity
        style={styles.fullCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.fullImageContainer}>
          <View style={styles.imagePlaceholder} />
          <TouchableOpacity
            style={styles.loveButton}
            onPress={onFavouritePress}
          >
            <MaterialCommunityIcons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavourite ? COLORS.danger : COLORS.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryEmoji}>{restaurant.categoryEmoji}</Text>
            <Text style={styles.categoryText}>{restaurant.category}</Text>
          </View>
        </View>
        <View style={styles.fullInfo}>
          <View style={styles.dealNameRow}>
            <View style={styles.logoPlaceholder} />
            <Text style={styles.fullName}>{restaurant.name}</Text>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="star" size={14} color="#FFCC00" />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={14} color={COLORS.textPrimary} />
              <Text style={styles.metaText}>{restaurant.distance}</Text>
            </View>
          </View>
          {restaurant.deals && restaurant.deals.length > 0 && (
            <View style={styles.dealTags}>
              {restaurant.deals.map((deal) => (
                <LinearGradient
                  key={deal}
                  colors={[COLORS.dealGradientStart, COLORS.dealGradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dealTag}
                >
                  <Text style={styles.dealTagText}>{deal}</Text>
                </LinearGradient>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // Compact variant for Profile favourites
  return (
    <TouchableOpacity
      style={styles.compactCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.compactImage}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.categoryBadgeCompact}>
          <Text style={styles.categoryEmojiSmall}>{restaurant.categoryEmoji}</Text>
        </View>
      </View>
      <View style={styles.compactInfo}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.compactActions}>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={onFavouritePress}
            >
              <MaterialCommunityIcons
                name={isFavourite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavourite ? COLORS.danger : COLORS.textMuted}
              />
            </TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </View>
        </View>
        <View style={styles.compactMeta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="star" size={12} color="#FFCC00" />
            <Text style={styles.metaTextSmall}>{restaurant.rating}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={12} color={COLORS.textMuted} />
            <Text style={styles.metaTextSmall}>{restaurant.distance}</Text>
          </View>
        </View>
        {restaurant.deals && restaurant.deals.length > 0 && (
          <View style={styles.compactDeals}>
            {restaurant.deals.slice(0, 2).map((deal) => (
              <LinearGradient
                key={deal}
                colors={[COLORS.dealGradientStart, COLORS.dealGradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.dealTagSmall}
              >
                <Text style={styles.dealTagTextSmall}>{deal}</Text>
              </LinearGradient>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Full card (Discover style)
  fullCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.separator,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  fullImageContainer: {
    height: 165,
    backgroundColor: '#E8E8E8',
    position: 'relative',
  },
  fullInfo: {
    padding: 16,
  },
  fullName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  dealNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.separator,
    marginRight: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    opacity: 0.85,
  },
  dealTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dealTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
  },
  dealTagText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D9D9D9',
  },
  loveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 40,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },

  // Compact card (Profile favourites)
  compactCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  compactImage: {
    width: 120,
    height: 120,
    backgroundColor: '#E8E8E8',
    position: 'relative',
  },
  compactInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  compactName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  compactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heartButton: {
    padding: 4,
  },
  categoryBadgeCompact: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmojiSmall: {
    fontSize: 16,
  },
  compactMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaTextSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  compactDeals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dealTagSmall: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dealTagTextSmall: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },

  // Horizontal card (Profile favourites carousel)
  horizontalCard: {
    width: 200,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  horizontalImage: {
    height: 100,
    backgroundColor: '#E8E8E8',
    position: 'relative',
  },
  horizontalLoveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalCategoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  horizontalCategoryEmoji: {
    fontSize: 14,
  },
  horizontalCategoryText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  horizontalInfo: {
    padding: 10,
  },
  horizontalName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  horizontalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  horizontalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  horizontalMetaText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  horizontalDeals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  horizontalDealTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  horizontalDealTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
  },
});
