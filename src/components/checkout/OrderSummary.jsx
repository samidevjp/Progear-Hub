import { useCheckout } from "../../context/CheckoutContext";

const currency = (n) => `$${n.toFixed(2)}`;

const OrderSummary = () => {
  const { items, setItems, totals } = useCheckout();

  const increment = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  };
  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
        )
        .filter((it) => it.qty > 0)
    );
  };
  const remove = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <aside className="">
      <div className="flex items-center mb-4">
        <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
        <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
          Order Summary
        </h3>
      </div>
      <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
        <div className="space-y-4 mb-6">
          {items.map((it) => (
            <div key={it.id} className="flex items-center">
              <div className="w-20 h-20 rounded-lg overflow-hidden mr-3 bg-gray-100">
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-montserrat text-[#171717] truncate">
                  {it.title}
                </p>
                <p className="font-montserrat font-bold text-[#171717] text-[18px] mt-1">
                  {currency(it.price * it.qty)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => decrement(it.id)}
                    className="w-7 h-7 border border-[#E5E5E5] rounded-full hover:bg-[#F9F9F9] flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="font-montserrat">{it.qty}</span>
                  <button
                    onClick={() => increment(it.id)}
                    className="w-7 h-7 border border-[#E5E5E5] rounded-full hover:bg-[#F9F9F9] flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="ml-auto text-[#EF4444] text-sm font-montserrat hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 font-montserrat text-[#171717] text-right">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{currency(totals.shippingFee)}</span>
          </div>
          {totals.codFee > 0 && (
            <div className="flex justify-between">
              <span>COD Fee</span>
              <span>{currency(totals.codFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>{currency(totals.tax)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-[#E5E5E5] mt-2 text-[20px]">
            <span>Total Due</span>
            <span className="text-[#171717]">{currency(totals.total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
