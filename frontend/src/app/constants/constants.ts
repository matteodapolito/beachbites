export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserSettings {
  user?: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  umbrella_count: number;
  gps_coordinates: { lat: number; lng: number }[];
  opening_time: string;
  closing_time: string;
}

export interface Category {
  id: number;
  nome: string;
}

export interface Allergene {
  id: number;
  nome: string;
}

export interface Prodotto {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine: string;
  categoria: string;
  allergeni: number[];
}

export interface MenuSection {
  category: Category;
  products: Prodotto[];
}

export interface CartItem {
  menu_item: Prodotto;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  removeEntireProduct: (itemId: number) => void;
}

export interface OrderElement {
  id: number;
  quantita: 2;
  prezzo_totale: string;
  ordine: 8;
  prodotto: Prodotto;
}

export interface OrderItem {
  id: number;
  elementi: OrderElement[];
  n_ombrellone: number;
  slot_delivery: string;
  data_ordine: Date;
  nome: string;
  cognome: string;
  note?: string;
}
