import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  Landmark,
  Smartphone,
  Banknote,
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
  ChevronRight,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useShop } from "../context/ShopContext";

import "./Checkout.css";

function Checkout() {
  const {
    cart,
    subtotal,
    deliveryCharge,
    total,
    clearCart,
  } = useShop();

  const [paymentMethod, setPaymentMethod] =
    useState("online");

  const [onlineMethod, setOnlineMethod] =
    useState("UPI");

  const [upiApp, setUpiApp] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  const [bank, setBank] =
    useState("");

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [processing, setProcessing] =
    useState(false);

  const [ordered, setOrdered] =
    useState(false);

  const [error, setError] =
    useState("");

  const updateField = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateCard = (event) => {
    const {
      name,
      value,
    } = event.target;

    setCard((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================================
     PLACE ORDER
  ========================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (cart.length === 0) {
      return;
    }

    /*
      Frontend demo payment flow.
      Real gateway can be integrated later.
    */

    if (paymentMethod === "online") {
      if (onlineMethod === "UPI") {
        if (!upiApp && !upiId.trim()) {
          setError(
            "Please choose a UPI app or enter your UPI ID."
          );
          return;
        }

        if (
          upiId.trim() &&
          !/^[\w.-]+@[\w.-]+$/.test(
            upiId.trim()
          )
        ) {
          setError(
            "Please enter a valid UPI ID."
          );
          return;
        }
      }

      if (onlineMethod === "Card") {
        if (
          card.number.replace(/\s/g, "")
            .length !== 16 ||
          !card.name.trim() ||
          !card.expiry.trim() ||
          card.cvv.length !== 3
        ) {
          setError(
            "Please enter complete card details."
          );
          return;
        }
      }

      if (
        onlineMethod === "Net Banking" &&
        !bank
      ) {
        setError(
          "Please select your bank."
        );
        return;
      }
    }

    if (paymentMethod === "cod") {
      finishOrder();
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      finishOrder();
    }, 1800);
  };

  const finishOrder = () => {
    setOrdered(true);
    clearCart();
  };

  /* =========================================
     EMPTY CART
  ========================================= */

  if (cart.length === 0 && !ordered) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">
            <WalletCards size={34} />
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add an invitation before
            proceeding to checkout.
          </p>

          <Link to="/shop">
            Browse Invitations
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     SUCCESS
  ========================================= */

  if (ordered) {
    return (
      <main className="checkout-page success-page">
        <motion.div
          className="order-success"
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <motion.div
            className="success-icon"
            initial={{
              scale: 0,
              rotate: -20,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.65,
            }}
          >
            <CheckCircle2 size={46} />
          </motion.div>

          <h1>
            Order Confirmed
          </h1>

          <p>
            Your payment and order have been
            processed successfully.
            Your invitation is now ready
            for the next step.
          </p>

          <div className="success-details">
            <div>
              <span>Order ID</span>
              <strong>
                CHR-
                {Math.floor(
                  100000 +
                    Math.random() *
                      899999
                )}
              </strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>
                {paymentMethod ===
                "online"
                  ? onlineMethod
                  : "Cash on Delivery"}
              </strong>
            </div>
          </div>

          <Link
            to="/shop"
            className="back-to-shop"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="checkout-header">
        <span>
          Secure Checkout
        </span>

        <h1>
          Complete Your Order
        </h1>

        <p>
          Review your details and choose
          a secure payment method.
        </p>
      </section>

      <section className="checkout-layout">

        {/* =========================================
            LEFT
        ========================================= */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* DELIVERY */}
          <div className="checkout-card">

            <div className="card-heading">
              <div>
                <span>
                  Step 1
                </span>

                <h2>
                  Delivery Details
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            <div className="form-grid">

              <div className="field">
                <label>
                  Full Name
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={
                    updateField
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="field">
                <label>
                  Phone Number
                </label>

                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={
                    updateField
                  }
                  placeholder="Enter phone number"
                  inputMode="numeric"
                />
              </div>

              <div className="field full">
                <label>
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={
                    updateField
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="field full">
                <label>
                  Address
                </label>

                <textarea
                  required
                  name="address"
                  value={form.address}
                  onChange={
                    updateField
                  }
                  placeholder="House / Street / Area"
                  rows="4"
                />
              </div>

              <div className="field">
                <label>
                  City
                </label>

                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={
                    updateField
                  }
                  placeholder="City"
                />
              </div>

              <div className="field">
                <label>
                  Pincode
                </label>

                <input
                  required
                  name="pincode"
                  value={form.pincode}
                  onChange={
                    updateField
                  }
                  placeholder="Pincode"
                  inputMode="numeric"
                />
              </div>

            </div>
          </div>

          {/* PAYMENT */}
          <div className="checkout-card">

            <div className="card-heading">
              <div>
                <span>
                  Step 2
                </span>

                <h2>
                  Payment Method
                </h2>
              </div>

              <LockKeyhole size={22} />
            </div>

            {/* MAIN PAYMENT OPTIONS */}

            <div className="main-payment-options">

              <button
                type="button"
                className={`main-payment-option ${
                  paymentMethod ===
                  "online"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "online"
                  )
                }
              >
                <div className="main-payment-icon">
                  <Smartphone size={22} />
                </div>

                <div>
                  <strong>
                    Online Payment
                  </strong>

                  <span>
                    UPI, Card & Net Banking
                  </span>
                </div>

                <div className="payment-radio">
                  {paymentMethod ===
                    "online" && (
                    <motion.div
                      className="payment-radio-dot"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                    />
                  )}
                </div>
              </button>

              <button
                type="button"
                className={`main-payment-option ${
                  paymentMethod ===
                  "cod"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "cod"
                  )
                }
              >
                <div className="main-payment-icon cod-icon">
                  <Banknote size={22} />
                </div>

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <span>
                    Pay when your order arrives
                  </span>
                </div>

                <div className="payment-radio">
                  {paymentMethod ===
                    "cod" && (
                    <motion.div
                      className="payment-radio-dot"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                    />
                  )}
                </div>
              </button>

            </div>

            <AnimatePresence mode="wait">

              {/* =================================
                  ONLINE PAYMENT
              ================================= */}

              {paymentMethod ===
                "online" && (
                <motion.div
                  key="online"
                  className="online-payment-panel"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >

                  <div className="online-title">
                    <div>
                      <span>
                        Choose a payment option
                      </span>

                      <h3>
                        Pay securely online
                      </h3>
                    </div>

                    <div className="secure-chip">
                      <ShieldCheck
                        size={14}
                      />
                      Secure
                    </div>
                  </div>

                  {/* SUB PAYMENT OPTIONS */}

                  <div className="online-method-tabs">

                    <button
                      type="button"
                      className={
                        onlineMethod ===
                        "UPI"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setOnlineMethod(
                          "UPI"
                        );
                        setError("");
                      }}
                    >
                      <Smartphone
                        size={18}
                      />

                      <span>
                        UPI
                      </span>
                    </button>

                    <button
                      type="button"
                      className={
                        onlineMethod ===
                        "Card"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setOnlineMethod(
                          "Card"
                        );
                        setError("");
                      }}
                    >
                      <CreditCard
                        size={18}
                      />

                      <span>
                        Card
                      </span>
                    </button>

                    <button
                      type="button"
                      className={
                        onlineMethod ===
                        "Net Banking"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setOnlineMethod(
                          "Net Banking"
                        );
                        setError("");
                      }}
                    >
                      <Landmark
                        size={18}
                      />

                      <span>
                        Net Banking
                      </span>
                    </button>

                  </div>

                  <AnimatePresence mode="wait">

                    {/* UPI */}
                    {onlineMethod ===
                      "UPI" && (
                      <motion.div
                        key="upi"
                        className="payment-detail"
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                      >

                        <div className="popular-label">
                          Popular UPI Apps
                        </div>

                        <div className="upi-apps">

                          <button
                            type="button"
                            className={`upi-app ${
                              upiApp ===
                              "Google Pay"
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setUpiApp(
                                "Google Pay"
                              );
                              setUpiId("");
                              setError("");
                            }}
                          >
                            <div className="upi-logo gpay">
                              G
                            </div>

                            <span>
                              Google Pay
                            </span>
                          </button>

                          <button
                            type="button"
                            className={`upi-app ${
                              upiApp ===
                              "PhonePe"
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setUpiApp(
                                "PhonePe"
                              );
                              setUpiId("");
                              setError("");
                            }}
                          >
                            <div className="upi-logo phonepe">
                              P
                            </div>

                            <span>
                              PhonePe
                            </span>
                          </button>

                          <button
                            type="button"
                            className={`upi-app ${
                              upiApp ===
                              "Paytm"
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setUpiApp(
                                "Paytm"
                              );
                              setUpiId("");
                              setError("");
                            }}
                          >
                            <div className="upi-logo paytm">
                              P
                            </div>

                            <span>
                              Paytm
                            </span>
                          </button>

                        </div>

                        <div className="or-divider">
                          <span>
                            OR
                          </span>
                        </div>

                        <div className="field">
                          <label>
                            Enter UPI ID
                          </label>

                          <input
                            value={upiId}
                            onChange={(
                              event
                            ) => {
                              setUpiId(
                                event.target
                                  .value
                              );
                              setUpiApp("");
                              setError("");
                            }}
                            placeholder="example@upi"
                          />
                        </div>

                        {upiApp && (
                          <motion.div
                            className="selected-app-note"
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                          >
                            <CheckCircle2
                              size={16}
                            />

                            <span>
                              {
                                upiApp
                              }{" "}
                              selected
                            </span>
                          </motion.div>
                        )}

                      </motion.div>
                    )}

                    {/* CARD */}
                    {onlineMethod ===
                      "Card" && (
                      <motion.div
                        key="card"
                        className="payment-detail"
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                      >

                        <div className="field full">
                          <label>
                            Card Number
                          </label>

                          <input
                            name="number"
                            value={
                              card.number
                            }
                            onChange={
                              updateCard
                            }
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                          />
                        </div>

                        <div className="form-grid payment-card-grid">

                          <div className="field">
                            <label>
                              Cardholder Name
                            </label>

                            <input
                              name="name"
                              value={
                                card.name
                              }
                              onChange={
                                updateCard
                              }
                              placeholder="Name on card"
                            />
                          </div>

                          <div className="field">
                            <label>
                              Expiry
                            </label>

                            <input
                              name="expiry"
                              value={
                                card.expiry
                              }
                              onChange={
                                updateCard
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>

                          <div className="field">
                            <label>
                              CVV
                            </label>

                            <input
                              type="password"
                              name="cvv"
                              value={
                                card.cvv
                              }
                              onChange={
                                updateCard
                              }
                              placeholder="•••"
                              maxLength={3}
                            />
                          </div>

                        </div>

                        <div className="card-security">
                          <LockKeyhole
                            size={15}
                          />

                          Your card details are
                          encrypted in this demo
                          checkout.
                        </div>

                      </motion.div>
                    )}

                    {/* NET BANKING */}
                    {onlineMethod ===
                      "Net Banking" && (
                      <motion.div
                        key="bank"
                        className="payment-detail"
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                      >

                        <div className="field">
                          <label>
                            Select Your Bank
                          </label>

                          <select
                            value={bank}
                            onChange={(
                              event
                            ) => {
                              setBank(
                                event.target
                                  .value
                              );
                              setError("");
                            }}
                          >
                            <option value="">
                              Choose your bank
                            </option>

                            <option value="SBI">
                              State Bank of India
                            </option>

                            <option value="HDFC">
                              HDFC Bank
                            </option>

                            <option value="ICICI">
                              ICICI Bank
                            </option>

                            <option value="Axis">
                              Axis Bank
                            </option>

                            <option value="Kotak">
                              Kotak Mahindra Bank
                            </option>

                            <option value="Other">
                              Other Bank
                            </option>
                          </select>
                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                  {error && (
                    <motion.div
                      className="payment-error"
                      initial={{
                        opacity: 0,
                        y: 6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                </motion.div>
              )}

              {/* COD */}
              {paymentMethod ===
                "cod" && (
                <motion.div
                  key="cod"
                  className="cod-panel"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <Banknote size={22} />

                  <div>
                    <strong>
                      Cash on Delivery selected
                    </strong>

                    <span>
                      Pay for your order when it
                      is delivered.
                    </span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* ERROR */}
          {error && (
            <motion.div
              className="checkout-main-error"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {error}
            </motion.div>
          )}

          {/* FINAL BUTTON */}
          <button
            type="submit"
            className="place-order-button"
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="payment-spinner" />
                Processing Payment...
              </>
            ) : paymentMethod ===
              "online" ? (
              <>
                Pay ₹
                {total.toLocaleString(
                  "en-IN"
                )}
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                Place Order
                <CheckCircle2 size={18} />
              </>
            )}
          </button>

        </form>

        {/* =========================================
            RIGHT SUMMARY
        ========================================= */}

        <aside className="checkout-summary">

          <div className="summary-heading">
            <h2>
              Order Summary
            </h2>

            <span>
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}
            </span>
          </div>

          <div className="checkout-products">

            {cart.map((item) => (
              <motion.div
                className="checkout-product"
                key={item.id}
                initial={{
                  opacity: 0,
                  x: 15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                <div className="summary-image-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span>
                    {item.quantity}
                  </span>
                </div>

                <div>
                  <h3>
                    {item.name}
                  </h3>

                  <span>
                    {item.category}
                  </span>
                </div>

                <strong>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </motion.div>
            ))}

          </div>

          <div className="checkout-summary-line">
            <span>
              Subtotal
            </span>

            <strong>
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="checkout-summary-line">
            <span>
              Delivery
            </span>

            <strong>
              {deliveryCharge ===
              0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </strong>
          </div>

          <div className="checkout-summary-total">
            <span>
              Total
            </span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="secure-summary">
            <ShieldCheck size={17} />

            <div>
              <strong>
                Safe & Secure Checkout
              </strong>

              <span>
                Your information is protected
                during checkout.
              </span>
            </div>
          </div>

          <div className="payment-summary">
            <span>
              Payment
            </span>

            <strong>
              {paymentMethod ===
              "online"
                ? `Online • ${onlineMethod}`
                : "Cash on Delivery"}
            </strong>

            <ChevronRight
              size={15}
            />
          </div>

        </aside>

      </section>

      {/* PROCESSING OVERLAY */}

      <AnimatePresence>
        {processing && (
          <motion.div
            className="payment-processing"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="processing-card"
              initial={{
                scale: 0.85,
                y: 20,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
            >
              <motion.div
                className="processing-circle"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <WalletCards size={26} />
              </motion.div>

              <h2>
                Processing Payment
              </h2>

              <p>
                Please wait while we securely
                process your payment.
              </p>

              <div className="processing-dots">
                <span />
                <span />
                <span />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default Checkout;