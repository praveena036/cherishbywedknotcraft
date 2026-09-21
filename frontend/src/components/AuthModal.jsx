import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  LockKeyhole,
  Phone,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";

import { useShop } from "../context/ShopContext";

import "./AuthModal.css";

function AuthModal({
  isOpen,
  onClose,
  pendingProduct,
  onLoginSuccess,
}) {
  const {
    loginUser,
    addToCart,
  } = useShop();

  const [step, setStep] =
    useState("phone");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [error, setError] =
    useState("");

  const [seconds, setSeconds] =
    useState(30);

  const [verified, setVerified] =
    useState(false);

  /* =========================================
     RESET MODAL
  ========================================= */

  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError("");
      setSeconds(30);
      setVerified(false);
    }
  }, [isOpen]);

  /* =========================================
     OTP TIMER
  ========================================= */

  useEffect(() => {
    if (
      !isOpen ||
      step !== "otp" ||
      seconds <= 0
    ) {
      return;
    }

    const timer =
      setInterval(() => {
        setSeconds(
          (current) =>
            current - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    isOpen,
    step,
    seconds,
  ]);

  if (!isOpen) {
    return null;
  }

  /* =========================================
     PHONE VALIDATION
  ========================================= */

  const handlePhoneSubmit = (
    event
  ) => {
    event.preventDefault();

    const cleanPhone =
      phone.replace(/\D/g, "");

    if (
      cleanPhone.length !== 10
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setError("");

    /*
      Demo OTP.
      In production this will be generated
      and sent from Django/SMS provider.
    */

    setStep("otp");
    setSeconds(30);
  };

  /* =========================================
     OTP VERIFICATION
  ========================================= */

  const handleOtpSubmit = (
    event
  ) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP."
      );
      return;
    }

    /*
      DEMO OTP = 123456
    */

    if (otp !== "123456") {
      setError(
        "Invalid OTP. Use 123456 for this demo."
      );
      return;
    }

    setError("");

    loginUser(phone);

    if (pendingProduct) {
      addToCart(
        pendingProduct
      );
    }

    setVerified(true);
    setStep("success");

    setTimeout(() => {
      onLoginSuccess?.();
    }, 900);
  };

  /* =========================================
     RESEND OTP
  ========================================= */

  const resendOtp = () => {
    setSeconds(30);
    setOtp("");
    setError("");
  };

  /* =========================================
     GO BACK
  ========================================= */

  const goBack = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="auth-modal-backdrop"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
      >

        <motion.div
          className="auth-modal"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.94,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* CLOSE */}
          <button
            type="button"
            className="auth-close"
            onClick={onClose}
          >
            <X size={19} />
          </button>

          {/* TOP DECORATION */}
          <div className="auth-decoration">
            <motion.div
              animate={{
                rotate: [
                  0,
                  6,
                  0,
                  -6,
                  0,
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              ♡
            </motion.div>
          </div>

          <AnimatePresence mode="wait">

            {/* =================================
                PHONE STEP
            ================================= */}

            {step === "phone" && (
              <motion.div
                key="phone"
                className="auth-step"
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -25,
                }}
              >

                <span className="auth-kicker">
                  Welcome to Cherish
                </span>

                <h2>
                  Sign in to continue
                </h2>

                <p className="auth-description">
                  Sign in with your mobile
                  number to add this beautiful
                  invitation to your cart.
                </p>

                {pendingProduct && (
                  <div className="pending-product">

                    <img
                      src={
                        pendingProduct.image
                      }
                      alt={
                        pendingProduct.name
                      }
                    />

                    <div>
                      <span>
                        Adding to cart
                      </span>

                      <strong>
                        {
                          pendingProduct.name
                        }
                      </strong>

                      <small>
                        ₹
                        {
                          pendingProduct.price
                        }
                      </small>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={
                    handlePhoneSubmit
                  }
                >

                  <label className="auth-label">
                    Mobile Number
                  </label>

                  <div className="phone-input">

                    <span className="country-code">
                      IN +91
                    </span>

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(
                        event
                      ) =>
                        setPhone(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="Enter 10-digit number"
                    />

                    <Phone
                      size={18}
                    />

                  </div>

                  {error && (
                    <div className="auth-error">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="auth-primary-button"
                  >
                    Continue
                    <ArrowRight
                      size={18}
                    />
                  </button>

                </form>

                <div className="auth-security">
                  <ShieldCheck
                    size={17}
                  />

                  <span>
                    Your number is used only
                    for secure account
                    verification.
                  </span>
                </div>

              </motion.div>
            )}

            {/* =================================
                OTP STEP
            ================================= */}

            {step === "otp" && (
              <motion.div
                key="otp"
                className="auth-step"
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -25,
                }}
              >

                <button
                  type="button"
                  className="auth-back"
                  onClick={goBack}
                >
                  <ChevronLeft
                    size={18}
                  />

                  Change number
                </button>

                <span className="auth-kicker">
                  Verification
                </span>

                <h2>
                  Verify your number
                </h2>

                <p className="auth-description">
                  Enter the 6-digit OTP sent
                  to
                  <strong>
                    {" "}
                    +91 {phone}
                  </strong>
                </p>

                <div className="otp-icon">
                  <LockKeyhole
                    size={28}
                  />
                </div>

                <form
                  onSubmit={
                    handleOtpSubmit
                  }
                >

                  <label className="auth-label">
                    Enter OTP
                  </label>

                  <input
                    className="otp-input"
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(
                      event
                    ) =>
                      setOtp(
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="••••••"
                    autoFocus
                  />

                  <div className="demo-otp">
                    <span>
                      Demo OTP
                    </span>

                    <strong>
                      123456
                    </strong>
                  </div>

                  {error && (
                    <div className="auth-error">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="auth-primary-button"
                  >
                    Verify & Continue
                    <ArrowRight
                      size={18}
                    />
                  </button>

                </form>

                <div className="resend-row">
                  {seconds > 0 ? (
                    <span>
                      Resend OTP in{" "}
                      <strong>
                        00:
                        {String(
                          seconds
                        ).padStart(
                          2,
                          "0"
                        )}
                      </strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOtp}
                    >
                      <RefreshCw
                        size={15}
                      />
                      Resend OTP
                    </button>
                  )}
                </div>

              </motion.div>
            )}

            {/* =================================
                SUCCESS
            ================================= */}

            {step === "success" && (
              <motion.div
                key="success"
                className="auth-step auth-success"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >

                <motion.div
                  className="success-check"
                  initial={{
                    scale: 0,
                    rotate: -15,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <CheckCircle2
                    size={45}
                  />
                </motion.div>

                <h2>
                  You're signed in!
                </h2>

                <p>
                  Your invitation has been
                  added to the cart successfully.
                </p>

                <motion.div
                  animate={{
                    y: [
                      0,
                      -7,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="success-heart"
                >
                  ♡
                </motion.div>

              </motion.div>
            )}

          </AnimatePresence>

          <div className="auth-footer">
            Secure & simple shopping at
            <strong>
              Cherish By Wed Knot Craft
            </strong>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AuthModal;