import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#e91e63" />
      <Text style={styles.text}>Loading products...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 12, fontSize: 16, color: '#555' },
});