import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';

export interface ReclaimedDealData {
  id: string;
  restaurantName: string;
  address: string;
  dealName: string;
  dateReclaimed: string;
  orderId: string;
  paymentMethod: string;
  total: string;
  isRated: boolean;
  rating?: number; // 0-5, only when isRated
}

interface ReclaimedDealCardProps {
  deal: ReclaimedDealData;
  onRatePress?: (initialRating: number) => void;
}

const STAR_COUNT = 5;

export default function ReclaimedDealCard({ deal, onRatePress }: ReclaimedDealCardProps) {
  const handleStarPress = (rating: number) => {
    if (!deal.isRated && onRatePress) {
      onRatePress(rating);
    }
  };

  const displayRating = deal.isRated ? (deal.rating ?? 0) : 0;

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBorder}
      >
        <View style={styles.cardInner}>
          {/* Redeemed strip - full-width gradient at top */}
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.redeemedStrip}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={COLORS.white}
            />
            <Text style={styles.redeemedText}>Redeemed</Text>
          </LinearGradient>

          {/* White content */}
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.logoPlaceholder} />
              <View style={styles.headerText}>
                <Text style={styles.restaurantName}>{deal.restaurantName}</Text>
                <Text style={styles.address}>{deal.address}</Text>
              </View>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <View style={styles.detailCol}>
                  <Text style={styles.label}>RECLAIMED</Text>
                  <Text style={styles.value}>{deal.dateReclaimed}</Text>
                </View>
                <View style={styles.detailColRight}>
                  <Text style={styles.label}>ORDER ID</Text>
                  <Text style={styles.value}>{deal.orderId}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailCol}>
                  <Text style={styles.label}>DEAL</Text>
                  <Text style={styles.value}>{deal.dealName}</Text>
                </View>
                <View style={styles.detailColRight}>
                  <Text style={styles.label}>TOTAL</Text>
                  <Text style={styles.value}>{deal.total}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailCol}>
                  <Text style={styles.label}>PAYMENT METHOD</Text>
                  <Text style={styles.value}>{deal.paymentMethod}</Text>
                </View>
              </View>
            </View>

            {/* Dashed separator */}
            <View style={styles.separator} />

            {/* Rating section */}
            {!deal.isRated && (
              <Text style={styles.ratePrompt}>How was your overall experience?</Text>
            )}
            <View style={styles.starsRow}>
              {Array.from({ length: STAR_COUNT }).map((_, i) => {
                const starRating = i + 1;
                const isFilled = i < displayRating;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleStarPress(starRating)}
                    disabled={deal.isRated}
                    activeOpacity={deal.isRated ? 1 : 0.7}
                    style={styles.starButton}
                  >
                    <MaterialCommunityIcons
                      name={isFilled ? 'star' : 'star-outline'}
                      size={24}
                      color={isFilled ? '#FFCC00' : COLORS.textPrimary}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
  cardBorder: {
    borderRadius: 16,
    padding: 2,
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
  cardInner: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
  redeemedStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  redeemedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 17.6,
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 17.4,
  },
  detailsGrid: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailCol: {
    flex: 1,
  },
  detailColRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  separator: {
    height: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.separator,
    marginBottom: 16,
  },
  ratePrompt: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  starButton: {
    padding: 4,
  },
  star: {
    marginHorizontal: 0,
  },
});
