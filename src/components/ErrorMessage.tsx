import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.retry} onPress={onRetry}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  icon: { fontSize: 48, marginBottom: 16 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 24, color: '#555' },
  retry: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  retryText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});