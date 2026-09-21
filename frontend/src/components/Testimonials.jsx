import { motion } from "framer-motion";
import {
  Quote,
  Star,
} from "lucide-react";

import "./Testimonials.css";

const testimonials = [
  {
    name: "Priya & Arjun",
    role: "Wedding Couple",
    text:
      "The invitation looked so elegant and matched our wedding theme beautifully. The whole experience felt simple and lovely.",
  },
  {
    name: "Aishwarya",
    role: "Bride",
    text:
      "I loved the variety of designs. The floral invitation we selected looked even more beautiful than I expected.",
  },
  {
    name: "Santhosh",
    role: "Customer",
    text:
      "Beautiful designs, easy shopping experience and a very premium feel. Cherish made choosing our invitation special.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">

      <div className="testimonials-container">

        <motion.div
          className="testimonials-heading"
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
        >
          <Quote size={28} />

          <h2>
            Little Words
            <span>
              From Happy Hearts
            </span>
          </h2>

          <p>
            Beautiful moments deserve beautiful
            words.
          </p>
        </motion.div>

        <div className="testimonial-grid">

          {testimonials.map(
            (item, index) => (
              <motion.article
                className="testimonial-card"
                key={item.name}
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
                }}
                transition={{
                  duration: 0.7,
                  delay:
                    index * 0.12,
                }}
                whileHover={{
                  y: -7,
                }}
              >
                <div className="testimonial-stars">
                  {Array.from({
                    length: 5,
                  }).map(
                    (_, starIndex) => (
                      <Star
                        key={
                          starIndex
                        }
                        size={14}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

                <p>
                  “{item.text}”
                </p>

                <div className="testimonial-person">
                  <div>
                    {item.name
                      .charAt(0)}
                  </div>

                  <span>
                    <strong>
                      {item.name}
                    </strong>

                    <small>
                      {item.role}
                    </small>
                  </span>
                </div>
              </motion.article>
            )
          )}

        </div>
      </div>

    </section>
  );
}

export default Testimonials;