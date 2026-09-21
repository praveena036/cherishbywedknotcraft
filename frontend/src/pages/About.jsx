import { useState } from "react";

import {
  Heart,
  Sparkles,
  ArrowRight,
  Check,
  Quote,
  Gem,
  Flower2,
  Mail,
  ChevronDown,
  Crown,
  BookOpen,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

import "./About.css";


/* =========================================================
   IMAGE LOADER
========================================================= */

const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);


/* =========================================================
   NORMALIZE FILE NAME
========================================================= */

const normalizeName = (value = "") =>
  value
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();


/* =========================================================
   FIND IMAGE
========================================================= */

const getImage = (...keywords) => {
  const entries = Object.entries(imageModules);

  for (const keyword of keywords) {
    const search = normalizeName(keyword);

    const exactMatch = entries.find(([path]) => {
      const fileName =
        path
          .split("/")
          .pop() || "";

      const normalizedFileName =
        normalizeName(fileName);

      return normalizedFileName === search;
    });

    if (exactMatch) {
      return exactMatch[1];
    }

    const partialMatch = entries.find(([path]) => {
      const fileName =
        path
          .split("/")
          .pop() || "";

      const normalizedFileName =
        normalizeName(fileName);

      return normalizedFileName.includes(search);
    });

    if (partialMatch) {
      return partialMatch[1];
    }
  }

  return null;
};


/* =========================================================
   ALL IMAGES
========================================================= */

