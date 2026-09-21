import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  Heart,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Link } from "react-router-dom";

import "./Contact.css";


/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    question: "How can I choose an invitation?",
    answer:
      "Browse our invitation collections, explore different styles and save the designs you love. You can then continue to the shopping and checkout flow.",
  },

  {
    question: "What occasions do you cover?",
    answer:
      "Our collection is designed around weddings, engagements, birthdays, anniversaries, traditional celebrations and other meaningful occasions.",
  },

  {
    question: "Can I get help choosing a design?",
    answer:
      "Yes. Use the contact form and tell us about your occasion, preferred style and colour direction. Our team can guide you toward suitable invitation styles.",
  },

  {
    question: "How do I get in touch?",
    answer:
      "You can use the contact form on this page or use the email and phone options shown in the contact section.",
  },
];


/* =========================================================
   DJANGO API
========================================================= */

const CONTACT_API = "/api/contact/";


/* =========================================================
   CONTACT COMPONENT
========================================================= */

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    message: "",
  });


  const [submitted, setSubmitted] =
    useState(false);


  const [submitting, setSubmitting] =
    useState(false);


  const [submitError, setSubmitError] =
    useState("");


  const [openFaq, setOpenFaq] =
    useState(null);


  /* =======================================================
     INPUT HANDLER
  ======================================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));


    if (submitError) {
      setSubmitError("");
    }
  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {

    event.preventDefault();


    if (submitting) {
      return;
    }


    setSubmitting(true);
    setSubmitError("");


    try {

      const response = await fetch(
        CONTACT_API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            email: formData.email.trim(),

            phone: formData.phone.trim(),

            occasion:
              formData.occasion.trim(),

            message:
              formData.message.trim(),
          }),
        }
      );


      let data = null;


      try {
        data = await response.json();
      } catch {
        data = null;
      }


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to send your enquiry. Please try again."
        );
      }


      if (!data?.success) {

        throw new Error(
          data?.message ||
          "Unable to send your enquiry."
        );
      }


      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      setSubmitted(true);


      setFormData({
        name: "",
        email: "",
        phone: "",
        occasion: "",
        message: "",
      });


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );


      setSubmitError(
        error?.message ||
        "Something went wrong. Please try again."
      );


    } finally {

      setSubmitting(false);

    }
  };


  /* =======================================================
     FAQ TOGGLE
  ======================================================= */

  const toggleFaq = (index) => {

    setOpenFaq(
      openFaq === index
        ? null
        : index
    );

  };


  /* =======================================================
     RESET SUCCESS
  ======================================================= */

  const handleSendAnother = () => {

    setSubmitted(false);
    setSubmitError("");

  };


  return (

    <main className="contact-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-glow contact-glow-left" />

        <div className="contact-hero-glow contact-glow-right" />


        {/* FLOATING DECOR */}

        <motion.span
          className="contact-float contact-float-one"
          animate={{
            y: [0, -14, 0],
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
          className="contact-float contact-float-two"
          animate={{
            y: [0, 12, 0],
            x: [0, 8, 0],
            opacity: [0.25, 0.8, 0.25],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♡
        </motion.span>


        <motion.span
          className="contact-float contact-float-three"
          animate={{
            y: [0, -9, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✧
        </motion.span>


        {/* HERO CONTENT */}

        <motion.div
          className="contact-hero-content"

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <span className="contact-kicker">

            <Sparkles size={14} />

            WE'D LOVE TO HEAR FROM YOU

          </span>


          <h1>

            Let’s Make Your

            <span>
              Celebration Beautiful.
            </span>

          </h1>


          <p>

            Looking for the perfect invitation?
            Have a question about a design?
            Tell us a little about your celebration
            and let’s find something beautiful
            together.

          </p>


          <div className="contact-hero-quote">

            <Heart
              size={15}
              fill="currentColor"
            />

            <span>
              Every beautiful celebration
              deserves a beautiful beginning.
            </span>

          </div>

        </motion.div>


        {/* SCROLL */}

        <motion.div
          className="contact-scroll"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
          }}
        >
          <span>
            Scroll to connect
          </span>

          <span>
            ↓
          </span>
        </motion.div>

      </section>


      {/* =====================================================
          QUICK CONTACT CARDS
      ===================================================== */}

      <section className="contact-info-section">

        <div className="contact-section-heading">

          <span className="contact-section-kicker">
            CONNECT WITH CHERISH
          </span>


          <h2>

            We’re Here

            <span>
              For Your Story.
            </span>

          </h2>


          <p>

            Whether you are exploring invitation
            styles or planning the details of your
            celebration, we’re happy to hear from you.

          </p>

        </div>


        <div className="contact-info-grid">


          {/* EMAIL */}

          <motion.a
            href="mailto:cherishbywedknotcraft@gmail.com"
            className="contact-info-card"

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
              duration: 0.55,
            }}

            whileHover={{
              y: -8,
            }}
          >

            <div className="contact-icon-box">
              <Mail size={23} />
            </div>


            <span className="contact-info-label">
              EMAIL US
            </span>


            <h3>
              cherishbywedknotcraft@gmail.com
            </h3>


            <p>
              Send us your questions,
              ideas or celebration details.
            </p>


            <ArrowRight
              className="contact-card-arrow"
              size={18}
            />

          </motion.a>


          {/* PHONE */}

          <motion.a
            href="tel:+919000000000"
            className="contact-info-card"

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
              duration: 0.55,
              delay: 0.08,
            }}

            whileHover={{
              y: -8,
            }}
          >

            <div className="contact-icon-box">
              <Phone size={23} />
            </div>


            <span className="contact-info-label">
              CALL US
            </span>


            <h3>
              +91 90000 00000
            </h3>


            <p>
              Speak with us about your
              invitation requirements.
            </p>


            <ArrowRight
              className="contact-card-arrow"
              size={18}
            />

          </motion.a>


          {/* LOCATION */}

          <motion.div
            className="contact-info-card"

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
              duration: 0.55,
              delay: 0.16,
            }}

            whileHover={{
              y: -8,
            }}
          >

            <div className="contact-icon-box">
              <MapPin size={23} />
            </div>


            <span className="contact-info-label">
              OUR STUDIO
            </span>


            <h3>
              Cherish By Wed Knot Craft
            </h3>


            <p>
              Creating beautiful invitation
              experiences from India.
            </p>


            <ArrowRight
              className="contact-card-arrow"
              size={18}
            />

          </motion.div>


          {/* RESPONSE */}

          <motion.div
            className="contact-info-card"

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
              duration: 0.55,
              delay: 0.24,
            }}

            whileHover={{
              y: -8,
            }}
          >

            <div className="contact-icon-box">
              <Clock3 size={23} />
            </div>


            <span className="contact-info-label">
              RESPONSE TIME
            </span>


            <h3>
              We’re Here To Help
            </h3>


            <p>
              Share your requirements through
              the form and we’ll get back to you.
            </p>


            <ArrowRight
              className="contact-card-arrow"
              size={18}
            />

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section className="contact-form-section">


        {/* LEFT SIDE */}

        <motion.div
          className="contact-form-intro"

          initial={{
            opacity: 0,
            x: -50,
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
            duration: 0.75,
          }}
        >

          <span className="contact-section-kicker">
            SEND AN ENQUIRY
          </span>


          <h2>

            Tell Us About

            <span>
              Your Celebration.
            </span>

          </h2>


          <p>

            Tell us what you are celebrating,
            what style you love and what you
            are looking for. A little information
            helps us understand your vision better.

          </p>


          <div className="contact-note-card">

            <div className="contact-note-icon">

              <MessageCircle size={21} />

            </div>


            <div>

              <strong>
                Have a unique idea?
              </strong>

              <p>

                We love thoughtful details.
                Share your inspiration and
                requirements with us.

              </p>

            </div>

          </div>


          <div className="contact-mini-quote">

            <QuoteIcon />

            <span>

              “The beginning of every celebration
              starts with a little invitation.”

            </span>

          </div>


          {/* MINI POINTS */}

          <div className="contact-trust-points">

            <motion.div
              whileHover={{
                x: 5,
              }}
            >
              <CheckCircle2 size={18} />

              <span>
                Your enquiry is securely submitted.
              </span>
            </motion.div>


            <motion.div
              whileHover={{
                x: 5,
              }}
            >
              <CheckCircle2 size={18} />

              <span>
                Your details are saved for follow-up.
              </span>
            </motion.div>


            <motion.div
              whileHover={{
                x: 5,
              }}
            >
              <CheckCircle2 size={18} />

              <span>
                Our team can review your celebration needs.
              </span>
            </motion.div>

          </div>

        </motion.div>


        {/* RIGHT FORM */}

        <motion.div
          className="contact-form-card"

          initial={{
            opacity: 0,
            x: 50,
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
            duration: 0.75,
          }}
        >


          <AnimatePresence mode="wait">

            {!submitted ? (

              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}

                initial={{
                  opacity: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
              >


                {/* FORM HEADER */}

                <div className="contact-form-header">

                  <span>
                    CHERISH ENQUIRY
                  </span>

                  <h3>
                    Let’s Start Your Story
                  </h3>

                  <p>
                    A few details are all we need
                    to understand what you’re looking for.
                  </p>

                </div>


                {/* NAME + EMAIL */}

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                    />

                  </div>

                </div>


                {/* PHONE + OCCASION */}

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      autoComplete="tel"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Occasion
                    </label>

                    <div className="select-wrapper">

                      <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select occasion
                        </option>

                        <option value="Wedding">
                          Wedding
                        </option>

                        <option value="Engagement">
                          Engagement
                        </option>

                        <option value="Birthday">
                          Birthday
                        </option>

                        <option value="Anniversary">
                          Anniversary
                        </option>

                        <option value="Housewarming">
                          Housewarming
                        </option>

                        <option value="Other">
                          Other Celebration
                        </option>

                      </select>

                      <ChevronDown
                        size={17}
                        className="select-arrow"
                      />

                    </div>

                  </div>

                </div>


                {/* MESSAGE */}

                <div className="form-group">

                  <label>
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your celebration, preferred style, colours or anything you'd like us to know..."
                    rows="6"
                    required
                  />

                </div>


                {/* ERROR MESSAGE */}

                <AnimatePresence>

                  {submitError && (

                    <motion.div
                      className="contact-submit-error"

                      initial={{
                        opacity: 0,
                        y: -8,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                    >

                      <span>
                        ⚠
                      </span>

                      <p>
                        {submitError}
                      </p>

                    </motion.div>

                  )}

                </AnimatePresence>


                {/* SUBMIT */}

                <motion.button
                  type="submit"
                  className="contact-submit-button"
                  disabled={submitting}

                  whileHover={
                    submitting
                      ? {}
                      : {
                          y: -3,
                        }
                  }

                  whileTap={
                    submitting
                      ? {}
                      : {
                          scale: 0.97,
                        }
                  }
                >

                  {submitting ? (

                    <>
                      <motion.span
                        className="contact-button-loader"

                        animate={{
                          rotate: 360,
                        }}

                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      Sending Your Enquiry...

                    </>

                  ) : (

                    <>
                      Send My Enquiry

                      <Send size={17} />
                    </>

                  )}

                </motion.button>


                <p className="form-disclaimer">

                  Your message is securely sent to
                  Cherish By Wed Knot Craft.

                </p>

              </motion.form>

            ) : (

              <motion.div
                key="success"
                className="contact-success"

                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.5,
                }}
              >

                <motion.div
                  className="success-icon"

                  animate={{
                    scale: [
                      1,
                      1.12,
                      1,
                    ],

                    rotate: [
                      0,
                      3,
                      -3,
                      0,
                    ],
                  }}

                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >

                  <CheckCircle2 size={40} />

                </motion.div>


                <span>
                  THANK YOU
                </span>


                <h3>
                  Your message has been received.
                </h3>


                <p>

                  Thank you for reaching out to
                  Cherish By Wed Knot Craft.
                  Your enquiry has been saved and
                  sent for review. Your celebration
                  matters to us, and we’re glad to
                  be part of the beginning.

                </p>


                <div className="success-quote">

                  <Heart
                    size={17}
                    fill="currentColor"
                  />

                  <span>
                    Beautiful beginnings start here.
                  </span>

                </div>


                <button
                  type="button"
                  className="success-back-button"
                  onClick={handleSendAnother}
                >

                  Send Another Message

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </motion.div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="contact-faq-section">

        <div className="contact-section-heading">

          <span className="contact-section-kicker">
            QUESTIONS, ANSWERED
          </span>


          <h2>

            Before You

            <span>
              Send A Message.
            </span>

          </h2>


          <p>

            A few quick answers about our
            invitation experience.

          </p>

        </div>


        <div className="faq-list">

          {faqs.map(
            (faq, index) => {

              const isOpen =
                openFaq === index;


              return (

                <motion.div
                  key={faq.question}
                  className={
                    `faq-item ${
                      isOpen
                        ? "faq-open"
                        : ""
                    }`
                  }

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
                    amount: 0.15,
                  }}

                  transition={{
                    duration: 0.45,
                    delay:
                      index * 0.06,
                  }}
                >

                  <button
                    type="button"
                    className="faq-question"
                    onClick={() =>
                      toggleFaq(index)
                    }
                  >

                    <span>
                      {faq.question}
                    </span>


                    <motion.span
                      animate={{
                        rotate:
                          isOpen
                            ? 180
                            : 0,
                      }}
                    >

                      <ChevronDown size={20} />

                    </motion.span>

                  </button>


                  <AnimatePresence>

                    {isOpen && (

                      <motion.div
                        className="faq-answer"

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
                          duration: 0.3,
                        }}
                      >

                        <p>
                          {faq.answer}
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </motion.div>

              );

            }
          )}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="contact-final-section">

        {/* FLOATING DECOR */}

        <motion.span
          className="final-particle final-particle-one"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
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
          className="final-particle final-particle-two"
          animate={{
            y: [0, 12, 0],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.span>


        <motion.div
          className="contact-final-card"

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
        >

          <motion.div
            className="final-heart"

            animate={{
              y: [0, -7, 0],
              scale: [1, 1.08, 1],
            }}

            transition={{
              duration: 2.8,
              repeat: Infinity,
            }}
          >

            <Heart
              size={30}
              fill="currentColor"
            />

          </motion.div>


          <span className="contact-section-kicker">
            LET'S CREATE SOMETHING BEAUTIFUL
          </span>


          <h2>

            Your Celebration

            <span>
              Starts With Cherish.
            </span>

          </h2>


          <p>

            Explore our invitation collection
            and find the design that feels right
            for your story.

          </p>


          <Link
            to="/shop"
            className="contact-final-button"
          >

            Explore Invitations

            <ArrowRight size={17} />

          </Link>

        </motion.div>

      </section>


    </main>
  );
}


/* =========================================================
   SMALL QUOTE ICON
========================================================= */

function QuoteIcon() {

  return (

    <span className="quote-icon">
      “
    </span>

  );

}


export default Contact;