import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import numeral from 'numeral';
import { Product } from '../models/types';

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>₹{numeral(product.price).format('0,0.00')}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 140, backgroundColor: '#f8f8f8' },
  info: { padding: 10 },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#e91e63' },
  category: { fontSize: 12, color: 'gray', marginTop: 4, textTransform: 'capitalize' },
});