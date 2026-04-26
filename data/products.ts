// data/products.ts

export type Store = {
  name: string;
  price: number;
  url?: string;
  inStock?: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  unit?: string;
  stores: Store[];
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Mléko',
    category: 'Mléčné výrobky',
    subcategory: 'Mléko',
    unit: '1L',
    image:
      'https://www.madeta.cz/media/thumbs/shop/thumb_3000x3000__16103-jihoceske-mleko-trvanlive-polotucne-1-5-1_l.jpeg?v=1776092433',
    stores: [
      {
        name: 'Rohlík',
        price: 29,
        inStock: true,
      },
      {
        name: 'Tesco',
        price: 32,
        inStock: true,
      },
      {
        name: 'Albert',
        price: 31,
        inStock: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Banány',
    category: 'Ovoce',
    subcategory: 'Banány',
    unit: '1kg',
    image:
      'https://img.kupi.cz/kupi/thumbs/banany-premium-dole_box_1920_1080.jpg',
    stores: [
      {
        name: 'Rohlík',
        price: 39,
        inStock: true,
      },
      {
        name: 'Tesco',
        price: 42,
        inStock: true,
      },
      {
        name: 'Albert',
        price: 37,
        inStock: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Vejce',
    category: 'Základní potraviny',
    subcategory: 'Vejce',
    unit: '10ks',
    image:
      'https://rumunskepotraviny.cz/wp-content/uploads/2025/11/252_vejce.webp',
    stores: [
      {
        name: 'Rohlík',
        price: 59,
        inStock: true,
      },
      {
        name: 'Tesco',
        price: 63,
        inStock: true,
      },
      {
        name: 'Albert',
        price: 57,
        inStock: true,
      },
    ],
  },
];