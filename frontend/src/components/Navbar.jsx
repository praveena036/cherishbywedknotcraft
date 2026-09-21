import { useEffect, useState } from "react";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogOut,
  UserCircle,
} from "lucide-react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import logo from "../assets/images/logo.png";

import { useShop } from "../context/ShopContext";

import "./Navbar.css";


function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [phone, setPhone] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  const [scrolled, setScrolled] =
    useState(false);


  const {
    cartCount,
    wishlistCount,
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
  } = useShop();


  /* ==========================================
     SCROLL
  ========================================== */

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(
        window.scrollY > 35
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  /* ==========================================
     NAV ITEMS
  ========================================== */

  const navItems = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Sale",
      path: "/sale",
      sale: true,
    },

    {
      name: "Categories",
      path: "/categories",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];


  /* ==========================================
     MOBILE CLOSE
  ========================================== */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };


  /* ==========================================
     LOGIN
  ========================================== */

  const handleLogin = () => {

    const cleanedPhone =
      phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {

      setLoginError(
        "Please enter a valid 10 digit mobile number."
      );

      return;
    }

    loginUser(cleanedPhone);

    setPhone("");
    setLoginError("");

  };


  /* ==========================================
     LOGOUT
  ========================================== */

  const handleLogout = () => {

    logoutUser();

    setProfileOpen(false);

  };


  /* ==========================================
     DISPLAY PHONE
  ========================================== */

  const displayPhone =
    user?.phone ||
    user?.phoneNumber ||
    user?.mobile ||
    "";


  /* ==========================================
     NAV VARIANTS
  ========================================== */

  const navVariants = {

    hidden: {
      opacity: 0,
      y: -18,
    },

    visible: (index) => ({

      opacity: 1,

      y: 0,

      transition: {
        duration: 0.55,

        delay:
          0.5 +
          index * 0.09,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      },

    }),

  };


  return (

    <motion.header
      className={`navbar ${
        scrolled
          ? "navbar-scrolled"
          : ""
      }`}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.95,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >


      {/* ======================================
          TOP LINE
      ======================================= */}

      <motion.div
        className="navbar-top-line"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.4,
          delay: 0.25,
          ease: "easeOut",
        }}
      />


      <div className="navbar-inner">


        {/* ==================================
            LOGO
        =================================== */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {
            closeMobileMenu();
            setProfileOpen(false);
          }}
        >

          <motion.div
            className="logo-orbit"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
          />


          <motion.div
            className="logo-image-wrap"
            whileHover={{
              scale: 1.08,
              rotate: -2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >

            <img
              src={logo}
              alt="Cherish By Wed Knot Craft"
              className="logo-image"
            />

          </motion.div>


          <motion.div
            className="logo-text"
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.35,
            }}
          >

            <span className="logo-main">
              Cherish
            </span>

            <span className="logo-sub">
              BY WED KNOT CRAFT
            </span>

          </motion.div>

        </Link>


        {/* ==================================
            DESKTOP NAV
        =================================== */}

        <nav className="desktop-nav">

          {navItems.map(
            (item, index) => (

              <motion.div
                key={item.name}
                custom={index}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="nav-item-wrap"
              >

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    nav-link
                    ${
                      isActive
                        ? "nav-link-active"
                        : ""
                    }
                    ${
                      item.sale
                        ? "nav-sale-link"
                        : ""
                    }
                    `
                  }
                >

                  {({
                    isActive,
                  }) => (

                    <>
                      <span className="nav-link-text">
                        {item.name}
                      </span>

                      {item.sale && (

                        <motion.span
                          className="nav-sale-badge"
                          initial={{
                            opacity: 0,
                            scale: 0,
                            y: -7,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.45,
                            delay: 1,
                            type: "spring",
                            stiffness: 300,
                          }}
                        >

                          <Sparkles size={8} />

                          OFFERS

                        </motion.span>

                      )}

                      {isActive && (

                        <motion.span
                          className="nav-active-dot"
                          layoutId="nav-active-dot"
                        />

                      )}

                    </>

                  )}

                </NavLink>

              </motion.div>

            )
          )}

        </nav>


        {/* ==================================
            ACTIONS
        =================================== */}

        <div className="navbar-actions">


          {/* SEARCH */}

          <motion.button
            type="button"
            className="nav-icon-button"
            onClick={() =>
              setSearchOpen(
                !searchOpen
              )
            }
            whileHover={{
              y: -4,
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >

            <Search size={19} />

          </motion.button>


          {/* WISHLIST */}

          <motion.div
            className="nav-icon-holder"
            whileHover={{
              y: -4,
            }}
          >

            <Link
              to="/wishlist"
              className="nav-icon-button"
              aria-label="Wishlist"
            >

              <Heart size={19} />

              <motion.span
                key={wishlistCount}
                className="icon-badge"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 18,
                }}
              >
                {wishlistCount}
              </motion.span>

            </Link>

          </motion.div>


          {/* CART */}

          <motion.div
            className="nav-icon-holder"
            whileHover={{
              y: -4,
            }}
          >

            <Link
              to="/cart"
              className="nav-icon-button"
              aria-label="Cart"
            >

              <ShoppingBag
                size={19}
              />

              <motion.span
                key={cartCount}
                className="icon-badge"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 18,
                }}
              >
                {cartCount}
              </motion.span>

            </Link>

          </motion.div>


          {/* =================================
              DYNAMIC PROFILE
          ================================= */}

          <div className="profile-wrapper">

            <motion.button
              type="button"
              className={`profile-button ${
                isAuthenticated
                  ? "profile-logged"
                  : ""
              }`}
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              whileHover={{
                y: -4,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.91,
              }}
              aria-label="Profile"
            >

              {isAuthenticated ? (

                <span className="profile-avatar">
                  {(displayPhone || "U")
                    .slice(-1)
                    .toUpperCase()}
                </span>

              ) : (

                <User size={19} />

              )}

            </motion.button>


            {/* PROFILE DROPDOWN */}

            <AnimatePresence>

              {profileOpen && (

                <motion.div
                  className="profile-dropdown"
                  initial={{
                    opacity: 0,
                    y: -12,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    scale: 0.94,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >

                  {isAuthenticated ? (

                    /* =========================
                       LOGGED IN
                    ========================== */

                    <>

                      <div className="profile-header">

                        <div className="profile-large-avatar">

                          {(displayPhone || "U")
                            .slice(-1)
                            .toUpperCase()}

                        </div>

                        <div>

                          <strong>
                            Welcome Back
                          </strong>

                          <span>
                            +91 {displayPhone}
                          </span>

                        </div>

                      </div>


                      <div className="profile-divider" />


                      <Link
                        to="/wishlist"
                        className="profile-menu-item"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      >

                        <Heart size={17} />

                        <span>
                          My Wishlist
                        </span>

                      </Link>


                      <Link
                        to="/cart"
                        className="profile-menu-item"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      >

                        <ShoppingBag size={17} />

                        <span>
                          My Cart
                        </span>

                      </Link>


                      <button
                        type="button"
                        className="profile-menu-item logout-item"
                        onClick={
                          handleLogout
                        }
                      >

                        <LogOut size={17} />

                        <span>
                          Logout
                        </span>

                      </button>

                    </>

                  ) : (

                    /* =========================
                       NOT LOGGED IN
                    ========================== */

                    <>

                      <div className="login-dropdown-title">

                        <UserCircle
                          size={24}
                        />

                        <div>

                          <strong>
                            Welcome to Cherish
                          </strong>

                          <span>
                            Sign in to save your favourites
                          </span>

                        </div>

                      </div>


                      <div className="profile-divider" />


                      <label className="phone-label">
                        Mobile Number
                      </label>


                      <div className="phone-input-wrap">

                        <span>
                          +91
                        </span>

                        <input
                          type="tel"
                          value={phone}
                          maxLength={10}
                          placeholder="Enter mobile number"
                          onChange={(event) => {

                            const value =
                              event.target.value
                                .replace(/\D/g, "");

                            setPhone(value);

                            setLoginError("");

                          }}
                        />

                      </div>


                      {loginError && (

                        <p className="login-error">
                          {loginError}
                        </p>

                      )}


                      <button
                        type="button"
                        className="profile-login-button"
                        onClick={
                          handleLogin
                        }
                      >

                        Continue

                        <ArrowRight
                          size={16}
                        />

                      </button>


                      <p className="demo-login-note">
                        Demo login • Enter any
                        valid 10 digit number
                      </p>

                    </>

                  )}

                </motion.div>

              )}

            </AnimatePresence>

          </div>


          {/* MOBILE */}

          <motion.button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            whileTap={{
              scale: 0.88,
            }}
          >

            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </motion.button>

        </div>

      </div>


      {/* ======================================
          SEARCH
      ======================================= */}

      <AnimatePresence>

        {searchOpen && (

          <motion.div
            className="navbar-search-panel"
            initial={{
              opacity: 0,
              height: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -15,
            }}
          >

            <div className="navbar-search-inner">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search invitations..."
                autoFocus
              />

              <span>
                Press Enter
              </span>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ======================================
          MOBILE NAV
      ======================================= */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            className="mobile-nav"
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
              duration: 0.45,
            }}
          >

            <div className="mobile-nav-inner">

              {navItems.map(
                (item, index) => (

                  <motion.div
                    key={item.name}
                    initial={{
                      opacity: 0,
                      x: 35,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.07,
                    }}
                  >

                    <NavLink
                      to={item.path}
                      onClick={
                        closeMobileMenu
                      }
                      className="mobile-nav-link"
                    >

                      <span>
                        {item.name}
                      </span>

                      {item.sale && (
                        <span className="mobile-sale-badge">
                          OFFERS
                        </span>
                      )}

                      <ArrowRight
                        size={16}
                      />

                    </NavLink>

                  </motion.div>

                )
              )}


              {/* MOBILE PROFILE */}

              <motion.div
                className="mobile-profile-section"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
              >

                {isAuthenticated ? (

                  <>

                    <div className="mobile-user-info">

                      <div className="profile-large-avatar">
                        {(displayPhone || "U")
                          .slice(-1)
                          .toUpperCase()}
                      </div>

                      <div>

                        <strong>
                          Welcome Back
                        </strong>

                        <span>
                          +91 {displayPhone}
                        </span>

                      </div>

                    </div>


                    <button
                      type="button"
                      className="mobile-logout-button"
                      onClick={
                        handleLogout
                      }
                    >
                      <LogOut size={17} />
                      Logout
                    </button>

                  </>

                ) : (

                  <Link
                    to="/login"
                    className="mobile-login-link"
                    onClick={
                      closeMobileMenu
                    }
                  >

                    <User size={18} />

                    <span>
                      Login / Sign Up
                    </span>

                    <ArrowRight
                      size={16}
                    />

                  </Link>

                )}

              </motion.div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  );
}


export default Navbar;