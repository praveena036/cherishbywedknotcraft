import { motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  CreditCard,
  Sparkles,
} from "lucide-react";

import "./HowItWorks.css";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Choose a Design",
    text:
      "Explore wedding and celebration invitations and find a style you love.",
  },
  {
    icon: Heart,
    number: "02",
    title: "Save Your Favourite",
    text:
      "Add beautiful designs to your wishlist and keep your favourites together.",
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: "Add to Cart",
    text:
      "Select your invitation and add it to your cart for a smooth shopping experience.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Checkout Securely",
    text:
      "Enter your delivery details, choose your payment method and place your order.",
  },
];

function HowItWorks() {
  return (
    <section className="how-section">

      <div className="how-container">

        <motion.div
          className="how-heading"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div>
            <Sparkles size={15} />

            <span>
              SIMPLE • BEAUTIFUL • EASY
            </span>
          </div>

          <h2>
            From Browsing
            <span>
              To Your Big Day
            </span>
          </h2>
        </motion.div>

        <div className="how-steps">

          <div className="how-line" />

          {steps.map(
            (step, index) => {
              const Icon =
                step.icon;

              return (
                <motion.article
                  className="how-step"
                  key={step.title}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.12,
                  }}
                >
                  <motion.div
                    className="how-icon"
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                  >
                    <Icon size={23} />
                  </motion.div>

                  <span className="how-number">
                    {step.number}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.text}
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

export default HowItWorks;