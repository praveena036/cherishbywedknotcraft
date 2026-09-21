import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useShop } from "../context/ShopContext";

import "./Wishlist.css";

function Wishlist() {
  const shop = useShop();

  /*
    Support the wishlist structure from ShopContext.
    If wishlist exists, use it.
  */
  const wishlist = Array.isArray(shop?.wishlist)
    ? shop.wishlist
    : [];

  /*
    These functions are taken safely from the context.
  */
  const removeWishlist =
    shop?.removeFromWishlist ||
    shop?.toggleWishlist;

  const handleRemove = (item) => {
    if (shop?.removeFromWishlist) {
      shop.removeFromWishlist(item);
      return;
    }

    if (shop?.toggleWishlist) {
      shop.toggleWishlist(item);
    }
  };

  const handleAddToCart = (item) => {
    if (shop?.addToCart) {
      shop.addToCart(item);
    }
  };

  return (
    <main className="wishlist-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="wishlist-hero">

        <div className="wishlist-hero-glow wishlist-glow-one" />
        <div className="wishlist-hero-glow wishlist-glow-two" />

        <motion.div
          className="wishlist-hero-content"
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <div className="wishlist-kicker">
            <Sparkles size={15} />
            <span>
              YOUR FAVOURITES
            </span>
          </div>

          <h1>
            My Wishlist
          </h1>

          <p>
            Save the invitation designs
            you love and keep them ready
            for your special celebration.
          </p>

          <div className="wishlist-count-pill">
            <Heart size={16} />
            <span>
              {wishlist.length} Saved Design
              {wishlist.length !== 1 ? "s" : ""}
            </span>
          </div>

        </motion.div>

      </section>


      {/* =========================
          WISHLIST CONTENT
      ========================== */}

      <section className="wishlist-content">

        {wishlist.length === 0 ? (

          /* EMPTY */
          <motion.div
            className="wishlist-empty"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="empty-heart">
              <Heart size={55} />
            </div>

            <h2>
              Your Wishlist is Empty
            </h2>

            <p>
              You haven't saved any invitation
              designs yet. Explore our collection
              and add your favourites here.
            </p>

            <Link
              to="/shop"
              className="wishlist-shop-button"
            >
              <span>
                Explore Invitations
              </span>

              <ArrowRight size={18} />
            </Link>

          </motion.div>

        ) : (

          /* PRODUCTS */
          <div className="wishlist-grid">

            {wishlist.map((item, index) => (

              <motion.article
                key={
                  item.id ||
                  item.name ||
                  index
                }
                className="wishlist-card"
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                {/* IMAGE */}

                <div className="wishlist-image-wrap">

                  <img
                    src={item.image}
                    alt={
                      item.name ||
                      "Wedding Invitation"
                    }
                    className="wishlist-image"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />


                  {/* WISHLIST REMOVE */}

                  <motion.button
                    type="button"
                    className="wishlist-remove"
                    onClick={() =>
                      handleRemove(item)
                    }
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <Heart
                      size={19}
                      fill="currentColor"
                    />
                  </motion.button>


                  {/* BADGE */}

                  <span className="wishlist-badge">
                    Saved
                  </span>

                </div>


                {/* CONTENT */}

                <div className="wishlist-card-content">

                  <div className="wishlist-category">
                    Wedding Invitation
                  </div>

                  <h2>
                    {item.name ||
                      "Beautiful Invitation"}
                  </h2>

                  <p className="wishlist-description">
                    {item.description ||
                      "Elegant invitation design for your memorable celebration."}
                  </p>


                  {/* PRICE */}

                  <div className="wishlist-price-row">

                    <div className="wishlist-price">

                      <span className="wishlist-current-price">
                        ₹
                        {Number(
                          item.price || 0
                        ).toFixed(0)}
                      </span>

                      {item.oldPrice && (
                        <span className="wishlist-old-price">
                          ₹
                          {Number(
                            item.oldPrice
                          ).toFixed(0)}
                        </span>
                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="wishlist-actions">

                    <motion.button
                      type="button"
                      className="wishlist-cart-button"
                      onClick={() =>
                        handleAddToCart(item)
                      }
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >
                      <ShoppingBag
                        size={17}
                      />

                      <span>
                        Add to Cart
                      </span>
                    </motion.button>


                    <motion.button
                      type="button"
                      className="wishlist-delete-button"
                      onClick={() =>
                        handleRemove(item)
                      }
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      aria-label="Remove"
                    >
                      <Trash2 size={17} />
                    </motion.button>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Wishlist;