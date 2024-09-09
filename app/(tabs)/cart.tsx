import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen () {

  const product = {
    name: 'Dunk Low 2021',
    price: 100,
  };

  // Other cost details
  const shipping = 5;
  const tax = 10;

  // Total calculation
  const total = product.price + shipping + tax;
  return (
    <View style={styles.container}>
   
    <Text style={styles.headerText}>Check out</Text>

    {/* Shipping Address */}
    <View style={styles.section}>
      <Text style={styles.label}>Ship to</Text>
      <Text style={styles.value}>Evelyn Quan</Text>
      <Text style={styles.value}>Appt 12C New York St 3, NY, USA</Text>
    </View>

    {/* Shipping Option */}
    <View style={styles.section}>
      <Text style={styles.label}>Shipping option</Text>
      <Text style={styles.value}>Thurs 11 Apr - Sun 14 Apr</Text>
      <Text style={styles.value}>Economy service</Text>
    </View>

    {/* Payment Details */}
    <View style={styles.section}>
      <Text style={styles.label}>Payment details</Text>
      <Text style={styles.value}>Apple Pay</Text>
    </View>

    {/* Billing Address */}
    <View style={styles.section}>
      <Text style={styles.label}>Billing address</Text>
      <Text style={styles.value}>Same shipping address</Text>
    </View>

   
    {/* Add Promo Code */}
    <Text style={styles.addPromo}>+ Add promocode / giftcard</Text>

    {/* Order Summary */}
    <View style={styles.orderSummary}>
      <Text style={styles.summaryLabel}>Subtotal:</Text>
      
    </View>
    <View style={styles.orderSummary}>
      <Text style={styles.summaryLabel}>{product.name}</Text>
      <Text style={styles.summaryValue}>${product.price}</Text>
    </View>
   
    <View style={styles.orderSummary}>
      <Text style={styles.summaryLabel}>Shipping</Text>
      <Text style={styles.summaryValue}>${shipping}</Text>
    </View>
    <View style={styles.orderSummary}>
      <Text style={styles.summaryLabel}>Tax</Text>
      <Text style={styles.summaryValue}>${tax}</Text>
    </View>

    {/* Total Amount */}
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.totalValue}>${total}</Text>
    </View>

    {/* Place Order Button */}
    <TouchableOpacity style={styles.placeOrderButton}>
      <Text style={styles.placeOrderText}>Place order</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    backgroundColor: '#f4f1eb',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2b2fff',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  addPromo: {
    fontSize: 14,
    color: '#2b2fff',
    marginBottom: 20,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#2b2fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});