const allImages = Object.entries(
  imageModules
)
  .filter(([path]) => {
    const fileName =
      path
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
   HERO IMAGE
========================================================= */

const weddingQuoteImage =
  getImage(
    "wedding quote",
    "wedding-quote",
    "wedding_quote"
  );


/* =========================================================
   FIVE STORY IMAGES
========================================================= */

const loveStoryImage =
  getImage(
    "love story",
    "love-story",
    "lovestory"
  );


const tajImage =
  getImage(
    "taj"
  );


const weddingAlbumImage =
  getImage(
    "wedding album",
    "wedding-album",
    "weddingalbum"
  );


const traditionalWeddingImage =
  getImage(
    "traditional indian wedding couple",
    "traditional-indian-wedding-couple",
    "traditional indian wedding",
    "traditional-indian"
  );


const togethernessImage =
  getImage(
    "suriya jyothika 20 years together",
    "suriya-jyothika-20-years-together",
    "suriya jyothika 20 years",
    "suriya-jyothika",
    "20 years together"
  );


/* =========================================================
   INVITATION COLLECTION
========================================================= */

const preferredInvitationImages = [
  getImage("elegant hindu"),
  getImage("elegant flora"),
  getImage("beach wedding"),
  getImage("digital indian"),
  getImage("editable indian"),
  getImage("dark green"),
  getImage("nepali wedding"),
  getImage("indian wedding"),
].filter(Boolean);


/* =========================================================
   EXCLUDE STORY IMAGES
========================================================= */

const excludedImages = new Set(
  [
    weddingQuoteImage,
    loveStoryImage,
    tajImage,
    weddingAlbumImage,
    traditionalWeddingImage,
    togethernessImage,
    logo,
  ].filter(Boolean)
);


/* =========================================================
   EIGHT INVITATION IMAGES
========================================================= */

const invitationImages = [
  ...preferredInvitationImages,
  ...allImages,
]
  .filter(
    (image, index, array) =>
      array.indexOf(image) === index
  )
  .filter(
    (image) =>
      !excludedImages.has(image)
  )
  .slice(0, 8);


/* =========================================================
   INVITATION TITLES
========================================================= */

const invitationTitles = [
  "Elegant Beginnings",
  "Floral Romance",
  "Timeless Celebration",
  "Royal Tradition",
  "Modern Love",
  "Classic Charm",
  "Beautiful Details",
  "Forever Together",
];


/* =========================================================
   VALUES
========================================================= */

const values = [
  {
    icon: <Heart size={22} />,
    title: "Created With Love",
    text:
      "Every invitation begins with the emotion behind the celebration and the people who make the moment meaningful.",
  },

  {
    icon: <Sparkles size={22} />,
    title: "Beautiful Design",
    text:
      "Elegant typography, thoughtful layouts and beautiful visual details come together to create a refined invitation experience.",
  },

  {
    icon: <Gem size={22} />,
    title: "Meaningful Details",
    text:
      "From traditional charm to modern simplicity, our invitation styles are created to feel personal, graceful and memorable.",
  },

  {
    icon: <Flower2 size={22} />,
    title: "Memorable Beginnings",
    text:
      "An invitation is the first glimpse of your celebration — and we believe that first impression should feel special.",
  },
];


/* =========================================================
   PROMISES
========================================================= */

const promises = [
  "A curated collection of wedding and celebration invitations.",
  "Designs that blend traditional charm with modern creativity.",
  "An easy experience for discovering and saving beautiful designs.",
  "Invitations created to feel elegant, personal and memorable.",
];


/* =========================================================
   FIVE QUOTES
========================================================= */

const quotes = [
  {
    title: "A Beautiful Beginning",
    text:
      "Every celebration begins with a feeling. Let your invitation be the first beautiful expression of that feeling.",
  },

  {
    title: "Love Is The Story",
    text:
      "A wedding invitation is more than an announcement. It is the first page of a story two hearts are beginning to write together.",
  },

  {
    title: "Moments Become Memories",
    text:
      "The little details of today can become the memories you cherish tomorrow. Begin your celebration with something meaningful.",
  },

  {
    title: "Made For Your Story",
    text:
      "No two celebrations are exactly alike. Your invitation should feel just as unique as the story behind it.",
  },

  {
    title: "Celebrate With Cherish",
    text:
      "Choose a design that feels like you, invite the people you love and let the celebration begin beautifully.",
  },
];


/* =========================================================
   ABOUT COMPONENT
========================================================= */

function About() {

  const [openQuote, setOpenQuote] =
    useState(null);


  const toggleQuote = (index) => {
    setOpenQuote(
      openQuote === index
        ? null
        : index
    );
  };


  return (
    <main className="about-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="about-hero"
        style={{
          backgroundImage:
            weddingQuoteImage
              ? `url("${weddingQuoteImage}")`
              : "none",
        }}
      >

        <div className="about-hero-overlay" />


        <motion.div
          className="hero-glow hero-glow-one"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        <motion.div
          className="hero-glow hero-glow-two"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        <motion.span
          className="hero-symbol hero-symbol-one"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 12, 0],
            opacity: [0.3, 0.9, 0.3],
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
          className="hero-symbol hero-symbol-two"
          animate={{
            y: [0, 13, 0],
            x: [0, 8, 0],
            opacity: [0.25, 0.85, 0.25],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♡
        </motion.span>


        <motion.span
          className="hero-symbol hero-symbol-three"
          animate={{
            y: [0, -10, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✧
        </motion.span>


        <motion.div
          className="about-hero-card"
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <span className="hero-kicker">

            <Sparkles size={14} />

            ABOUT CHERISH

          </span>


          <h1>

            Every Celebration

            <span>
              Begins With A Story.
            </span>

          </h1>


          <p>

            At Cherish By Wed Knot Craft,
            we believe an invitation is more
            than a beautiful design. It is the
            first feeling, the first glimpse and
            the first little moment of your
            celebration shared with the people
            who matter most.

          </p>


          <div className="hero-mini-quote">

            <Quote size={16} />

            <span>
              Beautiful beginnings deserve
              beautiful invitations.
            </span>

          </div>


          <div className="hero-actions">

            <Link
              to="/shop"
              className="about-primary-button"
            >

              Explore Invitations

              <ArrowRight size={17} />

            </Link>


            <a
              href="#stories"
              className="about-secondary-button"
            >

              Discover Our Story

            </a>

          </div>

        </motion.div>


        <div className="about-scroll">

          <span>
            Scroll to explore
          </span>

          <motion.span
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
            }}
          >
            ↓
          </motion.span>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="about-intro">

        <motion.div
          className="intro-inner"
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
          transition={{
            duration: 0.7,
          }}
        >

          <span className="section-kicker">
            THE CHERISH IDEA
          </span>


          <h2>

            An Invitation Is

            <span>
              The First Chapter.
            </span>

          </h2>


          <p>

            Before the music begins, before the
            flowers bloom and before everyone
            gathers together, there is an invitation.
            A small piece of design that says,
            “This moment matters. Come celebrate
            it with us.”

          </p>


          <p>

            That is the feeling we want every Cherish
            invitation to carry — warmth, elegance,
            excitement and a sense of belonging.

          </p>

        </motion.div>

      </section>


      {/* =====================================================
          FIVE IMAGE STORIES
      ===================================================== */}

      <section
        className="story-section"
        id="stories"
      >


        {/* HEADING */}

        <motion.div
          className="story-main-heading"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <span className="section-kicker">

            STORIES • STYLE • CELEBRATION

          </span>


          <h2>

            Every Invitation

            <span>
              Begins With A Feeling.
            </span>

          </h2>


          <p>

            A romantic beginning, a grand celebration,
            a beautiful memory, a timeless tradition
            or a story of togetherness — every
            celebration has its own feeling. These
            inspirations shape the Cherish invitation
            collection.

          </p>

        </motion.div>


        {/* =================================================
            01 LOVE STORY
        ================================================= */}

        {loveStoryImage && (

          <motion.div
            className="story-feature-row story-row-left"

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
              duration: 0.8,
            }}
          >

            <div className="story-feature-image">

              <img
                src={loveStoryImage}
                alt="Romantic love story invitation"
              />


              <div className="story-feature-shine" />


              <motion.div
                className="story-feature-floating-heart"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <Heart
                  size={20}
                  fill="currentColor"
                />

              </motion.div>


              <span className="story-image-tag">
                ROMANTIC
              </span>

            </div>


            <div className="story-feature-content">

              <span className="story-number">

                01 • THE BEGINNING

              </span>


              <h3>

                Love Before Forever

                <span>
                  A Beautiful First Chapter.
                </span>

              </h3>


              <p>

                Before the wedding day arrives,
                there is a beautiful chapter filled
                with excitement, dreams and the
                feeling that something wonderful
                is about to begin.

              </p>


              <p>

                Romantic pre-wedding moments
                inspire invitations that feel soft,
                warm and full of anticipation —
                a beautiful introduction to the
                celebration waiting ahead.

              </p>


              <div className="story-content-quote">

                <Quote size={19} />

                <span>

                  “Every forever begins with a
                  beautiful first moment.”

                </span>

              </div>


              <strong className="story-purpose">

                Perfect for romantic & pre-wedding
                invitation designs.

              </strong>

            </div>

          </motion.div>

        )}


        {/* =================================================
            02 TAJ
        ================================================= */}

        {tajImage && (

          <motion.div
            className="story-feature-row story-row-right"

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
              duration: 0.8,
            }}
          >

            <div className="story-feature-image">

              <img
                src={tajImage}
                alt="Royal wedding invitation inspiration"
              />


              <div className="story-feature-shine" />


              <motion.div
                className="story-feature-badge-icon"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <Crown size={20} />

              </motion.div>


              <span className="story-image-tag">
                ROYAL
              </span>

            </div>


            <div className="story-feature-content">

              <span className="story-number">

                02 • TIMELESS ELEGANCE

              </span>


              <h3>

                A Royal Celebration

                <span>
                  Designed To Feel Grand.
                </span>

              </h3>


              <p>

                Some celebrations deserve an
                invitation that feels as extraordinary
                as the occasion itself. Inspired by
                architectural beauty and timeless
                elegance, royal invitation styles
                create a sense of grandeur from
                the very first glance.

              </p>


              <p>

                Sophisticated compositions, graceful
                typography and refined visual details
                can transform an invitation into the
                first glimpse of a truly memorable
                celebration.

              </p>


              <div className="story-content-quote">

                <Quote size={19} />

                <span>

                  “For celebrations that deserve a
                  magnificent beginning.”

                </span>

              </div>


              <strong className="story-purpose">

                Perfect for grand & luxury wedding
                invitations.

              </strong>

            </div>

          </motion.div>

        )}


        {/* =================================================
            03 WEDDING ALBUM
        ================================================= */}

        {weddingAlbumImage && (

          <motion.div
            className="story-feature-row story-row-left"

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
              duration: 0.8,
            }}
          >

            <div className="story-feature-image">

              <img
                src={weddingAlbumImage}
                alt="Wedding album invitation inspiration"
              />


              <div className="story-feature-shine" />


              <motion.div
                className="story-feature-badge-icon"
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <BookOpen size={20} />

              </motion.div>


              <span className="story-image-tag">
                MEMORIES
              </span>

            </div>


            <div className="story-feature-content">

              <span className="story-number">

                03 • YOUR STORY IN PAGES

              </span>


              <h3>

                A Story Worth Remembering

                <span>
                  Every Detail Matters.
                </span>

              </h3>


              <p>

                A celebration is made of countless
                little moments — the people, the
                emotions, the colours, the atmosphere
                and the details that slowly become
                unforgettable memories.

              </p>


              <p>

                A beautifully designed invitation
                becomes the first page of that story.
                It sets the mood, introduces the
                celebration and gives every guest
                a glimpse of what is waiting ahead.

              </p>


              <div className="story-content-quote">

                <Quote size={19} />

                <span>

                  “Today becomes a memory.
                  Let the first page be beautiful.”

                </span>

              </div>


              <strong className="story-purpose">

                Perfect for memorable wedding
                invitation collections.

              </strong>

            </div>

          </motion.div>

        )}


        {/* =================================================
            04 TRADITIONAL INDIAN
        ================================================= */}

        {traditionalWeddingImage && (

          <motion.div
            className="story-feature-row story-row-right"

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
              duration: 0.8,
            }}
          >

            <div className="story-feature-image">

              <img
                src={traditionalWeddingImage}
                alt="Traditional Indian wedding invitation"
              />


              <div className="story-feature-shine" />


              <motion.div
                className="story-feature-badge-icon"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, -4, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <Flower2 size={20} />

              </motion.div>


              <span className="story-image-tag">
                TRADITION
              </span>

            </div>


            <div className="story-feature-content">

              <span className="story-number">

                04 • ROOTED IN TRADITION

              </span>


              <h3>

                Tradition With A Modern Touch

                <span>
                  Heritage In Every Detail.
                </span>

              </h3>


              <p>

                Indian celebrations are filled
                with colour, rituals, family and
                heritage. These traditions give
                every wedding its own beautiful
                identity and emotional warmth.

              </p>


              <p>

                Traditional invitation styles
                celebrate that richness while
                thoughtful modern design keeps
                the experience elegant, refined
                and visually beautiful.

              </p>


              <div className="story-content-quote">

                <Quote size={19} />

                <span>

                  “Tradition gives a celebration
                  its roots; design gives it
                  a beautiful new expression.”

                </span>

              </div>


              <strong className="story-purpose">

                Perfect for traditional & cultural
                wedding invitations.

              </strong>

            </div>

          </motion.div>

        )}


        {/* =================================================
            05 TOGETHERNESS
        ================================================= */}

        {togethernessImage && (

          <motion.div
            className="story-feature-row story-row-left"

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
              duration: 0.8,
            }}
          >

            <div className="story-feature-image">

              <img
                src={togethernessImage}
                alt="Togetherness love story invitation inspiration"
              />


              <div className="story-feature-shine" />


              <motion.div
                className="story-feature-floating-heart"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <Heart
                  size={20}
                  fill="currentColor"
                />

              </motion.div>


              <span className="story-image-tag">
                TOGETHERNESS
              </span>

            </div>


            <div className="story-feature-content">

              <span className="story-number">

                05 • LOVE THAT GROWS

              </span>


              <h3>

                Love That Grows With Time

                <span>
                  Beautifully Together.
                </span>

              </h3>


              <p>

                Some of the most meaningful stories
                are built slowly — through shared
                moments, understanding, companionship
                and the quiet happiness of growing
                together.

              </p>


              <p>

                That feeling inspires invitation
                designs that are warm, timeless
                and romantic. Not just an announcement,
                but a gentle introduction to a story
                that continues beyond the celebration.

              </p>


              <div className="story-content-quote">

                <Quote size={19} />

                <span>

                  “The most beautiful stories are the
                  ones that continue to grow.”

                </span>

              </div>


              <strong className="story-purpose">

                Perfect for timeless & meaningful
                love celebrations.

              </strong>

            </div>

          </motion.div>

        )}


        {/* =================================================
            CLOSING QUOTE
        ================================================= */}

        <motion.div
          className="story-closing-quote"

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
            amount: 0.3,
          }}

          transition={{
            duration: 0.7,
          }}
        >

          <Quote size={21} />

          <p>

            “Different celebrations.
            Different stories.
            One beautiful beginning.”

          </p>


          <span>
            CHERISH BY WED KNOT CRAFT
          </span>

        </motion.div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="values-section">

        <div className="section-heading">

          <span className="section-kicker">
            OUR PHILOSOPHY
          </span>


          <h2>

            The Heart Behind

            <span>
              Cherish
            </span>

          </h2>


          <p>

            We create around a simple belief:
            beautiful details can make the beginning
            of a celebration feel even more special.

          </p>

        </div>


        <div className="values-grid">

          {values.map(
            (item, index) => (

              <motion.article
                key={item.title}

                className="value-card"

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
                  duration: 0.55,
                  delay:
                    index * 0.08,
                }}

                whileHover={{
                  y: -9,
                }}
              >

                <motion.div
                  className="value-icon"

                  whileHover={{
                    scale: 1.1,
                    rotate: 8,
                  }}
                >

                  {item.icon}

                </motion.div>


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
          EIGHT INVITATIONS
      ===================================================== */}

      <section className="invitation-showcase">

        <div className="section-heading">

          <span className="section-kicker">
            OUR INVITATION COLLECTION
          </span>


          <h2>

            Designs That Tell

            <span>
              Your Story
            </span>

          </h2>


          <p>

            From traditional elegance and floral
            romance to modern celebration styles,
            discover beautiful invitation designs
            created for meaningful beginnings.

          </p>

        </div>


        <div className="invitation-grid">

          {invitationImages.map(
            (image, index) => (

              <motion.article
                key={`${image}-${index}`}

                className="invitation-card"

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
                  amount: 0.12,
                }}

                transition={{
                  duration: 0.55,
                  delay:
                    (index % 4) * 0.07,
                }}

                whileHover={{
                  y: -9,
                }}
              >

                <div className="invitation-image">

                  <img
                    src={image}
                    alt={
                      invitationTitles[index]
                    }
                  />


                  <div className="invitation-shine" />


                  <motion.div
                    className="invitation-heart"

                    whileHover={{
                      scale: 1.15,
                      rotate: 7,
                    }}
                  >

                    <Heart size={16} />

                  </motion.div>


                  <span className="invitation-number">

                    {String(
                      index + 1
                    ).padStart(2, "0")}

                  </span>

                </div>


                <div className="invitation-card-content">

                  <span>
                    CHERISH COLLECTION
                  </span>


                  <h3>
                    {
                      invitationTitles[index]
                    }
                  </h3>


                  <p>
                    Beautifully designed for
                    meaningful celebrations.
                  </p>

                </div>

              </motion.article>

            )
          )}

        </div>


        <div className="showcase-button-wrap">

          <Link
            to="/shop"
            className="showcase-button"
          >

            View All Invitations

            <ArrowRight size={17} />

          </Link>

        </div>

      </section>


      {/* =====================================================
          PROMISE + BIG LOGO
      ===================================================== */}

      <section className="promise-section">

        <div className="promise-layout">


          <motion.div
            className="promise-content"

            initial={{
              opacity: 0,
              x: -60,
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

            <span className="section-kicker">
              OUR PROMISE
            </span>


            <h2>

              Designed With

              <span>
                Care & Intention
              </span>

            </h2>


            <p>

              We want every step of your invitation
              journey to feel thoughtful — from
              discovering a design you love to saving
              your favourites and choosing the perfect
              invitation for your celebration.

            </p>


            <div className="promise-list">

              {promises.map(
                (promise, index) => (

                  <motion.div
                    key={promise}
                    className="promise-item"

                    initial={{
                      opacity: 0,
                      x: -18,
                    }}

                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}

                    viewport={{
                      once: true,
                    }}

                    transition={{
                      delay:
                        index * 0.08,
                    }}
                  >

                    <span>
                      <Check size={14} />
                    </span>


                    <p>
                      {promise}
                    </p>

                  </motion.div>

                )
              )}

            </div>

          </motion.div>


          {/* BIG LOGO */}

          <motion.div
            className="promise-decoration"

            initial={{
              opacity: 0,
              scale: 0.75,
            }}

            whileInView={{
              opacity: 1,
              scale: 1,
            }}

            viewport={{
              once: true,
              amount: 0.25,
            }}

            transition={{
              duration: 0.9,
            }}
          >

            <div className="promise-circle">


              <motion.div
                className="promise-ring promise-ring-one"

                animate={{
                  rotate: 360,
                }}

                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />


              <motion.div
                className="promise-ring promise-ring-two"

                animate={{
                  rotate: -360,
                }}

                transition={{
                  duration: 17,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />


              <motion.span
                className="promise-star promise-star-one"

                animate={{
                  y: [0, -9, 0],
                  rotate: [0, 15, 0],
                  opacity: [
                    0.35,
                    1,
                    0.35,
                  ],
                }}

                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                }}
              >
                ✦
              </motion.span>


              <motion.span
                className="promise-star promise-star-two"

                animate={{
                  y: [0, 9, 0],
                  rotate: [0, -12, 0],
                  opacity: [
                    0.35,
                    0.9,
                    0.35,
                  ],
                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                ✧
              </motion.span>


              <motion.span
                className="promise-floating-heart"

                animate={{
                  y: [0, -7, 0],
                  scale: [1, 1.08, 1],
                }}

                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ♡
              </motion.span>


              <motion.div
                className="promise-logo-wrap"

                animate={{
                  y: [0, -7, 0],
                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <img
                  src={logo}
                  alt="Cherish By Wed Knot Craft"
                  className="promise-logo"
                />

              </motion.div>


              <div className="promise-brand-text">

                <strong>
                  CHERISH
                </strong>

                <span>
                  BY WED KNOT CRAFT
                </span>

                <small>
                  With Love
                </small>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FIVE HEART QUOTES
      ===================================================== */}

      <section className="quote-collection">


        <motion.div
          className="section-heading"

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

          transition={{
            duration: 0.7,
          }}
        >

          <span className="section-kicker">

            <Heart
              size={11}
              fill="currentColor"
            />

            LITTLE WORDS OF LOVE

          </span>


          <h2>

            Open A Heart

            <span>
              Discover A Quote
            </span>

          </h2>


          <p>

            Five little thoughts about love,
            celebration and beautiful beginnings.
            Each heart keeps its quote hidden
            until you choose to open it.

          </p>

        </motion.div>


        <div className="quote-heart-grid">

          {quotes.map(
            (item, index) => {

              const isOpen =
                openQuote === index;

              return (

                <motion.article
                  key={item.title}

                  className={
                    `quote-heart-card ${
                      isOpen
                        ? "quote-heart-card-open"
                        : ""
                    }`
                  }

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
                    duration: 0.55,
                    delay:
                      index * 0.08,
                  }}

                  whileHover={{
                    y: -9,
                  }}
                >


                  <motion.span
                    className="quote-card-sparkle quote-card-sparkle-one"

                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, 0],
                      opacity: [
                        0.3,
                        1,
                        0.3,
                      ],
                    }}

                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay:
                        index * 0.15,
                    }}
                  >
                    ✦
                  </motion.span>


                  <motion.span
                    className="quote-card-sparkle quote-card-sparkle-two"

                    animate={{
                      y: [0, 5, 0],
                      rotate: [0, -10, 0],
                      opacity: [
                        0.3,
                        0.9,
                        0.3,
                      ],
                    }}

                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay:
                        index * 0.12,
                    }}
                  >
                    ✧
                  </motion.span>


                  {/* RED HEART */}

                  <motion.button
                    type="button"

                    className="quote-heart-button"

                    onClick={() =>
                      toggleQuote(index)
                    }

                    whileHover={{
                      scale: 1.08,
                    }}

                    whileTap={{
                      scale: 0.91,
                    }}

                    aria-label={
                      isOpen
                        ? "Close quote"
                        : "Open quote"
                    }
                  >

                    <motion.div
                      animate={{
                        scale:
                          isOpen
                            ? [
                                1,
                                1.13,
                                1,
                              ]
                            : [
                                1,
                                1.06,
                                1,
                              ],
                      }}

                      transition={{
                        duration:
                          isOpen
                            ? 1.15
                            : 2.1,

                        repeat:
                          Infinity,

                        ease:
                          "easeInOut",
                      }}
                    >

                      <Heart
                        size={36}
                        strokeWidth={1.8}
                        fill="currentColor"
                      />

                    </motion.div>


                    <span>

                      {isOpen
                        ? "CLOSE"
                        : "OPEN"}

                    </span>

                  </motion.button>


                  <h3>
                    {item.title}
                  </h3>


                  <motion.div
                    className="quote-chevron"

                    animate={{
                      rotate:
                        isOpen
                          ? 180
                          : 0,
                    }}
                  >

                    <ChevronDown
                      size={17}
                    />

                  </motion.div>


                  <AnimatePresence>

                    {isOpen && (

                      <motion.div
                        className="quote-hidden-content"

                        initial={{
                          height: 0,
                          opacity: 0,
                        }}

                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}

                        exit={{
                          height: 0,
                          opacity: 0,
                        }}

                        transition={{
                          duration: 0.4,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >

                        <div className="quote-line" />


                        <Quote
                          size={19}
                        />


                        <p>
                          {item.text}
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </motion.article>

              );
            }
          )}

        </div>


        <motion.div
          className="quote-bottom-message"

          initial={{
            opacity: 0,
            y: 15,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}
        >

          <Heart
            size={18}
            fill="currentColor"
          />

          <span>

            Your story is unique.
            Your invitation should be too.

          </span>

          <Heart
            size={18}
            fill="currentColor"
          />

        </motion.div>

      </section>


      {/* =====================================================
          DARK QUOTE
      ===================================================== */}

      <section className="dark-quote-section">

        <motion.div
          className="dark-quote-content"

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
            amount: 0.25,
          }}
        >

          <Sparkles size={20} />


          <h2>

            “Your love is the story.
            Your invitation is the first page.”

          </h2>


          <span>
            Cherish By Wed Knot Craft
          </span>

        </motion.div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta-section">

        <div className="cta-particles">

          <span>✦</span>
          <span>♡</span>
          <span>✧</span>
          <span>♡</span>
          <span>✦</span>

        </div>


        <motion.div
          className="about-cta-content"

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

            START SOMETHING BEAUTIFUL

          </span>


          <h2>

            Let Your Celebration

            <span>
              Begin With Cherish.
            </span>

          </h2>


          <p>

            Explore our invitation collection
            and discover a design that feels as
            special, personal and beautiful as
            the celebration waiting to begin.

          </p>


          <div className="cta-buttons">

            <Link
              to="/shop"
              className="about-primary-button"
            >

              Shop Invitations

              <ArrowRight size={17} />

            </Link>


            <Link
              to="/categories"
              className="about-secondary-button"
            >

              Browse Categories

            </Link>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          FINAL LINE
      ===================================================== */}

      <section className="about-final-line">

        <Mail size={20} />


        <p>

          Beautiful invitations.
          Meaningful beginnings.
          Unforgettable celebrations.

        </p>


        <Heart
          size={20}
          fill="currentColor"
        />

      </section>

    </main>
  );
}


export default About;