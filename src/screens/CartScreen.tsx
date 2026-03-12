import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import numeral from 'numeral';

import { useCartStore } from '../store/cartStore';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';

export default function CartScreen() {
  const { items, getTotal, removeItem, increaseQty, decreaseQty } = useCartStore();

  const total = getTotal();

  const handleCheckout = () => {
    if (items.length === 0) return;
    Alert.alert('Checkout', 'Thank you for your purchase!', [
      { text: 'OK', onPress: () => useCartStore.setState({ items: [] }) },
    ]);
  };

  if (items.length === 0) {
    return <EmptyState message="Your cart is empty" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQty(item.product.id)}
            onDecrease={() => decreaseQty(item.product.id)}
            onRemove={() => removeItem(item.product.id)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₹{numeral(total).format('0,0.00')}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalText: { fontSize: 18, fontWeight: '600' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#e91e63' },
  checkoutButton: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});