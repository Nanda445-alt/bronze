export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
  category: string;
  description: string;
  popularity: number;
  createdAt: Date;
  isLimitedEdition: boolean;
}