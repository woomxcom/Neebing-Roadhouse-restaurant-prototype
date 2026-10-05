import React, { useState } from 'react';
import { MenuItem, CartItem, ConfirmedOrder } from './types';
import { MENU_ITEMS } from './data/menuData';
import { DemoController } from './components/DemoController';
import { Header } from './components/Header';
import { OperationalToast, AlertType } from './components/OperationalToast';
import { Hero } from './components/Hero';
import { SignatureShowcase } from './components/SignatureShowcase';
import { ChalkboardMenu } from './components/ChalkboardMenu';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LargePartyModal } from './components/LargePartyModal';
import { VenueGuide } from './components/VenueGuide';
import { HoursAndLocation } from './components/HoursAndLocation';
import { Footer } from './components/Footer';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Demo State (for client presentation)
  const [simulatedHour, setSimulatedHour] = useState<number>(18.5); // Default to 6:30 PM (All menus unlocked)
  const [isKitchenThrottled, setIsKitchenThrottled] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>('game_day');
  const [isAlertDismissed, setIsAlertDismissed] = useState<boolean>(false);

  // Cart & Ordering State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isLargePartyOpen, setIsLargePartyOpen] = useState<boolean>(false);
  const [activeCustomizerItem, setActiveCustomizerItem] = useState<MenuItem | null>(null);

  // Checkout Params
  const [checkoutParams, setCheckoutParams] = useState({
    tipPercent: 15,
    customTip: 0,
    pickupType: 'asap' as 'asap' | 'scheduled',
    scheduledTime: '5:30 PM',
  });

  // Calculate cart counts and total
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Add item to cart
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.menuItem.id === newItem.menuItem.id &&
          i.selectedPortion?.name === newItem.selectedPortion?.name &&
          JSON.stringify(i.selectedOptions) === JSON.stringify(newItem.selectedOptions) &&
          i.specialInstructions === newItem.specialInstructions
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        updated[existingIdx].totalPrice = updated[existingIdx].unitPrice * updated[existingIdx].quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Pre-populate realistic sample order for client demo
  const handleLoadSampleOrder = () => {
    const burgerItem = MENU_ITEMS.find((m) => m.id === 'burger_highway61')!;
    const wingsItem = MENU_ITEMS.find((m) => m.id === 'wings_classic')!;

    const sampleBurger: CartItem = {
      cartItemId: `sample_burger_${Date.now()}`,
      menuItem: burgerItem,
      selectedOptions: [
        { groupName: 'Choose Your Included Side', optionName: 'Fresh Cut Fries', price: 0 },
        { groupName: 'Roadhouse Add-Ons', optionName: 'Add House Smoked Bacon', price: 2.5 },
      ],
      specialInstructions: 'Medium well, extra napkins please',
      quantity: 1,
      unitPrice: 24.45,
      totalPrice: 24.45,
    };

    const sampleWings: CartItem = {
      cartItemId: `sample_wings_${Date.now() + 1}`,
      menuItem: wingsItem,
      selectedPortion: { name: '1 Pound (approx. 7–8 wings)', price: 16.5 },
      selectedOptions: [
        { groupName: 'Choose Your Sauce or Dry Rub', optionName: 'House Signature Buffalo Rouge', price: 0 },
        { groupName: 'Dipping Sauce (Includes 1)', optionName: 'Chunky Blue Cheese', price: 0 },
      ],
      specialInstructions: 'Crispy well-done please!',
      quantity: 1,
      unitPrice: 16.5,
      totalPrice: 16.5,
    };

    setCartItems([sampleBurger, sampleWings]);
    setIsCartOpen(true);
  };

  // Open Checkout
  const handleOpenCheckout = (
    tipPercent: number,
    customTip: number,
    pickupType: 'asap' | 'scheduled',
    scheduledTime: string
  ) => {
    setCheckoutParams({
      tipPercent,
      customTip,
      pickupType,
      scheduledTime,
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const scrollToMenu = () => {
    document.getElementById('menu-chalkboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#121417] text-[#F5F5F3] flex flex-col font-body selection:bg-[#E5A93C] selection:text-black">
      {/* 1. Client Presentation Demo Bar (Live controls for owners) */}
      <DemoController
        simulatedHour={simulatedHour}
        setSimulatedHour={setSimulatedHour}
        isKitchenThrottled={isKitchenThrottled}
        setIsKitchenThrottled={setIsKitchenThrottled}
        onLoadSampleOrder={handleLoadSampleOrder}
        cartItemCount={cartItemCount}
        alertType={alertType}
        setAlertType={setAlertType}
        isAlertDismissed={isAlertDismissed}
        setIsAlertDismissed={setIsAlertDismissed}
      />

      {/* 2. Top Bar & Navigation Header */}
      <Header
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        isKitchenThrottled={isKitchenThrottled}
        simulatedHour={simulatedHour}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Section with Cinematic Photography */}
        <Hero
          onScrollToMenu={scrollToMenu}
          onOpenTakeout={scrollToMenu}
          isKitchenThrottled={isKitchenThrottled}
        />

        {/* 4. "Roadhouse Signatures" Visual Showcase */}
        <SignatureShowcase
          onSelectItem={(item) => setActiveCustomizerItem(item)}
          simulatedHour={simulatedHour}
          isKitchenThrottled={isKitchenThrottled}
        />

        {/* 5. Responsive Chalkboard Menu */}
        <ChalkboardMenu
          simulatedHour={simulatedHour}
          isKitchenThrottled={isKitchenThrottled}
          onSelectItem={(item) => setActiveCustomizerItem(item)}
        />

        {/* 6. "Know Before You Go" Venue Clarity Section */}
        <VenueGuide onOpenLargePartyModal={() => setIsLargePartyOpen(true)} />

        {/* 7. Highway 61 Logistics & Hours */}
        <HoursAndLocation />
      </main>

      {/* 8. Tavern Footer */}
      <Footer />

      {/* 9. Non-Intrusive Floating Operational Toast Notification */}
      <OperationalToast
        alertType={alertType}
        isDismissed={isAlertDismissed}
        onDismiss={() => setIsAlertDismissed(true)}
        onRestore={() => setIsAlertDismissed(false)}
        hasActiveCart={cartItemCount > 0}
      />

      {/* 10. Large Party Booking & Inquiry Modal (6+ Guests) */}
      <LargePartyModal
        isOpen={isLargePartyOpen}
        onClose={() => setIsLargePartyOpen(false)}
      />

      {/* 11. Slide-Up Item Customizer Modal */}
      <ItemCustomizerModal
        item={activeCustomizerItem}
        onClose={() => setActiveCustomizerItem(null)}
        onAddToCart={handleAddToCart}
        isKitchenThrottled={isKitchenThrottled}
      />

      {/* 12. Slide-Out Takeout Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={handleOpenCheckout}
        isKitchenThrottled={isKitchenThrottled}
      />

      {/* 13. Single-Screen Curbside Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        tipPercentage={checkoutParams.tipPercent}
        customTipAmount={checkoutParams.customTip}
        pickupType={checkoutParams.pickupType}
        scheduledTime={checkoutParams.scheduledTime}
        onOrderPlaced={(order) => {
          console.log('Order successfully placed:', order);
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* 14. Accessible Mobile Sticky Bottom Bar (52px Touch Height, Active Cart Ticker) */}
      {cartItemCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <aside aria-label="Persistent mobile checkout" className="md:hidden fixed bottom-4 left-3 right-3 z-30 animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full h-[54px] px-4 bg-[#E5A93C] text-black rounded-2xl font-bold text-sm shadow-[0_8px_30px_rgba(229,169,60,0.4)] flex items-center justify-between border border-black/20 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-black text-[#E5A93C] flex items-center justify-center font-bold text-xs">
                {cartItemCount}
              </div>
              <span className="font-semibold text-sm">View Takeout Order</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono tabular-nums text-base font-extrabold">
                ${cartTotal.toFixed(2)}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </aside>
      )}
    </div>
  );
}
