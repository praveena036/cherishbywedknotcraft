import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import products, {
  categories,
  categoryMeta,
} from "../data/products";

import ProductCard from "../components/ProductCard";

import "./Categories.css";

function Categories() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const urlCategory =
    searchParams.get("category");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    categories.includes(
      urlCategory
    )
      ? urlCategory
      : "All"
  );

  const [
    search,
    setSearch,
  ] = useState("");

  /* =========================================
     CATEGORY SYNC
  ========================================= */

  useEffect(() => {
    if (
      urlCategory &&
      categories.includes(
        urlCategory
      )
    ) {
      setSelectedCategory(
        urlCategory
      );
    }
  }, [urlCategory]);

  /* =========================================
     CURRENT PRODUCTS
  ========================================= */

  const filteredProducts =
    useMemo(() => {
      let result = [...products];

      if (
        selectedCategory !==
        "All"
      ) {
        result =
          result.filter(
            (product) =>
              product.category ===
              selectedCategory
          );
      }

      if (search.trim()) {
        const query =
          search
            .toLowerCase()
            .trim();

        result =
          result.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(query) ||
              product.category
                .toLowerCase()
                .includes(query)
          );
      }

      return result;
    }, [
      selectedCategory,
      search,
    ]);

  /* =========================================
     SELECT CATEGORY
  ========================================= */

  const selectCategory =
    (category) => {
      setSelectedCategory(
        category
      );

      setSearch("");

      if (category === "All") {
        setSearchParams({});
      } else {
        setSearchParams({
          category,
        });
      };

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =========================================
     CATEGORY META
  ========================================= */

  const meta =
    categoryMeta[
      selectedCategory
    ] ||
    categoryMeta.All;

  /* =========================================
     LIVE BACKGROUND
     Uses first matching image.
  ========================================= */

  const backgroundImage =
    useMemo(() => {
      if (
        selectedCategory ===
        "All"
      ) {
        return (
          products.find(
            (product) =>
              product.sourceFile
                ?.toLowerCase()
                .includes(
                  "romantic-palace"
                )
          )?.image ||
          products[0]?.image
        );
      }

      return (
        products.find(
          (product) =>
            product.category ===
            selectedCategory
        )?.image ||
        products[0]?.image
      );
    }, [
      selectedCategory,
    ]);

  return (
    <main className="categories-page">

      {/* =================================================
          CATEGORY HERO
      ================================================== */}

      <section className="categories-hero">

        <AnimatePresence mode="wait">
          <motion.div
            key={
              selectedCategory
            }
            className="category-live-background"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <motion.img
              src={
                backgroundImage
              }
              alt=""
              initial={{
                scale: 1.05,
                x: -10,
              }}
              animate={{
                scale: 1.14,
                x: 10,
              }}
              transition={{
                duration: 12,
                ease: "linear",
              }}
            />

          </motion.div>
        </AnimatePresence>

        <div className="categories-hero-overlay" />

        {/* Floating sparkle 1 */}
        <motion.span
          className="category-float float-one"
          animate={{
            y: [
              0,
              -16,
              0,
            ],
            rotate: [
              0,
              10,
              0,
            ],
            opacity: [
              0.35,
              0.9,
              0.35,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>

        {/* Floating sparkle 2 */}
        <motion.span
          className="category-float float-two"
          animate={{
            y: [
              0,
              14,
              0,
            ],
            x: [
              0,
              8,
              0,
            ],
            opacity: [
              0.25,
              0.8,
              0.25,
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          ✧
        </motion.span>

        <motion.div
          className="categories-hero-content"
          key={
            selectedCategory
          }
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <motion.div
            className="categories-eyebrow"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <Sparkles
              size={15}
            />

            <span>
              {meta.shortTitle}
            </span>
          </motion.div>

          <h1>
            {meta.title
              .replace(
                " Invitations",
                ""
              )}

            <span>
              Invitations
            </span>
          </h1>

          <motion.p
            key={
              meta.quote
            }
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
          >
            “{meta.quote}”
          </motion.p>

          <motion.div
            className="category-description"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
          >
            {meta.description}
          </motion.div>

        </motion.div>

        {/* Live moving strip */}
        <div className="category-marquee">
          <motion.div
            className="category-marquee-track"
            animate={{
              x: [
                "0%",
                "-50%",
              ],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...categories, ...categories].map(
              (
                category,
                index
              ) => (
                <span
                  key={`${category}-${index}`}
                >
                  {category}
                  <b>✦</b>
                </span>
              )
            )}
          </motion.div>
        </div>

      </section>

      {/* =================================================
          CATEGORY NAVIGATION
      ================================================== */}

      <section className="category-selector-section">

        <div className="category-selector-top">

          <div>
            <span>
              Explore Collections
            </span>

            <h2>
              Choose Your
              Celebration
            </h2>
          </div>

          <p>
            {filteredProducts.length}{" "}
            designs
          </p>

        </div>

        <div className="category-selector">

          {categories.map(
            (
              category,
              index
            ) => {
              const count =
                category ===
                "All"
                  ? products.length
                  : products.filter(
                      (
                        product
                      ) =>
                        product.category ===
                        category
                    ).length;

              const itemMeta =
                categoryMeta[
                  category
                ] ||
                categoryMeta.All;

              return (
                <motion.button
                  key={category}
                  type="button"
                  className={`category-pill ${
                    selectedCategory ===
                    category
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    selectCategory(
                      category
                    )
                  }
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.04,
                    duration: 0.35,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <span className="pill-icon">
                    {itemMeta.icon}
                  </span>

                  <span className="pill-text">
                    {category}
                  </span>

                  <span className="pill-count">
                    {count}
                  </span>

                  <ArrowRight
                    size={14}
                  />
                </motion.button>
              );
            }
          )}

        </div>

      </section>

      {/* =================================================
          RESULTS
      ================================================== */}

      <section className="category-results">

        <div className="results-toolbar">

          <div className="results-title">

            <span>
              {selectedCategory ===
              "All"
                ? "Our Complete Collection"
                : `${selectedCategory} Collection`}
            </span>

            <h2>
              {meta.shortTitle}
            </h2>
          </div>

          <div className="category-search">

            <Search
              size={18}
            />

            <input
              type="text"
              placeholder="Search this collection..."
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target
                    .value
                )
              }
            />

          </div>

        </div>

        {filteredProducts.length >
        0 ? (
          <motion.div
            layout
            className="category-product-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(
                (
                  product,
                  index
                ) => (
                  <motion.div
                    key={
                      product.id
                    }
                    layout
                    initial={{
                      opacity: 0,
                      y: 40,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index *
                        0.035,
                    }}
                  >
                    <ProductCard
                      product={
                        product
                      }
                      index={0}
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="empty-category"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <span>
              {meta.icon}
            </span>

            <h3>
              No designs found
            </h3>

            <p>
              Try another search
              or choose a different
              collection.
            </p>

            <button
              type="button"
              onClick={() =>
                selectCategory(
                  "All"
                )
              }
            >
              View All Invitations
            </button>
          </motion.div>
        )}

      </section>

    </main>
  );
}

export default Categories;