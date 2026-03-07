import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from '../constants/theme';

export type TabType = 'profile' | 'discover' | 'mydeals';

interface TabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
  bottomInset?: number;
}

export default function TabBar({ activeTab, onTabPress, bottomInset = 12 }: TabBarProps) {
  const paddingBottom = Math.max(bottomInset, 12);

  return (
    <View style={[styles.tabBar, { paddingBottom }]}>
      <View style={styles.tabBarContent}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabPress('profile')}
          activeOpacity={0.7}
        >
          {activeTab === 'profile' ? (
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabItemActive}
            >
              <MaterialCommunityIcons
                name="account"
                size={28}
                color={COLORS.white}
              />
            </LinearGradient>
          ) : (
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color={COLORS.tabInactive}
            />
          )}
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'profile' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabPress('discover')}
          activeOpacity={0.7}
        >
          {activeTab === 'discover' ? (
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabItemActive}
            >
              <FontAwesome6 name="compass" size={26} color={COLORS.white} />
            </LinearGradient>
          ) : (
            <FontAwesome6
              name="compass"
              size={26}
              color={COLORS.tabInactive}
            />
          )}
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'discover' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Discover
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabPress('mydeals')}
          activeOpacity={0.7}
        >
          {activeTab === 'mydeals' ? (
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
          ) : (
            <MaterialCommunityIcons
              name="receipt-text-outline"
              size={28}
              color={COLORS.tabInactive}
            />
          )}
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'mydeals' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            My Deals
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingBottom: 12,
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
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelInactive: {
    color: COLORS.tabInactive,
  },
  tabLabelActive: {
    color: COLORS.tabActive,
  },
});
