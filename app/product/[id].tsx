import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const products = {
  '1': { name: 'iPhone 15', price: '25 990 Kč' },
  '2': { name: 'Samsung S24', price: '21 490 Kč' },
  '3': { name: 'MacBook Air', price: '29 990 Kč' },
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <View>
        <Text>Produkt nenalezen ❌</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
    </View>
  );
}