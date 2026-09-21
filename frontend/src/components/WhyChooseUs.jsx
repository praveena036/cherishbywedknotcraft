import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Palette,
  ShieldCheck,
} from "lucide-react";

import "./WhyChooseUs.css";

const features = [
  {
    icon: Heart,
    number: "01",
    title: "Made With Love",
    text:
      "Every design is created with attention to the little details that make your celebration special.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Elegant Designs",
    text:
      "From timeless traditions to modern styles, find an invitation that reflects your story.",
  },
  {
    icon: Palette,
    number: "03",
    title: "Beautiful Choices",
    text:
      "Explore multiple themes, colours and celebration styles in one beautiful collection.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Simple Shopping",
    text:
      "Choose your design, add it to your cart and complete your order through a smooth checkout.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="why-container">

        <motion.div
          className="why-intro"
          initial={{
            opacity: 0,
            x: -45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <span>
            WHY CHERISH
          </span>

          <h2>
            More than an invitation.
            <em>It's the first memory.</em>
          </h2>

          <p>
            We bring beautiful design and a
            simple shopping experience together
            so your celebration begins beautifully
            from the very first impression.
          </p>

          <div className="why-quote">
            “The little details make
            the biggest memories.”
          </div>
        </motion.div>

        <div className="why-grid">

          {features.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <motion.article
                  className="why-card"
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                >
                  <span className="why-number">
                    {item.number}
                  </span>

                  <div className="why-icon">
                    <Icon size={22} />
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>
                </motion.article>
              );
            }
          )}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;