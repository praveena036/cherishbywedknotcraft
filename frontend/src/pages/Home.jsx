import { motion } from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  Heart,
  Play,
  Check,
  ShoppingBag,
  Palette,
  ShieldCheck,
  Truck,
  MousePointerClick,
  ChevronDown,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

import Illustration from "../assets/images/Illustration.png";
import RomanticPalace from "../assets/images/romantic-palace.png";

import CategorySection from "../components/CategorySection";

import "./Home.css";


/* =========================================================
   IMAGE COLLECTION
========================================================= */

const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const allImages = Object.entries(imageModules)
  .filter(([path]) => {
    const fileName = path
      .split("/")
      .pop()
      ?.toLowerCase();

    return (
      fileName &&
      fileName !== "logo.png" &&
      fileName !== "illustration.png"
    );
  })
  .map(([, url]) => url);


/* =========================================================
   FEATURED IMAGES
========================================================= */

const getImageByName = (keyword) => {
  const match = Object.entries(imageModules).find(
    ([path]) =>
      path
        .split("/")
        .pop()
        ?.toLowerCase()
        .includes(keyword.toLowerCase())
  );

  return match ? match[1] : null;
};


const featuredImages = [
  getImageByName("Elegant_Hindu"),
  getImageByName("Elegant_Flora"),
  getImageByName("Beach_Wedding"),
  getImageByName("Dark_green"),
]
  .filter(Boolean);


/* =========================================================
   FALLBACK IMAGES
========================================================= */

const safeFeaturedImages =
  featuredImages.length >= 4
    ? featuredImages.slice(0, 4)
    : [
        ...featuredImages,
        ...allImages,
      ].slice(0, 4);


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

const featuredProducts = [
  {
    title: "Elegant Hindu Wedding",
    description:
      "Traditional elegance with a graceful modern touch.",
    price: "₹225",
    image: safeFeaturedImages[0],
  },

  {
    title: "Elegant Floral Invitation",
    description:
      "Soft floral details for a romantic celebration.",
    price: "₹250",
    image: safeFeaturedImages[1],
  },

  {
    title: "Beach Wedding Collection",
    description:
      "A fresh and beautiful design inspired by dreamy celebrations.",
    price: "₹299",
    image: safeFeaturedImages[2],
  },

  {
    title: "Luxury Dark Green",
    description:
      "Rich colours and sophisticated styling for your special day.",
    price: "₹350",
    image: safeFeaturedImages[3],
  },
];


/* =========================================================
   CATEGORIES
========================================================= */

const celebrationCategories = [
  {
    icon: "💍",
    title: "Wedding",
    text:
      "Elegant invitations for the most beautiful day of your life.",
  },

  {
    icon: "💐",
    title: "Engagement",
    text:
      "Celebrate the beginning of your forever with style.",
  },

  {
    icon: "🎂",
    title: "Birthday",
    text:
      "Beautiful invitations for birthdays big and small.",
  },

  {
    icon: "🥂",
    title: "Anniversary",
    text:
      "Celebrate love, memories and another beautiful year together.",
  },

  {
    icon: "🏡",
    title: "Housewarming",
    text:
      "Invite your loved ones to your new beginning.",
  },

  {
    icon: "📅",
    title: "Save the Date",
    text:
      "Give your guests a beautiful first glimpse of your celebration.",
  },
];


/* =========================================================
   WHY CHOOSE US
========================================================= */

const whyChooseUs = [
  {
    icon: <Palette size={26} />,
    title: "Premium Designs",
    text:
      "Beautifully curated invitation designs created for every style and celebration.",
  },

  {
    icon: <Check size={26} />,
    title: "Affordable Pricing",
    text:
      "Elegant invitation designs at prices that make celebrating easier.",
  },

  {
    icon: <MousePointerClick size={26} />,
    title: "Easy Shopping",
    text:
      "Browse, search, save favourites and add your preferred invitations to cart.",
  },

  {
    icon: <ShieldCheck size={26} />,
    title: "Trusted Experience",
    text:
      "A simple and comfortable shopping experience from discovery to checkout.",
  },
];


/* =========================================================
   HOW IT WORKS
========================================================= */

const howItWorks = [
  {
    number: "01",
    title: "Choose Your Design",
    text:
      "Explore our collections and find an invitation that matches your celebration.",
  },

  {
    number: "02",
    title: "Save or Add to Cart",
    text:
      "Add your favourite designs to Wishlist or directly add them to your cart.",
  },

  {
    number: "03",
    title: "Enter Your Details",
    text:
      "Provide the required delivery and order information during checkout.",
  },

  {
    number: "04",
    title: "Choose Payment",
    text:
      "Select an available payment method and review your order.",
  },

  {
    number: "05",
    title: "Place Your Order",
    text:
      "Confirm your order and get ready for your beautiful celebration.",
  },
];


