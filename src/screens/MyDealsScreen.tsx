import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Design tokens from Figma
const COLORS = {
  background: '#FFFFFF',
  textPrimary: '#0A2533',
  textSecondary: '#748189',
  textMuted: '#9E9E9E',
  separator: '#EEEEEE',
  segmentBg: 'rgba(118, 118, 128, 0.12)',
  tabInactive: 'rgba(31, 48, 83, 0.4)',
  tabActive: '#1F3053',
  white: '#FFFFFF',
  gradientStart: '#1F3053',
  gradientEnd: '#456BB9',
};

export default function MyDealsScreen() {
  const [activeTab, setActiveTab] = useState<'booked' | 'reclaimed'>('booked');
  const bookedCount = 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>My Deals</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Separator line */}
        <View style={styles.separator} />

        {/* Segmented control */}
        <View style={styles.segmentedContainer}>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[styles.segment, activeTab === 'booked' && styles.segmentActive]}
              onPress={() => setActiveTab('booked')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'booked' && styles.segmentTextActive,
                ]}
              >
                Booked ({bookedCount})
              </Text>
            </Pressable>
            <View style={styles.segmentDivider} />
            <Pressable
              style={[styles.segment, activeTab === 'reclaimed' && styles.segmentActive]}
              onPress={() => setActiveTab('reclaimed')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'reclaimed' && styles.segmentTextActive,
                ]}
              >
                Reclaimed
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Empty state */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrapper}>
            <MaterialCommunityIcons
              name="receipt-text-outline"
              size={72}
              color={COLORS.textMuted}
            />
          </View>
          <Text style={styles.emptyTitle}>No booked deals yet</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.bookButton}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookButtonGradient}
            >
              <Text style={styles.bookButtonText}>Book a Deal</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tab bar */}
        <View style={styles.tabBar}>
          <View style={styles.tabBarContent}>
            <TouchableOpacity style={styles.tabItem}>
              <MaterialCommunityIcons
                name="account-outline"
                size={28}
                color={COLORS.tabInactive}
              />
              <Text style={styles.tabLabelInactive}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
              <FontAwesome6
                name="compass"
                size={26}
                color={COLORS.tabInactive}
              />
              <Text style={styles.tabLabelInactive}>Discover</Text>
            </TouchableOpacity>

            <View style={styles.tabItem}>
              <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tabItemActive}
              >
                <MaterialCommunityIcons
                  name="receipt-text-outline"
                  size={28}
                  color={COLORS.white}
                />
              </LinearGradient>
              <Text style={styles.tabLabelActive}>My Deals</Text>
            </View>
          </View>
        </View>

        {/* Home indicator (iOS) */}
        {Platform.OS === 'ios' && (
          <View style={styles.homeIndicator} />
        )}
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
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 42,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.separator,
    marginHorizontal: 0,
  },
  segmentedContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: COLORS.segmentBg,
    borderRadius: 16,
    padding: 2,
    height: 36,
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  segmentActive: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  segmentTextActive: {
    fontWeight: '500',
  },
  segmentDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(142, 142, 147, 0.5)',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 120,
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
  bookButton: {
    borderRadius: 26,
    overflow: 'hidden',
    minWidth: 200,
  },
  bookButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    ...Platform.select({
      ios: {
        shadowColor: '#063336',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  tabItemActive: {
    width: 54,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabLabelInactive: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.tabInactive,
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.tabActive,
    marginTop: 4,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: (SCREEN_WIDTH - 134) / 2,
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
