import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";

import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="footer-main">

        {/* =========================
            BRAND
        ========================== */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo-link"
            onClick={scrollTop}
          >
            <img
              src={logo}
              alt="Cherish By Wed Knot Craft"
              className="footer-logo"
            />
          </Link>

          <h3>
            Cherish By Wed Knot Craft
          </h3>

          <p>
            Elegant wedding invitations crafted
            to turn your beautiful moments into
            unforgettable memories.
          </p>

          <div className="footer-love">
            <span className="footer-heart">
              ♥
            </span>

            <span>
              Made with love for your special day
            </span>
          </div>


          {/* SOCIAL */}

          <div className="footer-social">

            <a
              href="#instagram"
              className="social-icon"
              aria-label="Instagram"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              ◎
            </a>

            <a
              href="#facebook"
              className="social-icon"
              aria-label="Facebook"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              f
            </a>

            <a
              href="#youtube"
              className="social-icon"
              aria-label="YouTube"
              onClick={(event) =>
                event.preventDefault()
              }
            >
              ▶
            </a>

            <a
              href="mailto:weddingcard@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              ✉
            </a>

          </div>

        </div>


        {/* =========================
            INFORMATION
        ========================== */}

        <div className="footer-column">

          <h4>
            Information
          </h4>

          <button
            type="button"
            onClick={() => goToPage("/")}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/categories")
            }
          >
            Wedding Collections
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/sale")
            }
          >
            Special Offers
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/shop")
            }
          >
            All Invitations
          </button>

        </div>


        {/* =========================
            QUICK ACCESS
        ========================== */}

        <div className="footer-column">

          <h4>
            Quick Access
          </h4>

          <button
            type="button"
            onClick={() => goToPage("/")}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/shop")
            }
          >
            Shop
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/categories")
            }
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/sale")
            }
          >
            Sale
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/wishlist")
            }
          >
            Wishlist
          </button>

          <button
            type="button"
            onClick={() =>
              goToPage("/cart")
            }
          >
            Cart
          </button>

        </div>


        {/* =========================
            CONTACT
        ========================== */}

        <div className="footer-column footer-contact">

          <h4>
            Contact Us
          </h4>

          <div className="contact-item">

            <span className="contact-icon">
              ☎
            </span>

            <span>
              +91 98765 43210
            </span>

          </div>


          <div className="contact-item">

            <span className="contact-icon">
              ✉
            </span>

            <span>
              weddingcard@gmail.com
            </span>

          </div>


          <div className="contact-item">

            <span className="contact-icon">
              📍
            </span>

            <span>
              Tamil Nadu, India
            </span>

          </div>


          <div className="footer-message">

            <span>
              ✦
            </span>

            <span>
              Beautiful invitations for
              every celebration
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM
      ========================== */}

      <div className="footer-bottom">

        <p>
          © 2026 Cherish By Wed Knot Craft.
          All Rights Reserved.
        </p>

        <button
          type="button"
          className="back-top"
          onClick={scrollTop}
        >
          <span>
            Back to top
          </span>

          <span>
            ↑
          </span>

        </button>

      </div>

    </footer>
  );
}

export default Footer;