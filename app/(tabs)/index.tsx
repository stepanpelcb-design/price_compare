import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'Mléko 1L',
    category: 'Mléčné výrobky',
    subcategory: 'Mléko',
    image:
      'https://www.madeta.cz/media/thumbs/shop/thumb_3000x3000__16103-jihoceske-mleko-trvanlive-polotucne-1-5-1_l.jpeg?v=1776092433',
    stores: [
      { name: 'Rohlík', price: 29 },
      { name: 'Tesco', price: 32 },
      { name: 'Albert', price: 31 },
    ],
  },
  {
    id: '2',
    name: 'Banány 1kg',
    category: 'Ovoce',
    subcategory: 'Banány',
    image:
      'https://img.kupi.cz/kupi/thumbs/banany-premium-dole_box_1920_1080.jpg',
    stores: [
      { name: 'Rohlík', price: 39 },
      { name: 'Tesco', price: 42 },
      { name: 'Albert', price: 37 },
    ],
  },
  {
    id: '3',
    name: 'Vejce 10ks',
    category: 'Základní potraviny',
    subcategory: 'Vejce',
    image:
      'https://rumunskepotraviny.cz/wp-content/uploads/2025/11/252_vejce.webp',
    stores: [
      { name: 'Rohlík', price: 59 },
      { name: 'Tesco', price: 63 },
      { name: 'Albert', price: 57 },
    ],
  },
];

const categories = [
  'Vše',
  'Mléčné výrobky',
  'Pečivo',
  'Maso a uzeniny',
  'Ryby',
  'Ovoce',
  'Zelenina',
  'Nápoje',
  'Trvanlivé potraviny',
  'Koření',
  'Sladkosti',
  'Mražené',
  'Drogerie',
  'Dětská výživa',
  'Zvířecí krmivo',
];

const subcategoriesMap: Record<string, string[]> = {
  'Mléčné výrobky': ['Vše', 'Mléko', 'Jogurty', 'Sýry', 'Tvarohy'],
  Pečivo: ['Vše', 'Slané pečivo', 'Sladké pečivo', 'Chléb', 'Bagety'],
  Ovoce: ['Vše', 'Banány', 'Jablka', 'Citrusy'],
  Zelenina: ['Vše', 'Rajčata', 'Okurky', 'Brambory'],
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Vše');
  const [subcategory, setSubcategory] = useState('Vše');

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);

  const subcategories =
    category !== 'Vše' ? subcategoriesMap[category] || ['Vše'] : [];

  const showSubcategoryToggle =
    category !== 'Vše' && subcategories.length > 3;

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'Vše' || item.category === category;

    const matchesSubcategory =
      subcategory === 'Vše' || item.subcategory === subcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Produkty 🛒</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Hledat produkt..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* ================= CATEGORY ================= */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Kategorie</Text>

        <Pressable onPress={() => setShowAllCategories(!showAllCategories)}>
          <Text style={styles.filterToggle}>
            {showAllCategories ? 'Skrýt' : 'Vše'}
          </Text>
        </Pressable>
      </View>

      {showAllCategories ? (
        <View style={styles.verticalWrap}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => {
                setCategory(cat);
                setSubcategory('Vše');
              }}
              style={[
                styles.categoryBtn,
                category === cat && styles.categoryBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => {
                setCategory(cat);
                setSubcategory('Vše');
              }}
              style={[
                styles.categoryBtn,
                category === cat && styles.categoryBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ================= SUBCATEGORY ================= */}
      {category !== 'Vše' && (
        <>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Podkategorie</Text>

            {showSubcategoryToggle && (
              <Pressable
                onPress={() =>
                  setShowAllSubcategories(!showAllSubcategories)
                }
              >
                <Text style={styles.filterToggle}>
                  {showAllSubcategories ? 'Skrýt' : 'Vše'}
                </Text>
              </Pressable>
            )}
          </View>

          {!showSubcategoryToggle ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {subcategories.map((sub) => (
                <Pressable
                  key={sub}
                  onPress={() => setSubcategory(sub)}
                  style={[
                    styles.categoryBtn,
                    subcategory === sub && styles.categoryBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      subcategory === sub && styles.categoryTextActive,
                    ]}
                  >
                    {sub}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : showAllSubcategories ? (
            <View style={styles.verticalWrap}>
              {subcategories.map((sub) => (
                <Pressable
                  key={sub}
                  onPress={() => setSubcategory(sub)}
                  style={[
                    styles.categoryBtn,
                    subcategory === sub && styles.categoryBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      subcategory === sub && styles.categoryTextActive,
                    ]}
                  >
                    {sub}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {subcategories.map((sub) => (
                <Pressable
                  key={sub}
                  onPress={() => setSubcategory(sub)}
                  style={[
                    styles.categoryBtn,
                    subcategory === sub && styles.categoryBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      subcategory === sub && styles.categoryTextActive,
                    ]}
                  >
                    {sub}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </>
      )}

      {/* ================= PRODUCTS ================= */}
      {filteredProducts.map((item) => {
        const cheapest = Math.min(...item.stores.map((s) => s.price));

        return (
          <Link key={item.id} href={`/product/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>
                {item.category} • {item.subcategory}
              </Text>

              <Text style={styles.price}>od {cheapest} Kč</Text>
            </Pressable>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },

  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: { fontSize: 30, fontWeight: '800', marginBottom: 15 },

  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
  },

  filterTitle: { fontSize: 14, fontWeight: '700' },

  filterToggle: { fontSize: 12, color: '#2563EB' },

  verticalWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },

  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8,
  },

  categoryBtnActive: { backgroundColor: '#111' },

  categoryText: { fontSize: 12, color: '#333' },

  categoryTextActive: { color: '#fff' },

  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  image: { width: '100%', height: 160 },

  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginHorizontal: 12,
  },

  category: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 12,
    marginTop: 4,
  },

  price: {
    color: '#16A34A',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
  },
});