import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function TabLayout() {
  const router = useRouter();
  const { cart } = useCart();

  const cartCount = cart.length;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* HOME / PRODUKTY */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Produkty',

          headerLeft: () => (
            <Pressable
              onPress={() => router.push('/(tabs)/cart')}
              style={{ marginLeft: 15 }}
            >
              <View style={{ position: 'relative' }}>
                <Text style={{ fontSize: 22 }}>🛒</Text>

                {cartCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -10,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 11 }}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ),
        }}
      />

      {/* KOŠÍK TAB */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Košík',
        }}
      />
    </Tabs>
  );
}