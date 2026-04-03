/**
 * QuantitySelector — Client Component
 *
 * Renders the decrement / quantity / increment row used in the cart line
 * items.  Extracted so the cart page stays focused on layout concerns rather
 * than repeating the button markup for every item.
 */
"use client";

interface QuantitySelectorProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

const BUTTON_CLASS =
  "w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors";

export default function QuantitySelector({
  quantity,
  onDecrement,
  onIncrement,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        className={BUTTON_CLASS}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="font-medium">{quantity}</span>
      <button
        onClick={onIncrement}
        className={BUTTON_CLASS}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
