import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from '../constants/theme';
import TabBar, { TabType } from '../components/TabBar';

interface ProfileScreenProps {
  onEditProfile: () => void;
  onTabPress: (tab: TabType) => void;
}

export default function ProfileScreen({ onEditProfile, onTabPress }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const hasFavourites = false;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.separator} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User card */}
          <TouchableOpacity
            style={styles.userCard}
            onPress={onEditProfile}
            activeOpacity={0.8}
          >
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Jan Novak</Text>
              <Text style={styles.userEmail}>jannovak@seznam.cz</Text>
            </View>
            <View style={styles.userCardRight}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={18}
                color={COLORS.textPrimary}
              />
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.textPrimary}
              />
            </View>
          </TouchableOpacity>

          {/* Stats cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Deals reclaimed</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statNumber}>19</Text>
                <Text style={styles.statUnit}>deals</Text>
              </View>
              <View style={styles.statIcon}>
                <FontAwesome6 name="handshake" size={40} color={COLORS.textMuted} />
              </View>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Money saved</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statNumber}>9 999</Text>
                <Text style={styles.statUnit}>CZK</Text>
              </View>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={40}
                  color={COLORS.textMuted}
                />
              </View>
            </View>
          </View>

          {/* Favourites section */}
          <View style={styles.favouritesHeader}>
            <Text style={styles.favouritesTitle}>Favourites</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {hasFavourites ? (
            <View style={styles.favouritesList}>
              {/* Favourite items would go here */}
            </View>
          ) : (
            <View style={styles.emptyFavourites}>
              <View style={styles.emptyIconWrapper}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={72}
                  color={COLORS.textMuted}
                />
              </View>
              <Text style={styles.emptyTitle}>No favourites yet</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.searchButton}>
                <LinearGradient
                  colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.searchButtonGradient}
                >
                  <Text style={styles.searchButtonText}>Search a Deal</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <TabBar activeTab="profile" onTabPress={onTabPress} bottomInset={insets.bottom} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 42,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.separator,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 140,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMuted,
  },
  userCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    minHeight: 189,
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
  statLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.tabActive,
    marginBottom: 24,
    textAlign: 'center',
  },
  statValueRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  statIcon: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  favouritesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  favouritesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.tabActive,
  },
  favouritesList: {
    minHeight: 100,
  },
  emptyFavourites: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIconWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  searchButton: {
    borderRadius: 26,
    overflow: 'hidden',
    minWidth: 200,
  },
  searchButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
