import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import products, {
  categories,
} from "../data/products";

import ProductCard from "../components/ProductCard";

import "./Shop.css";

function Shop() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [sort, setSort] =
    useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search.trim()) {
      const query =
        search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query)
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

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="shop-page">

      <section className="shop-hero">

        <motion.div
          className="shop-hero-content"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="shop-eyebrow">
            <Sparkles size={15} />
            <span>Wedding Invitation Shop</span>
          </div>

          <h1>
            Shop Your
            <span>Perfect Invitation</span>
          </h1>

          <p>
            Browse curated wedding
            invitation designs for every
            beautiful celebration.
          </p>
        </motion.div>

      </section>

      <section className="shop-content">

        <div className="shop-toolbar">

          <div className="shop-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search wedding invitations..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <div className="shop-filter">
            <SlidersHorizontal size={17} />

            <select
              value={sort}
              onChange={(event) =>
                setSort(
                  event.target.value
                )
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>
            </select>
          </div>

        </div>

        <div className="shop-category-row">

          {categories.map(
            (item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "shop-category active"
                    : "shop-category"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            )
          )}

        </div>

        <div className="shop-result-heading">
          <div>
            <span>Collection</span>

            <h2>
              Wedding Invitations
            </h2>
          </div>

          <p>
            {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="shop-grid">
            {filteredProducts.map(
              (product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              )
            )}
          </div>
        ) : (
          <div className="shop-empty">
            <Search size={30} />

            <h3>
              No invitations found
            </h3>

            <p>
              Try another search or category.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}

export default Shop;