/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question:
      "How can I order an invitation?",
    answer:
      "Browse the invitation collection, choose a design, add it to your cart and continue to checkout.",
  },

  {
    question:
      "Can I save an invitation for later?",
    answer:
      "Yes. Use the heart icon to save your favourite designs to your Wishlist.",
  },

  {
    question:
      "Do you have special offers?",
    answer:
      "Yes. Visit the Sale section to explore selected invitation designs available with special offers.",
  },

  {
    question:
      "Can I choose different types of invitations?",
    answer:
      "Yes. You can explore traditional, floral, luxury, modern and occasion-based invitation collections.",
  },
];


/* =========================================================
   HOME COMPONENT
========================================================= */

function Home() {

  return (

    <main className="home-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-background">

          <img
            src={RomanticPalace}
            alt=""
          />

        </div>


        <div className="hero-overlay" />


        <div className="hero-light hero-light-one" />
        <div className="hero-light hero-light-two" />


        <motion.span
          className="floating-symbol symbol-one"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 12, 0],
            opacity: [0.35, 0.9, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>


        <motion.span
          className="floating-symbol symbol-two"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
            opacity: [0.25, 0.8, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          ✧
        </motion.span>


        <motion.span
          className="floating-symbol symbol-three"
          animate={{
            y: [0, -12, 0],
            x: [0, 7, 0],
            opacity: [0.25, 0.75, 0.25],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          ♡
        </motion.span>


        <div className="hero-container">


          {/* LEFT */}

          <motion.div
            className="hero-content"
            initial={{
              opacity: 0,
              x: -70,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >


            <motion.div
              className="hero-eyebrow"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
            >
              <Sparkles size={15} />

              <span>
                BEAUTIFUL MOMENTS • BEAUTIFUL INVITATIONS
              </span>
            </motion.div>


            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.9,
              }}
            >
              Your Love Story,

              <span>
                Beautifully Invited.
              </span>
            </motion.h1>


            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
            >
              Discover elegant wedding invitations
              designed to make every celebration
              truly unforgettable. From traditional
              classics to modern designs, find an
              invitation that feels uniquely yours.
            </motion.p>


            <motion.div
              className="hero-actions"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.65,
                duration: 0.8,
              }}
            >

              <Link
                to="/shop"
                className="hero-primary-button"
              >
                <span>
                  Explore Invitations
                </span>

                <ArrowRight size={18} />
              </Link>


              <Link
                to="/categories"
                className="hero-secondary-button"
              >
                Explore Categories
              </Link>

            </motion.div>


            <motion.div
              className="hero-features"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.8,
              }}
            >

              <div className="hero-feature">
                <Heart size={17} />
                <span>Made With Love</span>
              </div>

              <div className="feature-divider" />

              <div className="hero-feature">
                <Sparkles size={17} />
                <span>Premium Designs</span>
              </div>

              <div className="feature-divider" />

              <div className="hero-feature">
                <Check size={17} />
                <span>Easy Shopping</span>
              </div>

            </motion.div>

          </motion.div>


          {/* RIGHT */}

          <motion.div
            className="hero-visual"
            initial={{
              opacity: 0,
              scale: 0.82,
              x: 70,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >


            <motion.div
              className="visual-ring ring-one"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            />


            <motion.div
              className="visual-ring ring-two"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            />


            <motion.div
              className="hero-card"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <div className="hero-card-inner">

                <img
                  src={Illustration}
                  alt="Wedding illustration"
                  className="hero-main-image"
                />

                <div className="hero-image-shine" />

              </div>

            </motion.div>


            <motion.div
              className="floating-info floating-info-top"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 1,
                duration: 0.7,
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
            >

              <div className="floating-icon">
                <Heart size={17} />
              </div>

              <div>
                <strong>
                  Made With Love
                </strong>

                <small>
                  For Your Special Day
                </small>
              </div>

            </motion.div>


            <motion.div
              className="floating-info floating-info-bottom"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 1.15,
                duration: 0.7,
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
            >

              <div className="play-icon">
                <Play
                  size={14}
                  fill="currentColor"
                />
              </div>

              <div>
                <strong>
                  Premium Collection
                </strong>

                <small>
                  Elegant Wedding Designs
                </small>
              </div>

            </motion.div>


          </motion.div>

        </div>


        <motion.div
          className="hero-scroll"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 0.8,
          }}
        >

          <span>
            Scroll to explore
          </span>

          <motion.div
            className="scroll-line"
            animate={{
              y: [0, 9, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </motion.div>

      </section>


      {/* =====================================================
          BRAND INTRO
      ===================================================== */}

      <section className="intro-section">

        <div className="intro-container">

          <motion.div
            className="intro-heading"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            <span className="section-kicker">
              WELCOME TO CHERISH
            </span>

            <h2>
              Beautiful Invitations
              <span>
                For Beautiful Beginnings
              </span>
            </h2>

          </motion.div>


          <motion.div
            className="intro-copy"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            <p>
              At Cherish By Wed Knot Craft,
              we believe an invitation is more
              than just a card. It is the first
              glimpse of your celebration and
              the beginning of a beautiful memory.
            </p>

            <p>
              Our collection brings together
              timeless traditions, elegant styling
              and modern creativity to help you
              announce life's most meaningful moments.
            </p>

          </motion.div>

        </div>


        <div className="intro-highlights">

          <motion.div
            className="intro-highlight"
            whileHover={{
              y: -8,
            }}
          >
            <div className="highlight-icon">
              <Palette size={23} />
            </div>

            <h3>
              Elegant Designs
            </h3>

            <p>
              Carefully curated invitation styles
              for every celebration.
            </p>
          </motion.div>


          <motion.div
            className="intro-highlight"
            whileHover={{
              y: -8,
            }}
          >
            <div className="highlight-icon">
              <Heart size={23} />
            </div>

            <h3>
              Personal Touch
            </h3>

            <p>
              Choose a design that reflects
              your story, personality and traditions.
            </p>
          </motion.div>


          <motion.div
            className="intro-highlight"
            whileHover={{
              y: -8,
            }}
          >
            <div className="highlight-icon">
              <Sparkles size={23} />
            </div>

            <h3>
              Memorable Moments
            </h3>

            <p>
              Create invitations your family
              and guests will remember.
            </p>
          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <CategorySection />


      {/* =====================================================
          FEATURED INVITATIONS
      ===================================================== */}

      <section className="featured-section">

        <div className="section-heading">

          <span className="section-kicker">
            OUR COLLECTION
          </span>

          <h2>
            Featured Invitations
          </h2>

          <p>
            Explore beautifully designed invitations
            selected for your most special occasions.
          </p>

        </div>


        <div className="featured-grid">

          {featuredProducts.map(
            (product, index) => (

              <motion.article
                key={product.title}
                className="featured-card"
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                <div className="featured-image-wrap">

                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="featured-image"
                    />
                  )}

                  <span className="featured-label">
                    Featured
                  </span>

                </div>


                <div className="featured-content">

                  <span className="featured-category">
                    Wedding Invitation
                  </span>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <div className="featured-bottom">

                    <strong>
                      {product.price}
                    </strong>

                    <Link
                      to="/shop"
                      className="featured-view"
                    >
                      View Design
                      <ArrowRight size={16} />
                    </Link>

                  </div>

                </div>

              </motion.article>

            )
          )}

        </div>


        <div className="center-button-wrap">

          <Link
            to="/shop"
            className="outline-button"
          >
            View All Invitations
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          SALE
      ===================================================== */}

      <section className="sale-home-section">

        <div className="sale-home-glow sale-glow-one" />
        <div className="sale-home-glow sale-glow-two" />


        <div className="sale-home-content">

          <motion.div
            className="sale-copy"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            <span className="sale-kicker">
              SPECIAL OFFERS
            </span>

            <h2>
              Beautiful Savings
              <span>
                For Your Beautiful Day
              </span>
            </h2>

            <p>
              Discover selected invitation designs
              available at special prices for a limited
              time. Find something beautiful without
              compromising on style.
            </p>

            <Link
              to="/sale"
              className="sale-button"
            >
              <span>
                Shop Special Offers
              </span>

              <ArrowRight size={18} />
            </Link>

          </motion.div>


          <motion.div
            className="sale-offer-card"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <span>
              UP TO
            </span>

            <strong>
              50%
            </strong>

            <small>
              OFF
            </small>

            <div className="offer-line" />

            <p>
              Selected invitation designs
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="why-section">

        <div className="section-heading">

          <span className="section-kicker">
            THE CHERISH DIFFERENCE
          </span>

          <h2>
            Why Choose Cherish?
          </h2>

          <p>
            Thoughtful designs, comfortable shopping
            and beautiful choices for every celebration.
          </p>

        </div>


        <div className="why-grid">

          {whyChooseUs.map(
            (item, index) => (

              <motion.article
                key={item.title}
                className="why-card"
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                <div className="why-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </motion.article>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-home-section">

        <div className="section-heading">

          <span className="section-kicker">
            SIMPLE & EASY
          </span>

          <h2>
            How It Works
          </h2>

          <p>
            From choosing a design to placing your
            order, everything is designed to be simple.
          </p>

        </div>


        <div className="steps-container">

          {howItWorks.map(
            (step, index) => (

              <motion.div
                key={step.number}
                className="home-step"
                initial={{
                  opacity: 0,
                  y: 30,
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
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >

                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-content">

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.text}
                  </p>

                </div>

                {index !==
                  howItWorks.length - 1 && (
                  <div className="step-connector" />
                )}

              </motion.div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          CELEBRATIONS
      ===================================================== */}

      <section className="celebration-section">

        <div className="section-heading">

          <span className="section-kicker">
            CELEBRATE EVERY MOMENT
          </span>

          <h2>
            Designs For Every Celebration
          </h2>

          <p>
            Whatever the occasion, find an invitation
            that sets the perfect tone for your celebration.
          </p>

        </div>


        <div className="celebration-grid">

          {celebrationCategories.map(
            (item, index) => (

              <motion.article
                key={item.title}
                className="celebration-card"
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -7,
                }}
              >

                <div className="celebration-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <Link
                  to="/categories"
                  className="celebration-link"
                >
                  Explore
                  <ArrowRight size={15} />
                </Link>

              </motion.article>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="home-testimonial-section">

        <div className="section-heading">

          <span className="section-kicker">
            KIND WORDS
          </span>

          <h2>
            What Our Customers Say
          </h2>

          <p>
            A few sample words that reflect the
            experience we aim to create.
          </p>

        </div>


        <div className="testimonial-grid">

          <motion.article
            className="home-testimonial-card"
            whileHover={{
              y: -7,
            }}
          >

            <div className="quote-mark">
              “
            </div>

            <div className="stars">
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
            </div>

            <p>
              The invitation design felt elegant,
              beautiful and perfect for our special day.
              We loved how much attention was given to
              the overall presentation.
            </p>

            <div className="testimonial-person">
              <span>
                P
              </span>

              <div>
                <strong>
                  Priya & Arjun
                </strong>

                <small>
                  Wedding Celebration
                </small>
              </div>
            </div>

          </motion.article>


          <motion.article
            className="home-testimonial-card"
            whileHover={{
              y: -7,
            }}
          >

            <div className="quote-mark">
              “
            </div>

            <div className="stars">
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
            </div>

            <p>
              There were so many beautiful styles
              to choose from. The experience was simple
              and the collection looked very premium.
            </p>

            <div className="testimonial-person">
              <span>
                H
              </span>

              <div>
                <strong>
                  Haritha & Kiran
                </strong>

                <small>
                  Engagement Celebration
                </small>
              </div>
            </div>

          </motion.article>


          <motion.article
            className="home-testimonial-card"
            whileHover={{
              y: -7,
            }}
          >

            <div className="quote-mark">
              “
            </div>

            <div className="stars">
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
            </div>

            <p>
              Beautiful designs, lovely presentation
              and a very easy shopping flow. The
              invitation collection was wonderful.
            </p>

            <div className="testimonial-person">
              <span>
                S
              </span>

              <div>
                <strong>
                  Santhosh
                </strong>

                <small>
                  Family Celebration
                </small>
              </div>
            </div>

          </motion.article>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="faq-section">

        <div className="faq-heading">

          <span className="section-kicker">
            NEED TO KNOW
          </span>

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Find answers to some common questions
            about browsing, saving and ordering invitations.
          </p>

        </div>


        <div className="faq-list">

          {faqs.map(
            (faq, index) => (

              <motion.details
                key={faq.question}
                className="faq-item"
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
              >

                <summary>

                  <span>
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={19}
                  />

                </summary>

                <p>
                  {faq.answer}
                </p>

              </motion.details>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta-section">

        <div className="final-cta-overlay" />


        <motion.div
          className="final-cta-content"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >

          <span className="section-kicker">
            START YOUR CELEBRATION
          </span>

          <h2>
            Your Special Day
            <span>
              Deserves a Beautiful Beginning.
            </span>
          </h2>

          <p>
            Explore our invitation collections
            and discover a design that feels
            as special as your celebration.
          </p>


          <div className="final-cta-buttons">

            <Link
              to="/shop"
              className="final-primary"
            >
              <ShoppingBag size={17} />
              Explore Invitations
            </Link>

            <Link
              to="/sale"
              className="final-secondary"
            >
              View Special Offers
              <ArrowRight size={17} />
            </Link>

          </div>

        </motion.div>

      </section>

    </main>
  );
}


export default Home;