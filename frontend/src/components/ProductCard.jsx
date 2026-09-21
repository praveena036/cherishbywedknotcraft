import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useShop } from "../context/ShopContext";

import AuthModal from "./AuthModal";

import "./ProductCard.css";

function ProductCard({
  product,
  index = 0,
}) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    isAuthenticated,
  } = useShop();

  const [showAuth, setShowAuth] =
    useState(false);

  const saved =
    isInWishlist(product.id);

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }

    addToCart(product);
  };

  /* =========================================
     AFTER LOGIN
  ========================================= */

  const handleLoginSuccess = () => {
    setShowAuth(false);
  };

  return (
    <>
      <motion.article
        className="product-card"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        transition={{
          duration: 0.65,
          delay: index * 0.08,
        }}
        whileHover={{
          y: -8,
        }}
      >

        {/* =================================
            IMAGE
        ================================= */}

        <div className="product-image-wrap">

          <Link
            to={`/product/${product.id}`}
            className="product-image-link"
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="product-image"
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.6,
              }}
            />
          </Link>

          {/* Badge */}
          <span className="product-badge">
            {product.badge}
          </span>

          {/* Wishlist */}
          <motion.button
            type="button"
            className={`wishlist-button ${
              saved
                ? "saved"
                : ""
            }`}
            onClick={() =>
              toggleWishlist(
                product
              )
            }
            whileHover={{
              scale: 1.12,
            }}
            whileTap={{
              scale: 0.86,
            }}
            aria-label="Wishlist"
          >
            <motion.div
              animate={
                saved
                  ? {
                      scale: [
                        1,
                        1.3,
                        1,
                      ],
                    }
                  : {
                      scale: 1,
                    }
              }
            >
              <Heart
                size={18}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />
            </motion.div>
          </motion.button>

          {/* Add To Cart */}
          <motion.button
            type="button"
            className="quick-cart-button"
            onClick={
              handleAddToCart
            }
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <ShoppingBag
              size={17}
            />

            <span>
              Add to Cart
            </span>
          </motion.button>

        </div>

        {/* =================================
            PRODUCT INFO
        ================================= */}

        <div className="product-info">

          <span className="product-category">
            {product.category}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="product-name"
          >
            {product.name}
          </Link>

          <div className="product-rating">

            <Star
              size={14}
              fill="currentColor"
            />

            <strong>
              {product.rating}
            </strong>

            <span>
              ({product.reviews})
            </span>

          </div>

          <div className="product-price-row">

            <strong>
              ₹{product.price}
            </strong>

            <del>
              ₹{product.oldPrice}
            </del>

            <span>
              {Math.round(
                (1 -
                  product.price /
                    product.oldPrice) *
                  100
              )}
              % OFF
            </span>

          </div>

        </div>
      </motion.article>

      {/* ===================================
          LOGIN / OTP MODAL
      ==================================== */}

      <AuthModal
        isOpen={showAuth}
        onClose={() =>
          setShowAuth(false)
        }
        pendingProduct={product}
        onLoginSuccess={
          handleLoginSuccess
        }
      />
    </>
  );
}

export default ProductCard;