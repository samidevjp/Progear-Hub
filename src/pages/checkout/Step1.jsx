import { useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import OrderSummary from "../../components/checkout/OrderSummary";
import { useCheckout } from "../../context/CheckoutContext";
import {
  TextField,
  SelectField,
  Checkbox,
  RadioCard,
} from "../../components/checkout/FormControls";
import { useNavigate } from "react-router-dom";

const countryOptions = [
  { value: "Australia", label: "Australia" },
  { value: "Japan", label: "Japan" },
];

const Step1 = () => {
  const navigate = useNavigate();
  const {
    contact,
    setContact,
    shipping,
    setShipping,
    billing,
    setBilling,
    delivery,
    setDelivery,
  } = useCheckout();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      e.email = "Valid email is required";
    if (!contact.phone) e.phone = "Phone is required";
    const s = shipping;
    ["firstName", "lastName", "postalCode", "state", "city", "street"].forEach(
      (k) => {
        if (!s[k]) e[`shipping.${k}`] = "Required";
      }
    );
    if (!billing.sameAsShipping) {
      const b = billing;
      [
        "firstName",
        "lastName",
        "postalCode",
        "state",
        "city",
        "street",
      ].forEach((k) => {
        if (!b[k]) e[`billing.${k}`] = "Required";
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onContinue = () => {
    if (validate()) {
      navigate("/checkout/step-2");
    }
  };

  return (
    <div className="pt-20">
      {/* KV Banner */}
      <div className="relative w-full h-40 md:h-56 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#171717]/50" />
        <h1 className="relative z-10 text-white font-montserrat font-bold text-[28px] md:text-[48px]">
          ORDER FORM
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Order Summary */}
          <div className="max-w-[640px] lg:sticky lg:top-24 lg:self-start">
            <OrderSummary />
          </div>

          {/* Right: Form */}
          <div className="max-w-[500px]">
            {/* Contact */}
            <section className="bg-white rounded-lg p-6 mb-20">
              <div className="flex items-center mb-10">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Customer Information
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  id="shipping.firstName"
                  label="First Name"
                  value={shipping.firstName}
                  onChange={(e) =>
                    setShipping({ ...shipping, firstName: e.target.value })
                  }
                  error={errors["shipping.firstName"]}
                  required
                  autoComplete="given-name"
                />
                <TextField
                  id="shipping.lastName"
                  label="Last Name"
                  value={shipping.lastName}
                  onChange={(e) =>
                    setShipping({ ...shipping, lastName: e.target.value })
                  }
                  error={errors["shipping.lastName"]}
                  required
                  autoComplete="family-name"
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  error={errors.email}
                  required
                  autoComplete="email"
                />
                <TextField
                  id="phone"
                  label="Phone"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  error={errors.phone}
                  required
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white rounded-lg p-6 mb-20">
              <div className="flex items-center mb-10">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Shipping Information
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  id="shipping.postalCode"
                  label="ZIP"
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                  error={errors["shipping.postalCode"]}
                  required
                  autoComplete="postal-code"
                />
                <SelectField
                  id="shipping.country"
                  label="Country"
                  value={shipping.country}
                  onChange={(e) =>
                    setShipping({ ...shipping, country: e.target.value })
                  }
                  options={countryOptions}
                />
                <TextField
                  id="shipping.state"
                  label="State / Prefecture"
                  value={shipping.state}
                  onChange={(e) =>
                    setShipping({ ...shipping, state: e.target.value })
                  }
                  error={errors["shipping.state"]}
                  required
                />
                <TextField
                  id="shipping.city"
                  label="City"
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  error={errors["shipping.city"]}
                  required
                />
                <TextField
                  id="shipping.street"
                  label="Address"
                  value={shipping.street}
                  onChange={(e) =>
                    setShipping({ ...shipping, street: e.target.value })
                  }
                  error={errors["shipping.street"]}
                  required
                  autoComplete="address-line1"
                />
                <TextField
                  id="shipping.building"
                  label="Building / Apt (optional)"
                  value={shipping.building}
                  onChange={(e) =>
                    setShipping({ ...shipping, building: e.target.value })
                  }
                  autoComplete="address-line2"
                />
              </div>
            </section>

            {/* Billing Toggle */}
            {/* <section className="bg-white rounded-lg p-6 mb-20">
              <div className="flex items-center mb-10">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Billing Information
                </h3>
              </div>
              <div className="mb-4">
                <Checkbox
                  id="billing.same"
                  label="Same as shipping address"
                  checked={billing.sameAsShipping}
                  onChange={(e) =>
                    setBilling({ ...billing, sameAsShipping: e.target.checked })
                  }
                />
              </div>

              {!billing.sameAsShipping && (
                <div className="grid grid-cols-1 gap-4">
                  <TextField
                    id="billing.firstName"
                    label="First Name"
                    value={billing.firstName}
                    onChange={(e) =>
                      setBilling({ ...billing, firstName: e.target.value })
                    }
                    error={errors["billing.firstName"]}
                    required
                  />
                  <TextField
                    id="billing.lastName"
                    label="Last Name"
                    value={billing.lastName}
                    onChange={(e) =>
                      setBilling({ ...billing, lastName: e.target.value })
                    }
                    error={errors["billing.lastName"]}
                    required
                  />
                  <TextField
                    id="billing.postalCode"
                    label="ZIP"
                    value={billing.postalCode}
                    onChange={(e) =>
                      setBilling({ ...billing, postalCode: e.target.value })
                    }
                    error={errors["billing.postalCode"]}
                    required
                  />
                  <SelectField
                    id="billing.country"
                    label="Country"
                    value={billing.country}
                    onChange={(e) =>
                      setBilling({ ...billing, country: e.target.value })
                    }
                    options={countryOptions}
                  />
                  <TextField
                    id="billing.state"
                    label="State / Prefecture"
                    value={billing.state}
                    onChange={(e) =>
                      setBilling({ ...billing, state: e.target.value })
                    }
                    error={errors["billing.state"]}
                    required
                  />
                  <TextField
                    id="billing.city"
                    label="City"
                    value={billing.city}
                    onChange={(e) =>
                      setBilling({ ...billing, city: e.target.value })
                    }
                    error={errors["billing.city"]}
                    required
                  />
                  <TextField
                    id="billing.street"
                    label="Address"
                    value={billing.street}
                    onChange={(e) =>
                      setBilling({ ...billing, street: e.target.value })
                    }
                    error={errors["billing.street"]}
                    required
                  />
                  <TextField
                    id="billing.building"
                    label="Building / Apt (optional)"
                    value={billing.building}
                    onChange={(e) =>
                      setBilling({ ...billing, building: e.target.value })
                    }
                  />
                </div>
              )}
            </section> */}

            {/* Delivery Method */}
            {/* <section className="bg-white rounded-lg p-6 mb-20">
              <div className="flex items-center mb-10">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Delivery Method
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioCard
                  name="delivery"
                  value="standard"
                  checked={delivery.method === "standard"}
                  onChange={(e) => setDelivery({ method: e.target.value })}
                  title="Standard"
                  description="Estimated 3–5 business days. Free."
                />
                <RadioCard
                  name="delivery"
                  value="express"
                  checked={delivery.method === "express"}
                  onChange={(e) => setDelivery({ method: e.target.value })}
                  title="Express"
                  description="Estimated 1–2 business days. $10."
                />
              </div>
            </section> */}

            {/* Others / Note */}
            <section className="bg-white rounded-lg p-6 mb-20">
              <div className="flex items-center mb-10">
                <div className="w-1 h-6 bg-[#EF4444] rounded-sm mr-2" />
                <h3 className="font-montserrat font-bold text-[#171717] text-[24px]">
                  Others
                </h3>
              </div>
              <div>
                <label
                  htmlFor="orderNote"
                  className="block text-[#171717] font-montserrat font-bold mb-2"
                >
                  Order Note{" "}
                  <span className="text-[#9E9E9E] font-normal">(optional)</span>
                </label>
                <textarea
                  id="orderNote"
                  rows={6}
                  className="w-full border border-[#C8C8C8] rounded-lg font-montserrat p-3 focus:outline-none focus:border-[#EF4444] resize-none"
                  placeholder="If you have any notes for your order, please write here."
                />
              </div>
            </section>

            {/* Notes + Actions */}
            <section className="flex items-center justify-center">
              <button
                onClick={onContinue}
                className="bg-[#EF4444] text-white px-6 h-12 rounded-lg font-montserrat font-semibold hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
