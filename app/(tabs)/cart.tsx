import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart() as {
    cart: Product[];
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  };

  const totalItems = cart.length;

  // 💰 výpočet celkové ceny pro každý obchod
  const calculateStoreTotals = (cart: Product[]) => {
    const totals: Record<string, number> = {};

    cart.forEach((item) => {
      item.stores.forEach((store) => {
        totals[store.name] = (totals[store.name] || 0) + store.price;
      });
    });

    return Object.entries(totals)
      .map(([name, price]) => ({ name, price }))
      .sort((a, b) => a.price - b.price);
  };

  const storeTotals = calculateStoreTotals(cart);
  const cheapestStore = storeTotals.length > 0 ? storeTotals[0] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Košík 🛒</Text>

      <Text style={styles.subtitle}>Položky: {totalItems}</Text>

      {/* 🟢 nejlevnější obchod */}
      {cheapestStore && (
        <View style={styles.bestBox}>
          <Text style={styles.bestText}>
            🟢 Nejlevnější obchod: {cheapestStore.name} – {cheapestStore.price} Kč
          </Text>
        </View>
      )}

      {/* 📊 porovnání obchodů */}
      {storeTotals.length > 0 && (
        <View style={styles.storeBox}>
          <Text style={styles.subTitle}>Porovnání obchodů:</Text>

          {storeTotals.map((store) => (
            <View key={store.name} style={styles.storeRow}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storePrice}>{store.price} Kč</Text>
            </View>
          ))}
        </View>
      )}

      {/* 🧺 košík */}
      {cart.length === 0 ? (
        <Text style={styles.empty}>Košík je prázdný 😕</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => {
              const cheapest = Math.min(
                ...item.stores.map((s) => s.price)
              );

              return (
                <View style={styles.item}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>od {cheapest} Kč</Text>
                  </View>

                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeText}>Smazat</Text>
                  </Pressable>
                </View>
              );
            }}
          />

          <Pressable onPress={clearCart} style={styles.clearBtn}>
            <Text style={styles.clearText}>Vyprázdnit košík</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },

  bestBox: {
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  bestText: {
    fontWeight: '700',
    color: '#166534',
  },

  storeBox: {
    marginBottom: 15,
  },

  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  storeName: {
    fontSize: 14,
  },

  storePrice: {
    fontSize: 14,
    fontWeight: '600',
  },

  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  removeBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  removeText: {
    color: '#fff',
    fontSize: 12,
  },

  clearBtn: {
    marginTop: 20,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  clearText: {
    color: '#fff',
    fontWeight: '600',
  },
});