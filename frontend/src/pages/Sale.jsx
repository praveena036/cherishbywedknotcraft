import { useMemo, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  ArrowDownUp,
  Sparkles,
  X,
  ChevronDown,
} from "lucide-react";

import saleProducts, {
  saleThemes,
  saleColors,
  saleCardTypes,
} from "../data/saleProducts";

import SaleProductCard from "../components/SaleProductCard";

import "./Sale.css";

function Sale() {
  const [search, setSearch] =
    useState("");

  const [theme, setTheme] =
    useState("All");

  const [color, setColor] =
    useState("All");

  const [cardType, setCardType] =
    useState("All");

  const [price, setPrice] =
    useState("All");

  const [sort, setSort] =
    useState("featured");

  const [
    mobileFilters,
    setMobileFilters,
  ] = useState(false);

  const filteredProducts =
    useMemo(() => {
      let result = [
        ...saleProducts,
      ];

      const query =
        search
          .trim()
          .toLowerCase();

      if (query) {
        result = result.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(query) ||
            product.theme
              .toLowerCase()
              .includes(query) ||
            product.color
              .toLowerCase()
              .includes(query)
        );
      }

      if (theme !== "All") {
        result = result.filter(
          (product) =>
            product.theme ===
            theme
        );
      }

      if (color !== "All") {
        result = result.filter(
          (product) =>
            product.color ===
            color
        );
      }

      if (cardType !== "All") {
        result = result.filter(
          (product) =>
            product.cardType ===
            cardType
        );
      }

      if (price === "under500") {
        result = result.filter(
          (product) =>
            product.price < 500
        );
      }

      if (price === "500to1000") {
        result = result.filter(
          (product) =>
            product.price >=
              500 &&
            product.price <=
              1000
        );
      }

      if (price === "1000to1500") {
        result = result.filter(
          (product) =>
            product.price >
              1000 &&
            product.price <=
              1500
        );
      }

      if (price === "above1500") {
        result = result.filter(
          (product) =>
            product.price >
            1500
        );
      }

      if (sort === "low") {
        result.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (sort === "high") {
        result.sort(
          (a, b) =>
            b.price - a.price
        );
      }

      if (sort === "az") {
        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      if (sort === "discount") {
        result.sort(
          (a, b) =>
            b.salePercent -
            a.salePercent
        );
      }

      return result;
    }, [
      search,
      theme,
      color,
      cardType,
      price,
      sort,
    ]);

  const clearFilters = () => {
    setSearch("");
    setTheme("All");
    setColor("All");
    setCardType("All");
    setPrice("All");
  };

  return (
    <main className="sale-page">

      {/* ===================================
          HERO
      =================================== */}

      <section className="sale-hero">

        <motion.div
          className="sale-hero-orb orb-left"
          animate={{
            x: [0, 30, 0],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="sale-hero-orb orb-right"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="sale-hero-content"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <motion.div
            className="sale-eyebrow"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles size={15} />
            SPECIAL OFFER COLLECTION
            <Sparkles size={15} />
          </motion.div>

          <h1>
            Beautiful Invitations
            <span>
              50% Off Collection
            </span>
          </h1>

          <p>
            Elegant wedding and celebration
            invitations at a special price,
            curated for your beautiful moments.
          </p>

          <div className="sale-benefits">
            <div>
              <strong>
                -50%
              </strong>
              <span>
                On Sale Designs
              </span>
            </div>

            <i />

            <div>
              <strong>
                Premium
              </strong>
              <span>
                Invitation Styles
              </span>
            </div>

            <i />

            <div>
              <strong>
                Cherish
              </strong>
              <span>
                Special Collection
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="sale-floating-decoration deco-one"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>

        <motion.div
          className="sale-floating-decoration deco-two"
          animate={{
            y: [0, 14, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          ✧
        </motion.div>
      </section>

      {/* ===================================
          SEARCH + SORT
      =================================== */}

      <section className="sale-toolbar-section">

        <div className="sale-toolbar">

          <div className="sale-search-box">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search sale invitations..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="mobile-filter-btn"
            onClick={() =>
              setMobileFilters(
                true
              )
            }
          >
            <SlidersHorizontal
              size={16}
            />
            Filters
          </button>

          <div className="sale-sort-box">
            <ArrowDownUp size={16} />

            <span>
              Sort
            </span>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="discount">
                Biggest Discount
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="az">
                A-Z
              </option>
            </select>

            <ChevronDown size={14} />
          </div>

        </div>
      </section>

      {/* ===================================
          CONTENT
      =================================== */}

      <section className="sale-content">

        {/* SIDEBAR */}
        <aside className="sale-sidebar">

          <div className="sale-filter-heading">

            <div>
              <span>
                REFINE
              </span>

              <h2>
                Filters
              </h2>
            </div>

            <button
              type="button"
              onClick={
                clearFilters
              }
            >
              Clear
            </button>

          </div>

          <FilterSection title="Price">
            <FilterRadio
              label="Any Price"
              checked={
                price === "All"
              }
              onChange={() =>
                setPrice("All")
              }
              name="price"
            />

            <FilterRadio
              label="Under ₹500"
              checked={
                price ===
                "under500"
              }
              onChange={() =>
                setPrice(
                  "under500"
                )
              }
              name="price"
            />

            <FilterRadio
              label="₹500 – ₹1,000"
              checked={
                price ===
                "500to1000"
              }
              onChange={() =>
                setPrice(
                  "500to1000"
                )
              }
              name="price"
            />

            <FilterRadio
              label="₹1,000 – ₹1,500"
              checked={
                price ===
                "1000to1500"
              }
              onChange={() =>
                setPrice(
                  "1000to1500"
                )
              }
              name="price"
            />

            <FilterRadio
              label="Above ₹1,500"
              checked={
                price ===
                "above1500"
              }
              onChange={() =>
                setPrice(
                  "above1500"
                )
              }
              name="price"
            />
          </FilterSection>

          <FilterSection title="Theme">
            {saleThemes
              .filter(
                (x) =>
                  x !== "All"
              )
              .map((item) => (
                <FilterRadio
                  key={item}
                  label={item}
                  checked={
                    theme ===
                    item
                  }
                  onChange={() =>
                    setTheme(
                      item
                    )
                  }
                  name="theme"
                />
              ))}
          </FilterSection>

          <FilterSection title="Color">
            {saleColors
              .filter(
                (x) =>
                  x !== "All"
              )
              .map((item) => (
                <FilterRadio
                  key={item}
                  label={item}
                  checked={
                    color ===
                    item
                  }
                  onChange={() =>
                    setColor(
                      item
                    )
                  }
                  name="color"
                />
              ))}
          </FilterSection>

          <FilterSection title="Card Type">
            {saleCardTypes
              .filter(
                (x) =>
                  x !== "All"
              )
              .map((item) => (
                <FilterRadio
                  key={item}
                  label={item}
                  checked={
                    cardType ===
                    item
                  }
                  onChange={() =>
                    setCardType(
                      item
                    )
                  }
                  name="card-type"
                />
              ))}
          </FilterSection>

        </aside>

        {/* RESULTS */}
        <div className="sale-results">

          <div className="sale-results-head">

            <div>
              <span>
                CHERISH SPECIAL OFFERS
              </span>

              <h2>
                Sale Invitations
              </h2>
            </div>

            <strong>
              {
                filteredProducts.length
              }{" "}
              products
            </strong>

          </div>

          <AnimatePresence>
            {filteredProducts.length >
            0 ? (
              <motion.div
                className="sale-product-grid"
                layout
              >
                {filteredProducts.map(
                  (
                    product,
                    index
                  ) => (
                    <SaleProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                      index={
                        index
                      }
                    />
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                className="sale-empty"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                <Sparkles size={35} />

                <h3>
                  No sale invitations found
                </h3>

                <p>
                  Try clearing the
                  filters or changing
                  your search.
                </p>

                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                >
                  View All Sale Designs
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}

      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              className="sale-mobile-overlay"
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
                setMobileFilters(
                  false
                )
              }
            />

            <motion.aside
              className="sale-mobile-drawer"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
            >
              <div className="sale-mobile-heading">

                <div>
                  <span>
                    REFINE
                  </span>

                  <h2>
                    Filters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFilters(
                      false
                    )
                  }
                >
                  <X size={19} />
                </button>

              </div>

              <div className="sale-mobile-body">

                <FilterSection title="Price">
                  <FilterRadio
                    label="Any Price"
                    checked={
                      price ===
                      "All"
                    }
                    onChange={() =>
                      setPrice(
                        "All"
                      )
                    }
                    name="m-price"
                  />

                  <FilterRadio
                    label="Under ₹500"
                    checked={
                      price ===
                      "under500"
                    }
                    onChange={() =>
                      setPrice(
                        "under500"
                      )
                    }
                    name="m-price"
                  />

                  <FilterRadio
                    label="₹500 – ₹1,000"
                    checked={
                      price ===
                      "500to1000"
                    }
                    onChange={() =>
                      setPrice(
                        "500to1000"
                      )
                    }
                    name="m-price"
                  />
                </FilterSection>

                <FilterSection title="Theme">
                  {saleThemes
                    .filter(
                      (x) =>
                        x !==
                        "All"
                    )
                    .map(
                      (item) => (
                        <FilterRadio
                          key={
                            item
                          }
                          label={
                            item
                          }
                          checked={
                            theme ===
                            item
                          }
                          onChange={() =>
                            setTheme(
                              item
                            )
                          }
                          name="m-theme"
                        />
                      )
                    )}
                </FilterSection>

                <FilterSection title="Color">
                  {saleColors
                    .filter(
                      (x) =>
                        x !==
                        "All"
                    )
                    .map(
                      (item) => (
                        <FilterRadio
                          key={
                            item
                          }
                          label={
                            item
                          }
                          checked={
                            color ===
                            item
                          }
                          onChange={() =>
                            setColor(
                              item
                            )
                          }
                          name="m-color"
                        />
                      )
                    )}
                </FilterSection>

              </div>

              <button
                type="button"
                className="apply-mobile-sale-filter"
                onClick={() =>
                  setMobileFilters(
                    false
                  )
                }
              >
                Show{" "}
                {
                  filteredProducts.length
                }{" "}
                Products
              </button>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}

function FilterSection({
  title,
  children,
}) {
  return (
    <div className="sale-filter-section">

      <h3>
        {title}
      </h3>

      <div>
        {children}
      </div>

    </div>
  );
}

function FilterRadio({
  label,
  checked,
  onChange,
  name,
}) {
  return (
    <label className="sale-radio-row">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />

      <span>
        {label}
      </span>
    </label>
  );
}

export default Sale;