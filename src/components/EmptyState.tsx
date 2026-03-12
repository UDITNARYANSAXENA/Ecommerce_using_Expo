import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  icon: { fontSize: 64, marginBottom: 16 },
  message: { fontSize: 18, color: '#777', textAlign: 'center' },
});