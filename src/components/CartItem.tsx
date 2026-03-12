import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import numeral from 'numeral';
import { Ionicons } from '@expo/vector-icons';
import { CartItemType } from '../models/types';

interface Props {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>₹{numeral(product.price).format('0,0.00')}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={onDecrease} style={styles.qtyBtn}>
            <Ionicons name="remove" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.qtyBtn}>
            <Ionicons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.lineTotal}>₹{numeral(lineTotal).format('0,0.00')}</Text>
      </View>

      <TouchableOpacity onPress={onRemove} style={styles.remove}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 1,
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 16, color: '#e91e63', marginBottom: 8 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: { fontSize: 16, marginHorizontal: 12, fontWeight: '600' },
  lineTotal: { fontSize: 15, fontWeight: 'bold' },
  remove: { padding: 8, justifyContent: 'center' },
});