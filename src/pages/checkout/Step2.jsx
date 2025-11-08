import { useEffect, useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { Checkbox } from "../../components/checkout/FormControls";
import { useNavigate } from "react-router-dom";
import iconPayPal from "../../assets/image/icon-paypal.png";
import iconApple from "../../assets/image/icon-apple-pay.png";
import iconGoogle from "../../assets/image/icon-google-pay.png";
import iconCard from "../../assets/image/icon-card.png";
import kvOrderPc from "../../assets/image/kv-order-pc.png";
import kvOrderSp from "../../assets/image/kv-order-sp.png";

const Step2 = () => {
  const navigate = useNavigate();
  const {
    contact,
    shipping,
    billing,
    items,
    payment,
    setPayment,
    agree,
    setAgree,
    totals,
  } = useCheckout();
  const [errors, setErrors] = useState({});

  // Guard: redirect to step-1 if required info missing
  useEffect(() => {
    const requiredShipping = [
      "firstName",
      "lastName",
      "postalCode",
      "state",
      "city",
      "street",
    ];
    const missing =
      !contact.email ||
      !contact.phone ||
      requiredShipping.some((k) => !shipping[k]) ||
      (!billing.sameAsShipping && requiredShipping.some((k) => !billing[k]));
    if (missing) {
      navigate("/checkout/step-1", { replace: true });
    }
  }, [contact, shipping, billing, navigate]);

  const validate = () => {
    const e = {};
    if (payment.method === "card") {
      const { name, number, expiry, cvv } = payment.card;
      if (!name) e.cardName = "Cardholder name is required";
      if (!number || number.replace(/\s+/g, "").length < 13)
        e.cardNumber = "Card number is invalid";
      if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
        e.cardExpiry = "Expiry must be MM/YY";
      if (!cvv || !/^\d{3,4}$/.test(cvv)) e.cardCvv = "CVV is invalid";
    }
    if (!agree) e.agree = "You must agree to the Terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPlaceOrder = () => {
    if (!validate()) return;
    // Mock submit
    navigate("/checkout/success");
  };

  const currency = (n) => `$${n.toFixed(2)}`;
  const fullName = `${shipping.firstName || ""} ${
    shipping.lastName || ""
  }`.trim();
  const displayNote = "-"; // Step1 note not persisted; show dash

  return (
    <div className="">
      {/* KV Banner */}
      <div className="relative w-full md:h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover h-full bg-center md:hidden"
          style={{ backgroundImage: `url(${kvOrderSp})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${kvOrderPc})` }}
        />
        <div className="absolute inset-0 bg-[#171717]/50" />
        <h1 className="relative z-10 text-white font-bebas text-[28px] md:text-[100px]">
          ORDER FORM
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Order Summary + Info */}
          <div className="max-w-[640px] lg:sticky lg:top-24 lg:self-start">
            {/* Order Summary (read-only) */}
            <section className="bg-white border border-[#E5E5E5] rounded-[24px] p-10 mb-8">
              <div className="flex items-center mb-8">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Order Summary
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center pb-3 border-b border-[#E5E5E5]"
                  >
                    <div
                      className="w-15 h-15 min-w-15 mr-3 rounded-lg overflow-hidden bg-gray-100"
                      style={{ width: 60, height: 60 }}
                    >
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-montserrat text-[#171717] text-[16px] truncate">
                        {it.title}
                      </p>
                    </div>
                    <div className="font-montserrat font-bold text-[#171717] text-[18px] ml-3">
                      {currency(it.price * it.qty)}
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
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>{currency(totals.tax)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-[#E5E5E5] mt-2 text-[20px]">
                  <span>Total Due</span>
                  <span className="text-[#171717]">
                    {currency(totals.total)}
                  </span>
                </div>
              </div>
              {/* Customer Information */}
              <section className="my-10">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                  <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                    Customer Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-y-3 text-[#171717] font-montserrat">
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    Name
                  </span>
                  <span className="font-bold text-[18px]">
                    {fullName || "-"}
                  </span>
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    Phone Number
                  </span>
                  <span className="font-bold text-[18px]">
                    {contact.phone || "-"}
                  </span>
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    Email
                  </span>
                  <span className="font-bold text-[18px]">
                    {contact.email || "-"}
                  </span>
                </div>
              </section>

              {/* Shipping Information */}
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                  <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                    Shipping Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-y-3 text-[#171717] font-montserrat">
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    Address
                  </span>
                  <span className="font-bold text-[18px]">
                    {shipping.street || "-"}{" "}
                    {shipping.building ? `, ${shipping.building}` : ""}
                  </span>
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    City
                  </span>
                  <span className="font-bold text-[18px]">
                    {shipping.city || "-"}
                  </span>
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    State
                  </span>
                  <span className="font-bold text-[18px]">
                    {shipping.state || "-"}
                  </span>
                  <span className="font-bold text-[18px] text-[#9CA3AF]">
                    ZIP
                  </span>
                  <span className="font-bold text-[18px]">
                    {shipping.postalCode || "-"}
                  </span>
                </div>
              </section>

              {/* Others */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                  <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                    Others
                  </h3>
                </div>
                <p className="font-montserrat text-[#171717]">{displayNote}</p>
              </section>
            </section>
          </div>

          {/* RIGHT: Payment */}
          <div className="max-w-[500px]">
            <section className="mb-8">
              <div className="flex items-center mb-8">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Payment Information
                </h3>
              </div>
              <div className="space-y-6">
                {/* PayPal */}
                <label
                  className={`bg-[#F6F7F8] flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    payment.method === "paypal"
                      ? "border-[#EF4444]"
                      : "border-[#E5E5E5]"
                  } hover:border-[#EF4444]`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={payment.method === "paypal"}
                      onChange={(e) =>
                        setPayment({ ...payment, method: e.target.value })
                      }
                      className="w-4 h-4 text-[#EF4444] focus:ring-[#EF4444] mr-3"
                    />
                    <span className="font-montserrat">PayPal</span>
                  </div>
                  <img src={iconPayPal} alt="PayPal" className="h-6 w-auto" />
                </label>

                {/* Apple Pay */}
                <label
                  className={`bg-[#F6F7F8] flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    payment.method === "apple"
                      ? "border-[#EF4444]"
                      : "border-[#E5E5E5]"
                  } hover:border-[#EF4444]`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      checked={payment.method === "apple"}
                      onChange={(e) =>
                        setPayment({ ...payment, method: e.target.value })
                      }
                      className="w-4 h-4 text-[#EF4444] focus:ring-[#EF4444] mr-3"
                    />
                    <span className="font-montserrat">Apple Pay</span>
                  </div>
                  <img src={iconApple} alt="Apple Pay" className="h-6 w-auto" />
                </label>

                {/* Google Pay */}
                <label
                  className={`bg-[#F6F7F8] flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                    payment.method === "google"
                      ? "border-[#EF4444]"
                      : "border-[#E5E5E5]"
                  } hover:border-[#EF4444]`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="google"
                      checked={payment.method === "google"}
                      onChange={(e) =>
                        setPayment({ ...payment, method: e.target.value })
                      }
                      className="w-4 h-4 text-[#EF4444] focus:ring-[#EF4444] mr-3"
                    />
                    <span className="font-montserrat">Google Pay</span>
                  </div>
                  <img
                    src={iconGoogle}
                    alt="Google Pay"
                    className="h-6 w-auto"
                  />
                </label>

                {/* Credit Card */}
                <div className="">
                  <label
                    className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                      payment.method === "card"
                        ? "border-[#EF4444]"
                        : "border-[#E5E5E5]"
                    } hover:border-[#EF4444]`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={payment.method === "card"}
                        onChange={(e) =>
                          setPayment({ ...payment, method: e.target.value })
                        }
                        className="w-4 h-4 text-[#EF4444] focus:ring-[#EF4444] mr-3"
                      />
                      <span className="font-montserrat">Credit Card</span>
                    </div>
                    <img
                      src={iconCard}
                      alt="Credit Card"
                      className="h-6 w-auto"
                    />
                  </label>

                  {/* Credit card fields with animated reveal */}
                  <div
                    className={`border border-[#E5E5E5] rounded-b-[24px] p-10 overflow-hidden transition-all duration-700 ease-in-out ${
                      payment.method === "card"
                        ? "opacity-100 max-h-[1000px] translate-y-0"
                        : "opacity-0 max-h-0 -translate-y-3 pointer-events-none"
                    }`}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="cc-name"
                        className="block text-[#171717] font-montserrat font-bold mb-2"
                      >
                        Cardholder Name{" "}
                        <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        id="cc-name"
                        type="text"
                        value={payment.card.name}
                        onChange={(e) =>
                          setPayment({
                            ...payment,
                            card: { ...payment.card, name: e.target.value },
                          })
                        }
                        className={`w-full h-12 px-3 border rounded-lg font-montserrat focus:outline-none ${
                          errors.cardName
                            ? "border-red-500"
                            : "border-[#C8C8C8] focus:border-[#EF4444]"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.cardName && (
                        <p className="text-sm text-red-600 font-montserrat mt-1">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="cc-number"
                        className="block text-[#171717] font-montserrat font-bold mb-2"
                      >
                        Card Number <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        id="cc-number"
                        type="text"
                        value={payment.card.number}
                        onChange={(e) =>
                          setPayment({
                            ...payment,
                            card: { ...payment.card, number: e.target.value },
                          })
                        }
                        className={`w-full h-12 px-3 border rounded-lg font-montserrat focus:outline-none ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-[#C8C8C8] focus:border-[#EF4444]"
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-600 font-montserrat mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="cc-exp"
                          className="block text-[#171717] font-montserrat font-bold mb-2"
                        >
                          Expiry Date (MM/YY){" "}
                          <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          id="cc-exp"
                          type="text"
                          value={payment.card.expiry}
                          onChange={(e) =>
                            setPayment({
                              ...payment,
                              card: {
                                ...payment.card,
                                expiry: e.target.value,
                              },
                            })
                          }
                          className={`w-full h-12 px-3 border rounded-lg font-montserrat focus:outline-none ${
                            errors.cardExpiry
                              ? "border-red-500"
                              : "border-[#C8C8C8] focus:border-[#EF4444]"
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && (
                          <p className="text-sm text-red-600 font-montserrat mt-1">
                            {errors.cardExpiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="cc-cvv"
                          className="block text-[#171717] font-montserrat font-bold mb-2"
                        >
                          CVV <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          id="cc-cvv"
                          type="password"
                          value={payment.card.cvv}
                          onChange={(e) =>
                            setPayment({
                              ...payment,
                              card: { ...payment.card, cvv: e.target.value },
                            })
                          }
                          className={`w-full h-12 px-3 border rounded-lg font-montserrat focus:outline-none ${
                            errors.cardCvv
                              ? "border-red-500"
                              : "border-[#C8C8C8] focus:border-[#EF4444]"
                          }`}
                          placeholder="123"
                        />
                        {errors.cardCvv && (
                          <p className="text-sm text-red-600 font-montserrat mt-1">
                            {errors.cardCvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="flex flex-col md:flex-row md:justify-end gap-4">
              <button
                onClick={() => navigate("/checkout/step-1")}
                className="w-full px-9 h-12 bg-[#171717] text-white  rounded-lg font-montserrat hover:opacity-90 transition-opacity"
              >
                ← Back
              </button>
              <button
                onClick={onPlaceOrder}
                className="w-full px-9 h-12 bg-[#EF4444] text-white rounded-lg font-montserrat font-semibold hover:opacity-90 transition-opacity"
              >
                Place Order
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
