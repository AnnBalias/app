import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';
import ThankYouFeedbackModal from '../components/ThankYouFeedbackModal';
import { ReclaimedDealData } from '../components/ReclaimedDealCard';

interface RatingScreenProps {
  deal: ReclaimedDealData | undefined;
  dealId: string;
  initialRating?: number;
  onBack: () => void;
  onSend: (rating: number, comment?: string) => void;
}

const STAR_COUNT = 5;

export default function RatingScreen({ deal, dealId, initialRating = 0, onBack, onSend }: RatingScreenProps) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const canSend = rating > 0;

  const handleSend = () => {
    if (canSend) {
      onSend(rating, comment.trim() || undefined);
      setShowThankYouModal(true);
    }
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    onBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {deal && (
              <View style={styles.dealInfo}>
                <Text style={styles.dealRestaurant}>{deal.restaurantName}</Text>
                <Text style={styles.dealName}>{deal.dealName}</Text>
              </View>
            )}
            <Text style={styles.title}>How's your experience so far?</Text>
            <Text style={styles.subtitle}>We'd love to know!</Text>

            {/* Stars */}
            <View style={styles.starsRow}>
              {Array.from({ length: STAR_COUNT }).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setRating(i + 1)}
                  style={styles.starButton}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name={i < rating ? 'star' : 'star-outline'}
                    size={40}
                    color={i < rating ? '#FFCC00' : COLORS.textPrimary}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.commentLabel}>Could you describe more about your experience?</Text>
            <TextInput
              style={styles.input}
              placeholder="Start typing here..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!canSend}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={canSend ? [COLORS.gradientStart, COLORS.gradientEnd] : [COLORS.disabled, COLORS.disabled]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButtonGradient}
              >
                <Text style={[styles.sendButtonText, !canSend && styles.sendButtonTextDisabled]}>
                  Send
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <ThankYouFeedbackModal
        visible={showThankYouModal}
        onClose={handleCloseThankYouModal}
      />
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
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  headerSpacer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  dealInfo: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
  },
  dealRestaurant: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  dealName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  starButton: {
    padding: 4,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.separator,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    minHeight: 120,
    marginBottom: 24,
  },
  sendButton: {
    borderRadius: 26,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  sendButtonTextDisabled: {
    color: COLORS.textSecondary,
  },
});
