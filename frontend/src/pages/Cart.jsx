import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useShop } from "../context/ShopContext";

import "./Cart.css";

function Cart() {
  const {
    cart,
    subtotal,
    deliveryCharge,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShop();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <motion.div
          className="empty-cart"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="empty-cart-icon">
            <ShoppingBag size={34} />
          </div>

          <h1>Your cart is empty</h1>

          <p>
            Discover beautiful wedding
            invitations and add your favourites
            to your cart.
          </p>

          <Link
            to="/shop"
            className="continue-shopping"
          >
            Explore Invitations
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <section className="cart-header">
        <span>Your Selection</span>

        <h1>
          Shopping Cart
        </h1>

        <p>
          Review your invitations before
          checkout.
        </p>
      </section>

      <section className="cart-content">

        <div className="cart-items">

          <AnimatePresence>
            {cart.map((item) => (
              <motion.article
                key={item.id}
                className="cart-item"
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -80,
                  height: 0,
                  marginBottom: 0,
                }}
                layout
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">

                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.name}
                  </h3>

                  <strong>
                    ₹{item.price}
                  </strong>

                  <div className="quantity-row">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      <Minus size={15} />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      <Plus size={15} />
                    </button>

                  </div>

                </div>

                <div className="cart-item-right">

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    className="remove-cart"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    aria-label="Remove"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </motion.article>
            ))}
          </AnimatePresence>

        </div>

        <aside className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <strong>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <div className="secure-note">
            <ShieldCheck size={18} />

            <div>
              <strong>Secure Checkout</strong>

              <span>
                Your order details are
                handled securely.
              </span>
            </div>
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Cart;