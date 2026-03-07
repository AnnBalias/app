import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';
import DeleteAccountModal from '../components/DeleteAccountModal';

interface AccountDetailsScreenProps {
  onBack: () => void;
}

interface FieldConfig {
  label: string;
  value: string;
  optional?: boolean;
}

export default function AccountDetailsScreen({ onBack }: AccountDetailsScreenProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Jan',
    email: 'jannovak@seznam.cz',
    phone: '',
    country: 'Czechia',
    gender: '',
  });

  const fields: FieldConfig[] = [
    { label: 'Name', value: formData.name },
    { label: 'Email', value: formData.email },
    { label: 'Phone number', value: formData.phone, optional: true },
    { label: 'Country', value: formData.country },
    { label: 'Gender', value: formData.gender, optional: true },
  ];

  const hasChanges = false; // Would track form dirty state

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Account details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.separator} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Personal info</Text>

          {fields.map((field) => (
            <TouchableOpacity
              key={field.label}
              style={styles.fieldCard}
              activeOpacity={0.8}
            >
              <Text style={styles.fieldLabel}>
                {field.label}
                {field.optional && (
                  <Text style={styles.fieldOptional}> (optional)</Text>
                )}
              </Text>
              <View style={styles.fieldRight}>
                <Text style={styles.fieldValue} numberOfLines={1}>
                  {field.value || (field.optional ? '(optional)' : '-')}
                </Text>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={18}
                  color={COLORS.textMuted}
                  style={styles.fieldIcon}
                />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
            disabled={!hasChanges}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.saveButtonText,
                !hasChanges && styles.saveButtonTextDisabled,
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          onBack();
        }}
        onCancel={() => setShowDeleteModal(false)}
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 8,
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
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
  },
  fieldOptional: {
    fontWeight: '400',
    textTransform: 'none',
  },
  fieldRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMuted,
    maxWidth: 180,
  },
  fieldIcon: {
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: COLORS.gradientEnd,
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  saveButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  deleteButton: {
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.danger,
  },
});
