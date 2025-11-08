import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import OrderSummary from "../../components/checkout/OrderSummary";
import { useCheckout } from "../../context/CheckoutContext";
import { TextField, RadioCard, Checkbox } from "../../components/checkout/FormControls";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
  const navigate = useNavigate();
  const { contact, shipping, billing, payment, setPayment, agree, setAgree, totals } = useCheckout();
  const [errors, setErrors] = useState({});

  // Guard: redirect to step-1 if required info missing
  useEffect(() => {
    const requiredShipping = ["firstName", "lastName", "postalCode", "state", "city", "street"];
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
      if (!number || number.replace(/\s+/g, "").length < 13) e.cardNumber = "Card number is invalid";
      if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) e.cardExpiry = "Expiry must be MM/YY";
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

  return (
    <div className="pt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-8">
          <SectionHeading>Payment</SectionHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main */}
          <div className="space-y-8">
            {/* Payment method */}
            <section className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h3 className="font-montserrat font-bold text-[#171717] text-xl mb-4">Payment method</h3>
              <div className="space-y-4">
                <RadioCard
                  name="payment"
                  value="card"
                  checked={payment.method === "card"}
                  onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                  title="Credit Card"
                  description="Pay with your credit card."
                />
                {payment.method === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <TextField
                      id="card.name"
                      label="Cardholder Name"
                      value={payment.card.name}
                      onChange={(e) => setPayment({ ...payment, card: { ...payment.card, name: e.target.value } })}
                      error={errors.cardName}
                    />
                    <TextField
                      id="card.number"
                      label="Card Number"
                      value={payment.card.number}
                      onChange={(e) => setPayment({ ...payment, card: { ...payment.card, number: e.target.value } })}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                    />
                    <TextField
                      id="card.expiry"
                      label="Expiry (MM/YY)"
                      value={payment.card.expiry}
                      onChange={(e) => setPayment({ ...payment, card: { ...payment.card, expiry: e.target.value } })}
                      error={errors.cardExpiry}
                      placeholder="MM/YY"
                    />
                    <TextField
                      id="card.cvv"
                      label="CVV"
                      value={payment.card.cvv}
                      onChange={(e) => setPayment({ ...payment, card: { ...payment.card, cvv: e.target.value } })}
                      error={errors.cardCvv}
                      type="password"
                    />
                  </div>
                )}

                <RadioCard
                  name="payment"
                  value="cod"
                  checked={payment.method === "cod"}
                  onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                  title="Cash on Delivery (COD)"
                  description="COD fee $5. Pay at delivery."
                />

                <RadioCard
                  name="payment"
                  value="bank"
                  checked={payment.method === "bank"}
                  onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                  title="Bank Transfer"
                  description="Bank: ProGear Bank. Account: 123-456-789. Shipment after funds received."
                />
              </div>
            </section>

            {/* Terms + Actions */}
            <section className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Checkbox
                    id="agree"
                    label="I agree to the Terms"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  {errors.agree && <p className="text-sm text-red-600 font-montserrat">{errors.agree}</p>}
                </div>
                <button
                  onClick={onPlaceOrder}
                  className="bg-[#171717] text-white px-6 h-12 rounded-lg font-montserrat font-semibold hover:bg-[#EF4444] transition-colors"
                >
                  Place Order
                </button>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;


