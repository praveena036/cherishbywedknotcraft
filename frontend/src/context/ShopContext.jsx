import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  /* =========================================
     AUTHENTICATION
  ========================================= */

  const [user, setUser] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("cherish-user")
        ) || null
      );
    } catch {
      return null;
    }
  });

  /* =========================================
     CART
  ========================================= */

  const [cart, setCart] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("cherish-cart")
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =========================================
     WISHLIST
  ========================================= */

  const [wishlist, setWishlist] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(
            "cherish-wishlist"
          )
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =========================================
     LOCAL STORAGE
  ========================================= */

  useEffect(() => {
    localStorage.setItem(
      "cherish-user",
      JSON.stringify(user)
    );
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "cherish-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "cherish-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  /* =========================================
     LOGIN / LOGOUT
  ========================================= */

  const loginUser = (phone) => {
    const newUser = {
      phone,
      name: "Cherish Customer",
      loggedInAt: new Date().toISOString(),
    };

    setUser(newUser);

    return newUser;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("cherish-user");
  };

  const isAuthenticated = Boolean(user);

  /* =========================================
     CART FUNCTIONS
  ========================================= */

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== productId
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  /* =========================================
     WISHLIST
  ========================================= */

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists =
        currentWishlist.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return currentWishlist.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) =>
        item.id === productId
    );
  };

  /* =========================================
     COUNTS
  ========================================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const wishlistCount =
    wishlist.length;

  /* =========================================
     PRICE CALCULATIONS
  ========================================= */

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price *
        item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 999 || subtotal === 0
      ? 0
      : 49;

  const total =
    subtotal +
    deliveryCharge;

  /* =========================================
     CONTEXT VALUE
  ========================================= */

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,

      loginUser,
      logoutUser,

      cart,
      wishlist,

      cartCount,
      wishlistCount,

      subtotal,
      deliveryCharge,
      total,

      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,

      toggleWishlist,
      isInWishlist,
    }),
    [
      user,
      isAuthenticated,
      cart,
      wishlist,
      cartCount,
      wishlistCount,
      subtotal,
      deliveryCharge,
      total,
    ]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context =
    useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}