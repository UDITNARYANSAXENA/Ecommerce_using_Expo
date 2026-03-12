import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import numeral from 'numeral';

import { getProducts } from '../services/api';
import { Product } from '../models/types';
import { RootStackParamList } from '../models/types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;
  if (products.length === 0) return <EmptyState message="No products found" />;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 8 },
}); 