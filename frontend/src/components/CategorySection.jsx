import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import ElegantFlora from "../assets/images/Elegant_Flora.png";
import FloralIndian from "../assets/images/Floral_Indian.png";
import EmeraldGreen from "../assets/images/Emerald_Green.png";
import Illustration from "../assets/images/Invitation_Luxury_PSD.png";

import "./CategorySection.css";

const categories = [
  {
    id: 1,
    title: "Floral Invitations",
    subtitle: "Soft & Romantic Designs",
    image: ElegantFlora,
  },
  {
    id: 2,
    title: "Traditional Wedding",
    subtitle: "Timeless Indian Elegance",
    image: Illustration,
  },
  {
    id: 3,
    title: "Luxury Collection",
    subtitle: "Premium Wedding Designs",
    image: EmeraldGreen,
  },
  {
    id: 4,
    title: "Elegant Indian",
    subtitle: "Beautifully Crafted Details",
    image: FloralIndian,
  },
];

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">

        {/* Section Heading */}
        <motion.div
          className="category-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="category-eyebrow">
            <Sparkles size={15} />
            <span>Find Your Perfect Style</span>
          </div>

          <h2>
            Invitations For
            <span>Every Love Story</span>
          </h2>

          <p>
            Discover beautiful wedding invitation collections
            designed to make every celebration unforgettable.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              className="category-card"
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -10,
              }}
            >
              <div className="category-image-wrap">

                {/* Image */}
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                  whileHover={{ scale: 1.08 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />

                {/* Overlay */}
                <motion.div
                  className="category-overlay"
                  initial={{ opacity: 0.78 }}
                  whileHover={{ opacity: 0.94 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Arrow */}
                <motion.div
                  className="category-arrow"
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    rotate: -12,
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                    rotate: 8,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <ArrowUpRight size={20} />
                </motion.div>

                {/* Text */}
                <motion.div
                  className="category-content"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{category.subtitle}</span>

                  <h3>{category.title}</h3>

                  <motion.div
                    className="category-line"
                    initial={{ width: 35 }}
                    whileHover={{ width: 75 }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;