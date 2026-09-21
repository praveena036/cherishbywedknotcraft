import { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Heart,
  ShoppingBag,
  Eye,
  X,
  Star,
} from "lucide-react";

import { useShop } from "../context/ShopContext";

import AuthModal from "./AuthModal";

import "./SaleProductCard.css";

function SaleProductCard({
  product,
  index = 0,
}) {
  const {
    toggleWishlist,
    isInWishlist,
    addToCart,
    isAuthenticated,
  } = useShop();

  const [showQuickView, setShowQuickView] =
    useState(false);

  const [showAuth, setShowAuth] =
    useState(false);

  const saved =
    isInWishlist(product.id);

  const addProduct = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }

    addToCart(product);
  };

  return (
    <>
      <motion.article
        className="sale-product-card"
        initial={{
          opacity: 0,
          y: 45,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          delay:
            (index % 8) * 0.05,
        }}
        whileHover={{
          y: -8,
        }}
      >
        <div className="sale-card-image">

          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{
              scale: 1.07,
            }}
            transition={{
              duration: 0.55,
            }}
          />

          <div className="sale-card-gradient" />

          {/* SALE BADGE */}
          <motion.span
            className="sale-percent-badge"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            -50%
          </motion.span>

          {/* WISHLIST */}
          <motion.button
            type="button"
            className={`sale-wishlist ${
              saved ? "saved" : ""
            }`}
            onClick={() =>
              toggleWishlist(
                product
              )
            }
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.85,
            }}
          >
            <Heart
              size={18}
              fill={
                saved
                  ? "currentColor"
                  : "none"
              }
            />
          </motion.button>

          {/* QUICK VIEW */}
          <motion.button
            type="button"
            className="quick-view-button"
            onClick={() =>
              setShowQuickView(true)
            }
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileHover={{
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <Eye size={15} />
            Quick View
          </motion.button>

          {/* ADD CART */}
          <motion.button
            type="button"
            className="sale-add-cart"
            onClick={addProduct}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </motion.button>

        </div>

        <div className="sale-card-content">

          <span className="sale-card-theme">
            {product.theme}
          </span>

          <h3>
            {product.name}
          </h3>

          <div className="sale-rating">
            <Star
              size={13}
              fill="currentColor"
            />

            <strong>
              {product.rating}
            </strong>

            <span>
              ({product.reviews})
            </span>
          </div>

          <div className="sale-price-row">

            <strong>
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </strong>

            <del>
              ₹
              {product.oldPrice.toLocaleString(
                "en-IN"
              )}
            </del>

            <span>
              Save 50%
            </span>

          </div>

        </div>
      </motion.article>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            className="sale-quick-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setShowQuickView(false)
            }
          >
            <motion.div
              className="sale-quick-modal"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                type="button"
                className="quick-close"
                onClick={() =>
                  setShowQuickView(false)
                }
              >
                <X size={18} />
              </button>

              <div className="quick-image">
                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>
                  -50%
                </span>
              </div>

              <div className="quick-content">

                <span>
                  {product.theme}
                </span>

                <h2>
                  {product.name}
                </h2>

                <div className="quick-rating">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  {product.rating}
                  {" "}
                  ({product.reviews})
                </div>

                <p>
                  {product.description}
                </p>

                <div className="quick-price">
                  <strong>
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <del>
                    ₹
                    {product.oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </del>

                  <span>
                    50% OFF
                  </span>
                </div>

                <button
                  type="button"
                  className="quick-add-button"
                  onClick={() => {
                    setShowQuickView(
                      false
                    );
                    addProduct();
                  }}
                >
                  <ShoppingBag size={17} />
                  Add to Cart
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuth}
        onClose={() =>
          setShowAuth(false)
        }
        pendingProduct={product}
        onLoginSuccess={() =>
          setShowAuth(false)
        }
      />
    </>
  );
}

export default SaleProductCard;