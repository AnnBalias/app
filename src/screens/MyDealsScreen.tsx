import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';
import TabBar, { TabType } from '../components/TabBar';

interface MyDealsScreenProps {
  onTabPress: (tab: TabType) => void;
}

export default function MyDealsScreen({ onTabPress }: MyDealsScreenProps) {
  const [activeTab, setActiveTab] = useState<'booked' | 'reclaimed'>('booked');
  const bookedCount = 0;
  const insets = useSafeAreaInsets();

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

        <TabBar activeTab="mydeals" onTabPress={onTabPress} bottomInset={insets.bottom} />
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
});
