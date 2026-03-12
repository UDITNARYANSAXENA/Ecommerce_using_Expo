import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import numeral from 'numeral';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useCartStore } from '../store/cartStore';
import { RootStackParamList } from '../models/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { product } = route.params;

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Added!', `${product.title} added to cart.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{numeral(product.price).format('0,0.00')}</Text>

        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#f39c12" />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </Text>
        </View>

        <Text style={styles.category}>Category: {product.category}</Text>

        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, backgroundColor: '#f8f8f8' },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#e91e63', marginBottom: 8 },
  rating: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingText: { marginLeft: 6, color: '#555' },
  category: { fontSize: 14, color: 'gray', marginBottom: 12, textTransform: 'capitalize' },
  description: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 24 },
  button: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});