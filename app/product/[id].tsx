import { useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { products } from '../../data/products';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produkt nenalezen ❌</Text>
      </View>
    );
  }

  const sortedStores = [...product.stores].sort(
    (a, b) => a.price - b.price
  );

  const cheapest = sortedStores[0]?.price;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.name}>
        {product.name} {product.unit && `• ${product.unit}`}
      </Text>

      <Text style={styles.category}>
        {product.category} • {product.subcategory}
      </Text>

      <Text style={styles.section}>Ceny v obchodech</Text>

      {sortedStores.map((store) => (
        <View
          key={store.name}
          style={[
            styles.storeRow,
            store.price === cheapest && styles.cheapest,
          ]}
        >
          <Text>{store.name}</Text>
          <Text style={styles.price}>{store.price} Kč</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  image: {
    width: '100%',
    height: 220,
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    margin: 12,
  },

  category: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 12,
  },

  section: {
    fontSize: 16,
    fontWeight: '700',
    margin: 12,
  },

  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
  },

  cheapest: {
    borderWidth: 2,
    borderColor: '#16A34A',
  },

  price: {
    fontWeight: '700',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});