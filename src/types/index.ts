export type DaypartStatus = 'all_unlocked' | 'pizza_only_locked' | 'both_locked';

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelect?: number;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isNew?: boolean;
  badge?: string;
  isAlcohol?: boolean;
  dineInOnly?: boolean;
  tastingNotes?: string;
  drinkType?: 'draft' | 'cocktail' | 'refresher';
  daypartLock?: {
    unlockedAtHour: number; // e.g., 16 for 4:00 PM, 17 for 5:00 PM
    label: string; // e.g., "Available After 4:00 PM"
    categoryNote?: string;
  };
  portionOptions?: {
    name: string;
    price: number;
  }[];
  modifierGroups?: ModifierGroup[];
  imageUrl?: string;
}

export interface CartItemOption {
  groupName: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedPortion?: {
    name: string;
    price: number;
  };
  selectedOptions: CartItemOption[];
  specialInstructions?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CheckoutDetails {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupType: 'asap' | 'scheduled';
  scheduledTime?: string;
  isCurbside: boolean;
  vehicleDescription?: string;
  curbsideSpot?: string;
  paymentMethod: 'apple_pay' | 'google_pay' | 'credit_card' | 'pay_at_pickup';
  tipPercentage: number;
  customTipAmount?: number;
}

export interface ConfirmedOrder {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  checkoutDetails: CheckoutDetails;
  placedAt: string;
  estimatedReadyTime: string;
}
