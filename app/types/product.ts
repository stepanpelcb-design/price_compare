export type Store = {
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  stores: Store[];
};