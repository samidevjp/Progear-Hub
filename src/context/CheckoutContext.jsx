import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as allProducts } from "../data/products";

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    postalCode: "",
    state: "",
    city: "",
    street: "",
    building: "",
    country: "Japan",
  });
  const [billing, setBilling] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    postalCode: "",
    state: "",
    city: "",
    street: "",
    building: "",
    country: "Japan",
  });
  const [delivery, setDelivery] = useState({ method: "standard" }); // standard | express
  const [payment, setPayment] = useState({
    method: "card", // card | cod | bank
    card: { name: "", number: "", expiry: "", cvv: "" },
  });
  const [agree, setAgree] = useState(false);
  // Mock items (until cart is integrated)
  const [items, setItems] = useState(() => {
    return allProducts.slice(0, 3).map((p) => ({ id: p.id, title: p.title, price: p.price, qty: 1, image: p.image }));
  });

  // Load from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("checkout_state_v1");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.contact) setContact(parsed.contact);
        if (parsed.shipping) setShipping(parsed.shipping);
        if (parsed.billing) setBilling(parsed.billing);
        if (parsed.delivery) setDelivery(parsed.delivery);
        if (parsed.payment) setPayment(parsed.payment);
        if (parsed.agree !== undefined) setAgree(parsed.agree);
        if (Array.isArray(parsed.items) && parsed.items.length > 0) setItems(parsed.items);
      } catch {
        // ignore
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const state = { contact, shipping, billing, delivery, payment, agree, items };
    localStorage.setItem("checkout_state_v1", JSON.stringify(state));
  }, [contact, shipping, billing, delivery, payment, agree, items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [items]);

  const shippingFee = delivery.method === "express" ? 10 : 0;
  const codFee = payment.method === "cod" ? 5 : 0;
  const taxRate = 0.10; // USD / 10%
  const tax = useMemo(() => {
    return Math.round(((subtotal + shippingFee + codFee) * taxRate) * 100) / 100;
  }, [subtotal, shippingFee, codFee]);
  const total = useMemo(() => {
    return Math.round((subtotal + shippingFee + codFee + tax) * 100) / 100;
  }, [subtotal, shippingFee, codFee, tax]);

  const value = {
    contact,
    shipping,
    billing,
    delivery,
    payment,
    agree,
    items,
    setContact,
    setShipping,
    setBilling,
    setDelivery,
    setPayment,
    setAgree,
    setItems,
    totals: { subtotal, shippingFee, codFee, tax, total },
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
};


