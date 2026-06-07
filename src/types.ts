export interface Product {
  id: string;
  name: string;
  tagline: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  volume: string[];
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  family: 'Woody & Smoky' | 'Fresh & Citrusy' | 'Floral & Delicate' | 'Warm & Spicy';
  intensity: 'Soft & Intimate' | 'Moderate & Elegant' | 'Intense & Magnetic';
  character: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    description: string;
    iconName: string; // Dynamic icon reference from lucide
  }[];
}
