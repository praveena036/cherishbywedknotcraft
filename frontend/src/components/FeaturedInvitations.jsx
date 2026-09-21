import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import products from "../data/products";
import { useShop } from "../context/ShopContext";

import "./FeaturedInvitations.css";

function FeaturedInvitations() {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    isAuthenticated,
  } = useShop();

  const featuredProducts =
    products.slice(0, 6);

  return (
    <section className="featured-invitations-section">

      <div className="featured-bg-glow" />

      <div className="featured-container">

        {/* SECTION HEADER */}
        <motion.div
          className="featured-heading"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="featured-eyebrow">
            <Sparkles size={15} />
            <span>OUR FAVOURITES</span>
          </div>

          <h2>
            Beautifully Chosen
            <span>For Beautiful Moments</span>
          </h2>

          <p>
            Explore some of our most loved invitation
            designs, created to make your first impression
            unforgettable.
          </p>
        </motion.div>

        {/* PRODUCTS */}
        <div className="featured-grid">

          {featuredProducts.map(
            (product, index) => {
              const saved =
                isInWishlist(
                  product.id
                );

              return (
                <motion.article
                  key={product.id}
                  className="featured-card"
                  initial={{
                    opacity: 0,
                    y: 55,
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
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    y: -9,
                  }}
                >
                  <div className="featured-image-wrap">

                    <Link
                      to={`/product/${product.id}`}
                      className="featured-image-link"
                    >
                      <motion.img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.65,
                        }}
                      />
                    </Link>

                    <span className="featured-label">
                      {product.badge}
                    </span>

                    <motion.button
                      type="button"
                      className={`featured-heart ${
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

                    <motion.div
                      className="featured-add-overlay"
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileHover={{
                        opacity: 1,
                        y: 0,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            isAuthenticated
                          ) {
                            addToCart(
                              product
                            );
                          }
                        }}
                      >
                        <ShoppingBag
                          size={16}
                        />
                        Add to Cart
                      </button>
                    </motion.div>

                  </div>

                  <div className="featured-info">

                    <span>
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="featured-price">
                      <strong>
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      {product.oldPrice && (
                        <del>
                          ₹
                          {product.oldPrice.toLocaleString(
                            "en-IN"
                          )}
                        </del>
                      )}
                    </div>

                  </div>
                </motion.article>
              );
            }
          )}

        </div>

        {/* VIEW ALL */}
        <motion.div
          className="featured-view-all"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <Link
            to="/shop"
            className="featured-view-button"
          >
            View All Invitations
            <ArrowRight size={17} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedInvitations;