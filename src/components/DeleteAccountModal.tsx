import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteAccountModal({
  visible,
  onClose,
  onConfirm,
  onCancel,
}: DeleteAccountModalProps) {
  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="close" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.title}>
            Are you sure you want{'\n'}to delete account?
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>No</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    width: '100%',
    maxWidth: 270,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(60, 60, 67, 0.36)',
  },
  actionButton: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 0.5,
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.danger,
  },
  confirmText: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
});
